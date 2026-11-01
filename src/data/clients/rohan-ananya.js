/**
 * SAMPLE CLIENT — Rohan & Ananya (Floral Romance theme).
 * Demonstrates a smaller wedding with some sections switched off and a
 * few headings rewritten. All details are demonstration data.
 */
export default {
  clientId: 'rohan-ananya',
  slug: 'rohan-ananya',

  meta: {
    title: 'Rohan & Ananya · Wedding Invitation',
    description: 'Join us in Goa as we begin our forever.',
  },

  theme: {
    preset: 'floral-romance',
    // Individual roles can be overridden on top of the preset:
    colors: { primary: '#8F3F57' },
  },

  features: {
    royalDoors: false,
    video: false,
    blessing: false,
    scratchReveal: false,
  },

  couple: {
    groom: {
      firstName: 'Rohan',
      fullName: 'Rohan Iyer',
      intro: 'A marine biologist who can name every fish in the Arabian Sea and still burns toast.',
      photo: '',
    },
    bride: {
      firstName: 'Ananya',
      fullName: 'Ananya Desai',
      intro: 'A pastry chef with a sketchbook full of cakes she hasn’t baked yet — the wedding cake is one of them.',
      photo: '',
    },
    hashtag: '#RoAnTogether',
    // monogram left empty → derived automatically as 'R & A'
  },

  family: {
    groomParents: 'Son of Mrs. Lakshmi Iyer & Mr. Venkat Iyer',
    brideParents: 'Daughter of Mrs. Priya Desai & Mr. Nikhil Desai',
    invitationMessage: 'With hearts full of love, we invite you to a sunset celebration by the sea.',
    signature: 'With love, the Iyer & Desai families',
  },

  wedding: {
    date: '2027-11-20T17:00:00+05:30',
    endDate: '2027-11-20T22:00:00+05:30',
    city: 'Goa',
  },

  story: {
    heading: 'From a bakery queue to forever',
    summary:
      'Rohan came in for one croissant and left with Ananya’s number. Four years and roughly nine hundred croissants later, here we are.',
    milestones: [
      { year: '2023', title: 'The last croissant', text: 'Two people, one croissant, one very polite argument.' },
      { year: '2026', title: 'The question', text: 'Asked underwater, answered on the beach.' },
    ],
    photos: ['', ''],
  },

  events: [
    {
      id: 'mehendi',
      name: 'Mehendi & Brunch',
      motif: 'mehendi',
      start: '2027-11-19T11:00:00+05:30',
      end: '2027-11-19T15:00:00+05:30',
      venue: 'Poolside Garden',
      address: 'Venue address to be confirmed by the family',
      description: 'Henna, mimosas and a very long brunch table.',
      dressCode: 'Pastels & florals',
    },
    {
      id: 'wedding',
      name: 'Sunset Wedding',
      motif: 'wedding',
      start: '2027-11-20T17:00:00+05:30',
      end: '2027-11-20T22:00:00+05:30',
      venue: 'The Beach Lawn',
      address: 'Venue address to be confirmed by the family',
      description: 'Pheras at golden hour followed by dinner under the stars.',
      dressCode: 'Festive Indian · light fabrics',
    },
  ],

  venue: {
    name: 'The Beach Lawn',
    address: 'Venue address to be confirmed by the family',
    city: 'Goa',
    photo: '',
    mapUrl: '',
    mapQuery: 'Goa, India',
  },

  media: {
    // Generated placeholder tone — replace with the client's licensed song.
    music: { src: 'weddings/rohan-ananya/audio/music.wav' },
  },

  closing: { line: 'Come for the sunset, stay for the dance floor.' },

  rsvp: { name: 'Kavya Desai', phone: '+91 91234 56789' },

  text: {
    couple: { script: 'salt water & sugar', title: 'Meet Rohan & Ananya' },
    events: { script: 'two days by the sea', title: 'The celebrations' },
  },
};
