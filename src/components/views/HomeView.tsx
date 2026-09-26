import { useState } from 'react';
import {
  Sun,
  Cloud,
  Heart,
  Compass,
  Sparkles,
  Feather as FeatherIcon,
  Flame,
  ArrowRight,
  BookOpen,
  Bookmark,
  Play,
  CheckCircle2,
  PenLine,
  Send,
} from 'lucide-react';
import { moods, reflections, surahs, type MoodId, type Surah } from '@/lib/content';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from '../AudioPlayerBar';
import { getSurahAudioUrl } from '@/lib/recitationAudio';

export function HomeView({
  onNavigate,
  onOpenSurah,
  onPlayAudio,
}: {
  onNavigate: (tab: 'home' | 'quran' | 'library' | 'reels' | 'learn' | 'saved') => void;
  onOpenSurah: (surah: Surah) => void;
  onPlayAudio: (state: ActiveAudioState) => void;
}) {
  const {
    mood,
    setMood,
    streakDays,
    readSurahs,
    userReflections,
    addUserReflection,
    reciterId,
  } = useNoor();

  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  const reflection = reflections[mood];
  const firstSurah = surahs[0];
  const isFirstSurahRead = readSurahs.includes(firstSurah.id);

  const getMoodIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud':
        return <Cloud className="w-4 h-4" />;
      case 'sun':
        return <Sun className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      case 'compass':
        return <Compass className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'feather':
      default:
        return <FeatherIcon className="w-4 h-4" />;
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;
    addUserReflection(mood, journalText.trim(), reflection.reference);
    setJournalText('');
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
  };

  const playFatihah = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getSurahAudioUrl(1, reciterId);
    onPlayAudio({
      title: 'Surah Al-Fatihah',
      subtitle: 'The Opening · 7 Verses',
      url,
      arabicSnippet: 'الفاتحة',
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Banner / Streak & Greeting */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/80">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-700/60 text-emerald-200 text-xs font-semibold tracking-wide">
              <span>DAILY SPIRITUAL COMPANION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A few quiet moments can change the shape of a day.
            </h1>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Welcome back to Noor. Ground your soul in the timeless rhythm of the Quran, authentic hadith, and gentle daily mindfulness.
            </p>
          </div>

          <div className="bg-emerald-900/80 border border-emerald-700/70 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Daily Habit
              </div>
              <div className="text-2xl font-bold text-white">
                {streakDays} <span className="text-sm font-normal text-emerald-300">Days Active</span>
              </div>
              <div className="text-[11px] text-emerald-200/70 mt-0.5">
                Returning to what nourishes you
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Situation / Mood Picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">How are you arriving today?</h2>
            <p className="text-xs text-stone-500">
              Select your current spiritual or emotional state to receive an anchored reflection.
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-medium hidden sm:inline">
            Situation-Guided Verses
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {moods.map((m) => {
            const isSelected = m.id === mood;
            return (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-102'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <span className={isSelected ? 'text-amber-300' : 'text-stone-500'}>
                  {getMoodIcon(m.icon)}
                </span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Reflection Card */}
      <div className="bg-[#FAF5ED] rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden transition-all">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
            <Sun className="w-3.5 h-3.5 text-amber-700" />
            <span>Anchored Ayah · {moods.find((m) => m.id === mood)?.label}</span>
          </div>
          <span className="text-xs font-medium text-emerald-800">{reflection.reference}</span>
        </div>

        {/* Arabic Calligraphy / Text */}
        <div className="py-6 text-center font-arabic text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-[2.2] tracking-wide select-text">
          {reflection.arabic}
        </div>

        {/* English Translation */}
        <p className="text-center text-stone-800 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          "{reflection.translation}"
        </p>

        {/* Reflection Note */}
        <div className="mt-6 pt-5 border-t border-amber-200/60 max-w-2xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
            {reflection.note}
          </p>
          {reflection.tafsirExcerpt && (
            <div className="mt-3 text-xs text-stone-500 bg-white/70 p-3 rounded-xl border border-amber-200/50">
              <span className="font-semibold text-stone-800">Tafsir Context:</span> {reflection.tafsirExcerpt}
            </div>
          )}
        </div>

        {/* Interactive Reflection Journal Drawer */}
        <div className="mt-6 pt-5 border-t border-amber-200/60 max-w-2xl mx-auto">
          <form onSubmit={handleSaveReflection} className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5">
                <PenLine className="w-3.5 h-3.5 text-emerald-800" />
                <span>Personal Contemplation (Saved to your reflections journal)</span>
              </span>
              {journalSaved && (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What does this verse stir in your heart today?"
                className="flex-1 bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
              <button
                type="submit"
                disabled={!journalText.trim()}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
              >
                <span>Save</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Recent reflection snippet if any */}
          {userReflections.length > 0 && (
            <div className="mt-3 text-[11px] text-stone-500 flex items-center justify-between">
              <span>{userReflections.length} personal reflection notes logged</span>
              <button
                onClick={() => onNavigate('saved')}
                className="text-emerald-800 font-semibold hover:underline"
              >
                View Journal &rarr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Continue Your Journey (Quran Card) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">Continue Your Journey</h2>
          <button
            onClick={() => onNavigate('quran')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>View All 114 Surahs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={() => onOpenSurah(firstSurah)}
          className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs hover:border-emerald-700/40 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center font-bold text-emerald-900 text-lg">
              01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-stone-900">{firstSurah.name}</h3>
                <span className="font-arabic text-emerald-800 text-lg">{firstSurah.arabic}</span>
                {isFirstSurahRead && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Read
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {firstSurah.meaning} · {firstSurah.verses} Verses · {firstSurah.revelation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playFatihah}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Play Recitation"
            >
              <Play className="w-4 h-4 text-emerald-700 fill-emerald-700" />
              <span>Listen</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-emerald-700 transition-colors">
              <span>Deep Dive Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900">Explore Noor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('quran')}
            className="p-5 bg-white rounded-2xl border border-stone-200 text-left hover:border-emerald-700/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-stone-900 text-sm">Quran Hub</div>
            <div className="text-xs text-stone-500 mt-1">Recitation, Tajweed & Tafsir</div>
          </button>

          <button
            onClick={() => onNavigate('library')}
            className="p-5 bg-white rounded-2xl border border-stone-200 text-left hover:border-emerald-700/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="font-bold text-stone-900 text-sm">Hadith & Tafsir</div>
            <div className="text-xs text-stone-500 mt-1">Authenticated wisdom</div>
          </button>

          <button
            onClick={() => onNavigate('learn')}
            className="p-5 bg-white rounded-2xl border border-stone-200 text-left hover:border-emerald-700/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-bold text-stone-900 text-sm">Arabic Track</div>
            <div className="text-xs text-stone-500 mt-1">Alphabet & Glossary</div>
          </button>

          <button
            onClick={() => onNavigate('reels')}
            className="p-5 bg-white rounded-2xl border border-stone-200 text-left hover:border-emerald-700/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 fill-rose-800" />
            </div>
            <div className="font-bold text-stone-900 text-sm">Faith Reminders</div>
            <div className="text-xs text-stone-500 mt-1">Short vertical videos</div>
          </button>
        </div>
      </div>
    </div>
  );
}
