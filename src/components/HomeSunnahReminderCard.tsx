import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Moon,
  Clock,
  ArrowRight,
  Award,
  Calendar,
} from 'lucide-react';
import { OrnamentedCard } from './Ornamentation';
import { getNextSunnahFastInfo, dailyPrayerSunan } from '@/lib/sunnahData';

interface HomeSunnahReminderCardProps {
  onNavigate: (tab: string) => void;
}

export function HomeSunnahReminderCard({ onNavigate }: HomeSunnahReminderCardProps) {
  const todayKey = new Date().toISOString().slice(0, 10);
  const fastInfo = getNextSunnahFastInfo();

  const [rawatibChecked, setRawatibChecked] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(`noor_rawatib_${todayKey}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleItem = (key: string) => {
    setRawatibChecked((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`noor_rawatib_${todayKey}`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const checklistItems = [
    { id: 'fajr_before', label: 'Fajr 2 Before', rakahs: 2 },
    { id: 'dhuhr_before_1', label: 'Dhuhr 2 Before', rakahs: 2 },
    { id: 'dhuhr_before_2', label: 'Dhuhr 2 Before', rakahs: 2 },
    { id: 'dhuhr_after', label: 'Dhuhr 2 After', rakahs: 2 },
    { id: 'maghrib_after', label: 'Maghrib 2 After', rakahs: 2 },
    { id: 'isha_after', label: 'Isha 2 After', rakahs: 2 },
  ];

  const totalRawatib = checklistItems.reduce((acc, item) => {
    return acc + (rawatibChecked[item.id] ? item.rakahs : 0);
  }, 0);

  const isPalaceBuilt = totalRawatib === 12;

  return (
    <OrnamentedCard className="p-6 sm:p-7 space-y-5 border-accent-gold/45 bg-gradient-to-br from-bg-card via-bg-card to-accent-gold/5 shadow-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent-gold/20 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider border border-accent-gold/35">
              <Award className="w-3.5 h-3.5" />
              <span>Prophetic Sunnah & 12 Rawatib</span>
            </span>
            <span className="text-xs font-arabic text-accent-gold font-bold">
              سُنَنُ الصَّلَاةِ وَالصِّيَامِ
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
            Today’s Sunnah Prayers & Fasting Reminders
          </h2>
          <p className="text-xs text-text-muted">
            Preserve the 12 confirmed Sunan Rawatib daily for an eternal palace built in Jannah (Sahih Muslim #728).
          </p>
        </div>

        <button
          onClick={() => onNavigate('sunnah')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-xs uppercase tracking-wider transition-all self-start sm:self-auto shrink-0 shadow-xs cursor-pointer"
        >
          <span>Full Sunnah Sanctuary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Middle Layout: 12 Rawatib Tracker on left, Fasting Countdown on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 12 Rawatib Interactive Checklist (2 columns) */}
        <div className="lg:col-span-2 space-y-3.5 bg-bg-primary/70 p-4 sm:p-5 rounded-2xl border border-accent-gold/30">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                <span>12 Sunan Rawatib Today</span>
              </div>
              <div className="text-xs text-text-muted">
                Tap to check off each confirmed Sunnah you prayed today
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold font-mono text-accent-gold">
                {totalRawatib} / 12 <span className="text-xs text-text-muted">Rak’ahs</span>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-bg-card h-2 rounded-full overflow-hidden border border-accent-gold/25">
            <div
              className="bg-gradient-to-r from-accent-gold/70 via-accent-gold to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(totalRawatib / 12) * 100}%` }}
            />
          </div>

          {/* Checkboxes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {checklistItems.map((item) => {
              const isChecked = !!rawatibChecked[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-200 shadow-xs'
                      : 'bg-bg-card/90 border-accent-gold/25 hover:border-accent-gold text-text-primary'
                  }`}
                >
                  <span className="text-xs font-semibold">{item.label}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted hover:text-accent-gold shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>

          {isPalaceBuilt && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Mubarak! All 12 Sunan completed today. Your palace in Jannah awaits!</span>
            </div>
          )}
        </div>

        {/* Next Fasting Countdown Widget */}
        <div className="bg-bg-primary/70 p-4 sm:p-5 rounded-2xl border border-accent-gold/30 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-accent-gold" />
                <span>Prophetic Fast</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                {fastInfo.isTodayFastDay ? 'Today' : 'Upcoming'}
              </span>
            </div>

            <div className="text-base sm:text-lg font-bold font-serif text-text-primary">
              {fastInfo.fastName}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {fastInfo.reason}
            </p>
          </div>

          <div className="pt-3 border-t border-accent-gold/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-text-muted block uppercase">Schedule</span>
              <span className="text-xs font-bold text-accent-gold">{fastInfo.nextDayName}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-text-muted block uppercase">Remaining</span>
              <span className="text-sm font-bold font-mono text-accent-gold">
                {fastInfo.isTodayFastDay ? 'FASTING' : `${fastInfo.daysRemaining} Days`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prayer Rak'ah Summary Line */}
      <div className="p-3.5 rounded-xl bg-bg-primary/90 border border-accent-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-accent-gold uppercase tracking-wider">
          Sunnah Breakdown at a glance:
        </span>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          <span className="px-2 py-0.5 rounded bg-bg-card border border-accent-gold/25 text-text-secondary">
            <strong className="text-text-primary">Fajr:</strong> 2 before Fard • <span className="text-rose-300 font-bold">⛔ No prayer after</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-bg-card border border-accent-gold/25 text-text-secondary">
            <strong className="text-text-primary">Dhuhr:</strong> 4 before • 2 after Fard
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-200">
            <strong className="text-rose-100">Asr:</strong> 4 voluntary before • <span className="text-rose-300 font-bold">⛔ Prohibited after</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-bg-card border border-accent-gold/25 text-text-secondary">
            <strong className="text-text-primary">Maghrib:</strong> 2 after Fard
          </span>
          <span className="px-2 py-0.5 rounded bg-bg-card border border-accent-gold/25 text-text-secondary">
            <strong className="text-text-primary">Isha:</strong> 2 after Fard • + Witr seal
          </span>
        </div>
      </div>
    </OrnamentedCard>
  );
}
