import React, { useState, useEffect } from 'react';
import {
  Heart,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Clock,
  Flame,
  ArrowRight,
  X,
  Compass,
  Volume2,
} from 'lucide-react';
import { OrnamentedCard, BorderedSubPanel } from './Ornamentation';
import {
  weeklyPropheticConduct,
  DailyPropheticConduct,
  tawbahRemedySteps,
} from '../lib/dailyPropheticConductData';
import { playUniversalDua } from '../lib/spatialAudio3d';

interface DailyPropheticConductCardProps {
  onPlayAudio?: (audio: { title: string; subtitle: string; url: string; arabicSnippet?: string }) => void;
}

export const DailyPropheticConductCard: React.FC<DailyPropheticConductCardProps> = () => {
  const currentDayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDayOfWeek);
  const [showTawbahSanctuaryModal, setShowTawbahSanctuaryModal] = useState<boolean>(false);
  const [copiedTextType, setCopiedTextType] = useState<string | null>(null);
  const [isPlayingDua, setIsPlayingDua] = useState<boolean>(false);

  // Local storage checklist for daily completed Sunan
  const [checkedSunan, setCheckedSunan] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('noor_checked_day_sunan');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('noor_checked_day_sunan', JSON.stringify(checkedSunan));
    } catch {
      // ignore storage errors
    }
  }, [checkedSunan]);

  const toggleSunnahCheck = (sunnahId: string) => {
    setCheckedSunan((prev) => ({
      ...prev,
      [sunnahId]: !prev[sunnahId],
    }));
  };

  const selectedDayData: DailyPropheticConduct =
    weeklyPropheticConduct.find((d) => d.dayIndex === selectedDayIndex) ||
    weeklyPropheticConduct[0];

  const handleCopyText = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextType(type);
    setTimeout(() => setCopiedTextType(null), 2200);
  };

  const handlePrevDay = () => {
    setSelectedDayIndex((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const handleNextDay = () => {
    setSelectedDayIndex((prev) => (prev === 6 ? 0 : prev + 1));
  };

  const completedCountForDay = selectedDayData.daySunanChecklist.filter(
    (item) => !!checkedSunan[item.id]
  ).length;

  const totalSunanCount = selectedDayData.daySunanChecklist.length;

  return (
    <>
      <OrnamentedCard className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-accent-gold/20 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider border border-accent-gold/40">
                <Compass className="w-3.5 h-3.5 text-accent-gold" />
                <span>Weekly Prophetic Conduct & Guidance</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-bg-primary text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authentic Hadith Protocol</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary tracking-tight">
              Conduct for Today: What Your Lord Expects & The Prophetic Sunnah
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              How Prophet Muhammad ﷺ lived each day of the week, and the precise divine remedies from the Quran and Sunnah when you have fallen short or wronged your Lord.
            </p>
          </div>

          {/* Compassionate "If I Have Wronged My Lord" Quick Access Button */}
          <button
            onClick={() => setShowTawbahSanctuaryModal(true)}
            className="self-start lg:self-center inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-950/80 via-amber-950/70 to-bg-card hover:from-rose-900/90 hover:via-amber-900/80 text-rose-200 border border-rose-500/40 hover:border-rose-400 text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer group shrink-0"
          >
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-bold flex items-center gap-1.5">
                <span>If You Have Wronged Your Lord</span>
                <Sparkles className="w-3 h-3 text-accent-gold" />
              </div>
              <div className="text-[10px] text-rose-300/80 font-normal">
                Divine Pathway of Tawbah & Hope (بَابُ التَّوْبَة)
              </div>
            </div>
            <ArrowRight className="w-4 h-4 ml-1 text-rose-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Days of the Week Selector Pills */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {weeklyPropheticConduct.map((day) => {
              const isToday = day.dayIndex === currentDayOfWeek;
              const isSelected = day.dayIndex === selectedDayIndex;

              return (
                <button
                  key={day.dayIndex}
                  onClick={() => setSelectedDayIndex(day.dayIndex)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-accent-gold text-bg-primary font-bold shadow-md shadow-accent-gold/20 scale-102'
                      : isToday
                      ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/40 hover:bg-accent-gold/25'
                      : 'bg-bg-primary/80 text-text-secondary hover:text-text-primary border border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  <span>{day.englishDay}</span>
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

          {/* Quick Prev / Next Arrows */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button
              onClick={handlePrevDay}
              className="p-1.5 text-accent-gold hover:bg-bg-primary rounded-lg border border-accent-gold/30 hover:border-accent-gold transition-colors cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextDay}
              className="p-1.5 text-accent-gold hover:bg-bg-primary rounded-lg border border-accent-gold/30 hover:border-accent-gold transition-colors cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Day Hero Card */}
        <div className="rounded-2xl bg-bg-primary/70 border border-accent-gold/30 p-5 sm:p-6 space-y-5">
          {/* Day Title & Arabic */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-accent-gold/15 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-arabic text-xl sm:text-2xl text-accent-gold font-bold">
                  {selectedDayData.arabicDay}
                </span>
                <span className="text-xs text-text-muted font-mono">
                  ({selectedDayData.transliterationDay})
                </span>
                {selectedDayData.dayIndex === currentDayOfWeek && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    Live Today
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
                {selectedDayData.propheticTitle}
              </h3>
              <div className="text-xs font-semibold text-emerald-400">
                Spiritual Theme: {selectedDayData.spiritualTheme}
              </div>
            </div>

            <div className="text-right sm:text-right shrink-0">
              <div className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">
                Daily Sunan Progress
              </div>
              <div className="text-sm font-bold text-accent-gold mt-0.5">
                {completedCountForDay} / {totalSunanCount} Completed
              </div>
            </div>
          </div>

          {/* How the Prophet ﷺ Conducted Himself */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How Prophet Muhammad ﷺ Conducted Himself on {selectedDayData.englishDay}s:</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-card/50 p-4 rounded-xl border border-accent-gold/20">
              {selectedDayData.propheticConductSummary}
            </p>
          </div>

          {/* Verified Primary Hadith Citation */}
          <BorderedSubPanel className="space-y-3 bg-bg-primary/95">
            <div className="flex items-center justify-between text-xs text-accent-gold font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Primary Authentic Hadith:</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                {selectedDayData.primaryHadith.citation}
              </span>
            </div>

            {selectedDayData.primaryHadith.arabicSnippet && (
              <div className="font-arabic text-base sm:text-lg text-accent-gold leading-loose text-right dir-rtl py-1 border-b border-accent-gold/15">
                {selectedDayData.primaryHadith.arabicSnippet}
              </div>
            )}

            <p className="text-xs sm:text-sm text-text-primary leading-relaxed italic">
              "{selectedDayData.primaryHadith.englishNarrative}"
            </p>

            <div className="text-[11px] text-text-muted flex items-center justify-between pt-1">
              <span>Narrated by: {selectedDayData.primaryHadith.narrator}</span>
              {selectedDayData.secondaryHadith && (
                <span className="hidden sm:inline italic text-[10px] text-text-muted">
                  Also recorded in {selectedDayData.secondaryHadith.citation}
                </span>
              )}
            </div>
          </BorderedSubPanel>

          {/* What Allah Expects from You Today */}
          <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>What Your Lord Expects from You on {selectedDayData.englishDay}:</span>
            </div>
            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
              {selectedDayData.whatAllahExpectsToday}
            </p>
          </div>

          {/* IF YOU HAVE WRONGED YOUR LORD TODAY (The Core User Remedy) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-amber-950/30 to-bg-card border-2 border-rose-500/35 space-y-3 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 text-rose-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
                <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>If You Have Wronged Your Lord Today (دواء التوبة وكفارة الذنب)</span>
              </div>
              <span className="text-[11px] text-rose-300/80 font-mono">
                {selectedDayData.ifYouHaveWrongedYourLord.quranicRemedy.citation}
              </span>
            </div>

            <div className="text-sm sm:text-base font-bold text-rose-100 font-serif">
              {selectedDayData.ifYouHaveWrongedYourLord.headline}
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {selectedDayData.ifYouHaveWrongedYourLord.explanation}
            </p>

            {/* Quranic Anchor */}
            <div className="p-3 rounded-xl bg-bg-primary/90 border border-rose-500/30 space-y-1.5">
              <div className="font-arabic text-base sm:text-lg text-accent-gold leading-loose text-right dir-rtl">
                {selectedDayData.ifYouHaveWrongedYourLord.quranicRemedy.verseArabic}
              </div>
              <div className="text-xs text-text-primary italic leading-relaxed">
                "{selectedDayData.ifYouHaveWrongedYourLord.quranicRemedy.verseTranslation}"
              </div>
            </div>

            {/* Practical Actionable Prescription */}
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200 leading-relaxed">
                <span className="font-bold text-rose-100 uppercase tracking-wide">
                  Today's Actionable Prescription:{' '}
                </span>
                {selectedDayData.ifYouHaveWrongedYourLord.actionableSpiritualPrescription}
              </div>
            </div>
          </div>

          {/* Interactive Daily Sunan Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{selectedDayData.englishDay}'s Sunan Checklist (Tap to Mark Completed):</span>
              </div>
              <div className="text-[11px] text-text-muted">
                Saves automatically to your routine
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedDayData.daySunanChecklist.map((item) => {
                const isChecked = !!checkedSunan[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSunnahCheck(item.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                        : 'bg-bg-card/70 border-accent-gold/25 hover:border-accent-gold/50 text-text-primary'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-accent-gold/60 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div
                        className={`text-xs font-semibold leading-snug ${
                          isChecked ? 'line-through text-emerald-300/80' : ''
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-[10px] text-text-muted font-mono">
                        {item.source}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Special Supplication & Istighfar */}
          <BorderedSubPanel className="space-y-2.5 bg-bg-card/60">
            <div className="flex items-center justify-between text-xs text-accent-gold font-bold flex-wrap gap-2">
              <span>{selectedDayData.specialDuaOfToday.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isPlayingDua) {
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                      setIsPlayingDua(false);
                    } else {
                      setIsPlayingDua(true);
                      playUniversalDua(
                        {
                          arabic: selectedDayData.specialDuaOfToday.arabic,
                          transliteration: selectedDayData.specialDuaOfToday.transliteration,
                          translation: selectedDayData.specialDuaOfToday.translation,
                          title: selectedDayData.specialDuaOfToday.title,
                        },
                        (playing) => setIsPlayingDua(playing)
                      );
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                    isPlayingDua
                      ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-sm'
                      : 'bg-bg-primary text-accent-gold border-accent-gold/40 hover:border-accent-gold'
                  }`}
                  title="Listen to this Dua recited with sacred chime and English reflection"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingDua ? 'animate-pulse' : ''}`} />
                  <span>{isPlayingDua ? 'Playing Du’a...' : 'Listen to Du’a'}</span>
                </button>

                <button
                  onClick={() =>
                    handleCopyText(
                      `dua-${selectedDayData.dayIndex}`,
                      `${selectedDayData.specialDuaOfToday.arabic}\n${selectedDayData.specialDuaOfToday.transliteration}\n"${selectedDayData.specialDuaOfToday.translation}" (${selectedDayData.specialDuaOfToday.source})`
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-primary text-text-secondary hover:text-accent-gold border border-accent-gold/30 text-[11px] transition-colors cursor-pointer"
                >
                  {copiedTextType === `dua-${selectedDayData.dayIndex}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Du'a</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="font-arabic text-base sm:text-lg text-accent-gold leading-loose text-center py-1">
              {selectedDayData.specialDuaOfToday.arabic}
            </div>

            <div className="text-xs font-serif italic text-text-primary text-center">
              {selectedDayData.specialDuaOfToday.transliteration}
            </div>

            <div className="text-xs text-text-secondary text-center max-w-2xl mx-auto">
              "{selectedDayData.specialDuaOfToday.translation}"
            </div>

            <div className="text-[10px] text-text-muted text-center pt-1 border-t border-accent-gold/15">
              Source: {selectedDayData.specialDuaOfToday.source}
            </div>
          </BorderedSubPanel>
        </div>
      </OrnamentedCard>

      {/* ========================================================================= */}
      {/* TAWBAH SANCTUARY MODAL: Complete Prophetic Pathway When You Wronged Allah  */}
      {/* ========================================================================= */}
      {showTawbahSanctuaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg-card border-2 border-accent-gold shadow-2xl p-6 sm:p-8 space-y-6 text-text-primary">
            {/* Close Button */}
            <button
              onClick={() => setShowTawbahSanctuaryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-bg-primary text-text-secondary hover:text-accent-gold border border-accent-gold/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-accent-gold/25 pb-4 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/35">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>The Door of Tawbah is Never Closed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary">
                If You Have Wronged Your Lord: The Divine Pathway Back to Allah
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Do not let guilt turn into despair. The Quran and authentic Sunnah teach that the moment a servant turns back with remorse, Allah rejoices more than a traveler who found his lost provision in the barren desert.
              </p>
            </div>

            {/* Supreme Quranic Reassurance: Surah Az-Zumar (39:53) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent-gold/15 to-emerald-950/30 border border-accent-gold/40 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                The Master Verse of Divine Hope (آيَةُ الرَّحْمَةِ الْكُبْرَى):
              </div>
              <div className="font-arabic text-xl sm:text-2xl text-accent-gold leading-loose text-right dir-rtl">
                قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ
              </div>
              <p className="text-sm text-text-primary italic leading-relaxed">
                "Say: 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'"
              </p>
              <div className="text-[11px] text-text-muted font-mono">
                Surah Az-Zumar (39:53) · Read by the Prophet ﷺ when consoling the sorrowful
              </div>
            </div>

            {/* The 5 Authentic Steps of True Repentance (الشروط النبوية للتوبة) */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold font-serif text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                <span>The 5 Prophetic Pillars of True Repentance:</span>
              </h3>

              <div className="space-y-3">
                {tawbahRemedySteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-xl bg-bg-primary/90 border border-accent-gold/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent-gold text-bg-primary font-bold text-xs flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <span className="font-bold text-sm text-text-primary">
                          {step.title}
                        </span>
                      </div>
                      <span className="font-arabic text-sm text-accent-gold">
                        {step.arabicTitle}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed pl-8">
                      {step.propheticCondition}
                    </p>

                    <div className="pl-8 text-xs text-emerald-400 font-semibold flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{step.actionableStep}</span>
                    </div>

                    <div className="pl-8 text-[10px] text-text-muted font-mono">
                      {step.hadithOrQuranCitation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Pray Salat al-Tawbah (2 Rak'ahs of Repentance) */}
            <BorderedSubPanel className="space-y-3 bg-emerald-950/20 border-emerald-500/35">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>How to Pray Salat al-Tawbah (Sunnah of Abu Bakr - Abu Dawud #1521)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-text-secondary">
                <div className="p-3 rounded-xl bg-bg-card/70 border border-emerald-500/25 space-y-1">
                  <div className="font-bold text-text-primary">1. Mindful Wudu</div>
                  <div>Perform a thorough ablution with the intention of purifying your limbs from the wrong.</div>
                </div>
                <div className="p-3 rounded-xl bg-bg-card/70 border border-emerald-500/25 space-y-1">
                  <div className="font-bold text-text-primary">2. Two Quiet Rak’ahs</div>
                  <div>Pray 2 rak’ahs where no one sees you, reciting Surah Al-Fatihah and any comforting surah with presence of heart.</div>
                </div>
                <div className="p-3 rounded-xl bg-bg-card/70 border border-emerald-500/25 space-y-1">
                  <div className="font-bold text-text-primary">3. Tearful Istighfar</div>
                  <div>Sit after Taslim and ask Allah for pardon. Hadith: "Except that Allah forgives him."</div>
                </div>
              </div>
            </BorderedSubPanel>

            {/* Bottom Dismiss Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTawbahSanctuaryModal(false)}
                className="px-6 py-2.5 rounded-xl bg-accent-gold text-bg-primary font-bold text-sm hover:bg-accent-gold-dim transition-all cursor-pointer shadow-md"
              >
                I Understand & Turn to My Lord
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
