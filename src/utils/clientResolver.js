import { clients, lockedClient } from 'virtual:wedding-clients';
import { platformConfig } from '../config/wedding.config.js';
import { defaultConfig, mergeDeep } from '../config/defaults.js';
import { validateWeddingConfig } from './weddingConfigValidator.js';
import { appRoot } from './assets.js';

/** First path segment after the app root, e.g. /repo/rohan-ananya/ → 'rohan-ananya'. */
function pathSlug() {
  const rootPath = new URL(appRoot).pathname;
  const { pathname } = window.location;
  if (!pathname.startsWith(rootPath)) return '';
  return decodeURIComponent(pathname.slice(rootPath.length).split('/')[0] || '');
}

/** Decide which client this page should render. */
export function pickClient(available = Object.keys(clients)) {
  if (lockedClient) return { slug: lockedClient, via: 'build' };

  const candidates = {
    path: pathSlug(),
    query: new URLSearchParams(window.location.search).get('client') || '',
  };
  let requested = '';
  for (const source of platformConfig.resolveFrom) {
    const slug = candidates[source];
    if (slug && available.includes(slug)) return { slug, via: source };
    if (slug && source === 'query') requested = slug;
    // Path segments that aren't client slugs (e.g. index.html) are ignored.
    if (slug && source === 'path' && !slug.includes('.')) requested ||= slug;
  }

  const fallback = available.includes(platformConfig.defaultClient) ? platformConfig.defaultClient : available[0];
  return { slug: fallback, via: 'default', requested };
}

function initials(name = '') {
  return name.trim().charAt(0).toUpperCase();
}

/** Merge defaults, derive optional values and validate. */
export function prepareClient(raw, fileKey) {
  const config = mergeDeep(defaultConfig, raw);
  const { groom, bride } = config.couple;
  if (!config.couple.monogram && groom?.firstName && bride?.firstName) {
    config.couple.monogram = `${initials(groom.firstName)} & ${initials(bride.firstName)}`;
  }
  if (!config.couple.hashtag && groom?.firstName && bride?.firstName) {
    config.couple.hashtag = `#${groom.firstName}Weds${bride.firstName}`.replace(/\s+/g, '');
  }
  return { config, ...validateWeddingConfig(config, fileKey) };
}

/** Resolve, load and validate the active client. */
export async function loadClient() {
  const available = Object.keys(clients);
  if (available.length === 0) {
    return { config: null, errors: ['No client configs found in src/data/clients/.'], warnings: [] };
  }
  const pick = pickClient(available);
  const module = await clients[pick.slug]();
  const result = prepareClient(module.default, pick.slug);
  if (pick.requested) {
    result.warnings.unshift(`Unknown client "${pick.requested}"; showing "${pick.slug}". Available: ${available.join(', ')}.`);
  }
  return { ...result, via: pick.via };
}
