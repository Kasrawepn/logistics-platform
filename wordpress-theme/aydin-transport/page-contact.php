<?php
/**
 * Kontakt
 *
 * Generated from website/contact.html by wordpress-theme/build.py — edit the static
 * page and re-run the build instead of editing this file.
 */

/*
Template Name: Kontakt
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
        <a href="<?php echo esc_url( aydin_page_url( 'home' ) ); ?>" data-i18n="common.home">Startseite</a><span>/</span><span aria-current="page" data-i18n="nav.contact">Kontakt</span>
      </nav>
      <h1 data-i18n="ct.hero.title">Sprechen wir über Ihre Sendung</h1>
      <p data-i18n="ct.hero.lead">
        Rufen Sie uns an oder schreiben Sie uns — wir melden uns mit einem konkreten Angebot
        zurück.
      </p>
    </div>
  </section>

  <!-- ================================================== QUOTE + DETAILS -->
  <section class="section" id="quote">
    <div class="container">
      <div class="contact-grid">
        <div data-reveal>
          <span class="eyebrow" style="margin-bottom:1rem" data-i18n="ct.form.eyebrow">Anfrage</span>
          <h2 style="margin-bottom:1rem" data-i18n="ct.quote.title">Kontakt aufnehmen</h2>
          <p style="color:var(--fg-muted);margin-bottom:2rem;max-width:48ch" data-i18n="ct.quote.lead">Am schnellsten erreichen Sie uns per WhatsApp oder Telefon — wir melden uns mit einem konkreten Angebot zurück.</p>

<?php get_template_part( 'template-parts/contact-cta' ); ?>
        </div>

        <aside data-reveal="right" aria-label="Kontakt">
          <div class="info-list">
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.5 3.7-2 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-2L19.6 13v3a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 4 4.7 2 2 0 0 1 6 2.5"/></svg></div>
              <div>
                <h4 data-i18n="ct.info.phoneTitle">Telefon</h4>
                <p><a href="tel:+491608016659">+49 160 801 66 59</a></p>
                <p style="font-size:.875rem;color:var(--fg-muted)" data-i18n="ct.info.phoneNote">Mo–Fr 08:00–18:00 Uhr</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg></div>
              <div>
                <h4 data-i18n="ct.info.mailTitle">E-Mail</h4>
                <p><a href="mailto:Aydinmuhammet601@gmail.com">Aydinmuhammet601@gmail.com</a></p>
                <p style="font-size:.875rem;color:var(--fg-muted)" data-i18n="ct.info.mailNote">Antwort in der Regel am selben Tag</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
              <div>
                <h4 data-i18n="ct.info.addressTitle">Adresse</h4>
                <p data-i18n="address">Herrenlandstraße 31–37, Konstanz, Deutschland</p>
                <p style="font-size:.875rem;color:var(--fg-muted)" data-i18n="ct.info.addressNote">Termine nach Absprache</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.4 2"/></svg></div>
              <div>
                <h4 data-i18n="ct.info.hoursTitle">Erreichbarkeit</h4>
                <p data-i18n="ct.info.hours1">Telefon: Mo–Fr 08:00–18:00 Uhr</p>
                <p style="font-size:.875rem;color:var(--fg-muted)" data-i18n="ct.info.hours2">Fahrten nach Vereinbarung</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ==================================================== STANDORT -->
  <section class="section section--soft">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="ct.area.eyebrow">Standort &amp; Gebiet</span>
          <h2 class="section-head__title" data-reveal data-i18n="ct.area.title">In Konstanz zu Hause, in Deutschland unterwegs</h2>
        </div>
        <p data-reveal data-i18n="ct.area.lead">
          Unser Standort ist Konstanz. Abholung und Zustellung koordinieren wir deutschlandweit
          mit Ihnen.
        </p>
      </div>

      <div class="office-grid" data-reveal-group="80">
        <article class="office" data-reveal>
          <h3 data-i18n="ct.area.o1">Konstanz</h3>
          <div class="office__role" data-i18n="ct.area.o1role">Standort</div>
          <p data-i18n="address">Herrenlandstraße 31–37, Konstanz, Deutschland</p>
        </article>
        <article class="office" data-reveal>
          <h3 data-i18n="ct.area.o2">Deutschlandweit</h3>
          <div class="office__role" data-i18n="ct.area.o2role">Einsatzgebiet</div>
          <p data-i18n="ct.area.o2text">Transporte, Direktfahrten und Kurierdienste nach Absprache.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ============================================================= FAQ -->
  <section class="section">
    <div class="container container--narrow">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="ct.faq.eyebrow">Fragen</span>
          <h2 class="section-head__title" data-reveal data-i18n="ct.faq.title">Häufige Fragen</h2>
        </div>
      </div>

      <div class="accordion" data-reveal-group="60">
        <div class="accordion__item is-open" data-reveal>
          <button class="accordion__trigger" type="button" aria-expanded="true" aria-controls="faq-1">
            <span data-i18n="ct.q1">Wie schnell erhalte ich ein Angebot?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel" id="faq-1" aria-hidden="false">
            <div><p data-i18n="ct.a1">In der Regel am selben Tag. Am schnellsten geht es telefonisch unter +49 160 801 66 59 — dort klären wir Umfang und Termin direkt.</p></div>
          </div>
        </div>

        <div class="accordion__item" data-reveal>
          <button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="faq-2">
            <span data-i18n="ct.q2">Ab welcher Menge nehmen Sie Aufträge an?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel" id="faq-2" aria-hidden="true">
            <div><p data-i18n="ct.a2">Wir fahren einzelne Sendungen ebenso wie regelmäßige Transporte. Umfang und Termin stimmen wir vorab mit Ihnen ab.</p></div>
          </div>
        </div>

        <div class="accordion__item" data-reveal>
          <button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="faq-3">
            <span data-i18n="ct.q3">Welche Gebiete bedienen Sie?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel" id="faq-3" aria-hidden="true">
            <div><p data-i18n="ct.a3">Wir sind deutschlandweit unterwegs. Abholung und Zustellung koordinieren wir mit Ihnen — auch über weitere Strecken.</p></div>
          </div>
        </div>

        <div class="accordion__item" data-reveal>
          <button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="faq-4">
            <span data-i18n="ct.q4">Wie läuft der Kontakt während der Fahrt?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel" id="faq-4" aria-hidden="true">
            <div><p data-i18n="ct.a4">Wir melden uns bei der Abholung und vor der Zustellung. So wissen Sie jederzeit, wo Ihre Sendung ist.</p></div>
          </div>
        </div>

        <div class="accordion__item" data-reveal>
          <button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="faq-5">
            <span data-i18n="ct.q5">Transportieren Sie auch für Privatkunden?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel" id="faq-5" aria-hidden="true">
            <div><p data-i18n="ct.a5">Ja. Wir fahren für Privat- und Geschäftskunden — vom einzelnen Möbelstück bis zur regelmäßigen Lieferung.</p></div>
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
        <span class="eyebrow eyebrow--light" data-i18n="ct.info.phoneTitle">Telefon</span>
        <h2 data-i18n="ct.cta.title">Lieber direkt sprechen?</h2>
        <p style="color:rgba(255,255,255,.74)" data-i18n="ct.cta.text">
          Rufen Sie uns an — Sie sprechen direkt mit dem Fahrer und Inhaber.
        </p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="tel:+491608016659">☎ +49 160 801 66 59</a>
        <a class="btn btn--ghost-light btn--lg" href="mailto:Aydinmuhammet601@gmail.com">✉ Aydinmuhammet601@gmail.com</a>
      </div>
    </div>
  </section>

</main>

<?php
get_footer();
