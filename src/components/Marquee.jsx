import { tools } from '../data.js'

function Row({ dup = false }) {
  return (
    <ul
      aria-hidden={dup || undefined}
      className={`flex shrink-0 items-center gap-8 pr-8 ${dup ? 'marquee-dup' : ''}`}
    >
      {tools.map((t) => (
        <li key={t} className="flex items-center gap-8">
          <span className="display whitespace-nowrap text-[clamp(1.8rem,4vw,3rem)] font-bold">{t}</span>
          <span aria-hidden="true" className="block h-2.5 w-2.5 rotate-45 bg-cobalt" />
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Tools I work with" className="on-ink overflow-hidden bg-ink py-7 text-paper">
      <div className="marquee-track flex w-max">
        <Row />
        <Row dup />
      </div>
    </section>
  )
}
