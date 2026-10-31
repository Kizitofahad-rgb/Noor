/**
 * Sunnah Sanctuary (سنن الحبيب المصطفى ﷺ)
 * Authoritative, comprehensive dataset detailing the prophetic Sunan:
 * - Daily Sunnah Prayers (As-Sunan Ar-Rawatib & Voluntary Prayers for all 5 daily prayers)
 * - Prophetic Fasting Schedule & Calendar (Mondays/Thursdays, White Days, Arafah, Ashura, Shawwal, and prohibited days)
 * - Daily Prophetic Lifestyle & Habit Sunan with authentic canonical citations
 */

export interface ChronologicalPrayerStep {
  step: number;
  label: string;
  rakahs: number;
  timingCategory: 'before' | 'fard' | 'after' | 'prohibited' | 'seal';
  status: 'sunnah-muakkadah' | 'sunnah-ghayr-muakkadah' | 'fard-obligatory' | 'prohibited-no-prayer' | 'witr-seal';
  description: string;
  reasonAndEvidence: {
    hadithArabic?: string;
    hadithEnglish: string;
    source: string;
    whyPerformOrAvoid: string;
  };
}

export interface ProhibitedPrayerTimeItem {
  id: string;
  prayerName: string;
  arabicTitle: string;
  ruling: string;
  timeWindow: string;
  hadithEvidence: {
    arabic: string;
    english: string;
    narrator: string;
    source: string;
  };
  whyForbidden: string;
  whatToPerformInstead: string;
}

export interface PrayerSunnahItem {
  id: string;
  prayerName: string;
  arabicName: string;
  chronologicalSteps: ChronologicalPrayerStep[];
  beforeFard: {
    rakahs: number;
    type: 'muakkadah' | 'ghayr-muakkadah' | 'none';
    description: string;
    howToPray: string;
    hadith: {
      text: string;
      source: string;
    };
    specialSurahs?: string;
  };
  fardRakahs: number;
  afterFard: {
    rakahs: number;
    type: 'muakkadah' | 'ghayr-muakkadah' | 'none' | 'prohibited';
    description: string;
    howToPray: string;
    hadith: {
      text: string;
      source: string;
    };
    specialSurahs?: string;
  };
  isRawatibTotal: number; // Total confirmed Rawatib Rak'ahs counted for the 12 palace in Jannah
  timeWindow: string;
  importantRulings: string[];
}

export interface VoluntaryPrayerItem {
  id: string;
  name: string;
  arabicName: string;
  minRakahs: number;
  recommendedRakahs: number;
  maxRakahs?: number;
  timing: string;
  significance: string;
  howToPerform: string;
  hadith: {
    text: string;
    source: string;
  };
}

export interface FastingSunnahItem {
  id: string;
  name: string;
  arabicName: string;
  frequency: 'weekly' | 'monthly' | 'annual';
  timingDescription: string;
  whyFast: string;
  virtueAndReward: string;
  hadith: {
    text: string;
    source: string;
  };
  specialSunnahActions: string[];
}

export interface LifestyleSunnahItem {
  id: string;
  category: 'eating-drinking' | 'sleep' | 'morning-wake' | 'speech-social' | 'grooming-siwak' | 'remembrance';
  title: string;
  arabicSnippet?: string;
  description: string;
  practicalSteps: string[];
  hadithCitation: string;
}

// ---------------------------------------------------------------------------
// 1. THE 5 DAILY PRAYERS SUNNAH GUIDE WITH CHRONOLOGICAL STEPS & EVIDENCE
// ---------------------------------------------------------------------------
export const dailyPrayerSunan: PrayerSunnahItem[] = [
  {
    id: 'fajr',
    prayerName: 'Fajr (Dawn Prayer)',
    arabicName: 'صَلَاةُ الفَجْر',
    chronologicalSteps: [
      {
        step: 1,
        label: 'Before Fard: 2 Rak‘ahs Sunnah Mu’akkadah',
        rakahs: 2,
        timingCategory: 'before',
        status: 'sunnah-muakkadah',
        description: 'The most emphasized Sunnah prayer in all of Islam. The Prophet ﷺ never missed it in his life, even during severe journeys.',
        reasonAndEvidence: {
          hadithArabic: '«رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا»',
          hadithEnglish: 'The Prophet ﷺ said: "The two Rak‘ahs before dawn are dearer to me than this world and everything in it."',
          source: 'Sahih Muslim (725)',
          whyPerformOrAvoid: 'Offers more immense divine reward than all worldly treasures combined. Sunnah to recite Surah Al-Kafirun in the 1st Rak‘ah and Surah Al-Ikhlas in the 2nd.',
        },
      },
      {
        step: 2,
        label: 'Fard: 2 Rak‘ahs Obligatory Dawn Prayer',
        rakahs: 2,
        timingCategory: 'fard',
        status: 'fard-obligatory',
        description: 'The obligatory congregational dawn prayer, recited aloud by the Imam.',
        reasonAndEvidence: {
          hadithArabic: '«إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا»',
          hadithEnglish: 'Allah says: "Indeed, the recitation of dawn is ever witnessed (by angels of the night and day)."',
          source: 'Surah Al-Isra (17:78)',
          whyPerformOrAvoid: 'Mandatory pillar of Islam; establishes divine protection for the believer for the remainder of the day.',
        },
      },
      {
        step: 3,
        label: 'After Fard: ⛔ STRICTLY PROHIBITED (No Sunnah Prayer)',
        rakahs: 0,
        timingCategory: 'prohibited',
        status: 'prohibited-no-prayer',
        description: 'No voluntary or Sunnah prayer of any kind is permitted once the Fard of Fajr has concluded, until the sun rises above the horizon by a spear’s length (~15-20 min after sunrise).',
        reasonAndEvidence: {
          hadithArabic: '«لاَ صَلاَةَ بَعْدَ الصُّبْحِ حَتَّى تَرْتَفِعَ الشَّمْسُ»',
          hadithEnglish: 'The Prophet ﷺ explicitly commanded: "There is no prayer after the dawn prayer until the sun has fully risen."',
          source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
          whyPerformOrAvoid: 'The Prophet ﷺ explained that the sun rises between the two horns of Satan, when polytheists bow to it. Prayer is forbidden to avoid any imitation of idol worship. Remain seated in Morning Adhkar and Dhikr instead.',
        },
      },
    ],
    beforeFard: {
      rakahs: 2,
      type: 'muakkadah',
      description: '2 Rak‘ahs Sunnah Mu’akkadah before Fard (The most emphasized Sunnah prayer in Islam).',
      howToPray: 'Prayed as two light, focused Rak‘ahs right after the Fajr Adhan enters and before the congregation stands.',
      hadith: {
        text: '«رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا»\n"The two Rak‘ahs before dawn are dearer to me than this world and everything in it."',
        source: 'Sahih Muslim (725)',
      },
      specialSurahs: 'Surah Al-Kafirun (Ch. 109) in the 1st Rak‘ah, and Surah Al-Ikhlas (Ch. 112) in the 2nd Rak‘ah.',
    },
    fardRakahs: 2,
    afterFard: {
      rakahs: 0,
      type: 'prohibited',
      description: 'Strictly prohibited: No voluntary or Sunnah prayer is permitted after Fajr until sunrise is fully complete (~15–20 minutes after sunrise).',
      howToPray: 'Engage instead in morning Adhkar and Quran until Ishraq/Duha time.',
      hadith: {
        text: '«لاَ صَلاَةَ بَعْدَ الصُّبْحِ حَتَّى تَرْتَفِعَ الشَّمْسُ»\n"There is no prayer after the dawn prayer until the sun has fully risen."',
        source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
      },
    },
    isRawatibTotal: 2,
    timeWindow: 'From true dawn (Al-Fajr As-Sadiq) until sunrise.',
    importantRulings: [
      'The Prophet ﷺ never abandoned these 2 Rak‘ahs, even while traveling on long journeys.',
      'After the Fard of Fajr is prayed, ALL voluntary prayers are prohibited until ~15-20 min after sunrise.',
      'If you arrive at the masjid while the congregation has already started, join the Fard immediately, then make up the 2 Sunnah Rak‘ahs after sunrise.',
    ],
  },
  {
    id: 'dhuhr',
    prayerName: 'Dhuhr (Midday Prayer)',
    arabicName: 'صَلَاةُ الظُّهْر',
    chronologicalSteps: [
      {
        step: 1,
        label: 'Before Fard: 4 Rak‘ahs Sunnah Mu’akkadah',
        rakahs: 4,
        timingCategory: 'before',
        status: 'sunnah-muakkadah',
        description: 'Prayed in two sets of 2 Rak‘ahs with Salaam after each, right after the sun passes its zenith.',
        reasonAndEvidence: {
          hadithArabic: '«إِنَّهَا سَاعَةٌ تُفْتَحُ فِيهَا أَبْوَابُ السَّمَاءِ، فَأُحِبُّ أَنْ يَصْعَدَ لِي فِيهَا عَمَلٌ صَالِحٌ»',
          hadithEnglish: 'The Prophet ﷺ said: "This is an hour in which the gates of heaven are opened, and I love that a righteous deed should ascend for me during it."',
          source: 'Jami‘ at-Tirmidhi (478) · Sahih',
          whyPerformOrAvoid: 'Opens the gates of heaven for your deeds at midday. These 4 Rak‘ahs count toward the 12 daily Rawatib.',
        },
      },
      {
        step: 2,
        label: 'Fard: 4 Rak‘ahs Obligatory Midday Prayer',
        rakahs: 4,
        timingCategory: 'fard',
        status: 'fard-obligatory',
        description: 'The mandatory midday prayer, prayed quietly in 4 Rak‘ahs.',
        reasonAndEvidence: {
          hadithEnglish: 'Allah prescribed the four obligatory Rak‘ahs of Dhuhr at the decline of the sun.',
          source: 'Sahih al-Bukhari (541)',
          whyPerformOrAvoid: 'Mandatory daily obligation.',
        },
      },
      {
        step: 3,
        label: 'After Fard: ✅ 2 Rak‘ahs Sunnah Mu’akkadah (Optional +2)',
        rakahs: 2,
        timingCategory: 'after',
        status: 'sunnah-muakkadah',
        description: 'Prayed immediately after finishing the 4 Fard Rak‘ahs and standard brief remembrance. Can be expanded to 4 Rak‘ahs.',
        reasonAndEvidence: {
          hadithArabic: '«مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ وَأَرْبَعٍ بَعْدَهَا، حَرَّمَهُ اللَّهُ عَلَى النَّارِ»',
          hadithEnglish: 'The Prophet ﷺ said: "Whoever guards four Rak‘ahs before Dhuhr and four after it, Allah forbids the Fire from touching him."',
          source: 'Jami‘ at-Tirmidhi (428), Sunan Abi Dawud (1269) · Sahih',
          whyPerformOrAvoid: '2 Rak‘ahs completes the 6 Dhuhr Rawatib for a palace in Jannah. Expanding to 4 Rak‘ahs guarantees protection from the Hellfire.',
        },
      },
    ],
    beforeFard: {
      rakahs: 4,
      type: 'muakkadah',
      description: '4 Rak‘ahs Sunnah Mu’akkadah before Fard (prayed in two sets of 2 Rak‘ahs with Salaam after each).',
      howToPray: 'Pray 2 Rak‘ahs, make Salaam, then pray another 2 Rak‘ahs. The gates of the heavens open at solar noon.',
      hadith: {
        text: '«إِنَّهَا سَاعَةٌ تُفْتَحُ فِيهَا أَبْوَابُ السَّمَاءِ، فَأُحِبُّ أَنْ يَصْعَدَ لِي فِيهَا عَمَلٌ صَالِحٌ»\n"This is an hour in which the gates of heaven are opened, and I love that a righteous deed should ascend for me during it."',
        source: 'Jami‘ at-Tirmidhi (478) · Sahih',
      },
    },
    fardRakahs: 4,
    afterFard: {
      rakahs: 2,
      type: 'muakkadah',
      description: '2 Rak‘ahs Sunnah Mu’akkadah after Fard (can optionally be expanded to 4 Rak‘ahs).',
      howToPray: 'Pray 2 Rak‘ahs after completing the mandatory Dhuhr prayer and morning/noon tasbih.',
      hadith: {
        text: '«مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ وَأَرْبَعٍ بَعْدَهَا، حَرَّمَهُ اللَّهُ عَلَى النَّارِ»\n"Whoever guards four Rak‘ahs before Dhuhr and four after it, Allah forbids the Fire from touching him."',
        source: 'Jami‘ at-Tirmidhi (428), Sunan Abi Dawud (1269) · Sahih',
      },
    },
    isRawatibTotal: 6, // 4 before + 2 after = 6 Rawatib
    timeWindow: 'From when the sun passes its zenith (solar noon) until an object’s shadow equals its length.',
    importantRulings: [
      'The 4 Rak‘ahs before Dhuhr and 2 Rak‘ahs after Dhuhr make up 6 of the 12 confirmed Rawatib.',
      'If you pray 4 Rak‘ahs after Dhuhr instead of 2, you attain the prophetic promise of complete protection from the Fire.',
    ],
  },
  {
    id: 'asr',
    prayerName: 'Asr (Late Afternoon Prayer)',
    arabicName: 'صَلَاةُ العَصْر',
    chronologicalSteps: [
      {
        step: 1,
        label: 'Before Fard: 4 Rak‘ahs Recommended Voluntary',
        rakahs: 4,
        timingCategory: 'before',
        status: 'sunnah-ghayr-muakkadah',
        description: 'Prayed in pairs of two before the congregation of Asr stands.',
        reasonAndEvidence: {
          hadithArabic: '«رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا»',
          hadithEnglish: 'The Prophet ﷺ supplicated: "May Allah have mercy upon a person who prays four Rak‘ahs before ‘Asr."',
          source: 'Sunan Abi Dawud (1271), Jami‘ at-Tirmidhi (430) · Hasan-Sahih',
          whyPerformOrAvoid: 'Secures the direct personal supplication of divine mercy from the Messenger of Allah ﷺ.',
        },
      },
      {
        step: 2,
        label: 'Fard: 4 Rak‘ahs Obligatory Afternoon Prayer',
        rakahs: 4,
        timingCategory: 'fard',
        status: 'fard-obligatory',
        description: 'The Middle Prayer (As-Salat Al-Wusta), heavily emphasized in the Quran.',
        reasonAndEvidence: {
          hadithEnglish: 'Allah commands: "Guard strictly your prayers, especially the Middle Prayer (Asr)."',
          source: 'Surah Al-Baqarah (2:238)',
          whyPerformOrAvoid: 'Whoever misses Asr prayer deliberately, all his deeds are ruined (Sahih al-Bukhari #553).',
        },
      },
      {
        step: 3,
        label: 'After Fard: ⛔ STRICTLY PROHIBITED (No Sunnah Prayer)',
        rakahs: 0,
        timingCategory: 'prohibited',
        status: 'prohibited-no-prayer',
        description: 'NO SUNNAH OR VOLUNTARY PRAYER IS PERMITTED AFTER ASR. Once you say Salaam for Asr, all prayer is forbidden until Maghrib sunset.',
        reasonAndEvidence: {
          hadithArabic: '«لاَ صَلاَةَ بَعْدَ الْعَصْرِ حَتَّى تَغْرُبَ الشَّمْسُ»',
          hadithEnglish: 'The Prophet ﷺ explicitly declared: "There is no prayer after the ‘Asr prayer until the sun has set completely."',
          source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
          whyPerformOrAvoid: 'The sun sets between the two horns of Satan, and pagans prostrate to it at that moment. Allah strictly prohibited prayer after Asr to protect pure Monotheism and prevent any semblance of idolatry. Use this time for Evening Adhkar and Du‘a.',
        },
      },
    ],
    beforeFard: {
      rakahs: 4,
      type: 'ghayr-muakkadah',
      description: '4 Rak‘ahs Sunnah Ghayr-Mu’akkadah before Fard (voluntary, prayed in pairs of two).',
      howToPray: 'Pray 2 Rak‘ahs with Salaam, followed by 2 Rak‘ahs. Earns the direct invocation of mercy from the Prophet ﷺ.',
      hadith: {
        text: '«رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا»\n"May Allah have mercy upon a person who prays four Rak‘ahs before ‘Asr."',
        source: 'Sunan Abi Dawud (1271), Jami‘ at-Tirmidhi (430) · Hasan-Sahih',
      },
    },
    fardRakahs: 4,
    afterFard: {
      rakahs: 0,
      type: 'prohibited',
      description: 'Strictly prohibited: No prayer of any kind is permitted after Asr until the sun sets completely at Maghrib.',
      howToPray: 'Spend this sacred interval before sunset in Istighfar, Adhkar, and personal Du‘a.',
      hadith: {
        text: '«لاَ صَلاَةَ بَعْدَ الْعَصْرِ حَتَّى تَغْرُبَ الشَّمْسُ»\n"There is no prayer after the ‘Asr prayer until the sun has set completely."',
        source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
      },
    },
    isRawatibTotal: 0, // Asr has no confirmed Rawatib
    timeWindow: 'From when an object’s shadow equals its length until the sun begins to turn pale yellow.',
    importantRulings: [
      'CRITICAL: NO Sunnah prayer is permitted after Asr until Maghrib begins (Sahih al-Bukhari #586).',
      'The 4 Rak‘ahs before Asr are voluntary (Ghayr-Mu’akkadah) and carry a prophetic prayer of mercy.',
    ],
  },
  {
    id: 'maghrib',
    prayerName: 'Maghrib (Sunset Prayer)',
    arabicName: 'صَلَاةُ المَغْرِب',
    chronologicalSteps: [
      {
        step: 1,
        label: 'Before Fard: 2 Light Voluntary Rak‘ahs',
        rakahs: 2,
        timingCategory: 'before',
        status: 'sunnah-ghayr-muakkadah',
        description: 'Optional light prayer between the Maghrib Adhan and Iqamah for whoever wishes.',
        reasonAndEvidence: {
          hadithArabic: '«صَلُّوا قَبْلَ صَلاَةِ الْمَغْرِبِ... لِمَنْ شَاءَ»',
          hadithEnglish: 'The Prophet ﷺ said: "Pray before Maghrib prayer... for whoever wishes."',
          source: 'Sahih al-Bukhari (1183)',
          whyPerformOrAvoid: 'Optional blessing, but must be kept brief so as not to delay the Fard congregation.',
        },
      },
      {
        step: 2,
        label: 'Fard: 3 Rak‘ahs Obligatory Sunset Prayer',
        rakahs: 3,
        timingCategory: 'fard',
        status: 'fard-obligatory',
        description: 'The sunset obligation, recited aloud in the first 2 Rak‘ahs and silently in the 3rd.',
        reasonAndEvidence: {
          hadithEnglish: 'Prescribed as 3 Rak‘ahs at sunset; the shortest time window of the daily prayers.',
          source: 'Sahih al-Bukhari (559)',
          whyPerformOrAvoid: 'Mandatory daily obligation.',
        },
      },
      {
        step: 3,
        label: 'After Fard: ✅ 2 Rak‘ahs Sunnah Mu’akkadah',
        rakahs: 2,
        timingCategory: 'after',
        status: 'sunnah-muakkadah',
        description: 'Hastened immediately after the 3 Fard Rak‘ahs and standard brief remembrance. Part of the 12 Rawatib.',
        reasonAndEvidence: {
          hadithArabic: '«وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ فِي بَيْتِهِ»',
          hadithEnglish: 'Ibn ‘Umar reported: "I preserved from the Prophet ﷺ... two Rak‘ahs after Maghrib in his house."',
          source: 'Sahih al-Bukhari (1180), Sahih Muslim (729)',
          whyPerformOrAvoid: 'Counts toward the 12 Rawatib for a palace in Jannah. It is Sunnah to recite Surah Al-Kafirun in the 1st Rak‘ah and Surah Al-Ikhlas in the 2nd.',
        },
      },
    ],
    beforeFard: {
      rakahs: 2,
      type: 'ghayr-muakkadah',
      description: '2 light voluntary Rak‘ahs between the Adhan and Iqamah for whoever wishes.',
      howToPray: 'Short, light 2 Rak‘ahs performed quickly so as not to delay the Fard congregation.',
      hadith: {
        text: '«صَلُّوا قَبْلَ صَلاَةِ الْمَغْرِبِ»، ثُمَّ قَالَ فِي الثَّالِثَةِ: «لِمَنْ شَاءَ»\n"Pray before Maghrib prayer," and on the third time he added: "For whoever wishes."',
        source: 'Sahih al-Bukhari (1183)',
      },
    },
    fardRakahs: 3,
    afterFard: {
      rakahs: 2,
      type: 'muakkadah',
      description: '2 Rak‘ahs Sunnah Mu’akkadah after Fard (Part of the 12 Rawatib).',
      howToPray: 'Hastened immediately after finishing the 3 Fard Rak‘ahs and standard brief remembrance.',
      hadith: {
        text: '«عَشْرُ رَكَعَاتٍ حَفِظْتُهُنَّ عَنِ النَّبِيِّ ﷺ... وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ فِي بَيْتِهِ»\n"I preserved ten Rak‘ahs from the Prophet ﷺ... including two Rak‘ahs after Maghrib in his house."',
        source: 'Sahih al-Bukhari (1180), Sahih Muslim (729)',
      },
      specialSurahs: 'Sunnah to recite Surah Al-Kafirun in 1st Rak‘ah and Surah Al-Ikhlas in 2nd Rak‘ah.',
    },
    isRawatibTotal: 2,
    timeWindow: 'From sunset until the red twilight completely disappears from the western sky.',
    importantRulings: [
      'The 2 Rak‘ahs after Maghrib are Sunnah Mu’akkadah and part of the 12 Rawatib.',
      'It is highly recommended to perform these 2 Sunnah Rak‘ahs in your home if feasible.',
    ],
  },
  {
    id: 'isha',
    prayerName: 'Isha (Night Prayer)',
    arabicName: 'صَلَاةُ العِشَاء',
    chronologicalSteps: [
      {
        step: 1,
        label: 'Before Fard: 2 Voluntary Rak‘ahs',
        rakahs: 2,
        timingCategory: 'before',
        status: 'sunnah-ghayr-muakkadah',
        description: 'Voluntary prayer between the Adhan and the Iqamah.',
        reasonAndEvidence: {
          hadithArabic: '«بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ لِمَنْ شَاءَ»',
          hadithEnglish: 'The Prophet ﷺ said: "Between every two calls (the Adhan and Iqamah) there is a prayer for whoever wishes."',
          source: 'Sahih al-Bukhari (627), Sahih Muslim (838)',
          whyPerformOrAvoid: 'Recommended general voluntary prayer before the congregation commences.',
        },
      },
      {
        step: 2,
        label: 'Fard: 4 Rak‘ahs Obligatory Night Prayer',
        rakahs: 4,
        timingCategory: 'fard',
        status: 'fard-obligatory',
        description: 'The mandatory night prayer, prayed aloud in the first 2 Rak‘ahs and silently in the last 2.',
        reasonAndEvidence: {
          hadithEnglish: 'Mandatory night obligation; praying it in congregation equals praying half the entire night.',
          source: 'Sahih Muslim (656)',
          whyPerformOrAvoid: 'Mandatory pillar of Islam.',
        },
      },
      {
        step: 3,
        label: 'After Fard: ✅ 2 Rak‘ahs Sunnah Mu’akkadah',
        rakahs: 2,
        timingCategory: 'after',
        status: 'sunnah-muakkadah',
        description: 'Performed after the 4 Fard Rak‘ahs. Completes the daily 12 Sunan Rawatib.',
        reasonAndEvidence: {
          hadithArabic: '«وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ فِي بَيْتِهِ»',
          hadithEnglish: 'Ibn ‘Umar reported: "...and two Rak‘ahs after ‘Isha in his house."',
          source: 'Sahih al-Bukhari (1180), Sahih Muslim (729)',
          whyPerformOrAvoid: 'Completes your 12 Sunan Rawatib to build a palace in Jannah.',
        },
      },
      {
        step: 4,
        label: 'Night Seal: 🌙 Salat al-Witr (1, 3, or more Rak‘ahs)',
        rakahs: 3,
        timingCategory: 'seal',
        status: 'witr-seal',
        description: 'The vital odd-numbered night prayer that seals all worship for the evening.',
        reasonAndEvidence: {
          hadithArabic: '«اجْعَلُوا آخِرَ صَلاَتِكُمْ بِاللَّيْلِ وِتْرًا»',
          hadithEnglish: 'The Prophet ﷺ commanded: "Make the last of your prayer at night an odd number (Witr)."',
          source: 'Sahih al-Bukhari (998), Sahih Muslim (751)',
          whyPerformOrAvoid: 'Strongly commanded by the Prophet ﷺ; should never be omitted before sleeping.',
        },
      },
    ],
    beforeFard: {
      rakahs: 2,
      type: 'ghayr-muakkadah',
      description: '2 voluntary Rak‘ahs between the Adhan and the Iqamah.',
      howToPray: 'Standard 2 voluntary Rak‘ahs performed individually before the congregation begins.',
      hadith: {
        text: '«بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ لِمَنْ شَاءَ»\n"Between every two calls (the Adhan and Iqamah) there is a prayer for whoever wishes."',
        source: 'Sahih al-Bukhari (627), Sahih Muslim (838)',
      },
    },
    fardRakahs: 4,
    afterFard: {
      rakahs: 2,
      type: 'muakkadah',
      description: '2 Rak‘ahs Sunnah Mu’akkadah after Fard (Part of the 12 Rawatib).',
      howToPray: 'Performed after the 4 Fard Rak‘ahs, followed by Witr as the seal of the evening.',
      hadith: {
        text: '«وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ فِي بَيْتِهِ»\n"...and two Rak‘ahs after ‘Isha in his house."',
        source: 'Sahih al-Bukhari (1180), Sahih Muslim (729)',
      },
    },
    isRawatibTotal: 2,
    timeWindow: 'From the disappearance of the red twilight until Islamic midnight (halfway between sunset and true dawn).',
    importantRulings: [
      'Completing the 2 Sunnah Rak‘ahs of Isha brings the daily total of confirmed Sunan Rawatib to exactly 12 Rak‘ahs.',
      'Always follow Isha and its Sunnah with the Witr prayer before going to sleep.',
    ],
  },
];

// ---------------------------------------------------------------------------
// 1B. PROHIBITED PRAYER TIMES (أَوْقَاتُ النَّهْيِ عَنِ الصَّلَاةِ)
// ---------------------------------------------------------------------------
export const prohibitedPrayerTimes: ProhibitedPrayerTimeItem[] = [
  {
    id: 'after-asr',
    prayerName: 'After Asr Prayer until Sunset',
    arabicTitle: 'النَّهْيُ عَنِ الصَّلَاةِ بَعْدَ العَصْرِ',
    ruling: 'Strictly Prohibited (Haram / Makruh Tahrimi)',
    timeWindow: 'From the moment you complete the 4 Fard Rak‘ahs of Asr until the sun sets completely at Maghrib.',
    hadithEvidence: {
      arabic: '«لاَ صَلاَةَ بَعْدَ الْعَصْرِ حَتَّى تَغْرُبَ الشَّمْسُ»',
      english: 'The Prophet ﷺ explicitly commanded: "There is no prayer after the ‘Asr prayer until the sun has set completely."',
      narrator: 'Abu Sa‘id al-Khudri (RA)',
      source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
    },
    whyForbidden: 'The Prophet ﷺ explained in Sahih Muslim (#832) that the sun sets between the two horns of Satan, and at that exact moment disbelievers and pagans prostrate to the sun. Allah forbade Muslims from praying during this interval to completely eradicate any resemblance to sun-worship and idolatry.',
    whatToPerformInstead: 'Use this sacred golden hour for the prescribed Evening Adhkar (أذكار المساء), Quran contemplation, Istighfar (seeking forgiveness), and fervent personal supplication (Du‘a). On Friday, this is Sa‘at al-Ijabah (the hour of guaranteed answer).',
  },
  {
    id: 'after-fajr',
    prayerName: 'After Fajr Prayer until Sunrise',
    arabicTitle: 'النَّهْيُ عَنِ الصَّلَاةِ بَعْدَ الصُّبْحِ',
    ruling: 'Strictly Prohibited (Haram / Makruh Tahrimi)',
    timeWindow: 'From the moment the Fard of Fajr is completed until the sun has risen above the horizon by the height of a spear (~15 to 20 minutes after sunrise).',
    hadithEvidence: {
      arabic: '«لاَ صَلاَةَ بَعْدَ الصُّبْحِ حَتَّى تَرْتَفِعَ الشَّمْسُ»',
      english: 'The Prophet ﷺ said: "There is no prayer after the dawn prayer until the sun has fully risen."',
      narrator: 'Abu Sa‘id al-Khudri (RA)',
      source: 'Sahih al-Bukhari (586), Sahih Muslim (827)',
    },
    whyForbidden: 'The sun rises between the horns of Satan, and sun-worshippers bow down to it at sunrise. The prohibition preserves pure Monotheism (Tawhid). Once 15–20 minutes pass after sunrise, the voluntary time for Salatul Ishraq and Duha opens.',
    whatToPerformInstead: 'Remain seated in your place of prayer engaged in Morning Adhkar (أذكار الصباح), Tasbih, and Quran recitation until sunrise, which earns the reward of a complete Hajj and Umrah (Tirmidhi #586).',
  },
  {
    id: 'zenith-noon',
    prayerName: 'Solar Noon (Exact Midday Zenith)',
    arabicTitle: 'حِينَ يَقُومُ قَائِمُ الظَّهِيرَةِ',
    ruling: 'Strictly Prohibited (Haram / Makruh Tahrimi)',
    timeWindow: 'The brief 5 to 10 minutes when the sun is at the absolute center of the sky before it begins to decline toward Dhuhr.',
    hadithEvidence: {
      arabic: '«ثَلاَثُ سَاعَاتٍ كَانَ رَسُولُ اللَّهِ ﷺ يَنْهَانَا أَنْ نُصَلِّيَ فِيهِنَّ... حِينَ يَقُومُ قَائِمُ الظَّهِيرَةِ حَتَّى تَمِيلَ الشَّمْسُ»',
      english: 'Uqbah ibn ‘Amir reported: "There were three times at which Allah’s Messenger ﷺ forbade us to pray or bury our dead... when the sun is at its zenith until it passes the meridian."',
      narrator: 'Uqbah ibn ‘Amir (RA)',
      source: 'Sahih Muslim (831)',
    },
    whyForbidden: 'At this moment of intense solar noon, the Hellfire is stoked and flared up (Sahih Muslim #832). Prayer pauses until the sun begins to decline, at which point the Dhuhr Adhan enters.',
    whatToPerformInstead: 'Prepare for Dhuhr prayer, perform fresh Wudu, and make silent Dhikr and Istighfar.',
  },
];

// ---------------------------------------------------------------------------
// 2. THE 12 DAILY SUNAN RAWATIB SUMMARY ("PALACE IN JANNAH")
// ---------------------------------------------------------------------------
export const twelveRawatibSummary = {
  totalRakahs: 12,
  breakdown: [
    { label: 'Before Fajr', count: 2, prayer: 'fajr', isBefore: true },
    { label: 'Before Dhuhr', count: 4, prayer: 'dhuhr', isBefore: true },
    { label: 'After Dhuhr', count: 2, prayer: 'dhuhr', isBefore: false },
    { label: 'After Maghrib', count: 2, prayer: 'maghrib', isBefore: false },
    { label: 'After Isha', count: 2, prayer: 'isha', isBefore: false },
  ],
  hadith: {
    arabic: '«مَنْ صَلَّى فِي يَوْمٍ وَلَيْلَةٍ ثِنْتَىْ عَشْرَةَ رَكْعَةً بُنِيَ لَهُ بَيْتٌ فِي الْجَنَّةِ: أَرْبَعًا قَبْلَ الظُّهْرِ، وَرَكْعَتَيْنِ بَعْدَهَا، وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ، وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ، وَرَكْعَتَيْنِ قَبْلَ صَلاَةِ الْغَدَاةِ»',
    translation: 'Whoever prays twelve Rak‘ahs during the day and night, a house will be built for him in Paradise: four before Dhuhr, two after it, two after Maghrib, two after ‘Isha, and two before the dawn prayer (Fajr).',
    narrator: 'Umm Habibah (Mother of the Believers, May Allah be pleased with her)',
    source: 'Sahih Muslim (728), Jami‘ at-Tirmidhi (415)',
  },
};

// ---------------------------------------------------------------------------
// 3. ESSENTIAL VOLUNTARY & NIGHT SUNNAH PRAYERS
// ---------------------------------------------------------------------------
export const voluntaryPrayers: VoluntaryPrayerItem[] = [
  {
    id: 'witr',
    name: 'Salat al-Witr (The Odd-Numbered Night Seal)',
    arabicName: 'صَلَاةُ الوِتْر',
    minRakahs: 1,
    recommendedRakahs: 3,
    maxRakahs: 11,
    timing: 'Any time between the post-Isha Sunnah and the first light of dawn (Fajr).',
    significance: 'The most emphasized non-obligatory prayer in Islam. The Prophet ﷺ strongly urged every Muslim never to sleep without offering it.',
    howToPerform: 'Best prayed as 3 Rak‘ahs: either 2 Rak‘ahs with Salaam then 1 single Rak‘ah, or 3 continuous Rak‘ahs with Tashahhud only at the end. In the 3rd Rak‘ah, Qunut supplication may be recited after Ruku‘.',
    hadith: {
      text: '«إِنَّ اللَّهَ وِتْرٌ يُحِبُّ الْوِتْرَ، فَأَوْتِرُوا يَا أَهْلَ الْقُرْآنِ»\n"Indeed Allah is One (Witr) and loves what is odd-numbered, so pray Witr, O people of the Quran."',
      source: 'Sunan Abi Dawud (1416), Jami‘ at-Tirmidhi (453) · Sahih',
    },
  },
  {
    id: 'duha',
    name: 'Salat ad-Duha / Chasht (Mid-Morning Prayer)',
    arabicName: 'صَلَاةُ الضُّحَى',
    minRakahs: 2,
    recommendedRakahs: 4,
    maxRakahs: 8,
    timing: 'Begins ~15-20 minutes after sunrise when the sun reaches spear-height, and ends ~15 minutes before Dhuhr (solar noon).',
    significance: 'Fulfills the daily charity (Sadaqah) owed on behalf of every single joint and bone in the human body (all 360 joints).',
    howToPerform: 'Prayed in sets of 2 Rak‘ahs with peaceful reflection. The prime time is when the heat of the morning begins to intensify (Salat al-Awwabin).',
    hadith: {
      text: '«يُصْبِحُ عَلَى كُلِّ سُلاَمَى مِنْ أَحَدِكُمْ صَدَقَةٌ... وَيُجْزِئُ مِنْ ذَلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى»\n"Every morning, charity is due for every joint in your body... and two Rak‘ahs prayed at Duha suffices for all of that."',
      source: 'Sahih Muslim (720)',
    },
  },
  {
    id: 'tahajjud',
    name: 'Tahajjud & Qiyam al-Layl (Night Vigil)',
    arabicName: 'صَلَاةُ التَّهَجُّدِ وَقِيَامُ اللَّيْل',
    minRakahs: 2,
    recommendedRakahs: 8,
    timing: 'The last third of the night before the dawn Adhan (when divine descent occurs).',
    significance: 'The crown of all devotional acts. Prayers made at this time are like an arrow that never misses its target.',
    howToPerform: 'Wake from sleep, perform fresh Wudu, use the Siwak, and pray in peaceful sets of 2 Rak‘ahs, finishing with 1 or 3 Rak‘ahs of Witr.',
    hadith: {
      text: '«يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ فَيَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ»\n"Our Lord descends every night to the nearest heaven during the last third of the night, saying: Who calls upon Me that I may answer him?"',
      source: 'Sahih al-Bukhari (1145), Sahih Muslim (758)',
    },
  },
  {
    id: 'tahiyyat-al-masjid',
    name: 'Tahiyyat al-Masjid (Greeting the Mosque)',
    arabicName: 'تَحِيَّةُ المَسْجِد',
    minRakahs: 2,
    recommendedRakahs: 2,
    timing: 'Upon entering any masjid, before sitting down on the carpet.',
    significance: 'An established Sunnah honoring the house of Allah.',
    howToPerform: 'Offer 2 quick, respectful Rak‘ahs before sitting to listen or wait for the Adhan.',
    hadith: {
      text: '«إِذَا دَخَلَ أَحَدُكُمُ الْمَسْجِدَ فَلاَ يَجْلِسْ حَتَّى يُصَلِّيَ رَكْعَتَيْنِ»\n"When one of you enters the mosque, let him not sit down until he has prayed two Rak‘ahs."',
      source: 'Sahih al-Bukhari (444), Sahih Muslim (714)',
    },
  },
  {
    id: 'sunnah-wudu',
    name: 'Sunnah of Wudu (Salat Sunnat al-Wudu)',
    arabicName: 'سُنَّةُ الوُضُوء',
    minRakahs: 2,
    recommendedRakahs: 2,
    timing: 'Immediately following the completion of full ablution (Wudu).',
    significance: 'The secret practice of Bilal ibn Rabah (RA) by which the Prophet ﷺ heard his footsteps ahead in Paradise.',
    howToPerform: 'Pray 2 focused Rak‘ahs without letting worldly thoughts distract the mind.',
    hadith: {
      text: '«مَا مِنْ أَحَدٍ يَتَوَضَّأُ فَيُحْسِنُ الْوُضُوءَ وَيُصَلِّي رَكْعَتَيْنِ يُقْبِلُ عَلَيْهِمَا بِقَلْبِهِ وَوَجْهِهِ إِلاَّ وَجَبَتْ لَهُ الْجَنَّةُ»\n"No one performs Wudu well and then prays two Rak‘ahs with full focus of heart and face, except that Paradise becomes guaranteed for him."',
      source: 'Sahih Muslim (234)',
    },
  },
  {
    id: 'istikhara',
    name: 'Salat al-Istikhara (Seeking Divine Counsel)',
    arabicName: 'صَلَاةُ الاِسْتِخَارَة',
    minRakahs: 2,
    recommendedRakahs: 2,
    timing: 'Whenever facing an important life decision (marriage, career, moving, major purchase).',
    significance: 'Surrendering your limited human intellect to the infinite wisdom of the All-Knowing Creator.',
    howToPerform: 'Pray 2 non-obligatory Rak‘ahs, then recite the famous prophetic Du‘a of Istikhara with sincere heart.',
    hadith: {
      text: '«كَانَ رَسُولُ اللَّهِ ﷺ يُعَلِّمُنَا الاِسْتِخَارَةَ فِي الأُمُورِ كُلِّهَا كَمَا يُعَلِّمُنَا السُّورَةَ مِنَ الْقُرْآنِ»\n"The Messenger of Allah ﷺ used to teach us Istikhara in all matters just as he would teach us a Surah from the Quran."',
      source: 'Sahih al-Bukhari (1162)',
    },
  },
];

// ---------------------------------------------------------------------------
// 4. PROPHETIC FASTING CALENDAR & SCHEDULE (SAWM AS-SUNNAH)
// ---------------------------------------------------------------------------
export const fastingSunan: FastingSunnahItem[] = [
  {
    id: 'monday-thursday',
    name: 'Mondays and Thursdays (Weekly Prophetic Fast)',
    arabicName: 'صِيَامُ الاِثْنَيْنِ وَالخَمِيس',
    frequency: 'weekly',
    timingDescription: 'Every Monday and Thursday throughout the entire year (except on Eid days).',
    whyFast: 'These are the two weekly days when all human deeds are raised and audited before the Lord of the worlds, and the Prophet ﷺ loved to have his deeds presented in a state of fasting.',
    virtueAndReward: 'Forgiveness of weekly sins, rejuvenation of body and mind, and adherence to the Prophet’s lifelong weekly rhythm.',
    hadith: {
      text: '«تُعْرَضُ الأَعْمَالُ يَوْمَ الاِثْنَيْنِ وَالْخَمِيسِ، فَأُحِبُّ أَنْ يُعْرَضَ عَمَلِي وَأَنَا صَائِمٌ»\n"Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting."',
      source: 'Jami‘ at-Tirmidhi (747) · Hasan',
    },
    specialSunnahActions: [
      'Make the intention (Niyyah) from the night before or before solar noon if no food was eaten.',
      'Wake for Suhoor even with a date or a sip of water.',
      'Hasten to break the fast at Maghrib with dates and recite the prophetic Iftar Du‘a.',
    ],
  },
  {
    id: 'white-days',
    name: 'The White Days (Ayyam al-Beed — 13th, 14th, 15th)',
    arabicName: 'صِيَامُ الأَيَّامِ البِيض (١٣، ١٤، ١٥)',
    frequency: 'monthly',
    timingDescription: 'The 13th, 14th, and 15th of every lunar Hijri month, when the full moon illuminates the night.',
    whyFast: 'Because every good deed is multiplied tenfold, fasting three days each month equals fasting thirty days—thus fasting the entire lifetime continuously!',
    virtueAndReward: 'Equivalent in spiritual reward to fasting throughout every single day of the year without interruption.',
    hadith: {
      text: '«صِيَامُ ثَلاَثَةِ أَيَّامٍ مِنْ كُلِّ شَهْرٍ صِيَامُ الدَّهْرِ كُلِّهِ: ثَلاَثَ عَشْرَةَ، وَأَرْبَعَ عَشْرَةَ، وَخَمْسَ عَشْرَةَ»\n"Fasting three days of every month is equivalent to fasting the entire year: the thirteenth, fourteenth, and fifteenth."',
      source: 'Sunan an-Nasa’i (2418), Sunan Abi Dawud (2449) · Sahih',
    },
    specialSunnahActions: [
      'Check the lunar Hijri calendar at the beginning of each Islamic month.',
      'If you miss one of the three days due to travel or sickness, you may substitute another day in that month.',
    ],
  },
  {
    id: 'arafah',
    name: 'Day of Arafah (9th of Dhul Hijjah)',
    arabicName: 'صِيَامُ يَوْمِ عَرَفَة (٩ ذُو الحِجَّة)',
    frequency: 'annual',
    timingDescription: 'The 9th day of the sacred month of Dhul Hijjah, the pinnacle day of the Hajj pilgrimage.',
    whyFast: 'For those not performing Hajj, it is the single most virtuous voluntary fast of the entire Islamic calendar year.',
    virtueAndReward: 'Expiates all minor sins committed in the preceding year and the upcoming year (2 whole years forgiven)!',
    hadith: {
      text: '«صِيَامُ يَوْمِ عَرَفَةَ أَحْتَسِبُ عَلَى اللَّهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ وَالسَّنَةَ الَّتِي بَعْدَهُ»\n"Fasting on the Day of ‘Arafah, I hope from Allah that it expiates the sins of the year before it and the year after it."',
      source: 'Sahih Muslim (1162)',
    },
    specialSunnahActions: [
      'Fast for those not performing Hajj (the pilgrims at Arafah do not fast so they maintain strength for supplication).',
      'Make abundant Du‘a, especially: «لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ».',
    ],
  },
  {
    id: 'ashura',
    name: 'Day of Ashura & Tasu‘a (9th & 10th of Muharram)',
    arabicName: 'صِيَامُ عَاشُورَاء وَتَاسُوعَاء (٩ وَ ١٠ مُحَرَّم)',
    frequency: 'annual',
    timingDescription: 'The 10th of Muharram (Ashura), preferably accompanied by the 9th (Tasu‘a) or the 11th.',
    whyFast: 'Commemorating the day Allah parted the Red Sea for Prophet Musa (Moses) and saved the Children of Israel from Pharaoh’s tyranny.',
    virtueAndReward: 'Expiates all minor sins committed in the past year.',
    hadith: {
      text: '«صِيَامُ يَوْمِ عَاشُورَاءَ أَحْتَسِبُ عَلَى اللَّهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ»\n"Fasting the Day of ‘Ashura, I hope from Allah that it expiates the year that came before it."',
      source: 'Sahih Muslim (1162)',
    },
    specialSunnahActions: [
      'It is Sunnah to pair the 10th with the 9th of Muharram to distinguish Islamic practice.',
      'Reflect on the triumph of faith over tyranny and the miraculous splitting of the sea.',
    ],
  },
  {
    id: 'shawwal',
    name: 'Six Days of Shawwal',
    arabicName: 'سِتَّةُ أَيَّامٍ مِنْ شَوَّال',
    frequency: 'annual',
    timingDescription: 'Any six days during the month of Shawwal (immediately following the Day of Eid al-Fitr).',
    whyFast: 'Ramadan (30 days) multiplied by ten equals 300 days of reward; 6 days of Shawwal multiplied by ten equals 60 days of reward—totaling 360 days (a full year)!',
    virtueAndReward: 'Carries the immense reward of fasting an entire uninterrupted year of life.',
    hadith: {
      text: '«مَنْ صَامَ رَمَضَانَ ثُمَّ أَتْبَعَهُ سِتًّا مِنْ شَوَّالٍ كَانَ كَصِيَامِ الدَّهْرِ»\n"Whoever fasts Ramadan and follows it with six days from Shawwal, it is as if he fasted for a lifetime."',
      source: 'Sahih Muslim (1164)',
    },
    specialSunnahActions: [
      'May be fasted consecutively (6 days in a row) or intermittently spread throughout the month.',
      'If you have missed days from Ramadan, scholars recommend making up the obligatory days first.',
    ],
  },
  {
    id: 'first-nine-dhul-hijjah',
    name: 'The First Nine Days of Dhul Hijjah',
    arabicName: 'تِسْعُ ذِي الحِجَّة',
    frequency: 'annual',
    timingDescription: 'The 1st through the 9th of Dhul Hijjah (the ten greatest days of the year).',
    whyFast: 'No deeds are beloved to Allah in any season more than righteous deeds during the first ten days of Dhul Hijjah.',
    virtueAndReward: 'Fasting these days is among the noblest deeds during the sacred peak of the Islamic calendar.',
    hadith: {
      text: '«مَا مِنْ أَيَّامٍ الْعَمَلُ الصَّالِحُ فِيهَا أَحَبُّ إِلَى اللَّهِ مِنْ هَذِهِ الأَيَّامِ» يَعْنِي أَيَّامَ الْعَشْرِ\n"There are no days in which righteous deeds are more beloved to Allah than these ten days."',
      source: 'Sahih al-Bukhari (969)',
    },
    specialSunnahActions: [
      'Combine fasting with abundant Takbir (Allahu Akbar), Tahmid (Alhamdulillah), and Tahlil (La ilaha illallah).',
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. PROHIBITED & DISLIKED FASTING DAYS (CLEAR BOUNDARIES)
// ---------------------------------------------------------------------------
export const prohibitedFastingDays = [
  {
    day: 'The Two Eid Days (Eid al-Fitr & Eid al-Adha)',
    ruling: 'Strictly Haram (Forbidden)',
    explanation: 'The Prophet ﷺ expressly forbade fasting on the Day of Eid al-Fitr (celebration of concluding Ramadan) and the Day of Eid al-Adha (Day of Sacrifice). They are divine feasts from Allah for humanity.',
    hadith: 'Sahih al-Bukhari (1995), Sahih Muslim (1138)',
  },
  {
    day: 'The Days of Tashreeq (11th, 12th, 13th of Dhul Hijjah)',
    ruling: 'Strictly Haram (Forbidden for non-pilgrims without Hady)',
    explanation: 'The Prophet ﷺ said: "The days of Tashreeq are days of eating, drinking, and remembering Allah."',
    hadith: 'Sahih Muslim (1141)',
  },
  {
    day: 'Isolating Friday Alone for Voluntary Fasting',
    ruling: 'Makruh (Disliked) unless preceded or followed by another day',
    explanation: 'Friday is the weekly holiday for Muslims. Do not single it out for fasting unless you fast Thursday before it or Saturday after it, or it coincides with a habitual fast (like Arafah or White Days).',
    hadith: 'Sahih al-Bukhari (1985), Sahih Muslim (1144)',
  },
  {
    day: 'Fasting the Day of Doubt (30th Sha‘ban)',
    ruling: 'Prohibited / Disliked',
    explanation: 'Fasting the day before Ramadan out of anticipation or doubt is forbidden unless it coincides with one’s habitual Monday/Thursday fast.',
    hadith: 'Sahih al-Bukhari (1914)',
  },
];

// ---------------------------------------------------------------------------
// 6. SUHOOR & IFTAR SUNNAHS & PROPHETIC SUPPLICATIONS
// ---------------------------------------------------------------------------
export const fastingEtiquettes = {
  suhoor: {
    title: 'The Blessing of Suhoor (Pre-Dawn Meal)',
    sunan: [
      'Do not skip Suhoor, even if only with a single date or a sip of water.',
      'Delay Suhoor until the last portion of the night before true dawn.',
      'Make intention (Niyyah) in the heart before Fajr enters.',
    ],
    hadith: '«تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً» — "Take Suhoor, for indeed in Suhoor there is divine blessing." (Bukhari & Muslim)',
  },
  iftar: {
    title: 'The Sunnah of Breaking the Fast (Iftar)',
    sunan: [
      'Hasten to break the fast as soon as the Maghrib Adhan enters (do not delay).',
      'Break fast with fresh ripe dates (Rutab), dry dates (Tamr), or pure water.',
      'Supplicate at the moment of breaking fast, as the fasting person’s prayer is never rejected.',
    ],
    duaArabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    duaTransliteration: 'Dhahaba aẓ-ẓama’u wa-ibtallat al-‘urūqu wa-thabata al-ajru in shā’ Allāh',
    duaTranslation: 'The thirst has vanished, the veins have been moistened, and the reward is firmly established, if Allah wills.',
    hadith: 'Sunan Abi Dawud (2357) · Hasan',
  },
};

// ---------------------------------------------------------------------------
// 7. DAILY PROPHETIC LIFESTYLE & HABIT SUNNAHS
// ---------------------------------------------------------------------------
export const lifestyleSunan: LifestyleSunnahItem[] = [
  {
    id: 'siwak',
    category: 'grooming-siwak',
    title: 'Using the Siwak (Natural Toothstick)',
    arabicSnippet: 'السِّوَاك مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ',
    description: 'Purifying the teeth and mouth with the Arak root, especially before every prayer, upon entering the house, and upon waking.',
    practicalSteps: [
      'Use the Siwak before performing Wudu and before standing for prayer.',
      'Clean from right to left across teeth and tongue.',
      'Keeps breath pure and pleases the Lord.',
    ],
    hadithCitation: 'Sahih al-Bukhari (887), Sahih Muslim (252)',
  },
  {
    id: 'right-hand-drinking',
    category: 'eating-drinking',
    title: 'Drinking Sitting Down in Three Breaths with Right Hand',
    arabicSnippet: 'سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ',
    description: 'The Prophet ﷺ taught mindful, dignified eating and drinking that protects the stomach and cultivates gratitude.',
    practicalSteps: [
      'Sit down before drinking a glass of water.',
      'Hold the cup in the right hand and recite "Bismillah".',
      'Drink in three distinct sips, pausing to breathe outside the cup.',
      'Say "Alhamdulillah" upon finishing.',
    ],
    hadithCitation: 'Sahih al-Bukhari (5376), Sahih Muslim (2022)',
  },
  {
    id: 'sleep-sunnah',
    category: 'sleep',
    title: 'The Sleeping Routine of the Prophet ﷺ',
    arabicSnippet: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ',
    description: 'Transforming one third of your life (sleep) into continuous worship and spiritual protection.',
    practicalSteps: [
      'Perform full Wudu before entering bed.',
      'Dust the bedsheet three times with the edge of your garment.',
      'Sleep on the right side with the right hand under the cheek.',
      'Recite Ayat al-Kursi and cup hands to recite Surah Al-Ikhlas, Al-Falaq, and An-Nas, blowing into them and wiping the body three times.',
      'Recite the prophetic bedtime Du‘a: "Bismika Rabbi wada‘tu janbi..."',
    ],
    hadithCitation: 'Sahih al-Bukhari (6320), Sahih Muslim (2714)',
  },
  {
    id: 'smile-charity',
    category: 'speech-social',
    title: 'Smiling & Radiating Warmth to All People',
    arabicSnippet: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    description: 'The Prophet ﷺ was described as the most frequently smiling human being who ever lived, radiating light and reassurance.',
    practicalSteps: [
      'Smile genuinely when greeting your family, colleagues, and strangers.',
      'Never look down upon any small act of kindness.',
      'Treat cheerfulness as a zero-cost act of ongoing charity.',
    ],
    hadithCitation: 'Jami‘ at-Tirmidhi (1956) · Sahih',
  },
  {
    id: 'initiating-salam',
    category: 'speech-social',
    title: 'Initiating Salam (Spreading Peace)',
    arabicSnippet: 'أَفْشُوا السَّلاَمَ بَيْنَكُمْ تَحَابُّوا',
    description: 'Greeting those you know and those you do not know with the complete greeting of peace: "As-salamu alaykum wa rahmatullahi wa barakatuh".',
    practicalSteps: [
      'Be the first to greet others when entering a room or passing someone on the street.',
      'The younger greets the elder; the walking greets the seated; the small group greets the large.',
      'Replaces coldness with mutual love and softens hearts.',
    ],
    hadithCitation: 'Sahih Muslim (54), Sahih al-Bukhari (12)',
  },
  {
    id: 'istighfar-daily',
    category: 'remembrance',
    title: 'Seeking Forgiveness 70 to 100+ Times Daily',
    arabicSnippet: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    description: 'Even though his past and future sins were forgiven, the Messenger of Allah ﷺ sought repentance more than 70 to 100 times every single day.',
    practicalSteps: [
      'Make a habit of saying "Astaghfirullah wa atubu ilayh" while walking, commuting, or resting.',
      'Brings barakah into sustenance, relieves anxiety, and washes away heedlessness.',
    ],
    hadithCitation: 'Sahih al-Bukhari (6307), Sahih Muslim (2702)',
  },
];

// ---------------------------------------------------------------------------
// 8. HELPER CALCULATOR: UPCOMING SUNNAH FAST
// ---------------------------------------------------------------------------
export function getNextSunnahFastInfo(): {
  isTodayFastDay: boolean;
  fastName: string;
  nextDayName: string;
  daysRemaining: number;
  reason: string;
} {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday, ...

  if (dayOfWeek === 1) {
    return {
      isTodayFastDay: true,
      fastName: 'Monday Sunnah Fast',
      nextDayName: 'Today (Monday)',
      daysRemaining: 0,
      reason: 'The Prophet ﷺ was born on Monday and received his first revelation on Monday. Deeds are raised to Allah today.',
    };
  }

  if (dayOfWeek === 4) {
    return {
      isTodayFastDay: true,
      fastName: 'Thursday Sunnah Fast',
      nextDayName: 'Today (Thursday)',
      daysRemaining: 0,
      reason: 'Weekly presentation of deeds before Allah. The Prophet loved having his deeds raised while fasting.',
    };
  }

  // Calculate days until next Monday (1) or Thursday (4)
  let daysToMonday = (1 - dayOfWeek + 7) % 7;
  let daysToThursday = (4 - dayOfWeek + 7) % 7;

  if (daysToMonday === 0) daysToMonday = 7;
  if (daysToThursday === 0) daysToThursday = 7;

  if (daysToMonday < daysToThursday) {
    return {
      isTodayFastDay: false,
      fastName: 'Monday Sunnah Fast',
      nextDayName: 'Monday',
      daysRemaining: daysToMonday,
      reason: 'The weekly fast of presentation of deeds and the day of the Prophet’s birth.',
    };
  } else {
    return {
      isTodayFastDay: false,
      fastName: 'Thursday Sunnah Fast',
      nextDayName: 'Thursday',
      daysRemaining: daysToThursday,
      reason: 'Weekly audit of deeds before Allah; recommended weekly sunnah.',
    };
  }
}
