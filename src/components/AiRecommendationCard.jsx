import { Link } from 'react-router-dom'
import Icon from './Icon'
import MatchScore from './MatchScore'

function AiRecommendationCard({ recommendation, rank }) {
  const {
    area,
    bestTimeSlot,
    estimatedPrice,
    explanation,
    gradient,
    id,
    initials,
    matchFactors,
    matchScore,
    name,
    rating,
    suggestedService,
  } = recommendation
  return (
    <article className="card-surface overflow-hidden transition duration-300 hover:border-plum-200 hover:shadow-glow">
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <div
          className={`relative min-h-52 overflow-hidden bg-gradient-to-br ${gradient} p-5 lg:min-h-full`}
        >
          <div className="absolute -right-10 -top-10 size-40 rounded-full border border-white/60 bg-white/20" />
          <div className="absolute -bottom-16 left-8 size-44 rounded-full bg-white/30 blur-xl" />
          <div className="relative flex h-full min-h-42 flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1.5 text-xs font-bold text-plum-950 shadow-sm backdrop-blur">
                Match #{rank}
              </span>
              <MatchScore circular score={matchScore} />
            </div>
            <span className="grid size-14 place-items-center rounded-2xl border border-white/60 bg-white/80 font-display text-xl font-semibold text-plum-900 shadow-lg backdrop-blur">
              {initials}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-plum-600 uppercase">
                <Icon name="sparkle" size={14} />
                AI Beauty Match
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-ink">{name}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500">
                <span className="flex items-center gap-1">
                  <Icon name="location" size={14} />
                  {area}
                </span>
                <span className="flex items-center gap-1 font-bold text-ink">
                  <Icon className="fill-saffron-400 text-saffron-400" name="star" size={14} />
                  {rating}
                </span>
              </p>
            </div>
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Next opening: {bestTimeSlot}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-plum-100 bg-plum-50/60 p-4">
              <p className="text-xs font-bold tracking-wide text-stone-500 uppercase">
                Suggested service
              </p>
              <p className="mt-1.5 font-bold text-ink">{suggestedService.name}</p>
              <p className="mt-1 text-xs text-stone-500">{suggestedService.duration}</p>
            </div>
            <div className="rounded-2xl border border-saffron-100 bg-saffron-50 p-4">
              <p className="text-xs font-bold tracking-wide text-stone-500 uppercase">
                Estimated price
              </p>
              <p className="mt-1.5 text-xl font-black text-ink">
                ₹{estimatedPrice.toLocaleString('en-IN')}
              </p>
              <p className="mt-1 text-xs text-stone-500">Seeded menu price</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-plum-100 p-4">
            <p className="flex items-start gap-2 text-sm leading-6 text-stone-700">
              <Icon className="mt-0.5 shrink-0 text-plum-600" name="sparkle" size={16} />
              <span>
                <strong className="text-ink">Why it matches: </strong>
                {explanation}
              </span>
            </p>
          </div>

          <details className="group mt-4 rounded-2xl border border-transparent open:border-plum-100 open:bg-plum-50/45 open:p-4">
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-plum-700">
              How the {matchScore}% score was calculated
              <Icon
                className="transition group-open:rotate-90"
                name="chevron"
                size={16}
              />
            </summary>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {matchFactors.map((factor) => (
                <div className="rounded-xl bg-stone-50 p-3" key={factor.label}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-ink">{factor.label}</span>
                    <span className="font-bold text-plum-700">
                      {factor.score}/{factor.max}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-plum-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-plum-700 to-saffron-400"
                      style={{ width: `${Math.round((factor.score / factor.max) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] leading-4 text-stone-500">{factor.detail}</p>
                </div>
              ))}
            </div>
          </details>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              className="primary-button flex-1"
              to={`/booking?salon=${id}&service=${encodeURIComponent(suggestedService.name)}&source=ai-concierge`}
            >
              Book this match
              <Icon name="arrow" size={17} />
            </Link>
            <Link className="secondary-button flex-1" to={`/salons/${id}`}>
              View salon
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default AiRecommendationCard
