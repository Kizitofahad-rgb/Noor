/**
 * Daily Prophetic Conduct & Reconciliation with Allah (هدي النبي ﷺ في أيام الأسبوع والتوبة)
 *
 * Grounded exclusively in authentic Hadith (Sahih al-Bukhari, Sahih Muslim, Jami' at-Tirmidhi,
 * Sunan Abu Dawud, Musnad Ahmad, Al-Adab al-Mufrad) and the Holy Quran.
 *
 * Addresses how Prophet Muhammad ﷺ conducted himself on specific days of the week,
 * what Allah expects from a servant on each day, and the exact divine medicine
 * when a servant has wronged their Lord and seeks to return with sincerity.
 */

export interface DailyPropheticConduct {
  dayIndex: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  englishDay: string;
  arabicDay: string;
  transliterationDay: string;
  propheticTitle: string;
  arabicTitle: string;
  spiritualTheme: string;
  propheticConductSummary: string;
  primaryHadith: {
    arabicSnippet?: string;
    englishNarrative: string;
    citation: string;
    narrator: string;
  };
  secondaryHadith?: {
    englishNarrative: string;
    citation: string;
  };
  whatAllahExpectsToday: string;
  ifYouHaveWrongedYourLord: {
    headline: string;
    explanation: string;
    quranicRemedy: {
      verseArabic: string;
      verseTranslation: string;
      citation: string;
    };
    actionableSpiritualPrescription: string;
  };
  daySunanChecklist: {
    id: string;
    label: string;
    source: string;
    isPrimarySunnah?: boolean;
  }[];
  specialDuaOfToday: {
    title: string;
    arabic: string;
    transliteration: string;
    translation: string;
    source: string;
  };
}

export const weeklyPropheticConduct: DailyPropheticConduct[] = [
  // 0. Sunday (يوم الأحد - Yawm al-Ahad)
  {
    dayIndex: 0,
    englishDay: 'Sunday',
    arabicDay: 'يَوْمُ الأَحَد',
    transliterationDay: 'Yawm al-Ahad',
    propheticTitle: 'Day of Spiritual Reset, Contemplation & Salat al-Tawbah',
    arabicTitle: 'يَوْمُ الْمُحَاسَبَةِ وَصَلَاةِ التَّوْبَةِ',
    spiritualTheme: 'Starting the Week with a Pure Heart & Renewed Intention',
    propheticConductSummary:
      'The Prophet ﷺ made sincere self-accounting (Muhasabah) and repentance a living, daily habit. As the cycle of the week resets, the believer enters it not with the weight of past mistakes, but with the boundless hope of renewal. If you feel you have wronged Allah in recent days, this day is for the two rak’ahs of repentance (Salat al-Tawbah) that wipe the slate clean.',
    primaryHadith: {
      arabicSnippet: 'مَا مِنْ رَجُلٍ يُذْنِبُ ذَنْبًا ثُمَّ يَتَطَهَّرُ فَيُحْسِنُ الطُّهُورَ ثُمَّ يُصَلِّي رَكْعَتَيْنِ ثُمَّ يَسْتَغْفِرُ اللَّهَ إِلَّا غَفَرَ اللَّهُ لَهُ',
      englishNarrative:
        'Sayyiduna Abu Bakr as-Siddiq (RA) reported that the Prophet ﷺ said: "There is no servant who commits a sin, then purifies himself with wudu in the best manner, then stands and prays two rak’ahs, and then asks Allah for forgiveness, except that Allah forgives him." Then the Prophet ﷺ recited the verse: "And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins..." (Surah Ali ‘Imran 3:135).',
      citation: 'Sunan Abu Dawud #1521 · Jami` at-Tirmidhi #406 (Sahih by Al-Albani)',
      narrator: 'Sayyiduna Abu Bakr as-Siddiq (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "Every son of Adam commits sins, and the best of sinners are those who constantly repent." (Sunan Ibn Majah #4251, Hasan).',
      citation: 'Sunan Ibn Majah #4251 · Jami` at-Tirmidhi #2499',
    },
    whatAllahExpectsToday:
      'Allah does not expect perfection from you; He expects that when you fall, you immediately turn back to Him with regret rather than running away in despair. Clear any accumulated heaviness from your chest before entering the week.',
    ifYouHaveWrongedYourLord: {
      headline: 'Perform the Sunnah of Salat al-Tawbah (2 Rak’ahs of Renewal)',
      explanation:
        'When you feel you have wronged your Lord, Satan whispers that you are unworthy to pray. The Sunnah teaches the exact opposite: get up right now, perform a calm, mindful wudu, stand for two quiet rak’ahs where no one sees you, and pour your tearful regret to Allah. The moment you finish, know that your Lord is At-Tawwab (The Perpetual Accepter of Repentance).',
      quranicRemedy: {
        verseArabic: 'وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ وَمَن يَغْفِرُ الذُّنُوبَ إِلَّا اللَّهُ',
        verseTranslation:
          'And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins—and who can forgive sins except Allah? And they do not persist in what they have done while they know.',
        citation: 'Surah Ali ‘Imran (3:135)',
      },
      actionableSpiritualPrescription:
        'Pray 2 Rak’ahs of Salat al-Tawbah today. After the Taslim, sit on your prayer rug and recite Sayyid al-Istighfar. Then give secret charity (Sadaqah)—even a single meal or dollar—because secret charity extinguishes the anger of the Lord.',
    },
    daySunanChecklist: [
      { id: 'sun-tawbah-prayer', label: 'Pray 2 Rak’ahs of Salat al-Tawbah in quiet privacy', source: 'Abu Dawud #1521', isPrimarySunnah: true },
      { id: 'sun-secret-sadaqah', label: 'Give secret Sadaqah to extinguish the error', source: 'Sahih al-Jami #3759' },
      { id: 'sun-renew-niyyah', label: 'Renew your Niyyah (intention) for the upcoming week', source: 'Bukhari #1' },
      { id: 'sun-recite-aliimran', label: 'Reflect upon Surah Ali ‘Imran (3:135-136)', source: 'Quran (3:135)' },
    ],
    specialDuaOfToday: {
      title: 'Sayyid al-Istighfar (The Master of All Prayers for Forgiveness)',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      transliteration:
        'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana ‘abduka, wa ana ‘ala ‘ahdika wa wa’dika ma-stata’tu, a’udhu bika min sharri ma sana’tu, abu’u laka bi ni’matika ‘alayya, wa abu’u bi dhanbi faghfir li, fa innahu la yaghfiru-dh-dhunuba illa Ant.',
      translation:
        '"O Allah, You are my Lord; there is no deity worthy of worship except You. You created me and I am Your servant, and I uphold Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessing upon me, and I confess to You my sin. So forgive me, for none forgives sins except You."',
      source: 'Sahih al-Bukhari #6306 (Whoever says it with conviction and dies that day enters Paradise)',
    },
  },

  // 1. Monday (يَوْمُ الاِثْنَيْنِ - Yawm al-Ithnayn)
  {
    dayIndex: 1,
    englishDay: 'Monday',
    arabicDay: 'يَوْمُ الاِثْنَيْنِ',
    transliterationDay: 'Yawm al-Ithnayn',
    propheticTitle: 'Day of Fasting, Revelation & Presentation of Deeds to Allah',
    arabicTitle: 'يَوْمُ الصِّيَامِ وَعَرْضِ الأَعْمَالِ عَلَى اللَّهِ',
    spiritualTheme: 'Presentation of Your Deeds & Erasing Enmity Before the Divine Court',
    propheticConductSummary:
      'Monday held an extraordinarily intimate place in the life of Prophet Muhammad ﷺ. He fasted Mondays religiously. When asked why, he responded: "That is the day on which I was born, and the day on which revelation was first sent down to me." Furthermore, on Mondays, the gates of Paradise are opened and deeds are presented before Allah the Almighty.',
    primaryHadith: {
      arabicSnippet: 'تُعْرَضُ الأَعْمَالُ يَوْمَ الاِثْنَيْنِ وَالْخَمِيسِ فَأُحِبُّ أَنْ يُعْرَضَ عَمَلِي وَأَنَا صَائِمٌ',
      englishNarrative:
        'Abu Hurairah (RA) reported that the Messenger of Allah ﷺ said: "Deeds are presented on Mondays and Thursdays, and I love that my deeds be presented while I am fasting."',
      citation: 'Jami` at-Tirmidhi #747 · Sahih at-Tirmidhi (Hasan Sahih)',
      narrator: 'Sayyiduna Abu Hurairah (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "The gates of Paradise are opened on Mondays and Thursdays, and every servant who does not associate partners with Allah is forgiven, except a man between whom and his brother there is enmity. It is said: ‘Postpone these two until they reconcile!’" (Sahih Muslim #2565).',
      citation: 'Sahih Muslim #2565',
    },
    whatAllahExpectsToday:
      'Allah expects your deeds to ascend without the toxic contamination of anger, grudges, or arrogance. He expects you to seek forgiveness before your weekly actions are presented to His Throne.',
    ifYouHaveWrongedYourLord: {
      headline: 'Fast or Reconcile: Let No Sin or Grudge Block Your Deeds Today',
      explanation:
        'If you have wronged your Lord, Monday carries a monumental warning and a magnificent blessing: Allah forgives all servants who repent, but holds back forgiveness from those harboring hatred against another person. If you wronged Allah, seek His pardon now; and if you wronged a fellow human or have cut off a brother or sister, send them a message of peace today so your repentance is not delayed at the gates of Heaven.',
      quranicRemedy: {
        verseArabic: 'إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلذَّاكِرِينَ',
        verseTranslation:
          'Indeed, good deeds do away with misdeeds. That is a reminder for those who remember.',
        citation: 'Surah Hud (11:114)',
      },
      actionableSpiritualPrescription:
        'If you are able, observe voluntary fasting today. If not, fast from vain speech and backbiting. Reach out to anyone you have harbored bitterness against and say: "May Allah forgive us both." Follow your past mistake with an intentional act of goodness to wipe it out.',
    },
    daySunanChecklist: [
      { id: 'mon-fasting', label: 'Observe the voluntary Sunnah fast of Monday', source: 'Sahih Muslim #1162', isPrimarySunnah: true },
      { id: 'mon-reconcile-enmity', label: 'Clear all grudges and reconcile with someone (deeds ascend today)', source: 'Sahih Muslim #2565', isPrimarySunnah: true },
      { id: 'mon-quran-reflection', label: 'Reflect upon the Quran (Revelation began on a Monday)', source: 'Sahih Muslim #1162' },
      { id: 'mon-salawat', label: 'Send frequent Salawat upon the Prophet ﷺ in gratitude for his birth', source: 'Abu Dawud #1047' },
    ],
    specialDuaOfToday: {
      title: 'Du’a of Yunus (AS) — Relief from the Darkness of Transgression',
      arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      transliteration: 'La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.',
      translation:
        '"There is no deity worthy of worship except You; exalted are You! Indeed, I have been of the wrongdoers."',
      source: 'Surah Al-Anbiya (21:87) · Jami` at-Tirmidhi #3505 (No Muslim supplicates with it except Allah answers)',
    },
  },

  // 2. Tuesday (يَوْمُ الثُّلَاثَاءِ - Yawm ath-Thulatha')
  {
    dayIndex: 2,
    englishDay: 'Tuesday',
    arabicDay: 'يَوْمُ الثُّلَاثَاءِ',
    transliterationDay: 'Yawm ath-Thulatha’',
    propheticTitle: 'Day of Persistent Daily Istighfar (70–100 Times) & Diligence',
    arabicTitle: 'يَوْمُ الْمُوَاظَبَةِ عَلَى الاِسْتِغْفَارِ وَالسَّعْيِ',
    spiritualTheme: 'Relentless Return to Allah in the Midst of Worldly Labor',
    propheticConductSummary:
      'Midweek often brings fatigue, distraction, and the friction of interacting with people in work, trade, and errands—where lapses in patience, gaze, or speech occur. The Prophet ﷺ demonstrated that spiritual devotion does not require retreating from society. In the midst of ordinary days, his tongue remained moist with repentance more than 70 to 100 times every single day.',
    primaryHadith: {
      arabicSnippet: 'وَاللَّهِ إِنِّي لأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً',
      englishNarrative:
        'Abu Hurairah (RA) reported: "I heard the Messenger of Allah ﷺ say: ‘By Allah, I seek Allah’s forgiveness and turn to Him in repentance more than seventy times a day.’" In Sahih Muslim, the Prophet ﷺ said: "O people, repent to Allah and seek His forgiveness, for I repent to Him one hundred times a day."',
      citation: 'Sahih al-Bukhari #6307 · Sahih Muslim #2702',
      narrator: 'Sayyiduna Abu Hurairah & Sayyiduna Al-Agharr al-Muzani (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'Mu’adh ibn Jabal (RA) reported that the Prophet ﷺ said: "Fear Allah wherever you are, follow up a bad deed with a good deed and it will wipe it out, and behave with people in a noble character." (Jami` at-Tirmidhi #1987, Hasan Sahih).',
      citation: 'Jami` at-Tirmidhi #1987',
    },
    whatAllahExpectsToday:
      'Allah expects your work, school, and daily chores to be infused with mindfulness (Taqwa). When a mistake happens in your day, do not let it fester—extinguish it immediately with an act of charity, kindness, or istighfar.',
    ifYouHaveWrongedYourLord: {
      headline: 'The Golden Prophetic Rule: Follow Every Bad Deed with a Good Deed',
      explanation:
        'Did you slip into backbiting, loss of temper, or an unlawful glance today? Do not stay trapped in guilt. The Prophet’s ﷺ explicit remedy is immediate counterbalance: "Follow a bad deed with a good deed and it will wipe it out." If your tongue slipped, use it right now to say SubhanAllah 33 times. If your hands transgressed, give charity or help someone carry their burden.',
      quranicRemedy: {
        verseArabic: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
        verseTranslation:
          'And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah will find Allah Forgiving and Merciful.',
        citation: 'Surah An-Nisa (4:110)',
      },
      actionableSpiritualPrescription:
        'Set your tasbih counter to 100 today. Complete 100 deliberate Istighfars ("Astaghfirullah wa atubu ilayh") while commuting or during breaks. Whenever you catch yourself in a wrongful thought or slip, instantly offer a counter-deed.',
    },
    daySunanChecklist: [
      { id: 'tue-istighfar-100', label: 'Complete 100 Istighfars as the Prophet ﷺ did every day', source: 'Sahih Muslim #2702', isPrimarySunnah: true },
      { id: 'tue-wipe-bad-with-good', label: 'Wipe away any mistake immediately with a good deed', source: 'Tirmidhi #1987', isPrimarySunnah: true },
      { id: 'tue-guard-tongue', label: 'Guard your tongue from harshness, sarcasm, and gossip', source: 'Bukhari #10' },
      { id: 'tue-honest-work', label: 'Infuse your worldly trade or study with honest intention', source: 'Bukhari #2072' },
    ],
    specialDuaOfToday: {
      title: 'Du’a for Seeking Forgiveness for Known & Unintentional Sins',
      arabic: 'اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي، اللَّهُمَّ اغْفِرْ لِي جِدِّي وَهَزْلِي، وَخَطَئِي وَعَمْدِي، وَكُلُّ ذَلِكَ عِنْدِي',
      transliteration:
        'Allahumma-ghfir li khati’ati wa jahli, wa israfi fi amri, wa ma Anta a’lamu bihi minni. Allahumma-ghfir li jiddi wa hazli, wa khata’i wa ‘amdi, wa kullu dhalika ‘indi.',
      translation:
        '"O Allah, forgive me my error, my ignorance, my excesses in my affairs, and what You know better than me. O Allah, forgive me what I did in earnest and in jest, mistakenly and deliberately, and all of that is in me."',
      source: 'Sahih al-Bukhari #6398 · Sahih Muslim #2719',
    },
  },

  // 3. Wednesday (يَوْمُ الأَرْبِعَاءِ - Yawm al-Arbi'a')
  {
    dayIndex: 3,
    englishDay: 'Wednesday',
    arabicDay: 'يَوْمُ الأَرْبِعَاءِ',
    transliterationDay: 'Yawm al-Arbi‘a’',
    propheticTitle: 'Day of Answered Supplication Between Dhuhr & Asr (ساعة الإجابة)',
    arabicTitle: 'يَوْمُ الدُّعَاءِ الْمُسْتَجَابِ بَيْنَ الظُّهْرِ وَالْعَصْرِ',
    spiritualTheme: 'Pouring Out Your Soul in the Sacred Midweek Window of Acceptance',
    propheticConductSummary:
      'A profound, often overlooked Sunnah: Jabir ibn Abdillah (RA) documented that the Prophet ﷺ supplicated to Allah during the Battle of the Trench at Masjid al-Fath on Monday, Tuesday, and Wednesday. Allah granted the divine response and opened the victory on Wednesday between the Dhuhr and Asr prayers. The Companions cherished this specific hour for urgent, heartfelt supplication.',
    primaryHadith: {
      arabicSnippet: 'دَعَا رَسُولُ اللَّهِ ﷺ فِي هَذَا الْمَسْجِدِ مَسْجِدِ الْفَتْحِ يَوْمَ الاِثْنَيْنِ وَيَوْمَ الثُّلاَثَاءِ وَيَوْمَ الأَرْبِعَاءِ فَاسْتُجِيبَ لَهُ يَوْمَ الأَرْبِعَاءِ بَيْنَ الصَّلاَتَيْنِ فَعُرِفَ الْبِشْرُ فِي وَجْهِهِ',
      englishNarrative:
        'Jabir ibn ‘Abdillah (RA) reported: "The Messenger of Allah ﷺ supplicated in this mosque [Masjid al-Fath] on Monday, Tuesday, and Wednesday, and his supplication was answered on Wednesday between the two prayers [Dhuhr and Asr], and joy was visible on his face." Jabir said: "No serious difficulty ever befell me except that I sought that hour on Wednesday and made du’a between the two prayers, and I found the answer from Allah."',
      citation: 'Musnad Ahmad #14218 · Al-Adab al-Mufrad #704 (Sahih by Al-Albani & Al-Dhahabi)',
      narrator: 'Sayyiduna Jabir ibn ‘Abdillah (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "The supplication of any worshipper is accepted as long as he does not ask for sin or breaking family ties, and as long as he is not impatient." (Sahih Muslim #2735).',
      citation: 'Sahih Muslim #2735',
    },
    whatAllahExpectsToday:
      'Allah expects you to call upon Him not casually, but with deep conviction (Yaqin) and tears of humility. The mid-afternoon of Wednesday is a golden gate of divine response.',
    ifYouHaveWrongedYourLord: {
      headline: 'Seize the Window Between Dhuhr & Asr for Heartbroken Repentance',
      explanation:
        'If you carry the weight of wronging your Lord, do not wait until tonight or Friday. Today—between Dhuhr and Asr—turn your phone on silent, step away from work, and raise your hands to the sky. Tell Allah: "My Lord, I have wronged myself, but You are the Granter of pardon, so pardon me." This specific hour on Wednesday has been tested by the greatest Companions for the removal of hardship and the washing of grief.',
      quranicRemedy: {
        verseArabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
        verseTranslation:
          'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
        citation: 'Surah Az-Zumar (39:53)',
      },
      actionableSpiritualPrescription:
        'Mark your calendar for the time between Dhuhr and Asr today. Find a quiet corner for 10 minutes. Recite Surah Az-Zumar (39:53) and make heartfelt personal du’a asking Allah to forgive the specific mistake that weighs on your conscience.',
    },
    daySunanChecklist: [
      { id: 'wed-dhuhr-asr-dua', label: 'Make intense du’a between Dhuhr and Asr (Hour of Answered Prayer)', source: 'Al-Adab al-Mufrad #704', isPrimarySunnah: true },
      { id: 'wed-recite-zumar', label: 'Recite the verse of supreme mercy: Surah Az-Zumar (39:53)', source: 'Quran (39:53)' },
      { id: 'wed-brokenness-humility', label: 'Supplicate with brokenness and tears (Inkisār)', source: 'Muslim #2735' },
      { id: 'wed-forgive-others', label: 'Pardon someone who hurt you to earn Allah’s pardon', source: 'Quran (24:22)' },
    ],
    specialDuaOfToday: {
      title: 'The Prophetic Du’a for Full Pardon of Transgression',
      arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      transliteration: 'Allahumma innaka ‘Afuwwun Karimun tuhibbul-‘afwa fa’fu ‘anni.',
      translation:
        '"O Allah, You are Most Forgiving and Generous, You love to pardon, so pardon me."',
      source: 'Jami` at-Tirmidhi #3513 (Recommended by the Prophet ﷺ to Sayyidatuna Aisha)',
    },
  },

  // 4. Thursday (يَوْمُ الْخَمِيسِ - Yawm al-Khamis)
  {
    dayIndex: 4,
    englishDay: 'Thursday',
    arabicDay: 'يَوْمُ الْخَمِيسِ',
    transliterationDay: 'Yawm al-Khamis',
    propheticTitle: 'Day of Weekly Deed Presentation & Embarking on Noble Journeys',
    arabicTitle: 'يَوْمُ عَرْضِ أَعْمَالِ الأُسْبُوعِ وَالْبِدَايَاتِ الْمُبَارَكَةِ',
    spiritualTheme: 'Closing the Weekly Ledger with Fasting & Fresh Beginnings',
    propheticConductSummary:
      'Thursday marks the culmination of the workweek’s spiritual accounting. The Prophet ﷺ fasted on Thursdays and took joy in having his actions raised to Allah while in a state of worship. In addition, when the Prophet ﷺ embarked upon important journeys, diplomatic treaties, or major initiatives, he almost exclusively preferred Thursday morning.',
    primaryHadith: {
      arabicSnippet: 'كَانَ رَسُولُ اللَّهِ ﷺ يَتَحَرَّى صِيَامَ الاِثْنَيْنِ وَالْخَمِيسِ',
      englishNarrative:
        'Aisha (RA) reported: "The Messenger of Allah ﷺ was keen to fast on Mondays and Thursdays." (Jami` at-Tirmidhi #745). Ka’b ibn Malik (RA) reported: "The Prophet ﷺ rarely set out on a journey except on a Thursday, and he loved to set out on a Thursday." (Sahih al-Bukhari #2950).',
      citation: 'Sahih al-Bukhari #2950 · Jami` at-Tirmidhi #745',
      narrator: 'Sayyidatuna Aisha & Sayyiduna Ka’b ibn Malik (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "The deeds of the people are presented to Allah twice a week, on Monday and Thursday; every believing servant is forgiven except one between whom and his brother there is rancor." (Sahih Muslim #2565).',
      citation: 'Sahih Muslim #2565',
    },
    whatAllahExpectsToday:
      'Allah expects you to review the book of your week before it is closed and raised. End your week on a high note of worship rather than sliding into spiritual lethargy as the weekend approaches.',
    ifYouHaveWrongedYourLord: {
      headline: 'Repent Before Your Weekly Ledger Ascends This Evening',
      explanation:
        'Your angels record your words and actions throughout the week, and on Thursday afternoon, this ledger is elevated. Do not let your week’s book ascend containing an unrepented sin, an untreated grudge, or an unpaid right. Take 5 minutes before Maghrib today: ask Allah to erase the blemishes of the past seven days and replace them with His boundless mercy.',
      quranicRemedy: {
        verseArabic: 'إِلَّا مَن تَابَ وَآمَنَ وَعَمِلَ عَمَلًا صَالِحًا فَأُولَٰئِكَ يُبَدِّلُ اللَّهُ سَيِّئَاتِهِمْ حَسَنَاتٍ ۗ وَكَانَ اللَّهُ غَفُورًا رَّحِيمًا',
        verseTranslation:
          'Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good. And ever is Allah Forgiving and Merciful.',
        citation: 'Surah Al-Furqan (25:70)',
      },
      actionableSpiritualPrescription:
        'Do a 5-minute Muhasabah (self-reflection) before sunset. If you fasted today, make your du’a at Iftar. If not, give charity or read Surah Al-Waqi’ah. Ask Allah through Surah Al-Furqan (25:70) to miraculously transform your past mistakes into good deeds through sincere Tawbah.',
    },
    daySunanChecklist: [
      { id: 'thu-fasting', label: 'Observe the voluntary Sunnah fast of Thursday', source: 'Tirmidhi #745', isPrimarySunnah: true },
      { id: 'thu-weekly-muhasabah', label: 'Perform self-accounting before deeds are raised at sunset', source: 'Sahih Muslim #2565', isPrimarySunnah: true },
      { id: 'thu-start-noble-venture', label: 'Initiate any new good project or journey (loved by the Prophet ﷺ)', source: 'Sahih al-Bukhari #2950' },
      { id: 'thu-prepare-jumuah', label: 'Prepare clothes and intentions for Friday', source: 'Bukhari #877' },
    ],
    specialDuaOfToday: {
      title: 'Du’a of Abu Bakr for Complete Forgiveness in Prayer',
      arabic: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      transliteration:
        'Allahumma inni zalamtu nafsi zulman kathira, wa la yaghfiru-dh-dhunuba illa Ant, faghfir li maghfiratan min ‘indika warhamni, innaka Antal-Ghafurur-Rahim.',
      translation:
        '"O Allah, I have wronged myself with great wrong, and none forgives sins except You. So grant me forgiveness from Yourself and have mercy upon me; indeed You are the Forgiving, the Merciful."',
      source: 'Sahih al-Bukhari #834 · Sahih Muslim #2705 (Taught by the Prophet ﷺ to Abu Bakr for prayer)',
    },
  },

  // 5. Friday (يَوْمُ الْجُمُعَةِ - Yawm al-Jumu'ah)
  {
    dayIndex: 5,
    englishDay: 'Friday',
    arabicDay: 'يَوْمُ الْجُمُعَةِ',
    transliterationDay: 'Yawm al-Jumu‘ah',
    propheticTitle: 'Sayyid al-Ayyam (The Master of Days), Expiation of Sins & Sa’at al-Ijabah',
    arabicTitle: 'سَيِّدُ الأَيَّامِ وَكَفَّارَةُ الذُّنُوبِ وَسَاعَةُ الإِجَابَةِ',
    spiritualTheme: 'Universal Cleansing of Sins Between Two Fridays',
    propheticConductSummary:
      'Friday is the weekly Eid of the Muslims and the greatest day upon which the sun rises. The Prophet ﷺ gave it an elevated ritual protocol: full ritual bath (Ghusl), applying fine scent, siwak, wearing one’s finest clean garment, reciting Surah Al-Kahf for divine illumination, and sending countless Salawat. Attending the Jumu’ah prayer with stillness expiates the sins committed between it and the previous Friday, with three extra days of mercy.',
    primaryHadith: {
      arabicSnippet: 'الصَّلَوَاتُ الْخَمْسُ وَالْجُمُعَةُ إِلَى الْجُمُعَةِ وَرَمَضَانُ إِلَى رَمَضَانَ مُكَفِّرَاتٌ مَا بَيْنَهُنَّ إِذَا اجْتَنَبَ الْكَبَائِرَ',
      englishNarrative:
        'Abu Hurairah (RA) reported that the Messenger of Allah ﷺ said: "The five daily prayers, and from one Friday prayer to the next, and from Ramadan to Ramadan, are expiations for whatever sins occurred between them, so long as major sins are avoided."',
      citation: 'Sahih Muslim #233',
      narrator: 'Sayyiduna Abu Hurairah (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "Among the best of your days is Friday... so increase your blessings upon me on it, for your blessings are presented to me." (Sunan Abu Dawud #1047). He also said: "On Friday there is an hour in which no Muslim servant asks Allah for good except that He gives it to him." (Sahih al-Bukhari #935).',
      citation: 'Sahih al-Bukhari #935 · Sunan Abu Dawud #1047',
    },
    whatAllahExpectsToday:
      'Allah expects your presence in body and spirit. Drop all commerce the moment the Adhan is called, listen attentively to the sermon without touching your phone, and dedicate the late afternoon before sunset to intimate supplication.',
    ifYouHaveWrongedYourLord: {
      headline: 'The Ultimate Expier of Sins: Bathe, Pray Jumu’ah & Seize the Final Hour',
      explanation:
        'If you have wronged your Lord, Friday is the supreme gift of divine mercy. The Prophet ﷺ explicitly stated that the proper observance of Friday prayer wipes away minor sins between this Friday and the last. Furthermore, the last hour before Maghrib on Friday (Sa’at al-Ijabah) is a divine guarantee: whatever you ask with a sincere heart, Allah responds. Bathe your body with the intention of washing away your spiritual dirt.',
      quranicRemedy: {
        verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ',
        verseTranslation:
          'O you who have believed, when [the adhan] is called for the prayer on the day of Jumu’ah [Friday], proceed to the remembrance of Allah and leave a trade. That is better for you, if you only knew.',
        citation: 'Surah Al-Jumu’ah (62:9)',
      },
      actionableSpiritualPrescription:
        'Perform Ghusl with mindfulness, use siwak, and arrive at Jumu’ah prayer before the Imam sits on the Minbar. Recite Surah Al-Kahf for light between the two Fridays. In the final hour before Maghrib today, sit alone in dhikr, send 100 Salawat upon the Prophet ﷺ, and ask Allah to pardon every private wrong you committed.',
    },
    daySunanChecklist: [
      { id: 'fri-ghusl-siwak', label: 'Perform Friday Ghusl, use siwak, and wear clean clothes', source: 'Sahih al-Bukhari #877', isPrimarySunnah: true },
      { id: 'fri-surah-kahf', label: 'Recite Surah Al-Kahf for divine light between Fridays', source: 'Al-Hakim · Sahih al-Jami #6470', isPrimarySunnah: true },
      { id: 'fri-early-jumuah', label: 'Go early to the mosque and listen attentively without distraction', source: 'Sahih Muslim #857', isPrimarySunnah: true },
      { id: 'fri-saat-ijabah', label: 'Devote the final hour before Maghrib to intense du’a (Sa’at al-Ijabah)', source: 'Sahih al-Bukhari #935', isPrimarySunnah: true },
      { id: 'fri-abundant-salawat', label: 'Send at least 100 Salawat upon Prophet Muhammad ﷺ', source: 'Sunan Abu Dawud #1047' },
    ],
    specialDuaOfToday: {
      title: 'Salawat of Light & Intercession',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
      transliteration:
        'Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammad, kama sallayta ‘ala Ibrahima wa ‘ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik ‘ala Muhammadin wa ‘ala ali Muhammad, kama barakta ‘ala Ibrahima wa ‘ala ali Ibrahim, innaka Hamidun Majid.',
      translation:
        '"O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Abraham and upon the family of Abraham; indeed You are Praiseworthy and Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Abraham and upon the family of Abraham; indeed You are Praiseworthy and Glorious."',
      source: 'Sahih al-Bukhari #3370 · Sahih Muslim #405',
    },
  },

  // 6. Saturday (يَوْمُ السَّبْتِ - Yawm as-Sabt)
  {
    dayIndex: 6,
    englishDay: 'Saturday',
    arabicDay: 'يَوْمُ السَّبْتِ',
    transliterationDay: 'Yawm as-Sabt',
    propheticTitle: 'Day of Sacred Walking, Purifying at Home & Visiting Mosques',
    arabicTitle: 'يَوْمُ الزِّيَارَةِ فِي اللَّهِ وَالطَّهَارَةِ فِي الْبَيْتِ',
    spiritualTheme: 'Every Step Toward Goodness Erases a Sin & Elevates a Rank',
    propheticConductSummary:
      'The Prophet ﷺ had an established, cherished weekly routine every Saturday: he would walk or ride from his home to Masjid Quba (the first mosque built in Islam) and pray two rak’ahs in it. He taught his Ummah that whoever performs wudu in their home, then walks to the mosque to pray, attains the immense reward equivalent to an Umrah pilgrimage. It is a day of walking with intentional worship, visiting elders and neighbors, and strengthening family ties.',
    primaryHadith: {
      arabicSnippet: 'كَانَ النَّبِيُّ ﷺ يَأْتِي مَسْجِدَ قُبَاءٍ كُلَّ سَبْتٍ مَاشِيًا وَرَاكِبًا فَيُصَلِّي فِيهِ رَكْعَتَيْنِ',
      englishNarrative:
        '‘Abdullah ibn ‘Umar (RA) narrated: "The Prophet ﷺ used to go to the mosque of Quba every Saturday, walking and riding, and he would pray two rak’ahs in it." In Sunan Ibn Majah, the Prophet ﷺ said: "Whoever purifies himself in his house, then comes to the mosque of Quba and prays in it, will have a reward like that of an ‘Umrah."',
      citation: 'Sahih al-Bukhari #1193, #1194 · Sahih Muslim #1399 · Sunan Ibn Majah #1412',
      narrator: 'Sayyiduna ‘Abdullah ibn ‘Umar (RA)',
    },
    secondaryHadith: {
      englishNarrative:
        'The Prophet ﷺ said: "Shall I not tell you of something by which Allah wipes away sins and elevates ranks? Perfecting wudu in times of difficulty, taking many steps to the mosques, and waiting for the next prayer after prayer." (Sahih Muslim #251).',
      citation: 'Sahih Muslim #251',
    },
    whatAllahExpectsToday:
      'Allah expects your devotion to overflow into your family and your feet. Walk to the prayer, look after relatives who are lonely or sick, and transform your home into a place of peace.',
    ifYouHaveWrongedYourLord: {
      headline: 'Purify at Home & Walk to Prayer: Every Footstep Erases a Misdeed',
      explanation:
        'When you feel guilt for wronging your Lord, do not remain stagnant in bed scrolling in regret. The Prophetic medicine for Saturday is physical movement in worship: make a thorough wudu in your bathroom, step outside, and walk to the local mosque or a quiet place of prayer. The Prophet ﷺ revealed: "With every step you take, one sin is wiped away and one degree of elevation in Paradise is granted." Let your feet walk away from the sin and toward your Creator.',
      quranicRemedy: {
        verseArabic: 'وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلذَّاكِرِينَ',
        verseTranslation:
          'And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds do away with misdeeds. That is a reminder for those who remember.',
        citation: 'Surah Hud (11:114)',
      },
      actionableSpiritualPrescription:
        'Make wudu at home and walk to your nearest mosque for at least one congregational prayer today. As you walk, make silent Istighfar on each step. Dedicate time today to visit or call a family member, parent, or sick friend for Allah’s sake.',
    },
    daySunanChecklist: [
      { id: 'sat-purify-walk-prayer', label: 'Purify at home and walk to prayer (every step erases a sin)', source: 'Sahih Muslim #251', isPrimarySunnah: true },
      { id: 'sat-visit-mosque-quba-sunnah', label: 'Visit a sacred mosque or pray 2 voluntary rak’ahs with presence', source: 'Sahih al-Bukhari #1194', isPrimarySunnah: true },
      { id: 'sat-silat-ar-rahim', label: 'Connect with family and uphold kinship (Silat ar-Rahim)', source: 'Bukhari #5986' },
      { id: 'sat-teach-or-read-quran', label: 'Teach a verse or read a page of Quran with family', source: 'Bukhari #5027' },
    ],
    specialDuaOfToday: {
      title: 'Du’a for Steadfastness of Heart (Yā Muqallib al-Qulūb)',
      arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
      transliteration: 'Ya Muqallibal-qulubi thabbit qalbi ‘ala dinik.',
      translation:
        '"O Turner of hearts, make my heart steadfast upon Your religion."',
      source: 'Jami` at-Tirmidhi #2140 (The most frequent supplication of the Prophet ﷺ)',
    },
  },
];

/**
 * Helper to get today's prophetic conduct
 */
export function getTodayPropheticConduct(): DailyPropheticConduct {
  const dayIndex = new Date().getDay(); // 0-6
  return weeklyPropheticConduct[dayIndex] || weeklyPropheticConduct[0];
}

/**
 * Universal Divine Pathway of Tawbah & Reconciliation
 * Step-by-step prophetic healing guide for someone who feels they have wronged their Lord.
 */
export interface TawbahGuidanceStep {
  stepNumber: number;
  title: string;
  arabicTitle: string;
  propheticCondition: string;
  hadithOrQuranCitation: string;
  actionableStep: string;
}

export const tawbahRemedySteps: TawbahGuidanceStep[] = [
  {
    stepNumber: 1,
    title: 'An-Nadam (Deep Sincere Remorse)',
    arabicTitle: 'النَّدَمُ تَوْبَةٌ',
    propheticCondition:
      'The feeling of heartache and remorse you feel right now is the greatest sign of Iman (faith). The Prophet ﷺ said: "Remorse is repentance."',
    hadithOrQuranCitation: 'Sunan Ibn Majah #4252 · Sahih by Al-Albani',
    actionableStep:
      'Do not despair or numb your heart. Acknowledge your human weakness before Allah without making excuses. Let your regret be the bridge back to Him.',
  },
  {
    stepNumber: 2,
    title: 'Al-Iqla’ (Immediately Ceasing the Wrong)',
    arabicTitle: 'الإِقْلَاعُ عَنِ الْمَعْصِيَةِ',
    propheticCondition:
      'Instantly stop whatever wrong behavior, glance, speech, or omission you were engaged in. Do not say "just one more time."',
    hadithOrQuranCitation: 'Surah Ali ‘Imran (3:135): "...and they do not persist in what they have done while they know."',
    actionableStep:
      'Close the tab, step out of the room, silence the argument, or stop the unlawful act immediately for Allah’s sake.',
  },
  {
    stepNumber: 3,
    title: 'Al-‘Azm (Resolute Intention Never to Return)',
    arabicTitle: 'الْعَزْمُ عَلَى عَدَمِ الْعَوْدِ',
    propheticCondition:
      'Make a firm, heartfelt determination in your chest right now: "Ya Allah, by Your strength and not mine, I intend never to return to this sin."',
    hadithOrQuranCitation: 'Surah At-Tahrim (66:8): "Turn to Allah with sincere repentance (Tawbatan Nasūha)..."',
    actionableStep:
      'Even if you have slipped before, never give up. Sincerity right now is what Allah looks at. Put barriers between yourself and the trigger of that sin.',
  },
  {
    stepNumber: 4,
    title: 'Radd al-Mazalim (Restitution If You Harmed Another Human)',
    arabicTitle: 'رَدُّ الْمَظَالِمِ إِلَى أَهْلِهَا',
    propheticCondition:
      'If the wrong involved another person’s rights (money, reputation, backbiting, unfair treatment), you must seek their pardon or restore what is theirs.',
    hadithOrQuranCitation: 'Sahih al-Bukhari #2449: "Whoever has wronged his brother... let him ask his forgiveness today before there is no Dinar or Dirham."',
    actionableStep:
      'If you backbit someone, speak well of them in that gathering and make du’a for their forgiveness. If you owe money, pay it back or ask to be pardoned.',
  },
  {
    stepNumber: 5,
    title: 'Salat al-Tawbah & Erasing Sin with Good Deeds',
    arabicTitle: 'صَلَاةُ التَّوْبَةِ وَإِتْبَاعُ السَّيِّئَةِ الْحَسَنَةَ',
    propheticCondition:
      'Perform a mindful wudu, pray 2 quiet Rak’ahs, and follow up immediately with good deeds—charity, dhikr, helping parents, or reciting Quran.',
    hadithOrQuranCitation: 'Sunan Abu Dawud #1521 · Jami` at-Tirmidhi #1987: "Follow a bad deed with a good deed and it will wipe it out."',
    actionableStep:
      'Stand for 2 Rak’ahs of Tawbah right now. Give a small Sadaqah and say: "Rabbi inni zalamtu nafsi faghfir li" (My Lord, I have wronged myself, so forgive me).',
  },
];
