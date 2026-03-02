/**
 * Procedural Game Music Engine
 * Generates folk/flute fairy-tale melody using Web Audio API.
 * Shifts to moody/dark tones when enemies are nearby.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let currentTimeout: ReturnType<typeof setTimeout> | null = null;
let masterGain: GainNode | null = null;
let mood: "peaceful" | "tense" = "peaceful";

// Pentatonic scale notes (fairy tale folk feel)
const PEACEFUL_NOTES = [
  392.00, // G4
  440.00, // A4
  493.88, // B4
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  987.77, // B5
];

// Minor/diminished scale (moody/tense)
const TENSE_NOTES = [
  293.66, // D4
  311.13, // Eb4
  349.23, // F4
  392.00, // G4
  415.30, // Ab4
  466.16, // Bb4
  523.25, // C5
  554.37, // Db5
];

// Bass drone notes
const PEACEFUL_DRONE = 196.00; // G3
const TENSE_DRONE = 146.83;    // D3

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playFluteTone(freq: number, startTime: number, duration: number, volume: number) {
  const ctx = getCtx();

  // Main sine wave (flute body)
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, startTime);

  // Slight vibrato for folk flute feel
  const vibrato = ctx.createOscillator();
  vibrato.type = "sine";
  vibrato.frequency.setValueAtTime(mood === "peaceful" ? 5 : 3, startTime);
  const vibratoGain = ctx.createGain();
  vibratoGain.gain.setValueAtTime(mood === "peaceful" ? 3 : 6, startTime);
  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc1.frequency);

  // Second harmonic for warmth
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  const gain1 = ctx.createGain();
  const gain2 = ctx.createGain();

  // Envelope — soft attack for flute
  gain1.gain.setValueAtTime(0, startTime);
  gain1.gain.linearRampToValueAtTime(volume * 0.12, startTime + 0.08);
  gain1.gain.linearRampToValueAtTime(volume * 0.09, startTime + duration * 0.6);
  gain1.gain.linearRampToValueAtTime(0, startTime + duration);

  gain2.gain.setValueAtTime(0, startTime);
  gain2.gain.linearRampToValueAtTime(volume * 0.03, startTime + 0.08);
  gain2.gain.linearRampToValueAtTime(0, startTime + duration);

  // Low-pass filter for warmth
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(mood === "peaceful" ? 2000 : 1200, startTime);
  filter.Q.setValueAtTime(1, startTime);

  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(filter);
  gain2.connect(filter);
  filter.connect(masterGain!);

  osc1.start(startTime);
  osc2.start(startTime);
  vibrato.start(startTime);
  osc1.stop(startTime + duration + 0.05);
  osc2.stop(startTime + duration + 0.05);
  vibrato.stop(startTime + duration + 0.05);
}

function playDrone(startTime: number, duration: number) {
  const ctx = getCtx();
  const freq = mood === "peaceful" ? PEACEFUL_DRONE : TENSE_DRONE;

  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, startTime);

  // Fifth interval for fullness
  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq * 1.5, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(mood === "peaceful" ? 0.025 : 0.04, startTime + 0.5);
  gain.gain.setValueAtTime(mood === "peaceful" ? 0.025 : 0.04, startTime + duration - 0.5);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0, startTime);
  gain2.gain.linearRampToValueAtTime(0.012, startTime + 0.5);
  gain2.gain.linearRampToValueAtTime(0, startTime + duration);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, startTime);

  osc.connect(gain);
  osc2.connect(gain2);
  gain.connect(filter);
  gain2.connect(filter);
  filter.connect(masterGain!);

  osc.start(startTime);
  osc2.start(startTime);
  osc.stop(startTime + duration + 0.1);
  osc2.stop(startTime + duration + 0.1);
}

// Generate a musical phrase
function generatePhrase(): { note: number; duration: number }[] {
  const notes = mood === "peaceful" ? PEACEFUL_NOTES : TENSE_NOTES;
  const phraseLen = mood === "peaceful" ? 8 : 6;
  const phrase: { note: number; duration: number }[] = [];

  let prevIdx = Math.floor(Math.random() * notes.length);

  for (let i = 0; i < phraseLen; i++) {
    // Stepwise motion with occasional leaps (folk melody style)
    const step = mood === "peaceful"
      ? (Math.random() < 0.7 ? (Math.random() < 0.5 ? 1 : -1) : (Math.random() < 0.5 ? 2 : -2))
      : (Math.random() < 0.6 ? (Math.random() < 0.5 ? 1 : -1) : (Math.random() < 0.5 ? 3 : -3));

    let nextIdx = prevIdx + step;
    nextIdx = Math.max(0, Math.min(notes.length - 1, nextIdx));

    // Rhythm variety
    const durations = mood === "peaceful"
      ? [0.3, 0.4, 0.5, 0.6, 0.8]
      : [0.25, 0.35, 0.5, 0.7, 0.9];
    const dur = durations[Math.floor(Math.random() * durations.length)];

    // Occasional rest
    if (Math.random() < 0.15) {
      phrase.push({ note: 0, duration: dur * 0.5 });
    }

    phrase.push({ note: notes[nextIdx], duration: dur });
    prevIdx = nextIdx;
  }

  return phrase;
}

function schedulePhrase() {
  if (!isPlaying || !masterGain) return;

  const ctx = getCtx();
  const now = ctx.currentTime;
  const phrase = generatePhrase();

  let time = now + 0.1;
  const totalDuration = phrase.reduce((sum, n) => sum + n.duration, 0);

  // Background drone
  playDrone(now, totalDuration + 1);

  // Play melody
  for (const { note, duration } of phrase) {
    if (note > 0) {
      playFluteTone(note, time, duration * 0.85, mood === "peaceful" ? 1.0 : 0.8);
    }
    time += duration;
  }

  // Gap between phrases
  const gap = mood === "peaceful" ? 1.2 + Math.random() * 0.8 : 0.6 + Math.random() * 0.5;

  currentTimeout = setTimeout(() => {
    schedulePhrase();
  }, (totalDuration + gap) * 1000);
}

export function startGameMusic() {
  if (isPlaying) return;

  const ctx = getCtx();
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.6, ctx.currentTime);
  masterGain.connect(ctx.destination);

  isPlaying = true;
  mood = "peaceful";
  schedulePhrase();
}

export function stopGameMusic() {
  isPlaying = false;
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
  if (masterGain) {
    const ctx = getCtx();
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    setTimeout(() => {
      masterGain?.disconnect();
      masterGain = null;
    }, 600);
  }
}

export function setMusicMood(newMood: "peaceful" | "tense") {
  mood = newMood;
  // The mood change takes effect on the next phrase naturally
}

export function isMusicPlaying() {
  return isPlaying;
}
