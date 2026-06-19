# DelhiGlow AI

DelhiGlow AI is a Delhi-first beauty salon marketplace built for the AI Startup
Buildathon 2026 Beauty Salon Marketplace Challenge. Its product promise is
simple: turn a personal beauty brief into three explainable, bookable salon
matches in under a minute.

The primary persona is a Delhi customer planning an occasion or bridal event who
is overwhelmed by scattered recommendations, unclear pricing, and uncertainty
about which salon actually fits their area, style, and service needs.

## Product journey

The focused demo path is:

1. Start on the homepage and understand the Delhi-specific product promise.
2. Use the AI Concierge to enter occasion, area, budget, service, preferred
   style, home-service preference, and event date.
3. Compare three salon matches with a score breakdown, suggested seeded service,
   estimated price, recommendation reason, best slot, and direct booking action.
4. Generate a dated bridal beauty runway from the selected event date.
5. Open a salon profile to inspect the grounded AI review summary, including
   pros and possible concerns, then request a demo appointment.

All salon names, prices, reviews, availability, and marketplace metrics are
illustrative demo data.

The marketplace catalog contains 13 seeded salon profiles across 12 Delhi
neighbourhoods, with service menus, reviews, availability, home-service flags,
bridal pricing, badges, and deterministic AI match tags.

## AI innovation layer

The intelligence layer is split from the presentation components:

- `src/lib/aiDemo.js` owns deterministic matching, grounding, validation, review
  summaries, and bridal timeline logic.
- `src/lib/aiClient.js` owns the optional server-side AI request, timeout, JSON
  parsing, and transport errors.

- **AI Beauty Match:** ranks all seeded salons using weighted service expertise,
  exact or nearby Delhi area, budget fit, rating confidence, home-service fit,
  style tags, and occasion readiness.
- **Smart Match Score:** calculates a percentage and exposes the individual
  factor scores instead of showing a mysterious ranking.
- **Suggested service:** selects a real service from the salon's seeded menu, so
  the displayed estimate and booking link stay grounded.
- **AI Review Summary:** analyzes only the visible seeded reviews, identifies
  recurring positive themes, and surfaces possible concerns with sample-size
  context.
- **Bridal Beauty Timeline:** converts the selected event date into dated booking,
  facial, hair-spa, trial, grooming, confirmation, and event-day milestones. It
  automatically compresses the plan when the runway is short.

## AI modes and demo-safe fallback

### Fallback AI mode (default)

No environment file or API key is required. With no `VITE_AI_API_URL`, the
deterministic matcher runs in clearly labelled demo mode and all core journeys
remain available. It ranks the full seeded catalog using the same seven
transparent preference signals every time, so the demo is fast and repeatable.

The review summary and bridal timeline are also deterministic and remain fully
available without a network connection.

### Optional real AI mode

Copy `.env.example` to `.env.local` and point the frontend at a trusted
server-side proxy or serverless function:

```bash
VITE_AI_API_URL=https://your-serverless-endpoint.example/ai
# or, when deployed together:
VITE_AI_API_URL=/api/ai
```

The endpoint receives a versioned JSON request with:

- `feature: "salon_recommendations"`
- the customer preferences
- a compact, verified Delhi salon catalog
- the expected structured output contract

It should return either the object below or wrap it in `{ "data": ... }`:

```json
{
  "recommendations": [
    {
      "salonId": "a-salon-id-from-the-supplied-catalog",
      "reason": "A short explanation grounded in the supplied salon facts."
    }
  ]
}
```

Return at least three unique catalog salon IDs. DelhiGlow ignores unknown or
duplicate IDs, caps reasons at 280 characters, and always keeps deterministic
scores, services, prices, and availability as the source of truth.

Provider secrets must live only in the server/serverless environment, for
example as `AI_PROVIDER_API_KEY`. Never place a secret in a `VITE_*` variable:
Vite exposes all `VITE_*` values to the browser bundle.

A missing endpoint, missing server-side provider key, timeout, network failure,
non-2xx response, malformed JSON, invalid schema, or ungrounded salon ID
automatically switches the current request to polished fallback mode. The UI
labels that recovery as **Fallback active** and the core journey continues.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Router

## Local setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

To verify the required no-secret path, run the app without `.env.local`; the AI
Concierge should still return three explained recommendations.

## Judge demo path

1. Open `/ai-concierge`.
2. Keep the default bridal brief or change any of the seven inputs.
3. Click **Find my 3 best matches** and open a score breakdown.
4. Click **Book now** to show that the recommended seeded service carries into
   the booking flow.
5. Choose an available date and time, add customer details, and confirm the
   request.
6. Open the polished confirmation, then click **View in Owner Dashboard** to
   show the same booking, customer, status, revenue, and demand analytics.
7. Return to the concierge to generate the bridal timeline, or open the salon
   profile to show the grounded AI review summary.

For a clean rehearsal, use a private/incognito window or clear the
`delhiglow.bookings.v1` localStorage entry before starting. The empty owner
dashboard is intentionally polished and links directly into a test booking.

## Quality checks

```bash
npm run lint
npm run build
```

## Routes

- `/` — Home
- `/explore` — Marketplace discovery and filters
- `/salons/:salonId` — Salon details
- `/salon/:salonId` — Compatible salon-details alias used by challenge links
- `/ai-concierge` — AI Concierge and bridal planner
- `/booking` — Demo appointment request
- `/booking/confirmation/:bookingId` — Saved booking confirmation
- `/owner-dashboard` — Salon owner bookings and analytics
- `/about` — Product story

## Scope

This milestone is frontend-first. Bookings use the versioned
`delhiglow.bookings.v1` localStorage key and are intentionally denormalized so a
future Firestore collection can replace the storage service without changing
the screens. If browser storage is unavailable, the current confirmation still
renders with an explicit warning.

It does not include Firebase, authentication, payments, live availability, or a
provider-specific serverless implementation. The optional client contract is
ready for a separately secured proxy and never makes the demo depend on it.
# delhiglow-ai
