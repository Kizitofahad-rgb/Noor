import {
  broadcastDevotionalReminder,
  getAllSubscriptions,
  type PushPayload,
  type NotificationPreferences,
} from './pushNotifications.ts';

export interface DispatchLog {
  timestamp: string;
  category: string;
  title: string;
  recipientsCount: number;
}

const dispatchLogs: DispatchLog[] = [];
let workerInterval: NodeJS.Timeout | null = null;

// Track what has already been sent today (e.g., '2026-10-05-morning-ayah')
const sentToday = new Set<string>();

/**
 * Curated uplifting reflections and sacred verses for automated daily broadcasts
 */
const dailyVerses = [
  {
    title: 'Morning Light · Ayah of the Day 🌅',
    body: '“Indeed, with hardship comes ease.” (Quran 94:6) — May your day begin with unshakeable trust in Allah.',
    url: '/?tab=quran',
  },
  {
    title: 'Morning Tranquility · Remembrance 🌿',
    body: '“Unquestionably, by the remembrance of Allah hearts find rest.” (Quran 13:28) — Take three deep breaths and begin with Bismillah.',
    url: '/?tab=home',
  },
  {
    title: 'Sacred Reflection · Noor ✨',
    body: '“And He is with you wherever you are.” (Quran 57:4) — You are never alone in your silent struggles.',
    url: '/?tab=quran',
  },
  {
    title: 'Morning Awakening · Divine Mercy 🕊️',
    body: '“My mercy encompasses all things.” (Quran 7:156) — Step into this morning covered by His boundless grace.',
    url: '/?tab=library',
  },
  {
    title: 'Guidance & Peace · Noor 📖',
    body: '“Call upon Me; I will respond to you.” (Quran 40:60) — Whisper your hopes in prayer today; your Lord is near.',
    url: '/?tab=quran',
  },
];

const eveningAdhkarVerses = [
  {
    title: 'Evening Peace & Protection 🌙',
    body: 'Recite Ayat al-Kursi and the Mu‘awwidhat (Surah Al-Falaq & An-Nas) for a night under divine guardianship.',
    url: '/?tab=library',
  },
  {
    title: 'Bedtime Remembrance · Adhkar 🌙',
    body: '“In Your name, my Lord, I lay down my side and in Your name I raise it up.” Rest your soul in serene gratitude.',
    url: '/?tab=home',
  },
  {
    title: 'Night Peace · Surat Al-Mulk 🌟',
    body: 'The Prophet (ﷺ) encouraged reciting Surah Al-Mulk before sleep to illuminate the grave and protect the soul.',
    url: '/?tab=quran',
  },
];

/**
 * Evaluates schedule and broadcasts timely reminders
 */
export async function runDevotionalCheck(): Promise<void> {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10); // e.g. "2026-10-05"
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const dayOfWeek = now.getUTCDay(); // 5 = Friday

  // 1. Morning Ayah (Broadcast between 06:00 and 08:00 UTC)
  const morningKey = `${dateStr}-morning-ayah`;
  if (hours >= 6 && hours <= 8 && !sentToday.has(morningKey)) {
    sentToday.add(morningKey);
    const verse = dailyVerses[Math.floor(Math.random() * dailyVerses.length)];
    const count = await broadcastDevotionalReminder('dailyAyah', {
      title: verse.title,
      body: verse.body,
      url: verse.url,
      category: 'daily',
    });

    logDispatch('dailyAyah', verse.title, count);
    console.log(`[DevotionalWorker] Dispatched Morning Ayah to ${count} active subscriber(s).`);
  }

  // 2. Evening Adhkar (Broadcast between 20:00 and 22:00 UTC)
  const eveningKey = `${dateStr}-evening-adhkar`;
  if (hours >= 20 && hours <= 22 && !sentToday.has(eveningKey)) {
    sentToday.add(eveningKey);
    const adhkar = eveningAdhkarVerses[Math.floor(Math.random() * eveningAdhkarVerses.length)];
    const count = await broadcastDevotionalReminder('eveningAdhkar', {
      title: adhkar.title,
      body: adhkar.body,
      url: adhkar.url,
      category: 'adhkar',
    });

    logDispatch('eveningAdhkar', adhkar.title, count);
    console.log(`[DevotionalWorker] Dispatched Evening Adhkar to ${count} active subscriber(s).`);
  }

  // 3. Friday Kahf Reminder (Every Friday at 08:00 - 10:00 UTC)
  const fridayKey = `${dateStr}-friday-kahf`;
  if (dayOfWeek === 5 && hours >= 8 && hours <= 10 && !sentToday.has(fridayKey)) {
    sentToday.add(fridayKey);
    const count = await broadcastDevotionalReminder('fridayKahf', {
      title: 'Blessed Friday · Light Between Two Fridays ✨',
      body: 'Recite Surah Al-Kahf today: “Whoever reads Surah Al-Kahf on Friday, light will shine for him between the two Fridays.”',
      url: '/?tab=quran',
      category: 'friday',
    });

    logDispatch('fridayKahf', 'Blessed Friday · Light Between Two Fridays ✨', count);
    console.log(`[DevotionalWorker] Dispatched Friday Kahf reminder to ${count} subscriber(s).`);
  }

  // 4. Daily Quran Streak Reminder (Broadcast around 17:00 - 19:00 UTC)
  const streakKey = `${dateStr}-streak-reminder`;
  if (hours >= 17 && hours <= 19 && !sentToday.has(streakKey)) {
    sentToday.add(streakKey);
    const count = await broadcastDevotionalReminder('quranStreak', {
      title: 'Keep Your Daily Quran Rhythm Glowing 🔥',
      body: 'Spend just 3 peaceful minutes with the verses of Allah today to nurture your streak and refresh your heart.',
      url: '/?tab=quran',
      category: 'streak',
    });

    logDispatch('quranStreak', 'Keep Your Daily Quran Rhythm Glowing 🔥', count);
    console.log(`[DevotionalWorker] Dispatched Streak reminder to ${count} subscriber(s).`);
  }
}

function logDispatch(category: string, title: string, count: number) {
  dispatchLogs.unshift({
    timestamp: new Date().toISOString(),
    category,
    title,
    recipientsCount: count,
  });
  if (dispatchLogs.length > 50) dispatchLogs.pop();
}

/**
 * Manually trigger an immediate reminder for testing or user request
 */
export async function triggerImmediateReminder(
  category: keyof NotificationPreferences = 'dailyAyah'
): Promise<{ success: boolean; count: number; title: string }> {
  let payload: PushPayload;

  if (category === 'eveningAdhkar') {
    const adhkar = eveningAdhkarVerses[0];
    payload = {
      title: adhkar.title,
      body: adhkar.body,
      url: adhkar.url,
      category: 'adhkar',
    };
  } else if (category === 'fridayKahf') {
    payload = {
      title: 'Blessed Friday · Surah Al-Kahf ✨',
      body: 'A special Friday reminder to recite Surah Al-Kahf and illuminate your soul with divine light.',
      url: '/?tab=quran',
      category: 'friday',
    };
  } else if (category === 'quranStreak') {
    payload = {
      title: 'Daily Quran Streak Active 🔥',
      body: 'Take a quiet moment to read or listen to a chapter today.',
      url: '/?tab=quran',
      category: 'streak',
    };
  } else if (category === 'prayerTimes') {
    payload = {
      title: '🕌 Call to Prayer · Adhan Remembrance',
      body: 'It is time for prayer. Turn your heart toward the Creator and stand in peaceful connection.',
      url: '/?tab=home',
      category: 'prayer',
    };
  } else {
    const verse = dailyVerses[0];
    payload = {
      title: verse.title,
      body: verse.body,
      url: verse.url,
      category: 'daily',
    };
  }

  const count = await broadcastDevotionalReminder(category, payload);
  logDispatch(category, payload.title, count);
  return { success: count > 0, count, title: payload.title };
}

export function getWorkerStatus() {
  return {
    isActive: Boolean(workerInterval),
    recentLogs: dispatchLogs.slice(0, 10),
    sentTodayCount: sentToday.size,
    currentServerTimeUtc: new Date().toISOString(),
  };
}

/**
 * Start the autonomous server-side background worker (ticks every 60s)
 */
export function startDevotionalWorker(): void {
  if (workerInterval) return;

  console.log('[DevotionalWorker] Autonomous background scheduler started (60s ticker).');

  // Run initial check after 10 seconds of startup
  setTimeout(() => {
    runDevotionalCheck().catch((err) => {
      console.warn('[DevotionalWorker] Initial check error:', err);
    });
  }, 10000);

  // Every 60 seconds
  workerInterval = setInterval(() => {
    runDevotionalCheck().catch((err) => {
      console.warn('[DevotionalWorker] Interval check error:', err);
    });
  }, 60 * 1000);
}

export function stopDevotionalWorker(): void {
  if (workerInterval) {
    clearInterval(workerInterval);
    workerInterval = null;
    console.log('[DevotionalWorker] Stopped.');
  }
}
