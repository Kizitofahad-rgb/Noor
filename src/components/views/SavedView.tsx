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
    <div className="space-y-8 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
          Your Personal Library & Journal
        </h1>
        <p className="text-text-secondary text-sm sm:text-base mt-1">
          Saved sacred verses, authentic hadith, and your personal moments of contemplation.
        </p>
      </div>

      {!hasAnySaved ? (
        <OrnamentedCard className="text-center py-20 p-8 space-y-4">
          <Bookmark className="w-14 h-14 text-accent-gold/40 mx-auto" />
          <h3 className="text-xl font-bold text-text-primary font-serif">Your Library is Waiting</h3>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed">
            Bookmark inspiring verses from the Quran Hub, hadith from the library, or write daily reflections on the home page.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quran')}
              className="px-6 py-3 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary rounded-xl text-xs sm:text-sm font-bold shadow-xs uppercase tracking-wider transition-colors"
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
                <h2 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2 font-serif">
                  <Sparkles className="w-5 h-5 text-accent-gold" />
                  <span>Your Contemplation Journal ({userReflections.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userReflections.map((ref) => (
                  <OrnamentedCard
                    key={ref.id}
                    className="p-5 sm:p-6 space-y-3.5"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2.5 border-b border-accent-gold/25">
                      <span className="font-bold text-accent-gold uppercase tracking-wider">
                        Mood: {ref.mood}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                        <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                        {ref.date}
                      </span>
                    </div>
                    <p className="text-text-primary text-sm sm:text-base italic leading-relaxed">
                      "{ref.text}"
                    </p>
                    {ref.ayahReference && (
                      <BorderedSubPanel className="text-xs sm:text-sm text-accent-gold font-semibold p-2.5">
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
            <div className="space-y-3.5">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary font-serif">
                Bookmarked Surahs ({savedSurahList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {savedSurahList.map((surah) => (
                  <OrnamentedCard
                    key={surah.id}
                    onClick={() => onOpenSurah(surah)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:border-accent-gold transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-bg-primary text-accent-gold border border-accent-gold/45 font-bold flex items-center justify-center text-sm shadow-xs">
                        {String(surah.number).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base sm:text-lg text-text-primary font-serif">{surah.name}</h4>
                          <span className="font-arabic text-accent-gold text-xl">{surah.arabic}</span>
                        </div>
                        <p className="text-sm text-text-secondary mt-0.5">{surah.meaning}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(`surah-${surah.id}`);
                      }}
                      className="p-2 text-text-muted hover:text-accent-gold rounded-lg transition-colors"
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
            <div className="space-y-3.5">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary font-serif">
                Bookmarked Verses ({savedVerseList.length})
              </h2>
              <div className="space-y-3.5">
                {savedVerseList.map((verse) => (
                  <OrnamentedCard
                    key={`${verse.surahId}-${verse.number}`}
                    className="p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-accent-gold/25">
                      <span className="text-xs sm:text-sm font-bold text-accent-gold uppercase tracking-wider">
                        Surah {verse.surahId} · Ayah {verse.number}
                      </span>
                      <button
                        onClick={() => toggleSaved(`verse-${verse.surahId}-${verse.number}`)}
                        className="text-text-muted hover:text-accent-gold p-1.5 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-arabic text-2xl sm:text-3xl text-accent-gold text-right py-2 leading-[2.5] select-text">
                      {verse.arabic}
                    </div>
                    <p className="text-sm sm:text-base text-text-primary leading-relaxed font-medium">
                      "{verse.translation}"
                    </p>
                  </OrnamentedCard>
                ))}
              </div>
            </div>
          )}

          {/* Saved Hadiths */}
          {savedHadithList.length > 0 && (
            <div className="space-y-3.5">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary font-serif">
                Bookmarked Hadith & Tafsir ({savedHadithList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedHadithList.map((item) => (
                  <OrnamentedCard
                    key={item.id}
                    className="p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-accent-gold/25">
                      <span className="text-xs sm:text-sm font-bold text-accent-gold uppercase tracking-wider font-serif">{item.title}</span>
                      <button
                        onClick={() => toggleSaved(`lib-${item.id}`)}
                        className="text-text-muted hover:text-accent-gold p-1.5 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-text-primary italic leading-relaxed">
                      "{item.excerpt}"
                    </p>
                    <div className="text-xs sm:text-sm font-semibold text-accent-gold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
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
