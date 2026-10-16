import { ArrowUpRight } from '@phosphor-icons/react'
import { achievements, education, leetcode as lc } from '../data.js'

const pct = (n) => `${((n / lc.solved) * 100).toFixed(1)}%`

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="bg-paper px-5 py-24 md:px-10 md:py-32 lg:px-20">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
        <header className="reveal flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-cobalt">04 / Proof of delivery</p>
          <h2 id="ach-title" className="font-display text-[clamp(2.4rem,5vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            Achievements and education
          </h2>
        </header>

        <div className="flex flex-col gap-14">
          <ul className="flex flex-col">
            {achievements.map((a) => (
              <li key={a.title} className="reveal flex flex-col gap-1 border-t border-ink/25 py-6 first:border-t-0 first:pt-0">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{a.title}</h3>
                <p className="text-ink/80">{a.detail}</p>
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.14em] underline underline-offset-4"
                  >
                    {a.linkLabel} <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <section aria-labelledby="lc-title" className="reveal rounded-md bg-ink p-6 text-paper sm:p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 id="lc-title" className="font-display text-2xl font-bold tracking-[-0.02em]">LeetCode</h3>
              <p className="eyebrow text-paper/70">As of {lc.asOf}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
              {[
                [lc.solved, 'Problems solved'],
                [lc.rating, 'Contest rating'],
                [`${lc.topPercent}%`, 'Top of rated users'],
                [lc.contests, 'Contests entered'],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <dt className="order-2 text-sm text-paper/75">{l}</dt>
                  <dd className="font-mono text-[28px] font-medium leading-none tabular-nums md:text-[32px]">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <div
                role="img"
                aria-label={`${lc.easy} easy, ${lc.medium} medium and ${lc.hard} hard problems solved`}
                className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full"
              >
                <span className="block bg-paper/35" style={{ width: pct(lc.easy) }} />
                <span className="block bg-paper/65" style={{ width: pct(lc.medium) }} />
                <span className="block bg-paper" style={{ width: pct(lc.hard) }} />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-paper/80">
                <li>Easy {lc.easy}</li>
                <li>Medium {lc.medium}</li>
                <li>Hard {lc.hard}</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="edu-title" className="flex flex-col">
            <h3 id="edu-title" className="eyebrow reveal mb-4 text-cobalt">Education</h3>
            <ul className="flex flex-col">
              {education.map((e) => (
                <li key={e.school} className="reveal grid gap-2 border-t border-ink/25 py-6 md:grid-cols-[1fr_auto] md:gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{e.school}</p>
                    <p className="text-ink/85">{e.what}</p>
                  </div>
                  <div className="flex flex-col gap-1 md:items-end">
                    <p className="eyebrow text-ink/75">{e.when}</p>
                    <p className="font-mono text-sm font-medium">{e.score}</p>
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
