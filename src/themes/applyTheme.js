import { themes, DEFAULT_THEME } from './themes.js';

// camelCase role → CSS custom property, e.g. accentSoft → --c-accent-soft
const toVar = (key) => `--c-${key.replace(/[A-Z0-9]/g, (m) => `-${m.toLowerCase()}`)}`;

/** Merge a client's theme settings over its preset. */
export function resolveTheme(themeConfig = {}) {
  const preset = themes[themeConfig.preset] || themes[DEFAULT_THEME];
  return {
    ...preset,
    colors: { ...preset.colors, ...themeConfig.colors },
    fonts: { ...preset.fonts, ...themeConfig.fonts },
    googleFonts: themeConfig.googleFonts || preset.googleFonts,
  };
}

/** Write the theme to :root and load its fonts. Components never read colours directly. */
export function applyTheme(theme) {
  const root = document.documentElement.style;
  Object.entries(theme.colors).forEach(([key, value]) => root.setProperty(toVar(key), value));
  Object.entries(theme.fonts).forEach(([key, value]) => root.setProperty(`--${key}`, value));

  const families = [...theme.googleFonts, 'Tiro+Devanagari+Sanskrit'];
  const href = `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join('&')}&display=swap`;
  let link = document.getElementById('theme-fonts');
  if (!link) {
    link = document.createElement('link');
    link.id = 'theme-fonts';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = href;

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.bg);
}
