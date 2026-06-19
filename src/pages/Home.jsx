import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import SalonCard from '../components/SalonCard'
import SectionHeading from '../components/SectionHeading'
import { areas, categoryHighlights, salons } from '../data/salons'
import { getCatalogSmartMatch } from '../lib/aiDemo'

const steps = [
  {
    number: '01',
    title: 'Share your beauty brief',
    text: 'Tell GlowGuide the service, Delhi area, budget, occasion, and experience you want.',
  },
  {
    number: '02',
    title: 'Compare clear matches',
    text: 'See salons ranked with transparent reasons, review themes, pricing, and practical availability.',
  },
  {
    number: '03',
    title: 'Choose your slot',
    text: 'Open the full service menu, compare available slots, and send a no-payment booking request.',
  },
]

const trustStats = [
  ['12', 'Delhi neighbourhoods'],
  ['4.8★', 'Average featured rating'],
  ['2,100+', 'Review signals considered'],
  ['< 60 sec', 'From brief to shortlist'],
]

const categoryIcons = {
  Hair: 'sparkle',
  Skin: 'shield',
  Nails: 'heart',
  Makeup: 'star',
  Bridal: 'calendar',
}

function Home() {
  const featuredSalons = salons.filter((salon) => salon.featured).slice(0, 4)
  const heroSalon = salons.find((salon) => salon.id === 'noor-co-greater-kailash')
  const heroSmartMatch = getCatalogSmartMatch(heroSalon)
  const categorySalonCounts = Object.fromEntries(
    categoryHighlights.map((category) => [
      category.name,
      salons.filter((salon) => salon.categories.includes(category.name)).length,
    ]),
  )

  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_5%,rgba(234,215,232,0.95),transparent_36%),radial-gradient(circle_at_88%_20%,rgba(255,223,136,0.55),transparent_28%),linear-gradient(180deg,#fffdf9_0%,#fbf7fb_100%)]" />
        <div className="page-shell relative grid gap-12 py-14 sm:py-18 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <Icon name="sparkle" size={14} />
              Delhi’s AI-powered salon marketplace
            </span>
            <h1 className="display-title mt-6">
              Your best Delhi salon match,{' '}
              <span className="text-rosewood">explained by AI.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              Tell GlowGuide what you need. Get three trusted, bookable salon
              recommendations shaped around your area, occasion, style, and budget.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" to="/ai-concierge">
                <Icon name="sparkle" size={17} />
                Match me with a salon
              </Link>
              <Link className="secondary-button" to="/explore">
                Explore Delhi salons
                <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-stone-600">
              {['No sign-up needed', 'Prices shown upfront', 'Every match explained'].map(
                (item) => (
                  <span className="flex items-center gap-2" key={item}>
                    <Icon className="text-emerald-700" name="check" size={17} />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-8 top-20 hidden size-32 rounded-full bg-saffron-200/70 blur-2xl sm:block" />
            <div className="card-surface relative overflow-hidden p-4 shadow-glow sm:p-6">
              <div className="flex items-center justify-between border-b border-plum-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-plum-950 text-white">
                    <Icon name="sparkle" size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">GlowGuide</p>
                    <p className="text-xs text-stone-500">Your AI beauty matchmaker</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Always available
                </span>
              </div>

              <div className="space-y-4 py-5">
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-plum-950 px-4 py-3 text-sm leading-6 text-white">
                  Soft-glam makeup for a morning roka in South Delhi. I want it
                  natural and camera-ready.
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-plum-50 px-4 py-3 text-sm leading-6 text-plum-950">
                  I’d shortlist <strong>{heroSalon.name}</strong>. Their reviews
                  consistently mention punctuality, lightweight makeup, and strong
                  coordination for early events.
                </div>
              </div>

              <Link
                className="block rounded-2xl border border-plum-100 bg-cream p-4 transition hover:border-plum-300"
                to={`/salons/${heroSalon.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-ink">{heroSalon.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                      <Icon name="location" size={14} />
                      {heroSalon.area}
                    </p>
                  </div>
                  <span className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-bold text-saffron-600">
                    {heroSmartMatch.score}% excellent fit
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Soft glam', 'Punctual team', 'Home service'].map((item) => (
                    <span
                      className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-plum-700"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-1 text-sm font-bold text-plum-700">
                  See the match reasoning <Icon name="arrow" size={16} />
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="page-shell relative pb-10">
          <p className="text-center text-xs font-bold tracking-[0.16em] text-stone-500 uppercase">
            Beauty, mapped to your neighbourhood
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {areas.map((area) => (
              <Link
                className="rounded-full border border-plum-100 bg-white px-3.5 py-2 text-sm font-semibold text-stone-600 transition hover:border-plum-300 hover:text-plum-800"
                key={area}
                to={`/explore?area=${encodeURIComponent(area)}`}
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeading
          align="center"
          description="Start with what you need today—from a sharp haircut to a fully planned bridal look."
          eyebrow="Browse by service"
          title="Your beauty plan, one category away"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categoryHighlights.map((category) => (
            <Link
              className="group overflow-hidden rounded-3xl border border-plum-100 bg-white p-3 shadow-[0_16px_45px_-34px_rgba(72,47,67,0.38)] transition hover:-translate-y-1 hover:shadow-glow"
              key={category.name}
              to={`/explore?category=${encodeURIComponent(category.name)}`}
            >
              <div
                className={`relative grid h-28 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient}`}
              >
                <span className="absolute -right-5 -top-5 size-20 rounded-full border border-white/50 bg-white/20" />
                <span className="grid size-12 place-items-center rounded-full bg-white/75 text-plum-800 shadow-lg backdrop-blur">
                  <Icon name={categoryIcons[category.name]} size={20} />
                </span>
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="flex items-center justify-between gap-2 font-bold text-ink">
                  {category.name}
                  <Icon
                    className="text-plum-500 transition group-hover:translate-x-1"
                    name="arrow"
                    size={16}
                  />
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {category.description}
                </p>
                <p className="mt-3 text-[11px] font-bold tracking-wide text-rosewood uppercase">
                  {categorySalonCounts[category.name]} salons
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-plum-100 bg-plum-50/55">
        <div className="page-shell py-16 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              description="Highly rated places with strong review themes, useful availability, and a clear reason to consider them."
              eyebrow="Featured in Delhi"
              title="Salons worth shortlisting"
            />
            <Link
              className="flex shrink-0 items-center gap-2 text-sm font-bold text-plum-700"
              to="/explore"
            >
              See every salon <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredSalons.map((salon) => (
              <SalonCard compact key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeading
          align="center"
          description="A focused journey that turns a personal brief into a confident, bookable decision."
          eyebrow="How DelhiGlow works"
          title="From “I need a salon” to “this is the one”"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article className="card-surface relative overflow-hidden p-6 sm:p-7" key={step.number}>
              <span className="absolute right-5 top-3 font-display text-6xl font-semibold text-plum-100">
                {step.number}
              </span>
              <span className="relative grid size-11 place-items-center rounded-2xl bg-plum-950 text-white">
                <Icon name={step.number === '03' ? 'calendar' : 'sparkle'} size={19} />
              </span>
              <h3 className="relative mt-6 text-lg font-bold text-ink">{step.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-stone-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-plum-950 text-white">
        <div className="page-shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {trustStats.map(([value, label]) => (
            <div className="text-center sm:text-left" key={label}>
              <p className="font-display text-4xl font-semibold text-saffron-300">{value}</p>
              <p className="mt-2 text-sm text-plum-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="grid overflow-hidden rounded-[2rem] border border-plum-100 bg-white shadow-glow lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-[#ead2d8] via-[#f5dfcf] to-[#d8d4ec] p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 size-52 rounded-full border border-white/60 bg-white/20" />
            <div className="absolute -bottom-16 -left-12 size-48 rounded-full bg-white/30 blur-xl" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/80 font-display text-xl font-semibold text-plum-900 shadow-lg">
                AK
              </span>
              <div>
                <p className="font-bold text-plum-950">Aaliya, Greater Kailash</p>
                <p className="mt-1 text-sm text-plum-800">Bridal beauty planning</p>
              </div>
            </div>
          </div>
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="flex gap-1 text-saffron-400">
              {[1, 2, 3, 4, 5].map((item) => (
                <Icon className="fill-current" key={item} name="star" size={18} />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-2xl leading-10 font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              “I stopped juggling screenshots and random recommendations. DelhiGlow
              gave me three bridal options, explained the trade-offs, and helped
              me pick a trial slot in one sitting.”
            </blockquote>
            <p className="mt-6 text-sm leading-6 text-stone-500">
              Illustrative testimonial based on the seeded demo journey.
            </p>
            <Link className="primary-button mt-7" to="/ai-concierge">
              Find my beauty match
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
