# BRAND — ZeitZurück®

*Die eine Quelle für Farben, Schrift und Ton. Wer irgendwo gestaltet — App, Mail, Bestätigungsseite, Website — liest zuerst hier. Ändert sich die Marke, wird zuerst diese Datei geändert, dann der Code.*

**Wo die Werte im Code leben:** `:root` in app.html (App-Farben) · `betriebe`-Tabelle in Supabase (`farbe_kopf`, `farbe_akzent` je Betrieb für Kundenmails) · Mailvorlagen in n8n (Rechnung senden, Angebot beantworten).

---

## Marke

ZeitZurück® — „Dein digitales Büro" für kleine österreichische Betriebe.

Ton: ruhig, professionell, handwerklich-ehrlich. Kein Tech-Glanz, keine KI-Ästhetik. Wir vermarkten Professionalität, nicht KI. Deutsch; **Sie** gegenüber Endkunden, **Du** gegenüber dem Betriebsinhaber. Fußzeilen nur „ZeitZurück®", ohne Personennamen.

## Farben

| Zweck | Wert |
|---|---|
| Petrol / Tannengrün (Primär: Kopfzeilen, Hauptknöpfe, H1) | `#1A3A2B` |
| Petrol dunkel (Verläufe, gedrückt) | `#12281d` |
| Tinte (Text auf hell) | `#14221b` |
| Gold (Akzent: Linien, Hervorhebungen, Buchhaltungs-Banner) | `#C9A054` |
| Gold dunkel / Warnung („noch offen") | `#A9853C` / `#b3701f` |
| Papier (Seitenhintergrund) | `#FAF9F7` |
| Elfenbein (Karten, Mail-Hintergründe) | `#F7F4EB` / `#FBF9F3` |
| Linie (Rahmen, Trenner) | `#e4e1da` / `rgba(26,58,43,.13)` |
| Gedämpft (Nebentext App / Mails) | `#5c6a63` / `#8a857c` |
| OK | `#2f9e6f` |
| Fehler | `#c0473b` |

Statusfarben-Logik: Grün = erledigt/angenommen · Goldbraun = wartet/offen · Grau = abgelehnt/storniert.

## Typografie

- **Poppins** (400/500/600, liegt als woff2 im Repo) für Überschriften, Zahlen, Beträge.
- Systemschrift (`-apple-system, Segoe UI, Roboto`) für Fließtext in der App.
- **Helvetica/Arial** in E-Mails (mail-sicher, keine Webfonts).

## Formen

- Karten weiß auf Papier, 1-px-Rahmen, Radius 10–14 px, weiche Schatten.
- Status als Pillen: klein, abgerundet, Schriftgewicht 600. Wortlaut wie in der App: „Offen", „Angebot offen", „Angebot versendet", „Bezahlt ✓", „Überfällig".
- Hauptknopf dunkelgrün gefüllt (Radius 6–7 px), Zweitknopf weiß mit Rahmen `#ccc6b8`.

## Bildmarke

`zeitzurueck-logo-light.svg` · `zeitzurueck-logo-dark.svg` · `zeitzurueck-favicon.svg` · Mail-Fassungen als PNG (`zeitzurueck-logo-mail.png`, `-hell.png`). Alle im Repo-Stamm.

## Grundsätze, die auch Gestaltung sind

- Ein Klick zeigt nur — erst das Bestätigen handelt.
- Erfundene Daten sind schlimmer als fehlende: lieber „—" als eine plausible Zahl.
- Die Wörter der Nutzer übernehmen („Termin ausmachen", nicht „Anfrage senden").
