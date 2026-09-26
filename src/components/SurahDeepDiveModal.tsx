import { useState } from 'react';
import {
  X,
  Play,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Surah } from '@/lib/content';
import { verses } from '@/lib/content';
import { tajweedStyles } from '@/lib/tajweed';
import { getVerseAudioUrl, getSurahAudioUrl } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from './AudioPlayerBar';

export function SurahDeepDiveModal({
  surah,
  onClose,
  onPlayAudio,
}: {
  surah: Surah;
  onClose: () => void;
  onPlayAudio: (state: ActiveAudioState) => void;
}) {
  const { savedItems, toggleSaved, markSurahRead, reciterId } = useNoor();
  const [activeTab, setActiveTab] = useState<'study' | 'overview'>('study');
  const [expandedTafsir, setExpandedTafsir] = useState<number | null>(null);

  // Filter verses belonging to this surah
  const surahVerses = verses.filter((v) => v.surahId === surah.id);

  const isSurahSaved = savedItems.includes(`surah-${surah.id}`);

  const playFullSurah = () => {
    markSurahRead(surah.id);
    const url = getSurahAudioUrl(surah.number, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name} (Complete)`,
      subtitle: `${surah.verses} Verses · Full Recitation`,
      url,
      arabicSnippet: surah.arabic,
    });
  };

  const playVerse = (verseNumber: number) => {
    const v = surahVerses.find((item) => item.number === verseNumber);
    const url = getVerseAudioUrl(surah.number, verseNumber, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name} · Ayah ${verseNumber}`,
      subtitle: v?.simpleMeaning || 'Verse recitation',
      url,
      arabicSnippet: v?.arabic,
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl max-h-[92vh] sm:rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-emerald-950 text-white px-6 py-5 flex items-center justify-between border-b border-emerald-900/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-700/60 flex items-center justify-center font-bold text-emerald-200 text-lg">
              {surah.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{surah.name}</h2>
                <span className="text-emerald-300 font-arabic text-xl px-2">
                  {surah.arabic}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700 font-medium">
                  {surah.revelation}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {surah.meaning} · {surah.verses} Verses · Revelation #{surah.revelationOrder}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaved(`surah-${surah.id}`)}
              title="Bookmark Surah"
              className={`p-2 rounded-xl border transition-colors ${
                isSurahSaved
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-900/60 border-emerald-800 text-emerald-200 hover:text-white'
              }`}
            >
              {isSurahSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action & Tab subheader */}
        <div className="bg-stone-100/90 px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-stone-200/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'study'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Study Guide & Verses ({surahVerses.length || surah.verses})
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Context & Revelation
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playFullSurah}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium transition-transform active:scale-95 shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Play Full Surah ({surah.time})</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Central Theme</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900">{surah.intro.theme}</h3>
                <p className="text-stone-700 text-sm mt-3 leading-relaxed">
                  {surah.intro.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/60">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Core Spiritual Takeaway
                  </span>
                  <p className="text-sm font-medium text-emerald-950 mt-2 leading-relaxed">
                    "{surah.intro.keyTakeaway}"
                  </p>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                    Historical Period
                  </span>
                  <p className="text-sm text-stone-800 mt-2 leading-relaxed">
                    Revealed in <span className="font-semibold text-stone-900">{surah.revelation}</span> as the {surah.revelationOrder}th chronological chapter of the Prophet's ﷺ mission.
                  </p>
                </div>
              </div>

              {/* Tajweed Legend */}
              <div className="bg-stone-100/80 p-5 rounded-2xl border border-stone-200">
                <h4 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-800" />
                  Tajweed Color Legend in this Surah
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(tajweedStyles).map(([key, style]) => (
                    <div key={key} className="bg-white p-3 rounded-xl border border-stone-200/80">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: style.color }} />
                        <span className="text-xs font-bold text-stone-900">{style.label}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">{style.ruleTip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Study Mode: Verse-by-verse breakdown */}
              {surahVerses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                  <BookOpen className="w-10 h-10 text-emerald-800/40 mx-auto mb-3" />
                  <h4 className="text-stone-800 font-semibold">Surah Recitation & Full Translation Available</h4>
                  <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                    Click "Play Full Surah" to listen to complete recitation by {reciterId}. Full deep dive annotations are featured in Al-Fatihah, Ayatul Kursi, and Al-Ikhlas!
                  </p>
                  <button
                    onClick={playFullSurah}
                    className="mt-4 px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Listen to Full Chapter ({surah.time})
                  </button>
                </div>
              ) : (
                surahVerses.map((verse) => {
                  const isVerseSaved = savedItems.includes(`verse-${surah.id}-${verse.number}`);
                  const isTafsirOpen = expandedTafsir === verse.number;

                  return (
                    <div
                      key={verse.number}
                      className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:border-emerald-700/30 transition-all"
                    >
                      {/* Verse Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-900 font-semibold text-xs flex items-center justify-center">
                            {verse.number}
                          </span>
                          <span className="text-xs font-medium text-stone-500">
                            Ayah {verse.number} of {surah.verses}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playVerse(verse.number)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 text-xs font-medium transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => toggleSaved(`verse-${surah.id}-${verse.number}`)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isVerseSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                            }`}
                          >
                            {isVerseSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div className="py-6 text-right font-arabic text-2xl sm:text-3xl leading-[2.4] text-stone-900 tracking-wide select-text">
                        {verse.arabic}
                      </div>

                      {/* Word-by-word Breakdown with Tajweed */}
                      {verse.words && verse.words.length > 0 && (
                        <div className="py-3 px-4 bg-stone-50/80 rounded-xl border border-stone-200/60 mb-4">
                          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                            Word-by-Word Analysis & Tajweed
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end" dir="rtl">
                            {verse.words.map((w, idx) => {
                              const rule = w.tajweed?.[0];
                              const style = rule ? tajweedStyles[rule] : null;
                              return (
                                <div
                                  key={idx}
                                  className="bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-center shadow-2xs"
                                >
                                  <div
                                    className="font-arabic text-base sm:text-lg text-stone-900"
                                    style={style ? { color: style.color, fontWeight: 700 } : {}}
                                  >
                                    {w.arabic}
                                  </div>
                                  <div className="text-[10px] text-stone-400 font-mono mt-0.5" dir="ltr">
                                    {w.transliteration}
                                  </div>
                                  <div className="text-[10px] text-emerald-800 font-medium" dir="ltr">
                                    {w.translation}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Translation & Transliteration */}
                      <div className="space-y-1.5 mt-2">
                        <p className="text-stone-900 text-base font-medium leading-relaxed">
                          {verse.translation}
                        </p>
                        <p className="text-stone-500 text-xs italic font-serif">
                          {verse.transliteration}
                        </p>
                      </div>

                      {/* Key Understanding Notes */}
                      {verse.understanding && verse.understanding.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-100">
                          <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Verse Meaning & Context</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-stone-700">
                            {verse.understanding.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-1">•</span>
                                <span className="leading-relaxed">{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Reflection Questions & Du'a */}
                      {verse.reflectionQuestions && verse.reflectionQuestions.length > 0 && (
                        <div className="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60">
                          <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                            <span>Contemplation Question</span>
                          </div>
                          <p className="text-xs text-stone-800 italic leading-relaxed">
                            "{verse.reflectionQuestions[0]}"
                          </p>
                          {verse.dua && (
                            <div className="mt-2.5 pt-2 border-t border-amber-200/50 flex items-start gap-2 text-xs text-stone-700">
                              <span className="font-semibold text-amber-900 shrink-0">Du'a:</span>
                              <span className="italic">{verse.dua}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tafsir Excerpt Accordion */}
                      {verse.tafsir && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpandedTafsir(isTafsirOpen ? null : verse.number)}
                            className="text-xs text-stone-500 hover:text-emerald-800 font-medium inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Ibn Kathir Tafsir Excerpt</span>
                            {isTafsirOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          {isTafsirOpen && (
                            <div className="mt-2 p-3.5 bg-stone-100 rounded-xl text-xs text-stone-700 border border-stone-200 leading-relaxed animate-in fade-in duration-150">
                              <span className="font-semibold text-stone-900 block mb-1">Tafsir Ibn Kathir:</span>
                              {verse.tafsir}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Translations from Saheeh International & The Clear Quran</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-xs transition-colors"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
