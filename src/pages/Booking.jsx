import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getSalonById, salons } from '../data/salons'
import { createBookingId, saveBooking } from '../lib/bookingStorage'
import { getTodayInputValue } from '../lib/aiDemo'

function toInputDate(slot) {
  const today = new Date(`${getTodayInputValue()}T12:00:00`)

  if (slot.day === 'Today') return getTodayInputValue()

  if (slot.day === 'Tomorrow') {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return [
      tomorrow.getFullYear(),
      String(tomorrow.getMonth() + 1).padStart(2, '0'),
      String(tomorrow.getDate()).padStart(2, '0'),
    ].join('-')
  }

  let parsedDate = new Date(`${slot.date} ${today.getFullYear()} 12:00:00`)
  if (Number.isNaN(parsedDate.getTime())) return getTodayInputValue()

  if (parsedDate < today) {
    parsedDate = new Date(`${slot.date} ${today.getFullYear() + 1} 12:00:00`)
  }

  return [
    parsedDate.getFullYear(),
    String(parsedDate.getMonth() + 1).padStart(2, '0'),
    String(parsedDate.getDate()).padStart(2, '0'),
  ].join('-')
}

function getAvailability(salon) {
  return salon.availabilitySlots.map((slot) => ({
    ...slot,
    value: toInputDate(slot),
  }))
}

function formatDate(dateValue) {
  const date = new Date(`${dateValue}T12:00:00`)
  if (Number.isNaN(date.getTime())) return dateValue

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

function Booking() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialSalon = getSalonById(searchParams.get('salon')) ?? salons[0]
  const requestedService = searchParams.get('service')
  const initialService =
    initialSalon.services.find((service) => service.name === requestedService) ??
    initialSalon.services[0]
  const initialAvailability = getAvailability(initialSalon)
  const [form, setForm] = useState({
    salonId: initialSalon.id,
    serviceName: initialService.name,
    appointmentDate: initialAvailability[0]?.value ?? getTodayInputValue(),
    appointmentTime: initialAvailability[0]?.times[0] ?? '',
    name: '',
    phone: '',
    email: '',
    specialNote: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const selectedSalon = getSalonById(form.salonId) ?? salons[0]
  const selectedService =
    selectedSalon.services.find((service) => service.name === form.serviceName) ??
    selectedSalon.services[0]
  const availability = useMemo(() => getAvailability(selectedSalon), [selectedSalon])
  const selectedSlot =
    availability.find((slot) => slot.value === form.appointmentDate) ?? availability[0]
  const source = searchParams.get('source') ?? 'direct'

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: '' }))
    setError('')
  }

  function handleSalonChange(event) {
    const nextSalon = getSalonById(event.target.value) ?? salons[0]
    const nextAvailability = getAvailability(nextSalon)
    setForm((current) => ({
      ...current,
      salonId: nextSalon.id,
      serviceName: nextSalon.services[0].name,
      appointmentDate: nextAvailability[0]?.value ?? getTodayInputValue(),
      appointmentTime: nextAvailability[0]?.times[0] ?? '',
    }))
    setFieldErrors({})
    setError('')
  }

  function handleDateChange(event) {
    const nextDate = event.target.value
    const nextSlot = availability.find((slot) => slot.value === nextDate)
    setForm((current) => ({
      ...current,
      appointmentDate: nextDate,
      appointmentTime: nextSlot?.times[0] ?? '',
    }))
    setFieldErrors((current) => ({
      ...current,
      appointmentDate: '',
      appointmentTime: '',
    }))
    setError('')
  }

  function validateForm() {
    const nextErrors = {}
    const customerName = form.name.trim()
    const phone = form.phone.trim()
    const email = form.email.trim()

    if (!form.serviceName) nextErrors.serviceName = 'Choose a service to continue.'
    if (!form.appointmentDate) nextErrors.appointmentDate = 'Choose an appointment date.'
    if (!form.appointmentTime) nextErrors.appointmentTime = 'Choose an available time.'
    if (customerName.length < 2) nextErrors.name = 'Enter the name the salon should use.'
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!validateForm()) {
      setError('Please check the highlighted fields before sending your request.')
      return
    }

    setSaving(true)

    const booking = {
      id: createBookingId(),
      createdAt: new Date().toISOString(),
      salonId: selectedSalon.id,
      salonName: selectedSalon.name,
      salonArea: selectedSalon.area,
      serviceName: selectedService.name,
      serviceCategory: selectedService.category,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      specialNote: form.specialNote.trim(),
      status: 'New request',
      source,
    }

    try {
      const result = saveBooking(booking)
      navigate(`/booking/confirmation/${booking.id}`, {
        state: { booking: result.booking, persisted: result.persisted },
      })
    } catch {
      setError('We could not save this request. Please try again.')
      setSaving(false)
    }
  }

  return (
    <>
      <section className="border-b border-plum-100 bg-plum-50/65">
        <div className="page-shell py-10 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">
                <Icon name="calendar" size={14} />
                Book with confidence
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                Reserve your beauty time
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Pick a service and available slot, then share the details the salon
                needs to confirm your visit.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-500">
              {[
                ['1', 'Choose'],
                ['2', 'Your details'],
                ['3', 'Confirmation'],
              ].map(([number, label], index) => (
                <span className="flex items-center gap-2" key={number}>
                  <span
                    className={`grid size-8 place-items-center rounded-full ${
                      index < 2 ? 'bg-plum-950 text-white' : 'bg-white text-plum-700'
                    }`}
                  >
                    {number}
                  </span>
                  {label}
                  {index < 2 && <span className="h-px w-5 bg-plum-200" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <form className="card-surface p-5 sm:p-7" noValidate onSubmit={handleSubmit}>
            <div className="flex items-start gap-3 border-b border-plum-100 pb-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-plum-100 text-plum-700">
                <Icon name="sparkle" size={19} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">Appointment details</h2>
                <p className="mt-1 text-sm text-stone-500">
                  Three quick steps. No account or payment is needed.
                </p>
              </div>
            </div>

            {error && (
              <div
                className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                role="alert"
              >
                <Icon className="mt-0.5 shrink-0" name="warning" size={18} />
                {error}
              </div>
            )}

            <section className="mt-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-plum-950 text-xs font-bold text-white">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-ink">Choose your salon and service</h3>
                  <p className="text-xs text-stone-500">Prices and durations update instantly.</p>
                </div>
              </div>

              <label className="sm:col-span-2">
                <span className="field-label">Salon</span>
                <select
                  className="field-control"
                  name="salonId"
                  onChange={handleSalonChange}
                  value={form.salonId}
                >
                  {salons.map((salon) => (
                    <option key={salon.id} value={salon.id}>
                      {salon.name} · {salon.area}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="mt-5">
                <legend className="field-label">Service</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedSalon.services.map((service) => (
                    <label className="cursor-pointer" key={service.name}>
                      <input
                        checked={form.serviceName === service.name}
                        className="peer sr-only"
                        name="serviceName"
                        onChange={updateForm}
                        type="radio"
                        value={service.name}
                      />
                      <span className="flex h-full min-h-28 flex-col rounded-2xl border border-plum-100 bg-white p-4 transition hover:border-plum-300 peer-checked:border-plum-900 peer-checked:bg-plum-50 peer-checked:ring-2 peer-checked:ring-plum-200">
                        <span className="text-[11px] font-bold tracking-wide text-plum-600 uppercase">
                          {service.category}
                        </span>
                        <span className="mt-1 font-bold leading-6 text-ink">{service.name}</span>
                        <span className="mt-auto flex items-end justify-between gap-3 pt-3 text-xs text-stone-500">
                          <span>{service.duration}</span>
                          <strong className="text-base text-ink">
                            ₹{service.price.toLocaleString('en-IN')}
                          </strong>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {fieldErrors.serviceName && (
                  <span className="field-error" id="service-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.serviceName}
                  </span>
                )}
              </fieldset>
            </section>

            <section className="mt-8 border-t border-plum-100 pt-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-plum-950 text-xs font-bold text-white">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-ink">Pick an available time</h3>
                  <p className="text-xs text-stone-500">Choose a date first, then an open slot.</p>
                </div>
              </div>

              <fieldset>
                <legend className="field-label">Available dates</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {availability.map((slot) => (
                    <label className="cursor-pointer" key={slot.value}>
                      <input
                        checked={form.appointmentDate === slot.value}
                        className="peer sr-only"
                        name="appointmentDate"
                        onChange={handleDateChange}
                        type="radio"
                        value={slot.value}
                      />
                      <span className="flex min-h-18 flex-col justify-center rounded-2xl border border-plum-200 bg-white px-3 py-3 text-center transition hover:border-plum-400 peer-checked:border-plum-900 peer-checked:bg-plum-950 peer-checked:text-white">
                        <span className="text-xs font-black">{slot.day}</span>
                        <span className="mt-1 text-[11px] opacity-70">{formatDate(slot.value)}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {fieldErrors.appointmentDate && (
                  <span className="field-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.appointmentDate}
                  </span>
                )}
              </fieldset>

              <fieldset className="mt-5">
                <legend className="field-label">Time slot</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(selectedSlot?.times ?? []).map((time) => (
                    <label className="cursor-pointer" key={time}>
                      <input
                        checked={form.appointmentTime === time}
                        className="peer sr-only"
                        name="appointmentTime"
                        onChange={updateForm}
                        type="radio"
                        value={time}
                      />
                      <span className="selection-tile peer-checked:border-plum-900 peer-checked:bg-plum-950 peer-checked:text-white peer-checked:shadow-md">
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
                {fieldErrors.appointmentTime && (
                  <span className="field-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.appointmentTime}
                  </span>
                )}
              </fieldset>
            </section>

            <section className="mt-8 border-t border-plum-100 pt-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-plum-950 text-xs font-bold text-white">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-ink">Add your contact details</h3>
                  <p className="text-xs text-stone-500">The salon uses these to confirm the request.</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                <span className="field-label">Name</span>
                <input
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  aria-invalid={Boolean(fieldErrors.name)}
                  autoComplete="name"
                  className="field-control"
                  name="name"
                  onChange={updateForm}
                  placeholder="e.g. Aanya Mehra"
                  required
                  type="text"
                  value={form.name}
                />
                {fieldErrors.name && (
                  <span className="field-error" id="name-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.name}
                  </span>
                )}
                </label>

                <label>
                <span className="field-label">Phone</span>
                <input
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  autoComplete="tel"
                  className="field-control"
                  inputMode="numeric"
                  maxLength="10"
                  name="phone"
                  onChange={updateForm}
                  pattern="[6-9][0-9]{9}"
                  placeholder="10-digit mobile number"
                  required
                  title="Enter a valid 10-digit Indian mobile number"
                  type="tel"
                  value={form.phone}
                />
                {fieldErrors.phone && (
                  <span className="field-error" id="phone-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.phone}
                  </span>
                )}
                </label>

                <label className="sm:col-span-2">
                <span className="field-label">Email</span>
                <input
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  aria-invalid={Boolean(fieldErrors.email)}
                  autoComplete="email"
                  className="field-control"
                  name="email"
                  onChange={updateForm}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={form.email}
                />
                {fieldErrors.email && (
                  <span className="field-error" id="email-error">
                    <Icon name="warning" size={13} />
                    {fieldErrors.email}
                  </span>
                )}
                </label>

                <label className="sm:col-span-2">
                <span className="field-label">
                  Special note{' '}
                  <span className="font-normal text-stone-400">(optional)</span>
                </span>
                <textarea
                  className="field-control min-h-28 resize-y"
                  maxLength="500"
                  name="specialNote"
                  onChange={updateForm}
                  placeholder="Share hair length, skin sensitivity, occasion details, access needs, or anything else that helps the salon prepare."
                  value={form.specialNote}
                />
                <span className="mt-1.5 block text-right text-xs text-stone-400">
                  {form.specialNote.length}/500
                </span>
                </label>
              </div>
            </section>

            <button className="primary-button mt-6 w-full sm:w-auto" disabled={saving} type="submit">
              {saving ? 'Saving your request…' : 'Confirm booking request'}
              {!saving && <Icon name="arrow" size={17} />}
            </button>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-stone-500">
              <Icon className="mt-0.5 shrink-0" name="shield" size={15} />
              Your request is saved in this browser. The salon confirms availability
              before any payment.
            </p>
          </form>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card-surface overflow-hidden">
              <div className={`relative h-40 bg-gradient-to-br ${selectedSalon.gradient} p-5`}>
                <span className="grid size-13 place-items-center rounded-2xl border border-white/60 bg-white/80 font-display text-lg font-semibold text-plum-900 shadow-lg">
                  {selectedSalon.initials}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-plum-900 shadow-sm">
                  {selectedSalon.rating} ★
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold tracking-[0.14em] text-plum-700 uppercase">
                  Your selection
                </p>
                <h2 className="mt-2 text-xl font-bold text-ink">{selectedSalon.name}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                  <Icon name="location" size={15} />
                  {selectedSalon.area}, Delhi
                </p>

                <div className="mt-5 space-y-4 border-t border-plum-100 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-stone-500">Service</span>
                    <strong className="max-w-48 text-right text-ink">
                      {selectedService.name}
                    </strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-stone-500">When</span>
                    <strong className="text-right text-ink">
                      {formatDate(form.appointmentDate)} · {form.appointmentTime}
                    </strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-stone-500">Duration</span>
                    <strong className="text-right text-ink">
                      {selectedService.duration}
                    </strong>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-plum-100 pt-4">
                    <span className="text-stone-500">Estimated total</span>
                    <strong className="text-xl text-ink">
                      ₹{selectedService.price.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                <Link
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-plum-700"
                  to={`/salons/${selectedSalon.id}`}
                >
                  Review salon details <Icon name="chevron" size={15} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <Icon name="check" size={17} />
                Free request · no payment now
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-800">
                The request appears instantly in the salon owner view, with your
                chosen service, time, and contact details.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default Booking
