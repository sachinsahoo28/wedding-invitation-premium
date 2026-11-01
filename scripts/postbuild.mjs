/**
 * Runs after `vite build`.
 *
 * All-clients build:  writes dist/<slug>/index.html for every client, so
 *                     https://site/<slug>/ works on static hosts like
 *                     GitHub Pages (no server rewrites needed).
 * Single-client build (VITE_CLIENT set): keeps only that client's media.
 *
 * Each page gets the client's title and description baked in, so WhatsApp
 * and social link previews show the right couple.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const CLIENTS_DIR = 'src/data/clients';
const only = process.env.VITE_CLIENT || '';

const allSlugs = readdirSync(CLIENTS_DIR)
  .filter((f) => f.endsWith('.js') && !f.startsWith('_'))
  .map((f) => f.slice(0, -3));
const slugs = only ? [only] : allSlugs;

const load = async (path) => (await import(pathToFileURL(path).href)).default;
const { platformConfig } = await import(pathToFileURL('src/config/wedding.config.js').href);

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const template = readFileSync(`${DIST}/index.html`, 'utf8');

function pageFor(config, depth) {
  const { groom, bride } = config.couple;
  const title = escape(config.meta?.title || `${groom.firstName} & ${bride.firstName} · Wedding Invitation`);
  const description = escape(config.meta?.description || `You are invited to the wedding of ${groom.firstName} & ${bride.firstName}.`);
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`);
  // Pages one folder down reach the shared bundle with ../
  if (depth > 0) html = html.replace(/(src|href)="\.\//g, `$1="${'../'.repeat(depth)}`);
  return html;
}

const configs = {};
for (const slug of slugs) configs[slug] = await load(`${CLIENTS_DIR}/${slug}.js`);

const rootSlug = only || (slugs.includes(platformConfig.defaultClient) ? platformConfig.defaultClient : slugs[0]);
writeFileSync(`${DIST}/index.html`, pageFor(configs[rootSlug], 0));

if (!only) {
  for (const slug of slugs) {
    mkdirSync(`${DIST}/${slug}`, { recursive: true });
    writeFileSync(`${DIST}/${slug}/index.html`, pageFor(configs[slug], 1));
  }
  console.log(`postbuild: root → ${rootSlug}; pages → ${slugs.map((s) => `/${s}/`).join(', ')}`);
} else {
  // Never ship another client's media in a single-client deployment.
  const ownFolder = configs[only].clientId;
  if (existsSync(`${DIST}/weddings`)) {
    for (const folder of readdirSync(`${DIST}/weddings`)) {
      if (folder !== ownFolder) rmSync(`${DIST}/weddings/${folder}`, { recursive: true, force: true });
    }
  }
  console.log(`postbuild: single-client build for "${only}" (media limited to weddings/${ownFolder}/)`);
}
