import { getMatchLabel } from '../lib/matchScore'

function MatchScore({ score, compact = false, inverse = false }) {
  const label = getMatchLabel(score)

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
