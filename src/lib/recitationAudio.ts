/**
 * Audio recitation engine for Noor
 *
 * Uses everyayah.com & mp3quran.net for live high-fidelity streaming
 * No API key needed - completely free and public
 */

export type Reciter = {
  id: string;
  name: string;
  arabicName: string;
  style: string;
  everyAyahFolder: string;
  mp3QuranServer?: string;
};

export const reciters: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري راشد العفاسي',
    style: 'Murattal · Melodic & Calm',
    everyAyahFolder: 'Alafasy_128kbps',
    mp3QuranServer: 'https://server8.mp3quran.net/afs',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    style: 'Classic Murattal · Majestic',
    everyAyahFolder: 'Abdul_Basit_Murattal_192kbps',
    mp3QuranServer: 'https://server7.mp3quran.net/basit',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    style: 'Pedagogical · Standard Tajweed',
    everyAyahFolder: 'Husary_128kbps',
    mp3QuranServer: 'https://server13.mp3quran.net/husr',
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq Al-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    style: 'Emotional · Soul-stirring',
    everyAyahFolder: 'Minshawy_Murattal_128kbps',
    mp3QuranServer: 'https://server10.mp3quran.net/minsh',
  },
  {
    id: 'sudais',
    name: 'Abdur-Rahman As-Sudais',
    arabicName: 'عبد الرحمن السديس',
    style: 'Imam of Masjid al-Haram, Makkah',
    everyAyahFolder: 'Abdurrahmaan_As-Sudais_192kbps',
    mp3QuranServer: 'https://server11.mp3quran.net/sds',
  },
];

function pad(num: number, len: number): string {
  return String(num).padStart(len, '0');
}

export function getVerseAudioUrl(surahNumber: number, verseNumber: number, reciterId = 'alafasy'): string {
  const reciter = reciters.find((r) => r.id === reciterId) || reciters[0];
  const s = pad(surahNumber, 3);
  const v = pad(verseNumber, 3);
  return `https://everyayah.com/data/${reciter.everyAyahFolder}/${s}${v}.mp3`;
}

export function getSurahAudioUrl(surahNumber: number, reciterId = 'alafasy'): string {
  const reciter = reciters.find((r) => r.id === reciterId) || reciters[0];
  const s = pad(surahNumber, 3);
  if (reciter.mp3QuranServer) {
    return `${reciter.mp3QuranServer}/${s}.mp3`;
  }
  return `https://server8.mp3quran.net/afs/${s}.mp3`;
}
