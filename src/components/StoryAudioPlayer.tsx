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
  Sliders,
  Volume1,
  Waves,
} from 'lucide-react';
import type { ProphetStory } from '@/lib/storiesData';
import { getSurahAudioUrl } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import { BorderedSubPanel, CornerFlourishes } from './Ornamentation';
import {
  generateAdventuristicScript,
  getFullAdventuristicNarration,
} from '@/lib/storyNarrationEngine';
import {
  spatial3DSound,
  bulletproofNarrator,
  SOUNDSCAPE_PRESETS,
  type SoundscapeType,
} from '@/lib/spatialAudio3d';

interface StoryAudioPlayerProps {
  story: ProphetStory;
  onSectionClick?: (sectionId: string) => void;
  activeSectionId?: string;
}

export type NarratorPersona = 'chronicler' | 'traveler' | 'sage';

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
  const [activeStoryScene, setActiveStoryScene] = useState<number>(0);

  // 3D Soundscape and Live Narration State
  const defaultSoundscape: SoundscapeType =
    story.id === 'nuh' || story.id === 'musa'
      ? 'sea-storm'
      : story.id === 'muhammad' || story.id === 'adam'
      ? 'sacred-night'
      : 'desert-wind';

  const [soundscapePreset, setSoundscapePreset] = useState<SoundscapeType>(defaultSoundscape);
  const [is3dSpatial, setIs3dSpatial] = useState<boolean>(true);
  const [soundscapeVolume, setSoundscapeVolume] = useState<number>(0.4);
  const [currentNarratedSentence, setCurrentNarratedSentence] = useState<string>('');
  const [show3dControls, setShow3dControls] = useState<boolean>(false);

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
      spatial3DSound.stop();
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
      spatial3DSound.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [quranAudioUrl]);

  /**
   * Spoken Adventuristic Narration Engine with 3D Spatial Soundscapes
   */
  const startAdventuristicSpeech = (startFromSecond: number) => {
    if (typeof window === 'undefined') return;

    // 1. Start 3D atmospheric soundscape (wind, ocean, sacred night) if enabled
    if (isAmbientEnabled) {
      spatial3DSound.setVolume(soundscapeVolume);
      spatial3DSound.set3DSpatial(is3dSpatial);
      spatial3DSound.start(soundscapePreset);
    } else {
      spatial3DSound.stop();
    }

    // 2. Prepare full adventuristic chronicle text
    const fullText = getFullAdventuristicNarration(story);
    bulletproofNarrator.loadText(fullText);

    const totalSentences = bulletproofNarrator.getSentences().length;
    const startIndex = Math.min(
      Math.floor((startFromSecond / (audioDuration || 180)) * totalSentences),
      Math.max(0, totalSentences - 1)
    );

    bulletproofNarrator.start({
      rate: playbackRate,
      persona: narratorPersona,
      startIndex,
      onProgress: (idx, total, sentence) => {
        setCurrentNarratedSentence(sentence);
        const estTime = Math.floor((idx / total) * audioDuration);
        setCurrentTime(estTime);

        // Update active scene based on narrative progress
        const ratio = idx / total;
        if (ratio < 0.25) setActiveStoryScene(0);
        else if (ratio < 0.55) setActiveStoryScene(1);
        else if (ratio < 0.85) setActiveStoryScene(2);
        else setActiveStoryScene(3);
      },
      onEnd: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setCurrentNarratedSentence('');
        spatial3DSound.stop();
        releaseWakeLock();
      },
    });
  };

  const [isPreviewingAtmosphere, setIsPreviewingAtmosphere] = useState(false);

  const toggleAtmospherePreview = () => {
    if (isPreviewingAtmosphere) {
      spatial3DSound.stop();
      setIsPreviewingAtmosphere(false);
    } else {
      spatial3DSound.setVolume(soundscapeVolume);
      spatial3DSound.set3DSpatial(is3dSpatial);
      spatial3DSound.start(soundscapePreset);
      setIsPreviewingAtmosphere(true);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPreviewingAtmosphere(false);
    requestWakeLock().catch(() => {});
    updateMediaSession();

    if (audioSource === 'quran') {
      if (!isAmbientEnabled) {
        spatial3DSound.stop();
      } else {
        spatial3DSound.setVolume(soundscapeVolume);
        spatial3DSound.set3DSpatial(is3dSpatial);
        spatial3DSound.start(soundscapePreset);
      }
      bulletproofNarrator.pause();
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
    setIsPreviewingAtmosphere(false);
    releaseWakeLock();
    spatial3DSound.stop();
    bulletproofNarrator.pause();

    if (audioRef.current) {
      audioRef.current.pause();
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
    } else if (audioSource === 'narration') {
      if (isPlaying) {
        startAdventuristicSpeech(targetSecond);
      } else {
        const totalSentences = bulletproofNarrator.getSentences().length;
        const targetSentence = Math.min(
          Math.floor((targetSecond / (audioDuration || 180)) * totalSentences),
          Math.max(0, totalSentences - 1)
        );
        bulletproofNarrator.seekSentence(targetSentence);
      }
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
    if (audioSource === 'narration' && isPlaying) {
      startAdventuristicSpeech(currentTime);
    }
  };

  const handleSwitchAudioSource = (newSource: 'quran' | 'narration') => {
    const wasPlaying = isPlaying;
    handlePause();
    setAudioSource(newSource);
    setCurrentTime(0);
    setCurrentNarratedSentence('');
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

  const handleSelectSoundscape = (preset: SoundscapeType) => {
    setSoundscapePreset(preset);
    spatial3DSound.setPreset(preset);
  };

  const handleToggle3D = () => {
    const next = !is3dSpatial;
    setIs3dSpatial(next);
    spatial3DSound.set3DSpatial(next);
  };

  const handleVolumeChange = (vol: number) => {
    setSoundscapeVolume(vol);
    spatial3DSound.setVolume(vol);
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

      {/* 3D Spatial Audio & Atmospheric Background Effects Controls */}
      {audioSource === 'narration' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-bg-primary/70 border border-accent-gold/35 space-y-4 shadow-inner">
          {/* Top Row: Persona & 3D Binaural Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent-gold/20 pb-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                <span>3D Cinematic Atmospheric Soundscape</span>
              </div>
              <p className="text-[11px] text-text-secondary">
                Procedural binaural wind, roaring waves, and acoustic drones to immerse you directly in the story.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Preview Atmosphere Soundscape Button */}
              <button
                onClick={toggleAtmospherePreview}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPreviewingAtmosphere
                    ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-md font-bold'
                    : 'bg-bg-card border-accent-gold/35 hover:border-accent-gold text-accent-gold'
                }`}
                title="Preview this 3D atmospheric environment (wind gusts, swells, binaural panning) right now"
              >
                <Radio className={`w-3.5 h-3.5 ${isPreviewingAtmosphere ? 'animate-pulse' : ''}`} />
                <span>{isPreviewingAtmosphere ? 'Stop 3D Preview' : 'Test 3D Wind'}</span>
              </button>

              {/* 3D Spatial Binaural Toggle */}
              <button
                onClick={handleToggle3D}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  is3dSpatial
                    ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-bg-card border-accent-gold/25 text-text-muted hover:text-text-primary'
                }`}
                title="Binaural 3D audio pans winds and spatial acoustics dynamically between your ears"
              >
                <Waves className="w-3.5 h-3.5" />
                <span>{is3dSpatial ? '3D Spatial Audio ON' : 'Stereo Audio'}</span>
              </button>

              {/* Master Atmospheric Toggle */}
              <button
                onClick={() => {
                  const next = !isAmbientEnabled;
                  setIsAmbientEnabled(next);
                  if (!next) {
                    spatial3DSound.stop();
                    setIsPreviewingAtmosphere(false);
                  } else if (isPlaying || isPreviewingAtmosphere) {
                    spatial3DSound.setVolume(soundscapeVolume);
                    spatial3DSound.set3DSpatial(is3dSpatial);
                    spatial3DSound.start(soundscapePreset);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAmbientEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                    : 'bg-bg-card border-accent-gold/25 text-text-muted hover:text-text-primary'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>{isAmbientEnabled ? 'Wind & Effects ON' : 'Effects Muted'}</span>
              </button>
            </div>
          </div>

          {/* Soundscape Presets Selection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-accent-gold uppercase tracking-wider">
              <span>Choose Atmospheric Environment</span>
              <span className="text-text-muted font-normal lowercase">procedural physical audio</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SOUNDSCAPE_PRESETS.map((preset) => {
                const isSelected = soundscapePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectSoundscape(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-accent-gold/20 text-accent-gold border-accent-gold shadow-sm ring-1 ring-accent-gold'
                        : 'bg-bg-card border-accent-gold/25 text-text-secondary hover:text-text-primary hover:border-accent-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
                      <span>{preset.icon}</span>
                      <span className="truncate">{preset.name}</span>
                    </div>
                    <div className="text-[10px] text-text-muted mt-1 line-clamp-2 leading-tight">
                      {preset.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wind & Soundscape Volume Slider */}
          {isAmbientEnabled && (
            <div className="flex items-center gap-3 pt-1 text-xs">
              <span className="text-text-muted flex items-center gap-1 shrink-0">
                <Volume1 className="w-3.5 h-3.5 text-accent-gold" />
                <span>Wind Volume:</span>
              </span>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={soundscapeVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 accent-accent-gold cursor-pointer"
              />
              <span className="text-xs font-mono text-accent-gold shrink-0">
                {Math.round(soundscapeVolume * 100)}%
              </span>
            </div>
          )}

          {/* Voice Persona Selection */}
          <div className="pt-2 border-t border-accent-gold/20 space-y-2">
            <div className="text-[11px] font-bold text-accent-gold uppercase tracking-wider">
              Narrator Voice Persona
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'chronicler' as const, label: 'Desert Chronicler', role: 'Dignified Baritone', icon: '🎙️' },
                { id: 'traveler' as const, label: 'Adventurer', role: 'Spirited & Vivid', icon: '🦅' },
                { id: 'sage' as const, label: 'Ancient Sage', role: 'Deep & Reverent', icon: '🌿' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setNarratorPersona(p.id);
                    if (isPlaying) {
                      handlePause();
                      setTimeout(() => handlePlay(), 120);
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
        </div>
      )}

      {/* Live Currently Narrated Sentence Card */}
      {audioSource === 'narration' && isPlaying && currentNarratedSentence && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-accent-gold/15 via-accent-gold/10 to-transparent border border-accent-gold/45 shadow-md flex items-start gap-3 animate-fadeIn">
          <div className="relative flex items-center justify-center shrink-0 mt-1">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-accent-gold opacity-75"></span>
            <div className="relative w-3 h-3 rounded-full bg-accent-gold" />
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent-gold flex items-center gap-2">
              <span>Now Speaking in 3D Audio</span>
              <span className="text-text-muted font-mono">· scene {activeStoryScene + 1}/4</span>
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-text-primary leading-relaxed">
              "{currentNarratedSentence}"
            </p>
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
              : `Voiced by ${narratorPersona === 'chronicler' ? 'The Desert Chronicler' : narratorPersona === 'traveler' ? 'The Adventurous Traveler' : 'The Ancient Sage'} with 3D binaural atmospheric soundscape`}
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
          title={isPlaying ? 'Pause' : 'Play in 3D Audio'}
          className="w-14 h-14 rounded-full bg-accent-gold hover:bg-accent-gold-dim text-bg-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer font-bold"
        >
          {isPlaying ? (
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
