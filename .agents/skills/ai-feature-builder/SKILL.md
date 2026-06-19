---
name: ai-feature-builder
description: Build visible, explainable, and demo-safe AI marketplace features including an AI Concierge, salon recommendations, smart match scores, review summaries, bridal timelines, prompts, fallback logic, and workflow documentation. Use when designing, implementing, or explaining any DelhiGlow AI intelligence or recommendation flow.
---

# AI Feature Builder

Build AI experiences that solve a visible user problem and remain dependable during a live demo.

## Workflow

1. Define the user input, structured context, expected output, and UI location.
2. Use salon data, Delhi locality, budget, service needs, occasion, preferences, and timing where relevant.
3. Request structured model output that can be validated before rendering.
4. Separate prompt construction, provider calls, response parsing, scoring, and presentation.
5. Display useful reasoning such as match factors, review themes, or timeline rationale without exposing hidden chain-of-thought.
6. Handle loading, timeout, malformed response, missing key, and provider failure.
7. Document the workflow and fallback behavior in the README.

## Feature Guidance

- **AI Concierge:** Collect a few high-signal preferences and return actionable salon matches.
- **Recommendations and match scores:** Combine transparent deterministic factors with AI-generated explanation; never present arbitrary precision as fact.
- **Review summaries:** Ground summaries in supplied reviews and show themes, strengths, and caveats.
- **Bridal planner:** Generate a practical dated timeline from wedding date, services, budget, and preparation needs.

## Demo Safety

- Provide deterministic fixture outputs when the API key is absent or a request fails.
- Label fallback results honestly as demo mode where appropriate.
- Keep the core discovery and booking journey usable without AI.
- Avoid inventing salon facts, prices, availability, or review claims outside provided data.
- Do not expose secrets in client code, logs, prompts, or repository files.
