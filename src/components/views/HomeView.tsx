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
  Scroll,
} from 'lucide-react';
import { moods, reflections, surahs, type MoodId, type Surah } from '@/lib/content';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from '../AudioPlayerBar';
import { getSurahAudioUrl } from '@/lib/recitationAudio';
import { OrnamentedCard, SectionDivider, BorderedSubPanel } from '../Ornamentation';
import { PrayerTimesWidget } from '../PrayerTimesWidget';

export function HomeView({
  onNavigate,
  onOpenSurah,
  onPlayAudio,
}: {
  onNavigate: (tab: any) => void;
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
    <div className="space-y-8 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Top Banner / Streak & Greeting */}
      <OrnamentedCard className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-primary/95 border border-accent-gold/45 text-accent-gold text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <span>Daily Spiritual Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight">
              A few quiet moments can change the shape of a day.
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Welcome back to Noor. Ground your soul in the timeless rhythm of the Quran, authentic hadith, and gentle daily contemplation.
            </p>
          </div>

          <div className="bg-bg-primary/95 border border-accent-gold/50 rounded-2xl p-5 sm:p-6 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-14 h-14 rounded-xl bg-accent-gold/20 border border-accent-gold/50 flex items-center justify-center text-accent-gold shadow-xs">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-accent-gold font-semibold">
                Daily Habit
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-accent-gold">
                {streakDays} <span className="text-sm font-medium text-text-secondary">Days Active</span>
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                Returning to what nourishes you
              </div>
            </div>
          </div>
        </div>
      </OrnamentedCard>

      {/* Salat & Prayer Times Widget with Geolocation and Countdown */}
      <PrayerTimesWidget />

      {/* Situation / Mood Picker */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">How are you arriving today?</h2>
            <p className="text-sm sm:text-base text-text-secondary mt-0.5">
              Select your current spiritual or emotional state to receive an anchored reflection.
            </p>
          </div>
          <span className="text-xs sm:text-sm text-accent-gold font-semibold hidden sm:inline tracking-wider uppercase">
            Situation-Guided Verses
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {moods.map((m) => {
            const isSelected = m.id === mood;
            return (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all border font-medium ${
                  isSelected
                    ? 'bg-accent-gold/25 text-accent-gold border-accent-gold shadow-md font-semibold'
                    : 'bg-bg-card text-text-secondary border-accent-gold/30 hover:border-accent-gold hover:text-text-primary'
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
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent-gold bg-bg-primary/90 border border-accent-gold/35 px-3.5 py-1.5 rounded-full">
            <Sun className="w-4 h-4 text-accent-gold" />
            <span>Anchored Ayah · {moods.find((m) => m.id === mood)?.label}</span>
          </div>
          <span className="text-sm sm:text-base font-semibold text-accent-gold">{reflection.reference}</span>
        </div>

        {/* Arabic Calligraphy / Text */}
        <div className="py-5 text-center font-arabic text-3xl sm:text-4xl md:text-5xl text-accent-gold leading-[2.4] tracking-wide select-text">
          {reflection.arabic}
        </div>

        {/* English Translation */}
        <p className="text-center text-text-primary font-medium text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          "{reflection.translation}"
        </p>

        {/* Reflection Note */}
        <div className="pt-4 border-t border-accent-gold/25 max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {reflection.note}
          </p>
          {reflection.tafsirExcerpt && (
            <BorderedSubPanel className="text-sm text-text-primary text-left p-4">
              <span className="font-bold text-accent-gold block mb-1.5 text-xs uppercase tracking-wider">
                Tafsir Context
              </span>
              <p className="leading-relaxed text-sm text-text-secondary">{reflection.tafsirExcerpt}</p>
            </BorderedSubPanel>
          )}
        </div>

        {/* Interactive Reflection Journal Drawer */}
        <div className="pt-4 border-t border-accent-gold/25 max-w-3xl mx-auto">
          <BorderedSubPanel className="p-4 sm:p-5">
            <form onSubmit={handleSaveReflection} className="space-y-3.5">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span className="flex items-center gap-2 font-semibold text-accent-gold text-xs sm:text-sm uppercase tracking-wider">
                  <PenLine className="w-4 h-4" />
                  <span>Personal Contemplation Journal</span>
                </span>
                {journalSaved && (
                  <span className="text-accent-gold font-semibold flex items-center gap-1.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Saved to your private journal!
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="What does this verse stir in your heart today?"
                  className="flex-1 bg-bg-primary border border-accent-gold/45 rounded-xl px-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
                />
                <button
                  type="submit"
                  disabled={!journalText.trim()}
                  className="px-5 py-3 bg-accent-gold hover:bg-accent-gold-dim disabled:opacity-40 text-bg-primary rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm uppercase tracking-wider"
                >
                  <span>Save Note</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {userReflections.length > 0 && (
              <div className="mt-3.5 text-xs sm:text-sm text-text-muted flex items-center justify-between border-t border-accent-gold/20 pt-2.5">
                <span>{userReflections.length} personal reflection notes logged</span>
                <button
                  onClick={() => onNavigate('saved')}
                  className="text-accent-gold font-semibold hover:underline flex items-center gap-1"
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
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Continue Your Journey</h2>
          <button
            onClick={() => onNavigate('quran')}
            className="text-xs sm:text-sm text-accent-gold font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All 114 Surahs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <OrnamentedCard
          onClick={() => onOpenSurah(firstSurah)}
          className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-accent-gold transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-bg-primary border border-accent-gold/50 flex items-center justify-center font-bold text-accent-gold text-xl shadow-xs">
              01
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg sm:text-xl text-text-primary font-serif">{firstSurah.name}</h3>
                <span className="font-arabic text-accent-gold text-2xl">{firstSurah.arabic}</span>
                {isFirstSurahRead && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-gold/20 border border-accent-gold/45 text-accent-gold font-semibold flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Read
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-1">
                {firstSurah.meaning} · {firstSurah.verses} Verses · {firstSurah.revelation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playFatihah}
              className="px-3.5 py-2.5 rounded-xl bg-bg-primary hover:bg-bg-card text-text-primary border border-accent-gold/40 hover:border-accent-gold transition-colors flex items-center gap-2 text-sm font-semibold"
              title="Play Recitation"
            >
              <Play className="w-4 h-4 text-accent-gold fill-accent-gold" />
              <span>Listen</span>
            </button>
            <div className="px-4 py-2.5 rounded-xl bg-accent-gold text-bg-primary text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs hover:bg-accent-gold-dim transition-colors uppercase tracking-wider">
              <span>Deep Dive Guide</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </OrnamentedCard>
      </div>

      {/* Explore Grid */}
      <div className="space-y-3.5">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Explore Noor</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OrnamentedCard
            onClick={() => onNavigate('quran')}
            className="p-5 sm:p-6 text-left group cursor-pointer hover:border-accent-gold transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/45 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="font-bold text-text-primary text-base sm:text-lg">Quran Hub</div>
            <div className="text-sm text-text-secondary mt-1">Recitation, Tajweed & Tafsir</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('stories')}
            className="p-5 sm:p-6 text-left group cursor-pointer hover:border-accent-gold transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/45 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Scroll className="w-6 h-6" />
            </div>
            <div className="font-bold text-text-primary text-base sm:text-lg">Prophet Stories</div>
            <div className="text-sm text-text-secondary mt-1">Lives, wisdom & audio narration</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('library')}
            className="p-5 sm:p-6 text-left group cursor-pointer hover:border-accent-gold transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/45 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="font-bold text-text-primary text-base sm:text-lg">Hadith & Tafsir</div>
            <div className="text-sm text-text-secondary mt-1">Authenticated wisdom</div>
          </OrnamentedCard>

          <OrnamentedCard
            onClick={() => onNavigate('reels')}
            className="p-5 sm:p-6 text-left group cursor-pointer hover:border-accent-gold transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/45 text-accent-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Play className="w-6 h-6 fill-accent-gold text-accent-gold" />
            </div>
            <div className="font-bold text-text-primary text-base sm:text-lg">Faith Reminders</div>
            <div className="text-sm text-text-secondary mt-1">Short vertical videos</div>
          </OrnamentedCard>
        </div>
      </div>
    </div>
  );
}
