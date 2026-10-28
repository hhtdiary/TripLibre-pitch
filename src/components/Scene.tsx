import type { ReactNode } from 'react'

interface Props {
  n: number
  act: string
  aside?: ReactNode
  className?: string
  children: ReactNode
}

/** Shared frame: a running head in the notebook margin, then free layout. */
export function Scene({ n, act, aside, className, children }: Props) {
  return (
    <div className={`scene ${className ?? ''}`}>
      <div className="runhead" aria-hidden="true">
        <span>
          <b>{String(n).padStart(2, '0')}</b> / 22 · {act}
        </span>
        <span>{aside ?? 'TripLibre · GIS Day 2026'}</span>
      </div>
      {children}
    </div>
  )
}
