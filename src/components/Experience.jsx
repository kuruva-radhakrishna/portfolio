import { ArrowUpRight } from '@phosphor-icons/react'
import { experience } from '../data.js'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper px-5 py-24 md:px-10 md:py-32 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <header className="reveal mb-12 flex flex-col gap-3 md:mb-16">
          <p className="eyebrow text-cobalt">02 / In transit</p>
          <h2 id="experience-title" className="font-display text-[clamp(2.6rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
            Experience
          </h2>
        </header>

        <ol className="flex flex-col">
          {experience.map((job, i) => (
            <li key={job.role} className="reveal grid gap-4 border-t border-ink/25 py-10 md:grid-cols-[260px_1fr] md:gap-12 md:pb-12">
              <p className="eyebrow pt-2 text-ink/75">{job.when}</p>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] md:text-4xl">{job.org}</h3>
                <p className="text-lg font-medium text-cobalt">{job.role}</p>
                <ul className="flex max-w-[68ch] flex-col gap-3 pt-1">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-ink/90">
                      <span aria-hidden="true" className="font-mono text-cobalt">&mdash;</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul aria-label="Tools and topics" className="flex flex-wrap gap-2 pt-2">
                  {job.tags.map((t) => (
                    <li key={t} className="rounded-full border border-cobalt px-3 py-1.5 font-mono text-xs font-medium text-cobalt">
                      {t}
                    </li>
                  ))}
                </ul>
                {job.cert && (
                  <a
                    href={job.cert}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1 pt-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink underline underline-offset-4"
                  >
                    Certificate <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
