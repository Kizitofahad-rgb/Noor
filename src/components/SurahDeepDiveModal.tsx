import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Type,
  Palette,
  Volume2,
  RotateCcw,
} from 'lucide-react';
import type { Surah } from '@/lib/content';
import { verses } from '@/lib/content';
import { tajweedStyles } from '@/lib/tajweed';
import { getVerseAudioUrl, getSurahAudioUrl } from '@/lib/recitationAudio';
import { fetchSurahFromAlQuranCloud, type RemoteAyah } from '@/lib/quranApi';
import { useNoor } from '@/context/NoorContext';
import { useAuth } from '@/context/AuthContext';
import type { ActiveAudioState } from './AudioPlayerBar';
import { CornerFlourishes, BorderedSubPanel } from './Ornamentation';

type ViewMode = 'study' | 'mushaf' | 'translation';
type ReadingTheme = 'emerald' | 'parchment' | 'obsidian' | 'sapphire';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export function SurahDeepDiveModal({
  surah,
  onClose,
  onPlayAudio,
}: {
  surah: Surah;
  onClose: () => void;
  onPlayAudio: (state: ActiveAudioState) => void;
}) {
  const { savedItems, toggleSaved, markSurahRead, reciterId } = useNoor();
  const { user, saveProgress, userProgress, openAuthModal, refreshProgress } = useAuth();

  // Reading Experience States
  const [activeTab, setActiveTab] = useState<'study' | 'overview'>('study');
  const [viewMode, setViewMode] = useState<ViewMode>('study');
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>('emerald');
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isZenFocus, setIsZenFocus] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [expandedTafsir, setExpandedTafsir] = useState<number | null>(null);
  const [activeVerseHighlight, setActiveVerseHighlight] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const isSurahPracticedInDb = userProgress.some(
    (p) => String(p.surahId) === String(surah.number) && !p.verseId
  );

  const handleMarkSurahPracticed = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    await saveProgress(surah.number, undefined, 'practiced');
    markSurahRead(String(surah.number));
  };

  const handleToggleVersePracticed = async (verseNum: number) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const existing = userProgress.find(
      (p) => String(p.surahId) === String(surah.number) && String(p.verseId) === String(verseNum)
    );
    if (existing) {
      try {
        await fetch(`/api/progress/${existing.id}`, { method: 'DELETE' });
        await refreshProgress();
      } catch (e) {
        console.error('Failed to toggle verse progress:', e);
      }
    } else {
      await saveProgress(surah.number, verseNum, 'practiced');
    }
  };

  // Local curated verses (for featured surahs with word-by-word Tajweed & reflections)
  const surahVerses = verses.filter((v) => v.surahId === surah.id);

  // Remote keyless verses from Al-Quran Cloud API for complete chapters
  const [remoteAyahs, setRemoteAyahs] = useState<RemoteAyah[]>([]);
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);
  const [remoteError, setRemoteError] = useState(false);

  useEffect(() => {
    if (surahVerses.length === 0) {
      let isMounted = true;
      setIsLoadingRemote(true);
      setRemoteError(false);

      fetchSurahFromAlQuranCloud(surah.number)
        .then((ayahs) => {
          if (isMounted) {
            setRemoteAyahs(ayahs);
            setIsLoadingRemote(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setRemoteError(true);
            setIsLoadingRemote(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [surah.number, surahVerses.length]);

  const isSurahSaved = savedItems.includes(`surah-${surah.id}`);

  const playFullSurah = () => {
    markSurahRead(surah.id);
    const url = getSurahAudioUrl(surah.number, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name} (Complete)`,
      subtitle: `${surah.verses} Verses · Full Recitation`,
      url,
      arabicSnippet: surah.arabic,
    });
  };

  const playVerse = (verseNumber: number, fallbackArabic?: string, fallbackTranslation?: string) => {
    setActiveVerseHighlight(verseNumber);
    const v = surahVerses.find((item) => item.number === verseNumber);
    const url = getVerseAudioUrl(surah.number, verseNumber, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name} · Ayah ${verseNumber}`,
      subtitle: v?.simpleMeaning || fallbackTranslation || 'Verse recitation',
      url,
      arabicSnippet: v?.arabic || fallbackArabic || surah.arabic,
    });
  };

  // Auto-collapse header when user scrolls down to read
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    if (currentScrollTop > 80 && currentScrollTop > lastScrollTop.current) {
      if (!isHeaderCollapsed) setIsHeaderCollapsed(true);
    } else if (currentScrollTop < 50 || currentScrollTop < lastScrollTop.current - 40) {
      if (isHeaderCollapsed && currentScrollTop < 50) setIsHeaderCollapsed(false);
    }
    lastScrollTop.current = currentScrollTop;
  };

  const totalVersesDisplay = surahVerses.length || remoteAyahs.length || surah.verses;

  // Theme styling dictionaries
  const themeStyles: Record<ReadingTheme, {
    bg: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    arabicText: string;
    accent: string;
    border: string;
    subpanelBg: string;
    highlight: string;
  }> = {
    emerald: {
      bg: 'bg-[#031710]',
      cardBg: 'bg-[#08291D]',
      textPrimary: 'text-[#FCF9F2]',
      textSecondary: 'text-[#CFC4AE]',
      arabicText: 'text-[#E5C365]',
      accent: 'text-[#E5C365]',
      border: 'border-[#E5C365]/35',
      subpanelBg: 'bg-[#062017]',
      highlight: 'bg-[#E5C365]/15 border-[#E5C365]',
    },
    parchment: {
      bg: 'bg-[#FBF7EE]',
      cardBg: 'bg-[#F3EBD8]',
      textPrimary: 'text-[#1F180E]',
      textSecondary: 'text-[#5C4D35]',
      arabicText: 'text-[#1F160E]',
      accent: 'text-[#8A5A12]',
      border: 'border-[#C8B084]',
      subpanelBg: 'bg-[#EDE2CA]',
      highlight: 'bg-[#D4AF37]/25 border-[#8A5A12]',
    },
    obsidian: {
      bg: 'bg-[#000000]',
      cardBg: 'bg-[#0F0F0F]',
      textPrimary: 'text-[#F5F5F5]',
      textSecondary: 'text-[#A3A3A3]',
      arabicText: 'text-[#F59E0B]',
      accent: 'text-[#F59E0B]',
      border: 'border-[#F59E0B]/30',
      subpanelBg: 'bg-[#171717]',
      highlight: 'bg-[#F59E0B]/20 border-[#F59E0B]',
    },
    sapphire: {
      bg: 'bg-[#060D1E]',
      cardBg: 'bg-[#0E1D3D]',
      textPrimary: 'text-[#F0F6FC]',
      textSecondary: 'text-[#94A3B8]',
      arabicText: 'text-[#38BDF8]',
      accent: 'text-[#38BDF8]',
      border: 'border-[#38BDF8]/35',
      subpanelBg: 'bg-[#09152E]',
      highlight: 'bg-[#38BDF8]/20 border-[#38BDF8]',
    },
  };

  const currentTheme = themeStyles[readingTheme];

  const arabicFontSizeClass = {
    sm: 'text-2xl sm:text-3xl leading-[2.4]',
    md: 'text-3xl sm:text-4xl leading-[2.6]',
    lg: 'text-4xl sm:text-5xl leading-[2.8]',
    xl: 'text-5xl sm:text-6xl leading-[3.1]',
  }[fontSize];

  const translationFontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-relaxed',
  }[fontSize];

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isFullScreen
          ? 'w-screen h-screen p-0 bg-black/95'
          : 'bg-black/85 backdrop-blur-md flex justify-center items-center p-2 sm:p-4'
      }`}
    >
      <div
        className={`w-full flex flex-col overflow-hidden relative shadow-2xl transition-all duration-300 ${
          isFullScreen
            ? 'h-screen max-w-none rounded-none border-none'
            : 'max-w-5xl h-[95vh] rounded-3xl border border-accent-gold/40'
        } ${currentTheme.bg} ${currentTheme.textPrimary}`}
      >
        <CornerFlourishes opacity={readingTheme === 'parchment' ? 0.2 : 0.5} />

        {/* 1. SLIM MINIMAL FLOATING BAR (Active in Zen Focus Mode or when scrolling down) */}
        {(isZenFocus || isHeaderCollapsed) && (
          <header className={`sticky top-0 z-40 px-4 sm:px-6 py-2.5 backdrop-blur-md border-b flex items-center justify-between gap-3 shadow-md transition-all duration-200 ${
            currentTheme.cardBg
          } ${currentTheme.border}`}>
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border ${
                currentTheme.accent
              } ${currentTheme.border} ${currentTheme.subpanelBg}`}>
                {surah.number}
              </span>
              <div className="min-w-0 flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base font-serif truncate">
                  {surah.name}
                </span>
                <span className="font-arabic text-lg sm:text-xl px-1 font-bold">
                  {surah.arabic}
                </span>
                <span className="text-[11px] opacity-75 hidden md:inline">
                  · {totalVersesDisplay} Verses
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Audio Listen */}
              <button
                onClick={playFullSurah}
                title="Play full chapter recitation"
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-transform active:scale-95 ${
                  currentTheme.border
                } ${currentTheme.subpanelBg} hover:opacity-90`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Play Surah</span>
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border rounded-xl p-0.5 text-xs">
                {(['study', 'mushaf'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold transition-all ${
                      viewMode === mode
                        ? `${currentTheme.subpanelBg} ${currentTheme.accent} font-bold shadow-xs`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {mode === 'study' ? 'Verses' : 'Mushaf'}
                  </button>
                ))}
              </div>

              {/* Zen / Focus Toggle */}
              <button
                onClick={() => {
                  setIsZenFocus(!isZenFocus);
                  if (isHeaderCollapsed) setIsHeaderCollapsed(false);
                }}
                title={isZenFocus ? 'Exit Zen Reading Mode' : 'Immersive Zen Focus Mode'}
                className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-semibold transition-colors ${
                  isZenFocus
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold'
                    : `${currentTheme.border} ${currentTheme.subpanelBg} hover:opacity-100`
                }`}
              >
                {isZenFocus ? <EyeOff className="w-4 h-4 text-emerald-300" /> : <Eye className="w-4 h-4" />}
                <span className="hidden lg:inline">{isZenFocus ? 'Exit Focus' : 'Focus'}</span>
              </button>

              {/* Expand Header Button (if collapsed by scroll) */}
              {isHeaderCollapsed && !isZenFocus && (
                <button
                  onClick={() => setIsHeaderCollapsed(false)}
                  title="Expand headers"
                  className={`p-2 rounded-xl border text-xs ${currentTheme.border} ${currentTheme.subpanelBg}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                title={isFullScreen ? 'Exit full screen' : 'Expand full screen'}
                className={`p-2 rounded-xl border ${currentTheme.border} ${currentTheme.subpanelBg} hover:opacity-90 hidden sm:flex`}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                title="Close reader"
                className={`p-2 rounded-xl border hover:opacity-80 transition-colors ${currentTheme.border} ${currentTheme.subpanelBg}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>
        )}

        {/* 2. FULL EXPANDED HEADER & TOOLBAR (Moves away on scroll or when Zen Focus is on) */}
        {!isZenFocus && !isHeaderCollapsed && (
          <header className={`shrink-0 border-b transition-all duration-300 ${currentTheme.cardBg} ${currentTheme.border}`}>
            {/* Main Header Bar */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 border-b border-inherit">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center font-bold text-lg sm:text-2xl shadow-sm shrink-0 ${
                  currentTheme.subpanelBg
                } ${currentTheme.border} ${currentTheme.accent}`}>
                  {surah.number}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-serif">
                      Surah {surah.name}
                    </h1>
                    <span className={`font-arabic text-2xl sm:text-3xl font-bold px-1.5 ${currentTheme.arabicText}`}>
                      {surah.arabic}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                      currentTheme.subpanelBg
                    } ${currentTheme.border} ${currentTheme.accent}`}>
                      {surah.revelation}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${currentTheme.textSecondary}`}>
                    {surah.meaning} · {surah.verses} Verses · Revelation #{surah.revelationOrder}
                  </p>
                </div>
              </div>

              {/* Top Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaved(`surah-${surah.id}`)}
                  title="Bookmark Surah"
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSurahSaved
                      ? 'bg-accent-gold/20 border-accent-gold text-accent-gold'
                      : `${currentTheme.border} ${currentTheme.subpanelBg} opacity-85 hover:opacity-100`
                  }`}
                >
                  {isSurahSaved ? <BookmarkCheck className="w-5 h-5 text-accent-gold" /> : <Bookmark className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsZenFocus(true)}
                  title="Activate Immersive Focus Mode (Hides surrounding menus)"
                  className="px-3.5 py-2.5 rounded-xl border border-accent-gold/50 bg-accent-gold/15 text-accent-gold hover:bg-accent-gold/25 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Zen Focus Mode</span>
                </button>

                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  title={isFullScreen ? 'Windowed mode' : 'Full screen canvas'}
                  className={`p-2.5 rounded-xl border transition-colors hidden sm:flex ${currentTheme.border} ${currentTheme.subpanelBg}`}
                >
                  {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={onClose}
                  title="Exit Surah"
                  className={`p-2.5 rounded-xl border hover:opacity-75 transition-colors ${currentTheme.border} ${currentTheme.subpanelBg}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reading Toolbar & Settings Subheader */}
            <div className={`px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm ${currentTheme.subpanelBg}`}>
              {/* Tab Selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`flex items-center border rounded-xl p-1 ${currentTheme.border} ${currentTheme.cardBg}`}>
                  <button
                    onClick={() => setActiveTab('study')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'study'
                        ? `${currentTheme.subpanelBg} ${currentTheme.accent} border ${currentTheme.border} shadow-xs`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    Holy Verses ({totalVersesDisplay})
                  </button>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'overview'
                        ? `${currentTheme.subpanelBg} ${currentTheme.accent} border ${currentTheme.border} shadow-xs`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    Theme & Revelation Context
                  </button>
                </div>

                {activeTab === 'study' && (
                  <div className={`flex items-center border rounded-xl p-1 ${currentTheme.border} ${currentTheme.cardBg}`}>
                    <button
                      onClick={() => setViewMode('study')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        viewMode === 'study'
                          ? `${currentTheme.subpanelBg} ${currentTheme.accent} font-bold`
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      Verse Cards
                    </button>
                    <button
                      onClick={() => setViewMode('mushaf')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        viewMode === 'mushaf'
                          ? `${currentTheme.subpanelBg} ${currentTheme.accent} font-bold`
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      Mushaf Tilawah
                    </button>
                    <button
                      onClick={() => setViewMode('translation')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hidden sm:inline ${
                        viewMode === 'translation'
                          ? `${currentTheme.subpanelBg} ${currentTheme.accent} font-bold`
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      Side-by-Side
                    </button>
                  </div>
                )}
              </div>

              {/* Customization Controls: Font Size, Themes & Audio */}
              <div className="flex items-center gap-2.5 flex-wrap ml-auto">
                {/* Font Size Selector */}
                <div className={`flex items-center border rounded-xl px-2 py-1 gap-1.5 ${currentTheme.border} ${currentTheme.cardBg}`}>
                  <Type className="w-3.5 h-3.5 opacity-70" />
                  {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded text-xs uppercase font-bold transition-all ${
                        fontSize === sz
                          ? `${currentTheme.subpanelBg} ${currentTheme.accent}`
                          : 'opacity-50 hover:opacity-90'
                      }`}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Theme Selector */}
                <div className={`flex items-center border rounded-xl p-1 gap-1 ${currentTheme.border} ${currentTheme.cardBg}`}>
                  <Palette className="w-3.5 h-3.5 opacity-70 ml-1" />
                  <button
                    onClick={() => setReadingTheme('emerald')}
                    title="Sacred Emerald Theme"
                    className={`w-5 h-5 rounded-full border bg-[#08291D] ${
                      readingTheme === 'emerald' ? 'ring-2 ring-[#E5C365] scale-110' : 'opacity-70'
                    }`}
                  />
                  <button
                    onClick={() => setReadingTheme('parchment')}
                    title="Classical Mushaf Parchment Theme"
                    className={`w-5 h-5 rounded-full border bg-[#F3EBD8] ${
                      readingTheme === 'parchment' ? 'ring-2 ring-[#8A5A12] scale-110' : 'opacity-70'
                    }`}
                  />
                  <button
                    onClick={() => setReadingTheme('obsidian')}
                    title="OLED Night Obsidian Theme"
                    className={`w-5 h-5 rounded-full border bg-[#000000] ${
                      readingTheme === 'obsidian' ? 'ring-2 ring-[#F59E0B] scale-110' : 'opacity-70'
                    }`}
                  />
                  <button
                    onClick={() => setReadingTheme('sapphire')}
                    title="Royal Sapphire Navy Theme"
                    className={`w-5 h-5 rounded-full border bg-[#0E1D3D] ${
                      readingTheme === 'sapphire' ? 'ring-2 ring-[#38BDF8] scale-110' : 'opacity-70'
                    }`}
                  />
                </div>

                {/* Practice Progress */}
                <button
                  onClick={handleMarkSurahPracticed}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSurahPracticedInDb
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50'
                      : `${currentTheme.border} ${currentTheme.cardBg} hover:opacity-100`
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isSurahPracticedInDb ? 'Practiced ✓' : 'Mark Practiced'}</span>
                </button>

                {/* Full Audio Play */}
                <button
                  onClick={playFullSurah}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-accent-gold text-bg-primary text-xs font-bold transition-transform active:scale-95 shadow-xs uppercase tracking-wider shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play ({surah.time})</span>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* 3. MAIN SCROLLABLE READING CANVAS (Expands to take whole screen) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-14 py-6 sm:py-8 space-y-6"
        >
          {activeTab === 'overview' ? (
            /* Context & Revelation Tab */
            <div className="space-y-6 max-w-4xl mx-auto py-4">
              <div className={`relative p-6 sm:p-8 rounded-3xl border shadow-sm ${currentTheme.cardBg} ${currentTheme.border}`}>
                <CornerFlourishes />
                <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2 ${currentTheme.accent}`}>
                  <Sparkles className="w-4 h-4" />
                  <span>Central Theme of the Surah</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">{surah.intro.theme}</h3>
                <p className={`text-base sm:text-lg mt-3 leading-relaxed ${currentTheme.textSecondary}`}>
                  {surah.intro.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.border}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${currentTheme.accent}`}>
                    Core Spiritual Takeaway
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed italic ${currentTheme.textSecondary}`}>
                    "{surah.intro.keyTakeaway}"
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.border}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${currentTheme.accent}`}>
                    Historical Period & Revelation Order
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed ${currentTheme.textSecondary}`}>
                    Revealed during the <strong className={currentTheme.accent}>{surah.revelation}</strong> era. It is
                    the <strong>#{surah.revelationOrder}</strong> chapter in canonical order of revelation.
                  </p>
                </div>
              </div>

              {/* Tajweed Visual Color Chart */}
              <div className={`p-6 rounded-3xl border ${currentTheme.cardBg} ${currentTheme.border}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${currentTheme.accent}`}>
                  <BookOpen className="w-4 h-4" />
                  <span>Color-Coded Tajweed Guide</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(tajweedStyles).map(([key, style]) => (
                    <div key={key} className={`p-3 rounded-xl border ${currentTheme.subpanelBg} ${currentTheme.border}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: style.color }} />
                        <span className="text-sm font-bold">{style.label}</span>
                      </div>
                      <p className={`text-xs mt-1 leading-snug ${currentTheme.textSecondary}`}>{style.ruleTip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : viewMode === 'mushaf' ? (
            /* Continuous Mushaf Tilawah Mode (Flowing Quranic scripture like physical holy Mushaf) */
            <div className="max-w-4xl mx-auto py-4 space-y-6">
              {/* Bismillah Header (except for Surah At-Tawbah 9) */}
              {surah.number !== 9 && (
                <div className="text-center py-6 border-b border-inherit">
                  <div className={`font-arabic text-3xl sm:text-4xl font-bold tracking-wide ${currentTheme.arabicText}`}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                </div>
              )}

              <div
                className={`p-6 sm:p-10 rounded-3xl border shadow-sm leading-[3] sm:leading-[3.2] text-right font-arabic select-text ${
                  currentTheme.cardBg
                } ${currentTheme.border} ${arabicFontSizeClass}`}
                dir="rtl"
              >
                {(surahVerses.length > 0 ? surahVerses : remoteAyahs).map((item, idx) => {
                  const verseNum = 'number' in item ? item.number : item.numberInSurah;
                  const arabicText = item.arabic;
                  const isHighlighted = activeVerseHighlight === verseNum;

                  return (
                    <span
                      key={verseNum}
                      onClick={() => playVerse(verseNum, arabicText)}
                      className={`inline cursor-pointer px-1 py-0.5 rounded-lg transition-colors ${
                        isHighlighted ? currentTheme.highlight : 'hover:bg-accent-gold/15'
                      }`}
                      title={`Ayah ${verseNum} · Click to listen`}
                    >
                      <span className={currentTheme.arabicText}>{arabicText}</span>
                      <span
                        className={`inline-flex items-center justify-center font-serif text-xs sm:text-sm font-bold mx-1.5 px-2 py-0.5 rounded-full border align-middle select-none ${
                          currentTheme.accent
                        } ${currentTheme.border} ${currentTheme.subpanelBg}`}
                        dir="ltr"
                      >
                        ۝ {verseNum}
                      </span>
                    </span>
                  );
                })}
              </div>

              <div className={`text-center py-4 text-xs font-serif italic ${currentTheme.textSecondary}`}>
                Tap any Ayah to hear verse-by-verse recitation by Qari {reciterId}
              </div>
            </div>
          ) : (
            /* Verse-by-Verse Study Mode */
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Bismillah Opening */}
              {surah.number !== 9 && surah.number !== 1 && (
                <div className="text-center py-4">
                  <div className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wider ${currentTheme.arabicText}`}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <p className={`text-xs italic mt-1 ${currentTheme.textSecondary}`}>
                    In the name of Allah, the Entirely Merciful, the Especially Merciful
                  </p>
                </div>
              )}

              {surahVerses.length > 0 ? (
                // Local curated verses with word-by-word Tajweed & reflection notes
                surahVerses.map((verse) => {
                  const isVerseSaved = savedItems.includes(`verse-${surah.id}-${verse.number}`);
                  const isTafsirOpen = expandedTafsir === verse.number;
                  const isVersePracticed = userProgress.some(
                    (p) => String(p.surahId) === String(surah.number) && String(p.verseId) === String(verse.number)
                  );
                  const isHighlighted = activeVerseHighlight === verse.number;

                  return (
                    <article
                      key={verse.number}
                      className={`relative rounded-3xl border p-5 sm:p-7 shadow-xs transition-all ${
                        isHighlighted
                          ? `${currentTheme.highlight} ring-2 ring-accent-gold`
                          : `${currentTheme.cardBg} ${currentTheme.border} hover:border-accent-gold`
                      }`}
                    >
                      <CornerFlourishes size={10} opacity={0.3} />

                      {/* Verse Action Header */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-inherit">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center border shadow-xs ${
                            currentTheme.subpanelBg
                          } ${currentTheme.border} ${currentTheme.accent}`}>
                            {verse.number}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accent}`}>
                            Ayah {verse.number} of {surah.verses}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleVersePracticed(verse.number)}
                            title={isVersePracticed ? 'Marked as practiced' : 'Mark Ayah as practiced'}
                            className={`p-2 rounded-xl transition-colors border ${
                              isVersePracticed
                                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/50'
                                : `${currentTheme.border} ${currentTheme.subpanelBg} opacity-70 hover:opacity-100`
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => playVerse(verse.number)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs transition-colors uppercase tracking-wider ${
                              currentTheme.border
                            } ${currentTheme.subpanelBg} ${currentTheme.accent} hover:opacity-100`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => toggleSaved(`verse-${surah.id}-${verse.number}`)}
                            className={`p-2 rounded-xl border transition-colors ${
                              isVerseSaved
                                ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                                : `${currentTheme.border} ${currentTheme.subpanelBg} opacity-70 hover:opacity-100`
                            }`}
                          >
                            {isVerseSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div
                        className={`py-5 sm:py-6 text-right font-arabic select-text tracking-wide ${
                          currentTheme.arabicText
                        } ${arabicFontSizeClass}`}
                        dir="rtl"
                      >
                        {verse.arabic}
                      </div>

                      {/* Word-by-word Tajweed Analysis */}
                      {verse.words && verse.words.length > 0 && viewMode !== 'translation' && (
                        <div className={`py-4 px-4 sm:px-5 rounded-2xl border mb-4 ${currentTheme.subpanelBg} ${currentTheme.border}`}>
                          <div className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 ${currentTheme.accent}`}>
                            Word-by-Word Analysis & Tajweed
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end" dir="rtl">
                            {verse.words.map((w, idx) => {
                              const rule = w.tajweed?.[0];
                              const style = rule ? tajweedStyles[rule] : null;
                              return (
                                <div
                                  key={idx}
                                  className={`px-3 py-2 rounded-xl border text-center shadow-xs ${
                                    currentTheme.cardBg
                                  } ${currentTheme.border}`}
                                >
                                  <div
                                    className="font-arabic text-lg sm:text-xl font-bold"
                                    style={style ? { color: style.color } : {}}
                                  >
                                    {w.arabic}
                                  </div>
                                  <div className="text-[11px] opacity-75 font-mono mt-0.5" dir="ltr">
                                    {w.transliteration}
                                  </div>
                                  <div className={`text-[11px] font-semibold ${currentTheme.accent}`} dir="ltr">
                                    {w.translation}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* English Translation & Transliteration */}
                      <div className="space-y-2 mt-2">
                        <p className={`font-medium ${currentTheme.textPrimary} ${translationFontSizeClass}`}>
                          {verse.translation}
                        </p>
                        <p className={`text-sm italic font-serif ${currentTheme.textSecondary}`}>
                          {verse.transliteration}
                        </p>
                      </div>

                      {/* Tafsir Drawer */}
                      {verse.tafsir && (
                        <div className="mt-4 pt-3 border-t border-inherit">
                          <button
                            onClick={() => setExpandedTafsir(isTafsirOpen ? null : verse.number)}
                            className={`text-xs sm:text-sm hover:underline font-bold inline-flex items-center gap-1.5 uppercase tracking-wider ${currentTheme.accent}`}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Tafsir Ibn Kathir (تفسير ابن كثير)</span>
                            {isTafsirOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          {isTafsirOpen && (
                            <div className={`mt-3 p-4 sm:p-5 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                              currentTheme.subpanelBg
                            } ${currentTheme.border} ${currentTheme.textSecondary}`}>
                              <span className={`font-bold block mb-1.5 uppercase tracking-wider text-xs ${currentTheme.accent}`}>
                                Excerpt from Tafsir Ibn Kathir:
                              </span>
                              {verse.tafsir}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })
              ) : isLoadingRemote ? (
                /* Loading State from AlQuran Cloud API */
                <div className={`text-center py-20 rounded-3xl border p-8 ${currentTheme.cardBg} ${currentTheme.border}`}>
                  <Loader2 className={`w-10 h-10 animate-spin mx-auto mb-4 ${currentTheme.accent}`} />
                  <h4 className="font-bold text-xl">Loading Surah Verses & Sacred Text...</h4>
                  <p className={`text-sm mt-1.5 ${currentTheme.textSecondary}`}>
                    Fetching verified Arabic Uthmani text, Saheeh International translation, and Tafsir Al-Muyassar.
                  </p>
                </div>
              ) : remoteAyahs.length > 0 ? (
                /* Live Remote Ayahs */
                remoteAyahs.map((ayah) => {
                  const isVerseSaved = savedItems.includes(`verse-${surah.id}-${ayah.numberInSurah}`);
                  const isTafsirOpen = expandedTafsir === ayah.numberInSurah;
                  const isAyahPracticed = userProgress.some(
                    (p) => String(p.surahId) === String(surah.number) && String(p.verseId) === String(ayah.numberInSurah)
                  );
                  const isHighlighted = activeVerseHighlight === ayah.numberInSurah;

                  return (
                    <article
                      key={ayah.numberInSurah}
                      className={`relative rounded-3xl border p-5 sm:p-7 shadow-xs transition-all ${
                        isHighlighted
                          ? `${currentTheme.highlight} ring-2 ring-accent-gold`
                          : `${currentTheme.cardBg} ${currentTheme.border} hover:border-accent-gold`
                      }`}
                    >
                      <CornerFlourishes size={10} opacity={0.3} />

                      {/* Header */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-inherit">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center border shadow-xs ${
                            currentTheme.subpanelBg
                          } ${currentTheme.border} ${currentTheme.accent}`}>
                            {ayah.numberInSurah}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accent}`}>
                            Ayah {ayah.numberInSurah} of {surah.verses}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleVersePracticed(ayah.numberInSurah)}
                            title={isAyahPracticed ? 'Marked as practiced' : 'Mark Ayah as practiced'}
                            className={`p-2 rounded-xl transition-colors border ${
                              isAyahPracticed
                                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/50'
                                : `${currentTheme.border} ${currentTheme.subpanelBg} opacity-70 hover:opacity-100`
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => playVerse(ayah.numberInSurah, ayah.arabic, ayah.translation)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs transition-colors uppercase tracking-wider ${
                              currentTheme.border
                            } ${currentTheme.subpanelBg} ${currentTheme.accent} hover:opacity-100`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => toggleSaved(`verse-${surah.id}-${ayah.numberInSurah}`)}
                            className={`p-2 rounded-xl border transition-colors ${
                              isVerseSaved
                                ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                                : `${currentTheme.border} ${currentTheme.subpanelBg} opacity-70 hover:opacity-100`
                            }`}
                          >
                            {isVerseSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div
                        className={`py-5 sm:py-6 text-right font-arabic select-text tracking-wide ${
                          currentTheme.arabicText
                        } ${arabicFontSizeClass}`}
                        dir="rtl"
                      >
                        {ayah.arabic}
                      </div>

                      {/* English Translation */}
                      <div className="space-y-2 mt-2">
                        <p className={`font-medium ${currentTheme.textPrimary} ${translationFontSizeClass}`}>
                          {ayah.translation}
                        </p>
                      </div>

                      {/* Tafsir Accordion */}
                      {ayah.tafsir && (
                        <div className="mt-4 pt-3 border-t border-inherit">
                          <button
                            onClick={() => setExpandedTafsir(isTafsirOpen ? null : ayah.numberInSurah)}
                            className={`text-xs sm:text-sm hover:underline font-bold inline-flex items-center gap-1.5 uppercase tracking-wider ${currentTheme.accent}`}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Tafsir Al-Muyassar (تفسير الميسر)</span>
                            {isTafsirOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          {isTafsirOpen && (
                            <div className={`mt-3 p-4 sm:p-5 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                              currentTheme.subpanelBg
                            } ${currentTheme.border}`}>
                              <span className={`font-bold block mb-1.5 uppercase tracking-wider text-xs ${currentTheme.accent}`}>
                                تفسير مجمع الملك فهد لطباعة المصحف الشريف:
                              </span>
                              <p className={`font-arabic text-lg sm:text-xl text-right leading-loose ${currentTheme.textPrimary}`} dir="rtl">
                                {ayah.tafsir}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                /* Fallback State */
                <div className={`text-center py-16 rounded-3xl border p-8 ${currentTheme.cardBg} ${currentTheme.border}`}>
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 opacity-50 ${currentTheme.accent}`} />
                  <h4 className="font-bold text-lg">Audio Recitation Ready</h4>
                  <p className={`text-sm mt-1 max-w-md mx-auto ${currentTheme.textSecondary}`}>
                    Click "Play Full Surah" to listen to complete recitation by {reciterId}.
                  </p>
                  <button
                    onClick={playFullSurah}
                    className="mt-4 px-6 py-2.5 bg-accent-gold text-bg-primary font-bold text-sm rounded-xl uppercase tracking-wider"
                  >
                    Play Full Chapter ({surah.time})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. DISCREET FOOTER STATUS BAR (Hidden in Zen Focus Mode) */}
        {!isZenFocus && (
          <footer className={`px-6 py-3 border-t text-xs flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            currentTheme.cardBg
          } ${currentTheme.border} ${currentTheme.textSecondary}`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${currentTheme.accent}`} />
              <span>Full Screen Quran Sanctuary · Reciter: <strong>{reciterId}</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZenFocus(true)}
                className={`font-semibold hover:underline flex items-center gap-1 ${currentTheme.accent}`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Enter Zen Focus</span>
              </button>
              <button
                onClick={onClose}
                className="font-semibold hover:underline"
              >
                Close Reader
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
