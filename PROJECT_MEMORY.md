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

**Offen:** das sichtbare Auswahlfeld für den Bereich, das Einfrieren beim Versand, die Rollentrennung beim Löschen.

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
