<?php
/**
 * Lösungen
 *
 * Generated from website/solutions.html by wordpress-theme/build.py — edit the static
 * page and re-run the build instead of editing this file.
 */

/*
Template Name: Lösungen
*/

get_header();
?>

<main id="main">

  <section class="page-hero">
    <div class="page-hero__media" data-parallax="0.1">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-trucks.jpg' ) ); ?>" alt="Transportfahrzeuge von Aydın Transport &amp; Logistik" fetchpriority="high">
    </div>
    <div class="page-hero__overlay"></div>
    <div class="container page-hero__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url( aydin_page_url( 'home' ) ); ?>" data-i18n="common.home">Startseite</a><span>/</span><span aria-current="page" data-i18n="nav.solutions">Lösungen</span>
      </nav>
      <h1 data-i18n="sol.hero.title">Lösungen für jede Sendung</h1>
      <p data-i18n="sol.hero.lead">
        Ob einzelne Palette, Umzug oder regelmäßiger Firmenverkehr: Wir passen Fahrzeug und
        Ablauf an Ihre Sendung an.
      </p>
    </div>
  </section>

  <!-- ======================================================== APPROACH -->
  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__text">
          <span class="eyebrow" data-reveal="fade" data-i18n="sol.approach.eyebrow">Unser Ansatz</span>
          <h2 data-reveal data-i18n="sol.approach.title">Erst fragen, dann fahren</h2>
          <p class="lead" data-reveal data-i18n="sol.approach.lead">
            Wir klären Umfang, Termin und Besonderheiten, bevor die Fahrt beginnt. So gibt es
            unterwegs keine Überraschungen.
          </p>
          <ul class="feature-list" data-reveal-group="80">
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.approach.b1"><strong>Klare Absprache</strong> zu Termin, Umfang und Preis.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.approach.b2"><strong>Passendes Fahrzeug</strong> für Ihre Sendung.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.approach.b3"><strong>Rückmeldung bei der Zustellung.</strong></span></li>
          </ul>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--navy" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="sol.approach.cta">Transport anfragen</a>
          </div>
        </div>
        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom" data-cursor="Planung" data-i18n-attr="data-cursor:sol.approach.eyebrow">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-office.jpg' ) ); ?>" alt="Besprechungsraum von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================= WHO -->
  <section class="section section--soft">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="sol.who.eyebrow">Für wen wir fahren</span>
          <h2 class="section-head__title" data-reveal data-i18n="sol.who.title">Privatkunden und Unternehmen</h2>
        </div>
        <p data-reveal data-i18n="sol.who.lead">
          Jede Sendung bekommt denselben sorgfältigen Ablauf — nur der Umfang unterscheidet
          sich.
        </p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1.25rem" data-reveal-group="80">
        <article class="card" data-reveal>
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 18V9l8-5 8 5v9"/><path d="M9 18v-6h6v6"/></svg></div>
          <h3 data-i18n="sol.w1.title">Privatkunden</h3>
          <p data-i18n="sol.w1.text">Einzeltransporte, Möbel und Hausrat nach Absprache — sorgfältig verladen und direkt zugestellt.</p>
        </article>
        <article class="card" data-reveal>
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7.5h10.5v9H2z"/><path d="M12.5 11h4.2l2.3 3v2.5h-6.5z"/><circle cx="6.4" cy="18.5" r="1.6"/><circle cx="16.4" cy="18.5" r="1.6"/></svg></div>
          <h3 data-i18n="sol.w2.title">Geschäftskunden</h3>
          <p data-i18n="sol.w2.text">Regelmäßige Transporte, Direktfahrten und Express-Lieferungen für Betriebe und Handel.</p>
        </article>
        <article class="card" data-reveal>
          <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.4 2"/></svg></div>
          <h3 data-i18n="sol.w3.title">Eil- und Sondersendungen</h3>
          <p data-i18n="sol.w3.text">Kurzfristige Kurierfahrten und Sendungen, die kein Zwischenlager sehen dürfen.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ========================================================= EXAMPLE -->
  <section class="section">
    <div class="container">
      <div class="split split--reverse">
        <div class="split__text">
          <span class="eyebrow" data-reveal="fade" data-i18n="sol.example.eyebrow">Ablauf</span>
          <h2 data-reveal data-i18n="sol.example.title">So läuft eine Direktfahrt</h2>
          <p class="lead" data-reveal data-i18n="sol.example.lead">
            Vom Anruf bis zur Übergabe sind es drei Schritte — und Sie wissen in jedem davon,
            woran Sie sind.
          </p>
          <ul class="feature-list" data-reveal-group="80">
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.example.b1"><strong>Anfrage.</strong> Sie nennen uns Abholort, Ziel, Zeitpunkt und Umfang der Sendung.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.example.b2"><strong>Bestätigung.</strong> Wir bestätigen Termin und Preis — verbindlich und schriftlich.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.example.b3"><strong>Fahrt und Übergabe.</strong> Wir laden, fahren direkt und übergeben persönlich.</span></li>
          </ul>
        </div>
        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom" data-cursor="Direktfahrt" data-i18n-attr="data-cursor:home.s3.title">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-white.jpg' ) ); ?>" alt="Transporter von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- =========================================================== REACH -->
  <section class="section section--deep on-dark">
    <div class="container">
      <div class="split">
        <div class="split__text">
          <span class="eyebrow eyebrow--light" data-reveal="fade" data-i18n="sol.reach.eyebrow">Erreichbarkeit</span>
          <h2 data-reveal data-i18n="sol.reach.title">Kurze Wege, klare Auskunft</h2>
          <p class="lead" data-reveal data-i18n="sol.reach.lead">
            Sie erreichen uns telefonisch oder per E-Mail. Wir antworten in der Regel am selben
            Tag.
          </p>
          <ul class="feature-list" data-reveal-group="80">
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.reach.b1"><strong>Telefonisch</strong> für kurzfristige Anfragen und Änderungen.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.reach.b2"><strong>Per E-Mail</strong> für Angebote, Listen und schriftliche Bestätigungen.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="sol.reach.b3"><strong>Vor Ort in Konstanz</strong> — Termine nach Absprache.</span></li>
          </ul>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--gold" href="<?php echo esc_url( aydin_page_url( 'contact' ) ); ?>" data-i18n="common.cta">Kontakt aufnehmen</a>
          </div>
        </div>
        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom" data-cursor="Standort" data-i18n-attr="data-cursor:ct.area.eyebrow">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-team-3.jpg' ) ); ?>" alt="Fahrer von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="cta-band__media" data-parallax="0.08">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-dark.jpg' ) ); ?>" alt="" aria-hidden="true" loading="lazy">
    </div>
    <div class="container cta-band__inner">
      <div class="cta-band__copy">
        <span class="eyebrow eyebrow--light" data-i18n="sol.cta.eyebrow">Ihre Sendung</span>
        <h2 data-i18n="sol.cta.title">Sagen Sie uns, was zu tun ist</h2>
        <p style="color:rgba(255,255,255,.74)" data-i18n="sol.cta.text">
          Wir prüfen die Anfrage, nennen Ihnen einen Termin und einen Preis — ohne
          Verpflichtung.
        </p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="common.quote">Angebot anfordern</a>
        <a class="btn btn--ghost-light btn--lg" href="<?php echo esc_url( aydin_page_url( 'services' ) ); ?>" data-i18n="common.services">Leistungen ansehen</a>
      </div>
    </div>
  </section>

</main>

<?php
get_footer();
