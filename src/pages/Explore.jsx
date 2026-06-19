import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import SalonCard from '../components/SalonCard'
import { areas, salons, serviceCategories } from '../data/salons'
import { getCatalogSmartMatch } from '../lib/aiDemo'

const budgetOptions = [
  { label: 'Any budget', value: 'all' },
  { label: 'Under ₹750', value: '750' },
  { label: 'Under ₹1,000', value: '1000' },
  { label: 'Under ₹1,500', value: '1500' },
]

function FilterControls({
  area,
  budget,
  category,
  homeService,
  idPrefix,
  minRating,
  setArea,
  setBudget,
  setCategory,
  setHomeService,
  setMinRating,
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-bold text-ink" htmlFor={`${idPrefix}-area`}>
          Area
        </label>
        <select
          className="field-control"
          id={`${idPrefix}-area`}
          onChange={(event) => setArea(event.target.value)}
          value={area}
        >
          <option value="All Delhi">All Delhi</option>
          {areas.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-bold text-ink"
          htmlFor={`${idPrefix}-category`}
        >
          Category
        </label>
        <select
          className="field-control"
          id={`${idPrefix}-category`}
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          {serviceCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-bold text-ink">Starting budget</legend>
        <div className="space-y-2">
          {budgetOptions.map((option) => (
            <label
              className="flex min-h-10 cursor-pointer items-center justify-between rounded-xl px-2 text-sm text-stone-600 transition hover:bg-plum-50"
              key={option.value}
            >
              <span>{option.label}</span>
              <input
                checked={budget === option.value}
                className="size-4 accent-plum-700"
                name={`${idPrefix}-budget`}
                onChange={(event) => setBudget(event.target.value)}
                type="radio"
                value={option.value}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          className="mb-2 block text-sm font-bold text-ink"
          htmlFor={`${idPrefix}-rating`}
        >
          Minimum rating
        </label>
        <select
          className="field-control"
          id={`${idPrefix}-rating`}
          onChange={(event) => setMinRating(Number(event.target.value))}
          value={minRating}
        >
          <option value="0">Any rating</option>
          <option value="4.6">4.6 and above</option>
          <option value="4.7">4.7 and above</option>
          <option value="4.8">4.8 and above</option>
          <option value="4.9">4.9 only</option>
        </select>
      </div>

      <label className="flex min-h-12 cursor-pointer items-center justify-between rounded-2xl border border-plum-100 bg-plum-50/60 px-4 text-sm font-bold text-ink">
        Home service available
        <input
          checked={homeService}
          className="size-5 accent-plum-700"
          onChange={(event) => setHomeService(event.target.checked)}
          type="checkbox"
        />
      </label>
    </div>
  )
}

function Explore() {
  const [searchParams] = useSearchParams()
  const initialArea = searchParams.get('area') ?? 'All Delhi'
  const initialCategory = searchParams.get('category') ?? 'All categories'
  const [query, setQuery] = useState('')
  const [area, setArea] = useState(initialArea)
  const [category, setCategory] = useState(initialCategory)
  const [budget, setBudget] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [homeService, setHomeService] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')

  const filteredSalons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const maxBudget = budget === 'all' ? Number.POSITIVE_INFINITY : Number(budget)

    const matches = salons.filter((salon) => {
      const searchableText = [
        salon.name,
        salon.area,
        salon.city,
        salon.description,
        ...salon.categories,
        ...salon.specialties,
        ...salon.matchTags,
        ...salon.services.map((service) => service.name),
      ]
        .join(' ')
        .toLowerCase()

      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        (area === 'All Delhi' || salon.area === area) &&
        (category === 'All categories' || salon.categories.includes(category)) &&
        salon.startingPrice <= maxBudget &&
        salon.rating >= minRating &&
        (!homeService || salon.homeService)
      )
    })

    return [...matches].sort((first, second) => {
      if (sortBy === 'rating') return second.rating - first.rating
      if (sortBy === 'price-low') return first.startingPrice - second.startingPrice
      if (sortBy === 'price-high') return second.startingPrice - first.startingPrice
      if (sortBy === 'popularity') return second.popularity - first.popularity
      return getCatalogSmartMatch(second).score - getCatalogSmartMatch(first).score
    })
  }, [area, budget, category, homeService, minRating, query, sortBy])

  const activeFilters = [
    area !== 'All Delhi',
    category !== 'All categories',
    budget !== 'all',
    minRating > 0,
    homeService,
  ].filter(Boolean).length
  const activeFilterChips = [
    area !== 'All Delhi' && { label: area, clear: () => setArea('All Delhi') },
    category !== 'All categories' && {
      label: category,
      clear: () => setCategory('All categories'),
    },
    budget !== 'all' && {
      label: budgetOptions.find((option) => option.value === budget)?.label,
      clear: () => setBudget('all'),
    },
    minRating > 0 && {
      label: `${minRating}+ rated`,
      clear: () => setMinRating(0),
    },
    homeService && { label: 'Home service', clear: () => setHomeService(false) },
  ].filter(Boolean)

  function clearFilters() {
    setQuery('')
    setArea('All Delhi')
    setCategory('All categories')
    setBudget('all')
    setMinRating(0)
    setHomeService(false)
    setSortBy('recommended')
  }

  const sharedFilterProps = {
    area,
    budget,
    category,
    homeService,
    minRating,
    setArea,
    setBudget,
    setCategory,
    setHomeService,
    setMinRating,
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-100 bg-plum-50/70">
        <div className="absolute right-[-8rem] top-[-8rem] size-80 rounded-full bg-saffron-200/35 blur-3xl" />
        <div className="page-shell relative py-12 sm:py-16">
          <span className="eyebrow">
            <Icon name="location" size={14} />
            Beauty across Delhi
          </span>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
                Find your kind of salon
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
                Search by service, salon, or locality—then compare transparent
                pricing, availability, ratings, and AI-powered match signals.
              </p>
            </div>
            <p className="text-sm font-semibold text-stone-500">
              {salons.length} curated salons · 12 neighbourhoods
            </p>
          </div>

          <label className="relative mt-8 block max-w-3xl">
            <span className="sr-only">Search by salon, service, or area</span>
            <Icon
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"
              name="search"
              size={20}
            />
            <input
              className="min-h-14 w-full rounded-2xl border border-plum-200 bg-white py-4 pl-13 pr-14 text-base text-ink shadow-sm transition placeholder:text-stone-400 hover:border-plum-300 focus:border-plum-600 focus:ring-4 focus:ring-plum-100 focus:outline-none"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “bridal makeup”, “Saket”, or “sensitive skin”"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-stone-400 transition hover:bg-plum-50 hover:text-plum-800"
                onClick={() => setQuery('')}
                type="button"
              >
                <Icon name="close" size={17} />
              </button>
            )}
          </label>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14">
        <details className="card-surface group sticky top-20 z-30 mb-6 bg-white/95 backdrop-blur lg:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-5 font-bold text-ink">
            <span className="flex items-center gap-2">
              Filter salons
              {activeFilters > 0 && (
                <span className="grid size-6 place-items-center rounded-full bg-plum-950 text-xs text-white">
                  {activeFilters}
                </span>
              )}
            </span>
            <Icon className="transition group-open:rotate-90" name="chevron" size={18} />
          </summary>
          <div className="border-t border-plum-100 p-5">
            <FilterControls idPrefix="mobile" {...sharedFilterProps} />
            {activeFilters > 0 && (
              <button className="secondary-button mt-6 w-full" onClick={clearFilters} type="button">
                Reset all filters
              </button>
            )}
          </div>
        </details>

        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="card-surface sticky top-24 p-5">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-ink">Filters</h2>
                {activeFilters > 0 && (
                  <button
                    className="text-xs font-bold text-plum-700 underline-offset-4 hover:underline"
                    onClick={clearFilters}
                    type="button"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterControls idPrefix="desktop" {...sharedFilterProps} />
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-4 border-b border-plum-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-ink">
                  {filteredSalons.length} salon{filteredSalons.length === 1 ? '' : 's'} found
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Catalog scores compare trust, availability, popularity, and convenience.
                </p>
              </div>
              <label className="flex w-full items-center gap-3 text-sm font-semibold text-stone-600 sm:w-auto">
                <span className="shrink-0">Sort by</span>
                <select
                  aria-label="Sort salon results"
                  className="field-control min-w-0 flex-1 sm:min-w-44"
                  onChange={(event) => setSortBy(event.target.value)}
                  value={sortBy}
                >
                  <option value="recommended">AI match</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-saffron-100 bg-saffron-50/70 p-4 text-sm leading-6 text-stone-600">
              <p className="flex items-start gap-2">
                <Icon className="mt-0.5 shrink-0 text-saffron-600" name="sparkle" size={17} />
                <span>
                  <strong className="text-ink">Want a personal score?</strong> Catalog
                  scores rank overall salon quality. GlowGuide adds your exact area,
                  budget, service, style, and occasion.
                  <Link className="ml-1 font-bold text-plum-700 hover:underline" to="/ai-concierge">
                    Get my AI shortlist
                  </Link>
                </span>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                [
                  'Bridal',
                  category === 'Bridal',
                  () => setCategory(category === 'Bridal' ? 'All categories' : 'Bridal'),
                ],
                [
                  'Under ₹1,000',
                  budget === '1000',
                  () => setBudget(budget === '1000' ? 'all' : '1000'),
                ],
                [
                  '4.8+ rated',
                  minRating === 4.8,
                  () => setMinRating(minRating === 4.8 ? 0 : 4.8),
                ],
                ['Home service', homeService, () => setHomeService((current) => !current)],
              ].map(([label, active, action]) => (
                <button
                  aria-pressed={active}
                  className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
                    active
                      ? 'border-plum-900 bg-plum-950 text-white'
                      : 'border-plum-100 bg-white text-stone-600 hover:border-plum-300 hover:text-plum-800'
                  }`}
                  key={label}
                  onClick={action}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            {activeFilterChips.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Applied filters">
                <span className="mr-1 text-xs font-bold tracking-wide text-stone-400 uppercase">
                  Applied
                </span>
                {activeFilterChips.map((filter) => (
                  <button
                    className="inline-flex min-h-9 items-center gap-2 rounded-full bg-plum-100 px-3 text-xs font-bold text-plum-800"
                    key={filter.label}
                    onClick={filter.clear}
                    type="button"
                  >
                    {filter.label}
                    <Icon name="close" size={13} />
                  </button>
                ))}
                <button
                  className="min-h-9 px-2 text-xs font-bold text-plum-700 hover:underline"
                  onClick={clearFilters}
                  type="button"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredSalons.length > 0 ? (
              <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredSalons.map((salon) => (
                  <SalonCard key={salon.id} salon={salon} />
                ))}
              </div>
            ) : (
              <div className="card-surface mt-7 grid min-h-96 place-items-center p-8 text-center">
                <div className="max-w-md">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-plum-100 text-plum-700">
                    <Icon name="search" size={26} />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-ink">No salons match that mix</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    Try widening the budget, lowering the rating, or searching a
                    nearby Delhi area. Your filters can be reset in one tap.
                  </p>
                  <button className="primary-button mt-6" onClick={clearFilters} type="button">
                    Clear all filters
                  </button>
                  <Link className="secondary-button mt-3 sm:ml-2" to="/ai-concierge">
                    Ask GlowGuide instead
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Explore
