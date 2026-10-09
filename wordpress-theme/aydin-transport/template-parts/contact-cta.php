<?php
/**
 * Contact card that replaces the on-site form.
 *
 * The static site posts the enquiry to a small Node service that sends it by
 * mail. The owner's hosting runs WordPress only — that service cannot run there
 * — so the contact page offers WhatsApp and the phone number instead.
 */
?>
<div class="contact-cta">
  <div class="contact-cta__actions">
    <a class="btn btn--whatsapp btn--lg" href="https://wa.me/491608016659" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.88 1.22 3.08.15.2 2.11 3.22 5.1 4.52.72.31 1.28.5 1.71.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/><path d="M12.05 2.02c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.33 4.99L2 22.1l5.28-1.39c1.46.8 3.11 1.22 4.77 1.22 5.5 0 9.97-4.47 9.97-9.97s-4.47-9.94-9.97-9.94Zm0 18.12h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.14.82.84-3.06-.19-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.57 3.73-8.29 8.3-8.29 2.22 0 4.3.87 5.87 2.44a8.25 8.25 0 0 1 2.43 5.86c0 4.57-3.73 8.29-8.29 8.29Z"/></svg>
      <span data-i18n="common.whatsapp">WhatsApp schreiben</span>
    </a>
    <a class="btn btn--gold btn--lg" href="tel:+491608016659">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.5 3.7-2 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-2L19.6 13v3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 4 4.7 2 2 0 0 1 6 2.5"/></svg>
      <span>+49 160 801 66 59</span>
    </a>
  </div>
</div>
