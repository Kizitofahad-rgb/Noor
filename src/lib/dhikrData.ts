export interface DailyDhikrItem {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  virtue: string;
  source: string;
  countGoal: number;
  category: 'Morning & Evening' | 'Forgiveness' | 'Protection' | 'Treasures of Paradise' | 'Gratitude' | 'Light on the Tongue';
  practicalTip: string;
}

export const dailyDhikrList: DailyDhikrItem[] = [
  {
    id: 'dhikr-subhanallah-wabihamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥān Allāhi wa bi-ḥamdih',
    translation: 'Glory be to Allah and all praise is His.',
    virtue: 'Whoever says this one hundred times in a day, their sins will be wiped away, even if they were like the foam of the sea.',
    source: 'Sahih al-Bukhari #6405 · Sahih Muslim #2691',
    countGoal: 100,
    category: 'Light on the Tongue',
    practicalTip: 'Take 2 quiet minutes after Fajr or Asr prayer, or whisper it while walking or commuting.',
  },
  {
    id: 'dhikr-hawqala',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    translation: 'There is no power and no strength except with Allah.',
    virtue: 'The Prophet ﷺ said to Abu Musa al-Ash‘ari: "Shall I not direct you to a treasure from the treasures of Paradise?" It is this phrase.',
    source: 'Sahih al-Bukhari #4205 · Sahih Muslim #2704',
    countGoal: 33,
    category: 'Treasures of Paradise',
    practicalTip: 'Whisper this whenever you feel overwhelmed by a task, anxious about the future, or feeling weak.',
  },
  {
    id: 'dhikr-four-beloved',
    arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
    transliteration: 'Subḥān Allāh, wal-ḥamdu lillāh, wa lā ilāha illallāh, wallāhu akbar',
    translation: 'Glory be to Allah, all praise is for Allah, there is no deity worthy of worship except Allah, and Allah is the Greatest.',
    virtue: 'The Prophet ﷺ said: "The dearest words to Allah are four: Subhan Allah, Al-hamdulillah, La ilaha illallah, and Allahu Akbar."',
    source: 'Sahih Muslim #2137',
    countGoal: 33,
    category: 'Morning & Evening',
    practicalTip: 'These words are planted as evergreen trees for you in Paradise. Recite them while completing daily chores.',
  },
  {
    id: 'dhikr-istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullāha wa atūbu ilayh',
    translation: 'I seek the forgiveness of Allah and I repent to Him.',
    virtue: 'The Messenger of Allah ﷺ said: "By Allah, I seek Allah’s forgiveness and repent to Him more than seventy times a day."',
    source: 'Sahih al-Bukhari #6307',
    countGoal: 70,
    category: 'Forgiveness',
    practicalTip: 'Istighfar removes tightness from the chest, attracts rain and barakah into wealth, and opens unexpected doors.',
  },
  {
    id: 'dhikr-salawat',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    transliteration: 'Allāhumma ṣalli wa sallim ‘alā Nabiyyinā Muḥammad',
    translation: 'O Allah, send blessings and peace upon our Prophet Muhammad.',
    virtue: 'The Prophet ﷺ said: "Whoever sends blessings upon me once, Allah will send blessings upon them tenfold and erase ten sins."',
    source: 'Sunan an-Nasa’i #1297 (Sahih) · Sahih Muslim #408',
    countGoal: 10,
    category: 'Light on the Tongue',
    practicalTip: 'Recite especially on Friday and when beginning or ending any personal supplication.',
  },
  {
    id: 'dhikr-hasbunallah',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Ḥasbun Allāhu wa ni‘mal-wakīl',
    translation: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
    virtue: 'Said by Prophet Ibrahim when cast into the fire, and by Prophet Muhammad ﷺ when told the allied armies had gathered against them.',
    source: 'Sahih al-Bukhari #4563 · Quran 3:173',
    countGoal: 33,
    category: 'Protection',
    practicalTip: 'When you feel powerless before a challenge or test, surrender the outcome into the hands of the Best Trustee.',
  },
  {
    id: 'dhikr-yunus',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lā ilāha illā Anta subḥānaka innī kuntu minaẓ-ẓālimīn',
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    virtue: 'The Prophet ﷺ said: "No Muslim servant supplicates with this in any distress except that Allah relieves their distress."',
    source: 'Jami` at-Tirmidhi #3505 (Sahih) · Quran 21:87',
    countGoal: 33,
    category: 'Forgiveness',
    practicalTip: 'The prayer of Prophet Yunus inside the dark belly of the whale. The ultimate cure for sorrow and feeling trapped.',
  },
  {
    id: 'dhikr-subhanallah-adheem',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥān Allāhi wa bi-ḥamdih, Subḥān Allāhil-‘Aẓīm',
    translation: 'Glory be to Allah and all praise is His; Glory be to Allah the Magnificent.',
    virtue: 'The Prophet ﷺ said: "Two words that are light on the tongue, heavy on the Scales, and beloved to the Most Merciful."',
    source: 'Sahih al-Bukhari #6682 · Sahih Muslim #2694',
    countGoal: 33,
    category: 'Light on the Tongue',
    practicalTip: 'The closing hadith of Sahih al-Bukhari. Heavy as mountains on the Day of Judgment.',
  },
  {
    id: 'dhikr-bismillah-ladhi',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhil-ladhī lā yaḍurru ma‘as-mihī shay’un fil-arḍi wa lā fis-samā’i wa Huwas-Samī‘ul-‘Alīm',
    translation: 'In the name of Allah, with whose name nothing on earth or in the heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    virtue: 'Whoever recites this three times morning and evening will not be harmed by anything.',
    source: 'Sunan Abi Dawud #5088 · Jami` at-Tirmidhi #3388 (Sahih)',
    countGoal: 3,
    category: 'Protection',
    practicalTip: 'Say this three times every morning at dawn and every evening before sunset for an impenetrable fortress of peace.',
  },
  {
    id: 'dhikr-alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    transliteration: 'Al-ḥamdu lillāhi Rabbil-‘ālamīn, ḥamdan kathīran ṭayyiban mubārakan fīh',
    translation: 'All praise is for Allah, Lord of all the worlds; abundant, pure, and blessed praise.',
    virtue: 'A companion said this after bowing, and the Prophet ﷺ said: "I saw over thirty angels racing to record it first."',
    source: 'Sahih al-Bukhari #799',
    countGoal: 10,
    category: 'Gratitude',
    practicalTip: 'Recite this when reflecting upon any gift in your day—your breath, your family, your health, or your faith.',
  },
];

export function getDailyDhikrTip(indexOffset = 0): DailyDhikrItem {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = (dayOfYear + indexOffset) % dailyDhikrList.length;
  return dailyDhikrList[index >= 0 ? index : 0];
}
