import { Link, useLocation, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getSalonById } from '../data/salons'
import { getBookingById } from '../lib/bookingStorage'

function formatAppointmentDate(dateValue) {
  const date = new Date(`${dateValue}T12:00:00`)
  if (Number.isNaN(date.getTime())) return dateValue

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function BookingConfirmation() {
  const { bookingId } = useParams()
  const location = useLocation()
  const booking = getBookingById(bookingId) ?? location.state?.booking
  const persisted = location.state?.persisted ?? Boolean(getBookingById(bookingId))

  if (!booking) {
    return (
      <section className="page-shell grid min-h-[70vh] place-items-center py-16 text-center">
        <div className="max-w-lg">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-plum-100 text-plum-700">
            <Icon name="calendar" size={27} />
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold text-ink">
            We couldn’t reopen that booking
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            It may have been created in another browser or removed from local storage.
            You can start a fresh request in under a minute.
          </p>
          <Link className="primary-button mt-7" to="/booking">
            Start a booking
          </Link>
        </div>
      </section>
    )
  }

  const salon = getSalonById(booking.salonId)

  return (
    <>
      <section className="relative overflow-hidden border-b border-plum-100 bg-plum-50/70">
        <div className="absolute left-[-8rem] top-[-9rem] size-80 rounded-full bg-saffron-200/45 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] size-80 rounded-full bg-plum-200/65 blur-3xl" />
        <div className="page-shell relative py-14 text-center sm:py-18">
          <span className="mx-auto grid size-18 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-900/10">
            <Icon name="check" size={32} strokeWidth={2.3} />
          </span>
          <p className="mt-6 text-xs font-bold tracking-[0.17em] text-emerald-700 uppercase">
            Booking request received
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            Your appointment request is on its way
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600">
            {booking.salonName} now has everything needed to review your request.
            No payment has been taken.
          </p>
          <span className="mt-6 inline-flex rounded-full border border-plum-200 bg-white px-4 py-2 font-mono text-sm font-bold text-plum-800 shadow-sm">
            {booking.id}
          </span>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="space-y-7">
            <article className="card-surface overflow-hidden">
              <div className={`bg-gradient-to-br ${salon?.gradient ?? 'from-plum-100 to-saffron-100'} p-6 sm:p-7`}>
                <div className="flex items-start gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/60 bg-white/80 font-display text-lg font-semibold text-plum-900 shadow-md">
                    {salon?.initials ?? 'DG'}
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-plum-700 uppercase">
                      Appointment summary
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-plum-950">
                      {booking.salonName}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-plum-800">
                      <Icon name="location" size={15} />
                      {booking.salonArea}, Delhi
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
                {[
                  ['Service', booking.serviceName],
                  ['Date', formatAppointmentDate(booking.appointmentDate)],
                  ['Time', booking.appointmentTime],
                  ['Estimated total', `₹${booking.servicePrice.toLocaleString('en-IN')}`],
                ].map(([label, value]) => (
                  <div className="rounded-2xl bg-plum-50/70 p-4" key={label}>
                    <p className="text-xs font-bold tracking-wide text-stone-500 uppercase">
                      {label}
                    </p>
                    <p className="mt-1.5 font-bold text-ink">{value}</p>
                  </div>
                ))}
                {booking.specialNote && (
                  <div className="rounded-2xl border border-plum-100 p-4 sm:col-span-2">
                    <p className="text-xs font-bold tracking-wide text-stone-500 uppercase">
                      Note for the salon
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">
                      {booking.specialNote}
                    </p>
                  </div>
                )}
              </div>
            </article>

            <article className="card-surface p-6 sm:p-7">
              <h2 className="text-xl font-bold text-ink">What happens next</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {[
                  ['1', 'Salon reviews', 'The team checks the requested service and slot.'],
                  ['2', 'You get confirmation', `They contact ${booking.customer.phone} or email you.`],
                  ['3', 'Pay at the salon', 'No card or advance payment is collected in this demo.'],
                ].map(([number, title, text]) => (
                  <div key={number}>
                    <span className="grid size-9 place-items-center rounded-full bg-plum-950 text-sm font-bold text-white">
                      {number}
                    </span>
                    <h3 className="mt-3 font-bold text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-stone-500">{text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-plum-950 p-6 text-white shadow-glow">
              <Icon className="text-saffron-300" name="sparkle" size={24} />
              <h2 className="mt-5 text-xl font-bold">See what the salon receives</h2>
              <p className="mt-3 text-sm leading-7 text-plum-200">
                Open the owner view to see this exact request arrive with the
                customer details, estimated revenue, and status controls intact.
              </p>
              <Link
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-plum-950 transition hover:bg-plum-50"
                to={`/owner-dashboard?salon=${booking.salonId}&highlight=${booking.id}`}
              >
                Open salon owner view
                <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="card-surface p-5">
              <p className="flex items-start gap-2 text-sm leading-6 text-stone-600">
                <Icon className="mt-0.5 shrink-0 text-emerald-700" name="shield" size={18} />
                {persisted
                  ? 'Saved safely in this browser, so you can reopen this confirmation.'
                  : 'This browser blocked local storage, so keep this page open to retain the confirmation.'}
              </p>
              <div className="mt-5 grid gap-3">
                <Link className="secondary-button w-full" to={`/salons/${booking.salonId}`}>
                  Back to salon
                </Link>
                <Link className="text-center text-sm font-bold text-plum-700" to="/explore">
                  Explore more salons
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default BookingConfirmation
