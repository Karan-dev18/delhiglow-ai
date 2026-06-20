import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function AppLayout() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const routeTitles = {
      '/': 'DelhiGlow AI — Find your best salon match',
      '/explore': 'Explore Delhi salons — DelhiGlow AI',
      '/ai-concierge': 'GlowGuide AI Concierge — DelhiGlow AI',
      '/booking': 'Book a salon appointment — DelhiGlow AI',
      '/owner-dashboard': 'Salon owner dashboard — DelhiGlow AI',
      '/about': 'About & AI workflow — DelhiGlow AI',
    }
    const routeTitle =
      routeTitles[pathname] ??
      (pathname.startsWith('/salon') || pathname.startsWith('/salons')
        ? 'Salon details — DelhiGlow AI'
        : pathname.startsWith('/booking/confirmation')
          ? 'Booking confirmation — DelhiGlow AI'
          : 'DelhiGlow AI')

    document.title = routeTitle

    if (hash) {
      const scrollToAnchor = () => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
      const frameId = window.requestAnimationFrame(scrollToAnchor)
      const timeoutId = window.setTimeout(scrollToAnchor, 180)

      return () => {
        window.cancelAnimationFrame(frameId)
        window.clearTimeout(timeoutId)
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
    return undefined
  }, [hash, pathname])

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
