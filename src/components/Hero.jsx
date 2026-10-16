import { ArrowDown, GithubLogo } from '@phosphor-icons/react'
import CalibrationChart from './CalibrationChart.jsx'
import { person, timeline } from '../data.js'

// Decorative barcode: fixed widths so it renders identically every time.
const BARS = [2, 5, 2, 3, 6, 2, 4, 2, 5, 3, 2, 6, 2, 3, 5, 2, 4, 2, 6, 3, 2, 5, 2, 3, 4, 2, 6, 2, 3, 5, 2, 4, 3, 2, 5, 2, 6, 3, 2, 4]

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[100dvh] flex-col justify-between gap-16 bg-cobalt px-5 pb-12 pt-28 text-paper md:px-10 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="eyebrow rise text-paper/80" style={{ '--i': 0 }}>
            {person.role} <span aria-hidden="true">&middot;</span> {person.focus}
          </p>
          <h1
            id="hero-title"
            className="rise font-display text-[clamp(3.1rem,9.5vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
            style={{ '--i': 1 }}
          >
            Kuruva
            <br />
            Radhakrishna
          </h1>
          <p className="rise max-w-[34ch] text-xl leading-8 text-paper/90 md:text-[22px]" style={{ '--i': 2 }}>
            {person.tagline}
          </p>
          <div className="rise flex flex-wrap gap-3 pt-2" style={{ '--i': 3 }}>
            <a href="#work" className="press rounded-full bg-paper px-6 py-3 font-semibold text-ink">
              See the work
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper px-6 py-3 font-semibold"
            >
              <GithubLogo size={18} weight="bold" aria-hidden="true" /> GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={person.resume}
              download
              className="press inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper px-6 py-3 font-semibold lg:hidden"
            >
              Resume <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Shipping-label card: the signature interaction */}
        <aside
          aria-label="Lane calibration demo"
          className="rise rounded-md bg-paper p-6 text-ink sm:p-7"
          style={{ '--i': 3 }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="eyebrow">Lane calibration</h2>
            <span className="eyebrow rounded-full border border-cobalt px-2.5 py-1 text-[11px] text-cobalt">Illustrative</span>
          </div>
          <CalibrationChart />
          <div className="mt-4 flex gap-[3px]" aria-hidden="true">
            {BARS.map((w, i) => (
              <span key={i} className="block h-7 bg-ink" style={{ width: w }} />
            ))}
          </div>
        </aside>
      </div>

      <ol aria-label="Career tracking timeline" className="mx-auto grid w-full max-w-[1280px] gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
        {timeline.map((step, i) => {
          const last = i === timeline.length - 1
          return (
            <li key={step.title} className="rise flex flex-col gap-3 lg:pr-6" style={{ '--i': 4 + i }}>
              <div className="flex items-center" aria-hidden="true">
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  {last && <span className="tl-ring absolute inset-0 rounded-full bg-paper" />}
                  <span className={`relative block h-4 w-4 rounded-full border-2 border-paper ${last ? 'bg-paper' : ''}`} />
                </span>
                {!last && <span className="tl-line ml-0 block h-0.5 flex-1 bg-paper/45" style={{ '--i': i }} />}
              </div>
              <p className="eyebrow text-paper/80">{step.when}</p>
              <p className="font-display text-2xl font-bold leading-tight">{step.title}</p>
              <p className="text-sm text-paper/85">{step.sub}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
