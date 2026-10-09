Aydın Transport & Logistik — WordPress-Theme
============================================

Dieselbe Website wie die statische Fassung, als WordPress-Theme. Kein
Page-Builder, keine Blöcke: die Templates geben die Gestaltung der Seite aus,
die Dreisprachigkeit (DE/EN/TR) steckt in assets/js/i18n.js.

Installation auf der eigenen Domain
-----------------------------------

1. In konsoleH anmelden und die Dateiverwaltung (oder FTP) öffnen.
2. Diesen Ordner "aydin-transport" nach
   /wp-content/themes/ kopieren — oder die Datei aydin-transport.zip unter
   Design → Themes → "Theme hinzufügen" → "Theme hochladen" hochladen.
3. Unter Design → Themes das Theme "Aydın Transport & Logistik" aktivieren.
   Beim Aktivieren legt es automatisch die fünf Unterseiten an:
   /services/ /about/ /solutions/ /fleet/ /contact/
4. Unter Einstellungen → Permalinks die Struktur "Beitragsname" wählen und
   speichern (damit die Seiten unter /services/ statt /?page_id=7 erreichbar
   sind).
5. Fertig: die Startseite ist die Startseite der Domain, das Logo-Menü, die
   Sprachumschaltung DE/EN/TR und die schwebenden WhatsApp-/Telefon-Buttons
   funktionieren wie auf der statischen Seite.

Hinweise
--------

* Die Seiteninhalte sind fest in den Templates hinterlegt — Textänderungen
  gehören in die statische Website (Ordner website/) und danach
  "python3 wordpress-theme/build.py" im Projekt. Danach das Theme erneut
  hochladen.
* Auf der Kontaktseite gibt es kein Formular: der Mail-Versand der statischen
  Seite lief über einen kleinen Node-Dienst, der auf diesem Hosting nicht läuft.
  Stattdessen stehen dort WhatsApp und Telefon.
* Die mitgelieferten Seiten "Hello world" und "Sample Page" können gelöscht
  werden, sie gehören nicht zur Website.
