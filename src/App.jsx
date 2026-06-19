import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import About from './pages/About'
import AiConcierge from './pages/AiConcierge'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import Explore from './pages/Explore'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OwnerDashboard from './pages/OwnerDashboard'
import SalonDetails from './pages/SalonDetails'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="salons/:salonId" element={<SalonDetails />} />
        <Route path="salon/:salonId" element={<SalonDetails />} />
        <Route path="ai-concierge" element={<AiConcierge />} />
        <Route path="booking" element={<Booking />} />
        <Route path="booking/confirmation/:bookingId" element={<BookingConfirmation />} />
        <Route path="owner-dashboard" element={<OwnerDashboard />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
