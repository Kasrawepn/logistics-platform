<?php
/**
 * Startseite
 *
 * Generated from website/index.html by wordpress-theme/build.py — edit the static
 * page and re-run the build instead of editing this file.
 */

get_header();
?>

<main id="main">

  <!-- ============================================================ HERO -->
  <section class="hero">
    <div class="hero__media" data-parallax="0.12">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-dark.jpg' ) ); ?>" alt="Transporter von Aydın Transport &amp; Logistik mit Firmenaufschrift" fetchpriority="high">
    </div>
    <div class="hero__overlay"></div>

    <div class="hero__inner container">
      <div class="hero__content">
        <span class="hero__eyebrow hero__anim" data-i18n="home.hero.eyebrow">Transport &amp; Logistik · Konstanz</span>
        <h1 class="hero__anim" data-i18n-html="home.hero.title">Zuverlässig.<br>Schnell. Pünktlich.</h1>
        <p class="hero__lead hero__anim" data-i18n="home.hero.lead">
          Deutschlandweiter Transport mit 3,5-Tonnen-Transportern. Wir holen ab, liefern
          pünktlich und halten Sie auf dem Laufenden — von der ersten Anfrage bis zur
          Übergabe.
        </p>
        <div class="hero__actions hero__anim">
          <a class="btn btn--gold btn--lg" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="common.quote">Angebot anfordern</a>
          <a class="btn btn--ghost-light btn--lg" href="<?php echo esc_url( aydin_page_url( 'services' ) ); ?>" data-i18n="common.services">Leistungen ansehen</a>
        </div>
      </div>
    </div>

    <a class="hero__cue" href="#trust" data-i18n="common.scroll">Weiter</a>
  </section>

  <!-- ========================================================== TRUST -->
  <section class="section section--tight" id="trust">
    <div class="container">
      <div class="badge-row" data-reveal-group="90">
        <span class="badge" data-reveal="fade" data-i18n="home.badge.1">Deutschlandweit</span>
        <span class="badge" data-reveal="fade" data-i18n="home.badge.2">Express-Lieferungen</span>
        <span class="badge" data-reveal="fade" data-i18n="home.badge.3">Direktfahrten</span>
        <span class="badge" data-reveal="fade" data-i18n="home.badge.4">Privat &amp; Geschäft</span>
      </div>
    </div>
  </section>

  <!-- ========================================================== ABOUT -->
  <section class="section" id="about">
    <div class="container">
      <div class="split">
        <div class="split__text">
          <span class="eyebrow" data-reveal="fade" data-i18n="home.about.eyebrow">Über uns</span>
          <h2 data-reveal data-i18n="home.about.title">Ihr Transport in guten Händen</h2>
          <p class="lead" data-reveal data-i18n="home.about.lead">
            Aydın Transport &amp; Logistik ist ein familiengeführtes Transportunternehmen aus
            Konstanz. Wir fahren für Privat- und Geschäftskunden in ganz Deutschland.
          </p>
          <p data-reveal data-i18n="home.about.body">
            Ob einzelne Palette, Möbelstück oder regelmäßige Lieferung: Wir planen jede Fahrt
            persönlich, melden uns beim Status und liefern zum vereinbarten Termin. Keine
            Zwischenhändler, keine Überraschungen.
          </p>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--navy" href="<?php echo esc_url( aydin_page_url( 'about' ) ); ?>"><span data-i18n="common.more">Mehr erfahren</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
          </div>
        </div>

        <figure class="split__media media-stack" data-reveal="scale" role="group" aria-label="Aydın Transport &amp; Logistik">
          <div class="media-stack__main img-zoom" data-cursor="Transport" data-i18n-attr="data-cursor:home.fleet.eyebrow">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-white.jpg' ) ); ?>" alt="Transporter von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
          <div class="media-stack__side img-zoom" data-cursor="Logistik" data-i18n-attr="data-cursor:home.services.eyebrow">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-office.jpg' ) ); ?>" alt="Besprechungsraum von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
          <a class="round-btn media-stack__btn" href="<?php echo esc_url( aydin_page_url( 'about' ) ); ?>" aria-label="Über Aydın Transport &amp; Logistik">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
          </a>
          <figcaption data-i18n="ab.who.caption">Konstanz · deutschlandweit im Einsatz</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- ======================================================= SERVICES -->
  <section class="section section--warm" id="services">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="home.services.eyebrow">Leistungen</span>
          <h2 class="section-head__title" data-reveal data-i18n="home.services.title">Was wir für Sie fahren</h2>
        </div>
        <p data-reveal data-i18n="home.services.lead">
          Vier Leistungen, ein Ansprechpartner. Sie entscheiden, was Sie brauchen — wir
          übernehmen die Umsetzung.
        </p>
      </div>

      <div class="service-grid" data-reveal-group="90">
        <article class="service-card service-card--wide" data-reveal>
          <div class="service-card__media">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-trucks.jpg' ) ); ?>" alt="Transportfahrzeuge von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
          <div class="service-card__body">
            <span class="service-card__index">01</span>
            <h3 data-i18n="home.s1.title">Transporte</h3>
            <p data-i18n="home.s1.text">Deutschlandweiter Transport für Privat- und Geschäftskunden — sorgfältig verladen und sicher zugestellt.</p>
            <div class="service-card__more"><span class="link-arrow link-arrow--light"> <span data-i18n="common.more">Mehr erfahren</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span></div>
          </div>
          <a class="service-card__stretched" href="<?php echo esc_url( aydin_page_url( 'services', '#transporte' ) ); ?>" aria-label="Transporte"></a>
        </article>

        <article class="service-card service-card--slim service-card--tall" data-reveal>
          <div class="service-card__media">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-team-1.jpg' ) ); ?>" alt="Fahrer von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
          <div class="service-card__body">
            <span class="service-card__index">02</span>
            <h3 data-i18n="home.s2.title">Express-Lieferungen</h3>
            <p data-i18n="home.s2.text">Zeitkritische Sendungen, kurzfristig eingeplant und pünktlich zugestellt.</p>
            <div class="service-card__more"><span class="link-arrow link-arrow--light"> <span data-i18n="common.more">Mehr erfahren</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span></div>
          </div>
          <a class="service-card__stretched" href="<?php echo esc_url( aydin_page_url( 'services', '#express' ) ); ?>" aria-label="Express-Lieferungen"></a>
        </article>

        <article class="service-card service-card--slim service-card--tall" data-reveal>
          <div class="service-card__media">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-team-2.jpg' ) ); ?>" alt="Fahrer von Aydın Transport &amp; Logistik unterwegs" loading="lazy">
          </div>
          <div class="service-card__body">
            <span class="service-card__index">03</span>
            <h3 data-i18n="home.s3.title">Direktfahrten</h3>
            <p data-i18n="home.s3.text">Ihre Ladung fährt direkt von A nach B — ohne Umladung und ohne Umwege.</p>
            <div class="service-card__more"><span class="link-arrow link-arrow--light"> <span data-i18n="common.more">Mehr erfahren</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span></div>
          </div>
          <a class="service-card__stretched" href="<?php echo esc_url( aydin_page_url( 'services', '#direktfahrten' ) ); ?>" aria-label="Direktfahrten"></a>
        </article>

        <article class="service-card service-card--wide" data-reveal>
          <div class="service-card__media">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-white.jpg' ) ); ?>" alt="Transporter von Aydın Transport &amp; Logistik am Standort" loading="lazy">
          </div>
          <div class="service-card__body">
            <span class="service-card__index">04</span>
            <h3 data-i18n="home.s4.title">Kurierdienste</h3>
            <p data-i18n="home.s4.text">Kurzfristige Kurierfahrten nach Absprache, auch für eilige Einzelsendungen.</p>
            <div class="service-card__more"><span class="link-arrow link-arrow--light"> <span data-i18n="common.more">Mehr erfahren</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span></div>
          </div>
          <a class="service-card__stretched" href="<?php echo esc_url( aydin_page_url( 'services', '#kurier' ) ); ?>" aria-label="Kurierdienste"></a>
        </article>
      </div>
    </div>
  </section>

  <!-- ======================================================== WHY US -->
  <section class="section section--deep on-dark">
    <div class="container">
      <div class="split split--reverse">
        <div class="split__text">
          <span class="eyebrow eyebrow--light" data-reveal="fade" data-i18n="home.why.eyebrow">Warum Aydın</span>
          <h2 data-reveal data-i18n="home.why.title">Zuverlässig. Schnell. Pünktlich.</h2>
          <p class="lead" data-reveal data-i18n="home.why.lead">
            Genau das versprechen wir — und danach richten wir jede Fahrt aus.
          </p>
          <ul class="feature-list" data-reveal-group="80">
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="home.why.1"><strong>Feste Termine.</strong> Abholung und Zustellung im vereinbarten Zeitfenster, mit kurzer Rückmeldung bei Änderungen.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="home.why.2"><strong>Persönlicher Kontakt.</strong> Sie sprechen mit dem Fahrer und Inhaber — nicht mit einer Warteschleife.</span></li>
            <li data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-i18n-html="home.why.3"><strong>Klare Preise.</strong> Ein transparentes Angebot vor der Fahrt, ohne versteckte Kosten.</span></li>
          </ul>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--gold" href="<?php echo esc_url( aydin_page_url( 'solutions' ) ); ?>" data-i18n="nav.solutions">Lösungen</a>
          </div>
        </div>

        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom" data-cursor="Logistik" data-i18n-attr="data-cursor:home.services.eyebrow">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-office.jpg' ) ); ?>" alt="Besprechungsraum von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================= FLEET -->
  <section class="section" id="fleet">
    <div class="container">
      <div class="split">
        <div class="split__text">
          <span class="eyebrow" data-reveal="fade" data-i18n="home.fleet.eyebrow">Fuhrpark</span>
          <h2 data-reveal data-i18n="home.fleet.title">Bis 3,5 Tonnen, deutschlandweit unterwegs</h2>
          <p class="lead" data-reveal data-i18n="home.fleet.lead">
            Mit unserem 3,5-Tonnen-Transporter sind wir im Stadtverkehr flexibel und auf der
            Langstrecke belastbar — ideal für Direktfahrten und Express-Lieferungen.
          </p>
          <table class="spec-table" data-reveal>
            <tbody>
              <tr><th scope="row" data-i18n="home.fleet.dt1">Fahrzeugklasse</th><td data-i18n="home.fleet.dd1">3,5-Tonnen-Transporter</td></tr>
              <tr><th scope="row" data-i18n="home.fleet.dt2">Einsatzgebiet</th><td data-i18n="home.fleet.dd2">Deutschlandweit</td></tr>
              <tr><th scope="row" data-i18n="home.fleet.dt3">Abholung &amp; Zustellung</th><td data-i18n="home.fleet.dd3">Nach Vereinbarung, pünktlich</td></tr>
              <tr><th scope="row" data-i18n="home.fleet.dt4">Kunden</th><td data-i18n="home.fleet.dd4">Privat und Geschäft</td></tr>
            </tbody>
          </table>
          <div class="split__actions" data-reveal="fade">
            <a class="btn btn--navy" href="<?php echo esc_url( aydin_page_url( 'fleet' ) ); ?>" data-i18n="nav.fleet">Fuhrpark</a>
          </div>
        </div>
        <div class="split__media" data-reveal="scale">
          <div class="panel-media panel-media--wide img-zoom" data-cursor="Unser Fahrzeug" data-i18n-attr="data-cursor:home.about.cursor">
            <img src="<?php echo esc_url( aydin_asset( 'img/aydin-van-dark.jpg' ) ); ?>" alt="Transporter von Aydın Transport &amp; Logistik" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====================================================== PROCESS -->
  <section class="section section--soft">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow" data-reveal="fade" data-i18n="home.process.eyebrow">So läuft es</span>
          <h2 class="section-head__title" data-reveal data-i18n="home.process.title">Vier Schritte, keine Rätsel</h2>
        </div>
        <p data-reveal data-i18n="home.process.lead">
          Vom ersten Anruf bis zur Übergabe bleibt der Ablauf für Sie einfach und
          nachvollziehbar.
        </p>
      </div>

      <div class="steps" data-reveal-group="110">
        <div class="step" data-reveal>
          <div class="step__num">01</div>
          <h3 data-i18n="home.p1.title">Anfrage</h3>
          <p data-i18n="home.p1.text">Sie schildern uns die Sendung: Abholort, Ziel, Zeitpunkt und Umfang.</p>
        </div>
        <div class="step" data-reveal>
          <div class="step__num">02</div>
          <h3 data-i18n="home.p2.title">Angebot</h3>
          <p data-i18n="home.p2.text">Sie erhalten ein klares Angebot mit Termin und Preis — ohne Verpflichtung.</p>
        </div>
        <div class="step" data-reveal>
          <div class="step__num">03</div>
          <h3 data-i18n="home.p3.title">Abholung</h3>
          <p data-i18n="home.p3.text">Wir kommen zum vereinbarten Zeitpunkt und verladen Ihre Sendung sorgfältig.</p>
        </div>
        <div class="step" data-reveal>
          <div class="step__num">04</div>
          <h3 data-i18n="home.p4.title">Zustellung</h3>
          <p data-i18n="home.p4.text">Die Sendung erreicht ihr Ziel pünktlich. Sie erhalten eine Bestätigung der Übergabe.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================= CTA BAND -->
  <section class="cta-band">
    <div class="cta-band__media" data-parallax="0.08">
      <img src="<?php echo esc_url( aydin_asset( 'img/aydin-trucks.jpg' ) ); ?>" alt="" aria-hidden="true" loading="lazy">
    </div>
    <div class="container cta-band__inner">
      <div class="cta-band__copy">
        <span class="eyebrow eyebrow--light" data-i18n="home.cta.eyebrow">Kontakt</span>
        <h2 data-i18n="home.cta.title">Bereit für die nächste Fahrt?</h2>
        <p style="color:rgba(255,255,255,.74)" data-i18n="home.cta.text">
          Rufen Sie an oder schreiben Sie uns — wir melden uns mit einem konkreten Angebot
          zurück.
        </p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="<?php echo esc_url( aydin_page_url( 'contact', '#quote' ) ); ?>" data-i18n="common.quote">Angebot anfordern</a>
        <a class="btn btn--ghost-light btn--lg" href="tel:+491608016659">☎ +49 160 801 66 59</a>
      </div>
    </div>
  </section>

</main>

<?php
get_footer();
