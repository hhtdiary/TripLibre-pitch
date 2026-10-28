// Facts that change over time. Edit here; every scene reads from this file.

export const APP_STORE = {
  version: '2.1.0',
  submittedOn: '2026-10-25',
  /** Last status confirmed by the speaker. Do not write "Live" until it is publicly available. */
  status: 'Waiting for Review',
  lastConfirmed: 'late October 2026',
  release: 'Manual release, targeting 2026-11-02',
  /** Public App Store link. Leave null until the app is live; the closing scene then shows its QR code. */
  url: null as string | null,
}

export const MEDIA = {
  /** Path under public/ to the authentic thesis figure; null shows the labelled schematic redraw. */
  thesisFigure: null as string | null,
  /** Path under public/ to a real screen recording of trip correction or a stamp; null keeps the screenshots. */
  demoVideo: null as string | null,
}

export const SPEAKER = {
  name: 'Zhanchao Yang',
  affiliation: 'University of Pennsylvania, Weitzman School of Design',
  event: 'GIS Day 2026',
  email: 'zhanchao@design.upenn.edu',
}
