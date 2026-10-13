import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface NotificationPreferences {
  prayerTimes: boolean;
  dailyAyah: boolean;
  eveningAdhkar: boolean;
  fridayKahf: boolean;
  quranStreak: boolean;
  dailyTime: string; // e.g. "07:00"
}

export const DEFAULT_PREFERENCES: NotificationPreferences = {
  prayerTimes: true,
  dailyAyah: true,
  eveningAdhkar: true,
  fridayKahf: true,
  quranStreak: true,
  dailyTime: '07:00',
};

interface NotificationContextType {
  permission: NotificationPermission | 'unsupported';
  isSupported: boolean;
  isSubscribed: boolean;
  isSubscribing: boolean;
  preferences: NotificationPreferences;
  isIOS: boolean;
  isStandalone: boolean;
  enableNotifications: () => Promise<boolean>;
  disableNotifications: () => Promise<boolean>;
  updatePreferences: (newPrefs: Partial<NotificationPreferences>) => Promise<void>;
  sendTestNotification: () => Promise<{ success: boolean; message: string }>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  lastTestStatus: string | null;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const STORAGE_KEY = 'noor_notification_prefs';
const SUBSCRIBED_KEY = 'noor_push_subscribed';

// Utility to convert VAPID base64 string to Uint8Array required by pushManager.subscribe
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastTestStatus, setLastTestStatus] = useState<string | null>(null);

  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const isIOS =
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true);

  // Check support and current permission on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setIsSupported(false);
      setPermission('unsupported');
      return;
    }

    setIsSupported(true);
    setPermission(Notification.permission);

    // Check existing push subscription
    navigator.serviceWorker.ready
      .then((reg) => {
        if ('pushManager' in reg) {
          return reg.pushManager.getSubscription();
        }
        return null;
      })
      .then((sub) => {
        if (sub) {
          setIsSubscribed(true);
          localStorage.setItem(SUBSCRIBED_KEY, 'true');
        } else {
          setIsSubscribed(false);
          localStorage.removeItem(SUBSCRIBED_KEY);
        }
      })
      .catch((err) => {
        console.warn('[Notifications] Could not query subscription:', err);
      });
  }, []);

  // Sync preferences to localStorage whenever changed
  const updatePreferences = useCallback(
    async (newPrefs: Partial<NotificationPreferences>) => {
      setPreferences((prev) => {
        const updated = { ...prev, ...newPrefs };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage error
        }
        return updated;
      });

      // Update on server if currently subscribed
      if (isSubscribed && 'serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.ready;
          const sub = await reg.pushManager.getSubscription();
          if (sub) {
            await fetch('/api/notifications/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                subscription: sub.toJSON(),
                preferences: newPrefs,
              }),
            });
          }
        } catch (e) {
          console.warn('[Notifications] Failed to update server preferences:', e);
        }
      }
    },
    [isSubscribed]
  );

  // Request permission and subscribe device to real phone push notifications
  const enableNotifications = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      alert('Push notifications are not supported on this browser.');
      return false;
    }

    setIsSubscribing(true);
    setLastTestStatus(null);

    try {
      // 1. Request Notification Permission
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result !== 'granted') {
        setIsSubscribing(false);
        return false;
      }

      // 2. Ensure Service Worker is active
      const reg = await navigator.serviceWorker.ready;

      // 3. Fetch server's VAPID public key
      let vapidPublicKey = '';
      try {
        const res = await fetch('/api/notifications/vapid-key');
        if (res.ok) {
          const data = await res.json();
          vapidPublicKey = data.publicKey;
        }
      } catch (err) {
        console.warn('[Notifications] Failed to fetch VAPID key:', err);
      }

      if (!vapidPublicKey) {
        vapidPublicKey =
          'BJihx_6EDKbfT62mgxgpXEMLLv8c8IsVJUH2WlajAGxHUK2HobeKxHLKAKKoNYDvg4dZWtqdo4Tkp2b7CyG8rxg';
      }

      // 4. Subscribe with PushManager
      let subscription = await reg.pushManager.getSubscription();
      if (!subscription) {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      // 5. Send subscription to server
      const token = localStorage.getItem('noor_auth_jwt_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          preferences,
        }),
      });

      setIsSubscribed(true);
      localStorage.setItem(SUBSCRIBED_KEY, 'true');

      // 6. Show initial confirmation notification directly on the phone
      try {
        await (reg as any).showNotification('Noor · Phone Notifications Active 🌙', {
          body: 'Your phone will now receive real-time prayer Adhans, morning Ayah reflections, and sacred reminders.',
          icon: '/pwa-192x192.png',
          badge: '/icon.svg',
          tag: 'noor-welcome-notification',
          renotify: true,
        });
      } catch (e) {
        console.warn('Local confirmation notification notice:', e);
      }

      return true;
    } catch (err) {
      console.error('[Notifications] Failed to enable notifications:', err);
      return false;
    } finally {
      setIsSubscribing(false);
    }
  }, [isSupported, preferences]);

  // Disable push notifications
  const disableNotifications = useCallback(async (): Promise<boolean> => {
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          const endpoint = sub.endpoint;
          await sub.unsubscribe();
          await fetch('/api/notifications/unsubscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint }),
          });
        }
      }
      setIsSubscribed(false);
      localStorage.removeItem(SUBSCRIBED_KEY);
      return true;
    } catch (err) {
      console.error('[Notifications] Failed to unsubscribe:', err);
      return false;
    }
  }, []);

  // Send an immediate test notification to the user's phone lock screen
  const sendTestNotification = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    setLastTestStatus('Sending test alert to your device...');

    try {
      // 1. If Service Worker is ready, display a direct native notification on the phone OS
      if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        const reg = await navigator.serviceWorker.ready;
        await (reg as any).showNotification('Noor · Prayer & Reflection Alert 🔔', {
          body: 'SubhanAllah! Phone notifications are active. You will receive your prayer times and daily reflections right here.',
          icon: '/pwa-192x192.png',
          badge: '/icon.svg',
          vibrate: [200, 100, 200],
          tag: 'noor-test-alert',
          renotify: true,
          data: { url: '/' },
        });
      }

      // 2. Also trigger from server through Web Push
      const res = await fetch('/api/notifications/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      const msg = data.success
        ? 'Test notification sent to your phone! Check your notification bar or lock screen.'
        : 'Notification triggered directly on your device.';

      setLastTestStatus(msg);
      return { success: true, message: msg };
    } catch (err) {
      console.error('[Notifications] Test failed:', err);
      const errMsg = 'Failed to dispatch test notification. Please verify permissions.';
      setLastTestStatus(errMsg);
      return { success: false, message: errMsg };
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <NotificationContext.Provider
      value={{
        permission,
        isSupported,
        isSubscribed,
        isSubscribing,
        preferences,
        isIOS,
        isStandalone,
        enableNotifications,
        disableNotifications,
        updatePreferences,
        sendTestNotification,
        isModalOpen,
        openModal,
        closeModal,
        lastTestStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
