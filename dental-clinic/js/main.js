import { initRouter, navigate, parseRoute } from './router.js';
import { createOrbitScene } from './scene.js';
import { createDentistScene } from './dentist-scene.js';
import { createGalleryScene } from './gallery-scene.js';
import { renderHomeSections, renderGalleryFallback } from './home-sections.js';
import { GALLERY } from './content.js';
import { initBookingView, resetBookingFlow } from './booking-view.js';
import { initBookingsView, refreshBookings } from './bookings-view.js';
import { TIME_SLOTS, formatTime } from './store.js';

/* ---------- header ---------- */
const header = document.getElementById('site-header');
const nav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');

function closeNav() {
  nav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(Boolean(open)));
});

function syncHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

/* ---------- in-page section links ---------- */
document.querySelectorAll('[data-scroll]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.dataset.scroll);
    if (!target) return;
    event.preventDefault();
    closeNav();
    if (parseRoute() !== 'home') {
      navigate('home');
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 90);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- clinic status card ---------- */
const clockNode = document.getElementById('clinic-clock');
const slotNode = document.getElementById('next-slot');
const statusNode = document.getElementById('clinic-status');
const statusChip = document.getElementById('clinic-status-chip');
const timeFormat = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' });
const weekdayFormat = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' });

// Opening hours of the practice (0 = Sunday … 6 = Saturday), in minutes.
const OPENING_HOURS = {
  1: [[510, 750], [810, 1050]], // Monday 08:30–12:30, 13:30–17:30
  2: [[510, 840]], // Tuesday 08:30–14:00
  3: [[510, 750], [810, 1050]], // Wednesday
  4: [[510, 750], [810, 1050]], // Thursday
  5: [[510, 780]], // Friday 08:30–13:00
};
const SLOT_MINUTES = TIME_SLOTS.map((slot) => {
  const [hours, minutes] = slot.split(':').map(Number);
  return { slot, minutes: hours * 60 + minutes };
});

function nextAvailableSlot(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const ranges = OPENING_HOURS[date.getDay()] || [];
  const nowMinutes = dayOffset === 0 ? new Date().getHours() * 60 + new Date().getMinutes() : -Infinity;

  const match = SLOT_MINUTES.find(
    (entry) =>
      entry.minutes > nowMinutes + 45 &&
      ranges.some(([start, end]) => entry.minutes >= start && entry.minutes + 45 <= end),
  );

  if (!match) return null;
  const label = dayOffset === 0 ? 'امروز' : dayOffset === 1 ? 'فردا' : weekdayFormat.format(date);
  return `${label} · ${formatTime(match.slot)}`;
}

function updateClinicStatus() {
  const now = new Date();
  if (clockNode) clockNode.textContent = `ساعت ${timeFormat.format(now)}`;

  const ranges = OPENING_HOURS[now.getDay()] || [];
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = ranges.some(([start, end]) => minutes >= start && minutes < end);

  if (statusNode) statusNode.textContent = isOpen ? 'کلینیک باز است' : 'کلینیک بسته است';
  statusChip?.classList.toggle('is-closed', !isOpen);

  if (!slotNode) return;
  const next = [0, 1, 2, 3, 4, 5, 6].map(nextAvailableSlot).find(Boolean);
  slotNode.textContent = next || 'با تلفن هماهنگ کنید';
}

updateClinicStatus();
window.setInterval(updateClinicStatus, 60_000);

/* ---------- content extracted from the practice site ---------- */
renderHomeSections();

/* ---------- reveal on scroll ---------- */
const revealNodes = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

/* ---------- 3D hero ---------- */
const orbitScene = createOrbitScene(document.getElementById('orbit-canvas'));
createDentistScene(document.getElementById('dentist-canvas'));
const galleryScene = createGalleryScene(document.getElementById('gallery-canvas'), GALLERY);
if (!galleryScene.available) renderGalleryFallback(document.querySelector('.gallery-stage'));

/* ---------- views ---------- */
initBookingView();
initBookingsView();

initRouter((route) => {
  document.body.dataset.route = route;
  orbitScene.setActive(route === 'home');
  galleryScene.setActive(route === 'home');
  closeNav();
  if (route === 'booking') resetBookingFlow();
  if (route === 'bookings') refreshBookings();
  window.scrollTo({ top: 0, behavior: 'auto' });
});
