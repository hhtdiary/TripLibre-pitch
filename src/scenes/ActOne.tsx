import { Scene } from '../components/Scene'
import { Tag } from '../components/Tag'
import { rv } from '../components/reveal'
import type { SceneProps } from '../types'
import { ThemePicker } from '../theme'

const ACT = 'Before the app'

/* 01 ──────────────────────────────────────────── A diary of one day */
export function S01({ step }: SceneProps) {
  return (
    <Scene n={1} act={ACT} aside="Zhanchao Yang · University of Pennsylvania">
      <ThemePicker onStage />
      <svg className="s01-trace m-hide" viewBox="0 0 1000 560" aria-hidden="true" preserveAspectRatio="none">
        <path
          className={step >= 1 ? 'drawn' : ''}
          pathLength={1}
          d="M 640 70 C 700 120, 820 110, 860 170 S 760 250, 820 300 S 930 330, 900 370"
        />
        <circle cx="640" cy="70" r="7" />
        <circle className={rv(step, 1, 'gone')} cx="900" cy="370" r="7" />
        <text x="656" y="62">08:20 · left home</text>
        <text className={rv(step, 1, 'gone')} x="886" y="374" textAnchor="end">arrived · 08:30</text>
      </svg>

      <div className="s01-lines">
        <p className="h1">A trip starts.</p>
        <p className={`h1 ${rv(step, 1)}`}>A trip ends.</p>
        <p className={`h1 ${rv(step, 2)}`}>
          A day becomes <span className="accent it">data.</span>
        </p>
      </div>

      <figure className={`s01-form ${rv(step, 2)}`} aria-label="A blank trip-diary row, drawn for this talk">
        <div className="row head mono">
          <span>trip</span><span>left at</span><span>arrived</span><span>from → to</span><span>mode</span><span>purpose</span>
        </div>
        {[1, 2, 3].map((r) => (
          <div className="row" key={r}>
            <span className="mono">{String(r).padStart(2, '0')}</span><span /><span /><span /><span /><span />
          </div>
        ))}
        <figcaption>
          <Tag kind="illus">blank template, drawn for this talk</Tag>
        </figcaption>
      </figure>
    </Scene>
  )
}

/* 02 ─────────────────────────────────────── I became a user of HHTS */
export function S02({ step }: SceneProps) {
  // Simplified redrawing of the published curve: 3.8 trips at 0 h,
  // turn at ~2.8 h, ≈2.9 at 8 h. Shape only; not regression output.
  const pts = [
    [0, 3.83], [1, 3.98], [2, 4.08], [2.8, 4.11], [4, 4.0], [5, 3.75], [6, 3.42], [7, 3.12], [8, 2.92],
  ]
  const x = (h: number) => 40 + h * 57
  const y = (t: number) => 250 - (t - 2.6) * 110
  const d = pts.map(([h, t], i) => `${i ? 'L' : 'M'} ${x(h)} ${y(t)}`).join(' ')
  return (
    <Scene n={2} act={ACT}>
      <div className="s02 m-stack">
        <div className="s02-left">
          <p className="label">Master’s thesis · Penn · 2025–26</p>
          <h2 className="h2" style={{ marginTop: '0.4em' }}>
            I became a <span className="it">user</span> of household travel surveys.
          </h2>
          <p className="lede" style={{ marginTop: '1em' }}>
            Twin Cities Travel Behavior Inventory. Telework measured in hours, not yes/no.
          </p>
          <div className="s02-waves">
            {['2019', '2021', '2023'].map((w, i) => (
              <div key={w} className={`s02-wave paper-card ${rv(step, 1)}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="mono xs muted">wave</span>
                <span className="serif" style={{ fontSize: 'var(--t-xl)' }}>{w}</span>
                <span className="s02-day" aria-hidden="true" />
                <span className="mono xs muted">one weekday per person</span>
              </div>
            ))}
          </div>
          <p className={`small mono ${rv(step, 1)}`} style={{ marginTop: '1.2em' }}>
            34,800 person-days · 19,164 workers <Tag kind="repo" src="thesis">thesis page</Tag>
          </p>
        </div>

        <figure className="s02-chart" aria-label="Weekday trips rise with partial telework, then fall; turning point near 2.7 to 2.9 hours.">
          <svg viewBox="0 0 520 300" role="img" aria-hidden="true">
            {[3, 3.5, 4].map((t) => (
              <g key={t}>
                <line x1="40" x2="500" y1={y(t)} y2={y(t)} className="grid" />
                <text x="34" y={y(t) + 4} textAnchor="end">{t.toFixed(1)}</text>
              </g>
            ))}
            {[0, 2, 4, 6, 8].map((h) => (
              <text key={h} x={x(h)} y="284" textAnchor="middle">{h}h</text>
            ))}
            <rect x={x(2.7)} width={x(2.9) - x(2.7)} y="20" height="240" className="band" />
            <path d={d} className="curve" />
            <text x={x(2.8) + 10} y="34" className="ann">turn ≈ 2.7–2.9 h</text>
          </svg>
          <figcaption className="xs muted">
            Predicted weekday trips by daily telework hours — <em>simplified redrawing</em>; manuscript under review.
          </figcaption>
        </figure>
      </div>
      <p className={`s02-punch note-hand ${rv(step, 2)}`}>
        A powerful instrument. Also a bounded record: each person, one day.
      </p>
    </Scene>
  )
}

/* 03 ───────────────────────────────── Then I saw it from the other side */
export function S03({ step }: SceneProps) {
  return (
    <Scene n={3} act={ACT} aside="research note">
      <h2 className="h2 s03-title">Then I saw the survey from the other side.</h2>
      <div className="s03 m-stack">
        <section className="s03-col">
          <p className="label">Analysing records</p>
          <table className="s03-table mono">
            <thead>
              <tr><th>person_day</th><th>trip</th><th>o → d</th><th>mode</th></tr>
            </thead>
            <tbody>
              {[
                ['…041', '1', 'home → work', 'transit'],
                ['…041', '2', 'work → shop', 'walk'],
                ['…041', '3', 'shop → home', 'walk'],
              ].map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
          <p className="small muted" style={{ marginTop: '1em' }}>The row is the truth. Clean, coded, weighted.</p>
          <Tag kind="illus">invented rows</Tag>
        </section>

        <div className="s03-arrow m-hide" aria-hidden="true">→</div>

        <section className={`s03-col ${rv(step, 1)}`}>
          <p className="label">Watching observations get collected</p>
          <svg viewBox="0 0 300 200" className="s03-drift" role="img" aria-label="Illustration: a GPS trace wandering around a building while the person sits still.">
            <rect x="90" y="50" width="120" height="100" className="bldg" />
            <text x="150" y="44" textAnchor="middle">a building</text>
            <path d="M150 100 l18 -22 l-30 -8 l-10 30 l34 14 l12 -26 l-40 -18 l-14 40 l46 6 l-6 -34 l-28 10 l20 26 l24 -40 l-50 2" className="wander" />
            <circle cx="150" cy="100" r="5" className="seat" />
            <text x="150" y="180" textAnchor="middle">● seated, not moving</text>
          </svg>
          <p className="small" style={{ marginTop: '0.6em' }}>
            The trace wanders. The person doesn’t.
          </p>
          <div style={{ display: 'flex', gap: '0.6em', flexWrap: 'wrap', marginTop: '0.6em' }}>
            <Tag kind="repo" src="drift48">issue #48</Tag>
            <Tag kind="illus">redrawn, not the real trace</Tag>
          </div>
        </section>
      </div>
      <p className={`s03-foot ${rv(step, 2)}`}>
        <span className="label">Philadelphia household travel survey</span>{' '}
        <Tag kind="speaker" src="phillyRole">speaker to state role</Tag>
        <br />
        <span className="note-hand">From using data → to asking how it is built and sustained.</span>
      </p>
    </Scene>
  )
}

/* 04 ──────────────────────────────────────────── The question changed */
export function S04({ step }: SceneProps) {
  const horizons = ['One day.', 'One wave.', 'Years.']
  return (
    <Scene n={4} act={ACT}>
      <div className={`s04-horizon ${step >= 3 ? 'small' : ''}`}>
        {horizons.map((h, i) => (
          <p key={h} className={`s04-word ${step === i ? 'on' : step > i ? 'past' : 'future'} ${i === 2 ? 'years' : ''}`}>
            {h}
          </p>
        ))}
      </div>

      <svg className="s04-axis m-hide" viewBox="0 0 1000 60" aria-hidden="true" preserveAspectRatio="none">
        <line x1="0" x2="1000" y1="30" y2="30" className="base" />
        <rect x="120" y="14" width="14" height="32" className={step >= 0 ? 'day' : ''} />
        {[300, 320, 340, 360, 380, 395].map((x, i) => (
          <rect key={x} x={x} y="14" width="10" height="32" className={`wave ${step >= 1 ? 'on' : ''}`} style={{ transitionDelay: `${i * 60}ms` }} />
        ))}
        <line x1="520" x2="1000" y1="30" y2="30" className={`years ${step >= 2 ? 'on' : ''}`} />
      </svg>

      <div className={`s04-q ${rv(step, 3)}`}>
        <p className="lede it serif" style={{ fontSize: 'var(--t-lg)' }}>
          I had spent years asking what travel diaries could tell us.
          <br />
          Eventually I started asking why the diary had to end.
        </p>
        <p className="h1" style={{ marginTop: '0.5em' }}>
          What if a travel diary belonged to <span className="accent it">its user</span>,<br />
          not just to a research project?
        </p>
        <p className="s04-words mono">autonomy · freedom · continuity · stability</p>
        <p className="xs muted" style={{ marginTop: '0.8em', maxWidth: '46em' }}>
          Continuity of a <b>tool</b> ≠ continuity of a validated research <b>sample</b>. Whether people keep using it, and whom they
          represent, are open questions. <Tag kind="research">rationale, not result</Tag>
        </p>
      </div>

      <div className={`s04-quiet ${step >= 4 ? 'on' : ''}`} aria-hidden={step < 4}>
        <p className="mega s04-autonomy">AUTONOMY</p>
        <ul className="s04-qs">
          <li>Who decides when to collect?</li>
          <li>Who can correct?</li>
          <li>Can the tool survive the original study?</li>
        </ul>
      </div>
    </Scene>
  )
}

/* 05 ───────────────────────────────────── Not another survey. A tool. */
export function S05({ step }: SceneProps) {
  const days = Array.from({ length: 60 }, (_, i) => i)
  // A person's own rhythm: paused stretches and corrected days. Illustrative.
  const paused = new Set([18, 19, 20, 21, 41, 42])
  const corrected = new Set([5, 12, 27, 33, 48, 55])
  return (
    <Scene n={5} act={ACT}>
      <h2 className="h2" style={{ maxWidth: '20em' }}>
        Not another survey. <span className="it">A durable tool.</span>
      </h2>

      <div className="s05-lanes">
        <div className="s05-lane">
          <p className="label">Survey campaign · bounded by design</p>
          <div className="s05-track">
            <span className="s05-phase">recruit</span>
            <span className="s05-phase strong">diary day(s)</span>
            <span className="s05-phase">close · clean · weight</span>
            <span className="s05-phase">release</span>
            <span className="s05-end mono xs">ends</span>
          </div>
          <p className="xs muted">Sampling frames, weighting, representativeness, harmonized data. Still indispensable.</p>
        </div>

        <div className={`s05-lane ${rv(step, 1)}`}>
          <p className="label">Personal diary · always available, by choice</p>
          <div className="s05-days" role="img" aria-label="A row of days: most recorded, a few paused by the user, some corrected.">
            {days.map((d) => (
              <span key={d} className={paused.has(d) ? 'p' : corrected.has(d) ? 'c' : ''} />
            ))}
            <span className="s05-arrow mono xs">continues →</span>
          </div>
          <div className="legend" style={{ marginTop: '0.6em' }}>
            <span><i style={{ borderTopColor: 'var(--ink)' }} />recorded</span>
            <span><i className="dash" />paused by the user</span>
            <span><i className="proof" />corrected in one or two taps</span>
            <Tag kind="illus">pattern, not a user</Tag>
          </div>
        </div>
      </div>

      <div className={`s05-why m-stack ${rv(step, 2)}`}>
        <p><b>Stability</b><br /><span className="muted small">raw data never overwritten; inference rebuildable</span> <Tag kind="repo" src="layers">3 layers</Tag></p>
        <p><b>Transparent correction</b><br /><span className="muted small">every edit locked and audit-logged</span></p>
        <p><b>Low friction</b><br /><span className="muted small">no account, no server; export when you choose</span> <Tag kind="repo" src="localFirst">local-first</Tag></p>
        <p className="note-hand" style={{ fontSize: 'var(--t-body)' }}>An exploratory complement — not a proven replacement.</p>
      </div>
    </Scene>
  )
}
