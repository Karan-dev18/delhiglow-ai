import { Link } from 'react-router-dom'
import { getCatalogSmartMatch } from '../lib/aiDemo'
import Icon from './Icon'
import MatchScore from './MatchScore'

function SalonCard({ salon, compact = false }) {
  const nextSlot = salon.availabilitySlots?.[0]
  const smartMatch = getCatalogSmartMatch(salon)
  const matchScore = smartMatch.score

  const explanation = smartMatch.explanation
    .replace('High because of ', '')
    .replace('Strong on ', '')
    .replace(/\.$/, '')

  return (
    <article className="card-surface group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-plum-200 hover:shadow-glow">
      <Link
        aria-label={`View ${salon.name} in ${salon.area}`}
        className="flex h-full flex-col"
        to={`/salons/${salon.id}`}
      >
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${salon.gradient} ${
            compact ? 'h-40' : 'h-52'
          }`}
        >
          <div className="absolute -right-8 -top-8 size-36 rounded-full border border-white/60 bg-white/20" />
          <div className="absolute -bottom-14 left-1/3 size-36 rounded-full bg-white/30 blur-xl" />
          <div className="absolute left-4 top-4 flex max-w-[55%] flex-wrap gap-1.5">
            {salon.badges.slice(0, 1).map((badge) => (
              <span
                className="rounded-full border border-white/50 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-plum-900 shadow-sm backdrop-blur"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="absolute bottom-5 left-5 grid size-15 place-items-center rounded-2xl border border-white/60 bg-white/75 font-display text-xl font-semibold text-plum-900 shadow-lg backdrop-blur">
            {salon.initials}
          </div>
          <div className="absolute right-4 top-4">
            <MatchScore compact inverse score={matchScore} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold tracking-[-0.02em] text-ink transition group-hover:text-plum-700">
                {salon.name}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                <Icon name="location" size={15} />
                {salon.area}, {salon.city}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="flex items-center justify-end gap-1 text-sm font-bold text-ink">
                <Icon className="fill-saffron-400 text-saffron-400" name="star" size={15} />
                {salon.rating}
              </span>
              <span className="mt-0.5 block text-[11px] text-stone-400">
                {salon.reviewsCount} reviews
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {salon.specialties.slice(0, 2).map((service) => (
              <span
                className="rounded-full bg-plum-50 px-2.5 py-1 text-xs font-semibold text-plum-700"
                key={service}
              >
                {service}
              </span>
            ))}
            {salon.homeService && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                Home service
              </span>
            )}
          </div>

          <div className="mt-5 border-t border-plum-100 pt-4">
            <p className="flex items-start gap-2 text-sm leading-6 text-stone-600">
              <Icon className="mt-0.5 shrink-0 text-plum-600" name="sparkle" size={16} />
              <span>
                <strong className="text-ink">Top match signals: </strong>
                {explanation}.
              </span>
            </p>
            <div
              aria-label={`${matchScore} percent smart match`}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-plum-100"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-plum-600 to-saffron-400"
                style={{ width: `${matchScore}%` }}
              />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
                  Services from
                </p>
                <p className="mt-0.5 text-lg font-black text-ink">
                  ₹{salon.startingPrice.toLocaleString('en-IN')}
                </p>
                {nextSlot && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Next: {nextSlot.day} · {nextSlot.times[0]}
                  </p>
                )}
              </div>
              <span className="flex min-h-10 items-center gap-1 rounded-full border border-plum-200 px-3.5 text-xs font-bold text-plum-800 transition group-hover:border-plum-800 group-hover:bg-plum-950 group-hover:text-white">
                View salon <Icon name="chevron" size={15} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SalonCard
