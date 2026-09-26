import type { TajweedRule } from './content';

export type TajweedStyle = {
  color: string;
  bgLight: string;
  label: string;
  arabicName: string;
  ruleTip: string;
  description: string;
};

export const tajweedStyles: Record<TajweedRule, TajweedStyle> = {
  madd: {
    color: '#B45309',
    bgLight: '#FEF3C7',
    label: 'Madd (Elongation)',
    arabicName: 'مَدّ',
    ruleTip: 'Hold the vocal sound for 2, 4, or 6 counts.',
    description: 'Gold/amber highlighting marks elongation of vowels (Alif, Waw, Yaa) when followed by hamzah or sukun.',
  },
  waqf: {
    color: '#B91C1C',
    bgLight: '#FEE2E2',
    label: 'Waqf (Stopping)',
    arabicName: 'وَقْف',
    ruleTip: 'Graceful pause point; breathe before proceeding.',
    description: 'Crimson marks permissible or mandatory stopping stations to preserve original Quranic meaning.',
  },
  wasl: {
    color: '#047857',
    bgLight: '#D1FAE5',
    label: 'Wasl (Joining)',
    arabicName: 'وَصْل',
    ruleTip: 'Drop the connecting hamzah and slide directly into the next letter.',
    description: 'Emerald marks connected recitation without pause, joining the final vowel to the following letter smoothly.',
  },
  ghunnah: {
    color: '#0E7490',
    bgLight: '#CFFAFE',
    label: 'Ghunnah (Nasalization)',
    arabicName: 'غُنَّة',
    ruleTip: 'Hum resonant sound from the nasal cavity for 2 counts.',
    description: 'Teal marks nasal resonance produced by the letters Noon (ن) and Meem (م) with Shaddah or during Ikhfa/Idgham.',
  },
};

export const tajweedOrder: TajweedRule[] = ['madd', 'waqf', 'wasl', 'ghunnah'];
