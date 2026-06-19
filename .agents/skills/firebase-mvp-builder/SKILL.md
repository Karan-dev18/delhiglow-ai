---
name: firebase-mvp-builder
description: Add minimal Firebase capabilities for authentication, Firestore salon collections, bookings, reviews, and owner dashboard data while protecting demo reliability. Use when DelhiGlow AI needs persistent data or simple authenticated flows and Firebase is justified for the MVP.
---

# Firebase MVP Builder

Use Firebase only where persistence or authentication materially strengthens the demo. Keep the integration small, replaceable, and non-blocking.

## Workflow

1. Confirm that the feature needs backend persistence rather than local fixture data.
2. Define the smallest required collections and document shapes.
3. Centralize Firebase configuration and service functions.
4. Read environment variables through Vite configuration and never commit secrets.
5. Implement loading, empty, error, permission-denied, and offline behavior.
6. Seed or provide fallback data so the product remains demonstrable without Firebase.
7. Document setup, required variables, and demo-mode behavior.

## MVP Data Guidance

- Use simple collections such as `salons`, `bookings`, `reviews`, and role-specific `users` only when required.
- Denormalize small display fields when it keeps reads and components simple.
- Store timestamps consistently and validate booking status values.
- Use the simplest auth method suitable for the demo; do not force sign-in before users can explore salons.
- Keep owner dashboard queries bounded and straightforward.

## Reliability Rules

- Never let Firebase initialization failure blank the app.
- Fall back to local salon fixtures and demo booking confirmation when configuration is missing.
- Avoid complex Cloud Functions, deeply nested data, real-time listeners, or elaborate roles unless essential.
- Add security rules appropriate to the implemented writes before calling the integration complete.
- Surface friendly user messages while retaining useful developer diagnostics.
