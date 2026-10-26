/**
 * Noor 3D Spatial Soundscape & Bulletproof Narration Engine
 * Generates realistic procedural 3D physical atmospheres (swirling desert wind gusts, ocean surges, sacred night resonance)
 * and orchestrates robust, gapless speech synthesis with sentence highlighting and transient gesture retention.
 */

export type SoundscapeType = 'desert-wind' | 'sea-storm' | 'sacred-night' | 'oasis-sanctuary';

export interface SoundscapePreset {
  id: SoundscapeType;
  name: string;
  description: string;
  icon: string;
}

export const SOUNDSCAPE_PRESETS: SoundscapePreset[] = [
  {
    id: 'desert-wind',
    name: 'Desert Wind & Swirling Sands',
    description: 'Binaural howling desert winds, swirling gusts, and deep resonant acoustic drone.',
    icon: '🌬️',
  },
  {
    id: 'sea-storm',
    name: 'Cleaved Red Sea & Ocean Swells',
    description: 'Crashing deep sea swells and surging winds for the Ark of Nuh and the parting of the Red Sea.',
    icon: '🌊',
  },
  {
    id: 'sacred-night',
    name: 'Sanctuary Night (Cave of Hira)',
    description: 'Tranquil nighttime mountain breeze, gentle celestial hum, and meditative stillness.',
    icon: '🌌',
  },
  {
    id: 'oasis-sanctuary',
    name: 'Tranquil Oasis Breeze',
    description: 'Gentle warm airflows, peaceful resonance, and serene evening stillness.',
    icon: '🍃',
  },
];

class Spatial3DSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private panner: StereoPannerNode | null = null;
  private activeNodes: Array<{ stop?: () => void; disconnect: () => void }> = [];
  private isPlaying = false;
  private currentPreset: SoundscapeType = 'desert-wind';
  private currentVolume = 0.55;
  private is3dSpatial = true;
  private panLfoTimer: any = null;

  private init() {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.7, this.ctx.currentTime);

      // Stereo panner for binaural 3D effect
      if (this.ctx.createStereoPanner) {
        this.panner = this.ctx.createStereoPanner();
        this.panner.pan.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.panner);
        this.panner.connect(this.ctx.destination);
      } else {
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create a procedural pink + brown noise buffer (authentic physical wind/ocean acoustics)
  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds looping buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.16;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  start(preset: SoundscapeType = this.currentPreset) {
    if (typeof window === 'undefined') return;
    this.currentPreset = preset;

    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      this.stop(); // Clear any previous active nodes
      this.isPlaying = true;
      const ctx = this.ctx;

      // Ensure gain reflects current volume
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.7, ctx.currentTime);

      // 1. Procedural Wind / Waves Generator
      const noiseBuffer = this.createNoiseBuffer();
      if (noiseBuffer) {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        // Bandpass filter for wind howl / ocean roar
        const filter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        if (preset === 'desert-wind') {
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(420, ctx.currentTime);
          filter.Q.setValueAtTime(2.6, ctx.currentTime);
          noiseGain.gain.setValueAtTime(0.55, ctx.currentTime);
        } else if (preset === 'sea-storm') {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);
          filter.Q.setValueAtTime(1.8, ctx.currentTime);
          noiseGain.gain.setValueAtTime(0.65, ctx.currentTime);
        } else if (preset === 'sacred-night') {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(260, ctx.currentTime);
          filter.Q.setValueAtTime(1.1, ctx.currentTime);
          noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
        } else {
          // oasis-sanctuary
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(480, ctx.currentTime);
          filter.Q.setValueAtTime(1.4, ctx.currentTime);
          noiseGain.gain.setValueAtTime(0.40, ctx.currentTime);
        }

        // Modulating LFO for dynamic breathing wind gusts & swells
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(preset === 'sea-storm' ? 0.14 : 0.25, ctx.currentTime);
        lfoGain.gain.setValueAtTime(preset === 'desert-wind' ? 240 : 160, ctx.currentTime);

        lfo.connect(filter.frequency);
        lfo.start();

        // Secondary Gust Gain LFO for natural waxing and waning of wind volume
        const gustGainLfo = ctx.createOscillator();
        const gustLfoDepth = ctx.createGain();
        gustGainLfo.type = 'sine';
        gustGainLfo.frequency.setValueAtTime(0.18, ctx.currentTime);
        gustLfoDepth.gain.setValueAtTime(0.20, ctx.currentTime);
        gustGainLfo.connect(gustLfoDepth);
        gustLfoDepth.connect(noiseGain.gain);
        gustGainLfo.start();

        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        noiseSource.start();

        this.activeNodes.push(noiseSource, lfo, lfoGain, gustGainLfo, gustLfoDepth, filter, noiseGain);
      }

      // 2. Harmonic Sacred Drone (Cinematic Sub-bass & Fifth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const droneFilter = ctx.createBiquadFilter();
      const droneGain = ctx.createGain();

      const rootFreq = preset === 'sea-storm' ? 72 : preset === 'sacred-night' ? 96 : 108;
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(rootFreq, ctx.currentTime); // Low root

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(rootFreq * 1.5, ctx.currentTime); // Perfect fifth harmonic

      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(240, ctx.currentTime);

      droneGain.gain.setValueAtTime(preset === 'sacred-night' ? 0.12 : 0.08, ctx.currentTime);

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start();
      osc2.start();

      this.activeNodes.push(osc1, osc2, droneFilter, droneGain);

      // 3. 3D Spatial Binaural Sweeper (Left <-> Right gentle spatial pan)
      if (this.is3dSpatial && this.panner) {
        let angle = 0;
        this.panLfoTimer = setInterval(() => {
          if (!this.isPlaying || !this.panner || !this.ctx) return;
          angle += 0.07;
          // Smoothly pan wind across the stereo field from -0.65 (Left) to +0.65 (Right)
          const panValue = Math.sin(angle) * 0.68;
          try {
            this.panner.pan.setValueAtTime(panValue, this.ctx.currentTime);
          } catch {}
        }, 100);
      }
    } catch (err) {
      console.warn('[Spatial3DSoundEngine] start notice:', err);
    }
  }

  setPreset(preset: SoundscapeType) {
    this.currentPreset = preset;
    if (this.isPlaying) {
      this.start(preset);
    }
  }

  setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.7, this.ctx.currentTime);
    }
  }

  set3DSpatial(enabled: boolean) {
    this.is3dSpatial = enabled;
    if (!enabled && this.panner && this.ctx) {
      if (this.panLfoTimer) clearInterval(this.panLfoTimer);
      this.panLfoTimer = null;
      try {
        this.panner.pan.setValueAtTime(0, this.ctx.currentTime);
      } catch {}
    } else if (enabled && this.isPlaying) {
      this.start(this.currentPreset);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.panLfoTimer) {
      clearInterval(this.panLfoTimer);
      this.panLfoTimer = null;
    }

    for (const node of this.activeNodes) {
      try {
        if ('stop' in node && typeof (node as any).stop === 'function') (node as any).stop();
        if (typeof node.disconnect === 'function') node.disconnect();
      } catch {}
    }
    this.activeNodes = [];

    if (this.panner && this.ctx) {
      try {
        this.panner.pan.setValueAtTime(0, this.ctx.currentTime);
      } catch {}
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getPreset() {
    return this.currentPreset;
  }

  getVolume() {
    return this.currentVolume;
  }

  getIs3D() {
    return this.is3dSpatial;
  }
}

export const spatial3DSound = new Spatial3DSoundEngine();

/**
 * Bulletproof Voice Narration Engine
 * Segments long narrative text into sentence chunks to circumvent Chrome/Safari SpeechSynthesis bugs.
 * Synchronously initiates speech on user tap to retain transient activation in iframes.
 * Features a safety watchdog timer to prevent freezes.
 */
class BulletproofSpeechNarrator {
  private sentences: string[] = [];
  private currentSentenceIndex = 0;
  private isSpeaking = false;
  private rate = 1.0;
  private persona: string = 'chronicler';
  private onProgressCallback?: (index: number, total: number, sentence: string) => void;
  private onEndCallback?: () => void;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private watchdogTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Warm up voices on platforms where they load asynchronously
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  loadText(fullText: string) {
    // Segment into clean, readable sentences
    const rawSentences = fullText
      .replace(/([.?!…])\s+/g, '$1|')
      .split('|')
      .map((s) => s.trim())
      .filter((s) => s.length > 2);

    this.sentences = rawSentences.length > 0 ? rawSentences : [fullText];
    this.currentSentenceIndex = 0;
  }

  start(
    options: {
      rate?: number;
      persona?: string;
      startIndex?: number;
      onProgress?: (index: number, total: number, sentence: string) => void;
      onEnd?: () => void;
    } = {}
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is unavailable in this environment.');
      return;
    }

    this.rate = options.rate || this.rate;
    this.persona = options.persona || this.persona;
    this.currentSentenceIndex = options.startIndex !== undefined ? options.startIndex : 0;
    this.onProgressCallback = options.onProgress;
    this.onEndCallback = options.onEnd;
    this.isSpeaking = true;

    // Wake up speech synthesis
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    // CRITICAL: Speak immediately and synchronously to retain iframe user activation!
    this.speakCurrentSentence();
  }

  private clearWatchdog() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  private speakCurrentSentence() {
    this.clearWatchdog();

    if (!this.isSpeaking || this.currentSentenceIndex >= this.sentences.length) {
      this.isSpeaking = false;
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const text = this.sentences[this.currentSentenceIndex];
    if (this.onProgressCallback) {
      this.onProgressCallback(this.currentSentenceIndex, this.sentences.length, text);
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;
      // Prevent GC from swallowing active utterance in Chrome V8
      (window as any).__activeNoorUtterance = utterance;

      utterance.rate = this.rate * (this.persona === 'sage' ? 0.88 : this.persona === 'traveler' ? 1.05 : 0.94);
      utterance.pitch = this.persona === 'sage' ? 0.82 : this.persona === 'traveler' ? 1.06 : 0.92;

      const voices = window.speechSynthesis.getVoices();
      let bestVoice: SpeechSynthesisVoice | null = null;

      if (this.persona === 'chronicler') {
        bestVoice =
          voices.find(
            (v) =>
              (v.name.includes('Daniel') ||
                v.name.includes('Oliver') ||
                v.name.includes('Arthur') ||
                v.name.includes('UK') ||
                v.name.includes('Great Britain')) &&
              v.lang.startsWith('en')
          ) ||
          voices.find((v) => v.name.includes('Natural') && v.lang.startsWith('en')) ||
          null;
      } else if (this.persona === 'traveler') {
        bestVoice =
          voices.find(
            (v) =>
              (v.name.includes('Guy') || v.name.includes('David') || v.name.includes('US')) &&
              v.lang.startsWith('en')
          ) ||
          voices.find((v) => v.lang.startsWith('en')) ||
          null;
      } else {
        bestVoice =
          voices.find(
            (v) =>
              (v.name.includes('Serena') || v.name.includes('George') || v.name.includes('Enhanced')) &&
              v.lang.startsWith('en')
          ) ||
          voices.find((v) => v.lang.startsWith('en')) ||
          null;
      }

      if (bestVoice) {
        utterance.voice = bestVoice;
      } else if (voices.length > 0) {
        utterance.voice = voices.find((v) => v.lang.startsWith('en')) || voices[0];
      }

      // Sentence advance logic
      const advanceNext = () => {
        this.clearWatchdog();
        if (!this.isSpeaking) return;
        this.currentSentenceIndex++;
        // Short natural breathing pause between sentences
        setTimeout(() => {
          this.speakCurrentSentence();
        }, 160);
      };

      utterance.onend = () => {
        advanceNext();
      };

      utterance.onerror = (e) => {
        console.warn('[BulletproofNarrator] sentence error:', e);
        advanceNext();
      };

      // Watchdog: If browser hangs or fails to fire onend after reasonable duration (words * 600ms + 4s), auto-advance
      const approxDurationMs = Math.max(4000, (text.split(' ').length * 600) + 3000);
      this.watchdogTimer = setTimeout(() => {
        console.warn('[BulletproofNarrator] Watchdog advancing sentence...');
        advanceNext();
      }, approxDurationMs);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[BulletproofNarrator] speak error:', err);
      this.isSpeaking = false;
      this.clearWatchdog();
      if (this.onEndCallback) this.onEndCallback();
    }
  }

  pause() {
    this.isSpeaking = false;
    this.clearWatchdog();
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  resume() {
    if (this.currentSentenceIndex < this.sentences.length) {
      this.start({
        startIndex: this.currentSentenceIndex,
        rate: this.rate,
        persona: this.persona,
        onProgress: this.onProgressCallback,
        onEnd: this.onEndCallback,
      });
    }
  }

  seekSentence(index: number) {
    const wasSpeaking = this.isSpeaking;
    this.pause();
    this.currentSentenceIndex = Math.max(0, Math.min(this.sentences.length - 1, index));
    if (wasSpeaking) {
      this.resume();
    }
  }

  getSentences() {
    return this.sentences;
  }

  getCurrentIndex() {
    return this.currentSentenceIndex;
  }

  getIsSpeaking() {
    return this.isSpeaking;
  }
}

export const bulletproofNarrator = new BulletproofSpeechNarrator();

/**
 * Universal Arabic & English Dua Narrator
 * Plays Duas with tranquil sacred acoustic chimes and synchronized speech recitation.
 * Operates synchronously to maintain user gesture activation across iframes.
 */
export function playUniversalDua(
  dua: {
    arabic: string;
    transliteration?: string;
    translation: string;
    title?: string;
  },
  onStatus?: (isPlaying: boolean) => void
) {
  if (typeof window === 'undefined') return;

  if (onStatus) onStatus(true);

  // 1. Play tranquil Islamic harmonic chime immediately
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const notes = [329.63, 392.0, 493.88, 587.33]; // E minor peaceful sanctuary chord
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.7);
      });
    }
  } catch {}

  // 2. Play speech using SpeechSynthesis with synchronous execution
  if ('speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));

      if (arabicVoice) {
        // Recite Arabic first, then English meaning
        const utteranceAr = new SpeechSynthesisUtterance(dua.arabic);
        utteranceAr.voice = arabicVoice;
        utteranceAr.rate = 0.85;
        (window as any).__activeNoorUtterance = utteranceAr;

        utteranceAr.onend = () => {
          const freshVoices = window.speechSynthesis.getVoices();
          const utteranceEn = new SpeechSynthesisUtterance(dua.translation);
          utteranceEn.rate = 0.92;
          utteranceEn.voice = freshVoices.find((v) => v.lang.startsWith('en')) || null;
          utteranceEn.onend = () => {
            if (onStatus) onStatus(false);
          };
          utteranceEn.onerror = () => {
            if (onStatus) onStatus(false);
          };
          window.speechSynthesis.speak(utteranceEn);
        };

        utteranceAr.onerror = () => {
          // Fallback to English transliteration + translation
          const freshVoices = window.speechSynthesis.getVoices();
          const utteranceEn = new SpeechSynthesisUtterance(
            `${dua.transliteration ? dua.transliteration + '. ' : ''}${dua.translation}`
          );
          utteranceEn.rate = 0.92;
          utteranceEn.voice = freshVoices.find((v) => v.lang.startsWith('en')) || null;
          utteranceEn.onend = () => {
            if (onStatus) onStatus(false);
          };
          utteranceEn.onerror = () => {
            if (onStatus) onStatus(false);
          };
          window.speechSynthesis.speak(utteranceEn);
        };

        window.speechSynthesis.speak(utteranceAr);
      } else {
        // If no Arabic voice installed on the host OS, recite the transliteration reverently followed by translation
        const textToSpeak = dua.transliteration
          ? `${dua.transliteration}. Meaning: ${dua.translation}`
          : dua.translation;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.90;
        utterance.pitch = 0.96;
        utterance.voice = voices.find((v) => v.lang.startsWith('en')) || null;
        (window as any).__activeNoorUtterance = utterance;

        utterance.onend = () => {
          if (onStatus) onStatus(false);
        };
        utterance.onerror = () => {
          if (onStatus) onStatus(false);
        };

        window.speechSynthesis.speak(utterance);
      }
    } catch {
      if (onStatus) onStatus(false);
    }
  } else {
    setTimeout(() => {
      if (onStatus) onStatus(false);
    }, 2500);
  }
}
