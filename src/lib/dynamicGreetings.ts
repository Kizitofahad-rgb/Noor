export interface DynamicGreeting {
  id: string;
  timeSlot: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'friday' | 'general';
  badge: string;
  headline: string;
  subtext: string;
  ayahReference?: string;
  iconType: 'sunrise' | 'sun' | 'sunset' | 'moon' | 'sparkles' | 'heart' | 'flame' | 'feather';
}

export const dynamicGreetings: DynamicGreeting[] = [
  // --- FRIDAY (JUMU'AH) SPECIALS ---
  {
    id: 'friday-1',
    timeSlot: 'friday',
    badge: 'Blessed Friday Light · يوم الجمعة المبارك',
    headline: 'Light upon light: blessed is the day of Jumu‘ah.',
    subtext: 'Today is the most noble day upon which the sun rises. Send abundant peace upon the Prophet ﷺ, recite Surah Al-Kahf, and let your heart be bathed in heavenly tranquility.',
    ayahReference: 'Surah Al-Jumu‘ah · "O you who have believed, when the call is made for prayer on Friday, hasten to the remembrance of Allah."',
    iconType: 'sparkles',
  },
  {
    id: 'friday-2',
    timeSlot: 'friday',
    badge: 'Hour of Acceptance · ساعة الاستجابة',
    headline: 'An hour wherein no sincere prayer is turned away.',
    subtext: 'On this blessed day lies a sacred window where divine gates swing open to the whispered prayers of the faithful. Lift your hands and ask for everything your heart longs for.',
    ayahReference: 'Sahih Al-Bukhari · "There is an hour on Friday during which no Muslim servant stands in prayer asking Allah for good except that He grants it."',
    iconType: 'sparkles',
  },

  // --- DAWN / EARLY MORNING (FAJR & DHUHA: 04:00 - 09:59) ---
  {
    id: 'morning-1',
    timeSlot: 'fajr',
    badge: 'Dawn Awakening · سكون الفجر',
    headline: 'The morning breathes with the whisper of a new beginning.',
    subtext: 'As dawn breaks, your soul is handed an unblemished page. Greet the light with gratitude and let the remembrance of Allah steady your steps today.',
    ayahReference: 'Quran 81:18 · "And by the dawn as it breathes."',
    iconType: 'sunrise',
  },
  {
    id: 'morning-2',
    timeSlot: 'fajr',
    badge: 'Morning Barakah · نور الصباح',
    headline: 'A few quiet moments can change the shape of an entire day.',
    subtext: 'Before the world rushes in with its demands, ground your heart in the timeless rhythm of the Quran. What you give to Allah first, He multiplies with barakah.',
    ayahReference: 'Quran 17:78 · "Indeed, the recitation of dawn is ever witnessed."',
    iconType: 'sunrise',
  },
  {
    id: 'morning-3',
    timeSlot: 'fajr',
    badge: 'Divine Compassion · رحمة واسعة',
    headline: 'Step into this morning covered by His boundless grace.',
    subtext: 'Whatever yesterday held is in the past. Today’s sunrise is living proof that Allah’s mercy is infinitely greater than our shortcomings.',
    ayahReference: 'Quran 7:156 · "My mercy encompasses all things."',
    iconType: 'sun',
  },
  {
    id: 'morning-4',
    timeSlot: 'fajr',
    badge: 'Daily Purpose · نية خالصة',
    headline: 'Awaken with purpose: you were created for eternal goodness.',
    subtext: 'Every breath today is an opportunity to cultivate seeds of charity, patience, and warmth. Begin with Bismillah and step into the day with dignity.',
    ayahReference: 'Quran 51:56 · "And I did not create the jinn and mankind except to worship Me."',
    iconType: 'feather',
  },

  // --- MIDDAY / AFTERNOON (DHUHR: 10:00 - 15:29) ---
  {
    id: 'midday-1',
    timeSlot: 'dhuhr',
    badge: 'Midday Recalibration · وقفة الظهر',
    headline: 'Pause and recalibrate: your worth is in who you turn to.',
    subtext: 'In the busy whirlwind of work and responsibilities, pause to remember that the Sustainer of the cosmos is orchestrating your affairs. Take a deep breath and renew your intention.',
    ayahReference: 'Quran 65:3 · "And whoever relies upon Allah—then He is sufficient for him."',
    iconType: 'sun',
  },
  {
    id: 'midday-2',
    timeSlot: 'dhuhr',
    badge: 'Unshakeable Trust · توكل على الله',
    headline: 'Put your trust in the Living One who never tires.',
    subtext: 'When tasks feel overwhelming, surrender the outcome. Do what is within your capability today with excellence (Ihsan), and leave what is beyond you to the Almighty.',
    ayahReference: 'Quran 25:58 · "And put your trust in the Living One who does not die, and hymn His praise."',
    iconType: 'heart',
  },
  {
    id: 'midday-3',
    timeSlot: 'dhuhr',
    badge: 'Living Kindness · إحسان وعمل',
    headline: 'Every small act of sincere goodness is recorded with honor.',
    subtext: 'A cheerful smile to someone tired, patience in a difficult conversation, or removing harm from someone’s day—no righteous gesture is too small in the sight of Allah.',
    ayahReference: 'Quran 99:7 · "So whoever does an atom\'s weight of good will see it."',
    iconType: 'sparkles',
  },

  // --- LATE AFTERNOON (ASR: 15:30 - 17:59) ---
  {
    id: 'afternoon-1',
    timeSlot: 'asr',
    badge: 'Afternoon Composure · صلاة العصر',
    headline: 'Guard the middle hour, and let the afternoon bring calm.',
    subtext: 'As the shadows lengthen across the earth, the soul seeks composure. Refresh your spirit with a quiet reflection and finish your day with steadfast peace.',
    ayahReference: 'Quran 2:238 · "Maintain with care the prayers and in particular the middle prayer."',
    iconType: 'sunset',
  },
  {
    id: 'afternoon-2',
    timeSlot: 'asr',
    badge: 'Resilience & Hope · الصبر واليقين',
    headline: 'Hardship is fleeting, but the sweetness of patience endures.',
    subtext: 'Whatever tested your strength today has refined your resilience. In every difficulty, Allah has folded countless unannounced reliefs waiting to bloom.',
    ayahReference: 'Quran 94:6 · "Indeed, with hardship comes ease."',
    iconType: 'flame',
  },

  // --- SUNSET / DUSK (MAGHRIB: 18:00 - 20:29) ---
  {
    id: 'sunset-1',
    timeSlot: 'maghrib',
    badge: 'Sunset Gratitude · شكر المغرب',
    headline: 'Count the unseen blessings that carried you through today.',
    subtext: 'As the sun dips beneath the horizon, contemplate the gifts that kept you alive, clothed, and guided today. Al-Hamdulillahi Rabbil ‘Alamin for what we see and what we cannot see.',
    ayahReference: 'Quran 14:7 · "If you are grateful, I will surely increase you [in favor]."',
    iconType: 'sunset',
  },
  {
    id: 'sunset-2',
    timeSlot: 'maghrib',
    badge: 'Evening Sanctuary · طمأنينة المساء',
    headline: 'Return home to peace, leaving the noise of the world outside.',
    subtext: 'Let this evening welcome your spirit into stillness. Forgive anyone who may have wronged you today, and find restful sanctuary in the shelter of the Most Merciful.',
    ayahReference: 'Quran 30:17 · "So exalted is Allah when you reach the evening and when you reach the morning."',
    iconType: 'heart',
  },

  // --- NIGHT / PRE-DAWN (ISHA & TAHAJJUD: 20:30 - 03:59) ---
  {
    id: 'night-1',
    timeSlot: 'isha',
    badge: 'Night Tranquility · قيام وسحر',
    headline: 'In the quiet sanctuary of the night, whisper your deepest hopes.',
    subtext: 'When the world falls into silence, the King of the universe remains closer to you than your own heartbeat. Speak to Him without reservation; He knows every tear and every longing.',
    ayahReference: 'Quran 50:16 · "And We are closer to him than his jugular vein."',
    iconType: 'moon',
  },
  {
    id: 'night-2',
    timeSlot: 'isha',
    badge: 'Night Protection · أذكار النوم',
    headline: 'Rest your soul in the shelter of Surah Al-Mulk.',
    subtext: 'Recite the verses of protection before resting your eyes. You are guarded by the Eternal Keeper who neither slumbers nor sleeps.',
    ayahReference: 'Quran 2:255 · "Neither drowsiness overtakes Him nor sleep."',
    iconType: 'moon',
  },
  {
    id: 'night-3',
    timeSlot: 'isha',
    badge: 'Heart Cleansing · سلامة الصدر',
    headline: 'Forgive everyone tonight, and sleep wrapped in divine forgiveness.',
    subtext: 'Release the heavy baggage of resentments and worries before your head touches the pillow. Sleep with a chest clean and light, entrusting your tomorrow to Allah.',
    ayahReference: 'Quran 24:22 · "And let them pardon and overlook. Would you not like that Allah should forgive you?"',
    iconType: 'feather',
  },
];

/**
 * Returns the greetings pool appropriate for the current moment in time
 */
export function getContextualGreetings(): DynamicGreeting[] {
  const now = new Date();
  const day = now.getDay(); // 5 = Friday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  // Friday Special (between 06:00 and 19:00 on Friday)
  if (day === 5 && hour >= 6 && hour <= 19) {
    const fridayList = dynamicGreetings.filter((g) => g.timeSlot === 'friday');
    const regularList = dynamicGreetings.filter((g) => g.timeSlot !== 'friday');
    return [...fridayList, ...regularList];
  }

  // Time based categorization:
  // Dawn (Fajr/Dhuha): 04:00 - 09:59 (240 - 599 min)
  if (totalMinutes >= 240 && totalMinutes < 600) {
    return [
      ...dynamicGreetings.filter((g) => g.timeSlot === 'fajr'),
      ...dynamicGreetings.filter((g) => g.timeSlot === 'dhuhr'),
    ];
  }

  // Midday (Dhuhr): 10:00 - 15:29 (600 - 929 min)
  if (totalMinutes >= 600 && totalMinutes < 930) {
    return [
      ...dynamicGreetings.filter((g) => g.timeSlot === 'dhuhr'),
      ...dynamicGreetings.filter((g) => g.timeSlot === 'asr'),
    ];
  }

  // Afternoon (Asr): 15:30 - 17:59 (930 - 1079 min)
  if (totalMinutes >= 930 && totalMinutes < 1080) {
    return [
      ...dynamicGreetings.filter((g) => g.timeSlot === 'asr'),
      ...dynamicGreetings.filter((g) => g.timeSlot === 'maghrib'),
    ];
  }

  // Sunset (Maghrib): 18:00 - 20:29 (1080 - 1229 min)
  if (totalMinutes >= 1080 && totalMinutes < 1230) {
    return [
      ...dynamicGreetings.filter((g) => g.timeSlot === 'maghrib'),
      ...dynamicGreetings.filter((g) => g.timeSlot === 'isha'),
    ];
  }

  // Night (Isha / Tahajjud): 20:30 - 03:59
  return [
    ...dynamicGreetings.filter((g) => g.timeSlot === 'isha'),
    ...dynamicGreetings.filter((g) => g.timeSlot === 'fajr'),
  ];
}

/**
 * Returns a stable index based on date + hour so the greeting naturally evolves
 * across the day, while remaining consistent on page reload unless the user cycles it.
 */
export function getInitialGreetingIndex(poolLength: number): number {
  if (poolLength <= 1) return 0;
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const hour = now.getHours();
  return (dayOfYear * 7 + hour) % poolLength;
}
