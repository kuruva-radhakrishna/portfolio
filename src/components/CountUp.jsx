import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// Counts from 0 to `to` once, when scrolled into view. Final value is the
// server-rendered default, so nothing depends on the animation running.
export default function CountUp({ to, decimals = 0, suffix = '', duration = 1.4, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!inView || reduce) return
    setN(0)
    const controls = animate(0, to, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}
