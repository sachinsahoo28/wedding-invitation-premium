# Royal Wedding Invitation

A cinematic Indian wedding invitation website built with React, Vite and Framer Motion.

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Customise for a client

All wedding details live in **`src/config/weddingDetails.js`**: names, parents, story, dates, events, venue, film, music and RSVP contact. The shipped values are **sample data**. Replace every field before publishing.

Media goes in `public/media/` and is referenced without a leading slash:

| Field | Example |
|---|---|
| `bride.photo`, `groom.photo` | `'media/bride.jpg'` |
| `story.photos` | `['media/s1.jpg', 'media/s2.jpg', 'media/s3.jpg']` |
| `doorsPhoto` | `'media/couple.jpg'` (revealed behind the palace doors) |
| `venue.photo` | `'media/venue.jpg'` |
| `film.src` / `film.poster` | `'media/film.mp4'` / `'media/poster.jpg'` |
| `music.src` | `'media/song.mp3'` |

An empty photo field shows a labelled placeholder ("Placeholder · add client photo"). An empty `film.src` shows a film placeholder. No stock images are used.

`public/media/music.wav` is a **generated placeholder tone** (`scripts/generate-placeholder-music.mjs`). Replace it with the client's licensed song.

For the venue, paste the client's Google Maps share link into `venue.mapsUrl`, and set `venue.mapQuery` to the exact venue name and address for the embedded map.

## Personalised invitations

- `https://your-site/` shows the **Share a personal invitation** section.
- `https://your-site/?guest=Rahul%20Ji&family=Family&note=See%20you%20there` greets the guest by name and hides the share section.

Parameters are sanitised and rendered as text, never as HTML. WhatsApp sharing opens a pre-filled message; the sender picks the contact and presses send.

## Deploy

**Vercel:** import the repo. `vercel.json` already sets `npm run build` → `dist`.

**GitHub Pages:** the Vite base is `./` (relative), so the same build works under `/<repo>/`. Push `dist/` to a `gh-pages` branch, or use a Pages workflow. If you need an absolute base, run `npm run build:gh` after editing the repo name in `package.json`.

## Behaviour notes

- Music starts when the guest taps the envelope (browsers block audible autoplay before a user gesture). It pauses automatically while the wedding film plays.
- Every animation respects `prefers-reduced-motion`.
