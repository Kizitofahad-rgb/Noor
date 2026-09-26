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
import { OrnamentedCard, SectionDivider, BorderedSubPanel } from '../Ornamentation';

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
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-serif text-text-primary">
      {/* Top Banner / Streak & Greeting */}
      <OrnamentedCard className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary/90 border border-accent-gold/40 text-accent-gold text-xs label-caps">
              <span>Daily Spiritual Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight">
              A few quiet moments can change the shape of a day.
            </h1>
            <p className="text-text-primary/75 text-sm sm:text-base leading-relaxed">
              Welcome back to Noor. Ground your soul in the timeless rhythm of the Quran, authentic hadith, and gentle daily contemplation.
            </p>
          </div>

          <div className="bg-bg-primary/90 border border-accent-gold/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] label-caps text-accent-gold-dim font-medium">
                Daily Habit
              </div>
              <div className="text-2xl font-bold text-accent-gold">
                {streakDays} <span className="text-sm font-normal text-text-primary/70">Days Active</span>
              </div>
              <div className="text-[11px] text-text-primary/60 mt-0.5">
                Returning to what nourishes you
              </div>
            </div>
          </div>
        </div>
      </OrnamentedCard>

      {/* Situation / Mood Picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">How are you arriving today?</h2>
            <p className="text-xs text-text-primary/70">
              Select your current spiritual or emotional state to receive an anchored reflection.
            </p>
          </div>
          <span className="text-xs text-accent-gold font-serif hidden sm:inline label-caps">
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-bg-primary text-accent-gold border-accent-gold shadow-md scale-102 font-bold'
                    : 'bg-bg-card text-text-primary/80 border-accent-gold/30 hover:border-accent-gold hover:text-text-primary'
                }`}
              >
                <span className={isSelected ? 'text-accent-gold' : 'text-accent-gold-dim'}>
                  {getMoodIcon(m.icon)}
                </span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Reflection Card */}
      <OrnamentedCard className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-accent-gold/25">
          <div className="inline-flex items-center gap-2 text-xs label-caps text-accent-gold bg-bg-primary/80 border border-accent-gold/30 px-3 py-1 rounded-full">
            <Sun className="w-3.5 h-3.5 text-accent-gold" />
            <span>Anchored Ayah · {moods.find((m) => m.id === mood)?.label}</span>
          </div>
          <span className="text-xs font-serif text-accent-gold">{reflection.reference}</span>
        </div>

        {/* Arabic Calligraphy / Text */}
        <div className="py-4 text-center font-arabic text-3xl sm:text-4xl md:text-5xl text-accent-gold leading-[2.3] tracking-wide select-text">
          {reflection.arabic}
        </div>

        {/* English Translation */}
        <p className="text-center text-text-primary font-medium text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed italic">
          "{reflection.translation}"
        </p>

        {/* Reflection Note */}
        <div className="pt-4 border-t border-accent-gold/25 max-w-2xl mx-auto text-center space-y-3">
          <p className="text-xs sm:text-sm text-text-primary/80 leading-relaxed">
            {reflection.note}
          </p>
          {reflection.tafsirExcerpt && (
            <BorderedSubPanel className="text-xs text-text-primary/90 text-left">
              <span className="font-bold text-accent-gold block mb-1 label-caps">Tafsir Context</span>
              <p className="leading-relaxed">{reflection.tafsirExcerpt}</p>
            </BorderedSubPanel>
          )}
        </div>

        {/* Interactive Reflection Journal Drawer */}
        <div className="pt-4 border-t border-accent-gold/25 max-w-2xl mx-auto">
          <BorderedSubPanel>
            <form onSubmit={handleSaveReflection} className="space-y-3">
              <div className="flex items-center justify-between text-xs text-text-primary/80 font-serif">
                <span className="flex items-center gap-1.5 label-caps text-accent-gold">
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Personal Contemplation Journal</span>
                </span>
                {journalSaved && (
                  <span className="text-accent-gold font-serif flex items-center gap-1">
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
                  className="flex-1 bg-bg-primary border border-accent-gold/40 rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-primary/40 focus:outline-none focus:border-accent-gold font-serif"
                />
                <button
                  type="submit"
                  disabled={!journalText.trim()}
                  className="px-4 py-2.5 bg-accent-gold hover:bg-accent-gold-dim disabled:opacity-40 text-bg-primary rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs label-caps"
                >
                  <span>Save</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {userReflections.length > 0 && (
              <div className="mt-3 text-[11px] text-text-primary/60 flex items-center justify-between border-t border-accent-gold/20 pt-2">
                <span>{userReflections.length} personal reflection notes logged</span>
                <button
                  onClick={() => onNavigate('saved')}
                  className="text-accent-gold font-serif hover:underline"
                >
                  View Journal &rarr;
                </button>
              </div>
            )}
          </BorderedSubPanel>
        </div>
      </OrnamentedCard>

      <SectionDivider />

      {/* Continue Your Journey (Quran Card) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Continue Your Journey</h2>
          <button
            onClick={() => onNavigate('quran')}
            className="text-xs font-serif text-accent-gold hover:underline flex items-center gap-1 label-caps"
          >
            <span>View All 114 Surahs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <OrnamentedCard
          onClick={() => onOpenSurah(firstSurah)}
          className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/50 flex items-center justify-center font-bold text-accent-gold text-lg">
              01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-text-primary">{firstSurah.name}</h3>
                <span className="font-arabic text-accent-gold text-xl">{firstSurah.arabic}</span>
                {isFirstSurahRead && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gold/20 border border-accent-gold/40 text-accent-gold font-serif flex items-center gap-1 label-caps">
                    <CheckCircle2 className="w-3 h-3" /> Read
                  </span>
                )}
              </div>
              <p className="text-xs text-text-primary/70 mt-0.5">
                {firstSurah.meaning} · {firstSurah.verses} Verses · {firstSurah.revelation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playFatihah}
              className="p-2.5 rounded-xl bg-bg-primary hover:bg-bg-card text-text-primary border border-accent-gold/40 hover:border-accent-gold transition-colors flex items-center gap-1.5 text-xs font-serif"
              title="Play Recitation"
            >
              <Play className="w-4 h-4 text-accent-gold fill-accent-gold" />
              <span>Listen</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-accent-gold text-bg-primary text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-accent-gold-dim transition-colors label-caps">
              <span>Deep Dive Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </OrnamentedCard>
      </div>

      {/* Explore Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-text-primary">Explore Noor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OrnamentedCard
            onClick={() => onNavigate('quran')}
            className="p-5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-accent-gold/40 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-text-primary text-sm">Quran Hub</div>
            <div className="text-xs text-text-primary/65 mt-1">Recitation, Tajweed & Tafsir</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('library')}
            className="p-5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-accent-gold/40 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="font-bold text-text-primary text-sm">Hadith & Tafsir</div>
            <div className="text-xs text-text-primary/65 mt-1">Authenticated wisdom</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('learn')}
            className="p-5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-accent-gold/40 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-bold text-text-primary text-sm">Arabic Track</div>
            <div className="text-xs text-text-primary/65 mt-1">Alphabet & Glossary</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('reels')}
            className="p-5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-accent-gold/40 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 fill-accent-gold" />
            </div>
            <div className="font-bold text-text-primary text-sm">Faith Reminders</div>
            <div className="text-xs text-text-primary/65 mt-1">Short vertical videos</div>
          </OrnamentedCard>
        </div>
      </div>
    </div>
  );
}
