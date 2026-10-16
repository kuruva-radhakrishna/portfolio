import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { projects } from '../data.js'
import CountUp from './CountUp.jsx'

const TONES = {
  paper: { card: 'bg-paper text-ink', sub: 'text-ink/80', chip: 'border-ink/35', rule: 'border-ink/25', link: 'border-ink/40 hover:bg-ink hover:text-paper' },
  ink: { card: 'bg-ink text-paper', sub: 'text-paper/80', chip: 'border-paper/35', rule: 'border-paper/25', link: 'border-paper/40 hover:bg-paper hover:text-ink' },
  deep: { card: 'bg-cobalt-deep text-paper', sub: 'text-paper/85', chip: 'border-paper/40', rule: 'border-paper/30', link: 'border-paper/45 hover:bg-paper hover:text-ink' },
}

// Ticket notches where the dashed tear line meets each edge.
const NOTCH_Y = 72
const notchMask = {
  WebkitMaskImage: `radial-gradient(circle 13px at 0 ${NOTCH_Y}px, #0000 12.5px, #000 13px), radial-gradient(circle 13px at 100% ${NOTCH_Y}px, #0000 12.5px, #000 13px)`,
  maskImage: `radial-gradient(circle 13px at 0 ${NOTCH_Y}px, #0000 12.5px, #000 13px), radial-gradient(circle 13px at 100% ${NOTCH_Y}px, #0000 12.5px, #000 13px)`,
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
}

function StackCard({ p, i, n, progress }) {
  const reduce = useReducedMotion()
  const t = TONES[p.tone]
  const scale = useTransform(progress, [i / n, (i + 1) / n], [1, reduce || i === n - 1 ? 1 : 0.95])

  return (
    <div className="mb-8 lg:sticky lg:mb-[16vh] last:mb-0" style={{ top: `calc(92px + ${i * 22}px)` }}>
      <motion.article
        aria-labelledby={`${p.id}-title`}
        style={{ scale, transformOrigin: '50% 0%', ...notchMask }}
        className={`relative rounded-2xl ${t.card} shadow-[0_30px_50px_-30px_rgba(16,19,31,0.7)]`}
      >
        <div className="absolute inset-x-0 top-0 flex h-[72px] items-center justify-between gap-4 px-7 md:px-10">
          <p className="font-mono text-xs font-medium tracking-[0.12em] opacity-75">{p.id}</p>
          {p.links.length > 0 ? (
            <ul className="flex gap-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`press inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${t.link}`}
                  >
                    {l.label} <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    <span className="sr-only">for {p.title} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] font-semibold opacity-75">n8n workflow</p>
          )}
        </div>
        <hr aria-hidden="true" className={`absolute inset-x-6 top-[72px] border-0 border-t border-dashed ${t.rule}`} />

        <div className="grid gap-10 px-7 pb-10 pt-[112px] md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:pb-12">
          <div className="flex flex-col gap-7">
            <h3 id={`${p.id}-title`} className="display text-[clamp(2.4rem,5.4vw,4.4rem)]" style={{ fontWeight: 800 }}>
              {p.title}
            </h3>
            <dl className="flex max-w-[62ch] flex-col gap-5">
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold">The problem</dt>
                <dd className={`leading-7 ${t.sub}`}>{p.problem}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold">What I built</dt>
                <dd className={`leading-7 ${t.sub}`}>{p.built}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col justify-end gap-6">
            {p.result ? (
              <div className="flex flex-col gap-2">
                <p className={`display leading-none ${p.tone === 'paper' ? 'text-cobalt' : ''}`} style={{ fontSize: 'clamp(4rem,9vw,6rem)' }}>
                  <CountUp to={p.result.value} decimals={p.result.decimals} suffix={p.result.suffix} />
                </p>
                <p className="text-lg font-semibold">{p.result.label}</p>
                <p className={`text-sm leading-6 ${t.sub}`}>{p.result.note}</p>
              </div>
            ) : (
              <ul aria-label="Stack" className={`flex flex-col divide-y ${p.tone === 'paper' ? 'divide-ink/20' : 'divide-paper/20'}`}>
                {p.stack.map((s) => (
                  <li key={s} className="display py-2.5 text-[clamp(1.6rem,3vw,2.2rem)]" style={{ fontWeight: 700 }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {p.result && (
              <ul aria-label="Stack" className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className={`rounded-full border px-3 py-1 text-[13px] font-medium ${t.chip}`}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Work() {
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="work" aria-labelledby="work-title" className="on-ink bg-cobalt px-5 py-24 text-paper md:px-10 md:py-36 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <h2 id="work-title" className="display reveal text-[clamp(3rem,8vw,6rem)]">
          Selected work
        </h2>
        <p className="reveal mt-5 max-w-[48ch] text-lg leading-7 text-paper/90" style={{ '--i': 1 }}>
          Five projects as case files: the problem, what I built, and the result where there is one I can measure.
        </p>

        <div ref={stackRef} className="mt-14 md:mt-20">
          {projects.map((p, i) => (
            <StackCard key={p.id} p={p} i={i} n={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
