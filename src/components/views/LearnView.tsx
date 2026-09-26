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
  type GlossaryWord,
} from '@/lib/content';
import { tajweedStyles, tajweedOrder } from '@/lib/tajweed';
import { useNoor } from '@/context/NoorContext';

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
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Arabic Learning Track
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Read, understand, and connect with Quranic Arabic from letters to profound theological concepts.
        </p>
      </div>

      {/* Structured Curriculum Progress Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">
            Curriculum Lessons ({completedLessons.length}/{lessons.length} Completed)
          </h2>
          <span className="text-xs text-emerald-800 font-semibold">
            {Math.round((completedLessons.length / lessons.length) * 100)}% Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lessons.map((lesson) => {
            const isDone = isLessonCompleted(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => toggleLesson(lesson.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-white border-stone-200 hover:border-stone-300 text-stone-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">{lesson.title}</h3>
                    <p className="text-xs text-stone-500">{lesson.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-stone-400 font-mono">{lesson.duration}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-700 border-emerald-700 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs: Alphabet, Tajweed, Glossary */}
      <div className="space-y-6 pt-4 border-t border-stone-200">
        <div className="flex items-center gap-2 bg-stone-200/70 p-1.5 rounded-2xl w-full sm:w-max">
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'alphabet'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Alphabet & Pronunciation
          </button>
          <button
            onClick={() => setActiveTab('tajweed')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tajweed'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tajweed Essentials
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'glossary'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
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
                <h3 className="text-base font-bold text-stone-900">
                  Arabic Alphabet (Hurūf al-Hijā)
                </h3>
                <p className="text-xs text-stone-500">
                  Tap any letter card to listen to authentic vocal pronunciation and articulation origins (Makhārij).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {arabicAlphabet.map((letter) => {
                const isPlaying = playingLetter === letter.name;
                return (
                  <div
                    key={letter.name}
                    onClick={() => playLetterAudio(letter)}
                    className={`bg-white rounded-2xl p-5 border text-center cursor-pointer transition-all hover:scale-102 hover:shadow-md ${
                      isPlaying
                        ? 'border-emerald-700 bg-emerald-50/60 shadow-md ring-2 ring-emerald-700/20'
                        : 'border-stone-200/90 hover:border-emerald-600'
                    }`}
                  >
                    <div className="font-arabic text-4xl text-stone-900 mb-2 font-bold select-none">
                      {letter.arabic}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-900">
                      <span>{letter.name}</span>
                      <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-700 animate-pulse' : 'text-stone-400'}`} />
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1 font-mono">
                      /{letter.transliteration}/
                    </div>
                    <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-600">
                      <div className="text-stone-400 text-[10px] uppercase font-semibold">Example Word</div>
                      <div className="font-arabic text-base text-emerald-900 font-bold mt-0.5">
                        {letter.exampleWord}
                      </div>
                      <div className="text-[10px] text-stone-500">"{letter.exampleMeaning}"</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Tajweed Essentials */}
        {activeTab === 'tajweed' && (
          <div className="space-y-6">
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                The Science of Tajweed (علم التجويد)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Why Pronunciation is an Act of Love
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-2xl">
                Tajweed comes from the root J-W-D meaning "to beautify and make excellent." It ensures that every letter is given its due right from its anatomical point of articulation without excess or deficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tajweedOrder.map((ruleKey) => {
                const style = tajweedStyles[ruleKey];
                return (
                  <div
                    key={ruleKey}
                    className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs hover:border-stone-300 transition-all"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        <h4 className="font-bold text-stone-900 text-base">{style.label}</h4>
                      </div>
                      <span className="font-arabic text-xl font-bold" style={{ color: style.color }}>
                        {style.arabicName}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                      Rule: {style.ruleTip}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">{style.description}</p>
                  </div>
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
                <h3 className="text-base font-bold text-stone-900">
                  Quranic Words That Carry Worlds
                </h3>
                <p className="text-xs text-stone-500">
                  Words with no single English equivalent, with their linguistic root and inner spiritual depth.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Filter glossary..."
                  className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((word) => (
                <div
                  key={word.transliteration}
                  className="bg-white rounded-3xl border border-stone-200/90 p-6 space-y-3 shadow-xs hover:border-emerald-700/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h4 className="font-bold text-stone-900 text-lg">{word.transliteration}</h4>
                      <div className="text-[11px] font-mono text-emerald-800 font-semibold mt-0.5">
                        Root: {word.root}
                      </div>
                    </div>
                    <span className="font-arabic text-3xl text-emerald-950 font-bold">
                      {word.arabic}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                      Direct Meaning
                    </span>
                    <p className="text-xs font-semibold text-stone-800">{word.meaning}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                      Deeper Theological Essence
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">{word.deepExplanation}</p>
                  </div>

                  <div className="pt-2 text-[11px] text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{word.quranicOccurrence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
