import { useState, useEffect } from 'react';
import {
  X,
  Play,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import type { Surah } from '@/lib/content';
import { verses } from '@/lib/content';
import { tajweedStyles } from '@/lib/tajweed';
import { getVerseAudioUrl, getSurahAudioUrl } from '@/lib/recitationAudio';
import { fetchSurahFromAlQuranCloud, type RemoteAyah } from '@/lib/quranApi';
import { useNoor } from '@/context/NoorContext';
import type { ActiveAudioState } from './AudioPlayerBar';
import { CornerFlourishes, BorderedSubPanel } from './Ornamentation';

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

  // Local curated verses (for featured surahs with word-by-word Tajweed & reflections)
  const surahVerses = verses.filter((v) => v.surahId === surah.id);

  // Remote keyless verses from Al-Quran Cloud API for complete chapters
  const [remoteAyahs, setRemoteAyahs] = useState<RemoteAyah[]>([]);
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);
  const [remoteError, setRemoteError] = useState(false);

  useEffect(() => {
    if (surahVerses.length === 0) {
      let isMounted = true;
      setIsLoadingRemote(true);
      setRemoteError(false);

      fetchSurahFromAlQuranCloud(surah.number)
        .then((ayahs) => {
          if (isMounted) {
            setRemoteAyahs(ayahs);
            setIsLoadingRemote(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setRemoteError(true);
            setIsLoadingRemote(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [surah.number, surahVerses.length]);

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

  const playVerse = (verseNumber: number, fallbackArabic?: string, fallbackTranslation?: string) => {
    const v = surahVerses.find((item) => item.number === verseNumber);
    const url = getVerseAudioUrl(surah.number, verseNumber, reciterId);
    onPlayAudio({
      title: `Surah ${surah.name} · Ayah ${verseNumber}`,
      subtitle: v?.simpleMeaning || fallbackTranslation || 'Verse recitation',
      url,
      arabicSnippet: v?.arabic || fallbackArabic || surah.arabic,
    });
  };

  const totalVersesDisplay = surahVerses.length || remoteAyahs.length || surah.verses;

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-bg-card w-full max-w-4xl max-h-[92vh] sm:rounded-2xl shadow-2xl flex flex-col border border-accent-gold overflow-hidden relative text-text-primary animate-in fade-in zoom-in-95 duration-200">
        <CornerFlourishes />

        {/* Header Bar */}
        <div className="bg-bg-primary text-text-primary px-6 py-5 flex items-center justify-between border-b border-accent-gold/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-bg-card border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-xl shadow-xs">
              {surah.number}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight font-serif">
                  {surah.name}
                </h2>
                <span className="text-accent-gold font-arabic text-2xl sm:text-3xl px-1">
                  {surah.arabic}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-bg-card text-accent-gold border border-accent-gold/45 font-semibold uppercase tracking-wider">
                  {surah.revelation}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                {surah.meaning} · {surah.verses} Verses · Revelation #{surah.revelationOrder}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaved(`surah-${surah.id}`)}
              title="Bookmark Surah"
              className={`p-2.5 rounded-xl border transition-colors ${
                isSurahSaved
                  ? 'bg-accent-gold/20 border-accent-gold text-accent-gold'
                  : 'bg-bg-card border-accent-gold/40 text-text-secondary hover:text-accent-gold'
              }`}
            >
              {isSurahSaved ? <BookmarkCheck className="w-5 h-5 text-accent-gold" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-bg-card border border-accent-gold/40 text-text-secondary hover:text-accent-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action & Tab subheader */}
        <div className="bg-bg-primary/95 px-6 py-3.5 border-b border-accent-gold/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-bg-card p-1.5 rounded-xl border border-accent-gold/35">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
                activeTab === 'study'
                  ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Study Guide & Verses ({totalVersesDisplay})
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider ${
                activeTab === 'overview'
                  ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Context & Revelation
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playFullSurah}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs sm:text-sm font-bold transition-transform active:scale-95 shadow-xs uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Full Surah ({surah.time})</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-text-primary">
          {activeTab === 'overview' ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="relative bg-bg-primary/90 p-6 sm:p-7 rounded-2xl border border-accent-gold shadow-xs">
                <CornerFlourishes />
                <div className="flex items-center gap-2 text-accent-gold font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                  <span>Central Theme</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-serif">{surah.intro.theme}</h3>
                <p className="text-text-secondary text-sm sm:text-base mt-3 leading-relaxed">
                  {surah.intro.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BorderedSubPanel className="p-4 sm:p-5">
                  <div className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-1.5">
                    Core Spiritual Takeaway
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed italic">
                    "{surah.intro.keyTakeaway}"
                  </p>
                </BorderedSubPanel>

                <BorderedSubPanel className="p-4 sm:p-5">
                  <div className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-1.5">
                    Historical Period & Context
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Revealed during the <strong className="text-accent-gold">{surah.revelation}</strong> period as
                    the {surah.revelationOrder}th chapter in order of revelation.
                  </p>
                </BorderedSubPanel>
              </div>

              {/* Tajweed Color Guide */}
              <BorderedSubPanel className="p-4 sm:p-5">
                <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>Color-Coded Tajweed Guide</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(tajweedStyles).map(([key, style]) => (
                    <div key={key} className="bg-bg-card p-3 rounded-xl border border-accent-gold/30">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: style.color }} />
                        <span className="text-sm font-bold text-text-primary">{style.label}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{style.ruleTip}</p>
                    </div>
                  ))}
                </div>
              </BorderedSubPanel>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Study Mode: Verse-by-verse breakdown */}
              {surahVerses.length > 0 ? (
                // Local featured verses with Tajweed & word-by-word
                surahVerses.map((verse) => {
                  const isVerseSaved = savedItems.includes(`verse-${surah.id}-${verse.number}`);
                  const isTafsirOpen = expandedTafsir === verse.number;

                  return (
                    <div
                      key={verse.number}
                      className="relative bg-bg-primary/90 rounded-2xl border border-accent-gold/40 p-5 sm:p-7 shadow-xs hover:border-accent-gold transition-all"
                    >
                      <CornerFlourishes size={12} opacity={0.6} />

                      {/* Verse Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-accent-gold/25">
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold font-bold text-sm flex items-center justify-center">
                            {verse.number}
                          </span>
                          <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
                            Ayah {verse.number} of {surah.verses}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playVerse(verse.number)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card hover:bg-bg-card/80 border border-accent-gold/35 hover:border-accent-gold text-accent-gold text-xs font-semibold transition-colors uppercase tracking-wider"
                          >
                            <Play className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => toggleSaved(`verse-${surah.id}-${verse.number}`)}
                            className={`p-2 rounded-lg transition-colors border ${
                              isVerseSaved
                                ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                                : 'text-text-muted border-transparent hover:text-accent-gold hover:border-accent-gold/30'
                            }`}
                          >
                            {isVerseSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div className="py-6 text-right font-arabic text-3xl sm:text-4xl leading-[2.6] text-accent-gold tracking-wide select-text">
                        {verse.arabic}
                      </div>

                      {/* Word-by-word Breakdown with Tajweed */}
                      {verse.words && verse.words.length > 0 && (
                        <div className="py-4 px-4 sm:px-5 bg-bg-card/80 rounded-xl border border-accent-gold/35 mb-4">
                          <div className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-2.5">
                            Word-by-Word Analysis & Tajweed
                          </div>
                          <div className="flex flex-wrap gap-2.5 justify-end" dir="rtl">
                            {verse.words.map((w, idx) => {
                              const rule = w.tajweed?.[0];
                              const style = rule ? tajweedStyles[rule] : null;
                              return (
                                <div
                                  key={idx}
                                  className="bg-bg-primary px-3 py-2 rounded-lg border border-accent-gold/35 text-center shadow-xs"
                                >
                                  <div
                                    className="font-arabic text-lg sm:text-xl text-text-primary"
                                    style={style ? { color: style.color, fontWeight: 700 } : {}}
                                  >
                                    {w.arabic}
                                  </div>
                                  <div className="text-xs text-text-muted font-mono mt-0.5" dir="ltr">
                                    {w.transliteration}
                                  </div>
                                  <div className="text-xs text-accent-gold font-semibold" dir="ltr">
                                    {w.translation}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Translation & Transliteration */}
                      <div className="space-y-2 mt-3">
                        <p className="text-text-primary text-base sm:text-lg font-medium leading-relaxed">
                          {verse.translation}
                        </p>
                        <p className="text-text-secondary text-sm italic font-serif">
                          {verse.transliteration}
                        </p>
                      </div>

                      {/* Key Understanding Notes */}
                      {verse.understanding && verse.understanding.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-accent-gold/20">
                          <div className="text-xs font-bold text-accent-gold uppercase tracking-wider flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-accent-gold" />
                            <span>Verse Meaning & Context</span>
                          </div>
                          <ul className="space-y-2 text-sm text-text-secondary">
                            {verse.understanding.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-accent-gold mt-1">•</span>
                                <span className="leading-relaxed">{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Reflection Questions & Du'a */}
                      {verse.reflectionQuestions && verse.reflectionQuestions.length > 0 && (
                        <BorderedSubPanel className="mt-4 p-4">
                          <div className="text-xs font-bold text-accent-gold uppercase tracking-wider flex items-center gap-2 mb-2">
                            <HelpCircle className="w-4 h-4 text-accent-gold" />
                            <span>Contemplation Question</span>
                          </div>
                          <p className="text-sm text-text-primary italic leading-relaxed">
                            "{verse.reflectionQuestions[0]}"
                          </p>
                          {verse.dua && (
                            <div className="mt-3 pt-2.5 border-t border-accent-gold/25 flex items-start gap-2 text-sm text-text-primary">
                              <span className="font-bold text-accent-gold shrink-0 uppercase tracking-wider text-xs">Du'a:</span>
                              <span className="italic">{verse.dua}</span>
                            </div>
                          )}
                        </BorderedSubPanel>
                      )}

                      {/* Tafsir Excerpt Accordion */}
                      {verse.tafsir && (
                        <div className="mt-3.5">
                          <button
                            onClick={() => setExpandedTafsir(isTafsirOpen ? null : verse.number)}
                            className="text-xs sm:text-sm text-accent-gold hover:underline font-semibold inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                          >
                            <span>Ibn Kathir Tafsir Excerpt</span>
                            {isTafsirOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          {isTafsirOpen && (
                            <BorderedSubPanel className="mt-2.5 text-sm sm:text-base text-text-secondary leading-relaxed p-4 animate-in fade-in duration-150">
                              <span className="font-bold text-accent-gold block mb-1.5 uppercase tracking-wider text-xs">Tafsir Ibn Kathir:</span>
                              {verse.tafsir}
                            </BorderedSubPanel>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : isLoadingRemote ? (
                // Loading state from free keyless AlQuran Cloud API
                <div className="text-center py-16 bg-bg-primary/90 rounded-2xl border border-accent-gold/40 p-8 relative">
                  <CornerFlourishes />
                  <Loader2 className="w-9 h-9 text-accent-gold animate-spin mx-auto mb-3" />
                  <h4 className="text-text-primary font-bold text-lg">Loading Chapter Verses & Tafsir...</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    Retrieving authentic Arabic text, Saheeh International translation, and Tafsir Al-Muyassar via Al-Quran Cloud.
                  </p>
                </div>
              ) : remoteAyahs.length > 0 ? (
                // Remote verses rendered seamlessly
                remoteAyahs.map((ayah) => {
                  const isVerseSaved = savedItems.includes(`verse-${surah.id}-${ayah.numberInSurah}`);
                  const isTafsirOpen = expandedTafsir === ayah.numberInSurah;

                  return (
                    <div
                      key={ayah.numberInSurah}
                      className="relative bg-bg-primary/90 rounded-2xl border border-accent-gold/40 p-5 sm:p-7 shadow-xs hover:border-accent-gold transition-all"
                    >
                      <CornerFlourishes size={12} opacity={0.6} />

                      {/* Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-accent-gold/25">
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-lg bg-bg-card border border-accent-gold/40 text-accent-gold font-bold text-sm flex items-center justify-center">
                            {ayah.numberInSurah}
                          </span>
                          <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
                            Ayah {ayah.numberInSurah} of {surah.verses}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playVerse(ayah.numberInSurah, ayah.arabic, ayah.translation)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card hover:bg-bg-card/80 border border-accent-gold/35 hover:border-accent-gold text-accent-gold text-xs font-semibold transition-colors uppercase tracking-wider"
                          >
                            <Play className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => toggleSaved(`verse-${surah.id}-${ayah.numberInSurah}`)}
                            className={`p-2 rounded-lg transition-colors border ${
                              isVerseSaved
                                ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                                : 'text-text-muted border-transparent hover:text-accent-gold hover:border-accent-gold/30'
                            }`}
                          >
                            {isVerseSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div className="py-6 text-right font-arabic text-3xl sm:text-4xl leading-[2.6] text-accent-gold tracking-wide select-text">
                        {ayah.arabic}
                      </div>

                      {/* English Translation */}
                      <div className="space-y-2 mt-3">
                        <p className="text-text-primary text-base sm:text-lg font-medium leading-relaxed">
                          {ayah.translation}
                        </p>
                      </div>

                      {/* Tafsir Accordion */}
                      {ayah.tafsir && (
                        <div className="mt-3.5">
                          <button
                            onClick={() => setExpandedTafsir(isTafsirOpen ? null : ayah.numberInSurah)}
                            className="text-xs sm:text-sm text-accent-gold hover:underline font-semibold inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                          >
                            <span>Tafsir Al-Muyassar (تفسير الميسر)</span>
                            {isTafsirOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          {isTafsirOpen && (
                            <BorderedSubPanel className="mt-2.5 text-sm sm:text-base text-text-secondary leading-relaxed p-4 animate-in fade-in duration-150">
                              <span className="font-bold text-accent-gold block mb-1.5 uppercase tracking-wider text-xs">تفسير مجمع الملك فهد:</span>
                              <p className="font-arabic text-base sm:text-lg text-right leading-loose text-text-primary" dir="rtl">
                                {ayah.tafsir}
                              </p>
                            </BorderedSubPanel>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                // Fallback state if offline or unable to load
                <div className="text-center py-12 bg-bg-primary/90 rounded-2xl border border-accent-gold p-6 relative">
                  <CornerFlourishes />
                  <BookOpen className="w-12 h-12 text-accent-gold/50 mx-auto mb-3" />
                  <h4 className="text-text-primary font-bold text-lg">Surah Audio Recitation Ready</h4>
                  <p className="text-text-secondary text-base mt-1 max-w-md mx-auto">
                    {remoteError
                      ? 'Could not connect to live verses. Click "Play Full Surah" to listen to complete recitation.'
                      : `Click "Play Full Surah" to listen to complete recitation by ${reciterId}.`}
                  </p>
                  <button
                    onClick={playFullSurah}
                    className="mt-4 px-5 py-2.5 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs sm:text-sm font-bold rounded-xl transition-colors uppercase tracking-wider"
                  >
                    Listen to Full Chapter ({surah.time})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-bg-primary border-t border-accent-gold/40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
            <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
            <span>Keyless Quran text & translations via Al-Quran Cloud (Saheeh International & Tafsir Al-Muyassar)</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-bg-card hover:bg-bg-card/80 border border-accent-gold/45 hover:border-accent-gold text-accent-gold font-bold text-xs sm:text-sm transition-colors uppercase tracking-wider shrink-0"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
