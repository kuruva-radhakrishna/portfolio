import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Experience from './components/Experience.jsx'
import Work from './components/Work.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  // Header gets a solid ground once the top sentinel leaves the viewport.
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // One observer arms every .reveal element; each reveals once.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div id="top-sentinel" aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />
      <Nav scrolled={scrolled} />
      <main id="main">
        <Hero />
        <Marquee />
        <Experience />
        <Work />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
