/* Bookings storage + Persian formatting helpers (localStorage). */

const STORAGE_KEY = 'dentorbit.bookings.v1';

export const CLEANING_SERVICE = {
  id: 'cleaning',
  title: 'جرمگیری و بروساژ',
  price: 79,
  currency: 'EUR',
  duration: 45,
};

export const TIME_SLOTS = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

const numberFa = new Intl.NumberFormat('fa-IR');
const dateFa = new Intl.DateTimeFormat('fa-IR-u-ca-gregory', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const dayFa = new Intl.DateTimeFormat('fa-IR-u-ca-gregory', { day: 'numeric' });
const monthFa = new Intl.DateTimeFormat('fa-IR-u-ca-gregory', { month: 'long' });

export function formatPrice(value, currency = 'EUR') {
  return `${numberFa.format(value)} ${currency === 'EUR' ? '€' : currency}`;
}

export function formatNumber(value) {
  return numberFa.format(value);
}

export function formatTime(time) {
  const [hours, minutes] = String(time).split(':').map(Number);
  const hh = numberFa.format(hours || 0).padStart(2, '۰');
  const mm = numberFa.format(minutes || 0).padStart(2, '۰');
  return `${hh}:${mm}`;
}

export function formatDate(isoDate) {
  const date = parseDate(isoDate);
  return date ? dateFa.format(date) : isoDate;
}

export function formatDay(isoDate) {
  const date = parseDate(isoDate);
  return date ? dayFa.format(date) : '—';
}

export function formatMonth(isoDate) {
  const date = parseDate(isoDate);
  return date ? monthFa.format(date) : '';
}

export function parseDate(isoDate) {
  if (!isoDate) return null;
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function appointmentAt(booking) {
  const date = parseDate(booking.date);
  if (!date) return new Date(0);
  const [hours, minutes] = String(booking.time || '00:00').split(':').map(Number);
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date;
}

/** 'upcoming' while the appointment is ahead (or happening), 'completed' once it has passed. */
export function bookingStatus(booking) {
  const end = appointmentAt(booking).getTime() + CLEANING_SERVICE.duration * 60000;
  return end >= Date.now() ? 'upcoming' : 'completed';
}

export function loadBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveBookings(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable (private mode) — bookings stay in memory for this page */
  }
}

export function addBooking(booking) {
  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list);
  return booking;
}

export function createBookingCode() {
  const random = Math.floor(100 + Math.random() * 900);
  return `DO-${String(Date.now()).slice(-5)}-${random}`;
}
