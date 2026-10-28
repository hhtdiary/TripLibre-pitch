// Source register behind every provenance tag. evidence.md is the
// human-readable version; keep the two in step when adding claims.

const GH = 'https://github.com/zyang91/TripLibre'

export const LINKS = {
  repo: GH,
  site: 'https://hhtdiary.org/triplibre/',
  docs: 'https://hhtdiary.org/triplibre/docs/',
  story: 'https://hhtdiary.org/triplibre/story/',
  roadmap: 'https://hhtdiary.org/roadmap/',
  validation: 'https://hhtdiary.org/triplibre/docs/validation.html',
  doi: 'https://doi.org/10.5281/zenodo.23307589',
  thesis: 'https://zyang91.github.io/pages/telework.html',
} as const

interface Source {
  text: string
  href?: string
}

export const SOURCES = {
  thesis: {
    text: 'Telework thesis page and CV: Twin Cities Travel Behavior Inventory, 2019 · 2021 · 2023 waves; 34,800 person-days, 19,164 workers. Manuscript under review; figures are simplified redrawings.',
    href: LINKS.thesis,
  },
  phillyRole: {
    text: 'Issue #48 references observations from the Philadelphia household travel survey (smartphone GPS, run by ETC). The speaker’s exact role is to be stated by the speaker; nothing more is claimed here.',
    href: `${GH}/issues/48`,
  },
  drift48: {
    text: 'Issue #48: in the Philadelphia survey, GPS traces wandered while the participant stayed seated (screenshots treated as qualitative only).',
    href: `${GH}/issues/48`,
  },
  readme: {
    text: 'README: “What it does today” table, project layout, research limitations.',
    href: `${GH}#what-it-does-today`,
  },
  story: {
    text: 'Project story page: “I wrote the brief, made the design calls and checked every trip… Claude wrote much of the Swift and the tests.”',
    href: LINKS.story,
  },
  localFirst: {
    text: 'README + privacy docs: no account, no server, no analytics; data stays on the phone unless exported. Optional geocoder sends a coordinate only if switched on.',
    href: `${GH}#readme`,
  },
  layers: {
    text: 'Story page §04: raw (append-only) → inferred (rebuildable) → corrected (locked, audit-logged).',
    href: LINKS.story,
  },
  issue56: {
    text: 'Issue #56: “primarily a manual place classification and UI improvement, not a requirement to automatically detect POI types.” Shipped in PR #59 (v1.3.0).',
    href: `${GH}/issues/56`,
  },
  pr59: {
    text: 'PR #59: 15 → 28 place categories, grouped searchable picker, user-named types under Other.',
    href: `${GH}/pull/59`,
  },
  modeRules: {
    text: 'docs/inference.md §4: per-interval class from speed + CoreMotion; corrections between the same places feed back; “needs review” when confidence < 0.5.',
    href: `${GH}/blob/main/docs/inference.md`,
  },
  busCar: {
    text: 'Story page: “What it can’t do yet: tell a bus from a car without transit schedules, or catch very short access walks.”',
    href: LINKS.story,
  },
  issue32: {
    text: 'Issue #32 (owner’s spec): one-tap stamp; “The precise click-time GPS fix should not be treated as ground truth.”',
    href: `${GH}/issues/32`,
  },
  pr53: {
    text: 'PR #53: StampAnchoring, coarse location (≈110 m), stamps never override user edits. Body ends “Generated with Claude Code”.',
    href: `${GH}/pull/53`,
  },
  codex53: {
    text: 'Codex review on PR #53 (P2): a stamp 10 s after a stay produced a ≈39 s visit despite a 60 s minimum.',
    href: `${GH}/pull/53`,
  },
  fix53: {
    text: 'Commit 8a26c25 + reply on PR #53: padding moves to the other side; new test shortStopKeepsItsMinimumNextToAStay (34 s before, 60 s now).',
    href: `${GH}/commit/8a26c25`,
  },
  pr9: {
    text: 'PR #9: replaying the field database showed the lag was not GPS drift — a deleted open visit suppressed every later stay. New failing-then-passing test.',
    href: `${GH}/pull/9`,
  },
  issue4: {
    text: 'Issue #4: Atlanta field test; first hypothesis blamed indoor GPS drift.',
    href: `${GH}/issues/4`,
  },
  pr52: {
    text: 'PR #52: replay harness; day-level split frozen before tuning; round 1 whole-day agreement 0.827 → 0.939 on 5 held-out days; tradeoff: nearby stops merge more often.',
    href: `${GH}/pull/52`,
  },
  issue46: {
    text: 'Issue #46: “Human-corrected ≠ automatically exact ground truth”; separate calibration from validation.',
    href: `${GH}/issues/46`,
  },
  pr84: {
    text: 'PR #84: the a11y tool’s automatic --fix deleted views and broke the build; rejected, fixes made by hand. Score 21.3 → 98.0.',
    href: `${GH}/pull/84`,
  },
  pr72: {
    text: 'PR #72: opt-in “Diary agent” tab. “There is no language model”: keyword routing over the local database.',
    href: `${GH}/pull/72`,
  },
  issue48: {
    text: 'Issue #48 (open): separate research logger; “do not alter HHT’s current sampling, inference… for this experiment.”',
    href: `${GH}/issues/48`,
  },
  validation: {
    text: 'Validation page: all accuracy numbers so far come from one person’s phone over 17 days.',
    href: LINKS.validation,
  },
  tests: {
    text: 'README: core suite of 112 tests incl. 14 synthetic scenarios; CI runs Swift tests, export→Python contract check, simulator + device builds. XCUITest runs locally only.',
    href: `${GH}#development`,
  },
  codexCommits: {
    text: '8 commits in main explicitly address Codex review findings (e.g. a3541d4, 8a26c25, bdaf104).',
    href: `${GH}/commits/main`,
  },
  claudePRs: {
    text: '45 of 57 pull-request bodies end with “Generated with Claude Code”. Git does not record which tool wrote which line.',
    href: `${GH}/pulls?q=is%3Apr`,
  },
  copilotQuota: {
    text: 'Copilot’s review on PRs #9, #52, #53, #59: “unable to review… reached their quota limit.” CodeRabbit skipped: repo has fewer than 10 stars.',
    href: `${GH}/pull/52`,
  },
  appStore: {
    text: 'README: App Store release “in progress”; CHANGELOG Unreleased: release kit, privacy manifests (#41). Submission/review status per speaker, late Oct 2026; not verified as live.',
    href: `${GH}/issues/41`,
  },
  releases: {
    text: 'GitHub releases v0.1.0 (2026-09-28) → v2.1.0 (2026-10-25); Zenodo DOI 10.5281/zenodo.23307589.',
    href: `${GH}/releases`,
  },
  chatgpt: {
    text: 'ChatGPT as an exploration/critique partner is the speaker’s account; the repository shows Codex (ChatGPT’s code reviewer) on PRs, not chat transcripts.',
  },
  limitedCities: {
    text: 'Roadmap/Vision: open, affordable collection incl. self-hosted options for cities with limited capacity — exploratory, not built.',
    href: LINKS.roadmap,
  },
} satisfies Record<string, Source>

export type SourceKey = keyof typeof SOURCES
