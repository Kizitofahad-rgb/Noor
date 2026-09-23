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

export const surahs = [
  { id: '1', number: '01', name: 'Al-Fatihah', arabic: 'الفاتحة', meaning: 'The Opening', verses: 7, time: '3 min', progress: 100, revelation: 'Meccan' },
  { id: '36', number: '36', name: 'Ya-Sin', arabic: 'يس', meaning: 'Ya Sin', verses: 83, time: '24 min', progress: 32, revelation: 'Meccan' },
  { id: '55', number: '55', name: 'Ar-Rahman', arabic: 'الرحمن', meaning: 'The Most Merciful', verses: 78, time: '19 min', progress: 0, revelation: 'Medinan' },
  { id: '67', number: '67', name: 'Al-Mulk', arabic: 'الملك', meaning: 'The Kingdom', verses: 30, time: '9 min', progress: 0, revelation: 'Meccan' },
];

export const verses = [
  {
    number: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    translation: 'In the Name of Allah—the Most Compassionate, Most Merciful.',
    reflection: 'Every beginning can be returned to mercy.',
  },
  {
    number: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translation: 'All praise is for Allah—Lord of the worlds.',
    reflection: 'Praise widens the heart beyond what is immediately in front of it.',
  },
  {
    number: 3,
    arabic: 'الرَّحْمَنِ الرَّحِيمِ',
    translation: 'The Most Compassionate, Most Merciful.',
    reflection: 'Mercy is not a footnote in the Quran. It is how the conversation begins.',
  },
  {
    number: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    translation: 'Master of the Day of Judgment.',
    reflection: 'Accountability and hope can live in the same sentence.',
  },
  {
    number: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'You alone we worship and You alone we ask for help.',
    reflection: 'Worship is not performance. It is returning to the One we need.',
  },
  {
    number: 6,
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    translation: 'Guide us along the Straight Path.',
    reflection: 'Guidance is asked for in the present tense, again and again.',
  },
  {
    number: 7,
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
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