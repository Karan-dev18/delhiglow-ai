import Icon from './Icon'

function ReviewSummaryPanel({ summary }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-plum-200 bg-plum-50 shadow-[0_24px_60px_-42px_rgba(42,23,39,0.65)]">
      <div className="border-b border-plum-200 bg-gradient-to-br from-plum-950 via-plum-900 to-plum-700 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-saffron-300 uppercase">
              <Icon name="sparkle" size={15} />
              AI review summary
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              What guests consistently signal
            </h2>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
            <Icon className="fill-saffron-300 text-saffron-300" name="star" size={14} />
            {summary.average} · {summary.sentimentLabel}
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-plum-100">{summary.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [summary.reviewCount, 'reviews analysed'],
            [summary.pros.length, 'recurring strengths'],
            [summary.possibleConcerns.length, 'practical watch-outs'],
          ].map(([value, label]) => (
            <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3" key={label}>
              <p className="text-lg font-black text-white">{value}</p>
              <p className="mt-0.5 text-[10px] font-bold tracking-wide text-plum-200 uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-7 md:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-900">
            <span className="grid size-7 place-items-center rounded-full bg-emerald-100">
              <Icon name="check" size={15} strokeWidth={2.2} />
            </span>
            Pros guests mention
          </h3>
          <ul className="mt-4 space-y-3">
            {summary.pros.map((pro) => (
              <li
                className="rounded-2xl border border-emerald-100 bg-white p-3.5"
                key={pro.label}
              >
                <p className="text-sm font-bold text-ink">{pro.label}</p>
                <p className="mt-1 text-xs text-stone-500">
                  Mentioned in {pro.mentions} of {summary.reviewCount} available reviews
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-amber-900">
            <span className="grid size-7 place-items-center rounded-full bg-amber-100">
              <Icon name="warning" size={15} strokeWidth={2.2} />
            </span>
            Possible concerns
          </h3>
          <ul className="mt-4 space-y-3">
            {summary.possibleConcerns.map((concern) => (
              <li
                className="rounded-2xl border border-amber-100 bg-white p-3.5"
                key={concern.label}
              >
                <p className="text-sm font-bold text-ink">{concern.label}</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">{concern.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-plum-200 px-6 py-4 text-xs leading-5 text-stone-500 sm:px-7">
        GlowGuide only summarises the review text shown on this listing. Themes are
        directional and the original reviews remain the source of truth.
      </p>
    </section>
  )
}

export default ReviewSummaryPanel
