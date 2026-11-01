// Formatting follows the active client's locale (set once by setDateLocale).
let TZ = 'Asia/Kolkata';
let LOCALE = 'en-IN';

export function setDateLocale({ timeZone, dateLocale } = {}) {
  if (timeZone) TZ = timeZone;
  if (dateLocale) LOCALE = dateLocale;
}

export function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

const fmt = (opts) => new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, ...opts });

export const formatDay = (d) => fmt({ day: 'numeric' }).format(d);
export const formatMonth = (d) => fmt({ month: 'long' }).format(d);
export const formatMonthShort = (d) => fmt({ month: 'short' }).format(d);
export const formatYear = (d) => fmt({ year: 'numeric' }).format(d);
export const formatWeekday = (d) => fmt({ weekday: 'long' }).format(d);
export const formatTime = (d) => fmt({ hour: 'numeric', minute: '2-digit', hour12: true }).format(d).toUpperCase();
export const formatLong = (d) => fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);

/** Parts of a date as seen in the venue's time zone. */
export function venueParts(d) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(d)
      .map((p) => [p.type, p.value])
  );
  return { year: +parts.year, month: +parts.month - 1, day: +parts.day };
}

const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function googleCalendarUrl({ title, start, end, details, location }) {
  const s = parseDate(start);
  if (!s) return '';
  const e = parseDate(end) || new Date(s.getTime() + 3 * 3600 * 1000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${gcalStamp(s)}/${gcalStamp(e)}`,
    details: details || '',
    location: location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
