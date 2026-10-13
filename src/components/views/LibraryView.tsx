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
  WifiOff,
  CheckCircle2,
  Heart,
  Compass,
  Scroll,
  MessageCircle,
  Feather,
} from 'lucide-react';
import { libraryItems, type LibraryItem } from '@/lib/content';
import { propheticBehaviors, type PropheticBehaviorReflection } from '@/lib/shamailData';
import { useNoor } from '@/context/NoorContext';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { OrnamentedCard, BorderedSubPanel, SectionDivider } from '../Ornamentation';
import { LearnView } from './LearnView';

export function LibraryView({ initialSection = 'hadith' }: { initialSection?: 'hadith' | 'arabic' | 'shamail' }) {
  const { savedItems, toggleSaved } = useNoor();
  const { isOnline } = useOfflineStatus();

  // Top Section Switcher: Hadith & Tafsir | Arabic & Tajweed | Prophetic Character
  const [activeSection, setActiveSection] = useState<'hadith' | 'arabic' | 'shamail'>(initialSection);

  // Hadith & Tafsir filters
  const [selectedType, setSelectedType] = useState<'All' | 'Hadith' | 'Tafsir'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Prophetic Character filters
  const [shamailSearch, setShamailSearch] = useState('');
  const [copiedShamailId, setCopiedShamailId] = useState<string | null>(null);

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

  const filteredShamail = propheticBehaviors.filter((b) => {
    const q = shamailSearch.toLowerCase();
    return (
      b.themeTitle.toLowerCase().includes(q) ||
      b.propheticBehavior.toLowerCase().includes(q) ||
      b.hadithNarrative.toLowerCase().includes(q) ||
      b.narratorCompanion.toLowerCase().includes(q) ||
      b.dailyActionablePractice.toLowerCase().includes(q)
    );
  });

  const handleShare = (item: LibraryItem) => {
    navigator.clipboard.writeText(`"${item.excerpt}" — ${item.source} (${item.grading || 'Authentic'})`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareShamail = (b: PropheticBehaviorReflection) => {
    navigator.clipboard.writeText(
      `Prophetic Conduct: ${b.themeTitle}\n"${b.hadithNarrative}"\nCitation: ${b.hadithCitation}\nQuranic Anchor: ${b.quranicFoundation.surahCitation}\nDaily Practice: ${b.dailyActionablePractice}`
    );
    setCopiedShamailId(b.id);
    setTimeout(() => setCopiedShamailId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Header & Section Navigation */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Scholarly Sanctuary · 100% Offline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
            Scholarly Library (المكتبة الإسلامية الجامعة)
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-1">
            Ground your heart in authentic Hadith, verified Tafsir, Quranic Arabic & Tajweed, and the living character of Prophet Muhammad ﷺ.
          </p>
        </div>

        {/* Section Tabs: Hadith/Tafsir | Quranic Arabic | Prophetic Character */}
        <div className="flex items-center gap-2 bg-bg-card border border-accent-gold/30 p-1.5 rounded-2xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSection('hadith')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'hadith'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Hadith & Tafsir</span>
            <span className="text-[10px] opacity-80 font-arabic hidden sm:inline">الأحاديث والتفسير</span>
          </button>

          <button
            onClick={() => setActiveSection('arabic')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'arabic'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Quranic Arabic & Tajweed</span>
            <span className="text-[10px] opacity-80 font-arabic hidden sm:inline">العربية والتجويد</span>
          </button>

          <button
            onClick={() => setActiveSection('shamail')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'shamail'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Prophetic Character</span>
            <span className="text-[10px] opacity-80 font-arabic hidden sm:inline">شمائل النبي ﷺ</span>
          </button>
        </div>
      </div>

      {/* Offline Status Callout when disconnected */}
      {!isOnline && (
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-text-primary text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wider block">Offline Reading Active</span>
              <span className="text-text-secondary">
                All Hadiths, Tafsir commentaries, Arabic learning lessons, and Prophetic conduct records are stored offline.
              </span>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold shrink-0 flex items-center gap-1 self-start sm:self-auto">
            <CheckCircle2 className="w-3 h-3" />
            <span>Available Offline</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: HADITH & TAFSIR                                                */}
      {/* ========================================================================= */}
      {activeSection === 'hadith' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter & Search Bar */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-accent-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, book (e.g. Bukhari, Tirmidhi, intentions, patience)..."
                  className="w-full bg-bg-card border border-accent-gold/45 rounded-2xl pl-12 pr-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-bg-card/90 border border-accent-gold/35 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
                {(['All', 'Hadith', 'Tafsir'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedType(tab)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
                      selectedType === tab
                        ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/60 shadow-xs'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider mr-1 shrink-0">
                Topic:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap border ${
                    selectedCategory === cat
                      ? 'bg-accent-gold text-bg-primary font-bold border-accent-gold'
                      : 'bg-bg-card text-text-secondary border-accent-gold/25 hover:border-accent-gold/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Items Feed */}
          <div className="space-y-5">
            {filteredItems.map((item) => {
              const isSaved = savedItems.includes(item.id);
              return (
                <OrnamentedCard key={item.id} className="p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-bg-primary text-text-secondary border border-accent-gold/20">
                        {item.category}
                      </span>
                      {item.grading && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {item.grading}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(item)}
                        className="p-2 text-text-secondary hover:text-accent-gold rounded-xl hover:bg-bg-primary transition-colors border border-accent-gold/20"
                        title="Copy text & citation"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleSaved(item.id)}
                        className={`p-2 rounded-xl transition-colors border ${
                          isSaved
                            ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                            : 'text-text-secondary hover:text-accent-gold hover:bg-bg-primary border-accent-gold/20'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save item'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-text-primary font-serif">
                    {item.title}
                  </h3>

                  {item.arabicExcerpt && (
                    <div className="text-right text-lg sm:text-xl font-arabic text-accent-gold/95 leading-relaxed pt-1">
                      {item.arabicExcerpt}
                    </div>
                  )}

                  <BorderedSubPanel className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-text-primary italic">
                    "{item.excerpt}"
                  </BorderedSubPanel>

                  <div className="text-xs text-accent-gold font-medium flex items-center justify-between gap-2 flex-wrap pt-1 border-t border-accent-gold/15">
                    <span>Source: {item.source}</span>
                    {item.bookNumber && <span>{item.bookNumber}</span>}
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                      Spiritual Meaning & Context:
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  {item.practicalReflection && (
                    <div className="p-3.5 rounded-xl bg-accent-gold/10 border border-accent-gold/25 text-xs sm:text-sm text-text-primary space-y-1">
                      <span className="font-bold text-accent-gold uppercase tracking-wider text-[11px] block">
                        Actionable Practice:
                      </span>
                      <p className="text-text-secondary leading-relaxed">
                        {item.practicalReflection}
                      </p>
                    </div>
                  )}
                </OrnamentedCard>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-text-secondary bg-bg-card rounded-2xl border border-accent-gold/25">
                <BookOpen className="w-10 h-10 mx-auto text-accent-gold/40 mb-3" />
                <p className="text-base font-semibold text-text-primary">No results found</p>
                <p className="text-xs text-text-muted mt-1">Try another keyword or reset the filter.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: QURANIC ARABIC & TAJWEED (LEARNVIEW INTEGRATED)               */}
      {/* ========================================================================= */}
      {activeSection === 'arabic' && (
        <div className="animate-in fade-in duration-200">
          <LearnView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: PROPHETIC CHARACTER (SHAMA'IL AL-MUHAMMADIYYAH)                */}
      {/* ========================================================================= */}
      {activeSection === 'shamail' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Explanation Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 to-bg-card border border-accent-gold/40 space-y-2.5">
            <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-accent-gold/30" />
              <span>Grounded in Authentic Hadith · Not Superficial Motivational Talk</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary">
              "His Character Was the Quran" (كَانَ خُلُقُهُ الْقُرْآنَ)
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              When Aisha (RA) was asked how the Prophet Muhammad ﷺ behaved in daily life, she answered: <span className="text-accent-gold font-semibold">"His character was the Quran"</span> (Sahih Muslim #746). Every movement, response to provocation, conversation, and family interaction was the living embodiment of the divine book. Recorded by Imam at-Tirmidhi in <span className="italic">Ash-Shama'il</span>, Imam al-Bukhari, and Imam Muslim.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-accent-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={shamailSearch}
              onChange={(e) => setShamailSearch(e.target.value)}
              placeholder="Search prophetic conduct (e.g. listening, anger, children, home, grief, humility)..."
              className="w-full bg-bg-card border border-accent-gold/45 rounded-2xl pl-12 pr-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
            />
          </div>

          {/* Prophetic Behaviors List */}
          <div className="space-y-6">
            {filteredShamail.map((b) => (
              <OrnamentedCard key={b.id} className="p-6 sm:p-8 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold border border-accent-gold/35 px-2.5 py-0.5 rounded-full bg-accent-gold/10">
                      Living Sunnah & Character
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-serif mt-2">
                      {b.themeTitle}
                    </h3>
                    <div className="text-xs font-arabic text-accent-gold mt-0.5">
                      {b.arabicTitle}
                    </div>
                  </div>

                  <button
                    onClick={() => handleShareShamail(b)}
                    className="p-2.5 text-text-secondary hover:text-accent-gold rounded-xl hover:bg-bg-primary transition-colors border border-accent-gold/25 shrink-0"
                    title="Copy Prophetic Reflection"
                  >
                    {copiedShamailId === b.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* The Exact Daily Behavior */}
                <div className="p-4 rounded-2xl bg-bg-primary/70 border border-accent-gold/25 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5" />
                    <span>How He ﷺ Personally Behaved:</span>
                  </div>
                  <p className="text-sm sm:text-base text-text-primary leading-relaxed font-sans">
                    {b.propheticBehavior}
                  </p>
                </div>

                {/* Authentic Hadith Testimony */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center justify-between">
                    <span>Eyewitness Companion Testimony:</span>
                    <span className="text-accent-gold font-medium">{b.narratorCompanion}</span>
                  </div>
                  <BorderedSubPanel className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-text-primary italic">
                    "{b.hadithNarrative}"
                  </BorderedSubPanel>
                  <div className="text-xs text-accent-gold/90 font-mono">
                    Citation: {b.hadithCitation}
                  </div>
                </div>

                {/* Quranic Root Verse */}
                <div className="p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-accent-gold uppercase tracking-wider">
                    <span>The Quranic Root of This Behavior:</span>
                    <span>{b.quranicFoundation.surahCitation}</span>
                  </div>
                  <div className="text-right text-base sm:text-lg font-arabic text-text-primary leading-relaxed">
                    {b.quranicFoundation.verseText}
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary italic">
                    "{b.quranicFoundation.translation}"
                  </p>
                </div>

                {/* Daily Actionable Practice */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Walk in His Footsteps Today:</span>
                  </span>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {b.dailyActionablePractice}
                  </p>
                  <p className="text-xs text-text-muted italic pt-1 border-t border-emerald-500/20">
                    Contemplation: {b.reflectionQuestion}
                  </p>
                </div>
              </OrnamentedCard>
            ))}

            {filteredShamail.length === 0 && (
              <div className="text-center py-12 text-text-secondary bg-bg-card rounded-2xl border border-accent-gold/25">
                <Heart className="w-10 h-10 mx-auto text-accent-gold/40 mb-3" />
                <p className="text-base font-semibold text-text-primary">No behaviors found matching search</p>
                <p className="text-xs text-text-muted mt-1">Try another term such as "speech", "home", or "anger".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
