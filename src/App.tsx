import { useState, useEffect } from 'react';
import { NoorProvider } from './context/NoorContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar, type TabKey } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { QuranView } from './components/views/QuranView';
import { StoriesView } from './components/views/StoriesView';
import { LibraryView } from './components/views/LibraryView';
import { ReelsView } from './components/views/ReelsView';
import { LearnView } from './components/views/LearnView';
import { SavedView } from './components/views/SavedView';
import { ProfileView } from './components/views/ProfileView';
import { AuthModal } from './components/AuthModal';
import { ShareNoorModal } from './components/ShareNoorModal';
import { AudioPlayerBar, type ActiveAudioState } from './components/AudioPlayerBar';
import { ReciterSelector } from './components/ReciterSelector';
import { SurahDeepDiveModal } from './components/SurahDeepDiveModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { useNoor } from './context/NoorContext';
import type { Surah } from './lib/content';

function NoorApp() {
  const { appTheme } = useNoor();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [activeAudio, setActiveAudio] = useState<ActiveAudioState | null>(null);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedSurahForDive, setSelectedSurahForDive] = useState<Surah | null>(null);

  const handlePlayAudio = (state: ActiveAudioState) => {
    setActiveAudio(state);
  };

  const activeThemeSection =
    appTheme === 'dynamic'
      ? activeTab
      : appTheme === 'emerald'
      ? 'quran'
      : appTheme === 'ochre'
      ? 'stories'
      : appTheme === 'sapphire'
      ? 'library'
      : appTheme === 'jade'
      ? 'learn'
      : appTheme === 'amethyst'
      ? 'reels'
      : appTheme === 'rosewood'
      ? 'saved'
      : appTheme === 'gold'
      ? 'profile'
      : appTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-section', activeThemeSection);
    document.body.setAttribute('data-section', activeThemeSection);
  }, [activeThemeSection]);

  return (
    <div
      data-section={activeThemeSection}
      className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-serif selection:bg-accent-gold/30 selection:text-text-primary pb-20 md:pb-16 transition-colors duration-500"
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
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

        {activeTab === 'stories' && (
          <StoriesView
            onOpenSurah={(surah) => setSelectedSurahForDive(surah)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShareModal={() => setIsShareModalOpen(true)}
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

        {activeTab === 'profile' && (
          <ProfileView
            onOpenSurah={(surah) => setSelectedSurahForDive(surah)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShareModal={() => setIsShareModalOpen(true)}
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-card rounded-2xl max-w-md w-full shadow-2xl border border-accent-gold overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <ReciterSelector onClose={() => setIsAudioSettingsOpen(false)} />
          </div>
        </div>
      )}

      {/* Authentication Modal (Sign In & Sign Up) */}
      <AuthModal />

      {/* Share Noor Dialog (Web Share & PWA Install) */}
      <ShareNoorModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Global Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NoorProvider>
        <NoorApp />
      </NoorProvider>
    </AuthProvider>
  );
}
