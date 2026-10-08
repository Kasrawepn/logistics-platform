# AGENTS.md — working notes for this repository

## What is here

- `website/` — the AYDIN TRANSPORT & LOGISTIK marketing site. Hand-written static
  HTML/CSS/JS, **no build step, no framework, no dependencies**. This is what port 3000
  serves.
- `logistics-platform/` — the original three-page Farsi demo (admin panel, customer
  request form, driver list) using `localStorage`. Unrelated to the site; it is not served
  by the compose stack.
- `server/` — the contact form API: a small Node service (`node:22-alpine`, one
  dependency, `nodemailer`) that mails form submissions to the owner's inbox. It is the
  only part of the project that needs credentials — see "The contact form and the mail
  service" below.

## The business behind the site

Real details, taken from the owner — do not invent more:

- Brand: **Aydın Transport & Logistik** (van livery: "Zuverlässig. Schnell. Pünktlich.",
  gold arc through the "A"), family-run, based in Konstanz.
- Phone `+49 160 801 66 59`, email `Aydinmuhammet601@gmail.com`,
  Herrenlandstraße 31–37, Konstanz. No postcode has been supplied — do not invent one.
- Services are the owner's list: deutschlandweite Transporte, Direktfahrten,
  Express-Lieferungen, Kurierdienste, on the strength of a 3.5-tonne van, for private and
  business customers. Everything the old "Horizon Logistics" site claimed beyond that
  (185 vehicles, ISO/AEO/GDP certificates, warehouses, Rotterdam/Duisburg/Antwerp/Verona
  hubs, customer logos, testimonials, statistics) was **placeholder fiction and has been
  removed** — do not reintroduce claims like these without the owner confirming them.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d        # http://localhost:3000
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
```

`web` is plain `nginx:alpine` with `website/` bind-mounted read-only, so **nginx reads the
files from disk on every request** — edit a file and just refresh; there is no rebuild, no
watcher and no restart to run. Cache headers are disabled for development in
`docker/nginx.default.conf`. Clean URLs work: `/services` also serves `services.html`.

Health check greps the served HTML for `aydin` (case-insensitive; matched by the brand
image path and the email address, both ASCII — the dotless "ı" in *Aydın* is not a safe
grep target). If that string disappears, update the check in `docker-compose.base44.yml`.

`docker/nginx.default.conf` is mounted read-only and nginx loads it **at startup only** —
editing it needs `docker compose -f docker-compose.base44.yml restart web`, unlike the site
files, which are picked up on refresh.

The stack has a second service, `api` (`server/`), which nginx proxies `/api/` to. It
installs its own dependencies at container start (`npm ci`, kept out of the repo in the
`contact_api_modules` volume) and reaches the outside world through `GMAIL_USER` +
`GMAIL_APP_PASSWORD` from the platform-managed env file. `web` deliberately does **not**
depend on `api`: the site must keep serving while the mail service is unconfigured, down or
still installing, and the form reports that sending failed. See the next section.

## Three languages — how the i18n layer works

The site is **German (default), English and Turkish**, switched client-side, no build step:

- `website/assets/js/i18n.js` holds the whole dictionary. Every entry is an array in the
  order `[de, en, tr]`, so keys can never drift between languages. It also exposes
  `window.AydinI18n` (`t()`, `lang()`, `set()`, `onChange()`), remembers the choice in
  `localStorage` under `aydin_lang`, and updates `<html lang>`, the document title and the
  meta description.
- Pages opt in per element: `data-i18n="key"` → textContent, `data-i18n-html="key"` →
  innerHTML (for strings carrying `<br>` or `<strong>`), `data-i18n-attr="placeholder:key"`
  → attributes. `<body data-title-key data-desc-key>` swaps title/description.
- **Every translatable string also carries its German text inline**, so the pages still
  read correctly with JS disabled or before the switch runs. Keep those two in sync.
- Head/footer live in `website/assets/js/layout.js`; both are rebuilt by `render()` on a
  language change, which is why script order matters:
  `i18n.js → layout.js → main.js`. `main.js` rebinds the header and curtain menu on the
  `layout:rendered` event (it guards its own scroll/resize/keydown listeners so repeated
  switches do not stack them up). If you add a script, keep that order.
- When adding a section: put the new key in `i18n.js` for all three languages and mark the
  markup — never hard-code a language into a component.

## How the site is put together

- **Header and footer are injected by JavaScript.** To change navigation, the phone
  number, address or footer columns, edit `layout.js` — do **not** copy markup into each
  page. Every page opts in with `<div data-component="header">` / `<div data-component="footer">`
  and identifies itself with `<body data-page="home|services|about|solutions|fleet|contact">`,
  which drives the active navigation state.
- **CSS is split by layer** and every page loads all three in this order:
  `base.css` (tokens, reset, typography, buttons, reveal primitives),
  `components.css` (header, footer, cards, carousel, forms, accordion, cursor, language
  switch), `pages.css` (hero, page hero, splits, CTA band, contact layout).
  Add a new page section to `pages.css`; add a reusable widget to `components.css`.
- **Colours and spacing come from CSS custom properties** in `:root` in `base.css`
  (`--navy-900`, `--ivory`, `--gold`, `--section-y`, …) — the navy `#0A1A2F` and gold
  `#C5A059` come from the company's own van livery, so keep the palette.
- **Mobile widths**: the 12-column grids (`.split`) use a `clamp()` gap whose *minimum*
  matters — eleven column gaps at 40px already need 440px, which is wider than any phone and
  dragged the whole page sideways. `html` also carries `overflow-x: clip` as a safety net, so
  a `[data-reveal="right"]` element before it reveals, or the 1.04 zoom scale left on media,
  cannot make the page pannable. Verify widths by measuring rather than by eye: load the page
  in a 320/375/414px iframe and assert `documentElement.scrollWidth === clientWidth` and that
  `.site-header__inner` does not overflow (an alpine+chromium image and `--dump-dom` is enough).
- **Animations**: `data-reveal` fades an element in on scroll, `data-reveal-group="90"`
  staggers children, `data-count="123"` animates a number, `data-cursor="Label"` shows a
  label in the cursor ring. All disabled under `prefers-reduced-motion`; each page carries a
  `<noscript>` fallback so content is never hidden if JS fails.
- Brand assets: the site runs on the owner's own photography — `aydin-van-white.jpg` /
  `aydin-van-dark.jpg` (the two liveried vans), `aydin-trucks.jpg` (parked fleet),
  `aydin-office.jpg` (the branded meeting room) and `aydin-team-1..4.jpg` (driver
  portraits). The old Unsplash stock photos have been deleted; `aydin-van-branded.png` is
  the earlier cut-out, kept but no longer referenced. The new files were cut from the
  owner's phone photos: the phone status bar and navigation bar were trimmed off, and each
  portrait is a 4:5 crop centred on the detected face — that is what keeps faces readable
  under `object-fit: cover` in the narrow service-card and panel slots. Re-crop with a face
  detector rather than a plain centre crop if these are ever replaced.
- `about.html` carries a `Unser Team` portrait grid (`.team-grid` / `.team-card` in
  `pages.css`) fed by the four driver photos; its copy lives under the `ab.team.*` i18n
  keys.

## The contact form and the mail service

`contact.html` posts its form to `/api/contact` **on its own origin** — nginx forwards
`/api/` to the `api` service (upstream resolved per request, so nginx starts and keeps
serving without it). Nothing is written to `localStorage` any more: the form either hands
the enquiry to the mail service or shows the `.form-error` block (`ct.f.errorTitle` /
`ct.f.errorText` in `i18n.js`, all three languages), and the submit button is disabled
while the request is in flight.

`server/server.js` keeps its dependencies to one (`nodemailer`) on purpose: `node:http`
serves the two routes (`GET /api/health`, `POST /api/contact`). It validates and
length-caps every field, drops unknown ones, rate-limits 5 messages per 10 minutes per IP
(`X-Forwarded-For` from nginx), escapes the HTML part, sets the customer's address as
`Reply-To`, and mails to `CONTACT_TO` (compose `environment:`, default the owner's Gmail).

The credentials are the owner's: `GMAIL_USER` and `GMAIL_APP_PASSWORD` — a Google **App
Password**, which needs 2-step verification on that account; the normal account password
will not authenticate over SMTP. They are declared in `.base44/environment.json` and
delivered to `/run/base44/app.env`; never add them to compose `environment:`, which would
permanently outrank the dashboard values. Without them the service still boots, reports
`{"ok":true,"mail":"missing"}` on `/api/health` and answers `503` on `/api/contact` instead
of pretending to send — which is what the form's error state means in practice.

To exercise delivery without a real mailbox, point `SMTP_HOST`/`SMTP_PORT` at a throwaway
SMTP sink through a compose override file kept outside the repo, then submit the form: the
headers (`To: Aydinmuhammet601@gmail.com`, `Reply-To` = customer) and the message are
readable in the sink's log. That is how this wiring was verified — the Gmail handshake
itself can only be proven with the real App Password.

## Known loose ends

- Contact-form delivery needs the owner's Google App Password (`GMAIL_APP_PASSWORD`); until
  it is set, the form reports its error state instead of delivering.
- The `api` service has to be deployed next to the static site — a host that can only serve
  files has no `/api/contact`, and the form then shows its error state.
- Footer legal links (Impressum, Datenschutz, AGB) are `#` placeholders.
- The site is trilingual with no server-side routing: crawlers only ever index the German
  copy at the canonical URLs.

## Verifying a change

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/           # expect 200
curl -s http://localhost:3000/ | grep -i 'aydin'                         # real content
for p in index services about solutions fleet contact; do
  curl -s -o /dev/null -w "$p %{http_code}\n" http://localhost:3000/$p.html
done
curl -s http://localhost:3000/api/health                                 # {"ok":true,"mail":…}
docker compose -f docker-compose.base44.yml ps                           # web + api: healthy
```

There is no test suite; the site is verified by loading it, by flipping DE/EN/TR (all three
languages must render every page without blank spots) and by checking that every page and
asset returns 200. The form is verified in the browser: fill it, submit, and expect the
success block — with mail unconfigured (or the service stopped) the `.form-error` block must
appear instead.
