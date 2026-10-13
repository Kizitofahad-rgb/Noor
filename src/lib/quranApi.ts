/**
 * Quran Data Service - Al-Quran Cloud Integration with Robust Offline Caching
 * 
 * Free, public, keyless API (https://api.alquran.cloud/v1)
 * Enables offline viewing of previously opened Surahs.
 */

export interface RemoteAyah {
  numberInSurah: number;
  globalNumber?: number;
  arabic: string;
  translation: string;
  tafsir?: string;
}

export interface RemoteSurahData {
  surahNumber: number;
  ayahs: RemoteAyah[];
  source: string;
  cachedAt?: number;
}

// In-memory cache for instant zero-latency retrieval during current session
const memoryCache = new Map<number, RemoteAyah[]>();

const CACHE_PREFIX = 'noor_cached_surah_';
const INDEX_KEY = 'noor_cached_surahs_index';

// Event listeners for offline cache state changes
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore listener error
    }
  });
}

export function subscribeToOfflineCache(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Returns a list of all Surah numbers currently stored and available for offline reading
 */
export function getCachedOfflineSurahNumbers(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Checks if a specific Surah is saved in persistent offline storage
 */
export function isSurahCachedOffline(surahNumber: number): boolean {
  if (typeof window === 'undefined') return false;
  if (memoryCache.has(surahNumber)) return true;
  try {
    return localStorage.getItem(`${CACHE_PREFIX}${surahNumber}`) !== null;
  } catch {
    return false;
  }
}

/**
 * Reads a Surah from persistent browser storage
 */
function readFromPersistentStorage(surahNumber: number): RemoteAyah[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${surahNumber}`);
    if (!raw) return null;
    const parsed: RemoteSurahData = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.ayahs) && parsed.ayahs.length > 0) {
      memoryCache.set(surahNumber, parsed.ayahs);
      return parsed.ayahs;
    }
  } catch (err) {
    console.warn(`[Quran Cache] Error reading Surah ${surahNumber} from persistent storage:`, err);
  }
  return null;
}

/**
 * Saves a Surah to persistent browser storage and updates the offline index
 */
export function saveSurahToPersistentStorage(surahNumber: number, ayahs: RemoteAyah[]): void {
  if (typeof window === 'undefined' || !ayahs || ayahs.length === 0) return;
  try {
    const record: RemoteSurahData = {
      surahNumber,
      ayahs,
      source: 'AlQuran Cloud (Persistent Offline Sanctuary)',
      cachedAt: Date.now(),
    };
    localStorage.setItem(`${CACHE_PREFIX}${surahNumber}`, JSON.stringify(record));

    // Update index of cached surahs
    const current = new Set(getCachedOfflineSurahNumbers());
    current.add(surahNumber);
    localStorage.setItem(INDEX_KEY, JSON.stringify(Array.from(current).sort((a, b) => a - b)));
    notifyListeners();
  } catch (err) {
    console.warn(`[Quran Cache] Storage quota exceeded or save error for Surah ${surahNumber}:`, err);
  }
}

/**
 * Preload and cache a Surah explicitly for offline reading
 */
export async function preloadSurahForOffline(surahNumber: number): Promise<boolean> {
  const ayahs = await fetchSurahFromAlQuranCloud(surahNumber);
  return ayahs.length > 0;
}

/**
 * Fetch full Surah text (Arabic Uthmani), English translation (Saheeh International),
 * and Arabic Tafsir (Al-Muyassar).
 * 
 * If offline or network fails, automatically serves previously viewed content from
 * the local persistent sanctuary cache.
 */
export async function fetchSurahFromAlQuranCloud(surahNumber: number): Promise<RemoteAyah[]> {
  // 1. Check in-memory cache
  if (memoryCache.has(surahNumber)) {
    return memoryCache.get(surahNumber)!;
  }

  // 2. Check persistent offline storage
  const offlineCached = readFromPersistentStorage(surahNumber);

  // If user is currently offline and we have a cached copy, return immediately without network latency
  if (typeof navigator !== 'undefined' && !navigator.onLine && offlineCached) {
    return offlineCached;
  }

  // 3. Try the backend proxy route (which connects to AlQuran Cloud & caches on server)
  try {
    const localRes = await fetch(`/api/quran/surah/${surahNumber}`);
    if (localRes.ok) {
      const data: RemoteSurahData = await localRes.json();
      if (data && Array.isArray(data.ayahs) && data.ayahs.length > 0) {
        memoryCache.set(surahNumber, data.ayahs);
        saveSurahToPersistentStorage(surahNumber, data.ayahs);
        return data.ayahs;
      }
    }
  } catch {
    // If backend proxy is unreachable, proceed to direct AlQuran Cloud endpoint or offline cache
  }

  // 4. Try direct call to free AlQuran Cloud API
  try {
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ar.muyassar`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.code === 200 && json.data && Array.isArray(json.data) && json.data.length >= 2) {
        const arabicData = json.data[0];
        const englishData = json.data[1];
        const tafsirData = json.data[2] || null;

        const mappedAyahs: RemoteAyah[] = arabicData.ayahs.map((ayah: any, index: number) => ({
          numberInSurah: ayah.numberInSurah,
          globalNumber: ayah.number,
          arabic: ayah.text,
          translation: englishData?.ayahs?.[index]?.text || '',
          tafsir: tafsirData?.ayahs?.[index]?.text || '',
        }));

        memoryCache.set(surahNumber, mappedAyahs);
        saveSurahToPersistentStorage(surahNumber, mappedAyahs);
        return mappedAyahs;
      }
    }
  } catch (err) {
    console.warn(`[AlQuran Cloud] Network fetch failed for Surah ${surahNumber}:`, err);
  }

  // 5. Final Fallback: If network failed but we have previously viewed/cached data, return it
  if (offlineCached) {
    return offlineCached;
  }

  return [];
}
