import React, { useState } from 'react';
import { WifiOff, CheckCircle2, ChevronRight, X, BookOpen, Sparkles } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

interface OfflineSanctuaryBannerProps {
  onOpenSurahById?: (surahNumber: number) => void;
}

export function OfflineSanctuaryBanner({ onOpenSurahById }: OfflineSanctuaryBannerProps) {
  const { isOnline, cachedCount, cachedSurahs } = useOfflineStatus();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // If online, don't show the offline alert banner
  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <div className="relative mb-5 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-gradient-to-r from-amber-950/80 via-bg-card to-amber-950/70 border border-amber-500/50 rounded-2xl p-4 shadow-lg text-text-primary">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-serif">
                  Offline Sanctuary Mode Active
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {cachedCount} Surah{cachedCount !== 1 ? 's' : ''} Cached
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                No internet connection. All previously viewed Surahs, complete Hadith library, and prayer times remain fully accessible.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {cachedCount > 0 && onOpenSurahById && (
              <button
                onClick={() => setShowDrawer(!showDrawer)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Offline Surahs</span>
              </button>
            )}

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-xl hover:bg-bg-primary/50 text-text-muted hover:text-text-primary transition-colors"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable list of cached surahs for instant offline reading */}
        {showDrawer && cachedSurahs.length > 0 && onOpenSurahById && (
          <div className="mt-3 pt-3 border-t border-amber-500/30">
            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available for Instant Reading:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cachedSurahs.map((num) => (
                <button
                  key={num}
                  onClick={() => onOpenSurahById(num)}
                  className="px-3 py-1 rounded-lg bg-bg-card hover:bg-bg-primary border border-accent-gold/40 text-accent-gold text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Surah #{num}</span>
                  <ChevronRight className="w-3 h-3 text-accent-gold/70" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
