const STORAGE_KEY = 'delhiglow.bookings.v1'
const BOOKING_STATUSES = ['New request', 'Confirmed', 'Completed', 'Cancelled']

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function isBookingRecord(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.id === 'string' &&
      typeof value.salonId === 'string' &&
      typeof value.serviceName === 'string' &&
      typeof value.appointmentDate === 'string' &&
      typeof value.appointmentTime === 'string' &&
      value.customer &&
      typeof value.customer.name === 'string',
  )
}

export function getBookings() {
  if (!canUseStorage()) return []

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!storedValue) return []

    const parsedValue = JSON.parse(storedValue)
    if (!Array.isArray(parsedValue)) return []

    return parsedValue
      .filter(isBookingRecord)
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
  } catch (error) {
    console.warn('DelhiGlow could not read saved bookings.', error)
    return []
  }
}

export function getBookingById(bookingId) {
  return getBookings().find((booking) => booking.id === bookingId)
}

export function createBookingId() {
  const datePart = new Date()
    .toISOString()
    .slice(2, 10)
    .replaceAll('-', '')
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `DG-${datePart}-${randomPart}`
}

export function saveBooking(booking) {
  const nextBooking = {
    ...booking,
    status: BOOKING_STATUSES.includes(booking.status) ? booking.status : 'New request',
  }

  if (!canUseStorage()) {
    return { booking: nextBooking, persisted: false }
  }

  try {
    const nextBookings = [
      nextBooking,
      ...getBookings().filter((storedBooking) => storedBooking.id !== nextBooking.id),
    ]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBookings))
    return { booking: nextBooking, persisted: true }
  } catch (error) {
    console.warn('DelhiGlow could not save this booking.', error)
    return { booking: nextBooking, persisted: false }
  }
}

export function updateBookingStatus(bookingId, status) {
  if (!BOOKING_STATUSES.includes(status) || !canUseStorage()) return false

  try {
    const bookings = getBookings()
    const nextBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status, updatedAt: new Date().toISOString() }
        : booking,
    )
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBookings))
    return true
  } catch (error) {
    console.warn('DelhiGlow could not update this booking.', error)
    return false
  }
}

export { BOOKING_STATUSES }
