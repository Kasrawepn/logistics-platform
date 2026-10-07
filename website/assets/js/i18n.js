/* ==========================================================================
   AYDIN TRANSPORT & LOGISTIK — Translations
   Static-site i18n, no build step. Each entry is [de, en, tr] — key parity is
   guaranteed by the array shape, and German is the default/first language.

   Markup opt-in:
     data-i18n="key"           → textContent
     data-i18n-html="key"      → innerHTML (strings that carry <br> or <strong>)
     data-i18n-attr="placeholder:key;aria-label:key2"
   <body data-title-key="..." data-desc-key="..."> swaps the document title and
   meta description. Loaded before layout.js and main.js.
   ========================================================================== */

(function () {
  "use strict";

  const LANGS = ["de", "en", "tr"];
  const DEFAULT_LANG = "de";
  const STORAGE_KEY = "aydin_lang";

  /* ------------------------------------------------------------ dictionary */
  const DICT = {
    /* ---------------------------------------------------------------- meta */
    "meta.home.title": [
      "Aydın Transport & Logistik — Zuverlässig. Schnell. Pünktlich.",
      "Aydın Transport & Logistics — Reliable. Fast. On time.",
      "Aydın Transport & Lojistik — Güvenilir. Hızlı. Zamanında.",
    ],
    "meta.home.desc": [
      "Deutschlandweiter Transport mit 3,5-Tonnen-Transportern: Direktfahrten, Express-Lieferungen und Kurierdienste für Privat- und Geschäftskunden aus Konstanz.",
      "Nationwide transport across Germany with 3.5-tonne vans: direct runs, express deliveries and courier services for private and business customers.",
      "3,5 tonluk araçlarla Almanya genelinde taşıma: direkt seferler, ekspres teslimat ve kurye hizmetleri. Bireysel ve kurumsal müşteriler için.",
    ],
    "meta.services.title": [
      "Leistungen — Aydın Transport & Logistik",
      "Services — Aydın Transport & Logistics",
      "Hizmetler — Aydın Transport & Lojistik",
    ],
    "meta.services.desc": [
      "Transporte, Direktfahrten, Express-Lieferungen und Kurierdienste in ganz Deutschland — mit festem Ansprechpartner und klaren Terminen.",
      "Transport, direct runs, express deliveries and courier services throughout Germany — with one contact person and clear schedules.",
      "Almanya genelinde taşıma, direkt seferler, ekspres teslimat ve kurye hizmetleri — tek muhatap ve net randevularla.",
    ],
    "meta.about.title": [
      "Über uns — Aydın Transport & Logistik",
      "About us — Aydın Transport & Logistics",
      "Hakkımızda — Aydın Transport & Lojistik",
    ],
    "meta.about.desc": [
      "Familiengeführtes Transportunternehmen aus Konstanz: deutschlandweite Transporte für Privat- und Geschäftskunden.",
      "A family-run transport company from Constance: nationwide transport for private and business customers.",
      "Konstanz merkezli aile işletmesi: bireysel ve kurumsal müşteriler için Almanya genelinde taşıma.",
    ],
    "meta.solutions.title": [
      "Lösungen — Aydın Transport & Logistik",
      "Solutions — Aydın Transport & Logistics",
      "Çözümler — Aydın Transport & Lojistik",
    ],
    "meta.solutions.desc": [
      "Passende Transportlösungen für Privatkunden, Geschäftskunden und eilige Sendungen — deutschlandweit und pünktlich.",
      "Transport solutions for private customers, businesses and urgent shipments — nationwide and on time.",
      "Bireysel müşteriler, kurumlar ve acil gönderiler için uygun taşıma çözümleri — Almanya genelinde, zamanında.",
    ],
    "meta.fleet.title": [
      "Fuhrpark — Aydın Transport & Logistik",
      "Fleet — Aydın Transport & Logistics",
      "Filomuz — Aydın Transport & Lojistik",
    ],
    "meta.fleet.desc": [
      "Unser 3,5-Tonnen-Transporter: flexibel im Stadtverkehr, belastbar auf der Langstrecke — für Direktfahrten und Express-Lieferungen.",
      "Our 3.5-tonne van: flexible in the city, capable on long routes — for direct runs and express deliveries.",
      "3,5 tonluk aracımız: şehir içinde çevik, uzun yolda güçlü — direkt seferler ve ekspres teslimat için.",
    ],
    "meta.contact.title": [
      "Kontakt — Aydın Transport & Logistik",
      "Contact — Aydın Transport & Logistics",
      "İletişim — Aydın Transport & Lojistik",
    ],
    "meta.contact.desc": [
      "Kontakt zu Aydın Transport & Logistik: Telefon +49 160 801 66 59, E-Mail oder Anfrageformular. Wir melden uns mit einem konkreten Angebot.",
      "Contact Aydın Transport & Logistics: phone +49 160 801 66 59, email or the enquiry form. We come back with a firm quote.",
      "Aydın Transport & Lojistik iletişim: telefon +49 160 801 66 59, e-posta veya teklif formu. Net bir teklifle dönüş yapıyoruz.",
    ],

    /* -------------------------------------------------------------- global */
    "nav.home": ["Startseite", "Home", "Ana Sayfa"],
    "nav.services": ["Leistungen", "Services", "Hizmetler"],
    "nav.about": ["Über uns", "About us", "Hakkımızda"],
    "nav.solutions": ["Lösungen", "Solutions", "Çözümler"],
    "nav.fleet": ["Fuhrpark", "Fleet", "Filomuz"],
    "nav.contact": ["Kontakt", "Contact", "İletişim"],
    "common.skip": ["Zum Inhalt springen", "Skip to content", "İçeriğe geç"],
    "common.quote": ["Angebot anfordern", "Request a quote", "Teklif isteyin"],
    "common.more": ["Mehr erfahren", "Learn more", "Daha fazla bilgi"],
    "common.services": ["Leistungen ansehen", "Explore services", "Hizmetleri görün"],
    "common.scroll": ["Weiter", "Scroll", "Kaydır"],
    "common.home": ["Startseite", "Home", "Ana Sayfa"],
    "common.language": ["Sprache", "Language", "Dil"],
    "common.menuOpen": ["Menü öffnen", "Open menu", "Menüyü aç"],
    "common.closeMenu": ["Menü schließen", "Close menu", "Menüyü kapat"],
    "common.prev": ["Vorheriges Fahrzeug", "Previous vehicle", "Önceki araç"],
    "common.next": ["Nächstes Fahrzeug", "Next vehicle", "Sonraki araç"],
    "common.cta": ["Kontakt aufnehmen", "Get in touch", "Bize ulaşın"],

    /* -------------------------------------------------------------- footer */
    "footer.aboutTitle": [
      "Transport & Logistik aus Konstanz",
      "Transport & logistics from Constance",
      "Konstanz merkezli transport & lojistik",
    ],
    "footer.aboutText": [
      "Familiengeführtes Transportunternehmen aus Konstanz. Wir fahren deutschlandweit für Privat- und Geschäftskunden — zuverlässig, schnell und pünktlich.",
      "A family-run transport company based in Constance. We drive throughout Germany for private and business customers — reliable, fast and on time.",
      "Konstanz merkezli aile işletmesi. Bireysel ve kurumsal müşteriler için Almanya genelinde çalışıyoruz — güvenilir, hızlı ve zamanında.",
    ],
    "footer.services": ["Leistungen", "Services", "Hizmetler"],
    "footer.company": ["Unternehmen", "Company", "Şirket"],
    "footer.contact": ["Kontakt", "Contact", "İletişim"],
    "footer.l.transport": ["Transporte", "Transport", "Taşıma"],
    "footer.l.direct": ["Direktfahrten", "Direct runs", "Direkt seferler"],
    "footer.l.express": ["Express-Lieferungen", "Express deliveries", "Ekspres teslimat"],
    "footer.l.courier": ["Kurierdienste", "Courier services", "Kurye hizmetleri"],
    "footer.l.solutions": ["Logistik-Lösungen", "Logistics solutions", "Lojistik çözümleri"],
    "footer.l.quote": ["Angebot anfordern", "Request a quote", "Teklif isteyin"],
    "footer.hours": [
      "Mo–Fr 08:00–18:00 Uhr · Termine nach Absprache",
      "Mon–Fri 08:00–18:00 · appointments by arrangement",
      "Pzt–Cum 08:00–18:00 · randevu ile",
    ],
    "footer.rights": ["Alle Rechte vorbehalten.", "All rights reserved.", "Tüm hakları saklıdır."],
    "footer.legal.privacy": ["Datenschutz", "Privacy", "Gizlilik"],
    "footer.legal.terms": ["AGB", "Terms", "Şartlar"],
    "footer.legal.imprint": ["Impressum", "Imprint", "Künye"],
    "address": [
      "Herrenlandstraße 31–37, Konstanz, Deutschland",
      "Herrenlandstraße 31–37, Constance, Germany",
      "Herrenlandstraße 31–37, Konstanz, Almanya",
    ],

    /* ---------------------------------------------------------------- home */
    "home.hero.eyebrow": [
      "Transport & Logistik · Konstanz",
      "Transport & logistics · Constance",
      "Transport & lojistik · Konstanz",
    ],
    "home.hero.title": [
      "Zuverlässig.<br>Schnell. Pünktlich.",
      "Reliable.<br>Fast. On time.",
      "Güvenilir.<br>Hızlı. Zamanında.",
    ],
    "home.hero.lead": [
      "Deutschlandweiter Transport mit 3,5-Tonnen-Transportern. Wir holen ab, liefern pünktlich und halten Sie auf dem Laufenden — von der ersten Anfrage bis zur Übergabe.",
      "Nationwide transport across Germany with 3.5-tonne vans. We collect, we deliver on time and we keep you informed — from the first enquiry to the handover.",
      "3,5 tonluk araçlarla Almanya genelinde taşıma. Yükünüzü alır, zamanında teslim eder ve süreç boyunca sizi bilgilendiririz.",
    ],
    "home.badge.1": ["Deutschlandweit", "Nationwide", "Almanya genelinde"],
    "home.badge.2": ["Express-Lieferungen", "Express deliveries", "Ekspres teslimat"],
    "home.badge.3": ["Direktfahrten", "Direct runs", "Direkt seferler"],
    "home.badge.4": ["Privat & Geschäft", "Private & business", "Bireysel & kurumsal"],
    "home.about.eyebrow": ["Über uns", "About us", "Hakkımızda"],
    "home.about.title": ["Ihr Transport in guten Händen", "Your freight in safe hands", "Yükünüz güvenli ellerde"],
    "home.about.lead": [
      "Aydın Transport & Logistik ist ein familiengeführtes Transportunternehmen aus Konstanz. Wir fahren für Privat- und Geschäftskunden in ganz Deutschland.",
      "Aydın Transport & Logistics is a family-run transport company based in Constance. We drive for private and business customers throughout Germany.",
      "Aydın Transport & Lojistik, Konstanz merkezli bir aile işletmesidir. Almanya genelinde bireysel ve kurumsal müşteriler için taşıma yapıyoruz.",
    ],
    "home.about.body": [
      "Ob einzelne Palette, Möbelstück oder regelmäßige Lieferung: Wir planen jede Fahrt persönlich, melden uns beim Status und liefern zum vereinbarten Termin. Keine Zwischenhändler, keine Überraschungen.",
      "Whether it is a single pallet, a piece of furniture or a regular delivery: we plan every trip ourselves, keep you posted and deliver at the agreed time. No middlemen, no surprises.",
      "Tek bir palet, bir mobilya ya da düzenli teslimat: her seferi kendimiz planlıyor, sizi bilgilendiriyor ve söz verilen saatte teslim ediyoruz. Aracı yok, sürpriz yok.",
    ],
    "home.about.caption": [
      "Unser 3,5-t-Transporter · Konstanz",
      "Our 3.5-tonne van · Constance",
      "3,5 tonluk aracımız · Konstanz",
    ],
    "home.about.cursor": ["Unser Fahrzeug", "Our vehicle", "Aracımız"],
    "home.services.eyebrow": ["Leistungen", "Services", "Hizmetler"],
    "home.services.title": ["Was wir für Sie fahren", "What we drive for you", "Sizin için neler yapıyoruz"],
    "home.services.lead": [
      "Vier Leistungen, ein Ansprechpartner. Sie entscheiden, was Sie brauchen — wir übernehmen die Umsetzung.",
      "Four services, one contact person. You decide what you need — we take care of the rest.",
      "Dört hizmet, tek muhatap. İhtiyacınızı siz seçin — uygulamasını biz üstlenelim.",
    ],
    "home.s1.title": ["Transporte", "Transport", "Taşıma"],
    "home.s1.text": [
      "Deutschlandweiter Transport für Privat- und Geschäftskunden — sorgfältig verladen und sicher zugestellt.",
      "Nationwide transport for private and business customers — carefully loaded and safely delivered.",
      "Bireysel ve kurumsal müşteriler için Almanya genelinde taşıma — özenle yüklenir, güvenle teslim edilir.",
    ],
    "home.s2.title": ["Express-Lieferungen", "Express deliveries", "Ekspres teslimat"],
    "home.s2.text": [
      "Zeitkritische Sendungen, kurzfristig eingeplant und pünktlich zugestellt.",
      "Time-critical shipments, scheduled at short notice and delivered on time.",
      "Acil gönderiler, kısa sürede planlanır ve zamanında teslim edilir.",
    ],
    "home.s3.title": ["Direktfahrten", "Direct runs", "Direkt seferler"],
    "home.s3.text": [
      "Ihre Ladung fährt direkt von A nach B — ohne Umladung und ohne Umwege.",
      "Your load goes straight from A to B — no reloading, no detours.",
      "Yükünüz A'dan B'ye doğrudan gider — aktarma yok, dolambaç yok.",
    ],
    "home.s4.title": ["Kurierdienste", "Courier services", "Kurye hizmetleri"],
    "home.s4.text": [
      "Kurzfristige Kurierfahrten nach Absprache, auch für eilige Einzelsendungen.",
      "Short-notice courier trips by arrangement, including urgent single items.",
      "Randevu ile kısa sürede kurye seferleri; acil tek gönderiler dahil.",
    ],
    "home.why.eyebrow": ["Warum Aydın", "Why Aydın", "Neden Aydın"],
    "home.why.title": ["Zuverlässig. Schnell. Pünktlich.", "Reliable. Fast. On time.", "Güvenilir. Hızlı. Zamanında."],
    "home.why.lead": [
      "Genau das versprechen wir — und danach richten wir jede Fahrt aus.",
      "That is exactly what we promise — and every trip is planned around it.",
      "Tam olarak bunu vaat ediyoruz — her seferi buna göre planlıyoruz.",
    ],
    "home.why.1": [
      "<strong>Feste Termine.</strong> Abholung und Zustellung im vereinbarten Zeitfenster, mit kurzer Rückmeldung bei Änderungen.",
      "<strong>Fixed schedules.</strong> Collection and delivery inside the agreed window, with a short call if anything changes.",
      "<strong>Net randevu.</strong> Alım ve teslimat söz verilen zaman aralığında; bir değişiklik olursa kısa bilgilendirme.",
    ],
    "home.why.2": [
      "<strong>Persönlicher Kontakt.</strong> Sie sprechen mit dem Fahrer und Inhaber — nicht mit einer Warteschleife.",
      "<strong>Direct contact.</strong> You speak to the driver and owner — not to a hold queue.",
      "<strong>Doğrudan iletişim.</strong> Sürücü ve işletme sahibiyle konuşursunuz — bekletme kuyruğuyla değil.",
    ],
    "home.why.3": [
      "<strong>Klare Preise.</strong> Ein transparentes Angebot vor der Fahrt, ohne versteckte Kosten.",
      "<strong>Clear prices.</strong> A transparent quote before the trip, with no hidden costs.",
      "<strong>Net fiyat.</strong> Yolculuk öncesi şeffaf teklif, gizli maliyet yok.",
    ],
    "home.fleet.eyebrow": ["Fuhrpark", "Fleet", "Filomuz"],
    "home.fleet.title": ["Bis 3,5 Tonnen, deutschlandweit unterwegs", "Up to 3.5 tonnes, out across Germany", "3,5 tona kadar, Almanya genelinde"],
    "home.fleet.lead": [
      "Mit unserem 3,5-Tonnen-Transporter sind wir im Stadtverkehr flexibel und auf der Langstrecke belastbar — ideal für Direktfahrten und Express-Lieferungen.",
      "Our 3.5-tonne van is flexible in traffic and capable over long distances — ideal for direct runs and express deliveries.",
      "3,5 tonluk aracımız şehir içinde çevik, uzun yolda dayanıklıdır — direkt seferler ve ekspres teslimat için ideal.",
    ],
    "home.fleet.dt1": ["Fahrzeugklasse", "Vehicle class", "Araç sınıfı"],
    "home.fleet.dd1": ["3,5-Tonnen-Transporter", "3.5-tonne van", "3,5 tonluk araç"],
    "home.fleet.dt2": ["Einsatzgebiet", "Coverage", "Çalışma alanı"],
    "home.fleet.dd2": ["Deutschlandweit", "Throughout Germany", "Almanya genelinde"],
    "home.fleet.dt3": ["Abholung & Zustellung", "Collection & delivery", "Alım & teslimat"],
    "home.fleet.dd3": ["Nach Vereinbarung, pünktlich", "By arrangement, on time", "Randevu ile, zamanında"],
    "home.fleet.dt4": ["Kunden", "Customers", "Müşteriler"],
    "home.fleet.dd4": ["Privat und Geschäft", "Private and business", "Bireysel ve kurumsal"],
    "home.process.eyebrow": ["So läuft es", "How it works", "Nasıl işliyor"],
    "home.process.title": ["Vier Schritte, keine Rätsel", "Four steps, no guesswork", "Dört adım, bilinmez yok"],
    "home.process.lead": [
      "Vom ersten Anruf bis zur Übergabe bleibt der Ablauf für Sie einfach und nachvollziehbar.",
      "From the first call to the handover, the process stays simple and predictable.",
      "İlk aramadan teslimata kadar süreç sade ve öngörülebilir kalır.",
    ],
    "home.p1.title": ["Anfrage", "Enquiry", "Talep"],
    "home.p1.text": [
      "Sie schildern uns die Sendung: Abholort, Ziel, Zeitpunkt und Umfang.",
      "Tell us about the shipment: collection point, destination, timing and size.",
      "Gönderiyi anlatın: alım yeri, varış yeri, zaman ve hacim.",
    ],
    "home.p2.title": ["Angebot", "Quote", "Teklif"],
    "home.p2.text": [
      "Sie erhalten ein klares Angebot mit Termin und Preis — ohne Verpflichtung.",
      "You receive a clear offer with date and price — with no obligation.",
      "Tarih ve fiyatı içeren net bir teklif alırsınız — yükümlülük yok.",
    ],
    "home.p3.title": ["Abholung", "Collection", "Alım"],
    "home.p3.text": [
      "Wir kommen zum vereinbarten Zeitpunkt und verladen Ihre Sendung sorgfältig.",
      "We arrive at the agreed time and load your shipment with care.",
      "Söz verilen saatte gelir, gönderinizi özenle yükleriz.",
    ],
    "home.p4.title": ["Zustellung", "Delivery", "Teslimat"],
    "home.p4.text": [
      "Die Sendung erreicht ihr Ziel pünktlich. Sie erhalten eine Bestätigung der Übergabe.",
      "The shipment reaches its destination on time. You get confirmation of the handover.",
      "Gönderi hedefine zamanında ulaşır. Teslim onayı size iletilir.",
    ],
    "home.cta.eyebrow": ["Kontakt", "Get in touch", "İletişim"],
    "home.cta.title": ["Bereit für die nächste Fahrt?", "Ready for the next trip?", "Sıradaki taşımaya hazır mısınız?"],
    "home.cta.text": [
      "Rufen Sie an oder schreiben Sie uns — wir melden uns mit einem konkreten Angebot zurück.",
      "Call us or send a message — we will come back with a firm quote.",
      "Bizi arayın ya da yazın — net bir teklifle dönüş yapıyoruz.",
    ],

    /* ------------------------------------------------------------ services */
    "svc.hero.title": ["Leistungen rund um Ihre Sendung", "Services built around your shipment", "Gönderiniz için hizmetler"],
    "svc.hero.lead": [
      "Von der einzelnen Palette bis zur regelmäßigen Direktfahrt: Wir übernehmen Transport, Termin und Übergabe.",
      "From a single pallet to a regular direct run: we take care of transport, timing and handover.",
      "Tek bir paletten düzenli direkt sefere: taşıma, zamanlama ve teslimi biz üstleniyoruz.",
    ],
    "svc.1.eyebrow": ["01 · Transporte", "01 · Transport", "01 · Taşıma"],
    "svc.1.title": ["Deutschlandweiter Transport", "Transport across Germany", "Almanya genelinde taşıma"],
    "svc.1.lead": [
      "Wir transportieren für Privat- und Geschäftskunden in ganz Deutschland — mit einem 3,5-Tonnen-Transporter, der im Stadtverkehr genauso zu Hause ist wie auf der Autobahn.",
      "We transport for private and business customers across Germany — with a 3.5-tonne van that is as at home in the city as on the motorway.",
      "Almanya genelinde bireysel ve kurumsal müşteriler için taşıma yapıyoruz — şehir içinde de otoyolda da işini bilen 3,5 tonluk araçla.",
    ],
    "svc.1.b1": [
      "<strong>Verladung mit Sorgfalt</strong> und Sicherung der Sendung für die Fahrt.",
      "<strong>Careful loading</strong> and securing of the shipment for the journey.",
      "<strong>Özenli yükleme</strong> ve yol boyunca yükün sabitlenmesi.",
    ],
    "svc.1.b2": [
      "<strong>Abholung und Zustellung</strong> im vereinbarten Zeitfenster.",
      "<strong>Collection and delivery</strong> inside the agreed window.",
      "<strong>Alım ve teslimat</strong> söz verilen zaman aralığında.",
    ],
    "svc.1.b3": [
      "<strong>Kurze Rückmeldung,</strong> wenn sich unterwegs etwas ändert.",
      "<strong>A quick call</strong> if anything changes on the way.",
      "<strong>Kısa bilgilendirme</strong> yolda bir değişiklik olursa.",
    ],
    "svc.1.cta": ["Transport anfragen", "Request transport", "Taşıma talep et"],
    "svc.2.eyebrow": ["02 · Express-Lieferungen", "02 · Express deliveries", "02 · Ekspres teslimat"],
    "svc.2.title": ["Wenn es schnell gehen muss", "When it has to be quick", "Hızlı olması gerektiğinde"],
    "svc.2.lead": [
      "Zeitkritische Sendungen nehmen wir kurzfristig an und bringen sie ohne Umwege ans Ziel.",
      "We take on time-critical shipments at short notice and bring them to the destination without detours.",
      "Acil gönderileri kısa sürede kabul eder, dolambaçsız hedefine ulaştırırız.",
    ],
    "svc.2.b1": [
      "<strong>Kurzfristige Annahme</strong> nach telefonischer Absprache.",
      "<strong>Short-notice booking</strong> agreed by phone.",
      "<strong>Kısa sürede kabul</strong>, telefonla anlaşarak.",
    ],
    "svc.2.b2": [
      "<strong>Direkte Route</strong> statt Sammellauf.",
      "<strong>A direct route</strong> instead of a consolidated run.",
      "<strong>Doğrudan güzergâh</strong>, toplamalı sefer yerine.",
    ],
    "svc.2.b3": [
      "<strong>Bestätigung der Zustellung</strong> nach der Übergabe.",
      "<strong>Delivery confirmation</strong> after the handover.",
      "<strong>Teslim onayı</strong>, teslimattan sonra.",
    ],
    "svc.2.cta": ["Express anfragen", "Request express", "Ekspres talep et"],
    "svc.3.eyebrow": ["03 · Direktfahrten", "03 · Direct runs", "03 · Direkt seferler"],
    "svc.3.title": ["Von A nach B, ohne Umweg", "From A to B, no detours", "A'dan B'ye, dolambaçsız"],
    "svc.3.lead": [
      "Ihre Ladung wird nicht umgeladen. Ein Fahrzeug, eine Übergabe, ein Ansprechpartner.",
      "Your load is not reloaded. One vehicle, one handover, one contact person.",
      "Yükünüz aktarılmaz. Tek araç, tek teslim, tek muhatap.",
    ],
    "svc.3.b1": [
      "<strong>Ideal für sperrige oder empfindliche Güter,</strong> die keine Zwischenstation vertragen.",
      "<strong>Ideal for bulky or sensitive goods</strong> that should not be handled twice.",
      "<strong>Hacimli veya hassas yükler için ideal</strong> — arada aktarma istemeyen gönderiler.",
    ],
    "svc.3.b2": [
      "<strong>Kein Zwischenlager,</strong> keine unnötige Wartezeit.",
      "<strong>No intermediate storage,</strong> no unnecessary waiting.",
      "<strong>Ara depo yok,</strong> gereksiz bekleme yok.",
    ],
    "svc.3.b3": [
      "<strong>Fester Termin</strong> für Abholung und Zustellung.",
      "<strong>A fixed appointment</strong> for collection and delivery.",
      "<strong>Net randevu</strong> alım ve teslimat için.",
    ],
    "svc.3.cta": ["Direktfahrt anfragen", "Request a direct run", "Direkt sefer talep et"],
    "svc.4.eyebrow": ["04 · Kurierdienste", "04 · Courier services", "04 · Kurye hizmetleri"],
    "svc.4.title": ["Kurierfahrten nach Absprache", "Courier trips by arrangement", "Randevu ile kurye seferleri"],
    "svc.4.lead": [
      "Für eilige Einzelsendungen und kurzfristige Fahrten stehen wir bereit — auch kurzfristig erreichbar.",
      "For urgent single items and short-notice trips we are ready — and reachable at short notice.",
      "Acil tek gönderiler ve kısa sürede planlanan yollar için hazırız — kısa sürede ulaşılabiliriz.",
    ],
    "svc.4.b1": [
      "<strong>Persönliche Übergabe,</strong> quittiert vom Empfänger.",
      "<strong>Personal handover,</strong> signed for by the recipient.",
      "<strong>Elden teslim,</strong> alıcı tarafından imzalanır.",
    ],
    "svc.4.b2": [
      "<strong>Einzelsendungen</strong> und kleine Mengen.",
      "<strong>Single items</strong> and small volumes.",
      "<strong>Tek gönderiler</strong> ve küçük hacimler.",
    ],
    "svc.4.b3": [
      "<strong>Deutschlandweit unterwegs.</strong>",
      "<strong>On the road throughout Germany.</strong>",
      "<strong>Almanya genelinde hizmet.</strong>",
    ],
    "svc.4.cta": ["Kurier anfragen", "Request a courier", "Kurye talep et"],
    "svc.notes.eyebrow": ["Gut zu wissen", "Good to know", "Bilinmesi iyi olur"],
    "svc.notes.title": ["Worauf Sie sich verlassen können", "What you can rely on", "Neye güvenebilirsiniz"],
    "svc.notes.lead": [
      "Transport ist Vertrauenssache. Deshalb arbeiten wir mit klaren Absprachen statt mit Kleingedrucktem.",
      "Transport is a matter of trust. That is why we work with clear agreements instead of small print.",
      "Taşıma bir güven işidir. Bu yüzden küçük yazılar yerine net anlaşmalarla çalışıyoruz.",
    ],
    "svc.c1.title": ["Sorgfältige Verladung", "Careful loading", "Özenli yükleme"],
    "svc.c1.text": [
      "Wir sichern Ihre Sendung für die Fahrt — Paletten, Kartons, Möbel und empfindliche Güter.",
      "We secure your shipment for the trip — pallets, boxes, furniture and sensitive goods.",
      "Gönderinizi yol için sabitleriz — paletler, koliler, mobilya ve hassas yükler.",
    ],
    "svc.c2.title": ["Klare Absprachen", "Clear agreements", "Net anlaşmalar"],
    "svc.c2.text": [
      "Sie wissen vor der Fahrt, wann wir kommen und wann wir liefern.",
      "Before the trip you know when we arrive and when we deliver.",
      "Yola çıkmadan önce ne zaman geleceğimizi ve teslim edeceğimizi bilirsiniz.",
    ],
    "svc.c3.title": ["Ein Ansprechpartner", "One contact person", "Tek muhatap"],
    "svc.c3.text": [
      "Vom Angebot bis zur Zustellung sprechen Sie mit derselben Person.",
      "From quote to delivery you speak to the same person.",
      "Tekliften teslimata kadar aynı kişiyle konuşursunuz.",
    ],
    "svc.c4.title": ["Faire Angebote", "Fair quotes", "Adil teklifler"],
    "svc.c4.text": [
      "Der Preis steht vor der Fahrt fest — ohne versteckte Kosten.",
      "The price is fixed before the trip — with no hidden costs.",
      "Fiyat yola çıkmadan netleşir — gizli maliyet yok.",
    ],
    "svc.cta.eyebrow": ["Nächster Schritt", "Next step", "Sonraki adım"],
    "svc.cta.title": ["Sagen Sie uns, was transportiert werden soll", "Tell us what needs moving", "Neyin taşınacağını söyleyin"],
    "svc.cta.text": [
      "Ein kurzes Telefonat reicht meist, um Umfang, Termin und Preis zu klären.",
      "A short phone call is usually enough to settle size, date and price.",
      "Kapsam, tarih ve fiyatı netleştirmek için genelde kısa bir telefon yeterli.",
    ],

    /* --------------------------------------------------------------- about */
    "ab.hero.title": ["Transport aus Konstanz, für ganz Deutschland", "Transport from Constance, for all of Germany", "Konstanz'dan Almanya'nın tamamına"],
    "ab.hero.lead": [
      "Aydın Transport & Logistik ist ein familiengeführtes Unternehmen. Wir fahren dort, wo Sie uns brauchen — zuverlässig, schnell und pünktlich.",
      "Aydın Transport & Logistics is a family-run company. We drive wherever you need us — reliably, fast and on time.",
      "Aydın Transport & Lojistik bir aile işletmesidir. İhtiyacınız olan her yere gideriz — güvenilir, hızlı ve zamanında.",
    ],
    "ab.who.eyebrow": ["Über uns", "About us", "Hakkımızda"],
    "ab.who.title": ["Wer wir sind", "Who we are", "Biz kimiz"],
    "ab.who.lead": [
      "Wir sind ein familiengeführtes Transportunternehmen mit Sitz in Konstanz und fahren deutschlandweit für Privat- und Geschäftskunden.",
      "We are a family-run transport company based in Constance, driving throughout Germany for private and business customers.",
      "Konstanz merkezli aile işletmesiyiz; Almanya genelinde bireysel ve kurumsal müşteriler için taşıma yapıyoruz.",
    ],
    "ab.who.body": [
      "Unsere Stärke ist die Nähe: Sie erreichen uns direkt, wir planen jede Fahrt selbst und sind selbst unterwegs. So bleibt Verantwortung dort, wo sie hingehört.",
      "Our strength is being close at hand: you reach us directly, we plan every trip ourselves and we are the ones driving. Responsibility stays where it belongs.",
      "Gücümüz yakınlık: bize doğrudan ulaşırsınız, her seferi kendimiz planlar ve kendimiz direksiyonda oluruz. Sorumluluk olması gereken yerde kalır.",
    ],
    "ab.who.cta1": ["Angebot anfordern", "Request a quote", "Teklif isteyin"],
    "ab.who.cta2": ["Fuhrpark ansehen", "See the fleet", "Filomuzu görün"],
    "ab.who.caption": ["Konstanz · deutschlandweit im Einsatz", "Constance · on the road across Germany", "Konstanz · Almanya genelinde hizmet"],
    "ab.team.eyebrow": ["Unser Team", "Our team", "Ekibimiz"],
    "ab.team.title": [
      "Die Menschen hinter Aydın Transport & Logistik",
      "The people behind Aydın Transport & Logistics",
      "Aydın Transport & Lojistik'in arkasındaki insanlar",
    ],
    "ab.team.lead": [
      "Familiengeführt: Bei uns sprechen Sie direkt mit den Menschen, die planen und fahren.",
      "Family-run: you speak directly with the people who plan and drive.",
      "Aile işletmesi: sizinle planlayan ve süren insanlarla doğrudan konuşursunuz.",
    ],
    "ab.values.eyebrow": ["Worauf Sie sich verlassen können", "What you can count on", "Güvenebilecekleriniz"],
    "ab.values.title": ["Vier Zusagen, jeden Tag", "Four promises, every day", "Her gün dört söz"],
    "ab.values.lead": [
      "Wir versprechen nichts, was wir nicht halten können — dafür halten wir, was wir versprechen.",
      "We promise nothing we cannot keep — but what we promise, we keep.",
      "Tutamayacağımız sözü vermeyiz — verdiğimiz sözü ise tutarız.",
    ],
    "ab.v1.title": ["Zuverlässig", "Reliable", "Güvenilir"],
    "ab.v1.text": [
      "Wir erscheinen zum vereinbarten Termin und informieren, falls sich etwas ändert.",
      "We show up at the agreed time and tell you if anything changes.",
      "Söz verilen saatte geliriz; bir değişiklik olursa haber veririz.",
    ],
    "ab.v2.title": ["Schnell", "Fast", "Hızlı"],
    "ab.v2.text": [
      "Kurze Wege und direkte Entscheidungen — Ihre Anfrage wird nicht weitergereicht.",
      "Short paths and direct decisions — your enquiry is not passed around.",
      "Kısa yollar, doğrudan kararlar — talebiniz elden ele dolaşmaz.",
    ],
    "ab.v3.title": ["Pünktlich", "On time", "Zamanında"],
    "ab.v3.text": [
      "Abholung und Zustellung im vereinbarten Zeitfenster, nicht irgendwann am Tag.",
      "Collection and delivery inside the agreed window, not at some point in the day.",
      "Alım ve teslimat söz verilen zaman aralığında; günün rastgele bir saatinde değil.",
    ],
    "ab.v4.title": ["Persönlich", "Personal", "Kişisel"],
    "ab.v4.text": [
      "Ein Ansprechpartner für alles — vom ersten Anruf bis zur Übergabe.",
      "One contact person for everything — from the first call to the handover.",
      "Her şey için tek muhatap — ilk aramadan teslimata kadar.",
    ],
    "ab.facts.eyebrow": ["Auf einen Blick", "At a glance", "Bir bakışta"],
    "ab.facts.title": ["Unser Unternehmen in Zahlen und Fakten", "Our company in facts", "Rakamlarla şirketimiz"],
    "ab.facts.r1": ["Fahrzeugklasse", "Vehicle class", "Araç sınıfı"],
    "ab.facts.v1": ["3,5-Tonnen-Transporter", "3.5-tonne van", "3,5 tonluk araç"],
    "ab.facts.r2": ["Einsatzgebiet", "Coverage", "Çalışma alanı"],
    "ab.facts.v2": ["Deutschlandweit", "Throughout Germany", "Almanya genelinde"],
    "ab.facts.r3": ["Leistungen", "Services", "Hizmetler"],
    "ab.facts.v3": ["Transporte, Direktfahrten, Express, Kurier", "Transport, direct runs, express, courier", "Taşıma, direkt sefer, ekspres, kurye"],
    "ab.facts.r4": ["Kunden", "Customers", "Müşteriler"],
    "ab.facts.v4": ["Privat- und Geschäftskunden", "Private and business customers", "Bireysel ve kurumsal müşteriler"],
    "ab.facts.r5": ["Standort", "Location", "Konum"],
    "ab.facts.v5": ["Konstanz, Deutschland", "Constance, Germany", "Konstanz, Almanya"],
    "ab.cta.eyebrow": ["Kennenlernen", "Say hello", "Tanışalım"],
    "ab.cta.title": ["Sprechen wir über Ihre Sendung", "Let's talk about your shipment", "Gönderinizi konuşalım"],
    "ab.cta.text": [
      "Ein Anruf genügt, um zu klären, ob und wann wir fahren können.",
      "One call is enough to find out whether and when we can drive.",
      "Ne zaman ve nasıl taşıyabileceğimizi konuşmak için bir telefon yeterli.",
    ],

    /* ----------------------------------------------------------- solutions */
    "sol.hero.title": ["Lösungen für jede Sendung", "Solutions for every shipment", "Her gönderi için çözümler"],
    "sol.hero.lead": [
      "Ob einzelne Palette, Umzug oder regelmäßiger Firmenverkehr: Wir passen Fahrzeug und Ablauf an Ihre Sendung an.",
      "A single pallet, a move or regular company traffic: we fit the vehicle and the process to your shipment.",
      "Tek palet, ev taşıma ya da düzenli kurumsal taşıma: aracı ve süreci gönderinize göre uyarlıyoruz.",
    ],
    "sol.approach.eyebrow": ["Unser Ansatz", "Our approach", "Yaklaşımımız"],
    "sol.approach.title": ["Erst fragen, dann fahren", "Ask first, then drive", "Önce sor, sonra yola çık"],
    "sol.approach.lead": [
      "Wir klären Umfang, Termin und Besonderheiten, bevor die Fahrt beginnt. So gibt es unterwegs keine Überraschungen.",
      "We clarify size, timing and special requirements before the trip starts. That way there are no surprises on the road.",
      "Yol başlamadan önce hacmi, zamanı ve özel durumları netleştiririz. Böylece yolda sürpriz olmaz.",
    ],
    "sol.approach.b1": [
      "<strong>Klare Absprache</strong> zu Termin, Umfang und Preis.",
      "<strong>A clear agreement</strong> on time, size and price.",
      "<strong>Net anlaşma</strong>: zaman, hacim ve fiyat.",
    ],
    "sol.approach.b2": [
      "<strong>Passendes Fahrzeug</strong> für Ihre Sendung.",
      "<strong>The right vehicle</strong> for your shipment.",
      "<strong>Uygun araç</strong> gönderiniz için.",
    ],
    "sol.approach.b3": [
      "<strong>Rückmeldung bei der Zustellung.</strong>",
      "<strong>Confirmation on delivery.</strong>",
      "<strong>Teslimatta bilgilendirme.</strong>",
    ],
    "sol.approach.cta": ["Transport anfragen", "Request transport", "Taşıma talep et"],
    "sol.who.eyebrow": ["Für wen wir fahren", "Who we drive for", "Kimler için çalışıyoruz"],
    "sol.who.title": ["Privatkunden und Unternehmen", "Private customers and businesses", "Bireysel müşteriler ve kurumlar"],
    "sol.who.lead": [
      "Jede Sendung bekommt denselben sorgfältigen Ablauf — nur der Umfang unterscheidet sich.",
      "Every shipment gets the same careful process — only the size differs.",
      "Her gönderi aynı özenli süreçten geçer — yalnızca hacmi farklıdır.",
    ],
    "sol.w1.title": ["Privatkunden", "Private customers", "Bireysel müşteriler"],
    "sol.w1.text": [
      "Einzeltransporte, Möbel und Hausrat nach Absprache — sorgfältig verladen und direkt zugestellt.",
      "Single items, furniture and household goods by arrangement — carefully loaded and delivered directly.",
      "Tek parça taşıma, mobilya ve ev eşyası; randevu ile — özenle yüklenir, doğrudan teslim edilir.",
    ],
    "sol.w2.title": ["Geschäftskunden", "Business customers", "Kurumsal müşteriler"],
    "sol.w2.text": [
      "Regelmäßige Transporte, Direktfahrten und Express-Lieferungen für Betriebe und Handel.",
      "Regular transport, direct runs and express deliveries for companies and retail.",
      "İşletmeler ve ticaret için düzenli taşıma, direkt seferler ve ekspres teslimat.",
    ],
    "sol.w3.title": ["Eil- und Sondersendungen", "Urgent and special shipments", "Acil ve özel gönderiler"],
    "sol.w3.text": [
      "Kurzfristige Kurierfahrten und Sendungen, die kein Zwischenlager sehen dürfen.",
      "Short-notice courier trips and shipments that must not see an intermediate warehouse.",
      "Kısa sürede kurye seferleri ve ara depoya girmemesi gereken gönderiler.",
    ],
    "sol.example.eyebrow": ["Ablauf", "Walk-through", "Süreç"],
    "sol.example.title": ["So läuft eine Direktfahrt", "How a direct run works", "Direkt sefer nasıl işler"],
    "sol.example.lead": [
      "Vom Anruf bis zur Übergabe sind es drei Schritte — und Sie wissen in jedem davon, woran Sie sind.",
      "From the call to the handover there are three steps — and you know where you stand in each of them.",
      "Aramadan teslimata üç adım var — ve her adımda durumunuzu bilirsiniz.",
    ],
    "sol.example.b1": [
      "<strong>Anfrage.</strong> Sie nennen uns Abholort, Ziel, Zeitpunkt und Umfang der Sendung.",
      "<strong>Enquiry.</strong> You give us collection point, destination, timing and size.",
      "<strong>Talep.</strong> Alım yeri, varış yeri, zaman ve hacmi bize bildirirsiniz.",
    ],
    "sol.example.b2": [
      "<strong>Bestätigung.</strong> Wir bestätigen Termin und Preis — verbindlich und schriftlich.",
      "<strong>Confirmation.</strong> We confirm time and price — binding and in writing.",
      "<strong>Onay.</strong> Tarih ve fiyatı bağlayıcı şekilde yazılı onaylarız.",
    ],
    "sol.example.b3": [
      "<strong>Fahrt und Übergabe.</strong> Wir laden, fahren direkt und übergeben persönlich.",
      "<strong>Trip and handover.</strong> We load, drive directly and hand over in person.",
      "<strong>Yol ve teslim.</strong> Yükler, doğrudan gider ve elden teslim ederiz.",
    ],
    "sol.reach.eyebrow": ["Erreichbarkeit", "Reaching us", "İletişim"],
    "sol.reach.title": ["Kurze Wege, klare Auskunft", "Short paths, straight answers", "Kısa yollar, net cevaplar"],
    "sol.reach.lead": [
      "Sie erreichen uns telefonisch oder per E-Mail. Wir antworten in der Regel am selben Tag.",
      "You reach us by phone or email. We usually answer the same day.",
      "Bize telefon veya e-posta ile ulaşırsınız. Genellikle aynı gün yanıt veriyoruz.",
    ],
    "sol.reach.b1": [
      "<strong>Telefonisch</strong> für kurzfristige Anfragen und Änderungen.",
      "<strong>By phone</strong> for short-notice enquiries and changes.",
      "<strong>Telefonla</strong> kısa süreli talepler ve değişiklikler için.",
    ],
    "sol.reach.b2": [
      "<strong>Per E-Mail</strong> für Angebote, Listen und schriftliche Bestätigungen.",
      "<strong>By email</strong> for quotes, lists and written confirmations.",
      "<strong>E-posta ile</strong> teklifler, listeler ve yazılı onaylar için.",
    ],
    "sol.reach.b3": [
      "<strong>Vor Ort in Konstanz</strong> — Termine nach Absprache.",
      "<strong>On site in Constance</strong> — appointments by arrangement.",
      "<strong>Konstanz'da yerinde</strong> — randevu ile.",
    ],
    "sol.cta.eyebrow": ["Ihre Sendung", "Your shipment", "Gönderiniz"],
    "sol.cta.title": ["Sagen Sie uns, was zu tun ist", "Tell us what needs doing", "Ne yapmamız gerektiğini söyleyin"],
    "sol.cta.text": [
      "Wir prüfen die Anfrage, nennen Ihnen einen Termin und einen Preis — ohne Verpflichtung.",
      "We check the request, give you a date and a price — with no obligation.",
      "Talebi inceler, size tarih ve fiyat veririz — yükümlülük yok.",
    ],

    /* --------------------------------------------------------------- fleet */
    "fl.hero.title": ["Unser 3,5-Tonnen-Transporter", "Our 3.5-tonne van", "3,5 tonluk aracımız"],
    "fl.hero.lead": [
      "Flexibel im Stadtverkehr, belastbar auf der Langstrecke — unser Transporter ist das Herzstück jeder Fahrt.",
      "Flexible in city traffic, capable on long routes — our van is the heart of every trip.",
      "Şehir içinde çevik, uzun yolda dayanıklı — aracımız her seferin merkezinde.",
    ],
    "fl.vehicle.eyebrow": ["Unser Fahrzeug", "Our vehicle", "Aracımız"],
    "fl.vehicle.title": ["Ein Fahrzeug, das zu vielen Aufgaben passt", "One vehicle that fits many jobs", "Birçok işe uyan tek araç"],
    "fl.vehicle.lead": [
      "Ein 3,5-Tonnen-Transporter ist die richtige Wahl für Sendungen, die ohne Umladung und ohne Zwischenlager ans Ziel kommen sollen.",
      "A 3.5-tonne van is the right choice for shipments that should arrive without reloading or intermediate storage.",
      "3,5 tonluk bir araç, aktarma ve ara depo olmadan hedefine ulaşması gereken gönderiler için doğru seçimdir.",
    ],
    "fl.vehicle.b1": [
      "<strong>Direktfahrten</strong> ohne Umladung — ein Fahrzeug von Abholung bis Übergabe.",
      "<strong>Direct runs</strong> without reloading — one vehicle from collection to handover.",
      "<strong>Direkt seferler</strong>, aktarma yok — alımdan teslimata tek araç.",
    ],
    "fl.vehicle.b2": [
      "<strong>Express-Lieferungen</strong> für zeitkritische Sendungen.",
      "<strong>Express deliveries</strong> for time-critical shipments.",
      "<strong>Ekspres teslimat</strong> acil gönderiler için.",
    ],
    "fl.vehicle.b3": [
      "<strong>Deutschlandweit</strong> unterwegs, auch über weitere Strecken.",
      "<strong>Throughout Germany,</strong> including longer distances.",
      "<strong>Almanya genelinde</strong>, uzun mesafeler dahil.",
    ],
    "fl.vehicle.cursor": ["Unser Transporter", "Our van", "Aracımız"],
    "fl.cargo.eyebrow": ["Ladegut", "Cargo", "Yük"],
    "fl.cargo.title": ["Was wir typischerweise transportieren", "What we typically carry", "Genellikle taşıdıklarımız"],
    "fl.cargo.lead": [
      "Sagen Sie uns, worum es geht — wir prüfen, ob Fahrzeug und Termin passen.",
      "Tell us what it is — we check whether the vehicle and the date fit.",
      "Neyi taşıyacağınızı söyleyin — aracın ve tarihin uygun olup olmadığını kontrol ederiz.",
    ],
    "fl.c1.title": ["Paletten und Kartons", "Pallets and boxes", "Paletler ve koliler"],
    "fl.c1.text": [
      "Einzelne Paletten und kleinere Mengen, sicher verzurrt und trocken transportiert.",
      "Single pallets and small volumes, strapped securely and carried dry.",
      "Tek paletler ve küçük hacimler; güvenle sabitlenir, kuru taşınır.",
    ],
    "fl.c2.title": ["Möbel und Einzelstücke", "Furniture and single items", "Mobilya ve tek parçalar"],
    "fl.c2.text": [
      "Sperrige oder empfindliche Stücke, die sorgfältig verladen werden müssen.",
      "Bulky or sensitive pieces that need careful loading.",
      "Özenli yükleme gerektiren hacimli veya hassas parçalar.",
    ],
    "fl.c3.title": ["Geschäftliche Sendungen", "Business shipments", "Kurumsal gönderiler"],
    "fl.c3.text": [
      "Regelmäßige Lieferungen und Direktfahrten für Betriebe und Handel.",
      "Regular deliveries and direct runs for companies and retail.",
      "İşletmeler ve ticaret için düzenli teslimat ve direkt seferler.",
    ],
    "fl.cta.eyebrow": ["Kapazität", "Capacity", "Kapasite"],
    "fl.cta.title": ["Passt Ihre Sendung in unser Fahrzeug?", "Does your shipment fit our van?", "Gönderiniz aracımıza uygun mu?"],
    "fl.cta.text": [
      "Ein kurzer Anruf klärt Umfang, Termin und Machbarkeit.",
      "A short call settles size, date and feasibility.",
      "Kısa bir telefon hacmi, tarihi ve yapılabilirliği netleştirir.",
    ],

    /* ------------------------------------------------------------- contact */
    "ct.hero.title": ["Sprechen wir über Ihre Sendung", "Let's talk about your shipment", "Gönderinizi konuşalım"],
    "ct.hero.lead": [
      "Rufen Sie uns an oder schreiben Sie uns — wir melden uns mit einem konkreten Angebot zurück.",
      "Call us or write to us — we come back with a firm quote.",
      "Bizi arayın ya da yazın — net bir teklifle dönüş yapıyoruz.",
    ],
    "ct.info.phoneTitle": ["Telefon", "Phone", "Telefon"],
    "ct.info.phoneNote": ["Mo–Fr 08:00–18:00 Uhr", "Mon–Fri 08:00–18:00", "Pzt–Cum 08:00–18:00"],
    "ct.info.mailTitle": ["E-Mail", "Email", "E-posta"],
    "ct.info.mailNote": ["Antwort in der Regel am selben Tag", "Usually answered the same day", "Genellikle aynı gün yanıt"],
    "ct.info.addressTitle": ["Adresse", "Address", "Adres"],
    "ct.info.addressNote": ["Termine nach Absprache", "Appointments by arrangement", "Randevu ile"],
    "ct.info.hoursTitle": ["Erreichbarkeit", "Reachability", "Ulaşılabilirlik"],
    "ct.info.hours1": ["Telefon: Mo–Fr 08:00–18:00 Uhr", "Phone: Mon–Fri 08:00–18:00", "Telefon: Pzt–Cum 08:00–18:00"],
    "ct.info.hours2": ["Fahrten nach Vereinbarung", "Trips by arrangement", "Seferler randevu ile"],
    "ct.form.eyebrow": ["Anfrage", "Enquiry", "Talep"],
    "ct.form.title": ["Sagen Sie uns, was transportiert werden soll", "Tell us what needs moving", "Neyin taşınacağını söyleyin"],
    "ct.form.lead": [
      "Je genauer Ihre Angaben, desto schneller können wir Termin und Preis nennen.",
      "The more precise your details, the faster we can give you a date and a price.",
      "Bilgileriniz ne kadar net olursa tarih ve fiyatı o kadar hızlı verebiliriz.",
    ],
    "ct.f.name": ["Name", "Full name", "Ad soyad"],
    "ct.f.namePh": ["Vor- und Nachname", "First and last name", "Ad ve soyad"],
    "ct.f.company": ["Firma", "Company", "Firma"],
    "ct.f.companyPh": ["Optional", "Optional", "İsteğe bağlı"],
    "ct.f.email": ["E-Mail", "Email", "E-posta"],
    "ct.f.phone": ["Telefon", "Phone", "Telefon"],
    "ct.f.service": ["Leistung", "Service", "Hizmet"],
    "ct.f.servicePh": ["Bitte wählen", "Please choose", "Lütfen seçin"],
    "ct.f.opt1": ["Transport", "Transport", "Taşıma"],
    "ct.f.opt2": ["Direktfahrt", "Direct run", "Direkt sefer"],
    "ct.f.opt3": ["Express-Lieferung", "Express delivery", "Ekspres teslimat"],
    "ct.f.opt4": ["Kurierdienst", "Courier service", "Kurye hizmeti"],
    "ct.f.opt5": ["Etwas anderes", "Something else", "Başka bir şey"],
    "ct.f.origin": ["Abholort", "Collection point", "Alım yeri"],
    "ct.f.originPh": ["Straße, Ort", "Street, city", "Sokak, şehir"],
    "ct.f.destination": ["Zielort", "Destination", "Varış yeri"],
    "ct.f.date": ["Gewünschter Termin", "Preferred date", "Tercih edilen tarih"],
    "ct.f.details": ["Sendungsdetails", "Shipment details", "Gönderi detayları"],
    "ct.f.detailsPh": ["Anzahl Paletten/Kartons, Gewicht, Maße, Besonderheiten", "Number of pallets/boxes, weight, dimensions, special notes", "Palet/koli sayısı, ağırlık, ölçüler, özel notlar"],
    "ct.f.message": ["Nachricht", "Message", "Mesaj"],
    "ct.f.messagePh": ["Was soll transportiert werden und wann?", "What needs moving, and when?", "Ne taşınacak ve ne zaman?"],
    "ct.f.consent": [
      "Ich bin damit einverstanden, dass Aydın Transport & Logistik mich zu dieser Anfrage kontaktiert.",
      "I agree that Aydın Transport & Logistics may contact me about this enquiry.",
      "Aydın Transport & Lojistik'in bu talep için benimle iletişime geçmesini kabul ediyorum.",
    ],
    "ct.f.submit": ["Anfrage senden", "Send request", "Talebi gönder"],
    "ct.f.note": ["Unverbindlich. Ihre Daten werden nicht weitergegeben.", "No obligation. We never share your details.", "Yükümlülük yok. Bilgileriniz paylaşılmaz."],
    "ct.f.successTitle": ["Danke — Ihre Anfrage ist eingegangen.", "Thank you — your request has been received.", "Teşekkürler — talebiniz alındı."],
    "ct.f.successText": [
      "Wir melden uns mit einem konkreten Angebot zurück. Für dringende Fälle erreichen Sie uns telefonisch unter +49 160 801 66 59.",
      "We will come back with a firm quote. For anything urgent, call us on +49 160 801 66 59.",
      "Net bir teklifle dönüş yapacağız. Acil durumlar için +49 160 801 66 59 numaralı telefondan ulaşabilirsiniz.",
    ],
    "ct.f.required": ["Dieses Feld ist erforderlich.", "This field is required.", "Bu alan zorunludur."],
    "ct.f.invalidEmail": ["Bitte eine gültige E-Mail-Adresse eingeben.", "Please enter a valid email address.", "Lütfen geçerli bir e-posta adresi girin."],
    "ct.f.confirm": ["Bitte bestätigen, um fortzufahren.", "Please confirm to continue.", "Devam etmek için lütfen onaylayın."],
    "ct.area.eyebrow": ["Standort & Gebiet", "Location & coverage", "Konum & bölge"],
    "ct.area.title": ["In Konstanz zu Hause, in Deutschland unterwegs", "Based in Constance, driving across Germany", "Konstanz merkezli, Almanya genelinde"],
    "ct.area.lead": [
      "Unser Standort ist Konstanz. Abholung und Zustellung koordinieren wir deutschlandweit mit Ihnen.",
      "Our base is Constance. Collection and delivery are arranged with you throughout Germany.",
      "Merkezimiz Konstanz. Alım ve teslimatı Almanya genelinde sizinle planlıyoruz.",
    ],
    "ct.area.o1": ["Konstanz", "Constance", "Konstanz"],
    "ct.area.o1role": ["Standort", "Base", "Merkez"],
    "ct.area.o2": ["Deutschlandweit", "Throughout Germany", "Almanya genelinde"],
    "ct.area.o2role": ["Einsatzgebiet", "Coverage", "Hizmet alanı"],
    "ct.area.o2text": [
      "Transporte, Direktfahrten und Kurierdienste nach Absprache.",
      "Transport, direct runs and courier services by arrangement.",
      "Taşıma, direkt seferler ve kurye hizmetleri, randevu ile.",
    ],
    "ct.faq.eyebrow": ["Fragen", "Questions", "Sorular"],
    "ct.faq.title": ["Häufige Fragen", "Frequently asked questions", "Sık sorulan sorular"],
    "ct.q1": ["Wie schnell erhalte ich ein Angebot?", "How quickly will I get a quote?", "Teklifi ne kadar sürede alırım?"],
    "ct.a1": [
      "In der Regel am selben Tag. Am schnellsten geht es telefonisch unter +49 160 801 66 59 — dort klären wir Umfang und Termin direkt.",
      "Usually the same day. The fastest way is by phone on +49 160 801 66 59, where we can settle size and timing straight away.",
      "Genellikle aynı gün. En hızlısı +49 160 801 66 59 numarasını aramak — hacmi ve tarihi doğrudan konuşuruz.",
    ],
    "ct.q2": ["Ab welcher Menge nehmen Sie Aufträge an?", "What is the smallest job you take?", "En küçük işi kabul ediyor musunuz?"],
    "ct.a2": [
      "Wir fahren einzelne Sendungen ebenso wie regelmäßige Transporte. Umfang und Termin stimmen wir vorab mit Ihnen ab.",
      "We drive single shipments as well as regular transport. We agree size and timing with you in advance.",
      "Tek gönderileri de düzenli taşımaları da yapıyoruz. Hacmi ve tarihi önceden sizinle konuşuruz.",
    ],
    "ct.q3": ["Welche Gebiete bedienen Sie?", "Which areas do you cover?", "Hangi bölgelerde çalışıyorsunuz?"],
    "ct.a3": [
      "Wir sind deutschlandweit unterwegs. Abholung und Zustellung koordinieren wir mit Ihnen — auch über weitere Strecken.",
      "We operate throughout Germany. Collection and delivery are arranged with you, including longer distances.",
      "Almanya genelinde çalışıyoruz. Alım ve teslimatı sizinle planlıyoruz — uzun mesafeler dahil.",
    ],
    "ct.q4": ["Wie läuft der Kontakt während der Fahrt?", "How do we stay in touch during the trip?", "Yolculuk sırasında iletişim nasıl oluyor?"],
    "ct.a4": [
      "Wir melden uns bei der Abholung und vor der Zustellung. So wissen Sie jederzeit, wo Ihre Sendung ist.",
      "We check in at collection and again before delivery, so you always know where your shipment is.",
      "Alımda ve teslimattan önce haber veririz. Böylece gönderinizin nerede olduğunu her zaman bilirsiniz.",
    ],
    "ct.q5": ["Transportieren Sie auch für Privatkunden?", "Do you also transport for private customers?", "Bireysel müşteriler için de taşıma yapıyor musunuz?"],
    "ct.a5": [
      "Ja. Wir fahren für Privat- und Geschäftskunden — vom einzelnen Möbelstück bis zur regelmäßigen Lieferung.",
      "Yes. We drive for private and business customers — from a single piece of furniture to regular deliveries.",
      "Evet. Bireysel ve kurumsal müşteriler için taşıma yapıyoruz — tek bir mobilyadan düzenli teslimata kadar.",
    ],
    "ct.cta.title": ["Lieber direkt sprechen?", "Prefer to talk directly?", "Doğrudan konuşmayı mı tercih edersiniz?"],
    "ct.cta.text": [
      "Rufen Sie uns an — Sie sprechen direkt mit dem Fahrer und Inhaber.",
      "Give us a call — you speak directly to the driver and owner.",
      "Bizi arayın — doğrudan sürücü ve işletme sahibiyle konuşursunuz.",
    ],
  };

  /* --------------------------------------------------------------- engine */
  let current = DEFAULT_LANG;

  function normalise(lang) {
    return LANGS.includes(lang) ? lang : DEFAULT_LANG;
  }

  function t(key, lang) {
    const entry = DICT[key];
    if (!entry) return "";
    const index = LANGS.indexOf(normalise(lang || current));
    return entry[index] != null ? entry[index] : entry[0];
  }

  function apply(root, lang) {
    const scope = root || document;
    const code = normalise(lang || current);

    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n, code);
    });

    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml, code);
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((part) => (part || "").trim());
        if (attr && key) el.setAttribute(attr, t(key, code));
      });
    });

    document.documentElement.lang = code;

    const body = document.body;
    if (body) {
      if (body.dataset.titleKey) document.title = t(body.dataset.titleKey, code);
      const meta = document.querySelector('meta[name="description"]');
      if (meta && body.dataset.descKey) meta.setAttribute("content", t(body.dataset.descKey, code));
    }
  }

  const listeners = [];

  function store(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* storage unavailable — the choice simply does not persist */
    }
  }

  function read() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (error) {
      return DEFAULT_LANG;
    }
  }

  function set(lang) {
    const code = normalise(lang);
    const changed = code !== current;
    current = code;
    store(code);
    apply(document, code);
    listeners.forEach((fn) => fn(code));
    return changed;
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  window.AydinI18n = {
    langs: LANGS.slice(),
    t: (key, lang) => t(key, lang),
    lang: () => current,
    set,
    apply: (root) => apply(root, current),
    onChange,
  };

  current = normalise(read());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => apply(document, current));
  } else {
    apply(document, current);
  }
})();
