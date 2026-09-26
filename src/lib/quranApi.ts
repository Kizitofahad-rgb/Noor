/**
 * Quran Data Service - Al-Quran Cloud Integration
 * 
 * Free, public, keyless API (https://api.alquran.cloud/v1)
 * Requires NO API key and NO authentication.
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
}

// In-memory cache to prevent redundant network calls
const cache = new Map<number, RemoteAyah[]>();

/**
 * Fetch full Surah text (Arabic Uthmani), English translation (Saheeh International),
 * and Arabic Tafsir (Al-Muyassar) from the free, keyless Al-Quran Cloud API.
 */
export async function fetchSurahFromAlQuranCloud(surahNumber: number): Promise<RemoteAyah[]> {
  if (cache.has(surahNumber)) {
    return cache.get(surahNumber)!;
  }

  try {
    // First try the backend proxy route (which also caches in memory)
    const localRes = await fetch(`/api/quran/surah/${surahNumber}`);
    if (localRes.ok) {
      const data: RemoteSurahData = await localRes.json();
      if (data && Array.isArray(data.ayahs) && data.ayahs.length > 0) {
        cache.set(surahNumber, data.ayahs);
        return data.ayahs;
      }
    }
  } catch {
    // If backend proxy is unreachable, fall back to direct public endpoint
  }

  try {
    // Direct call to free AlQuran Cloud API (no authentication required)
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ar.muyassar`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`AlQuran Cloud API HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.code !== 200 || !json.data || !Array.isArray(json.data) || json.data.length < 2) {
      throw new Error('Invalid format from AlQuran Cloud API');
    }

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

    cache.set(surahNumber, mappedAyahs);
    return mappedAyahs;
  } catch (err) {
    console.warn(`[AlQuran Cloud] Failed to fetch surah ${surahNumber}:`, err);
    return [];
  }
}
