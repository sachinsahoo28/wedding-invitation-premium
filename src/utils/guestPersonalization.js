const MAX = 60;

// Strip control characters and angle brackets, cap length. Always rendered as
// React text, never as HTML.
function clean(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, MAX);
}

export function readGuest(search = window.location.search) {
  const params = new URLSearchParams(search);
  const guest = clean(params.get('guest'));
  const family = clean(params.get('family'));
  const note = clean(params.get('note'));
  if (!guest && !family) return null;
  return { guest, family, note };
}

/**
 * Base URL for this client's personalised links. When the client was chosen
 * via ?client=, that parameter is kept so the link opens the same wedding.
 */
export function baseUrl(configured, clientQuery) {
  if (configured) return configured;
  const { origin, pathname } = window.location;
  return clientQuery ? `${origin}${pathname}?client=${encodeURIComponent(clientQuery)}` : `${origin}${pathname}`;
}

export function buildGuestUrl(base, { guest, family, note }) {
  const params = new URLSearchParams();
  if (clean(guest)) params.set('guest', clean(guest));
  if (clean(family)) params.set('family', clean(family));
  if (clean(note)) params.set('note', clean(note));
  const qs = params.toString().replace(/\+/g, '%20');
  if (!qs) return base;
  return `${base}${base.includes('?') ? '&' : '?'}${qs}`;
}

export function salutation({ guest, family }) {
  if (guest && family) return `${guest} & ${family}`;
  return guest || family;
}
