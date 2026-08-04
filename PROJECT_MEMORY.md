# PROJECT_MEMORY — ZeitZurück®

*Stand: 4. August 2026 · lebendes Dokument im Repository `zeitzurueck`*

---

## Wofür dieses Dokument da ist

Nicht **was** gebaut wurde — das steht im Code. Sondern **warum**, und was dabei verworfen wurde.

Der Code lässt sich in einer Woche neu schreiben. Die Überlegung dahinter nicht.

**Regel:** Kurz halten. Überholtes **streichen**, nicht anhäufen. Kein Tagebuch — wenn eine Entscheidung durch eine bessere ersetzt wird, verschwindet die alte.

---

## Wo wir stehen

Marke **ZeitZurück®** registriert (AT Nr. 336036, 23.07.2026). Fünf Seiten live, Chat, Termine, Rechnungen, Archiv, Mails und Automatisierung laufen wirklich. In Aussicht: Evolution Ears, Caesar Handmade Guitars, Elektro Barisits. Der eigene Montageservice ist Client Zero.

**Kein zahlender Kunde.** Der Engpass ist seit Wochen nicht das Können, sondern der Kontakt.

---

## Getroffene Entscheidungen

### Preise bleiben bei 59 € und 89 €
Niemand hat je „zu teuer" gesagt. Eine Senkung ohne Marktsignal verschenkt Marge und beantwortet eine ungestellte Frage.
**Verworfen:** sofortige Senkung, drei Stufen, Preis pro Endkunde.
**Offen:** Gründerpreise für Roli und Alex — erst nach einer Vereinbarung.

### Wir vermarkten keine KI, sondern Professionalität
KI ändert sich ständig, Professionalität nicht. Betriebe kaufen kein Werkzeug, sondern ein Ergebnis. Der Chat stellt sich nicht als „digitaler Assistent" vor — lügt auf direkte Frage aber auch nicht.

### Der Chat verspricht keine neuen Kunden
Kunden bringt Google, die Empfehlung, das Firmenschild. Haltbar ist: *Wer ohnehin da war, geht nicht mehr verloren, und die Anfragen kommen vorinformiert herein.*
**Alvins Formulierung, besser als der erste Entwurf:** Der Interessent bekommt seine Antworten in der Sekunde, in der er recherchiert. Was hereinkommt, ist eine informierte Anfrage — besser für beide, und es spart Zeit.
**Warum das trägt:** Es ist zählbar. Die Monatsmail belegt es. „Wir bringen Kunden" kann niemand belegen.

### Rechnungen: Archiv statt Sperre
Ursprünglich sollten Bearbeiten und Löschen nach dem Versand gesperrt werden. Falscher Ansatz — das eigentliche Problem war, dass **nichts aufbewahrt wurde**. Das PDF entstand bei jedem Öffnen neu und existierte sonst nur in zwei Postfächern.
**Entscheidung:** Bei jedem Versand wird die Fassung eingefroren und unveränderbar abgelegt. Danach darf bearbeitet werden, weil die Spur bleibt.
**Verworfen:** Überschreiben der alten Fassung. Ein Archiv, das die heutige Wahrheit zeigt statt der verschickten, beantwortet die falsche Frage.
**Flexibilität ist gewollt:** Empfänger, Text und Betrag dürfen nachträglich geändert werden. Wir sind nicht die Finanzpolizei — das Risiko trägt der Aussteller.

### Rechnungsberichtigung statt Vollstorno
§ 11 UStG erlaubt, dass eine Rechnung aus mehreren Dokumenten besteht. Für eine Empfängeränderung genügt ein Berichtigungsdokument mit eindeutigem Bezug. Vollstorno mit neuer Nummer ist zulässig, aber unnötig.
**Zu prüfen in der Kanzlei** — gemeinsam mit: Kartenzahlung als Barumsatz, Klarna, UID-Pflicht bei EU-Leistungsbezug (Stripe sitzt in Irland).

### Ein Nummernkreis für ein Einzelunternehmen
Montage, ZeitZurück und Veranstaltungstechnik laufen auf **eine** Person, **eine** Steuermappe. Ein durchgehender Zähler, das Präfix ist nur ein Etikett: M 03 → V 04 → M 05. `DEMO` zählt getrennt und kommt nicht ins Archiv.
**Auslöser für eine Änderung:** sobald ZeitZurück eine eigene Gesellschaft wird.

### Keine Registrierkasse, aber SEPA-Lastschrift
Registrierkassenpflicht entsteht erst über 15.000 € Jahresumsatz **und** 7.500 € Barumsatz. Überweisung zählt nicht — der typische Kunde ist gar nicht betroffen. Eine RKSV-Kasse wäre ein eigenes Produkt mit eigener Haftung.
**Für die eigenen Abo-Einnahmen: SEPA statt Karte.** Karten gelten als Barumsatz und laufen auf die Grenze zu; SEPA ist eine Kontobewegung. Über Stripe tritt Stripe als Zahlungsempfänger mit eigener Gläubiger-ID auf — keine eigene CI, kein Bankvertrag. Und rund ein Viertel der Kartengebühr.
**Der Bar-Knopf bleibt neutral.** Was der Betrieb daraus macht, ist seine Verantwortung.

### Vorführung über einen Nummernkreis, nicht über einen zweiten Betrieb
Ein Demo-Betrieb hätte die Kette zerrissen — Chat, Kalender und alle Abläufe hängen an einer Betriebskennung. Der Reiz des Vorführens ist gerade, dass alles *wirklich* durchläuft. Also Kreis `DEMO` im selben Betrieb.

### Das Backend ist optional — die kleinere Stufe ist die stärkere
Die 59er-Stufe umgeht die gesamte Rechtszone: Aufbewahrung, Berichtigung, Nummernkreis, Registrierkasse. Die 89er trägt das Risiko.

### Kein Firmenname nach dem Nachnamen
Der Betrieb soll übergebbar sein, oder leise beendbar. Ein Betrieb, der nach der Person heißt, ist beides nicht. Der Name darf nur versprechen, was der Gewerbeschein deckt — Entscheidung nach dem WKO-Termin.

### Ein Gehirn für alle Chats *(steht — Montage läuft darauf)*
Heute hat jeder Chat seinen eigenen Text. Ein gefundener Fehler muss fünfmal repariert werden; bei zwanzig Kunden ist das das Ende des Geschäftsmodells.
**Trennung:** **Hausordnung** (erfinde nichts, triff keine rechtlichen Aussagen, lies Angaben aus dem Gespräch, frag nicht doppelt) gilt für alle. **Betriebswissen** (was er tut, was nicht, Preise, häufige Fragen) ist je Betrieb.
**Gebaut am 4. August.** Die Hausordnung liegt einmal in der Datenbank, versioniert. Das Betriebswissen liegt je Betrieb daneben. Eine Ansicht setzt beides zusammen; der Chat lädt nur noch den fertigen Text.
**Der Beweis:** an diesem Tag wurden zwei Regeländerungen ausschließlich in der Datenbank gemacht — n8n wurde dabei kein einziges Mal angefasst.
**Und der Anschluss:** Der Startfragebogen sammelt das Betriebswissen bereits ein. Künftig lädt der Chat es selbst. Damit wird aus „ich baue jedem einen Chat" ein „er füllt den Fragebogen aus und hat einen". Das ist der Unterschied zwischen Auftragsarbeit und Produkt.

### Der Kalender darf melden, nicht löschen
Ein im Kalender gelöschter Termin löscht **nicht** den Auftrag. An einem Auftrag hängen Stunden, Rechnung, Archiv — ein Wisch am Handy darf das nicht auslösen. Später höchstens ein Hinweis „Termin ist nicht mehr im Kalender".

### Zahlungseingänge: Kontozugang, nicht Stripe beim Kunden
Stripe sieht nur, was durch Stripe läuft — der Handwerker bekommt Überweisungen. Ihm Stripe aufzudrängen ändert die Zahlungsweise **seiner** Kunden und kostet ihn Gebühren auf jede Rechnung. Der richtige Weg ist **PSD2-Kontoeinsicht** (Klarna Kosma, Tink, finAPI): Eingang nach Betrag und Zahlungsreferenz zuordnen.
**Zurückgestellt:** alle 90 Tage neue Zustimmung, Kosten je Konto, größter Baustein bisher.
**Ausnahme:** Betriebe, die an Private verkaufen und Anzahlungen nehmen — für Evolution Ears ist Stripe sinnvoll.

### Der Auftragsverarbeitungsvertrag hängt am Fragebogen, nicht an einer Unterschrift
Art. 28 Abs. 9 DSGVO lässt **elektronische Form** ausdrücklich zu — es braucht keine Signatur und keinen Ausdruck. Der Vertrag liegt als PDF im Briefkopf bereit, der Fragebogen führt ihn mit Namen, Funktion, E-Mail und einem Pflichthaken zu. Gespeichert werden Zustimmung, Zeitpunkt, Fassung und die **Prüfsumme des PDF**, das der Betrieb tatsächlich gesehen hat. Damit ist auch Jahre später belegbar, welchem Text zugestimmt wurde.
**Der eine ehrliche Punkt darin:** das Sprachmodell läuft in den USA. Anthropic bleibt (Qualität), also steht die Drittlandübermittlung offen im Vertrag statt versteckt in einer Anlage.

### Aufbewahrung von Chatverläufen: gestuft, nicht pauschal
Ein Gespräch ohne Buchung ist nach **12 Monaten** weg. Wurde daraus ein Auftrag, bleibt es **3 Jahre** — die Gewährleistungsfrist. Art. 17 Abs. 3 lit. e DSGVO trägt das: Aufbewahrung zur Rechtsverteidigung. Ein nächtlicher Lauf räumt selbständig auf.
**Verworfen:** eine einheitliche Frist. Kurz genug für den Datenschutz und lang genug für den Streitfall gibt es nicht als eine Zahl.
**Fürs Lernen egal:** wir lernen aus Gesprächen der letzten Wochen, nicht der letzten Jahre.

### Ein Klick in einer Mail darf nichts auslösen
Am 30. Juli kamen drei einander widersprechende Mails an, weil ein Postfach-Scanner Links im Hintergrund geöffnet hatte. Seitdem gilt: **GET zeigt nur, POST handelt.** Wer im Angebot auf „annehmen" klickt, landet auf einer Seite und muss dort noch einmal bestätigen.
**Verworfen:** der bequemere Ein-Klick-Weg. Ein Angebot, das ein Virenscanner annimmt, ist schlimmer als ein Klick mehr.

### Löschen sperren heißt: in der Datenbank, nicht im Knopf
Eine versendete Rechnung lässt sich nicht mehr löschen — durchgesetzt über eine Regel in der Datenbank, zusätzlich beschränkt auf die Rolle *Inhaber*. `DEMO` bleibt löschbar, damit das Vorführen den Zähler nicht verbraucht.
**Der Fallstrick:** eine gesperrte Löschung liefert keinen Fehler, sondern null Zeilen. Ohne Prüfung hätte die App „gelöscht" gemeldet und nichts getan.

### Angebot und Auftrag sind dasselbe Ding in zwei Zuständen
Ein Kostenvoranschlag ist keine zweite Datenwelt, sondern eine Rechnung mit `art = 'angebot'`, eigener Nummer (`A …`) und Gültigkeitsdatum. Wird es angenommen, wird der Auftrag wieder ein normaler offener Auftrag — dieselben Stunden, dieselbe Rechnung, kein Umtragen.
**Anlass:** Caesar Handmade Guitars. Dort ist der Voranschlag der Normalfall, nicht die Ausnahme.

### Der Name wird zu „Alvin Ehrnberger Montage & Mehr“ *(entschieden, noch nicht umgesetzt)*
Damit fällt die frühere Regel „kein Firmenname nach dem Nachnamen“. Bei einem Ein-Personen-Betrieb ist Übergebbarkeit ohnehin Theorie, und der eigene Name ist ehrlicher als ein Kunstwort.
**Erst nach dem WKO-Termin am 7.8.**, weil der Name nur versprechen darf, was der Gewerbeschein deckt — und weil es ein Rundumschlag ist: Datenbank, fünf Seiten, Briefkopf, alle Mailvorlagen, Chat-Prompt, Signatur.
**Der eigentliche Anlass:** heute laufen drei Schreibweisen nebeneinander — „Montageservice & Mehr“ in der Datenbank, „EHRNBERGER – Montage & Service“ im Chat und in den Mails, „Alvin Ehrnberger – Montageservice & mehr“ auf der Website. Ein Kunde sieht drei Firmen.

### Opus statt Fable für diese Arbeit
Opus 5 liegt bei agentischem Programmieren vorn (43 % gegen 33 %) und ausdrücklich bei numerischem Denken und Präzision. Fable 5 ist auf lange autonome Läufe und Mehr-Agenten-Orchestrierung ausgelegt — das tun wir nicht; wir arbeiten in engen Schleifen mit Rückkopplung. Die 50 % Fable im Max-Plan sind zusätzlicher Spielraum, keine bessere Wahl.

---

## Was steht

**Rechnungen:** Nummernkreise M · ZZ · V · DEMO über ein Burger-Menü, gemeinsamer Zähler. Archiv friert jede verschickte Fassung ein (Supabase Storage, privat, nur `SELECT` und `INSERT` — die Datenbank verweigert Ändern und Löschen). Storno, Bearbeiten, „Geänderte Rechnung senden". Leistungsdatum als Pflichtangabe, automatisch aus dem Auftragstermin. Rechnungsadresse getrennt von der Arbeitsadresse. Zahlungsreferenz (`RG-M03-2026`) in der Mail.

**Termine:** Anlegen, **Verschieben** (Kalender zieht nach, Kunde bekommt eine Verlegungsmail), Löschen. Die Kalenderkennung holt sich der Ablauf beim Anlegen selbst aus dem Kalender, statt sich auf den Chat zu verlassen. Warnung, wenn ein Termin in der Vergangenheit liegt — mit Nennung des Jahres.

**Chat:** läuft auf der gemeinsamen Hausordnung, Regeln ändert man in der Datenbank statt in n8n. Trifft keine gewerberechtlichen Aussagen, kennt Alvins echte Grenze (kein Wasser- und Stromanschluss, alles Übrige an einer Küche schon), fragt Kontaktdaten nur wenn sie fehlen, bietet Lieferung ohne Preisnennung an. Drei pulsierende Punkte und nach 3,5 s ein Wartehinweis. Jedes Gespräch wird protokolliert und ist als Sitzung nachlesbar — Grundlage für den wöchentlichen Durchgang.

**Recht und Papier:** Auftragsverarbeitungsvertrag als PDF im Briefkopf, elektronisch über den Fragebogen zugestimmt, mit Prüfsumme belegt. Impressum und Datenschutzerklärung stehen. Aufbewahrung gestuft und automatisch aufgeräumt.

**Geld:** Zahlungsreferenz auf PDF und in der Mail. Stripe-Rückruf für bestätigte SEPA-Zahlungen — die Signatur wird geprüft, der Schlüssel liegt in einer Tabelle, die weder App noch Besucher lesen dürfen. Stripe steht im Testmodus; scharf geschaltet wird beim ersten Ja.

**Angebote:** eigener Nummernkreis `A`, Angebotslayout ohne Zahlungssatz, Gültigkeitsdatum, Hinweis auf § 5 KSchG. Zwei Knöpfe in der Kundenmail, dahinter eine Bestätigungsseite — der Klick zeigt nur, erst das abgeschickte Formular handelt. Angenommen macht den Auftrag wieder offen, abgelehnt vermerkt ihn; beides meldet sich per Mail. Abgelaufen und doppelt beantwortet haben eigene, ruhige Seiten.

**Offen:** Handy-Durchgang über alle Seiten · die übrigen vier Chats auf die Hausordnung umhängen · Mailvorlagen auf die Betriebsfarben · Umbenennung nach dem WKO-Termin · Stripe scharf schalten.

---

## Wo wir morgen weitermachen

*Stand 4. August, spät. Der Angebotsweg läuft zur Hälfte.*

**Fertig und geprüft:** Nummernkreis `DEMO A`, „Angebot Nr. …" in der Belegansicht, Gültigkeitsdatum, keine IBAN auf dem Angebot, Angebote raus aus den Belegen, Auftragsliste sauber getrennt.

**Der nächste Handgriff — einer, an zwei Stellen.** Der Baustein `zzEtiketten` liest den Bildschirm und benennt um, was er findet. Er hängt an `showJob` und funktioniert. Dasselbe fehlt für `showInvoice`: Kopfzeile, „Angebot verwalten", die Zeile „Noch nicht versendet" und der Knopf „✉ Angebot senden". Der Code steht und ist geprüft, wurde aber bewusst nicht hochgeladen — zwei Fassungen waren auseinandergelaufen.

**Danach:** Etikett in der Auftragsliste („Angebot offen" / „Angebot versendet" statt „Offen"), dann Alvins Durchgang: Angebot senden → Mail mit zwei Knöpfen → annehmen.

**Dann die Liste:** Umbenennung aus einer Quelle nach dem WKO-Termin · Demo zeigt nur Demo-Daten · „ZeitZurück Rundum" raus aus der Kopfzeile · Stundensatz-Zeile weg beim Angebot mit Fixbetrag · Mailvorlagen auf die Betriebsfarben · die übrigen vier Chats auf die Hausordnung · Handy-Durchgang · Stripe scharf schalten.

---

## Bewusst verschoben — und warum

| Verschoben | Warum |
|---|---|
| Anzahlung und Teilrechnung | Erst wenn ein Betrieb es braucht. Frage steht im Fragebogen. |
| Mahnwesen | Kein Kunde, keine offenen Posten. |
| Monatliche ZZ-Rechnungen automatisch | Lohnt ab etwa zehn Kunden. Bis dahin ein Knopf im Monat. |
| Gründerpreise in Stripe | Erst nach einer Vereinbarung mit Roli und Alex. |
| EU-Marke | ~800 € ohne Umsatz nicht sinnvoll. Frist hängt am AT-Anmeldetag. |
| Gemeinde Wolfsgraben | **Gestrichen** auf Alvins Wunsch. Warme Tür, aber keine vierte Baustelle ohne ersten Kunden. |
| Eigene Domain Montageservice | Hängt am Namen, der am WKO-Termin hängt. Solange steht `n8n.cloud` in Kundenmails. |
| n8n v3 | Durchsicht aller Abläufe im Oktober. |

---

## Gelernt

- **Wir hätten fast die Preise gesenkt, ohne dass je ein Mensch „zu teuer" gesagt hat.** Zweifel braucht ein Signal von außen, nicht von innen.
- **Erfundene Daten sind schlimmer als fehlende.** Lieber „das weiß ich nicht" als eine glaubwürdige Erfindung.
- **Der Chat erfindet seltener, als man denkt — man schreibt es ihm hinein.** Die Gewerbe-Absage, die einen Auftrag gekostet hätte, stand wörtlich im Prompt. Erst nachlesen, dann dem Modell die Schuld geben.
- **Alles, was zuverlässig sein muss, gehört in deterministischen Code.** Der Chat sollte eine Kalenderkennung weiterreichen; es stand ausdrücklich im Text; er gab `null`. Das Modell darf formulieren und einordnen — keine Schlüssel tragen.
- **Behaupten ist billig, Prüfen ist die Arbeit.** Eine Suche nach `'M'` fand das Präfix nicht, weil im Code `'M '` steht, mit Leerzeichen.
- **Rechte sind kein Nebenschauplatz.** Die Archivtabelle war für die App gar nicht beschreibbar, und gleichzeitig durfte die App sie per `TRUNCATE` leeren. Beides gefunden, weil der Ablauf mit einer Probedatei durchgespielt wurde statt „sieht richtig aus".
- **Ein Wächter, dessen Fehlschlag niemandem auffällt, ist kein Wächter.** Der tägliche Weckruf gegen das Pausieren der Datenbank war vier Tage tot.
- **Der gewünschte Zustand darf keinen Alarm auslösen.** Ein Termin, der schon gelöscht ist, ist kein Fehler.
- **Ein offensichtlich falscher Wert muss Widerspruch auslösen.** Ein Auftrag wurde auf 2024 gebucht und lief kommentarlos durch. Nicht der Code war schuld — es fehlte die Rückfrage.
- **Nie eine Datei hochladen, ohne den Inhalt zu prüfen.** `app.html` wurde einmal mit dem Wort „null" überschrieben, weil eine Variable beim Seitenwechsel verloren ging. Seitdem bricht der Upload bei unplausibler Größe ab.
- **Eine Sperre, die nur „nichts passiert" meldet, wird für Erfolg gehalten.** Die Datenbank verweigert das Löschen einer verschickten Rechnung — ohne Fehler, mit null Zeilen. Die App hätte „gelöscht" gesagt.
- **Nicht jeder Klick kommt von einem Menschen.** Postfächer öffnen Links, bevor jemand sie sieht.
- **Eine Änderung an zwei Stellen ist eine Änderung, die man einmal vergisst.** Der Nummernkreis stand in zwei Dateien; repariert war nur eine, und die Vorführung verbrauchte echte Rechnungsnummern.
- **Gegen die Daten kommt kein Verbot an.** Der Chat fragte Kunden nach dem IKEA-Modell. Drei immer schärfere Verbote im Prompt haben nichts geändert — die Zeittabelle selbst hieß `KALLAX Regal`, `PAX Schrank`. Erst als die Zeilen nach Art und Größe benannt waren, hörte er auf. Wenn Anweisung und Daten sich widersprechen, gewinnen die Daten.
- **In den Daten stecken Annahmen, die niemand beschlossen hat.** Dieselbe Tabelle unterstellte, dass jeder Kunde bei IKEA kauft. Wer ein Regal vom Tischler hatte, wurde nach einem BILLY gefragt.
- **Dasselbe Ding an zwei Stellen — dreimal in drei Tagen.** Nummernkreis, Angebotsnummer, Belegansicht: jedes Mal lag die Logik in `app.html` *und* in `nummernkreis.js`, jedes Mal habe ich nur eine gepflegt und gemeldet, es sei erledigt.
- **In fremdem Code, den man nicht lesen kann, schneidet man nicht.** Besser ein eigener Baustein am Dateiende, der sich zuletzt einhängt und still scheitert, als fünf geratene Änderungen mitten hinein.
- **Prüfen kommt vor Hochladen, nicht danach.** Einmal falsch maskierte Zeilenumbrüche, sofort committet — die App war kaputt, bis die alte Fassung zurück war.
- **Wer eine Liste filtert, muss den anderen Weg dorthin bauen.** Angebote aus den Belegen genommen, ohne Verweis vom Auftrag: das Angebot war nicht mehr erreichbar.
- **Wer nicht sieht, rät — und rät fünfmal.** Eine einzige Beschriftung hat fünf Anläufe gekostet, weil ich aus dem Quelltext erschlossen habe, was auf dem Bildschirm steht. Erst als der Baustein aufhörte, Datensätze zu suchen, und stattdessen las, was ohnehin dastand — eine Nummer wie `A 01/2026` *ist* ein Angebot —, war es in einem Zug erledigt.
- **Zwei Zeilen aus der Konsole schlagen zwei Stunden Vermutung.** Alvins Ausgabe `{"r":1,"j":157}` hat meine Erklärung in Sekunden widerlegt. Ich hätte viel früher danach fragen sollen.
- **Betriebe kaufen kein Werkzeug.** Sie kaufen, dass das Telefon nicht mehr für Dinge läutet, die keine Arbeit sind.
- **Der Vorsprung ist keine Technik, sondern Ortskenntnis.** Jeder kann einen Chat einbauen. Niemand sonst lernt die fünf Fragen, die der Frau vom Elektriker im Wienerwald wirklich gestellt werden.

---

## Wie wir mit fremden Testern arbeiten

Nicht helfen. Jede Stelle, an der man eingreifen möchte, ist genau die Stelle, die repariert gehört.
Nicht die Meinung mitschreiben, sondern **wo jemand zögert**. Die Pausen sind die Information.
Die **Wörter des Testers** übernehmen. Sagt jemand „Termin ausmachen" und bei uns steht „Anfrage senden", heißt der Knopf falsch.

---

## Offene Fragen

- Ist die 89er-Stufe genug wert, oder ist der Chat allein das Produkt?
- Welches Gewerbe wird die erste echte Spezialisierung?
- Wie verteidigen wir uns, wenn Plattformanbieter eigene KI-Assistenten mitliefern?
- Reicht ein Chat ohne Backend, wenn der Betrieb ohnehin einen Steuerberater hat?
- **Wer ist der erste zahlende Kunde — und bis wann?**

---

## Die eine unbequeme Zeile

Alles hier ist richtig und nützlich. Nichts davon ersetzt ein Gespräch mit einem Handwerker.

Die Technik wird jede Woche besser. Die Zahl der gefragten Menschen ist bei null geblieben. Wenn dieses Dokument in drei Monaten doppelt so lang ist und die zweite Zahl immer noch null, war es Beschäftigung.
