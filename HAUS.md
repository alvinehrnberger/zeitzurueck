# Das Haus — ZeitZurück® als Firma

**Gilt für alle Editionen.** Legal ist eine davon, Handwerk ist eine davon.
Diese Datei gehört in **jedes** ZeitZurück-Repository, wortgleich. Wenn sie
sich unterscheidet, ist eine davon falsch.

Alles Produktspezifische steht woanders: `SPEC.md` (Legal),
`PROJECT_MEMORY.md` (Handwerk).

**Stand: 13.8.2026**

---

## Der Satz, aus dem alles folgt

> „Eigentlich sollte ZeitZurück® die Firma sein und Legal ist eben eine
> Edition davon." — Alvin, 12.8.2026

Alles Weitere ist nur die konsequente Anwendung dieses Satzes.

---

## Domains

| Domain | Rolle |
|---|---|
| **zeitzurück.at** | Die Firma. Marketing, Auftritt. |
| **legal.zeitzurück.at** | Die Edition Legal. CNAME auf `alvinehrnberger.github.io`, HTTPS aktiv. |
| **admin.zeitzurück.at** | Der Betreiber-Bereich. Nur Alvin. Kein Kunde sieht das je. |
| **zeitzurueck.at** (ohne Umlaut) | **Die Mail-Domain.** SPF gesetzt, DKIM eingerichtet, MX auf world4you. |
| **zeitzurück.de** | Schutzregistrierung, leitet weiter. Kein zweiter Auftritt. |

**Verworfen: zeitzurück-legal.at.** Klingt gut, zerreißt aber die Marke: jede
eigene Domain zwingt zur Zwillingsregistrierung (.de), zu eigenem Impressum,
eigenem Zertifikat, eigener Pflege — und das für **jede** künftige Edition.
Aufgehoben für den Tag, an dem Legal ein eigenes Gesicht wirklich braucht.

Der Grund ist nicht die Umlautfrage. Der Grund ist der Auftritt.

---

## Die drei Repositories

GitHub Pages erlaubt **genau eine eigene Adresse je Repository**. Deshalb gibt
es drei — nicht aus Ordnungsliebe, sondern weil die Technik es erzwingt.

| Repository | Adresse | Inhalt |
|---|---|---|
| `zeitzurueck` | zeitzurück.at | Die Firma, Handwerk-Seiten, App |
| `zeitzurueck-legal` | legal.zeitzurück.at | Die Edition Legal |
| `zeitzurueck-admin` | admin.zeitzurück.at | Der Betreiber-Bereich |

`HAUS.md` liegt in allen dreien, wortgleich. `_config.yml` in allen dreien,
sonst liegen die Notizen auf der Straße.

---

## Postfächer

World4You, Paket **E-Mail Grow** (Nr. 31920714), 5 Adressen inklusive, 5 GB.

| Adresse | Art | Wofür |
|---|---|---|
| **office@zeitzurueck.at** | Postfach | Alles Menschliche: Anfragen, Rückfragen, Angebote, Verträge. |
| **rechnung@zeitzurueck.at** | Postfach | **Jede Rechnung — aus jeder Edition.** Stripe, Buchhaltung, Steuerberater. |
| **datenschutz@zeitzurueck.at** | Alias auf office@ | AVV, Auskunftsbegehren, Datenschutzerklärung. |

**Verworfen: legal@.** Liest sich wie die Rechtsabteilung eines Konzerns.
Kein support@, kein info@.

---

## Wer trägt welches Gesicht — die drei Regeln

Es kommt darauf an, **wer schreibt**, nicht **worum es geht**.

**1. ZeitZurück schreibt als Firma** — Onboarding, Rechnung, Vertrag, Antwort
auf eine Anfrage: **immer derselbe ZeitZurück-Auftritt**, für alle Editionen
gleich. Die Edition steht als *Wort* in der Unterzeile, niemals als eigene Farbe.

> Farbe ist das stärkste Erkennungszeichen einer Marke. Wer sie an Editionen
> verteilt, hat nach der dritten Edition keine Marke mehr, sondern drei.
> **Wörter skalieren, Paletten nicht.**

**2. Die Maschine schreibt im Namen eines Kunden** — Terminbestätigung an
dessen Mandanten: **der Auftritt des Kunden**, dezent „Powered by ZeitZurück®".

> **Bei einer echten Kanzlei geht die Bestätigung über deren eigene Adresse
> hinaus, nicht über die von ZeitZurück.** Der Mandant hat mit der Kanzlei
> gesprochen, nicht mit uns. Die Absenderadresse gehört ins Onboarding.
> **Wir bedienen die Kanzlei, wir ersetzen sie nicht.**

**3. Produktoberflächen dürfen ihre eigene Welt haben.** Legal ist dunkelblau
mit Bronze, weil man eine Kanzlei anders anspricht als einen Tischler.

> **Das Produkt trägt die Welt des Kunden. Die Firma trägt einen Anzug.**

---

## Rechnungen und Nummernkreise

**Ein Einzelunternehmen, zwei Datenbanken, zwei Zahlenreihen.**

§ 11 Abs 1 Z 2 UStG verlangt eine „fortlaufende Nummer mit **einer oder
mehreren Zahlenreihen**, die zur Identifizierung der Rechnung einmalig
vergeben wird". Mehrere Reihen sind ausdrücklich erlaubt. Verboten ist genau
zweierlei: **dieselbe Nummer zweimal** und **eine unerklärte Lücke**.

| Kreis | Datenbank | Format | Wofür |
|---|---|---|---|
| **HAUS** | ZeitZurück (adggxent…) | `M 03/2026`, `ZZ 04/2026` | Montageservice und ZeitZurück Handwerk — eine gemeinsame Reihe, das Präfix nennt nur den Betrieb |
| **ZL** | ZeitZurueck Legal (azxmzqyt…) | `ZL 01/2026` | ZeitZurück Legal |
| **DEMO** | beide | `DEMO 01/2026` | Vorführung, verbraucht keine echte Nummer |

**Warum nicht eine gemeinsame Reihe über alles?** Weil die Produkte in
getrennten Datenbanken leben. Ein gemeinsamer Zähler bräuchte eine Herrin und
eine, die über das Netz fragt — steht die Herrin, kann niemand mehr eine
Rechnung schreiben. Getrennte Reihen sind erlaubt, robuster und beim
Buchhalter sauberer auswertbar.

### Der Fehler, der am 12.8.2026 behoben wurde

Die nächste Rechnungsnummer wurde **im Browser errechnet**, indem die
vorhandenen Rechnungen gezählt wurden (`nummernkreis.js`). Das hält so lange,
bis zwei Rechnungen kurz hintereinander entstehen — dann bekommen beide
dieselbe Nummer — oder bis eine Zeile gelöscht wird — dann wird eine Nummer
ein zweites Mal vergeben. Genau das ist das Einzige, was das Gesetz verbietet.

**Jetzt vergibt die Datenbank die Nummer:** Tabelle `rechnungsnummern`,
Funktion `naechste_rechnungsnummer(praefix)`. Eine Zeile, ein Schloss, ein
Hochzählen. Vergeben ist vergeben — auch wenn die Rechnung danach storniert
oder gelöscht wird. Zusätzlich ein eindeutiger Index auf `rechnungen.nummer`:
dieselbe Nummer zweimal lässt die Datenbank nicht mehr zu.

**Stand der Zähler:** HAUS 2026 = 2, DEMO 2026 = 2, ZL 2026 = 0.
Die Honorarnoten 01/2026 und 02/2026 wurden außerhalb des Systems geschrieben —
daher startet HAUS bei 2. **Das ist die Erklärung für die ersten beiden
Nummern; sie gehört genau deshalb hierher.**

### Versand

Jede Rechnung geht über **rechnung@zeitzurueck.at** hinaus, aus jeder Edition.
Dafür braucht n8n eine SMTP-Zugangsdatei, die sich als `rechnung@` anmeldet
(`smtp.world4you.com`, Port 587, STARTTLS) — world4you lässt Versand nur unter
der angemeldeten Adresse zu.

---

## Wo die Dinge laufen (geprüft am 12.8.2026)

| Dienst | Ort | Wie geprüft |
|---|---|---|
| **n8n Cloud** (alvvyn) | **Schweden, EU** (Azure, `in_eu: true`) | Einmal-Workflow, der die eigene Ausgangs-IP abgefragt hat |
| **Supabase ZeitZurück** | eu-central-1, Frankfurt | Projektliste |
| **Supabase ZeitZurueck Legal** | eu-central-1, Frankfurt | Projektliste |
| **GitHub Pages** | USA | Anbieter |
| **Anthropic** (Sprachverständnis) | USA | Anbieter |

---

## Der Betreiber-Bereich

`admin.zeitzurück.at` — eine Seite, fünf Reiter: **Heute, Kunden, Geld,
Betrieb, Kosten.** Sie meldet sich bei **beiden** Supabase-Projekten an und
führt erst beim Lesen zusammen, was getrennt gespeichert ist.

**Was sie speichert — nur, was sonst nirgendwo steht** (im Handwerk-Projekt,
weil das die Datenbank des Hauses ist):

| Tabelle | Warum hier |
|---|---|
| `betreiber_kunden` | Die Pipeline. Wer noch nicht arbeitet, steht in keinem System. |
| `betreiber_aufgaben` | Was ansteht. `wer='alvin'` muss ein Mensch tun, `wer='herb'` macht die KI. |
| `betreiber_meldungen` | Was eine automatische Sitzung gefunden hat. Vor allem aus n8n — das kann die Seite selbst nicht lesen, dafür bräuchte sie einen Schlüssel, und ein Schlüssel im Browser ist kein Schlüssel. |

Alles andere wird **gelesen, nie kopiert.** Sonst pflegst du drei Wahrheiten
statt einer.

**`betreiber_stoerungen()`** läuft bei jedem Aufruf frisch in beiden
Datenbanken und sucht stille Zustände: Belege ohne Nummer, doppelte Nummern,
Aufträge in der Vergangenheit, alte unbezahlte Rechnungen, Chatverläufe über
12 Monate, **Chat-Anfragen mit Termin ohne Eintrag im Fristenbuch**,
bestätigte Termine ohne Kalendereintrag, fehlgeschlagene Nachtläufe,
Entwürfe, die zu lange in der Freigabe liegen.

> Der fett gesetzte Punkt ist der Fehler vom 12.8.2026. Eine CHECK-Regel
> verwarf jeden Chat-Termin, ohne dass irgendwo etwas rot wurde.
> **Ein stiller Fehler ist schlimmer als ein lauter.**

---

## Was noch offen ist

- **AVVs abschließen** mit Anthropic, Supabase, n8n und Google. Bei allen vieren
  gibt es Standard-Verträge zum Abschluss im Konto — Klickarbeit, keine
  Verhandlung. Solange sie fehlen, stimmt der Satz in der Datenschutzerklärung
  nur zur Hälfte.
- **SMTP-Zugangsdatei für rechnung@** in n8n anlegen (Alvin, wegen Passwort)
  und den Workflow „ZeitZurück – Rechnung senden" darauf umstellen.
- **`nummernkreis.js` umstellen**, damit die App die Nummer aus der Datenbank
  holt statt sie zu zählen. Die Datenbankseite steht bereits.
- **Diese Datei ins Handwerk- und Legal-Repository übernehmen** — Stand
  13.8.2026, mit den drei Repositories und dem Betreiber-Bereich.
- **Löschung der Chatverläufe im Handwerk-Projekt.** In der Tabelle steht
  „12 Monate aufbewahren, dann löschen". Eine Automatik dafür gibt es nur bei
  Legal (90 Tage, pg_cron). Der Betreiber-Bereich meldet es, sobald der erste
  Verlauf zu alt wird — bis dahin ist es kein Versäumnis, nur eine Lücke.

---

## Erledigt am 12.8.2026

- Subdomain `legal.zeitzurück.at` live, HTTPS aktiv.
- Impressum und Datenschutzerklärung für Legal veröffentlicht.
- **Interne Unterlagen von der öffentlichen Seite genommen.** GitHub Pages
  liefert jede Datei aus dem Repository aus, auch bei privatem Repository —
  `HAUS.md` und `SPEC.md` waren öffentlich lesbar. `_config.yml` schließt
  `.md`, `.py` und `.yml` jetzt aus. Wer eine neue interne Datei anlegt, trägt
  sie dort ein.
- **Automatische Löschung nach 90 Tagen** (pg_cron, täglich 03:17). Löscht nur,
  was ein Besucher selbst eingegeben hat — erkennbar an der Sitzung. Die
  erfundenen Beispieldaten der Demo-Kanzlei bleiben.
- Drei Postfächer angelegt.
- Nummernkreise in beide Datenbanken gebaut.
- **Kosten-Seite abgesichert** — `kosten` war die einzige Tabelle mit
  `using (true)` und damit ohne Anmeldung lesbar.

## Erledigt am 13.8.2026

- **Eigenes Repository `zeitzurueck-admin`** und der Betreiber-Bereich unter
  `admin.zeitzurück.at`. Hell, neutral, mit dem ZeitZurück-Logo — die Firma
  trägt einen Anzug. Der farbige Punkt vor jeder Zeile sagt, woher sie kommt:
  **Petrol = Handwerk, Gold = Legal, Grau = Haus.**
- **`betreiber_stoerungen()`** in beiden Datenbanken: die Suche nach stillen
  Fehlern.
- Kundenpipeline und Aufgabenliste angelegt — die beiden Dinge, die vorher
  nur in Alvins Kopf und in einem Chatverlauf standen.

---

*Zugangsdaten, Passwörter und Käufe macht Alvin selbst. Herb fasst sie nicht an.*
