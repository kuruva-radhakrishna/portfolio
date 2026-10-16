import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { experience } from '../data.js'

const EASE = [0.23, 1, 0.32, 1]

function Job({ job }) {
  const reduce = useReducedMotion()

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid gap-x-12 gap-y-3 border-t border-ink/25 py-12 md:grid-cols-[230px_1fr]"
    >
      <p className="display pt-1 text-[clamp(1.5rem,2.6vw,2rem)]" style={{ fontWeight: 700 }}>
        {job.when}
      </p>

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
  // Most recent first
  const jobs = [...experience].reverse()

  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper px-5 py-24 md:px-10 md:py-36 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <h2 id="experience-title" className="display reveal text-[clamp(3rem,8vw,6rem)]">
          Experience
        </h2>

        <ol aria-label="Experience, most recent first" className="mt-14 md:mt-20">
          {jobs.map((job) => (
            <Job key={`${job.org}-${job.when}`} job={job} />
          ))}
        </ol>
      </div>
    </section>
  )
}
