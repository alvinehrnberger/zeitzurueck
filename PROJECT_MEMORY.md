# PROJECT_MEMORY — ZeitZurück®

*Stand: 1. August 2026 · lebendes Dokument, gehört ins Repository `zeitzurueck`*

---

## Wofür dieses Dokument da ist

Nicht **was** gebaut wurde — das steht im Code und ist jederzeit nachlesbar.
Sondern **warum** es so gebaut wurde und was dabei verworfen wurde.

Der Code lässt sich in einer Woche neu schreiben. Die Überlegung dahinter nicht.
Wenn dieses Dokument seine Aufgabe erfüllt, muss dieselbe Diskussion nie zweimal geführt werden.

**Regel:** Kurz halten. Ein Dokument, das man nicht mehr liest, erinnert nichts.
Neue Einträge oben in den jeweiligen Abschnitt. Überholtes streichen, nicht anhäufen.

---

## Wo wir stehen — in einem Absatz

Marke **ZeitZurück®** ist registriert (AT Nr. 336036, 23.07.2026). Fünf Websites sind live, Chat, Terminverwaltung, Rechnungen, Mails und Automatisierung laufen wirklich. Drei Betriebe stehen in Aussicht: Evolution Ears, Caesar Handmade Guitars, Elektro Barisits. Dazu der eigene Montageservice als Client Zero.

**Es gibt keinen zahlenden Kunden.** Der Engpass ist seit Wochen nicht das Können und nicht die Technik, sondern der Kontakt. Das ist die wichtigste Zeile in diesem Dokument.

---

## Getroffene Entscheidungen

### Preise bleiben bei 59 € und 89 €
**Grund:** Niemand hat je „zu teuer" gesagt. Eine Preissenkung ohne Signal vom Markt verschenkt Marge und beantwortet eine Frage, die keiner gestellt hat.
**Verworfen:** sofortige Senkung, drei Stufen, Preis pro Endkunde (zu kompliziert zu erklären und zu verrechnen).
**Offen:** Gründerpreise für Roli und Alex — erst wenn mit ihnen etwas ausgemacht ist.

### Wir vermarkten keine KI, sondern Professionalität
**Grund:** KI ändert sich ständig, Professionalität nicht. Betriebe kaufen kein Werkzeug, sie kaufen ein Ergebnis. Der Montageservice-Chat stellt sich deshalb nicht als „digitaler Assistent" vor — lügt aber auf direkte Frage auch nicht.

### Der Chat verspricht keine neuen Kunden
**Grund:** Kunden bringt Google, die Empfehlung, das Firmenschild. Was wir halten können: *Die Leute, die ohnehin da waren, gehen nicht mehr verloren, und die Anfragen kommen vorinformiert herein.*
**Der Pitch (von Alvin, besser als der erste Entwurf):** Der Interessent bekommt seine Antworten in der Sekunde, in der er recherchiert. Was danach hereinkommt, ist eine informierte Anfrage — besser für beide Seiten, und es spart Zeit.
**Warum das trägt:** Es ist nachweisbar. Die Monatsmail zählt es. „Wir bringen Kunden" kann niemand belegen.

### Rechnungen: Archiv statt Sperre
**Grund:** Ursprünglich war geplant, Bearbeiten und Löschen nach dem Versand zu sperren. Falscher Ansatz. Das eigentliche Problem war, dass **überhaupt nichts aufbewahrt wurde** — das PDF entstand bei jedem Öffnen neu aus den Feldern und existierte sonst nur in zwei Postfächern.
**Entscheidung:** Bei jedem Versand wird die Fassung eingefroren und unveränderbar abgelegt (Supabase Storage, privat, RLS je Betrieb, kein UPDATE und kein DELETE erlaubt). Danach darf bearbeitet werden, weil die Spur bleibt.
**Verworfen:** Überschreiben der alten Fassung. Ein Archiv, das die aktuelle Wahrheit zeigt statt der verschickten, beantwortet die falsche Frage.
**Flexibilität ist gewollt:** Empfänger, Text und Betrag dürfen nachträglich geändert werden. Wir sind nicht die Finanzpolizei — das Risiko trägt der Aussteller. Aber jede verschickte Fassung bleibt erhalten.

### Rechnungsberichtigung statt Vollstorno
**Grund:** § 11 UStG erlaubt, dass eine Rechnung aus mehreren Dokumenten besteht. Für eine Empfängeränderung genügt ein Berichtigungsdokument mit eindeutigem Bezug auf die ursprüngliche Rechnung. Ein voller Storno mit neuer Nummer ist zulässig, aber unnötig aufwendig.
**Zu prüfen:** Bestätigung durch die Kanzlei. *(Claude ist kein Steuerberater — die Einschätzung ist gut, die Haftung fehlt.)*

### Ein Nummernkreis für ein Einzelunternehmen
**Grund:** Montage, ZeitZurück und Veranstaltungstechnik laufen auf **eine** Person, **ein** Einzelunternehmen, **eine** Steuermappe. Also ein durchgehender Zähler; das Präfix ist nur ein Etikett für den Bereich: M 03 → V 04 → M 05.
**Verworfen:** getrennte Reihen je Bereich. Zulässig wäre es (§ 11 erlaubt mehrere Zahlenreihen), aber bei einer Prüfung muss man dann drei Reihen erklären statt eine lückenlose.
**Auslöser für eine Änderung:** Sobald ZeitZurück eine eigene Gesellschaft wird, braucht es eine eigene Reihe.

### Keine Registrierkasse
**Grund:** Registrierkassenpflicht entsteht erst über 15.000 € Jahresumsatz **und** über 7.500 € Barumsatz netto. Überweisung zählt nicht — der typische ZeitZurück-Kunde ist gar nicht betroffen. Eine RKSV-konforme Kasse (Signatureinheit, Datenerfassungsprotokoll, FinanzOnline-Anmeldung) wäre ein eigenes Produkt mit eigener Haftung.
**Was wir sehr wohl liefern:** den Beleg. Die Belegerteilungspflicht gilt ab dem ersten Bargeschäft ohne Grenze, und eine ordentliche Rechnung erfüllt sie.
**Der Bar-Knopf bleibt neutral.** Was der Betrieb daraus macht, ist seine Verantwortung.

### SEPA-Lastschrift statt Karte für die eigenen Abo-Einnahmen
**Grund:** Karten­zahlungen gelten als Barumsatz und laufen auf die 7.500-€-Grenze zu — bei 89 € im Monat sind das etwa sieben Kunden über ein Jahr. SEPA-Lastschrift ist eine Kontobewegung und damit kein Barumsatz. Damit bleibt ZeitZurück dauerhaft außerhalb der Registrierkassenpflicht, unabhängig von der Kundenzahl.
**Zusätzlich:** über Stripe tritt Stripe als Zahlungsempfänger mit eigener Gläubiger-ID auf — keine eigene CI, kein Lastschriftvertrag mit der Bank, kein Rückläufer-Prozess. Und die Gebühr ist rund ein Viertel der Kartengebühr.
**Verworfen:** Lastschrift direkt über die Erste Bank (eigene Gläubiger-ID, XML, Fristen — Aufwand für hunderte Abbuchungen, nicht für unsere).
**Zu prüfen:** ob Kartenzahlung im Online-Abo genauso als Barumsatz zählt wie an der Kassa. Gehört mit der Berichtigungsfrage in denselben Termin in der Kanzlei.
**Nebenbei:** Die eigenen ZeitZurück-Rechnungen laufen über ZeitZurück, mit ZZ-Nummer aus derselben Reihe. Das Produkt an sich selbst zu benutzen ist die beste Vorführung.

### Vorführung über einen eigenen Nummernkreis, nicht über einen zweiten Betrieb
**Grund:** Ein Demo-Betrieb hätte die ganze Kette zerrissen — Chat, Kalender und alle n8n-Abläufe hängen an einer Betriebskennung. Der Reiz des Vorführens ist gerade, dass alles *wirklich* durchläuft.
**Entscheidung:** Kreis `DEMO` im selben Betrieb. Alles läuft echt; nur DEMO-Rechnungen bleiben löschbar und kommen nicht ins Archiv.

### Das Backend ist optional — und die kleinere Stufe ist die stärkere
**Grund:** Die 59er-Stufe (Anfragen, Termine, Aufträge, Zeiten, Export) verkauft sich schneller und umgeht die gesamte Rechtszone: Aufbewahrung, Berichtigung, Nummernkreis, Registrierkasse. Die 89er-Stufe trägt das Risiko.
**Offene Frage:** ob die 89er-Stufe genug Mehrwert hat, um den Aufwand zu rechtfertigen.

### Kein Firmenname nach dem Nachnamen
**Grund:** Der Betrieb soll übergebbar sein, oder leise beendbar. Ein Betrieb, der nach der Person heißt, ist beides nicht.
**Bedingung:** Der Name darf nur versprechen, was der Gewerbeschein deckt. Entscheidung erst nach dem WKO-Termin am 07.08.

### Gemeinden geparkt
**Grund:** Gute Idee, warme Tür (Bürgermeister ist Klient der Kanzlei und Freund des Vaters), dasselbe Produkt auf einen anderen Kunden gerichtet — also kein viertes Unternehmen. Aber: drei Betriebe und null zahlende Kunden vertragen keine vierte Baustelle. Memo liegt vor, wird bei Bedarf aktiviert.

---

## Gebaut am 1. August 2026

- **Archiv angelegt:** privater Ablagebereich `rechnungen` in Supabase Storage (nur PDF, kein öffentlicher Zugriff) und Tabelle `rechnung_versionen`. Zugriffsregeln erlauben Lesen und Anlegen, **Ändern und Löschen gibt es nicht** — die Datenbank verweigert es, nicht nur die App.
- **Spalte `kreis`** auf `rechnungen` und `auftraege`, Vorgabe `M`.
- **`BETRIEB_KONFIG` umgeschlüsselt** von Betriebsname auf Kürzel: `M`, `ZZ`, `V`, `DEMO`, `_default`. Alle echten Kreise teilen den Startwert 2, DEMO zählt eigenständig. `_default` ist jetzt eine Kopie von M statt eines leeren Eintrags — ein Fehlgriff führt nie mehr zu einer Rechnung ohne Bankverbindung.
- **Gerechnet und geprüft:** leer → M 03/2026 · danach V → V 04/2026 · danach M → M 05/2026 · zwei DEMO-Rechnungen verschieben die echte Reihe nicht · unbekannter Kreis fällt auf M zurück.

- **SEPA-Lastschrift in Stripe eingeschaltet** (Sandbox `acct_1TvBZx2cyEXsXjGG`). Stripe weist beim Einschalten darauf hin, dass SEPA eine **verzögerte Zahlungsart** ist: Das Geld ist nicht sofort da. Wir brauchen deshalb einen Webhook, damit ZeitZurück erfährt, wann eine Zahlung tatsächlich durch ist — sonst gilt ein Kunde als zahlend, bevor er es ist.
- **Muss im Live-Konto wiederholt werden.** Die Sandbox-Einstellung wandert nicht mit.
- Vorgefunden: 17 Zahlungsarten aktiv, darunter Kakao Pay, Naver Pay, PAYCO, Samsung Pay, MB WAY, Satispay, Pix, BLIK. Stripe blendet sie je nach Land des Kunden ohnehin aus, es schadet also nichts — aufgeräumt wird beim Live-Konto.

- **Bereichsauswahl im Backend gebaut.** Auswahlfeld unter den Reitern: Montage · ZeitZurück · Veranstaltungstechnik · Vorführung. Die Wahl bleibt gespeichert. Bei *Vorführung* erscheint ein oranges Band und der Plus-Knopf färbt sich um, damit man den Modus nie übersieht.
- **DEMO wird am Nummernpräfix erkannt**, nicht nur an der Spalte `kreis` — dadurch greift die Trennung auch für Rechnungen, die auf anderen Wegen entstanden sind.
- **Datenband** von oben (wo es über dem Firmennamen klebte) nach unten links, Text jetzt „Live · Daten in der EU 🇪🇺" ohne Ortsangabe.

- **Burger-Menü** statt Auswahlfeld, oben rechts im Inhalt auf Höhe der Begrüßung. Weicht dem Demo-Band automatisch aus. Keine blauen Fokusrahmen mehr (gold statt blau).
- **Einfrieren beim Versand gebaut.** In `sendDoc` liegt zwischen „PDF fertig" und „Mail raus" der Archivschritt. Schlägt er fehl, wird **nicht** verschickt. Jeder weitere Versand erzeugt Fassung 2, 3, 4 — nie überschrieben. DEMO wird übersprungen.
- **Zahlungsreferenz** aus der Nummer: `M 03/2026` → `RG-M03-2026`, Storno → `ST-`. In der Mail und als eigenes Feld an n8n. **Noch nicht auf dem PDF** — kommt als Nächstes.

**Offen:** Zahlungsreferenz auf das PDF, Rollentrennung beim Löschen, Knopf „Geänderte Rechnung senden", Webhook für bestätigte SEPA-Zahlungen.

### Zwei Fehler, die nur die Probe gefunden hat
**1. Die Archivtabelle war für die App gar nicht beschreibbar.** Per Migration angelegte Tabellen bekommen in Supabase keine Rechte für die App-Rolle — der erste echte Rechnungsversand wäre abgebrochen. Gefunden, indem der Ablauf mit einer Probedatei durchgespielt wurde, statt sich auf „der Code sieht richtig aus" zu verlassen.
**2. Die App durfte das Archiv leeren.** Aus den Standardrechten kam ein `TRUNCATE` mit. Das hätte die gesamte Aufbewahrung mit einem Aufruf entfernbar gemacht — genau das, wogegen das Archiv gebaut ist. Entzogen.
**Gegenprobe bestanden:** Anlegen und Lesen funktionieren, Ändern und Löschen werden von der Datenbank verweigert, die Zeile blieb unverändert. Übrig sind ausschließlich `SELECT` und `INSERT`.
**Lehre:** Rechte sind kein Nebenschauplatz. Eine Regel, die man nicht ausprobiert hat, ist eine Vermutung.

### Zahlungseingänge automatisch erkennen — geprüft, bewusst zurückgestellt
**Die Frage:** Kann Stripe auch bei unseren Kunden mitlaufen, damit n8n meldet „Rechnung bezahlt"?
**Befund:** Über Stripe nur, wenn der Handwerker seine Kunden auch über Stripe kassieren ließe — das tut er nicht, er bekommt Überweisungen, und Stripe würde ihm Gebühren auf jede Rechnung legen. Der richtige Weg wäre **Kontozugriff nach PSD2** (Anbieter wie Klarna Kosma, Tink, finAPI): eingehende Überweisung nach Betrag und Zahlungsreferenz der Rechnung zuordnen.
**Warum zurückgestellt:** Der Zugriff braucht alle 90 Tage eine neue Zustimmung des Betriebs, kostet je Konto Geld und ist der größte Baustein bisher. Klassische Falle: großartige Funktion, kein Kunde.
**Was wir stattdessen sofort tun:** eine saubere **Zahlungsreferenz auf jede Rechnung**. Kostet nichts und ist genau die Voraussetzung, ohne die eine spätere automatische Zuordnung gar nicht möglich wäre.

---

## Gebaut am 2. August 2026

- **Chat repariert.** Die Gewerbezeile („Tischlerarbeiten … das darf ich nicht machen") ist raus — sie war **selbst geschrieben**, keine Erfindung des Modells. Ersetzt durch Alvins echte Regel, formuliert als Angebot statt als Rechtsauskunft: Anschluss von Wasser, Strom und Gas macht er nicht, alles Übrige an einer Küche schon, einschließlich Arbeitsplatte anpassen und ausschneiden. Küchen sind jetzt vollständig im Leistungsumfang. Die erfundene Frage „ist die Arbeitsplatte bereits angebracht?" ist ausdrücklich verboten. Kontaktdaten werden nur noch erfragt, wenn sie fehlen. Lieferung wird angeboten, ohne Preis zu nennen.
- **Chatfenster:** drei pulsierende Punkte statt stummer Blase, nach 3,5 s zusätzlich ein Wartehinweis (nur einmal — die erste Fassung startete pro Nachricht einen Zeitgeber und zeigte den Satz dreimal). Lange Antworten beginnen oben statt am Ende.
- **Rechnung:** `leistung_datum` als eigene Spalte und im PDF. Vorher stand in der Positionszeile das Rechnungsdatum — bei einer am 15.08. erbrachten Leistung also der falsche Tag. Das Leistungsdatum ist Pflichtangabe nach § 11 UStG. Empfängeradresse jetzt zweizeilig (PLZ und Ort unter der Straße). Rechnungsadresse als eigenes Feld direkt unter dem Kundennamen.
- **Datenband „Live · Daten in der EU" entfernt.**
- **Anfragemail:** Knopf „Auftrag öffnen", golden statt fast schwarz.

### Der Kalender: warum wir das Modell aus der Schleife nehmen
Ein gelöschter Auftrag ließ den Kalendereintrag stehen. Ursache **nicht** in der Technik: Die Kennung wird sauber durchgereicht und gespeichert — aber der Chat hat `auftrag_anlegen` mit **`event_id: null`** aufgerufen, obwohl im Prompt ausdrücklich steht, sie mitzugeben.
**Entscheidung:** Die Löschung darf sich nicht auf eine Zusage des Modells stützen. Sie findet den Termin künftig selbst über Datum, Uhrzeit und Kundennamen, die ohnehin am Auftrag stehen.
**Verallgemeinert:** Alles, was zuverlässig sein muss, gehört in deterministischen Code. Das Modell darf formulieren und einordnen — nicht Schlüssel weiterreichen.

### Kalender in der Gegenrichtung: bewusst nicht
Ein im Kalender gelöschter Termin soll den Auftrag **nicht** löschen. An einem Auftrag hängen Stunden, Rechnung und Archiv; ein Wisch am Handy darf das nicht auslösen. Später höchstens ein Hinweis „Termin ist nicht mehr im Kalender".

---

## Zwei Fehler, die nur das Fehlerprotokoll gezeigt hat

**Der tägliche Weckruf war seit vier Tagen tot.** Um 06:30 fragt ein Ablauf die Datenbank an, damit Supabase das Projekt nicht wegen Untätigkeit pausiert. Er fragte die Tabelle `betriebe` ab — die die anonyme Rolle nicht lesen darf und auch nicht dürfen soll. Gefährlich war nicht die Fehlermail, sondern dass **nichts geweckt wurde**. Behoben mit einer Ansicht `public.ping`, die nur eine `1` zurückgibt und nichts verrät.
**Lehre:** Ein Wächter, dessen Fehlschlag niemandem auffällt, ist kein Wächter. Überwachung braucht selbst Überwachung.

**Ein gelöschter Termin ist kein Fehler.** Beim Löschen eines Auftrags antwortete Google mit *410 – Resource has been deleted*, weil der Termin schon von Hand entfernt worden war. Der Ablauf brach ab und schickte eine Fehlermail. Die drei Kalenderschritte laufen jetzt weiter, wenn der Eintrag ohnehin weg ist — der gewünschte Zustand darf keinen Alarm auslösen.
**Nebenbei bewiesen:** Der Löschweg funktioniert. Er hat den richtigen Termin angesprochen.

## Die Kalenderkennung holt sich das System jetzt selbst
Statt darauf zu hoffen, dass der Chat die Kennung weiterreicht (er tat es nicht), sucht der Zwischenschritt beim Anlegen im Kalender nach dem Termin und übernimmt die Kennung von dort. Deterministisch, im Moment der Buchung, wo der Eintrag garantiert existiert. Damit funktionieren Löschen **und** Verschieben, ohne dass beide einzeln abgesichert werden müssen.

## Der Kalender darf melden, nicht löschen
Verschieben aus dem Backend ist gebaut: neuer Termin, Kalender zieht nach, Kunde bekommt eine Mail. Das ist der häufigere Fall als Löschen — ein Handwerker verlegt wöchentlich.

---

## Bewusst verschoben — und warum

| Verschoben | Warum |
|---|---|
| Anzahlung und Teilrechnung | Brauchen wir erst, wenn ein Betrieb es braucht. Die Frage steht schon im Startfragebogen. |
| Mahnwesen | Kein Kunde, keine offenen Posten. |
| Gründerpreise in Stripe | Erst wenn mit Roli und Alex etwas ausgemacht ist. |
| EU-Marke | Frist hängt am Anmeldetag der AT-Marke; ~800 € sind ohne Umsatz nicht sinnvoll. |
| Mobile Überarbeitung aller Seiten | Am Rechner sieht alles gut aus, am Handy nicht. Wichtig, aber nicht vor dem ersten Kunden. |
| Aufbewahrung der Chatprotokolle | 12 Monate plus Hinweis „Auskünfte hier sind unverbindlich". Rechtlich sinnvoll, noch nicht gebaut. |
| Eigene Domain für den Montageservice | Blockiert, weil sie in Kundenmails eine `n8n.cloud`-Adresse sichtbar macht. Hängt am Namen, der am WKO-Termin hängt. |

---

## Gelernt

- **Wir hätten fast die Preise gesenkt, ohne dass je ein Mensch „zu teuer" gesagt hat.** Zweifel ist nützlich, aber er braucht ein Signal von außen, nicht von innen.
- **Erfundene Daten sind schlimmer als fehlende.** Der Evolution-Ears-Chat hat ein Modell empfohlen, das es nicht gibt, und Finishes genannt, die nie existierten. Lieber „das weiß ich nicht" als eine glaubwürdige Erfindung.
- **Links in Mails, die etwas auslösen, werden automatisch angeklickt** — von Virenscannern, von Vorschaufunktionen, vom Zurückwischen. Jede Aktion braucht eine Statusprüfung, bevor sie ausgeführt wird.
- **Behaupten ist billig, Prüfen ist die Arbeit.** Claude hat behauptet, es gäbe keine Storno-Funktion — sie war da, nur in einer anderen Datei. Und eine Suche nach `'M'` fand das Präfix nicht, weil im Code `'M '` steht, mit Leerzeichen. Beide Male hat erst das Nachsehen die Wahrheit gebracht.
- **Betriebe kaufen kein Werkzeug.** Sie kaufen, dass das Telefon nicht mehr für Dinge läutet, die keine Arbeit sind.
- **Eine Umbenennung hätte die Rechnungen zerstört.** Die Absenderprofile in `app.html` (`BETRIEB_KONFIG`) hängen am **Betriebsnamen** als Schlüssel — dort stehen Präfix, Adresse, IBAN und Zahlungsziel. Wird `betriebe.name` nach dem WKO-Termin geändert, fällt die Suche still auf `_default` zurück: Rechnungen ohne Präfix, ohne Bankverbindung, ohne Adresse. Gefunden beim Umbau der Nummernkreise, **bevor** umbenannt wurde. Konsequenz: die Profile werden auf das Kürzel (M, ZZ, V, DEMO) umgeschlüsselt statt auf den Namen.
- **Der Vorsprung ist keine Technik, sondern Ortskenntnis.** Jeder kann einen Chat einbauen. Niemand sonst setzt sich hin und lernt die fünf Fragen, die der Frau vom Elektriker im Wienerwald wirklich gestellt werden.

---

## Offene Fragen

- Ist die 89er-Stufe genug wert, oder ist der Chat allein das Produkt?
- Welches Gewerbe wird die erste echte Spezialisierung?
- Wie verteidigen wir uns, wenn Plattformanbieter (z. B. GEM2GO bei Gemeinden) eigene KI-Assistenten mitliefern?
- Wer ist der erste zahlende Kunde — und bis wann?
- Reicht ein Chat ohne Backend, wenn der Betrieb ohnehin einen Steuerberater hat?

---

## Die eine unbequeme Zeile

Alles in diesem Dokument ist richtig und nützlich. Nichts davon ersetzt ein Gespräch mit einem Handwerker.

Die Technik ist seit Wochen jede Woche besser geworden. Die Zahl der gefragten Menschen ist bei null geblieben. Wenn dieses Dokument in drei Monaten doppelt so lang ist und die zweite Zahl immer noch null, dann war es Beschäftigung.
