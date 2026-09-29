import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  ListFilter,
  Sparkles,
  Check,
  ChevronDown,
  Sun,
  ShieldCheck,
  Music,
  Headphones,
} from 'lucide-react';
import type { ProphetStory } from '@/lib/storiesData';
import { getSurahAudioUrl } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import { BorderedSubPanel, CornerFlourishes } from './Ornamentation';

interface StoryAudioPlayerProps {
  story: ProphetStory;
  onSectionClick?: (sectionId: string) => void;
  activeSectionId?: string;
}

export function StoryAudioPlayer({ story, onSectionClick, activeSectionId }: StoryAudioPlayerProps) {
  const { reciterId } = useNoor();

  // Mode: 'quran' uses native HTML5 audio stream (guaranteed to keep playing on phone screen sleep/lock)
  // 'narration' uses spoken narrative
  const [audioSource, setAudioSource] = useState<'quran' | 'narration'>('quran');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(story.audioNarration.durationSeconds || 300);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showToc, setShowToc] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wakeLockRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const evidence = story.quranEvidence[0];
  const primarySurahNumber = evidence ? evidence.surahNumber : 1;
  const quranAudioUrl = getSurahAudioUrl(primarySurahNumber, reciterId);

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Screen Wake Lock Handler to prevent phone from going to sleep while listening
  const requestWakeLock = async () => {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator && !wakeLockRef.current) {
      try {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        setIsWakeLockActive(true);
      } catch {
        setIsWakeLockActive(false);
      }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsWakeLockActive(false);
      } catch {
        // Ignore
      }
    }
  };

  // Register MediaSession metadata for background lock screen playback
  const updateMediaSession = () => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      const title =
        audioSource === 'quran'
          ? `Surah ${evidence?.surahName || story.name} · Recitation`
          : `Story of Prophet ${story.name}`;

      const artist =
        audioSource === 'quran'
          ? `Qari ${reciterId} · Revelation for ${story.name}`
          : `${story.titleBadge} · Devotional Narration`;

      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album: 'Prophetic Chronicles · Noor',
        artwork: [
          { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/public/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        handlePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        handlePause();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        handleSkipBack10();
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        handleSkipForward10();
      });
    }
  };

  // Setup HTML5 Audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.setAttribute('playsinline', 'true');
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;
    audio.src = quranAudioUrl;
    audio.playbackRate = playbackRate;

    const onTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
        setAudioDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      releaseWakeLock();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      releaseWakeLock();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [quranAudioUrl]);

  // Speech synthesis for English spoken narration
  const getNarrationText = () => {
    const intro = `The sacred chronicle of Prophet ${story.name}, peace be upon him. ${story.meaning}. ${story.whoIsIntro}`;
    const sectionsText = story.narrativeSections
      .map((s) => `${s.title}. ${s.content.join(' ')}`)
      .join(' ');
    const lessonsText = `Spiritual teachings and lessons: ${story.teachingsAndLessons.join('. ')}`;
    return `${intro} ${sectionsText} ${lessonsText}`;
  };

  const startSpeech = (startFromSecond: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const fullText = getNarrationText();
      const words = fullText.split(' ');
      const wordsPerSecond = 2.4 * playbackRate;
      const startWordIndex = Math.min(Math.floor(startFromSecond * wordsPerSecond), words.length - 1);
      const remainingText = words.slice(startWordIndex).join(' ');

      const utterance = new SpeechSynthesisUtterance(remainingText);
      utterance.rate = playbackRate;
      utterance.pitch = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Enhanced')) && v.lang.startsWith('en')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        releaseWakeLock();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    await requestWakeLock();
    updateMediaSession();

    if (audioSource === 'quran') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.play().catch((err) => {
          console.warn('Audio play error:', err);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      startSpeech(currentTime);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    releaseWakeLock();

    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (targetSecond: number) => {
    const clamped = Math.max(0, Math.min(audioDuration, targetSecond));
    setCurrentTime(clamped);

    if (audioSource === 'quran' && audioRef.current) {
      audioRef.current.currentTime = clamped;
    } else if (audioSource === 'narration') {
      if (isPlaying) {
        startSpeech(clamped);
      }
    }
  };

  const handleSkipBack10 = () => {
    handleSeek(currentTime - 10);
  };

  const handleSkipForward10 = () => {
    handleSeek(currentTime + 10);
  };

  const handleChangeSpeed = (newRate: number) => {
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
    if (audioSource === 'narration' && isPlaying) {
      startSpeech(currentTime);
    }
  };

  const handleSwitchAudioSource = (newSource: 'quran' | 'narration') => {
    const wasPlaying = isPlaying;
    handlePause();
    setAudioSource(newSource);
    setCurrentTime(0);
    if (wasPlaying) {
      setTimeout(() => {
        setIsPlaying(true);
        if (newSource === 'quran') {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        } else {
          startSpeech(0);
        }
      }, 100);
    }
  };

  // Timer tick for narration progress
  useEffect(() => {
    if (isPlaying && audioSource === 'narration') {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= audioDuration) {
            handlePause();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, audioSource, audioDuration, playbackRate]);

  // Clean up when story changes
  useEffect(() => {
    handlePause();
    setCurrentTime(0);
  }, [story.id]);

  const activeTrack = story.audioNarration.tracks[activeTrackIndex] || story.audioNarration.tracks[0];

  return (
    <div className="relative bg-bg-card border border-accent-gold/45 rounded-3xl p-5 sm:p-7 shadow-2xl text-text-primary space-y-6">
      <CornerFlourishes size={14} opacity={0.6} />

      {/* Background Lock Screen Sleep Support Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold text-text-primary">
            Continuous Phone Sleep & Lock Screen Audio Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isWakeLockActive) {
                releaseWakeLock();
              } else {
                requestWakeLock();
              }
            }}
            className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
              isWakeLockActive
                ? 'bg-amber-500/25 border-amber-400 text-amber-300'
                : 'border-accent-gold/30 hover:border-accent-gold text-text-secondary'
            }`}
            title="Keep screen awake while reading/listening"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{isWakeLockActive ? 'Screen Keep-Awake ON' : 'Keep Screen Awake'}</span>
          </button>
        </div>
      </div>

      {/* Audio Mode Switcher: Sacred Tilawah vs Spoken Narrative */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-accent-gold/20 pb-4">
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-gold">
            Select Listening Experience
          </div>
          <p className="text-xs text-text-secondary">
            {audioSource === 'quran'
              ? `Authentic Tilawah recitation for Prophet ${story.name} (Surah #${primarySurahNumber}) by Qari ${reciterId}`
              : `Complete spoken English devotional chronicle with chapter progression`}
          </p>
        </div>

        <div className="flex items-center bg-bg-primary p-1 rounded-xl border border-accent-gold/35 text-xs font-semibold">
          <button
            onClick={() => handleSwitchAudioSource('quran')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              audioSource === 'quran'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Sacred Tilawah (Surah #{primarySurahNumber})</span>
          </button>
          <button
            onClick={() => handleSwitchAudioSource('narration')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              audioSource === 'narration'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Chronicle Narrative</span>
          </button>
        </div>
      </div>

      {/* Player Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{audioSource === 'quran' ? 'Quranic Scripture Audio' : 'Chronicle Narration'}</span>
            </span>
            <span className="text-xs text-text-secondary font-mono">
              {formatTime(currentTime)} / {formatTime(audioDuration)}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary tracking-tight">
            {audioSource === 'quran'
              ? `Surah ${evidence?.surahName || story.name} · Divine Quranic Revelation`
              : activeTrack.title}
          </h3>
          <p className="text-xs text-text-secondary">
            {audioSource === 'quran'
              ? `Recited by Qari ${reciterId} · Continues playing seamlessly on lock screen & sleep`
              : `Narrated by ${activeTrack.narrator} · Devotional English timeline`}
          </p>
        </div>

        {/* Speed Controls & Track Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center bg-bg-primary rounded-xl border border-accent-gold/35 p-1 text-xs font-semibold">
            {speedOptions.map((rate) => (
              <button
                key={rate}
                onClick={() => handleChangeSpeed(rate)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  playbackRate === rate
                    ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
              showToc
                ? 'bg-accent-gold/25 text-accent-gold border-accent-gold shadow-xs'
                : 'bg-bg-primary text-text-secondary border-accent-gold/30 hover:border-accent-gold hover:text-text-primary'
            }`}
            title="Toggle Narrative Timeline"
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Timeline</span>
          </button>
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="space-y-1.5">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={audioDuration || 100}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold border border-accent-gold/30"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted font-mono">
          <span>{formatTime(currentTime)}</span>
          <span className="text-accent-gold font-semibold">
            {audioSource === 'quran'
              ? `Surah #${primarySurahNumber} · Background Lock Support`
              : story.audioNarration.tableOfContents.find(
                  (toc, idx, arr) =>
                    currentTime >= toc.timestampSeconds &&
                    (idx === arr.length - 1 || currentTime < arr[idx + 1].timestampSeconds)
                )?.title || 'Introduction'}
          </span>
          <span>{formatTime(audioDuration)}</span>
        </div>
      </div>

      {/* Main Control Buttons */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1">
        {/* Skip -10s */}
        <button
          onClick={handleSkipBack10}
          className="p-2.5 sm:p-3 rounded-xl bg-bg-primary hover:bg-bg-primary/80 border border-accent-gold/40 hover:border-accent-gold text-accent-gold transition-transform active:scale-95 flex items-center gap-1 font-semibold text-xs shadow-xs"
          title="Skip backward 10 seconds"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[11px]">-10s</span>
        </button>

        {/* Play / Pause Primary Button */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 font-bold"
          title={isPlaying ? 'Pause' : 'Play narration'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          ) : (
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
          )}
        </button>

        {/* Skip +10s */}
        <button
          onClick={handleSkipForward10}
          className="p-2.5 sm:p-3 rounded-xl bg-bg-primary hover:bg-bg-primary/80 border border-accent-gold/40 hover:border-accent-gold text-accent-gold transition-transform active:scale-95 flex items-center gap-1 font-semibold text-xs shadow-xs"
          title="Skip forward 10 seconds"
        >
          <span className="text-[11px]">+10s</span>
          <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Clickable Table of Contents Synced to Timestamps */}
      {showToc && (
        <div className="pt-4 border-t border-accent-gold/25 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-accent-gold uppercase tracking-wider">
            <span>Clickable Narrative Sections</span>
            <span className="text-text-muted font-normal">Jump straight to milestone</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {story.audioNarration.tableOfContents.map((item, idx) => {
              const isCurrent =
                currentTime >= item.timestampSeconds &&
                (idx === story.audioNarration.tableOfContents.length - 1 ||
                  currentTime < story.audioNarration.tableOfContents[idx + 1].timestampSeconds);

              return (
                <button
                  key={item.sectionId}
                  onClick={() => {
                    handleSeek(item.timestampSeconds);
                    if (onSectionClick) {
                      onSectionClick(item.sectionId);
                    }
                  }}
                  className={`flex items-center justify-between gap-3 p-3 rounded-xl text-left transition-all border ${
                    isCurrent
                      ? 'bg-accent-gold/20 border-accent-gold text-accent-gold shadow-xs'
                      : 'bg-bg-primary hover:bg-bg-primary/80 border-accent-gold/30 hover:border-accent-gold/60 text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                        isCurrent
                          ? 'bg-accent-gold text-bg-primary border-accent-gold'
                          : 'bg-bg-card text-accent-gold border-accent-gold/40'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {item.title}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-accent-gold shrink-0 font-bold bg-bg-card px-2 py-0.5 rounded border border-accent-gold/30">
                    {item.timestamp}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
