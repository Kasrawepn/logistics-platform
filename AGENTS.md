# AGENTS.md — working notes for this repository

## What is here

- `website/` — the HORIZON LOGISTICS marketing site. Hand-written static HTML/CSS/JS,
  **no build step, no framework, no dependencies**. This is what port 3000 serves.
- `logistics-platform/` — the original three-page Farsi demo (admin panel, customer
  request form, driver list) using `localStorage`. Untouched by the site work; it is not
  served by the compose stack.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d        # http://localhost:3000
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
```

`web` is plain `nginx:alpine` with `website/` bind-mounted read-only, so **nginx reads the
files from disk on every request** — edit a file and just refresh; there is no rebuild,
no watcher and no restart to run. Cache headers are disabled for development in
`docker/nginx.default.conf`. Clean URLs work: `/services` also serves `services.html`.

Health check greps the served HTML for `horizon logistics` (case-insensitive). If you
change the site so that string disappears, update the check in `docker-compose.base44.yml`.

## How the site is put together

- **Header and footer are injected by JavaScript**, from `website/assets/js/layout.js`.
  To change navigation, the phone number, footer columns or social links, edit that one
  file — do **not** copy markup into each page. Every page opts in with
  `<div data-component="header">` / `<div data-component="footer">` and identifies itself
  with `<body data-page="home|services|about|solutions|fleet|contact">`, which drives the
  active navigation state.
- **CSS is split by layer** and every page loads all three in this order:
  `base.css` (tokens, reset, typography, buttons, reveal primitives),
  `components.css` (header, footer, cards, carousel, forms, accordion, cursor),
  `pages.css` (hero, page hero, splits, CTA band, contact layout).
  Add a new page section to `pages.css`; add a reusable widget to `components.css`.
- **Colours and spacing come from CSS custom properties** in `:root` in `base.css`
  (`--navy-900`, `--ivory`, `--gold`, `--section-y`, …). Change the palette there, not in
  individual rules.
- **Animations**: put `data-reveal` on an element to fade it in on scroll, and
  `data-reveal-group="90"` on its parent to stagger children by 90 ms. `data-count="123"`
  animates a number. `data-cursor="Label"` shows the label in the custom cursor ring.
  All of it is disabled under `prefers-reduced-motion`, and each page carries a
  `<noscript>` fallback so content is never hidden if JS fails.
- Scripts are loaded with `defer` in the order `layout.js` then `main.js`; `main.js`
  assumes the header exists.

## Placeholder content to replace before launch

- Phone `(555) 246-7890`, emails `hello@` / `quotes@horizonlogistics.com`, the Rotterdam /
  Duisburg / Antwerp / Verona addresses, opening hours.
- Every statistic, service level, certification claim, timeline entry, customer name and
  testimonial on the site is **illustrative placeholder copy**, not audited fact.
- The quote form on `contact.html` validates input and stores the submission in
  `localStorage` under `horizon_enquiries` — there is **no backend**, so nothing is
  actually delivered. Wire it to a form endpoint, CRM or mail service before going live.
- Photography lives in `website/assets/img/` (downloaded from Unsplash, free for
  commercial use). Swap in the client's own fleet and facility photography when available;
  keep the wide/portrait crops so the `media-stack` layout still works.

## Verifying a change

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/           # expect 200
curl -s http://localhost:3000/ | grep -i 'horizon logistics'             # real content
docker compose -f docker-compose.base44.yml ps                           # web: healthy
```

There is no test suite; the site is verified by loading it and by checking that every
page and asset returns 200.
