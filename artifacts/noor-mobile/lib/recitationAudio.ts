/**
 * Builds audio URLs for Quran recitation.
 *
 * Uses everyayah.com for per-verse and per-word audio — a free, publicly
 * accessible resource that requires no API key.
 *
 * ENVIRONMENT VARIABLES (add these to your .env file):
 *
 *   EXPO_PUBLIC_RECITER_EVERYAYAH=Alafasi
 *     The reciter slug used by everyayah.com for per-word and per-verse audio.
 *     Common values: Alafasi, Abdul_Basit, Abdur_Rahman_As_Sudais, Husary,
 *     Hudhaify, Minshawi, Shuraim. Default: Alafasi (Mishary Alafasy).
 *
 *   EXPO_PUBLIC_MP3QURAN_BASE=https://server8.mp3quran.net/afs
 *     Optional. Base URL for mp3quran.net full-surah audio. If set, the
 *     "Play full surah" button uses this source instead of everyayah.com.
 *     The path format is: <base>/<surah_padded_3>.mp3
 *
 *   EXPO_PUBLIC_EVERYAYAH_WORD_API=https://everyayah.com/data
 *     Optional. override for the everyayah.com data root. Default is
 *     https://everyayah.com/data.
 *
 * No API keys are required — everyayah.com is a free public resource.
 */

const DEFAULT_RECITER = 'Alafasi';
const DEFAULT_EVERYAYAH_DATA = 'https://everyayah.com/data';

function getEnv(key: string): string | undefined {
  return (process.env as Record<string, string | undefined>)[key];
}

function pad(num: number, len: number): string {
  return String(num).padStart(len, '0');
}

function reciterSlug(): string {
  return getEnv('EXPO_PUBLIC_RECITER_EVERYAYAH') ?? DEFAULT_RECITER;
}

function everyayahDataRoot(): string {
  return getEnv('EXPO_PUBLIC_EVERYAYAH_WORD_API') ?? DEFAULT_EVERYAYAH_DATA;
}

export function verseAudioUrl(surahNumber: number, verseNumber: number): string {
  const surah = pad(surahNumber, 3);
  const verse = pad(verseNumber, 3);
  return `${everyayahDataRoot()}/${reciterSlug()}/${surah}${verse}.mp3`;
}

export function wordAudioUrl(surahNumber: number, verseNumber: number, wordIndex: number): string {
  const surah = pad(surahNumber, 3);
  const verse = pad(verseNumber, 3);
  const word = pad(wordIndex, 2);
  return `${everyayahDataRoot()}/words/${reciterSlug()}/${surah}_${verse}_${word}.mp3`;
}

export function surahAudioUrl(surahNumber: number): string | null {
  const base = getEnv('EXPO_PUBLIC_MP3QURAN_BASE');
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/${pad(surahNumber, 3)}.mp3`;
}

export const SLOW_RATE = 0.5;
export const NORMAL_RATE = 1.0;
