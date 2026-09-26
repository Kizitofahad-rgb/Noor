import { Volume2, Check, X } from 'lucide-react';
import { reciters } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';
import { CornerFlourishes } from './Ornamentation';

export function ReciterSelector({ onClose }: { onClose: () => void }) {
  const { reciterId, setReciterId, audioRate, setAudioRate } = useNoor();

  return (
    <div className="relative p-6 bg-bg-card text-text-primary font-serif">
      <CornerFlourishes />

      <div className="flex items-center justify-between pb-4 border-b border-accent-gold/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-bg-primary border border-accent-gold/40 flex items-center justify-center text-accent-gold">
            <Volume2 className="w-4 h-4 text-accent-gold" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-base">Recitation & Audio Settings</h3>
            <p className="text-[11px] text-text-primary/60">EveryAyah & MP3Quran Audio Streams</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-text-primary/70 hover:text-accent-gold text-xs font-serif px-2.5 py-1 rounded-lg border border-accent-gold/30 hover:border-accent-gold hover:bg-bg-primary/50 transition-colors flex items-center gap-1 label-caps"
        >
          <span>Done</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-5">
        <label className="text-[11px] font-bold tracking-widest text-accent-gold label-caps block">
          Select Reciter (Qari)
        </label>
        <p className="text-xs text-text-primary/70 mt-0.5 mb-3">
          Authenticated vocal styles with full ayah and surah sync
        </p>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {reciters.map((r) => {
            const isSelected = r.id === reciterId;
            return (
              <button
                key={r.id}
                onClick={() => setReciterId(r.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-accent-gold bg-accent-gold/15 text-text-primary shadow-xs'
                    : 'border-accent-gold/30 hover:border-accent-gold hover:bg-bg-primary/50 text-text-primary/90'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-text-primary">{r.name}</div>
                  <div className="text-xs text-accent-gold-dim">{r.style}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-arabic text-accent-gold text-lg">{r.arabicName}</span>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-accent-gold/30" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-accent-gold/30">
        <label className="text-[11px] font-bold tracking-widest text-accent-gold label-caps block">
          Recitation Speed
        </label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[0.75, 1.0, 1.25].map((rate) => (
            <button
              key={rate}
              onClick={() => setAudioRate(rate)}
              className={`py-2 text-xs font-semibold rounded-xl border transition-colors label-caps ${
                audioRate === rate
                  ? 'bg-accent-gold text-bg-primary border-accent-gold shadow-xs font-bold'
                  : 'bg-bg-primary text-text-primary border-accent-gold/40 hover:border-accent-gold hover:bg-bg-card'
              }`}
            >
              {rate === 0.75 ? '0.75x Slow' : rate === 1.0 ? '1.0x Normal' : '1.25x Fast'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
