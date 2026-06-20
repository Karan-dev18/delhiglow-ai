import { getMatchLabel } from '../lib/matchScore'

function MatchScore({ score, circular = false, compact = false, inverse = false }) {
  const label = getMatchLabel(score)

  if (circular) {
    return (
      <span
        aria-label={`${score} percent match, ${label}`}
        className="inline-flex size-20 shrink-0 items-center justify-center rounded-full p-1 shadow-xl sm:size-[5.5rem] sm:p-1.5"
        style={{
          background: `conic-gradient(#2a1727 ${score * 3.6}deg, rgba(255,255,255,.62) 0deg)`,
        }}
      >
        <span
          aria-hidden="true"
          className="flex size-full min-w-0 flex-col items-center justify-center gap-1 rounded-full bg-white px-1.5 text-center"
        >
          <span className="text-[17px] leading-none font-black text-plum-950 sm:text-lg">
            {score}%
          </span>
          <span className="max-w-full text-[8px] leading-[1.05] font-extrabold tracking-[0.08em] text-plum-600 uppercase sm:text-[9px]">
            {label}
          </span>
        </span>
      </span>
    )
  }

  return (
    <span
      aria-label={`${score} percent match, ${label}`}
      className={`inline-flex items-center gap-2 rounded-full font-bold shadow-sm ${
        compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3.5 py-2 text-xs'
      } ${
        inverse
          ? 'border border-white/15 bg-plum-950 text-white'
          : 'border border-plum-100 bg-white/90 text-plum-950'
      }`}
    >
      <span className={`size-2 rounded-full ${score >= 90 ? 'bg-emerald-400' : 'bg-saffron-400'}`} />
      <span>{score}%{compact ? ' fit' : ''}</span>
      {!compact && (
        <>
          <span aria-hidden="true" className={inverse ? 'text-white/35' : 'text-plum-200'}>
            ·
          </span>
          <span className={inverse ? 'text-plum-100' : 'text-plum-700'}>{label}</span>
        </>
      )}
    </span>
  )
}

export default MatchScore
