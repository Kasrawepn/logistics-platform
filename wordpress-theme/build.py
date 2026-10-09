#!/usr/bin/env python3
"""Build the uploadable WordPress theme from the static site.

    python3 wordpress-theme/build.py

Reads `website/*.html` and `website/assets/`, writes the theme in
`wordpress-theme/aydin-transport/` and a ready-to-upload zip next to it (plus a
copy under `website/downloads/`, which the running preview serves, so the zip can
simply be downloaded from the browser).

The generated page templates are not meant to be edited by hand: change the
static site and run this again.
"""

import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "website"
THEME = ROOT / "wordpress-theme" / "aydin-transport"
SLUG = "aydin-transport"

# (static page, template file, WordPress slug, name shown in the page editor)
PAGES = [
    ("index.html", "front-page.php", "home", None),
    ("services.html", "page-services.php", "services", "Leistungen"),
    ("about.html", "page-about.php", "about", "Über uns"),
    ("solutions.html", "page-solutions.php", "solutions", "Lösungen"),
    ("fleet.html", "page-fleet.php", "fleet", "Fuhrpark"),
    ("contact.html", "page-contact.php", "contact", "Kontakt"),
]

ASSET_RE = re.compile(r'(src|href)="assets/([^"]+)"')
PAGE_REF_RE = re.compile(
    r'href="(index|services|about|solutions|fleet|contact)\.html(#[A-Za-z0-9_-]+)?"'
)
FORM_RE = re.compile(r"\n[ \t]*<form\b.*?</form>\n", re.S)
CONTACT_HEADING_RE = re.compile(r'(<h2[^>]*data-i18n=")ct\.form\.title("[^>]*>).*?(</h2>)', re.S)
CONTACT_LEAD_RE = re.compile(r'(<p[^>]*data-i18n=")ct\.form\.lead("[^>]*>).*?(</p>)', re.S)

CONTACT_HEADING = "Kontakt aufnehmen"
CONTACT_LEAD = (
    "Am schnellsten erreichen Sie uns per WhatsApp oder Telefon — "
    "wir melden uns mit einem konkreten Angebot zurück."
)


def body_markup(html):
    """The page markup between <body> and </body>.

    Drops the header/footer slots and the skip link (header.php provides them)
    and the script tags (functions.php enqueues the same files).
    """
    body = html.split("<body", 1)[1].split(">", 1)[1].split("</body>", 1)[0]
    keep = []
    for line in body.splitlines():
        stripped = line.strip()
        if 'data-component="header"' in stripped or 'data-component="footer"' in stripped:
            continue
        if 'class="skip-link"' in stripped:
            continue
        if stripped.startswith("<script"):
            continue
        keep.append(line)
    return "\n".join(keep).strip("\n")


def to_php(markup, contact=False):
    """Turn links and asset paths into WordPress URLs."""
    markup = ASSET_RE.sub(
        lambda m: "%s=\"<?php echo esc_url( aydin_asset( '%s' ) ); ?>\"" % (m.group(1), m.group(2)),
        markup,
    )

    def page_ref(match):
        slug = "home" if match.group(1) == "index" else match.group(1)
        hash_arg = ", '%s'" % match.group(2) if match.group(2) else ""
        return "href=\"<?php echo esc_url( aydin_page_url( '%s'%s ) ); ?>\"" % (slug, hash_arg)

    markup = PAGE_REF_RE.sub(page_ref, markup)

    if contact:
        # The owner's hosting cannot run the mail service, so this page offers
        # WhatsApp and phone instead of the form.
        markup = CONTACT_HEADING_RE.sub(
            lambda m: m.group(1) + "ct.quote.title" + m.group(2) + CONTACT_HEADING + m.group(3),
            markup,
        )
        markup = CONTACT_LEAD_RE.sub(
            lambda m: m.group(1) + "ct.quote.lead" + m.group(2) + CONTACT_LEAD + m.group(3),
            markup,
        )
        markup = FORM_RE.sub(
            "\n<?php get_template_part( 'template-parts/contact-cta' ); ?>\n", markup
        )

    return markup


def write_template(src_name, template, template_name, markup):
    lines = [
        "<?php",
        "/**",
        " * %s" % (template_name or "Startseite"),
        " *",
        " * Generated from website/%s by wordpress-theme/build.py — edit the static" % src_name,
        " * page and re-run the build instead of editing this file.",
        " */",
    ]
    if template_name:
        lines += ["", "/*", "Template Name: %s" % template_name, "*/"]
    lines += ["", "get_header();", "?>", "", markup, "", "<?php", "get_footer();", ""]
    (THEME / template).write_text("\n".join(lines), encoding="utf-8")


def sync_assets():
    target = THEME / "assets"
    if target.exists():
        shutil.rmtree(target)
    for folder in ("css", "js", "img"):
        shutil.copytree(SRC / "assets" / folder, target / folder)


def zip_theme():
    zipped = ROOT / "wordpress-theme" / ("%s.zip" % SLUG)
    with zipfile.ZipFile(zipped, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(THEME.rglob("*")):
            if path.is_file():
                archive.write(path, "%s/%s" % (SLUG, path.relative_to(THEME)))

    downloads = SRC / "downloads"
    downloads.mkdir(exist_ok=True)
    shutil.copy2(zipped, downloads / zipped.name)
    return zipped


def main():
    sync_assets()
    for src_name, template, _slug, template_name in PAGES:
        html = (SRC / src_name).read_text(encoding="utf-8")
        markup = to_php(body_markup(html), contact=(template == "page-contact.php"))
        write_template(src_name, template, template_name, markup)
        print("wrote %s from %s" % (template, src_name))

    zipped = zip_theme()
    print("zip: %s (%d KB)" % (zipped.relative_to(ROOT), zipped.stat().st_size // 1024))


if __name__ == "__main__":
    main()
