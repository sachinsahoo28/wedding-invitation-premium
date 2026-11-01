/**
 * Root URL of the app, so /public paths resolve from any client page
 * (/, /<slug>/ or a GitHub Pages sub-path).
 *
 * In production the bundle lives in <root>/assets/, so its parent is the
 * root. The path is held in a variable so Vite doesn't treat it as an
 * asset import.
 */
const PARENT = '../';
export const appRoot = import.meta.env.DEV
  ? new URL(import.meta.env.BASE_URL, window.location.origin).href
  : new URL(PARENT, import.meta.url).href;

/** Resolve a /public asset path (e.g. 'weddings/x/photos/a.jpg'). */
export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return new URL(path.replace(/^\//, ''), appRoot).href;
}
