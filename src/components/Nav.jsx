import { useState } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { ArrowDown, List, X } from '@phosphor-icons/react'
import { nav, person } from '../data.js'

export default function Nav({ scrolled }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  const solid = scrolled || open

  return (
    <header
      className={`on-ink fixed inset-x-0 top-0 z-40 text-paper transition-colors duration-200 ${
        solid ? 'bg-ink/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-4 md:px-10 lg:px-20">
        <a href="#top" className="display text-[1.6rem]" aria-label="Kuruva Radhakrishna, back to top">
          KR
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="sweep pb-1 text-[15px] font-medium">
              {item.label}
            </a>
          ))}
          <a
            href={person.resume}
            download
            className="press inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[15px] font-semibold text-ink"
          >
            Resume <ArrowDown size={16} weight="bold" aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="press -mr-2 rounded-full p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} weight="bold" aria-hidden="true" /> : <List size={26} weight="bold" aria-hidden="true" />}
        </button>
      </div>

      {/* Scroll progress, visible on every ground */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white mix-blend-difference"
        style={{ scaleX: reduce ? 0 : progress }}
      />

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-paper/15 px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block border-b border-paper/15 py-4 font-display text-2xl font-bold">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a
                href={person.resume}
                download
                className="press inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-semibold text-ink"
              >
                Resume <ArrowDown size={16} weight="bold" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
