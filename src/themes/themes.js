/**
 * Theme presets. A client picks one with `theme.preset` and may override
 * individual colours/fonts with `theme.colors` / `theme.fonts`.
 *
 * Colour roles
 *   bg / surface / surfaceDeep   page background and alternate section fills
 *   text                         body copy
 *   primary / primaryDeep        names, buttons, wax seal
 *   deep                         headings and dark-section base
 *   accent (+Soft/Light/Dark)    gold lines, ornaments, foil
 *   blush / leaf / haldi         petals, placeholders, event accents
 *   night / night2 / nightDeep   dark sections (welcome gate, doors, film, footer)
 *   wood                         palace door frame
 *   paper / paperDeep            envelope paper
 *   glow                         warm light behind envelope and doors
 */

const royalHeritage = {
  id: 'royal-heritage',
  name: 'Royal Heritage',
  colors: {
    bg: '#FFF9F0',
    surface: '#F2E7D5',
    surfaceDeep: '#E8D8BD',
    text: '#34251F',
    primary: '#65253B',
    primaryDeep: '#4E1A2D',
    deep: '#452237',
    accent: '#B08D57',
    accentSoft: '#D8BD82',
    accentLight: '#EFDCAE',
    accentDark: '#6E5130',
    blush: '#D9A6A7',
    leaf: '#66785B',
    haldi: '#B7861F',
    night: '#2B1422',
    night2: '#3E1D31',
    nightDeep: '#1D0C15',
    wood: '#3C1B2C',
    paper: '#E9D5B0',
    paperDeep: '#D9C39B',
    glow: '#FFE2AA',
  },
  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    script: "'Great Vibes', cursive",
    sans: "'DM Sans', system-ui, sans-serif",
  },
  googleFonts: [
    'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500',
    'DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600',
    'Great+Vibes',
  ],
};

export const themes = {
  'royal-heritage': royalHeritage,

  'luxury-burgundy': {
    id: 'luxury-burgundy',
    name: 'Luxury Burgundy',
    colors: {
      ...royalHeritage.colors,
      bg: '#FBF6EF',
      surface: '#EFE3D3',
      surfaceDeep: '#E2D0B8',
      text: '#2A1B1F',
      primary: '#7A1F35',
      primaryDeep: '#5C1426',
      deep: '#3A1020',
      accent: '#B8935A',
      accentSoft: '#DCC08A',
      accentLight: '#F2E0B4',
      night: '#22080F',
      night2: '#3A1020',
      nightDeep: '#150409',
      wood: '#3A1020',
    },
    fonts: {
      serif: "'Playfair Display', Georgia, serif",
      script: "'Pinyon Script', cursive",
      sans: "'Jost', system-ui, sans-serif",
    },
    googleFonts: ['Playfair+Display:ital,wght@0,400;0,500;0,600;1,400', 'Pinyon+Script', 'Jost:wght@400;500;600'],
  },

  'floral-romance': {
    id: 'floral-romance',
    name: 'Floral Romance',
    colors: {
      ...royalHeritage.colors,
      bg: '#FFF8F6',
      surface: '#F7E6E3',
      surfaceDeep: '#EFD5D0',
      text: '#3B2A2C',
      primary: '#9E4A5E',
      primaryDeep: '#7F3549',
      deep: '#5A2D3B',
      accent: '#B8956A',
      accentSoft: '#DCC29C',
      accentLight: '#F1E2C8',
      accentDark: '#7A6040',
      blush: '#EBB8BF',
      leaf: '#7C9473',
      night: '#3A2029',
      night2: '#57303E',
      nightDeep: '#28141C',
      wood: '#5A2D3B',
      paper: '#F3E3DC',
      paperDeep: '#E6CEC4',
      glow: '#FFE6DA',
    },
    fonts: {
      serif: "'Cormorant Garamond', Georgia, serif",
      script: "'Parisienne', cursive",
      sans: "'Nunito Sans', system-ui, sans-serif",
    },
    googleFonts: [
      'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500',
      'Parisienne',
      'Nunito+Sans:wght@400;600;700',
    ],
  },

  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    colors: {
      ...royalHeritage.colors,
      bg: '#FAFAF8',
      surface: '#F0EEEA',
      surfaceDeep: '#E3DFD8',
      text: '#1F1F1F',
      primary: '#2B2B2B',
      primaryDeep: '#111111',
      deep: '#1F1F1F',
      accent: '#A08B6D',
      accentSoft: '#C9B89D',
      accentLight: '#E8DDCB',
      accentDark: '#6B5B44',
      blush: '#D8CFC8',
      leaf: '#8A9182',
      haldi: '#A08B6D',
      night: '#1C1C1C',
      night2: '#2A2A2A',
      nightDeep: '#111111',
      wood: '#2A2A2A',
      paper: '#ECE8E1',
      paperDeep: '#DCD6CC',
      glow: '#FFF3E0',
    },
    fonts: {
      serif: "'Bodoni Moda', Georgia, serif",
      script: "'Allura', cursive",
      sans: "'Inter', system-ui, sans-serif",
    },
    googleFonts: ['Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400', 'Allura', 'Inter:wght@400;500;600'],
  },

  'traditional-indian': {
    id: 'traditional-indian',
    name: 'Traditional Indian',
    colors: {
      ...royalHeritage.colors,
      bg: '#FFF6E6',
      surface: '#FBE6C2',
      surfaceDeep: '#F3D49E',
      text: '#3A1C0E',
      primary: '#A3171E',
      primaryDeep: '#7E0F15',
      deep: '#5A0F12',
      accent: '#C8962A',
      accentSoft: '#E5BD5C',
      accentLight: '#F7DD96',
      accentDark: '#7A5714',
      blush: '#F0A07A',
      leaf: '#2F6B3A',
      haldi: '#D9900F',
      night: '#3A0B0B',
      night2: '#5A0F12',
      nightDeep: '#240505',
      wood: '#5A0F12',
      paper: '#F6DDA8',
      paperDeep: '#E9C47E',
      glow: '#FFD98A',
    },
    fonts: {
      serif: "'Cinzel', Georgia, serif",
      script: "'Great Vibes', cursive",
      sans: "'Poppins', system-ui, sans-serif",
    },
    googleFonts: ['Cinzel:wght@400;500;600;700', 'Great+Vibes', 'Poppins:wght@400;500;600'],
  },

  'pastel-wedding': {
    id: 'pastel-wedding',
    name: 'Pastel Wedding',
    colors: {
      ...royalHeritage.colors,
      bg: '#FBF8F6',
      surface: '#EFEAF4',
      surfaceDeep: '#E2DAEC',
      text: '#36314A',
      primary: '#7A6C9E',
      primaryDeep: '#5F5383',
      deep: '#4B4366',
      accent: '#C2A383',
      accentSoft: '#DCC6AE',
      accentLight: '#F0E4D6',
      accentDark: '#8A6E52',
      blush: '#F2C6CF',
      leaf: '#9CBFA7',
      haldi: '#D9B45A',
      night: '#3D3654',
      night2: '#544B70',
      nightDeep: '#2B2640',
      wood: '#544B70',
      paper: '#F1E8EE',
      paperDeep: '#E2D4DE',
      glow: '#FFEFF4',
    },
    fonts: {
      serif: "'Lora', Georgia, serif",
      script: "'Dancing Script', cursive",
      sans: "'Quicksand', system-ui, sans-serif",
    },
    googleFonts: ['Lora:ital,wght@0,400;0,500;0,600;1,400', 'Dancing+Script:wght@500', 'Quicksand:wght@400;500;600'],
  },
};

export const DEFAULT_THEME = 'royal-heritage';
