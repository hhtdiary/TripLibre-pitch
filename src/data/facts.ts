// Facts that change over time. Edit here; every scene reads from this file.

export const APP_STORE = {
  version: '2.1.0',
  submittedOn: '2026-10-25',
  /** Current public status. */
  status: 'Available on the App Store',
  lastConfirmed: 'November 2026',
  release: 'Released after App Store review (manual release, targeted 2026-11-02)',
  /** Public App Store link. When set, scenes link to it and the closing scene shows its QR code. */
  url: 'https://apps.apple.com/us/app/triplibre-your-trip-diary/id6826907636' as string | null,
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
