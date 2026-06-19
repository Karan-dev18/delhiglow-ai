import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getSalonById, salons } from '../data/salons'
import {
  BOOKING_STATUSES,
  getBookings,
  updateBookingStatus,
} from '../lib/bookingStorage'
import { getTodayInputValue } from '../lib/aiDemo'

const statusStyles = {
  'New request': 'border-saffron-200 bg-saffron-50 text-saffron-600',
  Confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Completed: 'border-plum-200 bg-plum-50 text-plum-800',
  Cancelled: 'border-stone-200 bg-stone-50 text-stone-600',
}

const statusDots = {
  'New request': 'bg-saffron-400',
  Confirmed: 'bg-emerald-500',
  Completed: 'bg-plum-500',
  Cancelled: 'bg-stone-400',
}

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function formatDate(dateValue, options = {}) {
  const date = new Date(`${dateValue}T12:00:00`)
  if (Number.isNaN(date.getTime())) return dateValue

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...options,
  }).format(date)
}

function appointmentTimestamp(booking) {
  const [clockValue, modifier] = booking.appointmentTime.split(' ')
  const [hourValue, minuteValue] = clockValue.split(':').map(Number)
  let hour = hourValue

  if (modifier === 'PM' && hour !== 12) hour += 12
  if (modifier === 'AM' && hour === 12) hour = 0

  return new Date(
    `${booking.appointmentDate}T${String(hour).padStart(2, '0')}:${String(
      minuteValue,
    ).padStart(2, '0')}:00`,
  ).getTime()
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
        statusStyles[status] ?? statusStyles['New request']
      }`}
    >
      <span className={`size-1.5 rounded-full ${statusDots[status] ?? statusDots['New request']}`} />
      {status}
    </span>
  )
}

function OwnerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [bookings, setBookings] = useState(() => getBookings())
  const [statusMessage, setStatusMessage] = useState('')
  const requestedSalon = getSalonById(searchParams.get('salon'))
  const selectedSalon =
    requestedSalon ?? getSalonById(bookings[0]?.salonId) ?? salons[0]
  const highlightedBookingId = searchParams.get('highlight')
  const salonBookings = bookings
    .filter((booking) => booking.salonId === selectedSalon.id)
    .sort((first, second) => appointmentTimestamp(first) - appointmentTimestamp(second))

  const today = new Date(`${getTodayInputValue()}T00:00:00`)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const activeBookings = salonBookings.filter((booking) => booking.status !== 'Cancelled')
  const upcomingBookings = activeBookings.filter(
    (booking) => new Date(`${booking.appointmentDate}T23:59:59`) >= today,
  )
  const bookingsThisWeek = upcomingBookings.filter((booking) => {
    const appointmentDate = new Date(`${booking.appointmentDate}T12:00:00`)
    return appointmentDate >= today && appointmentDate <= nextWeek
  })
  const estimatedRevenue = activeBookings.reduce(
    (total, booking) => total + booking.servicePrice,
    0,
  )
  const serviceCounts = activeBookings.reduce((counts, booking) => {
    counts[booking.serviceName] = (counts[booking.serviceName] ?? 0) + 1
    return counts
  }, {})
  const popularServices = Object.entries(serviceCounts).sort(
    (first, second) => second[1] - first[1],
  )
  const topService = popularServices[0]?.[0] ?? 'No bookings yet'
  const maxServiceCount = popularServices[0]?.[1] ?? 1
  const newRequests = salonBookings.filter((booking) => booking.status === 'New request')
  const recentCustomers = [...salonBookings]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .filter(
      (booking, index, allBookings) =>
        allBookings.findIndex(
          (candidate) => candidate.customer.email === booking.customer.email,
        ) === index,
    )
    .slice(0, 5)

  const metrics = [
    {
      label: 'Bookings this week',
      value: String(bookingsThisWeek.length),
      note: `${salonBookings.length} total saved`,
      icon: 'calendar',
    },
    {
      label: 'New requests',
      value: String(newRequests.length),
      note: newRequests.length ? 'Waiting for your response' : 'Everything is up to date',
      icon: 'sparkle',
    },
    {
      label: 'Top service',
      value: topService,
      note: popularServices[0] ? `${popularServices[0][1]} request${popularServices[0][1] === 1 ? '' : 's'}` : 'Waiting for demand data',
      icon: 'star',
    },
    {
      label: 'Revenue estimate',
      value: formatCurrency(estimatedRevenue),
      note: 'Excludes cancelled requests',
      icon: 'arrow',
    },
  ]

  function handleSalonChange(event) {
    setSearchParams({ salon: event.target.value })
  }

  function handleStatusChange(bookingId, status) {
    if (updateBookingStatus(bookingId, status)) {
      setBookings(getBookings())
      setStatusMessage(`Booking status updated to ${status}.`)
      window.setTimeout(() => setStatusMessage(''), 2400)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-800 bg-plum-950 text-white">
        <div className="absolute right-[-7rem] top-[-11rem] size-[28rem] rounded-full bg-plum-600/35 blur-3xl" />
        <div className="page-shell relative py-10 sm:py-14">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-saffron-300 uppercase">
                <Icon name="sparkle" size={14} />
                Salon owner command centre
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {selectedSalon.name}, at a glance
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-plum-200">
                Manage incoming requests, appointment demand, customer details, and
                expected revenue from one calm workspace.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
                  {salonBookings.length} total booking{salonBookings.length === 1 ? '' : 's'}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
                  {formatCurrency(estimatedRevenue)} estimated revenue
                </span>
              </div>
            </div>

            <label className="w-full max-w-sm">
              <span className="mb-2 block text-xs font-bold tracking-[0.12em] text-plum-200 uppercase">
                Viewing salon
              </span>
              <select
                className="min-h-12 w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm font-bold text-plum-950 focus:outline-none"
                onChange={handleSalonChange}
                value={selectedSalon.id}
              >
                {salons.map((salon) => (
                  <option key={salon.id} value={salon.id}>
                    {salon.name} · {salon.area}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14">
        <p aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
        {statusMessage && (
          <div
            className="fixed right-4 top-24 z-50 flex items-center gap-2 rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white shadow-xl"
            role="status"
          >
            <Icon name="check" size={17} />
            {statusMessage}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <article className="metric-card" key={metric.label}>
              <span
                className={`absolute inset-x-0 top-0 h-1 ${
                  ['bg-saffron-400', 'bg-rosewood', 'bg-plum-500', 'bg-emerald-500'][index]
                }`}
              />
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-stone-500">{metric.label}</p>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-plum-50 text-plum-700">
                  <Icon name={metric.icon} size={17} />
                </span>
              </div>
              <p
                className={`mt-4 font-bold tracking-[-0.03em] text-ink ${
                  metric.label === 'Top service' ? 'text-xl leading-7' : 'text-3xl'
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-stone-500">{metric.note}</p>
            </article>
          ))}
        </div>

        {salonBookings.length === 0 ? (
          <section className="card-surface mt-8 grid min-h-96 place-items-center p-8 text-center">
            <div className="max-w-lg">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-plum-100 text-plum-700">
                <Icon name="calendar" size={27} />
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink">
                No bookings for this salon yet
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                New customer requests will appear here with the service, slot, contact
                details, revenue value, and status controls already organised.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  className="primary-button"
                  to={`/booking?salon=${selectedSalon.id}&source=owner-dashboard`}
                >
                  Add a test booking
                </Link>
                <Link className="secondary-button" to={`/salons/${selectedSalon.id}`}>
                  View public listing
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <>
            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
              <section className="card-surface overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-plum-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <h2 className="text-lg font-bold text-ink">Appointments & requests</h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {upcomingBookings.length} active request
                      {upcomingBookings.length === 1 ? '' : 's'} on the calendar
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-plum-50 px-3 py-1.5 text-xs font-bold text-plum-700">
                    Saved in this browser
                  </span>
                </div>

                {upcomingBookings.length > 0 ? (
                  <div className="divide-y divide-plum-100">
                    {upcomingBookings.map((booking) => (
                      <article
                        className={`grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[105px_minmax(0,1fr)_minmax(0,1.1fr)_155px] lg:items-center ${
                          booking.id === highlightedBookingId
                            ? 'bg-saffron-50 ring-2 ring-inset ring-saffron-300'
                            : ''
                        }`}
                        key={booking.id}
                      >
                        <div>
                          <p className="text-sm font-bold text-ink">
                            {formatDate(booking.appointmentDate, { weekday: 'short' })}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-plum-700">
                            {booking.appointmentTime}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-ink">{booking.customer.name}</p>
                          <p className="mt-1 text-xs text-stone-500">
                            {booking.customer.phone}
                          </p>
                          <p className="mt-1 font-mono text-[10px] text-stone-400">
                            {booking.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-700">
                            {booking.serviceName}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {formatCurrency(booking.servicePrice)} · {booking.serviceDuration}
                          </p>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <StatusBadge status={booking.status} />
                          <label className="w-full">
                            <span className="sr-only">
                              Update status for {booking.customer.name}
                            </span>
                            <select
                              className="min-h-10 w-full rounded-xl border border-plum-200 bg-white px-2.5 text-xs font-bold text-plum-800 focus:border-plum-500 focus:ring-3 focus:ring-plum-100 focus:outline-none"
                              onChange={(event) =>
                                handleStatusChange(booking.id, event.target.value)
                              }
                              value={booking.status}
                            >
                              {BOOKING_STATUSES.map((status) => (
                                <option key={status}>{status}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                        {booking.specialNote && (
                          <p className="rounded-xl bg-white/70 p-3 text-xs leading-5 text-stone-600 lg:col-start-2 lg:col-end-5">
                            <strong className="text-ink">Customer note:</strong>{' '}
                            {booking.specialNote}
                          </p>
                        )}
                        {booking.id === highlightedBookingId && (
                          <p className="flex items-center gap-1.5 text-xs font-bold text-saffron-700 lg:col-start-2 lg:col-end-5">
                            <Icon name="sparkle" size={14} />
                            Just added from the customer booking journey
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <Icon className="mx-auto text-plum-400" name="calendar" size={28} />
                    <h3 className="mt-4 font-bold text-ink">No upcoming appointments</h3>
                    <p className="mt-2 text-sm text-stone-500">
                      Past and cancelled requests remain reflected in the overall totals.
                    </p>
                  </div>
                )}
              </section>

              <aside className="rounded-3xl bg-plum-950 p-6 text-white shadow-glow">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-saffron-300">
                  <Icon name="sparkle" size={21} />
                </span>
                <p className="mt-6 text-xs font-bold tracking-[0.15em] text-saffron-300 uppercase">
                  AI demand insight
                </p>
                <h2 className="mt-3 text-xl font-bold">
                  {popularServices[0]
                    ? `${popularServices[0][0]} is leading demand`
                    : 'Demand signals are warming up'}
                </h2>
                <p className="mt-3 text-sm leading-7 text-plum-200">
                  {popularServices[0]
                    ? `${popularServices[0][1]} of your active requests include this service. Keep a visible near-term slot open to convert more high-intent visitors.`
                    : 'Once requests arrive, DelhiGlow will summarize the strongest service and scheduling signals here.'}
                </p>
                <Link
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-white"
                  to={`/salons/${selectedSalon.id}`}
                >
                  Review public listing <Icon name="arrow" size={17} />
                </Link>
              </aside>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section className="card-surface p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-ink">Popular services</h2>
                    <p className="mt-1 text-sm text-stone-500">Based on active saved bookings</p>
                  </div>
                  <span className="rounded-full bg-plum-50 px-3 py-1.5 text-xs font-bold text-plum-700">
                    {activeBookings.length} active
                  </span>
                </div>

                {popularServices.length > 0 ? (
                  <div className="mt-6 space-y-5">
                    {popularServices.slice(0, 5).map(([service, count]) => (
                      <div key={service}>
                        <div className="flex justify-between gap-3 text-sm">
                          <span className="font-semibold text-stone-700">{service}</span>
                          <span className="text-stone-500">
                            {count} booking{count === 1 ? '' : 's'}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-plum-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-plum-700 to-saffron-400"
                            style={{ width: `${Math.max(18, (count / maxServiceCount) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl bg-plum-50 p-6 text-center">
                    <p className="text-sm font-bold text-ink">No active service data</p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Cancelled bookings are excluded from demand rankings.
                    </p>
                  </div>
                )}
              </section>

              <section className="card-surface p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-ink">Recent customers</h2>
                    <p className="mt-1 text-sm text-stone-500">
                      Contact details from booking requests
                    </p>
                  </div>
                  <Icon className="text-plum-600" name="users" size={22} />
                </div>
                <div className="mt-5 divide-y divide-plum-100">
                  {recentCustomers.map((booking) => (
                    <div
                      className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                      key={booking.customer.email}
                    >
                      <div>
                        <p className="font-bold text-ink">{booking.customer.name}</p>
                        <p className="mt-1 text-xs text-stone-500">
                          {booking.customer.email} · {booking.customer.phone}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs font-bold text-plum-700">
                          {booking.serviceName}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          Added {formatDate(booking.createdAt.slice(0, 10))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default OwnerDashboard
