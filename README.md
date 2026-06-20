# DelhiGlow AI

> **Your best Delhi salon match, explained by AI.**

DelhiGlow AI is a Delhi-first beauty salon marketplace that turns a personal
beauty brief into three explainable, bookable salon recommendations in under a
minute. It was built for the **AI Startup Buildathon 2026 – Beauty Salon
Marketplace Challenge**.

Instead of making customers compare dozens of tabs, screenshots, prices, and
unstructured reviews, DelhiGlow asks a few high-signal questions and helps them
make one confident decision.

## The problem

Finding the right salon in Delhi is still a high-friction, low-confidence
experience:

- recommendations are scattered across social media, group chats, and search;
- ratings rarely explain whether a salon fits a specific style or occasion;
- prices, travel distance, home service, and availability are hard to compare;
- bridal customers must coordinate multiple services across a stressful timeline;
- salons lose high-intent customers when discovery and booking are disconnected.

The problem is not a lack of salon options. It is the lack of a trusted decision
layer between customer intent and the right local provider.

## The solution

DelhiGlow AI combines a credible Delhi marketplace with **GlowGuide**, an
explainable AI beauty concierge.

A customer shares their occasion, Delhi locality, budget, service, style,
home-service preference, and event date. GlowGuide ranks the verified demo
catalog, returns three clear matches, explains the strongest fit and trade-offs,
and carries the selected salon and service directly into booking.

The result is a focused end-to-end journey:

**Discover → understand the match → inspect review themes → book → manage the
request**

## Target users

### Primary user

Delhi customers planning a meaningful beauty appointment—especially brides,
wedding guests, professionals, and occasion-led shoppers—who want a reliable
shortlist without researching every salon themselves.

### Secondary user

Independent salons and beauty studios that want qualified demand, structured
booking requests, and simple visibility into upcoming appointments and service
interest.

## Why DelhiGlow can become a startup

- **City-specific wedge:** the experience is built around Delhi localities,
  travel convenience, home service, occasion culture, and realistic price bands.
- **Decision intelligence:** AI reduces choice overload instead of merely adding
  a chat box to a directory.
- **Two-sided value:** customers gain confidence while salons receive more
  structured, higher-intent requests.
- **Expandable model:** the same verified-catalog and explainable-ranking
  approach can grow into live availability, CRM tools, payments, loyalty, and
  additional cities.

## Key product features

- **Delhi salon discovery:** 13 seeded salon profiles across 12 Delhi
  neighbourhoods with services, prices, reviews, badges, availability, and
  home-service information.
- **Focused marketplace filters:** browse by locality, category, price, and
  salon fit.
- **Explainable salon profiles:** service menus, transparent smart-match
  reasons, review evidence, and comparable booking information.
- **Booking journey:** carry a recommended service into slot selection, validate
  customer details, save the request, and show a polished confirmation.
- **Salon owner dashboard:** view incoming requests, update status, track
  estimated revenue, and see demand signals.
- **Responsive and accessible UI:** keyboard-friendly controls, visible focus
  states, responsive layouts, and explicit loading, empty, error, and recovery
  states.

## AI features

### 1. GlowGuide AI Concierge

GlowGuide turns seven customer signals into three actionable recommendations:

1. service expertise;
2. Delhi area convenience;
3. budget fit;
4. guest confidence;
5. home-service fit;
6. style chemistry;
7. occasion readiness.

Each result includes a directional match score, factor-by-factor breakdown,
grounded reason, suggested service, seeded price, next available slot, and
booking action.

### 2. AI review summaries

Salon pages summarize only the review text supplied in the catalog. The UI
surfaces recurring strengths, possible concerns, sentiment, review count, and
sample-size context while keeping the original reviews as the source of truth.

### 3. Bridal beauty planner

The planner converts a wedding or event date into a dated preparation runway for
booking, skin, hair, trial, grooming, confirmation, and event day. Short lead
times automatically produce a compressed plan.

### 4. AI demand insight

The owner dashboard converts saved booking activity into a simple service-demand
signal, helping a salon see which appointment type is attracting the most
interest.

## AI workflow and architecture

```text
Customer beauty brief
        ↓
Validated preferences + compact verified Delhi catalog
        ↓
Deterministic ranking across seven transparent factors
        ↓
Optional server-side AI endpoint adds grounded recommendation language
        ↓
Schema and salon-ID validation
        ↓
Three recommendations with verified prices, services, and slots
        ↓
Booking request → browser storage → owner dashboard
```

The implementation deliberately separates responsibilities:

- `src/lib/aiDemo.js` owns deterministic matching, match factors, grounding,
  review summaries, bridal timeline logic, and fallback output.
- `src/lib/aiClient.js` owns the optional AI request, timeout, JSON parsing, and
  transport errors.
- presentation components render the result and explain how it was made.

The optional AI endpoint receives:

- `feature: "salon_recommendations"`;
- customer preferences;
- a compact verified salon catalog;
- a structured output contract.

It must return at least three unique IDs from the supplied catalog with short,
grounded reasons. Unknown IDs, duplicates, malformed responses, and invented
catalog facts are rejected. Deterministic data remains the source of truth for
scores, prices, services, and availability.

## Fallback AI mode

DelhiGlow is demo-safe by design.

With no `VITE_AI_API_URL`, the app runs in clearly labelled **Demo mode** using
deterministic local logic. If a configured live endpoint times out, fails, or
returns invalid output, the same request automatically continues in
**Fallback active** mode.

This means:

- the AI Concierge always returns a repeatable shortlist;
- review summaries and bridal timelines remain available offline;
- core marketplace and booking journeys never depend on an API key;
- no provider secret is exposed in client code;
- judges can see whether the current result used live AI, demo mode, or fallback.

## AI tools and development workflow

DelhiGlow used AI across both product thinking and implementation:

- **ChatGPT** supported early product planning: defining the Delhi-specific
  customer problem, prioritising the core journey, pressure-testing the startup
  positioning, and shaping the judging narrative.
- **Codex** supported repository-level development: inspecting the existing
  product, implementing components and routes, refining copy and interaction
  states, documenting architecture, and running production verification.
- **Codex skills** made important workflows repeatable rather than ad hoc:
  product scoping, explainable AI design, and submission readiness each followed
  a dedicated checklist.

AI accelerated decisions and implementation; product claims, catalog grounding,
fallback behaviour, and final build quality were kept explicit and verifiable.

## Codex skills used

- **`hackathon-product-planner`** — defined the primary persona, shortest
  complete journey, judging-criteria alignment, scope boundaries, and demo “aha”
  moment.
- **`ai-feature-builder`** — shaped the explainable recommendation contract,
  grounded review summaries, bridal timeline, schema validation, and deterministic
  fallback behaviour.
- **`frontend-polish-reviewer`** — checked mobile and desktop hierarchy,
  accessibility, touch targets, visual consistency, and complete interface states.
- **`submission-demo-reviewer`** — guided the final README, demo sequence,
  deployment safety, build verification, and submission checklist.

## Judging criteria alignment

| Criterion | Visible evidence |
| --- | --- |
| Product Thinking | Delhi-specific wedge, clear primary persona, focused discovery-to-booking journey, customer and salon value |
| UI/UX Design | Responsive marketplace, readable hierarchy, clear states, accessible forms, polished confirmation and dashboard |
| AI Usage & Innovation | Explainable ranking, grounded review themes, bridal timeline, optional live AI with validated output |
| Execution Quality | Reusable React components, separated AI logic, route coverage, resilient fallback, production build |
| User Experience | 30-second brief, three clear options, transparent trade-offs, direct booking handoff, no sign-up or payment |

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7
- Browser `localStorage` for demo bookings
- Optional server-side AI proxy or serverless function
- Vercel deployment target
- Firebase-ready data boundary for a future production backend

Firebase is **not required by the current demo**. The booking storage service is
intentionally isolated so Firestore can later replace browser storage without
rewriting the customer or owner screens.

## Local setup

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/Karan-dev18/delhiglow-ai.git
cd delhiglow-ai
npm install
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite. The app works with an empty `.env.local`.

Available commands:

```bash
npm run dev       # start the local development server
npm run build     # create the production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

### Optional live AI configuration

```bash
VITE_AI_API_URL=https://your-trusted-serverless-endpoint.example/ai
VITE_AI_REQUEST_TIMEOUT_MS=6000
```

Keep provider keys on the server, for example:

```bash
AI_PROVIDER_API_KEY=server-only-secret
```

Never put a provider secret in a `VITE_*` variable because Vite exposes those
values to the browser bundle.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Select the **Vite** framework preset.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Optionally add `VITE_AI_API_URL` and `VITE_AI_REQUEST_TIMEOUT_MS`.
6. Deploy and test `/`, `/ai-concierge`, a salon detail route, `/booking`,
   `/owner-dashboard`, and `/about` directly.

The included `vercel.json` rewrites client-side routes to `index.html`, so deep
links and refreshes work with React Router.

### Optional Firebase evolution

For a production version:

1. create a Firebase project;
2. add Firebase Authentication if customer or salon accounts are required;
3. replace `src/lib/bookingStorage.js` with a Firestore-backed adapter;
4. move live salon inventory and availability into Firestore;
5. keep AI provider calls in a secure serverless function;
6. deploy the frontend to Vercel or Firebase Hosting.

The submitted build uses local demo data and browser storage; it does not claim
live Firebase integration.

## Recommended demo flow

Use a private/incognito window for a clean start.

1. **Homepage:** introduce the promise—three explained Delhi salon matches in
   under a minute.
2. **AI Concierge:** open `/ai-concierge`, choose **Bridal in South Delhi**, and
   click **Find my 3 best matches**.
3. **Explainability:** open a match-score breakdown and point out locality,
   budget, service, style, and home-service factors.
4. **Grounding:** open the recommended salon and show the AI review summary,
   original reviews, real seeded service, price, and availability.
5. **Conversion:** book the suggested service, complete the form, and show the
   confirmation.
6. **Two-sided marketplace:** open the owner dashboard from the confirmation and
   show the same request, status controls, revenue, and demand insight.
7. **Bridal planner:** return to GlowGuide and generate the dated beauty
   timeline.
8. **Reliability:** point out the Demo/Live/Fallback status label and explain that
   the journey works without a provider key.

To reset saved bookings, clear the `delhiglow.bookings.v1` localStorage entry or
use a fresh private window.

## 2–3 minute demo video script

### 0:00–0:20 — Problem and promise

“Delhi has thousands of salons, but choosing one still means juggling Instagram
screenshots, ratings, travel time, prices, and personal recommendations.
DelhiGlow AI turns a beauty brief into three explainable, bookable salon matches
in under a minute.”

### 0:20–0:45 — Delhi-first marketplace

Show the homepage and locality chips.

“This is not a generic directory. DelhiGlow is organised around real Delhi
neighbourhoods, realistic services, home-service needs, occasion culture, and
local price bands.”

### 0:45–1:25 — AI “aha” moment

Open the AI Concierge, use the bridal quick brief, and generate matches.

“GlowGuide considers seven signals: service expertise, locality, budget, guest
confidence, service setting, style, and occasion. It returns only three options
and explains every score. Here, Noor & Co. is strong because it fits soft-glam
bridal needs, South Delhi convenience, and home service. Prices and slots always
come from the verified catalog.”

Open the score breakdown.

“The percentage is a directional decision aid, not mystery precision. Customers
can inspect the exact factors and trade-offs.”

### 1:25–1:50 — Review intelligence

Open the salon profile.

“DelhiGlow also converts review text into recurring strengths and practical
watch-outs. The summary is grounded only in the reviews shown here, so users can
verify the source.”

### 1:50–2:20 — Booking and salon value

Book the suggested service and open the confirmation, then the owner dashboard.

“The recommendation carries directly into booking. The same request appears in
the salon dashboard with customer details, status controls, estimated revenue,
and a simple demand signal. That connects AI discovery to marketplace value.”

### 2:20–2:40 — Bridal planner and resilience

Show the dated bridal timeline and AI mode label.

“For high-stakes occasions, GlowGuide also builds a dated beauty runway. And if
the live AI endpoint is missing or fails, DelhiGlow switches to deterministic
fallback mode, so the core journey never breaks during a demo.”

### 2:40–2:55 — Close

“DelhiGlow AI helps Delhi customers stop searching and start choosing—with a
local marketplace, explainable AI, and a complete path from intent to booking.”

## Routes

- `/` — startup landing page
- `/explore` — Delhi salon discovery
- `/salons/:salonId` — salon profile
- `/salon/:salonId` — compatible salon-profile alias
- `/ai-concierge` — GlowGuide recommendations and bridal planner
- `/booking` — appointment request
- `/booking/confirmation/:bookingId` — booking confirmation
- `/owner-dashboard` — salon request and demand dashboard
- `/about` — product story and AI workflow
- `*` — not-found recovery page

## Demo data and scope

All salon names, reviews, prices, availability, marketplace metrics, and
testimonials are illustrative demo data. No live salon is contacted and no
payment is taken.

The current submission is frontend-first. It does not include authentication,
payments, live inventory, production CRM, or a provider-specific AI backend.
These are deliberate scope choices to keep the judged journey reliable and
polished.

## Final submission checklist

### Product and UX

- [x] Homepage communicates the Delhi-specific problem and promise in 10 seconds.
- [x] AI Concierge returns three explained recommendations.
- [x] Match-score breakdowns, review summaries, and bridal timeline are visible.
- [x] Booking carries the selected salon and service through confirmation.
- [x] Owner dashboard displays a new request and can load illustrative demo requests.
- [x] Loading, empty, error, not-found, and fallback states are presentable.
- [x] Core journey is checked on mobile and desktop.

### AI and safety

- [x] Demo mode works with no `.env.local`.
- [x] Configured live AI output is validated against catalog salon IDs.
- [x] A failed live request visibly recovers to fallback mode.
- [x] No API keys or personal secrets are committed or exposed in `VITE_*`.
- [x] AI explanations do not invent prices, availability, services, or reviews.

### Repository and deployment

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] Production deep links are covered by the Vercel SPA rewrite.
- [ ] GitHub repository is public or shared with judges.
- [ ] Live deployment URL is added to the submission.
- [x] README setup and demo instructions match the repository.
- [x] `.env.example` documents optional configuration.

### Presentation

- [ ] Two-to-three-minute video follows the scripted happy path.
- [ ] Demo is recorded in a clean private window.
- [ ] Backup screenshots exist for AI results, booking confirmation, and dashboard.
- [ ] Submission description names the user problem, AI value, and fallback mode.
- [ ] Team/project name, repository URL, live URL, and video URL are final.

## Submission status

- Production build: passed locally on June 20, 2026
- Deployment target: Vercel
- AI fallback: available by default
- Firebase: optional future integration, not required for the submitted demo
