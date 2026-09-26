import React, { createContext, useContext, useEffect, useState } from 'react';
import type { MoodId, ReelItem } from '@/lib/content';
import { initialReels } from '@/lib/content';

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
};

const NoorContext = createContext<NoorContextType | null>(null);

const STORAGE_PREFIX = 'noor_app_';

export function NoorProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<MoodId>('anxious');

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
      return stored ? JSON.parse(stored) : initialReels;
    } catch {
      return initialReels;
    }
  });

  const [likedReels, setLikedReels] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}liked_reels`);
      return stored ? JSON.parse(stored) : ['reel-1'];
    } catch {
      return ['reel-1'];
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
