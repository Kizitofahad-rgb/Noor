import { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Search,
  Check,
} from 'lucide-react';
import {
  lessons,
  arabicAlphabet,
  glossary,
  type ArabicLetter,
} from '@/lib/content';
import { tajweedStyles, tajweedOrder } from '@/lib/tajweed';
import { useNoor } from '@/context/NoorContext';
import { OrnamentedCard, BorderedSubPanel, SectionDivider } from '../Ornamentation';

export function LearnView() {
  const { completedLessons, toggleLesson, isLessonCompleted } = useNoor();
  const [activeTab, setActiveTab] = useState<'alphabet' | 'tajweed' | 'glossary'>('alphabet');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);

  // Play audio pronunciation for Arabic letter using browser SpeechSynthesis with Arabic voice or tone
  const playLetterAudio = (letter: ArabicLetter) => {
    setPlayingLetter(letter.name);
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(letter.arabic);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
        utterance.onend = () => setPlayingLetter(null);
        utterance.onerror = () => setPlayingLetter(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setPlayingLetter(null), 1000);
      }
    } catch {
      setTimeout(() => setPlayingLetter(null), 1000);
    }
  };

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

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
          Arabic Learning Track (مسار لغة القرآن)
        </h1>
        <p className="text-text-secondary text-sm sm:text-base mt-1">
          Read, understand, and connect with Quranic Arabic from letters to profound theological concepts.
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
                onClick={() => toggleLesson(lesson.id)}
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
                    <h3 className="font-bold text-base text-text-primary">{lesson.title}</h3>
                    <p className="text-sm text-text-secondary mt-0.5">{lesson.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs text-accent-gold font-mono font-medium">{lesson.duration}</span>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      isDone
                        ? 'bg-accent-gold border-accent-gold text-bg-primary font-bold'
                        : 'border-accent-gold/45 bg-bg-primary'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </OrnamentedCard>
            );
          })}
        </div>
      </div>

      {/* Tabs: Alphabet, Tajweed, Glossary */}
      <div className="space-y-6 pt-4 border-t border-accent-gold/25">
        <div className="flex items-center gap-2 bg-bg-card/90 border border-accent-gold/35 p-1.5 rounded-2xl w-full sm:w-max">
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'alphabet'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Alphabet & Pronunciation
          </button>
          <button
            onClick={() => setActiveTab('tajweed')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'tajweed'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Tajweed Essentials
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
              activeTab === 'glossary'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Spiritual Words Glossary ({glossary.length})
          </button>
        </div>

        {/* Tab 1: Alphabet with Pronunciation */}
        {activeTab === 'alphabet' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  Arabic Alphabet (Hurūf al-Hijā · حروف الهجاء)
                </h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  Tap any letter card to listen to authentic vocal pronunciation and articulation origins (Makhārij).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {arabicAlphabet.map((letter) => {
                const isPlaying = playingLetter === letter.name;
                return (
                  <OrnamentedCard
                    key={letter.name}
                    onClick={() => playLetterAudio(letter)}
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
                    <div className="text-xs text-text-secondary mt-1 font-mono">
                      /{letter.transliteration}/
                    </div>
                    <div className="mt-3.5 pt-3 border-t border-accent-gold/20 text-xs">
                      <div className="text-accent-gold text-xs uppercase tracking-wider font-semibold">Example Word</div>
                      <div className="font-arabic text-xl text-accent-gold font-bold mt-1">
                        {letter.exampleWord}
                      </div>
                      <div className="text-xs sm:text-sm text-text-secondary mt-0.5">"{letter.exampleMeaning}"</div>
                    </div>
                  </OrnamentedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Tajweed Essentials */}
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

        {/* Tab 3: Glossary of Untranslatable Spiritual Words */}
        {activeTab === 'glossary' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  Quranic Words That Carry Worlds
                </h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  Words with no single English equivalent, with their linguistic root and inner spiritual depth.
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
              {filteredGlossary.map((word) => (
                <OrnamentedCard
                  key={word.transliteration}
                  className="p-6 space-y-3.5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-accent-gold/25">
                    <div>
                      <h4 className="font-bold text-text-primary text-xl font-serif">{word.transliteration}</h4>
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
              ))}
            </div>
          </div>
        )}
      </div>

      <SectionDivider />
    </div>
  );
}
