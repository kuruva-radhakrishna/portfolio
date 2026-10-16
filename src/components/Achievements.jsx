import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { achievements, education, leetcode as lc } from '../data.js'
import CountUp from './CountUp.jsx'

const pct = (n) => (n / lc.solved) * 100

function Seg({ w, className, delay }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={`block h-full origin-left ${className}`}
      style={{ width: `${w}%` }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
    />
  )
}

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="bg-paper px-5 py-24 md:px-10 md:py-36 lg:px-20">
      <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
        <h2 id="ach-title" className="display reveal text-[clamp(3rem,7vw,5rem)] lg:sticky lg:top-28 lg:self-start">
          Achievements and education
        </h2>

        <div className="flex flex-col gap-16">
          <ul className="flex flex-col">
            {achievements.map((a) => (
              <li key={a.title} className="reveal flex flex-col gap-1.5 border-t border-ink/25 py-7 first:border-t-0 first:pt-0">
                <h3 className="display text-[clamp(1.7rem,3vw,2.4rem)]" style={{ fontWeight: 700 }}>
                  {a.title}
                </h3>
                <p className="text-lg text-ink/80">{a.detail}</p>
                {a.href && (
                  <a href={a.href} target="_blank" rel="noreferrer" className="sweep mt-1 inline-flex w-fit items-center gap-1 pb-1 text-sm font-semibold">
                    {a.linkLabel} <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <section aria-labelledby="lc-title" className="on-ink reveal rounded-2xl bg-ink p-7 text-paper md:p-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
              <h3 id="lc-title" className="display text-3xl" style={{ fontWeight: 700 }}>
                LeetCode
              </h3>
              <p className="text-sm text-paper/75">Public stats as of {lc.asOf}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 xl:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <dd className="display text-[clamp(2.2rem,3.6vw,3.1rem)] leading-none"><CountUp to={lc.solved} /></dd>
                <dt className="text-sm text-paper/80">problems solved</dt>
              </div>
              <div className="flex flex-col gap-1.5">
                <dd className="display text-[clamp(2.2rem,3.6vw,3.1rem)] leading-none"><CountUp to={lc.rating} /></dd>
                <dt className="text-sm text-paper/80">contest rating</dt>
              </div>
              <div className="flex flex-col gap-1.5">
                <dd className="display text-[clamp(2.2rem,3.6vw,3.1rem)] leading-none"><CountUp to={lc.topPercent} decimals={2} suffix="%" /></dd>
                <dt className="text-sm text-paper/80">top of rated users</dt>
              </div>
              <div className="flex flex-col gap-1.5">
                <dd className="display text-[clamp(2.2rem,3.6vw,3.1rem)] leading-none"><CountUp to={lc.contests} /></dd>
                <dt className="text-sm text-paper/80">contests entered</dt>
              </div>
            </dl>

            <div className="mt-10">
              <div
                role="img"
                aria-label={`${lc.easy} easy, ${lc.medium} medium and ${lc.hard} hard problems solved`}
                className="flex h-3.5 w-full gap-0.5 overflow-hidden rounded-full"
              >
                <Seg w={pct(lc.easy)} className="bg-paper/35" delay={0} />
                <Seg w={pct(lc.medium)} className="bg-paper/65" delay={0.12} />
                <Seg w={pct(lc.hard)} className="bg-paper" delay={0.24} />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-1 text-sm text-paper/85">
                <li>Easy {lc.easy}</li>
                <li>Medium {lc.medium}</li>
                <li>Hard {lc.hard}</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="edu-title" className="flex flex-col">
            <h3 id="edu-title" className="display reveal mb-5 text-3xl" style={{ fontWeight: 700 }}>
              Education
            </h3>
            <ul className="flex flex-col">
              {education.map((e) => (
                <li key={e.school} className="reveal grid gap-2 border-t border-ink/25 py-6 md:grid-cols-[1fr_auto] md:gap-10">
                  <div className="flex flex-col gap-1">
                    <p className="display text-2xl" style={{ fontWeight: 700 }}>{e.school}</p>
                    <p className="text-ink/85">{e.what}</p>
                  </div>
                  <div className="flex flex-col gap-1 md:items-end">
                    <p className="text-sm text-ink/75">{e.when}</p>
                    <p className="font-semibold">{e.score}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
