/* ==========================================================================
   AYDIN TRANSPORT & LOGISTIK — Shared layout components
   Injects the header and footer so every page stays in sync, and re-renders
   them whenever the language changes. Must be loaded after i18n.js and before
   main.js.
   ========================================================================== */

(function () {
  "use strict";

  const t = (key) => window.AydinI18n.t(key);

  const PHONE_DISPLAY = "+49 160 801 66 59";
  const PHONE_HREF = "tel:+491608016659";
  const EMAIL = "Aydinmuhammet601@gmail.com";

  const ICONS = {
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.5 3.7-2 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-2L19.6 13v3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 4 4.7 2 2 0 0 1 6 2.5"/></svg>',
    arrowRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
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
    <a class="brand${modifier ? " " + modifier : ""}" href="index.html" aria-label="Aydın Transport &amp; Logistik">
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
        `<li><a class="nav__link${item.page === page ? " is-active" : ""}" href="${item.href}"${
          item.page === page ? ' aria-current="page"' : ""
        }>${t(item.key)}</a></li>`
    ).join("");

    const mobileLinks = NAV.map(
      (item, i) =>
        `<li class="mobile-menu__item" style="--i:${i}"><a class="mobile-menu__link${
          item.page === page ? " is-active" : ""
        }" href="${item.href}"${item.page === page ? ' aria-current="page"' : ""}>${
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
              <a href="services.html#transporte">${t("footer.l.transport")}</a>
              <a href="services.html#direktfahrten">${t("footer.l.direct")}</a>
              <a href="services.html#express">${t("footer.l.express")}</a>
              <a href="services.html#kurier">${t("footer.l.courier")}</a>
              <a href="solutions.html">${t("footer.l.solutions")}</a>
            </nav>
          </div>
          <div class="footer-col">
            <h4>${t("footer.company")}</h4>
            <nav class="footer-links" aria-label="${t("footer.company")}">
              <a href="about.html">${t("nav.about")}</a>
              <a href="fleet.html">${t("nav.fleet")}</a>
              <a href="solutions.html">${t("nav.solutions")}</a>
              <a href="contact.html">${t("nav.contact")}</a>
              <a href="contact.html#quote">${t("footer.l.quote")}</a>
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
