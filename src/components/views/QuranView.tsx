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
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title & Reciter Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            The Noble Quran (القرآن الكريم)
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Complete chapters with English translations, word-by-word Tajweed, and cited Ibn Kathir tafsir.
          </p>
        </div>

        <button
          onClick={onOpenAudioSettings}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-700/50 shadow-xs text-xs font-semibold text-stone-800 transition-colors shrink-0"
        >
          <Volume2 className="w-4 h-4 text-emerald-800" />
          <div className="text-left">
            <div className="text-[10px] text-stone-400 font-normal uppercase">Reciter (Qari)</div>
            <div className="truncate max-w-[140px] text-emerald-950 font-bold">{activeReciter.name}</div>
          </div>
        </button>
      </div>

      {/* Search & Revelation Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by surah name, number, meaning (e.g. Fatihah, 67, Kingdom)..."
            className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-2xl shrink-0 self-start sm:self-auto">
          {(['All', 'Meccan', 'Medinan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterRevelation(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterRevelation === tab
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
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
            <div
              key={surah.id}
              onClick={() => onOpenSurah(surah)}
              className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs hover:border-emerald-700/50 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-900 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  {String(surah.number).padStart(2, '0')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-sm truncate">{surah.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 shrink-0 font-medium">
                      {surah.revelation}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 truncate mt-0.5">
                    {surah.meaning} · {surah.verses} Verses
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="font-arabic text-stone-800 text-xl font-medium block">
                    {surah.arabic}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    ~{surah.time}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-stone-100">
                  <button
                    onClick={(e) => handlePlaySurahAudio(e, surah)}
                    title="Play Recitation"
                    className="p-2 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(`surah-${surah.id}`);
                    }}
                    title="Bookmark"
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="text-stone-800 font-bold text-base">No Surahs Match "{searchQuery}"</h4>
          <p className="text-xs text-stone-500 mt-1">Try searching by surah name, number, or translation meaning.</p>
        </div>
      )}

      {/* Learning Prompt Box */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />
          <div className="text-xs text-emerald-950">
            <span className="font-bold">Tajweed Color Rules Activated:</span> Madd (Elongation in Gold), Waqf (Pause in Crimson), Wasl (Joining in Green), and Ghunnah (Humming in Teal) are tagged in each deep dive.
          </div>
        </div>
      </div>
    </div>
  );
}
