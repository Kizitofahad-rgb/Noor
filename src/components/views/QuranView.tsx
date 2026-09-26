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

  const filteredSurahs = surahs.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arabic.includes(searchQuery) ||
      String(s.number).includes(searchQuery);

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
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-serif text-text-primary">
      {/* Title & Reciter Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            The Noble Quran (القرآن الكريم)
          </h1>
          <p className="text-text-primary/70 text-xs sm:text-sm mt-1">
            Complete chapters with English translations, word-by-word Tajweed, and cited Ibn Kathir tafsir.
          </p>
        </div>

        <button
          onClick={onOpenAudioSettings}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-card border border-accent-gold/40 hover:border-accent-gold shadow-xs text-xs font-serif text-text-primary transition-colors shrink-0"
        >
          <Volume2 className="w-4 h-4 text-accent-gold" />
          <div className="text-left">
            <div className="text-[10px] text-accent-gold-dim font-normal label-caps">Reciter (Qari)</div>
            <div className="truncate max-w-[140px] text-accent-gold font-bold">{activeReciter.name}</div>
          </div>
        </button>
      </div>

      {/* Search & Revelation Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-accent-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by surah name, number, meaning (e.g. Fatihah, 67, Kingdom)..."
            className="w-full bg-bg-card border border-accent-gold/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-primary/40 focus:outline-none focus:border-accent-gold font-serif"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-bg-card/90 border border-accent-gold/30 p-1 rounded-2xl shrink-0 self-start sm:self-auto">
          {(['All', 'Meccan', 'Medinan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterRevelation(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all label-caps ${
                filterRevelation === tab
                  ? 'bg-bg-primary text-accent-gold border border-accent-gold/50 shadow-xs font-bold'
                  : 'text-text-primary/70 hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
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
              className="p-5 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/40 text-accent-gold flex items-center justify-center font-bold text-sm shrink-0 group-hover:border-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-all">
                  {String(surah.number).padStart(2, '0')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-primary text-base truncate">{surah.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-bg-primary text-accent-gold/90 border border-accent-gold/30 shrink-0 font-serif label-caps">
                      {surah.revelation}
                    </span>
                  </div>
                  <div className="text-xs text-text-primary/70 truncate mt-0.5">
                    {surah.meaning} · {surah.verses} Verses
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="font-arabic text-accent-gold text-2xl font-medium block">
                    {surah.arabic}
                  </span>
                  <span className="text-[11px] text-text-primary/50 font-mono">
                    ~{surah.time}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-accent-gold/20">
                  <button
                    onClick={(e) => handlePlaySurahAudio(e, surah)}
                    title="Play Recitation"
                    className="p-2 rounded-xl bg-bg-primary hover:bg-bg-card text-accent-gold border border-accent-gold/30 hover:border-accent-gold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(`surah-${surah.id}`);
                    }}
                    title="Bookmark"
                    className={`p-2 rounded-xl border transition-colors ${
                      isSaved
                        ? 'text-accent-gold bg-accent-gold/15 border-accent-gold'
                        : 'text-text-primary/40 border-transparent hover:text-accent-gold hover:border-accent-gold/40'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </OrnamentedCard>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <OrnamentedCard className="text-center py-16 p-6">
          <BookOpen className="w-10 h-10 text-accent-gold/40 mx-auto mb-2" />
          <h4 className="text-text-primary font-bold text-base">No Surahs Match "{searchQuery}"</h4>
          <p className="text-xs text-text-primary/60 mt-1">Try searching by surah name, number, or translation meaning.</p>
        </OrnamentedCard>
      )}

      {/* Learning Prompt Box */}
      <BorderedSubPanel className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0" />
          <div className="text-xs text-text-primary/90">
            <span className="font-bold text-accent-gold label-caps">Tajweed Color Rules Activated:</span> Madd (Elongation in Gold), Waqf (Pause in Crimson), Wasl (Joining in Green), and Ghunnah (Humming in Teal) are tagged in each deep dive study view.
          </div>
        </div>
      </BorderedSubPanel>
    </div>
  );
}
