# PROJECT_MEMORY — ZeitZurück®

*Stand: 5. August 2026 · lebendes Dokument im Repository `zeitzurueck`*

---

## Wofür dieses Dokument da ist

Nicht **was** gebaut wurde — das steht im Code. Sondern **warum**, und was dabei verworfen wurde.

Der Code lässt sich in einer Woche neu schreiben. Die Überlegung dahinter nicht.

**Regel:** Kurz halten. Überholtes **streichen**, nicht anhäufen. Kein Tagebuch — wenn eine Entscheidung durch eine bessere ersetzt wird, verschwindet die alte.

---

## Wo wir stehen

Marke **ZeitZurück®** registriert (AT Nr. 336036, 23.07.2026). Fünf Seiten live, Chat, Termine, Rechnungen, Archiv, Mails und Automatisierung laufen wirklich. **Der Angebotsweg läuft seit 5.8. komplett durch und ist geprüft:** anlegen, senden, Mail mit zwei Knöpfen, Bestätigungsseite, annehmen, Auftrag wieder offen. In Aussicht: Evolution Ears, Caesar Handmade Guitars, Elektro Barisits. Der eigene Montageservice ist Client Zero.

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

### Der Name ist „Alvin Ehrnberger Montage & Mehr“ *(umgesetzt am 5.8.)*
Damit fiel die frühere Regel „kein Firmenname nach dem Nachnamen“. Bei einem Ein-Personen-Betrieb ist Übergebbarkeit ohnehin Theorie, und der eigene Name ist ehrlicher als ein Kunstwort. **Zwei Wahrheiten, eine Quelle:** `betriebe.name` trägt den amtlichen Wortlaut, die neue Spalte `betriebe.marke` den Auftritt („Montage & Mehr“ groß, „Alvin Ehrnberger“ klein darunter). App, PDF, Mails, beide Websites (zeitzurück.at-Referenzkarte + montageservice-Repo) und das Chat-Gehirn (`betrieb_wissen`) sind umgestellt; die View `v_chat_gehirn` kennt nur noch den neuen Namen. Die früheren drei Schreibweisen sind Geschichte.
**Wichtig:** „Montage & Mehr“ allein war nicht zu haben — es gibt bereits eine „Montage & Mehr e.U.“ in Puch bei Hallein. Der eigene Name davor macht die Bezeichnung unterscheidungskräftig; der WKO-Termin am 7.8. bestätigt nur noch den Wortlaut (WKO-Rechtsservice zur Verwechslungsfrage befragen). Domain montageundmehr.at ist frei — sichern als Weiterleitung, Hauptauftritt mit Namen (z. B. ehrnberger-montage.at prüfen).

### BRAND.md ist die eine Quelle für die Marke
Farben, Schrift, Formen und Ton liegen als `BRAND.md` im Repo, mit Verweis darauf, wo die Werte im Code leben (app.html, `betriebe`-Tabelle, n8n-Vorlagen). Wer gestaltet, liest zuerst dort; ändert sich die Marke, ändert sich zuerst diese Datei.
**Verworfen:** ein Designsystem in Claude Design. Es wäre eine zweite Quelle, die bei jeder Änderung nachgezogen werden müsste — und bauen können wir ohnehin nur hier.

### Handy über den Home-Bildschirm, kein App Store
Die Web-App lässt sich am Telefon wie eine App installieren — ohne Apple-Konto, Review und Dauerwartung. Ein Store-Auftritt bringt dem ersten zahlenden Kunden nichts.
**Aufs Regal:** nach dem ersten zahlenden Kunden, dann bewusst (z. B. Capacitor-Hülle).

### Opus statt Fable für diese Arbeit
Opus 5 liegt bei agentischem Programmieren vorn (43 % gegen 33 %) und ausdrücklich bei numerischem Denken und Präzision. Fable 5 ist auf lange autonome Läufe und Mehr-Agenten-Orchestrierung ausgelegt — das tun wir nicht; wir arbeiten in engen Schleifen mit Rückkopplung. Die 50 % Fable im Max-Plan sind zusätzlicher Spielraum, keine bessere Wahl.

---

## Was steht

**Rechnungen:** Nummernkreise M · ZZ · V · DEMO über ein Burger-Menü, gemeinsamer Zähler. Archiv friert jede verschickte Fassung ein (Supabase Storage, privat, nur `SELECT` und `INSERT` — die Datenbank verweigert Ändern und Löschen). Storno, Bearbeiten, „Geänderte Rechnung senden". Leistungsdatum als Pflichtangabe, automatisch aus dem Auftragstermin. Rechnungsadresse getrennt von der Arbeitsadresse. Zahlungsreferenz (`RG-M03-2026`) in der Mail.

**Termine:** Anlegen, **Verschieben** (Kalender zieht nach, Kunde bekommt eine Verlegungsmail), Löschen. Die Kalenderkennung holt sich der Ablauf beim Anlegen selbst aus dem Kalender, statt sich auf den Chat zu verlassen. Warnung, wenn ein Termin in der Vergangenheit liegt — mit Nennung des Jahres.

**Chat:** läuft auf der gemeinsamen Hausordnung, Regeln ändert man in der Datenbank statt in n8n. Trifft keine gewerberechtlichen Aussagen, kennt Alvins echte Grenze (kein Wasser- und Stromanschluss, alles Übrige an einer Küche schon), fragt Kontaktdaten nur wenn sie fehlen, bietet Lieferung ohne Preisnennung an. Drei pulsierende Punkte und nach 3,5 s ein Wartehinweis. Jedes Gespräch wird protokolliert und ist als Sitzung nachlesbar — Grundlage für den wöchentlichen Durchgang.

**Recht und Papier:** Auftragsverarbeitungsvertrag als PDF im Briefkopf, elektronisch über den Fragebogen zugestimmt, mit Prüfsumme belegt. Impressum und Datenschutzerklärung stehen. Aufbewahrung gestuft und automatisch aufgeräumt.

**Geld:** Zahlungsreferenz auf PDF und in der Mail. Die SEPA-Strecke steht seit 6.8. komplett und ist einmal echt durchgespielt: Stripe-Sandbox trägt das ZeitZurück-Kleid (Logo, Petrol, Gold), der Gründungskunden-Zahlungslink verlangt den IBAN am ersten Tag (199,– sofort, 90 Tage gratis, dann 30,–/Monat), der Webhook-Endpunkt meldet `invoice.paid` und `invoice.payment_failed` an n8n, die Signatur wird über den Roh-Text geprüft (Schlüssel in `geheimnisse`, für App und Besucher unlesbar). Abo-Zahlungen ohne Referenz legt der Rückruf **selbst als ZZ-Rechnung an** — fortlaufende Nummer nach demselben Rezept wie `nummernkreis.js`, als bezahlt vermerkt, Zahlart `lastschrift` (seit 6.8. in der Datenbank erlaubt) — und meldet Fehlschläge mit eigener Warn-Mail. Scharf geschaltet wird nach den Kanzlei-Antworten: Link und Webhook einmal im Live-Konto nachziehen, Live-Schlüssel eintragen — zehn Minuten.

**Angebote:** eigener Nummernkreis `A`, Angebotslayout ohne Zahlungssatz, Gültigkeitsdatum, Hinweis auf § 5 KSchG. Zwei Knöpfe in der Kundenmail, dahinter eine Bestätigungsseite (Fußzeile nur „ZeitZurück®") — der Klick zeigt nur, erst das abgeschickte Formular handelt. Angenommen macht den Auftrag wieder offen, abgelehnt vermerkt ihn; beides meldet sich per Mail. Abgelaufen und doppelt beantwortet haben eigene, ruhige Seiten. Seit 5.8.: PDF-Anhang heißt `Angebot-…`, Betreff „Ihr Angebot", keine Zahlungsreferenz in der Angebotsmail, Angebote sind aus den Belegen raus (erreichbar über den Auftrag: „Angebot ansehen"), Auftragsliste und Detail sagen denselben Stand („Angebot offen / versendet / angenommen / abgelehnt"), „Pauschale" steht bei der Leistung (Beleg und PDF), Verwalten ohne Storno-Knopf.

**Offen:** WKO-Termin 7.8. (Wortlaut + Verwechslungsfrage bestätigen; Juristisches eher übers WKO-Rechtsservice) · Alex das Angebot machen — nach seinem Ja: Betrieb Caesar anlegen (Fragebogen + Übergabe-Checkliste), Chat auf die Hausordnung, Zahlungslink schicken · `montageundmehr.at` liegt im Warenkorb, gekauft wird nach der Gewerbeschein-Klärung · Demo zeigt nur Demo-Daten · Mailvorlagen auf die Betriebsfarben · Logo in den PDF-Kopf (`logo_url`) · die übrigen vier Chats auf die Hausordnung umhängen · Handy-Durchgang über alle Seiten · Stripe scharf schalten (nach Kanzlei-Antworten; Erinnerung am 10.8. eingerichtet) · Zeiten-Reiter: Feineinstellung scharf schalten oder ausblenden · Auftrags- und Rechnungslisten: Scrollen sauber lösen und eine Suche einbauen, sobald die Listen mit echten Kunden wachsen (Alvins Wunsch vom 6.8.).

---

## Wo wir morgen weitermachen

*Stand 6. August, Nachmittag. Caesar-Tag: Das Pitch-Paket ist fertig, die SEPA-Strecke gebaut und echt durchgespielt.*

**Heute erledigt (Caesar-Tag):** Die **Muster-Rechnung für Caesar** mit seinen echten Daten (aus seiner Rechnung 20261035: Adresse, IBAN, FN) im neuen Beleg-Design, mit seinem Logo-C als C von CAESAR — alles auf einer Linie, eine Größe, „aus einem Guss". Dieselbe Wortmarke live auf der Caesar-Website (Hero, Navigation, Fußzeile — die HTML liest ein einziges `caesar-c-hell.png`). Das **Logo-C neu aufgebaut**: In seiner PDF steckt es nur als 112-Pixel-Bild; jetzt in 8-facher Auflösung mit weichen Kanten, ohne Kreis, auf Alvins Wunsch Stufe 3 (~12 % schlanker). Der **Gründungskunden-Einseiter** als PDF (Anker „regulär 89,–", volles Büro, keine Registrierkassenpflicht). Und die **ganze SEPA-Strecke** (siehe „Geld") — inklusive Ende-zu-Ende-Test als „Alexander Höller (TEST)" mit Stripes Test-IBAN: Checkout → Einzug → Webhook → Rechnung ZZ 03/2026 automatisch angelegt und als bezahlt vermerkt → Mail an Alvin. Testdaten danach restlos entfernt (Rechnung gelöscht, Test-Abo storniert), die Nummer bleibt für die erste echte Rechnung frei. Alex weiß von alledem noch nichts — der Test lief mit Alvins Mailadresse, im Testmodus verschickt Stripe keine Kundenmails.

**Entschieden am Rand:** Die Montage-Seite behält bewusst ihr eigenes, zentriertes Layout — mindestens bis nach Caesar. Zwei verschieden aussehende Seiten auf derselben Engine sind auch ein Verkaufsargument: keine Vorlage von der Stange. Beim Caesar-Bau wird das Standard-Layout geschärft, dann fällt die Entscheidung mit frischem Blick neu.

**Als Nächstes:** Morgen (7.8.) der WKO-Termin. Danach das Gespräch mit Alex — das Paket liegt bereit: Muster-Rechnung mit seinem Logo, Einseiter, Zahlungslink. Sagt er ja, folgt der Rest aus Fragebogen und Übergabe-Checkliste: Betrieb Caesar anlegen (Farben, Logo, Wissen — echte Preise erst von ihm), Chat auf die Hausordnung, Link schicken, fertig. Roli (Evolution Ears) danach mit Front Office.

**Neue Kundenseiten** entstehen erst mit einem echten, ausgefüllten Fragebogen. Der Fragebogen ist dafür geprüft und trägt fast alles; was er bewusst nicht sammelt, holt die Übergabe-Checkliste unten.

## Nach dem Fragebogen — die Übergabe-Checkliste

Was der Fragebogen bewusst nicht einsammelt und vor dem ersten Beleg da sein muss:
Bankdaten (IBAN/BIC/Bank — persönlich besprechen, nie ins Formular) · Logo-Dateien in brauchbarer Auflösung · Zugänge zu Domain, E-Mail-Anbieter und Google-Konto · Arbeitszeiten und Urlaub in der App gegenprüfen · AVV-Bestätigung ist im Fragebogen bereits enthalten.

---

## Bewusst verschoben — und warum

| Verschoben | Warum |
|---|---|
| Anzahlung und Teilrechnung | Erst wenn ein Betrieb es braucht. Frage steht im Fragebogen. |
| Mahnwesen | Kein Kunde, keine offenen Posten. |
| Gründerpreise live in Stripe | Sandbox steht (Link, Preise, Webhook). Live erst nach Kanzlei-Antworten und einem Ja. |
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
- **Eine Signaturprüfung testet man mit einem echten Ereignis — sie war seit dem Bau kaputt.** Der Stripe-Rückruf verglich die Unterschrift mit einem nachgebauten JSON-Text statt mit dem Roh-Text der Anfrage; jede echte Meldung wäre still verworfen worden. Aufgefallen erst beim Durchspielen mit einem echten Checkout.
- **Das Nummernkreis-Rezept lebt jetzt an drei Stellen.** `app.html`, `nummernkreis.js` und der Stripe-Rückruf in n8n zählen dieselbe Folge. Wer die Zählweise ändert, ändert sie dreimal — das steht hier, damit es niemand vergisst.
- **In fremdem Code, den man nicht lesen kann, schneidet man nicht.** Besser ein eigener Baustein am Dateiende, der sich zuletzt einhängt und still scheitert, als fünf geratene Änderungen mitten hinein.
- **Prüfen kommt vor Hochladen, nicht danach.** Einmal falsch maskierte Zeilenumbrüche, sofort committet — die App war kaputt, bis die alte Fassung zurück war.
- **Wer eine Liste filtert, muss den anderen Weg dorthin bauen.** Angebote aus den Belegen genommen, ohne Verweis vom Auftrag: das Angebot war nicht mehr erreichbar.
- **Ein schmaler Daten-Auszug lässt breite Leser still verhungern.** `_alleRechnungen` lud vier Spalten für den Nummernzähler; vier Bausteine lasen daraus Stand, Datum und Verweise — und scheiterten wortlos. Wer eine Abfrage schmal hält, muss wissen, wer die breiten Zeilen erwartet.
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
