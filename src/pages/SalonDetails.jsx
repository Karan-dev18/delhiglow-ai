import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import MatchScore from '../components/MatchScore'
import ReviewSummaryPanel from '../components/ReviewSummaryPanel'
import SalonCard from '../components/SalonCard'
import { getSalonById, salons } from '../data/salons'
import { getCatalogSmartMatch, getReviewSummary } from '../lib/aiDemo'

function SalonDetails() {
  const { salonId } = useParams()
  const salon = getSalonById(salonId)

  if (!salon) {
    return (
      <section className="page-shell grid min-h-[68vh] place-items-center py-16 text-center">
        <div className="max-w-lg">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-plum-100 text-plum-700">
            <Icon name="search" size={26} />
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold text-ink">
            We couldn’t find that salon
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The listing may have moved. Explore the current DelhiGlow catalog to
            find another strong match.
          </p>
          <Link className="primary-button mt-7" to="/explore">
            Browse salons
          </Link>
        </div>
      </section>
    )
  }

  const smartMatch = getCatalogSmartMatch(salon)
  const reviewSummary = getReviewSummary(salon)
  const reviewDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = salon.reviews.filter((review) => Math.round(review.rating) === rating).length
    return {
      rating,
      count,
      percent: salon.reviews.length ? Math.round((count / salon.reviews.length) * 100) : 0,
    }
  })
  const similarSalons = salons
    .filter(
      (candidate) =>
        candidate.id !== salon.id &&
        candidate.categories.some((category) => salon.categories.includes(category)),
    )
    .sort((first, second) => {
      const firstAreaBoost = first.area === salon.area ? 1 : 0
      const secondAreaBoost = second.area === salon.area ? 1 : 0
      return (
        secondAreaBoost - firstAreaBoost ||
        getCatalogSmartMatch(second).score - getCatalogSmartMatch(first).score
      )
    })
    .slice(0, 3)

  return (
    <>
      <section className="border-b border-plum-100 bg-white">
        <div className="page-shell py-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-stone-500">
            <Link className="transition hover:text-plum-700" to="/explore">
              Explore
            </Link>
            <Icon name="chevron" size={14} />
            <Link
              className="transition hover:text-plum-700"
              to={`/explore?area=${encodeURIComponent(salon.area)}`}
            >
              {salon.area}
            </Link>
            <Icon name="chevron" size={14} />
            <span className="truncate text-stone-700">{salon.name}</span>
          </nav>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-12">
        <div
          className={`relative min-h-80 overflow-hidden rounded-[2rem] bg-gradient-to-br ${salon.gradient} p-6 sm:min-h-96 sm:p-10`}
        >
          <div className="absolute -right-14 -top-14 size-72 rounded-full border border-white/55 bg-white/15" />
          <div className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-white/25 blur-xl" />
          <div className="relative flex min-h-68 flex-col justify-between sm:min-h-76">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {salon.badges.map((badge) => (
                  <span
                    className="rounded-full border border-white/50 bg-white/80 px-3 py-1.5 text-xs font-bold text-plum-900 shadow-sm backdrop-blur"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <MatchScore inverse score={smartMatch.score} />
            </div>

            <div className="max-w-3xl">
              <span className="grid size-18 place-items-center rounded-3xl border border-white/60 bg-white/80 font-display text-2xl font-semibold text-plum-900 shadow-xl backdrop-blur">
                {salon.initials}
              </span>
              <p className="mt-5 flex items-center gap-1.5 text-sm font-bold text-plum-800">
                <Icon name="location" size={16} />
                {salon.area}, {salon.city}
              </p>
              <h1 className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em] text-plum-950 sm:text-5xl lg:text-6xl">
                {salon.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-plum-900/80 sm:text-base">
                {salon.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="min-w-0">
            <div className="grid gap-3 border-b border-plum-100 pb-8 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-plum-50/60 p-4">
                <p className="text-xs font-bold tracking-[0.12em] text-stone-500 uppercase">
                  Rating
                </p>
                <p className="mt-2 flex items-center gap-2 font-bold text-ink">
                  <Icon className="fill-saffron-400 text-saffron-400" name="star" size={17} />
                  {salon.rating}{' '}
                  <span className="font-normal text-stone-500">
                    ({salon.reviewsCount})
                  </span>
                </p>
              </div>
              <div className="rounded-2xl bg-plum-50/60 p-4">
                <p className="text-xs font-bold tracking-[0.12em] text-stone-500 uppercase">
                  Price level
                </p>
                <p className="mt-2 font-bold text-ink">{salon.priceLevel}</p>
              </div>
              <div className="rounded-2xl bg-plum-50/60 p-4">
                <p className="text-xs font-bold tracking-[0.12em] text-stone-500 uppercase">
                  Home service
                </p>
                <p className="mt-2 flex items-center gap-2 font-bold text-ink">
                  <Icon
                    className={salon.homeService ? 'text-emerald-700' : 'text-stone-400'}
                    name={salon.homeService ? 'check' : 'close'}
                    size={17}
                  />
                  {salon.homeService ? 'Available' : 'In-salon only'}
                </p>
              </div>
              <div className="rounded-2xl bg-plum-50/60 p-4">
                <p className="text-xs font-bold tracking-[0.12em] text-stone-500 uppercase">
                  Hours
                </p>
                <p className="mt-2 flex items-center gap-2 font-bold text-ink">
                  <Icon name="clock" size={17} />
                  {salon.hours}
                </p>
              </div>
            </div>

            <section className="py-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-rosewood uppercase">
                    Why DelhiGlow recommends it
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                    A strong fit for the right brief
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-plum-100 px-3 py-1.5 text-xs font-bold text-plum-700">
                  Explainable match model
                </span>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
                {smartMatch.explanation} The score combines rating strength, review
                confidence, popularity, near-term availability, and service convenience.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...smartMatch.reasons, ...salon.specialties].slice(0, 5).map((specialty) => (
                  <span
                    className="rounded-full bg-plum-50 px-3 py-1.5 text-sm font-semibold text-plum-700"
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-stone-500">
                <Icon className="mt-0.5 shrink-0" name="location" size={16} />
                {salon.address}
              </p>
            </section>

            <ReviewSummaryPanel summary={reviewSummary} />

            <section className="py-10" id="services">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-rosewood uppercase">
                    Service menu
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                    Popular services
                  </h2>
                </div>
                <span className="text-xs font-semibold text-stone-500">Demo pricing</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {salon.services.map((service) => (
                  <article
                    className="group flex h-full flex-col rounded-3xl border border-plum-100 bg-white p-5 shadow-[0_16px_42px_-34px_rgba(72,47,67,0.45)] transition hover:-translate-y-0.5 hover:border-plum-200 hover:shadow-glow"
                    key={service.name}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-plum-50 px-2.5 py-1 text-[11px] font-bold text-plum-700">
                        {service.category}
                      </span>
                      <p className="text-lg font-black text-ink">
                        ₹{service.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{service.name}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
                        <Icon name="clock" size={14} />
                        {service.duration}
                    </p>
                    <Link
                      className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-plum-200 px-4 text-sm font-bold text-plum-800 transition group-hover:border-plum-900 group-hover:bg-plum-950 group-hover:text-white"
                      to={`/booking?salon=${salon.id}&service=${encodeURIComponent(service.name)}&source=salon-details`}
                    >
                      Choose this service
                      <Icon name="arrow" size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-t border-plum-100 py-10" id="reviews">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-rosewood uppercase">
                    Guest feedback
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                    Recent review highlights
                  </h2>
                </div>
                <p className="text-sm font-semibold text-stone-500">
                  {salon.rating} average · {salon.reviewsCount} reviews
                </p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <article className="soft-panel p-5 sm:col-span-2 sm:p-6">
                  <div className="grid gap-6 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-center">
                    <div className="text-center sm:text-left">
                      <p className="font-display text-5xl font-semibold text-ink">
                        {salon.rating}
                      </p>
                      <div className="mt-2 flex justify-center gap-1 text-saffron-400 sm:justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon className="fill-current" key={star} name="star" size={16} />
                        ))}
                      </div>
                      <p className="mt-2 text-xs font-semibold text-stone-500">
                        {salon.reviewsCount} total reviews
                      </p>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-bold tracking-wide text-stone-400 uppercase">
                        Visible review sample
                      </p>
                      <div className="space-y-2">
                      {reviewDistribution.map((item) => (
                        <div className="grid grid-cols-[28px_minmax(0,1fr)_30px] items-center gap-2 text-xs" key={item.rating}>
                          <span className="font-bold text-stone-600">{item.rating}★</span>
                          <div className="h-2 overflow-hidden rounded-full bg-plum-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-rosewood"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                          <span className="text-right text-stone-400">{item.count}</span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </article>
                {salon.reviews.map((review) => (
                  <article className="card-surface p-5 sm:p-6" key={review.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-ink">{review.author}</h3>
                        <p className="mt-1 text-xs text-stone-500">
                          {review.service} · {review.date}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-bold text-ink">
                        <Icon
                          className="fill-saffron-400 text-saffron-400"
                          name="star"
                          size={14}
                        />
                        {review.rating}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-600">“{review.text}”</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-6">
              <p className="text-sm text-stone-500">Services from</p>
              <div className="mt-1 flex items-end justify-between gap-3">
                <p className="text-3xl font-bold tracking-[-0.03em] text-ink">
                  ₹{salon.startingPrice.toLocaleString('en-IN')}
                </p>
                <span className="text-sm font-bold text-stone-500">{salon.priceLevel}</span>
              </div>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon name="calendar" size={17} />
                  Available appointments
                </p>
                <div className="mt-3 space-y-3">
                  {salon.availabilitySlots.map((slot) => (
                    <div className="rounded-2xl bg-emerald-50 p-3.5" key={slot.date}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-emerald-900">{slot.day}</p>
                        <p className="text-xs font-semibold text-emerald-700">{slot.date}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {slot.times.map((time) => (
                          <span
                            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-800"
                            key={time}
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                className="primary-button mt-6 w-full"
                to={`/booking?salon=${salon.id}&source=salon-details`}
              >
                Book this salon
                <Icon name="arrow" size={17} />
              </Link>
              <Link
                className="secondary-button mt-3 w-full"
                to={`/ai-concierge?salon=${salon.id}`}
              >
                <Icon name="sparkle" size={16} />
                Ask GlowGuide
              </Link>

              <div className="mt-6 border-t border-plum-100 pt-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-stone-500">Bridal packages</span>
                  <strong className="text-ink">
                    ₹{salon.bridalPackagePrice.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="mt-3 flex items-start gap-3 text-xs leading-5 text-stone-500">
                  <Icon className="mt-0.5 shrink-0" name="shield" size={17} />
                  No payment is collected in this demo. The salon confirms every
                  request before booking.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-plum-100 bg-plum-50/60">
        <div className="page-shell py-14 sm:py-18">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-rosewood uppercase">
                Keep comparing
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                Similar salons you may like
              </h2>
            </div>
            <Link className="flex items-center gap-2 text-sm font-bold text-plum-700" to="/explore">
              View all salons <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {similarSalons.map((candidate) => (
              <SalonCard compact key={candidate.id} salon={candidate} />
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-plum-100 bg-white/95 p-3 shadow-[0_-16px_40px_-26px_rgba(42,23,39,0.55)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-wide text-stone-400 uppercase">
              Services from
            </p>
            <p className="font-black text-ink">
              ₹{salon.startingPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <Link
            className="primary-button min-h-11 px-5"
            to={`/booking?salon=${salon.id}&source=salon-details-mobile`}
          >
            Book a slot
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default SalonDetails
