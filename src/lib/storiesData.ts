export interface QuranEvidenceItem {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  arabic: string;
  transliteration: string;
  translation: string;
  citation: string;
}

export interface NarrativeSection {
  id: string;
  title: string;
  timestamp: string;
  timestampSeconds: number;
  content: string[];
  scholarlyNote?: string;
}

export interface StoryAudioTrack {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  durationSeconds: number;
}

export interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  honorific: string;
  titleBadge: string;
  meaning: string;
  biblicalEquivalent: string;
  eraAndLocation: string;
  predecessor?: { id: string; name: string };
  successor?: { id: string; name: string };
  headerVisual: {
    iconSymbol: string;
    gradientFrom: string;
    gradientTo: string;
    calligraphySnippet: string;
    subtitle: string;
  };
  whoIsIntro: string;
  quranEvidence: QuranEvidenceItem[];
  narrativeSections: NarrativeSection[];
  pullQuotes: {
    quote: string;
    speaker: string;
    context: string;
  }[];
  teachingsAndLessons: string[];
  audioNarration: {
    duration: string;
    durationSeconds: number;
    tracks: StoryAudioTrack[];
    tableOfContents: {
      sectionId: string;
      title: string;
      timestamp: string;
      timestampSeconds: number;
    }[];
  };
}

export const prophetStories: ProphetStory[] = [
  {
    id: 'idris',
    name: 'Prophet Idris',
    arabicName: 'إِدْرِيس',
    honorific: 'عليه السلام',
    titleBadge: 'The First to Write with the Pen',
    meaning: 'The Studious / Devoted Instructor (from the Arabic root D-R-S, to study)',
    biblicalEquivalent: 'Enoch',
    eraAndLocation: 'Antediluvian Era · Ancient Babylon & Egypt (Scholarly Tradition)',
    predecessor: { id: 'adam', name: 'Prophet Seth / Adam' },
    successor: { id: 'nuh', name: 'Prophet Nuh (Noah)' },
    headerVisual: {
      iconSymbol: '✒️',
      gradientFrom: '#153326',
      gradientTo: '#0B1A13',
      calligraphySnippet: 'وَرَفَعْنَاهُ مَكَانًا عَلِيًّا',
      subtitle: 'Elevated to a Sublime Station of Wisdom and Righteousness',
    },
    whoIsIntro:
      'Prophet Idris (peace be upon him) was the third prophet mentioned in the Qur’an after Adam and his son Seth. Renowned as a man of supreme truthfulness (Siddiq), wisdom, and steadfast devotion, classical Islamic tradition identifies him as the pioneer of writing with the reed pen, the study of celestial movements, and the craftsmanship of tailoring garments.',
    quranEvidence: [
      {
        surahNumber: 19,
        verseNumber: 56,
        surahName: 'Maryam',
        arabic: 'وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا',
        transliteration: "Wadhkur fil-Kitabi Idrees; innahu kana siddeeqan Nabiyya.",
        translation: 'And mention in the Book, Idris. Indeed, he was a man of truth and a prophet.',
        citation: 'Surah Maryam 19:56',
      },
      {
        surahNumber: 19,
        verseNumber: 57,
        surahName: 'Maryam',
        arabic: 'وَرَفَعْنَاهُ مَكَانًا عَلِيًّا',
        transliteration: "Wa rafa'nahu makanan 'aliyya.",
        translation: 'And We raised him to a high station.',
        citation: 'Surah Maryam 19:57',
      },
      {
        surahNumber: 21,
        verseNumber: 85,
        surahName: 'Al-Anbiya',
        arabic: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ',
        transliteration: "Wa Isma'eela wa Idreesa wa Dhal-Kifli; kullun minas-sabireen.",
        translation: 'And [mention] Ishmael, Idris, and Dhul-Kifl; all were of the patient.',
        citation: 'Surah Al-Anbiya 21:85',
      },
    ],
    narrativeSections: [
      {
        id: 'idris-early-life',
        title: 'Lineage and the Dawn of Knowledge',
        timestamp: '0:00',
        timestampSeconds: 0,
        content: [
          'According to classical genealogical historians such as Ibn Ishaq and Ibn Kathir, Idris was the son of Yarid, descending directly from the line of Seth (Sheeth) and Adam. He grew up in an era where humanity was expanding across the fertile lands, yet creeping ignorance threatened to eclipse the pure monotheism taught by Adam.',
          'Idris devoted his youth to deep contemplation, reading the divine scrolls (Suhuf) revealed before him. He was granted extraordinary intellect and spiritual illumination. Traditional scholar Ibn Abbas narrated that Idris was the very first human being granted the skill to write with the reed pen, transcribing sacred insights into durable records for posterity.',
        ],
        scholarlyNote:
          'Confirmed in Qur’an 19:56 as a Siddiq and Prophet. The specific attribution of being the first to write with the pen is related by Ibn Hibban and classical tafsir narrations from the early companions.',
      },
      {
        id: 'idris-trials-message',
        title: 'Call to Monotheism & Ethical Reform',
        timestamp: '1:45',
        timestampSeconds: 105,
        content: [
          'When corruption and moral decay began to spread through the tribes, Allah commissioned Idris with divine prophethood. He was tasked with calling people back to the single Creator, enjoining justice, fair dealings, and sincere prayer.',
          'Unlike monarchs who ruled through tyranny, Idris governed his community through moral elevation. He divided his time meticulously: days spent teaching wisdom, judging disputes with equity, and advising on agriculture and urban planning, followed by nights spent in prolonged prostration and communion with Allah.',
          'He urged his people to practice charity, protect the vulnerable, and keep their hearts detached from the transitory illusions of the worldly life.',
        ],
      },
      {
        id: 'idris-elevation-legacy',
        title: 'The High Station & Meeting in the Heavens',
        timestamp: '3:30',
        timestampSeconds: 210,
        content: [
          'The Qur’an states with poetic conciseness: "And We raised him to a high station" (19:57). When the Prophet Muhammad ﷺ was taken on the miraculous Night Journey and Heavenly Ascension (Al-Isra wal-Mi’raj), he met Prophet Idris residing in the Fourth Heaven.',
          'Upon seeing the Messenger of Allah ﷺ, Idris greeted him with warm affection: "Welcome, O righteous brother and righteous Prophet!" (Sahih al-Bukhari). This eternal encounter reaffirmed the unbroken brotherhood of prophecy across the millennia.',
        ],
        scholarlyNote:
          'The meeting in the Fourth Heaven during Al-Mi’raj is authentic and recorded in Sahih al-Bukhari (Hadith 349) and Sahih Muslim.',
      },
    ],
    pullQuotes: [
      {
        quote: 'Happy is he who looks at his own self and makes his good deeds the intercessor between himself and his Lord.',
        speaker: 'Prophet Idris (transmitted in classical Islamic adab literature)',
        context: 'Exhortation to his students on spiritual vigilance and self-examination',
      },
    ],
    teachingsAndLessons: [
      'Knowledge and literacy are divine gifts meant to elevate the spirit and preserve sacred truth.',
      'Siddiqiyyah (scrupulous truthfulness in speech and inner intention) is the prerequisite for divine elevation.',
      'True patience (Sabr) is active perseverance in reform, not passive resignation.',
      'Balancing worldly excellence (craft, science, governance) with nocturnal devotion and remembrance.',
    ],
    audioNarration: {
      duration: '5:12',
      durationSeconds: 312,
      tracks: [
        {
          id: 'idris-track-en',
          title: 'English Devotional Recounting',
          narrator: 'Noor Sacred Narrator',
          duration: '5:12',
          durationSeconds: 312,
        },
      ],
      tableOfContents: [
        { sectionId: 'idris-early-life', title: 'Lineage and the Dawn of Knowledge', timestamp: '0:00', timestampSeconds: 0 },
        { sectionId: 'idris-trials-message', title: 'Call to Monotheism & Ethical Reform', timestamp: '1:45', timestampSeconds: 105 },
        { sectionId: 'idris-elevation-legacy', title: 'The High Station & Meeting in the Heavens', timestamp: '3:30', timestampSeconds: 210 },
      ],
    },
  },
  {
    id: 'nuh',
    name: 'Prophet Nuh',
    arabicName: 'نُوح',
    honorific: 'عليه السلام',
    titleBadge: 'The Steadfast Steersman of the Ark',
    meaning: 'Rest / Comfort / Lamentation (one who implored his people night and day)',
    biblicalEquivalent: 'Noah',
    eraAndLocation: '10 Generations after Adam · Mesopotamia (Valley of the Euphrates & Tigris)',
    predecessor: { id: 'idris', name: 'Prophet Idris' },
    successor: { id: 'ibrahim', name: 'Prophet Ibrahim (Abraham)' },
    headerVisual: {
      iconSymbol: '🌊',
      gradientFrom: '#102E24',
      gradientTo: '#091A14',
      calligraphySnippet: 'وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا',
      subtitle: '950 Years of Relentless Calling, Divine Rescue, and the Rebirth of Faith',
    },
    whoIsIntro:
      'Prophet Nuh (peace be upon him) is celebrated as the Father of the Second Humanity and one of the five Great Messengers of Strong Will (Ulul-Azm). For 950 years, he called his heedless people to renounce stone idols and submit to the One True God, demonstrating superhuman patience before commanding the construction of the sacred Ark by divine revelation.',
    quranEvidence: [
      {
        surahNumber: 71,
        verseNumber: 1,
        surahName: 'Nuh',
        arabic: 'إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنذِرْ قَوْمَكَ مِن قَبْلِ أَن يَأْتِيَهُمْ عَذَابٌ أَلِيمٌ',
        transliteration: "Inna arsalna Noohan ila qawmihee an andhir qawmaka min qabli any-yatiyahum 'adhabun aleem.",
        translation: 'Indeed, We sent Noah to his people, [saying], "Warn your people before there comes to them a painful punishment."',
        citation: 'Surah Nuh 71:1',
      },
      {
        surahNumber: 29,
        verseNumber: 14,
        surahName: 'Al-Ankabut',
        arabic: 'وَلَقَدْ أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا',
        transliteration: "Wa laqad arsalna Noohan ila qawmihee falabitha feehim alfa sanatin illa khamseena 'ama.",
        translation: 'And We certainly sent Noah to his people, and he remained among them a thousand years less fifty years.',
        citation: 'Surah Al-Ankabut 29:14',
      },
      {
        surahNumber: 11,
        verseNumber: 37,
        surahName: 'Hud',
        arabic: 'وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ',
        transliteration: "Wasna'il-fulka bi-a'yunina wa wahyina wa la tukhatibnee filladheena zalamoo; innahum mughraqoon.",
        translation: 'And construct the ship under Our eyes and Our inspiration, and do not address Me concerning those who have wronged; indeed, they are to be drowned.',
        citation: 'Surah Hud 11:37',
      },
    ],
    narrativeSections: [
      {
        id: 'nuh-idolatry-origin',
        title: 'The Infiltration of Idolatry & The Call',
        timestamp: '0:00',
        timestampSeconds: 0,
        content: [
          'In the generations following Prophet Adam and Idris, there lived righteous men known as Wadd, Suwa’, Yaghuth, Ya’uq, and Nasr. When they passed away, Satan whispered to the community to carve statues in their honor to remember their piety.',
          'Generations passed, knowledge was forgotten, and subsequent generations began worshipping those stone figures as divine intermediaries. Seeing his community plunged into grave polytheism, Allah commissioned Nuh to restore pure worship.',
          'Nuh approached his people with boundless tenderness and urgent logic: "O my people! Worship Allah; you have no deity other than Him. Indeed, I fear for you the punishment of a tremendous Day!" (Qur’an 7:59).',
        ],
        scholarlyNote:
          'The historical origin of idols Wadd, Suwa’, Yaghuth, Ya’uq, and Nasr is explicitly affirmed in Surah Nuh (71:23) and detailed by Ibn Abbas in Sahih al-Bukhari (Hadith 4920).',
      },
      {
        id: 'nuh-endurance-950',
        title: '950 Years of Tireless Perseverance',
        timestamp: '2:15',
        timestampSeconds: 135,
        content: [
          'For nine and a half centuries, Nuh called his people through every possible means: "My Lord, indeed I invited my people night and day, but my invitation increased them only in flight" (Qur’an 71:5-6). He spoke to them privately in intimate counsels and proclaimed the truth publicly in open gatherings.',
          'The arrogant chieftains scoffed at him, ridiculing his few followers who were mostly the poor and sincere: "We see you not except as a human being like ourselves, and we do not see you followed except by the lowest among us" (Qur’an 11:27).',
          'Despite insults, threats, and physical persecution across generations, Nuh never wavered in his commitment.',
        ],
      },
      {
        id: 'nuh-ark-deluge',
        title: 'Building the Ark & The Great Deluge',
        timestamp: '4:20',
        timestampSeconds: 260,
        content: [
          'When Allah revealed to Nuh that no more of his people would believe, the divine order arrived: "Build the Ark under Our eyes and inspiration." Nuh began planting cypress trees and constructing a colossal three-decked vessel far inland away from the sea.',
          'The mockers passed by laughing: "O Nuh, you used to be a prophet, and now you have turned into a carpenter in the dry desert!" Nuh replied serenely: "If you ridicule us, then we will ridicule you just as you ridicule."',
          'When the divine sign occurred—the ovens overflowed with boiling water—the heavens opened their gates with torrential rain, and the earth fractured, gushing immense springs. Nuh boarded the Ark with the believers and a pair of every animal species.',
          'Even in that climactic hour, Nuh saw his disbelieving son climbing a mountain and called out with tears of fatherly mercy: "O my son, embark with us and do not be with the disbelievers!" But his son obstinately refused, seeking refuge in the mountain, and a wave surged between them.',
        ],
      },
      {
        id: 'nuh-mount-judi',
        title: 'Resting upon Mount Judi & The New Beginning',
        timestamp: '6:40',
        timestampSeconds: 400,
        content: [
          'After the waters cleansed the earth of tyranny and disbelief, the divine command resonated: "O earth, swallow your water, and O sky, withhold!" The Ark came to rest upon Mount Judi, and Nuh stepped onto purified ground with peace and blessings.',
          'Allah commemorated Nuh in the Qur’an with the highest praise: "Indeed, he was a grateful servant" (Qur’an 17:3).',
        ],
        scholarlyNote:
          'Mount Judi is explicitly named in Qur’an 11:44 and is situated in the southeastern Anatolian border region.',
      },
    ],
    pullQuotes: [
      {
        quote: 'My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.',
        speaker: 'Prophet Nuh (عليه السلام)',
        context: 'Supplication concluding Surah Nuh (71:28)',
      },
      {
        quote: 'O my son, embark with us and be not with the disbelievers!',
        speaker: 'Prophet Nuh (عليه السلام)',
        context: 'Heartfelt plea to his son as the deluge surged (Surah Hud 11:42)',
      },
    ],
    teachingsAndLessons: [
      'Success with Allah is measured by steadfast fidelity to the message, not by the sheer number of followers.',
      'Spiritual ties transcend biological ties: faith, righteousness, and truth define genuine kinship.',
      'Diligence in action (building the Ark inland) must accompany complete reliance (Tawakkul) upon Allah.',
      'Gratitude in all circumstances: Nuh praised Allah in prosperity, during 950 years of trial, and after the rescue.',
    ],
    audioNarration: {
      duration: '8:35',
      durationSeconds: 515,
      tracks: [
        {
          id: 'nuh-track-en',
          title: 'The Great Ark & Deluge Recounting',
          narrator: 'Noor Sacred Narrator',
          duration: '8:35',
          durationSeconds: 515,
        },
      ],
      tableOfContents: [
        { sectionId: 'nuh-idolatry-origin', title: 'The Infiltration of Idolatry & The Call', timestamp: '0:00', timestampSeconds: 0 },
        { sectionId: 'nuh-endurance-950', title: '950 Years of Tireless Perseverance', timestamp: '2:15', timestampSeconds: 135 },
        { sectionId: 'nuh-ark-deluge', title: 'Building the Ark & The Great Deluge', timestamp: '4:20', timestampSeconds: 260 },
        { sectionId: 'nuh-mount-judi', title: 'Resting upon Mount Judi & The New Beginning', timestamp: '6:40', timestampSeconds: 400 },
      ],
    },
  },
  {
    id: 'ibrahim',
    name: 'Prophet Ibrahim',
    arabicName: 'إِبْرَاهِيم',
    honorific: 'عليه السلام',
    titleBadge: 'Khalil Allah — The Intimate Friend of the Merciful',
    meaning: 'Father of Multitudes / Father of the Faithful',
    biblicalEquivalent: 'Abraham',
    eraAndLocation: 'c. 1900 BCE · Ur (Mesopotamia), Harran, Canaan, Egypt, & Makkah',
    predecessor: { id: 'nuh', name: 'Prophet Nuh' },
    successor: { id: 'ismail', name: 'Prophet Ismail & Ishaq' },
    headerVisual: {
      iconSymbol: '🕋',
      gradientFrom: '#1A3326',
      gradientTo: '#0B1A12',
      calligraphySnippet: 'وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا',
      subtitle: 'The Archetype of Monotheism, Champion of Truth, and Builder of the Sacred Sanctuary',
    },
    whoIsIntro:
      'Prophet Ibrahim (peace be upon him) holds a peerless position in Islamic theology as Khalil Allah (the Intimate Friend of Allah), the spiritual progenitor of the Abrahamic prophetic lineage, and a solitary nation of pure monotheism (Ummah Hanifiyyah). His life was a series of monumental trials through which he manifested absolute surrender to the divine will.',
    quranEvidence: [
      {
        surahNumber: 4,
        verseNumber: 125,
        surahName: 'An-Nisa',
        arabic: 'وَمَنْ أَحْسَنُ دِينًا مِّمَّنْ أَسْلَمَ وَجْهَهُ لِلَّهِ وَهُوَ مُحْسِنٌ وَاتَّبَعَ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا ۗ وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا',
        transliteration: "Wa man ahsanu deenan mimman aslama wajhahoo lillahi wa huwa muhsinun wattaba'a millata Ibraheema haneefa; wattakhadhal-lahu Ibraheema khaleela.",
        translation: 'And who is better in religion than one who submits his whole self to Allah while doing good and follows the religion of Abraham, inclining toward truth? And Allah took Abraham as an intimate friend.',
        citation: 'Surah An-Nisa 4:125',
      },
      {
        surahNumber: 16,
        verseNumber: 120,
        surahName: 'An-Nahl',
        arabic: 'إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ',
        transliteration: "Inna Ibraheema kana ummatan qanitan lillahi haneefan wa lam yaku minal-mushrikeen.",
        translation: 'Indeed, Abraham was a nation, obedient to Allah, inclining to truth, and he was not of those who associate partners with Allah.',
        citation: 'Surah An-Nahl 16:120',
      },
      {
        surahNumber: 2,
        verseNumber: 127,
        surahName: 'Al-Baqarah',
        arabic: 'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
        transliteration: "Wa idh yarfa'u Ibraheemul-qawa'ida minal-Bayti wa Isma'eelu Rabbana taqabbal minna; innaka Antas-Samee'ul-'Aleem.",
        translation: 'And [mention] when Abraham was raising the foundations of the House and [with him] Ishmael, [saying], "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."',
        citation: 'Surah Al-Baqarah 2:127',
      },
    ],
    narrativeSections: [
      {
        id: 'ibrahim-youth-logic',
        title: 'Youth, Inquiring Intellect & Breaking the Idols',
        timestamp: '0:00',
        timestampSeconds: 0,
        content: [
          'Born in Ur of the Chaldees into a family where his father Azar carved stone idols, young Ibrahim looked at the lifeless stone figures with deep revulsion. How could humans carve stone with their own hands and then fall prostrate before it asking for sustenance?',
          'With profound philosophical rigor described in Surah Al-An’am, Ibrahim observed the night sky. Seeing a gleaming star, then the luminous moon, and then the blazing sun, each setting in turn, he proclaimed: "I love not those that set... Indeed, I have turned my face toward He who created the heavens and the earth, purely upon truth!" (Qur’an 6:76-79).',
          'During the festival day when the townspeople emptied the city, Ibrahim entered the idol temple with an axe. He shattered all the idols into fragments except the largest one, hanging the axe around its neck to force his people to confront their intellectual bankruptcy.',
        ],
      },
      {
        id: 'ibrahim-blazing-fire',
        title: 'The Blazing Furnace Turned Cool and Peaceful',
        timestamp: '2:40',
        timestampSeconds: 160,
        content: [
          'Humiliated by Ibrahim’s irrefutable logic, King Nimrod and the priests sentenced him to a horrific public execution. They built an enormous furnace fueled with wood for days until birds could not fly over its scorching flames.',
          'Bound in chains and catapulted toward the blaze, the Archangel Jibril appeared asking: "Do you have any need, O Ibrahim?" Ibrahim answered with unshakable serenity: "From you, nothing. As for Allah, He is sufficient for me, and He is the best Disposer of affairs (Hasbuna Allahu wa ni’mal-Wakeel)."',
          'Before the flames could touch a single thread of his garments, Allah issued the cosmic decree: "O fire, be coolness and peace upon Abraham!" (Qur’an 21:69). The fire burned only his ropes, leaving Ibrahim unharmed amidst the embers in tranquil prayer.',
        ],
        scholarlyNote:
          'The statement "Hasbuna Allahu wa ni’mal-Wakeel" at the moment of being cast into the fire is authenticated in Sahih al-Bukhari (Hadith 4563) narrated by Ibn Abbas.',
      },
      {
        id: 'ibrahim-makkah-kabah',
        title: 'The Barren Valley of Makkah & Building the Ka’bah',
        timestamp: '5:10',
        timestampSeconds: 310,
        content: [
          'By divine decree, Ibrahim brought his wife Hajar and infant son Ismail to an uninhabited desert valley devoid of vegetation or water—the future site of Makkah. When Hajar asked: "Did Allah command you to do this?", Ibrahim affirmed, and she replied with transcendent faith: "Then He will not abandon us."',
          'Years later, after the Zamzam spring miraculously gushed forth, father and son were commanded to rebuild the Ka’bah, the primal House of Monotheism established for humanity. As they raised its stones under the burning Arabian sun, they supplicated: "Our Lord, accept this from us! Indeed You are the All-Hearing, the All-Knowing."',
          'Allah commanded Ibrahim to announce the pilgrimage (Hajj) to all mankind: "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel from every distant pass" (Qur’an 22:27). Millions answering that call today stand as a living testament to that divine promise.',
        ],
      },
      {
        id: 'ibrahim-the-supreme-sacrifice',
        title: 'The Vision of Sacrifice & Transcendent Surrender',
        timestamp: '7:30',
        timestampSeconds: 450,
        content: [
          'The ultimate trial arrived when Ibrahim saw in a true prophetic vision that he was sacrificing his beloved son Ismail. Revealing the vision to his son, young Ismail demonstrated breathtaking submission: "O my father, do as you are commanded. You will find me, if Allah wills, of the steadfast."',
          'When both had submitted and Ibrahim laid his son down upon his forehead, Allah called out: "O Abraham, you have fulfilled the vision! Indeed, thus do We reward the doers of good." A noble ram was sent as a ransom from heaven, establishing the annual sacrifice of Eid al-Adha for all generations.',
        ],
      },
    ],
    pullQuotes: [
      {
        quote: 'Hasbuna Allahu wa ni’mal-Wakeel (Allah is sufficient for us, and He is the best Disposer of affairs).',
        speaker: 'Prophet Ibrahim (عليه السلام)',
        context: 'Uttered as he was propelled through the air into the roaring furnace',
      },
      {
        quote: 'Our Lord, make us submissive to You and from our descendants a nation submissive to You.',
        speaker: 'Prophet Ibrahim and Ismail (عليهما السلام)',
        context: 'Supplication while laying the stone foundations of the Ka’bah (Qur’an 2:128)',
      },
    ],
    teachingsAndLessons: [
      'Pure Monotheism (Tawhid) demands courageous rejection of societal blind imitation and idolized falsehood.',
      'True reliance (Tawakkul) transforms raging fires into cool sanctuaries of divine peace.',
      'Sincere sacrifice in the path of Allah is always replaced with divine blessings far greater than what was given up.',
      'A father’s legacy is built on instilling conviction and consulting his children with mutual love and respect.',
    ],
    audioNarration: {
      duration: '9:45',
      durationSeconds: 585,
      tracks: [
        {
          id: 'ibrahim-track-en',
          title: 'The Intimate Friend of Allah — Full Life Narrative',
          narrator: 'Noor Sacred Narrator',
          duration: '9:45',
          durationSeconds: 585,
        },
      ],
      tableOfContents: [
        { sectionId: 'ibrahim-youth-logic', title: 'Youth, Inquiring Intellect & Breaking the Idols', timestamp: '0:00', timestampSeconds: 0 },
        { sectionId: 'ibrahim-blazing-fire', title: 'The Blazing Furnace Turned Cool and Peaceful', timestamp: '2:40', timestampSeconds: 160 },
        { sectionId: 'ibrahim-makkah-kabah', title: 'The Barren Valley of Makkah & Building the Ka’bah', timestamp: '5:10', timestampSeconds: 310 },
        { sectionId: 'ibrahim-the-supreme-sacrifice', title: 'The Vision of Sacrifice & Transcendent Surrender', timestamp: '7:30', timestampSeconds: 450 },
      ],
    },
  },
  {
    id: 'musa',
    name: 'Prophet Musa',
    arabicName: 'مُوسَى',
    honorific: 'عليه السلام',
    titleBadge: 'Kalimullah — The One Spoken to Directly by Allah',
    meaning: 'Drawn from the Water (from Ancient Egyptian / Hebrew tradition)',
    biblicalEquivalent: 'Moses',
    eraAndLocation: 'c. 1300 BCE · Ancient Egypt (Nile Valley), Midian, Mount Sinai, & Desert of Paran',
    predecessor: { id: 'ibrahim', name: 'Prophet Ya’qub / Yusuf' },
    successor: { id: 'harun', name: 'Prophet Harun & Yusha (Joshua)' },
    headerVisual: {
      iconSymbol: '⚡',
      gradientFrom: '#122D22',
      gradientTo: '#081710',
      calligraphySnippet: 'وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا',
      subtitle: 'Confrontation with Pharaoh, The Parting of the Sea, and Divine Discourse at Mount Tur',
    },
    whoIsIntro:
      'Prophet Musa (peace be upon him) is the most frequently mentioned prophet in the Holy Qur’an, appearing by name over 136 times. Honored as Kalimullah for hearing Allah’s speech directly without angelic intermediary, his epic journey spans an infant floating in a reed basket upon the Nile, decades of shepherd exile in Midian, confronting the tyrannical Pharaoh, and leading the children of Israel toward liberation.',
    quranEvidence: [
      {
        surahNumber: 4,
        verseNumber: 164,
        surahName: 'An-Nisa',
        arabic: 'وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًا لَّمْ نَقْصُصْهُمْ عَلَيْكَ ۚ وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا',
        transliteration: "Wa rusulan qad qasasnahum 'alayka min qablu wa rusulan lam naqsushum 'alayk; wa kallamal-lahu Moosa takleema.",
        translation: 'And [We sent] messengers about whom We have told you before and messengers about whom We have not told you. And Allah spoke to Moses directly.',
        citation: 'Surah An-Nisa 4:164',
      },
      {
        surahNumber: 20,
        verseNumber: 13,
        surahName: 'Ta-Ha',
        arabic: 'وَأَنَا اخْتَرْتُكَ فَاسْتَمِعْ لِمَا يُوحَىٰ',
        transliteration: "Wa ana-khtartuka fastami' lima yooha.",
        translation: 'And I have chosen you, so listen to what is revealed.',
        citation: 'Surah Ta-Ha 20:13',
      },
      {
        surahNumber: 26,
        verseNumber: 62,
        surahName: 'Ash-Shu’ara',
        arabic: 'قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ',
        transliteration: "Qala kalla; inna ma'iya Rabbee sayahdeen.",
        translation: '[Moses] said, "No! Indeed, with me is my Lord; He will guide me."',
        citation: 'Surah Ash-Shu’ara 26:62',
      },
    ],
    narrativeSections: [
      {
        id: 'musa-ark-nile',
        title: 'The Nile Basket & Raised in the Palace of Pharaoh',
        timestamp: '0:00',
        timestampSeconds: 0,
        content: [
          'Pharaoh Ramses had instituted a genocidal decree slaughtering all newborn Hebrew boys. When Musa was born, his mother was seized with terror, but Allah inspired her heart with miraculous comfort: "Suckle him; then when you fear for him, cast him into the river and do not fear or grieve; indeed, We will return him to you and make him one of the messengers" (Qur’an 28:7).',
          'The waterproof basket drifted along the Nile directly into Pharaoh’s palace gardens. Pharaoh’s queen, Asiyah (one of the four greatest women in Islamic tradition), opened the chest and her heart filled with divine love for the radiant baby: "He will be a comfort of the eye for me and for you! Do not kill him; perhaps he will benefit us, or we may adopt him as a son" (Qur’an 28:9).',
          'Through divine orchestration, baby Musa refused all royal wet-nurses until his sister Miriam cleverly introduced their own biological mother, fulfilling the promise that he would be returned to her arms.',
        ],
      },
      {
        id: 'musa-burning-bush-tur',
        title: 'Exile in Midian & The Fire on Mount Tur',
        timestamp: '2:50',
        timestampSeconds: 170,
        content: [
          'After inadvertently killing an oppressive Egyptian during a street altercation and learning of a plot against his life, Musa fled across the blistering desert to Midian. There, by the well, he graciously helped two young shepherdesses water their flock without demanding payment, then sat in the shade supplicating: "My Lord, truly I am in dire need of whatever good You bestow upon me!" (Qur’an 28:24).',
          'He served their father, the righteous elder, for ten years as a trustworthy shepherd before marrying his daughter. Returning with his family through the frigid desert night of Sinai, Musa spotted a solitary fire flickering on the slope of Mount Tur.',
          'Approaching to fetch a glowing brand, the voice of the Lord of the Worlds reverberated through the valley of Tuwa: "O Moses! Indeed, I am Allah, the Lord of the worlds... Cast down your staff!" The staff turned into a living serpent, and his hand drew from his cloak gleaming brilliant white without flaw. Armed with these nine supreme signs, he was commanded to return to Egypt to confront Pharaoh.',
        ],
      },
      {
        id: 'musa-pharaoh-confrontation',
        title: 'Confronting Pharaoh & The Defeat of the Magicians',
        timestamp: '5:40',
        timestampSeconds: 340,
        content: [
          'Accompanied by his eloquent brother Harun, Musa stood before Pharaoh demanding the liberation of the enslaved Children of Israel. Pharaoh scoffed arrogantly, claiming divinity: "I am your Lord, most high!"',
          'Pharaoh assembled Egypt’s greatest sorcerers on the Day of Festival. When the magicians cast their ropes and sticks, bewitching the eyes of the crowd to appear as slithering serpents, Musa felt a fleeting apprehension. Allah commanded him to cast his staff, which instantaneously swallowed all their illusions.',
          'Recognizing that this was not sorcery but undeniable divine reality, the elite magicians immediately fell prostrate in tears: "We believe in the Lord of the worlds, the Lord of Moses and Aaron!" Unmoved by Pharaoh’s threats of torture, their newfound conviction was unbreakable.',
        ],
      },
      {
        id: 'musa-parting-red-sea',
        title: 'The Parting of the Sea & The Ultimate Deliverance',
        timestamp: '8:00',
        timestampSeconds: 480,
        content: [
          'Guiding his people by night out of Egypt, the Israelites arrived at the shores of the Red Sea just as dawn broke. Behind them charged Pharaoh’s armored chariots in full force. Trapped between the deep water and the sword, the Israelites panicked: "Indeed, we are overtaken!"',
          'With towering, unshakeable certainty, Musa declared the immortal words: "Kalla! Inna ma’iya Rabbee sayahdeen! (No! Indeed, with me is my Lord; He will guide me!)"',
          'Striking the water with his staff by divine command, the Red Sea split asunder into twelve distinct pathways, its towering walls of water standing like massive mountains. The Israelites crossed safely over dry seabed, while Pharaoh and his armies pursued blindly and were engulfed beneath the returning waves.',
        ],
      },
    ],
    pullQuotes: [
      {
        quote: 'Kalla! Inna ma’iya Rabbee sayahdeen! (No! Never! Indeed, with me is my Lord; He will surely guide me!)',
        speaker: 'Prophet Musa (عليه السلام)',
        context: 'Proclaimed before the raging Red Sea with Pharaoh’s army approaching behind',
      },
      {
        quote: 'My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue, that they may understand my speech.',
        speaker: 'Prophet Musa (عليه السلام)',
        context: 'Supplication upon receiving the divine mission to confront Pharaoh (Surah Ta-Ha 20:25-28)',
      },
    ],
    teachingsAndLessons: [
      'Absolute certainty in Allah’s aid (Yaqeen) opens paths through the most insurmountable oceans of adversity.',
      'Courage before tyrannical rulers: speaking truth to power is the hallmark of prophetic leadership.',
      'Sincere service to others with no expectation of reward (as Musa did at the well of Midian) invites sudden divine providence.',
      'Self-awareness in leadership: asking for pious comrades and brothers (as Musa requested Harun) strengthens the mission of faith.',
    ],
    audioNarration: {
      duration: '10:45',
      durationSeconds: 645,
      tracks: [
        {
          id: 'musa-track-en',
          title: 'The Exodus & The Splitting of the Sea',
          narrator: 'Noor Sacred Narrator',
          duration: '10:45',
          durationSeconds: 645,
        },
      ],
      tableOfContents: [
        { sectionId: 'musa-ark-nile', title: 'The Nile Basket & Raised in the Palace of Pharaoh', timestamp: '0:00', timestampSeconds: 0 },
        { sectionId: 'musa-burning-bush-tur', title: 'Exile in Midian & The Fire on Mount Tur', timestamp: '2:50', timestampSeconds: 170 },
        { sectionId: 'musa-pharaoh-confrontation', title: 'Confronting Pharaoh & The Defeat of the Magicians', timestamp: '5:40', timestampSeconds: 340 },
        { sectionId: 'musa-parting-red-sea', title: 'The Parting of the Sea & The Ultimate Deliverance', timestamp: '8:00', timestampSeconds: 480 },
      ],
    },
  },
];
