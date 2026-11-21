import {
  CLEANING_SERVICE,
  bookingStatus,
  formatDate,
  formatDay,
  formatMonth,
  formatNumber,
  formatPrice,
  formatTime,
  loadBookings,
} from './store.js';
import { escapeHtml } from './dom.js';

let activeFilter = 'all';
let initialized = false;

function sortByAppointment(list) {
  return list.slice().sort((a, b) => {
    const first = new Date(`${a.date}T${a.time || '00:00'}`);
    const second = new Date(`${b.date}T${b.time || '00:00'}`);
    return second - first;
  });
}

function cardHtml(booking) {
  const status = bookingStatus(booking);
  const isDemo = booking.payment?.mode === 'demo';
  const statusLabel = status === 'upcoming' ? 'در حال انجام' : 'انجام شده';

  return `
    <article class="booking-card" data-booking-id="${escapeHtml(booking.id)}">
      <div class="booking-date">
        <strong>${formatDay(booking.date)}</strong>
        <span>${formatMonth(booking.date)}</span>
      </div>
      <div class="booking-main">
        <h3>${CLEANING_SERVICE.title}</h3>
        <div class="booking-meta">
          <span>ساعت <strong>${formatTime(booking.time)}</strong></span>
          <span>کد <strong class="booking-code">${escapeHtml(booking.code)}</strong></span>
          <span>برای <strong>${escapeHtml(booking.name)}</strong></span>
        </div>
        <div class="booking-meta">
          <span>${formatDate(booking.date)}</span>
        </div>
      </div>
      <div class="booking-side">
        <span class="badge badge-${status}">${statusLabel}</span>
        <span class="badge ${isDemo ? 'badge-demo' : 'badge-paypal'}">
          ${isDemo ? 'پرداخت آزمایشی' : 'پرداخت پی‌پال'}
        </span>
        <span class="booking-price">${formatPrice(booking.price, booking.currency)}</span>
      </div>
    </article>
  `;
}

function render() {
  const list = document.getElementById('bookings-list');
  const empty = document.getElementById('bookings-empty');
  if (!list || !empty) return;

  const bookings = sortByAppointment(loadBookings());
  const counts = { all: bookings.length, upcoming: 0, completed: 0 };
  bookings.forEach((booking) => {
    counts[bookingStatus(booking)] += 1;
  });

  document.querySelectorAll('[data-count]').forEach((node) => {
    node.textContent = formatNumber(counts[node.dataset.count] ?? 0);
  });

  const visible = activeFilter === 'all' ? bookings : bookings.filter((b) => bookingStatus(b) === activeFilter);
  list.innerHTML = visible.map(cardHtml).join('');
  empty.hidden = visible.length > 0;

  const heading = empty.querySelector('h3');
  const text = empty.querySelector('p');
  if (heading && text) {
    if (counts.all === 0) {
      heading.textContent = 'هنوز رزروی ثبت نکرده‌ای';
      text.textContent = 'اولین نوبت جرمگیری‌ات را رزرو کن؛ کمتر از دو دقیقه وقت می‌گیرد.';
    } else {
      heading.textContent = 'رزروی در این دسته نیست';
      text.textContent = 'در دسته‌ی دیگری از تب‌های بالا سر بزن.';
    }
  }
}

export function refreshBookings() {
  render();
}

export function initBookingsView() {
  if (initialized) return;
  initialized = true;

  const tabs = [...document.querySelectorAll('[data-filter]')];
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.filter;
      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
      render();
    });
  });

  window.addEventListener('bookings:changed', render);
  render();
}
