import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, X, RotateCcw } from 'lucide-react';
import { reciters } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';

export type ActiveAudioState = {
  title: string;
  subtitle: string;
  url: string;
  arabicSnippet?: string;
};

export function AudioPlayerBar({
  audioState,
  onClose,
  onOpenSettings,
}: {
  audioState: ActiveAudioState | null;
  onClose: () => void;
  onOpenSettings: () => void;
}) {
  const { reciterId, audioRate } = useNoor();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeReciter = reciters.find((r) => r.id === reciterId) || reciters[0];

  useEffect(() => {
    if (!audioState?.url) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = audioState.url;
    audio.playbackRate = audioRate;
    setLoading(true);
    setIsPlaying(true);

    const onCanPlay = () => {
      setLoading(false);
      audio.play().catch(() => setIsPlaying(false));
    };

    const onTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    const onError = () => {
      setLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, [audioState?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioRate;
    }
  }, [audioRate]);

  if (!audioState) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  };

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const formatSec = (sec: number) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-md text-text-primary border-t border-accent-gold/45 shadow-2xl px-4 py-3.5 sm:px-6">
      {/* Progress scrubber bar */}
      <div
        onClick={handleSeek}
        className="absolute top-0 left-0 right-0 h-1.5 bg-bg-card cursor-pointer group"
      >
        <div
          className="h-full bg-accent-gold transition-all relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-gold rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={restart}
            title="Restart"
            className="p-2 text-accent-gold/80 hover:text-accent-gold rounded-xl hover:bg-bg-card transition-colors hidden sm:block border border-accent-gold/30"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="truncate">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-base text-text-primary truncate font-serif">{audioState.title}</span>
              {audioState.arabicSnippet && (
                <span className="font-arabic text-accent-gold text-lg hidden md:inline truncate">
                  {audioState.arabicSnippet}
                </span>
              )}
            </div>
            <div className="text-sm text-text-secondary truncate mt-0.5">
              {audioState.subtitle} · <span className="text-accent-gold font-semibold">{activeReciter.name}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs sm:text-sm font-mono text-text-secondary hidden sm:block font-medium">
            {formatSec(currentTime)} / {formatSec(duration)}
          </div>

          <button
            onClick={togglePlay}
            disabled={loading}
            className="w-11 h-11 rounded-full bg-accent-gold hover:bg-accent-gold-dim text-bg-primary flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="px-3 py-2 text-text-primary hover:text-accent-gold hover:bg-bg-card rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-accent-gold/35"
          >
            <Volume2 className="w-4 h-4 text-accent-gold" />
            <span className="hidden md:inline font-semibold">Reciter</span>
            <span className="px-1.5 py-0.5 bg-bg-card rounded text-xs text-accent-gold font-mono border border-accent-gold/30 font-bold">
              {audioRate}x
            </span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-accent-gold rounded-xl hover:bg-bg-card transition-colors border border-accent-gold/25"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
