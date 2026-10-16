import { ArrowDown, GithubLogo } from '@phosphor-icons/react'
import { person } from '../data.js'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-cobalt px-5 pb-14 pt-32 text-paper md:px-10 md:pb-20 lg:px-20"
    >
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-12">
        <h1 id="hero-title" className="display text-[clamp(3.6rem,13vw,6rem)]">
          <span className="line-mask">
            <span className="line-in" style={{ '--i': 0 }}>
              Kuruva
            </span>
          </span>
          <span className="line-mask">
            <span className="line-in" style={{ '--i': 1 }}>
              Radhakrishna
            </span>
          </span>
        </h1>

        <div className="grid gap-8 border-t border-paper/30 pt-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div className="flex max-w-[52ch] flex-col gap-4">
            <p className="rise text-2xl font-medium leading-snug md:text-[28px]" style={{ '--i': 0 }}>
              Business Analyst at Meesho, working on delivery promise accuracy and logistics analytics.
            </p>
            <p className="rise leading-7 text-paper/90" style={{ '--i': 1 }}>
              Delivery promises that hold on sale days, and the analytics to prove it.
            </p>
          </div>
          <div className="rise flex flex-wrap gap-3" style={{ '--i': 2 }}>
            <a href="#work" className="press rounded-full bg-paper px-6 py-3 font-semibold text-ink">
              See the work
            </a>
            <a
              href={person.resume}
              download
              className="press inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper px-6 py-3 font-semibold"
            >
              Resume <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="press inline-flex items-center justify-center rounded-full border-[1.5px] border-paper px-3.5 py-3"
            >
              <GithubLogo size={20} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
