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
| A | App UI — TripLibre’s sticker style (default) | `app` |
| B | Tech — dark console, lime signal | `tech` |
| C | Academic — journal page, serif, crimson | `academic` |
| D | Minimal — airy, sage, one sans | `minimal` |
| E | Notebook — the original field-notebook look | `notebook` |

Pick one with the buttons on the cover, the control bar, or `t`. The browser remembers the choice;
a `?theme=` link (e.g. `/?theme=academic#/scene-01`) always wins, so you can send the right look to the right audience.
Themes only change tokens and texture in [`src/themes.css`](src/themes.css); layouts are shared.

- Deep links: `#/scene-10` opens a scene; `#/scene-10/2` opens it at build step 2.
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
| Speaker notes (proposed script; `[CONFIRM]` marks facts only the speaker can supply) | [`src/data/notes.ts`](src/data/notes.ts) |
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

## Missing assets and facts that would improve fidelity

1. **Speaker’s role in the Philadelphia household travel survey** (scene 03). Only issue #48 references the survey; the
   role is left for the speaker to state.
2. **App Store status on the day** (scenes 11, 17). Confirm “submitted / in review / live” and, if live, add the App
   Store link and a QR code.
3. **Evidence of ChatGPT’s role** (scenes 06, 11). The repo shows Claude Code (PR footers) and Codex (reviews), not ChatGPT
   conversations. A dated excerpt or the speaker’s own summary would let the tag move from “Speaker account” to evidence.
4. **Real usage or billing data** (scene 19). Provider exports with period and units would replace “Not tracked”.
5. **A short screen recording** of correcting a trip or stamping a stop on a real day (scene 17).
6. **The original GPS-drift screenshots** referenced in issue #48, if shareable and de-identified (scene 03 uses a
   redraw).
7. **Thesis figure** from the manuscript once published, to replace the simplified redrawing (scene 02).
8. **Coursework origin details** (scene 01): which course or dataset first introduced HHTS, for the opening story.
9. **Talk date, venue and contact line** for the closing scene.
