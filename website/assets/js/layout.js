/* ==========================================================================
   HORIZON LOGISTICS — Shared layout components
   Injects the header and footer so every page stays in sync.
   Must be loaded before main.js.
   ========================================================================== */

(function () {
  "use strict";

  const ICONS = {
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.5 3.7-2 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-2L19.6 13v3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 4 4.7 2 2 0 0 1 6 2.5"/></svg>',
    arrowRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    arrowUpRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    chevronLeft:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>',
    chevronRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6l6 6-6 6"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.4 2"/></svg>',
    truck:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7.5h10.5v9H2z"/><path d="M12.5 11h4.2l2.3 3v2.5h-6.5z"/><circle cx="6.4" cy="18.5" r="1.6"/><circle cx="16.4" cy="18.5" r="1.6"/></svg>',
    globe:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>',
    shield:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6Z"/><path d="m9 12 2 2 4-4"/></svg>',
    layers:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/></svg>',
    quote:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.4 5.2c-3.4 1.6-5.4 4.6-5.4 8.3 0 3.2 1.8 5.3 4.5 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1.1.2.4-1.8 1.7-3.3 3.6-4.3Zm10.2 0c-3.4 1.6-5.4 4.6-5.4 8.3 0 3.2 1.8 5.3 4.5 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1.1.2.4-1.8 1.7-3.3 3.6-4.3Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3zM10 9.5h3.8v1.5c.6-1 1.8-1.8 3.4-1.8 2.8 0 3.8 1.7 3.8 4.6v6.7h-4v-6c0-1.5-.5-2.4-1.8-2.4-1.1 0-1.8.8-1.8 2.4v6H10Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.2l-7 8 7.3 10h-5.8l-4.5-6.3L4.8 21H1.6l7.4-8.4L2 3h5.9l4.2 5.9Zm-1 16h1.7L7.4 4.7H5.6Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>',
  };

  const NAV = [
    { label: "Home", href: "index.html", page: "home" },
    { label: "Services", href: "services.html", page: "services" },
    { label: "About Us", href: "about.html", page: "about" },
    { label: "Solutions", href: "solutions.html", page: "solutions" },
    { label: "Fleet", href: "fleet.html", page: "fleet" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ];

  const PHONE_DISPLAY = "(555) 246-7890";
  const PHONE_HREF = "tel:+15552467890";

  const brandMark = (size) =>
    `<span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"${
      size ? ` width="${size}" height="${size}"` : ""
    }><path d="M10.5 7v26M29.5 7v26" stroke="#fff" stroke-width="3.3" stroke-linecap="round"/><path d="M8.6 23.4c3.8-6.6 19-6.6 22.8 0" stroke="#C5A059" stroke-width="3.3" stroke-linecap="round"/></svg></span>`;

  const brandBlock = (modifier) => `
    <a class="brand${modifier ? " " + modifier : ""}" href="index.html" aria-label="Horizon Logistics — home">
      ${brandMark()}
      <span class="brand__text">
        <span class="brand__name">Horizon</span>
        <span class="brand__sub">Logistics</span>
      </span>
    </a>`;

  function headerMarkup(page) {
    const links = NAV.map(
      (item) =>
        `<li><a class="nav__link${item.page === page ? " is-active" : ""}" href="${item.href}"${
          item.page === page ? ' aria-current="page"' : ""
        }>${item.label}</a></li>`
    ).join("");

    const mobileLinks = NAV.map(
      (item, i) =>
        `<li class="mobile-menu__item" style="--i:${i}"><a class="mobile-menu__link${
          item.page === page ? " is-active" : ""
        }" href="${item.href}"${item.page === page ? ' aria-current="page"' : ""}>${
          item.label
        }<span>0${i + 1}</span></a></li>`
    ).join("");

    return `
    <header class="site-header" id="siteHeader">
      <div class="site-header__inner container">
        ${brandBlock()}
        <nav class="nav" aria-label="Primary">
          <ul class="nav__list">${links}</ul>
        </nav>
        <div class="site-header__actions">
          <a class="btn btn--phone" href="${PHONE_HREF}">
            ${ICONS.phone}<span>${PHONE_DISPLAY}</span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu">
            <span class="nav-toggle__bars"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <div>
        <ul class="mobile-menu__list">${mobileLinks}</ul>
      </div>
      <div class="mobile-menu__foot">
        <div class="mobile-menu__meta">
          <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>
          <a href="mailto:hello@horizonlogistics.com">hello@horizonlogistics.com</a>
          <span>Horizon Logistics HQ · Rotterdam, Netherlands</span>
        </div>
        <div class="socials">
          <a href="#" aria-label="Horizon Logistics on LinkedIn">${ICONS.linkedin}</a>
          <a href="#" aria-label="Horizon Logistics on X">${ICONS.x}</a>
          <a href="#" aria-label="Horizon Logistics on Instagram">${ICONS.instagram}</a>
        </div>
      </div>
    </div>`;
  }

  function footerMarkup() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-thread">${brandBlock()}</div>
        <div class="footer-grid">
          <div class="footer-col">
            <h4>The Horizon Standard</h4>
            <p>
              Freight moved with precision since 1998. Road, air and sea forwarding,
              contract warehousing and end-to-end supply chain visibility across Europe
              and 120 countries.
            </p>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <nav class="footer-links" aria-label="Services">
              <a href="services.html#road">Road Freight</a>
              <a href="services.html#warehousing">Warehousing</a>
              <a href="services.html#express">Express Delivery</a>
              <a href="services.html#contract">Contract Logistics</a>
              <a href="solutions.html">Supply Chain Solutions</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <nav class="footer-links" aria-label="Company">
              <a href="about.html">About Us</a>
              <a href="fleet.html">Our Fleet</a>
              <a href="solutions.html#industries">Industries</a>
              <a href="contact.html">Contact</a>
              <a href="contact.html#quote">Request a Quote</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <div class="footer-contact">
              <div class="footer-contact__row">${ICONS.pin}<span>Havenstraat 118, 3011 Rotterdam, Netherlands</span></div>
              <div class="footer-contact__row">${ICONS.phone}<a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></div>
              <div class="footer-contact__row">${ICONS.mail}<a href="mailto:hello@horizonlogistics.com">hello@horizonlogistics.com</a></div>
              <div class="footer-contact__row">${ICONS.clock}<span>Dispatch desk 24/7 · Office Mon–Fri 08:00–18:00</span></div>
            </div>
          </div>
        </div>
        <div class="footer-bar">
          <span>© <span data-year>2026</span> Horizon Logistics B.V. All rights reserved.</span>
          <nav class="footer-bar__links" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Carriage</a>
            <a href="#">Compliance</a>
          </nav>
          <div class="socials">
            <a href="#" aria-label="Horizon Logistics on LinkedIn">${ICONS.linkedin}</a>
            <a href="#" aria-label="Horizon Logistics on X">${ICONS.x}</a>
            <a href="#" aria-label="Horizon Logistics on Instagram">${ICONS.instagram}</a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  function mount() {
    const page = document.body.dataset.page || "";

    const headerSlot = document.querySelector('[data-component="header"]');
    if (headerSlot) headerSlot.outerHTML = headerMarkup(page);

    const footerSlot = document.querySelector('[data-component="footer"]');
    if (footerSlot) footerSlot.outerHTML = footerMarkup();

    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
