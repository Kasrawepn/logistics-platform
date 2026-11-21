import { initRouter, navigate, parseRoute } from './router.js';
import { createOrbitScene } from './scene.js';
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
const timeFormat = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' });

function updateClinicStatus() {
  const now = new Date();
  if (clockNode) clockNode.textContent = `ساعت ${timeFormat.format(now)}`;

  if (!slotNode) return;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const nextSlot = TIME_SLOTS.find((slot) => {
    const [hours, mins] = slot.split(':').map(Number);
    return hours * 60 + mins > minutes + 45;
  });

  slotNode.textContent = nextSlot ? `امروز · ${formatTime(nextSlot)}` : 'فردا · ۰۹:۰۰';
}

updateClinicStatus();
window.setInterval(updateClinicStatus, 60_000);

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

/* ---------- views ---------- */
initBookingView();
initBookingsView();

initRouter((route) => {
  orbitScene.setActive(route === 'home');
  closeNav();
  if (route === 'booking') resetBookingFlow();
  if (route === 'bookings') refreshBookings();
  window.scrollTo({ top: 0, behavior: 'auto' });
});
