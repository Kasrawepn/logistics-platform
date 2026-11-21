import {
  CLEANING_SERVICE,
  TIME_SLOTS,
  addBooking,
  createBookingCode,
  formatDate,
  formatPrice,
  formatTime,
  todayISO,
} from './store.js';
import { paypalConfigured, renderPaypalButtons } from './paypal.js';
import { escapeHtml } from './dom.js';

let controller = null;

/** Called by the router whenever the booking view is opened. */
export function resetBookingFlow() {
  controller?.reset();
}

export function initBookingView() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = [...form.querySelectorAll('.form-step')];
  const stepperItems = [...form.querySelectorAll('.stepper-item')];
  const summaryBox = form.querySelector('#booking-summary');
  const paypalBox = form.querySelector('#paypal-buttons');
  const demoButton = form.querySelector('#demo-pay');
  const payNote = form.querySelector('#pay-note');
  const payAmount = form.querySelector('#pay-amount');
  const ticketBox = form.querySelector('#success-ticket');
  const backButton = form.querySelector('#back-to-form');
  const dateInput = form.querySelector('#date');
  const timeSelect = form.querySelector('#time');

  let draft = null;
  let currentStep = 1;

  timeSelect.innerHTML = TIME_SLOTS.map((slot) => `<option value="${slot}">${formatTime(slot)}</option>`).join('');
  dateInput.min = todayISO();
  dateInput.value = todayISO();
  payAmount.textContent = formatPrice(CLEANING_SERVICE.price);

  function setStep(step) {
    currentStep = step;
    steps.forEach((section) => {
      section.hidden = Number(section.dataset.step) !== step;
    });
    stepperItems.forEach((item) => {
      const index = Number(item.dataset.stepLabel);
      item.classList.toggle('is-active', index === step);
      item.classList.toggle('is-done', index < step);
    });
  }

  function clearErrors() {
    form.querySelectorAll('.field').forEach((field) => field.classList.remove('has-error'));
    form.querySelectorAll('.field-error').forEach((node) => {
      node.textContent = '';
    });
  }

  function setError(name, message) {
    const error = form.querySelector(`[data-error-for="${name}"]`);
    const field = error?.closest('.field');
    if (error) error.textContent = message;
    field?.classList.add('has-error');
  }

  function readForm() {
    clearErrors();
    const value = (id) => form.querySelector(`#${id}`).value.trim();
    const name = value('name');
    const phone = value('phone');
    const email = value('email');
    const date = value('date');
    const time = value('time');
    const notes = value('notes');

    let valid = true;

    if (name.length < 3) {
      setError('name', 'نام و نام خانوادگی را کامل وارد کن.');
      valid = false;
    }

    if (!/^[+\d][\d\s()\-]{6,}$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
      setError('phone', 'شماره موبایل معتبر نیست.');
      valid = false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('email', 'ایمیل معتبر نیست.');
      valid = false;
    }

    if (!date) {
      setError('date', 'تاریخ نوبت را انتخاب کن.');
      valid = false;
    } else if (date < todayISO()) {
      setError('date', 'تاریخ نمی‌تواند در گذشته باشد.');
      valid = false;
    }

    if (!TIME_SLOTS.includes(time)) {
      setError('time', 'ساعت نوبت را انتخاب کن.');
      valid = false;
    }

    if (!valid) {
      form.querySelector('.field.has-error input, .field.has-error select')?.focus();
      return null;
    }

    return { name, phone, email, date, time, notes };
  }

  function renderSummary() {
    summaryBox.innerHTML = `
      <div class="summary-row"><span>خدمت</span><strong>${CLEANING_SERVICE.title}</strong></div>
      <div class="summary-row"><span>تاریخ</span><strong>${formatDate(draft.date)}</strong></div>
      <div class="summary-row"><span>ساعت</span><strong>${formatTime(draft.time)}</strong></div>
      <div class="summary-row"><span>مدت جلسه</span><strong>۴۵ دقیقه</strong></div>
      <div class="summary-row"><span>نام</span><strong>${escapeHtml(draft.name)}</strong></div>
      <div class="summary-row"><span>موبایل</span><strong dir="ltr">${escapeHtml(draft.phone)}</strong></div>
      <div class="summary-row summary-total"><span>مبلغ قابل پرداخت</span><strong>${formatPrice(CLEANING_SERVICE.price)}</strong></div>
    `;
  }

  function paymentFailed(error) {
    console.error('[paypal]', error);
    payNote.classList.add('is-warn');
    payNote.textContent = 'اتصال به پی‌پال برقرار نشد. می‌توانی از پرداخت آزمایشی استفاده کنی.';
    demoButton.hidden = false;
    demoButton.disabled = false;
  }

  function setupPayment() {
    paypalBox.innerHTML = '';
    demoButton.hidden = true;
    demoButton.disabled = false;
    payNote.className = 'pay-note';
    payNote.textContent = '';
    payAmount.textContent = formatPrice(CLEANING_SERVICE.price);

    if (!paypalConfigured()) {
      payNote.classList.add('is-warn');
      payNote.textContent = 'کلید پی‌پال هنوز تنظیم نشده است؛ این پرداخت آزمایشی است و مبلغی کسر نمی‌شود.';
      demoButton.hidden = false;
      return;
    }

    payNote.textContent = 'پرداخت در پنجره‌ی امن پی‌پال انجام می‌شود؛ اطلاعات کارت روی این سایت ذخیره نمی‌شود.';

    renderPaypalButtons(paypalBox, {
      amount: CLEANING_SERVICE.price,
      currency: CLEANING_SERVICE.currency,
      description: `DentOrbit dental cleaning - ${draft.date} ${draft.time}`,
      onApproved: (order) =>
        finishBooking({ provider: 'paypal', mode: 'live', id: order.id, status: order.status }),
      onFailed: paymentFailed,
    }).catch(paymentFailed);
  }

  function finishBooking(payment) {
    const booking = {
      id: globalThis.crypto?.randomUUID?.() || `bk_${Date.now()}`,
      code: createBookingCode(),
      service: CLEANING_SERVICE.id,
      name: draft.name,
      phone: draft.phone,
      email: draft.email,
      date: draft.date,
      time: draft.time,
      notes: draft.notes,
      price: CLEANING_SERVICE.price,
      currency: CLEANING_SERVICE.currency,
      payment,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);

    ticketBox.innerHTML = `
      <div class="ticket-row ticket-code"><span>کد رزرو</span><strong>${escapeHtml(booking.code)}</strong></div>
      <div class="ticket-row"><span>خدمت</span><strong>${CLEANING_SERVICE.title}</strong></div>
      <div class="ticket-row"><span>زمان</span><strong>${formatDate(booking.date)} · ${formatTime(booking.time)}</strong></div>
      <div class="ticket-row"><span>مبلغ</span><strong>${formatPrice(booking.price)}</strong></div>
      <div class="ticket-row"><span>وضعیت پرداخت</span><strong>${payment.mode === 'demo' ? 'پرداخت آزمایشی' : 'پرداخت‌شده با پی‌پال'}</strong></div>
    `;

    setStep(3);
    window.dispatchEvent(new CustomEvent('bookings:changed'));
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = readForm();
    if (!data) return;
    draft = data;
    renderSummary();
    setupPayment();
    setStep(2);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  backButton.addEventListener('click', () => setStep(1));

  demoButton.addEventListener('click', () => {
    if (!draft) return;
    demoButton.disabled = true;
    finishBooking({
      provider: 'paypal',
      mode: 'demo',
      id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      status: 'COMPLETED',
    });
  });

  function reset() {
    if (currentStep !== 3) return;
    draft = null;
    form.reset();
    clearErrors();
    dateInput.min = todayISO();
    dateInput.value = todayISO();
    paypalBox.innerHTML = '';
    payNote.textContent = '';
    payNote.className = 'pay-note';
    demoButton.hidden = true;
    ticketBox.innerHTML = '';
    setStep(1);
  }

  setStep(1);
  controller = { reset };
}
