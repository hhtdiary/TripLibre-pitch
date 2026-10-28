import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { SCENES } from './data/scenes'
import { NOTES } from './data/notes'
import type { Mode } from './types'
import { ThemePicker, ThemeProvider, useTheme } from './theme'

const CHANNEL = 'triplibre-deck'
type Msg = { type: 'state'; index: number; step: number } | { type: 'nav'; dir: 1 | -1 } | { type: 'goto'; index: number } | { type: 'hello' }

function parseHash(): { index: number; step: number } {
  const m = location.hash.match(/scene-(\d+)(?:\/(\d+))?/)
  if (!m) return { index: 0, step: 0 }
  const found = SCENES.findIndex((s) => s.n === parseInt(m[1], 10))
  const index = found < 0 ? 0 : found
  const step = Math.min(parseInt(m[2] ?? '0', 10), SCENES[index].steps)
  return { index, step }
}

const isNarrow = () => window.matchMedia('(max-width: 760px)').matches

const LAST = SCENES[SCENES.length - 1].n
const num = (index: number) => String(SCENES[index].n).padStart(2, '0')

function sceneHash(index: number) {
  return `#/scene-${num(index)}`
}

/** Notes printed with {cues} picked out. */
function NoteText({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/)
  return <p>{parts.map((p, i) => (p.startsWith('{') ? <span key={i} className="cue">{p}</span> : p))}</p>
}

export default function App() {
  if (new URLSearchParams(location.search).has('presenter')) return <Presenter />
  return (
    <ThemeProvider>
      <Deck />
    </ThemeProvider>
  )
}

function Deck() {
  const initial = useMemo(parseHash, [])
  const [index, setIndex] = useState(initial.index)
  const [step, setStep] = useState(initial.step)
  const [mode, setMode] = useState<Mode>(() => (isNarrow() || new URLSearchParams(location.search).has('explore') ? 'explore' : 'talk'))
  const [overview, setOverview] = useState(false)
  const [notes, setNotes] = useState(false)
  const { cycle: cycleTheme } = useTheme()
  const channel = useRef<BroadcastChannel | null>(null)
  const scene = SCENES[index]

  const go = useCallback((i: number, s = 0) => {
    const ni = Math.min(Math.max(i, 0), SCENES.length - 1)
    setIndex(ni)
    setStep(Math.min(Math.max(s, 0), SCENES[ni].steps))
  }, [])

  const next = useCallback(() => {
    if (step < SCENES[index].steps) setStep(step + 1)
    else if (index < SCENES.length - 1) go(index + 1, 0)
  }, [index, step, go])

  const prev = useCallback(() => {
    if (step > 0) setStep(step - 1)
    else if (index > 0) go(index - 1, SCENES[index - 1].steps)
  }, [index, step, go])

  // Hash reflects the scene; back/forward and pasted deep links move the deck.
  useEffect(() => {
    const want = sceneHash(index)
    if (!location.hash.startsWith(want)) history.replaceState(null, '', want)
    document.title = `${num(index)} · ${scene.title} — A Travel Diary That Doesn't End`
  }, [index, scene.title])

  useEffect(() => {
    const onHash = () => {
      const h = parseHash()
      go(h.index, h.step)
      if (mode === 'explore') document.getElementById(`s-${h.index + 1}`)?.scrollIntoView()
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go, mode])

  // Presenter window sync.
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return
    const ch = new BroadcastChannel(CHANNEL)
    channel.current = ch
    ch.onmessage = (e: MessageEvent<Msg>) => {
      const m = e.data
      if (m.type === 'nav') (m.dir > 0 ? nextRef.current : prevRef.current)()
      if (m.type === 'goto') go(m.index, 0)
      if (m.type === 'hello') ch.postMessage({ type: 'state', index: idxRef.current, step: stepRef.current } satisfies Msg)
    }
    return () => ch.close()
  }, [go])
  const nextRef = useRef(next)
  const prevRef = useRef(prev)
  const idxRef = useRef(index)
  const stepRef = useRef(step)
  nextRef.current = next
  prevRef.current = prev
  idxRef.current = index
  stepRef.current = step
  useEffect(() => {
    channel.current?.postMessage({ type: 'state', index, step } satisfies Msg)
  }, [index, step])

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target instanceof Element ? e.target : document.body
      if (t.closest('input, textarea, select, [role="slider"], [data-keys="own"]') && !['Escape'].includes(e.key)) {
        if (!(t.closest('[data-keys="own"]') && (e.key === 'PageDown' || e.key === 'PageUp'))) return
      }
      if (overview) {
        if (e.key === 'Escape' || e.key === 'o') setOverview(false)
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          if (mode === 'explore' && e.key === ' ') return
          e.preventDefault()
          if (mode === 'explore') scrollToScene(index + 1)
          else next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          if (mode === 'explore') scrollToScene(index - 1)
          else prev()
          break
        case 'Home':
          if (mode === 'talk') go(0)
          break
        case 'End':
          if (mode === 'talk') go(SCENES.length - 1)
          break
        case 'o':
          setOverview(true)
          break
        case 'n':
          setNotes((v) => !v)
          break
        case 'e':
          setMode((m) => (m === 'talk' ? 'explore' : 'talk'))
          break
        case 'p':
          openPresenter()
          break
        case 't':
          cycleTheme()
          break
        case 'f':
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen?.()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, index, mode, overview, cycleTheme])

  const scrollToScene = (i: number) => {
    const c = Math.min(Math.max(i, 0), SCENES.length - 1)
    document.getElementById(`s-${c + 1}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  // Printing needs every scene on the page.
  useEffect(() => {
    let before: Mode = 'talk'
    const onBefore = () => {
      before = modeRef.current
      flushSync(() => setMode('explore'))
    }
    const onAfter = () => setMode(before)
    window.addEventListener('beforeprint', onBefore)
    window.addEventListener('afterprint', onAfter)
    return () => {
      window.removeEventListener('beforeprint', onBefore)
      window.removeEventListener('afterprint', onAfter)
    }
  }, [])
  const modeRef = useRef(mode)
  modeRef.current = mode

  // Explore mode: the scene in view becomes current.
  useEffect(() => {
    if (mode !== 'explore') return
    const els = SCENES.map((_, i) => document.getElementById(`s-${i + 1}`)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis) setIndex(Number(vis.target.id.slice(2)) - 1)
      },
      { threshold: [0.35, 0.6] },
    )
    els.forEach((el) => io.observe(el))
    requestAnimationFrame(() => document.getElementById(`s-${idxRef.current + 1}`)?.scrollIntoView())
    return () => io.disconnect()
  }, [mode])

  const openPresenter = () => {
    window.open(`${location.pathname}?presenter${sceneHash(index)}`, 'triplibre-presenter', 'width=1100,height=760')
  }

  const progress = mode === 'talk' ? ((index + step / (scene.steps + 1)) / (SCENES.length - 1)) * 100 : (index / (SCENES.length - 1)) * 100

  return (
    <>
      <a className="sr-only" href="#main">Skip to presentation</a>
      <div className="progress" style={{ width: `${Math.min(progress, 100)}%` }} aria-hidden="true" />

      {mode === 'explore' && (
        <nav className="explore-bar" aria-label="Presentation">
          <span className="ttl">A Travel Diary That Doesn’t End</span>
          <span style={{ flex: 1 }} />
          <span aria-live="polite">{num(index)} / {LAST}</span>
          {!isNarrow() && <ThemePicker />}
          <button type="button" onClick={() => setOverview(true)}>Index</button>
          {!isNarrow() && <button type="button" onClick={() => setMode('talk')}>Talk mode</button>}
        </nav>
      )}

      <main id="main" className={`deck ${mode}`} aria-roledescription="presentation">
        {mode === 'talk' ? (
          <section
            key={index}
            id={`s-${index + 1}`}
            className={`stage ${scene.tone ?? 'paper'}`}
            aria-roledescription="slide"
            aria-label={`${scene.n} of ${LAST}: ${scene.title}`}
          >
            <scene.Component step={step} active mode="talk" />
          </section>
        ) : (
          SCENES.map((s, i) => (
            <section
              key={s.n}
              id={`s-${i + 1}`}
              className={`stage ${s.tone ?? 'paper'}`}
              aria-roledescription="slide"
              aria-label={`${s.n} of ${LAST}: ${s.title}`}
            >
              <s.Component step={s.steps} active={i === index} mode="explore" />
            </section>
          ))
        )}

        {mode === 'talk' && (
          <div className={`chrome ${notes ? 'pinned' : ''}`}>
            <button type="button" onClick={prev} aria-label="Previous">←</button>
            <button type="button" onClick={next} aria-label="Next">→</button>
            <span className="count" aria-live="polite">
              {num(index)} / {LAST}
              {scene.steps > 0 && ` · build ${step}/${scene.steps}`}
            </span>
            <span>{scene.title}</span>
            <span className="spacer" />
            <ThemePicker />
            <button type="button" onClick={() => setOverview(true)}>index (o)</button>
            <button type="button" aria-pressed={notes} onClick={() => setNotes((v) => !v)}>notes (n)</button>
            <button type="button" onClick={openPresenter}>presenter (p)</button>
            <button type="button" onClick={() => setMode('explore')}>explore (e)</button>
          </div>
        )}
      </main>

      {notes && (
        <aside className="notes-drawer" aria-label="Speaker notes">
          <h3>Notes · {num(index)} {scene.title}</h3>
          {(NOTES[scene.n] ?? []).map((t, i) => <NoteText key={i} text={t} />)}
        </aside>
      )}

      {overview && (
        <Overview
          current={index}
          onPick={(i) => {
            setOverview(false)
            go(i, 0)
            if (mode === 'explore') requestAnimationFrame(() => scrollToScene(i))
          }}
          onClose={() => setOverview(false)}
        />
      )}
    </>
  )
}

function Overview({ current, onPick, onClose }: { current: number; onPick: (i: number) => void; onClose: () => void }) {
  const first = useRef<HTMLButtonElement>(null)
  useEffect(() => first.current?.focus(), [])
  const acts = [...new Set(SCENES.map((s) => s.act))]
  return (
    <div className="overview" role="dialog" aria-modal="true" aria-label="Scene index">
      <header>
        <h2>Index</h2>
        <button type="button" className="chip-btn" style={{ fontSize: 13 }} onClick={onClose}>Close (Esc)</button>
      </header>
      {acts.map((act) => (
        <div key={act}>
          <div className="acts">{act}</div>
          <ol>
            {SCENES.map((s, i) =>
              s.act !== act ? null : (
                <li key={s.n}>
                  <button type="button" ref={i === current ? first : undefined} aria-current={i === current} onClick={() => onPick(i)}>
                    <span className="n">{String(s.n).padStart(2, '0')}</span>
                    <span className="t">{s.title}</span>
                  </button>
                </li>
              ),
            )}
          </ol>
        </div>
      ))}
      <p style={{ marginTop: 28, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>
        Keys: → / Space next · ← back · o index · n notes · p presenter window · e explore mode · t theme · f fullscreen
      </p>
    </div>
  )
}

function Presenter() {
  const [state, setState] = useState(parseHash)
  const [start] = useState(() => Date.now())
  const [now, setNow] = useState(Date.now())
  const ch = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    const c = new BroadcastChannel(CHANNEL)
    ch.current = c
    c.onmessage = (e: MessageEvent<Msg>) => e.data.type === 'state' && setState({ index: e.data.index, step: e.data.step })
    c.postMessage({ type: 'hello' } satisfies Msg)
    const t = setInterval(() => setNow(Date.now()), 1000)
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) c.postMessage({ type: 'nav', dir: 1 } satisfies Msg)
      if (['ArrowLeft', 'PageUp'].includes(e.key)) c.postMessage({ type: 'nav', dir: -1 } satisfies Msg)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      c.close()
      clearInterval(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const s = SCENES[state.index]
  const nxt = SCENES[state.index + 1]
  const secs = Math.floor((now - start) / 1000)
  const send = (m: Msg) => ch.current?.postMessage(m)

  return (
    <main className="presenter">
      <div>
        <div className="meta">Presenter · keep this window on your laptop</div>
        <div className="clock" aria-label="Elapsed time">
          {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
        </div>
        <div className="meta" style={{ marginTop: 8 }}>Target 20–26 min · {LAST} scenes + cover</div>
        <div className="controls">
          <button type="button" onClick={() => send({ type: 'nav', dir: -1 })}>← back</button>
          <button type="button" onClick={() => send({ type: 'nav', dir: 1 })}>next →</button>
        </div>
        <label className="meta" htmlFor="jump">Jump to</label>
        <select
          id="jump"
          value={state.index}
          onChange={(e) => send({ type: 'goto', index: Number(e.target.value) })}
          style={{ display: 'block', marginTop: 6, fontSize: 16, padding: 6, width: '100%' }}
        >
          {SCENES.map((x, i) => <option key={x.n} value={i}>{String(x.n).padStart(2, '0')} {x.title}</option>)}
        </select>
        {nxt && <div className="next">Next: {String(nxt.n).padStart(2, '0')} {nxt.title}</div>}
      </div>
      <div>
        <div className="meta">
          {String(s.n).padStart(2, '0')} / {LAST} · {s.act} {s.steps > 0 && `· build ${state.step}/${s.steps}`}
        </div>
        <h1>{s.title}</h1>
        <div className="notes">
          {(NOTES[s.n] ?? []).map((t, i) => <NoteText key={i} text={t} />)}
        </div>
      </div>
    </main>
  )
}
