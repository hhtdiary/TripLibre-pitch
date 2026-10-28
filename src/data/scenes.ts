import type { SceneDef } from '../types'
import { S00 } from '../scenes/Cover'
import { S01, S02, S03, S04, S05 } from '../scenes/ActOne'
import { S06, S07, S08, S09 } from '../scenes/ActTwo'
import { S10 } from '../scenes/S10'
import { S11, S12, S13 } from '../scenes/ActThree'
import { S14, S15, S16, S17 } from '../scenes/ActFour'
import { S18, S19, S20, S21, S22 } from '../scenes/ActFive'

const I = 'I · Before the app'
const II = 'II · Research → software'
const III = 'III · Orchestration'
const IV = 'IV · Judgment'
const V = 'V · The bill, and when to stop'

// Order, titles and build-step counts. Content lives in the components;
// speaker notes in notes.ts; sources in evidence.ts.
export const SCENES: SceneDef[] = [
  { n: 0, slug: 'cover', title: 'A travel diary that doesn’t end', act: 'Cover', steps: 0, Component: S00 },
  { n: 1, slug: 'diary', title: 'A diary of one day', act: I, steps: 2, Component: S01 },
  { n: 2, slug: 'hhts-user', title: 'I became a user of HHTS data', act: I, steps: 2, Component: S02 },
  { n: 3, slug: 'other-side', title: 'Then I saw the survey from the other side', act: I, steps: 2, Component: S03 },
  { n: 4, slug: 'question', title: 'The question changed', act: I, steps: 4, Component: S04 },
  { n: 5, slug: 'durable-tool', title: 'Not another survey. A durable tool.', act: I, steps: 2, Component: S05 },
  { n: 6, slug: 'who-builds', title: 'But who was going to build it?', act: II, steps: 1, Component: S06 },
  { n: 7, slug: 'translation', title: 'The research-to-product translation problem', act: II, steps: 2, Component: S07 },
  { n: 8, slug: 'decision-log', title: 'A series of decisions, not a prompt', act: II, steps: 1, Component: S08 },
  { n: 9, slug: 'organization', title: 'Development is an organization', act: II, steps: 1, Component: S09 },
  { n: 10, slug: 'two-orgs', title: 'Traditional vs. researcher-led development', act: III, steps: 2, tone: 'paper', Component: S10 },
  { n: 11, slug: 'desk', title: 'The orchestration desk', act: III, steps: 3, Component: S11 },
  { n: 12, slug: 'who-did-what', title: 'Who did what?', act: III, steps: 1, Component: S12 },
  { n: 13, slug: 'delegation-loop', title: 'Anatomy of one delegation loop', act: III, steps: 3, Component: S13 },
  { n: 14, slug: 'fork', title: 'Inference accuracy vs. product fit', act: IV, steps: 1, Component: S14 },
  { n: 15, slug: 'place', title: 'Why place matters', act: IV, steps: 2, Component: S15 },
  { n: 16, slug: 'testing', title: 'Testing is research methodology', act: IV, steps: 2, tone: 'wash', Component: S16 },
  { n: 17, slug: 'artifact', title: 'The actual artifact', act: IV, steps: 1, Component: S17 },
  { n: 18, slug: 'changed', title: 'What AI changed, and what it did not', act: V, steps: 2, Component: S18 },
  { n: 19, slug: 'cost', title: 'The cost of delegation', act: V, steps: 1, Component: S19 },
  { n: 20, slug: 'models', title: 'Which model for which task?', act: V, steps: 0, Component: S20 },
  { n: 21, slug: 'stop', title: 'The trap of overengineering', act: V, steps: 2, Component: S21 },
  { n: 22, slug: 'closing', title: 'A question for GIS and planning', act: V, steps: 1, Component: S22 },
]
