import React, { useState } from 'react';
import {
  BookOpen,
  Scroll,
  Sparkles,
  Volume2,
  Play,
  Pause,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  Wind,
  Layers,
  Heart,
  Flame,
} from 'lucide-react';
import {
  weeklyInspirations,
  getInspirationForDay,
  type DailyInspirationItem,
} from '../lib/dailyInspirationData';
import { surahs, type Surah } from '../lib/content';
import { useNoor } from '../context/NoorContext';
import { getSurahAudioUrl } from '../lib/recitationAudio';
import { playUniversalDua } from '../lib/spatialAudio3d';
import type { ActiveAudioState } from './AudioPlayerBar';
import { OrnamentedCard, BorderedSubPanel, CornerFlourishes } from './Ornamentation';

interface DailyInspirationTrioCardProps {
  onOpenSurah?: (surah: Surah) => void;
  onNavigate?: (tab: any) => void;
  onPlayAudio?: (state: ActiveAudioState) => void;
}

export function DailyInspirationTrioCard({
  onOpenSurah,
  onNavigate,
  onPlayAudio,
}: DailyInspirationTrioCardProps) {
  const { reciterId } = useNoor();
  const currentCalendarDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentCalendarDay);
  const [activeTab, setActiveTab] = useState<'all' | 'surah' | 'hadith' | 'story'>('all');
  const [copiedHadith, setCopiedHadith] = useState<boolean>(false);
  const [isPlayingHadithAudio, setIsPlayingHadithAudio] = useState<boolean>(false);

  const currentInspiration = getInspirationForDay(selectedDayIndex);

  // Look up full Surah object from all 114 Surahs library
  const fullSurahObj = surahs.find((s) => s.number === currentInspiration.surah.number);

  // Handler to open full Surah in Quran reader
  const handleReadSurah = () => {
    if (fullSurahObj && onOpenSurah) {
      onOpenSurah(fullSurahObj);
    } else if (onNavigate) {
      onNavigate('quran');
    }
  };

  // Handler to stream Surah Tilawah audio
  const handlePlaySurahAudio = () => {
    if (!onPlayAudio) return;
    const audioUrl = getSurahAudioUrl(currentInspiration.surah.number, reciterId);
    onPlayAudio({
      title: `Surah ${currentInspiration.surah.name}`,
      subtitle: `${currentInspiration.surah.englishMeaning} · Qari ${reciterId}`,
      url: audioUrl,
      arabicSnippet: currentInspiration.surah.arabicName,
    });
  };

  // Handler to listen to Hadith recitation with sacred harmonic chime
  const handlePlayHadithVoice = () => {
    if (isPlayingHadithAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingHadithAudio(false);
    } else {
      setIsPlayingHadithAudio(true);
      playUniversalDua(
        {
          arabic: currentInspiration.hadith.arabic,
          transliteration: currentInspiration.hadith.transliteration,
          translation: currentInspiration.hadith.translation,
          title: currentInspiration.hadith.title,
        },
        (isPlaying) => setIsPlayingHadithAudio(isPlaying)
      );
    }
  };

  // Handler to copy Hadith text
  const handleCopyHadith = () => {
    const text = `${currentInspiration.hadith.title}\n\n${currentInspiration.hadith.arabic}\n\n"${currentInspiration.hadith.translation}"\n\n— Narrated by: ${currentInspiration.hadith.narrator}\nSource: ${currentInspiration.hadith.source}`;
    navigator.clipboard.writeText(text);
    setCopiedHadith(true);
    setTimeout(() => setCopiedHadith(false), 2000);
  };

  // Handler to navigate to story
  const handleOpenStory = () => {
    if (onNavigate) {
      onNavigate('stories');
    }
  };

  return (
    <OrnamentedCard className="p-6 sm:p-8 space-y-6">
      <CornerFlourishes size={14} opacity={0.65} />

      {/* Header: Title & Days of the Week Selector */}
      <div className="space-y-4 border-b border-accent-gold/20 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider border border-accent-gold/35 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
              <span>Daily Prophetic Inspiration Trio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary tracking-tight">
              Surah, Relatable Hadith & Story for {currentInspiration.dayName}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
              {currentInspiration.themeDescription}
            </p>
          </div>

          <div className="self-start md:self-auto flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-bg-primary/90 border border-accent-gold/40 text-accent-gold font-bold text-xs uppercase tracking-wider font-mono">
              {currentInspiration.badge}
            </span>
          </div>
        </div>

        {/* Days of the Week Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {weeklyInspirations.map((item) => {
            const isToday = item.dayIndex === currentCalendarDay;
            const isSelected = item.dayIndex === selectedDayIndex;

            return (
              <button
                key={item.dayIndex}
                onClick={() => setSelectedDayIndex(item.dayIndex)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-accent-gold text-bg-primary font-bold shadow-md shadow-accent-gold/20 scale-[1.02]'
                    : isToday
                    ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/40 hover:bg-accent-gold/25'
                    : 'bg-bg-primary/80 text-text-secondary hover:text-text-primary border border-accent-gold/20 hover:border-accent-gold/40'
                }`}
              >
                <span>{item.dayName}</span>
                {isToday && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-bg-primary/20 text-bg-primary'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section View Tabs */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 bg-bg-primary/90 p-1 rounded-xl border border-accent-gold/30 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              All 3 Pillars
            </button>
            <button
              onClick={() => setActiveTab('surah')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'surah'
                  ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Surah Only
            </button>
            <button
              onClick={() => setActiveTab('hadith')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'hadith'
                  ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Hadith Only
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Story Only
            </button>
          </div>

          <span className="text-xs text-accent-gold/90 font-serif italic hidden sm:inline">
            "{currentInspiration.theme}"
          </span>
        </div>
      </div>

      {/* Main Grid: Surah, Hadith & Story */}
      <div
        className={`grid gap-6 ${
          activeTab === 'all'
            ? 'grid-cols-1 lg:grid-cols-3'
            : 'grid-cols-1 max-w-3xl mx-auto'
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. SURAH OF THE DAY */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'surah') && (
          <div className="rounded-2xl border-2 border-accent-gold/45 bg-gradient-to-br from-bg-card via-bg-card/95 to-bg-primary p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all">
            <div className="space-y-4">
              {/* Badge & Number */}
              <div className="flex items-center justify-between border-b border-accent-gold/20 pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Surah of the Day</span>
                </div>
                <span className="text-xs font-mono font-bold text-accent-gold bg-accent-gold/15 px-2 py-0.5 rounded">
                  Ch. #{currentInspiration.surah.number}
                </span>
              </div>

              {/* Title & Arabic Snippet */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold font-serif text-text-primary tracking-tight">
                    Surah {currentInspiration.surah.name}
                  </h3>
                  <span className="font-arabic text-3xl font-bold text-accent-gold" dir="rtl">
                    {currentInspiration.surah.arabicName}
                  </span>
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {currentInspiration.surah.englishMeaning} · {currentInspiration.surah.versesCount} Verses ·{' '}
                  <span className="text-accent-gold font-medium">{currentInspiration.surah.revelation}</span>
                </div>
              </div>

              {/* Why Read Today */}
              <div className="p-3.5 rounded-xl bg-accent-gold/10 border border-accent-gold/25 space-y-1">
                <div className="text-[11px] font-bold text-accent-gold uppercase tracking-wider">
                  Why Read on {currentInspiration.dayName}:
                </div>
                <p className="text-xs text-text-primary leading-relaxed">
                  {currentInspiration.surah.whyReadToday}
                </p>
              </div>

              {/* Featured Key Verse */}
              <div className="p-4 rounded-xl bg-bg-primary/90 border border-accent-gold/30 space-y-2">
                <div className="text-right font-arabic text-lg sm:text-xl text-accent-gold font-bold leading-loose dir-rtl">
                  {currentInspiration.surah.featuredAyah.arabic}
                </div>
                <div className="text-xs text-accent-gold/90 font-mono italic">
                  {currentInspiration.surah.featuredAyah.transliteration}
                </div>
                <div className="text-xs text-text-primary leading-relaxed">
                  "{currentInspiration.surah.featuredAyah.translation}"
                </div>
                <div className="text-[10px] text-text-muted text-right font-mono">
                  {currentInspiration.surah.featuredAyah.citation}
                </div>
              </div>

              {/* Spiritual Virtues */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Spiritual Virtues:
                </div>
                <ul className="space-y-1">
                  {currentInspiration.surah.spiritualBenefits.map((b, i) => (
                    <li key={i} className="text-xs text-text-muted flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions for Surah */}
            <div className="pt-4 border-t border-accent-gold/20 flex items-center gap-2">
              <button
                onClick={handleReadSurah}
                className="flex-1 py-2.5 px-3 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Surah</span>
              </button>

              <button
                onClick={handlePlaySurahAudio}
                className="py-2.5 px-3 rounded-xl bg-bg-card hover:bg-bg-primary border border-accent-gold/40 text-accent-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Stream recitation audio"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">Listen</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. RELATABLE HADITH OF THE DAY */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'hadith') && (
          <div className="rounded-2xl border-2 border-accent-gold/45 bg-gradient-to-br from-bg-card via-bg-card/95 to-bg-primary p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all">
            <div className="space-y-4">
              {/* Badge & Source */}
              <div className="flex items-center justify-between border-b border-accent-gold/20 pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/35 text-sky-300 text-[11px] font-bold uppercase tracking-wider">
                  <Scroll className="w-3.5 h-3.5" />
                  <span>Relatable Hadith</span>
                </div>
                <span className="text-[11px] font-mono text-text-muted truncate max-w-[150px]">
                  {currentInspiration.hadith.source}
                </span>
              </div>

              {/* Title & Narrator */}
              <div>
                <h3 className="text-xl font-bold font-serif text-text-primary tracking-tight">
                  {currentInspiration.hadith.title}
                </h3>
                <div className="text-xs text-accent-gold font-medium mt-0.5">
                  Narrated by: {currentInspiration.hadith.narrator}
                </div>
              </div>

              {/* Arabic Text */}
              <div className="p-4 rounded-xl bg-bg-primary/90 border border-accent-gold/30 text-right">
                <p className="font-arabic text-base sm:text-lg text-accent-gold font-bold leading-loose dir-rtl">
                  {currentInspiration.hadith.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Prophetic Words:
                </div>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-serif italic">
                  "{currentInspiration.hadith.translation}"
                </p>
              </div>

              {/* Why Relatable Today */}
              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-1">
                <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-sky-400" />
                  <span>Why It Speaks to You Today:</span>
                </div>
                <p className="text-xs text-sky-100 leading-relaxed">
                  {currentInspiration.hadith.whyRelatableToday}
                </p>
              </div>

              {/* Actionable Practice */}
              <div className="p-3 rounded-xl bg-bg-card border border-accent-gold/25 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-text-secondary leading-snug">
                  <span className="font-bold text-text-primary">Today’s Action: </span>
                  {currentInspiration.hadith.actionableTakeaway}
                </div>
              </div>
            </div>

            {/* Actions for Hadith */}
            <div className="pt-4 border-t border-accent-gold/20 flex items-center gap-2">
              <button
                onClick={handlePlayHadithVoice}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingHadithAudio
                    ? 'bg-accent-gold text-bg-primary font-bold shadow-md animate-pulse'
                    : 'bg-bg-card hover:bg-bg-primary border border-accent-gold/40 text-accent-gold'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingHadithAudio ? 'Listening...' : 'Listen with Chime'}</span>
              </button>

              <button
                onClick={handleCopyHadith}
                className="py-2.5 px-3 rounded-xl bg-bg-card hover:bg-bg-primary border border-accent-gold/40 text-text-secondary hover:text-accent-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy hadith text"
              >
                {copiedHadith ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedHadith ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. RELATABLE PROPHETIC STORY OF THE DAY */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'story') && (
          <div className="rounded-2xl border-2 border-accent-gold/45 bg-gradient-to-br from-bg-card via-bg-card/95 to-bg-primary p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all">
            <div className="space-y-4">
              {/* Badge & Era */}
              <div className="flex items-center justify-between border-b border-accent-gold/20 pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/15 border border-orange-500/35 text-orange-300 text-[11px] font-bold uppercase tracking-wider">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Story of the Day</span>
                </div>
                <span className="text-[11px] font-mono text-text-muted truncate max-w-[150px]">
                  {currentInspiration.story.historicalEra}
                </span>
              </div>

              {/* Prophet Name & Title */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold font-serif text-text-primary tracking-tight">
                    {currentInspiration.story.prophetName}
                  </h3>
                  <span className="font-arabic text-xl font-bold text-accent-gold">
                    {currentInspiration.story.arabicName}
                  </span>
                </div>
                <p className="text-xs text-accent-gold font-serif italic mt-0.5">
                  "{currentInspiration.story.title}"
                </p>
              </div>

              {/* Pivotal Dramatic Climax */}
              <div className="p-4 rounded-xl bg-bg-primary/90 border border-accent-gold/30 space-y-1.5">
                <div className="text-[11px] font-bold text-accent-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>The Pivotal Moment:</span>
                </div>
                <p className="text-xs text-text-primary leading-relaxed font-medium">
                  {currentInspiration.story.pivotalClimax}
                </p>
              </div>

              {/* Moral Wisdom */}
              <div className="p-3.5 rounded-xl bg-accent-gold/10 border border-accent-gold/25 space-y-1">
                <div className="text-[11px] font-bold text-accent-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-accent-gold" />
                  <span>Timeless Moral Wisdom:</span>
                </div>
                <p className="text-xs text-text-primary leading-relaxed">
                  {currentInspiration.story.moralWisdom}
                </p>
              </div>

              {/* Why Relatable Today */}
              <div className="text-xs text-text-muted leading-relaxed italic bg-bg-card/70 p-3 rounded-xl border border-accent-gold/20">
                <span className="font-bold text-text-secondary not-italic">Connection to Today: </span>
                {currentInspiration.story.whyRelatableToday}
              </div>
            </div>

            {/* Actions for Story */}
            <div className="pt-4 border-t border-accent-gold/20 flex items-center gap-2">
              <button
                onClick={handleOpenStory}
                className="flex-1 py-2.5 px-3 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Read in Chronicles</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenStory}
                className="py-2.5 px-3 rounded-xl bg-bg-card hover:bg-bg-primary border border-accent-gold/40 text-accent-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Experience story with 3D spatial audio & atmospheric wind"
              >
                <Wind className="w-4 h-4" />
                <span className="hidden sm:inline">3D Audio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </OrnamentedCard>
  );
}
