import { useState } from 'react'
import { Scene } from '../components/Scene'
import { Tag, type TagKind } from '../components/Tag'
import { rv } from '../components/reveal'
import type { SourceKey } from '../data/evidence'
import type { SceneProps } from '../types'

const ACT = 'Research → software'

/* 06 ──────────────────────────────────── But who was going to build it? */
export function S06({ step }: SceneProps) {
  const seats = ['product manager', 'UX researcher', 'designer', 'iOS engineer', 'QA', 'release manager']
  return (
    <Scene n={6} act={ACT}>
      <div className="s06 m-stack">
        <div>
          <h2 className="h1" style={{ maxWidth: '9em' }}>
            But who was going to <span className="it">build</span> it?
          </h2>
          <p className="lede" style={{ marginTop: '1em' }}>
            A transportation researcher. Not a funded app-development organization.
          </p>
        </div>
        <div className="s06-org" aria-label="An org chart with one filled seat — a researcher — and six empty seats.">
          <div className="s06-seat me">a researcher</div>
          {seats.map((s) => (
            <div key={s} className="s06-seat empty">
              {s}?
            </div>
          ))}
        </div>
      </div>
      <div className={`s06-bridge ${rv(step, 1)}`}>
        <p className="h2">
          AI changed what I could <span className="accent it">implement</span>.
          <br />
          It didn’t decide what was worth building.
        </p>
        <p className="small muted" style={{ marginTop: '1em', display: 'flex', gap: '0.6em', flexWrap: 'wrap', alignItems: 'center' }}>
          In the workflow: <Tag kind="repo" src="claudePRs">Claude Code — PRs</Tag>
          <Tag kind="repo" src="codexCommits">Codex — PR review</Tag>
          <Tag kind="speaker" src="chatgpt">ChatGPT — exploration</Tag>
        </p>
      </div>
    </Scene>
  )
}

/* 07 ─────────────────────────────── The research-to-product translation */
export function S07({ step }: SceneProps) {
  return (
    <Scene n={7} act={ACT}>
      <h2 className="h2" style={{ maxWidth: '18em' }}>The translation problem.</h2>
      <div className="s07 m-stack">
        <article className="s07-book research paper-card">
          <p className="label">Research notebook · wants</p>
          <ul>
            <li>valid observations</li>
            <li>interpretable trips <span className="xs muted mono">(person-day, trip, mode, purpose)</span></li>
            <li>privacy</li>
            <li>people who keep using it</li>
            <li>limits stated plainly</li>
          </ul>
        </article>
        <article className={`s07-book product paper-card ${rv(step, 1)}`}>
          <p className="label">Product notebook · must survive</p>
          <ul>
            <li>onboarding &amp; “Always Allow” location</li>
            <li>battery</li>
            <li>messy traces — indoor drift, subway blackouts</li>
            <li>ambiguity</li>
            <li>maintenance &amp; schema migrations</li>
            <li>platform review</li>
          </ul>
        </article>
        <div className={`s07-overlap ${rv(step, 2)}`}>
          <p className="label accent">both</p>
          <p className="note-hand">correction</p>
          <p className="note-hand">honest uncertainty</p>
          <p className="note-hand">trust</p>
        </div>
      </div>
    </Scene>
  )
}

/* 08 ───────────────────────────────────────────── A living decision log */
interface Entry {
  verb: string
  text: string
  detail: string
  state: 'kept' | 'revised' | 'rejected' | 'deferred'
  tag: [TagKind, SourceKey, string]
}

const LOG: Entry[] = [
  { verb: 'define', text: 'A travel survey of one: one person, every day.', detail: 'Keep the classic HHTS concepts (person-day, trip, segment, mode, purpose, tour) so the data sits next to real survey datasets.', state: 'kept', tag: ['repo', 'story', 'story'] },
  { verb: 'constrain', text: 'Local-first. No account, no server.', detail: 'Location history is about as sensitive as personal data gets. The only feature that sends a coordinate anywhere — address lookup — is off unless switched on.', state: 'kept', tag: ['repo', 'localFirst', 'README'] },
  { verb: 'minimum', text: 'Automatic first; correction cheap; “unknown” is acceptable.', detail: 'Manual diaries die within a week. Raw data is append-only; corrections are locked against rebuilds and audit-logged.', state: 'kept', tag: ['repo', 'layers', '3 layers'] },
  { verb: 'inspect', text: 'Field test: the diary lags for hours. Hypothesis — indoor GPS drift.', detail: 'The first explanation in issue #4 blamed drift and collector thrashing.', state: 'revised', tag: ['repo', 'issue4', '#4'] },
  { verb: 'revise', text: 'Replay says: not drift. A deleted open visit suppressed every later stay.', detail: 'Replaying a copy of the phone database: 16 stays detected, 0 visits written. Fix + a test that fails before and passes after.', state: 'kept', tag: ['repo', 'pr9', 'PR #9'] },
  { verb: 'retest', text: 'Calibrate on held-out days, frozen before tuning.', detail: 'Whole-day time agreement 0.827 → 0.939 on 5 validation days. Tradeoff accepted and written down: nearby stops now merge more often.', state: 'kept', tag: ['repo', 'pr52', 'PR #52'] },
  { verb: 'reject', text: 'An automatic accessibility “--fix”.', detail: 'It deleted views and kept only modifier chains; the app no longer compiled. Fixes were made by hand instead.', state: 'rejected', tag: ['repo', 'pr84', 'PR #84'] },
  { verb: 'defer', text: 'Experimental logger stays a separate app.', detail: 'Do not alter production sampling or inference for an experiment. Collect paired evidence first.', state: 'deferred', tag: ['future', 'issue48', '#48 open'] },
  { verb: 'release', text: 'v2.1.0 + App Store release kit.', detail: '14 GitHub releases in four weeks, archived on Zenodo. App Store: submitted, not live.', state: 'kept', tag: ['repo', 'releases', 'releases'] },
]

export function S08({ step }: SceneProps) {
  const [open, setOpen] = useState<number | null>(4)
  return (
    <Scene n={8} act={ACT} aside="decision log · from the repository">
      <div className="s08 m-stack">
        <div className="s08-head">
          <h2 className="h2">
            The build is a series of <span className="it">decisions</span>, not a prompt.
          </h2>
          <p className="small muted" style={{ marginTop: '1em' }}>
            Click an entry. Loops, reversals and refusals are part of the method.
          </p>
          <div className="s08-legend legend" style={{ marginTop: '1.4em' }}>
            <span><span className="s08-dot kept" /> kept</span>
            <span><span className="s08-dot revised" /> revised</span>
            <span><span className="s08-dot rejected" /> rejected</span>
            <span><span className="s08-dot deferred" /> deferred</span>
          </div>
        </div>
        <ol className="s08-log">
          {LOG.map((e, i) => (
            <li key={i} className={`s08-entry ${e.state} ${rv(step, i < 4 ? 0 : 1)} ${open === i ? 'open' : ''}`}>
              <span className={`s08-dot ${e.state}`} aria-hidden="true" />
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} data-keys="own">
                <span className="mono xs s08-verb">{e.verb}</span>
                <span className={e.state === 'rejected' || e.state === 'revised' ? 's08-struck' : ''}>{e.text}</span>
              </button>
              {open === i && (
                <div className="s08-detail small">
                  {e.detail} <Tag kind={e.tag[0]} src={e.tag[1]}>{e.tag[2]}</Tag>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  )
}

/* 09 ───────────────────────────── An organization, not just a code editor */
const FUNCTIONS: [string, string, string, SourceKey][] = [
  ['Research', 'research / domain lead', 'calibration protocol, Validation page, limitations', 'validation'],
  ['Product', 'product manager', 'issues with acceptance criteria (#32, #56), Roadmap', 'issue56'],
  ['Design', 'UX + visual designer', 'sticker-style UI redesign (#28), UI guide', 'readme'],
  ['Engineering', 'iOS / data engineers', 'HHTCore package, zero dependencies; no backend', 'readme'],
  ['QA', 'QA team', 'core test suite, XCUITest flows, review fixes', 'tests'],
  ['Release', 'release manager', 'CHANGELOG, 14 releases, App Store kit, DOI', 'releases'],
  ['Docs & community', 'technical writer', 'docs site, CONTRIBUTING, SECURITY, Code of Conduct', 'readme'],
]

export function S09({ step, active }: SceneProps) {
  return (
    <Scene n={9} act={ACT}>
      <div className="s09-head">
        <p className="label">Development is an organization</p>
        <h2 className="h2" style={{ marginTop: '0.3em' }}>
          I didn’t have a software company.
          <br />
          <span className="it">I still had to make company-level decisions.</span>
        </h2>
      </div>
      <table className={`s09-table ${active ? 'play' : ''}`}>
        <thead>
          <tr>
            <th scope="col">function</th>
            <th scope="col">in a product team, typically</th>
            <th scope="col">here — the artifact it left</th>
          </tr>
        </thead>
        <tbody>
          {FUNCTIONS.map(([f, team, art, src], i) => (
            <tr key={f} style={{ animationDelay: `${150 + i * 140}ms` }}>
              <th scope="row" className="serif">{f}</th>
              <td className="muted">{team}</td>
              <td>
                {art} <Tag kind="repo" src={src}>repo</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={`s09-gap ${rv(step, 1)}`}>
        <span className="note-hand">Same functions, performed differently — with gaps a team would catch.</span>
        <span className="small muted"> Not yet done by specialists: independent security review, user studies with participants, ethics/IRB for others’ data.</span>
      </p>
    </Scene>
  )
}
