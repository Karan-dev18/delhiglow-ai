import { Link } from 'react-router-dom'
import Logo from './Logo'

const footerLinks = [
  {
    title: 'Discover',
    items: [
      ['Explore salons', '/explore'],
      ['Ask AI Concierge', '/ai-concierge'],
      ['Book appointment', '/booking'],
    ],
  },
  {
    title: 'Company',
    items: [
      ['About DelhiGlow', '/about'],
      ['For salon owners', '/owner-dashboard'],
      ['Demo privacy', '/about#privacy'],
    ],
  },
]

function Footer() {
  return (
    <footer className="bg-plum-950 text-plum-100">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:py-18">
        <div className="max-w-md">
          <Logo light />
          <p className="mt-5 text-sm leading-7 text-plum-200">
            Better beauty decisions, grounded in Delhi. Discover trusted salons,
            understand the fit, and book with confidence.
          </p>
          <p className="mt-6 text-xs font-bold tracking-[0.16em] text-saffron-300 uppercase">
            Built for Delhi, with glow
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-bold text-white">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-plum-200">
              {group.items.map(([label, to]) => (
                <li key={label}>
                  <Link className="transition hover:text-white" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-plum-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DelhiGlow AI. Hackathon demo.</p>
          <p>All salon names and details are illustrative demo data.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
