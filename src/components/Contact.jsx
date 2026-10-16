import { ArrowDown, ArrowUpRight, Code, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { person } from '../data.js'

const links = [
  { label: 'GitHub', value: 'kuruva-radhakrishna', href: person.github, Icon: GithubLogo, external: true },
  { label: 'LeetCode', value: 'kradha123', href: person.leetcode, Icon: Code, external: true },
  { label: 'LinkedIn', value: 'kuruva-radhakrishna', href: person.linkedin, Icon: LinkedinLogo, external: true },
  { label: 'Email', value: person.email, href: `mailto:${person.email}`, Icon: EnvelopeSimple, external: false },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink px-5 pb-10 pt-24 text-paper md:px-10 md:pt-32 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_520px] lg:gap-20">
          <div className="reveal flex flex-col gap-7">
            <p className="eyebrow text-paper/75">05 / Delivered</p>
            <h2
              id="contact-title"
              className="font-display text-[clamp(2.6rem,6.5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.035em]"
            >
              Let&rsquo;s get your next question answered.
            </h2>
            <p className="max-w-[46ch] text-lg leading-7 text-paper/80">
              Open to analytics and engineering roles where delivery, logistics or data agents are the problem.
            </p>
            <div>
              <a
                href={person.resume}
                download
                className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3.5 font-semibold text-paper"
              >
                Download resume <ArrowDown size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <ul className="reveal flex flex-col">
            {links.map(({ label, value, href, Icon, external }) => (
              <li key={label} className="border-t border-paper/20 first:border-t-0 lg:first:border-t">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="link-row flex items-center justify-between gap-4 py-5"
                >
                  <span className="flex items-center gap-4">
                    <Icon size={26} weight="bold" aria-hidden="true" className="text-paper/80" />
                    <span className="flex flex-col gap-0.5">
                      <span className="eyebrow text-[11px] text-paper/70">{label}</span>
                      <span className="break-all text-lg font-medium sm:text-xl">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={24} weight="bold" aria-hidden="true" className="link-arrow shrink-0 text-paper" />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-paper/20 pt-6 font-mono text-xs text-paper/70">
          <p>KR-IN-2026 &middot; Delivered</p>
          <p>Built with React and Tailwind</p>
        </footer>
      </div>
    </section>
  )
}
