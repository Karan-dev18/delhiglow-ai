# DelhiGlow AI

> **Your best Delhi salon match, explained by AI.**

DelhiGlow AI is a Delhi-first beauty salon marketplace that turns a personal
beauty brief into three explainable, bookable salon recommendations in under a
minute.

## Live Demo

Experience DelhiGlow AI: [https://delhiglow-ai.vercel.app/](https://delhiglow-ai.vercel.app/)

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

## Key Features

- **Delhi salon discovery:** 13 illustrative salon profiles across 12 Delhi
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

## Product Intelligence / AI Features

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
grounded reason, suggested service, catalog price, next available slot, and
booking action.

### 2. Smart Match Score

Every recommendation includes a transparent, directional score based on service
expertise, Delhi-area convenience, budget fit, guest confidence, service
setting, style chemistry, and occasion readiness. Customers can inspect the
factor-by-factor breakdown and understand both the strongest fit and practical
trade-offs before booking.

### 3. AI Review Summary

Salon pages summarize only the review text supplied in the catalog. The UI
surfaces recurring strengths, possible concerns, sentiment, review count, and
sample-size context while keeping the original reviews as the source of truth.

### 4. Bridal Timeline Planner

The planner converts a wedding or event date into a dated preparation runway for
booking, skin, hair, trial, grooming, confirmation, and event day. Short lead
times automatically produce a compressed plan.

### 5. Fallback Recommendation Mode

DelhiGlow remains fully usable when a live AI service is unavailable. Without a
configured endpoint—or when a request times out or fails validation—the app
uses deterministic local matching to return grounded, repeatable
recommendations. Review summaries and bridal timelines also remain available.

### 6. AI Demand Insight

The owner dashboard converts saved booking activity into a simple service-demand
signal, helping a salon see which appointment type is attracting the most
interest.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7
- Browser `localStorage` for booking requests
- Optional server-side AI proxy or serverless function
- Vercel

## How to Run Locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/Karan-dev18/delhiglow-ai.git
cd delhiglow-ai
npm install
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite. A live AI endpoint is optional; the fallback
recommendation mode works without environment configuration.

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

Keep provider credentials on a trusted server or serverless function. Do not
place them in `VITE_*` variables because Vite exposes those values to the
browser bundle.

## Deployment

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Select the **Vite** framework preset.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Optionally add `VITE_AI_API_URL` and `VITE_AI_REQUEST_TIMEOUT_MS`.
6. Deploy.

The included `vercel.json` rewrites client-side routes to `index.html`, so deep
links and refreshes work with React Router.

## Demo Flow

1. Open the homepage.
2. Explore salons by locality, category, and price.
3. Use the AI Concierge to generate three recommended matches.
4. Inspect the Smart Match Score and AI Review Summary on a salon profile.
5. Book an appointment with the recommended salon and service.
6. Check the Owner Dashboard for the new booking request.
7. Generate a Bridal Timeline Planner schedule.

> All salon names, reviews, prices, availability, and marketplace metrics are
> illustrative product data. No live salon is contacted and no payment is taken.
