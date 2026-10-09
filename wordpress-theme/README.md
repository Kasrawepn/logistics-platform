# WordPress-Theme für Aydın Transport & Logistik

Diese Website gibt es zweimal: als statische Seite (`website/`, was die Base44-Vorschau
auf Port 3000 ausliefert) und als WordPress-Theme (`aydin-transport/`), das auf der
eigenen Domain in konsoleH hochgeladen wird.

## Theme bauen

```bash
python3 wordpress-theme/build.py
```

Kopiert `website/assets/` in das Theme, erzeugt aus jeder statischen Seite ein
PHP-Template und schreibt `aydin-transport.zip` (zusätzlich nach
`website/downloads/`, damit der Zip über die laufende Vorschau herunterladbar ist).
Die Templates in `aydin-transport/page-*.php` und `front-page.php` sind generiert —
Inhalte gehören in `website/`, danach erneut bauen.

## Theme lokal testen

Eine Wegwerf-WordPress-Instanz auf Port 8080 (nicht die Base44-Vorschau, die läuft auf
3000 weiter):

```bash
docker compose -f wordpress-theme/docker-compose.test.yml up -d

docker compose -f wordpress-theme/docker-compose.test.yml run --rm cli \
  wp core install --url=http://localhost:8080 --title="Aydın Transport & Logistik" \
  --admin_user=admin --admin_password=local-test-only --admin_email=admin@example.com --skip-email
docker compose -f wordpress-theme/docker-compose.test.yml run --rm cli wp theme activate aydin-transport
docker compose -f wordpress-theme/docker-compose.test.yml run --rm cli wp option update permalink_structure '/%postname%/'

curl -s http://localhost:8080/services/ | head -20
docker compose -f wordpress-theme/docker-compose.test.yml down -v   # danach aufräumen
```

Das Theme ist als Bind-Mount eingehängt: nach einem neuen Build ist kein Image-Neubau
nötig. Die Aktivierung legt die fünf Unterseiten an (Slugs `services`, `about`,
`solutions`, `fleet`, `contact`) — genau die Slugs, aus denen `functions.php` die URLs
für Navigation und Footer baut.
