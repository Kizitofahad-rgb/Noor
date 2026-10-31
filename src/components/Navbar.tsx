import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Bookmark,
  Volume2,
  Home,
  Sparkles,
  Film,
  Compass,
  User,
  Share2,
  Scroll,
  Palette,
  Bell,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';

export type TabKey = 'home' | 'sunnah' | 'quran' | 'stories' | 'library' | 'reels' | 'learn' | 'saved' | 'profile';

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
  sunnah: {
    activePill: 'bg-amber-500/25 text-amber-300 border-amber-400/60 shadow-xs shadow-amber-500/15',
    activeIcon: 'text-amber-400',
    badge: 'border-amber-400/40 text-amber-300 bg-amber-500/10',
    arabicLabel: 'السنن النبوية',
    sub: 'Prophetic Sunnah',
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
    arabicLabel: 'المكتبة واللغة',
    sub: 'Library & Arabic',
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
    badge: 'border-yellow-400/40 text-yellow-400 bg-yellow-500/10',
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
  onOpenNotificationModal,
}: {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenAudioSettings: () => void;
  onOpenShareModal?: () => void;
  onOpenThemeModal?: () => void;
  onOpenNotificationModal?: () => void;
}) {
  const { savedItems, appTheme } = useNoor();
  const { user } = useAuth();
  const { isSubscribed, permission } = useNotifications();

  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsToolsOpen(false);
    };
    if (isToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isToolsOpen]);

  const currentMeta = sectionTabColorMeta[activeTab];

  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: 'Today', icon: <Home className="w-4 h-4" /> },
    { key: 'sunnah', label: 'Sunnah', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'quran', label: 'Quran', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'stories', label: 'Stories', icon: <Scroll className="w-4 h-4" /> },
    { key: 'library', label: 'Library', icon: <Compass className="w-4 h-4" /> },
    { key: 'reels', label: 'Reels', icon: <Film className="w-4 h-4" /> },
    { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  // Desktop navigation items: exclude Profile so it resides solely in the top-right action bar
  const desktopNavItems = navItems.filter((item) => item.key !== 'profile');

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
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-accent-gold/60 shadow-md shadow-accent-gold/25 group-hover:border-accent-gold transition-all duration-300 shrink-0 bg-bg-card">
              <img
                src="/noor_logo.jpg"
                alt="Noor Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-accent-gold/40 rounded-2xl pointer-events-none" />
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

          {/* Desktop Navigation Tabs (Content Categories) */}
          <nav className="hidden md:flex items-center gap-0.5 bg-bg-card/80 backdrop-blur-md border border-accent-gold/25 p-1 rounded-2xl shadow-xs">
            {desktopNavItems.map((item) => {
              const isActive = activeTab === item.key;
              const meta = sectionTabColorMeta[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs lg:text-sm transition-all relative font-medium border ${
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

          {/* Summarized Header Control Center */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick Audio Settings */}
            <button
              onClick={onOpenAudioSettings}
              title="Recitation settings"
              className="p-2 text-text-secondary hover:text-accent-gold rounded-xl transition-colors hover:bg-bg-card/80 border border-transparent hover:border-accent-gold/30 flex items-center justify-center"
              aria-label="Audio settings"
            >
              <Volume2 className="w-4 h-4 text-accent-gold" />
            </button>

            {/* Quick Saved Items */}
            <button
              onClick={() => onSelectTab('saved')}
              title="Saved items & contemplation journal"
              className={`relative p-2 rounded-xl transition-all border flex items-center justify-center ${
                activeTab === 'saved'
                  ? 'border-accent-gold bg-accent-gold/15 text-accent-gold'
                  : 'border-transparent text-text-secondary hover:text-accent-gold hover:bg-bg-card/80 hover:border-accent-gold/30'
              }`}
              aria-label="Saved items"
            >
              <Bookmark className="w-4 h-4 text-accent-gold" />
              {savedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-accent-gold text-bg-primary text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {savedItems.length}
                </span>
              )}
            </button>

            {/* Summarized Tools Dropdown (Theme, Prayer Alerts, Share) */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                title="Sanctuary tools: theme, prayer alerts & share"
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border text-xs font-semibold ${
                  isToolsOpen
                    ? 'bg-accent-gold/20 border-accent-gold text-accent-gold'
                    : 'bg-bg-card/80 border-accent-gold/30 hover:border-accent-gold text-text-secondary hover:text-text-primary'
                }`}
                aria-expanded={isToolsOpen}
              >
                <div className="relative flex items-center justify-center">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-accent-gold" />
                  {isSubscribed && permission === 'granted' && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <span className="hidden sm:inline">Tools</span>
                <ChevronDown className={`w-3 h-3 text-text-secondary transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-bg-card/95 backdrop-blur-xl border border-accent-gold/35 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-gold/80 font-serif border-b border-accent-gold/15 mb-1 flex items-center justify-between">
                    <span>Sanctuary Tools</span>
                    <span className="text-[9px] text-text-secondary/70 font-sans font-normal">Preferences</span>
                  </div>

                  {onOpenThemeModal && (
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenThemeModal();
                      }}
                      className="w-full px-2.5 py-2 text-left rounded-xl hover:bg-bg-primary/60 text-text-primary hover:text-accent-gold transition-colors flex items-center justify-between group text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-bg-primary/80 border border-accent-gold/25 flex items-center justify-center text-accent-gold group-hover:border-accent-gold/50">
                          <Palette className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold">App Theme</div>
                          <div className="text-[10px] text-text-secondary capitalize">{appTheme}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-accent-gold font-bold">Change</span>
                    </button>
                  )}

                  {onOpenNotificationModal && (
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenNotificationModal();
                      }}
                      className="w-full px-2.5 py-2 text-left rounded-xl hover:bg-bg-primary/60 text-text-primary hover:text-accent-gold transition-colors flex items-center justify-between group text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-bg-primary/80 border border-accent-gold/25 flex items-center justify-center text-accent-gold group-hover:border-accent-gold/50 relative">
                          <Bell className="w-3.5 h-3.5" />
                          {isSubscribed && permission === 'granted' && (
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-bg-card" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">Prayer Alerts</div>
                          <div className="text-[10px] text-text-secondary">
                            {isSubscribed && permission === 'granted' ? 'Active on device' : 'Adhan notifications'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-accent-gold font-bold">
                        {isSubscribed && permission === 'granted' ? 'Manage' : 'Enable'}
                      </span>
                    </button>
                  )}

                  {onOpenShareModal && (
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenShareModal();
                      }}
                      className="w-full px-2.5 py-2 text-left rounded-xl hover:bg-bg-primary/60 text-text-primary hover:text-accent-gold transition-colors flex items-center justify-between group text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-bg-primary/80 border border-accent-gold/25 flex items-center justify-center text-accent-gold group-hover:border-accent-gold/50">
                          <Share2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold">Share Noor</div>
                          <div className="text-[10px] text-text-secondary">Invite family & friends</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-accent-gold font-bold">Share</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile Sanctuary Trigger */}
            {user ? (
              <button
                onClick={() => onSelectTab('profile')}
                title="View your sacred profile & progress"
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 border text-xs font-semibold ${
                  activeTab === 'profile'
                    ? 'bg-accent-gold/25 border-accent-gold text-accent-gold shadow-xs'
                    : 'bg-bg-card/80 border-accent-gold/30 hover:border-accent-gold text-text-primary'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-bg-primary border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-xs shrink-0">
                  {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                </div>
                <span className="max-w-[70px] sm:max-w-[100px] truncate hidden sm:inline">
                  {user.displayName.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('profile')}
                title="View profile & account"
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 border text-xs font-semibold ${
                  activeTab === 'profile'
                    ? 'bg-accent-gold/25 border-accent-gold text-accent-gold shadow-xs'
                    : 'bg-bg-card/80 border-accent-gold/30 hover:border-accent-gold text-text-primary'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-bg-primary border border-accent-gold/60 text-accent-gold flex items-center justify-center font-bold text-xs shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline">Profile</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/98 backdrop-blur-md border-t border-accent-gold/25 px-1 py-1.5 flex items-center justify-around shadow-2xl transition-colors duration-300">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const meta = sectionTabColorMeta[item.key];
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-all relative ${
                isActive ? `${meta.activeIcon} font-bold scale-105` : 'text-text-secondary/70 font-medium'
              }`}
            >
              <div className={isActive ? meta.activeIcon : 'opacity-60'}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
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
