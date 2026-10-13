import React, { useState } from 'react';
import {
  X,
  Bell,
  BellOff,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Sparkles,
  Clock,
  Send,
  Loader2,
  Share,
  PlusSquare,
  ShieldCheck,
  Moon,
  Sun,
  Flame,
} from 'lucide-react';
import { useNotifications, type NotificationPreferences } from '@/context/NotificationContext';
import { CornerFlourishes } from './Ornamentation';

export function NotificationSettingsModal() {
  const {
    permission,
    isSupported,
    isSubscribed,
    isSubscribing,
    preferences,
    isIOS,
    isStandalone,
    enableNotifications,
    disableNotifications,
    updatePreferences,
    sendTestNotification,
    isModalOpen,
    closeModal,
    lastTestStatus,
  } = useNotifications();

  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleToggleEnable = async () => {
    if (isSubscribed) {
      await disableNotifications();
    } else {
      const ok = await enableNotifications();
      if (!ok && permission === 'denied') {
        alert(
          'Notifications are currently blocked in your browser or device settings. Please allow notifications for Noor in your phone site settings to receive reminders.'
        );
      }
    }
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendTestNotification();
      setTestResult(res.message);
    } finally {
      setIsSendingTest(false);
    }
  };

  const toggleChannel = (channel: keyof NotificationPreferences) => {
    updatePreferences({ [channel]: !preferences[channel] });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-bg-card rounded-3xl border border-accent-gold shadow-2xl p-5 sm:p-7 text-text-primary my-auto max-h-[92vh] flex flex-col">
        <CornerFlourishes size={16} opacity={0.7} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-accent-gold/25 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30 mb-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Native Phone Alerts</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary tracking-tight">
              Phone Push Notifications
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
              Receive prayer times, Adhan alerts, and daily Quranic reflections directly on your phone's lock screen.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-text-muted hover:text-accent-gold border border-accent-gold/30 bg-bg-primary/50 transition-colors shrink-0"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="py-4 overflow-y-auto space-y-4 flex-1 pr-1">
          {/* Status Indicator Card */}
          <div className="p-4 rounded-2xl bg-bg-primary/80 border border-accent-gold/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs shrink-0 ${
                  isSubscribed && permission === 'granted'
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-400'
                    : permission === 'denied'
                    ? 'bg-rose-950/70 border-rose-500/60 text-rose-400'
                    : 'bg-amber-950/70 border-amber-500/60 text-amber-400'
                }`}
              >
                {isSubscribed && permission === 'granted' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : permission === 'denied' ? (
                  <BellOff className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <span>
                    {isSubscribed && permission === 'granted'
                      ? 'Connected to Your Phone'
                      : permission === 'denied'
                      ? 'Notifications Blocked'
                      : 'Not Yet Connected'}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isSubscribed && permission === 'granted'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isSubscribed && permission === 'granted' ? 'Active' : 'Action Required'}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  {isSubscribed && permission === 'granted'
                    ? 'Alerts will be delivered directly to your device even when the app is closed.'
                    : permission === 'denied'
                    ? 'Please unblock notifications in your phone site settings to receive reminders.'
                    : 'Tap Enable to receive daily spiritual reminders and prayer call alerts.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleEnable}
              disabled={isSubscribing || !isSupported}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs ${
                isSubscribed
                  ? 'bg-bg-card border border-accent-gold/40 text-text-secondary hover:text-text-primary hover:border-accent-gold'
                  : 'bg-accent-gold text-bg-primary hover:bg-accent-gold-dim'
              }`}
            >
              {isSubscribing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : isSubscribed ? (
                <span>Disable Alerts</span>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Enable On My Phone</span>
                </>
              )}
            </button>
          </div>

          {/* Special Guidance for iOS / iPhone users */}
          {isIOS && !isStandalone && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-text-primary space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Notice for iPhone & iPad Users</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Apple requires web apps to be added to the Home Screen to receive native phone lock-screen push notifications.
              </p>
              <div className="flex items-center gap-3 pt-1 text-text-primary font-medium">
                <span className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg border border-accent-gold/30">
                  <Share className="w-3.5 h-3.5 text-accent-gold" /> 1. Tap Share
                </span>
                <span>→</span>
                <span className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg border border-accent-gold/30">
                  <PlusSquare className="w-3.5 h-3.5 text-accent-gold" /> 2. Add to Home Screen
                </span>
              </div>
            </div>
          )}

          {/* Test Notification Trigger */}
          <div className="p-4 rounded-2xl bg-bg-primary/50 border border-accent-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Test Phone Delivery</span>
              </span>
              <p className="text-xs text-text-secondary">
                Send an immediate test alert to see how it appears on your lock screen and banner.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSendTest}
                disabled={isSendingTest}
                className="px-4 py-2 rounded-xl bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold border border-accent-gold/45 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {isSendingTest ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test Alert</span>
                  </>
                )}
              </button>

              <button
                onClick={async () => {
                  setIsSendingTest(true);
                  setTestResult(null);
                  try {
                    const res = await fetch('/api/notifications/trigger-now', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ category: 'dailyAyah' }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      setTestResult(`Sent Ayah reminder to ${data.count} device(s) successfully! Check your phone lock screen.`);
                    } else {
                      setTestResult('No subscribed device found. Please tap "Enable On My Phone" first.');
                    }
                  } catch {
                    setTestResult('Failed to trigger broadcast.');
                  } finally {
                    setIsSendingTest(false);
                  }
                }}
                disabled={isSendingTest}
                className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0"
                title="Send today's Ayah devotional reminder to all subscribed devices"
              >
                <Sun className="w-3.5 h-3.5 text-emerald-300" />
                <span>Send Ayah Now</span>
              </button>
            </div>
          </div>

          {/* Autonomous 24/7 Server Dispatcher Status */}
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-emerald-300 uppercase tracking-wider block">
                  Autonomous 24/7 Server Dispatcher Active
                </span>
                <span className="text-text-secondary text-[11px]">
                  Checks schedule every 60s & delivers Web Push reminders directly to your lock screen even when Noor is closed.
                </span>
              </div>
            </div>
          </div>

          {/* Test Status Banner */}
          {(testResult || lastTestStatus) && (
            <div className="p-3 rounded-xl bg-accent-gold/15 border border-accent-gold/35 text-xs text-text-primary flex items-start gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <span>{testResult || lastTestStatus}</span>
            </div>
          )}

          {/* Devotional Reminder Channels */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center justify-between">
              <span>Devotional Channels & Schedule</span>
              <span className="text-[11px] text-text-muted font-normal">Choose what you receive</span>
            </div>

            {/* 1. Prayer Times & Adhan */}
            <div className="p-3.5 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary font-serif">
                    🕌 Prayer Times & Adhan Calls
                  </h4>
                  <p className="text-[11px] text-text-secondary">
                    Alerts at Fajr, Dhuhr, Asr, Maghrib, and Isha with calculated local prayer times.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences.prayerTimes}
                onChange={() => toggleChannel('prayerTimes')}
                className="w-4 h-4 rounded accent-accent-gold cursor-pointer"
              />
            </div>

            {/* 2. Daily Ayah & Morning Reflection */}
            <div className="p-3.5 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary font-serif">
                    📖 Daily Ayah & Morning Contemplation
                  </h4>
                  <p className="text-[11px] text-text-secondary">
                    Start your morning with a tranquil verse from the Noble Quran and its reflection.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences.dailyAyah}
                onChange={() => toggleChannel('dailyAyah')}
                className="w-4 h-4 rounded accent-accent-gold cursor-pointer"
              />
            </div>

            {/* 3. Evening Adhkar */}
            <div className="p-3.5 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary font-serif">
                    🌙 Evening Adhkar & Night Peace
                  </h4>
                  <p className="text-[11px] text-text-secondary">
                    Nightly reminder for bedtime supplications, Ayatul Kursi, and quiet reflection.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences.eveningAdhkar}
                onChange={() => toggleChannel('eveningAdhkar')}
                className="w-4 h-4 rounded accent-accent-gold cursor-pointer"
              />
            </div>

            {/* 4. Friday Surah Al-Kahf */}
            <div className="p-3.5 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary font-serif">
                    ✨ Friday Surah Al-Kahf Reminder
                  </h4>
                  <p className="text-[11px] text-text-secondary">
                    Weekly reminder on Friday morning for the light between the two Fridays.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences.fridayKahf}
                onChange={() => toggleChannel('fridayKahf')}
                className="w-4 h-4 rounded accent-accent-gold cursor-pointer"
              />
            </div>

            {/* 5. Quran Streak & Goal Alerts */}
            <div className="p-3.5 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary font-serif">
                    🔥 Daily Quran Practice Streak
                  </h4>
                  <p className="text-[11px] text-text-secondary">
                    Gentle nudge if you haven't completed your daily recitation goal.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={preferences.quranStreak}
                onChange={() => toggleChannel('quranStreak')}
                className="w-4 h-4 rounded accent-accent-gold cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-accent-gold/25 flex items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-text-secondary flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Web Push (Zero Spam)</span>
          </div>

          <button
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl bg-accent-gold text-bg-primary font-bold hover:bg-accent-gold-dim transition-colors uppercase tracking-wider shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
