export function getMatchLabel(score) {
  if (score >= 95) return 'Exceptional fit'
  if (score >= 90) return 'Excellent fit'
  if (score >= 84) return 'Strong fit'
  return 'Good fit'
}
