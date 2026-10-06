/* ==========================================================================
   AYDIN TRANSPORT & LOGISTIK — Interactions
   Sticky header · Curtain menu · Reveals · Counters · Carousel · Form · Cursor
   Loaded after i18n.js and layout.js.
   ========================================================================== */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const raf = (fn) => window.requestAnimationFrame(fn);

  /* ------------------------------------------------------- Sticky header */
  function applyHeaderState() {
    const header = document.getElementById("siteHeader");
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  function initHeader() {
    if (!document.getElementById("siteHeader")) return;
    applyHeaderState();

    if (initHeader.bound) return;
    initHeader.bound = true;

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          raf(() => {
            applyHeaderState();
            ticking = false;
          });
        }
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------- Mobile menu */
  /* Header and menu are re-rendered on a language change, so these helpers
     always work from the elements that are in the document right now. */
  function openMenu(menu, toggle) {
    menu.classList.add("is-open");
    document.body.classList.add("menu-open", "is-locked");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", window.AydinI18n.t("common.closeMenu"));
  }

  function closeMenu(menu, toggle) {
    if (menu) menu.classList.remove("is-open");
    document.body.classList.remove("menu-open", "is-locked");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", window.AydinI18n.t("common.menuOpen"));
    }
  }

  function initMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      menu.classList.contains("is-open") ? closeMenu(menu, toggle) : openMenu(menu, toggle);
    });

    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => closeMenu(menu, toggle))
    );

    if (initMenu.bound) return;
    initMenu.bound = true;

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const currentMenu = document.getElementById("mobileMenu");
      const currentToggle = document.querySelector(".nav-toggle");
      if (!currentMenu || !currentMenu.classList.contains("is-open")) return;
      closeMenu(currentMenu, currentToggle);
      currentToggle?.focus();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) {
        closeMenu(document.getElementById("mobileMenu"), document.querySelector(".nav-toggle"));
      }
    });
  }

  /* --------------------------------------------------- Scroll reveals */
  function initReveals() {
    const groups = document.querySelectorAll("[data-reveal-group]");
    groups.forEach((group) => {
      const step = Number(group.dataset.revealGroup) || 90;
      group.querySelectorAll("[data-reveal]").forEach((el, i) => {
        if (!el.style.getPropertyValue("--reveal-delay")) {
          el.style.setProperty("--reveal-delay", `${i * step}ms`);
        }
      });
    });

    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    items.forEach((el) => {
      if (el.classList.contains("hero__anim")) return;
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------- Counters */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || "";

      if (prefersReduced) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }

      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (progress < 1) raf(tick);
      };

      raf(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------- Carousel */
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((root) => {
      const track = root.querySelector(".carousel__track");
      if (!track) return;

      const prev = root.querySelector("[data-carousel-prev]");
      const next = root.querySelector("[data-carousel-next]");

      const step = () => {
        const card = track.querySelector(".carousel__track > *");
        const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        return (card ? card.getBoundingClientRect().width : 320) + gap;
      };

      const update = () => {
        const max = track.scrollWidth - track.clientWidth - 4;
        if (prev) prev.disabled = track.scrollLeft <= 4;
        if (next) next.disabled = track.scrollLeft >= max;
      };

      prev &&
        prev.addEventListener("click", () =>
          track.scrollBy({ left: -step(), behavior: prefersReduced ? "auto" : "smooth" })
        );
      next &&
        next.addEventListener("click", () =>
          track.scrollBy({ left: step(), behavior: prefersReduced ? "auto" : "smooth" })
        );

      let down = false;
      let dragged = false;
      let startX = 0;
      let startScroll = 0;

      track.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "touch") return;
        down = true;
        dragged = false;
        startX = event.clientX;
        startScroll = track.scrollLeft;
      });

      track.addEventListener("pointermove", (event) => {
        if (!down) return;
        const delta = event.clientX - startX;
        if (!dragged && Math.abs(delta) > 6) {
          dragged = true;
          track.classList.add("is-dragging");
          track.setPointerCapture?.(event.pointerId);
        }
        if (dragged) track.scrollLeft = startScroll - delta;
      });

      const release = () => {
        if (!down) return;
        down = false;
        track.classList.remove("is-dragging");
      };

      track.addEventListener("pointerup", release);
      track.addEventListener("pointercancel", release);
      track.addEventListener("pointerleave", release);

      track.addEventListener(
        "click",
        (event) => {
          if (dragged) {
            event.preventDefault();
            event.stopPropagation();
            dragged = false;
          }
        },
        true
      );

      track.addEventListener("scroll", () => raf(update), { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  /* --------------------------------------------------------- Accordion */
  function initAccordions() {
    document.querySelectorAll(".accordion").forEach((accordion) => {
      accordion.querySelectorAll(".accordion__item").forEach((item) => {
        const trigger = item.querySelector(".accordion__trigger");
        const panel = item.querySelector(".accordion__panel");
        if (!trigger || !panel) return;

        trigger.addEventListener("click", () => {
          const isOpen = item.classList.toggle("is-open");
          trigger.setAttribute("aria-expanded", String(isOpen));
          panel.setAttribute("aria-hidden", String(!isOpen));
        });
      });
    });
  }

  /* -------------------------------------------------------------- Forms */
  function initForms() {
    document.querySelectorAll("[data-form]").forEach((form) => {
      const success = form.querySelector(".form-success");

      const setError = (field, message) => {
        const wrapper = field.closest(".field") || field.closest(".checkbox");
        if (!wrapper) return;
        wrapper.classList.toggle("field--error", Boolean(message));
        const slot = wrapper.querySelector(".field__error");
        if (slot) slot.textContent = message || "";
      };

      const t = (key) => window.AydinI18n.t(key);

      const validate = (field) => {
        const value = (field.value || "").trim();
        if (field.required && !value) return t("ct.f.required");
        if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
          return t("ct.f.invalidEmail");
        if (field.type === "checkbox" && field.required && !field.checked)
          return t("ct.f.confirm");
        return "";
      };

      form.querySelectorAll("input, select, textarea").forEach((field) => {
        field.addEventListener("blur", () => setError(field, validate(field)));
        field.addEventListener("input", () => {
          if ((field.closest(".field") || field.closest(".checkbox"))?.classList.contains("field--error")) {
            setError(field, validate(field));
          }
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        let firstInvalid = null;

        form.querySelectorAll("input, select, textarea").forEach((field) => {
          const message = validate(field);
          setError(field, message);
          if (message && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        const payload = Object.fromEntries(new FormData(form).entries());
        payload.submittedAt = new Date().toISOString();

        try {
          const stored = JSON.parse(localStorage.getItem("aydin_requests") || "[]");
          stored.push(payload);
          localStorage.setItem("aydin_requests", JSON.stringify(stored));
        } catch (error) {
          /* storage unavailable — the confirmation below still applies */
        }

        if (success) {
          success.classList.add("is-visible");
          success.focus?.();
        }
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------- Cursor */
  function initCursor() {
    if (!finePointer || prefersReduced) return;

    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = '<span class="cursor-ring__label"></span>';
    document.body.appendChild(ring);

    const label = ring.querySelector(".cursor-ring__label");
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = pointerX;
    let currentY = pointerY;

    document.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        ring.classList.add("is-visible");
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => ring.classList.remove("is-visible"));

    const loop = () => {
      currentX += (pointerX - currentX) * 0.18;
      currentY += (pointerY - currentY) * 0.18;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf(loop);
    };
    raf(loop);

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => {
        label.textContent = el.dataset.cursor;
        ring.classList.add("is-active");
      });
      el.addEventListener("pointerleave", () => {
        ring.classList.remove("is-active");
      });
    });
  }

  /* ----------------------------------------------------------- Parallax */
  function initParallax() {
    const layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length || prefersReduced) return;

    let ticking = false;

    const apply = () => {
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax) || 0.15;
        const rect = layer.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          raf(apply);
        }
      },
      { passive: true }
    );
    apply();
  }

  /* --------------------------------------------------------------- Boot */
  function boot() {
    initHeader();
    initMenu();
    initReveals();
    initCounters();
    initCarousels();
    initAccordions();
    initForms();
    initCursor();
    initParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* The header and menu are rebuilt on every language change, so rebind them. */
  document.addEventListener("layout:rendered", () => {
    closeMenu(document.getElementById("mobileMenu"), document.querySelector(".nav-toggle"));
    initHeader();
    initMenu();
  });
})();
