import { Volume2, Check } from 'lucide-react';
import { reciters } from '@/lib/recitationAudio';
import { useNoor } from '@/context/NoorContext';

export function ReciterSelector({ onClose }: { onClose: () => void }) {
  const { reciterId, setReciterId, audioRate, setAudioRate } = useNoor();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-emerald-800" />
          <h3 className="font-semibold text-stone-900 text-lg">Recitation & Audio Settings</h3>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 text-sm font-medium px-2.5 py-1 rounded-md hover:bg-stone-100 transition-colors"
        >
          Done
        </button>
      </div>

      <div className="mt-5">
        <label className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
          Select Reciter (Qari)
        </label>
        <p className="text-xs text-stone-500 mt-0.5 mb-3">
          Streaming authentic recitations from EveryAyah & MP3Quran
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
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div>
                  <div className="font-medium text-sm text-stone-900">{r.name}</div>
                  <div className="text-xs text-stone-500">{r.style}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-arabic text-stone-600 text-base">{r.arabicName}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-stone-200">
        <label className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
          Recitation Speed
        </label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[0.75, 1.0, 1.25].map((rate) => (
            <button
              key={rate}
              onClick={() => setAudioRate(rate)}
              className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                audioRate === rate
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {rate === 0.75 ? '0.75x (Slow/Study)' : rate === 1.0 ? '1.0x (Normal)' : '1.25x (Fast)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
