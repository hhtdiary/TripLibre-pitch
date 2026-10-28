import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Scene } from '../components/Scene'
import { Tag } from '../components/Tag'
import type { SceneProps } from '../types'

interface Row {
  demand: string
  role: string
  artifact: string
  ai: string
  decision: string
  proof: string
}

// Same demands on both sides; only the coordination model changes.
const ROWS: Row[] = [
  { demand: 'Research goal & measurement validity', role: 'research / domain lead', artifact: 'study rationale', ai: 'scans options, drafts protocol', decision: 'sets the question, from HHTS work', proof: 'validation page, held-out days' },
  { demand: 'User needs, scope, roadmap', role: 'product manager + UX researcher', artifact: 'PRD, roadmap', ai: 'lists alternatives, critiques', decision: 'prioritizes; says “not now”', proof: 'issues with acceptance criteria' },
  { demand: 'Interface & accessibility', role: 'designer + iOS engineer', artifact: 'mock-ups, specs', ai: 'drafts SwiftUI screens', decision: 'uses it daily; judges usability', proof: 'simulator checks, a11y score' },
  { demand: 'Architecture & alternatives', role: 'engineering lead', artifact: 'design doc', ai: 'explores options', decision: 'local-first; weighs maintenance', proof: 'repo structure, documented tradeoffs' },
  { demand: 'Code', role: 'iOS engineers (backend only if needed)', artifact: 'pull requests', ai: 'drafts PRs (Claude Code)', decision: 'reads diff, edits, merges', proof: 'build + tests in CI' },
  { demand: 'Data & inference', role: 'data / ML team + research lead', artifact: 'model evaluation', ai: 'proposes rules, harness', decision: 'validity, portability, autonomy', proof: 'replay on frozen days' },
  { demand: 'Bugs, regressions, edge cases', role: 'QA, security & privacy reviewers', artifact: 'test reports', ai: 'review findings, test ideas', decision: 'picks what matters; field-tests', proof: 'failing-then-passing tests, device' },
  { demand: 'Release & compliance', role: 'release manager', artifact: 'release gate', ai: 'drafts listing, notes', decision: 'decides readiness', proof: 'Apple App Review (external)' },
]

const STEP_POS = [100, 50, 0]

const OWNS = ['research hypothesis', 'product priorities', 'system requirements', 'interface acceptance criteria', 'architectural tradeoffs', 'final sign-off']

export function S10({ step, mode }: SceneProps) {
  const [pos, setPos] = useState(mode === 'explore' ? 50 : STEP_POS[step])
  const panels = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  useEffect(() => {
    if (mode === 'talk') setPos(STEP_POS[step])
  }, [step, mode])

  const fromPointer = (e: PointerEvent) => {
    const r = panels.current!.getBoundingClientRect()
    setPos(Math.round(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))))
  }
  const onKey = (e: KeyboardEvent) => {
    const k = e.key
    if (k === 'ArrowLeft' || k === 'ArrowDown') setPos((p) => Math.max(0, p - 5))
    else if (k === 'ArrowRight' || k === 'ArrowUp') setPos((p) => Math.min(100, p + 5))
    else if (k === 'Home') setPos(0)
    else if (k === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  const view = pos >= 95 ? 'distributed' : pos <= 5 ? 'orchestrated' : 'split'

  return (
    <Scene n={10} act="Two ways to organize" aside="signature comparison">
      <div className="s10-top">
        <h2 className="h2 s10-title">
          Same demands. <span className="it">Different coordination.</span>
        </h2>
        <div className="s10-toggle" role="group" aria-label="Choose a view">
          {(
            [
              ['distributed', 100, 'Traditional'],
              ['split', 50, 'Split'],
              ['orchestrated', 0, 'Researcher-led'],
            ] as const
          ).map(([k, p, l]) => (
            <button key={k} type="button" className="chip-btn" aria-pressed={view === k} data-keys="own" onClick={() => setPos(p)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="s10-board">
        <div className="s10-spine" aria-hidden="true">
          <div className="s10-h" />
          {ROWS.map((r) => (
            <div key={r.demand} className="s10-cell s10-demand">{r.demand}</div>
          ))}
        </div>

        <div
          className="s10-panels"
          ref={panels}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest('button.tag, .tag-pop')) return
            dragging.current = true
            ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
            fromPointer(e)
          }}
          onPointerMove={(e) => dragging.current && fromPointer(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <section className="s10-panel left" aria-label="Traditional development organization: how responsibilities are distributed">
            <div className="s10-h">
              <span className="label">Traditional development organization</span>
              <span className="s10-ptitle serif">How responsibilities are distributed</span>
            </div>
            {ROWS.map((r, i) => (
              <div key={r.demand} className="s10-cell s10-trad">
                <span className="sr-only">{r.demand}: </span>
                <span className="s10-role">{r.role}</span>
                <span className="s10-pass mono" aria-hidden="true">→</span>
                <span className="s10-ticket mono">{r.artifact}</span>
                {i < ROWS.length - 1 && <span className="s10-handoff mono" aria-hidden="true">↓</span>}
              </div>
            ))}
          </section>

          <section
            className="s10-panel right"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            aria-label="Researcher-led, AI-assisted build: how responsibilities are orchestrated"
          >
            <div className="s10-h">
              <span className="label">Researcher-led · AI-assisted</span>
              <span className="s10-ptitle serif">How responsibilities are orchestrated</span>
            </div>
            <div className="s10-owns">
              <p className="label" style={{ color: 'var(--accent)' }}>Zhanchao owns, at once</p>
              <ul>{OWNS.map((o) => <li key={o}>{o}</li>)}</ul>
              <p className="xs" style={{ color: '#9c978a' }}>AI tools research, draft, inspect, critique, iterate. Xcode, CI, devices and Apple stay external checks.</p>
            </div>
            <div className="s10-me" aria-hidden="true" />
            {ROWS.map((r) => (
              <div key={r.demand} className="s10-cell s10-orch">
                <span className="sr-only">{r.demand}: </span>
                <span className="s10-ai">{r.ai}</span>
                <span className="s10-dec">{r.decision}</span>
                <span className="s10-proof">{r.proof}</span>
              </div>
            ))}
          </section>

          <div
            className="s10-divider"
            style={{ left: `${pos}%` }}
            role="slider"
            tabIndex={0}
            aria-label="Reveal divider between traditional and researcher-led views"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pos}
            aria-valuetext={`${view} view`}
            onKeyDown={onKey}
          >
            <span className="s10-grip mono">⟷</span>
          </div>
        </div>
      </div>

      <div className="s10-foot">
        <div className="legend">
          <span><i className="dash" style={{ borderTopColor: 'var(--ink-2)' }} />recommendation (AI)</span>
          <span><i />decision (human)</span>
          <span><i className="proof" />proof (external check)</span>
        </div>
        <p className="xs muted">
          Not every app needs all these people, or a backend. No time or cost multiplier was measured. The human keeps final
          authority — and the risk of missed expertise. <Tag kind="research">coordination model</Tag>
        </p>
      </div>
    </Scene>
  )
}
