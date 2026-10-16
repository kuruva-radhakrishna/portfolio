import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { journey } from '../data.js'

const EASE = [0.23, 1, 0.32, 1]

function Stop({ job, last }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const reached = useInView(ref, { once: true, margin: '0px 0px -40% 0px' })

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative grid gap-x-12 gap-y-3 pb-20 pl-12 last:pb-0 md:grid-cols-[230px_1fr] md:pl-20"
    >
      {/* Node on the route */}
      <span className="absolute left-0 top-1.5 flex h-[26px] w-[26px] items-center justify-center md:left-[1px]">
        {last && !reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-cobalt"
            animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, ease: EASE, repeat: Infinity }}
          />
        )}
        <motion.span
          aria-hidden="true"
          className="relative block h-[26px] w-[26px] rounded-full border-[3px] border-cobalt"
          animate={{ backgroundColor: reached || reduce ? '#2447C8' : '#F4F3EE', scale: reached || reduce ? 1 : 0.8 }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </span>

      <div className="flex flex-col gap-1.5 md:pt-1">
        <p className={`display text-[clamp(1.9rem,3.4vw,2.6rem)] ${last ? 'text-cobalt' : ''}`} style={{ fontWeight: 700 }}>
          {job.status}
        </p>
        <p className="text-[15px] text-ink/75">{job.when}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="display text-[clamp(2rem,4vw,3.2rem)]" style={{ fontWeight: 700 }}>
          {job.org}
        </h3>
        <p className="text-lg font-medium text-cobalt">{job.role}</p>
        <ul className="flex max-w-[68ch] flex-col gap-3 pt-1">
          {job.points.map((p) => (
            <li key={p} className="flex gap-3.5 leading-relaxed text-ink/90">
              <span aria-hidden="true" className="mt-[0.7em] block h-1.5 w-1.5 shrink-0 rotate-45 bg-cobalt" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {job.tags.length > 0 && (
          <ul aria-label="Tools and topics" className="flex flex-wrap gap-2 pt-1">
            {job.tags.map((t) => (
              <li key={t} className="rounded-full border border-cobalt/70 px-3 py-1.5 text-[13px] font-medium text-cobalt">
                {t}
              </li>
            ))}
          </ul>
        )}
        {job.cert && (
          <a
            href={job.cert}
            target="_blank"
            rel="noreferrer"
            className="sweep inline-flex w-fit items-center gap-1 pb-1 text-sm font-semibold"
          >
            Certificate <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </motion.li>
  )
}

export default function Experience() {
  const listRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 70%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper px-5 py-24 md:px-10 md:py-36 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <h2 id="experience-title" className="display reveal text-[clamp(3rem,8vw,6rem)]">
          Experience
        </h2>
        <p className="reveal mt-5 max-w-[46ch] text-lg leading-7 text-ink/80" style={{ '--i': 1 }}>
          From the first order to delivered: school, a co-op, and two stints at Meesho.
        </p>

        <ol ref={listRef} aria-label="Career in order" className="relative mt-16 md:mt-24">
          {/* The route: a faint track and a cobalt line that fills as you scroll */}
          <span aria-hidden="true" className="absolute bottom-4 left-[12px] top-4 w-[2px] bg-ink/15 md:left-[13px]" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-4 left-[12px] top-4 w-[2px] origin-top bg-cobalt md:left-[13px]"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          {journey.map((job, i) => (
            <Stop key={job.status} job={job} last={i === journey.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}
