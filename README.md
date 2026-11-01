# Wedding Invitation Platform

One React + Vite engine that renders a fully personalised, cinematic Indian wedding invitation for any number of clients. Each client is a single data file plus a media folder. You never edit components to onboard a new couple.

```bash
npm install
npm run dev                          # http://localhost:5173/<slug>/
npm run new-client -- priya-arjun    # scaffold a new client
npm run build                        # every client → dist/<slug>/
npm run build:client -- priya-arjun  # one client as a standalone site
```

---

## 1. How the platform works

```
src/
  data/clients/<slug>.js     ← one file per client (all wedding data)
  data/clients/_template.js  ← starting point for new clients (ignored by the engine)
  config/wedding.config.js   ← platform settings (default client, URL resolution)
  config/defaults.js         ← default values, feature flags and every heading/label
  themes/themes.js           ← theme presets (colours + fonts)
  utils/clientResolver.js    ← picks the client from the URL or build
  utils/weddingConfigValidator.js
  utils/guestPersonalization.js
  context/WeddingContext.jsx ← provides the active config to every section
  components/                ← the sections (Envelope, RoyalDoors, CoupleStory, …)
public/weddings/<clientId>/  ← each client's photos, video and audio
```

On page load the engine:

1. **Resolves the client**: from the URL path (`/rohan-ananya/`), from `?client=rohan-ananya`, or from the client a single-client build was made for. Unknown slugs fall back to `defaultClient`.
2. **Merges** the client file over `config/defaults.js`, so a client only states what differs.
3. **Validates** the result (see section 9 below). Errors stop rendering; warnings go to the console.
4. **Applies** the client's theme, time zone, music and page title, then renders only the enabled sections.

Each client config is bundled as its own small chunk, so a page downloads only the client it shows.

Two sample clients are included, both clearly marked as demonstration data:

| Client | Theme | Shows |
|---|---|---|
| `aarav-meera` | Royal Heritage | every section |
| `rohan-ananya` | Floral Romance + colour override | doors, film, blessing and scratch card switched off; custom headings |

## 2. Create a new client

```bash
npm run new-client -- priya-arjun
```

This creates `src/data/clients/priya-arjun.js` (from `_template.js`) and `public/weddings/priya-arjun/{photos,video,audio}/`.

Open the new file and replace every `REPLACE_ME`. Until you do, the dev server shows a config error screen listing what's missing. Then preview it at `http://localhost:5173/priya-arjun/`.

Rules:
- `slug` must match the file name. Use lowercase letters, numbers and hyphens.
- `clientId` names the media folder. The scaffold sets it equal to the slug.
- Files starting with `_` are ignored, so use that for drafts.

## 3. Add photos, video and music

Put files in the client's own folder and reference them **relative to `public/`**, without a leading slash:

```js
couple: {
  groom: { photo: 'weddings/priya-arjun/photos/groom.jpg' },
  bride: { photo: 'weddings/priya-arjun/photos/bride.jpg' },
},
story:  { photos: ['weddings/priya-arjun/photos/story-1.jpg', '…'] }, // up to 3
venue:  { photo: 'weddings/priya-arjun/photos/venue.jpg' },
media: {
  couplePhoto: 'weddings/priya-arjun/photos/couple.jpg',   // behind the royal doors
  video: { src: 'weddings/priya-arjun/video/film.mp4', poster: 'weddings/priya-arjun/photos/poster.jpg' },
  music: { src: 'weddings/priya-arjun/audio/song.mp3', volume: 0.55 },
},
```

- **Isolation:** the validator rejects any path outside `public/weddings/<clientId>/`, so one client can never show another client's media by mistake. Full `https://` URLs (e.g. a hosted video) are allowed.
- **Fallbacks:** an empty or missing photo shows a labelled placeholder ("Placeholder · add client photo"). Without a video the film section shows a placeholder, and a missing or broken music file hides the player. No stock images are ever substituted.
- **Placeholder music:** the sample tracks are generated placeholder tones (`scripts/generate-placeholder-music.mjs`). Use the client's licensed song.
- **Formats:** JPG/WebP photos about 1600px on the long edge, MP4 (H.264) video, and MP3 audio keep pages fast.

## 4. Edit wedding information

Everything lives in the client file. The main blocks are:

| Block | Contains |
|---|---|
| `couple` | groom/bride `firstName`, `fullName`, `intro`, `photo`; `monogram` and `hashtag` (derived from the names when empty) |
| `family` | `groomParents`, `brideParents`, `invitationMessage`, `signature` |
| `wedding` | `date`, `endDate` (ISO with offset, e.g. `2027-02-12T19:30:00+05:30`), `city` |
| `story` | `heading`, `summary`, `milestones[]`, `photos[]` |
| `events[]` | `id`, `name`, `motif` (`haldi`, `mehendi`, `sangeet`, `wedding`, `reception`, `generic`), `start`, `end`, `venue`, `address`, `description`, `dressCode`, `image` |
| `venue` | `name`, `address`, `city`, `photo`, `mapUrl` (Google Maps share link), `mapQuery` (used for the embedded map) |
| `blessing` | the Ganesh shloka and the "शुभ विवाह" line |
| `locale` | `timeZone` (default `Asia/Kolkata`), `dateLocale` (default `en-IN`) |
| `rsvp`, `closing`, `meta` | RSVP contact, closing line, page title/description for link previews |
| `text` | override any heading or label, e.g. `text: { doors: { title: 'Welcome to our palace' } }` |

`src/config/defaults.js` lists every available option and the default wording of every heading.

Use only real, client-confirmed venue addresses. Never guess one.

## 5. Change the theme

```js
theme: {
  preset: 'luxury-burgundy',
  colors: { primary: '#7A1F35' },        // optional overrides
  fonts:  { serif: "'Lora', serif" },    // optional overrides
},
```

| Preset | Look |
|---|---|
| `royal-heritage` (default) | ivory, antique gold, burgundy · Cormorant Garamond / Great Vibes / DM Sans |
| `luxury-burgundy` | deep wine, bright gold · Playfair Display / Pinyon Script / Jost |
| `floral-romance` | blush, dusty rose, sage · Cormorant Garamond / Parisienne / Nunito Sans |
| `modern-minimal` | off-white, charcoal, taupe · Bodoni Moda / Allura / Inter |
| `traditional-indian` | sindoor red, marigold · Cinzel / Great Vibes / Poppins |
| `pastel-wedding` | lavender, peach, mint · Lora / Dancing Script / Quicksand |

A theme sets every colour role: page surfaces, text, primary, the gold accents and foil, the dark sections (welcome gate, doors, film, footer), the door wood, the envelope paper and the warm glow. It also sets the three fonts, which load automatically. All CSS, the wax seal, the doors and the scratch foil read these tokens, so no component needs touching. To add a preset, copy one in `src/themes/themes.js` and give it a new id.

## 6. Enable or disable sections

Every section is on by default. Switch any off in the client file:

```js
features: { royalDoors: false, video: false, scratchReveal: false },
```

| Flag | Section |
|---|---|
| `envelope` | welcome screen with the 3D envelope (off → the page opens directly) |
| `blessing` | Ganesh invocation + "शुभ विवाह" line |
| `invitation` | formal invitation card |
| `coupleStory` / `loveStory` | bride & groom intros / story, milestones and collage |
| `royalDoors` | palace doors revealing `media.couplePhoto` |
| `saveTheDate`, `scratchReveal`, `countdown`, `calendar` | date card, gold scratch foil, live countdown, mini calendar + Google Calendar |
| `events` | celebration timeline |
| `video` | wedding film |
| `music` | background music player |
| `venue`, `map` | venue card, embedded Google Map |
| `guestPersonalization`, `shareInvite` | greet guests from the URL, link generator |
| `closing`, `blessingsShower`, `rsvp` | footer, petal-shower button, RSVP contact |

Sections with no data hide themselves (e.g. no events, no venue name, no RSVP contact).

## 7. Personalised guest URLs

Add guest details to any client URL:

```
https://site/priya-arjun/?guest=Rahul%20Ji&family=Sharma%20Family&note=See%20you%20there!
```

The invitation then greets "Dear Rahul Ji & Sharma Family" (with the optional note) and hides the share section. The query string stays in the URL, so the greeting survives a refresh.

On the normal URL, the **Share a personal invitation** section generates these links, previews the message, and offers WhatsApp sharing plus copy-link and copy-message buttons. WhatsApp opens with the message ready; the sender picks the contact and presses send. Nothing is sent automatically.

Parameters are length-limited, stripped of control characters and angle brackets, and always rendered as text, never as HTML.

## 8. Build and deploy

### All clients on one site (current GitHub Pages setup)

```bash
npm run build
```

This produces `dist/` with the default client at the root and every client at `/<slug>/`, each page with its own title and preview description:

```
https://sachinsahoo28.github.io/wedding-invitation-premium/               → default client
https://sachinsahoo28.github.io/wedding-invitation-premium/aarav-meera/
https://sachinsahoo28.github.io/wedding-invitation-premium/rohan-ananya/
```

`.github/workflows/deploy.yml` runs this on every push to `main`. Share `/<slug>/` links rather than `?client=` links: the static preview tags that WhatsApp reads are baked into each `/<slug>/` page.

### One client as a standalone site

```bash
npm run build:client -- priya-arjun
```

`dist/` then contains only that client's config and media. The root always shows that client, so it suits a dedicated domain or a separate repo. Deploy `dist/` to:

- **Vercel / Netlify:** set the build command to `npm run build:client -- priya-arjun` and the output to `dist`.
- **A separate GitHub Pages repo:** reuse `deploy.yml`, replacing `npm run build` with the command above.

Asset paths are relative, so either build works at a domain root or under any sub-path. To change which client the root of the all-clients site shows, edit `defaultClient` in `src/config/wedding.config.js`.

## 9. Validation

On every load the config is checked. **Errors** block rendering and are listed in full on screen during development; guests on a production site see a polite "not available" page instead:

- missing or invalid `clientId` / `slug`, or a slug that doesn't match its file name
- leftover `REPLACE_ME` placeholders
- missing groom or bride first name
- missing or invalid `wedding.date`
- every content section disabled
- media outside the client's own folder
- events without names, or duplicate event ids

**Warnings** (in the dev console) flag optional gaps such as no video, no map link, an unknown theme (falls back to Royal Heritage) or an invalid event time (shown as "Date TBA").
