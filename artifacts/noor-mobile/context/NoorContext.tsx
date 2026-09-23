import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type NoorContextValue = {
  completedLessons: string[];
  savedItems: string[];
  readSurahs: string[];
  toggleLesson: (id: string) => void;
  toggleSaved: (id: string) => void;
  markSurahRead: (id: string) => void;
  isLessonComplete: (id: string) => boolean;
  isSaved: (id: string) => boolean;
};

const NoorContext = createContext<NoorContextValue | null>(null);
const STORAGE_KEY = '@noor/progress';

export function NoorProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [readSurahs, setReadSurahs] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const saved = JSON.parse(value) as Partial<{
          completedLessons: string[];
          savedItems: string[];
          readSurahs: string[];
        }>;
        setCompletedLessons(saved.completedLessons ?? []);
        setSavedItems(saved.savedItems ?? []);
        setReadSurahs(saved.readSurahs ?? []);
      } catch {
        // A corrupt local snapshot should not prevent the app from opening.
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completedLessons, savedItems, readSurahs }),
    ).catch(() => undefined);
  }, [completedLessons, savedItems, readSurahs]);

  const value = useMemo<NoorContextValue>(() => ({
    completedLessons,
    savedItems,
    readSurahs,
    toggleLesson: (id) => setCompletedLessons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    ),
    toggleSaved: (id) => setSavedItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    ),
    markSurahRead: (id) => setReadSurahs((current) =>
      current.includes(id) ? current : [...current, id],
    ),
    isLessonComplete: (id) => completedLessons.includes(id),
    isSaved: (id) => savedItems.includes(id),
  }), [completedLessons, savedItems, readSurahs]);

  return <NoorContext.Provider value={value}>{children}</NoorContext.Provider>;
}

export function useNoor() {
  const value = useContext(NoorContext);
  if (!value) throw new Error('useNoor must be used inside NoorProvider');
  return value;
}