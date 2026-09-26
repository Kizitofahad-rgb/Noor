export type MoodId = 'anxious' | 'grateful' | 'grieving' | 'guidance';

export type Mood = {
  id: MoodId;
  label: string;
  icon: 'cloud' | 'sun' | 'heart' | 'compass';
};

export const moods: Mood[] = [
  { id: 'anxious', label: 'Anxious', icon: 'cloud' },
  { id: 'grateful', label: 'Grateful', icon: 'sun' },
  { id: 'grieving', label: 'Grieving', icon: 'heart' },
  { id: 'guidance', label: 'Seeking guidance', icon: 'compass' },
];

export const reflections: Record<MoodId, {
  arabic: string;
  translation: string;
  reference: string;
  note: string;
}> = {
  anxious: {
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Surely in the remembrance of Allah do hearts find rest.',
    reference: 'Quran 13:28 · Ar-Ra’d',
    note: 'Rest does not always arrive as an answer. Sometimes it begins as remembering who is with you in the question.',
  },
  grateful: {
    arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translation: 'If you are grateful, I will certainly give you more.',
    reference: 'Quran 14:7 · Ibrahim',
    note: 'Gratitude turns what is already present into something we can truly see.',
  },
  grieving: {
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease.',
    reference: 'Quran 94:6 · Ash-Sharh',
    note: 'The promise is not that hardship is unseen. It is that it is never the whole story.',
  },
  guidance: {
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Quran 20:114 · Ta-Ha',
    note: 'A sincere request for guidance is itself a step toward it.',
  },
};

// ── Quran section types ──────────────────────────────────────────────

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
  reflection: string;
};

export type SurahIntro = {
  nameMeaning: string;
  verseCount: number;
  note: string;
};

export type Surah = {
  id: string;
  number: string;
  name: string;
  arabic: string;
  meaning: string;
  verses: number;
  time: string;
  progress: number;
  revelation: string;
  intro: SurahIntro;
};

export const surahs: Surah[] = [
  {
    id: '1',
    number: '01',
    name: 'Al-Fatihah',
    arabic: 'الفاتحة',
    meaning: 'The Opening',
    verses: 7,
    time: '3 min',
    progress: 100,
    revelation: 'Meccan',
    intro: {
      nameMeaning: 'The Opening',
      verseCount: 7,
      note: 'Translations are an aid to meaning, not a replacement for the Arabic. A qualified teacher is still the best source.',
    },
  },
  {
    id: '36',
    number: '36',
    name: 'Ya-Sin',
    arabic: 'يس',
    meaning: 'Ya Sin',
    verses: 83,
    time: '24 min',
    progress: 32,
    revelation: 'Meccan',
    intro: {
      nameMeaning: 'Ya Sin',
      verseCount: 83,
      note: 'Translations are an aid to meaning, not a replacement for the Arabic. A qualified teacher is still the best source.',
    },
  },
  {
    id: '55',
    number: '55',
    name: 'Ar-Rahman',
    arabic: 'الرحمن',
    meaning: 'The Most Merciful',
    verses: 78,
    time: '19 min',
    progress: 0,
    revelation: 'Medinan',
    intro: {
      nameMeaning: 'The Most Merciful',
      verseCount: 78,
      note: 'Translations are an aid to meaning, not a replacement for the Arabic. A qualified teacher is still the best source.',
    },
  },
  {
    id: '67',
    number: '67',
    name: 'Al-Mulk',
    arabic: 'الملك',
    meaning: 'The Kingdom',
    verses: 30,
    time: '9 min',
    progress: 0,
    revelation: 'Meccan',
    intro: {
      nameMeaning: 'The Kingdom',
      verseCount: 30,
      note: 'Translations are an aid to meaning, not a replacement for the Arabic. A qualified teacher is still the best source.',
    },
  },
];

export const verses: QuranVerse[] = [
  {
    number: 1,
    surahId: '1',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismi-llāhi r-raḥmāni r-raḥīm',
    simpleMeaning: 'In the name of Allah, the Most Compassionate, the Most Merciful.',
    understanding: [
      '"Bismi" means "in the name of." It is how a believer begins — not with their own will, but with Allah\'s name.',
      '"Allah" is the proper name of God in Arabic, unique to Him. It cannot be made plural or gendered.',
      '"Ar-Rahman" comes from "rahmah" (mercy) and means a vast, all-encompassing compassion that covers everything in existence.',
      '"Ar-Rahim" also comes from "rahmah" but describes a mercy that is continuous and specific — directed toward believers in a lasting way.',
    ],
    reflectionQuestions: [
      'What does it mean to begin something with Allah\'s name rather than my own intention?',
      'How would my day change if I truly believed mercy was the first thing offered to me?',
      'Where in my life am I being invited to begin again?',
    ],
    dua: 'O Allah, let me begin this with Your name and end it with Your praise. Cover me with Your mercy in what I set out to do.',
    words: [
      { arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'In the name' },
      { arabic: 'اللَّهِ', transliteration: 'Allāhi', translation: 'of Allah', tajweed: ['madd'] },
      { arabic: 'الرَّحْمَنِ', transliteration: 'Ar-Raḥmāni', translation: 'the Most Compassionate', tajweed: ['madd'] },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīmi', translation: 'the Most Merciful', tajweed: ['madd'] },
    ],
    translation: 'In the Name of Allah—the Most Compassionate, Most Merciful.',
    reflection: 'Every beginning can be returned to mercy.',
  },
  {
    number: 2,
    surahId: '1',
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn',
    simpleMeaning: 'All praise belongs to Allah, the Lord of all worlds.',
    understanding: [
      '"Al-hamd" is more than gratitude (shukr). It is praise mixed with love and awe — acknowledging Allah\'s perfection, not just His gifts.',
      '"Rabb" means Lord, but also sustainer, caretaker, and the one who nurtures something from nothing to its full potential.',
      '"Al-ʿālamin" means all the worlds — the seen and unseen, the heavens and earth, humans and angels, plants and stars. Everything that exists.',
    ],
    reflectionQuestions: [
      'When was the last time I praised Allah for who He is, not just for what He gave me?',
      'What would it feel like to see my whole life as sustained by a Rabb who never stops caring?',
      'What is one small thing in my day that I have stopped noticing as a gift?',
    ],
    dua: 'O Allah, let praise of You be the first thing on my tongue and the last thing in my heart. Help me see Your care in what I too easily forget.',
    words: [
      { arabic: 'الْحَمْدُ', transliteration: 'Al-ḥamdu', translation: 'All praise' },
      { arabic: 'لِلَّهِ', transliteration: 'Lillāhi', translation: 'is for Allah', tajweed: ['madd'] },
      { arabic: 'رَبِّ', transliteration: 'Rabbi', translation: 'Lord' },
      { arabic: 'الْعَالَمِينَ', transliteration: 'Al-ʿĀlamīna', translation: 'of the worlds', tajweed: ['madd'] },
    ],
    translation: 'All praise is for Allah—Lord of the worlds.',
    reflection: 'Praise widens the heart beyond what is immediately in front of it.',
  },
  {
    number: 3,
    surahId: '1',
    arabic: 'الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Ar-raḥmāni r-raḥīm',
    simpleMeaning: 'The Most Compassionate, the Most Merciful.',
    understanding: [
      'These two names appear together again, right after "Lord of the worlds." Mercy follows lordship — power is introduced through compassion, not fear.',
      '"Ar-Rahman" is mentioned first because it is broader — it reaches everyone and everything, whether they believe or not.',
      '"Ar-Rahim" comes second because it is more intimate — a mercy that stays, that responds to the one who turns back.',
    ],
    reflectionQuestions: [
      'If Allah\'s mercy reaches everyone, what does that mean for how I treat people I struggle to love?',
      'What would change in me if I trusted that mercy is offered before I even ask?',
      'Can I recall a moment when I felt mercy I did not earn?',
    ],
    dua: 'O Allah, let me never mistake Your patience for absence. Teach me to return to Your mercy the way the day returns to light.',
    words: [
      { arabic: 'الرَّحْمَنِ', transliteration: 'Ar-Raḥmāni', translation: 'the Most Compassionate', tajweed: ['madd'] },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīmi', translation: 'the Most Merciful', tajweed: ['madd'] },
    ],
    translation: 'The Most Compassionate, Most Merciful.',
    reflection: 'Mercy is not a footnote in the Quran. It is how the conversation begins.',
  },
  {
    number: 4,
    surahId: '1',
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    transliteration: 'Māliki yawmi d-dīn',
    simpleMeaning: 'Master of the Day of Judgment.',
    understanding: [
      '"Malik" means king or master — one who has absolute authority. On that day, no one else\'s authority remains.',
      '"Yawm" means day, but here it refers to the Day of Judgment — a day whose length only Allah knows.',
      '"Din" here means judgment or recompense. It is the day when every action, hidden and open, finds its true weight.',
    ],
    reflectionQuestions: [
      'If I truly believed every action was seen, what would I do differently today?',
      'What is one thing I am hiding from myself that I would not want to bring to that day?',
      'How does knowing there is a Day of Judgment change the way I see justice in this life?',
    ],
    dua: 'O Allah, make me accountable to myself before I am held accountable. Let me live each day as if I can see that Day approaching.',
    words: [
      { arabic: 'مَالِكِ', transliteration: 'Māliki', translation: 'Master', tajweed: ['madd'] },
      { arabic: 'يَوْمِ', transliteration: 'Yawmi', translation: 'of the Day' },
      { arabic: 'الدِّينِ', transliteration: 'Ad-Dīni', translation: 'of Judgment', tajweed: ['madd'] },
    ],
    translation: 'Master of the Day of Judgment.',
    reflection: 'Accountability and hope can live in the same sentence.',
  },
  {
    number: 5,
    surahId: '1',
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
    simpleMeaning: 'You alone we worship, and You alone we ask for help.',
    understanding: [
      '"Iyyāka" means "You alone" — the word is placed first in the sentence for emphasis. It is not "we worship You" but "You alone we worship."',
      '"Naʿbudu" means we worship, from ʿibādah — worship is not only prayer, but every act done for Allah.',
      '"Nastaʿīn" means we seek help. The verse teaches that even the strength to worship comes from Allah — we need His help to worship Him.',
    ],
    reflectionQuestions: [
      'What in my life am I treating as if it deserves the devotion that belongs to Allah alone?',
      'Where am I still trying to manage on my own, without asking for help?',
      'What would it look like to let worship be a way of living, not just a set of prayers?',
    ],
    dua: 'O Allah, I cannot worship You without Your help. Teach me to rely on You in what I do and to ask before I act.',
    words: [
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyāka', translation: 'You alone', tajweed: ['madd'] },
      { arabic: 'نَعْبُدُ', transliteration: 'Naʿbudu', translation: 'we worship' },
      { arabic: 'وَإِيَّاكَ', transliteration: 'Wa-iyyāka', translation: 'and You alone', tajweed: ['madd'] },
      { arabic: 'نَسْتَعِينُ', transliteration: 'Nastaʿīn', translation: 'we ask for help', tajweed: ['madd'] },
    ],
    translation: 'You alone we worship and You alone we ask for help.',
    reflection: 'Worship is not performance. It is returning to the One we need.',
  },
  {
    number: 6,
    surahId: '1',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm',
    simpleMeaning: 'Guide us along the Straight Path.',
    understanding: [
      '"Ihdinā" means "guide us" — from the root word for gift (hadiyah). Guidance itself is a gift, not something earned.',
      '"Aṣ-ṣirāṭ" means the path — a clear, well-defined road, not a vague direction.',
      '"Al-mustaqīm" means straight, upright, without deviation. It is the path that leads directly to Allah without detours.',
    ],
    reflectionQuestions: [
      'If guidance is a gift, what am I doing to receive it rather than earn it?',
      'What does the Straight Path look like in the choices I face this week?',
      'Where have I been confusing my own way with the right way?',
    ],
    dua: 'O Allah, guide me to the path that leads to You. When I drift, pull me back. When I stumble, steady my feet.',
    words: [
      { arabic: 'اهْدِنَا', transliteration: 'Ihdinā', translation: 'Guide us' },
      { arabic: 'الصِّرَاطَ', transliteration: 'Aṣ-Ṣirāṭa', translation: 'to the path' },
      { arabic: 'الْمُسْتَقِيمَ', transliteration: 'Al-Mustaqīma', translation: 'the Straight' },
    ],
    translation: 'Guide us along the Straight Path.',
    reflection: 'Guidance is asked for in the present tense, again and again.',
  },
  {
    number: 7,
    surahId: '1',
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Ṣirāṭa alladhīna anʿamta ʿalayhim ghayri l-maghdūbi ʿalayhim wa-lā ḍ-ḍāllīn',
    simpleMeaning: 'The path of those You have blessed — not those who earned Your anger, nor those who went astray.',
    understanding: [
      '"Anʿamta ʿalayhim" means those You have blessed — the prophets, the truthful, the steadfast, and the righteous.',
      '"Al-maghdūbi ʿalayhim" means those who earned anger — people who knew the truth but chose to turn away from it.',
      '"Aḍ-ḍāllīn" means those who are astray — people who lost the way, not out of rebellion, but out of carelessness or ignorance.',
    ],
    reflectionQuestions: [
      'Who are the people whose path I want to follow, and what makes their path one of blessing?',
      'Where in my life am I closer to knowing the truth but turning away from it?',
      'Where am I simply not paying attention — and how is that slowly leading me astray?',
    ],
    dua: 'O Allah, place me among those You have blessed. Keep me from knowing the truth and turning from it, and from drifting away through carelessness.',
    words: [
      { arabic: 'صِرَاطَ', transliteration: 'Ṣirāṭa', translation: 'The path' },
      { arabic: 'الَّذِينَ', transliteration: 'Alladhīna', translation: 'of those', tajweed: ['madd'] },
      { arabic: 'أَنْعَمْتَ', transliteration: 'Anʿamta', translation: 'You have blessed' },
      { arabic: 'عَلَيْهِمْ', transliteration: 'ʿAlayhim', translation: 'upon them' },
      { arabic: 'غَيْرِ', transliteration: 'Ghayri', translation: 'not' },
      { arabic: 'الْمَغْضُوبِ', transliteration: 'Al-Maghdūbi', translation: 'who earned anger' },
      { arabic: 'عَلَيْهِمْ', transliteration: 'ʿAlayhim', translation: 'upon them' },
      { arabic: 'وَلَا', transliteration: 'Wa-lā', translation: 'and not' },
      { arabic: 'الضَّالِّينَ', transliteration: 'Aḍ-ḍāllīna', translation: 'who are astray', tajweed: ['madd'] },
    ],
    translation: 'The path of those You have blessed—not those You are displeased with, or those who are astray.',
    reflection: 'A path is easier to walk when we know what kind of company we are seeking.',
  },
];

export type LibraryItem = {
  id: string;
  type: 'Hadith' | 'Tafsir';
  title: string;
  excerpt: string;
  source: string;
  grading?: string;
  explanation: string;
};

export const libraryItems: LibraryItem[] = [
  {
    id: 'hadith-intention',
    type: 'Hadith',
    title: 'Actions are judged by intentions',
    excerpt: 'Actions are judged by intentions, and every person will be rewarded according to their intention.',
    source: 'Sahih al-Bukhari, Book 1, Hadith 1',
    grading: 'Sahih',
    explanation: 'This hadith brings attention back to the quiet beginning of an action. Before asking whether something is impressive, ask what it is for.',
  },
  {
    id: 'hadith-mercy',
    type: 'Hadith',
    title: 'The merciful are shown mercy',
    excerpt: 'The merciful will be shown mercy by the Most Merciful. Be merciful to those on earth and the One above the heavens will have mercy upon you.',
    source: 'Jami` at-Tirmidhi, 1924',
    grading: 'Hasan',
    explanation: 'Mercy is described as a practice that moves through a community. It is something to extend, not only something to hope for.',
  },
  {
    id: 'tafsir-fatiha',
    type: 'Tafsir',
    title: 'Beginning with praise',
    excerpt: 'Al-hamd means praise with love and veneration. It is a fuller expression than gratitude alone.',
    source: 'Tafsir Ibn Kathir · Quran 1:2',
    explanation: 'The opening of the Quran teaches a way of seeing before it teaches a list of instructions: notice the One who sustains every world.',
  },
];

export const lessons = [
  { id: 'alphabet-1', title: 'The alphabet: Alif to Kha', subtitle: 'Recognize the first six letters', duration: '6 min', progress: 100, icon: 'type' as const },
  { id: 'tajweed-1', title: 'A gentle start to tajweed', subtitle: 'Why pronunciation is an act of care', duration: '8 min', progress: 45, icon: 'volume-2' as const },
  { id: 'vocabulary-1', title: 'Words that carry worlds', subtitle: 'Rahmah, sakinah, and taqwa', duration: '10 min', progress: 0, icon: 'book-open' as const },
];

export const glossary = [
  { arabic: 'سَكِينَة', transliteration: 'sakinah', meaning: 'A settling calm that Allah places in the heart.' },
  { arabic: 'رَحْمَة', transliteration: 'rahmah', meaning: 'Mercy that moves toward someone with care.' },
  { arabic: 'تَقْوَى', transliteration: 'taqwa', meaning: 'A living awareness of Allah that shapes choices.' },
];
