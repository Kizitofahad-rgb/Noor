import type { TajweedRule } from '@/lib/content';

export type TajweedStyle = {
  color: string;
  label: string;
  description: string;
};

export const tajweedStyles: Record<TajweedRule, TajweedStyle> = {
  madd: {
    color: '#D6B779',
    label: 'Madd (elongation)',
    description: 'Hold the sound for 2–6 counts. Gold underline marks elongation.',
  },
  waqf: {
    color: '#B85B52',
    label: 'Waqf (stopping)',
    description: 'You may pause here. Red marks where stopping is permitted.',
  },
  wasl: {
    color: '#477A61',
    label: 'Wasl (joining)',
    description: 'Join this word to the next without pausing. Green marks joining.',
  },
  ghunnah: {
    color: '#9AC9B7',
    label: 'Ghunnah (nasalization)',
    description: 'Hum from the nose for about 2 counts. Teal marks nasalization.',
  },
};

export const tajweedOrder: TajweedRule[] = ['madd', 'waqf', 'wasl', 'ghunnah'];
