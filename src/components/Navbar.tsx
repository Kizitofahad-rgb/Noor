import React from 'react';
import {
  BookOpen,
  Bookmark,
  Volume2,
  Home,
  Sparkles,
  Film,
  Compass,
} from 'lucide-react';
import { useNoor } from '@/context/NoorContext';

export type TabKey = 'home' | 'quran' | 'library' | 'reels' | 'learn' | 'saved';

export function Navbar({
  activeTab,
  onSelectTab,
  onOpenAudioSettings,
}: {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenAudioSettings: () => void;
}) {
  const { savedItems } = useNoor();

  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: 'Today', icon: <Home className="w-4 h-4" /> },
    { key: 'quran', label: 'Quran Hub', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'library', label: 'Library', icon: <Compass className="w-4 h-4" /> },
    { key: 'reels', label: 'Reels', icon: <Film className="w-4 h-4" /> },
    { key: 'learn', label: 'Arabic', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-bg-primary/95 backdrop-blur-md border-b border-accent-gold/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Subtitle */}
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
                <span className="text-[10px] font-serif tracking-widest text-accent-gold bg-bg-card border border-accent-gold/40 px-1.5 py-0.5 rounded uppercase">
                  نُور
                </span>
              </div>
              <p className="text-[11px] text-text-primary/70 hidden sm:block font-serif italic">
                Connect deeply with sacred words
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-bg-card/90 border border-accent-gold/35 p-1.5 rounded-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all relative font-semibold ${
                    isActive
                      ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
                  }`}
                >
                  <span className={isActive ? 'text-accent-gold' : 'text-text-muted'}>
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
            <button
              onClick={onOpenAudioSettings}
              title="Recitation settings"
              className="px-3.5 py-2 text-text-primary hover:text-accent-gold rounded-xl transition-colors flex items-center gap-2 border border-accent-gold/40 bg-bg-card shadow-xs hover:border-accent-gold"
            >
              <Volume2 className="w-4 h-4 text-accent-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden lg:inline">Recitation Audio</span>
            </button>

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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/98 backdrop-blur-md border-t border-accent-gold/30 px-2 py-2.5 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors relative ${
                isActive ? 'text-accent-gold font-bold' : 'text-text-secondary font-medium'
              }`}
            >
              <div className={isActive ? 'text-accent-gold scale-110' : 'text-text-muted'}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {item.key === 'saved' && savedItems.length > 0 && (
                <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-accent-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
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
