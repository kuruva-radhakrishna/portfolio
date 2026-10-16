import { ArrowUpRight } from '@phosphor-icons/react'
import { projects } from '../data.js'

function Card({ p, className = '' }) {
  return (
    <article
      className={`reveal lift flex flex-col gap-4 rounded-md bg-paper p-6 text-ink sm:p-8 ${className}`}
      aria-labelledby={`${p.id}-title`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-ink/70">{p.id}</p>
        {p.links.length > 0 ? (
          <ul className="flex gap-4">
            {p.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow inline-flex items-center gap-1 text-cobalt underline-offset-4 hover:underline"
                >
                  {l.label} <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                  <span className="sr-only">for {p.title} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="eyebrow text-ink/70">n8n workflow</p>
        )}
      </div>

      <h3
        id={`${p.id}-title`}
        className={`font-display font-bold tracking-[-0.025em] ${p.lead ? 'text-4xl leading-[1.05] md:text-[44px]' : 'text-3xl leading-tight md:text-[34px]'}`}
      >
        {p.title}
      </h3>

      <hr className="border-t border-dashed border-ink/35" />

      <dl className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <dt className="eyebrow text-[11px] text-cobalt">Problem</dt>
          <dd className="text-[15px] leading-6 text-ink/90">{p.problem}</dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="eyebrow text-[11px] text-cobalt">What I built</dt>
          <dd className="text-[15px] leading-6 text-ink/90">{p.built}</dd>
        </div>
      </dl>

      {p.result && (
        <div className="flex flex-col gap-1 border-l-[3px] border-cobalt py-0.5 pl-4">
          <p className="font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-cobalt md:text-[38px]">{p.result.big}</p>
          <p className="text-sm leading-5 text-ink/80">{p.result.note}</p>
        </div>
      )}

      <ul aria-label="Stack" className="flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="rounded-full border border-ink/40 px-2.5 py-1 font-mono text-[11px] font-medium">
            {s}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Work() {
  const [devpilot, codeflow, ai, football, lookout] = projects
  return (
    <section id="work" aria-labelledby="work-title" className="bg-cobalt px-5 py-24 text-paper md:px-10 md:py-32 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <header className="reveal mb-12 flex flex-col gap-3 md:mb-16">
          <p className="eyebrow text-paper/80">03 / Out for delivery</p>
          <h2 id="work-title" className="font-display text-[clamp(2.6rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
            Selected work, as case files
          </h2>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          <Card p={devpilot} className="lg:col-span-7" />
          <Card p={codeflow} className="lg:col-span-5 lg:mt-24" />
          <Card p={ai} className="lg:col-span-7 lg:self-start" />
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Card p={football} />
            <Card p={lookout} />
          </div>
        </div>
      </div>
    </section>
  )
}
