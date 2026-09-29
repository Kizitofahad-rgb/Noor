import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { MoodId, ReelItem } from '@/lib/content';
import { initialReels } from '@/lib/content';

export type AppThemeId =
  | 'dynamic'
  | 'emerald'
  | 'parchment'
  | 'obsidian'
  | 'ochre'
  | 'sapphire'
  | 'jade'
  | 'amethyst'
  | 'rosewood'
  | 'gold';

export type UserReflection = {
  id: string;
  mood: MoodId;
  text: string;
  date: string;
  ayahReference?: string;
};

type NoorContextType = {
  mood: MoodId;
  setMood: (mood: MoodId) => void;
  appTheme: AppThemeId;
  setAppTheme: (theme: AppThemeId) => void;
  savedItems: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  completedLessons: string[];
  toggleLesson: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  readSurahs: string[];
  markSurahRead: (id: string) => void;
  reciterId: string;
  setReciterId: (id: string) => void;
  audioRate: number;
  setAudioRate: (rate: number) => void;
  streakDays: number;
  userReflections: UserReflection[];
  addUserReflection: (mood: MoodId, text: string, ayahReference?: string) => void;
  reels: ReelItem[];
  likedReels: string[];
  toggleLikeReel: (reelId: string) => void;
  addSubmittedReel: (reel: Omit<ReelItem, 'id' | 'likesCount'>) => void;
  pendingReels: ReelItem[];
  approveReel: (id: string) => void;
  isLoadingReels: boolean;
  fetchReels: (query?: string) => Promise<void>;
  reelsSource: string;
};

const NoorContext = createContext<NoorContextType | null>(null);

const STORAGE_PREFIX = 'noor_app_';

// Known obsolete placeholder IDs to clean from cache
const OBSOLETE_PLACEHOLDER_IDS = new Set([
  '3K4_Jg9Y2eY',
  'N7B7l6-bF5c',
  'W8G5eD_uU-E',
  'P0v4_4Nq3aE',
  'reel-1',
  'reel-2',
  'reel-3',
  'reel-4',
]);

export function NoorProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<MoodId>('anxious');

  const [appTheme, setAppThemeState] = useState<AppThemeId>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}theme`) as AppThemeId;
      return stored || 'dynamic';
    } catch {
      return 'dynamic';
    }
  });

  const setAppTheme = useCallback((newTheme: AppThemeId) => {
    setAppThemeState(newTheme);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}theme`, newTheme);
    } catch {
      // Ignore storage error
    }
  }, []);

  const [savedItems, setSavedItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}saved`);
      return stored ? JSON.parse(stored) : ['hadith-intention'];
    } catch {
      return ['hadith-intention'];
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}lessons`);
      return stored ? JSON.parse(stored) : ['alphabet-1'];
    } catch {
      return ['alphabet-1'];
    }
  });

  const [readSurahs, setReadSurahs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}read_surahs`);
      return stored ? JSON.parse(stored) : ['1'];
    } catch {
      return ['1'];
    }
  });

  const [reciterId, setReciterId] = useState<string>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}reciter`) || 'alafasy';
  });

  const [audioRate, setAudioRate] = useState<number>(1.0);
  const [streakDays] = useState<number>(3);

  const [userReflections, setUserReflections] = useState<UserReflection[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}reflections`);
      return stored ? JSON.parse(stored) : [
        {
          id: 'ref-default',
          mood: 'anxious',
          text: 'Remembering that today is in Allah’s hands calmed my racing thoughts before prayer.',
          date: 'Yesterday at Maghrib',
          ayahReference: 'Quran 13:28',
        },
      ];
    } catch {
      return [];
    }
  });

  const [reels, setReels] = useState<ReelItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}reels`);
      if (stored) {
        const parsed = JSON.parse(stored) as ReelItem[];
        // Filter out any stale obsolete placeholders
        const sanitized = parsed.filter(
          (r) => !OBSOLETE_PLACEHOLDER_IDS.has(r.id) && (!r.youtubeId || !OBSOLETE_PLACEHOLDER_IDS.has(r.youtubeId))
        );
        if (sanitized.length >= 3) {
          return sanitized;
        }
      }
      return initialReels;
    } catch {
      return initialReels;
    }
  });

  const [likedReels, setLikedReels] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}liked_reels`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [pendingReels, setPendingReels] = useState<ReelItem[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}pending_reels`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isLoadingReels, setIsLoadingReels] = useState<boolean>(false);
  const [reelsSource, setReelsSource] = useState<string>('initial');

  const fetchReels = useCallback(async (query = 'Islamic reminder short') => {
    setIsLoadingReels(true);
    try {
      const res = await fetch(`/api/reels?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data = await res.json();
      if (data.reels && Array.isArray(data.reels) && data.reels.length > 0) {
        // Filter out any items with embeddable false or obsolete placeholders
        const valid = (data.reels as ReelItem[]).filter(
          (r) => r.youtubeId && !OBSOLETE_PLACEHOLDER_IDS.has(r.youtubeId)
        );
        if (valid.length > 0) {
          setReels(valid);
          setReelsSource(data.source || 'youtube-api');
          try {
            localStorage.setItem(`${STORAGE_PREFIX}reels`, JSON.stringify(valid));
          } catch {}
        }
      }
    } catch (err) {
      console.warn('Could not fetch dynamic reels from /api/reels, using verified fallback:', err);
    } finally {
      setIsLoadingReels(false);
    }
  }, []);

  // Fetch verified YouTube reels on mount
  useEffect(() => {
    fetchReels('Islamic reminder short');
  }, [fetchReels]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}saved`, JSON.stringify(savedItems));
    } catch {}
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}lessons`, JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}read_surahs`, JSON.stringify(readSurahs));
    } catch {}
  }, [readSurahs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}reciter`, reciterId);
    } catch {}
  }, [reciterId]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}reflections`, JSON.stringify(userReflections));
    } catch {}
  }, [userReflections]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}reels`, JSON.stringify(reels));
    } catch {}
  }, [reels]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}liked_reels`, JSON.stringify(likedReels));
    } catch {}
  }, [likedReels]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}pending_reels`, JSON.stringify(pendingReels));
    } catch {}
  }, [pendingReels]);

  const toggleSaved = (id: string) => {
    setSavedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const isSaved = (id: string) => savedItems.includes(id);

  const toggleLesson = (id: string) => {
    setCompletedLessons((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const isLessonCompleted = (id: string) => completedLessons.includes(id);

  const markSurahRead = (id: string) => {
    setReadSurahs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addUserReflection = (moodKey: MoodId, text: string, ayahReference?: string) => {
    const newRef: UserReflection = {
      id: `ref-${Date.now()}`,
      mood: moodKey,
      text,
      date: 'Just now',
      ayahReference,
    };
    setUserReflections((prev) => [newRef, ...prev]);
  };

  const toggleLikeReel = (reelId: string) => {
    setLikedReels((prev) => {
      const isLiked = prev.includes(reelId);
      setReels((current) =>
        current.map((r) => (r.id === reelId ? { ...r, likesCount: isLiked ? r.likesCount - 1 : r.likesCount + 1 } : r))
      );
      return isLiked ? prev.filter((id) => id !== reelId) : [...prev, reelId];
    });
  };

  const addSubmittedReel = (newReelData: Omit<ReelItem, 'id' | 'likesCount'>) => {
    const item: ReelItem = {
      ...newReelData,
      id: `user-reel-${Date.now()}`,
      likesCount: 1,
    };
    setPendingReels((prev) => [item, ...prev]);
  };

  const approveReel = (id: string) => {
    const found = pendingReels.find((r) => r.id === id);
    if (found) {
      setReels((prev) => [found, ...prev]);
      setPendingReels((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <NoorContext.Provider
      value={{
        mood,
        setMood,
        appTheme,
        setAppTheme,
        savedItems,
        toggleSaved,
        isSaved,
        completedLessons,
        toggleLesson,
        isLessonCompleted,
        readSurahs,
        markSurahRead,
        reciterId,
        setReciterId,
        audioRate,
        setAudioRate,
        streakDays,
        userReflections,
        addUserReflection,
        reels,
        likedReels,
        toggleLikeReel,
        addSubmittedReel,
        pendingReels,
        approveReel,
        isLoadingReels,
        fetchReels,
        reelsSource,
      }}
    >
      {children}
    </NoorContext.Provider>
  );
}

export function useNoor() {
  const context = useContext(NoorContext);
  if (!context) {
    throw new Error('useNoor must be used within a NoorProvider');
  }
  return context;
}
