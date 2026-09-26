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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md text-white border-t border-stone-800 shadow-2xl px-4 py-3 sm:px-6">
      {/* Progress scrubber bar */}
      <div
        onClick={handleSeek}
        className="absolute top-0 left-0 right-0 h-1.5 bg-stone-800 cursor-pointer group"
      >
        <div
          className="h-full bg-emerald-500 transition-all relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={restart}
            title="Restart"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors hidden sm:block"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-stone-100 truncate">{audioState.title}</span>
              {audioState.arabicSnippet && (
                <span className="font-arabic text-emerald-300 text-xs hidden md:inline truncate">
                  {audioState.arabicSnippet}
                </span>
              )}
            </div>
            <div className="text-xs text-stone-400 truncate">
              {audioState.subtitle} · <span className="text-emerald-400">{activeReciter.name}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-xs font-mono text-stone-400 hidden sm:block">
            {formatSec(currentTime)} / {formatSec(duration)}
          </div>

          <button
            onClick={togglePlay}
            disabled={loading}
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors border border-stone-700/80"
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline font-medium">Reciter & Speed</span>
            <span className="px-1.5 py-0.5 bg-stone-800 rounded text-[10px] text-emerald-400">
              {audioRate}x
            </span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
