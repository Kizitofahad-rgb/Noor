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
} from 'lucide-react';
import type { ProphetStory } from '@/lib/storiesData';
import { BorderedSubPanel, CornerFlourishes } from './Ornamentation';

interface StoryAudioPlayerProps {
  story: ProphetStory;
  onSectionClick?: (sectionId: string) => void;
  activeSectionId?: string;
}

export function StoryAudioPlayer({ story, onSectionClick, activeSectionId }: StoryAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const duration = story.audioNarration.durationSeconds;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Available speed presets
  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  // Helper to format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Compile full story text for natural narration
  const getNarrationText = () => {
    const intro = `The sacred story of ${story.name}, peace be upon him. ${story.meaning}. ${story.whoIsIntro}`;
    const sectionsText = story.narrativeSections
      .map((s) => `${s.title}. ${s.content.join(' ')}`)
      .join(' ');
    const lessonsText = `Teachings and lessons from ${story.name}: ${story.teachingsAndLessons.join('. ')}`;
    return `${intro} ${sectionsText} ${lessonsText}`;
  };

  // Start speech synthesis or simulated playback
  const startSpeech = (startFromSecond: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const fullText = getNarrationText();
      const words = fullText.split(' ');
      // Estimate starting word offset
      const wordsPerSecond = 2.4 * playbackRate;
      const startWordIndex = Math.min(Math.floor(startFromSecond * wordsPerSecond), words.length - 1);
      const remainingText = words.slice(startWordIndex).join(' ');

      const utterance = new SpeechSynthesisUtterance(remainingText);
      utterance.rate = playbackRate;
      utterance.pitch = 0.95; // Deep, calm devotional tone

      // Pick high-quality English voice if available
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
      };

      utterance.onerror = () => {
        // Fallback gracefully
      };

      speechUtteranceRef.current = utterance;
      if (!isMuted) {
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
    } else {
      setIsPlaying(true);
      startSpeech(currentTime);
    }
  };

  const handleSeek = (targetSecond: number) => {
    const clamped = Math.max(0, Math.min(duration, targetSecond));
    setCurrentTime(clamped);
    if (isPlaying) {
      stopSpeech();
      startSpeech(clamped);
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
    if (isPlaying) {
      stopSpeech();
      startSpeech(currentTime);
    }
  };

  // Timer tick during playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            stopSpeech();
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
  }, [isPlaying, duration, playbackRate]);

  // Clean up on unmount or story change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    stopSpeech();
  }, [story.id]);

  const activeTrack = story.audioNarration.tracks[activeTrackIndex] || story.audioNarration.tracks[0];

  return (
    <div className="relative bg-bg-card border border-accent-gold/50 rounded-2xl p-5 sm:p-7 shadow-2xl text-text-primary space-y-6">
      <CornerFlourishes size={14} opacity={0.6} />

      {/* Player Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-accent-gold/25">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Audio Narration</span>
            </span>
            <span className="text-xs text-text-secondary font-mono">
              {formatTime(currentTime)} / {story.audioNarration.duration}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary tracking-tight">
            {activeTrack.title}
          </h3>
          <p className="text-xs text-text-secondary">
            Narrated by {activeTrack.narrator} · Devotional English narration with synchronized timeline
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
            title="Toggle Table of Contents"
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Sections</span>
          </button>
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="space-y-1.5">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold border border-accent-gold/30"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted font-mono">
          <span>{formatTime(currentTime)}</span>
          <span className="text-accent-gold font-semibold">
            {story.audioNarration.tableOfContents.find(
              (toc, idx, arr) =>
                currentTime >= toc.timestampSeconds &&
                (idx === arr.length - 1 || currentTime < arr[idx + 1].timestampSeconds)
            )?.title || 'Introduction'}
          </span>
          <span>{formatTime(duration)}</span>
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
          title={isPlaying ? 'Pause narration' : 'Play narration'}
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
            <span>Clickable Timeline & Table of Contents</span>
            <span className="text-text-muted font-normal">Jump straight to section</span>
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
