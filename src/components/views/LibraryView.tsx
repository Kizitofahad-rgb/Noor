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
import { OrnamentedCard, BorderedSubPanel, SectionDivider } from '../Ornamentation';

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
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-serif text-text-primary">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Hadith & Tafsir Library (المكتبة الحديثية والتفسير)
        </h1>
        <p className="text-text-primary/70 text-xs sm:text-sm mt-1">
          Authentic traditions with rigorous source citations, grading verification, and plain-language spiritual wisdom.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-accent-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, book (e.g. Bukhari, Tirmidhi, intentions, patience)..."
              className="w-full bg-bg-card border border-accent-gold/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-primary/40 focus:outline-none focus:border-accent-gold font-serif"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-bg-card/90 border border-accent-gold/30 p-1 rounded-2xl shrink-0 self-start sm:self-auto">
            {(['All', 'Hadith', 'Tafsir'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedType(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif transition-all label-caps ${
                  selectedType === tab
                    ? 'bg-bg-primary text-accent-gold border border-accent-gold/50 shadow-xs font-bold'
                    : 'text-text-primary/70 hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-accent-gold label-caps mr-1 shrink-0">
            Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-serif transition-all border label-caps ${
                selectedCategory === cat
                  ? 'bg-accent-gold text-bg-primary font-bold border-accent-gold shadow-xs'
                  : 'bg-bg-card border-accent-gold/30 text-text-primary/80 hover:border-accent-gold hover:text-text-primary'
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
            <OrnamentedCard
              key={item.id}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                {/* Topline badges */}
                <div className="flex items-center justify-between pb-3 border-b border-accent-gold/25 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-bg-primary text-accent-gold border border-accent-gold/40 label-caps">
                      {item.type}
                    </span>
                    {item.grading && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-bg-primary text-accent-gold-dim border border-accent-gold/30 flex items-center gap-1 label-caps">
                        <Award className="w-3 h-3 text-accent-gold" />
                        {item.grading}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShare(item)}
                      title="Copy text"
                      className="p-1.5 text-text-primary/60 hover:text-accent-gold rounded-lg hover:bg-bg-primary/50 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-accent-gold" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSaved(`lib-${item.id}`)}
                      title="Bookmark"
                      className={`p-1.5 rounded-lg transition-colors border ${
                        isSaved
                          ? 'text-accent-gold bg-accent-gold/15 border-accent-gold'
                          : 'text-text-primary/40 border-transparent hover:text-accent-gold hover:border-accent-gold/30'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mt-4 tracking-tight">
                  {item.title}
                </h3>

                {/* Arabic Text if present */}
                {item.arabicExcerpt && (
                  <div className="my-3 p-3 bg-bg-primary/60 rounded-xl border border-accent-gold/30 font-arabic text-xl text-accent-gold text-right leading-relaxed select-text">
                    {item.arabicExcerpt}
                  </div>
                )}

                {/* English Excerpt */}
                <p className="text-text-primary text-sm font-medium leading-relaxed mt-2 italic">
                  "{item.excerpt}"
                </p>

                {/* Source Citation */}
                <div className="mt-2 text-xs font-semibold text-accent-gold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{item.source}</span>
                  {item.bookNumber && <span className="text-text-primary/50">· {item.bookNumber}</span>}
                </div>

                {/* Plain-Language Explanation */}
                <div className="mt-4 pt-4 border-t border-accent-gold/20 text-xs text-text-primary/80 space-y-2">
                  <div>
                    <span className="font-bold text-accent-gold block mb-1 label-caps">
                      Context & Meaning:
                    </span>
                    <p className="leading-relaxed">{item.explanation}</p>
                  </div>

                  {item.practicalReflection && (
                    <BorderedSubPanel className="mt-3 text-xs">
                      <span className="font-bold flex items-center gap-1 mb-0.5 text-accent-gold label-caps">
                        <Sparkles className="w-3 h-3 text-accent-gold" />
                        Daily Practice:
                      </span>
                      <p className="leading-relaxed text-text-primary/90">{item.practicalReflection}</p>
                    </BorderedSubPanel>
                  )}
                </div>
              </div>
            </OrnamentedCard>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <OrnamentedCard className="text-center py-16 p-6">
          <HelpCircle className="w-10 h-10 text-accent-gold/40 mx-auto mb-2" />
          <h4 className="text-text-primary font-bold text-base">No Items Found</h4>
          <p className="text-xs text-text-primary/60 mt-1">Try resetting your search or selecting "All" categories.</p>
        </OrnamentedCard>
      )}

      <SectionDivider />
    </div>
  );
}
