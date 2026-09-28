import { useState } from 'react';
import {
  Search,
  Play,
  CheckCircle2,
  BookOpen,
  Volume2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { surahs, type Surah } from '@/lib/content';
import { reciters, getSurahAudioUrl } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from '../AudioPlayerBar';
import { OrnamentedCard, BorderedSubPanel } from '../Ornamentation';

export function QuranView({
  onOpenSurah,
  onPlayAudio,
  onOpenAudioSettings,
}: {
  onOpenSurah: (surah: Surah) => void;
  onPlayAudio: (state: ActiveAudioState) => void;
  onOpenAudioSettings: () => void;
}) {
  const { readSurahs, markSurahRead, reciterId, savedItems, toggleSaved } = useNoor();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRevelation, setFilterRevelation] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  const activeReciter = reciters.find((r) => r.id === reciterId) || reciters[0];

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .replace(/^(al|an|ar|as|ash|at|az|ad)-/i, '')
      .replace(/[^a-z0-9]/gi, '');

  const filteredSurahs = surahs.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return filterRevelation === 'All' || s.revelation === filterRevelation;
    }

    const normQ = normalizeText(q);
    const normName = normalizeText(s.name);
    const normMeaning = normalizeText(s.meaning);

    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.meaning.toLowerCase().includes(q) ||
      s.arabic.includes(q) ||
      String(s.number) === q ||
      String(s.number).includes(q) ||
      (normQ.length > 1 && (normName.includes(normQ) || normMeaning.includes(normQ))) ||
      s.intro.theme.toLowerCase().includes(q) ||
      s.intro.overview.toLowerCase().includes(q);

    const matchesRev = filterRevelation === 'All' || s.revelation === filterRevelation;
    return matchesSearch && matchesRev;
  });

  const handlePlaySurahAudio = (e: React.MouseEvent, surah: Surah) => {
    e.stopPropagation();
    markSurahRead(surah.id);
    const url = getSurahAudioUrl(surah.number, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name}`,
      subtitle: `${surah.verses} Verses · Full Chapter`,
      url,
      arabicSnippet: surah.arabic,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-14 text-text-primary">
      {/* Title & Reciter Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
            The Noble Quran (القرآن الكريم)
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-1">
            Complete 114 chapters with Arabic Uthmani text, English translations, recitation audio, and verse-by-verse Tafsir.
          </p>
        </div>

        <button
          onClick={onOpenAudioSettings}
          className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-bg-card border border-accent-gold/40 hover:border-accent-gold shadow-xs text-sm text-text-primary transition-colors shrink-0"
        >
          <Volume2 className="w-5 h-5 text-accent-gold" />
          <div className="text-left">
            <div className="text-xs text-accent-gold font-semibold uppercase tracking-wider">Reciter (Qari)</div>
            <div className="truncate max-w-[160px] text-text-primary font-bold text-sm">{activeReciter.name}</div>
          </div>
        </button>
      </div>

      {/* Search & Revelation Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-accent-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by surah name, number, meaning (e.g. Fatihah, 67, Kingdom)..."
            className="w-full bg-bg-card border border-accent-gold/45 rounded-2xl pl-12 pr-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-bg-card/90 border border-accent-gold/35 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
          {(['All', 'Meccan', 'Medinan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterRevelation(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
                filterRevelation === tab
                  ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/60 shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <span>
          Showing <strong className="text-accent-gold">{filteredSurahs.length}</strong> of {surahs.length} Surahs
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-accent-gold hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Surah List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSurahs.map((surah) => {
          const isRead = readSurahs.includes(surah.id);
          const isSaved = savedItems.includes(`surah-${surah.id}`);

          return (
            <OrnamentedCard
              key={surah.id}
              onClick={() => onOpenSurah(surah)}
              className="p-5 sm:p-6 flex items-center justify-between gap-4 group cursor-pointer hover:border-accent-gold transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-13 h-13 rounded-xl bg-bg-primary border border-accent-gold/45 text-accent-gold flex items-center justify-center font-bold text-base shrink-0 group-hover:border-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-all shadow-xs">
                  {String(surah.number).padStart(2, '0')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-text-primary text-base sm:text-lg truncate font-serif">{surah.name}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-bg-primary text-accent-gold border border-accent-gold/35 shrink-0 font-semibold uppercase tracking-wider">
                      {surah.revelation}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary truncate mt-0.5 font-medium">
                    {surah.meaning} · {surah.verses} Verses
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="font-arabic text-accent-gold text-2xl sm:text-3xl font-medium block leading-tight">
                    {surah.arabic}
                  </span>
                  <span className="text-xs text-text-muted font-mono font-medium">
                    ~{surah.time}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-accent-gold/25">
                  <button
                    onClick={(e) => handlePlaySurahAudio(e, surah)}
                    title="Play Recitation"
                    className="p-2.5 rounded-xl bg-bg-primary hover:bg-bg-card text-accent-gold border border-accent-gold/35 hover:border-accent-gold transition-colors shadow-xs"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(`surah-${surah.id}`);
                    }}
                    title="Bookmark"
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSaved
                        ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                        : 'text-text-muted border-transparent hover:text-accent-gold hover:border-accent-gold/40'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </OrnamentedCard>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <OrnamentedCard className="text-center py-16 p-6">
          <BookOpen className="w-12 h-12 text-accent-gold/50 mx-auto mb-3" />
          <h4 className="text-text-primary font-bold text-lg">No Surahs Match "{searchQuery}"</h4>
          <p className="text-sm text-text-secondary mt-1">Try searching by surah name, number, or translation meaning.</p>
        </OrnamentedCard>
      )}

      {/* Learning Prompt Box */}
      <BorderedSubPanel className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3.5">
          <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0" />
          <div className="text-sm sm:text-base text-text-primary leading-relaxed">
            <span className="font-bold text-accent-gold uppercase tracking-wider text-xs block sm:inline mr-2">
              Tajweed Color Rules Activated:
            </span>
            Madd (Elongation in Gold), Waqf (Pause in Crimson), Wasl (Joining in Green), and Ghunnah (Humming in Teal) are tagged in each deep dive study view.
          </div>
        </div>
      </BorderedSubPanel>
    </div>
  );
}
