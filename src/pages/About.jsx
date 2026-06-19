import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const principles = [
  {
    icon: 'location',
    title: 'Deeply Delhi',
    text: 'Built around neighbourhoods, travel realities, occasions, and beauty needs that feel native to the city.',
  },
  {
    icon: 'sparkle',
    title: 'AI you can understand',
    text: 'Recommendations show useful match factors and grounded themes instead of asking users to trust a black box.',
  },
  {
    icon: 'shield',
    title: 'Confidence over clutter',
    text: 'The product prioritises a calm, focused decision journey over an overwhelming catalog of incomplete information.',
  },
]

function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,223,136,0.42),transparent_30%),radial-gradient(circle_at_15%_70%,rgba(234,215,232,0.8),transparent_34%)]" />
        <div className="page-shell relative py-18 sm:py-24">
          <span className="eyebrow">Our point of view</span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Delhi has no shortage of salons. It needs a better way to choose.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            DelhiGlow AI is a city-first beauty marketplace designed to turn
            scattered options, reviews, and recommendations into confident,
            personal decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="primary-button" to="/ai-concierge">
              Meet GlowGuide <Icon name="arrow" size={17} />
            </Link>
            <Link className="secondary-button" to="/explore">
              Explore the marketplace
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-18 sm:py-22">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-rosewood uppercase">
              The product promise
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">
              The right salon should feel discoverable—not accidental.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-stone-600">
            <p>
              Beauty decisions are personal. The right option depends on where you
              are, what you need, what you want to spend, how much time you have,
              and whether the salon understands the occasion.
            </p>
            <p>
              DelhiGlow brings that context into one focused journey. The
              marketplace remains useful on its own, while GlowGuide helps users
              interpret the choices and prepare for higher-stakes moments such as
              weddings.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article className="card-surface p-6" key={principle.title}>
              <span className="grid size-12 place-items-center rounded-2xl bg-plum-100 text-plum-700">
                <Icon name={principle.icon} size={22} />
              </span>
              <h3 className="mt-6 text-lg font-bold text-ink">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-plum-100 bg-plum-50/60">
        <div className="page-shell grid gap-8 py-16 sm:grid-cols-3 sm:py-20">
          {[
            ['12', 'Delhi neighbourhoods in the focused demo'],
            ['3', 'Visible AI experiences with safe fallback data'],
            ['1', 'Polished journey from discovery to booking'],
          ].map(([value, label]) => (
            <div className="text-center" key={label}>
              <p className="font-display text-5xl font-semibold text-plum-800">{value}</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-stone-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-18 sm:py-22" id="privacy">
        <div className="rounded-[2rem] bg-plum-950 px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-saffron-300 uppercase">
              Built to demonstrate responsibly
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Demo data, honest labels, no hidden dependencies.
            </h2>
            <p className="mt-4 text-sm leading-7 text-plum-200">
              Salon names, reviews, prices, availability, owner metrics, and AI
              outputs in this foundation are illustrative. No personal data is
              stored and no live salon is contacted.
            </p>
          </div>
          <Link className="secondary-button mt-7 shrink-0 lg:mt-0" to="/booking">
            Try the demo journey
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default About
