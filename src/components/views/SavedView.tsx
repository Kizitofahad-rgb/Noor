import { Bookmark, BookOpen, Trash2, Calendar, Sparkles } from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import { surahs, verses, libraryItems, type Surah } from '@/lib/content';

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
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Your Personal Library & Journal
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Saved sacred verses, authentic hadith, and your personal moments of contemplation.
        </p>
      </div>

      {!hasAnySaved ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-900">Your Library is Waiting</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Bookmark inspiring verses from the Quran Hub, hadith from the library, or write daily reflections on the home page.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quran')}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Explore Quran Hub
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* User Reflection Journal */}
          {userReflections.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Your Contemplation Journal ({userReflections.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userReflections.map((ref) => (
                  <div
                    key={ref.id}
                    className="bg-[#FAF5ED] rounded-2xl border border-amber-200/80 p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-amber-200/50">
                      <span className="font-semibold text-amber-900 uppercase tracking-wider">
                        Mood: {ref.mood}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3" />
                        {ref.date}
                      </span>
                    </div>
                    <p className="text-stone-800 text-xs sm:text-sm italic leading-relaxed">
                      "{ref.text}"
                    </p>
                    {ref.ayahReference && (
                      <div className="text-[11px] text-emerald-800 font-semibold pt-1">
                        Anchor: {ref.ayahReference}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Surahs */}
          {savedSurahList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-stone-900">
                Bookmarked Surahs ({savedSurahList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedSurahList.map((surah) => (
                  <div
                    key={surah.id}
                    onClick={() => onOpenSurah(surah)}
                    className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer hover:border-emerald-700/50 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 font-bold flex items-center justify-center text-xs">
                        {surah.number}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900">{surah.name}</h4>
                        <p className="text-xs text-stone-500">{surah.meaning}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(`surah-${surah.id}`);
                      }}
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Verses */}
          {savedVerseList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-stone-900">
                Bookmarked Verses ({savedVerseList.length})
              </h2>
              <div className="space-y-3">
                {savedVerseList.map((verse) => (
                  <div
                    key={`${verse.surahId}-${verse.number}`}
                    className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <span className="text-xs font-bold text-emerald-900">
                        Surah {verse.surahId} · Ayah {verse.number}
                      </span>
                      <button
                        onClick={() => toggleSaved(`verse-${verse.surahId}-${verse.number}`)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-arabic text-xl text-stone-900 text-right py-1">
                      {verse.arabic}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      "{verse.translation}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Hadiths */}
          {savedHadithList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-stone-900">
                Bookmarked Hadith & Tafsir ({savedHadithList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedHadithList.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <span className="text-xs font-bold text-emerald-900">{item.title}</span>
                      <button
                        onClick={() => toggleSaved(`lib-${item.id}`)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-800 italic leading-relaxed">
                      "{item.excerpt}"
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-800">
                      {item.source} ({item.grading || 'Authentic'})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
