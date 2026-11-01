// One shared <audio> element for the whole app — prevents duplicate playback.
let el = null;
let source = '';
let volume = 0.55;
let failed = false;
const listeners = new Set();

const state = () => ({ playing: !!el && !el.paused, available: !!source && !failed });
const emit = () => listeners.forEach((fn) => fn(state()));

function get() {
  if (el || !source || failed) return el;
  el = new Audio(source);
  el.loop = true;
  el.preload = 'auto';
  el.volume = volume;
  ['play', 'pause', 'ended'].forEach((e) => el.addEventListener(e, emit));
  // A missing or broken file hides the player instead of showing a dead button.
  el.addEventListener('error', () => {
    failed = true;
    emit();
  });
  return el;
}

export const music = {
  /** Set the client's track once, before first playback. */
  configure({ src, volume: v } = {}) {
    source = src || '';
    if (typeof v === 'number') volume = Math.min(1, Math.max(0, v));
    emit();
  },
  /** Resolves true if playback started; false if blocked by the browser. */
  async play() {
    const a = get();
    if (!a) return false;
    try {
      await a.play();
      return true;
    } catch {
      return false;
    }
  },
  pause() {
    el?.pause();
  },
  isPlaying: () => !!el && !el.paused,
  subscribe(fn) {
    listeners.add(fn);
    fn(state());
    return () => listeners.delete(fn);
  },
};
