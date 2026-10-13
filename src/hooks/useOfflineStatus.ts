import { useState, useEffect, useCallback } from 'react';
import {
  getCachedOfflineSurahNumbers,
  isSurahCachedOffline,
  preloadSurahForOffline,
  subscribeToOfflineCache,
} from '@/lib/quranApi';

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [cachedSurahs, setCachedSurahs] = useState<number[]>(() => {
    return getCachedOfflineSurahNumbers();
  });

  const [isCaching, setIsCaching] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const unsubscribe = subscribeToOfflineCache(() => {
      setCachedSurahs(getCachedOfflineSurahNumbers());
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  const cacheSurah = useCallback(async (surahNumber: number): Promise<boolean> => {
    setIsCaching(surahNumber);
    try {
      const ok = await preloadSurahForOffline(surahNumber);
      if (ok) {
        setCachedSurahs(getCachedOfflineSurahNumbers());
      }
      return ok;
    } finally {
      setIsCaching(null);
    }
  }, []);

  const isCached = useCallback(
    (surahNumber: number) => {
      return cachedSurahs.includes(surahNumber) || isSurahCachedOffline(surahNumber);
    },
    [cachedSurahs]
  );

  return {
    isOnline,
    cachedSurahs,
    cachedCount: cachedSurahs.length,
    isCached,
    cacheSurah,
    isCaching,
  };
}
