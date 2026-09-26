import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type NoorContextValue = {
  completedLessons: string[];
  savedItems: string[];
  readSurahs: string[];
  practicedVerses: string[];
  toggleLesson: (id: string) => void;
  toggleSaved: (id: string) => void;
  markSurahRead: (id: string) => void;
  toggleVersePracticed: (verseKey: string) => void;
  isVersePracticed: (verseKey: string) => boolean;
  isLessonComplete: (id: string) => boolean;
  isSaved: (id: string) => boolean;
};

const NoorContext = createContext<NoorContextValue | null>(null);
const STORAGE_KEY = '@noor/progress';

export function NoorProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [readSurahs, setReadSurahs] = useState<string[]>([]);
  const [practicedVerses, setPracticedVerses] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (!value) return;
      try {
        const saved = JSON.parse(value) as Partial<{
          completedLessons: string[];
          savedItems: string[];
          readSurahs: string[];
          practicedVerses: string[];
        }>;
        setCompletedLessons(saved.completedLessons ?? []);
        setSavedItems(saved.savedItems ?? []);
        setReadSurahs(saved.readSurahs ?? []);
        setPracticedVerses(saved.practicedVerses ?? []);
      } catch {
        // A corrupt local snapshot should not prevent the app from opening.
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completedLessons, savedItems, readSurahs, practicedVerses }),
    ).catch(() => undefined);
  }, [completedLessons, savedItems, readSurahs, practicedVerses]);

  const value = useMemo<NoorContextValue>(() => ({
    completedLessons,
    savedItems,
    readSurahs,
    practicedVerses,
    toggleLesson: (id) => setCompletedLessons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    ),
    toggleSaved: (id) => setSavedItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    ),
    markSurahRead: (id) => setReadSurahs((current) =>
      current.includes(id) ? current : [...current, id],
    ),
    toggleVersePracticed: (verseKey) => setPracticedVerses((current) =>
      current.includes(verseKey) ? current.filter((item) => item !== verseKey) : [...current, verseKey],
    ),
    isVersePracticed: (verseKey) => practicedVerses.includes(verseKey),
    isLessonComplete: (id) => completedLessons.includes(id),
    isSaved: (id) => savedItems.includes(id),
  }), [completedLessons, savedItems, readSurahs, practicedVerses]);

  return <NoorContext.Provider value={value}>{children}</NoorContext.Provider>;
}

export function useNoor() {
  const value = useContext(NoorContext);
  if (!value) throw new Error('useNoor must be used inside NoorProvider');
  return value;
}
