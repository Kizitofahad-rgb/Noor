import { useState } from 'react';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  Share2,
  Check,
} from 'lucide-react';
import { libraryItems, type LibraryItem } from '@/lib/content';
import { useNoor } from '@/context/NoorContext';

export function LibraryView() {
  const { savedItems, toggleSaved } = useNoor();
  const [selectedType, setSelectedType] = useState<'All' | 'Hadith' | 'Tafsir'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Spiritual', 'Character', 'Resilience'];

  const filteredItems = libraryItems.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  const handleShare = (item: LibraryItem) => {
    navigator.clipboard.writeText(`"${item.excerpt}" — ${item.source} (${item.grading || 'Authentic'})`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Hadith & Tafsir Library
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Authentic traditions with rigorous source citations, grading verification, and plain-language spiritual wisdom.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, book (e.g. Bukhari, Tirmidhi, intentions, patience)..."
              className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-2xl shrink-0 self-start sm:self-auto">
            {(['All', 'Hadith', 'Tafsir'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedType(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === tab
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mr-1">
            Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Library Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => {
          const isSaved = savedItems.includes(`lib-${item.id}`);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-700/40 hover:shadow-md transition-all"
            >
              <div>
                {/* Topline badges */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {item.type}
                    </span>
                    {item.grading && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        {item.grading}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShare(item)}
                      title="Copy text"
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSaved(`lib-${item.id}`)}
                      title="Bookmark"
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-stone-900 mt-4 tracking-tight">
                  {item.title}
                </h3>

                {/* Arabic Text if present */}
                {item.arabicExcerpt && (
                  <div className="my-3 p-3 bg-stone-50 rounded-xl font-arabic text-xl text-stone-800 text-right leading-relaxed select-text">
                    {item.arabicExcerpt}
                  </div>
                )}

                {/* English Excerpt */}
                <p className="text-stone-800 text-sm font-medium leading-relaxed mt-2 italic">
                  "{item.excerpt}"
                </p>

                {/* Source Citation */}
                <div className="mt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{item.source}</span>
                  {item.bookNumber && <span className="text-stone-400">· {item.bookNumber}</span>}
                </div>

                {/* Plain-Language Explanation */}
                <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
                  <div>
                    <span className="font-bold text-stone-800 block mb-1">
                      Context & Meaning:
                    </span>
                    <p className="leading-relaxed">{item.explanation}</p>
                  </div>

                  {item.practicalReflection && (
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100/70 text-emerald-950 mt-3">
                      <span className="font-bold flex items-center gap-1 mb-0.5 text-emerald-900">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Daily Practice:
                      </span>
                      {item.practicalReflection}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="text-stone-800 font-bold text-base">No Items Found</h4>
          <p className="text-xs text-stone-500 mt-1">Try resetting your search or selecting "All" categories.</p>
        </div>
      )}
    </div>
  );
}
