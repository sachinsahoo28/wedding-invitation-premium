// One shared <audio> element for the whole app — prevents duplicate playback.
import { wedding, asset } from '../config/weddingDetails.js';

let el = null;
const listeners = new Set();

function emit() {
  const state = { playing: !!el && !el.paused, available: !!wedding.music?.src };
  listeners.forEach((fn) => fn(state));
}

function get() {
  if (el || !wedding.music?.src) return el;
  el = new Audio(asset(wedding.music.src));
  el.loop = true;
  el.preload = 'auto';
  el.volume = 0.55;
  ['play', 'pause', 'ended', 'error'].forEach((e) => el.addEventListener(e, emit));
  return el;
}

export const music = {
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
    fn({ playing: !!el && !el.paused, available: !!wedding.music?.src });
    return () => listeners.delete(fn);
  },
};
