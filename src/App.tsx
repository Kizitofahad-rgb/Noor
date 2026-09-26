import { useState } from 'react';
import { NoorProvider } from './context/NoorContext';
import { Navbar, type TabKey } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { QuranView } from './components/views/QuranView';
import { LibraryView } from './components/views/LibraryView';
import { ReelsView } from './components/views/ReelsView';
import { LearnView } from './components/views/LearnView';
import { SavedView } from './components/views/SavedView';
import { AudioPlayerBar, type ActiveAudioState } from './components/AudioPlayerBar';
import { ReciterSelector } from './components/ReciterSelector';
import { SurahDeepDiveModal } from './components/SurahDeepDiveModal';
import type { Surah } from './lib/content';

function NoorApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [activeAudio, setActiveAudio] = useState<ActiveAudioState | null>(null);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [selectedSurahForDive, setSelectedSurahForDive] = useState<Surah | null>(null);

  const handlePlayAudio = (state: ActiveAudioState) => {
    setActiveAudio(state);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 md:pb-16">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSurah={(surah) => setSelectedSurahForDive(surah)}
            onPlayAudio={handlePlayAudio}
          />
        )}

        {activeTab === 'quran' && (
          <QuranView
            onOpenSurah={(surah) => setSelectedSurahForDive(surah)}
            onPlayAudio={handlePlayAudio}
            onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
          />
        )}

        {activeTab === 'library' && <LibraryView />}

        {activeTab === 'reels' && <ReelsView />}

        {activeTab === 'learn' && <LearnView />}

        {activeTab === 'saved' && (
          <SavedView
            onOpenSurah={(surah) => setSelectedSurahForDive(surah)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Recitation Audio Player Bar */}
      <AudioPlayerBar
        audioState={activeAudio}
        onClose={() => setActiveAudio(null)}
        onOpenSettings={() => setIsAudioSettingsOpen(true)}
      />

      {/* Surah Deep Dive Study Guide Modal */}
      {selectedSurahForDive && (
        <SurahDeepDiveModal
          surah={selectedSurahForDive}
          onClose={() => setSelectedSurahForDive(null)}
          onPlayAudio={handlePlayAudio}
        />
      )}

      {/* Audio Settings & Reciter Selector Modal */}
      {isAudioSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <ReciterSelector onClose={() => setIsAudioSettingsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NoorProvider>
      <NoorApp />
    </NoorProvider>
  );
}
