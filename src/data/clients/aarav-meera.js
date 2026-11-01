/**
 * SAMPLE CLIENT — Aarav & Meera (Royal Heritage theme, every section on).
 * All names, dates and places below are demonstration data.
 *
 * Media paths are relative to /public and must stay inside
 * public/weddings/<clientId>/.
 */
export default {
  clientId: 'aarav-meera',
  slug: 'aarav-meera',

  meta: {
    title: 'Aarav & Meera · Wedding Invitation',
    description: 'With the blessings of our families, we invite you to celebrate our wedding in Udaipur.',
  },

  theme: { preset: 'royal-heritage' },

  couple: {
    groom: {
      firstName: 'Aarav',
      fullName: 'Aarav Malhotra',
      intro:
        'A cardiologist with an unreasonable love for old Kishore Kumar songs, Aarav is the friend who remembers your birthday and the chai order you forgot you had.',
      photo: '', // 'weddings/aarav-meera/photos/groom.jpg'
    },
    bride: {
      firstName: 'Meera',
      fullName: 'Meera Sharma',
      intro:
        'An architect who sketches temples on café napkins, Meera believes every home should have a courtyard, a reading nook and a kitchen that smells of cardamom.',
      photo: '', // 'weddings/aarav-meera/photos/bride.jpg'
    },
    monogram: 'A & M',
    hashtag: '#AaravWedsMeera',
  },

  family: {
    groomParents: 'Son of Mrs. Sunita Malhotra & Mr. Vikram Malhotra',
    brideParents: 'Daughter of Mrs. Kavita Sharma & Mr. Rajesh Sharma',
    invitationMessage:
      'Together with our families, we joyfully invite you to celebrate the beginning of our forever.',
    signature: 'With love, the Sharma & Malhotra families',
  },

  wedding: {
    date: '2027-02-12T19:30:00+05:30',
    endDate: '2027-02-12T23:30:00+05:30',
    city: 'Udaipur, Rajasthan',
  },

  story: {
    heading: 'How it all began',
    summary:
      'Two strangers, one delayed flight to Jaipur and a shared argument about the best kachori in the old city. Six years later, we are still arguing about kachoris — now as each other’s favourite person.',
    milestones: [
      { year: '2020', title: 'The delayed flight', text: 'Gate 14, four hours late, one shared charging point.' },
      { year: '2022', title: 'The first trip home', text: 'Meera met the Malhotras over a Diwali dinner that ran till 2 am.' },
      { year: '2025', title: 'The proposal', text: 'At dawn, on the ghats of Lake Pichola, with a ring hidden in a tin of kachoris.' },
    ],
    photos: ['', '', ''], // up to 3, e.g. 'weddings/aarav-meera/photos/story-1.jpg'
  },

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

  venue: {
    name: 'The Lakeside Lawns',
    address: 'Venue address to be confirmed by the family', // real address only
    city: 'Udaipur, Rajasthan',
    photo: '', // 'weddings/aarav-meera/photos/venue.jpg'
    mapUrl: '', // client's Google Maps share link
    mapQuery: 'Udaipur, Rajasthan', // used for the embedded map
  },

  media: {
    couplePhoto: '', // revealed behind the royal doors
    video: { src: '', poster: '' }, // 'weddings/aarav-meera/video/film.mp4'
    // Generated placeholder tone — replace with the client's licensed song.
    music: { src: 'weddings/aarav-meera/audio/music.wav' },
  },

  closing: { line: 'Your presence is the greatest blessing we could ask for.' },

  rsvp: { name: 'Rohan Malhotra', phone: '+91 98765 43210' },
};
