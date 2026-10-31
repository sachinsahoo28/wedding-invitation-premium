/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DETAILS — the only file you need to edit per client.
 * ─────────────────────────────────────────────────────────────
 *
 *  Everything below is SAMPLE DATA. Replace it with the client's
 *  real names, dates, venues and media before publishing.
 *
 *  Media files go in /public/media and are referenced WITHOUT a
 *  leading slash, e.g. 'media/couple.jpg'. Leave a photo/video
 *  field empty ('') to show a clearly-labelled placeholder.
 *
 *  Dates use ISO format with the venue's UTC offset (IST = +05:30).
 */

export const wedding = {
  // ── Couple ────────────────────────────────────────────────
  bride: {
    firstName: 'Meera',
    fullName: 'Meera Sharma',
    parents: 'Daughter of Mrs. Kavita Sharma & Mr. Rajesh Sharma',
    intro:
      'An architect who sketches temples on café napkins, Meera believes every home should have a courtyard, a reading nook and a kitchen that smells of cardamom.',
    photo: '', // e.g. 'media/bride.jpg'
  },
  groom: {
    firstName: 'Aarav',
    fullName: 'Aarav Malhotra',
    parents: 'Son of Mrs. Sunita Malhotra & Mr. Vikram Malhotra',
    intro:
      'A cardiologist with an unreasonable love for old Kishore Kumar songs, Aarav is the friend who remembers your birthday and the chai order you forgot you had.',
    photo: '', // e.g. 'media/groom.jpg'
  },

  monogram: 'A & M',
  hashtag: '#AaravWedsMeera',
  city: 'Udaipur, Rajasthan',

  // Set to false to hide the Ganesh invocation on the welcome screen.
  showGaneshBlessing: true,
  blessing: {
    sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    meaning: 'O Lord Ganesha, remove all obstacles from every endeavour, always.',
  },

  // ── Main ceremony date (drives countdown + calendar) ─────
  weddingDate: '2027-02-12T19:30:00+05:30',
  weddingEndDate: '2027-02-12T23:30:00+05:30',

  invitationLine:
    'Together with our families, we joyfully invite you to celebrate the beginning of our forever.',

  // ── Love story ───────────────────────────────────────────
  story: {
    heading: 'How it all began',
    summary:
      'Two strangers, one delayed flight to Jaipur and a shared argument about the best kachori in the old city. Six years later, we are still arguing about kachoris — now as each other’s favourite person.',
    milestones: [
      { year: '2020', title: 'The delayed flight', text: 'Gate 14, four hours late, one shared charging point.' },
      { year: '2022', title: 'The first trip home', text: 'Meera met the Malhotras over a Diwali dinner that ran till 2 am.' },
      { year: '2025', title: 'The proposal', text: 'At dawn, on the ghats of Lake Pichola, with a ring hidden in a tin of kachoris.' },
    ],
    // Up to 3 photos for the editorial collage.
    photos: ['', '', ''], // e.g. ['media/story-1.jpg', 'media/story-2.jpg', 'media/story-3.jpg']
  },

  // Photo revealed behind the royal doors.
  doorsPhoto: '', // e.g. 'media/couple-doors.jpg'

  // ── Events ───────────────────────────────────────────────
  // motif: 'haldi' | 'mehendi' | 'sangeet' | 'wedding' | 'reception' | 'generic'
  events: [
    {
      id: 'haldi',
      name: 'Haldi',
      motif: 'haldi',
      start: '2027-02-10T10:00:00+05:30',
      end: '2027-02-10T13:00:00+05:30',
      venue: 'The Marigold Courtyard',
      address: 'Venue address to be confirmed by the family',
      description: 'A morning of turmeric, laughter and marigolds as both families bless the couple.',
      dressCode: 'Shades of yellow · comfortable cottons',
      image: '',
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      motif: 'mehendi',
      start: '2027-02-10T16:00:00+05:30',
      end: '2027-02-10T20:00:00+05:30',
      venue: 'The Garden Pavilion',
      address: 'Venue address to be confirmed by the family',
      description: 'Henna, folk songs and chai under the trees. Bring your stories, we’ll bring the cones.',
      dressCode: 'Greens & florals',
      image: '',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      motif: 'sangeet',
      start: '2027-02-11T19:00:00+05:30',
      end: '2027-02-11T23:59:00+05:30',
      venue: 'The Durbar Hall',
      address: 'Venue address to be confirmed by the family',
      description: 'An evening of performances by both families. Rehearsals are optional; enthusiasm is not.',
      dressCode: 'Indo-western glamour · jewel tones',
      image: '',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      motif: 'wedding',
      start: '2027-02-12T19:30:00+05:30',
      end: '2027-02-12T23:30:00+05:30',
      venue: 'The Lakeside Lawns',
      address: 'Venue address to be confirmed by the family',
      description: 'The baraat arrives at dusk, followed by the pheras under the stars beside the lake.',
      dressCode: 'Traditional Indian · reds, golds & ivory',
      image: '',
    },
    {
      id: 'reception',
      name: 'Reception',
      motif: 'reception',
      start: '2027-02-13T20:00:00+05:30',
      end: '2027-02-13T23:59:00+05:30',
      venue: 'The Palace Terrace',
      address: 'Venue address to be confirmed by the family',
      description: 'Dinner, music and our first dance as Mr. & Mrs. — and a dessert table we refuse to apologise for.',
      dressCode: 'Black tie · evening wear',
      image: '',
    },
  ],

  // ── Main venue ───────────────────────────────────────────
  venue: {
    name: 'The Lakeside Lawns',
    // Only use the real, client-confirmed address here.
    address: 'Venue address to be confirmed by the family',
    city: 'Udaipur, Rajasthan',
    photo: '', // e.g. 'media/venue.jpg'
    // Paste the client's Google Maps share link. Empty = search by mapQuery.
    mapsUrl: '',
    // Used for the embedded map and the fallback search link.
    mapQuery: 'Udaipur, Rajasthan',
    showMapEmbed: true,
  },

  // ── Film ─────────────────────────────────────────────────
  film: {
    heading: 'A Story in Motion',
    // Local file ('media/film.mp4') or a direct .mp4/.webm URL.
    // Leave empty to show the placeholder.
    src: '',
    poster: '', // e.g. 'media/film-poster.jpg'
  },

  // ── Background music ─────────────────────────────────────
  // The bundled track is a soft generated placeholder tone.
  // Replace with the client's licensed song (mp3 recommended).
  music: {
    src: 'media/music.wav',
    title: 'Background music',
  },

  // ── Closing ──────────────────────────────────────────────
  closing: {
    line: 'Your presence is the greatest blessing we could ask for.',
    families: 'With love, the Sharma & Malhotra families',
    rsvpName: 'Rohan Malhotra',
    rsvpPhone: '+91 98765 43210',
  },

  // Base URL for personalised links. Empty = current page URL.
  shareBaseUrl: '',
};

/** Resolve a /public asset path against Vite's base (GitHub Pages safe). */
export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
