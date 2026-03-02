/**
 * Retro 8-bit Sound Effects Engine
 * Character-specific SFX using Web Audio API — zero dependencies.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  slide?: number,
  gain = 0.15
) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slide) osc.frequency.linearRampToValueAtTime(slide, ctx.currentTime + duration);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function noise(duration: number, gain = 0.08) {
  const ctx = getCtx();
  const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  src.connect(g).connect(ctx.destination);
  src.start();
  src.stop(ctx.currentTime + duration);
}

// ── Character-specific button click sounds ──

export function swordSlash() {
  noise(0.08, 0.12);
  playTone(800, 0.06, "sawtooth", 200, 0.18);
  setTimeout(() => playTone(400, 0.05, "sawtooth", 100, 0.1), 40);
}

export function magicZap() {
  playTone(300, 0.25, "sine", 1200, 0.12);
  setTimeout(() => playTone(600, 0.15, "triangle", 1800, 0.08), 60);
  setTimeout(() => playTone(1200, 0.1, "sine", 2400, 0.06), 120);
}

export function arrowWhoosh() {
  noise(0.12, 0.06);
  playTone(1200, 0.15, "triangle", 400, 0.1);
}

export function laserBeam() {
  playTone(1800, 0.12, "square", 200, 0.1);
  setTimeout(() => playTone(1400, 0.1, "square", 100, 0.08), 50);
}

// ── Generic game sounds ──

export function menuSelect() {
  playTone(880, 0.06, "square", undefined, 0.1);
  setTimeout(() => playTone(1320, 0.08, "square", undefined, 0.1), 60);
}

export function menuBack() {
  playTone(660, 0.06, "square", 440, 0.1);
}

export function questComplete() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => setTimeout(() => playTone(n, 0.15, "square", undefined, 0.12), i * 120));
}

export function collectKey() {
  playTone(660, 0.1, "square");
  setTimeout(() => playTone(880, 0.1, "square"), 100);
  setTimeout(() => playTone(1100, 0.15, "square"), 200);
  setTimeout(() => playTone(1320, 0.2, "square", undefined, 0.15), 300);
}

export function hitEnemy() {
  noise(0.05, 0.15);
  playTone(200, 0.1, "square", 80, 0.15);
}

export function stepSound() {
  playTone(200, 0.03, "square", 150, 0.04);
}

/** Returns the click SFX function for a given character ID */
export function getCharacterSfx(charId: string | null): () => void {
  switch (charId) {
    case "swordsmaster": return swordSlash;
    case "wizard": return magicZap;
    case "archer": return arrowWhoosh;
    case "astronaut": return laserBeam;
    default: return menuSelect;
  }
}
