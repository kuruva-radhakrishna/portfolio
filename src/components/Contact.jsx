import { ArrowDown, ArrowUpRight, Code, GithubLogo, LinkedinLogo, Phone } from '@phosphor-icons/react'
import { person } from '../data.js'
import Magnetic from './Magnetic.jsx'

const links = [
  { label: 'GitHub', value: 'kuruva-radhakrishna', href: person.github, Icon: GithubLogo },
  { label: 'LeetCode', value: 'kradha123', href: person.leetcode, Icon: Code },
  { label: 'LinkedIn', value: 'kuruva-radhakrishna', href: person.linkedin, Icon: LinkedinLogo },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-ink relative overflow-hidden bg-ink px-5 pb-10 pt-24 text-paper md:px-10 md:pt-36 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <h2 id="contact-title" className="display reveal max-w-[14ch] text-[clamp(3rem,8vw,6rem)]">
          Let&rsquo;s get your next question answered.
        </h2>

        <div className="mt-16 flex flex-col gap-10 md:mt-24">
          <a
            href={`mailto:${person.email}`}
            className="sweep reveal group inline-flex w-fit max-w-full items-center gap-4 pb-2"
          >
            <span className="display break-all text-[clamp(1.6rem,4.6vw,3.6rem)]" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {person.email}
            </span>
            <ArrowUpRight size={36} weight="bold" aria-hidden="true" className="link-arrow shrink-0" />
          </a>

          <a
            href={person.phoneHref}
            className="sweep reveal inline-flex w-fit items-center gap-3 pb-1.5"
            style={{ '--i': 1 }}
          >
            <Phone size={30} weight="bold" aria-hidden="true" className="shrink-0" />
            <span className="display text-[clamp(1.4rem,3.4vw,2.4rem)]" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {person.phone}
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <Magnetic>
              <a
                href={person.resume}
                download
                className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-4 text-lg font-semibold text-paper"
              >
                Download resume <ArrowDown size={20} weight="bold" aria-hidden="true" />
              </a>
            </Magnetic>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="sweep inline-flex items-center gap-2 pb-1 text-lg font-medium">
                    <Icon size={22} weight="bold" aria-hidden="true" />
                    {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-paper/20 pt-6 text-sm text-paper/75">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Kuruva Radhakrishna, 2026</span>
            <span aria-hidden="true" className="text-paper/40">
              /
            </span>
            <a href={person.phoneHref} className="sweep pb-0.5 font-medium text-paper">
              {person.phone}
            </a>
          </p>
          <p>Built with React, Tailwind and Motion</p>
        </footer>
      </div>
    </section>
  )
}
