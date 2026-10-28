# Evidence register

Every substantive claim in the talk, where it comes from, and how it is labelled on screen.
On-screen provenance tags use five kinds: **Verified in repo**, **Research rationale**, **Illustrative**,
**Future work**, **Speaker account**. Click a tag in the deck to see its source; the same register lives in
[`src/data/evidence.ts`](src/data/evidence.ts).

Sources were checked on 2026-10-28 against:

- TripLibre repository, `main` at `048a8d2` (2026-10-25) — <https://github.com/zyang91/TripLibre>
- GitHub issues and pull requests on that repository (read with `gh`)
- Project site <https://hhtdiary.org/triplibre/> (HTTP 200) and its story, developer and validation pages
- The speaker’s site: telework thesis page and CV (`zyang91.github.io`)

## Act I — before the app

| Scene | Claim | Source | Tag |
|---|---|---|---|
| 01 | Interest in HHTS began in Erick Guerra’s Introduction to Transportation Planning course at Penn | Speaker (missing-facts resolution, 2026-10-28) | Speaker account |
| 01 | Blank trip-diary row | Drawn for the talk; no respondent data | Illustrative |
| 02 | Thesis uses Twin Cities Travel Behavior Inventory, 2019 · 2021 · 2023; 34,800 person-days; 19,164 workers | Telework thesis page; CV (Penn MCP thesis, advisor Erick Guerra) | Verified (thesis page) |
| 02 | Nonlinear relationship between daily telework hours and weekday trips; turning point ≈ 3.3 h | Speaker: 2026 Penn MCP thesis. Shown as a **schematic redraw** with no y values until the thesis figure is supplied (`MEDIA.thesisFigure` in `src/data/facts.ts`). The public research page’s 2.7–2.9 h describes the related manuscript, which is under review; the slide attributes the result to the thesis only | Speaker account + Illustrative |
| 03 | “I participated in Philadelphia’s Household Travel Survey effort” — direct exposure to implementation challenges | Speaker. No operational responsibilities claimed. Issue #48 separately references observations from that survey | Speaker account |
| 03 | GPS trace wandered while the participant sat still | Issue #48 (qualitative screenshots, not a benchmark). Drawing on screen is a redraw | Verified + Illustrative |
| 04 | “Continuity of a tool ≠ continuity of a validated sample” | Brief + README research limitations | Research rationale |
| 05 | Raw → inferred → corrected layers; raw never overwritten | Story page §04; README | Verified |
| 05 | No account, no server, no analytics; export when you choose | README; privacy docs | Verified |
| 05 | Pattern of recorded/paused/corrected days | Drawn | Illustrative |

## Act II — research → software

| Scene | Claim | Source | Tag |
|---|---|---|---|
| 06 | Claude Code used for implementation | 45 of 57 PR bodies end “Generated with Claude Code”; story page: “Claude wrote much of the Swift and the tests” | Verified |
| 06 | Codex used for PR review | `chatgpt-codex-connector` reviews on PRs; 8 commits on `main` cite a Codex finding | Verified |
| 06 / 11 | ChatGPT: upstream product development — research-to-product translation, feature prioritization, technical trade-offs, task decomposition, design-alternative review | Speaker. GitHub records repository activity, not these upstream conversations | Speaker account |
| 06 | Roles: Zhanchao — research direction, product ownership, architecture, acceptance; ChatGPT — reasoning, planning, critique, coordination; Claude Code — implementation; Codex — review | Speaker; Claude Code and Codex roles also visible in PRs | Speaker account + Verified |
| 08 | Field-test lag first blamed on indoor GPS drift | Issue #4 | Verified |
| 08 | Replay showed a deleted open visit suppressed later stays (16 stays, 0 visits) | PR #9 body | Verified |
| 08 | Calibration: frozen day split; whole-day agreement 0.827 → 0.939 on 5 held-out days; nearby stops merge more | PR #52; Validation page | Verified |
| 08 | a11y auto-fix deleted views; rejected | PR #84 | Verified |
| 08 | Experimental logger kept separate from production | Issue #48 (open) | Future work |
| 08 / 09 | 14 GitHub releases (v0.1.0 2026-09-28 → v2.1.0 2026-10-25); Zenodo DOI | GitHub releases; CHANGELOG | Verified |
| 09 | Artifacts per function (tests, CI, docs, CONTRIBUTING, SECURITY, CoC, release kit) | Repository tree; README | Verified |
| 09 | Not yet done by specialists: security review, participant user studies, ethics/IRB for others’ data | Absence in repo; README notes IRB is usually needed | Research rationale |

## Act III — orchestration

| Scene | Claim | Source | Tag |
|---|---|---|---|
| 10 | Coordination comparison | Conceptual model; no time/cost multiplier measured | Research rationale |
| 11 | Lane task lists | Representative task types, not an inventory | Illustrative |
| 11 | PR #81 proposed deleting a chart to pass an audit; closed; chart fixed in #82 | PR #81 (closed, unmerged); PR #82 (merged) | Verified |
| 11 | CI runs Swift tests, export→Python contract check, simulator + device builds, lint; XCUITest local only | README “Development” | Verified |
| 11 | “Checked every trip against days I had actually lived” | Story page §06 | Verified |
| 11 / 17 | v2.1.0 submitted 2026-10-25; last confirmed “Waiting for Review”; manual release targeting 2026-11-02; not live | Speaker. Editable in `src/data/facts.ts` (`APP_STORE`); a store URL there adds the link and QR code | Speaker account |
| 12 | Routing weights (leads / contributes) | Speaker’s practice; not measured | Research rationale |
| 13 | Issue #32 spec, incl. “precise click-time GPS fix should not be treated as ground truth” | Issue #32 | Verified |
| 13 | PR #53 files, rules, ≈110 m coarse location, “Generated with Claude Code” | PR #53 body and file list | Verified |
| 13 | Codex P2: stamp 10 s after a stay → stop shorter than 60 s minimum (review estimated ≈39 s) | Inline review on PR #53 | Verified |
| 13 | Fix 8a26c25; test `shortStopKeepsItsMinimumNextToAStay`; 34 s → 60 s | Commit + reply on PR #53 | Verified |
| 13 | Which tool wrote which line | **Not recorded by git; not claimed** | — |

## Act IV — judgment

| Scene | Claim | Source | Tag |
|---|---|---|---|
| 14 | Place types are user-labelled, not automatic POI detection | Issue #56 (“not a requirement to automatically detect POI types”); PR #59 | Verified |
| 14 | Mode from speed + CoreMotion rules; corrections feed back; “needs review” below 0.5 confidence | `docs/inference.md` §4 | Verified |
| 14 | Diary agent has no language model; keyword routing over the local DB | PR #72 | Verified |
| 14 | Can’t tell bus from car without transit schedules | Story page §05 | Verified |
| 14 | Option A consequences | Reasoned tradeoffs | Research rationale |
| 15 | POI coverage differs across Philadelphia, Qingdao, limited-capacity cities | General reasoning; maps are drawings; **no coverage measured** | Illustrative |
| 15 | Limited-capacity cities initiative | Roadmap / Vision — exploratory | Future work |
| 16 | 112 tests incl. 14 synthetic scenarios | README (PR #72 later reports 120 `swift test` cases; the talk uses the README figure) | Verified |
| 16 | Synthetic days: commutes, drift, subway blackouts, flights, midnight + DST crossings | Story page §04 | Verified |
| 16 | a11y static score 21.3 → 98.0 | PR #84; CHANGELOG 2.1.0 | Verified |
| 16 | All accuracy numbers: one person, 17 days | Validation page | Verified |
| 16 | Formal benchmark, other people/phones/cities, paired logger | README “Planned”; issue #48 | Future work |
| 17 | Screenshots | `release/screenshots/iphone-6.9/` in the repo (simulator, demo data), resized | Verified |
| 17 | Apache-2.0, DOI 10.5281/zenodo.23307589 | LICENSE; README; CITATION.cff | Verified |
| 17 | Product visuals are App Store screenshots (simulator, demo data), not recorded activity | Repository release kit. A real recording can be added via `MEDIA.demoVideo` | Verified |

## Act V — the bill, and when to stop

| Scene | Claim | Source | Tag |
|---|---|---|---|
| 18 | What changed / what didn’t | Speaker’s assessment | Research rationale |
| 19 | Tokens / dollars / hours | **Not tracked / not verified** — shown as such | — |
| 19 | 8 commits fix a Codex finding | `git log --oneline \| grep -i codex` on `main` | Verified |
| 19 | Copilot: “reached their quota limit” | Copilot review on PRs #9, #52, #53, #59 | Verified |
| 19 | CodeRabbit skipped: fewer than 10 stars | CodeRabbit comments on PRs #72, #84 | Verified |
| 19 | Hidden receipt lines | Qualitative categories; no quantities | Illustrative |
| 20 | Task → capability policy; effort meter | Reasoned policy; effort is illustrative; no prices, benchmarks or rankings | Illustrative |
| 21 | Build / defer / reject / revisit board | README status table (Available / Planned / Exploratory); PR #72 (no LLM) | Verified |
| 22 | Speaker, affiliation (Penn, Weitzman School of Design), GIS Day 2026, email | Speaker | Speaker account |
| 22 | Links | Repository and project site both resolve (checked 2026-10-28) | Verified |
