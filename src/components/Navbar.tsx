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
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              ن
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-lg tracking-tight font-serif">
                  Noor
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-1.5 py-0.5 rounded-md uppercase">
                  نُور
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Connect deeply with sacred words
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-200/60 p-1 rounded-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-800' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.key === 'saved' && savedItems.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center">
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
              className="p-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors flex items-center gap-1.5 border border-stone-200/80 bg-white shadow-2xs"
            >
              <Volume2 className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-semibold hidden lg:inline">Recitation Audio</span>
            </button>

            <button
              onClick={() => onSelectTab('saved')}
              className="md:hidden p-2 text-stone-600 rounded-xl hover:bg-stone-200/60 relative"
            >
              <Bookmark className="w-4 h-4" />
              {savedItems.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors relative ${
                isActive ? 'text-emerald-900 font-bold' : 'text-stone-500 font-medium'
              }`}
            >
              <div className={isActive ? 'text-emerald-800 scale-110' : 'text-stone-400'}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-1">{item.label}</span>
              {item.key === 'saved' && savedItems.length > 0 && (
                <span className="absolute top-0.5 right-2 w-3.5 h-3.5 rounded-full bg-emerald-800 text-white text-[8px] flex items-center justify-center">
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
