import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export const THEMES = [
  { id: 'app', label: 'App UI' },
  { id: 'tech', label: 'Tech' },
  { id: 'academic', label: 'Academic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'notebook', label: 'Notebook' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

const DEFAULT: ThemeId = 'app'
const KEY = 'triplibre-theme'
const isTheme = (v: unknown): v is ThemeId => THEMES.some((t) => t.id === v)

/** ?theme= wins (shareable links), then the viewer's last choice, then A. */
function initialTheme(): ThemeId {
  const q = new URLSearchParams(location.search).get('theme')
  if (isTheme(q)) return q
  try {
    const saved = localStorage.getItem(KEY)
    if (isTheme(saved)) return saved
  } catch {
    // storage blocked: fall through to the default
  }
  return DEFAULT
}

interface Ctx {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  cycle: () => void
}

const ThemeContext = createContext<Ctx>({ theme: DEFAULT, setTheme: () => {}, cycle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // not persisted; the theme still applies for this visit
    }
  }, [theme])

  const cycle = useCallback(() => {
    setTheme((t) => THEMES[(THEMES.findIndex((x) => x.id === t) + 1) % THEMES.length].id)
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

/** Segmented control; `onStage` places it on the cover scene. */
export function ThemePicker({ onStage = false }: { onStage?: boolean }) {
  const { theme, setTheme } = useTheme()
  return (
    <div className={`theme-picker ${onStage ? 'on-stage' : ''}`} role="group" aria-label="Theme">
      {onStage && <span className="tp-label">Theme (t)</span>}
      {THEMES.map((t, i) => (
        <button
          key={t.id}
          type="button"
          data-keys="own"
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id)}
        >
          {String.fromCharCode(65 + i)} · {t.label}
        </button>
      ))}
    </div>
  )
}
