import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Code, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { person } from '../data.js'
import Magnetic from './Magnetic.jsx'

const links = [
  { label: 'GitHub', value: 'kuruva-radhakrishna', href: person.github, Icon: GithubLogo },
  { label: 'LeetCode', value: 'kradha123', href: person.leetcode, Icon: Code },
  { label: 'LinkedIn', value: 'kuruva-radhakrishna', href: person.linkedin, Icon: LinkedinLogo },
]

export default function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-ink relative overflow-hidden bg-ink px-5 pb-10 pt-24 text-paper md:px-10 md:pt-36 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-start">
          <h2 id="contact-title" className="display reveal max-w-[14ch] text-[clamp(3rem,8vw,6rem)]">
            Let&rsquo;s get your next question answered.
          </h2>

          {/* Stamp: lands once, like a parcel being signed for */}
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { scale: 1.7, opacity: 0, rotate: -16 }}
            whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="display w-fit select-none rounded-xl bg-cobalt px-7 py-4 text-3xl uppercase text-paper shadow-[0_20px_30px_-18px_rgba(0,0,0,0.8)] md:text-4xl"
            style={{ fontWeight: 800 }}
          >
            Delivered
          </motion.div>
        </div>

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
          <p>Kuruva Radhakrishna, 2026</p>
          <p>Built with React, Tailwind and Motion</p>
        </footer>
      </div>
    </section>
  )
}
