import { salons } from '../data/salons'
import { hasConfiguredAiApi, requestAi } from './aiClient'

export const budgetOptions = [
  { value: '1500', label: 'Up to ₹1,500', ceiling: 1500 },
  { value: '3000', label: 'Up to ₹3,000', ceiling: 3000 },
  { value: '6000', label: 'Up to ₹6,000', ceiling: 6000 },
  { value: '12000', label: 'Up to ₹12,000', ceiling: 12000 },
  { value: '30000', label: 'Up to ₹30,000', ceiling: 30000 },
  { value: 'flexible', label: 'Flexible for the right fit', ceiling: Number.POSITIVE_INFINITY },
]

export const serviceOptions = [
  'Haircut & styling',
  'Hair colour',
  'Facial & skincare',
  'Nails',
  'Occasion makeup',
  'Bridal makeup',
  'Pre-bridal plan',
]

export const styleOptions = [
  'Natural & low-maintenance',
  'Soft glam',
  'Bold & editorial',
  'Traditional bridal',
  'Quiet luxury',
  'Trend-led',
  'Sensitive-skin friendly',
]

export const occasionOptions = [
  'Everyday refresh',
  'Date night',
  'Wedding guest',
  'Bridal event',
  'Professional event',
  'Self-care day',
]

const serviceProfiles = {
  'Haircut & styling': {
    categories: ['Hair'],
    keywords: ['haircut', 'layers', 'blowout', 'styling', 'finish'],
  },
  'Hair colour': {
    categories: ['Hair'],
    keywords: ['colour', 'balayage', 'global', 'gloss'],
  },
  'Facial & skincare': {
    categories: ['Skin'],
    keywords: ['facial', 'skin', 'clean-up', 'glow', 'enzyme', 'infusion'],
  },
  Nails: {
    categories: ['Nails'],
    keywords: ['nail', 'manicure', 'pedicure', 'gel', 'biab'],
  },
  'Occasion makeup': {
    categories: ['Makeup', 'Bridal'],
    keywords: ['makeup', 'glam', 'event', 'cocktail', 'guest'],
  },
  'Bridal makeup': {
    categories: ['Bridal', 'Makeup'],
    keywords: ['bridal', 'bride', 'makeup', 'engagement', 'draping', 'wedding'],
  },
  'Pre-bridal plan': {
    categories: ['Bridal', 'Skin', 'Hair'],
    keywords: ['pre-bridal', 'consultation', 'facial', 'hair spa', 'trial'],
  },
}

const styleProfiles = {
  'Natural & low-maintenance': ['natural', 'practical', 'maintenance', 'everyday', 'transparent'],
  'Soft glam': ['soft glam', 'camera', 'occasion', 'bridal', 'makeup'],
  'Bold & editorial': ['editorial', 'creative', 'expressive', 'fashion', 'chrome'],
  'Traditional bridal': ['traditional', 'bridal', 'draping', 'family', 'wedding'],
  'Quiet luxury': ['quiet', 'luxury', 'premium', 'serene', 'high touch'],
  'Trend-led': ['trendy', 'modern', 'creative', 'nail art', 'colour'],
  'Sensitive-skin friendly': ['sensitive skin', 'gentle', 'barrier', 'clean beauty', 'skin'],
}

const occasionProfiles = {
  'Everyday refresh': ['everyday', 'grooming', 'value', 'haircut', 'facial'],
  'Date night': ['soft glam', 'makeup', 'nails', 'blowout', 'event ready'],
  'Wedding guest': ['occasion', 'party', 'makeup', 'event', 'draping'],
  'Bridal event': ['bridal', 'wedding', 'trial', 'draping', 'punctual'],
  'Professional event': ['natural', 'polished', 'quick appointment', 'office', 'open late'],
  'Self-care day': ['quiet salon', 'self care', 'skin', 'spa', 'nails'],
}

const areaZones = {
  'Rajouri Garden': 'West Delhi',
  'Punjabi Bagh': 'West Delhi',
  Janakpuri: 'West Delhi',
  Dwarka: 'West Delhi',
  'South Extension': 'South Delhi',
  Saket: 'South Delhi',
  'Greater Kailash': 'South Delhi',
  'Lajpat Nagar': 'South Delhi',
  'Connaught Place': 'Central Delhi',
  'Karol Bagh': 'Central Delhi',
  Rohini: 'North Delhi',
  'Preet Vihar': 'East Delhi',
}

const reviewThemes = [
  {
    label: 'Thoughtful consultations',
    keywords: ['consultation', 'explained', 'asked about', 'maintenance', 'routine'],
  },
  {
    label: 'Punctual, organised service',
    keywords: ['on time', 'punctual', 'arrived early', 'schedule', 'promised window'],
  },
  {
    label: 'Natural, reference-friendly results',
    keywords: ['natural', 'reference', 'photographed', 'camera-ready', 'shade matching'],
  },
  {
    label: 'Clean and careful setup',
    keywords: ['clean', 'hygiene', 'tools', 'neatly', 'detailed nail prep'],
  },
  {
    label: 'Transparent value',
    keywords: ['no surprise', 'fair price', 'good value', 'sensible pricing', 'no pressure'],
  },
  {
    label: 'Warm, patient team',
    keywords: ['friendly', 'kind staff', 'patient', 'did not rush', 'understood'],
  },
  {
    label: 'Convenient home service',
    keywords: ['home-service', 'home visit', 'at home', 'travel time'],
  },
  {
    label: 'Long-lasting finish',
    keywords: ['lasted', 'held through', 'through the week', 'rich without'],
  },
]

const concernThemes = [
  {
    label: 'Premium pricing',
    detail: 'Some guests explicitly describe the experience as premium-priced.',
    keywords: ['premium', 'price'],
  },
  {
    label: 'Peak-time energy',
    detail: 'Evening or weekend visits may feel busy, so a quieter slot is worth requesting.',
    keywords: ['busy', 'buzz', 'crowded', 'queue'],
  },
  {
    label: 'Allow the full appointment',
    detail: 'Detailed services may use the full quoted duration; avoid a tight schedule afterward.',
    keywords: ['full quoted time', 'took the full', 'not rush'],
  },
  {
    label: 'Share references in advance',
    detail: 'Reference-heavy services work best when inspiration is shared before the visit.',
    keywords: ['sharing references', 'reference'],
  },
]

function normalize(value = '') {
  return String(value).trim().toLowerCase()
}

function includesAny(text, keywords = []) {
  const normalizedText = normalize(text)
  return keywords.some((keyword) => normalizedText.includes(normalize(keyword)))
}

function getSalonSearchText(salon) {
  return [
    salon.name,
    salon.area,
    salon.description,
    ...salon.categories,
    ...salon.specialties,
    ...salon.matchTags,
    ...salon.services.flatMap((service) => [service.name, service.category]),
  ]
    .join(' ')
    .toLowerCase()
}

function getBudgetCeiling(value) {
  const configuredCeiling = budgetOptions.find((option) => option.value === value)?.ceiling
  if (configuredCeiling !== undefined) return configuredCeiling

  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numericValue : Number.POSITIVE_INFINITY
}

function rankSalonServices(salon, preferences) {
  const profile = serviceProfiles[preferences.service] ?? serviceProfiles['Haircut & styling']
  const styleKeywords = styleProfiles[preferences.style] ?? []

  return [...salon.services]
    .map((service) => {
      const serviceText = `${service.name} ${service.category}`.toLowerCase()
      const keywordHits = profile.keywords.filter((keyword) =>
        serviceText.includes(normalize(keyword)),
      ).length
      let fit = 0

      if (profile.categories.includes(service.category)) fit += 12
      fit += Math.min(10, keywordHits * 5)
      if (
        normalize(preferences.service).includes('makeup') &&
        normalize(service.name).includes('makeup')
      ) {
        fit += 4
      }
      if (includesAny(serviceText, styleKeywords)) fit += 3

      return { ...service, fit }
    })
    .sort((first, second) => second.fit - first.fit || first.price - second.price)
}

function calculateSalonMatch(salon, preferences) {
  const profile = serviceProfiles[preferences.service] ?? serviceProfiles['Haircut & styling']
  const salonText = getSalonSearchText(salon)
  const rankedServices = rankSalonServices(salon, preferences)
  const suggestedService = rankedServices[0] ?? salon.services[0]
  const budgetCeiling = getBudgetCeiling(preferences.budget)
  const preferredArea = preferences.area ?? 'Anywhere in Delhi'
  const preferredZone = areaZones[preferredArea]
  const salonZone = areaZones[salon.area]
  const styleKeywords = styleProfiles[preferences.style] ?? []
  const occasionKeywords = occasionProfiles[preferences.occasion] ?? []
  const factors = []

  const categoryMatch = profile.categories.some((category) => salon.categories.includes(category))
  const keywordMatch = includesAny(salonText, profile.keywords)
  const serviceScore = Math.min(22, (categoryMatch ? 12 : 0) + (keywordMatch ? 10 : 0))
  factors.push({
    label: 'Service expertise',
    score: serviceScore,
    max: 22,
    detail:
      serviceScore >= 18
        ? `${preferences.service} expertise`
        : 'Adjacent service expertise',
  })

  let areaScore = 4
  let areaDetail = `Elsewhere in Delhi`
  if (preferredArea === 'Anywhere in Delhi') {
    areaScore = 12
    areaDetail = 'Open to all Delhi areas'
  } else if (salon.area === preferredArea) {
    areaScore = 18
    areaDetail = `Exact ${preferredArea} match`
  } else if (preferredZone && preferredZone === salonZone) {
    areaScore = 10
    areaDetail = `Nearby in ${salonZone}`
  }
  factors.push({ label: 'Area convenience', score: areaScore, max: 18, detail: areaDetail })

  let budgetScore = 12
  let budgetDetail = 'Flexible budget fit'
  if (Number.isFinite(budgetCeiling)) {
    const ratio = suggestedService.price / budgetCeiling
    if (ratio <= 1) {
      budgetScore = 18
      budgetDetail = `₹${suggestedService.price.toLocaleString('en-IN')} fits your budget`
    } else if (ratio <= 1.2) {
      budgetScore = 10
      budgetDetail = 'Slightly above your target'
    } else if (ratio <= 1.5) {
      budgetScore = 5
      budgetDetail = 'A stretch option'
    } else {
      budgetScore = 1
      budgetDetail = 'Above your selected budget'
    }
  }
  factors.push({ label: 'Budget fit', score: budgetScore, max: 18, detail: budgetDetail })

  const ratingScore = Math.round(Math.max(0, Math.min(14, 8 + (salon.rating - 4.5) * 20)))
  factors.push({
    label: 'Guest confidence',
    score: ratingScore,
    max: 14,
    detail: `${salon.rating} rating from ${salon.reviewsCount} reviews`,
  })

  let homeScore = 8
  let homeDetail = salon.homeService ? 'Home visits available' : 'In-salon experience'
  if (preferences.homeService === 'required') {
    homeScore = salon.homeService ? 12 : 0
    homeDetail = salon.homeService ? 'Meets required home service' : 'Does not offer home service'
  } else if (preferences.homeService === 'preferred') {
    homeScore = salon.homeService ? 12 : 4
    homeDetail = salon.homeService ? 'Matches home-service preference' : 'In-salon alternative'
  }
  factors.push({ label: 'Service setting', score: homeScore, max: 12, detail: homeDetail })

  const styleMatches = styleKeywords.filter((keyword) => salonText.includes(normalize(keyword)))
  const styleScore = styleMatches.length > 0 ? 10 : 3
  factors.push({
    label: 'Style chemistry',
    score: styleScore,
    max: 10,
    detail:
      styleMatches.length > 0
        ? `Matches ${preferences.style.toLowerCase()} cues`
        : 'A versatile style alternative',
  })

  const occasionMatch = includesAny(salonText, occasionKeywords)
  const occasionScore = occasionMatch ? 6 : 2
  factors.push({
    label: 'Occasion readiness',
    score: occasionScore,
    max: 6,
    detail: occasionMatch ? `Relevant for ${preferences.occasion.toLowerCase()}` : 'General appointment fit',
  })

  const rawScore = factors.reduce((total, factor) => total + factor.score, 0)
  const matchScore = Math.max(52, Math.min(98, rawScore))
  const strongestFactors = [...factors]
    .filter((factor) => factor.score / factor.max >= 0.72)
    .sort((first, second) => second.score / second.max - first.score / first.max)
    .slice(0, 3)

  const caution =
    factors.find((factor) => factor.label === 'Budget fit')?.score <= 5
      ? ' Price is the main trade-off.'
      : preferences.homeService === 'required' && !salon.homeService
        ? ' It is an in-salon alternative because home service is unavailable.'
        : ''

  const reason =
    strongestFactors.length > 0
      ? `Best aligned on ${strongestFactors
          .map((factor) => factor.detail.toLowerCase())
          .join(', ')}.${caution}`
      : salon.matchReason

  const nextSlot = salon.availabilitySlots?.[0]
  const bestTimeSlot = nextSlot
    ? `${nextSlot.day}, ${nextSlot.date} · ${nextSlot.times[0]}`
    : 'Ask salon for the next opening'

  return {
    ...salon,
    matchScore,
    suggestedService,
    estimatedPrice: suggestedService.price,
    explanation: reason,
    matchFactors: factors,
    bestTimeSlot,
  }
}

function getEligibleSalons(preferences, salonData) {
  const profile = serviceProfiles[preferences.service] ?? serviceProfiles['Haircut & styling']
  const settingMatches =
    preferences.homeService === 'required'
      ? salonData.filter((salon) => salon.homeService)
      : salonData
  const serviceMatches = settingMatches.filter((salon) => {
    const salonText = getSalonSearchText(salon)
    return (
      profile.categories.some((category) => salon.categories.includes(category)) ||
      includesAny(salonText, profile.keywords)
    )
  })

  return serviceMatches.length >= 3 ? serviceMatches : settingMatches
}

function rankAllSalons(preferences = {}, salonData = salons) {
  return getEligibleSalons(preferences, salonData)
    .map((salon) => calculateSalonMatch(salon, preferences))
    .sort(
      (first, second) =>
        second.matchScore - first.matchScore ||
        second.rating - first.rating ||
        first.estimatedPrice - second.estimatedPrice,
    )
}

export function getDemoRecommendations(preferences = {}, salonData = salons) {
  return rankAllSalons(preferences, salonData).slice(0, 3)
}

function isValidProviderResult(result) {
  return (
    result &&
    Array.isArray(result.recommendations) &&
    result.recommendations.length >= 3 &&
    result.recommendations.every(
      (item) =>
        item &&
        typeof item.salonId === 'string' &&
        (!item.reason || typeof item.reason === 'string'),
    )
  )
}

function getLiveRecommendationContext() {
  return {
    city: 'Delhi',
    salons: salons.map((salon) => ({
      id: salon.id,
      name: salon.name,
      area: salon.area,
      categories: salon.categories,
      specialties: salon.specialties,
      rating: salon.rating,
      reviewsCount: salon.reviewsCount,
      homeService: salon.homeService,
      services: salon.services.map((service) => ({
        name: service.name,
        category: service.category,
        price: service.price,
      })),
    })),
  }
}

async function requestLiveRecommendations(preferences) {
  const result = await requestAi({
    feature: 'salon_recommendations',
    input: { preferences },
    context: getLiveRecommendationContext(),
    expectedOutput: {
      format: 'json',
      schema: {
        recommendations: [
          {
            salonId: 'string from context.salons[].id',
            reason: 'short user-facing reason grounded in the supplied catalog',
          },
        ],
      },
      rules: [
        'Return at least three unique salon recommendations.',
        'Do not invent prices, availability, services, ratings, or salon facts.',
        'Keep each reason under 280 characters.',
      ],
    },
  })

  if (!isValidProviderResult(result)) {
    throw new Error('AI response did not match the recommendation schema')
  }

  return result
}

function getFallbackNotice(error) {
  if (error?.code === 'TIMEOUT') {
    return 'Live AI took too long, so the reliable on-device matcher completed your shortlist.'
  }

  if (error?.code === 'INVALID_RESPONSE') {
    return 'Live AI returned an incomplete result, so the verified on-device matcher took over.'
  }

  return 'The live connection was unavailable, so the reliable on-device matcher took over.'
}

export async function getBeautyMatches(preferences) {
  const rankedRecommendations = rankAllSalons(preferences)
  const fallbackRecommendations = rankedRecommendations.slice(0, 3)

  if (!hasConfiguredAiApi()) {
    await new Promise((resolve) => globalThis.setTimeout(resolve, 700))
    return {
      recommendations: fallbackRecommendations,
      mode: 'demo',
      notice:
        preferences.homeService === 'required'
          ? 'GlowGuide honoured your home-service requirement, then used six additional preference signals on the verified catalog.'
          : 'GlowGuide used seven transparent preference signals on the verified catalog.',
    }
  }

  try {
    const liveResult = await requestLiveRecommendations(preferences)
    const deterministicById = new Map(
      rankedRecommendations.map((recommendation) => [recommendation.id, recommendation]),
    )
    const seenSalonIds = new Set()
    const liveRecommendations = liveResult.recommendations
      .map((item) => {
        if (seenSalonIds.has(item.salonId)) return null

        const deterministic = deterministicById.get(item.salonId)
        if (!deterministic) return null

        seenSalonIds.add(item.salonId)
        const liveReason = item.reason?.trim().slice(0, 280)

        return {
          ...deterministic,
          explanation: liveReason || deterministic.explanation,
        }
      })
      .filter(Boolean)

    if (liveRecommendations.length < 3) throw new Error('AI response referenced unknown salons')

    return {
      recommendations: liveRecommendations.slice(0, 3),
      mode: 'live',
      notice: 'Live AI reasoning was checked against the verified salon catalog.',
    }
  } catch (error) {
    return {
      recommendations: fallbackRecommendations,
      mode: 'fallback',
      notice: getFallbackNotice(error),
    }
  }
}

export function getCatalogSmartMatch(salon) {
  const ratingPoints = Math.round(Math.max(0, salon.rating - 4.5) * 30)
  const reviewPoints = Math.min(10, Math.round(salon.reviewsCount / 60))
  const popularityPoints = Math.round((salon.popularity / 100) * 10)
  const availabilityPoints = Math.min(5, salon.availabilitySlots?.length ?? 0) + 2
  const conveniencePoints = salon.homeService ? 5 : 2
  const score = Math.min(
    98,
    58 + ratingPoints + reviewPoints + popularityPoints + availabilityPoints + conveniencePoints,
  )
  const reasons = []

  if (salon.rating >= 4.8) reasons.push(`${salon.rating} guest rating`)
  if (salon.reviewsCount >= 350) reasons.push(`${salon.reviewsCount}+ review signals`)
  if (salon.homeService) reasons.push('home service')
  if (salon.availabilitySlots?.length >= 3) reasons.push('useful near-term slots')
  if (reasons.length < 2) reasons.push(salon.specialties[0].toLowerCase())

  return {
    score,
    reasons: reasons.slice(0, 3),
    explanation: `Strong on ${reasons.slice(0, 3).join(', ')}.`,
  }
}

export function getReviewSummary(salon) {
  const reviews = salon.reviews ?? []
  const reviewText = reviews.map((review) => review.text).join(' ').toLowerCase()
  const average =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : salon.rating

  const pros = reviewThemes
    .map((theme) => ({
      ...theme,
      mentions: reviews.filter((review) => includesAny(review.text, theme.keywords)).length,
    }))
    .filter((theme) => theme.mentions > 0)
    .sort((first, second) => second.mentions - first.mentions)
    .slice(0, 3)

  if (pros.length === 0) {
    pros.push({
      label: 'Strong guest satisfaction',
      mentions: reviews.filter((review) => review.rating >= 4.5).length,
    })
  }

  const possibleConcerns = concernThemes
    .filter((theme) => includesAny(reviewText, theme.keywords))
    .map(({ label, detail }) => ({ label, detail }))
    .slice(0, 2)

  if (possibleConcerns.length === 0) {
    possibleConcerns.push({
      label: 'Small review sample',
      detail: `No repeated concern appears in these ${reviews.length} visible reviews; confirm final timing and price with the salon.`,
    })
  }

  const sentimentLabel =
    average >= 4.85 ? 'Exceptionally positive' : average >= 4.65 ? 'Very positive' : 'Positive'
  const topPros = pros.map((item) => item.label.toLowerCase())
  const summary = `Across ${reviews.length} visible reviews averaging ${average.toFixed(
    1,
  )}, guests most often highlight ${topPros.join(', ')}.`

  return {
    average: average.toFixed(1),
    sentimentLabel,
    summary,
    pros,
    possibleConcerns,
    reviewCount: reviews.length,
  }
}

function parseLocalDate(dateValue) {
  if (!dateValue) return null
  const date = new Date(`${dateValue}T12:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatPlanDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getDefaultEventDate() {
  const date = addDays(new Date(), 120)
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

export function getTodayInputValue() {
  const date = new Date()
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

export function generateBridalTimeline(eventDateValue) {
  const eventDate = parseLocalDate(eventDateValue)
  const today = parseLocalDate(getTodayInputValue())

  if (!eventDate) throw new Error('Choose a valid event date to build your timeline.')
  if (eventDate < today) throw new Error('Your event date needs to be today or later.')

  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const daysUntilEvent = Math.max(0, Math.round((eventDate - today) / millisecondsPerDay))
  const isCompressed = daysUntilEvent < 70
  const steps = [
    {
      offset: 84,
      fraction: 0.04,
      title: 'Shortlist artists and lock the booking',
      detail:
        'Compare your top matches, confirm home-service needs, reserve key event slots, and note cancellation terms.',
      category: 'Booking',
    },
    {
      offset: 56,
      fraction: 0.22,
      title: 'Skin consultation and first facial',
      detail:
        'Share sensitivities and current products, then choose a familiar, low-risk facial plan with aftercare.',
      category: 'Skin',
    },
    {
      offset: 42,
      fraction: 0.4,
      title: 'Hair spa and colour decision',
      detail:
        'Focus on hair health, test any colour direction early, and leave enough time for adjustments.',
      category: 'Hair',
    },
    {
      offset: 28,
      fraction: 0.62,
      title: 'Trial makeup, hair, and draping',
      detail:
        'Test the complete look in daylight, take photos, and save exact product, hair, and jewellery notes.',
      category: 'Trial',
    },
    {
      offset: 14,
      fraction: 0.8,
      title: 'Final facial and grooming window',
      detail:
        'Keep treatments familiar, finish waxing or threading early, and avoid experiments close to the event.',
      category: 'Prep',
    },
    {
      offset: 3,
      fraction: 0.94,
      title: 'Confirm the final run sheet',
      detail:
        'Reconfirm arrival time, address, contacts, payment, and a small touch-up kit for the event.',
      category: 'Confirm',
    },
  ]

  const scheduledSteps = steps.map((step) => {
    const plannedDate = isCompressed
      ? addDays(today, Math.max(0, Math.floor(daysUntilEvent * step.fraction)))
      : addDays(eventDate, -step.offset)

    return {
      ...step,
      date: formatPlanDate(plannedDate < today ? today : plannedDate),
      urgent: plannedDate <= today,
    }
  })

  scheduledSteps.push({
    title: 'Event-day beauty appointment',
    detail:
      'Use the saved trial notes, keep a 30-minute buffer, and let the booked team follow the agreed sequence.',
    category: 'Event day',
    date: formatPlanDate(eventDate),
    urgent: daysUntilEvent === 0,
  })

  return {
    daysUntilEvent,
    pace: isCompressed ? 'Smart compressed plan' : 'Full beauty runway',
    eventDate: formatPlanDate(eventDate),
    steps: scheduledSteps,
  }
}
