/**
 * Defaults merged under every client config. A client only needs to set
 * what differs; any heading or label below can be overridden via `text`.
 */
export const defaultConfig = {
  locale: {
    timeZone: 'Asia/Kolkata',
    dateLocale: 'en-IN',
  },

  theme: { preset: 'royal-heritage', colors: {}, fonts: {} },

  features: {
    envelope: true, //            welcome screen with the 3D envelope
    blessing: true, //            Ganesh invocation + "शुभ विवाह" line on the invitation card
    invitation: true, //          formal invitation card (families, date)
    coupleStory: true, //         bride & groom introductions
    loveStory: true, //           story text, milestones and photo collage
    royalDoors: true, //          palace doors revealing the couple photo
    saveTheDate: true, //         date card
    scratchReveal: true, //       gold foil over the date (tap fallback included)
    countdown: true,
    calendar: true, //            mini month calendar + Google Calendar button
    events: true,
    video: true,
    music: true,
    venue: true,
    map: true, //                 embedded Google Map under the venue
    guestPersonalization: true, // read ?guest=&family= and greet the guest
    shareInvite: true, //         link generator (hidden on personalised links)
    closing: true,
    blessingsShower: true, //     petal-shower button in the footer
    rsvp: true,
  },

  couple: {
    monogram: '', //   derived from initials when empty, e.g. 'A & M'
    hashtag: '',
  },

  family: {
    groomParents: '',
    brideParents: '',
    invitationMessage:
      'Together with our families, we joyfully invite you to celebrate the beginning of our forever.',
    signature: '',
  },

  blessing: {
    title: '॥ श्री गणेशाय नमः ॥',
    sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    invitationLine: '॥ शुभ विवाह ॥',
  },

  wedding: { date: '', endDate: '', city: '' },

  story: { heading: 'How it all began', summary: '', milestones: [], photos: [] },

  events: [],

  venue: { name: '', address: '', city: '', photo: '', mapUrl: '', mapQuery: '' },

  media: {
    couplePhoto: '', // behind the royal doors
    video: { src: '', poster: '' },
    music: { src: '', volume: 0.55 },
  },

  closing: { line: 'Your presence is the greatest blessing we could ask for.' },

  rsvp: { name: '', phone: '' },

  share: { baseUrl: '' },

  meta: { title: '', description: '' },

  text: {
    gate: {
      eyebrow: 'You are cordially invited',
      dear: 'Dear',
      hint: 'Tap the seal to open your invitation',
      cardEyebrow: 'The wedding of',
    },
    invitation: { eyebrow: 'Together with their families', weds: 'weds' },
    couple: { eyebrow: 'The couple', script: 'two hearts, one journey', title: 'Meet the bride & groom', groom: 'The groom', bride: 'The bride' },
    story: { eyebrow: 'Our story' },
    doors: {
      eyebrow: 'The royal welcome',
      script: 'step inside',
      title: 'A palace awaits you',
      hint: 'Tap the doors to enter',
      captionScript: 'Welcome to',
      caption: 'our forever',
    },
    date: {
      eyebrow: 'Save the date',
      script: 'mark your calendar',
      title: 'The big day',
      onwards: 'onwards',
      scratch: 'Scratch to reveal',
      tapReveal: 'Or tap here to reveal',
      addToCalendar: 'Add to Google Calendar',
      pastScript: 'Happily married',
      pastText: 'Thank you for celebrating with us.',
      tba: 'Date to be announced',
    },
    events: {
      eyebrow: '{count} celebrations',
      script: 'the festivities',
      title: 'Wedding celebrations',
      intro: 'The best moments in life are meant to be shared — we would love for you to be part of each one.',
      saveToCalendar: 'Save to calendar',
    },
    video: {
      eyebrow: 'Our wedding film',
      script: 'moments of love',
      title: 'A Story in Motion',
      placeholder: 'Our film is on its way',
    },
    venue: { eyebrow: 'Where', button: 'View location' },
    share: {
      eyebrow: 'For the families',
      script: 'spread the joy',
      title: 'Share a personal invitation',
      intro: 'Create an invitation addressed to each guest. They’ll be greeted by name when they open it.',
      messageIntro: 'With joy in our hearts, we invite you to celebrate the wedding of',
      linkLabel: 'Your personal invitation:',
    },
    closing: {
      script: 'with love & blessings',
      shower: 'Shower your blessings',
      rsvp: 'For RSVP & assistance',
    },
  },
};

const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

/** Deep merge: objects merge recursively, arrays and primitives replace. */
export function mergeDeep(base, override) {
  if (!isPlainObject(override)) return override === undefined ? base : override;
  const out = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isPlainObject(value) && isPlainObject(base?.[key]) ? mergeDeep(base[key], value) : value;
  }
  return out;
}
