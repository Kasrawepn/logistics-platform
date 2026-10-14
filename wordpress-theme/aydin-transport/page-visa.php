<?php
/**
 * Visa
 *
 * Generated from website/visa.html by wordpress-theme/build.py — edit the static
 * page and re-run the build instead of editing this file.
 */

/*
Template Name: Visa
*/

get_header();
?>

<main id="main">

  <section class="page-hero">
    <div class="page-hero__media" data-parallax="0.1">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-office.jpg' ) ); ?>" alt="Besprechungsraum von Aydın Transport & Logistik" fetchpriority="high">
    </div>
    <div class="page-hero__overlay"></div>
    <div class="container page-hero__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url( aydin_page_url( 'home' ) ); ?>" data-i18n="common.home">Startseite</a><span>/</span><span aria-current="page" data-i18n="nav.visa">Visa</span>
      </nav>
      <h1 data-i18n="visa.hero.title">Visa & Einwanderung</h1>
      <p data-i18n="visa.hero.lead">
        Professionelle Beratung für Visa- und Aufenthaltsanträge in europäische Länder.
      </p>
    </div>
  </section>

  <!-- ============================================================ INTRO -->
  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__text">
          <span class="eyebrow" data-reveal="fade" data-i18n="visa.intro.eyebrow">Danke, dass Sie uns kontaktieren</span>
          <h2 data-reveal data-i18n="visa.intro.title">Wie wir Ihnen helfen können</h2>
          <p class="lead" data-reveal data-i18n="visa.intro.lead">
            Unser Unternehmen bietet professionelle Beratung für Visa- und Aufenthaltsanträge
            in europäische Länder. Für Anträge in alle Länder Europas begleiten wir Sie vom
            Beginn des Verfahrens bis zum Abschluss.
          </p>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--navy" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="visa.cta.title">Beratung anfragen</a>
          </div>
        </div>
        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-team-1.jpg' ) ); ?>" alt="Beratung von Aydın Transport & Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================= SERVICES -->
  <section class="section section--soft">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="visa.services.eyebrow">Unsere Leistungen</span>
          <h2 class="section-head__title" data-reveal data-i18n="visa.services.title">Visum-Arten, die wir betreuen</h2>
        </div>
        <p data-reveal data-i18n="visa.services.lead">
          Vom Touristenvisum bis zum Aufenthaltsantrag — wir begleiten Sie bei jedem
          Antragsweg.
        </p>
      </div>

      <div class="visa-cards" data-reveal-group="80">
        <!-- Each card links to the visa registration page with the type pre-selected -->

        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=tourist' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8h10a2 2 0 0 1 2 2v9H5v-9a2 2 0 0 1 2-2Z"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M9 13h6"/></svg></div>
          <h3 data-i18n="visa.s1.title">Touristenvisum</h3>
          <p data-i18n="visa.s1.text">Für touristische Reisen in europäische Länder — mit allen erforderlichen Unterlagen.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=business' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/></svg></div>
          <h3 data-i18n="visa.s2.title">Geschäftsvisum</h3>
          <p data-i18n="visa.s2.text">Für geschäftliche Termine, Messen und Meetings in Europa.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=family-visit' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c0-3.1 2.5-5.2 5.5-5.2s5.5 2.1 5.5 5.2"/><path d="M16.2 5.6a3 3 0 0 1 0 5.6"/><path d="M17.6 14.8c1.9.5 3.1 2.2 3.1 4.7"/></svg></div>
          <h3 data-i18n="visa.s3.title">Familienbesuchsvisum</h3>
          <p data-i18n="visa.s3.text">Um Familie und Freunde in europäischen Ländern zu besuchen.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=student' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.4 12 5.4l9 4-9 4-9-4Z"/><path d="M7 11.6v4.6c0 1.1 2.2 2 5 2s5-.9 5-2v-4.6"/></svg></div>
          <h3 data-i18n="visa.s4.title">Studentenvisum</h3>
          <p data-i18n="visa.s4.text">Für Studium, Sprachkurse und Austauschprogramme in Europa.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=work' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 5.5 19 10l-7.5 7.5L7 13l7.5-7.5Z"/><path d="M14.5 5.5 17 3l3.5 3.5L18 9"/><path d="M7 13l-3 3v3h3l3-3"/></svg></div>
          <h3 data-i18n="visa.s5.title">Arbeitsvisum</h3>
          <p data-i18n="visa.s5.text">Für Beschäftigung und berufliche Tätigkeiten in europäischen Ländern.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=family-reunion' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6Z"/><path d="m9 12 2 2 4-4"/></svg></div>
          <h3 data-i18n="visa.s6.title">Familiennachzugsvisum</h3>
          <p data-i18n="visa.s6.text">Nachzug von Ehepartner und Kindern nach Europa.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
        <a class="card visa-card-link" data-reveal href="<?php echo esc_url( aydin_page_url( 'visa-register', '?type=residence' ) ); ?>">
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="3" width="15" height="18" rx="2"/><circle cx="12" cy="10.6" r="3.1"/><path d="M8.6 18h6.8"/></svg></div>
          <h3 data-i18n="visa.s7.title">Aufenthaltsanträge</h3>
          <p data-i18n="visa.s7.text">Anträge auf Aufenthaltserlaubnis und Verlängerung in europäischen Ländern.</p>
          <span class="visa-card-link__cta" data-i18n="nav.visaReg">Visum beantragen</span>
        </a>
      </div>

      <p class="visa-note" data-reveal="fade" data-i18n="svc.5.note" style="margin-top:2.5rem">
        Wir beraten und begleiten — wir sind keine Anwaltskanzlei und keine Behörde.
      </p>
    </div>
  </section>

  <section class="cta-band">
    <div class="cta-band__media" data-parallax="0.08">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-dark.jpg' ) ); ?>" alt="" aria-hidden="true" loading="lazy">
    </div>
    <div class="container cta-band__inner">
      <div class="cta-band__copy">
        <span class="eyebrow eyebrow--light" data-i18n="visa.cta.eyebrow">Nächster Schritt</span>
        <h2 data-i18n="visa.cta.title">Beratung anfragen</h2>
        <p style="color:rgba(255,255,255,.74)" data-i18n="visa.cta.text">
          Rufen Sie uns an oder schreiben Sie uns — wir begleiten Sie durch den gesamten
          Antragsprozess.
        </p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="visa.cta.title">Beratung anfragen</a>
        <a class="btn btn--ghost-light btn--lg" href="tel:+491608016659">☎ +49 160 801 66 59</a>
      </div>
    </div>
  </section>

</main>

<?php
get_footer();
