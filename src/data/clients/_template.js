/**
 * ─────────────────────────────────────────────────────────────
 *  NEW CLIENT TEMPLATE
 * ─────────────────────────────────────────────────────────────
 *  1. Copy this file to src/data/clients/<slug>.js
 *     (files starting with "_" are ignored by the engine).
 *  2. Replace every REPLACE_ME value.
 *  3. Put media in public/weddings/<clientId>/{photos,video,audio}/.
 *  4. Delete any optional field you don't need — defaults fill the gaps
 *     (see src/config/defaults.js for every option and heading).
 *
 *  Dates: ISO 8601 with the venue's UTC offset, e.g. IST = +05:30.
 */
export default {
  // Lowercase letters, numbers and hyphens. slug must equal the file name.
  clientId: 'REPLACE_ME-slug',
  slug: 'REPLACE_ME-slug',

  meta: {
    title: 'REPLACE_ME Groom & Bride · Wedding Invitation',
    description: 'REPLACE_ME short line shown in WhatsApp / social link previews.',
  },

  // royal-heritage | luxury-burgundy | floral-romance |
  // modern-minimal | traditional-indian | pastel-wedding
  theme: {
    preset: 'royal-heritage',
    colors: {}, // optional overrides, e.g. { primary: '#7A1F35' }
    fonts: {}, //  optional overrides, e.g. { serif: "'Lora', serif" }
  },

  // Every section is on by default; set any to false to hide it.
  features: {
    // envelope, blessing, invitation, coupleStory, loveStory, royalDoors,
    // saveTheDate, scratchReveal, countdown, calendar, events, video, music,
    // venue, map, guestPersonalization, shareInvite, closing,
    // blessingsShower, rsvp
  },

  couple: {
    groom: {
      firstName: 'REPLACE_ME',
      fullName: 'REPLACE_ME',
      intro: 'REPLACE_ME — two or three sentences about the groom.',
      photo: '', // 'weddings/<clientId>/photos/groom.jpg'
    },
    bride: {
      firstName: 'REPLACE_ME',
      fullName: 'REPLACE_ME',
      intro: 'REPLACE_ME — two or three sentences about the bride.',
      photo: '', // 'weddings/<clientId>/photos/bride.jpg'
    },
    monogram: '', // optional, e.g. 'A & M' (derived from initials if empty)
    hashtag: '#REPLACE_ME',
  },

  family: {
    groomParents: 'Son of REPLACE_ME',
    brideParents: 'Daughter of REPLACE_ME',
    invitationMessage: 'REPLACE_ME invitation message.',
    signature: 'With love, the REPLACE_ME families',
  },

  wedding: {
    date: '2027-01-01T19:00:00+05:30', // REPLACE_ME — drives countdown & calendar
    endDate: '2027-01-01T23:00:00+05:30',
    city: 'REPLACE_ME City, State',
  },

  story: {
    heading: 'How it all began',
    summary: 'REPLACE_ME — a short love story.',
    milestones: [
      // { year: '2020', title: 'First meeting', text: 'One line.' },
    ],
    photos: [], // up to 3: 'weddings/<clientId>/photos/story-1.jpg'
  },

  // motif: haldi | mehendi | sangeet | wedding | reception | generic
  events: [
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      motif: 'wedding',
      start: '2027-01-01T19:00:00+05:30',
      end: '2027-01-01T23:00:00+05:30',
      venue: 'REPLACE_ME',
      address: 'REPLACE_ME full address',
      description: 'REPLACE_ME',
      dressCode: 'REPLACE_ME',
      image: '', // optional
    },
  ],

  venue: {
    name: 'REPLACE_ME',
    address: 'REPLACE_ME — use only the real, client-confirmed address',
    city: 'REPLACE_ME',
    photo: '',
    mapUrl: '', // paste the Google Maps share link
    mapQuery: '', // exact venue name + address for the embedded map
  },

  media: {
    couplePhoto: '', // shown behind the royal doors
    video: { src: '', poster: '' }, // 'weddings/<clientId>/video/film.mp4'
    music: { src: '' }, // 'weddings/<clientId>/audio/song.mp3'
  },

  closing: { line: 'Your presence is the greatest blessing we could ask for.' },

  rsvp: { name: '', phone: '' },

  // Optional: rewrite any heading, e.g.
  // text: { doors: { title: 'Welcome to our palace' } },
};
