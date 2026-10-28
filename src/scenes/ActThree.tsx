import { useEffect, useState } from 'react'
import { Scene } from '../components/Scene'
import { Tag, type TagKind } from '../components/Tag'
import { rv } from '../components/reveal'
import type { SourceKey } from '../data/evidence'
import type { SceneProps } from '../types'
import { APP_STORE } from '../data/facts'

const ACT = 'Orchestration'

/* 11 ─────────────────────────────────────────── The orchestration desk */
interface Tool {
  id: string
  name: string
  kind: 'rec' | 'proof'
  x: number
  y: number
  tag: [TagKind, SourceKey | undefined]
  trace: [string, string, string, string, string]
}

const TOOLS: Tool[] = [
  { id: 'cc', name: 'Claude Code', kind: 'rec', x: 30, y: 36, tag: ['repo', 'claudePRs'], trace: ['issue spec + repo context', 'scoped change with tests', 'a pull request', 'read the diff; run it on simulator and phone', 'merged — or closed: PR #81 proposed deleting a chart to pass an audit; closed, chart fixed in #82'] },
  { id: 'cx', name: 'Codex review', kind: 'rec', x: 300, y: 18, tag: ['repo', 'codexCommits'], trace: ['the PR diff', 'adversarial code review', 'P2 findings', 'is it real? reproduce it; pin it with a test', '8 commits on main cite a Codex finding'] },
  { id: 'gpt', name: 'ChatGPT', kind: 'rec', x: 370, y: 118, tag: ['speaker', 'chatgpt'], trace: ['research goals, feature candidates, open trade-offs', 'product + technical reasoning; prioritization; task decomposition; design-alternative review', 'plans, critiques, scoped tasks', 'I decide; accepted items become issues and briefs', 'upstream decisions — not captured in git']},
  { id: 'ci', name: 'GitHub + CI', kind: 'proof', x: 10, y: 150, tag: ['repo', 'tests'], trace: ['every push and PR', 'Swift tests, export→Python contract, simulator + device builds, lint', 'pass / fail', 'a red check blocks the merge', 'proof, not opinion'] },
  { id: 'dev', name: 'Xcode + iPhone', kind: 'proof', x: 100, y: 222, tag: ['repo', 'story'], trace: ['a build', 'compile; demo days in the simulator; real days on the phone', 'behaviour on days I lived', '“checked every trip against days I had actually lived”', 'field bugs become issues (#4, #5)'] },
  { id: 'asc', name: 'App Store review', kind: 'proof', x: 300, y: 222, tag: ['speaker', 'appStore'], trace: ['release kit, privacy manifests', 'external review by Apple', 'approve / reject', 'outside my control', `v${APP_STORE.version} submitted ${APP_STORE.submittedOn} · ${APP_STORE.status}`] },
]

const LANES: [string, string, string[], TagKind | null][] = [
  ['Research / product ownership', 'human-led', ['What is the research question?', 'Unit of observation?', 'What must a user be able to correct?', 'Which feature now?', 'Which risk can’t be delegated?'], null],
  ['Delegated inquiry / implementation', 'AI-assisted', ['alternative designs', 'library / API investigation', 'Swift + UI prototypes', 'code changes', 'test ideas', 'docs drafts', 'review-style critique'], 'illus'],
  ['Validation / infrastructure', 'observable evidence', ['commits + PRs', 'test suite', 'Xcode builds', 'simulator + phone days', 'App Store Connect'], null],
]

const LOOP = ['Frame', 'Delegate', 'Compare', 'Decide', 'Implement', 'Test', 'Reject · revise · ship']

export function S11({ step }: SceneProps) {
  const [sel, setSel] = useState('cc')
  const tool = TOOLS.find((t) => t.id === sel)!
  return (
    <Scene n={11} act={ACT} aside="the decision desk">
      <h2 className="h2 s11-title">Who gets which task — and how do I decide?</h2>
      <div className="s11 m-stack">
        <div className="s11-lanes">
          {LANES.map(([name, who, items, tagKind], i) => (
            <section key={name} className={`s11-lane lane-${i} ${rv(step, i === 0 ? 0 : 1)}`}>
              <header>
                <span className="label">{who}</span>
                <span className="h3">{name}</span>
              </header>
              <ul>
                {items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              {tagKind && <Tag kind={tagKind}>representative task types</Tag>}
            </section>
          ))}
        </div>

        <div className={`s11-net ${rv(step, 2)}`}>
          <div className="s11-graph">
          <svg viewBox="0 0 480 260" className="s11-svg" aria-hidden="true">
            {TOOLS.map((t) => (
              <line key={t.id} x1="240" y1="130" x2={t.x + 50} y2={t.y + 12} className={`${t.kind} ${sel === t.id ? 'sel' : ''}`} />
            ))}
            <circle cx="240" cy="130" r="44" className="me" />
            <text x="240" y="126" textAnchor="middle" className="me-t">decision-</text>
            <text x="240" y="144" textAnchor="middle" className="me-t">maker</text>
          </svg>
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              data-keys="own"
              className={`s11-node ${t.kind} ${sel === t.id ? 'sel' : ''}`}
              style={{ left: `${(t.x / 480) * 100}%`, top: `${(t.y / 260) * 100}%` }}
              aria-pressed={sel === t.id}
              onClick={() => setSel(t.id)}
            >
              {t.name}
            </button>
          ))}
          </div>
          <div className="s11-trace" aria-live="polite">
            <div className="s11-trace-head">
              <span className="h3" style={{ fontSize: 'var(--t-body)' }}>{tool.name}</span>
              <Tag kind={tool.tag[0]} src={tool.tag[1]} />
            </div>
            <ol>
              {['inputs', 'delegated task', 'output', 'human review', 'accepted / rejected'].map((k, i) => (
                <li key={k}>
                  <span className="mono xs muted">{k}</span>
                  <span>{tool.trace[i]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className={`s11-foot ${rv(step, 3)}`}>
        <ol className="s11-loop mono" aria-label="Feedback loop">
          {LOOP.map((l, i) => <li key={l} className={i === LOOP.length - 1 ? 'last' : ''}>{l}</li>)}
        </ol>
        <div className="legend">
          <span><i className="dash" />recommendation</span>
          <span><i />decision</span>
          <span><i className="proof" />proof</span>
        </div>
        <p className="note-hand">Two AIs agreeing is not a test.</p>
      </div>
    </Scene>
  )
}

/* 12 ───────────────────────────────────────────────────── Who did what? */
type W = 0 | 1 | 2 // none, contributes, leads
const TASKS: [string, W, W, W][] = [
  // task, human, AI, check
  ['problem framing', 2, 1, 0],
  ['user & research needs', 2, 1, 0],
  ['choice of tradeoffs', 2, 1, 0],
  ['architecture approval', 2, 1, 1],
  ['correctness standards', 2, 0, 2],
  ['release decisions', 2, 0, 2],
  ['exploring options', 1, 2, 0],
  ['drafting code', 1, 2, 2],
  ['refactoring', 1, 2, 2],
  ['documenting', 1, 2, 0],
  ['generating test cases', 1, 2, 2],
  ['reviewing', 2, 2, 1],
]
const OUT = ['Human', 'AI agents', 'Checks']

export function S12({ step }: SceneProps) {
  const [hot, setHot] = useState<number | null>(null)
  const rowY = (i: number) => 22 + i * 36
  const outY = [90, 220, 350]
  return (
    <Scene n={12} act={ACT} aside="control room">
      <div className="s12 m-stack">
        <div className="s12-text">
          <h2 className="h1">Who did what?</h2>
          <p className="lede" style={{ marginTop: '0.8em' }}>Specific routing. Overlapping roles. Nothing mystical.</p>
          <p className={`small ${rv(step, 1)}`} style={{ marginTop: '1.4em', maxWidth: '22em' }}>
            The human still validates — and sometimes implements. AI suggestions can be wrong. A thick line leads; a thin line contributes.
          </p>
          <p className="xs muted" style={{ marginTop: '1em' }}>
            Hover or focus a task. <Tag kind="research">routing as practised, not measured</Tag>
          </p>
        </div>
        <div className="s12-board">
          <svg viewBox="0 0 640 450" className="s12-svg" role="img" aria-label="Switchboard routing twelve tasks to human, AI agents and checks.">
            {TASKS.map(([t, ...w], i) =>
              w.map((wt, j) =>
                wt ? (
                  <path
                    key={`${t}-${j}`}
                    d={`M 230 ${rowY(i)} C 380 ${rowY(i)}, 400 ${outY[j]}, 520 ${outY[j]}`}
                    className={`cable o${j} w${wt} ${hot === null ? '' : hot === i ? 'hot' : 'cold'} ${j === 1 && step < 1 ? 'pending' : ''}`}
                  />
                ) : null,
              ),
            )}
            {TASKS.map(([t], i) => (
              <g key={t} className={`jack ${hot === i ? 'hot' : ''}`}>
                <text x="218" y={rowY(i) + 5} textAnchor="end">{t}</text>
                <circle cx="230" cy={rowY(i)} r="5" />
              </g>
            ))}
            {OUT.map((o, j) => (
              <g key={o} className={`socket o${j}`}>
                <rect x="520" y={outY[j] - 26} width="112" height="52" />
                <text x="576" y={outY[j] + 6} textAnchor="middle">{o}</text>
              </g>
            ))}
          </svg>
          <div className="s12-hits">
            {TASKS.map(([t], i) => (
              <button
                key={t}
                type="button"
                data-keys="own"
                style={{ top: `${((rowY(i) - 16) / 450) * 100}%` }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                aria-label={`${t}: ${OUT.filter((_, j) => TASKS[i][j + 1]).join(', ')}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Scene>
  )
}

/* 13 ──────────────────────────────────── Anatomy of one delegation loop */
const SNAPS = ['Request', 'Proposal', 'Critique', 'Revision'] as const

export function S13({ step, mode }: SceneProps) {
  const [cur, setCur] = useState(mode === 'talk' ? step : 0)
  useEffect(() => {
    if (mode === 'talk') setCur(step)
  }, [step, mode])

  return (
    <Scene n={13} act={ACT} aside="real artifacts · issue #32 → PR #53">
      <div className="s13-top">
        <h2 className="h2">Anatomy of one delegation loop.</h2>
        <div className="s13-tabs" role="tablist" aria-label="Loop stages">
          {SNAPS.map((s, i) => (
            <button
              key={s}
              role="tab"
              type="button"
              data-keys="own"
              aria-selected={cur === i}
              className={`s13-tab ${cur === i ? 'on' : ''} ${cur > i ? 'done' : ''}`}
              onClick={() => setCur(i)}
            >
              <span className="mono xs">{i + 1}</span> {s}
              <span className="mono xs who">{['owner', 'Claude Code', 'Codex', 'owner + test'][i]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="s13-stage" role="tabpanel" aria-label={SNAPS[cur]}>
        {cur === 0 && (
          <article className="s13-issue paper-card">
            <header className="mono xs"><span className="s13-pill">open</span> Feature: one-tap self-reporting stamp for short stops · <b>#32</b></header>
            <p className="h3" style={{ marginTop: '0.6em' }}>“Stamp this moment.” One tap, no form.</p>
            <ul className="small">
              <li>Short stops (coffee, a quick pickup, a transfer) fall below the stay threshold.</li>
              <li>Record time + <b>approximate</b> location only.</li>
              <li className="s13-quote">The precise click-time GPS fix should <b>not</b> be treated as ground truth.</li>
              <li>Complement passive inference — never override it blindly.</li>
            </ul>
            <p className="xs muted" style={{ marginTop: '1em' }}>
              Research judgment, written as acceptance criteria. <Tag kind="repo" src="issue32">issue #32</Tag>
            </p>
          </article>
        )}
        {cur === 1 && (
          <article className="s13-pr">
            <header className="mono xs"><span className="s13-pill merged">PR #53</span> Add one-tap self-reporting stamps for short stops</header>
            <pre className="s13-code mono" aria-label="Files touched by the pull request">
{`+ Inference/StampAnchoring.swift     new
+ Database/Schema.swift              schema v3 · stamps table
~ Inference/InferenceEngine.swift
~ Editing/EditService.swift          user edits still win
~ Export/Exporter.swift              stamps.csv
+ Tests/StampTests.swift
~ analysis/hht.py                    d.stamps`}
            </pre>
            <ol className="small s13-rules">
              <li>Nearby stay already covers the stamp → nothing changes.</li>
              <li>Stamp contradicts the sensors → stays unmatched.</li>
              <li>Otherwise build a short stop from surrounding fixes, not from the tap.</li>
            </ol>
            <p className="xs muted">
              Coarse location ≈ 110 m. Body ends “Generated with Claude Code”. <Tag kind="repo" src="pr53">PR #53</Tag>
            </p>
          </article>
        )}
        {cur === 2 && (
          <article className="s13-review">
            <div className="s13-bubble">
              <header className="mono xs"><span className="s13-p2">P2</span> chatgpt-codex-connector · StampAnchoring.swift:96</header>
              <p className="h3" style={{ marginTop: '0.5em' }}>Preserve the configured minimum stamp duration.</p>
              <p className="small" style={{ marginTop: '0.5em' }}>
                Padding clipped by a neighbouring stay isn’t reassigned. A stamp 10 s after a stay ends gives a stop shorter than the 60 s minimum.
              </p>
            </div>
            <p className="note-hand" style={{ marginTop: '1em' }}>A recommendation. Is it real? Reproduce it first.</p>
            <p className="xs muted" style={{ marginTop: '0.4em' }}>
              The review estimated ≈39 s. <Tag kind="repo" src="codex53">review on #53</Tag>
            </p>
          </article>
        )}
        {cur === 3 && (
          <article className="s13-rev">
            <header className="mono xs"><span className="s13-pill merged">8a26c25</span> Address Codex review on #53: stamp stop minimum, map fit</header>
            <div className="s13-timeline" role="img" aria-label="Before the fix, the stop lasted 34 seconds; after, 60 seconds.">
              <div className="row"><span className="mono xs">before</span><span className="stay" /><span className="stop b" style={{ width: '17%' }}>34 s</span></div>
              <div className="row"><span className="mono xs">after</span><span className="stay" /><span className="stop a" style={{ width: '30%' }}>60 s</span></div>
              <div className="row scale"><span /><span className="mono xs">stay ends</span><span className="mono xs">stamp +10 s</span></div>
            </div>
            <p className="mono small" style={{ marginTop: '0.8em' }}>
              <span className="accent">+ test</span> shortStopKeepsItsMinimumNextToAStay
            </p>
            <p className="small" style={{ marginTop: '0.4em' }}>“your 10 s case gave 34 s before, 60 s now.”</p>
            <p className="xs muted" style={{ marginTop: '0.8em' }}>
              Measured by the new test. Git can’t say which tool wrote which line, so no line-level attribution is claimed.{' '}
              <Tag kind="repo" src="fix53">commit + reply</Tag>
            </p>
          </article>
        )}
      </div>
    </Scene>
  )
}
