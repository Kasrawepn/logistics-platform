/* ==========================================================================
   AYDIN TRANSPORT & LOGISTIK — Visa registration multi-step form
   Loaded after i18n.js, layout.js, main.js. Handles step navigation, visa-type
   selection (from card click or URL param), and the review summary. The actual
   form submission is handled by main.js (data-form → /api/contact).
   ========================================================================== */

(function () {
  "use strict";

  var t = function (key) { return window.AydinI18n ? window.AydinI18n.t(key) : ""; };

  /* Visa type → i18n key for the title */
  var TYPE_KEYS = {
    "tourist": "visa.s1.title",
    "business": "visa.s2.title",
    "family-visit": "visa.s3.title",
    "student": "visa.s4.title",
    "work": "visa.s5.title",
    "family-reunion": "visa.s6.title",
    "residence": "visa.s7.title",
  };

  var selectedType = "";

  function getTypeLabel(type) {
    var key = TYPE_KEYS[type];
    return key ? t(key) : type;
  }

  function showStep(n) {
    document.querySelectorAll("[data-vr-panel]").forEach(function (panel) {
      var num = panel.getAttribute("data-vr-panel");
      var isActive = num === String(n);
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
    document.querySelectorAll("[data-step-indicator]").forEach(function (ind) {
      var num = Number(ind.getAttribute("data-step-indicator"));
      ind.classList.toggle("is-active", num <= n);
      ind.classList.toggle("is-done", num < n);
    });
    var form = document.querySelector("[data-vr-review]");
    if (n === 3) buildReview();
    var top = document.querySelector(".vr-steps");
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectType(type) {
    selectedType = type;
    var serviceInput = document.querySelector("[data-vr-service]");
    if (serviceInput) serviceInput.value = "Visum: " + getTypeLabel(type);

    document.querySelectorAll("[data-vr-types] .vr-type-card").forEach(function (card) {
      card.classList.toggle("is-selected", card.getAttribute("data-visa-type") === type);
    });

    var label = document.querySelector("[data-vr-selected-type]");
    if (label) label.textContent = getTypeLabel(type);
  }

  function validateStep(n) {
    var panel = document.querySelector('[data-vr-panel="' + n + '"]');
    if (!panel) return true;
    var ok = true;
    panel.querySelectorAll("input[required], textarea[required], select[required]").forEach(function (field) {
      var wrapper = field.closest(".field") || field.closest(".checkbox");
      var value = (field.value || "").trim();
      var error = "";
      if (!value) error = t("ct.f.required");
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) error = t("ct.f.invalidEmail");
      if (wrapper) {
        wrapper.classList.toggle("field--error", Boolean(error));
        var slot = wrapper.querySelector(".field__error");
        if (slot) slot.textContent = error;
      }
      if (error) ok = false;
    });
    return ok;
  }

  function buildReview() {
    var container = document.querySelector("[data-vr-review]");
    if (!container) return;
    var name = document.getElementById("vr-name");
    var email = document.getElementById("vr-email");
    var phone = document.getElementById("vr-phone");
    var nationality = document.getElementById("vr-nationality");
    var destination = document.getElementById("vr-destination");
    var message = document.getElementById("vr-message");

    var rows = [
      { label: t("vr.selected"), value: getTypeLabel(selectedType) },
      { label: t("vr.f.name"), value: name ? name.value : "" },
      { label: t("vr.f.email"), value: email ? email.value : "" },
      { label: t("vr.f.phone"), value: phone ? phone.value : "" },
      { label: t("vr.f.nationality"), value: nationality ? nationality.value : "" },
      { label: t("vr.f.destination"), value: destination ? destination.value : "" },
      { label: t("vr.f.message"), value: message ? message.value : "" },
    ];

    container.innerHTML = rows
      .filter(function (r) { return r.value; })
      .map(function (r) {
        return '<div class="vr-review__row"><span class="vr-review__label">' + r.label + '</span><span class="vr-review__value">' + r.value + '</span></div>';
      })
      .join("");
  }

  function init() {
    var root = document.querySelector("[data-vr-types]");
    if (!root) return;

    /* Type selection: click a card → select & advance to step 2 */
    root.querySelectorAll(".vr-type-card").forEach(function (card) {
      var handler = function () {
        selectType(card.getAttribute("data-visa-type"));
        showStep(2);
      };
      card.addEventListener("click", handler);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler();
        }
      });
    });

    /* Navigation buttons */
    document.querySelectorAll("[data-vr-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var currentPanel = btn.closest("[data-vr-panel]");
        var n = currentPanel ? Number(currentPanel.getAttribute("data-vr-panel")) : 1;
        if (validateStep(n)) showStep(n + 1);
      });
    });

    document.querySelectorAll("[data-vr-prev]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var currentPanel = btn.closest("[data-vr-panel]");
        var n = currentPanel ? Number(currentPanel.getAttribute("data-vr-panel")) : 2;
        showStep(n - 1);
      });
    });

    document.querySelectorAll("[data-vr-back-to-1]").forEach(function (btn) {
      btn.addEventListener("click", function () { showStep(1); });
    });

    /* Pre-select from URL param: visa-register.html?type=work */
    var params = new URLSearchParams(window.location.search);
    var preset = params.get("type");
    if (preset && TYPE_KEYS[preset]) {
      selectType(preset);
      showStep(2);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
