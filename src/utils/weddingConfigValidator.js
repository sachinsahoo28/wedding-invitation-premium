import { themes } from '../themes/themes.js';
import { defaultConfig } from '../config/defaults.js';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MOTIFS = ['haldi', 'mehendi', 'sangeet', 'wedding', 'reception', 'generic'];
// Sections that count as "content"; at least one must be enabled.
const SECTIONS = ['invitation', 'coupleStory', 'loveStory', 'royalDoors', 'saveTheDate', 'events', 'video', 'venue', 'closing'];

const isDate = (v) => typeof v === 'string' && v !== '' && !Number.isNaN(new Date(v).getTime());
const filled = (v) => typeof v === 'string' && v.trim() !== '';

/** Every media path in the config, with a readable label for error messages. */
function mediaPaths(c) {
  return [
    ['couple.groom.photo', c.couple?.groom?.photo],
    ['couple.bride.photo', c.couple?.bride?.photo],
    ['media.couplePhoto', c.media?.couplePhoto],
    ['media.video.src', c.media?.video?.src],
    ['media.video.poster', c.media?.video?.poster],
    ['media.music.src', c.media?.music?.src],
    ['venue.photo', c.venue?.photo],
    ...(c.story?.photos || []).map((p, i) => [`story.photos[${i}]`, p]),
    ...(c.events || []).map((e, i) => [`events[${i}].image`, e?.image]),
  ].filter(([, p]) => filled(p));
}

/**
 * Validate a merged client config.
 * errors   → the invitation must not render (shown in full during development)
 * warnings → optional data missing; the section falls back gracefully
 */
export function validateWeddingConfig(config, fileKey) {
  const errors = [];
  const warnings = [];
  const f = config.features || {};

  // Identity
  if (!filled(config.clientId)) errors.push('clientId is required.');
  else if (!SLUG.test(config.clientId)) errors.push(`clientId "${config.clientId}" must use lowercase letters, numbers and hyphens.`);
  if (!filled(config.slug)) errors.push('slug is required.');
  else if (!SLUG.test(config.slug)) errors.push(`slug "${config.slug}" must use lowercase letters, numbers and hyphens.`);
  else if (fileKey && config.slug !== fileKey) errors.push(`slug "${config.slug}" must match its file name "${fileKey}.js".`);
  if (JSON.stringify(config).includes('REPLACE_ME')) errors.push('Config still contains REPLACE_ME placeholders.');

  // Couple
  if (!filled(config.couple?.groom?.firstName)) errors.push('couple.groom.firstName is required.');
  if (!filled(config.couple?.bride?.firstName)) errors.push('couple.bride.firstName is required.');

  // Wedding date
  if (!filled(config.wedding?.date)) errors.push('wedding.date is required (ISO format, e.g. 2027-02-12T19:30:00+05:30).');
  else if (!isDate(config.wedding.date)) errors.push(`wedding.date "${config.wedding.date}" is not a valid date.`);
  if (filled(config.wedding?.endDate) && !isDate(config.wedding.endDate)) warnings.push('wedding.endDate is not a valid date; a 3-hour event is assumed.');

  // Sections
  const unknownFeatures = Object.keys(f).filter((k) => !(k in defaultConfig.features));
  if (unknownFeatures.length) warnings.push(`Unknown features ignored: ${unknownFeatures.join(', ')}.`);
  if (!SECTIONS.some((s) => f[s])) errors.push(`Enable at least one section: ${SECTIONS.join(', ')}.`);

  // Theme
  if (config.theme?.preset && !themes[config.theme.preset]) {
    warnings.push(`Theme "${config.theme.preset}" not found; using royal-heritage. Options: ${Object.keys(themes).join(', ')}.`);
  }

  // Events
  if (f.events) {
    if (!Array.isArray(config.events) || config.events.length === 0) warnings.push('events is empty; the events section is hidden.');
    (config.events || []).forEach((e, i) => {
      const at = `events[${i}]`;
      if (!filled(e?.name)) errors.push(`${at}.name is required.`);
      if (!isDate(e?.start)) warnings.push(`${at}.start is missing or invalid; shown as "Date TBA".`);
      if (e?.motif && !MOTIFS.includes(e.motif)) warnings.push(`${at}.motif "${e.motif}" is unknown; using "generic".`);
    });
    const ids = (config.events || []).map((e) => e?.id).filter(Boolean);
    if (new Set(ids).size !== ids.length) errors.push('Event ids must be unique.');
  }

  // Venue
  if (f.venue) {
    if (!filled(config.venue?.name)) warnings.push('venue.name is empty; the venue section is hidden.');
    if (!filled(config.venue?.address)) warnings.push('venue.address is empty.');
    if (!filled(config.venue?.mapUrl) && !filled(config.venue?.mapQuery)) warnings.push('venue has no mapUrl or mapQuery; the location button is hidden.');
  }

  // Media must live in this client's own folder — never another client's.
  if (filled(config.clientId)) {
    const own = `weddings/${config.clientId}/`;
    mediaPaths(config).forEach(([label, path]) => {
      if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return;
      const clean = path.replace(/^\//, '');
      if (!clean.startsWith(own)) errors.push(`${label} "${path}" must be inside public/${own}.`);
    });
  }
  if (f.video && !filled(config.media?.video?.src)) warnings.push('video is enabled but media.video.src is empty; a placeholder is shown.');
  if (f.music && !filled(config.media?.music?.src)) warnings.push('music is enabled but media.music.src is empty; the player is hidden.');
  if (f.rsvp && !filled(config.rsvp?.name) && !filled(config.rsvp?.phone)) warnings.push('rsvp is enabled but has no name or phone; it is hidden.');

  return { errors, warnings };
}
