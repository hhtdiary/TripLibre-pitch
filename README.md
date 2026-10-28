# A Travel Diary That Doesn't End

Web presentation for a GIS Day 2026 talk by Zhanchao Yang (University of Pennsylvania) about
[TripLibre](https://github.com/zyang91/TripLibre): how a transportation researcher built a travel-diary app with AI
delegation, and what stayed human. 22 scenes, 20–26 minutes. It is a website, not a slide file: it runs on a projector
in 16:9 and as a scrolling page on a laptop or phone.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:5173>. For a production build and local preview:

```bash
npm run build && npm run preview
```

## Presenting

| Key | Action |
|---|---|
| → / Space / PageDown | next build step, then next scene |
| ← / PageUp | back |
| o | index of all scenes |
| n | speaker notes drawer |
| p | presenter window (notes, timer, next scene; stays in sync) |
| e | switch between talk mode and explore mode |
| t | next theme |
| f | fullscreen |

### Themes

Five looks over the same scenes, for different audiences and rooms:

| | Theme | `?theme=` |
|---|---|---|
| A | App UI — TripLibre’s Toon design system: ink outlines, hard shadows, bright fills (default) | `app` |
| B | Tech — dark console, lime signal | `tech` |
| C | Academic — journal page, serif, crimson | `academic` |
| D | Minimal — airy, sage, one sans | `minimal` |
| E | Notebook — the original field-notebook look | `notebook` |

Pick one with the buttons on the title cover (scene 00), the control bar, or `t`. Theme A follows the palette and rules in the
[TripLibre UI guide](https://hhtdiary.org/triplibre/docs/ui-guide.html#design-system) and uses SF Rounded on Apple devices
(Nunito elsewhere), like the app. The browser remembers the choice;
a `?theme=` link (e.g. `/?theme=academic#/scene-01`) always wins, so you can send the right look to the right audience.
Themes only change tokens and texture in [`src/themes.css`](src/themes.css); layouts are shared.

- Deep links: `#/scene-10` opens a scene; `#/scene-10/2` opens it at build step 2. `#/scene-00` is the title cover.
- `?explore` opens explore mode (all scenes stacked, every build revealed). Phones get explore mode automatically.
- Most clickers send PageDown/PageUp, which works even while an interactive element has focus.
- Interactive scenes: 08 decision log, 10 draggable divider (also ← → when focused), 11 tool nodes, 12 switchboard,
  13 loop stepper, 14 audience vote, 17 annotation layers + click-to-zoom, 19 receipt, 20 task switchboard.
- Every provenance tag is clickable and shows its source.
- Print or “Save as PDF” renders one scene per 1920×1080 page with every build revealed.

## Edit content

| What | Where |
|---|---|
| Scene order, titles, build-step counts | [`src/data/scenes.ts`](src/data/scenes.ts) |
| Speaker notes (proposed script) | [`src/data/notes.ts`](src/data/notes.ts) |
| Facts that change: App Store status/URL, thesis figure, screen recording, speaker details | [`src/data/facts.ts`](src/data/facts.ts) |
| Sources behind provenance tags | [`src/data/evidence.ts`](src/data/evidence.ts) and [`evidence.md`](evidence.md) |
| Scene layouts | `src/scenes/*.tsx`, styles in the matching `.css` |
| Design tokens (palette, type scale) | [`src/styles.css`](src/styles.css) |

All sizes are in `--u`, 1% of the 16:9 stage width, so a layout that fits at one size fits at all sizes.

## Publish to GitHub Pages

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds every pull request (typecheck + Vite) and,
on pushes to `main`, deploys `dist/` to GitHub Pages. One-time setup: *Settings › Pages › Source* → *GitHub Actions*.
The build uses a relative base path, so it works from any repository sub-path.

## Media and credits

Screenshots and the logo in `public/assets/` come from the TripLibre repository (`release/screenshots/iphone-6.9/`,
`docs/assets/`), resized; © Zhanchao Yang, Apache-2.0 (see `public/assets/TRIPLIBRE-LICENSE.txt`). The screenshots
are the App Store set: simulator, demo data. Fonts: Instrument Serif, IBM Plex Sans and IBM Plex Mono via Google Fonts
(falls back to system fonts offline). QR codes are generated locally with `qrcode`.

## Art direction

Two directions were sketched:

1. **Field notebook** — off-white paper, ink, one vermilion “trace” accent; serif headlines, mono annotations; each
   scene borrows a different research object (diary form, decision log, receipt, diff, evidence board, map tiles).
2. **Survey instrument** — a Swiss-grid form aesthetic in cobalt, with every scene as a questionnaire page.

The field notebook was chosen: it lets every scene use a different visual grammar while typography and the single
accent hold the deck together, and it reads as a researcher’s working notes rather than a product launch. The survey-form
idea survives inside it (scene 01’s blank diary row).

## Facts, and what is still missing

Resolved by the speaker (2026-10-28) and now on the slides, tagged *Speaker account*: the coursework origin (scene 01),
participation in Philadelphia's household travel survey (03), ChatGPT's upstream role and the four-way division of
roles (06, 11), the App Store submission and status (11, 17), the thesis turning point of ≈ 3.3 h (02), and the closing
contact details (22). See [`evidence.md`](evidence.md).

Still missing; each has a slot in [`src/data/facts.ts`](src/data/facts.ts) or `public/assets/`:

1. **The authentic thesis figure** (scene 02). Put it in `public/assets/` and set `MEDIA.thesisFigure`; the schematic
   redraw disappears.
2. **A real screen recording** of correcting a trip or stamping a stop (scene 17). Set `MEDIA.demoVideo`; a
   “Recording” tab appears. Until then the slide uses the App Store screenshots and says they are demo data.
3. **App Store status on the day.** Update `APP_STORE.status`; once the app is public, set `APP_STORE.url` to add the
   link and a QR code on the closing scene. Never write “Live” before then.
4. **Provider usage or billing exports** (scene 19). Until supplied the measurement panel stays “Not tracked”.
5. **De-identified GPS-drift screenshots** from the Philadelphia survey (scene 03), if they can be shared; the redraw
   stays otherwise.
