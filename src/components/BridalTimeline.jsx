import Icon from './Icon'

function BridalTimeline({ timeline }) {
  return (
    <div aria-label={`Bridal beauty timeline for ${timeline.eventDate}`}>
      <div className="flex flex-col gap-4 rounded-3xl border border-saffron-200 bg-gradient-to-r from-saffron-50 to-plum-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-saffron-600 uppercase">
            <Icon name="sparkle" size={14} />
            GlowGuide plan · {timeline.pace}
          </p>
          <p className="mt-1 font-bold text-ink">Event day: {timeline.eventDate}</p>
          <p className="mt-1 text-xs text-stone-500">
            {timeline.steps.length} dated milestones, sequenced to protect recovery time.
          </p>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-bold text-plum-700">
          {timeline.daysUntilEvent} days to go
        </span>
      </div>

      <ol className="relative mt-6 space-y-4 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-plum-200">
        {timeline.steps.map((item, index) => (
          <li
            className={`card-surface relative flex gap-4 p-4 sm:p-5 ${
              item.urgent ? 'border-saffron-300 bg-saffron-50/35' : ''
            }`}
            key={`${item.title}-${item.date}`}
          >
            <span className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-md ${
              item.urgent ? 'bg-saffron-500' : 'bg-plum-950'
            }`}>
              {item.category === 'Event day' ? <Icon name="star" size={17} /> : index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold tracking-[0.1em] text-rosewood uppercase">
                  {item.category}
                </p>
                <p className="flex items-center gap-1.5 text-xs font-bold text-plum-700">
                  <Icon name="calendar" size={13} />
                  {item.date}
                  {item.urgent && (
                    <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">
                      Start now
                    </span>
                  )}
                </p>
              </div>
              <h3 className="mt-1.5 font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BridalTimeline
