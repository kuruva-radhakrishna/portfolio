import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowsHorizontal } from '@phosphor-icons/react'

// Illustrative delivery-time distribution for one lane: a heavy-tailed lognormal.
// Each square is a parcel. There is no data behind them and the page says so.
const MU = 0.2
const SIGMA = 0.55
const U_MAX = 4
const lognormal = (u) => Math.exp(-0.5 * ((Math.log(u) - MU) / SIGMA) ** 2) / (u * SIGMA)

const PRESETS = { single: 0.4, lane: 0.65 }
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

const COLORS = { paper: '#F4F3EE', ink: '#10131F' }

export default function ParcelField() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const knobRef = useRef(null)
  const sim = useRef({ target: PRESETS.single, x: PRESETS.single, v: 0, touched: false, draw: null })
  const [value, setValue] = useState(PRESETS.single)
  const [mode, setMode] = useState('single')

  const moveTo = (frac, { user = true, preset = null } = {}) => {
    const s = sim.current
    s.target = clamp(frac, 0.06, 0.95)
    if (user) s.touched = true
    setValue(s.target)
    setMode(preset)
    if (reduce) {
      s.x = s.target
      s.v = 0
      s.draw?.()
    }
  }

  // Teach the interaction once: glide from the global quantile to per-lane.
  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => {
      if (!sim.current.touched) moveTo(PRESETS.lane, { user: false, preset: 'lane' })
    }, 1800)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const knob = knobRef.current
    const ctx = canvas.getContext('2d')
    const s = sim.current

    let W = 0
    let H = 0
    let nb = 0
    let binW = 0
    let d = 0
    let axisY = 0
    let pileH = 0
    let maxStack = 0
    let weights = []
    let targets = []
    let cum = []
    let bins = []
    let falling = []
    let raf = 0
    let last = 0
    let visible = true
    let spawnAcc = 0

    const build = () => {
      const r = wrap.getBoundingClientRect()
      W = r.width
      H = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const small = W < 640
      nb = Math.max(18, Math.round(W / (small ? 16 : 20)))
      binW = W / nb
      d = Math.max(6, binW - 3)
      axisY = H - (small ? 128 : 104)
      pileH = Math.min(H * (small ? 0.22 : 0.34), 340)
      maxStack = Math.max(4, Math.floor(pileH / (d + 2)))

      const raw = []
      let max = 0
      for (let i = 0; i < nb; i++) {
        const w = lognormal(((i + 0.5) / nb) * U_MAX)
        raw.push(w)
        max = Math.max(max, w)
      }
      weights = raw.map((w) => w / max)
      targets = weights.map((w) => Math.max(Math.round(w * maxStack), w > 0.03 ? 1 : 0))
      let acc = 0
      cum = weights.map((w) => (acc += w))
      bins = targets.map((n) => Array.from({ length: n }, (_, k) => ({ y: axisY - (k + 1) * (d + 2) })))
      falling = []

      // Position the drag handle over the pile.
      const top = axisY - pileH - 56
      knob.style.top = `${Math.max(top, 96)}px`
      knob.style.height = `${axisY - Math.max(top, 96)}px`
    }

    const pickBin = () => {
      const r = Math.random() * cum[cum.length - 1]
      let lo = 0
      let hi = cum.length - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (cum[mid] < r) lo = mid + 1
        else hi = mid
      }
      return lo
    }

    const square = (x, y, size) => {
      if (ctx.roundRect) {
        ctx.beginPath()
        ctx.roundRect(x, y, size, size, 3)
        ctx.fill()
      } else {
        ctx.fillRect(x, y, size, size)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const px = s.x * W
      knob.style.transform = `translate3d(${px}px,0,0)`

      // Late-arrival zone
      ctx.fillStyle = 'rgba(16,19,31,0.22)'
      const zoneTop = Math.max(axisY - pileH - 56, 96)
      ctx.fillRect(px, zoneTop, W - px, axisY - zoneTop)

      // Axis
      ctx.fillStyle = 'rgba(244,243,238,0.55)'
      ctx.fillRect(0, axisY, W, 1.5)

      // Parcels in flight
      ctx.globalAlpha = 0.55
      for (const f of falling) {
        const late = (f.b + 0.5) / nb > s.x
        ctx.fillStyle = late ? COLORS.ink : COLORS.paper
        square(f.x - d / 2, f.y, d)
      }
      ctx.globalAlpha = 1

      // Parcels at rest
      for (let b = 0; b < nb; b++) {
        const late = (b + 0.5) / nb > s.x
        const x = b * binW + (binW - d) / 2
        const col = bins[b]
        if (late) {
          ctx.fillStyle = COLORS.ink
          ctx.strokeStyle = 'rgba(244,243,238,0.45)'
          ctx.lineWidth = 1
          for (const dot of col) {
            square(x, dot.y, d)
            ctx.strokeRect(x + 0.5, dot.y + 0.5, d - 1, d - 1)
          }
        } else {
          ctx.fillStyle = COLORS.paper
          for (const dot of col) square(x, dot.y, d)
        }
      }
    }
    s.draw = draw

    const frame = (t) => {
      raf = requestAnimationFrame(frame)
      if (!visible) {
        last = t
        return
      }
      const dt = Math.min((t - last) / 1000 || 0.016, 0.05)
      last = t

      // Promise line: a real spring, so a drag feels weighted and a preset glides.
      const k = 170
      const c = 22
      s.v += (k * (s.target - s.x) - c * s.v) * dt
      s.x += s.v * dt

      // Spawn parcels
      spawnAcc += dt * 16
      while (spawnAcc >= 1) {
        spawnAcc -= 1
        const b = pickBin()
        falling.push({ b, x: (b + 0.5) * binW, y: -12, vy: 0 })
      }

      // Fall, land, and keep each column at its target height
      for (let i = falling.length - 1; i >= 0; i--) {
        const f = falling[i]
        f.vy += 1700 * dt
        f.y += f.vy * dt
        const slotY = axisY - (bins[f.b].length + 1) * (d + 2)
        if (f.y >= slotY) {
          bins[f.b].push({ y: slotY })
          if (bins[f.b].length > targets[f.b]) bins[f.b].shift()
          falling.splice(i, 1)
        }
      }
      const ease = 1 - Math.exp(-dt * 14)
      for (let b = 0; b < nb; b++) {
        const col = bins[b]
        for (let k2 = 0; k2 < col.length; k2++) {
          col[k2].y += (axisY - (k2 + 1) * (d + 2) - col[k2].y) * ease
        }
      }
      draw()
    }

    build()
    draw()

    const ro = new ResizeObserver(() => {
      build()
      draw()
    })
    ro.observe(wrap)

    let io
    if (!reduce) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting
      })
      io.observe(wrap)
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io?.disconnect()
      s.draw = null
    }
  }, [reduce])

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!(e.buttons & 1) && e.pointerType === 'mouse') return
    const r = wrapRef.current.getBoundingClientRect()
    moveTo((e.clientX - r.left) / r.width)
  }
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 0.08 : 0.025
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') moveTo(sim.current.target + step)
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') moveTo(sim.current.target - step)
    else if (e.key === 'Home') moveTo(0.06)
    else if (e.key === 'End') moveTo(0.95)
    else return
    e.preventDefault()
  }

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Promise-date handle: a real slider, draggable and keyboard operable */}
      <div
        ref={knobRef}
        className="knob absolute left-0 w-0"
        style={{ top: 96, height: 300 }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Promise date"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value * 100)}
          aria-valuetext={`Promise date at ${Math.round(value * 100)} percent along the delivery-time axis. Parcels to the right arrive late.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
          className="knob absolute -left-[22px] top-0 h-full w-[44px]"
        >
          <span className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2 border-l-2 border-dashed border-paper" />
          <span className="pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[13px] font-semibold text-paper shadow-[0_10px_24px_-12px_rgba(16,19,31,0.8)]">
            <ArrowsHorizontal size={16} weight="bold" aria-hidden="true" />
            Promise date
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1360px] flex-col gap-4 px-5 pb-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-20">
        <p className="max-w-[44ch] text-sm leading-5 text-paper/90">
          Each square is a parcel. Drag the promise date: dark parcels arrive after it. Illustrative, not real data.
        </p>
        <div
          role="group"
          aria-label="Calibration method"
          className="pointer-events-auto flex w-full gap-1 rounded-full bg-ink/35 p-1 md:w-auto"
        >
          {[
            ['single', 'One global quantile'],
            ['lane', 'Per-lane calibration'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => moveTo(PRESETS[key], { preset: key })}
              className={`press flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold md:flex-none ${
                mode === key ? 'bg-paper text-ink' : 'text-paper hover:bg-paper/15'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
