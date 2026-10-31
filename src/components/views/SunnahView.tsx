import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Heart,
  BookOpen,
  Sun,
  Moon,
  Volume2,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { OrnamentedCard } from '@/components/Ornamentation';
import {
  dailyPrayerSunan,
  prohibitedPrayerTimes,
  twelveRawatibSummary,
  voluntaryPrayers,
  fastingSunan,
  prohibitedFastingDays,
  fastingEtiquettes,
  lifestyleSunan,
  getNextSunnahFastInfo,
} from '@/lib/sunnahData';
import { playUniversalDua } from '@/lib/spatialAudio3d';

interface SunnahViewProps {
  onNavigate?: (tab: string) => void;
  onOpenSurah?: (surah: any) => void;
}

export function SunnahView({ onNavigate: _onNavigate }: SunnahViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'prayers' | 'fasting' | 'lifestyle'>('prayers');
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('fajr');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // 12 Sunan Rawatib Daily Tracker state (persisted per day in localStorage)
  const todayKey = new Date().toISOString().slice(0, 10);
  const [rawatibChecked, setRawatibChecked] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(`noor_rawatib_${todayKey}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleRawatibItem = (key: string) => {
    setRawatibChecked((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`noor_rawatib_${todayKey}`, JSON.stringify(updated));
      } catch {
        // ignore quota
      }
      return updated;
    });
  };

  const rawatibItemsList = [
    { id: 'fajr_before', label: 'Fajr: 2 Rak’ahs Before Fard', rakahs: 2, prayer: 'Fajr', time: 'Before Fard' },
    { id: 'dhuhr_before_1', label: 'Dhuhr: First 2 Rak’ahs Before', rakahs: 2, prayer: 'Dhuhr', time: 'Before Fard' },
    { id: 'dhuhr_before_2', label: 'Dhuhr: Second 2 Rak’ahs Before', rakahs: 2, prayer: 'Dhuhr', time: 'Before Fard' },
    { id: 'dhuhr_after', label: 'Dhuhr: 2 Rak’ahs After Fard', rakahs: 2, prayer: 'Dhuhr', time: 'After Fard' },
    { id: 'maghrib_after', label: 'Maghrib: 2 Rak’ahs After Fard', rakahs: 2, prayer: 'Maghrib', time: 'After Fard' },
    { id: 'isha_after', label: 'Isha: 2 Rak’ahs After Fard', rakahs: 2, prayer: 'Isha', time: 'After Fard' },
  ];

  const totalRawatibCompleted = rawatibItemsList.reduce((acc, item) => {
    return acc + (rawatibChecked[item.id] ? item.rakahs : 0);
  }, 0);

  const isPalaceBuilt = totalRawatibCompleted === 12;
  const fastInfo = getNextSunnahFastInfo();

  const handlePlayDuaAudio = async (
    id: string,
    duaObj: { arabic: string; transliteration?: string; translation: string; title?: string }
  ) => {
    try {
      setPlayingAudioId(id);
      await playUniversalDua(duaObj, (isPlaying) => {
        if (!isPlaying) setPlayingAudioId(null);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
      setPlayingAudioId(null);
    }
  };

  const selectedPrayer = dailyPrayerSunan.find((p) => p.id === selectedPrayerId) || dailyPrayerSunan[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ========================================================================= */}
      {/* 1. HERO SANCTUARY BANNER                                                  */}
      {/* ========================================================================= */}
      <OrnamentedCard className="p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-bg-card via-bg-card/95 to-accent-gold/10 border-accent-gold/60 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accent-gold/20 text-accent-gold border border-accent-gold/40">
                Prophetic Sunnah Sanctuary
              </span>
              <span className="text-sm font-arabic text-accent-gold/90 font-bold">
                سُنَنُ الحَبِيبِ المُصْطَفَى ﷺ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-text-primary tracking-tight">
              Walk in the Footsteps of the Prophet ﷺ
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Every authentic prayer before and after the obligatory prayers, exact Rak’ah counts,
              voluntary night prayers, prophetic fasting rules, and daily habits to illuminate your life.
            </p>

            <div className="p-3 rounded-xl bg-bg-primary/80 border border-accent-gold/30 text-xs sm:text-sm text-accent-gold/95 font-serif italic flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <span>«مَنْ أَحْيَا سُنَّتِي عِنْدَ فَسَادِ أُمَّتِي فَلَهُ أَجْرُ مِائَةِ شَهِيدٍ»</span>
                <p className="text-[11px] text-text-muted mt-1 font-sans not-italic">
                  “Whoever revives my Sunnah when my nation is corrupted shall have immense reward.” (Al-Tabarani / Al-Bayhaqi)
                </p>
              </div>
            </div>
          </div>

          {/* Quick interactive Rawatib Palace Card */}
          <div className="w-full lg:w-72 bg-bg-primary/90 border border-accent-gold/50 rounded-2xl p-4 sm:p-5 shadow-inner shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-accent-gold font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-accent-gold" />
                <span>12 Sunan Rawatib</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40">
                {totalRawatibCompleted} / 12
              </span>
            </div>

            <div>
              <div className="text-lg font-bold text-text-primary">
                {isPalaceBuilt ? 'Palace in Jannah Guaranteed! 🏰' : `${12 - totalRawatibCompleted} Rak’ahs to Palace`}
              </div>
              <p className="text-[11px] text-text-secondary leading-tight mt-0.5">
                {isPalaceBuilt
                  ? 'All 12 Sunan Rawatib completed today! May Allah grant you high stations in Firdaws.'
                  : 'Fulfill 12 Sunnah Rak’ahs today to build a palace in Paradise (Sahih Muslim #728).'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-bg-card h-2.5 rounded-full overflow-hidden border border-accent-gold/30">
              <div
                className="bg-gradient-to-r from-accent-gold/70 via-accent-gold to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(totalRawatibCompleted / 12) * 100}%` }}
              />
            </div>

            {/* Fasting Countdown Preview */}
            <div className="pt-2 border-t border-accent-gold/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Moon className="w-3.5 h-3.5 text-accent-gold" />
                <span>Fast:</span>
              </div>
              <span className="text-accent-gold font-semibold">
                {fastInfo.isTodayFastDay ? 'Today (Sunnah Fast!)' : `${fastInfo.nextDayName} (${fastInfo.daysRemaining}d left)`}
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-accent-gold/25 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('prayers')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              activeSubTab === 'prayers'
                ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-md font-bold'
                : 'bg-bg-primary/60 border-accent-gold/30 text-text-secondary hover:text-text-primary hover:border-accent-gold/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Daily Prayers & 12 Rawatib</span>
          </button>

          <button
            onClick={() => setActiveSubTab('fasting')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              activeSubTab === 'fasting'
                ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-md font-bold'
                : 'bg-bg-primary/60 border-accent-gold/30 text-text-secondary hover:text-text-primary hover:border-accent-gold/60'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Prophetic Fasting Calendar & Du'as</span>
          </button>

          <button
            onClick={() => setActiveSubTab('lifestyle')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              activeSubTab === 'lifestyle'
                ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-md font-bold'
                : 'bg-bg-primary/60 border-accent-gold/30 text-text-secondary hover:text-text-primary hover:border-accent-gold/60'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Daily Lifestyle & Habits Sunan</span>
          </button>
        </div>
      </OrnamentedCard>

      {/* ========================================================================= */}
      {/* 2. SUBTAB: DAILY PRAYERS & 12 RAWATIB                                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'prayers' && (
        <div className="space-y-8 animate-fade-in">
          {/* Today's Interactive 12 Rawatib Checklist */}
          <OrnamentedCard className="p-6 sm:p-7 space-y-5 border-accent-gold/50 bg-bg-card/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-gold" />
                  <h2 className="text-xl font-bold font-serif text-text-primary">
                    Today’s 12 Sunan Rawatib Tracker
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Tap to check off each confirmed Sunnah as you pray it today. Resets automatically tomorrow.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase font-bold text-accent-gold tracking-widest block">
                  Palace Progress
                </span>
                <span className="text-2xl font-bold font-mono text-accent-gold">
                  {totalRawatibCompleted} / 12 <span className="text-xs text-text-muted">Rak’ahs</span>
                </span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rawatibItemsList.map((item) => {
                const isChecked = !!rawatibChecked[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleRawatibItem(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-200 shadow-xs'
                        : 'bg-bg-primary/80 border-accent-gold/30 hover:border-accent-gold text-text-primary'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                        {item.prayer} • {item.time}
                      </div>
                      <div className="text-sm font-bold font-serif">
                        {item.label}
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-muted hover:text-accent-gold" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Authentic Hadith Banner */}
            <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/40 flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-text-primary">
              <Sparkles className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-arabic text-sm text-accent-gold font-bold leading-relaxed">
                  {twelveRawatibSummary.hadith.arabic}
                </p>
                <p className="font-serif italic font-medium mt-1">
                  “{twelveRawatibSummary.hadith.translation}”
                </p>
                <p className="text-[11px] text-accent-gold mt-1 font-semibold">
                  Narrated by {twelveRawatibSummary.hadith.narrator} — {twelveRawatibSummary.hadith.source}
                </p>
              </div>
            </div>
          </OrnamentedCard>

          {/* ========================================================================= */}
          {/* CRITICAL ISLAMIC RULINGS: PROHIBITED TIMES (ASR & FAJR)                   */}
          {/* ========================================================================= */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-950/40 via-bg-card to-rose-950/20 border-2 border-rose-500/50 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-500/30 pb-3">
              <div className="flex items-center gap-2.5 text-rose-400">
                <ShieldAlert className="w-6 h-6 shrink-0 text-rose-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-rose-200">
                    Critical Islamic Ruling: Obligatory Prayers With NO Sunnah Allowed After
                  </h3>
                  <p className="text-xs text-rose-300/80">
                    Authentic Prophetic prohibitions from Sahih al-Bukhari and Sahih Muslim (أوقات النهي عن الصلاة)
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 self-start sm:self-auto">
                Strict Prohibition (Nahy)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              In authentic Islamic jurisprudence, there are daily obligatory prayers after which <strong className="text-rose-300">NO Sunnah or voluntary prayer of any kind is permitted</strong>. Please observe these boundaries faithfully:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {prohibitedPrayerTimes.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-bg-primary/90 border border-rose-500/40 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>⛔</span>
                      <span>{item.prayerName}</span>
                    </span>
                    <span className="text-[11px] font-arabic text-rose-300 font-bold">
                      {item.arabicTitle}
                    </span>
                  </div>

                  <div className="text-xs text-text-secondary leading-relaxed">
                    <strong className="text-rose-200">Ruling: </strong>
                    {item.timeWindow}
                  </div>

                  <div className="p-3 rounded-lg bg-bg-card border border-rose-500/30 space-y-1.5 text-xs">
                    <div className="font-arabic text-rose-300 font-bold text-sm text-right dir-rtl">
                      {item.hadithEvidence.arabic}
                    </div>
                    <div className="text-text-primary italic">
                      "{item.hadithEvidence.english}"
                    </div>
                    <div className="text-[10px] text-accent-gold font-mono">
                      — {item.hadithEvidence.source} (Narrated by {item.hadithEvidence.narrator})
                    </div>
                  </div>

                  <div className="text-xs text-text-muted leading-relaxed">
                    <strong className="text-text-primary">Why is it forbidden? </strong>
                    {item.whyForbidden}
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300">
                    <strong className="text-emerald-200">What to do instead: </strong>
                    {item.whatToPerformInstead}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP-BY-STEP CHRONOLOGICAL PRAYER GUIDE (NO CONFUSING REPETITION)          */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent-gold" />
                  <span>Chronological Step-by-Step Prayer & Sunnah Guide</span>
                </h3>
                <p className="text-xs text-text-secondary">
                  Select a prayer below to inspect its exact order of worship, what to conduct before/after, and why.
                </p>
              </div>
            </div>

            {/* Clear Prayer selector pills with explicit after-fard status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {dailyPrayerSunan.map((prayer) => {
                const isSelected = selectedPrayerId === prayer.id;
                const hasNoAfter = prayer.afterFard.type === 'prohibited';
                return (
                  <button
                    key={prayer.id}
                    onClick={() => setSelectedPrayerId(prayer.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-md font-bold'
                        : 'bg-bg-card border-accent-gold/30 hover:border-accent-gold text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-serif font-bold">{prayer.prayerName.split(' ')[0]}</span>
                        <span className="text-xs font-arabic opacity-90">{prayer.arabicName}</span>
                      </div>
                      <div className={`text-[11px] mt-1 ${isSelected ? 'text-bg-primary/90' : 'text-text-muted'}`}>
                        {prayer.fardRakahs} Fard Rak‘ahs
                      </div>
                    </div>

                    <div className="pt-2 border-t border-current/20 space-y-1 text-[11px]">
                      <div>
                        {prayer.beforeFard.rakahs > 0 ? (
                          <span>{prayer.beforeFard.rakahs} Sunnah Before</span>
                        ) : (
                          <span className="opacity-75">No Sunnah Before</span>
                        )}
                      </div>
                      <div>
                        {hasNoAfter ? (
                          <span className={isSelected ? 'font-black underline' : 'text-rose-400 font-bold'}>
                            ⛔ No Prayer After
                          </span>
                        ) : (
                          <span className={isSelected ? 'font-bold' : 'text-emerald-400 font-semibold'}>
                            ✅ {prayer.afterFard.rakahs} Sunnah After
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Prayer Comprehensive Chronological Timeline Card */}
            <OrnamentedCard className="p-6 sm:p-7 space-y-6 border-accent-gold/50 bg-bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-accent-gold/25">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-serif text-text-primary">
                      {selectedPrayer.prayerName}
                    </span>
                    <span className="text-lg font-arabic text-accent-gold font-bold">
                      {selectedPrayer.arabicName}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    Timing Window: {selectedPrayer.timeWindow}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-accent-gold/20 text-accent-gold border border-accent-gold/40">
                    {selectedPrayer.fardRakahs} Obligatory Fard Rak‘ahs
                  </span>
                  {selectedPrayer.afterFard.type === 'prohibited' ? (
                    <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      ⛔ Prohibited Time After Fard
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                      {selectedPrayer.isRawatibTotal} Confirmed Rawatib Rak‘ahs
                    </span>
                  )}
                </div>
              </div>

              {/* Sequential Steps in Exact Chronological Order */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Chronological Order of Worship for {selectedPrayer.prayerName.split(' ')[0]}:
                </div>

                <div className="space-y-4">
                  {selectedPrayer.chronologicalSteps.map((stepItem) => {
                    const isProhibited = stepItem.status === 'prohibited-no-prayer';
                    const isFard = stepItem.status === 'fard-obligatory';
                    const isWitr = stepItem.status === 'witr-seal';

                    return (
                      <div
                        key={stepItem.step}
                        className={`p-5 rounded-2xl border transition-all space-y-3 ${
                          isProhibited
                            ? 'bg-rose-950/20 border-rose-500/50 text-rose-100 shadow-md'
                            : isFard
                            ? 'bg-accent-gold/10 border-accent-gold/50 text-text-primary'
                            : isWitr
                            ? 'bg-purple-950/20 border-purple-500/40 text-text-primary'
                            : 'bg-bg-primary/90 border-emerald-500/40 text-text-primary'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/15 pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isProhibited
                                  ? 'bg-rose-500 text-white'
                                  : isFard
                                  ? 'bg-accent-gold text-bg-primary'
                                  : isWitr
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-emerald-500 text-bg-primary'
                              }`}
                            >
                              {stepItem.step}
                            </span>
                            <span className="font-bold font-serif text-base sm:text-lg">
                              {stepItem.label}
                            </span>
                          </div>

                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded uppercase self-start sm:self-auto ${
                              isProhibited
                                ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50'
                                : isFard
                                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50'
                                : isWitr
                                ? 'bg-purple-500/25 text-purple-200 border border-purple-500/50'
                                : 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/50'
                            }`}
                          >
                            {isProhibited
                              ? 'Strict Prohibition'
                              : isFard
                              ? 'Mandatory Fard'
                              : isWitr
                              ? 'Essential Night Seal'
                              : 'Confirmed Sunnah'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {stepItem.description}
                        </p>

                        {/* Why conduct or why avoid & canonical hadith evidence */}
                        <div
                          className={`p-4 rounded-xl space-y-2 text-xs sm:text-sm border ${
                            isProhibited
                              ? 'bg-bg-primary/95 border-rose-500/30'
                              : 'bg-bg-card/90 border-accent-gold/25'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                            <BookOpen className="w-4 h-4 text-accent-gold" />
                            <span className={isProhibited ? 'text-rose-400' : 'text-accent-gold'}>
                              {isProhibited
                                ? 'Theological Reason Why Prayer is Forbidden Here:'
                                : 'Why Conduct This Prayer & Its Spiritual Purpose:'}
                            </span>
                          </div>

                          <p className="text-text-secondary leading-relaxed">
                            {stepItem.reasonAndEvidence.whyPerformOrAvoid}
                          </p>

                          {stepItem.reasonAndEvidence.hadithArabic && (
                            <div className="pt-2 text-sm sm:text-base font-arabic font-bold text-accent-gold text-right dir-rtl leading-relaxed">
                              {stepItem.reasonAndEvidence.hadithArabic}
                            </div>
                          )}

                          <div className="pt-1 text-text-primary/90 font-serif italic">
                            "{stepItem.reasonAndEvidence.hadithEnglish}"
                          </div>

                          <div className="text-[11px] text-accent-gold font-sans not-italic font-semibold pt-1 border-t border-accent-gold/20">
                            Canonical Evidence: {stepItem.reasonAndEvidence.source}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rulings and Prophetic Etiquettes */}
              <div className="p-4 rounded-xl bg-bg-primary/60 border border-accent-gold/30 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-accent-gold" />
                  <span>Key Rulings & Prophetic Guidance for {selectedPrayer.prayerName.split(' ')[0]}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-text-secondary">
                  {selectedPrayer.importantRulings.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent-gold shrink-0">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </OrnamentedCard>
          </div>

          {/* Voluntary & Night Prayers Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary flex items-center gap-2">
                <Moon className="w-5 h-5 text-accent-gold" />
                <span>Voluntary, Night & Occasional Sunnah Prayers</span>
              </h3>
              <p className="text-xs text-text-secondary">
                Treasures of worship that bring you closer to Allah outside the daily Rawatib.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {voluntaryPrayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="p-5 rounded-2xl bg-bg-card border border-accent-gold/30 hover:border-accent-gold/60 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-accent-gold tracking-wider uppercase">
                        {prayer.timing}
                      </span>
                      <span className="text-xs font-arabic text-accent-gold font-bold">
                        {prayer.arabicName}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serif text-text-primary">
                      {prayer.name}
                    </h4>

                    <div className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                      {prayer.minRakahs} to {prayer.recommendedRakahs} {prayer.maxRakahs ? `(up to ${prayer.maxRakahs})` : ''} Rak’ahs
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {prayer.significance}
                    </p>

                    <div className="p-2.5 rounded-lg bg-bg-primary text-[11px] text-text-muted">
                      <strong className="text-text-primary">Method: </strong>
                      {prayer.howToPerform}
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-accent-gold font-serif italic border-t border-accent-gold/20 whitespace-pre-line">
                    {prayer.hadith.text}
                    <div className="text-[10px] text-text-muted font-sans not-italic font-medium mt-0.5">
                      — {prayer.hadith.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUBTAB: PROPHETIC FASTING CALENDAR & RULES                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'fasting' && (
        <div className="space-y-8 animate-fade-in">
          {/* Live Fasting Indicator */}
          <OrnamentedCard className="p-6 sm:p-7 space-y-4 border-accent-gold/50 bg-gradient-to-br from-bg-card to-accent-gold/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-accent-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                    Live Prophetic Fasting Status
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary">
                  {fastInfo.isTodayFastDay ? 'Today is a Sunnah Fast Day! 🌙' : `Next Fast: ${fastInfo.fastName}`}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                  {fastInfo.reason}
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-bg-primary border border-accent-gold text-center shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-accent-gold font-bold block">
                  Countdown
                </span>
                <span className="text-2xl font-bold text-accent-gold font-mono">
                  {fastInfo.isTodayFastDay ? 'TODAY' : `${fastInfo.daysRemaining} Days`}
                </span>
                <span className="text-[10px] text-text-muted block">
                  {fastInfo.nextDayName}
                </span>
              </div>
            </div>
          </OrnamentedCard>

          {/* Full Prophetic Fasting Calendar Grid */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
                The Sunnah Fasts of the Prophet ﷺ
              </h3>
              <p className="text-xs text-text-secondary">
                Weekly, monthly, and seasonal opportunities to gain immense rewards and purify the soul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fastingSunan.map((fast) => (
                <div
                  key={fast.id}
                  className="p-5 rounded-2xl bg-bg-card border border-accent-gold/30 hover:border-accent-gold/60 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-accent-gold/15 text-accent-gold uppercase tracking-wider border border-accent-gold/30">
                        {fast.frequency}
                      </span>
                      <span className="text-xs font-arabic text-accent-gold font-bold">
                        {fast.arabicName}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serif text-text-primary">
                      {fast.name}
                    </h4>

                    <div className="text-xs font-semibold text-accent-gold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{fast.timingDescription}</span>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {fast.virtueAndReward}
                    </p>

                    <div className="p-2.5 rounded-lg bg-bg-primary text-[11px] text-text-muted">
                      <strong className="text-text-primary">Prophetic Wisdom: </strong>
                      {fast.whyFast}
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-text-primary/90 font-serif italic border-t border-accent-gold/20 whitespace-pre-line">
                    {fast.hadith.text}
                    <div className="text-[10px] text-accent-gold font-sans not-italic font-semibold mt-0.5">
                      — {fast.hadith.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited Fasting Days Warning */}
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/40 space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold font-serif">
                Prohibited Days to Fast (أيام النهي عن الصيام)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              Fasting on these days is strictly forbidden (Haram) or strongly disliked (Makruh) in authentic Sunnah:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {prohibitedFastingDays.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-bg-card/80 border border-rose-500/30 space-y-1">
                  <div className="text-xs font-bold text-rose-400">{p.day}</div>
                  <div className="text-[11px] text-rose-300 font-semibold uppercase">{p.ruling}</div>
                  <div className="text-[11px] text-text-muted">{p.explanation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prophetic Suhoor & Iftar Du'as & Etiquettes */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
                Prophetic Etiquettes of Suhoor & Iftar
              </h3>
              <p className="text-xs text-text-secondary">
                Authentic Du’as and practices to maximize the spiritual sweetness of your fast.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Suhoor */}
              <OrnamentedCard className="p-5 sm:p-6 space-y-4 border-accent-gold/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-accent-gold" />
                    <h4 className="text-lg font-bold font-serif text-text-primary">
                      {fastingEtiquettes.suhoor.title}
                    </h4>
                  </div>
                  <span className="text-xs font-arabic text-accent-gold font-bold">
                    السحور وبركته
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  {fastingEtiquettes.suhoor.sunan.map((itemText: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-gold font-bold">•</span>
                      <span>{itemText}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 rounded-xl bg-bg-primary/90 border border-accent-gold/30 text-xs sm:text-sm font-serif italic text-accent-gold">
                  {fastingEtiquettes.suhoor.hadith}
                </div>
              </OrnamentedCard>

              {/* Iftar */}
              <OrnamentedCard className="p-5 sm:p-6 space-y-4 border-accent-gold/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-accent-gold" />
                    <h4 className="text-lg font-bold font-serif text-text-primary">
                      {fastingEtiquettes.iftar.title}
                    </h4>
                  </div>
                  <span className="text-xs font-arabic text-accent-gold font-bold">
                    الإفطار ودعاؤه
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  {fastingEtiquettes.iftar.sunan.map((itemText: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-gold font-bold">•</span>
                      <span>{itemText}</span>
                    </li>
                  ))}
                </ul>

                {/* Du'a card with audio pronunciation button */}
                <div className="p-4 rounded-xl bg-bg-primary/95 border border-accent-gold/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-accent-gold tracking-wider">
                      The Authentic Iftar Du'a
                    </span>
                    <button
                      onClick={() =>
                        handlePlayDuaAudio('iftar_dua', {
                          arabic: fastingEtiquettes.iftar.duaArabic,
                          transliteration: fastingEtiquettes.iftar.duaTransliteration,
                          translation: fastingEtiquettes.iftar.duaTranslation,
                          title: 'Iftar Prophetic Du’a',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold border border-accent-gold/40 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{playingAudioId === 'iftar_dua' ? 'Playing...' : 'Pronounce'}</span>
                    </button>
                  </div>

                  <div className="text-base sm:text-lg font-arabic font-bold text-accent-gold leading-loose text-right dir-rtl">
                    {fastingEtiquettes.iftar.duaArabic}
                  </div>

                  <div className="text-xs text-text-primary font-serif italic">
                    {fastingEtiquettes.iftar.duaTransliteration}
                  </div>

                  <div className="text-xs text-text-secondary">
                    “{fastingEtiquettes.iftar.duaTranslation}”
                  </div>

                  <div className="text-[10px] text-text-muted font-medium pt-1">
                    Citation: {fastingEtiquettes.iftar.hadith}
                  </div>
                </div>
              </OrnamentedCard>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUBTAB: DAILY LIFESTYLE & HABITS SUNAN                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'lifestyle' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
              Prophetic Lifestyle & Daily Etiquettes
            </h3>
            <p className="text-xs text-text-secondary">
              Practical prophetic habits for your routine: speech, hygiene, food, rest, and manners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lifestyleSunan.map((item) => (
              <OrnamentedCard
                key={item.id}
                className="p-5 sm:p-6 space-y-4 border-accent-gold/30 hover:border-accent-gold/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-accent-gold">
                      Sunnah Habit
                    </span>
                    {item.arabicSnippet && (
                      <span className="text-sm font-arabic text-accent-gold font-bold">
                        {item.arabicSnippet}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold font-serif text-text-primary">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    {item.practicalSteps.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent-gold shrink-0">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-accent-gold/20 text-xs text-accent-gold font-medium font-sans">
                  Hadith Reference: {item.hadithCitation}
                </div>
              </OrnamentedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
