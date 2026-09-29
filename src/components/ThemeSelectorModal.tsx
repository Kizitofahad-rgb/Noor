import React from 'react';
import { X, Check, Palette, Sparkles, RefreshCw } from 'lucide-react';
import { useNoor, type AppThemeId } from '@/context/NoorContext';
import { CornerFlourishes, BorderedSubPanel } from './Ornamentation';

interface ThemeOption {
  id: AppThemeId;
  name: string;
  arabicName: string;
  description: string;
  paletteColors: string[];
  vibe: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'dynamic',
    name: 'Dynamic Section Aura',
    arabicName: 'مُتغيّر حسب القسم',
    description: 'Color automatically transitions based on the active section (Quran is Emerald, Stories is Sandstone, Library is Sapphire, etc.).',
    paletteColors: ['#041710', '#170E08', '#060E1C', '#031716', '#E5C365'],
    vibe: 'Adaptive & Diverse',
  },
  {
    id: 'emerald',
    name: 'Sacred Emerald & Gold',
    arabicName: 'الزمرد الملكي والذهب',
    description: 'Timeless deep forest green with radiant Medina gold. The signature sanctuary aesthetic of the Noble Quran.',
    paletteColors: ['#031710', '#08291D', '#E5C365', '#C9A54C', '#FCF9F2'],
    vibe: 'Sacred & Revering',
  },
  {
    id: 'parchment',
    name: 'Classical Mushaf Parchment',
    arabicName: 'ورق المصحف الشريف',
    description: 'Warm ivory paper with gilded sepia ink, designed after classical physical handwritten Quranic manuscripts.',
    paletteColors: ['#F8F4E8', '#EDE5D2', '#9E6B15', '#4E3C27', '#1E160D'],
    vibe: 'Illuminated Manuscript',
  },
  {
    id: 'obsidian',
    name: 'Night Obsidian OLED',
    arabicName: 'السبج الليلي الدامس',
    description: 'Pure pitch black background with glowing warm amber gold. Zero glare for late-night recitation and reflection.',
    paletteColors: ['#000000', '#0D0D0D', '#F59E0B', '#D97706', '#F9FAFB'],
    vibe: 'Minimalist & Night-Safe',
  },
  {
    id: 'ochre',
    name: 'Ancient Desert Sandstone',
    arabicName: 'الرمال القديمة والصلصال',
    description: 'Rich terracotta, burnt amber, and warm desert bronze echoing the ancient prophetic lands of Hijaz and Sinai.',
    paletteColors: ['#170E08', '#27180E', '#E08736', '#C26F25', '#FDF7F0'],
    vibe: 'Historical & Warm',
  },
  {
    id: 'sapphire',
    name: 'Royal Lapis & Sapphire',
    arabicName: 'اللازورد والياقوت الأزرق',
    description: 'Deep celestial midnight navy with illuminated sky-blue calligraphy highlights, inspired by Islamic astronomy and Hadith codices.',
    paletteColors: ['#060E1C', '#0E1E3B', '#38BDF8', '#0284C7', '#F0F6FC'],
    vibe: 'Scholarly & Deep',
  },
  {
    id: 'jade',
    name: 'Persian Jade & Mint Teal',
    arabicName: 'اليشم الفارسي والنعناع',
    description: 'Vibrant Persian jade and energizing mint green. Perfect for linguistic study, Tajweed drills, and memory retention.',
    paletteColors: ['#031716', '#082B29', '#2DD4BF', '#14B8A6', '#F0FDF4'],
    vibe: 'Fresh & Educational',
  },
  {
    id: 'amethyst',
    name: 'Velvet Amethyst & Orchid',
    arabicName: 'المخمل الأرجواني',
    description: 'Cinematic deep violet and glowing amethyst orchid. Elegant, contemplative, and modern for visual reminders.',
    paletteColors: ['#0E0617', '#1F0D30', '#C084FC', '#A855F7', '#FAF5FF'],
    vibe: 'Cinematic & Spiritual',
  },
  {
    id: 'rosewood',
    name: 'Antique Rosewood & Crimson',
    arabicName: 'خشب الورد العتيق',
    description: 'Precious burgundy rosewood with warm rose-gold accents, tailored for personal intimacy and prayer treasures.',
    paletteColors: ['#17070B', '#2B0E16', '#FB7185', '#F43F5E', '#FFF1F2'],
    vibe: 'Treasured & Intimate',
  },
  {
    id: 'gold',
    name: 'Imperial Burnished Gold',
    arabicName: 'الذهب الخالص المعتق',
    description: 'Rich dark charcoal infused with radiant imperial trophy gold. Dignified, celebrated, and inspiring.',
    paletteColors: ['#121008', '#231E10', '#F59E0B', '#D97706', '#FEFCE8'],
    vibe: 'Regal & Inspiring',
  },
];

export function ThemeSelectorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { appTheme, setAppTheme } = useNoor();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-bg-card rounded-3xl border border-accent-gold shadow-2xl p-5 sm:p-7 text-text-primary my-auto max-h-[92vh] flex flex-col">
        <CornerFlourishes />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-accent-gold/25 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30 mb-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>Sanctuary Palette & Appearance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary tracking-tight">
              Global App Color Theme
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
              Customize the visual atmosphere across all pages of Noor, or allow it to dynamically adapt to each section.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-accent-gold border border-accent-gold/30 bg-bg-primary/50 transition-colors shrink-0"
            title="Close theme selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="py-4 overflow-y-auto space-y-3 flex-1 pr-1">
          {themeOptions.map((opt) => {
            const isSelected = appTheme === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setAppTheme(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 ${
                  isSelected
                    ? 'border-accent-gold bg-accent-gold/15 shadow-md ring-1 ring-accent-gold'
                    : 'border-accent-gold/30 bg-bg-primary/70 hover:border-accent-gold/60 hover:bg-bg-primary'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm sm:text-base font-serif text-text-primary">
                      {opt.name}
                    </span>
                    <span className="font-arabic text-accent-gold font-bold text-sm sm:text-base px-1">
                      {opt.arabicName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-accent-gold/30 text-accent-gold bg-bg-card font-semibold uppercase tracking-wider">
                      {opt.vibe}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  {/* Color Swatch Dots */}
                  <div className="flex items-center -space-x-1.5 p-1 bg-bg-card rounded-xl border border-accent-gold/25">
                    {opt.paletteColors.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-black/40 shadow-xs"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>

                  {/* Active Indicator Radio */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-accent-gold border-accent-gold text-bg-primary font-bold shadow-xs'
                        : 'border-accent-gold/45 bg-bg-card'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-accent-gold/25 flex items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
            <span>Theme persists automatically on your device.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-accent-gold text-bg-primary font-bold hover:bg-accent-gold-dim transition-colors uppercase tracking-wider shadow-sm"
          >
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
}
