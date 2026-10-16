import { ArrowDown, GithubLogo } from '@phosphor-icons/react'
import ParcelField from './ParcelField.jsx'
import { person } from '../data.js'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative flex min-h-[max(100dvh,58rem)] flex-col overflow-hidden bg-cobalt text-paper lg:min-h-[max(100dvh,50rem)]"
    >
      <ParcelField />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1360px] px-5 pt-28 md:px-10 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_410px] lg:gap-14">
          <h1 id="hero-title" className="display text-[clamp(3.2rem,9vw,6rem)]">
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

          <div className="pointer-events-auto flex flex-col gap-5 lg:pt-3">
            <p className="rise text-xl font-medium leading-snug" style={{ '--i': 0 }}>
              Business Analyst at Meesho, on delivery promise accuracy and logistics analytics.
            </p>
            <p className="rise max-w-[36ch] leading-7 text-paper/90" style={{ '--i': 1 }}>
              Delivery promises that hold on sale days, and the analytics to prove it.
            </p>
            <div className="rise flex flex-wrap gap-3 pt-1" style={{ '--i': 2 }}>
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
      </div>
    </section>
  )
}
