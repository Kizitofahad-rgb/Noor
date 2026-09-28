import { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Search,
  Check,
  HeartHandshake,
  Layers,
} from 'lucide-react';
import {
  lessons,
  arabicAlphabet,
  arabicVowels,
  glossary,
  dailyDuas,
  type ArabicLetter,
  type ArabicVowel,
  type DailyDua,
} from '@/lib/content';
import { tajweedStyles, tajweedOrder } from '@/lib/tajweed';
import { useNoor } from '@/context/NoorContext';
import { OrnamentedCard, BorderedSubPanel, SectionDivider } from '../Ornamentation';
import { LessonDetailModal } from '../LessonDetailModal';

export function LearnView() {
  const { completedLessons, toggleLesson, isLessonCompleted } = useNoor();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'alphabet' | 'vowels' | 'tajweed' | 'glossary' | 'duas'>('alphabet');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [letterSearch, setLetterSearch] = useState('');
  const [duaCategory, setDuaCategory] = useState<string>('All');
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  // Play audio pronunciation for Arabic text using browser SpeechSynthesis
  const playArabicAudio = (key: string, arabicText: string) => {
    setPlayingAudioKey(key);
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.75;
        utterance.onend = () => setPlayingAudioKey(null);
        utterance.onerror = () => setPlayingAudioKey(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setPlayingAudioKey(null), 1200);
      }
    } catch {
      setTimeout(() => setPlayingAudioKey(null), 1200);
    }
  };

  const filteredAlphabet = arabicAlphabet.filter((l) => {
    const q = letterSearch.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.transliteration.toLowerCase().includes(q) ||
      l.arabic.includes(q) ||
      l.exampleWord.includes(q) ||
      l.exampleMeaning.toLowerCase().includes(q) ||
      (l.makhraj && l.makhraj.toLowerCase().includes(q))
    );
  });

  const filteredGlossary = glossary.filter((item) => {
    const q = glossarySearch.toLowerCase();
    return (
      item.transliteration.toLowerCase().includes(q) ||
      item.arabic.includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.deepExplanation.toLowerCase().includes(q) ||
      item.root.toLowerCase().includes(q)
    );
  });

  const filteredDuas = dailyDuas.filter((d) => {
    return duaCategory === 'All' || d.category === duaCategory;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
          Arabic Learning Track (مسار لغة القرآن)
        </h1>
        <p className="text-text-secondary text-sm sm:text-base mt-1">
          Complete, systematic curriculum from all 28 letters and short vowels to Tajweed sciences and high-frequency Quranic roots.
        </p>
      </div>

      {/* Structured Curriculum Progress Cards */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-accent-gold uppercase tracking-wider">
            Curriculum Lessons ({completedLessons.length}/{lessons.length} Completed)
          </h2>
          <span className="text-xs sm:text-sm text-accent-gold font-bold uppercase tracking-wider">
            {Math.round((completedLessons.length / lessons.length) * 100)}% Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {lessons.map((lesson) => {
            const isDone = isLessonCompleted(lesson.id);
            return (
              <OrnamentedCard
                key={lesson.id}
                onClick={() => setSelectedLessonId(lesson.id)}
                className={`p-5 flex items-center justify-between gap-4 transition-all cursor-pointer ${
                  isDone
                    ? 'border-accent-gold bg-accent-gold/15'
                    : 'border-accent-gold/40 hover:border-accent-gold'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDone
                        ? 'bg-accent-gold text-bg-primary border-accent-gold font-bold'
                        : 'bg-bg-primary text-accent-gold border-accent-gold/45'
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-text-primary group-hover:text-accent-gold transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">{lesson.subtitle}</p>
                    <span className="inline-block mt-1 text-[11px] text-accent-gold underline uppercase font-semibold">
                      Click to study lesson →
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs text-accent-gold font-mono font-medium">{lesson.duration}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLesson(lesson.id);
                    }}
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-accent-gold border-accent-gold text-bg-primary font-bold shadow-xs'
                        : 'border-accent-gold/45 bg-bg-primary hover:border-accent-gold'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </OrnamentedCard>
            );
          })}
        </div>
      </div>

      {/* Tabs: Alphabet, Vowels, Tajweed, Glossary, Duas */}
      <div className="space-y-6 pt-4 border-t border-accent-gold/25">
        <div className="flex flex-wrap items-center gap-2 bg-bg-card/90 border border-accent-gold/35 p-1.5 rounded-2xl w-full">
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'alphabet'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            All 28 Letters ({arabicAlphabet.length})
          </button>
          <button
            onClick={() => setActiveTab('vowels')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'vowels'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Vowels & Harakāt ({arabicVowels.length})
          </button>
          <button
            onClick={() => setActiveTab('tajweed')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'tajweed'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Tajweed Essentials
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'glossary'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Spiritual Words ({glossary.length})
          </button>
          <button
            onClick={() => setActiveTab('duas')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'duas'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Daily Duas ({dailyDuas.length})
          </button>
        </div>

        {/* Tab 1: Alphabet with Pronunciation */}
        {activeTab === 'alphabet' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  Complete Arabic Alphabet (حروف الهجاء الثمانية والعشرون)
                </h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  All 28 letters with anatomical articulation points (Makhārij), phonetics, and authentic vocal pronunciation.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-accent-gold/70 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={letterSearch}
                  onChange={(e) => setLetterSearch(e.target.value)}
                  placeholder="Filter letters..."
                  className="w-full bg-bg-card border border-accent-gold/45 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAlphabet.map((letter) => {
                const isPlaying = playingAudioKey === `letter-${letter.name}`;
                return (
                  <OrnamentedCard
                    key={letter.name}
                    onClick={() => playArabicAudio(`letter-${letter.name}`, letter.arabic)}
                    className={`p-5 text-center cursor-pointer transition-all hover:scale-102 ${
                      isPlaying
                        ? 'border-accent-gold bg-accent-gold/20 shadow-md ring-1 ring-accent-gold'
                        : 'border-accent-gold/40 hover:border-accent-gold'
                    }`}
                  >
                    <div className="font-arabic text-4xl sm:text-5xl text-accent-gold mb-2 font-bold select-none leading-tight">
                      {letter.arabic}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-text-primary">
                      <span>{letter.name}</span>
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-accent-gold animate-pulse' : 'text-accent-gold-dim'}`} />
                    </div>
                    <div className="text-xs text-text-secondary mt-0.5 font-mono">
                      /{letter.transliteration}/
                    </div>
                    {letter.makhraj && (
                      <div className="mt-1 text-[11px] text-accent-gold font-medium truncate">
                        {letter.makhraj}
                      </div>
                    )}
                    <div className="mt-3 pt-2.5 border-t border-accent-gold/20 text-xs">
                      <div className="text-accent-gold text-[10px] uppercase tracking-wider font-semibold">Example Word</div>
                      <div className="font-arabic text-xl text-accent-gold font-bold mt-0.5">
                        {letter.exampleWord}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">"{letter.exampleMeaning}"</div>
                    </div>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Vowels & Harakat */}
        {activeTab === 'vowels' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-serif">
                Harakāt & Short Vowels (الحركات وعلامات التشكيل)
              </h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Vowel marks and diacritics that determine correct Quranic vocalization and grammar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {arabicVowels.map((vowel) => {
                const isPlaying = playingAudioKey === `vowel-${vowel.name}`;
                return (
                  <OrnamentedCard
                    key={vowel.name}
                    onClick={() => playArabicAudio(`vowel-${vowel.name}`, vowel.example)}
                    className={`p-5 text-center cursor-pointer transition-all hover:scale-102 ${
                      isPlaying
                        ? 'border-accent-gold bg-accent-gold/20 shadow-md ring-1 ring-accent-gold'
                        : 'border-accent-gold/40 hover:border-accent-gold'
                    }`}
                  >
                    <div className="font-arabic text-5xl text-accent-gold mb-2 font-bold select-none">
                      {vowel.arabicSymbol}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-base font-bold text-text-primary">
                      <span>{vowel.name}</span>
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-accent-gold animate-pulse' : 'text-accent-gold-dim'}`} />
                    </div>
                    <div className="text-xs text-accent-gold font-mono mt-1 font-semibold">
                      {vowel.sound}
                    </div>
                    <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                      {vowel.description}
                    </p>
                    <div className="mt-3.5 pt-3 border-t border-accent-gold/20 text-xs">
                      <div className="text-[10px] text-accent-gold uppercase tracking-wider font-semibold">In Practice</div>
                      <div className="font-arabic text-lg text-accent-gold font-bold mt-0.5">
                        {vowel.example}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">"{vowel.exampleMeaning}"</div>
                    </div>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Tajweed Essentials */}
        {activeTab === 'tajweed' && (
          <div className="space-y-6">
            <OrnamentedCard className="p-6 sm:p-8 space-y-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent-gold block">
                The Science of Tajweed (علم التجويد)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary font-serif">
                Why Pronunciation is an Act of Love
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
                Tajweed comes from the root J-W-D meaning "to beautify and make excellent." It ensures that every letter is given its due right from its anatomical point of articulation without excess or deficiency.
              </p>
            </OrnamentedCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tajweedOrder.map((ruleKey) => {
                const style = tajweedStyles[ruleKey];
                return (
                  <OrnamentedCard
                    key={ruleKey}
                    className="p-6 space-y-3.5"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-accent-gold/25">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        <h4 className="font-bold text-text-primary text-lg font-serif">{style.label}</h4>
                      </div>
                      <span className="font-arabic text-2xl font-bold" style={{ color: style.color }}>
                        {style.arabicName}
                      </span>
                    </div>

                    <BorderedSubPanel className="text-sm font-semibold text-text-primary p-3.5">
                      Rule: {style.ruleTip}
                    </BorderedSubPanel>

                    <p className="text-sm text-text-secondary leading-relaxed">{style.description}</p>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Glossary of Untranslatable Spiritual Words */}
        {activeTab === 'glossary' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  Quranic Words That Carry Worlds ({filteredGlossary.length})
                </h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  High-frequency Quranic terms and 3-letter roots with profound spiritual depth.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-5 h-5 text-accent-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Filter glossary..."
                  className="w-full bg-bg-card border border-accent-gold/45 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((word) => {
                const isPlaying = playingAudioKey === `glossary-${word.transliteration}`;
                return (
                  <OrnamentedCard
                    key={word.transliteration}
                    className="p-6 space-y-3.5 cursor-pointer"
                    onClick={() => playArabicAudio(`glossary-${word.transliteration}`, word.arabic)}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-accent-gold/25">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-text-primary text-xl font-serif">{word.transliteration}</h4>
                          <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-accent-gold animate-pulse' : 'text-accent-gold-dim'}`} />
                        </div>
                        <div className="text-xs font-mono text-accent-gold font-semibold mt-0.5">
                          Root: {word.root}
                        </div>
                      </div>
                      <span className="font-arabic text-3xl sm:text-4xl text-accent-gold font-bold">
                        {word.arabic}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-1">
                        Direct Meaning
                      </span>
                      <p className="text-base font-semibold text-text-primary">{word.meaning}</p>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-1">
                        Deeper Theological Essence
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed">{word.deepExplanation}</p>
                    </div>

                    <BorderedSubPanel className="pt-2 text-xs sm:text-sm text-text-secondary p-3 flex items-start gap-2 font-medium">
                      <Sparkles className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span>{word.quranicOccurrence}</span>
                    </BorderedSubPanel>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 5: Daily Duas */}
        {activeTab === 'duas' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  Prophetic & Quranic Duas (الأدعية المأثورة)
                </h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  Essential supplications with authentic references, word-by-word transliteration, and spiritual benefits.
                </p>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {(['All', 'Peace & Forgiveness', 'Guidance & Knowledge', 'Protection & Ease', 'Morning & Evening'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDuaCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all uppercase tracking-wider ${
                      duaCategory === cat
                        ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDuas.map((dua) => {
                const isPlaying = playingAudioKey === `dua-${dua.id}`;
                return (
                  <OrnamentedCard
                    key={dua.id}
                    className="p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-accent-gold/25">
                      <div>
                        <span className="text-[11px] text-accent-gold font-semibold uppercase tracking-wider block">
                          {dua.category}
                        </span>
                        <h4 className="font-bold text-text-primary text-lg font-serif mt-0.5">{dua.title}</h4>
                      </div>
                      <button
                        onClick={() => playArabicAudio(`dua-${dua.id}`, dua.arabic)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isPlaying
                            ? 'bg-accent-gold text-bg-primary border-accent-gold'
                            : 'bg-bg-primary text-accent-gold border-accent-gold/40 hover:border-accent-gold'
                        }`}
                        title="Listen to Dua pronunciation"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-bg-primary/80 border border-accent-gold/25 text-right">
                      <p className="font-arabic text-xl sm:text-2xl text-accent-gold font-bold leading-loose">
                        {dua.arabic}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <div className="text-accent-gold font-mono font-medium">
                        {dua.transliteration}
                      </div>
                      <div className="text-text-primary font-semibold leading-relaxed">
                        "{dua.translation}"
                      </div>
                    </div>

                    <BorderedSubPanel className="text-xs text-text-secondary p-3 flex flex-col gap-1">
                      <div className="text-accent-gold font-semibold">Source: {dua.source}</div>
                      <div>{dua.benefit}</div>
                    </BorderedSubPanel>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <SectionDivider />

      {/* Lesson Detail Modal */}
      {selectedLessonId && (
        <LessonDetailModal
          lessonId={selectedLessonId}
          onClose={() => setSelectedLessonId(null)}
          isCompleted={isLessonCompleted(selectedLessonId)}
          onToggleComplete={() => toggleLesson(selectedLessonId)}
        />
      )}
    </div>
  );
}
