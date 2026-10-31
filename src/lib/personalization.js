const MAX = 60;

// Strip control characters and cap length. Rendered as React text, never HTML.
function clean(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, MAX);
}

export function readGuest(search = window.location.search) {
  const params = new URLSearchParams(search);
  const guest = clean(params.get('guest'));
  const family = clean(params.get('family'));
  const note = clean(params.get('note') || '').slice(0, MAX);
  if (!guest && !family) return null;
  return { guest, family, note };
}

export function baseUrl(configured) {
  if (configured) return configured;
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
}

export function buildGuestUrl(base, { guest, family, note }) {
  const params = new URLSearchParams();
  if (clean(guest)) params.set('guest', clean(guest));
  if (clean(family)) params.set('family', clean(family));
  if (clean(note)) params.set('note', clean(note));
  const qs = params.toString().replace(/\+/g, '%20');
  return qs ? `${base}?${qs}` : base;
}

export function salutation({ guest, family }) {
  if (guest && family) return `${guest} & ${family}`;
  return guest || family;
}
