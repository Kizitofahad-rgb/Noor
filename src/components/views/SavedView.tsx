import { Bookmark, BookOpen, Trash2, Calendar, Sparkles } from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import { surahs, verses, libraryItems, type Surah } from '@/lib/content';
import { OrnamentedCard, BorderedSubPanel, SectionDivider } from '../Ornamentation';

export function SavedView({
  onOpenSurah,
  onNavigate,
}: {
  onOpenSurah: (surah: Surah) => void;
  onNavigate: (tab: 'home' | 'quran' | 'library' | 'reels' | 'learn' | 'saved') => void;
}) {
  const { savedItems, toggleSaved, userReflections } = useNoor();

  // Find saved items
  const savedSurahList = surahs.filter((s) => savedItems.includes(`surah-${s.id}`));
  const savedVerseList = verses.filter((v) =>
    savedItems.includes(`verse-${v.surahId}-${v.number}`)
  );
  const savedHadithList = libraryItems.filter((i) => savedItems.includes(`lib-${i.id}`));

  const hasAnySaved =
    savedSurahList.length > 0 ||
    savedVerseList.length > 0 ||
    savedHadithList.length > 0 ||
    userReflections.length > 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-serif text-text-primary">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Your Personal Library & Journal
        </h1>
        <p className="text-text-primary/70 text-xs sm:text-sm mt-1">
          Saved sacred verses, authentic hadith, and your personal moments of contemplation.
        </p>
      </div>

      {!hasAnySaved ? (
        <OrnamentedCard className="text-center py-20 p-8 space-y-4">
          <Bookmark className="w-12 h-12 text-accent-gold/40 mx-auto" />
          <h3 className="text-lg font-bold text-text-primary">Your Library is Waiting</h3>
          <p className="text-xs text-text-primary/70 max-w-sm mx-auto leading-relaxed">
            Bookmark inspiring verses from the Quran Hub, hadith from the library, or write daily reflections on the home page.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quran')}
              className="px-5 py-2.5 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary rounded-xl text-xs font-bold shadow-xs label-caps transition-colors"
            >
              Explore Quran Hub
            </button>
          </div>
        </OrnamentedCard>
      ) : (
        <div className="space-y-8">
          {/* User Reflection Journal */}
          {userReflections.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                  <span>Your Contemplation Journal ({userReflections.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userReflections.map((ref) => (
                  <OrnamentedCard
                    key={ref.id}
                    className="p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-text-primary/70 pb-2 border-b border-accent-gold/25">
                      <span className="font-bold text-accent-gold label-caps">
                        Mood: {ref.mood}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-text-primary/60">
                        <Calendar className="w-3 h-3 text-accent-gold" />
                        {ref.date}
                      </span>
                    </div>
                    <p className="text-text-primary text-xs sm:text-sm italic leading-relaxed">
                      "{ref.text}"
                    </p>
                    {ref.ayahReference && (
                      <BorderedSubPanel className="text-[11px] text-accent-gold font-semibold p-2">
                        Anchor: {ref.ayahReference}
                      </BorderedSubPanel>
                    )}
                  </OrnamentedCard>
                ))}
              </div>
            </div>
          )}

          {/* Saved Surahs */}
          {savedSurahList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-text-primary">
                Bookmarked Surahs ({savedSurahList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedSurahList.map((surah) => (
                  <OrnamentedCard
                    key={surah.id}
                    onClick={() => onOpenSurah(surah)}
                    className="p-4 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-primary text-accent-gold border border-accent-gold/40 font-bold flex items-center justify-center text-xs">
                        {String(surah.number).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-text-primary">{surah.name}</h4>
                          <span className="font-arabic text-accent-gold text-lg">{surah.arabic}</span>
                        </div>
                        <p className="text-xs text-text-primary/70">{surah.meaning}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(`surah-${surah.id}`);
                      }}
                      className="p-2 text-text-primary/40 hover:text-accent-gold rounded-lg transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </OrnamentedCard>
                ))}
              </div>
            </div>
          )}

          {/* Saved Verses */}
          {savedVerseList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-text-primary">
                Bookmarked Verses ({savedVerseList.length})
              </h2>
              <div className="space-y-3">
                {savedVerseList.map((verse) => (
                  <OrnamentedCard
                    key={`${verse.surahId}-${verse.number}`}
                    className="p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-accent-gold/25">
                      <span className="text-xs font-bold text-accent-gold label-caps">
                        Surah {verse.surahId} · Ayah {verse.number}
                      </span>
                      <button
                        onClick={() => toggleSaved(`verse-${verse.surahId}-${verse.number}`)}
                        className="text-text-primary/40 hover:text-accent-gold p-1 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-arabic text-2xl text-accent-gold text-right py-1 leading-[2.2]">
                      {verse.arabic}
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed font-medium">
                      "{verse.translation}"
                    </p>
                  </OrnamentedCard>
                ))}
              </div>
            </div>
          )}

          {/* Saved Hadiths */}
          {savedHadithList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-text-primary">
                Bookmarked Hadith & Tafsir ({savedHadithList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedHadithList.map((item) => (
                  <OrnamentedCard
                    key={item.id}
                    className="p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-accent-gold/25">
                      <span className="text-xs font-bold text-accent-gold label-caps">{item.title}</span>
                      <button
                        onClick={() => toggleSaved(`lib-${item.id}`)}
                        className="text-text-primary/40 hover:text-accent-gold p-1 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-text-primary italic leading-relaxed">
                      "{item.excerpt}"
                    </p>
                    <div className="text-[11px] font-semibold text-accent-gold flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{item.source} ({item.grading || 'Authentic'})</span>
                    </div>
                  </OrnamentedCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <SectionDivider />
    </div>
  );
}
