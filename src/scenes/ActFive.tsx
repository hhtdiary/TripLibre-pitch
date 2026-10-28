import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Scene } from '../components/Scene'
import { Tag } from '../components/Tag'
import { rv } from '../components/reveal'
import { LINKS } from '../data/evidence'
import { APP_STORE, SPEAKER } from '../data/facts'
import type { SceneProps } from '../types'

const ACT = 'The bill, and when to stop'

/* 18 ─────────────────────────────── What AI changed, and what it did not */
export function S18({ step }: SceneProps) {
  const lines: [string, string, number][] = [
    ['h', '@@ implementation @@', 0],
    ['-', 'prototyping needed a team I didn’t have', 0],
    ['+', 'prototype → implement → iterate, in conversation', 0],
    ['+', 'more alternatives tried before committing', 0],
    ['+', 'more code to review that I didn’t write', 1],
    ['+', 'more suggestions to integrate and keep consistent', 1],
    ['h', '@@ unchanged — still mine @@', 2],
    [' ', 'research priorities', 2],
    [' ', 'ethical responsibility', 2],
    [' ', 'measurement validity', 2],
    [' ', 'a viable product strategy', 2],
    [' ', 'final accountability', 2],
  ]
  return (
    <Scene n={18} act={ACT}>
      <div className="s18 m-stack">
        <div>
          <h2 className="h1">What AI changed, <span className="it">and what it did not.</span></h2>
          <p className={`lede ${rv(step, 1)}`} style={{ marginTop: '1em' }}>
            Less friction to build. More burden to review. <Tag kind="research">assessment</Tag>
          </p>
        </div>
        <pre className="s18-diff mono" aria-label="A diff of research practice: what AI changed and what stayed the same">
          <span className="s18-file">diff --git a/research-practice b/research-practice</span>
          {lines.map(([k, t, at], i) => (
            <span key={i} className={`s18-l k${k === '+' ? 'add' : k === '-' ? 'del' : k === 'h' ? 'hunk' : 'ctx'} ${rv(step, at)}`}>
              {k === 'h' ? t : `${k} ${t}`}
            </span>
          ))}
        </pre>
      </div>
    </Scene>
  )
}

/* 19 ─────────────────────────────────── The cost of delegation (receipt) */
type CostKind = 'OOP' | 'USE' | 'HUM'
const HIDDEN: [string, CostKind[]][] = [
  ['subscription / API plan', ['OOP']],
  ['re-explain context in a fresh session', ['USE', 'HUM']],
  ['read and understand the proposal', ['HUM']],
  ['automated review → 2 findings (PR #53)', ['USE']],
  ['reproduce, fix, add a test', ['USE', 'HUM']],
  ['rerun CI, simulator, phone', ['HUM']],
  ['false starts — e.g. closed PR #81', ['USE', 'HUM']],
  ['docs, changelog, export contract', ['USE', 'HUM']],
  ['maintenance: migrations, future iOS', ['HUM']],
]

export function S19({ step, mode }: SceneProps) {
  const [torn, setTorn] = useState(mode === 'talk' ? step >= 1 : false)
  useEffect(() => {
    if (mode === 'talk') setTorn(step >= 1)
  }, [step, mode])
  return (
    <Scene n={19} act={ACT} aside="visible price · hidden cost">
      <div className="s19 m-stack">
        <div className="s19-left">
          <h2 className="h2">Models are not free. <span className="it">Neither is supervision.</span></h2>
          <p className="small muted" style={{ marginTop: '0.8em', maxWidth: '30em' }}>
            Three kinds of cost: <b>OOP</b> out-of-pocket · <b>USE</b> compute / usage limits · <b>HUM</b> human time and opportunity cost.
          </p>

          <section className="s19-panel" aria-label="Measurement panel">
            <p className="label">measurement panel</p>
            <dl>
              <dt>tokens</dt><dd className="nt">Not tracked</dd>
              <dt>dollars</dt><dd className="nt">Not verified</dd>
              <dt>hours</dt><dd className="nt">Not tracked</dd>
            </dl>
            <p className="label" style={{ marginTop: '1em' }}>observable signals</p>
            <ul className="small">
              <li>8 commits on main fix a Codex review finding <Tag kind="repo" src="codexCommits">repo</Tag></li>
              <li>Copilot review: “reached their quota limit” <Tag kind="repo" src="copilotQuota">PRs</Tag></li>
              <li>CodeRabbit: skipped — under 10 stars <Tag kind="repo" src="copilotQuota">PRs</Tag></li>
            </ul>
          </section>
          <p className="xs muted" style={{ marginTop: '1em', maxWidth: '36em' }}>
            Not a claim that this was cheaper or dearer than a team. That counterfactual was never measured.
          </p>
        </div>

        <div className="s19-receipt-wrap">
          <article className={`s19-receipt mono ${torn ? 'torn' : ''}`} aria-label="Delegation receipt">
            <p className="s19-c">DELEGATION RECEIPT</p>
            <p className="s19-c xs">TripLibre · 2026-09-27 → 10-25</p>
            <p className="s19-sep" />
            <p className="s19-line"><span>1 × “add a one-tap stamp”</span><span>1 prompt</span></p>
            <p className="s19-sep" />
            <p className="s19-line total"><span>APPARENT COST</span><span>one message</span></p>

            <div className="s19-hidden" aria-hidden={!torn}>
              <p className="s19-tear" />
              <p className="s19-c xs accent">— hidden lines —</p>
              {HIDDEN.map(([l, kinds]) => (
                <p key={l} className="s19-line">
                  <span>{l}</span>
                  <span className="s19-k">{kinds.join(' ')}</span>
                </p>
              ))}
              <p className="s19-sep" />
              <p className="s19-line total"><span>ACTUAL COST</span><span>not tracked</span></p>
              <p className="s19-c xs" style={{ marginTop: '0.6em' }}>thank you for reviewing your own code</p>
            </div>
          </article>
          {!torn && (
            <button type="button" className="chip-btn accent-btn s19-btn" data-keys="own" onClick={() => setTorn(true)}>
              Tear off the hidden lines ↓
            </button>
          )}
        </div>
      </div>
    </Scene>
  )
}

/* 20 ───────────────────────────────── Which model for which task? */
type Lvl = 1 | 2 | 3
interface Task {
  label: string
  f: Record<string, Lvl>
  priority: string
  second: string
  test: string
  effort: number
}
const FACTORS = ['difficulty', 'context needed', 'verifiability', 'latency matters', 'usage limits', 'privacy / sensitivity', 'switching cost']

const TASKS: Task[] = [
  {
    label: 'rename a UI label',
    f: { difficulty: 1, 'context needed': 1, verifiability: 3, 'latency matters': 3, 'usage limits': 1, 'privacy / sensitivity': 1, 'switching cost': 1 },
    priority: 'A fast, inexpensive model — or just do it by hand.',
    second: 'No.',
    test: 'Simulator check; VoiceOver label still reads correctly.',
    effort: 1,
  },
  {
    label: 'diagnose intermittent location capture',
    f: { difficulty: 3, 'context needed': 3, verifiability: 2, 'latency matters': 1, 'usage limits': 2, 'privacy / sensitivity': 3, 'switching cost': 2 },
    priority: 'A stronger reasoning model for hypotheses. Never paste real traces; use replays and synthetic fixtures.',
    second: 'Yes — but data is the arbiter. The first hypothesis (drift) was wrong.',
    test: 'Replay the raw database; a regression test that fails before and passes after.',
    effort: 4,
  },
  {
    label: 'choose cross-country POI inference architecture',
    f: { difficulty: 3, 'context needed': 3, verifiability: 1, 'latency matters': 1, 'usage limits': 2, 'privacy / sensitivity': 2, 'switching cost': 3 },
    priority: 'A model can map the option space. The decision is research + product judgment.',
    second: 'Domain experts and local data partners — not a second model.',
    test: 'Evaluation on data from each region. It doesn’t exist yet → defer.',
    effort: 5,
  },
  {
    label: 'audit a release candidate',
    f: { difficulty: 2, 'context needed': 3, verifiability: 2, 'latency matters': 1, 'usage limits': 2, 'privacy / sensitivity': 2, 'switching cost': 1 },
    priority: 'A capable reviewer, separate from whatever wrote the code; plus checklists.',
    second: 'Yes — independent review, then Apple’s.',
    test: 'CI green, phone run, button QA checklist, privacy manifest.',
    effort: 3,
  },
  {
    label: 'draft a data-dictionary page',
    f: { difficulty: 1, 'context needed': 2, verifiability: 3, 'latency matters': 2, 'usage limits': 1, 'privacy / sensitivity': 1, 'switching cost': 1 },
    priority: 'A mid-tier model is enough; the schema is the source of truth.',
    second: 'No — check it against the export contract.',
    test: 'Every column matches the export; the Python loader still reads it.',
    effort: 2,
  },
]

export function S20(_: SceneProps) {
  const [sel, setSel] = useState(1)
  const t = TASKS[sel]
  return (
    <Scene n={20} act={ACT} aside="switchboard, not leaderboard">
      <div className="s20-head">
        <h2 className="h2">Which model for which task?</h2>
        <p className="small muted">Not all intelligence is interchangeable. Pick a task.</p>
      </div>
      <div className="s20 m-stack">
        <div className="s20-tasks" role="tablist" aria-label="Tasks">
          {TASKS.map((x, i) => (
            <button key={x.label} role="tab" type="button" data-keys="own" aria-selected={sel === i} className={sel === i ? 'on' : ''} onClick={() => setSel(i)}>
              <span className="mono xs">{String(i + 1).padStart(2, '0')}</span>
              {x.label}
            </button>
          ))}
        </div>

        <div className="s20-board" role="tabpanel" aria-live="polite" aria-label={t.label}>
          <div className="s20-dials">
            {FACTORS.map((f) => (
              <div key={f} className="s20-dial">
                <span className="mono xs">{f}</span>
                <span className="s20-pips" aria-label={`${f}: ${['', 'low', 'medium', 'high'][t.f[f]]}`}>
                  {[1, 2, 3].map((n) => <i key={n} className={n <= t.f[f] ? 'on' : ''} />)}
                </span>
              </div>
            ))}
          </div>
          <dl className="s20-out">
            <dt className="label">prioritize</dt><dd>{t.priority}</dd>
            <dt className="label">second opinion?</dt><dd>{t.second}</dd>
            <dt className="label accent">what decides acceptance</dt><dd className="s20-test">{t.test}</dd>
            <dt className="label">relative effort</dt>
            <dd>
              <span className="s20-meter" aria-label={`${t.effort} of 5`}>
                {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= t.effort ? 'on' : ''} />)}
              </span>{' '}
              <Tag kind="illus">illustrative, not measured</Tag>
            </dd>
          </dl>
        </div>
      </div>
      <p className="s20-foot xs muted">
        No prices, benchmarks or rankings: they change, and none were measured here. Tools named in this talk are parts of the documented
        workflow, not model identities.
      </p>
    </Scene>
  )
}

/* 21 ─────────────────────────────── The trap of overengineering */
const BOARD: [string, string, [string, string?][]][] = [
  ['build', 'shipped', [['editable diary, one-tap fixes'], ['self-reported stamps'], ['user-labelled place types'], ['documented mode rules'], ['survey-shaped local export']]],
  ['defer', 'planned', [['formal accuracy benchmark'], ['selective export'], ['prompted recall / study config'], ['research edition'], ['transit schedules (bus vs car)']]],
  ['reject — for now', 'refused', [['universal automatic POI + purpose inference'], ['accounts and cloud sync'], ['a language model inside the diary agent']]],
  ['revisit when', 'evidence changes', [['measured error on real users justifies it'], ['a region has supported, licensed POI data'], ['a real study needs it']]],
]

export function S21({ step }: SceneProps) {
  return (
    <Scene n={21} act={ACT} aside="proportionate engineering">
      <div className={`s21-main ${step >= 2 ? 'hide' : ''}`}>
        <h2 className="h2">Knowing when to <span className="it">stop.</span></h2>
        <div className="s21-board m-stack">
          {BOARD.map(([col, sub, items], i) => (
            <section key={col} className={`s21-col c${i}`}>
              <header>
                <span className="h3">{col}</span>
                <span className="mono xs muted">{sub}</span>
              </header>
              <ul>{items.map(([it]) => <li key={it}>{it}</li>)}</ul>
            </section>
          ))}
        </div>
        <div className="s21-tags">
          <Tag kind="repo" src="readme">README status table</Tag> <Tag kind="repo" src="pr72">no LLM: PR #72</Tag> <Tag kind="future" src="readme" />
        </div>
        <div className={`s21-rule ${rv(step, 1)}`}>
          <p className="label accent">engineering stop rule</p>
          <p className="small">
            Stop adding complexity when the next feature doesn’t address a verified need, <b>can’t be tested credibly</b>, adds more
            maintenance risk than I can carry, or undermines correction and transparency.
          </p>
          <p className="small muted" style={{ marginTop: '0.4em' }}>The inverse holds too: revisit when measured error, real users or supported data justify more automation.</p>
        </div>
      </div>

      <div className={`s21-void ${step >= 2 ? 'on' : ''}`} aria-hidden={step < 2}>
        <div className="s21-ghost">
          <span className="mono xs">universal automatic inference engine</span>
        </div>
        <p className="s21-caption serif">The feature I chose not to build <span className="it accent">(yet).</span></p>
      </div>
    </Scene>
  )
}

function Qr({ url, label }: { url: string; label: string }) {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    QRCode.toString(url, { type: 'svg', margin: 0, color: { dark: '#000000', light: '#ffffff' } }).then(setSvg)
  }, [url])
  return (
    <figure className="s22-qr">
      <div className="s22-code" role="img" aria-label={`QR code for ${url}`} dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption>
        <span className="label">{label}</span>
        <a href={url} target="_blank" rel="noreferrer" className="mono small">{url.replace('https://', '')}</a>
      </figcaption>
    </figure>
  )
}

/* 22 ─────────────────────────────────────────────────── Acknowledgments */
// A personal thank-you, not a claim of collaboration, funding or endorsement.
const THANKS: [string, string, string][] = [
  ['Erick Guerra', 'University of Pennsylvania', 'Research mentorship, intellectual guidance, and support'],
  ['Eugene Brusilovskiy', 'University of Pennsylvania', 'Technical discussions and methodological insights'],
]

export function S22(_: SceneProps) {
  return (
    <Scene n={22} act="Acknowledgments">
      <div className="s22a">
        <p className="label">Acknowledgments</p>
        <div className="s22a-names">
          {THANKS.map(([name, aff, why]) => (
            <section key={name} className="s22a-person">
              <h2 className="h2">{name}</h2>
              <p className="s22a-aff">{aff}</p>
              <p className="s22a-why">{why}</p>
            </section>
          ))}
        </div>
        <p className="s22a-line note-hand">From transportation research to building research infrastructure.</p>
      </div>
    </Scene>
  )
}

/* 23 ─────────────────────────────────────────────────────────── Closing */
export function S23({ step }: SceneProps) {
  return (
    <Scene n={23} act="A question for GIS and planning" aside="thank you is implied">
      <div className="s22">
        <p className="label">for GIS and planning</p>
        <h2 className="h1 s22-q">
          If building research tools is no longer reserved for software teams, what research infrastructure should we build —
          <span className="it accent"> and how do we avoid building the wrong thing faster?</span>
        </h2>
        <div className={`s22-bottom m-stack ${rv(step, 1)}`}>
          <div className="s22-me">
            <p className="serif" style={{ fontSize: 'var(--t-xl)', lineHeight: 1 }}>{SPEAKER.name}</p>
            <p className="small muted">{SPEAKER.affiliation} · {SPEAKER.event}</p>
            <p className="small"><a href={`mailto:${SPEAKER.email}`}>{SPEAKER.email}</a></p>
            <p className="xs muted mono" style={{ marginTop: '0.6em' }}>
              Every claim in this talk carries a provenance tag. Evidence register: evidence.md
            </p>
          </div>
          <Qr url={LINKS.repo} label="code · Apache-2.0" />
          <Qr url={LINKS.site} label="project + docs" />
          {APP_STORE.url && <Qr url={APP_STORE.url} label="App Store" />}
        </div>
      </div>
    </Scene>
  )
}
