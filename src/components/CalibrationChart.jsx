import { useEffect, useMemo, useState } from 'react'

const W = 524
const H = 210
const BASE = 196
const TOP = 22

// Illustrative delay distribution for one lane: a heavy-tailed lognormal.
// Shape only; there is no data behind these pixels and the card says so.
function buildCurve() {
  const mu = 0.2
  const s = 0.55
  const samples = []
  let max = 0
  for (let i = 1; i <= 140; i++) {
    const u = (i / 140) * 4
    const y = Math.exp(-0.5 * ((Math.log(u) - mu) / s) ** 2) / (u * s)
    samples.push([u, y])
    max = Math.max(max, y)
  }
  const pts = samples.map(([u, y]) => [(u / 4) * W, BASE - (y / max) * (BASE - TOP)])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return { line, area: `${line} L${W} ${BASE} L0 ${BASE} Z` }
}

const MODES = {
  single: {
    label: 'One global quantile',
    x: 205,
    caption: 'The same cut for every lane. A lane with a heavy late tail breaches more often.',
  },
  lane: {
    label: 'Per-lane calibration',
    x: 340,
    caption: 'The promise is set from each lane’s own history, so the late tail shrinks.',
  },
}

export default function CalibrationChart() {
  const [mode, setMode] = useState('single')
  const [paused, setPaused] = useState(false)
  const { line, area } = useMemo(buildCurve, [])
  const x = MODES[mode].x

  // Gentle auto-cycle until the visitor takes over. Skipped for reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setMode((m) => (m === 'single' ? 'lane' : 'single')), 4200)
    return () => clearInterval(id)
  }, [paused])

  const pick = (m) => {
    setPaused(true)
    setMode(m)
  }

  return (
    <div
      className="flex flex-col gap-4"
      onPointerEnter={() => setPaused(true)}
      onFocus={() => setPaused(true)}
    >
      <div
        role="img"
        aria-label={`Illustrative delivery-time distribution for one lane. With ${MODES[mode].label.toLowerCase()}, the promise date sits ${
          mode === 'single' ? 'earlier, leaving a larger late tail' : 'later, leaving a smaller late tail'
        }.`}
        className="relative"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={area} fill="#10131F" fillOpacity="0.08" />
          <path d={line} fill="none" stroke="#10131F" strokeWidth="2" strokeLinejoin="round" />
          <line x1="0" x2={W} y1={BASE} y2={BASE} stroke="#10131F" strokeWidth="1" />
        </svg>

        {/* Late-tail fill: same curve in cobalt, clipped to the right of the promise */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-tail absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 0 0 ${(x / W) * 100}%)` }}
          aria-hidden="true"
        >
          <path d={area} fill="#2447C8" fillOpacity="0.5" />
        </svg>

        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g className="chart-marker" style={{ transform: `translateX(${x}px)` }}>
            <line x1="0" x2="0" y1="8" y2={BASE} stroke="#2447C8" strokeWidth="2" strokeDasharray="6 5" />
            <circle cx="0" cy="8" r="5" fill="#2447C8" />
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-xs">
        <span className="font-medium text-cobalt">Promise date</span>
        <span className="text-ink/75">Late tail = breach</span>
      </div>

      <div role="group" aria-label="Calibration method" className="grid grid-cols-2 gap-1 rounded-full bg-ink/8 p-1">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => pick(key)}
            className={`press rounded-full px-3 py-2.5 text-[13px] font-semibold ${
              mode === key ? 'bg-ink text-paper' : 'text-ink/80 hover:text-ink'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="min-h-[2.5rem] text-sm leading-5 text-ink/80">
        {MODES[mode].caption}
      </p>
    </div>
  )
}
