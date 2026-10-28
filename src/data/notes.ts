// Speaker notes: proposed script, first person, not quotations.
// [CONFIRM] marks a fact only the speaker can supply.
// Cues in {braces} describe what to click.

export const NOTES: Record<number, string[]> = {
  0: [
    'Title. Pick the theme for this room before you start: buttons top-right, or press t.',
    'Then → to scene 01.',
  ],
  1: [
    'Let me start before there was an app, and before there was any AI in this story.',
    'My interest in household travel surveys began in Erick Guerra’s Introduction to Transportation Planning course at Penn. That grew into my research on telework and travel behavior, other transportation research, and eventually TripLibre.',
    'A household travel survey turns a day into rows: a trip starts, a trip ends, here is the mode and here is the purpose. An ordinary Tuesday becomes a research observation.',
    '{→ reveal the three lines, then the blank diary row}. The row is blank on purpose. I’m not showing anyone’s real diary.',
  ],
  2: [
    'My MCP thesis used three waves of the Twin Cities Travel Behavior Inventory: 2019, 2021 and 2023. I measured telework in hours rather than yes or no. The relationship with weekday trip-making is nonlinear: it rises, then turns at around 3.3 hours of telework.',
    'The curve here is a schematic; the thesis figure replaces it when available. The related journal manuscript is still under review, so I attribute this to the thesis.',
    'The thing I want you to notice is the shape of the evidence: every person in that study gives us one weekday. A wave is a photograph. The diary is a powerful instrument — and a bounded record.',
  ],
  3: [
    'Then I participated in Philadelphia’s household travel survey effort. That gave me direct exposure to the challenges of implementing a travel survey.',
    'When you only analyse the records, the trace is the truth. When you are close to collection, you see how hard the observations are to get right — a GPS trace can wander around a building while the person sits still. (The drawing is a redraw, not a real trace.)',
    'This is a research note, not a criticism of the survey. Every collection method makes tradeoffs. I just started seeing them.',
  ],
  4: [
    'So the question changed. {→} One day. {→} One wave. {→} Years.',
    'I had spent years asking what travel diaries could tell us. Eventually I started asking why the diary had to end. {→}',
    '{→ AUTONOMY} Pause here. Who decides when data gets collected? Who can correct a wrong trip? Can the tool outlive the study that started it?',
    'Careful: continuity of a tool is not continuity of a research sample. Whether anyone keeps using it, and whether those people represent anyone, are open research problems.',
  ],
  5: [
    'Two time logics. A survey campaign is bounded: recruit, collect the diary day, close, weight, release. That’s a feature. It is how you get a representative, harmonized dataset.',
    'TripLibre runs on a different clock: always available, you can pause, you can correct. That is an exploratory complement, not a replacement. Household travel surveys stay indispensable for sampling, weighting and comparability.',
  ],
  6: [
    'There was one problem with this ambition. I’m a transportation researcher. Not a funded app company.',
    '{→} Only here does AI enter the story. AI changed what I could implement. It didn’t decide what was worth building.',
    'Who did what: I set the research direction, owned the product, made architecture decisions and gave final acceptance. ChatGPT helped upstream — product and technical reasoning, planning, critique, coordination. Claude Code did delegated implementation. Codex reviewed code. GitHub shows the repository work; the upstream conversations are my account.',
  ],
  7: [
    'This is the translation problem. My research notebook wants valid observations, interpretable trips, privacy, and people who keep using the tool.',
    'The product notebook has a different list: onboarding, permissions, battery, messy traces, correction, maintenance, platform review. Where they overlap — correction and trust — is where the design work actually lives.',
  ],
  8: [
    'The build was not a prompt. It was a log of decisions, and many were reversals.',
    '{click entries} The first hypothesis for a field-test bug was indoor GPS drift. Replaying the data showed it was something else entirely. The automatic accessibility fixer deleted views, so I threw its output away. The research logger stays a separate app so the production diary isn’t contaminated by experiments.',
  ],
  9: [
    'I didn’t have a software company. I still had to make company-level decisions.',
    'Each function a product team has — research, product, design, engineering, QA, release, documentation — still happened. I want to show you the artifacts they left behind in the repository, not claim I replaced a team.',
  ],
  10: [
    'This is the comparison I most want you to take away. {drag the divider or use ← →}',
    'Same demands on both sides. On the left, responsibilities are distributed: each role hands artifacts to the next through tickets, reviews and gates. Not every app needs every one of these people, or a backend.',
    'On the right, responsibilities are orchestrated: I hold the research hypothesis, priorities, requirements, acceptance criteria and sign-off. AI tools explore, draft, inspect and critique. Xcode, CI, devices and Apple stay external checks I can’t talk my way past.',
    'No speed multiplier here. I didn’t measure one. What changes is who coordinates, and who carries the risk of missing expertise: me.',
  ],
  11: [
    'This is the desk. Three lanes: what I own, what I delegate, and what counts as proof.',
    '{click a tool node} ChatGPT sits upstream: turning research goals into features, prioritizing, decomposing tasks, reviewing design alternatives. Claude Code implements. Codex reviews. CI, the phone and Apple are the checks.',
    'A suggestion isn’t accepted until it passes judgment and a reproducible check. Two AIs agreeing is not a test.',
  ],
  12: [
    'Who did what. Human: framing, needs, tradeoffs, architecture approval, correctness standards, release. AI: options, drafts, refactors, docs, test ideas, review.',
    'The roles overlap. I still implement sometimes, and AI suggestions are sometimes wrong. The routing is specific, not mystical.',
  ],
  13: [
    'One real loop, from the repository. {step through}',
    'I wrote the spec for a one-tap stamp, including the rule that the tap location is not ground truth. The implementation arrived as a pull request generated with Claude Code. An automated Codex review found an edge case: a stamp ten seconds after a stay produced a 39-second stop despite a 60-second minimum. The fix landed with a test that pins the 10-second case.',
    'Git doesn’t record which tool wrote each line, so I’m not claiming line-by-line provenance.',
  ],
  14: [
    'Here is the most interesting disagreement. {ask the room to choose}',
    'Option A: a universal automatic inference engine that guesses mode and purpose for every trip. Option B: an editable diary with transparent rules and fast correction.',
    '{reveal} We chose B for now. Place types are labelled by the user; issue 56 says outright this is not automatic POI detection. Modes use documented speed and motion rules, and your corrections feed back.',
  ],
  15: [
    'Why not just plug in a POI database? Because place data is not universal. Coverage, licensing, language and update cadence differ between Philadelphia, Qingdao and a city with limited data capacity.',
    'These three maps are drawings, not measurements. The point is that a POI inference model inherits the geography of its data. That’s data equity and measurement validity, not just code.',
  ],
  16: [
    'Testing an app is research methodology. {walk the board}',
    'What exists: a core test suite with synthetic scenario days, an export contract check in CI, accessibility checks, and a calibration on held-out days. What doesn’t yet: a formal multi-person benchmark. Every accuracy number so far comes from one person over 17 days.',
  ],
  17: [
    'Let the product speak. {toggle annotation layers}',
    'Each screen serves a research need: the day as a diary, one-tap correction, places named once, exports shaped like a survey. These are the App Store screenshots — simulator, demo data — not recorded activity.',
    'Status: open source on GitHub, Apache 2.0, with a Zenodo DOI. Version 2.1.0 was submitted on October 25 and was last confirmed as Waiting for Review, with a manual release targeting November 2. It is not live yet. (Update src/data/facts.ts on the day.)',
  ],
  18: [
    'What AI changed: the friction to prototype, implement and iterate.',
    'What it did not change: research priorities, ethical responsibility, measurement validity, product strategy and final accountability.',
  ],
  19: [
    'Now the bill. {click to tear the receipt}',
    'The visible price is a prompt. The hidden lines are correction loops, re-explaining context, re-reviews, false starts and maintenance.',
    'I don’t have tracked token or dollar totals, so the measurement panel says “Not tracked”. One real line: an automated reviewer stopped reviewing mid-project because I hit its quota. I’m not claiming this was cheaper or more expensive than a team. That counterfactual wasn’t measured.',
  ],
  20: [
    'Which model for which task? {pick a task}',
    'This is a policy, not a leaderboard. Small, testable tasks can go to a fast model. Hard architecture or debugging calls might justify a stronger one. Either way, the independent test decides, not the model.',
  ],
  21: [
    'The trap of overengineering. A universal inference engine sounds impressive. It also brings uneven POI coverage, poor transfer across regions, more edge cases and a bigger verification surface than I can maintain.',
    'My stop rule: stop adding complexity when the feature doesn’t address a verified need, can’t be tested credibly, adds more maintenance risk than I can carry, or undermines correction and transparency. And the inverse: revisit if measured error or real users justify it.',
    '{→} The feature I chose not to build. Yet.',
  ],
  22: [
    'Before I close, two thank-yous. Erick Guerra, for research mentorship, intellectual guidance and support — and for the course where this started. Eugene Brusilovskiy, for technical discussions and methodological insights.',
    'From transportation research to building research infrastructure.',
  ],
  23: [
    'If building research tools is no longer reserved for software teams, what research infrastructure should we build? And how do we avoid building the wrong thing faster?',
    'This is a transportation researcher building research infrastructure through AI-native development — not a demo of generated code. The code, docs and limitations are public; I’d love to hear what you’d build, and what you’d refuse to automate.',
  ],
}
