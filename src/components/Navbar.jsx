import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'

const navItems = [
  { label: 'Explore', to: '/explore' },
  { label: 'AI Concierge', to: '/ai-concierge' },
  { label: 'For salon owners', to: '/owner-dashboard' },
  { label: 'About & AI', to: '/about' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-plum-100/80 bg-cream/90 backdrop-blur-xl">
      <div className="page-shell flex min-h-18 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-plum-100 text-plum-950'
                    : 'text-stone-600 hover:bg-white hover:text-plum-950'
                }`
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link className="primary-button min-h-10 px-5 py-2.5" to="/booking">
            Book an appointment
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="grid size-11 place-items-center rounded-full border border-plum-200 bg-white text-plum-950 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-plum-100 bg-cream/98 px-4 py-4 shadow-xl lg:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-semibold ${
                    isActive ? 'bg-plum-100 text-plum-950' : 'text-stone-700'
                  }`
                }
                key={item.to}
                onClick={() => setOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              className="primary-button mt-3"
              onClick={() => setOpen(false)}
              to="/booking"
            >
              Book an appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
