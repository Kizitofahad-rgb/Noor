/**
 * Daily Inspiration Dataset (Surah, Relatable Hadith, and Prophetic Story of the Day)
 * Carefully curated for each day of the week to ensure fresh, authentic, uplifting daily guidance.
 */

export interface DailyInspirationItem {
  dayIndex: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  dayName: string;
  arabicDay: string;
  theme: string;
  themeDescription: string;
  badge: string;
  accentColor: string;

  // 1. SURAH OF THE DAY
  surah: {
    number: number;
    name: string;
    arabicName: string;
    englishMeaning: string;
    versesCount: number;
    revelation: 'Meccan' | 'Medinan';
    whyReadToday: string;
    featuredAyah: {
      arabic: string;
      transliteration: string;
      translation: string;
      citation: string;
    };
    spiritualBenefits: string[];
  };

  // 2. RELATABLE HADITH OF THE DAY
  hadith: {
    title: string;
    arabic: string;
    transliteration?: string;
    translation: string;
    narrator: string;
    source: string;
    whyRelatableToday: string;
    actionableTakeaway: string;
  };

  // 3. RELATABLE STORY OF THE DAY
  story: {
    prophetId: string;
    prophetName: string;
    arabicName: string;
    title: string;
    historicalEra: string;
    pivotalClimax: string;
    moralWisdom: string;
    whyRelatableToday: string;
    soundscapePreset: 'desert-wind' | 'sea-storm' | 'sacred-night' | 'oasis-sanctuary';
  };
}

export const weeklyInspirations: DailyInspirationItem[] = [
  // 0: SUNDAY (Day of Creation Reflection & Freedom from Darkness)
  {
    dayIndex: 0,
    dayName: 'Sunday',
    arabicDay: 'يَوْمُ الأَحَد',
    theme: 'Deliverance from Darkness & Unshakeable Hope',
    themeDescription: 'Begin your week with total trust in Allah’s sovereignty, knowing no trial or abyss is beyond His reach.',
    badge: 'Dominion & Deliverance',
    accentColor: 'amber',
    surah: {
      number: 67,
      name: 'Al-Mulk',
      arabicName: 'المُلْك',
      englishMeaning: 'The Dominion / Sovereignty',
      versesCount: 30,
      revelation: 'Meccan',
      whyReadToday: 'Known as Al-Munjiyah (The Rescuer), this revered 30-verse Surah guards against the trials of the grave, reveals the perfection of the cosmos, and reorients the soul to its eternal Creator.',
      featuredAyah: {
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ',
        transliteration: 'Alladhī khalaqa al-mawta wa-al-ḥayāta liyabluwakum ayyukum aḥsanu ‘amalan',
        translation: 'He who created death and life to test you as to which of you is best in deed—and He is the Exalted in Might, the Forgiving.',
        citation: 'Surah Al-Mulk 67:2',
      },
      spiritualBenefits: [
        'Intercedes continuously on the Day of Judgment until its reader is forgiven',
        'Casts peace into the heart and eases bedtime anxiety and fear of the unknown',
        'Awakens awe through contemplating the seven flawless heavens above us',
      ],
    },
    hadith: {
      title: 'The Interceding Thirty Verses',
      arabic: '«سُورَةٌ مِنَ الْقُرْآنِ ثَلاَثُونَ آيَةً شَفَعَتْ لِرَجُلٍ حَتَّى غُفِرَ لَهُ: تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ»',
      transliteration: 'Sūratun min al-Qur’āni thalāthūna āyatan shafa‘at li-rajulin ḥattā ghufira lah...',
      translation: 'A Surah of thirty verses from the Quran interceded for a person until his sins were forgiven: Blessed is He in whose hand is the dominion.',
      narrator: 'Abu Hurairah (May Allah be pleased with him)',
      source: 'Sunan Abi Dawud (1400), Jami‘ at-Tirmidhi (2891) · Hasan',
      whyRelatableToday: 'Sunday evening brings thoughts of the week ahead. This hadith promises that a few mindful minutes of Quranic recitation can transform your standing before your Lord.',
      actionableTakeaway: 'Recite Surah Al-Mulk before you sleep tonight, reflecting on Allah’s absolute care over your life.',
    },
    story: {
      prophetId: 'yunus',
      prophetName: 'Prophet Yunus (Jonah)',
      arabicName: 'يُونُس عَلَيْهِ السَّلَام',
      title: 'The Cry from the Depths of the Three Darknesses',
      historicalEra: 'Ancient Nineveh & The Mediterranean Sea',
      pivotalClimax: 'Trapped in the belly of a leviathan whale in the black midnight beneath surging oceanic abysses, Yunus realized that escape was impossible through human means. He prostrated in the damp darkness, crying out with tears of pure sincerity: "There is no deity except You; exalted are You! Indeed, I have wronged myself." The sea parted, the whale swam to shore, and Allah commanded the earth to sprout a sheltering gourd plant over him.',
      moralWisdom: 'No darkness—no matter how deep, lonely, or suffocating—can ever drown out a sincere, humble prayer to your Lord.',
      whyRelatableToday: 'When overwhelmed by responsibilities as the workweek opens, remember that Yunus was freed not by worldly force, but by humble repentance.',
      soundscapePreset: 'sea-storm',
    },
  },

  // 1: MONDAY (The Day of Revelation, Fasting & Moral Renewal)
  {
    dayIndex: 1,
    dayName: 'Monday',
    arabicDay: 'يَوْمُ الاِثْنَيْن',
    theme: 'The Dawn of Revelation, Humility & Selfless Giving',
    themeDescription: 'The Prophet Muhammad ﷺ was born on Monday, received his first revelation on Monday, and regularly fasted on Mondays.',
    badge: 'Revelation & Gratitude',
    accentColor: 'emerald',
    surah: {
      number: 76,
      name: 'Al-Insan',
      arabicName: 'الإِنسَان',
      englishMeaning: 'The Human / Time',
      versesCount: 31,
      revelation: 'Medinan',
      whyReadToday: 'The Prophet ﷺ consistently recited Surah Al-Insan during the dawn of blessed mornings. It reminds us of our humble origin from water and dust, and paints vivid emerald portraits of the peace awaiting the selfless.',
      featuredAyah: {
        arabic: 'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا • إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا',
        transliteration: 'Wa-yuṭ‘imūna aṭ-ṭa‘āma ‘alā ḥubbihī miskīnan wa-yatīman wa-asīrā...',
        translation: 'And they give food in spite of love for it to the needy, the orphan, and the captive, saying: "We feed you only for the countenance of Allah. We wish not from you reward or gratitude."',
        citation: 'Surah Al-Insan 76:8-9',
      },
      spiritualBenefits: [
        'Cultivates pure sincerity (Ikhlas) with zero expectation of human flattery',
        'Brings profound tranquility when reflecting on the emerald silk of Paradise',
        'Shields the soul from arrogance by remembering the fragility of mortal breath',
      ],
    },
    hadith: {
      title: 'The Sacred Day of the Prophet’s Birth & Revelation',
      arabic: '«ذَاكَ يَوْمٌ وُلِدْتُ فِيهِ، وَيَوْمٌ بُعِثْتُ فِيهِ، أَوْ أُنْزِلَ عَلَىَّ فِيهِ»',
      transliteration: 'Dhāka yawmun wulidtu fīhi, wa-yawmun bu‘ithtu fīhi, aw unzila ‘alayya fīh...',
      translation: 'When asked about fasting on Monday, the Messenger of Allah ﷺ said: "That is the day on which I was born, and the day on which revelation was first sent down to me."',
      narrator: 'Abu Qatadah Al-Ansari (May Allah be pleased with him)',
      source: 'Sahih Muslim (1162)',
      whyRelatableToday: 'Monday is not merely the start of work; it is the sacred anniversary of divine truth entering human history.',
      actionableTakeaway: 'Fast if you are able, or perform at least one quiet act of charity without telling another soul.',
    },
    story: {
      prophetId: 'muhammad',
      prophetName: 'Prophet Muhammad ﷺ',
      arabicName: 'مُحَمَّد صَلَّى اللَّهُ عَلَيْهِ وَسَلَّم',
      title: 'The Mountain Solitude of Hira & The First Embrace',
      historicalEra: 'Mecca, 610 CE · The Mountain of Light (Jabal an-Nur)',
      pivotalClimax: 'Seeking solitude from the corruption of tribal society, Muhammad ﷺ retreated to the secluded mountain cave of Hira. In the velvet silence of the night, the Archangel Jibreel descended like lightning and embraced him tightly until all breath left him, proclaiming: "Iqra! (Read!) In the name of your Lord who created—created man from a clinging clot!" Trembling with reverence, the Prophet returned to Khadijah, and the world was forever altered by divine mercy.',
      moralWisdom: 'True greatness is cultivated in quiet reflection, humility before God, and willingness to listen when truth speaks.',
      whyRelatableToday: 'Find ten minutes of silent solitude today away from phone notifications to reflect and recite.',
      soundscapePreset: 'sacred-night',
    },
  },

  // 2: TUESDAY (Resilience, Patience in Adversity & Beautiful Trust)
  {
    dayIndex: 2,
    dayName: 'Tuesday',
    arabicDay: 'يَوْمُ الثُّلَاثَاء',
    theme: 'Sincerity in Tribulation & The Triumph of Beautiful Patience',
    themeDescription: 'How unseen hardships, betrayed trusts, and long waits are molded by Allah into royal triumph and healing.',
    badge: 'Sabr & Emotional Resilience',
    accentColor: 'sky',
    surah: {
      number: 12,
      name: 'Yusuf',
      arabicName: 'يُوسُف',
      englishMeaning: 'Joseph / The Best of Narratives',
      versesCount: 111,
      revelation: 'Meccan',
      whyReadToday: 'Revealed to comfort the Prophet ﷺ during the Year of Sorrow. It proves that every pit of sorrow contains the seeds of a palace of honor if one holds firmly to Sabrun Jameel (beautiful patience).',
      featuredAyah: {
        arabic: 'إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
        transliteration: 'Innahu man yattaqi wa-yaṣbir fa-inna Allāha lā yuḍī‘u ajra al-muḥsinīn',
        translation: 'Indeed, he who fears Allah and remains patient—then surely, Allah does not allow the reward of the doers of good to be lost.',
        citation: 'Surah Yusuf 12:90',
      },
      spiritualBenefits: [
        'Heals feelings of family betrayal, jealousy, and unjust treatment',
        'Demonstrates how purity of character triumphs over temptation and entrapment',
        'Instills unshakeable conviction that Allah’s decree is always gentle and just',
      ],
    },
    hadith: {
      title: 'The Wonder of the Believer’s Dual Blessing',
      arabic: '«عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ... إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ»',
      transliteration: '‘Ajaban li-amri al-mu’mini inna amrahu kullahu khayr...',
      translation: 'Wondrous is the affair of the believer, for all his affairs are good. If good fortune touches him, he shows gratitude and it is good for him; and if adversity touches him, he remains patient and it is good for him.',
      narrator: 'Suhaib Ar-Rumi (May Allah be pleased with him)',
      source: 'Sahih Muslim (2999)',
      whyRelatableToday: 'When work or relationships test your patience midway through the week, you cannot lose: gratitude doubles your joy, and patience earns boundless reward.',
      actionableTakeaway: 'Respond to the first frustration you encounter today with a quiet "Alhamdulillah" and conscious forbearance.',
    },
    story: {
      prophetId: 'yusuf',
      prophetName: 'Prophet Yusuf (Joseph)',
      arabicName: 'يُوسُف عَلَيْهِ السَّلَام',
      title: 'From the Abandoned Well to the Royal Granaries of Egypt',
      historicalEra: 'Ancient Canaan & The Royal Courts of Egypt',
      pivotalClimax: 'Cast into a desert cistern by his own brothers, sold into foreign slavery for a few coins, and imprisoned for years for choosing purity over sin, Yusuf never grew bitter against Allah. Decades later, elevated as governor of all Egypt’s storehouses, his starving brothers stood before him trembling. Rather than seeking revenge, Yusuf wept with majestic mercy: "No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful."',
      moralWisdom: 'Allah’s delays are not His denials. The very stones thrown at you today can become the foundation of your spiritual elevation tomorrow.',
      whyRelatableToday: 'Forgive someone who hurt you or misjudged you in the past, releasing the burden from your own heart.',
      soundscapePreset: 'desert-wind',
    },
  },

  // 3: WEDNESDAY (Knowledge, Modesty, Light & Sincere Guidance)
  {
    dayIndex: 3,
    dayName: 'Wednesday',
    arabicDay: 'يَوْمُ الأَرْبِعَاء',
    theme: 'Illumination of the Heart, Pure Knowledge & Divine Noor',
    themeDescription: 'Purify the eyesight, illuminate the intellect, and walk the path of sincere prophetic wisdom.',
    badge: 'Light of Divine Wisdom',
    accentColor: 'indigo',
    surah: {
      number: 24,
      name: 'An-Nur',
      arabicName: 'النُّور',
      englishMeaning: 'The Light',
      versesCount: 64,
      revelation: 'Medinan',
      whyReadToday: 'Contains the Parable of the Lamp (Ayat an-Nur)—the most sublime description of divine illumination in literature. It cleanses the home, guards family honor, and guides the gaze toward moral radiance.',
      featuredAyah: {
        arabic: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ الْمِصْبَاحُ فِي زُجَاجَةٍ الزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّيٌّ',
        transliteration: 'Allāhu nūru as-samāwāti wa-al-arḍ, mathalu nūrihī ka-mishkātin fīhā miṣbāḥ...',
        translation: 'Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp; the lamp is within glass, the glass as if it were a pearlescent star...',
        citation: 'Surah An-Nur 24:35',
      },
      spiritualBenefits: [
        'Illuminates the intellect to see reality clearly through spiritual discernment (Baseerah)',
        'Purifies homes from gossip, malice, and moral corruption',
        'Strengthens self-discipline in guarding the eyes and preserving modesty',
      ],
    },
    hadith: {
      title: 'The Golden Highway to Paradise',
      arabic: '«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»',
      transliteration: 'Man salaka ṭarīqan yaltamisu fīhi ‘ilman, sahhala Allāhu lahu bihī ṭarīqan ilā al-jannah...',
      translation: 'Whoever treads a path seeking beneficial knowledge, Allah makes easy for him because of it a path to Paradise.',
      narrator: 'Abu Hurairah (May Allah be pleased with him)',
      source: 'Sahih Muslim (2699)',
      whyRelatableToday: 'Taking five minutes to study one verse, understand its meaning, and apply it in your life today qualifies directly as walking the path to Jannah.',
      actionableTakeaway: 'Learn the meaning of one new Quranic word or verse and share its benefit with a friend or family member.',
    },
    story: {
      prophetId: 'idris',
      prophetName: 'Prophet Idris (Enoch)',
      arabicName: 'إِدْرِيس عَلَيْهِ السَّلَام',
      title: 'The Pioneer of the Pen & Scholar of Celestial Wonders',
      historicalEra: 'Early Generations of Humanity · Ancient Babylon',
      pivotalClimax: 'In an era where humanity was losing its moral memory, Idris was gifted divine wisdom. He was the first to sew garments with devotion, the first to study celestial orbits, and the first to write with the reed pen to preserve sacred knowledge. Because his heart remained devoted to truth without pride, Allah recorded his eternal honor in the Quran: "And We raised him to a high station."',
      moralWisdom: 'Education, technology, and craftsmanship are holy acts of worship when sanctified by the remembrance of God.',
      whyRelatableToday: 'Honor the work of your hands and your studies today as acts of divine worship.',
      soundscapePreset: 'oasis-sanctuary',
    },
  },

  // 4: THURSDAY (Audit of Deeds, Softening of Hearts & Sincere Tawbah)
  {
    dayIndex: 4,
    dayName: 'Thursday',
    arabicDay: 'يَوْمُ الخَمِيس',
    theme: 'Presentation of Weekly Deeds & Awakening the Heart',
    themeDescription: 'Thursday is the day human deeds are raised to the heavens. It is the time to soften hardened hearts and prepare for Jumu‘ah.',
    badge: 'Deeds & Softness of Heart',
    accentColor: 'rose',
    surah: {
      number: 57,
      name: 'Al-Hadid',
      arabicName: 'الحَدِيد',
      englishMeaning: 'The Iron',
      versesCount: 29,
      revelation: 'Medinan',
      whyReadToday: 'As the week draws to a close, Surah Al-Hadid poses the piercing question that has brought tears to the eyes of scholars for centuries: "Has the time not come for those who believe that their hearts should soften to the remembrance of Allah?"',
      featuredAyah: {
        arabic: 'أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ وَلَا يَكُونُوا كَالَّذِينَ أُوتُوا الْكِتَابَ مِن قَبْلُ فَطَالَ عَلَيْهِمُ الْأَمَدُ فَقَسَتْ قُلُوبُهُمْ',
        transliteration: 'A-lam ya’ni lilladhīna āmanū an takhsha‘a qulūbuhum li-dhikri Allāh...',
        translation: 'Has the time not come for those who have believed that their hearts should become humbly submissive at the remembrance of Allah and what has come down of the truth?',
        citation: 'Surah Al-Hadid 57:16',
      },
      spiritualBenefits: [
        'Melts the rust of worldly busyness and heedlessness from the heart',
        'Balances material strength (iron) with spiritual tenderness and charity',
        'Prepares the soul to enter Friday’s congregation with a clean conscience',
      ],
    },
    hadith: {
      title: 'The Presentation of Weekly Deeds to the Lord',
      arabic: '«تُعْرَضُ الأَعْمَالُ يَوْمَ الاِثْنَيْنِ وَالْخَمِيسِ، فَأُحِبُّ أَنْ يُعْرَضَ عَمَلِي وَأَنَا صَائِمٌ»',
      transliteration: 'Tu‘raḍu al-a‘mālu yawma al-ithnayni wa-al-khamīs, fa-uḥibbu an yu‘raḍa ‘amalī wa-anā ṣā’im...',
      translation: 'Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting.',
      narrator: 'Abu Hurairah (May Allah be pleased with him)',
      source: 'Jami‘ at-Tirmidhi (747) · Hasan',
      whyRelatableToday: 'Your deeds from throughout the week are being lifted to the Throne of Mercy right now. Make the closing chapter of this week radiant.',
      actionableTakeaway: 'Ask for forgiveness for any wrong you committed this week, and forgive someone who wronged you so Allah pardons you.',
    },
    story: {
      prophetId: 'ibrahim',
      prophetName: 'Prophet Ibrahim (Abraham)',
      arabicName: 'إِبْرَاهِيم عَلَيْهِ السَّلَام',
      title: 'The Cool Fire of Nimrod & The Unshakable Heart',
      historicalEra: 'Ancient Mesopotamia (Ur & Babylon)',
      pivotalClimax: 'Cast by catapult into a colossal mountain of roaring fire by the tyrant Nimrod, Ibrahim was intercepted mid-air by the Archangel Jibreel, who asked: "Do you have any need from me?" Ibrahim replied with calm nobility: "From you, nothing. But from Allah, He knows my state." Instantly, Allah commanded the roaring blaze: "O fire, be coolness and safety upon Ibrahim!" The fire burned away his ropes, yet left his garment unblemished.',
      moralWisdom: 'When your trust in Allah is undivided, worldly threats lose their burning power.',
      whyRelatableToday: 'Whatever anxiety feels like a burning inferno in your life today, place it fully in Allah’s hands.',
      soundscapePreset: 'desert-wind',
    },
  },

  // 5: FRIDAY (The Crown of the Week, Jumu‘ah & Radiant Divine Noor)
  {
    dayIndex: 5,
    dayName: 'Friday',
    arabicDay: 'يَوْمُ الجُمُعَة',
    theme: 'The Master of Days, Protection from Deceit & Radiance of Jumu‘ah',
    themeDescription: 'The best day upon which the sun rises. Clothe yourself in purity, recite Surah Al-Kahf, and send abundant blessings upon the Prophet ﷺ.',
    badge: 'Jumu‘ah Mubarak & Divine Noor',
    accentColor: 'gold',
    surah: {
      number: 18,
      name: 'Al-Kahf',
      arabicName: 'الكَهْف',
      englishMeaning: 'The Cave',
      versesCount: 110,
      revelation: 'Meccan',
      whyReadToday: 'The celebrated prophetic Sunnah for every single Friday. It illuminates a light between you and the ancient Ka‘bah and shields the heart against the deceptions and materialism of the modern world.',
      featuredAyah: {
        arabic: 'قُل لَّوْ كَانَ الْبَحْرُ مِدَادًا لِّكَلِمَاتِ رَبِّي لَنَفِدَ الْبَحْرُ قَبْلَ أَن تَنفَدَ كَلِمَاتُ رَبِّي وَلَوْ جِئْنَا بِمِثْلِهِ مَدَدًا',
        transliteration: 'Qul law kāna al-baḥru midādan li-kalimāti rabbī la-nafida al-baḥru qabla an tanfada kalimātu rabbī...',
        translation: 'Say: "If the sea were ink for the words of my Lord, the sea would be exhausted before the words of my Lord were exhausted, even if We brought the like of it as a supplement."',
        citation: 'Surah Al-Kahf 18:109',
      },
      spiritualBenefits: [
        'Casts a brilliant pillar of spiritual light from your feet to the clouds until next Friday',
        'Shields the believer from the greatest trials of power, wealth, knowledge, and faith',
        'Revives the beauty of reliance upon Allah through four timeless prophetic parables',
      ],
    },
    hadith: {
      title: 'The Radiant Light Between the Two Fridays',
      arabic: '«مَنْ قَرَأَ سُورَةَ الْكَهْفِ فِي يَوْمِ الْجُمُعَةِ، أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ»',
      transliteration: 'Man qara’a sūrata al-Kahfi fī yawmi al-jumu‘ati, aḍā’a lahu min an-nūri mā bayna al-jumu‘atayn...',
      translation: 'Whoever reads Surah Al-Kahf on the day of Friday, light will shine for him from beneath his feet to the clouds of the sky, illuminating the interval between the two Fridays.',
      narrator: 'Abu Sa‘id Al-Khudri (May Allah be pleased with him)',
      source: 'Sunan al-Bayhaqi (5996), Al-Mustadrak ‘ala al-Sahihayn · Sahih',
      whyRelatableToday: 'Friday is your weekly recharge. Reciting Al-Kahf clears the spiritual haze accumulated over the week.',
      actionableTakeaway: 'Read Surah Al-Kahf today, send 100 blessings (Salawat) upon the Prophet ﷺ, and pray during the golden hour before sunset.',
    },
    story: {
      prophetId: 'ashab-al-kahf',
      prophetName: 'The Companions of the Cave (Ashab al-Kahf)',
      arabicName: 'أَصْحَابُ الكَهْف',
      title: 'The Young Believers Preserved Across Three Centuries',
      historicalEra: 'Ancient Anatolia (Ephesus) · 3rd Century CE',
      pivotalClimax: 'A small group of principled young believers stood before an oppressive emperor who demanded they surrender their faith. Fleeing into the mountains, they found a cavern and whispered: "Our Lord, grant us mercy from Yourself and facilitate our affairs with right guidance." Allah caused deep sleep to envelop them. The sun turned away from their cave at dawn and sunset, preserving them for 309 years as an eternal testament that God protects those who stand for truth.',
      moralWisdom: 'When the world pushes you to compromise your morals, seek sanctuary in Allah, and He will preserve you in dignity.',
      whyRelatableToday: 'Never feel outnumbered or inadequate when standing for the truth.',
      soundscapePreset: 'sacred-night',
    },
  },

  // 6: SATURDAY (Contemplation of Creation, Family & Infinite Mercy)
  {
    dayIndex: 6,
    dayName: 'Saturday',
    arabicDay: 'يَوْمُ السَّبْت',
    theme: 'Contemplation of Creation & Counting Infinite Mercies',
    themeDescription: 'Slow down and contemplate the cosmos, the oceans, your health, and the hundred folds of divine mercy.',
    badge: 'Contemplation & Gratitude',
    accentColor: 'teal',
    surah: {
      number: 55,
      name: 'Ar-Rahman',
      arabicName: 'الرَّحْمَٰن',
      englishMeaning: 'The Most Merciful / The Beneficent',
      versesCount: 78,
      revelation: 'Medinan',
      whyReadToday: 'Celebrated as the "Bride of the Quran" (Arus al-Quran). Its rhythmic, celestial refrain—"So which of the favors of your Lord will you deny?"—compels you to notice the unearned gifts you enjoy every second.',
      featuredAyah: {
        arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ • كُلُّ مَنْ عَلَيْهَا فَانٍ • وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Fa-bi-ayyi ālā’i rabbikumā tukadhdhibān. Kullu man ‘alayhā fān. Wa-yabqā wajhu rabbika dhū al-jalāli wa-al-ikrām...',
        translation: 'So which of the favors of your Lord will you deny? Everyone upon the earth will perish, and there will remain the Face of your Lord, Owner of Majesty and Honor.',
        citation: 'Surah Ar-Rahman 55:25-27',
      },
      spiritualBenefits: [
        'Instantly melts stress by refocusing the eyes on the majesty of nature and life',
        'Deepens gratitude for eyesight, breath, clean water, and loving companionship',
        'Softens relationships with loved ones through the lens of boundless divine mercy',
      ],
    },
    hadith: {
      title: 'The Ninety-Nine Reserved Mercies',
      arabic: '«إِنَّ لِلَّهِ مِائَةَ رَحْمَةٍ أَنْزَلَ مِنْهَا رَحْمَةً وَاحِدَةً بَيْنَ الْجِنِّ وَالإِنْسِ... وَأَخَّرَ اللَّهُ تِسْعًا وَتِسْعِينَ رَحْمَةً يَرْحَمُ بِهَا عِبَادَهُ يَوْمَ الْقِيَامَةِ»',
      transliteration: 'Inna lillāhi mi’ata raḥmah, anzala minhā raḥmatan wāḥidah...',
      translation: 'Allah divided mercy into one hundred parts. He sent down one single part among jinn, humans, animals, and insects, by which a mother lifts her hoof from her child so she does not trample it. And He held back ninety-nine parts of mercy to bestow upon His servants on the Day of Resurrection.',
      narrator: 'Abu Hurairah (May Allah be pleased with him)',
      source: 'Sahih Muslim (2752), Sahih al-Bukhari (6000)',
      whyRelatableToday: 'No matter what mistakes you made in your past, Allah’s mercy is 99 times greater than all the love ever witnessed on this earth.',
      actionableTakeaway: 'Show tangible mercy today to a child, an elderly relative, or a creature, modeling Allah’s attribute of Ar-Rahman.',
    },
    story: {
      prophetId: 'sulayman',
      prophetName: 'Prophet Sulayman (Solomon)',
      arabicName: 'سُلَيْمَان عَلَيْهِ السَّلَام',
      title: 'The Emperor Who Listened to the Whisper of the Ant',
      historicalEra: 'Ancient Kingdom of Jerusalem · 10th Century BCE',
      pivotalClimax: 'Leading an immense military host of men, jinn, and swooping birds with the wind at his command, Sulayman entered the Valley of the Ants. A tiny ant called out: "O ants, enter your dwellings lest Sulayman and his armies crush you without realizing!" Rather than swelling with haughtiness, the mighty king halted his entire army and smiled with tears: "My Lord, enable me to be grateful for Your favor with which You have favored me and my parents, and to do good deeds that please You."',
      moralWisdom: 'No amount of authority, wealth, or intelligence excuses pride. True majesty lies in being gentle to the small and grateful to God.',
      whyRelatableToday: 'Treat those who serve you or work under you today with utter gentleness and dignity.',
      soundscapePreset: 'oasis-sanctuary',
    },
  },
];

/**
 * Helper to fetch the inspiration triad for a specific day of the week
 */
export function getInspirationForDay(dayIndex: number): DailyInspirationItem {
  const normalized = ((dayIndex % 7) + 7) % 7;
  return weeklyInspirations.find((item) => item.dayIndex === normalized) || weeklyInspirations[1];
}

/**
 * Returns today's inspiration based on current client date
 */
export function getTodayInspiration(): DailyInspirationItem {
  const todayIndex = new Date().getDay();
  return getInspirationForDay(todayIndex);
}
