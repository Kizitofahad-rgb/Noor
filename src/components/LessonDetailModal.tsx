import React, { useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Layers,
  Award,
} from 'lucide-react';
import { OrnamentedCard, BorderedSubPanel, CornerFlourishes } from './Ornamentation';

export interface LessonDetail {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
  summary: string;
  objectives: string[];
  sections: {
    heading: string;
    description: string;
    examples?: {
      arabic: string;
      transliteration: string;
      meaning: string;
      audioText?: string;
      note?: string;
    }[];
    tips?: string[];
  }[];
  quranicApplication?: {
    verseArabic: string;
    verseRef: string;
    explanation: string;
  };
}

const detailedLessonsData: Record<string, LessonDetail> = {
  'alphabet-1': {
    id: 'alphabet-1',
    title: 'The Alphabet: Alif to Kha (أ إلى خ)',
    subtitle: 'Master the first 7 letters, throat origins, and primary letterforms',
    duration: '6 min',
    category: 'Basics',
    summary: 'The Arabic alphabet is phonetic and deeply spiritual. Every single letter has a precise articulation point (Makhraj) in the vocal tract that gives Quranic recitation its sublime musicality.',
    objectives: [
      'Recognize and pronounce Alif, Ba, Ta, Tha, Jim, Ha, and Kha.',
      'Distinguish between soft dental Tha (ث) and sharp letters.',
      'Master the throat compression of the deep throat letter Ha (ح) versus the rasping friction of Kha (خ).',
    ],
    sections: [
      {
        heading: '1. The First Seven Sacred Letters',
        description: 'Arabic is written right-to-left in cursive script. The first seven letters encompass both vocalic breath and throat articulation:',
        examples: [
          { arabic: 'أَلِف (ا)', transliteration: 'Alif', meaning: 'The letter of breath and extension. The tall, straight staff of unity.', audioText: 'أَلِف' },
          { arabic: 'بَاء (ب)', transliteration: 'Bāʾ', meaning: 'Formed by pressing the two lips lightly together with a single dot below.', audioText: 'بَاء' },
          { arabic: 'تَاء (ت)', transliteration: 'Tāʾ', meaning: 'Formed from the tip of the tongue touching the upper incisors with two dots above.', audioText: 'تَاء' },
          { arabic: 'ثَاء (ث)', transliteration: 'Thāʾ', meaning: 'Soft "th" (like "think"), placing the tip of the tongue gently between the teeth with three dots.', audioText: 'ثَاء' },
          { arabic: 'جِيم (ج)', transliteration: 'Jīm', meaning: 'The middle of the tongue meets the hard palate to produce a rich "j" sound.', audioText: 'جِيم' },
          { arabic: 'حَاء (ح)', transliteration: 'Ḥāʾ', meaning: 'Pure voiceless pharyngeal friction from the middle of the throat, clean like warm breath on a mirror.', audioText: 'حَاء' },
          { arabic: 'خَاء (خ)', transliteration: 'Khāʾ', meaning: 'Produced from the upper throat near the uvula with a soft guttural rasp (like Scottish "loch").', audioText: 'خَاء' },
        ],
      },
      {
        heading: '2. Articulation Points (Makhārij)',
        description: 'In Tajweed science, letters are grouped by their anatomical home:',
        tips: [
          'The Throat (Al-Halq): Ha (ح) and Kha (خ) originate from the middle and upper throat respectively.',
          'The Lips (Ash-Shafatayn): Ba (ب) engages both moist portions of the lips.',
          'The Tongue Tip (Taraf al-Lisan): Ta (ت) and Tha (ث) rely on precise tongue tip contact.',
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      verseRef: 'Quran 1:1',
      explanation: 'Notice the Ba (ب) opening the first word "Bismi" and the Ha (ح) echoing through "Ar-Rahman" and "Ar-Rahim".',
    },
  },
  'alphabet-2': {
    id: 'alphabet-2',
    title: 'The Alphabet: Dal to Sin (د إلى س)',
    subtitle: 'Soft dental, voiced, and buzzing letters',
    duration: '7 min',
    category: 'Basics',
    summary: 'This group teaches vital phonetic contrasts between non-emphatic dental stops and whistling/buzzing consonants that must never be confused in Quran recitation.',
    objectives: [
      'Contrast light Dal (د) with interdental Dhal (ذ).',
      'Distinguish the rolled vibrant Ra (ر) from the buzzing Zay (ز).',
      'Master the clean whisper of Sin (س).',
    ],
    sections: [
      {
        heading: '1. Exploring Letters Dal through Sin',
        description: 'Notice how pairs share identical shapes and are differentiated only by the presence of a diacritical dot:',
        examples: [
          { arabic: 'دَال (د)', transliteration: 'Dāl', meaning: 'Light "d" stop with the tongue tip against the roots of upper front teeth.', audioText: 'دَال' },
          { arabic: 'ذَال (ذ)', transliteration: 'Dhāl', meaning: 'Voiced "th" sound (as in "this" or "father"), tongue tip between teeth.', audioText: 'ذَال' },
          { arabic: 'رَاء (ر)', transliteration: 'Rāʾ', meaning: 'Vibrant trill of the tongue. Pronounced heavy (Mufakhkham) with Fat-ha/Damma, light (Muraqqaq) with Kasra.', audioText: 'رَاء' },
          { arabic: 'زَاي (ز)', transliteration: 'Zāy', meaning: 'Sharp musical buzzing "z" sound of whistling clarity (Saffeer).', audioText: 'زَاي' },
          { arabic: 'سِين (س)', transliteration: 'Sīn', meaning: 'Clear, light "s" with whisper of breath (Hams) and whistling quality.', audioText: 'سِين' },
        ],
      },
      {
        heading: '2. The Danger of Confusing Dhāl and Zāy',
        description: 'In Arabic, swapping Dhāl for Zāy alters sacred meanings entirely:',
        tips: [
          'Dhal (ذ) uses the tip of the tongue gently protruding between the upper and lower teeth.',
          'Zay (ز) keeps the teeth nearly closed with the tongue tip resting behind the lower teeth.',
          'Practice contrasting: "Adhkur" (remember) versus "Az-kay" (purify).',
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      verseRef: 'Quran 1:6',
      explanation: 'The letter Sin appears in "Al-Mustaqeem" with a clear, crisp whistle of breath.',
    },
  },
  'alphabet-3': {
    id: 'alphabet-3',
    title: 'The Alphabet: Shin to Fa (ش إلى ف)',
    subtitle: 'Heavy emphatic consonants (Sad, Dad, Ta, Za, \'Ayn, Ghayn)',
    duration: '8 min',
    category: 'Basics',
    summary: 'The heart of Arabic acoustic uniqueness. Emphatic letters (Isti\'la) raise the back of the tongue toward the soft palate to produce deep, full-bodied resonance.',
    objectives: [
      'Master the distinction between light Sin (س) and heavy Sad (ص).',
      'Learn the unique articulation of Dad (ض) from the edge of the tongue.',
      'Pronounce the throat compression of \'Ayn (ع) and upper-throat Ghayn (غ).',
    ],
    sections: [
      {
        heading: '1. The Heavy Emphatics and Guttural Powers',
        description: 'Notice how raising the posterior tongue transforms everyday vowels into majestic resonance:',
        examples: [
          { arabic: 'شِين (ش)', transliteration: 'Shīn', meaning: 'Full spreading of the sound (Tafash-shee) through the mouth like rushing water.', audioText: 'شِين' },
          { arabic: 'صَاد (ص)', transliteration: 'Ṣād', meaning: 'Heavy emphatic "S". The tongue is cupped with the back elevated toward the roof of the mouth.', audioText: 'صَاد' },
          { arabic: 'ضَاد (ض)', transliteration: 'Ḍād', meaning: 'The trademark letter of Arabic ("Lughat al-Dad"). Formed from the rear edge of the tongue pressing the upper molars.', audioText: 'ضَاد' },
          { arabic: 'طَاء (ط)', transliteration: 'Ṭāʾ', meaning: 'The strongest letter in the entire language. Heavy emphatic "T" with complete palate closure.', audioText: 'طَاء' },
          { arabic: 'ظَاء (ظ)', transliteration: 'Ẓāʾ', meaning: 'Heavy emphatic voiced "Th". Combines tongue protrusion with tongue elevation.', audioText: 'ظَاء' },
          { arabic: 'عَيْن (ع)', transliteration: 'ʿAyn', meaning: 'Deep constriction of the epiglottis in the middle of the throat. A resonant vowel-carrier.', audioText: 'عَيْن' },
          { arabic: 'غَيْن (غ)', transliteration: 'Ghayn', meaning: 'Upper throat gurgling sound (similar to French "r" in "Paris").', audioText: 'غَيْن' },
          { arabic: 'فَاء (ف)', transliteration: 'Fāʾ', meaning: 'Upper front incisors touching the inner wet border of the bottom lip.', audioText: 'فَاء' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      verseRef: 'Quran 1:7',
      explanation: 'Features Ghayn (غ), Dad (ض), and \'Ayn (ع) in magnificent rhythmic succession.',
    },
  },
  'alphabet-4': {
    id: 'alphabet-4',
    title: 'The Alphabet: Qaf to Ya (ق إلى ي)',
    subtitle: 'Deep uvular stops, nasal letters, and vowel glides',
    duration: '6 min',
    category: 'Basics',
    summary: 'The concluding octave of the Arabic alphabet connects deep uvular explosions with flowing liquids and nasal resonances.',
    objectives: [
      'Contrast deep uvular Qaf (ق) with forward velar Kaf (ك).',
      'Understand the acoustic flow of Lam (ل) and nasal Meem (م) / Noon (ن).',
      'Master the dual nature of Waw (و) and Ya (ي) as both consonants and long vowels.',
    ],
    sections: [
      {
        heading: '1. The Final Seven Letters',
        description: 'These letters complete the 28-letter tapestry of sacred speech:',
        examples: [
          { arabic: 'قَاف (ق)', transliteration: 'Qāf', meaning: 'Deep back of the tongue against the soft uvula. Produces a powerful percussive strike.', audioText: 'قَاف' },
          { arabic: 'كَاف (ك)', transliteration: 'Kāf', meaning: 'Forward on the hard palate. Light "k" followed by a faint puff of air (Hams).', audioText: 'كَاف' },
          { arabic: 'لَام (ل)', transliteration: 'Lām', meaning: 'Tongue tip across the upper palate. Light everywhere except in the majestic name of "Allah" preceded by Fat-ha/Damma.', audioText: 'لَام' },
          { arabic: 'مِيم (م)', transliteration: 'Mīm', meaning: 'Gentle closure of both lips with sweet nasal resonance (Ghunnah).', audioText: 'مِيم' },
          { arabic: 'نُون (ن)', transliteration: 'Nūn', meaning: 'Tongue tip against the gumline with air released purely through the nasal cavity.', audioText: 'نُون' },
          { arabic: 'هَاء (هـ)', transliteration: 'Hāʾ', meaning: 'Deepest breath from the bottom of the chest. Light and delicate.', audioText: 'هَاء' },
          { arabic: 'وَاو (و)', transliteration: 'Wāw', meaning: 'Rounding of the lips into a circle. Functions as consonant "w" or long vowel "ū".', audioText: 'وَاو' },
          { arabic: 'يَاء (ي)', transliteration: 'Yāʾ', meaning: 'Arching middle tongue. Functions as consonant "y" or long vowel "ī".', audioText: 'يَاء' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      verseRef: 'Quran 112:1',
      explanation: 'Opens with the deep resonant strike of Qaf (ق) followed by the light flowing Lam (ل).',
    },
  },
  'vowels-1': {
    id: 'vowels-1',
    title: 'Harakāt: The Short Vowels & Tanween',
    subtitle: 'Fat-hah, Kasrah, Dammah, Sukun, Shaddah, and Nunation',
    duration: '8 min',
    category: 'Basics',
    summary: 'Arabic consonant skeletons are brought to life through vowel markings called Harakāt (movements). A change in a single mark can alter a noun from a subject to an object or change an active verb to passive.',
    objectives: [
      'Master the three short vowels: Fat-ha (ـَ), Kasra (ـِ), and Damma (ـُ).',
      'Understand the resting sign Sukun (ـْ) and doubling crown Shaddah (ـّ).',
      'Recognize Tanween (-an, -in, -un) denoting indefinite nouns.',
    ],
    sections: [
      {
        heading: '1. The Primary Short Vowels',
        description: 'Vowels represent physical mouth geometry:',
        examples: [
          { arabic: 'ـَ (فَتْحَة)', transliteration: 'Fat-hah', meaning: 'Opens the mouth vertically. Produces a crisp short "a".', audioText: 'فَتْحَة' },
          { arabic: 'ـِ (كَسْرَة)', transliteration: 'Kasrah', meaning: 'Lowers the lower jaw slightly. Produces a short "i".', audioText: 'كَسْرَة' },
          { arabic: 'ـُ (ضَمَّة)', transliteration: 'Dammah', meaning: 'Gathers and rounds both lips. Produces a short "u".', audioText: 'ضَمَّة' },
          { arabic: 'ـْ (سُكُون)', transliteration: 'Sukūn', meaning: 'Complete absence of vowel movement. The letter rests motionless.', audioText: 'سُكُون' },
          { arabic: 'ـّ (شَدَّة)', transliteration: 'Shaddah', meaning: 'Doubles the consonant. Pronounced with firm tension and slight hold.', audioText: 'شَدَّة' },
        ],
      },
      {
        heading: '2. Tanween (Nunation)',
        description: 'Double vowel marks at the ends of nouns add an automatic "-n" sound without writing a letter Noon:',
        tips: [
          'Tanween Fat-h (ـً): sounds like "-an" (e.g. Shukran شُكْرًا).',
          'Tanween Kasr (ـٍ): sounds like "-in" (e.g. Bi-khayrin بِخَيْرٍ).',
          'Tanween Damm (ـٌ): sounds like "-un" (e.g. Salamun سَلَامٌ).',
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'مُحَمَّدٌ رَّسُولُ اللَّهِ',
      verseRef: 'Quran 48:29',
      explanation: 'Observe the Shaddah on Meem (مّ) and Tanween Damm on Dal (دٌ) in the blessed name Muhammad.',
    },
  },
  'tajweed-1': {
    id: 'tajweed-1',
    title: 'Tajweed: The Art of Madd (Elongation)',
    subtitle: 'Natural 2-count vs prolonged 4, 5, and 6 counts',
    duration: '8 min',
    category: 'Tajweed',
    summary: 'Madd literally means extension or stretch. In Tajweed, it governs how long the three vowel letters (Alif, Waw, Ya) are held to preserve the cadence and solemn majesty of divine recitation.',
    objectives: [
      'Distinguish Madd Asli (Natural 2-count) from Madd Far\'i (Secondary extensions).',
      'Master Madd Muttasil (Connected 4-5 counts) and Madd Munfasil (Separated 4-5 counts).',
      'Understand Madd Lazim (Compulsory 6 full counts).',
    ],
    sections: [
      {
        heading: '1. The Hierarchy of Madd Elongations',
        description: 'Vowels expand depending on whether they encounter a Hamzah (ء) or a Sukun (ـْ):',
        examples: [
          { arabic: 'مَدّ أَصْلِي (طَبِيعِي)', transliteration: 'Madd Aṣlī', meaning: 'Held for exactly 2 counts (the time it takes to open or close an index finger).', note: 'Found in words like: قَالَ (Qāla), يَقُولُ (Yaqūlu), قِيلَ (Qīla).' },
          { arabic: 'مَدّ مُتَّصِل', transliteration: 'Madd Muttaṣil', meaning: 'The vowel and Hamzah meet within the exact same word. Prolonged to 4 or 5 counts.', note: 'Found in: جَاءَ (Jā\'a), السَّمَاءِ (As-Samā\').' },
          { arabic: 'مَدّ مُنْفَصِل', transliteration: 'Madd Munfaṣil', meaning: 'The vowel is at the end of word 1 and Hamzah is at the start of word 2. Held 4 or 5 counts.', note: 'Found in: إِنَّا أَعْطَيْنَاكَ (Innā a\'ṭaynāk).' },
          { arabic: 'مَدّ لَازِم', transliteration: 'Madd Lāzim', meaning: 'The vowel is directly followed by an inherent Sukun or Shaddah. Must be stretched to 6 full counts.', note: 'Found in: وَلَا الضَّالِّينَ (Walad-dāllīn).' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
      verseRef: 'Quran 110:1',
      explanation: 'The word "Jā\'a" contains Madd Muttasil, requiring a graceful 4-to-5 beat stretch on the Alif.',
    },
  },
  'tajweed-2': {
    id: 'tajweed-2',
    title: 'Tajweed: Rules of Nun Sakinah & Tanween',
    subtitle: 'Izhar, Idgham, Iqlab, and Ikhfa',
    duration: '10 min',
    category: 'Tajweed',
    summary: 'Because the letter Noon (ن) carries a pure nasal chime, when it rests without a vowel (Nun Sakinah) or occurs as Tanween, its sound transforms depending on the nature of the following letter.',
    objectives: [
      'Izhar (Clarity): Crisp pronunciation before the 6 throat letters.',
      'Idgham (Merging): Blending Noon into the 6 letters of Yarmalūn (يرملون).',
      'Iqlab (Conversion): Turning Noon into a delicate Meem before Ba (ب).',
      'Ikhfa (Concealment): Hiding Noon into 15 intermediate letters with Ghunnah.',
    ],
    sections: [
      {
        heading: '1. The Four Golden Rules',
        description: 'Whenever you see a silent Noon (نْ) or Tanween, inspect the very next letter:',
        examples: [
          { arabic: 'إِظْهَار (حَلْقِي)', transliteration: 'Iẓhār', meaning: 'Clear pronunciation before Hamza, Ha, \'Ayn, Ha, Ghayn, Kha (ء هـ ع ح غ خ).', note: 'Example: مَنْ آمَنَ (Man āmana).' },
          { arabic: 'إِدْغَام (يَرْمَلُون)', transliteration: 'Idghām', meaning: 'Merging Noon into letters of Yarmalūn. With nasal humming on Y-M-N-W; without humming on L-R.', note: 'Example: مَن يَّقُولُ (May-yaqūl), مِن رَّبِّهِم (Mir-rabbihim).' },
          { arabic: 'إِقْلَاب (ب)', transliteration: 'Iqlāb', meaning: 'When Noon meets Ba (ب), it turns into a hidden Meem with a 2-beat nasal hum.', note: 'Example: مِن بَعْدِ (Mim-ba\'d), marked by a tiny "م" above the text.' },
          { arabic: 'إِخْفَاء (حَقِيقِي)', transliteration: 'Ikhfāʾ', meaning: 'Concealing the Noon sound between Izhar and Idgham before the remaining 15 letters.', note: 'Example: مِن قَبْلِ (Min qabl), preserving 2 counts of sweet Ghunnah.' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'مِن بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ',
      verseRef: 'Quran 98:4',
      explanation: 'In "Min ba\'d", the Noon Sakinah meets Ba, converting seamlessly into the gentle hum of Iqlab.',
    },
  },
  'tajweed-3': {
    id: 'tajweed-3',
    title: 'Tajweed: Qalqalah (The Echo Bounce)',
    subtitle: 'The 5 letters of resonance: Qaf, Ta, Ba, Jim, Dal (قطب جد)',
    duration: '7 min',
    category: 'Tajweed',
    summary: 'When five specific consonants carry Sukun, vocal tension prevents their release until the reciter creates an involuntary, rhythmic echo bounce that adds majesty to the verse.',
    objectives: [
      'Memorize the mnemonic for the five Qalqalah letters: Qutb Jadd (قُطْبُ جَدّ).',
      'Distinguish Qalqalah Sughra (minor, inside a word) from Qalqalah Kubra (major, at verse end).',
      'Avoid adding a vowel sound to the bounce; keep it pure percussion.',
    ],
    sections: [
      {
        heading: '1. The Five Resonant Consonants',
        description: 'Only these 5 letters produce Qalqalah when resting with a Sukun or when stopping at an Ayah:',
        examples: [
          { arabic: 'ق (قَاف)', transliteration: 'Qāf', meaning: 'Deep throat percussion bounce.', note: 'Example: الفَلَقْ (Al-Falaq).' },
          { arabic: 'ط (طَاء)', transliteration: 'Ṭāʾ', meaning: 'Strong palate percussion bounce.', note: 'Example: مُحِيطْ (Muḥīṭ).' },
          { arabic: 'ب (بَاء)', transliteration: 'Bāʾ', meaning: 'Lips springing apart cleanly.', note: 'Example: حَبْلٌ (Ḥablun).' },
          { arabic: 'ج (جِيم)', transliteration: 'Jīm', meaning: 'Palate release echo.', note: 'Example: الفَجْرْ (Al-Fajr).' },
          { arabic: 'د (دَال)', transliteration: 'Dāl', meaning: 'Crisp tongue-tip dental spring.', note: 'Example: أَحَدْ (Aḥad).' },
        ],
      },
      {
        heading: '2. Levels of Qalqalah Intensity',
        description: 'Tajweed masters classify the echo bounce into three distinct strengths:',
        tips: [
          'Sughra (Minor): In the middle of a continuous word (e.g. YAQ-tulu). Keep it subtle and brisk.',
          'Kubra (Major): When pausing at the end of an Ayah on an unvoweled letter (e.g. Qul huwa Allahu AHAD).',
          'Akbar (Supreme): Stopping at a letter that has both a Shaddah and a pause (e.g. Tabba wa TABB).',
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝',
      verseRef: 'Quran 113:1-2',
      explanation: 'Stopping on "Al-Falaq" and "Khalaq" releases the crisp, majestic echo of Qaf.',
    },
  },
  'vocabulary-1': {
    id: 'vocabulary-1',
    title: 'Words That Carry Worlds: Essential Spiritual Terms',
    subtitle: 'Deep dive into Rahmah, Sakīnah, Taqwā, Tawakkul, and Sabr',
    duration: '9 min',
    category: 'Glossary',
    summary: 'English translations frequently reduce profound Arabic concepts to single flat nouns. This lesson uncovers the multidimensional linguistic tapestry behind key Quranic words.',
    objectives: [
      'Understand how "Rahmah" connects directly to maternal protection and unconditional warmth.',
      'Explore why "Sakīnah" is tranquil composure in the midst of conflict.',
      'Redefine "Taqwā" from fear into vigilant, loving mindfulness.',
    ],
    sections: [
      {
        heading: '1. Pillars of Quranic Consciousness',
        description: 'Explore words that define the inner anatomy of the believer:',
        examples: [
          { arabic: 'رَحْمَة', transliteration: 'Raḥmah', meaning: 'Tender compassion and nurturing love.', note: 'Root: R-Ḥ-M (womb). Implies shelter, growth, and loving mercy.' },
          { arabic: 'سَكِينَة', transliteration: 'Sakīnah', meaning: 'Spiritual tranquility descending amidst storms.', note: 'Root: S-K-N (to dwell, calm). An unshakable peace gifted by God.' },
          { arabic: 'تَقْوَى', transliteration: 'Taqwā', meaning: 'Mindful protective consciousness of Allah.', note: 'Root: W-Q-Y (shield). Walking mindfully through worldly thorns.' },
          { arabic: 'تَوَكُّل', transliteration: 'Tawakkul', meaning: 'Active practical effort combined with absolute surrender.', note: 'Root: W-K-L (entrust). Tying the camel, then resting in God\'s plan.' },
          { arabic: 'صَبْر', transliteration: 'Ṣabr', meaning: 'Dignified perseverance without despair.', note: 'Root: Ṣ-B-R (restrain). Steadfastness with a sweet tongue.' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
      verseRef: 'Quran 2:153',
      explanation: 'Allah promises not merely to reward those who possess Sabr, but to be actively with them (Ma\'a).',
    },
  },
  'roots-1': {
    id: 'roots-1',
    title: 'The Quranic 3-Letter Root System (عِلْم الاِشْتِقَاق)',
    subtitle: 'How one root blossoms into dozens of spiritual meanings',
    duration: '9 min',
    category: 'Glossary',
    summary: 'Arabic is a mathematical, root-based language. Most words stem from a three-consonant core (Jadr). By learning 100 core roots, you unlock comprehension of over 70% of the entire Quranic vocabulary.',
    objectives: [
      'Learn how the root S-L-M generates Islam, Muslim, Salam, and Taslim.',
      'Discover how the root R-H-M produces Rahman, Rahim, Rahmah, and Arham.',
      'Understand how verbs shift meaning across standard verb patterns (Awzan).',
    ],
    sections: [
      {
        heading: '1. The Miracle of Root Derivation',
        description: 'Observe how a single consonant triad branches into whole families of meaning:',
        examples: [
          { arabic: 'س - ل - م (S-L-M)', transliteration: 'Root: S-L-M', meaning: 'Safety, peace, wholeness, surrender.', note: 'Produces: Salām (peace), Islām (submission), Muslim (one who surrenders), Salīm (sound, pure heart).' },
          { arabic: 'ر - ح - م (R-Ḥ-M)', transliteration: 'Root: R-Ḥ-M', meaning: 'Womb, tenderness, unconditional mercy.', note: 'Produces: Ar-Raḥmān (the All-Merciful), Ar-Raḥīm (the Compassionate), Raḥmah (mercy), Arḥām (wombs/kinship).' },
          { arabic: 'ش - ك - ر (Sh-K-R)', transliteration: 'Root: Sh-K-R', meaning: 'To be full, to acknowledge, to give thanks.', note: 'Produces: Shukr (gratitude), Shākir (grateful), Ash-Shakūr (The Appreciative who multiplies rewards).' },
          { arabic: 'ع - ل - م (ʿ-L-M)', transliteration: 'Root: ʿ-L-M', meaning: 'Mark, sign, knowing, intellect.', note: 'Produces: ʿIlm (knowledge), ʿĀlim (scholar), ʿAllama (taught), ʿĀlamīn (worlds/cosmos - signs pointing to God).' },
        ],
      },
    ],
    quranicApplication: {
      verseArabic: 'إِذْ جَاءَ رَبَّهُ بِقَلْبٍ سَلِيمٍ',
      verseRef: 'Quran 37:84',
      explanation: 'Describes Prophet Ibrahim approaching his Lord with a "Qalb Saleem" (sound, safe, whole heart from root S-L-M).',
    },
  },
};

export function LessonDetailModal({
  lessonId,
  onClose,
  isCompleted,
  onToggleComplete,
}: {
  lessonId: string;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const lesson = detailedLessonsData[lessonId] || {
    id: lessonId,
    title: 'Lesson Material',
    subtitle: 'Comprehensive Lesson Study',
    duration: '8 min',
    category: 'Learning Track',
    summary: 'Master the fundamental principles of Arabic pronunciation, grammar, and Quranic recitation.',
    objectives: [
      'Understand core phonetics and pronunciation rules.',
      'Practice with authentic Quranic verses.',
      'Apply lessons to your daily recitation.',
    ],
    sections: [],
  };

  const playPronunciation = (text: string) => {
    setPlayingAudio(text);
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.75;
        utterance.onend = () => setPlayingAudio(null);
        utterance.onerror = () => setPlayingAudio(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setPlayingAudio(null), 1200);
      }
    } catch {
      setTimeout(() => setPlayingAudio(null), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-bg-card border border-accent-gold/45 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-bg-primary via-bg-card to-bg-primary border-b border-accent-gold/30 shrink-0">
          <CornerFlourishes />
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lesson.category} · {lesson.duration}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-serif">
                {lesson.title}
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm">
                {lesson.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary bg-bg-card/80 border border-accent-gold/30 hover:border-accent-gold transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Lesson Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-text-primary">
          {/* Summary Banner */}
          <BorderedSubPanel className="p-4 bg-accent-gold/10 border-accent-gold/30">
            <p className="text-sm leading-relaxed text-text-primary/95 italic">
              "{lesson.summary}"
            </p>
          </BorderedSubPanel>

          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Key Learning Objectives</span>
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-bg-primary/60 border border-accent-gold/20 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                    <span className="text-text-primary/90">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sections with interactive examples */}
          {lesson.sections.map((section, idx) => (
            <div key={idx} className="space-y-3.5">
              <h3 className="text-base font-bold text-accent-gold font-serif border-b border-accent-gold/25 pb-1.5">
                {section.heading}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {section.description}
              </p>

              {section.examples && section.examples.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {section.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-3.5 rounded-2xl bg-bg-primary border border-accent-gold/30 hover:border-accent-gold/60 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xl sm:text-2xl font-serif text-accent-gold font-bold font-amiri" dir="rtl">
                            {ex.arabic}
                          </div>
                          <div className="text-xs font-semibold text-text-primary mt-1">
                            {ex.transliteration}
                          </div>
                        </div>

                        {ex.audioText && (
                          <button
                            onClick={() => playPronunciation(ex.audioText || ex.arabic)}
                            className={`p-2 rounded-xl border transition-all ${
                              playingAudio === (ex.audioText || ex.arabic)
                                ? 'bg-accent-gold text-bg-primary border-accent-gold'
                                : 'bg-bg-card text-accent-gold border-accent-gold/30 hover:border-accent-gold'
                            }`}
                            title="Hear pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="text-xs text-text-secondary border-t border-accent-gold/15 pt-2">
                        {ex.meaning}
                      </div>

                      {ex.note && (
                        <div className="text-[11px] text-accent-gold/90 bg-accent-gold/10 p-2 rounded-lg mt-1 font-mono">
                          {ex.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.tips && section.tips.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 space-y-1.5 mt-2">
                  <div className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                    Practical Pronunciation Notes
                  </div>
                  {section.tips.map((tip, tipIdx) => (
                    <div key={tipIdx} className="text-xs text-text-primary/90 flex items-start gap-2">
                      <span className="text-accent-gold font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quranic Application Verse */}
          {lesson.quranicApplication && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-bg-primary to-bg-card border border-accent-gold/40 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Living Quran Application · {lesson.quranicApplication.verseRef}</span>
              </div>
              <div className="text-xl sm:text-2xl text-accent-gold font-serif text-center py-2 font-amiri" dir="rtl">
                {lesson.quranicApplication.verseArabic}
              </div>
              <p className="text-xs sm:text-sm text-text-secondary text-center leading-relaxed">
                {lesson.quranicApplication.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-bg-primary/95 border-t border-accent-gold/30 shrink-0 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-accent-gold/30 text-text-secondary hover:text-text-primary text-xs sm:text-sm font-semibold transition-colors"
          >
            Close Lesson
          </button>

          <button
            onClick={onToggleComplete}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
              isCompleted
                ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/60'
                : 'bg-accent-gold text-bg-primary hover:bg-accent-gold/90 font-bold'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark Lesson as Completed'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
