export interface PropheticBehaviorReflection {
  id: string;
  themeTitle: string;
  arabicTitle: string;
  propheticBehavior: string;
  hadithNarrative: string;
  hadithCitation: string;
  narratorCompanion: string;
  quranicFoundation: {
    verseText: string;
    surahCitation: string;
    translation: string;
  };
  dailyActionablePractice: string;
  reflectionQuestion: string;
}

export const propheticBehaviors: PropheticBehaviorReflection[] = [
  {
    id: 'behavior-speech-listening',
    themeTitle: 'How He Listened & Spoke to People',
    arabicTitle: 'أَدَبُ الْحَدِيثِ وَالْإِصْغَاءِ',
    propheticBehavior:
      'He never interrupted anyone while they spoke. When addressing a person, he did not just turn his head—he turned his entire body and heart toward them, giving them his complete, undivided presence. He spoke with distinct clarity, neither rushed nor loud, and never shouted in marketplaces.',
    hadithNarrative:
      'Ali ibn Abi Talib (RA) described him: "When the Messenger of Allah ﷺ turned to face someone, he turned completely. He was the most generous of people in heart, the most truthful in speech, the gentlest in nature, and the most noble in companionship. Whoever saw him unexpectedly was awestruck by him, and whoever mingled with him loved him."',
    hadithCitation: 'Shama’il at-Tirmidhi #7 · Jami` at-Tirmidhi #3638 (Hasan Sahih)',
    narratorCompanion: 'Sayyiduna ‘Ali ibn Abi Talib (RA)',
    quranicFoundation: {
      verseText: 'وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ ۚ إِنَّ أَنكَرَ الْأَصْوَاتِ لَصَوْتُ الْحَمِيرِ',
      surahCitation: 'Surah Luqman (31:19)',
      translation: 'And be moderate in your pace and lower your voice; indeed, the most disagreeable of sounds is the braying of donkeys.',
    },
    dailyActionablePractice:
      'Today, when someone speaks to you—whether a child, spouse, coworker, or parent—put your phone face down, turn your whole posture toward them, and listen without interrupting or preparing your reply.',
    reflectionQuestion: 'How often do I give people only half of my attention while checking notifications?',
  },
  {
    id: 'behavior-handling-wrong-anger',
    themeTitle: 'How He Reacted When Offended or Provoked',
    arabicTitle: 'الْحِلْمُ وَالْعَفْوُ عِنْدَ الْغَضَبِ',
    propheticBehavior:
      'The Prophet ﷺ never took revenge for personal insult or injury. If someone treated him with harshness, rudeness, or cruelty, his response was to pardon, overlook, and pray for their guidance. He only became angered when the sacred boundaries of Allah or the rights of the helpless were violated.',
    hadithNarrative:
      'Aisha (RA) narrated: "The Messenger of Allah ﷺ was never given a choice between two matters except that he took the easier of the two, as long as it was not sinful. By Allah, he never took revenge for anything done against him personally, unless the sacred boundaries of Allah were violated, then he would act for the sake of Allah."',
    hadithCitation: 'Sahih al-Bukhari #6853 · Sahih Muslim #2327',
    narratorCompanion: 'Mother of the Believers, Aisha (RA)',
    quranicFoundation: {
      verseText: 'خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ وَأَعْرِضْ عَنِ الْجَاهِلِينَ',
      surahCitation: 'Surah Al-A‘raf (7:199)',
      translation: 'Take to pardoning; enjoin what is good; and turn away from the ignorant.',
    },
    dailyActionablePractice:
      'When your pride or ego feels wounded today by someone’s impatience, coldness, or insult, consciously choose not to retaliate. Say "HasbunAllah" under your breath and let the offense dissolve in your patience.',
    reflectionQuestion: 'Do I get angry to defend my personal ego, or to stand up for justice and truth?',
  },
  {
    id: 'behavior-home-humility',
    themeTitle: 'How He Behaved Inside His Home',
    arabicTitle: 'خُلُقُهُ فِي بَيْتِهِ وَمُعَامَلَةُ أَهْلِهِ',
    propheticBehavior:
      'He was not a demanding patriarch who sat waiting to be served. Inside his private home, he served his family cheerfully: mending his own sandals, patching his own tunic, milking his own goat, sweeping, and helping with household chores. When the call to prayer came, he walked to the mosque as if he were just one of the common people.',
    hadithNarrative:
      'Al-Aswad reported: I asked Aisha (RA): "What did the Prophet ﷺ use to do in his house?" She replied: "He would be in the service of his family (cleaning, mending, assisting), and when the time for prayer arrived, he would go out to prayer."',
    hadithCitation: 'Sahih al-Bukhari #676, #6039',
    narratorCompanion: 'Mother of the Believers, Aisha (RA)',
    quranicFoundation: {
      verseText: 'وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ',
      surahCitation: 'Surah An-Nisa (4:19)',
      translation: 'And live with them in honor, kindness, and equity.',
    },
    dailyActionablePractice:
      'Complete a chore in your home today without being asked—wash the dishes, tidy a room, take out the trash, or prepare something for someone you live with—with pure humility for Allah.',
    reflectionQuestion: 'Am I gentle and helpful at home, or do I only display my best manners to strangers outside?',
  },
  {
    id: 'behavior-vulnerable-children',
    themeTitle: 'How He Treated the Vulnerable, Servants & Children',
    arabicTitle: 'رَحْمَتُهُ بِالضُّعَفَاءِ وَالصِّبْيَانِ',
    propheticBehavior:
      'He never degraded those under his authority. He bent down to speak to children, stroked their heads, carried them on his shoulders even during prayer, and greeted them first in the street. He never struck a servant, a woman, or an animal with his hand.',
    hadithNarrative:
      'Anas ibn Malik (RA) said: "I served the Messenger of Allah ﷺ for ten years. By Allah, he never once said to me Uff! (a sigh of frustration). He never said regarding something I did: Why did you do that? Nor regarding something I neglected: Why did you not do that? He was the best of people in character."',
    hadithCitation: 'Sahih al-Bukhari #6038 · Sahih Muslim #2309',
    narratorCompanion: 'Sayyiduna Anas ibn Malik (RA)',
    quranicFoundation: {
      verseText: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
      surahCitation: 'Surah Al-Anbiya (21:107)',
      translation: 'And We have not sent you, [O Muhammad], except as a mercy to all the worlds.',
    },
    dailyActionablePractice:
      'Speak today with tender gentleness to those who serve you—cashiers, cleaners, delivery drivers, or younger siblings. Overlook mistakes without sighing or snapping.',
    reflectionQuestion: 'How do I speak to people who cannot give me anything in return?',
  },
  {
    id: 'behavior-smiling-warmth',
    themeTitle: 'His Radiant Smile & Bringing Joy to Others',
    arabicTitle: 'بَشَاشَةُ وَجْهِهِ وَتَبَسُّمُهُ',
    propheticBehavior:
      'He was not stern, gloomy, or distant. Despite carrying the spiritual weight of all humanity and facing persecution, his face was the most smiling of all people. He joked with companions without telling falsehoods, and greeted every person as if they were his closest friend.',
    hadithNarrative:
      'Abdullah ibn al-Harith (RA) said: "I never saw anyone smile more than the Messenger of Allah ﷺ." And Jarir ibn Abdullah (RA) said: "Ever since I embraced Islam, the Prophet ﷺ never veiled himself from me, and he never looked at me except with a warm smile on his face."',
    hadithCitation: 'Jami` at-Tirmidhi #3641 (Sahih) · Sahih al-Bukhari #3036',
    narratorCompanion: 'Abdullah ibn al-Harith & Jarir ibn Abdullah (RA)',
    quranicFoundation: {
      verseText: 'فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ',
      surahCitation: 'Surah Ali ‘Imran (3:159)',
      translation: 'So by mercy from Allah, you were gentle with them. And had you been harsh and hard-hearted, they would have dispersed from around you.',
    },
    dailyActionablePractice:
      'Make your smile a conscious spiritual intention today. Smile into the eyes of everyone you meet today as an act of charity (Sadaqah) for the sake of Allah.',
    reflectionQuestion: 'Does my presence bring relief and warmth into a room, or tension and heaviness?',
  },
  {
    id: 'behavior-grief-loss',
    themeTitle: 'How He Handled Grief, Tears & Hardship',
    arabicTitle: 'حَالُهُ عِنْدَ الْحُزْنِ وَالْمَصَائِبِ',
    propheticBehavior:
      'He felt human pain deeply. He wept when holding his dying infant son, wept over the graves of his mother and loyal companions, yet his sorrow was dignified. He never wailed, tore his garments, or questioned Allah’s decree. He taught that tender tears are divine mercy placed in human hearts.',
    hadithNarrative:
      'When his son Ibrahim took his last breath in his arms, the tears of the Messenger of Allah ﷺ overflowed. Abdur-Rahman ibn Awf said: "Even you, O Messenger of Allah?" The Prophet ﷺ replied: "O Ibn Awf, it is mercy." Then he wept more and said: "The eyes weep and the heart grieves, but we will not utter anything except what pleases our Lord. And indeed, O Ibrahim, we are grieved by your parting."',
    hadithCitation: 'Sahih al-Bukhari #1303 · Sahih Muslim #2315',
    narratorCompanion: 'Sayyiduna Abdur-Rahman ibn Awf & Anas (RA)',
    quranicFoundation: {
      verseText: 'الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
      surahCitation: 'Surah Al-Baqarah (2:156)',
      translation: 'Who, when disaster strikes them, say: "Indeed we belong to Allah, and indeed to Him we will return."',
    },
    dailyActionablePractice:
      'If sorrow, disappointment, or loss touches you today, do not suppress your tears in toxic numbness. Acknowledge the pain with tenderness, and anchor your tongue in: "Inna lillahi wa inna ilayhi raji‘un."',
    reflectionQuestion: 'Do I trust Allah even when He writes things into my life that make me cry?',
  },
  {
    id: 'behavior-detachment-generosity',
    themeTitle: 'His Generosity & Detachment from Clutter',
    arabicTitle: 'زُهْدُهُ فِي الدُّنْيَا وَجُودُهُ الْمُطْلَقُ',
    propheticBehavior:
      'He gave as one who had zero fear of poverty. When gold or herds were gifted to him, he did not sleep until they were distributed to the hungry. He slept on a simple mat woven from palm fibers that pressed marks onto his ribs, refusing to make this world his palace.',
    hadithNarrative:
      'Ibn Mas‘ud (RA) reported: The Prophet ﷺ slept on a straw mat and arose with its marks on his side. We said: "O Messenger of Allah, if only you allowed us to prepare a soft mattress for you!" He replied: "What do I have to do with this world? My example with this world is only like that of a traveling rider who shades himself beneath a tree for an hour, then gets up and leaves it behind."',
    hadithCitation: 'Jami` at-Tirmidhi #2377 (Sahih) · Sunan Ibn Majah #4109',
    narratorCompanion: 'Sayyiduna Abdullah ibn Mas‘ud (RA)',
    quranicFoundation: {
      verseText: 'لِّكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ وَلَا تَفْرَحُوا بِمَا آتَاكُمْ ۗ وَاللَّهُ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
      surahCitation: 'Surah Al-Hadid (57:23)',
      translation: 'In order that you not despair over what has eluded you and not exult over what He has given you. And Allah does not like everyone self-deluded and boastful.',
    },
    dailyActionablePractice:
      'Part with something you hold onto today: donate money, give away an item of clothing, or feed someone in need. Remind yourself: we are travelers who will leave all baggage behind.',
    reflectionQuestion: 'Am I living as a permanent resident of this earth, or as a traveling guest passing through?',
  },
  {
    id: 'behavior-walking-humility',
    themeTitle: 'How He Walked & Carried Himself with Dignity',
    arabicTitle: 'مِشْيَتُهُ وَسَمْتُهُ وَتَوَاضُعُهُ',
    propheticBehavior:
      'He walked with steady vitality, leaning slightly forward as if descending a gentle incline—neither strutting in pride nor dragging his feet in false pious feebleness. When he walked with his companions, he let them walk ahead while he walked among the rear to protect the weak.',
    hadithNarrative:
      'Abu Hurairah (RA) said: "I never saw anything more beautiful than the Messenger of Allah ﷺ; it was as if the sun was flowing across his face. And I never saw anyone walk faster than him; it was as if the earth folded up for him. We would tire ourselves out keeping pace, while he walked with natural ease."',
    hadithCitation: 'Shama’il at-Tirmidhi #118 · Jami` at-Tirmidhi #3648 (Hasan)',
    narratorCompanion: 'Sayyiduna Abu Hurairah (RA)',
    quranicFoundation: {
      verseText: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
      surahCitation: 'Surah Al-Furqan (25:63)',
      translation: 'And the servants of the Most Merciful are those who walk upon the earth with humility and tranquility.',
    },
    dailyActionablePractice:
      'Notice your posture today. Walk with purpose and humility, neither swaggering to be noticed nor slouching in apathy. Greet those you pass with peace.',
    reflectionQuestion: 'Does the way I carry my body convey humility before the Creator, or ego before people?',
  },
];

export function getDailyPropheticBehavior(indexOffset = 0): PropheticBehaviorReflection {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = (dayOfYear + indexOffset) % propheticBehaviors.length;
  return propheticBehaviors[index >= 0 ? index : 0];
}
