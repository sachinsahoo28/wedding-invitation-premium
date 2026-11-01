import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import ConfigErrorScreen from './components/ConfigErrorScreen.jsx';
import { WeddingProvider } from './context/WeddingContext.jsx';
import { loadClient } from './utils/clientResolver.js';
import { resolveTheme, applyTheme } from './themes/applyTheme.js';
import { setDateLocale } from './utils/dates.js';
import { music } from './utils/audio.js';
import { asset } from './utils/assets.js';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function setMeta(config, theme) {
  const { groom, bride, monogram } = config.couple;
  document.title = config.meta.title || `${groom.firstName} & ${bride.firstName} · Wedding Invitation`;
  if (config.meta.description) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', config.meta.description);
  }
  // Favicon: the client's monogram in their theme colours.
  const letters = monogram.replace(/\s/g, '').replace(/[<>&"']/g, (c) => (c === '&' ? '&amp;' : ''));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="${theme.colors.primary}"/><circle cx="32" cy="32" r="25" fill="none" stroke="${theme.colors.accentSoft}" stroke-width="1.5"/><text x="32" y="41" font-family="Georgia" font-size="22" fill="${theme.colors.accentSoft}" text-anchor="middle">${letters}</text></svg>`;
  document.querySelector('link[rel="icon"]')?.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svg)}`);
}

async function start() {
  let result;
  try {
    result = await loadClient();
  } catch (err) {
    result = { errors: [`Could not load the client config: ${err.message}`], warnings: [] };
  }
  const { config, errors, warnings, via } = result;

  if (warnings.length && import.meta.env.DEV) {
    console.groupCollapsed(`[wedding] ${warnings.length} config warning(s) for "${config?.slug}"`);
    warnings.forEach((w) => console.warn(w));
    console.groupEnd();
  }
  if (errors.length) {
    console.error('[wedding] Invalid config:', errors);
    root.render(<ConfigErrorScreen errors={errors} slug={config?.slug} />);
    return;
  }

  const theme = resolveTheme(config.theme);
  applyTheme(theme);
  setDateLocale(config.locale);
  music.configure({
    src: config.features.music ? asset(config.media.music.src) : '',
    volume: config.media.music.volume,
  });
  setMeta(config, theme);

  root.render(
    <React.StrictMode>
      <WeddingProvider value={{ config, via }}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </WeddingProvider>
    </React.StrictMode>
  );
}

start();
