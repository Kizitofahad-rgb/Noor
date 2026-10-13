import webpush from 'web-push';
import { query } from './db.ts';

// Dedicated persistent VAPID key pair for Noor
export const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY ||
  'BJihx_6EDKbfT62mgxgpXEMLLv8c8IsVJUH2WlajAGxHUK2HobeKxHLKAKKoNYDvg4dZWtqdo4Tkp2b7CyG8rxg';

export const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY || 'bQ4reZmlWcxXwwJLVSC4RKXHl2PzDjymocLAHGyZWbc';

const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:notifications@noor.app';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface ClientPushSubscription {
  endpoint: string;
  keys: PushSubscriptionKeys;
  expirationTime?: number | null;
}

export interface NotificationPreferences {
  prayerTimes?: boolean;
  dailyAyah?: boolean;
  eveningAdhkar?: boolean;
  fridayKahf?: boolean;
  quranStreak?: boolean;
  dailyTime?: string; // e.g. "07:00"
}

export interface StoredSubscription {
  id?: string | number;
  userId?: string | null;
  endpoint: string;
  p256dh: string;
  auth: string;
  preferences: NotificationPreferences;
  createdAt?: string;
  updatedAt?: string;
}

// In-memory fallback map to ensure instant notification delivery even during DB transitions
const inMemorySubscriptions = new Map<string, StoredSubscription>();

let tableInitialized = false;

export async function ensurePushSubscriptionsTable() {
  if (tableInitialized) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100),
        endpoint TEXT UNIQUE NOT NULL,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        preferences JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_push_endpoint ON push_subscriptions(endpoint);
    `);
    tableInitialized = true;
    console.log('[WebPush] push_subscriptions table ready.');
  } catch (err) {
    console.warn('[WebPush] PostgreSQL table setup deferred, using in-memory store:', err);
  }
}

// Initialize on server start
ensurePushSubscriptionsTable().catch(() => {});

export async function saveSubscription(
  sub: ClientPushSubscription,
  preferences: NotificationPreferences = {},
  userId?: string | null
): Promise<boolean> {
  const item: StoredSubscription = {
    userId: userId || null,
    endpoint: sub.endpoint,
    p256dh: sub.keys.p256dh,
    auth: sub.keys.auth,
    preferences: {
      prayerTimes: true,
      dailyAyah: true,
      eveningAdhkar: true,
      fridayKahf: true,
      quranStreak: true,
      dailyTime: '07:00',
      ...preferences,
    },
    updatedAt: new Date().toISOString(),
  };

  // 1. Update in-memory cache
  inMemorySubscriptions.set(sub.endpoint, item);

  // 2. Persist to PostgreSQL if available
  try {
    await ensurePushSubscriptionsTable();
    await query(
      `INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth, preferences, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (endpoint)
       DO UPDATE SET
         user_id = EXCLUDED.user_id,
         p256dh = EXCLUDED.p256dh,
         auth = EXCLUDED.auth,
         preferences = EXCLUDED.preferences,
         updated_at = NOW()`,
      [item.userId, item.endpoint, item.p256dh, item.auth, JSON.stringify(item.preferences)]
    );
    return true;
  } catch (err) {
    console.warn('[WebPush] DB save failed, cached in-memory:', err);
    return true;
  }
}

export async function removeSubscription(endpoint: string): Promise<boolean> {
  inMemorySubscriptions.delete(endpoint);
  try {
    await query('DELETE FROM push_subscriptions WHERE endpoint = $1', [endpoint]);
    return true;
  } catch (err) {
    console.warn('[WebPush] DB delete error:', err);
    return true;
  }
}

export async function getAllSubscriptions(): Promise<StoredSubscription[]> {
  try {
    const res = await query('SELECT user_id, endpoint, p256dh, auth, preferences FROM push_subscriptions');
    if (res.rows && res.rows.length > 0) {
      // Merge with in-memory map
      for (const row of res.rows) {
        if (!inMemorySubscriptions.has(row.endpoint)) {
          inMemorySubscriptions.set(row.endpoint, {
            userId: row.user_id,
            endpoint: row.endpoint,
            p256dh: row.p256dh,
            auth: row.auth,
            preferences: typeof row.preferences === 'string' ? JSON.parse(row.preferences) : row.preferences || {},
          });
        }
      }
    }
  } catch {
    // Ignore and fallback to inMemory
  }
  return Array.from(inMemorySubscriptions.values());
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  icon?: string;
  tag?: string;
  category?: 'prayer' | 'daily' | 'friday' | 'adhkar' | 'streak' | 'general';
}

export async function sendPushToSubscription(
  sub: StoredSubscription,
  payload: PushPayload
): Promise<boolean> {
  const pushSubscription = {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.p256dh,
      auth: sub.auth,
    },
  };

  const payloadString = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url || '/',
    icon: payload.icon || '/pwa-192x192.png',
    tag: payload.tag || `noor-${payload.category || 'reminder'}-${Date.now()}`,
    category: payload.category || 'general',
  });

  try {
    await webpush.sendNotification(pushSubscription, payloadString, {
      TTL: 24 * 60 * 60, // 24 hours
      urgency: 'high',
    });
    return true;
  } catch (error: any) {
    console.warn('[WebPush] Error sending notification:', error?.statusCode || error);
    // 404 or 410 means subscription is expired or unsubscribed by the user
    if (error?.statusCode === 404 || error?.statusCode === 410) {
      await removeSubscription(sub.endpoint);
    }
    return false;
  }
}

export async function sendTestNotification(endpoint?: string): Promise<{ success: boolean; count: number }> {
  const payload: PushPayload = {
    title: 'Noor · Sacred Reminder Connected ✨',
    body: 'Your phone is now successfully linked to receive prayer Adhan times, daily Quranic reflections, and blessed reminders directly on your lock screen.',
    url: '/',
    category: 'general',
    tag: 'noor-test-notification',
  };

  if (endpoint) {
    const sub = inMemorySubscriptions.get(endpoint);
    if (sub) {
      const ok = await sendPushToSubscription(sub, payload);
      return { success: ok, count: ok ? 1 : 0 };
    }
  }

  const allSubs = await getAllSubscriptions();
  if (allSubs.length === 0) {
    return { success: false, count: 0 };
  }

  let sentCount = 0;
  for (const s of allSubs) {
    const ok = await sendPushToSubscription(s, payload);
    if (ok) sentCount++;
  }

  return { success: sentCount > 0, count: sentCount };
}

export async function broadcastDevotionalReminder(
  category: keyof NotificationPreferences,
  payload: PushPayload
): Promise<number> {
  const allSubs = await getAllSubscriptions();
  let count = 0;

  for (const sub of allSubs) {
    if (sub.preferences && sub.preferences[category] !== false) {
      const ok = await sendPushToSubscription(sub, payload);
      if (ok) count++;
    }
  }

  return count;
}
