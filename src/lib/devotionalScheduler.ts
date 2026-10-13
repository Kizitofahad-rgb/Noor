import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import type { NotificationPreferences } from '@/context/NotificationContext';

const NOTIFIED_CACHE_KEY = 'noor_notified_timestamps';

function getNotifiedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(NOTIFIED_CACHE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function markNotified(key: string) {
  try {
    const set = getNotifiedSet();
    set.add(key);
    // Keep only last 100 entries
    const arr = Array.from(set).slice(-100);
    localStorage.setItem(NOTIFIED_CACHE_KEY, JSON.stringify(arr));
  } catch {
    // Ignore
  }
}

function isAlreadyNotified(key: string): boolean {
  return getNotifiedSet().has(key);
}

// Show native phone notification via Service Worker
export async function triggerNativePhoneNotification(
  title: string,
  options: NotificationOptions & { url?: string }
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  const notificationOptions: any = {
    icon: '/pwa-192x192.png',
    badge: '/icon.svg',
    vibrate: [150, 75, 150],
    renotify: true,
    data: {
      url: options.url || '/',
      dateOfArrival: Date.now(),
    },
    ...options,
  };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await (reg as any).showNotification(title, notificationOptions);
      return true;
    } else {
      new Notification(title, notificationOptions);
      return true;
    }
  } catch (err) {
    console.warn('[Scheduler] Notification trigger failed:', err);
    return false;
  }
}

// Check scheduled reminders against current time
export async function checkAndTriggerDevotionalReminders() {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const rawPrefs = localStorage.getItem('noor_notification_prefs');
  const prefs: NotificationPreferences = rawPrefs
    ? JSON.parse(rawPrefs)
    : {
        prayerTimes: true,
        dailyAyah: true,
        eveningAdhkar: true,
        fridayKahf: true,
        quranStreak: true,
        dailyTime: '07:00',
      };

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 1. Prayer Times Checking
  if (prefs.prayerTimes) {
    let lat = 21.4225;
    let lng = 39.8262;
    let city = 'Makkah';

    try {
      const rawLoc = localStorage.getItem('noor_user_location');
      if (rawLoc) {
        const parsed = JSON.parse(rawLoc);
        if (parsed.latitude && parsed.longitude) {
          lat = parsed.latitude;
          lng = parsed.longitude;
          city = parsed.city || 'your city';
        }
      }
    } catch {
      // Fallback to Makkah
    }

    try {
      const coordinates = new Coordinates(lat, lng);
      const params = CalculationMethod.MuslimWorldLeague();
      const prayerTimes = new PrayerTimes(coordinates, now, params);

      const prayers = [
        { name: 'Fajr', time: prayerTimes.fajr, arabic: 'الفجر' },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, arabic: 'الظهر' },
        { name: 'Asr', time: prayerTimes.asr, arabic: 'العصر' },
        { name: 'Maghrib', time: prayerTimes.maghrib, arabic: 'المغرب' },
        { name: 'Isha', time: prayerTimes.isha, arabic: 'العشاء' },
      ];

      for (const prayer of prayers) {
        const diffMs = now.getTime() - prayer.time.getTime();
        // Trigger if within 3 minutes of prayer time
        if (diffMs >= 0 && diffMs < 3 * 60 * 1000) {
          const key = `prayer_${prayer.name}_${dateStr}`;
          if (!isAlreadyNotified(key)) {
            markNotified(key);
            await triggerNativePhoneNotification(`🕌 Time for ${prayer.name} (${prayer.arabic})`, {
              body: `Hayya 'alas-Salah! The time for ${prayer.name} has arrived in ${city}. Take a moment to connect with Allah.`,
              tag: `prayer-${prayer.name}`,
              url: '/?tab=home',
            });
          }
        }
      }
    } catch (e) {
      console.warn('[Scheduler] Prayer check failed:', e);
    }
  }

  // 2. Daily Ayah & Morning Reflection (Default: 7:00 AM)
  if (prefs.dailyAyah) {
    const [targetH, targetM] = (prefs.dailyTime || '07:00').split(':').map(Number);
    if (hours === targetH && Math.abs(minutes - targetM) < 2) {
      const key = `daily_ayah_${dateStr}`;
      if (!isAlreadyNotified(key)) {
        markNotified(key);
        await triggerNativePhoneNotification('📖 Daily Quran Reflection · Noor', {
          body: 'Start your morning in tranquility. Read today’s verse and heart contemplation in Noor.',
          tag: 'daily-ayah',
          url: '/?tab=home',
        });
      }
    }
  }

  // 3. Evening Adhkar (9:00 PM)
  if (prefs.eveningAdhkar) {
    if (hours === 21 && minutes < 3) {
      const key = `evening_adhkar_${dateStr}`;
      if (!isAlreadyNotified(key)) {
        markNotified(key);
        await triggerNativePhoneNotification('🌙 Evening Adhkar & Night Peace', {
          body: 'Unwind your heart with the protection of Ayatul Kursi and evening supplications.',
          tag: 'evening-adhkar',
          url: '/?tab=library',
        });
      }
    }
  }

  // 4. Friday Surah Al-Kahf (Fridays between 9:00 AM and 11:00 AM)
  if (prefs.fridayKahf && now.getDay() === 5) {
    if (hours === 9 && minutes < 3) {
      const key = `friday_kahf_${dateStr}`;
      if (!isAlreadyNotified(key)) {
        markNotified(key);
        await triggerNativePhoneNotification('✨ Blessed Friday · Surah Al-Kahf', {
          body: '“Whoever recites Surah Al-Kahf on Friday will have a light shining from beneath his feet to the clouds of the sky.”',
          tag: 'friday-kahf',
          url: '/?tab=quran&surah=18',
        });
      }
    }
  }
}

// Background Ticker
let schedulerInterval: any = null;

export function startDevotionalScheduler() {
  if (typeof window === 'undefined') return;
  if (schedulerInterval) return;

  // Run initial check
  checkAndTriggerDevotionalReminders();

  // Check every 60 seconds
  schedulerInterval = setInterval(() => {
    checkAndTriggerDevotionalReminders();
  }, 60 * 1000);
}

export function stopDevotionalScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}
