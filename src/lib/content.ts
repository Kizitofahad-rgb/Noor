export type MoodId = 'anxious' | 'grateful' | 'grieving' | 'guidance' | 'hopeful' | 'overwhelmed';

export type Mood = {
  id: MoodId;
  label: string;
  icon: 'cloud' | 'sun' | 'heart' | 'compass' | 'sparkles' | 'feather';
  color: string;
};

export const moods: Mood[] = [
  { id: 'anxious', label: 'Anxious', icon: 'cloud', color: '#64748b' },
  { id: 'grateful', label: 'Grateful', icon: 'sun', color: '#eab308' },
  { id: 'grieving', label: 'Grieving', icon: 'heart', color: '#ef4444' },
  { id: 'guidance', label: 'Seeking guidance', icon: 'compass', color: '#0d9488' },
  { id: 'hopeful', label: 'Hopeful', icon: 'sparkles', color: '#10b981' },
  { id: 'overwhelmed', label: 'Overwhelmed', icon: 'feather', color: '#8b5cf6' },
];

export const reflections: Record<MoodId, {
  arabic: string;
  translation: string;
  reference: string;
  note: string;
  tafsirExcerpt?: string;
}> = {
  anxious: {
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Surely in the remembrance of Allah do hearts find rest.',
    reference: 'Quran 13:28 · Ar-Ra’d',
    note: 'Rest does not always arrive as an instant answer. Sometimes it begins by remembering Who holds your tomorrow and never tires of your prayers.',
    tafsirExcerpt: 'Ibn Kathir notes: "Hearts become tranquil, serene, and confident when Allah is remembered and praised, knowing His decree is just."',
  },
  grateful: {
    arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translation: 'If you are grateful, I will certainly give you more.',
    reference: 'Quran 14:7 · Ibrahim',
    note: 'Gratitude turns what is already present into abundance. It transforms a routine blessing into a conscious conversation with the Giver.',
    tafsirExcerpt: 'Al-Hasan al-Basri said: "Allah gives blessings for as long as He wills, and when gratitude is absent, He turns them into trials."',
  },
  grieving: {
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease.',
    reference: 'Quran 94:6 · Ash-Sharh',
    note: 'The promise is not merely that ease follows after hardship ends. Ease is woven right alongside hardship, carrying you through every breath.',
    tafsirExcerpt: 'Ibn Abbas narrated: "One hardship cannot overcome two eases," because the hardship (al-usr) is mentioned with the definite article, while ease (yusran) is indefinite.',
  },
  guidance: {
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Quran 20:114 · Ta-Ha',
    note: 'A sincere request for guidance is itself the first step toward it. Allah never ignores a heart that asks to understand truth.',
    tafsirExcerpt: 'Ibn Kathir writes: "Allah never commanded His Prophet ﷺ to ask for an increase in anything except knowledge."',
  },
  hopeful: {
    arabic: 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
    translation: 'Do not despair of the mercy of Allah.',
    reference: 'Quran 39:53 · Az-Zumar',
    note: 'Your mistakes are not greater than His forgiveness. As long as you turn back, the door remains wide open.',
    tafsirExcerpt: 'This ayah was described by early scholars as the most hopeful verse in the entire Quran for sinners and seekers alike.',
  },
  overwhelmed: {
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translation: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
    reference: 'Quran 3:173 · Ali \'Imran',
    note: 'You do not have to carry the whole mountain today. Hand over what is beyond your control to the One who creates all things.',
    tafsirExcerpt: 'Narrated by Ibn Abbas: Ibrahim (peace be upon him) said it when cast into fire, and Muhammad ﷺ said it when told armies had gathered against him.',
  },
};

export type TajweedRule = 'madd' | 'waqf' | 'wasl' | 'ghunnah';

export type QuranWord = {
  arabic: string;
  transliteration: string;
  translation: string;
  tajweed?: TajweedRule[];
};

export type QuranVerse = {
  number: number;
  surahId: string;
  arabic: string;
  transliteration: string;
  simpleMeaning: string;
  understanding: string[];
  reflectionQuestions: string[];
  dua: string;
  words: QuranWord[];
  translation: string;
  tafsir?: string;
  reflection: string;
};

import { all114Surahs } from './allSurahs';

export type Surah = {
  id: string;
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  verses: number;
  time: string;
  revelation: 'Meccan' | 'Medinan';
  revelationOrder: number;
  intro: {
    theme: string;
    verseCount: number;
    overview: string;
    keyTakeaway: string;
  };
};

export const surahs: Surah[] = all114Surahs;

export const verses: QuranVerse[] = [
  // Surah 1: Al-Fatihah (Complete 7 verses)
  {
    number: 1,
    surahId: '1',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismi Allāhi ar-raḥmāni ar-raḥīm',
    simpleMeaning: 'In the name of Allah, the Most Compassionate, the Most Merciful.',
    understanding: [
      '"Bismi" means "in the name of." A believer starts every noble act consciously invoking Allah.',
      '"Allah" is the proper name of God in Arabic, unique and undivided.',
      '"Ar-Rahman" conveys an all-encompassing mercy embracing all creation in this worldly existence.',
      '"Ar-Rahim" denotes a specialized, eternal mercy bestowed upon believers in the hereafter.',
    ],
    reflectionQuestions: [
      'What does it mean to begin an action with Allah\'s name instead of personal ego?',
      'How does knowing mercy preceded wrath change the way I view my challenges?',
    ],
    dua: 'O Allah, bless my beginnings with Your name and crown my efforts with Your mercy.',
    words: [
      { arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'In the name' },
      { arabic: 'اللَّهِ', transliteration: 'Allāhi', translation: 'of Allah', tajweed: ['madd'] },
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Raḥmāni', translation: 'the Most Compassionate', tajweed: ['madd'] },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīmi', translation: 'the Most Merciful', tajweed: ['madd'] },
    ],
    translation: 'In the Name of Allah—the Most Compassionate, Most Merciful.',
    tafsir: 'Ibn Kathir explains that beginning with the Basmalah brings divine barakah (blessing) to any speech or deed.',
    reflection: 'Every beginning can be anchored in divine mercy.',
  },
  {
    number: 2,
    surahId: '1',
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Al-ḥamdu lillāhi rabbi al-ʿālamīn',
    simpleMeaning: 'All praise belongs to Allah, the Lord of all worlds.',
    understanding: [
      '"Al-hamd" is comprehensive praise fueled by love, awe, and veneration.',
      '"Rabb" encompasses Lord, Sustainer, Guardian, and Provider who nurtures life stages.',
      '"Al-ʿAlamin" refers to everything in existence outside of Allah: angels, humans, stars, microscopic life.',
    ],
    reflectionQuestions: [
      'When did I last thank Allah for simply existing, rather than just getting what I wanted?',
      'What unseen realms and systems are sustaining me at this exact second?',
    ],
    dua: 'O Allah, make praise of You the natural fragrance of my thoughts and tongue.',
    words: [
      { arabic: 'الْحَمْدُ', transliteration: 'Al-ḥamdu', translation: 'All praise' },
      { arabic: 'لِلَّهِ', transliteration: 'Lillāhi', translation: 'is for Allah', tajweed: ['madd'] },
      { arabic: 'رَبِّ', transliteration: 'Rabbi', translation: 'Lord' },
      { arabic: 'الْعَالَمِينَ', transliteration: 'Al-ʿĀlamīna', translation: 'of the worlds', tajweed: ['madd'] },
    ],
    translation: 'All praise is for Allah—Lord of the worlds.',
    tafsir: 'Al-Hamd is more general than Ash-Shukr (gratitude), because praise is offered for Allah\'s inherent attributes as well as His favors.',
    reflection: 'Praise widens the heart beyond immediate anxieties.',
  },
  {
    number: 3,
    surahId: '1',
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Ar-raḥmāni ar-raḥīm',
    simpleMeaning: 'The Most Compassionate, the Most Merciful.',
    understanding: [
      'Mercy is affirmed immediately after Lordship, teaching that Divine authority is wrapped in compassion, not tyranny.',
      'Mercy is reiterated to emphasize intimacy after mentioning the vastness of all the worlds.',
    ],
    reflectionQuestions: [
      'If Allah treats His creation with boundless mercy, how am I showing compassion to those under my care?',
    ],
    dua: 'My Lord, wrap my family and me in the tenderness of Your boundless mercy.',
    words: [
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Raḥmāni', translation: 'the Most Compassionate', tajweed: ['madd'] },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīmi', translation: 'the Most Merciful', tajweed: ['madd'] },
    ],
    translation: 'The Most Compassionate, Most Merciful.',
    tafsir: 'Repeated to remind the servant that Allah\'s mercy precedes His wrath.',
    reflection: 'Mercy is the foundation of the divine-human relationship.',
  },
  {
    number: 4,
    surahId: '1',
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    transliteration: 'Māliki yawmi ad-dīn',
    simpleMeaning: 'Master of the Day of Judgment.',
    understanding: [
      '"Malik" denotes the absolute King and Owner who alone will judge with perfect justice.',
      '"Yawm ad-Din" is the Day of Recompense where every hidden motive and deed is weighed.',
    ],
    reflectionQuestions: [
      'How does remembering ultimate justice help me bear earthly injustice with dignity?',
    ],
    dua: 'O Master of Judgment, pardon my slips on the Day when worldly prestige vanishes.',
    words: [
      { arabic: 'مَالِكِ', transliteration: 'Māliki', translation: 'Master', tajweed: ['madd'] },
      { arabic: 'يَوْمِ', transliteration: 'Yawmi', translation: 'of the Day' },
      { arabic: 'الدِّينِ', transliteration: 'Ad-Dīni', translation: 'of Judgment', tajweed: ['madd'] },
    ],
    translation: 'Master of the Day of Judgment.',
    tafsir: 'Allah is the King in this life and the next, but on that Day, no king or tyrant will claim sovereignty.',
    reflection: 'Accountability provides moral weight and boundless hope for ultimate justice.',
  },
  {
    number: 5,
    surahId: '1',
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
    simpleMeaning: 'You alone we worship, and You alone we ask for help.',
    understanding: [
      '"Iyyaka" is placed first in Arabic to denote exclusivity: NONE other is worthy of worship.',
      'Worship is followed by asking for help: we cannot worship Him without His divine enablement.',
    ],
    reflectionQuestions: [
      'Am I relying on my own intellect and strength, or consistently asking for His assistance?',
    ],
    dua: 'O Allah, assist me to remember You, give thanks to You, and worship You in the best manner.',
    words: [
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyāka', translation: 'You alone', tajweed: ['madd'] },
      { arabic: 'نَعْبُدُ', transliteration: 'Naʿbudu', translation: 'we worship' },
      { arabic: 'وَإِيَّاكَ', transliteration: 'Wa-iyyāka', translation: 'and You alone', tajweed: ['madd'] },
      { arabic: 'نَسْتَعِينُ', transliteration: 'Nastaʿīnu', translation: 'we ask for help', tajweed: ['madd'] },
    ],
    translation: 'You alone we worship and You alone we ask for help.',
    tafsir: 'Ibn al-Qayyim wrote whole volumes (Madarij as-Salikin) on this verse, saying it cures spiritual arrogance and reliance on creation.',
    reflection: 'Worship is our purpose; asking for His aid is our humility.',
  },
  {
    number: 6,
    surahId: '1',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdinā aṣ-ṣirāṭa al-mustaqīm',
    simpleMeaning: 'Guide us along the Straight Path.',
    understanding: [
      'Guidance (Hidayah) is requested in every prayer because steadfastness requires renewed light each hour.',
      '"As-Sirat al-Mustaqim" is the clear highway of divine truth without deviations.',
    ],
    reflectionQuestions: [
      'In what area of my life am I drifting or hesitating to do the right thing?',
    ],
    dua: 'O Turner of hearts, keep my heart firm upon Your path.',
    words: [
      { arabic: 'اهْدِنَا', transliteration: 'Ihdinā', translation: 'Guide us' },
      { arabic: 'الصِّرَاطَ', transliteration: 'Aṣ-Ṣirāṭa', translation: 'to the path' },
      { arabic: 'الْمُسْتَقِيمَ', transliteration: 'Al-Mustaqīma', translation: 'the Straight' },
    ],
    translation: 'Guide us along the Straight Path.',
    tafsir: 'Ibn Abbas stated that the Straight Path refers to the Quran, Islam, and the path walked by the Prophet ﷺ and his companions.',
    reflection: 'Guidance is not a one-time achievement, but a continuous prayer.',
  },
  {
    number: 7,
    surahId: '1',
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Ṣirāṭa alladhīna anʿamta ʿalayhim ghayri al-maghdūbi ʿalayhim wa-lā aḍ-ḍāllīn',
    simpleMeaning: 'The path of those You have blessed—not those who earned anger, nor those who went astray.',
    understanding: [
      'Those blessed are the Prophets, the truthful, the martyrs, and the righteous.',
      'We seek protection from knowledge without action, and from action without truth.',
    ],
    reflectionQuestions: [
      'Who are my role models? Do they embody prophetic character and humility?',
    ],
    dua: 'O Allah, keep me close to the righteous and save me from heedlessness.',
    words: [
      { arabic: 'صِرَاطَ', transliteration: 'Ṣirāṭa', translation: 'The path' },
      { arabic: 'الَّذِينَ', transliteration: 'Alladhīna', translation: 'of those', tajweed: ['madd'] },
      { arabic: 'أَنْعَمْتَ', transliteration: 'Anʿamta', translation: 'You have blessed' },
      { arabic: 'عَلَيْهِمْ', transliteration: 'ʿAlayhim', translation: 'upon them' },
      { arabic: 'غَيْرِ', transliteration: 'Ghayri', translation: 'not' },
      { arabic: 'الْمَغْضُوبِ', transliteration: 'Al-Maghdūbi', translation: 'who earned anger' },
      { arabic: 'عَلَيْهِمْ', transliteration: 'ʿAlayhim', translation: 'upon them' },
      { arabic: 'وَلَا', transliteration: 'Wa-lā', translation: 'and not' },
      { arabic: 'الضَّالِّينَ', transliteration: 'Aḍ-Ḍāllīna', translation: 'who are astray', tajweed: ['madd'] },
    ],
    translation: 'The path of those You have blessed—not those You are displeased with, or those who are astray.',
    tafsir: 'It is recommended to say "Ameen" (O Allah, accept our supplication) after reciting this final verse in prayer.',
    reflection: 'The company we keep shapes the path we walk.',
  },

  // Surah 2:255 (Ayat al-Kursi)
  {
    number: 255,
    surahId: '2',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    transliteration: 'Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm, lā ta\'khudhuhu sinatun wa-lā nawm, lahu mā fī as-samāwāti wa-mā fī al-arḍ',
    simpleMeaning: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
    understanding: [
      'Al-Hayy: Possessing self-subsisting, perfect, and immortal life.',
      'Al-Qayyum: The One who maintains and upholds the entire universe; everything relies on Him while He needs nothing.',
      'Unlike humans who tire and must rest, Allah\'s vigil is eternal and effortless.',
    ],
    reflectionQuestions: [
      'When I am worried about the world, how does knowing Allah never slumbers reassure me?',
    ],
    dua: 'O Ever-Living, O Self-Subsisting, by Your mercy I seek assistance. Rectify all my affairs and do not leave me to myself even for the blink of an eye.',
    words: [
      { arabic: 'اللَّهُ', transliteration: 'Allāhu', translation: 'Allah' },
      { arabic: 'لَا إِلَٰهَ', transliteration: 'Lā ilāha', translation: 'no deity', tajweed: ['madd'] },
      { arabic: 'إِلَّا هُوَ', transliteration: 'Illā huwa', translation: 'except Him' },
      { arabic: 'الْحَيُّ', transliteration: 'Al-Ḥayyu', translation: 'the Ever-Living' },
      { arabic: 'الْقَيُّومُ', transliteration: 'Al-Qayyūmu', translation: 'the Sustainer' },
    ],
    translation: 'Allah! There is no god worthy of worship except Him, the Ever-Living, All-Sustaining. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth.',
    tafsir: 'The Prophet ﷺ taught that whoever recites Ayatul Kursi after every obligatory prayer, nothing stands between them and entering Paradise except death.',
    reflection: 'Rest in the assurance of the One who watches over you unwearied.',
  },

  // Surah 112: Al-Ikhlas (Complete 4 verses)
  {
    number: 1,
    surahId: '112',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    transliteration: 'Qul huwa Allāhu aḥad',
    simpleMeaning: 'Say, "He is Allah, [who is] One."',
    understanding: [
      '"Ahad" signifies unique oneness, peerless and indivisible in every attribute.',
    ],
    reflectionQuestions: [
      'Is my heart attached purely to the Creator, or fragmented across worldly approvals?',
    ],
    dua: 'O Allah, make my dedication sincere to You alone.',
    words: [
      { arabic: 'قُلْ', transliteration: 'Qul', translation: 'Say' },
      { arabic: 'هُوَ', transliteration: 'Huwa', translation: 'He is' },
      { arabic: 'اللَّهُ', transliteration: 'Allāhu', translation: 'Allah' },
      { arabic: 'أَحَدٌ', transliteration: 'Aḥad', translation: 'One' },
    ],
    translation: 'Say, "He is Allah—One and Indivisible."',
    tafsir: 'Revealed when the polytheists asked the Prophet ﷺ to describe his Lord\'s lineage.',
    reflection: 'Simplicity and perfection dwell in pure monotheism.',
  },
  {
    number: 2,
    surahId: '112',
    arabic: 'اللَّهُ الصَّمَدُ',
    transliteration: 'Allāhu aṣ-ṣamad',
    simpleMeaning: 'Allah, the Eternal Refuge.',
    understanding: [
      '"As-Samad" means the Master upon whom all creatures rely for every need, while He has no need of anything.',
    ],
    reflectionQuestions: [
      'Who do I turn to first when distress touches me?',
    ],
    dua: 'O As-Samad, my needs are many and my strength is small; I turn to You alone.',
    words: [
      { arabic: 'اللَّهُ', transliteration: 'Allāhu', translation: 'Allah' },
      { arabic: 'الصَّمَدُ', transliteration: 'Aṣ-Ṣamadu', translation: 'the Eternal Refuge' },
    ],
    translation: 'Allah—the Sustainer needed by all.',
    tafsir: 'Ibn Abbas explained: As-Samad is the Lord whose nobility, greatness, tolerance, and wisdom are absolute and complete.',
    reflection: 'Every creation is in need; only Allah is the refuge.',
  },
  {
    number: 3,
    surahId: '112',
    arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    transliteration: 'Lam yalid wa-lam yūlad',
    simpleMeaning: 'He neither begets nor is born.',
    understanding: [
      'He has no children, parents, or ancestry. He has no beginning and no end.',
    ],
    reflectionQuestions: [
      'How does Allah\'s absolute transcendence elevate our prayer above creaturely limitations?',
    ],
    dua: 'Glory be to Allah, far above any deficiency ascribed to Him.',
    words: [
      { arabic: 'لَمْ يَلِدْ', transliteration: 'Lam yalid', translation: 'He neither begets' },
      { arabic: 'وَلَمْ يُولَدْ', transliteration: 'Wa-lam yūlad', translation: 'nor is born' },
    ],
    translation: 'He has never had offspring, nor was He born.',
    tafsir: 'Refutation of all myths that attribute family, partners, or lineage to the Divine.',
    reflection: 'The Uncreated One transcends the cycle of mortality.',
  },
  {
    number: 4,
    surahId: '112',
    arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: 'Wa-lam yakun lahu kufuwan aḥad',
    simpleMeaning: 'Nor is there to Him any equivalent.',
    understanding: [
      'Nothing in creation resembles Allah in His essence, power, knowledge, or mercy.',
    ],
    reflectionQuestions: [
      'When we say "Allahu Akbar" (Allah is Greater), what are we comparing Him against?',
    ],
    dua: 'O Allah, there is none like unto You, and You are the Hearing, the Seeing.',
    words: [
      { arabic: 'وَلَمْ يَكُن', transliteration: 'Wa-lam yakun', translation: 'And not is' },
      { arabic: 'لَّهُ', transliteration: 'Lahu', translation: 'to Him' },
      { arabic: 'كُفُوًا', transliteration: 'Kufuwan', translation: 'equivalent' },
      { arabic: 'أَحَدٌ', transliteration: 'Aḥad', translation: 'anyone' },
    ],
    translation: 'And there is none comparable to Him.',
    tafsir: 'A seal affirming that the Creator is beyond imagination and parallel.',
    reflection: 'Awe begins where comparison ceases.',
  },
];

export type LibraryItem = {
  id: string;
  type: 'Hadith' | 'Tafsir' | 'Wisdom';
  title: string;
  arabicExcerpt?: string;
  excerpt: string;
  source: string;
  grading?: 'Sahih' | 'Hasan' | 'Cited Tafsir' | 'Authentic';
  bookNumber?: string;
  explanation: string;
  practicalReflection: string;
  category: 'Spiritual' | 'Character' | 'Family' | 'Knowledge' | 'Resilience';
};

export const libraryItems: LibraryItem[] = [
  {
    id: 'hadith-intention',
    type: 'Hadith',
    title: 'Actions are Judged by Intentions',
    arabicExcerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    excerpt: 'Actions are judged by motives and intentions, and every person will have only what they intended.',
    source: 'Sahih al-Bukhari, Hadith 1 · Sahih Muslim 1907',
    grading: 'Sahih',
    bookNumber: 'Book of Revelation, #1',
    category: 'Spiritual',
    explanation: 'Imam ash-Shafi\'i stated this hadith is one-third of all religious knowledge. It teaches that two people can do the exact same external physical action, yet one is crowned with divine reward because their heart was oriented toward pleasing Allah, while the other gains nothing because it was done for social praise.',
    practicalReflection: 'Before sending an email, giving charity, or stepping up to help, take three seconds to renew your intention in your heart: "For You, my Lord."',
  },
  {
    id: 'hadith-mercy',
    type: 'Hadith',
    title: 'The Merciful are Shown Mercy',
    arabicExcerpt: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    excerpt: 'Those who are merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will have mercy upon you.',
    source: 'Jami` at-Tirmidhi, Hadith 1924',
    grading: 'Hasan',
    bookNumber: 'Book of Righteousness, #1924',
    category: 'Character',
    explanation: 'Traditionally, this was the very first narration (al-Hadith al-Musalsal bil-Awwaliyyah) taught by scholars to their incoming students before any jurisprudence, anchoring all knowledge in compassion toward all creations: humans, animals, and the living earth.',
    practicalReflection: 'Look for one person today who is having a hard time or making a mistake, and meet them with gentle forbearance instead of harshness.',
  },
  {
    id: 'hadith-patience',
    type: 'Hadith',
    title: 'The True Measure of Strength',
    arabicExcerpt: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
    excerpt: 'The strong person is not the one who can overpower others in wrestling; rather, the strong person is the one who controls themselves in a fit of anger.',
    source: 'Sahih al-Bukhari 6114 · Sahih Muslim 2609',
    grading: 'Sahih',
    bookNumber: 'Book of Good Manners, #6114',
    category: 'Resilience',
    explanation: 'Physical dominance is easy, but restraining the ego when offended requires superhuman spiritual grit. The Prophet ﷺ redefines manhood and dignity as emotional mastery and restraint.',
    practicalReflection: 'When you feel a spike of indignation, pause, seek refuge with Allah from shaytan, change your posture or take a breath before uttering a single syllable.',
  },
  {
    id: 'tafsir-fatiha',
    type: 'Tafsir',
    title: 'The Secret of Beginning with Praise (Al-Hamd)',
    excerpt: 'Al-hamd comprises both love and veneration. Gratitude is for favors received, whereas Hamd is for Who Allah is in His intrinsic glory as well as His gifts.',
    source: 'Tafsir Ibn Kathir · Commentary on Surah Al-Fatihah',
    grading: 'Cited Tafsir',
    category: 'Spiritual',
    explanation: 'Ibn Kathir notes that the Quran opens with praise because a servant cannot properly ask for guidance (Ihdina as-Sirat) until they have recognized the majesty and loving kindness of the Master they are addressing.',
    practicalReflection: 'When you pray today, linger on the phrase "Al-Hamdulillahi Rabbil \'Alamin" and recall three specific gifts in your life before rushing to the next verse.',
  },
  {
    id: 'hadith-smile',
    type: 'Hadith',
    title: 'Every Act of Goodness is Charity',
    arabicExcerpt: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    excerpt: 'Your smiling in the face of your brother or sister is an act of charity for you.',
    source: 'Jami` at-Tirmidhi, Hadith 1956',
    grading: 'Sahih',
    bookNumber: 'Book of Righteousness, #1956',
    category: 'Character',
    explanation: 'Charity in Islam is not restricted to those with abundant wealth. A smile, a kind greeting, removing harm from a pathway, or comforting someone in sadness are all recognized as heavenly investments.',
    practicalReflection: 'Offer a warm, welcoming presence to colleagues, cashiers, or loved ones you interact with today.',
  },
  {
    id: 'tafsir-hardship',
    type: 'Tafsir',
    title: 'The Linguistics of Hardship and Ease in Surah Ash-Sharh',
    excerpt: 'Hardship (al-usr) is singular and definite, while ease (yusran) is indefinite, meaning endless possibilities of relief unfold around every single difficulty.',
    source: 'Tafsir Al-Qurtubi & Ibn Kathir · Surah 94',
    grading: 'Cited Tafsir',
    category: 'Resilience',
    explanation: 'Grammarians highlight that repeating "yusran" twice as an indefinite noun shows that multiple reliefs, spiritual growth, and wisdom are packaged within the trial itself.',
    practicalReflection: 'Look beneath the surface of a current challenge: what new empathy, patience, or reliance on Allah is being born within you?',
  },
];

export type ReelItem = {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  topic: string;
  quote: string;
  youtubeId?: string;
  category: 'Remembrance' | 'Overcoming Grief' | 'Prayer & Peace' | 'Character';
  likesCount: number;
  featuredAyah?: string;
};

export const initialReels: ReelItem[] = [
  {
    id: 'reel-yt-_PiLcpSPfmQ',
    title: 'To Truly Rely on Allah',
    speaker: 'Nouman Ali Khan',
    duration: '1:45',
    topic: 'Tawakkul & Trust',
    quote: 'True reliance on Allah begins when you do everything in your capability, and surrender the outcome to Him.',
    youtubeId: '_PiLcpSPfmQ',
    category: 'Remembrance',
    likesCount: 1420,
    featuredAyah: 'Quran 65:3 · "And whoever relies upon Allah—then He is sufficient for him."',
  },
  {
    id: 'reel-yt-j7W44OPRVgM',
    title: 'Financial Advice from Prophet Muhammad (SAW)',
    speaker: 'Belal Assaad',
    duration: '2:10',
    topic: 'Barakah & Character',
    quote: 'Wealth does not decrease by giving in charity; rather, Allah purifies and expands the remainder.',
    youtubeId: 'j7W44OPRVgM',
    category: 'Character',
    likesCount: 2310,
    featuredAyah: 'Quran 2:261 · "The example of those who spend their wealth in the way of Allah is like a seed..."',
  },
  {
    id: 'reel-yt-9ENUuWAFKsY',
    title: 'Our Rabb and His Closeness',
    speaker: 'Hisham Abu Yusuf',
    duration: '1:30',
    topic: 'Love of Allah',
    quote: 'Whenever you feel completely alone in this world, remember: your Lord is closer to you than your jugular vein.',
    youtubeId: '9ENUuWAFKsY',
    category: 'Remembrance',
    likesCount: 1890,
    featuredAyah: 'Quran 50:16 · "And We are closer to him than his jugular vein."',
  },
  {
    id: 'reel-yt-PL3GVpsxv0I',
    title: "Allah's Reminder: A Wake-Up Call",
    speaker: 'Bilal Asaad',
    duration: '2:40',
    topic: 'Repentance & Turning Back',
    quote: 'Do not postpone repentance. Return to Allah today with your broken pieces and watch Him mend them.',
    youtubeId: 'PL3GVpsxv0I',
    category: 'Prayer & Peace',
    likesCount: 3100,
    featuredAyah: 'Quran 39:53 · "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins."',
  },
  {
    id: 'reel-yt-Ie79XObO4G8',
    title: 'Allah Loves To Meet You',
    speaker: 'Hisham Abu Yusuf',
    duration: '1:15',
    topic: 'Spiritual Longing',
    quote: 'Whoever loves to meet Allah, Allah loves to meet them. Let your heart beat in longing for His meeting.',
    youtubeId: 'Ie79XObO4G8',
    category: 'Overcoming Grief',
    likesCount: 2840,
    featuredAyah: 'Quran 13:28 · "Surely in the remembrance of Allah do hearts find rest."',
  },
];

export type ArabicLetter = {
  name: string;
  arabic: string;
  transliteration: string;
  phonetic: string;
  exampleWord: string;
  exampleMeaning: string;
  makhraj?: string;
};

export const arabicAlphabet: ArabicLetter[] = [
  { name: 'Alif', arabic: 'ا', transliteration: 'a / ā', phonetic: 'Deep open vowel sound originating from the chest cavity', exampleWord: 'أَمَل', exampleMeaning: 'Hope', makhraj: 'Al-Jawf (Oral & Chest Cavity)' },
  { name: 'Ba', arabic: 'ب', transliteration: 'b', phonetic: 'Like English "b", articulated by pressing both lips together firmly', exampleWord: 'بَرَكَة', exampleMeaning: 'Blessing', makhraj: 'Ash-Shafatayn (Lips)' },
  { name: 'Ta', arabic: 'ت', transliteration: 't', phonetic: 'Soft dental "t", tip of tongue touches the roots of upper front teeth', exampleWord: 'تَوْبَة', exampleMeaning: 'Repentance', makhraj: 'Tongue tip & Upper incisors' },
  { name: 'Tha', arabic: 'ث', transliteration: 'th', phonetic: 'Soft voiceless "th" (as in "think"), tongue tip between front teeth', exampleWord: 'ثَوَاب', exampleMeaning: 'Divine reward', makhraj: 'Tongue tip & Edges of incisors' },
  { name: 'Jim', arabic: 'ج', transliteration: 'j', phonetic: 'Soft "j" as in "gem", middle of tongue pressed against hard palate', exampleWord: 'جَنَّة', exampleMeaning: 'Paradise / Garden', makhraj: 'Wast al-Lisan (Middle of tongue)' },
  { name: 'Ha', arabic: 'ح', transliteration: 'ḥ', phonetic: 'Deep, crisp, warm friction sound produced from middle of the throat', exampleWord: 'حِكْمَة', exampleMeaning: 'Wisdom', makhraj: 'Wast al-Halq (Mid-throat)' },
  { name: 'Kha', arabic: 'خ', transliteration: 'kh', phonetic: 'Throaty rasping sound like "ch" in Scottish "loch" or German "Bach"', exampleWord: 'خَيْر', exampleMeaning: 'Goodness', makhraj: 'Adna al-Halq (Top of throat)' },
  { name: 'Dal', arabic: 'د', transliteration: 'd', phonetic: 'Light dental "d", tongue tip against roots of upper incisors', exampleWord: 'دُعَاء', exampleMeaning: 'Supplication', makhraj: 'Tongue tip & Upper incisors' },
  { name: 'Dhal', arabic: 'ذ', transliteration: 'dh', phonetic: 'Voiced "th" (as in "this" or "breathe"), tongue tip between teeth', exampleWord: 'ذِكْر', exampleMeaning: 'Remembrance', makhraj: 'Tongue tip & Edges of incisors' },
  { name: 'Ra', arabic: 'ر', transliteration: 'r', phonetic: 'Lightly rolled single tap of tongue tip near upper gum line', exampleWord: 'رَحْمَة', exampleMeaning: 'Mercy', makhraj: 'Tongue tip & Palate ridge' },
  { name: 'Zay', arabic: 'ز', transliteration: 'z', phonetic: 'Sharp buzzing "z" (as in "zebra"), tongue tip behind lower teeth', exampleWord: 'زَكَاة', exampleMeaning: 'Charity / Purification', makhraj: 'Tongue tip & Lower incisors' },
  { name: 'Sin', arabic: 'س', transliteration: 's', phonetic: 'Clean, light, whistling "s" sound (as in "sea")', exampleWord: 'سَلَام', exampleMeaning: 'Peace', makhraj: 'Tongue tip & Lower incisors' },
  { name: 'Shin', arabic: 'ش', transliteration: 'sh', phonetic: 'Soft voiceless "sh" (as in "shine"), spreading sound through mouth', exampleWord: 'شُكْر', exampleMeaning: 'Gratitude', makhraj: 'Wast al-Lisan (Middle of tongue)' },
  { name: 'Sad', arabic: 'ص', transliteration: 'ṣ', phonetic: 'Deep emphatic "s", back of tongue elevated producing full-mouth resonance', exampleWord: 'صَبْر', exampleMeaning: 'Patience', makhraj: 'Tongue tip & Lower teeth (Tafkheem)' },
  { name: 'Dad', arabic: 'ض', transliteration: 'ḍ', phonetic: 'Unique emphatic letter: side edge of tongue against upper molars', exampleWord: 'ضِيَاء', exampleMeaning: 'Radiance', makhraj: 'Hafat al-Lisan (Sides of tongue)' },
  { name: 'Ta\' (Heavy)', arabic: 'ط', transliteration: 'ṭ', phonetic: 'Heavy explosive "t", back of tongue arched toward soft palate', exampleWord: 'طَهَارَة', exampleMeaning: 'Spiritual Purity', makhraj: 'Tongue tip & Upper incisors (Emphatic)' },
  { name: 'Za\' (Heavy)', arabic: 'ظ', transliteration: 'ẓ', phonetic: 'Heavy emphatic voiced "th", tongue tip protrudes slightly', exampleWord: 'ظِلّ', exampleMeaning: 'Protective Shade', makhraj: 'Tongue tip & Upper edges (Emphatic)' },
  { name: '\'Ayn', arabic: 'ع', transliteration: 'ʿ', phonetic: 'Deep guttural compression sound from the exact center of throat', exampleWord: 'عَدْل', exampleMeaning: 'Justice / Equity', makhraj: 'Wast al-Halq (Mid-throat)' },
  { name: 'Ghayn', arabic: 'غ', transliteration: 'gh', phonetic: 'Velar voiced gargling sound from top of throat near uvula', exampleWord: 'غُفْرَان', exampleMeaning: 'Pardon & Forgiveness', makhraj: 'Adna al-Halq (Top of throat)' },
  { name: 'Fa', arabic: 'ف', transliteration: 'f', phonetic: 'Soft labiodental "f", edges of upper incisors touch wet inner lower lip', exampleWord: 'فَوْز', exampleMeaning: 'Supreme Triumph', makhraj: 'Upper teeth & Lower lip' },
  { name: 'Qaf', arabic: 'ق', transliteration: 'q', phonetic: 'Deep uvular stop from the very deepest root of the tongue', exampleWord: 'قُرْآن', exampleMeaning: 'The Noble Recitation', makhraj: 'Aqsa al-Lisan (Backmost tongue)' },
  { name: 'Kaf', arabic: 'ك', transliteration: 'k', phonetic: 'Light crisp "k" sound slightly forward from Qaf, accompanied by whisper (Hams)', exampleWord: 'كَرِيم', exampleMeaning: 'Noble & Generous', makhraj: 'Back of tongue' },
  { name: 'Lam', arabic: 'ل', transliteration: 'l', phonetic: 'Light clear "l", front tongue blade touches broad roof of mouth', exampleWord: 'لُطْف', exampleMeaning: 'Subtle Kindness / Grace', makhraj: 'Sides & tip of tongue' },
  { name: 'Meem', arabic: 'م', transliteration: 'm', phonetic: 'Warm nasalized bilabial sound made by closing both lips naturally', exampleWord: 'مَوَدَّة', exampleMeaning: 'Affectionate Love', makhraj: 'Lips & Nasal cavity (Khaishum)' },
  { name: 'Noon', arabic: 'ن', transliteration: 'n', phonetic: 'Front tongue tip with sweet nasal humming resonance (Ghunnah)', exampleWord: 'نُور', exampleMeaning: 'Divine Light', makhraj: 'Tongue tip & Nasal passage' },
  { name: 'Ha\' (Soft)', arabic: 'هـ', transliteration: 'h', phonetic: 'Deep effortless sigh breath from the deepest base of the throat', exampleWord: 'هِدَايَة', exampleMeaning: 'Guidance', makhraj: 'Aqsa al-Halq (Deepest throat)' },
  { name: 'Waw', arabic: 'و', transliteration: 'w / ū', phonetic: 'Rounded lip consonant glide or prolonged vowel "oo" sound', exampleWord: 'وَفَاء', exampleMeaning: 'Covenant Loyalty', makhraj: 'Rounded lips' },
  { name: 'Ya', arabic: 'ي', transliteration: 'y / ī', phonetic: 'Mid-palate glide sound or prolonged vowel "ee" sound', exampleWord: 'يَقِين', exampleMeaning: 'Unshakable Certainty', makhraj: 'Middle of tongue' },
];

export type ArabicVowel = {
  name: string;
  arabicSymbol: string;
  sound: string;
  description: string;
  example: string;
  exampleMeaning: string;
};

export const arabicVowels: ArabicVowel[] = [
  { name: 'Fat-hah', arabicSymbol: 'ـَ', sound: 'Short "a" (as in "bat")', description: 'A diagonal stroke written above the letter, opening the mouth vertically.', example: 'كَتَبَ (Kataba)', exampleMeaning: 'He wrote' },
  { name: 'Kasrah', arabicSymbol: 'ـِ', sound: 'Short "i" (as in "bit")', description: 'A diagonal stroke written below the letter, slightly lowering the jaw.', example: 'عِلْم (ʿIlm)', exampleMeaning: 'Knowledge' },
  { name: 'Dammah', arabicSymbol: 'ـُ', sound: 'Short "u" (as in "put")', description: 'A tiny Waw glyph written above the letter, rounding the lips forward.', example: 'نُور (Nūr)', exampleMeaning: 'Light' },
  { name: 'Sukūn', arabicSymbol: 'ـْ', sound: 'Resting consonant (No vowel)', description: 'A small circle above the letter indicating a complete pause or stop of vowel movement.', example: 'قَلْب (Qalb)', exampleMeaning: 'Heart' },
  { name: 'Shaddah', arabicSymbol: 'ـّ', sound: 'Doubled / stressed letter', description: 'A small "w" crown above the letter that combines two identical letters into one stressed syllable.', example: 'مُحَمَّد (Muḥammad)', exampleMeaning: 'The Praised One' },
  { name: 'Tanwīn Fat-h', arabicSymbol: 'ـً', sound: '"-an" nunation', description: 'Double fat-hah at word ends, indicating indefiniteness with an "-an" sound.', example: 'شُكْرًا (Shukran)', exampleMeaning: 'With gratitude' },
  { name: 'Tanwīn Kasr', arabicSymbol: 'ـٍ', sound: '"-in" nunation', description: 'Double kasrah below the final letter with an "-in" ending sound.', example: 'بِخَيْرٍ (Bi-khayr)', exampleMeaning: 'In goodness' },
  { name: 'Tanwīn Damm', arabicSymbol: 'ـٌ', sound: '"-un" nunation', description: 'Double dammah mark above the final letter with an "-un" ending sound.', example: 'سَلَامٌ (Salāmun)', exampleMeaning: 'Peace' },
];

export const lessons = [
  {
    id: 'alphabet-1',
    title: 'The Alphabet: Alif to Kha',
    subtitle: 'Master the first 7 letters and throat origins',
    duration: '6 min',
    icon: 'type',
    category: 'Basics',
    summary: 'Learn letter shapes, isolated and beginning forms, and clean pronunciation without accent interference.',
  },
  {
    id: 'alphabet-2',
    title: 'The Alphabet: Dal to Sin',
    subtitle: 'Soft dental, voiced, and buzzing letters',
    duration: '7 min',
    icon: 'type',
    category: 'Basics',
    summary: 'Focus on distinguishing similar-sounding letters like Dal vs Dhal and Ra vs Zay.',
  },
  {
    id: 'alphabet-3',
    title: 'The Alphabet: Shin to Fa',
    subtitle: 'Heavy emphatic consonants (Sad, Dad, Ta, Za, \'Ayn, Ghayn)',
    duration: '8 min',
    icon: 'type',
    category: 'Basics',
    summary: 'Master the unique Arabic letters that give the Quran its majestic timbre, especially the throat compression of \'Ayn and edge-tongue Dad.',
  },
  {
    id: 'alphabet-4',
    title: 'The Alphabet: Qaf to Ya',
    subtitle: 'Deep uvular stops, nasal letters, and vowel glides',
    duration: '6 min',
    icon: 'type',
    category: 'Basics',
    summary: 'Learn the contrast between deep Qaf and light Kaf, the flow of Lam and Meem, and the semi-vowels Waw and Ya.',
  },
  {
    id: 'vowels-1',
    title: 'Harakāt: The Short Vowels & Tanween',
    subtitle: 'Fat-hah, Kasrah, Dammah, and Nunation',
    duration: '8 min',
    icon: 'type',
    category: 'Basics',
    summary: 'Vowels bring Arabic letters to life. Understand how short vowel marks govern pronunciation and grammatical meaning.',
  },
  {
    id: 'tajweed-1',
    title: 'Tajweed: The Art of Madd (Elongation)',
    subtitle: 'Natural 2-count vs prolonged 4, 5, and 6 counts',
    duration: '8 min',
    icon: 'volume-2',
    category: 'Tajweed',
    summary: 'Madd means elongation. Learn how natural 2-beat vowels expand when followed by Hamzah or Sukun in Quranic recitation.',
  },
  {
    id: 'tajweed-2',
    title: 'Tajweed: Rules of Nun Sakinah & Tanween',
    subtitle: 'Izhar, Idgham, Iqlab, and Ikhfa',
    duration: '10 min',
    icon: 'volume-2',
    category: 'Tajweed',
    summary: 'The four golden rules governing Noon Sakinah and Tanween: clear articulation (Izhar), merging (Idgham), conversion to Meem (Iqlab), and concealed humming (Ikhfa).',
  },
  {
    id: 'tajweed-3',
    title: 'Tajweed: Qalqalah (The Echo Bounce)',
    subtitle: 'The 5 letters of resonance: Qaf, Ta, Ba, Jim, Dal',
    duration: '7 min',
    icon: 'volume-2',
    category: 'Tajweed',
    summary: 'When Qutb Jadd (قطب جد) letters carry Sukun, they release a clean rhythmic echo bounce that adds power to Quranic rhythm.',
  },
  {
    id: 'vocabulary-1',
    title: 'Words That Carry Worlds',
    subtitle: 'Rahmah, Sakīnah, and Taqwā',
    duration: '9 min',
    icon: 'book-open',
    category: 'Glossary',
    summary: 'Deep dive into Quranic words whose depth cannot be conveyed by single English synonyms.',
  },
  {
    id: 'roots-1',
    title: 'The Quranic 3-Letter Root System',
    subtitle: 'How one root blossoms into dozens of spiritual meanings',
    duration: '9 min',
    icon: 'book-open',
    category: 'Glossary',
    summary: 'Understand how tri-consonantal Arabic roots like S-L-M (Peace), R-H-M (Mercy), and Sh-K-R (Gratitude) generate families of interrelated vocabulary.',
  },
];

export type GlossaryWord = {
  arabic: string;
  transliteration: string;
  root: string;
  meaning: string;
  deepExplanation: string;
  quranicOccurrence: string;
};

export const glossary: GlossaryWord[] = [
  {
    arabic: 'سَكِينَة',
    transliteration: 'Sakīnah',
    root: 'س - ك - ن (S-K-N: to dwell, rest, be calm)',
    meaning: 'A settling, tranquil serenity that descends upon the heart.',
    deepExplanation: 'Unlike superficial calmness, Sakīnah is a spiritual peace that descends directly from Allah in the middle of turbulence and battle, steadying the believer so fear dissolves.',
    quranicOccurrence: 'Quran 48:4 · "It is He who sent down Sakīnah into the hearts of the believers."',
  },
  {
    arabic: 'رَحْمَة',
    transliteration: 'Raḥmah',
    root: 'ر - ح - م (R-Ḥ-M: womb, tender compassion)',
    meaning: 'All-embracing mercy, gentleness, and protective love.',
    deepExplanation: 'Sharing the exact linguistic root with "Rahim" (the maternal womb), Rahmah implies nourishment, protection, and unconditional tenderness bestowed before asking.',
    quranicOccurrence: 'Quran 7:156 · "My mercy encompasses all things."',
  },
  {
    arabic: 'تَقْوَى',
    transliteration: 'Taqwā',
    root: 'و - ق - ي (W-Q-Y: to shield, safeguard)',
    meaning: 'A living, vigilant consciousness of Allah that guides choices.',
    deepExplanation: 'Often translated as "fear of God," Taqwā is truly a protective shield of love and awe—like walking through a field of thorns with your robes lifted high, mindful of every step.',
    quranicOccurrence: 'Quran 2:197 · "And take provisions, but indeed, the best provision is Taqwā."',
  },
  {
    arabic: 'تَوَكُّل',
    transliteration: 'Tawakkul',
    root: 'و - ك - ل (W-K-L: to entrust, rely upon)',
    meaning: 'Active reliance: tying your camel first, then trusting Allah with the outcome.',
    deepExplanation: 'True Tawakkul is doing everything humanly possible with excellence, while having zero attachment to your own effort and 100% confidence in Allah’s decree.',
    quranicOccurrence: 'Quran 65:3 · "And whoever relies upon Allah—then He is sufficient for him."',
  },
  {
    arabic: 'صَبْر',
    transliteration: 'Ṣabr',
    root: 'ص - ب - ر (Ṣ-B-R: to restrain, withstand)',
    meaning: 'Steadfast perseverance with beautiful dignity.',
    deepExplanation: 'Sabr is not passive suffering or bitter surrender. It is active endurance with a sweet tongue (Sabr Jameel), refusing to despair while actively working for goodness.',
    quranicOccurrence: 'Quran 2:153 · "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient."',
  },
  {
    arabic: 'إِحْسَان',
    transliteration: 'Iḥsān',
    root: 'ح - س - ن (Ḥ-S-N: beauty, excellence)',
    meaning: 'Spiritual excellence: worshiping Allah as though you see Him.',
    deepExplanation: 'The highest station of faith: doing everything with artistic beauty and moral integrity, knowing that even if you do not see Him, He sees you.',
    quranicOccurrence: 'Hadith Jibril · "Ihsan is to worship Allah as though you see Him."',
  },
  {
    arabic: 'إِخْلَاص',
    transliteration: 'Ikhlāṣ',
    root: 'خ - ل - ص (Kh-L-Ṣ: pure, unadulterated)',
    meaning: 'Complete purity of motive for the sake of Allah alone.',
    deepExplanation: 'Clearing your heart of all desire for applause, praise, or worldly benefit, so that your actions are as clear as purified honey.',
    quranicOccurrence: 'Quran 98:5 · "And they were not commanded except to worship Allah, being sincere to Him in religion."',
  },
  {
    arabic: 'شُكْر',
    transliteration: 'Shukr',
    root: 'ش - ك - ر (Sh-K-R: to acknowledge bounty, overflow)',
    meaning: 'Heartfelt recognition of favors that manifests in grateful action.',
    deepExplanation: 'True Shukr involves three stages: heart acknowledgment, verbal praise, and using the blessing in a manner that pleases the Giver.',
    quranicOccurrence: 'Quran 14:7 · "If you are grateful, I will surely increase you."',
  },
  {
    arabic: 'مَغْفِرَة',
    transliteration: 'Maghfirah',
    root: 'غ - ف - ر (Gh-F-R: to cover, protect like a helmet)',
    meaning: 'Pardon that shields the servant from both the guilt and consequences of sin.',
    deepExplanation: 'Derived from "Mighfar" (a warrior\'s protective helmet), Maghfirah does not just erase sin; it shields the soul from spiritual harm and humiliation.',
    quranicOccurrence: 'Quran 3:133 · "And hasten to forgiveness from your Lord."',
  },
  {
    arabic: 'بَرَكَة',
    transliteration: 'Barakah',
    root: 'ب - ر - ك (B-R-K: to kneel, establish firmly, spring of water)',
    meaning: 'Divine abundance that causes a small amount to satisfy and endure.',
    deepExplanation: 'Barakah is intangible divine value added to time, wealth, health, or food, making a humble provision yield lasting spiritual fruit.',
    quranicOccurrence: 'Quran 7:96 · "We would have opened for them blessings from the heaven and the earth."',
  },
  {
    arabic: 'نُور',
    transliteration: 'Nūr',
    root: 'ن - و - ر (N-W-R: radiant illumination)',
    meaning: 'Divine spiritual light that guides perception and dispels darkness.',
    deepExplanation: 'In Quranic terminology, Nur is not merely optical radiance; it is the spiritual clarity that illuminates moral judgment and revives the dormant soul.',
    quranicOccurrence: 'Quran 24:35 · "Allah is the Light of the heavens and the earth."',
  },
  {
    arabic: 'حِكْمَة',
    transliteration: 'Ḥikmah',
    root: 'ح - ك - م (Ḥ-K-M: to restrain, place a bridle, judge justly)',
    meaning: 'Wisdom: placing everything in its exact, rightful place with discernment.',
    deepExplanation: 'Knowledge is possessing facts, but Hikmah is the spiritual insight to act with appropriate timing, gentleness, and moral justice.',
    quranicOccurrence: 'Quran 2:269 · "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given abundant good."',
  },
  {
    arabic: 'فِطْرَة',
    transliteration: 'Fiṭrah',
    root: 'ف - ط - ر (F-Ṭ-R: to originate, split open naturally)',
    meaning: 'The primordial, innate human inclination toward monotheism and moral good.',
    deepExplanation: 'Every human soul is born with an innate spiritual compass attuned to recognize truth, divine oneness, and compassion before social conditioning.',
    quranicOccurrence: 'Quran 30:30 · "The natural disposition of Allah upon which He has created mankind."',
  },
  {
    arabic: 'يَقِين',
    transliteration: 'Yaqīn',
    root: 'ي - ق - ن (Y-Q-N: clear water, settled truth)',
    meaning: 'Unwavering certainty that dispels all doubt and anxiety.',
    deepExplanation: 'Scholars distinguish three levels: knowledge of certainty (\'Ilm al-Yaqeen), seeing with eyes of certainty (\'Ayn al-Yaqeen), and total living reality (Haqq al-Yaqeen).',
    quranicOccurrence: 'Quran 15:99 · "And worship your Lord until there comes to you the certainty."',
  },
];

export type DailyDua = {
  id: string;
  title: string;
  category: 'Morning & Evening' | 'Peace & Forgiveness' | 'Guidance & Knowledge' | 'Protection & Ease';
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  benefit: string;
};

export const dailyDuas: DailyDua[] = [
  {
    id: 'dua-knowledge',
    title: 'Seeking Beneficial Knowledge',
    category: 'Guidance & Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidnī ʿilmā',
    translation: 'My Lord, increase me in knowledge.',
    source: 'Quran 20:114 (Surah Ta-Ha)',
    benefit: 'The only increase the Prophet ﷺ was commanded by Allah to pray for.',
  },
  {
    id: 'dua-ease',
    title: 'Easing Any Difficult Task',
    category: 'Protection & Ease',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allāhumma lā sahla illā mā jaʿaltahu sahlā, wa-anta tajʿalu al-ḥazna idhā shiʾta sahlā',
    translation: 'O Allah, there is no ease except that which You make easy, and You make hardship, if You will, into ease.',
    source: 'Sahih Ibn Hibban #974',
    benefit: 'Recited before interviews, exams, difficult conversations, or overwhelming responsibilities.',
  },
  {
    id: 'dua-peace',
    title: 'Relief from Anxiety and Sorrow',
    category: 'Peace & Forgiveness',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Ḥasbunā Allāhu wa-niʿma al-wakīl',
    translation: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
    source: 'Quran 3:173 (Ali \'Imran)',
    benefit: 'The prayer uttered by Ibrahim in the fire and Muhammad ﷺ at Hamra al-Asad.',
  },
  {
    id: 'dua-forgiveness',
    title: 'The Master Supplication for Forgiveness (Sayyid al-Istighfar)',
    category: 'Peace & Forgiveness',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā ant, khalaqtanī wa-anā ʿabduk, wa-anā ʿalā ʿahdika wa-waʿdika mā-staṭaʿt, aʿūdhu bika min sharri mā ṣanaʿt, abūʾu laka bi-niʿmatika ʿalayya, wa-abūʾu bi-dhanbī faghfir lī fa-innahu lā yaghfiru adh-dhunūba illā ant',
    translation: 'O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant, and I uphold Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me, and I confess my sins, so forgive me, for none forgives sins except You.',
    source: 'Sahih al-Bukhari #6306',
    benefit: 'Recited with sincere certainty in morning or evening guarantees entry to Paradise.',
  },
  {
    id: 'dua-morning',
    title: 'Sanctuary of the Morning & Evening',
    category: 'Morning & Evening',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismi Allāhi alladhī lā yaḍurru maʿa ismihi shayʾun fī al-arḍi wa-lā fī as-samāʾi wa-huwa as-Samīʿu al-ʿAlīm',
    translation: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    source: 'Sunan Abi Dawud #5088 · Tirmidhi #3388',
    benefit: 'Whoever recites it three times in the morning and evening will not be harmed by anything.',
  },
  {
    id: 'dua-parents',
    title: 'Tender Prayer for Parents',
    category: 'Guidance & Knowledge',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irḥamhumā kamā rabbayānī ṣaghīrā',
    translation: 'My Lord, have mercy upon them as they brought me up when I was small.',
    source: 'Quran 17:24 (Surah Al-Isra)',
    benefit: 'Fulfills filial gratitude and brings barakah to family bonds.',
  },
];
