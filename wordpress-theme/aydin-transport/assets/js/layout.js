/* ==========================================================================
   AYDIN TRANSPORT & LOGISTIK — Shared layout components
   Injects the header and footer so every page stays in sync, and re-renders
   them whenever the language changes. Must be loaded after i18n.js and before
   main.js.
   ========================================================================== */

(function () {
  "use strict";

  const t = (key) => window.AydinI18n.t(key);

  /* A host with its own routing — the WordPress theme in wordpress-theme/ —
     hands in real URLs for these page names through window.AydinSiteUrls. The
     static site has no such object and falls back to the .html files. */
  const url = (href) => (window.AydinSiteUrls && window.AydinSiteUrls[href]) || href;

  const PHONE_DISPLAY = "+49 160 801 66 59";
  const PHONE_HREF = "tel:+491608016659";
  const EMAIL = "Aydinmuhammet601@gmail.com";
  const WHATSAPP_HREF = "https://wa.me/491608016659";

  const ICONS = {
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.5 3.7-2 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-2L19.6 13v3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 4 4.7 2 2 0 0 1 6 2.5"/></svg>',
    arrowRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    whatsapp:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.88 1.22 3.08.15.2 2.11 3.22 5.1 4.52.72.31 1.28.5 1.71.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/><path d="M12.05 2.02c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.33 4.99L2 22.1l5.28-1.39c1.46.8 3.11 1.22 4.77 1.22 5.5 0 9.97-4.47 9.97-9.97s-4.47-9.94-9.97-9.94Zm0 18.12h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.14.82.84-3.06-.19-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.57 3.73-8.29 8.3-8.29 2.22 0 4.3.87 5.87 2.44a8.25 8.25 0 0 1 2.43 5.86c0 4.57-3.73 8.29-8.29 8.29Z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.4 2"/></svg>',
  };

  const NAV = [
    { key: "nav.home", href: "index.html", page: "home" },
    { key: "nav.services", href: "services.html", page: "services" },
    { key: "nav.about", href: "about.html", page: "about" },
    { key: "nav.solutions", href: "solutions.html", page: "solutions" },
    { key: "nav.fleet", href: "fleet.html", page: "fleet" },
    { key: "nav.contact", href: "contact.html", page: "contact" },
  ];

  /* The Aydın mark: a stylised "A" with a gold arc sweeping through it. */
  const brandMark = () =>
    `<span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none">
      <path d="M12 33.5 20 7l8 26.5" stroke="#fff" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.4 24.6h9.2" stroke="#C5A059" stroke-width="3" stroke-linecap="round"/>
      <path d="M7.5 30.5c5-9.5 13.5-14 27-15" stroke="#C5A059" stroke-width="3" stroke-linecap="round"/>
    </svg></span>`;

  const brandBlock = (modifier) => `
    <a class="brand${modifier ? " " + modifier : ""}" href="${url("index.html")}" aria-label="Aydın Transport &amp; Logistik">
      ${brandMark()}
      <span class="brand__text">
        <span class="brand__name">Aydın</span>
        <span class="brand__sub">Transport &amp; Logistik</span>
      </span>
    </a>`;

  const langSwitch = () => `
    <div class="lang-switch" role="group" aria-label="${t("common.language")}">
      ${window.AydinI18n.langs
        .map(
          (code) =>
            `<button class="lang-switch__btn${
              code === window.AydinI18n.lang() ? " is-active" : ""
            }" type="button" data-lang="${code}" aria-pressed="${
              code === window.AydinI18n.lang()
            }">${code.toUpperCase()}</button>`
        )
        .join("")}
    </div>`;

  function headerMarkup(page) {
    const links = NAV.map(
      (item) =>
        `<li><a class="nav__link${item.page === page ? " is-active" : ""}" href="${url(item.href)}"${
          item.page === page ? ' aria-current="page"' : ""
        }>${t(item.key)}</a></li>`
    ).join("");

    const mobileLinks = NAV.map(
      (item, i) =>
        `<li class="mobile-menu__item" style="--i:${i}"><a class="mobile-menu__link${
          item.page === page ? " is-active" : ""
        }" href="${url(item.href)}"${item.page === page ? ' aria-current="page"' : ""}>${
          t(item.key)
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
          ${langSwitch()}
          <a class="btn btn--phone" href="${PHONE_HREF}">
            ${ICONS.phone}<span>${PHONE_DISPLAY}</span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="${t("common.menuOpen")}">
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
        ${langSwitch()}
        <div class="mobile-menu__meta">
          <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <span>${t("address")}</span>
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
            <h4>${t("footer.aboutTitle")}</h4>
            <p>${t("footer.aboutText")}</p>
          </div>
          <div class="footer-col">
            <h4>${t("footer.services")}</h4>
            <nav class="footer-links" aria-label="${t("footer.services")}">
              <a href="${url("services.html#transporte")}">${t("footer.l.transport")}</a>
              <a href="${url("services.html#direktfahrten")}">${t("footer.l.direct")}</a>
              <a href="${url("services.html#express")}">${t("footer.l.express")}</a>
              <a href="${url("services.html#kurier")}">${t("footer.l.courier")}</a>
              <a href="${url("solutions.html")}">${t("footer.l.solutions")}</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>${t("footer.company")}</h4>
            <nav class="footer-links" aria-label="${t("footer.company")}">
              <a href="${url("about.html")}">${t("nav.about")}</a>
              <a href="${url("fleet.html")}">${t("nav.fleet")}</a>
              <a href="${url("solutions.html")}">${t("nav.solutions")}</a>
              <a href="${url("contact.html")}">${t("nav.contact")}</a>
              <a href="${url("contact.html#quote")}">${t("footer.l.quote")}</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>${t("footer.contact")}</h4>
            <div class="footer-contact">
              <div class="footer-contact__row">${ICONS.pin}<span>${t("address")}</span></div>
              <div class="footer-contact__row">${ICONS.phone}<a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></div>
              <div class="footer-contact__row">${ICONS.mail}<a href="mailto:${EMAIL}">${EMAIL}</a></div>
              <div class="footer-contact__row">${ICONS.clock}<span>${t("footer.hours")}</span></div>
            </div>
          </div>
        </div>
        <div class="footer-bar">
          <span>© <span data-year>2026</span> Aydın Transport &amp; Logistik. ${t("footer.rights")}</span>
          <nav class="footer-bar__links" aria-label="Legal">
            <a href="#">${t("footer.legal.imprint")}</a>
            <a href="#">${t("footer.legal.privacy")}</a>
            <a href="#">${t("footer.legal.terms")}</a>
          </nav>
        </div>
      </div>
    </footer>`;
  }

  /* Two floating quick-contact buttons (WhatsApp + phone). They are pinned to
     the viewport, so they stay on screen while the page scrolls, and are
     injected here so every page gets them without touching the page markup. */
  function quickContactMarkup() {
    return `
      <a class="quick-contact__btn quick-contact__btn--whatsapp" href="${WHATSAPP_HREF}" target="_blank" rel="noopener" aria-label="${t(
      "common.whatsapp"
    )}" title="${t("common.whatsapp")}">${ICONS.whatsapp}</a>
      <a class="quick-contact__btn quick-contact__btn--call" href="${PHONE_HREF}" aria-label="${t(
      "common.call"
    )}" title="${t("common.call")}">${ICONS.phone}</a>`;
  }

  function renderQuickContact() {
    let host = document.getElementById("quickContact");
    if (!host) {
      host = document.createElement("div");
      host.id = "quickContact";
      host.className = "quick-contact";
      document.body.appendChild(host);
    }
    host.innerHTML = quickContactMarkup();
  }

  function stampYears() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  function bindLangSwitch(scope) {
    scope.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.addEventListener("click", () => window.AydinI18n.set(btn.dataset.lang));
    });
  }

  /* The slots stay in the document and are refilled, so a language change can
     render the header (and the curtain menu it contains) again. */
  function render() {
    const page = document.body.dataset.page || "";

    const headerSlot = document.querySelector('[data-component="header"]');
    if (headerSlot) {
      headerSlot.innerHTML = headerMarkup(page);
      bindLangSwitch(headerSlot);
    }

    const footerSlot = document.querySelector('[data-component="footer"]');
    if (footerSlot) footerSlot.innerHTML = footerMarkup();

    renderQuickContact();

    stampYears();
  }

  window.AydinLayout = { render };

  window.AydinI18n.onChange(() => {
    render();
    document.dispatchEvent(new CustomEvent("layout:rendered"));
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
