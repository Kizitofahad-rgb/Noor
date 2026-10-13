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
  Compass,
  Wind,
  Feather,
  Radio,
  Loader2,
} from 'lucide-react';
import type { ProphetStory } from '@/lib/storiesData';
import { getSurahAudioUrl } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import { BorderedSubPanel, CornerFlourishes } from './Ornamentation';
import {
  generateAdventuristicScript,
  getFullAdventuristicNarration,
  ambientSoundscape,
} from '@/lib/storyNarrationEngine';

interface StoryAudioPlayerProps {
  story: ProphetStory;
  onSectionClick?: (sectionId: string) => void;
  activeSectionId?: string;
}

export type NarratorPersona = 'chronicler' | 'traveler' | 'sage' | 'gemini_ai';

export function StoryAudioPlayer({ story, onSectionClick, activeSectionId }: StoryAudioPlayerProps) {
  const { reciterId } = useNoor();

  // Mode: 'quran' uses native HTML5 audio stream; 'narration' uses adventuristic narrative
  const [audioSource, setAudioSource] = useState<'quran' | 'narration'>('narration');
  const [narratorPersona, setNarratorPersona] = useState<NarratorPersona>('chronicler');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(story.audioNarration.durationSeconds || 320);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showToc, setShowToc] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  const [isAmbientEnabled, setIsAmbientEnabled] = useState(true);
  const [isLoadingAiAudio, setIsLoadingAiAudio] = useState(false);
  const [activeStoryScene, setActiveStoryScene] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const aiAudioRef = useRef<HTMLAudioElement | null>(null);
  const wakeLockRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const evidence = story.quranEvidence[0];
  const primarySurahNumber = evidence ? evidence.surahNumber : 1;
  const quranAudioUrl = getSurahAudioUrl(primarySurahNumber, reciterId);

  const adventuristicScript = generateAdventuristicScript(story);

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Screen Wake Lock Handler to prevent phone from sleeping
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

  // Register MediaSession metadata for lock screen
  const updateMediaSession = () => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      const title =
        audioSource === 'quran'
          ? `Surah ${evidence?.surahName || story.name} · Tilawah`
          : `Chronicle of Prophet ${story.name} (${story.meaning})`;

      const artist =
        audioSource === 'quran'
          ? `Qari ${reciterId} · Revelation for ${story.name}`
          : `Adventuristic Audio Drama · Noor`;

      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album: 'Prophetic Chronicles · Noor',
        artwork: [
          { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => handlePlay());
      navigator.mediaSession.setActionHandler('pause', () => handlePause());
      navigator.mediaSession.setActionHandler('seekbackward', () => handleSkipBack10());
      navigator.mediaSession.setActionHandler('seekforward', () => handleSkipForward10());
    }
  };

  // Setup HTML5 Audio element for Quran Tilawah
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.setAttribute('playsinline', 'true');
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;
    audio.src = quranAudioUrl;
    audio.playbackRate = playbackRate;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audioDuration === 300) {
        setAudioDuration(Math.floor(audio.duration));
      }
    };

    const onTimeUpdate = () => {
      if (audioSource === 'quran') {
        setCurrentTime(Math.floor(audio.currentTime));
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      releaseWakeLock();
      ambientSoundscape.stop();
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      releaseWakeLock();
      ambientSoundscape.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [quranAudioUrl]);

  /**
   * Spoken Adventuristic Narration Engine
   */
  const startAdventuristicSpeech = async (startFromSecond: number) => {
    if (typeof window === 'undefined') return;

    // 1. Start atmospheric ambient soundscape if enabled
    if (isAmbientEnabled) {
      ambientSoundscape.start();
    } else {
      ambientSoundscape.stop();
    }

    // 2. If Gemini AI Neural voice selected, attempt server-side studio generation
    if (narratorPersona === 'gemini_ai') {
      try {
        setIsLoadingAiAudio(true);
        const scriptText = `${adventuristicScript.opening}. ${adventuristicScript.climacticMoment}. ${adventuristicScript.wisdomLegacy}`;
        const res = await fetch('/api/stories/narrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: scriptText,
            voice: 'Fenrir', // Deep cinematic baritone
            storyName: story.name,
          }),
        });

        const data = await res.json();
        if (data.success && data.audioBase64) {
          const aiAudio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          aiAudio.playbackRate = playbackRate;
          aiAudioRef.current = aiAudio;

          aiAudio.onended = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            ambientSoundscape.stop();
            releaseWakeLock();
          };

          await aiAudio.play();
          setIsLoadingAiAudio(false);
          return;
        }
      } catch (err) {
        console.warn('[Gemini TTS] Fallback to client voice engine:', err);
      } finally {
        setIsLoadingAiAudio(false);
      }
    }

    // 3. Client-side Speech Synthesis with custom dramatic persona calibration
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const fullText = getFullAdventuristicNarration(story);
      const words = fullText.split(' ');
      const wordsPerSecond = 2.2 * playbackRate;
      const startWordIndex = Math.min(Math.floor(startFromSecond * wordsPerSecond), words.length - 1);
      const remainingText = words.slice(startWordIndex).join(' ');

      const utterance = new SpeechSynthesisUtterance(remainingText);
      utterance.rate = playbackRate * (narratorPersona === 'sage' ? 0.88 : narratorPersona === 'traveler' ? 1.05 : 0.95);
      utterance.pitch = narratorPersona === 'sage' ? 0.82 : narratorPersona === 'traveler' ? 1.06 : 0.90;

      const voices = window.speechSynthesis.getVoices();

      // Find the most natural human narrator based on persona
      let selectedVoice = null;
      if (narratorPersona === 'chronicler') {
        // Dramatic British or Natural Baritone
        selectedVoice =
          voices.find((v) => (v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Arthur') || v.name.includes('UK') || v.name.includes('Great Britain')) && v.lang.startsWith('en')) ||
          voices.find((v) => v.name.includes('Natural') && v.lang.startsWith('en'));
      } else if (narratorPersona === 'traveler') {
        // Spirited adventurous narrator
        selectedVoice =
          voices.find((v) => (v.name.includes('Guy') || v.name.includes('David') || v.name.includes('Google US')) && v.lang.startsWith('en')) ||
          voices.find((v) => v.lang.startsWith('en'));
      } else {
        // Calm sage narrator
        selectedVoice =
          voices.find((v) => (v.name.includes('Serena') || v.name.includes('George') || v.name.includes('Enhanced')) && v.lang.startsWith('en')) ||
          voices.find((v) => v.lang.startsWith('en'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else if (voices.length > 0) {
        utterance.voice = voices.find((v) => v.lang.startsWith('en')) || voices[0];
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        ambientSoundscape.stop();
        releaseWakeLock();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        ambientSoundscape.stop();
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
      ambientSoundscape.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (aiAudioRef.current) {
        aiAudioRef.current.pause();
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
      startAdventuristicSpeech(currentTime);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    releaseWakeLock();
    ambientSoundscape.stop();

    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (aiAudioRef.current) {
      aiAudioRef.current.pause();
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
    setCurrentTime(targetSecond);
    if (audioSource === 'quran' && audioRef.current) {
      audioRef.current.currentTime = targetSecond;
    } else if (audioSource === 'narration' && isPlaying) {
      startAdventuristicSpeech(targetSecond);
    }
  };

  const handleSkipBack10 = () => {
    const next = Math.max(0, currentTime - 10);
    handleSeek(next);
  };

  const handleSkipForward10 = () => {
    const next = Math.min(audioDuration, currentTime + 10);
    handleSeek(next);
  };

  const handleChangeSpeed = (newRate: number) => {
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
    if (aiAudioRef.current) {
      aiAudioRef.current.playbackRate = newRate;
    }
    if (audioSource === 'narration' && isPlaying) {
      startAdventuristicSpeech(currentTime);
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
          startAdventuristicSpeech(0);
        }
      }, 100);
    }
  };

  // Timer tick for narration progress and scene tracking
  useEffect(() => {
    if (isPlaying && audioSource === 'narration') {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          // Progress scene based on time
          if (next < 60) setActiveStoryScene(0);
          else if (next < 140) setActiveStoryScene(1);
          else if (next < 220) setActiveStoryScene(2);
          else setActiveStoryScene(3);

          if (next >= audioDuration) {
            handlePause();
            return 0;
          }
          return next;
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
    setActiveStoryScene(0);
  }, [story.id]);

  const activeTrack = story.audioNarration.tracks[activeTrackIndex] || story.audioNarration.tracks[0];

  const storyScenes = [
    { title: 'The Ancient Awakening', desc: adventuristicScript.opening, icon: '🌅' },
    { title: 'The Gathering Storm', desc: adventuristicScript.epicChronicle, icon: '⚡' },
    { title: 'The Divine Climax & Miracle', desc: adventuristicScript.climacticMoment, icon: '🌊' },
    { title: 'The Eternal Wisdom', desc: adventuristicScript.wisdomLegacy, icon: '🌟' },
  ];

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
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Select Listening Experience</span>
          </div>
          <p className="text-xs text-text-secondary">
            {audioSource === 'quran'
              ? `Authentic Tilawah recitation for Prophet ${story.name} (Surah #${primarySurahNumber}) by Qari ${reciterId}`
              : `Cinematic adventuristic audiobook chronicle with atmospheric ambient soundscape`}
          </p>
        </div>

        <div className="flex items-center bg-bg-primary p-1 rounded-xl border border-accent-gold/35 text-xs font-semibold">
          <button
            onClick={() => handleSwitchAudioSource('narration')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              audioSource === 'narration'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Epic Chronicle</span>
          </button>

          <button
            onClick={() => handleSwitchAudioSource('quran')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              audioSource === 'quran'
                ? 'bg-accent-gold text-bg-primary font-bold shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Sacred Tilawah (#{primarySurahNumber})</span>
          </button>
        </div>
      </div>

      {/* Narrator Voice Persona & Soundscape Controls (Only when in Chronicle mode) */}
      {audioSource === 'narration' && (
        <div className="p-4 rounded-2xl bg-bg-primary/60 border border-accent-gold/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>Adventuristic Narrator Persona</span>
            </div>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={() => {
                const next = !isAmbientEnabled;
                setIsAmbientEnabled(next);
                if (!next) {
                  ambientSoundscape.stop();
                } else if (isPlaying) {
                  ambientSoundscape.start();
                }
              }}
              className={`px-3 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAmbientEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                  : 'bg-bg-card border-accent-gold/25 text-text-muted hover:text-text-primary'
              }`}
              title="Adds an organic desert resonance and sacred harmonic ambience behind the voice"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>{isAmbientEnabled ? 'Atmospheric Drone ON 🌿' : 'Atmospheric Drone OFF'}</span>
            </button>
          </div>

          {/* Voice Persona Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'chronicler' as const, label: 'Desert Chronicler', role: 'Dignified Baritone', icon: '🎙️' },
              { id: 'traveler' as const, label: 'Adventurer', role: 'Spirited & Vivid', icon: '🦅' },
              { id: 'sage' as const, label: 'Ancient Sage', role: 'Deep & Reverent', icon: '🌿' },
              { id: 'gemini_ai' as const, label: 'Gemini Studio AI', role: 'Neural Deep Voice', icon: '✨' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setNarratorPersona(p.id);
                  if (isPlaying) {
                    handlePause();
                    setTimeout(() => handlePlay(), 150);
                  }
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  narratorPersona === p.id
                    ? 'bg-accent-gold/20 text-accent-gold border-accent-gold shadow-sm ring-1 ring-accent-gold'
                    : 'bg-bg-card border-accent-gold/25 text-text-secondary hover:text-text-primary hover:border-accent-gold/50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
                  <span>{p.icon}</span>
                  <span className="truncate">{p.label}</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5 truncate">{p.role}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Player Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{audioSource === 'quran' ? 'Quranic Scripture Audio' : 'Adventuristic Audio Drama'}</span>
            </span>
            <span className="text-xs text-text-secondary font-mono">
              {formatTime(currentTime)} / {formatTime(audioDuration)}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary tracking-tight">
            {audioSource === 'quran'
              ? `Surah ${evidence?.surahName || story.name} · Divine Revelation`
              : `The Epic Chronicle of Prophet ${story.name}`}
          </h3>
          <p className="text-xs text-text-secondary">
            {audioSource === 'quran'
              ? `Recited by Qari ${reciterId} · Continues playing seamlessly on lock screen & sleep`
              : `Voiced by ${narratorPersona === 'chronicler' ? 'The Desert Chronicler' : narratorPersona === 'traveler' ? 'The Adventurous Traveler' : narratorPersona === 'gemini_ai' ? 'Gemini Neural AI (Fenrir)' : 'The Ancient Sage'} with sacred atmospheric soundtrack`}
          </p>
        </div>

        {/* Speed Controls & Chapters Toggle */}
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
                : 'bg-bg-primary border-accent-gold/30 text-text-secondary hover:border-accent-gold'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Story Scenes</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Scrubber */}
      <div className="space-y-1.5">
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            handleSeek(pos * audioDuration);
          }}
          className="relative h-2.5 bg-bg-primary rounded-full overflow-hidden cursor-pointer border border-accent-gold/30 group"
        >
          <div
            className="h-full bg-gradient-to-r from-accent-gold to-amber-300 transition-all"
            style={{ width: `${Math.min(100, (currentTime / (audioDuration || 1)) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-text-muted font-mono font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioDuration)}</span>
        </div>
      </div>

      {/* Main Transport Playback Controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 py-1">
        <button
          onClick={handleSkipBack10}
          title="Back 10 seconds"
          className="p-3 rounded-2xl bg-bg-primary hover:bg-bg-card border border-accent-gold/35 text-accent-gold hover:border-accent-gold transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          disabled={isLoadingAiAudio}
          title={isPlaying ? 'Pause' : 'Play'}
          className="w-14 h-14 rounded-full bg-accent-gold hover:bg-accent-gold-dim text-bg-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer font-bold"
        >
          {isLoadingAiAudio ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>

        <button
          onClick={handleSkipForward10}
          title="Forward 10 seconds"
          className="p-3 rounded-2xl bg-bg-primary hover:bg-bg-card border border-accent-gold/35 text-accent-gold hover:border-accent-gold transition-colors"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      {/* Adventuristic Story Scenes Timeline (When in Narration mode) */}
      {audioSource === 'narration' && showToc && (
        <div className="pt-2 border-t border-accent-gold/25 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center justify-between">
            <span>Story Chapter Scenes (Cinematic Progression)</span>
            <span className="text-[11px] text-text-muted font-normal">Click any scene to jump</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {storyScenes.map((scene, idx) => {
              const isActive = activeStoryScene === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveStoryScene(idx);
                    handleSeek(idx * 75);
                  }}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-accent-gold/15 border-accent-gold ring-1 ring-accent-gold shadow-sm'
                      : 'bg-bg-primary/50 border-accent-gold/25 hover:border-accent-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{scene.icon}</span>
                    <span className="text-xs font-bold text-text-primary truncate font-serif">
                      {scene.title}
                    </span>
                    {isActive && isPlaying && (
                      <span className="w-2 h-2 rounded-full bg-accent-gold animate-ping ml-auto" />
                    )}
                  </div>
                  <p className="text-[11px] text-text-secondary line-clamp-2 mt-1 italic">
                    "{scene.desc}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
