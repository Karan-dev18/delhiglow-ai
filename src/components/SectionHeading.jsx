function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start'

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-stone-600">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
