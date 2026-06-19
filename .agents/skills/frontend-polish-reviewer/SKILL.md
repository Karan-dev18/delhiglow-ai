---
name: frontend-polish-reviewer
description: Review and improve frontend UI quality with Tailwind styling, layout, responsiveness, accessibility, cards, buttons, forms, animation, and complete interface states. Use when implementing or auditing DelhiGlow AI screens for startup polish, mobile usability, visual consistency, or presentation readiness.
---

# Frontend Polish Reviewer

Raise the interface from functional to demo-ready while keeping the product coherent, fast, and easy to use.

## Review Order

1. Verify visual hierarchy and a clear primary action on every screen.
2. Check spacing, typography, color, imagery, cards, buttons, forms, and navigation for consistency.
3. Test responsive behavior at narrow mobile, tablet, laptop, and wide desktop widths.
4. Check keyboard access, focus visibility, labels, semantic structure, contrast, and reduced-motion behavior.
5. Verify loading, empty, error, success, disabled, and long-content states.
6. Use animation sparingly to clarify state changes and improve perceived quality.

## Implementation Rules

- Reuse components and Tailwind patterns instead of creating page-specific duplicates.
- Preserve touch-friendly targets and readable text on mobile.
- Keep forms concise, label every field, and show actionable validation messages.
- Make salon cards scannable with location, services, price, rating, availability, and relevant AI signals.
- Avoid decorative effects that reduce contrast, performance, or comprehension.
- Prefer subtle transitions and skeletons over distracting motion.

## Review Output

Prioritize findings as:

- **Blocker:** Breaks a core journey, route, accessibility requirement, or viewport.
- **High impact:** Noticeably harms trust, clarity, or demo quality.
- **Polish:** Improves consistency or delight after higher-impact work.

When asked to implement, make focused changes and verify the affected viewports and UI states.
