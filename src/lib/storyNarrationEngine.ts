import type { ProphetStory } from './storiesData';

/**
 * Transforms standard textbook facts into an adventuristic, immersive cinematic audio screenplay
 */
export function generateAdventuristicScript(story: ProphetStory): {
  opening: string;
  epicChronicle: string;
  climacticMoment: string;
  wisdomLegacy: string;
} {
  const name = story.name;
  const era = story.eraAndLocation || 'ancient lands of faith';

  // Story-specific cinematic scenes
  let climacticMoment = '';
  if (story.id === 'adam') {
    climacticMoment =
      'Breathed into life from the sacred clay of the earth, the angels bowed in awe at the breadth of his knowledge. When he stumbled, he did not run in pride—he bowed his forehead in humble tears: "Our Lord, we have wronged ourselves." And from that tear of repentance, humanity found its eternal pathway home.';
  } else if (story.id === 'nuh') {
    climacticMoment =
      'Miles away from any ocean, under scorching sun and relentless mockery from proud kings, his hammer struck against colossal cedar timber. Then, the celestial gates burst open. Torrents from the heavens met surging fountains from the deep abyss. Upon the surging waves of the great deluge, the Ark floated safely under the vigilant gaze of Allah.';
  } else if (story.id === 'ibrahim') {
    climacticMoment =
      'Cast into a roaring inferno by tyrant Nimrod, Ibrahim stood with steadfast heart, whispering: "Allah alone is sufficient for us, and He is the best Disposer of affairs." Instantly, the blazing embers turned cool and peaceful. The fire could burn wood, but it could not touch the friend of God.';
  } else if (story.id === 'musa') {
    climacticMoment =
      'Trapped between the thundering iron chariots of Pharaoh behind and the crashing waves of the Red Sea ahead, his followers cried out in terror: "We are surely overtaken!" But Musa stood immovable on the rocky shore: "No! Indeed, with me is my Lord; He will guide me!" He struck the sea with his staff—and the roaring waters cleaved into two towering crystalline walls!';
  } else if (story.id === 'yusuf') {
    climacticMoment =
      'From the cold shadows of an abandoned desert well, to the trials of a royal palace and years of unjust imprisonment—Yusuf never surrendered his dignity or his trust. When providence raised him to govern the storehouses of Egypt, his brothers stood before him trembling. Yet with majestic mercy he smiled: "No blame will there be upon you today. May Allah forgive you."';
  } else if (story.id === 'isa') {
    climacticMoment =
      'Born of the pure Maryam without the touch of a man, speaking while still cradled in his infancy, Isa walked barefoot among the sick and weary, healing the blind and breathing life into clay birds by Allah’s leave. When conspirators plotted against his life, Allah raised him bodily to the heavens, preserving him in sacred triumph.';
  } else if (story.id === 'muhammad') {
    climacticMoment =
      'In the secluded mountain cave of Hira, beneath a glittering desert sky, the Archangel Jibreel descended like thunder: "Iqra! Read in the name of your Lord who created!" From that solitary mountain, a light burst forth that shattered ancient empires, liberated the oppressed, and unified divided tribes under one brotherhood of divine love.';
  } else {
    climacticMoment = story.narrativeSections
      .map((sec) => `${sec.title}: ${sec.content[0] || ''}`)
      .join(' ');
  }

  const opening = `Close your eyes and journey back through the sands of time, across the ${era}. This is the sacred, adventuristic chronicle of Prophet ${name}, ${story.meaning}, whose unyielding courage changed the course of human history.`;

  const sectionsChronicle = story.narrativeSections
    .slice(0, 3)
    .map((s) => `${s.title}. ${s.content.slice(0, 2).join(' ')}`)
    .join(' ');

  const wisdomLegacy = `The enduring legacy of Prophet ${name}: ${story.teachingsAndLessons.slice(0, 2).join('. ')}. Carry this courage into your life today.`;

  return {
    opening,
    epicChronicle: sectionsChronicle,
    climacticMoment,
    wisdomLegacy,
  };
}

export function getFullAdventuristicNarration(story: ProphetStory): string {
  const parts = generateAdventuristicScript(story);
  return `${parts.opening} ... ${parts.epicChronicle} ... ${parts.climacticMoment} ... ${parts.wisdomLegacy}`;
}

/**
 * Web Audio API Atmospheric Soundscape Generator
 * Generates an organic, warm desert wind and sacred acoustic harmonic drone
 * that plays underneath speech narration, completely eliminating the dry robotic feeling.
 */
class AmbientSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    if (typeof window === 'undefined') return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      if (this.isPlaying) return;

      this.isPlaying = true;
      const ctx = this.ctx;

      // 1. Warm Sacred Drone (108Hz / 216Hz low root with gentle warmth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const droneGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, ctx.currentTime); // Soft deep root

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(162, ctx.currentTime); // Perfect fifth harmonic

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start();
      osc2.start();

      // Store references to stop
      (this as any).activeNodes = [osc1, osc2, filter, droneGain];
    } catch (err) {
      console.warn('[AmbientSoundscape] AudioContext init note:', err);
    }
  }

  setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.12)), this.ctx.currentTime);
    }
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    const nodes = (this as any).activeNodes || [];
    for (const node of nodes) {
      try {
        if ('stop' in node) node.stop();
        if ('disconnect' in node) node.disconnect();
      } catch {}
    }
    (this as any).activeNodes = [];
  }
}

export const ambientSoundscape = new AmbientSoundscapeEngine();
