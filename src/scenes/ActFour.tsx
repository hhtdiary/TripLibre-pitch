import { useEffect, useState } from 'react'
import { Scene } from '../components/Scene'
import { Tag } from '../components/Tag'
import { rv } from '../components/reveal'
import { LINKS } from '../data/evidence'
import { APP_STORE, MEDIA } from '../data/facts'
import type { SceneProps } from '../types'

const ACT = 'Judgment'

/* 14 ───────────────────────── Inference accuracy versus product fit */
const CONSEQ = {
  auto: [
    'Needs POI + transit data everywhere → coverage is uneven (next scene).',
    'Needs labelled ground truth across people and cities. Today: one person, 17 days.',
    'Errors hide inside confident output → fewer corrections, worse labels.',
    'Bigger verification surface; pressure toward cloud models vs. local-first.',
    'A very impressive demo.',
  ],
  correct: [
    'Some user effort — kept to one or two taps; only uncertain trips ask.',
    'Every correction is a labelled example in the audit log.',
    'Rules are documented and inspectable; “unknown” is allowed.',
    'Honest gap: can’t tell a bus from a car without transit schedules.',
    'Less dazzling. Revisit when the evidence changes.',
  ],
}

export function S14({ step, mode }: SceneProps) {
  const [choice, setChoice] = useState<'auto' | 'correct' | null>(null)
  const [revealed, setRevealed] = useState(mode === 'talk' ? step >= 1 : false)
  useEffect(() => {
    if (mode === 'talk') setRevealed(step >= 1)
  }, [step, mode])
  const shown = revealed ? 'correct' : choice

  return (
    <Scene n={14} act={ACT} aside="decision fork · audience vote">
      <div className="s14-head">
        <h2 className="h2">Inference accuracy <span className="it">vs.</span> product fit.</h2>
        <p className="small muted">You’re the product owner. Which do you build first?</p>
      </div>

      <div className="s14 m-stack">
        <section className={`s14-opt auto ${shown === 'auto' ? 'chosen' : shown ? 'faded' : ''}`}>
          <button type="button" className="chip-btn" data-keys="own" aria-pressed={choice === 'auto'} onClick={() => { setChoice('auto'); setRevealed(false) }}>
            A · Maximize automatic inference
          </button>
          <div className="s14-box" role="img" aria-label="A black box turns a GPS trace into confident labels with no explanation.">
            <svg viewBox="0 0 120 60" className="s14-in" aria-hidden="true">
              <path d="M4 40 C 20 10, 30 50, 46 26 S 70 8, 86 30 S 110 50, 116 20" />
            </svg>
            <div className="s14-black mono">
              <span>UNIVERSAL</span>
              <span>MODE + PURPOSE</span>
              <span>PREDICTOR</span>
            </div>
            <div className="s14-out mono small">
              <span>mode: <b>████</b></span>
              <span>purpose: <b>████</b></span>
              <span>why: <i>—</i></span>
            </div>
          </div>
          {shown === 'auto' && (
            <ul className="s14-cons">{CONSEQ.auto.map((c) => <li key={c}>{c}</li>)}</ul>
          )}
        </section>

        <section className={`s14-opt correct ${shown === 'correct' ? 'chosen' : shown ? 'faded' : ''}`}>
          <button type="button" className="chip-btn accent-btn" data-keys="own" aria-pressed={choice === 'correct'} onClick={() => { setChoice('correct'); setRevealed(false) }}>
            B · Prioritize user correction
          </button>
          <div className="s14-card paper-card">
            <p className="mono xs muted">08:20–08:30 · 10 min · 1.6 mi</p>
            <p className="h3" style={{ fontSize: 'var(--t-body)' }}>Walk + Subway + Walk <span className="s14-check">check</span></p>
            <p className="xs muted" style={{ marginTop: '0.3em' }}>why: GPS blackout at urban speed; motion sensor said “vehicle”</p>
            <div className="s14-quick">
              {['Walk', 'Subway', 'Bus', 'Car', 'Unknown'].map((m) => <span key={m} className="mono xs">{m}</span>)}
            </div>
          </div>
          {shown === 'correct' && (
            <ul className="s14-cons">{CONSEQ.correct.map((c) => <li key={c}>{c}</li>)}</ul>
          )}
        </section>
      </div>

      <div className="s14-reveal">
        {!revealed ? (
          <button type="button" className="chip-btn" data-keys="own" onClick={() => setRevealed(true)}>
            Reveal the project’s decision →
          </button>
        ) : (
          <div className="s14-decision">
            <p className="h3">
              TripLibre chose <span className="accent">B — for now.</span>
            </p>
            <p className="small">
              Place types are labelled by the user; mode uses speed + motion rules; your corrections feed back.
            </p>
            <div className="s14-tags">
              <Tag kind="repo" src="issue56">#56 not auto POI</Tag>
              <Tag kind="repo" src="modeRules">mode rules</Tag>
              <Tag kind="repo" src="pr72">agent asks, no LLM</Tag>
              <Tag kind="repo" src="busCar">known gap</Tag>
            </div>
          </div>
        )}
      </div>
    </Scene>
  )
}

/* 15 ─────────────────────────────────────────────── Why place matters */
function Tile({ variant }: { variant: 0 | 1 | 2 }) {
  // Stylized streets and markers. No real data; density is a drawing choice.
  const streets =
    variant === 0
      ? 'M0 30 H200 M0 70 H200 M0 110 H200 M0 150 H200 M40 0 V180 M90 0 V180 M140 0 V180 M0 180 L200 20'
      : variant === 1
        ? 'M0 60 C 60 40, 120 90, 200 70 M0 130 C 70 110, 140 160, 200 120 M60 0 C 70 60, 50 120, 80 180 M150 0 C 130 70, 160 120, 140 180 M0 20 L 200 170'
        : 'M0 100 C 50 90, 120 120, 200 95 M90 0 C 100 60, 80 130, 110 180 M20 180 C 60 140, 30 60, 70 0'
  const marks: [number, number, string][] =
    variant === 0
      ? [[50, 40, 'a'], [100, 60, 'a'], [130, 100, 'b'], [60, 120, 'a'], [150, 140, 'a'], [80, 160, 'b'], [170, 40, 'a'], [30, 80, 'a']]
      : variant === 1
        ? [[40, 50, 'a'], [70, 70, 'c'], [120, 80, 'c'], [150, 60, 'a'], [90, 130, 'c'], [160, 125, 'c'], [60, 150, 'a']]
        : [[60, 95, 'a'], [140, 105, 'q'], [100, 40, 'q'], [40, 150, 'q']]
  return (
    <svg viewBox="0 0 200 180" className="s15-map" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d={streets} className="st" />
      {marks.map(([x, y, k], i) =>
        k === 'q' ? (
          <text key={i} x={x} y={y} className="q" textAnchor="middle">?</text>
        ) : (
          <circle key={i} cx={x} cy={y} r={k === 'b' ? 7 : 5} className={`m ${k}`} />
        ),
      )}
    </svg>
  )
}

export function S15({ step }: SceneProps) {
  const places: [string, string, string[]][] = [
    ['Philadelphia', 'where TripLibre was tested', ['open + commercial datasets overlap', 'same place, several names and categories', 'which one is “ground truth”?']],
    ['Qingdao', 'where I grew up', ['different map ecosystems and providers', 'different taxonomy and language', 'licensing for on-device use?']],
    ['A city with limited data capacity', 'the roadmap’s hardest case', ['informal places may be in no dataset', 'stale or missing updates', 'a model trained elsewhere transfers poorly']],
  ]
  return (
    <Scene n={15} act={ACT} aside="field-note map · illustrative">
      <h2 className="h2">Why <span className="it">place</span> matters.</h2>
      <p className="lede" style={{ marginTop: '0.3em' }}>POI coverage and map-matching are not universal.</p>
      <div className="s15 m-stack">
        {places.map(([name, why, notes], i) => (
          <figure key={name} className={`s15-tile ${rv(step, i === 0 ? 0 : 1)}`}>
            <Tile variant={i as 0 | 1 | 2} />
            <figcaption>
              <span className="h3" style={{ fontSize: 'var(--t-body)' }}>{name}</span>
              <span className="xs muted mono">{why}</span>
              <ul className="small">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={`s15-foot ${rv(step, 2)}`}>
        <p className="note-hand">A POI model inherits the geography of its data.</p>
        <p className="small">That’s data equity and measurement validity — not just a coding problem.</p>
        <p className="xs muted" style={{ marginTop: '0.4em' }}>
          <Tag kind="illus">no coverage measured; drawings only</Tag> <Tag kind="future" src="limitedCities">limited-capacity cities: exploratory</Tag>
        </p>
      </div>
    </Scene>
  )
}

/* 16 ───────────────────────────────────── Testing is research methodology */
export function S16({ step }: SceneProps) {
  return (
    <Scene n={16} act={ACT} aside="quality-control evidence board">
      <h2 className="h2 s16-title">Testing is research <span className="it">methodology.</span></h2>
      <div className="s16 corkless">
        <div className="s16-item term" style={{ ['--r' as string]: '-1deg' }}>
          <pre className="mono">{`$ make test
# core suite: 112 tests,
# incl. the brief's 14 synthetic days

$ make ci
# lint · tests · app build ·
# export → Python contract check`}</pre>
          <Tag kind="repo" src="tests">README</Tag>
        </div>

        <div className="s16-item check paper-card" style={{ ['--r' as string]: '1.4deg' }}>
          <p className="label">synthetic days</p>
          <ul>
            {['commutes', 'indoor drift', 'subway blackouts', 'flights', 'midnight crossings', 'daylight-saving crossings', 'edits survive rebuilds'].map((x) => (
              <li key={x}>☑ {x}</li>
            ))}
          </ul>
          <Tag kind="repo" src="layers">story page</Tag>
        </div>

        <div className="s16-item slip" style={{ ['--r' as string]: '-0.6deg' }}>
          <p className="label">calibration · round 1 · 5 held-out days</p>
          <table className="mono small">
            <tbody>
              <tr><td>whole-day time agreement</td><td>0.827 → 0.939</td></tr>
              <tr><td>departure bias (min)</td><td>−28.8 → +0.3</td></tr>
              <tr><td>tradeoff</td><td>nearby stops merge more</td></tr>
            </tbody>
          </table>
          <Tag kind="repo" src="pr52">PR #52</Tag>
        </div>

        <div className={`s16-item field paper-card ${rv(step, 1)}`} style={{ ['--r' as string]: '0.8deg' }}>
          <p className="label">from the field</p>
          <p className="small">Atlanta, Oct 1: diary lagged for hours → replayed the raw database → regression fixture.</p>
          <Tag kind="repo" src="pr9">#4 → PR #9</Tag>
        </div>

        <div className={`s16-item a11y paper-card ${rv(step, 1)}`} style={{ ['--r' as string]: '-1.2deg' }}>
          <p className="label">accessibility</p>
          <p className="small">Static check 21.3 → 98.0. The tool’s auto-fix broke the build — rejected.</p>
          <Tag kind="repo" src="pr84">PR #84</Tag>
        </div>

        <div className={`s16-item notyet ${rv(step, 2)}`} style={{ ['--r' as string]: '0.5deg' }}>
          <p className="label">not yet</p>
          <ul className="small">
            <li>formal accuracy benchmark</li>
            <li>other people, phones, cities</li>
            <li>paired logger study (#48)</li>
            <li>UI tests in CI (local only)</li>
          </ul>
          <Tag kind="future" />
        </div>

        <div className={`s16-stamp ${rv(step, 2)}`} aria-label="All accuracy numbers so far: one person, 17 days.">
          <span>1 person</span>
          <span>17 days</span>
          <Tag kind="repo" src="validation">validation</Tag>
        </div>
      </div>
    </Scene>
  )
}

/* 17 ──────────────────────────────────────────────── The actual artifact */
type Layer = 'need' | 'uncertainty' | 'privacy'
interface Pin { x: number; y: number; layer: Layer; text: string }
interface Screen { file: string; name: string; alt: string; pins: Pin[] }

const SCREENS: Screen[] = [
  {
    file: '01-today', name: 'Today', alt: 'Today screen: a map of the day in Philadelphia, 7 trips, 9.6 miles, travel time and places.',
    pins: [
      { x: 52, y: 37, layer: 'need', text: 'The day rebuilt as visits + trips — a person-day, survey-shaped' },
      { x: 50, y: 60, layer: 'need', text: 'Trips, distance, time, places: HHTS summary measures' },
      { x: 30, y: 73, layer: 'uncertainty', text: 'Costs are self-reported, not inferred' },
    ],
  },
  {
    file: '02-diary', name: 'Diary', alt: 'Diary list: Home, a multimodal subway and walk trip, Office, Wawa with a stamp badge.',
    pins: [
      { x: 60, y: 33, layer: 'need', text: 'Multimodal trip kept as segments' },
      { x: 48, y: 55, layer: 'uncertainty', text: 'Stamp badge: a stop the user vouched for' },
      { x: 26, y: 46, layer: 'need', text: 'Purpose comes from place type, editable' },
    ],
  },
  {
    file: '03-fix-a-trip', name: 'Fix a trip', alt: 'Trip editor: Home to Office, mode grid with Subway selected, reset to automatic Taxi.',
    pins: [
      { x: 50, y: 66, layer: 'need', text: 'One tap to correct the mode — locked against rebuilds' },
      { x: 32, y: 83, layer: 'uncertainty', text: 'The automatic guess is kept and shown, not erased' },
    ],
  },
  {
    file: '09-settings-privacy', name: 'Settings · privacy', alt: 'Settings: collection status, address lookup off, everything stored only on this iPhone.',
    pins: [
      { x: 50, y: 50, layer: 'uncertainty', text: 'Collector state and permission shown honestly' },
      { x: 50, y: 72, layer: 'privacy', text: 'Address lookup is the only feature that sends a coordinate — off by default' },
      { x: 40, y: 96, layer: 'privacy', text: 'Export choices: range, raw GPS on/off' },
    ],
  },
  { file: '04-timeline', name: 'Timeline', alt: 'Timeline of days by month with trip search and filters.', pins: [{ x: 50, y: 40, layer: 'need', text: 'Months of days — the longitudinal record' }] },
  { file: '06-stats', name: 'Stats', alt: 'Stats: mode share, radius of gyration and other mobility metrics.', pins: [{ x: 50, y: 40, layer: 'need', text: 'Mode share, radius of gyration, tours, period comparisons' }] },
]

const LAYERS: [Layer, string][] = [
  ['need', 'research need'],
  ['uncertainty', 'uncertainty & correction'],
  ['privacy', 'privacy'],
]

export function S17({ step }: SceneProps) {
  const [sel, setSel] = useState(0)
  const [on, setOn] = useState<Record<Layer, boolean>>({ need: true, uncertainty: false, privacy: false })
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const [video, setVideo] = useState(false)
  useEffect(() => {
    if (step >= 1) setOn({ need: true, uncertainty: true, privacy: true })
  }, [step])
  const s = SCREENS[sel]
  return (
    <Scene n={17} act={ACT} aside="artifact microscope">
      <div className="s17 m-stack">
        <div className="s17-left">
          <h2 className="h2">The actual artifact.</h2>
          <p className="lede" style={{ marginTop: '0.5em' }}>What exists in v2.1.0, and the research need each screen serves.</p>

          <div className="s17-layers" role="group" aria-label="Annotation layers">
            {LAYERS.map(([k, l]) => (
              <button key={k} type="button" data-keys="own" className={`chip-btn s17-l ${k}`} aria-pressed={on[k]} onClick={() => setOn({ ...on, [k]: !on[k] })}>
                {l}
              </button>
            ))}
          </div>

          <div className="s17-thumbs" role="tablist" aria-label="Screens">
            {SCREENS.map((x, i) => (
              <button key={x.file} type="button" role="tab" data-keys="own" aria-selected={!video && sel === i} onClick={() => { setSel(i); setZoom(null); setVideo(false) }}>
                {x.name}
              </button>
            ))}
            {MEDIA.demoVideo && (
              <button type="button" role="tab" data-keys="own" aria-selected={video} onClick={() => { setVideo(true); setZoom(null) }}>
                Recording
              </button>
            )}
          </div>

          <ol className="s17-notes" aria-label={`Annotations for ${s.name}`}>
            {s.pins.map((p, i) =>
              on[p.layer] ? (
                <li key={i} className={p.layer}>
                  <i aria-hidden="true">{i + 1}</i>
                  <span>{p.text}</span>
                </li>
              ) : null,
            )}
          </ol>

          <dl className="s17-status small">
            <dt className="label">source</dt>
            <dd>
              <a href={LINKS.repo} target="_blank" rel="noreferrer">github.com/zyang91/TripLibre</a> · Apache-2.0 · DOI 10.5281/zenodo.23307589{' '}
              <Tag kind="repo" src="releases" />
            </dd>
            <dt className="label">App Store</dt>
            <dd>
              {APP_STORE.url ? (
                <a href={APP_STORE.url} target="_blank" rel="noreferrer">v{APP_STORE.version} on the App Store</a>
              ) : (
                <>
                  v{APP_STORE.version} submitted {APP_STORE.submittedOn} · <b>{APP_STORE.status}</b> · {APP_STORE.release}. Not live yet.
                </>
              )}{' '}
              <Tag kind="speaker" src="appStore" />
            </dd>
          </dl>
          <p className="xs muted">
            {video ? 'Screen recording supplied by the speaker.' : 'Screenshots: release kit, simulator with demo data — not recorded activity. Click the phone to zoom.'}
          </p>
        </div>

        <figure className="s17-phone">
          <div
            className={`s17-screen ${zoom ? 'zoomed' : ''}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('.s17-pin')) return
              const r = e.currentTarget.getBoundingClientRect()
              setZoom(zoom ? null : { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
            }}
          >
            <div className="s17-zoomer" style={zoom ? { transform: 'scale(2)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}>
              {video && MEDIA.demoVideo ? (
                <video src={MEDIA.demoVideo} controls muted playsInline aria-label="Screen recording of TripLibre" />
              ) : (
                <img src={`./assets/release/${s.file}.jpg`} alt={s.alt} />
              )}
              {!video && s.pins.map((p, i) =>
                on[p.layer] ? (
                  <span key={i} className={`s17-pin ${p.layer}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">
                    <i>{i + 1}</i>
                  </span>
                ) : null,
              )}
            </div>
          </div>
        </figure>
      </div>
    </Scene>
  )
}
