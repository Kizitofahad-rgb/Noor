import React from 'react';
import {
  BookOpen,
  Bookmark,
  Volume2,
  Home,
  Sparkles,
  Film,
  Compass,
  User,
  LogIn,
  Share2,
  Scroll,
  Palette,
} from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import { useAuth } from '@/context/AuthContext';

export type TabKey = 'home' | 'quran' | 'stories' | 'library' | 'reels' | 'learn' | 'saved' | 'profile';

const sectionTabColorMeta: Record<TabKey, {
  activePill: string;
  activeIcon: string;
  badge: string;
  arabicLabel: string;
  sub: string;
}> = {
  home: {
    activePill: 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-xs shadow-amber-500/10',
    activeIcon: 'text-amber-400',
    badge: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    arabicLabel: 'اليوم',
    sub: 'Daily Sanctuary',
  },
  quran: {
    activePill: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/60 shadow-xs shadow-emerald-500/15',
    activeIcon: 'text-emerald-400',
    badge: 'border-emerald-400/40 text-emerald-300 bg-emerald-500/10',
    arabicLabel: 'القرآن الكريم',
    sub: 'The Noble Quran',
  },
  stories: {
    activePill: 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-xs shadow-orange-500/10',
    activeIcon: 'text-orange-400',
    badge: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
    arabicLabel: 'قصص الأنبياء',
    sub: 'Prophetic Chronicles',
  },
  library: {
    activePill: 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-xs shadow-sky-500/10',
    activeIcon: 'text-sky-400',
    badge: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    arabicLabel: 'مكتبة الحديث والتفسير',
    sub: 'Scholarly Library',
  },
  reels: {
    activePill: 'bg-purple-500/20 text-purple-300 border-purple-400/50 shadow-xs shadow-purple-500/10',
    activeIcon: 'text-purple-400',
    badge: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    arabicLabel: 'مقاطع وتذكير',
    sub: 'Video Reminders',
  },
  learn: {
    activePill: 'bg-teal-500/20 text-teal-300 border-teal-400/50 shadow-xs shadow-teal-500/10',
    activeIcon: 'text-teal-400',
    badge: 'border-teal-500/40 text-teal-400 bg-teal-500/10',
    arabicLabel: 'تعلم التجويد والعربية',
    sub: 'Arabic & Tajweed',
  },
  saved: {
    activePill: 'bg-rose-500/20 text-rose-300 border-rose-400/50 shadow-xs shadow-rose-500/10',
    activeIcon: 'text-rose-400',
    badge: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    arabicLabel: 'المحفوظات',
    sub: 'Personal Vault',
  },
  profile: {
    activePill: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50 shadow-xs shadow-yellow-500/10',
    activeIcon: 'text-yellow-400',
    badge: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
    arabicLabel: 'الملف والختمة',
    sub: 'Spiritual Journey',
  },
};

export function Navbar({
  activeTab,
  onSelectTab,
  onOpenAudioSettings,
  onOpenShareModal,
  onOpenThemeModal,
}: {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenAudioSettings: () => void;
  onOpenShareModal?: () => void;
  onOpenThemeModal?: () => void;
}) {
  const { savedItems } = useNoor();
  const { user, openAuthModal } = useAuth();

  const currentMeta = sectionTabColorMeta[activeTab];

  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: 'Today', icon: <Home className="w-4 h-4" /> },
    { key: 'quran', label: 'Quran', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'stories', label: 'Stories', icon: <Scroll className="w-4 h-4" /> },
    { key: 'library', label: 'Library', icon: <Compass className="w-4 h-4" /> },
    { key: 'reels', label: 'Reels', icon: <Film className="w-4 h-4" /> },
    { key: 'learn', label: 'Arabic', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4" /> },
    { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-bg-primary/95 backdrop-blur-md border-b border-accent-gold/25 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Subtitle with dynamic section badge */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-bg-card border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-lg shadow-sm group-hover:border-accent-gold-dim transition-colors">
              ن
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary text-xl tracking-tight font-serif">
                  Noor
                </span>
                <span className={`text-[10px] font-serif tracking-widest border px-1.5 py-0.5 rounded uppercase font-bold transition-colors ${currentMeta.badge}`}>
                  {currentMeta.arabicLabel}
                </span>
              </div>
              <p className="text-[11px] opacity-75 hidden sm:block font-serif italic">
                {currentMeta.sub}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-bg-card/90 border border-accent-gold/30 p-1.5 rounded-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              const meta = sectionTabColorMeta[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs lg:text-sm transition-all relative font-semibold border ${
                    isActive
                      ? meta.activePill
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-primary/40'
                  }`}
                >
                  <span className={isActive ? meta.activeIcon : 'opacity-65'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.key === 'saved' && savedItems.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-accent-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
                      {savedItems.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            {onOpenThemeModal && (
              <button
                onClick={onOpenThemeModal}
                title="Change global app theme & colors"
                className="px-3 py-2 text-text-primary hover:text-accent-gold rounded-xl transition-colors flex items-center gap-1.5 border border-accent-gold/40 bg-bg-card shadow-xs hover:border-accent-gold"
              >
                <Palette className="w-4 h-4 text-accent-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden xl:inline">Theme</span>
              </button>
            )}

            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                title="Share Noor with family & friends"
                className="px-3 py-2 text-text-primary hover:text-accent-gold rounded-xl transition-colors flex items-center gap-1.5 border border-accent-gold/40 bg-bg-card shadow-xs hover:border-accent-gold"
              >
                <Share2 className="w-4 h-4 text-accent-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden lg:inline">Share</span>
              </button>
            )}

            <button
              onClick={onOpenAudioSettings}
              title="Recitation settings"
              className="px-3 py-2 text-text-primary hover:text-accent-gold rounded-xl transition-colors flex items-center gap-2 border border-accent-gold/40 bg-bg-card shadow-xs hover:border-accent-gold"
            >
              <Volume2 className="w-4 h-4 text-accent-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden lg:inline">Audio</span>
            </button>

            {user ? (
              <button
                onClick={() => onSelectTab('profile')}
                title="View your sacred profile & progress"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 border ${
                  activeTab === 'profile'
                    ? 'bg-accent-gold/25 border-accent-gold text-accent-gold shadow-xs'
                    : 'bg-bg-card border-accent-gold/40 hover:border-accent-gold text-text-primary'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-bg-primary border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-xs">
                  {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:inline">
                  {user.displayName.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary rounded-xl transition-colors flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab('saved')}
              className="md:hidden p-2 text-text-secondary rounded-xl hover:bg-bg-card relative border border-accent-gold/30"
            >
              <Bookmark className="w-4 h-4 text-accent-gold" />
              {savedItems.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-gold" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/98 backdrop-blur-md border-t border-accent-gold/25 px-2 py-2 flex items-center justify-around shadow-2xl transition-colors duration-300">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const meta = sectionTabColorMeta[item.key];
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? `${meta.activeIcon} font-bold scale-105` : 'text-text-secondary/70 font-medium'
              }`}
            >
              <div className={isActive ? meta.activeIcon : 'opacity-60'}>
                {item.icon}
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
              {item.key === 'saved' && savedItems.length > 0 && (
                <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-accent-gold text-bg-primary text-[9px] font-bold flex items-center justify-center">
                  {savedItems.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
