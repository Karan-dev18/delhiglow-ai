import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const principles = [
  {
    icon: 'location',
    title: 'Deeply Delhi',
    text: 'Built around neighbourhoods, travel realities, home service, occasion culture, and beauty needs that feel native to the city.',
  },
  {
    icon: 'sparkle',
    title: 'AI you can inspect',
    text: 'Every shortlist exposes useful match factors, grounded catalog facts, review themes, and practical trade-offs.',
  },
  {
    icon: 'shield',
    title: 'Reliable by design',
    text: 'The marketplace, booking flow, review summaries, and bridal planner stay useful even when a live AI service is unavailable.',
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Capture the beauty brief',
    text: 'GlowGuide collects seven high-signal inputs: occasion, Delhi area, budget, service, style, home-service preference, and event date.',
  },
  {
    number: '02',
    title: 'Rank the verified catalog',
    text: 'A deterministic model scores every salon for expertise, convenience, budget, guest confidence, setting, style, and occasion readiness.',
  },
  {
    number: '03',
    title: 'Add grounded AI reasoning',
    text: 'When a secure AI endpoint is configured, it can select catalog salon IDs and add concise reasons without changing verified prices or availability.',
  },
  {
    number: '04',
    title: 'Validate before display',
    text: 'Unknown salons, duplicate IDs, malformed JSON, timeouts, and incomplete responses are rejected before anything reaches the interface.',
  },
  {
    number: '05',
    title: 'Continue through booking',
    text: 'The chosen salon and real seeded service move directly into booking, confirmation, and the salon owner dashboard.',
  },
]

const matchSignals = [
  ['22', 'Service expertise', 'Does this salon genuinely offer the requested service?'],
  ['18', 'Area convenience', 'Is it in the chosen locality or a nearby Delhi zone?'],
  ['18', 'Budget fit', 'Does the suggested menu service fit the customer’s ceiling?'],
  ['14', 'Guest confidence', 'What do rating strength and review volume signal?'],
  ['12', 'Service setting', 'Does in-salon or home service match the brief?'],
  ['10', 'Style chemistry', 'Do the salon profile and specialties match the desired look?'],
  ['6', 'Occasion readiness', 'Is the salon a credible fit for the customer’s event?'],
]

const aiFeatures = [
  {
    icon: 'sparkle',
    title: 'AI Beauty Match',
    text: 'Returns three salons with a factor breakdown, suggested service, estimated seeded price, next slot, and a short explanation.',
  },
  {
    icon: 'star',
    title: 'Grounded review summary',
    text: 'Finds recurring strengths and possible concerns only in the review text shown on each listing.',
  },
  {
    icon: 'calendar',
    title: 'Bridal beauty planner',
    text: 'Turns an event date into a practical booking, skin, hair, trial, grooming, and confirmation runway.',
  },
]

const buildTools = [
  {
    label: 'Product planning',
    title: 'ChatGPT',
    text: 'Used to frame the Delhi-specific customer problem, challenge assumptions, prioritise a focused MVP, and sharpen the startup and judging narrative.',
  },
  {
    label: 'Development',
    title: 'Codex',
    text: 'Used for repository-level implementation: inspecting the app, building and refining components, documenting architecture, and verifying the production build.',
  },
  {
    label: 'Repeatable workflows',
    title: 'Codex skills',
    text: 'Dedicated skills made product scoping, explainable AI design, and submission review consistent instead of relying on one-off prompting.',
  },
]

const skills = [
  {
    name: 'hackathon-product-planner',
    text: 'Defined the primary persona, core journey, scope boundaries, judging alignment, and the fastest visible AI moment.',
  },
  {
    name: 'ai-feature-builder',
    text: 'Structured the recommendation inputs and outputs, grounding rules, review summaries, bridal planner, validation, and fallback behaviour.',
  },
  {
    name: 'frontend-polish-reviewer',
    text: 'Checked responsive hierarchy, touch targets, accessibility, complete interface states, and presentation-ready visual consistency.',
  },
  {
    name: 'submission-demo-reviewer',
    text: 'Shaped the final demo path, README, deployment checks, fallback proof, build verification, and submission checklist.',
  },
]

function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-800 bg-plum-950 text-white">
        <div className="absolute right-[-9rem] top-[-11rem] size-[34rem] rounded-full bg-plum-600/45 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-8rem] size-[30rem] rounded-full bg-saffron-400/10 blur-3xl" />
        <div className="page-shell relative grid gap-10 py-16 sm:py-22 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-saffron-300 uppercase">
              <Icon name="sparkle" size={14} />
              Product story · AI workflow
            </span>
            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl">
              Delhi has no shortage of salons. It needs a better way to choose.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-plum-200">
              DelhiGlow AI turns a personal beauty brief into three explainable,
              bookable salon matches—then connects that decision to a complete
              customer and salon-owner journey.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-plum-950 transition hover:bg-plum-50"
                to="/ai-concierge"
              >
                Try GlowGuide <Icon name="arrow" size={17} />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                to="/explore"
              >
                Explore the marketplace
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur">
            <p className="text-xs font-bold tracking-[0.15em] text-saffron-300 uppercase">
              The focused promise
            </p>
            <p className="mt-4 font-display text-3xl font-semibold text-white">
              From brief to shortlist in under 60 seconds.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ['13', 'salon profiles'],
                ['12', 'Delhi areas'],
                ['3', 'AI matches'],
              ].map(([value, label]) => (
                <div className="rounded-2xl bg-white/8 p-3" key={label}>
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-wide text-plum-200 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-rosewood uppercase">
              Problem → solution
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">
              The right salon should feel discoverable—not accidental.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-stone-600">
            <p>
              Delhi customers often juggle social recommendations, ratings, travel
              time, unclear pricing, and dozens of screenshots before a meaningful
              appointment. A high rating alone cannot answer whether a salon fits
              the customer’s locality, budget, style, setting, and occasion.
            </p>
            <p>
              DelhiGlow adds a decision layer to the marketplace. It keeps salon
              facts verifiable, reduces the choice to three useful options, explains
              the trade-offs, and carries the selected service into booking.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article className="card-surface p-6" key={principle.title}>
              <span className="grid size-12 place-items-center rounded-2xl bg-plum-100 text-plum-700">
                <Icon name={principle.icon} size={22} />
              </span>
              <h3 className="mt-6 text-lg font-bold text-ink">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-plum-100 bg-plum-50/60" id="ai-workflow">
        <div className="page-shell py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <Icon name="sparkle" size={14} />
              How the intelligence works
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">
              Explainable recommendations, grounded before they reach the screen.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-600">
              GlowGuide combines transparent deterministic scoring with optional
              live AI reasoning. The model can improve the explanation, but it
              cannot invent a salon, service, price, rating, or availability slot.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 lg:grid-cols-5">
            {workflowSteps.map((step) => (
              <li className="card-surface relative overflow-hidden p-5" key={step.number}>
                <span className="absolute right-4 top-2 font-display text-5xl font-semibold text-plum-100">
                  {step.number}
                </span>
                <span className="relative grid size-10 place-items-center rounded-2xl bg-plum-950 text-sm font-bold text-white">
                  {step.number}
                </span>
                <h3 className="relative mt-5 font-bold text-ink">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-6 text-stone-600">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] bg-plum-950 p-6 text-white shadow-glow sm:p-8">
              <p className="text-xs font-bold tracking-[0.15em] text-saffron-300 uppercase">
                Smart match model
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold">
                Seven visible signals. No mystery score.
              </h3>
              <p className="mt-4 text-sm leading-7 text-plum-200">
                The score is a directional decision aid. Customers can expand every
                recommendation to inspect the factors and see where a trade-off
                affected the result.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {matchSignals.map(([points, label, detail]) => (
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4" key={label}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-white">{label}</p>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-bold text-saffron-300">
                        {points} pts
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-plum-200">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-5">
              {aiFeatures.map((feature) => (
                <article className="card-surface flex gap-4 p-5 sm:p-6" key={feature.title}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-saffron-100 text-saffron-600">
                    <Icon name={feature.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{feature.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20" id="fallback">
        <div className="grid overflow-hidden rounded-[2rem] border border-saffron-200 bg-gradient-to-br from-saffron-50 via-white to-plum-50 shadow-glow lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10">
            <span className="grid size-14 place-items-center rounded-2xl bg-plum-950 text-saffron-300">
              <Icon name="shield" size={25} />
            </span>
            <p className="mt-7 text-xs font-bold tracking-[0.15em] text-rosewood uppercase">
              Fallback AI mode
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              A missing AI service never blocks the demo.
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              No API key is required. Without a configured endpoint, DelhiGlow uses
              the deterministic matcher in clearly labelled Demo mode. If live AI
              times out or fails validation, the same request continues in Fallback
              active mode.
            </p>
          </div>
          <div className="border-t border-saffron-200 bg-white/70 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <ul className="space-y-4">
              {[
                'The same beauty brief always produces a repeatable, judge-friendly shortlist.',
                'Review summaries and bridal timelines continue without a network request.',
                'Provider secrets stay on a trusted server or serverless function.',
                'Mode labels make Live AI, Demo mode, and Fallback active visible to users.',
                'The marketplace and booking journey remain fully usable without AI.',
              ].map((item) => (
                <li className="flex items-start gap-3 text-sm leading-7 text-stone-700" key={item}>
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-800">
                    <Icon name="check" size={13} strokeWidth={2.3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-plum-100 bg-white" id="build-workflow">
        <div className="page-shell py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.16em] text-rosewood uppercase">
              How AI helped build DelhiGlow
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">
              AI was used for planning and development—not as a substitute for product judgement.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {buildTools.map((tool) => (
              <article className="card-surface p-6" key={tool.title}>
                <p className="text-xs font-bold tracking-[0.13em] text-plum-600 uppercase">
                  {tool.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{tool.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{tool.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-plum-100 bg-plum-50/55 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-plum-700 uppercase">
                  Codex skills used
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                  Repeatable workflows behind the submission
                </h3>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-bold text-plum-700">
                4 focused skills
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {skills.map((skill) => (
                <article className="rounded-2xl border border-plum-100 bg-white p-5" key={skill.name}>
                  <code className="text-xs font-bold text-rosewood">{skill.name}</code>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{skill.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20" id="architecture">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="card-surface p-6 sm:p-8">
            <p className="text-xs font-bold tracking-[0.15em] text-plum-700 uppercase">
              Current submission
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Fast, frontend-first, and demo-safe
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              React, Vite, Tailwind CSS, and React Router power the experience.
              Salon data is seeded locally, and booking requests are stored in the
              browser so the customer-to-owner journey works without accounts or a
              backend dependency.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['React 19', 'Vite 8', 'Tailwind CSS 4', 'React Router 7', 'localStorage'].map(
                (item) => (
                  <span
                    className="rounded-full bg-plum-50 px-3 py-1.5 text-xs font-bold text-plum-700"
                    key={item}
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </article>

          <article className="card-surface p-6 sm:p-8">
            <p className="text-xs font-bold tracking-[0.15em] text-plum-700 uppercase">
              Vercel + Firebase path
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Ready to evolve without rewriting the product
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Vercel is the deployment target and can host a secure AI proxy or
              serverless function. Firebase is not used in the submitted demo, but
              the isolated booking-storage layer can be replaced with Firestore for
              live inventory, accounts, and cross-device salon operations.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-plum-50 p-4">
                <p className="text-sm font-bold text-ink">Vercel</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Frontend hosting, SPA routing, environment variables, and optional serverless AI.
                </p>
              </div>
              <div className="rounded-2xl bg-plum-50 p-4">
                <p className="text-sm font-bold text-ink">Firebase, optional</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Future authentication, Firestore bookings, live salon data, and owner access.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20" id="privacy">
        <div className="rounded-[2rem] bg-plum-950 px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-saffron-300 uppercase">
              Built to demonstrate responsibly
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Demo data, honest labels, no hidden dependencies.
            </h2>
            <p className="mt-4 text-sm leading-7 text-plum-200">
              Salon names, reviews, prices, availability, owner metrics, and
              testimonials are illustrative. No live salon is contacted and no
              payment is taken.
            </p>
          </div>
          <Link
            className="mt-7 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-plum-950 transition hover:bg-plum-50 lg:mt-0"
            to="/ai-concierge"
          >
            Start the demo
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default About
