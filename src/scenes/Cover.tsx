import { Scene } from '../components/Scene'
import { ThemePicker } from '../theme'
import type { SceneProps } from '../types'

/* 00 ──────────────────────────────────────────────── Title cover */
export function S00(_: SceneProps) {
  return (
    <Scene n={0} act="Cover" aside="GIS Day 2026">
      <ThemePicker onStage />
      <div className="s00 m-stack">
        <div className="s00-main">
          <p className="s00-bubble">I didn’t set out to build an app.</p>
          <h1 className="s00-title">
            A travel diary that <span className="accent">doesn’t end.</span>
          </h1>
          <p className="s00-sub">
            From household travel surveys to participant-controlled mobility data — built through human judgment and AI delegation.
          </p>
          <div className="s00-who">
            <span className="s00-name">Zhanchao Yang</span>
            <span className="s00-aff">University of Pennsylvania</span>
          </div>
        </div>

        <div className="s00-tiles" aria-label="Time horizons: one day, one wave, years">
          <div className="s00-tile t1">
            <span className="s00-big">1 day</span>
            <span className="s00-small">a survey diary</span>
          </div>
          <div className="s00-tile t2">
            <span className="s00-big">1 wave</span>
            <span className="s00-small">a survey cycle</span>
          </div>
          <div className="s00-tile t3">
            <svg className="s00-pin" viewBox="0 0 64 76" aria-hidden="true">
              <path d="M32 74 C 14 52, 4 40, 4 28 A 28 28 0 0 1 60 28 C 60 40, 50 52, 32 74 Z" />
              <circle cx="23" cy="26" r="3.5" />
              <circle cx="41" cy="26" r="3.5" />
              <path className="smile" d="M24 36 q8 7 16 0" />
            </svg>
            <span>
              <span className="s00-big">years</span>
              <span className="s00-small">a diary you choose to keep</span>
            </span>
          </div>
          <div className="s00-tile t4">autonomy · continuity · correction</div>
        </div>
      </div>
    </Scene>
  )
}
