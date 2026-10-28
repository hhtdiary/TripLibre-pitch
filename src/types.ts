import type { FC } from 'react'

export type Mode = 'talk' | 'explore'

export interface SceneProps {
  /** Current build step, 0..steps. In explore mode it is always `steps`. */
  step: number
  active: boolean
  mode: Mode
}

export interface SceneDef {
  n: number
  slug: string
  title: string
  act: string
  /** Number of build steps after the initial state. */
  steps: number
  tone?: 'paper' | 'ink' | 'wash'
  Component: FC<SceneProps>
}
