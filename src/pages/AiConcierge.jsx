import { useState } from 'react'
import AiRecommendationCard from '../components/AiRecommendationCard'
import BridalTimeline from '../components/BridalTimeline'
import Icon from '../components/Icon'
import { areas } from '../data/salons'
import {
  budgetOptions,
  generateBridalTimeline,
  getBeautyMatches,
  getDefaultEventDate,
  getDemoRecommendations,
  getTodayInputValue,
  occasionOptions,
  serviceOptions,
  styleOptions,
} from '../lib/aiDemo'

const defaultPreferences = {
  occasion: 'Bridal event',
  area: 'Greater Kailash',
  budget: '12000',
  service: 'Bridal makeup',
  style: 'Soft glam',
  homeService: 'preferred',
  eventDate: getDefaultEventDate(),
}

const quickBriefs = [
  {
    label: 'Bridal in South Delhi',
    values: defaultPreferences,
  },
  {
    label: 'Hair refresh under ₹1.5k',
    values: {
      occasion: 'Everyday refresh',
      area: 'Saket',
      budget: '1500',
      service: 'Haircut & styling',
      style: 'Natural & low-maintenance',
      homeService: 'none',
      eventDate: getDefaultEventDate(),
    },
  },
  {
    label: 'Home-service glow',
    values: {
      occasion: 'Self-care day',
      area: 'Dwarka',
      budget: '3000',
      service: 'Facial & skincare',
      style: 'Sensitive-skin friendly',
      homeService: 'required',
      eventDate: getDefaultEventDate(),
    },
  },
]

function AiConcierge() {
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [resultPreferences, setResultPreferences] = useState(defaultPreferences)
  const [recommendations, setRecommendations] = useState(() =>
    getDemoRecommendations(defaultPreferences),
  )
  const [timeline, setTimeline] = useState(() =>
    generateBridalTimeline(defaultPreferences.eventDate),
  )
  const [loading, setLoading] = useState(false)
  const [timelineLoading, setTimelineLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('demo')
  const [notice, setNotice] = useState(
    'GlowGuide used seven transparent preference signals on the verified catalog.',
  )

  function updatePreference(event) {
    const { name, value } = event.target
    setPreferences((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const nextTimeline = generateBridalTimeline(preferences.eventDate)
      const result = await getBeautyMatches(preferences)
      setRecommendations(result.recommendations)
      setTimeline(nextTimeline)
      setMode(result.mode)
      setNotice(result.notice)
      setResultPreferences(preferences)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'We could not build your matches. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleTimelineSubmit(event) {
    event.preventDefault()
    setTimelineLoading(true)
    setError('')

    window.setTimeout(() => {
      try {
        setTimeline(generateBridalTimeline(preferences.eventDate))
      } catch (timelineError) {
        setError(
          timelineError instanceof Error
            ? timelineError.message
            : 'We could not build that timeline.',
        )
      } finally {
        setTimelineLoading(false)
      }
    }, 450)
  }

  function applyQuickBrief(values) {
    setPreferences(values)
    setError('')
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-800 bg-plum-950 text-white">
        <div className="absolute right-[-8rem] top-[-10rem] size-[30rem] rounded-full bg-plum-600/40 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-6rem] size-[28rem] rounded-full bg-saffron-400/10 blur-3xl" />
        <div className="page-shell relative grid gap-9 py-14 sm:py-18 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-saffron-300 uppercase">
              <Icon name="sparkle" size={14} />
              GlowGuide · AI beauty concierge
            </span>
            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-tight font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Tell us the look. GlowGuide finds the right Delhi salon.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-plum-200 sm:text-lg">
              Tell us the occasion, area, budget, service, style, setting, and date.
              Get three grounded recommendations with the trade-offs, price, next slot,
              and reasoning made clear.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur">
            <p className="text-xs font-bold tracking-[0.14em] text-saffron-300 uppercase">
              Reliable by design
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ['7', 'match signals'],
                ['3', 'clear options'],
                ['24/7', 'fallback ready'],
              ].map(([value, label]) => (
                <div className="rounded-2xl bg-white/8 p-3" key={label}>
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-wide text-plum-200 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
          <form
            className="card-surface p-5 sm:p-6 lg:sticky lg:top-24"
            id="beauty-brief-form"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-plum-100 text-plum-700">
                <Icon name="sparkle" size={20} />
              </span>
              <div>
                <h2 className="font-bold text-ink">Build my beauty brief</h2>
                <p className="mt-0.5 text-xs text-stone-500">
                  About 30 seconds · every field improves the match
                </p>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs font-bold tracking-wide text-stone-400 uppercase">
                Start with a quick brief
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickBriefs.map((brief) => (
                  <button
                    className="min-h-9 rounded-full border border-plum-100 bg-plum-50/60 px-3 text-xs font-bold text-plum-700 transition hover:border-plum-300 hover:bg-plum-100"
                    key={brief.label}
                    onClick={() => applyQuickBrief(brief.values)}
                    type="button"
                  >
                    {brief.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Occasion</span>
                <select
                  className="field-control"
                  name="occasion"
                  onChange={updatePreference}
                  value={preferences.occasion}
                >
                  {occasionOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Preferred area</span>
                <select
                  className="field-control"
                  name="area"
                  onChange={updatePreference}
                  value={preferences.area}
                >
                  <option>Anywhere in Delhi</option>
                  {areas.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Budget</span>
                <select
                  className="field-control"
                  name="budget"
                  onChange={updatePreference}
                  value={preferences.budget}
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Service type</span>
                <select
                  className="field-control"
                  name="service"
                  onChange={updatePreference}
                  value={preferences.service}
                >
                  {serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Preferred style</span>
                <select
                  className="field-control"
                  name="style"
                  onChange={updatePreference}
                  value={preferences.style}
                >
                  {styleOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend className="mb-2 block text-sm font-bold text-ink">
                  Home service preference
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ['none', 'No preference'],
                    ['preferred', 'Preferred'],
                    ['required', 'Required'],
                  ].map(([value, label]) => (
                    <label className="cursor-pointer" key={value}>
                      <input
                        checked={preferences.homeService === value}
                        className="peer sr-only"
                        name="homeService"
                        onChange={updatePreference}
                        type="radio"
                        value={value}
                      />
                      <span className="grid min-h-12 place-items-center rounded-xl border border-plum-100 px-2 text-center text-[11px] font-bold text-stone-500 transition peer-checked:border-plum-700 peer-checked:bg-plum-50 peer-checked:text-plum-800">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Event date</span>
                <input
                  className="field-control"
                  min={getTodayInputValue()}
                  name="eventDate"
                  onChange={updatePreference}
                  required
                  type="date"
                  value={preferences.eventDate}
                />
              </label>
            </div>

            <button className="primary-button mt-7 w-full" disabled={loading} type="submit">
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  Reading your beauty brief…
                </>
              ) : (
                <>
                  Find my 3 best matches
                  <Icon name="arrow" size={17} />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-stone-500">
              GlowGuide stays useful if a live AI connection is unavailable by
              switching to the same transparent, on-device matching logic.
            </p>
          </form>

          <div aria-busy={loading} aria-live="polite">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold tracking-[0.15em] text-plum-700 uppercase">
                  Your AI shortlist
                </span>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Three matches, with clear reasons
                </h2>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                  mode === 'live'
                    ? 'bg-emerald-100 text-emerald-800'
                    : mode === 'fallback'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-plum-100 text-plum-700'
                }`}
              >
                {mode === 'live' ? 'Live AI' : mode === 'fallback' ? 'Fallback active' : 'Demo mode'}
              </span>
            </div>

            {error && (
              <div
                className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                role="alert"
              >
                <Icon className="mt-0.5 shrink-0" name="warning" size={18} />
                <div>
                  <p className="font-bold">We need one quick correction</p>
                  <p className="mt-1 leading-6">{error}</p>
                  <button
                    className="mt-2 font-bold text-red-800 underline underline-offset-4"
                    form="beauty-brief-form"
                    type="submit"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="mt-7 space-y-5" aria-label="Finding salon matches">
                {[1, 2, 3].map((item) => (
                  <div className="card-surface overflow-hidden" key={item}>
                    <div className="grid animate-pulse lg:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="min-h-52 bg-plum-100" />
                      <div className="space-y-4 p-6">
                        <div className="h-4 w-28 rounded bg-plum-100" />
                        <div className="h-8 w-2/3 rounded bg-plum-100" />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="h-24 rounded-2xl bg-plum-50" />
                          <div className="h-24 rounded-2xl bg-plum-50" />
                        </div>
                        <div className="h-16 rounded-2xl bg-plum-50" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              <>
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-saffron-200 bg-saffron-50 p-4 text-sm leading-6 text-stone-700">
                  <Icon className="mt-0.5 shrink-0 text-saffron-600" name="shield" size={18} />
                  <p>
                    <strong className="text-ink">How this result was made:</strong> {notice}{' '}
                    Scores are directional decision aids, while prices and slots come from
                    the verified salon catalog.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Preferences used for these matches">
                  {[
                    resultPreferences.service,
                    resultPreferences.area,
                    resultPreferences.style,
                    resultPreferences.homeService === 'required'
                      ? 'Home service required'
                      : resultPreferences.homeService === 'preferred'
                        ? 'Home service preferred'
                        : 'Any setting',
                  ].map((item) => (
                    <span
                      className="rounded-full border border-plum-100 bg-white px-3 py-1.5 text-xs font-bold text-plum-700"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 rounded-2xl border border-plum-100 bg-plum-50/60 p-4 sm:grid-cols-3">
                  {[
                    ['90–100%', 'Excellent fit', 'Most preferences align'],
                    ['80–89%', 'Strong fit', 'A few trade-offs to review'],
                    ['Below 80%', 'Good alternative', 'Useful outside the top shortlist'],
                  ].map(([range, label, detail]) => (
                    <div key={range}>
                      <p className="text-xs font-black text-plum-900">{range} · {label}</p>
                      <p className="mt-1 text-[11px] leading-4 text-stone-500">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 space-y-5">
                  {recommendations.map((recommendation, index) => (
                    <AiRecommendationCard
                      key={recommendation.id}
                      rank={index + 1}
                      recommendation={recommendation}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="card-surface mt-7 grid min-h-80 place-items-center p-8 text-center">
                <div className="max-w-sm">
                  <Icon className="mx-auto text-plum-500" name="search" size={30} />
                  <h3 className="mt-4 text-xl font-bold text-ink">No matches yet</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Adjust the beauty brief and try again. The matcher will always return
                    the strongest available Delhi alternatives.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-plum-100 bg-plum-50/60" id="bridal-planner">
        <div className="page-shell py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow">
                <Icon name="calendar" size={14} />
                Bridal beauty timeline
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-4xl">
                Turn the event date into a calm, dated runway
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600">
                GlowGuide schedules the booking lock, facial, hair spa, makeup trial,
                grooming window, and final confirmation. Short timelines automatically
                compress into a practical plan.
              </p>

              <form className="card-surface mt-7 p-5" onSubmit={handleTimelineSubmit}>
                <label>
                  <span className="mb-2 block text-sm font-bold text-ink">
                    Wedding or event date
                  </span>
                  <input
                    className="field-control"
                    min={getTodayInputValue()}
                    name="eventDate"
                    onChange={updatePreference}
                    required
                    type="date"
                    value={preferences.eventDate}
                  />
                </label>
                <button
                  className="secondary-button mt-4 w-full"
                  disabled={timelineLoading}
                  type="submit"
                >
                  {timelineLoading ? 'Building dated plan…' : 'Generate my timeline'}
                  {!timelineLoading && <Icon name="sparkle" size={16} />}
                </button>
              </form>
            </div>

            {timelineLoading ? (
              <div className="space-y-4" aria-label="Building bridal timeline">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className="card-surface h-28 animate-pulse bg-white" key={item} />
                ))}
              </div>
            ) : (
              <BridalTimeline timeline={timeline} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default AiConcierge
