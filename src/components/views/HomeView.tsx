import { useState, useEffect, useCallback } from 'react';
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
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Scroll,
  RefreshCw,
  Sunrise,
  Sunset,
  Moon,
  RotateCcw,
  Share2,
  Check,
  Copy,
} from 'lucide-react';
import { moods, reflections, surahs, type MoodId, type Surah } from '@/lib/content';
import {
  getContextualGreetings,
  getInitialGreetingIndex,
  type DynamicGreeting,
} from '@/lib/dynamicGreetings';
import { dailyDhikrList, getDailyDhikrTip, type DailyDhikrItem } from '@/lib/dhikrData';
import {
  propheticBehaviors,
  getDailyPropheticBehavior,
  type PropheticBehaviorReflection,
} from '@/lib/shamailData';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from '../AudioPlayerBar';
import { getSurahAudioUrl } from '@/lib/recitationAudio';
import { OrnamentedCard, SectionDivider, BorderedSubPanel } from '../Ornamentation';
import { DailyInspirationTrioCard } from '../DailyInspirationTrioCard';
import { HomeSunnahReminderCard } from '../HomeSunnahReminderCard';
import { OfflineSanctuaryBanner } from '../OfflineSanctuaryBanner';
import { DailyPropheticConductCard } from '../DailyPropheticConductCard';

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
    readSurahs,
    userReflections,
    reciterId,
  } = useNoor();

  // Dynamic Greeting States (auto-advancing carousel, pause toggle, prev/next arrows)
  const [greetingPool, setGreetingPool] = useState<DynamicGreeting[]>(() => getContextualGreetings());
  const [greetingIndex, setGreetingIndex] = useState<number>(() => {
    const pool = getContextualGreetings();
    return getInitialGreetingIndex(pool.length);
  });
  const [isRotatingGreeting, setIsRotatingGreeting] = useState(false);
  const [isAutoCycleGreeting, setIsAutoCycleGreeting] = useState(true);
  const [greetingTimerProgress, setGreetingTimerProgress] = useState(0);

  // Periodically refresh pool so time of day stays up to date
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingPool(getContextualGreetings());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNextGreeting = useCallback(() => {
    setIsRotatingGreeting(true);
    setGreetingTimerProgress(0);
    setTimeout(() => {
      setGreetingIndex((prev) => (prev + 1) % greetingPool.length);
      setIsRotatingGreeting(false);
    }, 180);
  }, [greetingPool.length]);

  const handlePrevGreeting = useCallback(() => {
    setIsRotatingGreeting(true);
    setGreetingTimerProgress(0);
    setTimeout(() => {
      setGreetingIndex((prev) => (prev - 1 + greetingPool.length) % greetingPool.length);
      setIsRotatingGreeting(false);
    }, 180);
  }, [greetingPool.length]);

  const handleJumpGreeting = (idx: number) => {
    if (idx === greetingIndex) return;
    setIsRotatingGreeting(true);
    setGreetingTimerProgress(0);
    setTimeout(() => {
      setGreetingIndex(idx);
      setIsRotatingGreeting(false);
    }, 180);
  };

  // Smooth auto-advancing timer for the top reflection section (cycles every 16 seconds)
  useEffect(() => {
    if (!isAutoCycleGreeting) {
      setGreetingTimerProgress(0);
      return;
    }
    const stepMs = 250;
    const totalMs = 16000;
    const interval = setInterval(() => {
      setGreetingTimerProgress((prev) => {
        if (prev >= 100) {
          handleNextGreeting();
          return 0;
        }
        return prev + (stepMs / totalMs) * 100;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [isAutoCycleGreeting, handleNextGreeting]);

  const currentGreeting = greetingPool[greetingIndex % greetingPool.length] || greetingPool[0];

  const handlePlayGreetingAyah = (reference?: string) => {
    if (!reference) return;
    const audioUrl = getSurahAudioUrl(1, reciterId);
    onPlayAudio({
      title: 'Ayah of Inspiration',
      subtitle: reference,
      url: audioUrl,
      arabicSnippet: 'الْقُرْآنُ نُورٌ وَشِفَاءٌ',
    });
  };

  const getGreetingIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunrise':
        return <Sunrise className="w-4 h-4 text-accent-gold" />;
      case 'sunset':
        return <Sunset className="w-4 h-4 text-accent-gold" />;
      case 'moon':
        return <Moon className="w-4 h-4 text-accent-gold" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-accent-gold" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-accent-gold" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-accent-gold" />;
      case 'feather':
        return <FeatherIcon className="w-4 h-4 text-accent-gold" />;
      case 'sun':
      default:
        return <Sun className="w-4 h-4 text-accent-gold" />;
    }
  };

  // Daily Dhikr Tip State (Dynamic categories, interactive tasbih & auto-cycle)
  const [selectedDhikrCategory, setSelectedDhikrCategory] = useState<string>('All');
  const [dhikrOffset, setDhikrOffset] = useState(0);
  const [isRotatingDhikr, setIsRotatingDhikr] = useState(false);
  const [isAutoCycleDhikr, setIsAutoCycleDhikr] = useState(false);
  const [tasbihCounts, setTasbihCounts] = useState<Record<string, number>>({});
  const [copiedDhikrId, setCopiedDhikrId] = useState<string | null>(null);

  const dhikrCategories = [
    'All',
    'Light on the Tongue',
    'Morning & Evening',
    'Treasures of Paradise',
    'Forgiveness',
    'Protection',
    'Gratitude',
  ];

  const filteredDhikrList =
    selectedDhikrCategory === 'All'
      ? dailyDhikrList
      : dailyDhikrList.filter((d) => d.category === selectedDhikrCategory);

  const currentDhikr =
    filteredDhikrList[dhikrOffset % (filteredDhikrList.length || 1)] ||
    dailyDhikrList[0];
  const currentTasbihCount = tasbihCounts[currentDhikr.id] || 0;

  const handleNextDhikr = useCallback(() => {
    setIsRotatingDhikr(true);
    setTimeout(() => {
      setDhikrOffset((prev) => (prev + 1) % (filteredDhikrList.length || 1));
      setIsRotatingDhikr(false);
    }, 180);
  }, [filteredDhikrList.length]);

  const handlePrevDhikr = useCallback(() => {
    setIsRotatingDhikr(true);
    setTimeout(() => {
      setDhikrOffset(
        (prev) => (prev - 1 + (filteredDhikrList.length || 1)) % (filteredDhikrList.length || 1)
      );
      setIsRotatingDhikr(false);
    }, 180);
  }, [filteredDhikrList.length]);

  useEffect(() => {
    if (!isAutoCycleDhikr) return;
    const interval = setInterval(() => {
      handleNextDhikr();
    }, 18000);
    return () => clearInterval(interval);
  }, [isAutoCycleDhikr, handleNextDhikr]);

  const handleIncrementTasbih = (dhikrId: string) => {
    setTasbihCounts((prev) => {
      const cur = prev[dhikrId] || 0;
      return { ...prev, [dhikrId]: cur + 1 };
    });
  };

  const handleResetTasbih = (dhikrId: string) => {
    setTasbihCounts((prev) => ({ ...prev, [dhikrId]: 0 }));
  };

  const handleCopyDhikr = (d: DailyDhikrItem) => {
    navigator.clipboard.writeText(
      `${d.arabic}\n${d.transliteration}\n"${d.translation}"\nVirtue: ${d.virtue} (${d.source})`
    );
    setCopiedDhikrId(d.id);
    setTimeout(() => setCopiedDhikrId(null), 2000);
  };

  // Daily Prophetic Character Reflection State (Dynamic themes & rotation)
  const [shamailOffset, setShamailOffset] = useState(0);
  const [selectedShamailThemeId, setSelectedShamailThemeId] = useState<string>('All');
  const [isRotatingShamail, setIsRotatingShamail] = useState(false);
  const [copiedShamailId, setCopiedShamailId] = useState<string | null>(null);

  const shamailThemes = [
    { label: 'All Sunnahs', id: 'All' },
    { label: 'Speech & Listening', id: 'behavior-speech-listening' },
    { label: 'Patience in Anger', id: 'behavior-handling-wrong-anger' },
    { label: 'Humility at Home', id: 'behavior-home-humility' },
    { label: 'Mercy to Children', id: 'behavior-vulnerable-children' },
    { label: 'Radiant Smile', id: 'behavior-smiling-warmth' },
    { label: 'Grief & Tears', id: 'behavior-grief-tears' },
    { label: 'Generosity', id: 'behavior-generosity-giving' },
  ];

  const filteredShamailList =
    selectedShamailThemeId === 'All'
      ? propheticBehaviors
      : propheticBehaviors.filter((b) => b.id === selectedShamailThemeId);

  const currentShamail =
    filteredShamailList[shamailOffset % (filteredShamailList.length || 1)] ||
    propheticBehaviors[0];

  const handleNextShamail = () => {
    setIsRotatingShamail(true);
    setTimeout(() => {
      setShamailOffset((prev) => (prev + 1) % (filteredShamailList.length || 1));
      setIsRotatingShamail(false);
    }, 180);
  };

  const handlePrevShamail = () => {
    setIsRotatingShamail(true);
    setTimeout(() => {
      setShamailOffset(
        (prev) => (prev - 1 + (filteredShamailList.length || 1)) % (filteredShamailList.length || 1)
      );
      setIsRotatingShamail(false);
    }, 180);
  };

  const handleCopyShamail = (b: PropheticBehaviorReflection) => {
    navigator.clipboard.writeText(
      `Prophetic Conduct: ${b.themeTitle}\n"${b.hadithNarrative}"\nCitation: ${b.hadithCitation}\nQuranic Anchor: ${b.quranicFoundation.surahCitation}\nDaily Practice: ${b.dailyActionablePractice}`
    );
    setCopiedShamailId(b.id);
    setTimeout(() => setCopiedShamailId(null), 2000);
  };

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
      {/* Offline Sanctuary Alert Banner (shown when disconnected) */}
      <OfflineSanctuaryBanner
        onOpenSurahById={(num) => {
          const s = surahs.find((x) => x.number === num);
          if (s) onOpenSurah(s);
        }}
      />

      {/* Top Banner / Streak & Dynamic Greeting (Changes automatically & interactive controls) */}
      <OrnamentedCard className="p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle Golden Auto-Advance Timer Progress Bar */}
        <div className="w-full bg-accent-gold/15 h-1 rounded-full overflow-hidden mb-5">
          <div
            className="bg-gradient-to-r from-amber-400 to-accent-gold h-full transition-all duration-300"
            style={{ width: `${isAutoCycleGreeting ? greetingTimerProgress : 0}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            {/* Top row with Dynamic Time-of-Day Badge & Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-primary/95 border border-accent-gold/45 text-accent-gold text-xs sm:text-sm font-semibold tracking-wider shadow-2xs">
                {getGreetingIcon(currentGreeting.iconType)}
                <span>{currentGreeting.badge}</span>
              </div>

              {/* Prev / Next & Auto-Cycle Controls */}
              <div className="inline-flex items-center bg-bg-primary/90 border border-accent-gold/35 rounded-full p-0.5 shadow-2xs">
                <button
                  onClick={handlePrevGreeting}
                  title="Previous reflection"
                  className="p-1 text-accent-gold hover:bg-bg-card rounded-full transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsAutoCycleGreeting((prev) => !prev)}
                  title={isAutoCycleGreeting ? 'Pause auto-changing' : 'Resume auto-changing every 16s'}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-accent-gold hover:bg-bg-card rounded-full transition-all"
                >
                  {isAutoCycleGreeting ? (
                    <>
                      <Pause className="w-3 h-3 text-emerald-400" />
                      <span className="hidden sm:inline text-emerald-400/90 font-mono">Live · 16s</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span className="hidden sm:inline font-mono">Paused</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextGreeting}
                  title="Next reflection"
                  className="p-1 text-accent-gold hover:bg-bg-card rounded-full transition-colors active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Shuffle Button */}
              <button
                onClick={handleNextGreeting}
                title="Shuffle to another reflection"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-primary/80 hover:bg-bg-primary border border-accent-gold/35 hover:border-accent-gold text-accent-gold text-xs font-semibold tracking-wider transition-all active:scale-95 cursor-pointer shadow-2xs group"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 ${
                    isRotatingGreeting ? 'animate-spin' : ''
                  }`}
                />
                <span>Change</span>
                <span className="text-[10px] text-text-muted font-mono font-normal">
                  ({(greetingIndex % greetingPool.length) + 1}/{greetingPool.length})
                </span>
              </button>
            </div>

            {/* Dynamic Headline with Smooth Transition */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight transition-all duration-300 font-serif ${
                isRotatingGreeting ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {currentGreeting.headline}
            </h1>

            {/* Dynamic Subtext */}
            <p
              className={`text-text-secondary text-base sm:text-lg leading-relaxed transition-all duration-300 ${
                isRotatingGreeting ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {currentGreeting.subtext}
            </p>

            {/* Rooted Quran / Hadith citation with Instant Audio Play button */}
            {currentGreeting.ayahReference && (
              <div
                className={`pt-1 text-xs sm:text-sm transition-all duration-300 flex items-center justify-between gap-3 flex-wrap ${
                  isRotatingGreeting ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 text-accent-gold/90 font-serif italic">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold/70 shrink-0" />
                  <span>{currentGreeting.ayahReference}</span>
                </div>

                <button
                  onClick={() => handlePlayGreetingAyah(currentGreeting.ayahReference)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-gold/15 hover:bg-accent-gold/25 border border-accent-gold/30 text-accent-gold text-xs font-semibold tracking-wider transition-all cursor-pointer"
                  title="Listen to recitation of verse"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Recitation</span>
                </button>
              </div>
            )}

            {/* Pagination Dots for Direct Navigation */}
            <div className="flex items-center gap-1.5 pt-1">
              {greetingPool.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleJumpGreeting(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    (greetingIndex % greetingPool.length) === i
                      ? 'w-6 bg-accent-gold'
                      : 'w-1.5 bg-accent-gold/30 hover:bg-accent-gold/60'
                  }`}
                  title={`View reflection ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </OrnamentedCard>

      {/* Daily Inspiration Trio: Surah of the Day, Relatable Hadith & Prophetic Story */}
      <DailyInspirationTrioCard
        onOpenSurah={onOpenSurah}
        onNavigate={onNavigate}
        onPlayAudio={onPlayAudio}
      />

      {/* Daily Prophetic Sunnah Prayers (12 Rawatib) & Fasting Reminders */}
      <HomeSunnahReminderCard onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 1. DAILY DHIKR & INTERACTIVE TASBIH TIP (Dynamic Categories & Rotation)   */}
      {/* ========================================================================= */}
      <OrnamentedCard className="p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent-gold/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider border border-accent-gold/35">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Dhikr & Tasbih Tip</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-bg-primary text-text-secondary border border-accent-gold/20 font-semibold">
                {currentDhikr.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
              Nourishment for the Heart (أذكار وتسابيح اليوم)
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Auto-Cycle Dhikr Toggle */}
            <button
              onClick={() => setIsAutoCycleDhikr((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isAutoCycleDhikr
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                  : 'bg-bg-primary text-text-muted border-accent-gold/25 hover:text-text-primary hover:border-accent-gold/50'
              }`}
              title="Automatically rotate dhikr tip every 18 seconds"
            >
              {isAutoCycleDhikr ? (
                <>
                  <Pause className="w-3 h-3 text-emerald-400" />
                  <span>Auto (18s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-accent-gold" />
                  <span>Auto-Cycle</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCopyDhikr(currentDhikr)}
              className="p-2 text-text-secondary hover:text-accent-gold rounded-xl hover:bg-bg-primary transition-colors border border-accent-gold/25 cursor-pointer"
              title="Copy dhikr text and virtues"
            >
              {copiedDhikrId === currentDhikr.id ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <div className="inline-flex items-center bg-bg-primary/90 border border-accent-gold/30 rounded-xl p-0.5">
              <button
                onClick={handlePrevDhikr}
                className="p-1.5 text-accent-gold hover:bg-bg-card rounded-lg transition-colors cursor-pointer"
                title="Previous dhikr"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextDhikr}
                className="p-1.5 text-accent-gold hover:bg-bg-card rounded-lg transition-colors cursor-pointer"
                title="Next dhikr"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dhikr Category Chips Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {dhikrCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedDhikrCategory(cat);
                setDhikrOffset(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDhikrCategory === cat
                  ? 'bg-accent-gold text-bg-primary font-bold shadow-2xs'
                  : 'bg-bg-primary/80 text-text-secondary hover:text-text-primary border border-accent-gold/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Arabic Calligraphy Display */}
        <div
          className={`space-y-3 text-center transition-all duration-300 ${
            isRotatingDhikr ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          }`}
        >
          <div className="font-arabic text-2xl sm:text-3xl md:text-4xl text-accent-gold py-1 leading-loose tracking-wide">
            {currentDhikr.arabic}
          </div>
          <div className="text-sm sm:text-base font-serif italic text-text-primary">
            {currentDhikr.transliteration}
          </div>
          <div className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto">
            "{currentDhikr.translation}"
          </div>
        </div>

        {/* Virtue & Authentic Citation */}
        <BorderedSubPanel
          className={`p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-text-primary transition-all duration-300 ${
            isRotatingDhikr ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between text-accent-gold font-bold uppercase tracking-wider text-[11px]">
            <span>Prophetic Virtue & Reward:</span>
            <span className="font-mono text-text-muted text-[10px]">{currentDhikr.source}</span>
          </div>
          <p className="text-text-secondary leading-relaxed italic">
            "{currentDhikr.virtue}"
          </p>
          <div className="pt-2 border-t border-accent-gold/20 flex items-center gap-2 text-text-primary">
            <span className="text-accent-gold font-semibold text-[11px] uppercase tracking-wider">
              Tip:
            </span>
            <span className="text-xs text-text-secondary">{currentDhikr.practicalTip}</span>
          </div>
        </BorderedSubPanel>

        {/* Interactive Tasbih Counter */}
        <div className="p-4 rounded-2xl bg-bg-primary/95 border border-accent-gold/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-accent-gold uppercase tracking-wider flex items-center gap-1.5">
              <span>Interactive Tasbih Counter</span>
              {currentTasbihCount >= currentDhikr.countGoal && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Goal Completed ✓
                </span>
              )}
            </div>
            <div className="text-xs text-text-muted">
              Recommended Daily Target: <span className="font-bold text-accent-gold">{currentDhikr.countGoal} times</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleIncrementTasbih(currentDhikr.id)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-gold to-amber-400 hover:from-accent-gold-dim hover:to-amber-500 text-bg-primary font-bold text-base transition-all active:scale-95 shadow-md cursor-pointer select-none"
            >
              <span>Tap to Count</span>
              <span className="px-2.5 py-0.5 rounded-xl bg-bg-primary/20 text-bg-primary font-mono text-sm font-black">
                {currentTasbihCount} / {currentDhikr.countGoal}
              </span>
            </button>

            <button
              onClick={() => handleResetTasbih(currentDhikr.id)}
              title="Reset counter"
              className="p-3 text-text-secondary hover:text-accent-gold rounded-2xl hover:bg-bg-card transition-colors border border-accent-gold/30 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </OrnamentedCard>

      {/* ========================================================================= */}
      {/* 2. DAILY PROPHETIC BEHAVIOR & SUNNAH REFLECTION                           */}
      {/* ========================================================================= */}
      <OrnamentedCard className="p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent-gold/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/35">
                <Heart className="w-3.5 h-3.5 fill-emerald-300/30" />
                <span>Daily Prophetic Conduct</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-bg-primary text-text-secondary border border-accent-gold/20 font-semibold">
                Ash-Shama’il al-Muhammadiyyah
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
              Reflecting on His Living Behavior (أخلاق وشمائل النبي ﷺ)
            </h2>
            <p className="text-xs text-text-muted">
              Grounded in authentic Hadith: <span className="text-accent-gold italic">"His character was the Quran"</span> (Sahih Muslim #746). Timeless conduct over motivational slogans.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => handleCopyShamail(currentShamail)}
              className="p-2 text-text-secondary hover:text-accent-gold rounded-xl hover:bg-bg-primary transition-colors border border-accent-gold/25 cursor-pointer"
              title="Copy Prophetic reflection"
            >
              {copiedShamailId === currentShamail.id ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <div className="inline-flex items-center bg-bg-primary/90 border border-accent-gold/30 rounded-xl p-0.5">
              <button
                onClick={handlePrevShamail}
                className="p-1.5 text-accent-gold hover:bg-bg-card rounded-lg transition-colors cursor-pointer"
                title="Previous prophetic behavior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextShamail}
                className="p-1.5 text-accent-gold hover:bg-bg-card rounded-lg transition-colors cursor-pointer"
                title="Next prophetic behavior"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleNextShamail}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-bg-primary hover:bg-bg-card border border-accent-gold/35 hover:border-accent-gold text-accent-gold text-xs font-semibold tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs group"
              title="Reflect on another prophetic behavior"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 ${
                  isRotatingShamail ? 'animate-spin' : ''
                }`}
              />
              <span>Next</span>
              <span className="text-[10px] text-text-muted font-mono font-normal">
                ({(shamailOffset % filteredShamailList.length) + 1}/{filteredShamailList.length})
              </span>
            </button>
          </div>
        </div>

        {/* Why Through Hadith Callout Box */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary leading-relaxed">
            <span className="font-bold text-accent-gold">Why reflect through Hadith? </span>
            When Sayyidatuna ‘Aisha (RA) was asked about how Prophet Muhammad ﷺ behaved in daily life, she answered:{' '}
            <span className="font-semibold text-text-primary font-arabic">"كَانَ خُلُقُهُ الْقُرْآنَ"</span> —{' '}
            <span className="italic text-text-primary">"His character was the Quran"</span> (Sahih Muslim #746).
            Unlike modern motivational speakers whose speeches come and go, the Quran is the everlasting Book of Blessings, and authentic Hadith reveals how the Quran was lived every hour in real human reality.
          </div>
        </div>

        {/* Theme Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {shamailThemes.map((thm) => (
            <button
              key={thm.id}
              onClick={() => {
                setSelectedShamailThemeId(thm.id);
                setShamailOffset(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedShamailThemeId === thm.id
                  ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-400/60 shadow-2xs'
                  : 'bg-bg-primary/80 text-text-secondary hover:text-text-primary border border-accent-gold/25'
              }`}
            >
              {thm.label}
            </button>
          ))}
        </div>

        {/* Content with Smooth Transition */}
        <div
          className={`space-y-4 transition-all duration-300 ${
            isRotatingShamail ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          }`}
        >
          {/* Title & Arabic */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Today's Behavioral Focus:
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-serif mt-1">
              {currentShamail.themeTitle}
            </h3>
            <div className="text-xs font-arabic text-accent-gold/90 mt-0.5">
              {currentShamail.arabicTitle}
            </div>
          </div>

          {/* How He Personally Behaved */}
          <div className="p-4 rounded-2xl bg-bg-primary/80 border border-accent-gold/25 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <FeatherIcon className="w-3.5 h-3.5" />
              <span>How Prophet Muhammad ﷺ Behaved:</span>
            </div>
            <p className="text-sm sm:text-base text-text-primary leading-relaxed font-sans">
              {currentShamail.propheticBehavior}
            </p>
          </div>

          {/* Eyewitness Hadith Testimony */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center justify-between">
              <span>Companion Eyewitness Account:</span>
              <span className="text-accent-gold font-medium">{currentShamail.narratorCompanion}</span>
            </div>
            <BorderedSubPanel className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-text-primary italic">
              "{currentShamail.hadithNarrative}"
            </BorderedSubPanel>
            <div className="text-xs text-accent-gold/90 font-mono">
              Citation: {currentShamail.hadithCitation}
            </div>
          </div>

          {/* Quranic Foundation Verse */}
          <div className="p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-accent-gold uppercase tracking-wider">
              <span>The Quranic Anchor for This Behavior:</span>
              <span>{currentShamail.quranicFoundation.surahCitation}</span>
            </div>
            <div className="text-right text-base sm:text-lg font-arabic text-text-primary leading-relaxed">
              {currentShamail.quranicFoundation.verseText}
            </div>
            <p className="text-xs sm:text-sm text-text-secondary italic">
              "{currentShamail.quranicFoundation.translation}"
            </p>
          </div>

          {/* Walk in His Footsteps Today */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Embody His Sunnah Today:</span>
            </span>
            <p className="text-sm text-text-primary leading-relaxed">
              {currentShamail.dailyActionablePractice}
            </p>
            <p className="text-xs text-text-muted italic pt-1 border-t border-emerald-500/20">
              Contemplation: {currentShamail.reflectionQuestion}
            </p>
          </div>
        </div>
      </OrnamentedCard>

      {/* ========================================================================= */}
      {/* 3. CONDUCT FOR TODAY: WHAT ALLAH EXPECTS & RECONCILIATION FOR WRONGS      */}
      {/* ========================================================================= */}
      <DailyPropheticConductCard onPlayAudio={onPlayAudio} />

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
