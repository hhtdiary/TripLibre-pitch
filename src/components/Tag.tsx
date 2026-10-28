import { useEffect, useId, useRef, useState } from 'react'
import { SOURCES, type SourceKey } from '../data/evidence'

const REGISTER: Record<string, { text: string; href?: string }> = SOURCES

export type TagKind = 'repo' | 'research' | 'illus' | 'future' | 'speaker'

const KIND_LABEL: Record<TagKind, string> = {
  repo: 'Verified in repo',
  research: 'Research rationale',
  illus: 'Illustrative',
  future: 'Future work',
  speaker: 'Speaker account',
}

interface Props {
  kind: TagKind
  /** Key into the evidence register. */
  src?: SourceKey
  /** Short visible text; defaults to the kind label. */
  children?: string
}

/** Provenance chip. Click to see where a claim comes from. */
export function Tag({ kind, src, children }: Props) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const ref = useRef<HTMLSpanElement>(null)
  const source = src ? REGISTER[src] : undefined

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className={`tag ${kind}`}
        aria-expanded={open}
        aria-controls={id}
        data-keys="own"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      >
        {children ?? KIND_LABEL[kind]}
      </button>
      {open && (
        <span id={id} role="note" className="tag-pop">
          <b>{KIND_LABEL[kind]}</b>
          {source ? (
            <>
              {source.text}{' '}
              {source.href && (
                <a href={source.href} target="_blank" rel="noreferrer">
                  source ↗
                </a>
              )}
            </>
          ) : (
            DEFAULT_TEXT[kind]
          )}
        </span>
      )}
    </span>
  )
}

const DEFAULT_TEXT: Record<TagKind, string> = {
  repo: 'Checked against the TripLibre repository.',
  research: 'A reasoned position, not a measured result.',
  illus: 'A drawing to explain an idea. Not data.',
  future: 'Planned or open. Not shipped.',
  speaker: "The speaker's own account; not independently documented in the repository.",
}
