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
    "id": "adam",
    "name": "Prophet Adam",
    "arabicName": "آدَم",
    "honorific": "عليه السلام",
    "titleBadge": "Father of Humanity & First Prophet",
    "meaning": "Formed from the dust of the earth (Adeem al-Ard)",
    "biblicalEquivalent": "Adam",
    "eraAndLocation": "Dawn of Creation · Paradise & Early Earth",
    "successor": {
      "id": "idris",
      "name": "Prophet Idris (Enoch)"
    },
    "headerVisual": {
      "iconSymbol": "🌱",
      "gradientFrom": "#1c3d2e",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا",
      "subtitle": "Fashioned from Clay, Taught the Sacred Names, and Crowned with Repentance"
    },
    "whoIsIntro": "Prophet Adam (peace be upon him) was the first human created by Allah, fashioned with divine care and honored above the angels by being taught the names of all things. His journey—from Paradise through trial to heartfelt repentance—embodies the human condition: not flawlessness, but turning back to Allah with humility.",
    "quranEvidence": [
      {
        "surahNumber": 2,
        "verseNumber": 30,
        "surahName": "Al-Baqarah",
        "arabic": "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
        "transliteration": "Wa-idh qala rabbuka lil-mala'ikati inni ja'ilun fil-ardi khalifah",
        "translation": "And remember when your Lord said to the angels: \"Indeed, I am placing upon the earth a successive authority (steward).\"",
        "citation": "Quran 2:30"
      },
      {
        "surahNumber": 7,
        "verseNumber": 23,
        "surahName": "Al-A'raf",
        "arabic": "قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        "transliteration": "Qala rabbana zalamna anfusana wa-in lam taghfir lana wa-tarhamna lanakūnanna minal-khasireen",
        "translation": "They said: \"Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.\"",
        "citation": "Quran 7:23"
      }
    ],
    "narrativeSections": [
      {
        "id": "adam-creation",
        "title": "Fashioned from Clay & The Breath of Life",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Before human history began, Allah declared to the angels His divine decree to establish a steward (Khaleefah) on the earth. While the angels wondered at humankind's capacity for corruption and bloodshed, Allah replied with supreme majesty: \"Indeed, I know that which you do not know.\"",
          "Adam was molded from varied clays of the earth—symbolizing the magnificent diversity of colors, temperaments, and tongues of his descendants. When Allah breathed into him of His created spirit, life stirred within his limbs."
        ],
        "scholarlyNote": "Referenced in Sahih al-Bukhari and detailed by Ibn Kathir in Qisas al-Anbiya."
      },
      {
        "id": "adam-iblis",
        "title": "The Prostration of Honor & The Arrogance of Iblis",
        "timestamp": "2:15",
        "timestampSeconds": 135,
        "content": [
          "To demonstrate Adam's spiritual capacity, Allah taught him the names and essences of all things. When Allah asked the angels to name them, they acknowledged their limited knowledge. Allah then commanded Adam to inform them, revealing his special faculty for divine learning.",
          "Commanded to prostrate to Adam in honor of the Creator's work, the angels bowed instantly. But Iblis (Satan) refused out of envy and pride, claiming: \"I am better than him; You created me from fire and him from clay.\""
        ]
      },
      {
        "id": "adam-repentance",
        "title": "The Garden, The Whispering, and Pure Repentance",
        "timestamp": "4:45",
        "timestampSeconds": 285,
        "content": [
          "Adam and Hawwa (Eve) dwelt peacefully in the garden with freedom to enjoy its boundless fruits, warned only to steer clear of one specific tree. Shaytan whispered deceptively that eating from it would grant them eternity or angelic status.",
          "Upon erring, their spiritual awareness awakened immediately with remorse. Unlike Iblis who justified his disobedience with arrogance, Adam and Hawwa turned to their Lord in heartfelt tears, uttering the immortal supplication of Tawbah: \"Our Lord, we have wronged ourselves...\""
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        "speaker": "Prophet Adam & Hawwa",
        "context": "Their timeless prayer of sincere repentance upon leaving the garden"
      }
    ],
    "teachingsAndLessons": [
      "Sin followed by heartfelt repentance elevates a servant closer to Allah than unbroken complacency.",
      "Arrogance (kibr) was the very first sin committed against Allah; it blinds the soul from divine truth.",
      "Human dignity is rooted in sacred knowledge and stewardship, not mere physical might."
    ],
    "audioNarration": {
      "duration": "7:45",
      "durationSeconds": 465,
      "tracks": [
        {
          "id": "adam-tr-1",
          "title": "The Creation & The Sacred Names",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "4:15",
          "durationSeconds": 255
        },
        {
          "id": "adam-tr-2",
          "title": "The Trial, Repentance, & Earthly Mission",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "3:30",
          "durationSeconds": 210
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "adam-creation",
          "title": "Fashioned from Clay",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "adam-iblis",
          "title": "The Fall of Iblis",
          "timestamp": "2:15",
          "timestampSeconds": 135
        },
        {
          "sectionId": "adam-repentance",
          "title": "Repentance & Tawbah",
          "timestamp": "4:45",
          "timestampSeconds": 285
        }
      ]
    }
  },
  {
    "id": "idris",
    "name": "Prophet Idris",
    "arabicName": "إِدْرِيس",
    "honorific": "عليه السلام",
    "titleBadge": "The Raised to High Station & Master of Pen",
    "meaning": "The Instructor / The Diligent Student of Sacred Wisdom (from Darasa)",
    "biblicalEquivalent": "Enoch",
    "eraAndLocation": "Pre-Deluge Mesopotamia & Babylonia",
    "predecessor": {
      "id": "adam",
      "name": "Prophet Adam"
    },
    "successor": {
      "id": "nuh",
      "name": "Prophet Nuh (Noah)"
    },
    "headerVisual": {
      "iconSymbol": "✒️",
      "gradientFrom": "#153123",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَرَفَعْنَاهُ مَكَانًا عَلِيًّا",
      "subtitle": "The First to Write with the Pen, Stitch Cloth, and Walk in Sublimity"
    },
    "whoIsIntro": "Prophet Idris (Enoch) holds a distinguished place in early prophetic chronology. Praised in the Quran as a man of steadfast truth and patience, Islamic tradition records that he was the first to write with the reed pen, pioneer astronomy, and master tailoring garments of dignity.",
    "quranEvidence": [
      {
        "surahNumber": 19,
        "verseNumber": 56,
        "surahName": "Maryam",
        "arabic": "وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا",
        "transliteration": "Wadhkur fil-kitabi idrees, innahu kana siddeeqan nabiyya",
        "translation": "And mention in the Book, Idris. Indeed, he was a man of truth and a prophet.",
        "citation": "Quran 19:56"
      },
      {
        "surahNumber": 19,
        "verseNumber": 57,
        "surahName": "Maryam",
        "arabic": "وَرَفَعْنَاهُ مَكَانًا عَلِيًّا",
        "transliteration": "Wa-rafa'nahu makanan 'aliyya",
        "translation": "And We raised him to a high station.",
        "citation": "Quran 19:57"
      }
    ],
    "narrativeSections": [
      {
        "id": "idris-pioneer",
        "title": "Wisdom, Inventions, and Sacred Instruction",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Idris lived in the centuries following Adam, witnessing humanity beginning to deviate into moral apathy. Allah granted him remarkable wisdom and intellect, inspiring him to teach his people mathematics, calendar cycles, and the observation of the celestial heavens.",
          "Tradition records that he was the very first person to record knowledge using a pen and the first to sew linen into tailored garments, replacing animal skins with civilized modesty."
        ]
      },
      {
        "id": "idris-elevation",
        "title": "Elevated to a Sublime Station",
        "timestamp": "2:40",
        "timestampSeconds": 160,
        "content": [
          "During the miraculous Night Journey (Al-Isra wal-Mi'raj), the Prophet Muhammad ﷺ was greeted by Prophet Idris on the fourth heaven. Idris welcomed him warmly: \"Welcome, righteous brother and righteous prophet!\"",
          "Classical exegetes explain that Allah raised him physically and spiritually to lofty realms as a sign of divine honor for his unending devotion."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Happy is he who looks at his own soul and whose deeds are acceptable to his Lord.",
        "speaker": "Prophet Idris (as recorded in classical chronicles)",
        "context": "Counsel to his disciples regarding self-accountability"
      }
    ],
    "teachingsAndLessons": [
      "Pursuing science, literacy, and craft in the service of God is a prophetic virtue.",
      "Siddiqiyyah (uncompromising commitment to truth) earns a soul elevated ranks in both worlds."
    ],
    "audioNarration": {
      "duration": "5:30",
      "durationSeconds": 330,
      "tracks": [
        {
          "id": "idris-tr-1",
          "title": "The Pen, The Stars, & Celestial Honor",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:30",
          "durationSeconds": 330
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "idris-pioneer",
          "title": "Wisdom & Inventions",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "idris-elevation",
          "title": "Elevated Station",
          "timestamp": "2:40",
          "timestampSeconds": 160
        }
      ]
    }
  },
  {
    "id": "nuh",
    "name": "Prophet Nuh",
    "arabicName": "نُوح",
    "honorific": "عليه السلام",
    "titleBadge": "The Grateful Servant & Builder of the Ark",
    "meaning": "Rest / Comfort / Lamentation in Devotion",
    "biblicalEquivalent": "Noah",
    "eraAndLocation": "Pre-Deluge Mesopotamia (Southern Iraq)",
    "predecessor": {
      "id": "idris",
      "name": "Prophet Idris"
    },
    "successor": {
      "id": "hud",
      "name": "Prophet Hud"
    },
    "headerVisual": {
      "iconSymbol": "🌊",
      "gradientFrom": "#102d38",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا",
      "subtitle": "950 Years of Tireless Calling, Unshakable Endurance, and the Cleansing Flood"
    },
    "whoIsIntro": "Prophet Nuh (peace be upon him) is the first of the Ulul-'Azm (Arch-Prophets of Firm Resolve). For 950 continuous years, he summoned his nation day and night with tender patience. When tyranny and idolatry hardened into absolute defiance, Allah instructed him to build the Ark that salvaged faith and all terrestrial life.",
    "quranEvidence": [
      {
        "surahNumber": 11,
        "verseNumber": 37,
        "surahName": "Hud",
        "arabic": "وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ",
        "transliteration": "Wasna'il-fulka bi-a'yunina wa-wahyina wa-la tukhatibni fil-ladheena zalamu, innahum mughraqūn",
        "translation": "And construct the ship under Our watchful eyes and Our inspiration, and do not address Me on behalf of those who wronged; indeed, they are to be drowned.",
        "citation": "Quran 11:37"
      },
      {
        "surahNumber": 71,
        "verseNumber": 5,
        "surahName": "Nuh",
        "arabic": "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا",
        "transliteration": "Qala rabbi inni da'awtu qawmi laylan wa-nahara",
        "translation": "He said: \"My Lord, indeed I have called my people night and day.\"",
        "citation": "Quran 71:5"
      }
    ],
    "narrativeSections": [
      {
        "id": "nuh-dawah",
        "title": "Nine and a Half Centuries of Devotion",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Idolatry first entered humanity when people erected statues in memory of deceased righteous men (Wadd, Suwa', Yaghuth, Ya'uq, and Nasr), eventually treating them as intercessors and gods.",
          "Nuh arose to rescue them from superstition, pleading with them in public gatherings and in intimate private conversations. Rather than listening, the chieftains stuffed their fingers in their ears and wrapped themselves in their cloaks."
        ]
      },
      {
        "id": "nuh-ark",
        "title": "Building the Ark in the Arid Wilderness",
        "timestamp": "3:20",
        "timestampSeconds": 200,
        "content": [
          "Commanded by divine revelation, Nuh planted trees, harvested timber, and began constructing a colossal multi-tiered vessel miles away from any sea. The mocking nobles sneered: \"Yesterday you were a prophet, today you are a carpenter!\"",
          "Nuh answered with quiet certitude: \"If you ridicule us now, we will ridicule you just as you ridicule.\""
        ]
      },
      {
        "id": "nuh-deluge",
        "title": "The Sky Opens, The Earth Gushes, and The Mount Judi",
        "timestamp": "5:50",
        "timestampSeconds": 350,
        "content": [
          "When the divine decree struck, the fountains of the earth burst open and the heavens poured cascading torrents of rain. The believers and pairs of every creature boarded safely.",
          "In one of the most heartbreaking moments of the Quran, Nuh cried out to his unbelieving son: \"O my son, come aboard with us and be not with the disbelievers!\" His son replied that a mountain would protect him, only to be swept away by towering waves.",
          "The Ark eventually rested upon Mount Judi in safety, ushering in a fresh rebirth of monotheistic civilization."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "My Lord, forgive me and my parents and whoever enters my house a believer, and the believing men and believing women.",
        "speaker": "Prophet Nuh",
        "context": "His prayer for all believers as documented in Surah Nuh (71:28)"
      }
    ],
    "teachingsAndLessons": [
      "Success in the sight of Allah is measured by steadfast obedience and sincerity, not worldly numbers.",
      "Kinship without faith cannot save a person; spiritual ties transcend bloodlines.",
      "Patience during prolonged hardship is honored by Allah with ultimate deliverance."
    ],
    "audioNarration": {
      "duration": "8:45",
      "durationSeconds": 525,
      "tracks": [
        {
          "id": "nuh-tr-1",
          "title": "The Great Call & The Building of the Ark",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "4:45",
          "durationSeconds": 285
        },
        {
          "id": "nuh-tr-2",
          "title": "The Deluge & Mount Judi",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "4:00",
          "durationSeconds": 240
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "nuh-dawah",
          "title": "950 Years of Calling",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "nuh-ark",
          "title": "Constructing the Ark",
          "timestamp": "3:20",
          "timestampSeconds": 200
        },
        {
          "sectionId": "nuh-deluge",
          "title": "The Cleansing Deluge",
          "timestamp": "5:50",
          "timestampSeconds": 350
        }
      ]
    }
  },
  {
    "id": "hud",
    "name": "Prophet Hud",
    "arabicName": "هُود",
    "honorific": "عليه السلام",
    "titleBadge": "The Warner to the Giants of Iram",
    "meaning": "The Calm / The One Who Guides to Righteous Quietude",
    "biblicalEquivalent": "Eber",
    "eraAndLocation": "Al-Ahqaf (The Sand Dunes between Yemen & Oman)",
    "predecessor": {
      "id": "nuh",
      "name": "Prophet Nuh"
    },
    "successor": {
      "id": "saleh",
      "name": "Prophet Saleh"
    },
    "headerVisual": {
      "iconSymbol": "🏜️",
      "gradientFrom": "#302613",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِرَمَ ذَاتِ الْعِمَادِ الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ",
      "subtitle": "Confronting the Superpower of Iram and the Howling Wind of Judgment"
    },
    "whoIsIntro": "Prophet Hud (peace be upon him) was dispatched to the mighty civilization of 'Ad in the vast desert valleys of Al-Ahqaf. Renowned for their towering physiques and architectural wonders of Iram, they boasted: \"Who is greater than us in power?\" Hud called them to temperance, gratitude, and true faith.",
    "quranEvidence": [
      {
        "surahNumber": 26,
        "verseNumber": 124,
        "surahName": "Ash-Shu'ara",
        "arabic": "إِذْ قَالَ لَهُمْ أَخُوهُمْ هُودٌ أَلَا تَتَّقُونَ",
        "transliteration": "Idh qala lahum akhūhum Hūdun ala tattaqūn",
        "translation": "When their brother Hud said to them: \"Will you not fear Allah?\"",
        "citation": "Quran 26:124"
      },
      {
        "surahNumber": 41,
        "verseNumber": 15,
        "surahName": "Fussilat",
        "arabic": "فَأَمَّا عَادٌ فَاسْتَكْبَرُوا فِي الْأَرْضِ بِغَيْرِ الْحَقِّ وَقَالُوا مَنْ أَشَدُّ مِنَّا قُوَّةً",
        "transliteration": "Fa-amma 'Adun fastakbarū fil-ardi bi-ghayril-haqqi wa-qālū man ashaddu minna quwwah",
        "translation": "As for 'Ad, they were arrogant upon the earth without right and said: \"Who is greater than us in strength?\"",
        "citation": "Quran 41:15"
      }
    ],
    "narrativeSections": [
      {
        "id": "hud-arrogance",
        "title": "The Pillars of Iram and the Mirage of Invincibility",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "The people of 'Ad were blessed with astonishing physical strength, vast agricultural valleys, and magnificent palaces supported by towering pillars. Yet luxury turned into cruelty; they oppressed weaker tribes and worshiped stone idols.",
          "Hud stood before their haughty council with courage, reminding them that their blessings were loans from Allah that demanded justice and charity rather than tyranny."
        ]
      },
      {
        "id": "hud-wind",
        "title": "The Howling Gale of Seven Nights and Eight Days",
        "timestamp": "2:50",
        "timestampSeconds": 170,
        "content": [
          "After long droughts, 'Ad saw a dense dark cloud rolling across the horizon and rejoiced: \"This is a cloud bringing us rain!\"",
          "Hud replied gravely: \"Nay, it is that which you sought to hasten—a wind containing a painful punishment.\" The roaring storm unleashed freezing gusts that obliterated their fortresses, leaving them like uprooted trunks of hollow date palms, while Hud and the believers were preserved."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "O my people, ask forgiveness of your Lord and then repent to Him. He will send [rain from] the sky upon you in showers and increase you in strength to your strength.",
        "speaker": "Prophet Hud",
        "context": "His compassionate appeal to 'Ad in Surah Hud (11:52)"
      }
    ],
    "teachingsAndLessons": [
      "Technological supremacy and military power can never withstand divine justice.",
      "Arrogance in national identity often precedes catastrophic collapse."
    ],
    "audioNarration": {
      "duration": "6:15",
      "durationSeconds": 375,
      "tracks": [
        {
          "id": "hud-tr-1",
          "title": "The Titans of Iram & The Desert Storm",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "6:15",
          "durationSeconds": 375
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "hud-arrogance",
          "title": "The Mirage of Power",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "hud-wind",
          "title": "The Howling Gale",
          "timestamp": "2:50",
          "timestampSeconds": 170
        }
      ]
    }
  },
  {
    "id": "saleh",
    "name": "Prophet Saleh",
    "arabicName": "صَالِح",
    "honorific": "عليه السلام",
    "titleBadge": "The Messenger of the Miraculous She-Camel",
    "meaning": "The Upright / The Righteous / The Wholesome",
    "biblicalEquivalent": "Salah",
    "eraAndLocation": "Al-Hijr (Mada'in Saleh, Northwestern Arabia)",
    "predecessor": {
      "id": "hud",
      "name": "Prophet Hud"
    },
    "successor": {
      "id": "ibrahim",
      "name": "Prophet Ibrahim (Abraham)"
    },
    "headerVisual": {
      "iconSymbol": "🐪",
      "gradientFrom": "#3d1c1c",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "نَاقَةَ اللَّهِ وَسُقْيَاهَا",
      "subtitle": "Homes Carved into Stone Mountains, The Sacred She-Camel, and The Mighty Cry"
    },
    "whoIsIntro": "Prophet Saleh (peace be upon him) was sent to Thamud, master stonemasons who carved secure mansions out of sheer cliffs in Al-Hijr. When they challenged him to produce a miraculous sign from a solid boulder, Allah brought forth a magnificent she-camel as a living test of their reverence for sacred rights.",
    "quranEvidence": [
      {
        "surahNumber": 26,
        "verseNumber": 141,
        "surahName": "Ash-Shu'ara",
        "arabic": "كَذَّبَتْ ثَمُودُ الْمُرْسَلِينَ إِذْ قَالَ لَهُمْ أَخُوهُمْ صَالِحٌ أَلَا تَتَّقُونَ",
        "transliteration": "Kadhdhabat Thamūdul-mursaleen, idh qala lahum akhūhum Salihun ala tattaqūn",
        "translation": "Thamud denied the messengers when their brother Saleh said to them: \"Will you not fear Allah?\"",
        "citation": "Quran 26:141-142"
      },
      {
        "surahNumber": 91,
        "verseNumber": 13,
        "surahName": "Ash-Shams",
        "arabic": "فَقَالَ لَهُمْ رَسُولُ اللَّهِ نَاقَةَ اللَّهِ وَسُقْيَاهَا",
        "transliteration": "Fa-qala lahum rasūlullāhi naqatallahi wa-suqyaha",
        "translation": "And the messenger of Allah [Saleh] said to them: \"[Do not harm] the she-camel of Allah or prevent her water.\"",
        "citation": "Quran 91:13"
      }
    ],
    "narrativeSections": [
      {
        "id": "saleh-challenge",
        "title": "The Living Sign Born from the Mountain",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Thamud lived in the rock-hewn valleys of Al-Hijr, carving elegant facades into living sandstone. Confident that stone fortresses shielded them from all calamities, they turned away from God.",
          "Demanding proof, they pointed to a massive rock face and challenged Saleh to bring forth a pregnant she-camel. Saleh prayed fervently, and by Allah's command, the rock cleft asunder and a magnificent she-camel emerged, producing abundant milk for the poor."
        ]
      },
      {
        "id": "saleh-conspiracy",
        "title": "The Sacred Water Rights and The Sin of Nine Rebels",
        "timestamp": "3:10",
        "timestampSeconds": 190,
        "content": [
          "Saleh established a sacred covenant: the camel would drink from the community spring on one designated day, and the people would draw their water on alternate days.",
          "Corrupt elites led by Qudar ibn Salif resented this divine order. In reckless defiance, they hamstrung and slaughtered the camel, daring Saleh to summon divine retribution. Saleh wept and warned: \"Enjoy yourselves in your homes for three days; that is a promise not to be denied.\"",
          "At dawn of the fourth day, a terrifying blast (As-Sayhah) shook the valley, leaving the oppressors lifeless in their carved rock chambers."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "O my people, worship Allah; you have no deity other than Him. He has produced you from the earth and settled you upon it, so ask forgiveness of Him and turn to Him in repentance.",
        "speaker": "Prophet Saleh",
        "context": "Addressing the stonemasons of Thamud in Surah Hud (11:61)"
      }
    ],
    "teachingsAndLessons": [
      "Living signs from God require respect; mocking divine boundaries brings swift consequence.",
      "Societies are ruined when corrupt minorities plot injustice and the majority remains silent."
    ],
    "audioNarration": {
      "duration": "6:50",
      "durationSeconds": 410,
      "tracks": [
        {
          "id": "saleh-tr-1",
          "title": "The Rock-Carvers of Al-Hijr & The She-Camel",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "6:50",
          "durationSeconds": 410
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "saleh-challenge",
          "title": "The Living Sign",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "saleh-conspiracy",
          "title": "The Betrayal & The Blast",
          "timestamp": "3:10",
          "timestampSeconds": 190
        }
      ]
    }
  },
  {
    "id": "ibrahim",
    "name": "Prophet Ibrahim",
    "arabicName": "إِبْرَاهِيم",
    "honorific": "عليه السلام",
    "titleBadge": "Khalilullah (The Intimate Friend of Allah) & Father of Monotheism",
    "meaning": "Father of Many Nations / Loving Parent of Faith",
    "biblicalEquivalent": "Abraham",
    "eraAndLocation": "Mesopotamia (Ur), Canaan (Palestine), & Bakkah (Makkah)",
    "predecessor": {
      "id": "saleh",
      "name": "Prophet Saleh"
    },
    "successor": {
      "id": "ismail",
      "name": "Prophet Ismail"
    },
    "headerVisual": {
      "iconSymbol": "🕋",
      "gradientFrom": "#1c3328",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا",
      "subtitle": "The Smasher of Idols, The Cooled Fire, and The Architect of the Ka'bah"
    },
    "whoIsIntro": "Prophet Ibrahim (peace be upon him) stands as the supreme patriarch of monotheism, revered across the Abrahamic traditions. Blessed with a pure heart (Qalb Saleem), he used rigorous philosophical inquiry to dismantle the star-worship of Babylon, walked unscathed from Nimrod's inferno, and laid the foundations of the Holy Sanctuary in Makkah.",
    "quranEvidence": [
      {
        "surahNumber": 4,
        "verseNumber": 125,
        "surahName": "An-Nisa",
        "arabic": "وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا",
        "transliteration": "Wattakhadhallahu Ibraheema khaleela",
        "translation": "And Allah took Ibrahim as an intimate friend.",
        "citation": "Quran 4:125"
      },
      {
        "surahNumber": 2,
        "verseNumber": 127,
        "surahName": "Al-Baqarah",
        "arabic": "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        "transliteration": "Wa-idh yarfa'u Ibraheemul-qawa'ida minal-bayti wa-Isma'ilu rabbana taqabbal minna, innaka antas-Samee'ul-'Aleem",
        "translation": "And remember when Ibrahim was raising the foundations of the House with Ismail, praying: \"Our Lord, accept this from us. Indeed You are the Hearing, the Knowing.\"",
        "citation": "Quran 2:127"
      }
    ],
    "narrativeSections": [
      {
        "id": "ibrahim-celestial",
        "title": "Rational Inquiry and the Idols of Babylon",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Born into a society obsessed with astrology and stone idols—where even his own father Azar sculpted statues—young Ibrahim looked to the skies with an unfettered intellect.",
          "Upon observing a shining star, he mused: \"This is my lord?\" But when it set, he said: \"I love not those that vanish.\" He repeated the test with the radiant moon and the fiery sun, concluding: \"Indeed, I have turned my face toward Him who originated the heavens and the earth, truly and purely.\""
        ]
      },
      {
        "id": "ibrahim-fire",
        "title": "The Shattered Temple and Nimrod's Fire",
        "timestamp": "3:30",
        "timestampSeconds": 210,
        "content": [
          "During a festival when the town was empty, Ibrahim entered the idol pantheon and shattered every statue except the largest, hanging his axe on its neck. When questioned, he retorted: \"Ask them, if they can speak!\"",
          "Enraged by their exposed absurdity, king Nimrod ordered a massive pyre built. Ibrahim was catapulted into the flames, uttering: \"Hasbunallahu wa ni'mal wakeel\" (Allah is sufficient for us, and He is the best Disposer of affairs). Allah commanded: \"O fire, be cool and peaceful for Ibrahim!\""
        ]
      },
      {
        "id": "ibrahim-makkah",
        "title": "The Valley of Bakkah and The Call to Hajj",
        "timestamp": "6:15",
        "timestampSeconds": 375,
        "content": [
          "Guided by divine wisdom, Ibrahim brought his wife Hajar and infant son Ismail to the barren valley of Makkah. When Hajar asked if Allah had commanded this, Ibrahim nodded, and she replied with faith: \"Then He will never neglect us.\"",
          "Years later, father and son rebuilt the foundations of the Ka'bah, instituting the sacred rites of Tawaf, Sa'i, and the universal call to pilgrimage that millions answer each year."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Our Lord, make us submissive to You and from our descendants a nation submissive to You, and show us our rites and accept our repentance.",
        "speaker": "Prophet Ibrahim",
        "context": "His prayer while laying the stones of the Ka'bah with Ismail (Quran 2:128)"
      }
    ],
    "teachingsAndLessons": [
      "Pure faith harmonizes with sincere reason and rational observation of the universe.",
      "Trusting in Allah (Tawakkul) in the face of insurmountable trials transforms hardship into peace.",
      "Sincerity in modest deeds can echo through thousands of years of human worship."
    ],
    "audioNarration": {
      "duration": "9:30",
      "durationSeconds": 570,
      "tracks": [
        {
          "id": "ibrahim-tr-1",
          "title": "The Quest for Truth & The Miracle of the Fire",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:00",
          "durationSeconds": 300
        },
        {
          "id": "ibrahim-tr-2",
          "title": "The House of Allah & The Living Legacy",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "4:30",
          "durationSeconds": 270
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "ibrahim-celestial",
          "title": "The Celestial Inquiry",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "ibrahim-fire",
          "title": "The Cool Fire",
          "timestamp": "3:30",
          "timestampSeconds": 210
        },
        {
          "sectionId": "ibrahim-makkah",
          "title": "The Ka'bah & Hajj",
          "timestamp": "6:15",
          "timestampSeconds": 375
        }
      ]
    }
  },
  {
    "id": "ismail",
    "name": "Prophet Ismail",
    "arabicName": "إِسْمَاعِيل",
    "honorific": "عليه السلام",
    "titleBadge": "The Truthful to His Promise & The Ransomed Sacrifice",
    "meaning": "God has Heard (Yashma' El)",
    "biblicalEquivalent": "Ishmael",
    "eraAndLocation": "Makkah (Hijaz, Western Arabia)",
    "predecessor": {
      "id": "ibrahim",
      "name": "Prophet Ibrahim"
    },
    "successor": {
      "id": "yusuf",
      "name": "Prophet Yusuf"
    },
    "headerVisual": {
      "iconSymbol": "💧",
      "gradientFrom": "#153138",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَكَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَّبِيًّا",
      "subtitle": "The Miracle of Zamzam, The Supreme Test of Surrender, and The Lineage of the Final Messenger"
    },
    "whoIsIntro": "Prophet Ismail (peace be upon him) represents the pinnacle of filial obedience and submission to the divine will. As an infant, his feet struck the ground to release the eternal spring of Zamzam; as a youth, he cheerfully yielded to his father's vision of sacrifice, inspiring the enduring celebration of Eid al-Adha.",
    "quranEvidence": [
      {
        "surahNumber": 19,
        "verseNumber": 54,
        "surahName": "Maryam",
        "arabic": "وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَّبِيًّا",
        "transliteration": "Wadhkur fil-kitabi Isma'eel, innahu kana sadiqal-wa'di wa-kana rasūlan nabiyya",
        "translation": "And mention in the Book, Ismail. Indeed, he was true to his promise, and he was a messenger and a prophet.",
        "citation": "Quran 19:54"
      },
      {
        "surahNumber": 37,
        "verseNumber": 102,
        "surahName": "As-Saffat",
        "arabic": "قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ",
        "transliteration": "Qala ya abatif'al ma tu'mar, satajidunee in sha'allahu minas-sabireen",
        "translation": "He said: \"O my father, do as you are commanded. You will find me, if Allah wills, among the steadfast.\"",
        "citation": "Quran 37:102"
      }
    ],
    "narrativeSections": [
      {
        "id": "ismail-zamzam",
        "title": "The Parched Desert and The Eternal Spring of Zamzam",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Left as an infant with his mother Hajar in an uncultivated valley, water soon ran out. Hajar ran anxiously seven times between the mounds of Safa and Marwah seeking travelers or water.",
          "At that moment, the Angel Jibril struck the earth, and pure fresh water surged forth. Hajar contained it crying \"Zam-zam!\" (gather, gather), establishing the historic settlement around which Arab tribes gathered."
        ]
      },
      {
        "id": "ismail-sacrifice",
        "title": "The Vision of Sacrifice and The Heavenly Ransom",
        "timestamp": "3:00",
        "timestampSeconds": 180,
        "content": [
          "When Ismail reached the age of walking and assisting his father, Ibrahim saw in true prophetic dreams that he was sacrificing his son. Rather than forcing him, Ibrahim consulted the boy.",
          "Ismail responded with sublime serenity: \"O my father, do as you are commanded; you will find me, if Allah wills, of the patient.\" Both yielded their hearts to God, and at the decisive moment, Allah ransomed him with a noble ram from Paradise."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "O my father, do as you are commanded. You will find me, if Allah wills, of the patient.",
        "speaker": "Prophet Ismail",
        "context": "Consoling his father prior to the supreme trial of sacrifice (Quran 37:102)"
      }
    ],
    "teachingsAndLessons": [
      "True love of God means placing His commands above our most treasured attachments.",
      "Sincere youth who honor their parents receive divine praise and immortal honor."
    ],
    "audioNarration": {
      "duration": "6:30",
      "durationSeconds": 390,
      "tracks": [
        {
          "id": "ismail-tr-1",
          "title": "Zamzam & The Ultimate Test of Faith",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "6:30",
          "durationSeconds": 390
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "ismail-zamzam",
          "title": "The Gushing Spring",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "ismail-sacrifice",
          "title": "The Willing Ransom",
          "timestamp": "3:00",
          "timestampSeconds": 180
        }
      ]
    }
  },
  {
    "id": "yusuf",
    "name": "Prophet Yusuf",
    "arabicName": "يُوسُف",
    "honorific": "عليه السلام",
    "titleBadge": "As-Siddiq (The Man of Truth) & Ahsan al-Qasas",
    "meaning": "God Will Increase / May He Add",
    "biblicalEquivalent": "Joseph",
    "eraAndLocation": "Canaan & The Royal Court of Egypt",
    "predecessor": {
      "id": "ismail",
      "name": "Prophet Ismail"
    },
    "successor": {
      "id": "ayyub",
      "name": "Prophet Ayyub"
    },
    "headerVisual": {
      "iconSymbol": "👑",
      "gradientFrom": "#1c2838",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
      "subtitle": "From the Bottom of the Well to the Throne of Egypt: A Masterclass in Beautiful Patience"
    },
    "whoIsIntro": "The story of Prophet Yusuf (peace be upon him) is celebrated by the Quran itself as \"Ahsan al-Qasas\" (The Best of Stories). Thrown into a dark well by jealous brothers, sold into slavery, falsely imprisoned for his chastity, and finally elevated as Treasurer of Egypt, his life demonstrates how divine providence weaves hardship into triumph.",
    "quranEvidence": [
      {
        "surahNumber": 12,
        "verseNumber": 90,
        "surahName": "Yusuf",
        "arabic": "إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
        "transliteration": "Innahu man yattaqi wa-yasbir fa-innallaha la yudee'u ajral-muhsineen",
        "translation": "Indeed, he who fears Allah and is patient—then indeed, Allah does not allow the reward of those who do good to be lost.",
        "citation": "Quran 12:90"
      },
      {
        "surahNumber": 12,
        "verseNumber": 101,
        "surahName": "Yusuf",
        "arabic": "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        "transliteration": "Tawaffanee musliman wa-alhiqnee bis-saliheen",
        "translation": "Cause me to die a Muslim and join me with the righteous.",
        "citation": "Quran 12:101"
      }
    ],
    "narrativeSections": [
      {
        "id": "yusuf-well",
        "title": "The Dream of Eleven Stars and The Dark Cistern",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "As a young boy in Canaan, Yusuf saw eleven stars, the sun, and the moon prostrating to him. His father Ya'qub (Jacob) recognized the spiritual gift and advised caution against sibling jealousy.",
          "Consumed by envy, his ten older brothers cast him into a deserted well and carried his shirt stained with fake blood to their weeping father, who took refuge in \"Sabrun Jameel\" (patience most beautiful)."
        ]
      },
      {
        "id": "yusuf-chastity",
        "title": "Honor in the Palace and Dignity in Prison",
        "timestamp": "3:30",
        "timestampSeconds": 210,
        "content": [
          "Purchased by the Aziz of Egypt, Yusuf grew into a young man of extraordinary integrity and beauty. When the governor's wife attempted to seduce him, Yusuf fled to the door, praying: \"My Lord, prison is more beloved to me than that to which they invite me.\"",
          "Imprisoned unjustly for years, he never allowed despair to taint his character, interpreting dreams for inmates and teaching them pure monotheism."
        ]
      },
      {
        "id": "yusuf-elevation",
        "title": "The King's Dream and The Throne of Mercy",
        "timestamp": "6:15",
        "timestampSeconds": 375,
        "content": [
          "When the King of Egypt was baffled by dreams of seven lean cows devouring seven fat ones, Yusuf was summoned. He outlined a 14-year agricultural economic plan to save the region from famine.",
          "Vindicated and appointed Minister of the Treasury, he later welcomed his destitute brothers without malice or bitterness: \"No reproach upon you today; may Allah forgive you.\""
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful.",
        "speaker": "Prophet Yusuf",
        "context": "Pardoning his brothers who had thrown him into the well (Quran 12:92)"
      }
    ],
    "teachingsAndLessons": [
      "Patience (Sabr) coupled with moral consciousness (Taqwa) guarantees eventual spiritual triumph.",
      "Forgiving from a position of absolute power reflects the highest prophetic nobility.",
      "Allah is subtly at work behind every closed door, turning apparent betrayal into divine elevation."
    ],
    "audioNarration": {
      "duration": "9:45",
      "durationSeconds": 585,
      "tracks": [
        {
          "id": "yusuf-tr-1",
          "title": "The Well & The Palace of Temptation",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:00",
          "durationSeconds": 300
        },
        {
          "id": "yusuf-tr-2",
          "title": "The Prison, The Harvest, & The Royal Pardon",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "4:45",
          "durationSeconds": 285
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "yusuf-well",
          "title": "The Well of Canaan",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "yusuf-chastity",
          "title": "Chastity & Prison",
          "timestamp": "3:30",
          "timestampSeconds": 210
        },
        {
          "sectionId": "yusuf-elevation",
          "title": "The Royal Reconciliation",
          "timestamp": "6:15",
          "timestampSeconds": 375
        }
      ]
    }
  },
  {
    "id": "ayyub",
    "name": "Prophet Ayyub",
    "arabicName": "أَيُّوب",
    "honorific": "عليه السلام",
    "titleBadge": "The Paragon of Enduring Patience (Sabr)",
    "meaning": "The Returning One / The Penitent in Suffering",
    "biblicalEquivalent": "Job",
    "eraAndLocation": "The Hawran Region (Southern Syria / Jordan)",
    "predecessor": {
      "id": "yusuf",
      "name": "Prophet Yusuf"
    },
    "successor": {
      "id": "shuaib",
      "name": "Prophet Shu'ayb"
    },
    "headerVisual": {
      "iconSymbol": "🌿",
      "gradientFrom": "#1f382a",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ",
      "subtitle": "Eighteen Years of Affliction, An Unbroken Heart of Gratitude, and The Healing Spring"
    },
    "whoIsIntro": "Prophet Ayyub (peace be upon him) is remembered across generations as the archetype of monumental endurance. Blessed with wealth, healthy children, and land, he lost everything in succession, followed by debilitating illness. Through every wave of pain, his tongue never ceased to praise his Creator.",
    "quranEvidence": [
      {
        "surahNumber": 21,
        "verseNumber": 83,
        "surahName": "Al-Anbiya",
        "arabic": "وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
        "transliteration": "Wa-Ayyūba idh nada rabbahu annee massaniyad-durru wa-anta arhamur-rahimeen",
        "translation": "And remember Ayyub, when he called to his Lord: \"Adversity has touched me, and You are the Most Merciful of the merciful.\"",
        "citation": "Quran 21:83"
      },
      {
        "surahNumber": 38,
        "verseNumber": 44,
        "surahName": "Sad",
        "arabic": "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ",
        "transliteration": "Inna wajadnahu sabira, ni'mal-'abd, innahu awwab",
        "translation": "Indeed, We found him patient—an excellent servant! Indeed, he was one repeatedly turning back to Allah.",
        "citation": "Quran 38:44"
      }
    ],
    "narrativeSections": [
      {
        "id": "ayyub-trials",
        "title": "The Vanishing of Fortune and The Onset of Pain",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Ayyub was a wealthy landowner with vast herds, a loving family, and deep piety. In a series of trials, his wealth dissolved, his children passed away, and a severe illness seized his physical strength.",
          "When his faithful wife Rahma suggested he pray immediately for healing, he replied humbly: \"Allah granted me health for eighty years; should I not bear affliction for His sake for a few years?\""
        ]
      },
      {
        "id": "ayyub-healing",
        "title": "The Wholesome Spring and The Restoration of Double",
        "timestamp": "3:15",
        "timestampSeconds": 195,
        "content": [
          "After years of affliction, Ayyub called upon Allah without a whisper of complaint, merely saying: \"Adversity has touched me, and You are the Most Merciful of the merciful.\"",
          "Allah commanded him: \"Strike [the ground] with your foot; this is a cool bath and a drink.\" The cool water healed him internally and externally, and Allah restored to him his family and doubled his blessings."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Adversity has touched me, and You are the Most Merciful of the merciful.",
        "speaker": "Prophet Ayyub",
        "context": "His gentle and dignified supplication for relief (Quran 21:83)"
      }
    ],
    "teachingsAndLessons": [
      "Affliction is not a sign of divine anger; it is often the kiln in which spiritual gold is refined.",
      "Courteous prayer never accuses God; it simply invokes His infinite compassion."
    ],
    "audioNarration": {
      "duration": "6:15",
      "durationSeconds": 375,
      "tracks": [
        {
          "id": "ayyub-tr-1",
          "title": "The Kiln of Patience & The Healing Spring",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "6:15",
          "durationSeconds": 375
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "ayyub-trials",
          "title": "The Severe Trials",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "ayyub-healing",
          "title": "The Cool Spring",
          "timestamp": "3:15",
          "timestampSeconds": 195
        }
      ]
    }
  },
  {
    "id": "shuaib",
    "name": "Prophet Shu'ayb",
    "arabicName": "شُعَيْب",
    "honorific": "عليه السلام",
    "titleBadge": "Khatib al-Anbiya (The Orator of the Prophets)",
    "meaning": "Who Guides or Points the Way to Rightness",
    "biblicalEquivalent": "Jethro",
    "eraAndLocation": "Madyan (The Gulf of Aqaba & Northwest Hejaz)",
    "predecessor": {
      "id": "ayyub",
      "name": "Prophet Ayyub"
    },
    "successor": {
      "id": "musa",
      "name": "Prophet Musa (Moses)"
    },
    "headerVisual": {
      "iconSymbol": "⚖️",
      "gradientFrom": "#302613",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "أَوْفُوا الْكَيْلَ وَالْمِيزَانَ بِالْقِسْطِ",
      "subtitle": "Economic Justice, Truthful Balances, and The Oratory of Ethical Reform"
    },
    "whoIsIntro": "Prophet Shu'ayb (peace be upon him), known in classical commentary as Khatib al-Anbiya for his eloquence and persuasive rhetoric, was sent to the people of Madyan and Ashab al-Aykah. They dominated caravan trade routes, notorious for defrauding buyers with deceptive scales and extorting tolls from travelers.",
    "quranEvidence": [
      {
        "surahNumber": 11,
        "verseNumber": 84,
        "surahName": "Hud",
        "arabic": "وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۚ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ وَلَا تَنقُصُوا الْمِكْيَالَ وَالْمِيزَانَ",
        "transliteration": "Wa-ila Madyana akhāhum Shu'ayba, qala ya qawmi'budullaha ma lakum min ilahin ghayruh, wa-la tanqusul-mikyala wal-meezan",
        "translation": "And to Madyan We sent their brother Shu'ayb. He said: \"O my people, worship Allah; you have no deity other than Him. And do not decrease from the measure and the scale.\"",
        "citation": "Quran 11:84"
      },
      {
        "surahNumber": 11,
        "verseNumber": 88,
        "surahName": "Hud",
        "arabic": "إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
        "transliteration": "In ureedu illal-islaha mastata'tu, wa-ma tawfeeqi illa billah",
        "translation": "I only intend reform to the best of my ability. And my success is not but through Allah.",
        "citation": "Quran 11:88"
      }
    ],
    "narrativeSections": [
      {
        "id": "shuaib-marketplace",
        "title": "Marketplace Fraud and The Preach of Fair Trade",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "The merchants of Madyan had grown immensely wealthy by cheating in weights and measures. When Shu'ayb urged honest scales, the merchants mocked: \"Does your prayer command that we abandon what our fathers worshiped, or that we not do with our wealth whatever we please?\"",
          "Shu'ayb countered with profound clarity: true faith is inextricably linked with honest economics and ethical dealings."
        ]
      },
      {
        "id": "shuaib-verdict",
        "title": "The Reformer's Credo and The Earthquake of Madyan",
        "timestamp": "2:50",
        "timestampSeconds": 170,
        "content": [
          "Faced with threats of banishment, Shu'ayb articulated the universal motto of righteous activism: \"I intend only reform to the extent of my ability; my success rests solely with Allah.\"",
          "When they hardened in defiance, a catastrophic tremor struck Madyan, leaving the deceitful traders buried under their collapsed estates."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "I only intend reform to the best of my ability. And my success is not but through Allah. Upon Him I have relied, and to Him I return.",
        "speaker": "Prophet Shu'ayb",
        "context": "Defining the purpose of his prophetic mission (Quran 11:88)"
      }
    ],
    "teachingsAndLessons": [
      "Worship is meaningless if economic transactions are predatory or fraudulent.",
      "Sincere reform must be motivated by compassion for society rather than personal ambition."
    ],
    "audioNarration": {
      "duration": "5:45",
      "durationSeconds": 345,
      "tracks": [
        {
          "id": "shuaib-tr-1",
          "title": "The Honest Scales & The Orator of Truth",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:45",
          "durationSeconds": 345
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "shuaib-marketplace",
          "title": "Marketplace Justice",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "shuaib-verdict",
          "title": "The Reformer's Credo",
          "timestamp": "2:50",
          "timestampSeconds": 170
        }
      ]
    }
  },
  {
    "id": "musa",
    "name": "Prophet Musa",
    "arabicName": "مُوسَى",
    "honorific": "عليه السلام",
    "titleBadge": "Kalimullah (The One Who Spoke to God) & The Deliverer",
    "meaning": "Drawn from Water (Mu = Water, Sa = Tree/Reed)",
    "biblicalEquivalent": "Moses",
    "eraAndLocation": "Ancient Egypt (Nile Delta) & Mount Sinai",
    "predecessor": {
      "id": "shuaib",
      "name": "Prophet Shu'ayb"
    },
    "successor": {
      "id": "dawud",
      "name": "Prophet Dawud (David)"
    },
    "headerVisual": {
      "iconSymbol": "⚡",
      "gradientFrom": "#153138",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا",
      "subtitle": "The River Basket, The Burning Bush of Tur, The Staff, and The Parting of the Red Sea"
    },
    "whoIsIntro": "Prophet Musa (peace be upon him) is the most frequently mentioned prophet in the Holy Quran, with his epic life detailed across dozens of chapters. From his infancy in a reed basket upon the Nile to his direct discourse with Allah at Mount Sinai and the dramatic exodus across the parted sea, his story is an immortal testament to the triumph of truth over tyranny.",
    "quranEvidence": [
      {
        "surahNumber": 4,
        "verseNumber": 164,
        "surahName": "An-Nisa",
        "arabic": "وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا",
        "transliteration": "Wa-kallamallahu Mūsa takleema",
        "translation": "And Allah spoke to Musa with direct speech.",
        "citation": "Quran 4:164"
      },
      {
        "surahNumber": 26,
        "verseNumber": 62,
        "surahName": "Ash-Shu'ara",
        "arabic": "قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ",
        "transliteration": "Qala kalla, inna ma'iya rabbee sayahdeen",
        "translation": "He said: \"No! Indeed, with me is my Lord; He will guide me.\"",
        "citation": "Quran 26:62"
      }
    ],
    "narrativeSections": [
      {
        "id": "musa-nile",
        "title": "The Decree of Pharaoh and The Floating Ark of Rushes",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Pharaoh decreed the slaughter of all newborn Israelite boys to preserve his throne. Inspired by Allah, Musa's mother placed him in a waterproof basket upon the waters of the Nile.",
          "Carried into the palace grounds, Pharaoh's wife Asiya looked upon the child with profound maternal tenderness, pleading: \"He is a comfort of the eye for me and for you; do not kill him.\""
        ]
      },
      {
        "id": "musa-sinai",
        "title": "The Sacred Valley of Tuwa and The Divine Commission",
        "timestamp": "3:45",
        "timestampSeconds": 225,
        "content": [
          "Fleeing to Madyan after defending an oppressed man, Musa spent a decade working under Prophet Shu'ayb. On his journey home in the cold night, he spotted a glowing fire upon Mount Sinai.",
          "Upon approaching, a majestic voice called out: \"O Musa, indeed I am Allah, Lord of the worlds!\" Armed with the miracles of his transforming staff and radiant hand, he was sent to confront Pharaoh with his brother Harun (Aaron)."
        ]
      },
      {
        "id": "musa-sea",
        "title": "The Trapped Multitude and The Parting of the Red Sea",
        "timestamp": "6:50",
        "timestampSeconds": 410,
        "content": [
          "With Pharaoh's war chariots closing behind and the churning Red Sea ahead, the terrified Israelites cried: \"Indeed, we are overtaken!\"",
          "Musa stood immovable in faith: \"No! Indeed, with me is my Lord; He will guide me.\" Striking the sea with his staff, the waters cleaved apart into towering liquid walls, creating dry pathways for the believers while the pursuing tyrants were submerged."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue that they may understand my speech.",
        "speaker": "Prophet Musa",
        "context": "His prayer before confronting Pharaoh (Quran 20:25-28)"
      }
    ],
    "teachingsAndLessons": [
      "Tyranny may appear invincible, but its arrogance seeds its own inevitable demise.",
      "Trust in Allah turns hopeless dead-ends into miraculously cleared roads of salvation."
    ],
    "audioNarration": {
      "duration": "10:15",
      "durationSeconds": 615,
      "tracks": [
        {
          "id": "musa-tr-1",
          "title": "The Nile Basket & The Voice at Sinai",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:15",
          "durationSeconds": 315
        },
        {
          "id": "musa-tr-2",
          "title": "Pharaoh's Magicians & The Cleaved Sea",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:00",
          "durationSeconds": 300
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "musa-nile",
          "title": "The Nile Child",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "musa-sinai",
          "title": "Mount Sinai Calling",
          "timestamp": "3:45",
          "timestampSeconds": 225
        },
        {
          "sectionId": "musa-sea",
          "title": "Parting the Waters",
          "timestamp": "6:50",
          "timestampSeconds": 410
        }
      ]
    }
  },
  {
    "id": "dawud",
    "name": "Prophet Dawud",
    "arabicName": "دَاوُد",
    "honorific": "عليه السلام",
    "titleBadge": "The King-Prophet of Zabur (Psalms) & Softener of Iron",
    "meaning": "Beloved of God",
    "biblicalEquivalent": "David",
    "eraAndLocation": "Jerusalem (Palestine) & Kingdom of Israel",
    "predecessor": {
      "id": "musa",
      "name": "Prophet Musa"
    },
    "successor": {
      "id": "sulayman",
      "name": "Prophet Sulayman (Solomon)"
    },
    "headerVisual": {
      "iconSymbol": "🛡️",
      "gradientFrom": "#242b16",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَآتَيْنَا دَاوُودَ زَبُورًا",
      "subtitle": "The Slaying of Jalut (Goliath), The Softened Iron, and Psalms echoing with the Mountains"
    },
    "whoIsIntro": "Prophet Dawud (peace be upon him) combined supreme worldly leadership with sublime ascetic devotion. As a young shepherd, he felled the giant tyrant Jalut (Goliath); as a ruler, he established justice, softened iron with his bare hands to craft chainmail armor, and recited the Zabur (Psalms) in voices that compelled birds and mountains to join in chorus.",
    "quranEvidence": [
      {
        "surahNumber": 17,
        "verseNumber": 55,
        "surahName": "Al-Isra",
        "arabic": "وَآتَيْنَا دَاوُودَ زَبُورًا",
        "transliteration": "Wa-atayna Dawūda Zabūra",
        "translation": "And to Dawud We gave the Zabur (Psalms).",
        "citation": "Quran 17:55"
      },
      {
        "surahNumber": 34,
        "verseNumber": 10,
        "surahName": "Saba",
        "arabic": "يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ",
        "transliteration": "Ya jibalu awwibee ma'ahu wat-tayra, wa-alanna lahul-hadeed",
        "translation": "O mountains, echo with him in praise, and birds as well! And We softened for him iron.",
        "citation": "Quran 34:10"
      }
    ],
    "narrativeSections": [
      {
        "id": "dawud-goliath",
        "title": "The Sling of the Shepherd and the Fall of Jalut",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Under the leadership of King Talut (Saul), a small band of believers marched against the fearsome army of Jalut (Goliath). While many trembled at Jalut's armor, young Dawud stepped forward with pure faith.",
          "With a simple sling and stones, Dawud brought down the armored tyrant, turning the tide of history and ushering in a golden era of justice."
        ]
      },
      {
        "id": "dawud-worship",
        "title": "The Melodies of Zabur and the Bread of One's Own Hands",
        "timestamp": "3:10",
        "timestampSeconds": 190,
        "content": [
          "Despite reigning over an empire, Dawud fasted on alternate days and slept half the night, rising to pray for a third and sleeping for a sixth—the most beloved fasting and prayer to Allah.",
          "Refusing to live off the public treasury, Allah softened iron for him, enabling him to forge linked chainmail armor to earn his daily bread with his own hands."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "The most beloved prayer to Allah is the prayer of Dawud, and the most beloved fast to Allah is the fast of Dawud.",
        "speaker": "Prophet Muhammad ﷺ",
        "context": "Sahih al-Bukhari, describing Dawud's balanced nocturnal worship"
      }
    ],
    "teachingsAndLessons": [
      "Power and authority must always be anchored in humility, night worship, and personal integrity.",
      "Earning one's sustenance through honest craftsmanship is an honorable prophetic sunnah."
    ],
    "audioNarration": {
      "duration": "6:30",
      "durationSeconds": 390,
      "tracks": [
        {
          "id": "dawud-tr-1",
          "title": "The Psalms of Praise & The Iron Sovereign",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "6:30",
          "durationSeconds": 390
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "dawud-goliath",
          "title": "Felling the Giant",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "dawud-worship",
          "title": "The Psalms & Iron",
          "timestamp": "3:10",
          "timestampSeconds": 190
        }
      ]
    }
  },
  {
    "id": "sulayman",
    "name": "Prophet Sulayman",
    "arabicName": "سُلَيْمَان",
    "honorific": "عليه السلام",
    "titleBadge": "The Sovereign of Winds, Jinn, and Birds",
    "meaning": "Man of Peace / Wholeness",
    "biblicalEquivalent": "Solomon",
    "eraAndLocation": "Jerusalem (Palestine) & Kingdom of Sheba (Yemen)",
    "predecessor": {
      "id": "dawud",
      "name": "Prophet Dawud"
    },
    "successor": {
      "id": "yunus",
      "name": "Prophet Yunus (Jonah)"
    },
    "headerVisual": {
      "iconSymbol": "🦅",
      "gradientFrom": "#1c2e38",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي",
      "subtitle": "The Language of the Ant, The Hoopoe Messenger, and The Palace of Glass"
    },
    "whoIsIntro": "Prophet Sulayman (peace be upon him) inherited the prophetic throne of his father Dawud and was granted an empire unprecedented in human history. Gifted with the speech of birds and beasts, command over the winds, and obedience of the jinn, he used this vast authority not for indulgence, but to invite kingdoms—such as Queen Bilqis of Sheba—to monotheism.",
    "quranEvidence": [
      {
        "surahNumber": 38,
        "verseNumber": 35,
        "surahName": "Sad",
        "arabic": "قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ",
        "transliteration": "Qala rabbighfir lee wa-hab lee mulkan la yanbaghee li-ahadin min ba'dee, innaka antal-Wahhab",
        "translation": "He said: \"My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower.\"",
        "citation": "Quran 38:35"
      },
      {
        "surahNumber": 27,
        "verseNumber": 19,
        "surahName": "An-Naml",
        "arabic": "فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ",
        "transliteration": "Fa-tabassama dahikan min qawliha wa-qala rabbi awzi'nee an ashkura ni'matakallatee an'amta 'alayya wa-'ala walidayya",
        "translation": "So he smiled, laughing at her words, and prayed: \"My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.\"",
        "citation": "Quran 27:19"
      }
    ],
    "narrativeSections": [
      {
        "id": "sulayman-ant",
        "title": "The Valley of the Ants and The Compassion of a King",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Marching with his legions of men, jinn, and birds, Sulayman overheard a tiny ant cautioning its colony: \"O ants, enter your dwellings lest Sulayman and his soldiers crush you without noticing.\"",
          "Sulayman smiled with joy and bowed in gratitude, asking Allah for the mindfulness to continually thank Him for His favors."
        ]
      },
      {
        "id": "sulayman-sheba",
        "title": "The Hoopoe, Queen Bilqis, and The Mirrored Floor",
        "timestamp": "3:30",
        "timestampSeconds": 210,
        "content": [
          "The hoopoe bird reported news of the sun-worshiping kingdom of Sheba ruled by Queen Bilqis. Sulayman sent a diplomatic missive beginning: \"In the name of Allah, the Compassionate, the Merciful...\"",
          "Arriving at his court paved with crystal over flowing waters, Bilqis lifted her skirt thinking it was a pool. Recognizing the transcendent majesty of God beyond worldly riches, she declared: \"My Lord, indeed I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds.\""
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteous deeds that please You.",
        "speaker": "Prophet Sulayman",
        "context": "His prayer upon overhearing the tiny ant in the valley (Quran 27:19)"
      }
    ],
    "teachingsAndLessons": [
      "Unsurpassed wealth and power are righteous when subordinated entirely to the service of God.",
      "No creature is too small to deserve royal compassion and consideration."
    ],
    "audioNarration": {
      "duration": "7:15",
      "durationSeconds": 435,
      "tracks": [
        {
          "id": "sulayman-tr-1",
          "title": "The Wisdom of Solomon & The Queen of Sheba",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "7:15",
          "durationSeconds": 435
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "sulayman-ant",
          "title": "The Ant Colony",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "sulayman-sheba",
          "title": "The Queen of Sheba",
          "timestamp": "3:30",
          "timestampSeconds": 210
        }
      ]
    }
  },
  {
    "id": "yunus",
    "name": "Prophet Yunus",
    "arabicName": "يُونُس",
    "honorific": "عليه السلام",
    "titleBadge": "Dhun-Nun (The One of the Whale) & The Model of Repentance",
    "meaning": "Dove / Peace Messenger",
    "biblicalEquivalent": "Jonah",
    "eraAndLocation": "Nineveh (Mosul, Northern Iraq)",
    "predecessor": {
      "id": "sulayman",
      "name": "Prophet Sulayman"
    },
    "successor": {
      "id": "zakariyya",
      "name": "Prophet Zakariyya"
    },
    "headerVisual": {
      "iconSymbol": "🐋",
      "gradientFrom": "#0f2c38",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
      "subtitle": "The Ship in the Tempest, The Belly of the Great Fish, and The Triple Darkness"
    },
    "whoIsIntro": "Prophet Yunus (peace be upon him) was sent to the metropolis of Nineveh. When his people persisted in disbelief, he departed in frustration before receiving explicit divine permission. Swallowed by a great marine creature in the tempestuous sea, his prayer from the depths of the ocean remains the supreme formula for relief from despair.",
    "quranEvidence": [
      {
        "surahNumber": 21,
        "verseNumber": 87,
        "surahName": "Al-Anbiya",
        "arabic": "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        "transliteration": "La ilaha illa anta subhanaka innee kuntu minaz-zalimeen",
        "translation": "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        "citation": "Quran 21:87"
      },
      {
        "surahNumber": 37,
        "verseNumber": 143,
        "surahName": "As-Saffat",
        "arabic": "فَلَوْلَا أَنَّهُ كَانَ مِنَ الْمُسَبِّحِينَ لَلَبِثَ فِي بَطْنِهِ إِلَىٰ يَوْمِ يُبْعَثُونَ",
        "transliteration": "Fa-lawla annahu kana minal-musabbiheen, lalabitha fee batnihi ila yawmi yub'athūn",
        "translation": "And had he not been of those who glorify Allah, he would have remained inside its belly until the Day of Resurrection.",
        "citation": "Quran 37:143-144"
      }
    ],
    "narrativeSections": [
      {
        "id": "yunus-storm",
        "title": "The Cast Lots and The Churning Sea",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Exasperated by Nineveh's stubbornness, Yunus boarded a crowded merchant ship without waiting for divine authorization. In open waters, a violent storm threatened to break the vessel.",
          "The sailors drew lots to determine who was bringing misfortune upon the ship. The lot fell repeatedly upon Yunus, who realized this was his Lord's reckoning, and he plunged courageously into the waves."
        ]
      },
      {
        "id": "yunus-darkness",
        "title": "The Triple Darkness and The Gourd Tree of Recovery",
        "timestamp": "2:50",
        "timestampSeconds": 170,
        "content": [
          "A massive fish swallowed Yunus whole by divine command, keeping him unharmed. Enveloped by the three darknesses—the belly of the beast, the black depths of the ocean, and the night—he cried out the immortal Tasbih.",
          "Allah accepted his contrition, commanding the fish to deposit him on a barren shore. A wild gourd vine shaded his fragile body until he recovered, returning to find over 100,000 citizens of Nineveh having embraced faith."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "No Muslim supplicates with the prayer of Dhun-Nun in any matter, but Allah responds to him.",
        "speaker": "Prophet Muhammad ﷺ",
        "context": "Jami' at-Tirmidhi, endorsing the supplication of Yunus in times of grief"
      }
    ],
    "teachingsAndLessons": [
      "Patience in calling others to good is essential; walking away in anger carries spiritual consequence.",
      "Sincere praise and acknowledgment of one's shortcomings pierces even the darkest depths of despair."
    ],
    "audioNarration": {
      "duration": "5:50",
      "durationSeconds": 350,
      "tracks": [
        {
          "id": "yunus-tr-1",
          "title": "The Depths of the Whale & The Tasbih of Relief",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "5:50",
          "durationSeconds": 350
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "yunus-storm",
          "title": "The Raging Tempest",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "yunus-darkness",
          "title": "The Triple Darkness",
          "timestamp": "2:50",
          "timestampSeconds": 170
        }
      ]
    }
  },
  {
    "id": "zakariyya",
    "name": "Prophet Zakariyya & Yahya",
    "arabicName": "زَكَرِيَّا وَيَحْيَى",
    "honorific": "عليهما السلام",
    "titleBadge": "The Custodians of the Sanctuary & The Chaste Martyr",
    "meaning": "God Remembers (Zakariyya) & He Lives (Yahya)",
    "biblicalEquivalent": "Zechariah & John the Baptist",
    "eraAndLocation": "Jerusalem (Bayt al-Maqdis, Judea)",
    "predecessor": {
      "id": "yunus",
      "name": "Prophet Yunus"
    },
    "successor": {
      "id": "isa",
      "name": "Prophet 'Isa (Jesus)"
    },
    "headerVisual": {
      "iconSymbol": "🕊️",
      "gradientFrom": "#153123",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ",
      "subtitle": "The Secret Prayer in Old Age, The Mihrab of Maryam, and The Herald of Truth"
    },
    "whoIsIntro": "Prophet Zakariyya and his son Prophet Yahya (peace be upon them) were guardians of the sacred temple in Jerusalem. Despite his hair turning white with age and his wife being barren, Zakariyya was inspired by the miraculous provisions given to Maryam to whisper a secret supplication for a righteous heir.",
    "quranEvidence": [
      {
        "surahNumber": 19,
        "verseNumber": 4,
        "surahName": "Maryam",
        "arabic": "قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا",
        "transliteration": "Qala rabbi innee wahanal-'azmu minnee washta'alar-ra'su shayba, wa-lam akun bi-du'a'ika rabbi shaqiyya",
        "translation": "He said: \"My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unblessed.\"",
        "citation": "Quran 19:4"
      },
      {
        "surahNumber": 19,
        "verseNumber": 12,
        "surahName": "Maryam",
        "arabic": "يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا",
        "transliteration": "Ya Yahya khūdhil-kitaba bi-quwwah, wa-ataynahul-hukma sabiyya",
        "translation": "\"O Yahya, take the Scripture with resolve.\" And We gave him judgment while yet a child.",
        "citation": "Quran 19:12"
      }
    ],
    "narrativeSections": [
      {
        "id": "zakariyya-prayer",
        "title": "The Secret Supplication and The Miraculous Mihrab",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Whenever Zakariyya visited his young ward Maryam in the temple sanctuary, he discovered fresh fruits out of season. When she explained that Allah provides without measure, his heart leaped with hope.",
          "Retiring to his private chamber, he whispered the immortal prayer of hope: \"Grant me from Yourself a righteous heir.\" The angels announced glad tidings of Yahya, a prophet of purity and wisdom."
        ]
      },
      {
        "id": "yahya-witness",
        "title": "The Chaste Prophet Who Bore Witness to The Word",
        "timestamp": "3:00",
        "timestampSeconds": 180,
        "content": [
          "Yahya grew up gentle toward animals and humans, never arrogant or rebellious. He called the people back to the purity of the Torah, preparing their hearts for the imminent ministry of his cousin 'Isa (Jesus)."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of prayer.",
        "speaker": "Prophet Zakariyya",
        "context": "Praying in the sanctuary after seeing Maryam's miraculous provisions (Quran 3:38)"
      }
    ],
    "teachingsAndLessons": [
      "No physical barrier—neither old age nor barrenness—can impede the answering of heartfelt prayer.",
      "Sincere mentors rejoice when their students receive spiritual gifts beyond their own."
    ],
    "audioNarration": {
      "duration": "5:45",
      "durationSeconds": 345,
      "tracks": [
        {
          "id": "zakariyya-tr-1",
          "title": "The Whisper of Hope & The Pure Prophet Yahya",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:45",
          "durationSeconds": 345
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "zakariyya-prayer",
          "title": "The Secret Prayer",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "yahya-witness",
          "title": "Prophet Yahya",
          "timestamp": "3:00",
          "timestampSeconds": 180
        }
      ]
    }
  },
  {
    "id": "isa",
    "name": "Prophet 'Isa ibn Maryam",
    "arabicName": "عِيسَى ابْن مَرْيَم",
    "honorific": "عليه السلام",
    "titleBadge": "Al-Masih (The Messiah) & Word from Allah",
    "meaning": "Salvation / The Anointed Traveler",
    "biblicalEquivalent": "Jesus son of Mary",
    "eraAndLocation": "Nazareth, Jerusalem, & Galilee (Palestine)",
    "predecessor": {
      "id": "zakariyya",
      "name": "Prophet Zakariyya & Yahya"
    },
    "successor": {
      "id": "muhammad",
      "name": "Prophet Muhammad ﷺ"
    },
    "headerVisual": {
      "iconSymbol": "✨",
      "gradientFrom": "#15382b",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ",
      "subtitle": "The Miraculous Birth, The Cradle Speech, Healing the Blind, and The Heavenly Table"
    },
    "whoIsIntro": "Prophet 'Isa ibn Maryam (peace be upon him) holds a venerated position in Islamic theology as one of the five Arch-Prophets of Firm Resolve (Ulul-'Azm). Born miraculously without a human father to the Virgin Maryam, he spoke in the cradle, healed lepers, raised the dead by Allah's permission, and heralded the final messenger.",
    "quranEvidence": [
      {
        "surahNumber": 4,
        "verseNumber": 171,
        "surahName": "An-Nisa",
        "arabic": "إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ أَلْقَاهَا إِلَىٰ مَرْيَمَ وَرُوحٌ مِّنْهُ",
        "transliteration": "Innamal-Maseehu 'Isa-bnu Maryama rasūlullahi wa-kalimatuhu alqaha ila Maryama wa-rūhun minh",
        "translation": "The Messiah, Jesus, the son of Mary, was only a messenger of Allah and His word which He directed to Mary and a soul from Him.",
        "citation": "Quran 4:171"
      },
      {
        "surahNumber": 19,
        "verseNumber": 30,
        "surahName": "Maryam",
        "arabic": "قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا",
        "transliteration": "Qala innee 'abdullahi ataniyal-kitaba wa-ja'alanee nabiyya",
        "translation": "He said: \"Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.\"",
        "citation": "Quran 19:30"
      }
    ],
    "narrativeSections": [
      {
        "id": "isa-cradle",
        "title": "The Virgin Birth and The Defense in the Cradle",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Maryam withdrew to a secluded sanctuary where Angel Jibril announced the gift of a pure son created by the divine word \"Kun\" (Be!).",
          "Facing malicious accusations from her community upon returning with the infant, Maryam pointed to the cradle. The baby spoke with miraculous authority: \"Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.\""
        ]
      },
      {
        "id": "isa-miracles",
        "title": "Breathing Life into Clay and Healing by Divine Leave",
        "timestamp": "3:30",
        "timestampSeconds": 210,
        "content": [
          "Throughout his ministry across Palestine, 'Isa was supported by the Holy Spirit (Ruh al-Qudus), molding bird shapes from clay that flew by God's leave, cleansing lepers, and restoring sight to those born blind.",
          "He preached profound detachment from worldly greed and confirmed the coming of the final Prophet: \"Ahmad.\""
        ]
      },
      {
        "id": "isa-ascension",
        "title": "The Heavenly Ascension and The Future Return",
        "timestamp": "6:15",
        "timestampSeconds": 375,
        "content": [
          "When hostile authorities conspired against his life, Allah confounded their plots, raising 'Isa bodily to the heavens in honor.",
          "Islamic tradition confirms he will descend in the end of days as a just ruler, dispelling falsehood and praying alongside the believers."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet, and He has made me blessed wherever I am.",
        "speaker": "Prophet 'Isa (in infancy)",
        "context": "Speaking from the cradle to clear his mother's honor (Quran 19:30-31)"
      }
    ],
    "teachingsAndLessons": [
      "Jesus was an honored prophet and servant of God, embodying ascetic compassion and truth.",
      "Miracles belong entirely to Allah's divine leave (Bi-Idhnillah), pointing to the Creator rather than the creation."
    ],
    "audioNarration": {
      "duration": "8:45",
      "durationSeconds": 525,
      "tracks": [
        {
          "id": "isa-tr-1",
          "title": "The Pure Cradle & The Miracles of Mercy",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "4:45",
          "durationSeconds": 285
        },
        {
          "id": "isa-tr-2",
          "title": "The Heavenly Table & The Ascension",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "4:00",
          "durationSeconds": 240
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "isa-cradle",
          "title": "The Cradle Speech",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "isa-miracles",
          "title": "Miracles of Galilee",
          "timestamp": "3:30",
          "timestampSeconds": 210
        },
        {
          "sectionId": "isa-ascension",
          "title": "The Divine Ascension",
          "timestamp": "6:15",
          "timestampSeconds": 375
        }
      ]
    }
  },
  {
    "id": "muhammad",
    "name": "Prophet Muhammad",
    "arabicName": "مُحَمَّد",
    "honorific": "صلى الله عليه وسلم",
    "titleBadge": "Khatam an-Nabiyyin (The Seal of the Prophets) & Mercy to All Worlds",
    "meaning": "The Praised One / The Commended",
    "biblicalEquivalent": "The Paraclete / Prophet like unto Moses",
    "eraAndLocation": "Makkah & Madinah (Arabian Peninsula, 570 - 632 CE)",
    "predecessor": {
      "id": "isa",
      "name": "Prophet 'Isa"
    },
    "headerVisual": {
      "iconSymbol": "🕌",
      "gradientFrom": "#153123",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
      "subtitle": "The Cave of Hira, The Night of Power, The Migration (Hijrah), and The Farewell Sermon"
    },
    "whoIsIntro": "Prophet Muhammad ﷺ is the final messenger sent by Allah to all of humanity, concluding the noble chain of prophecy. Known prior to his mission as Al-Amin (The Trustworthy), he received the Holy Quran over 23 years, transforming a fractured, warring tribal peninsula into an enduring global civilization anchored in monotheism, justice, and mercy.",
    "quranEvidence": [
      {
        "surahNumber": 21,
        "verseNumber": 107,
        "surahName": "Al-Anbiya",
        "arabic": "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
        "transliteration": "Wa-ma arsalnaka illa rahmatan lil-'alameen",
        "translation": "And We have not sent you except as a mercy to all the worlds.",
        "citation": "Quran 21:107"
      },
      {
        "surahNumber": 33,
        "verseNumber": 40,
        "surahName": "Al-Ahzab",
        "arabic": "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ",
        "transliteration": "Ma kana Muhammadun aba ahadin min rijalikum wa-lakin rasūlallahi wa-khataman-nabiyyeen",
        "translation": "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the prophets.",
        "citation": "Quran 33:40"
      }
    ],
    "narrativeSections": [
      {
        "id": "muhammad-cave",
        "title": "The Light in Cave Hira and The First Revelation",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Deeply troubled by the idol worship and social injustices of pre-Islamic Makkah, Muhammad retreated for contemplation to the mountain cave of Hira.",
          "In the blessed month of Ramadan, Angel Jibril descended with celestial majesty and embraced him: \"Iqra!\" (Read!). When he answered that he could not read, Jibril repeated until the immortal verses descended: \"Read in the name of your Lord who created...\""
        ]
      },
      {
        "id": "muhammad-taif",
        "title": "Steadfastness in Persecution and The Compassion at Ta'if",
        "timestamp": "4:10",
        "timestampSeconds": 250,
        "content": [
          "For thirteen years in Makkah, the early Muslims endured severe boycotts, torture, and ridicule. When the Prophet sought refuge in Ta'if, mobs pelted him with stones until his shoes were filled with blood.",
          "When the angel of the mountains offered to crush the city between two peaks, the Prophet refused: \"Nay, I hope that Allah will bring forth from their descendants those who worship Allah alone.\""
        ]
      },
      {
        "id": "muhammad-madinah",
        "title": "The Hijrah, The Brotherhood, and The Farewell Pilgrimage",
        "timestamp": "7:30",
        "timestampSeconds": 450,
        "content": [
          "Migrating to Madinah in 622 CE, the Prophet drafted the historic Constitution of Madinah, establishing mutual defense and religious freedom for all tribes.",
          "During his Farewell Pilgrimage atop Mount Arafat before over 100,000 companions, he proclaimed the universal charter of human equality: \"An Arab has no superiority over a non-Arab, nor does a non-Arab have superiority over an Arab, except by piety.\""
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "An Arab has no superiority over a non-Arab nor a non-Arab over an Arab; nor does a white person have superiority over a black person nor a black person over a white person, except by piety and good action.",
        "speaker": "Prophet Muhammad ﷺ",
        "context": "The historic Farewell Sermon at Mount Arafat (Musnad Ahmad)"
      }
    ],
    "teachingsAndLessons": [
      "Character and mercy are the authentic proof of faith; the Prophet was described as \"the Quran walking upon earth.\"",
      "Racial, national, and tribal chauvinism are dismantled by the brotherhood of monotheism."
    ],
    "audioNarration": {
      "duration": "11:30",
      "durationSeconds": 690,
      "tracks": [
        {
          "id": "muhammad-tr-1",
          "title": "The Cave of Hira & The Trials of Makkah",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:45",
          "durationSeconds": 345
        },
        {
          "id": "muhammad-tr-2",
          "title": "The City of Light & The Universal Sermon",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:45",
          "durationSeconds": 345
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "muhammad-cave",
          "title": "The Cave of Hira",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "muhammad-taif",
          "title": "The Compassion at Ta'if",
          "timestamp": "4:10",
          "timestampSeconds": 250
        },
        {
          "sectionId": "muhammad-madinah",
          "title": "The Farewell Sermon",
          "timestamp": "7:30",
          "timestampSeconds": 450
        }
      ]
    }
  },
  {
    "id": "maryam",
    "name": "Maryam bint 'Imran",
    "arabicName": "مَرْيَم بِنْت عِمْرَان",
    "honorific": "عليها السلام",
    "titleBadge": "The Chosen Maiden of the Sanctuary & Model of Chaste Purity",
    "meaning": "Devout Servant / Beloved Exalted of God",
    "biblicalEquivalent": "Mary, Mother of Jesus",
    "eraAndLocation": "Nazareth & Bayt al-Maqdis (Jerusalem)",
    "headerVisual": {
      "iconSymbol": "🌸",
      "gradientFrom": "#153128",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَىٰ نِسَاءِ الْعَالَمِينَ",
      "subtitle": "The Dedicated Child, The Date Palm Tree, and The Mother of the Messiah"
    },
    "whoIsIntro": "Maryam bint 'Imran (peace be upon her) is the only woman mentioned by name in the Holy Quran, with an entire chapter (Surah Maryam) named in her honor. Dedicated before birth to the worship of God, she was raised under the spiritual guardianship of Prophet Zakariyya and praised by Allah as chosen above all women of the worlds.",
    "quranEvidence": [
      {
        "surahNumber": 3,
        "verseNumber": 42,
        "surahName": "Ali 'Imran",
        "arabic": "وَإِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَىٰ نِسَاءِ الْعَالَمِينَ",
        "transliteration": "Wa-idh qalatil-mala'ikatu ya Maryamu innallahas-tafaki wa-tahharaki was-tafaki 'ala nisa'il-'alameen",
        "translation": "And remember when the angels said: \"O Maryam, indeed Allah has chosen you and purified you and chosen you above the women of the worlds.\"",
        "citation": "Quran 3:42"
      }
    ],
    "narrativeSections": [
      {
        "id": "maryam-sanctuary",
        "title": "The Mother's Vow and The Sanctuary of Worship",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Before Maryam was born, her mother vowed to dedicate the child in her womb purely to the service of God's sanctuary. Zakariyya became her guardian, building a dedicated prayer chamber where miraculous fruits appeared out of season."
        ]
      },
      {
        "id": "maryam-palm",
        "title": "The Solitary Labor and The Shaken Palm Trunk",
        "timestamp": "2:40",
        "timestampSeconds": 160,
        "content": [
          "In her moments of physical exhaustion and labor pains beneath a date palm tree, she cried: \"Oh, I wish I had died before this and been in oblivion, forgotten!\"",
          "A voice called from beneath her assuring her that her Lord had provided a stream at her feet, telling her to shake the trunk of the palm tree to drop fresh ripe dates, proving that divine support accompanies every faithful struggle."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "How can I have a boy while no man has touched me and I have not been unchaste?",
        "speaker": "Maryam",
        "context": "Inquiring of the Angel Jibril upon the annunciation (Quran 19:20)"
      }
    ],
    "teachingsAndLessons": [
      "Spiritual excellence knows no gender barrier; Maryam is upheld as a universal model for all believers.",
      "Sincere reliance on Allah is complemented by taking practical steps (shaking the palm tree)."
    ],
    "audioNarration": {
      "duration": "5:30",
      "durationSeconds": 330,
      "tracks": [
        {
          "id": "maryam-tr-1",
          "title": "The Sanctuary of Maryam & The Date Palm",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:30",
          "durationSeconds": 330
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "maryam-sanctuary",
          "title": "The Dedicated Child",
          "timestamp": "0:00",
          "timestampSeconds": 0
        },
        {
          "sectionId": "maryam-palm",
          "title": "The Date Palm Miracle",
          "timestamp": "2:40",
          "timestampSeconds": 160
        }
      ]
    }
  },
  {
    "id": "luqman",
    "name": "Luqman the Wise",
    "arabicName": "لُقْمَان الْحَكِيم",
    "honorific": "رحمه الله",
    "titleBadge": "The Sage of Gratitude & Pure Monotheism",
    "meaning": "The Wise Counselor",
    "biblicalEquivalent": "Locman / Sage of Antiquity",
    "eraAndLocation": "Ancient Nubia & Arabia",
    "headerVisual": {
      "iconSymbol": "📖",
      "gradientFrom": "#302613",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ",
      "subtitle": "The Mustard Seed, Humility in Demeanor, and Timeless Advice to a Beloved Son"
    },
    "whoIsIntro": "Luqman was an extraordinarily wise sage honored in Surah Luqman (Chapter 31). Classical scholars note he was an enslaved shepherd from Nubia or Abyssinia whom Allah elevated with supreme wisdom (Hikmah). His intimate paternal advice to his son provides a comprehensive framework for ethical living.",
    "quranEvidence": [
      {
        "surahNumber": 31,
        "verseNumber": 12,
        "surahName": "Luqman",
        "arabic": "وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ",
        "transliteration": "Wa-laqad atayna Luqmanal-hikmata anishkur lillah, wa-man yashkur fa-innama yashkuru li-nafsih",
        "translation": "And We had certainly given Luqman wisdom, [saying]: \"Be grateful to Allah.\" And whoever is grateful is grateful for his own soul.",
        "citation": "Quran 31:12"
      }
    ],
    "narrativeSections": [
      {
        "id": "luqman-counsel",
        "title": "The Mustard Seed and The Etiquette of Walking",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Luqman taught his son that even a deed the size of a mustard seed—hidden inside a rock, or in the heavens, or deep within the earth—will be brought forth by Allah.",
          "He advised him to establish regular prayer, enjoin good, bear with patience whatever befalls him, and walk upon the earth with gentle humility rather than arrogant struts."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "O my son, do not associate anything with Allah. Indeed, association [with Him] is a great injustice.",
        "speaker": "Luqman the Wise",
        "context": "First counsel to his son in Surah Luqman (31:13)"
      }
    ],
    "teachingsAndLessons": [
      "Wisdom begins with sincere gratitude to God and treating people with gentle humility.",
      "Small acts of kindness or cruelty carry eternal weight in the divine scale."
    ],
    "audioNarration": {
      "duration": "4:45",
      "durationSeconds": 285,
      "tracks": [
        {
          "id": "luqman-tr-1",
          "title": "The Counsel of Wisdom & The Mustard Seed",
          "narrator": "Shaykh Hisham Al-Khatib",
          "duration": "4:45",
          "durationSeconds": 285
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "luqman-counsel",
          "title": "The Paternal Counsel",
          "timestamp": "0:00",
          "timestampSeconds": 0
        }
      ]
    }
  },
  {
    "id": "ashab-al-kahf",
    "name": "Ashab al-Kahf",
    "arabicName": "أَصْحَاب الْكَهْف",
    "honorific": "عليهم السلام",
    "titleBadge": "The Young Men of the Cave & The 309-Year Sleep",
    "meaning": "The Companions of the Cave",
    "biblicalEquivalent": "The Seven Sleepers of Ephesus",
    "eraAndLocation": "Ephesus (Anatolia / Roman Asia Minor)",
    "headerVisual": {
      "iconSymbol": "⛰️",
      "gradientFrom": "#1c2838",
      "gradientTo": "#0B1A13",
      "calligraphySnippet": "إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى",
      "subtitle": "Youth of Uncompromising Faith, The Mountain Sanctuary, and The Faithful Dog at the Threshold"
    },
    "whoIsIntro": "The story of Ashab al-Kahf (The Companions of the Cave) is the centerpiece of Surah Al-Kahf, recited every Friday by Muslims worldwide. A group of aristocratic youths refused to worship Roman emperor idols, fleeing into a mountain cave where Allah caused them to sleep peacefully for 309 years as a sign of resurrection.",
    "quranEvidence": [
      {
        "surahNumber": 18,
        "verseNumber": 13,
        "surahName": "Al-Kahf",
        "arabic": "نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِالْحَقِّ ۚ إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى",
        "transliteration": "Nahnu naqussu 'alayka naba'ahum bil-haqq, innahum fityatun amanū bi-rabbihim wa-zidnahum huda",
        "translation": "It is We who relate to you their story in truth. Indeed, they were youths who believed in their Lord, and We increased them in guidance.",
        "citation": "Quran 18:13"
      }
    ],
    "narrativeSections": [
      {
        "id": "kahf-sleep",
        "title": "The Mountain Haven and The Miraculous Century Slumber",
        "timestamp": "0:00",
        "timestampSeconds": 0,
        "content": [
          "Standing against imperial pressure, these young men affirmed: \"Our Lord is the Lord of the heavens and the earth; never will we invoke besides Him any deity.\"",
          "Taking refuge in a spacious cave, their faithful dog stretched its paws at the threshold. Allah caused the sun to veer away from their cave at dawn and dusk, turning them from right to left in slumber for 309 lunar years until awakening in an era of faith."
        ]
      }
    ],
    "pullQuotes": [
      {
        "quote": "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
        "speaker": "The Youth of the Cave",
        "context": "Their supplication upon entering the cave (Quran 18:10)"
      }
    ],
    "teachingsAndLessons": [
      "Standing up for moral truth even when isolated invites miraculous divine protection.",
      "Physical death and resurrection are effortless for the Lord of the universe."
    ],
    "audioNarration": {
      "duration": "5:15",
      "durationSeconds": 315,
      "tracks": [
        {
          "id": "kahf-tr-1",
          "title": "The Cave Sanctuary & The Three Centuries",
          "narrator": "Ustadh Tariq Al-Banna",
          "duration": "5:15",
          "durationSeconds": 315
        }
      ],
      "tableOfContents": [
        {
          "sectionId": "kahf-sleep",
          "title": "The Cave Sanctuary",
          "timestamp": "0:00",
          "timestampSeconds": 0
        }
      ]
    }
  }
];
