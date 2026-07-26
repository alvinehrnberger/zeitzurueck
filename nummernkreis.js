/* ============================================================
   ZeitZurück — Erweiterungen zur App
   Wird von app.html geladen und überschreibt einzelne Funktionen.
   1) Fortlaufende Rechnungsnummer über ALLE Betriebe
   2) "Geld erhalten" direkt beim erledigten Auftrag
   ============================================================ */
(function () {

  /* ---------- 1) Nummernkreis über alle Betriebe ----------
     Ein Einzelunternehmer = eine lückenlose Folge.
     Das Präfix zeigt nur, aus welchem Betrieb die Rechnung kommt:
     M 03/2026 → ZZ 04/2026 → M 05/2026 …                      */
  var GLOBAL_JAHR = 2026;   // Jahr, in dem schon Rechnungen existierten
  var GLOBAL_NUMMER = 2;    // letzte vergebene Nummer (Honorarnote 02/2026)

  window._alleRechnungen = [];

  async function alleLaden() {
    try {
      var r = await sb.from('rechnungen').select('nummer,datum,created_at,art');
      window._alleRechnungen = r.data || [];
    } catch (e) { /* App laeuft weiter */ }
  }

  var origLoadData = window.loadData;
  window.loadData = async function () {
    await origLoadData.apply(this, arguments);
    await alleLaden();
  };

  window.naechsteNummer = function () {
    var k = konf(), jahr = new Date().getFullYear();
    var bisher = (window._alleRechnungen || []).filter(function (i) {
      if (i.art !== 'rechnung' && i.art !== 'storno') return false;
      var d = i.datum || i.created_at;
      return d ? (new Date(d)).getFullYear() === jahr : true;
    }).length;
    var offset = (GLOBAL_JAHR === jahr) ? GLOBAL_NUMMER : 0;
    return k.praefix + String(offset + bisher + 1).padStart(2, '0') + '/' + jahr;
  };

  /* ---------- 2) Geld erhalten beim Auftrag ----------
     Der Handwerker denkt in Auftraegen, nicht in Belegen.
     Beim erledigten Auftrag steht jetzt direkt, ob bezahlt wurde. */
  window.showJob = function (id) {
    var j = auftraege.find(function (x) { return x.id === id; });
    if (!j) return;
    backBtn.style.display = 'block';
    el('tabs').style.display = 'none';
    el('fab').style.display = 'none';
    el('barSub').textContent = j.kunde;

    /* ---- erledigter Auftrag ---- */
    if (j.status !== 'offen') {
      var inv = rechnungen.find(function (i) { return i.auftrag_id === id; });
      var offen = inv && inv.art === 'rechnung' && !inv.bezahlt_am && !istStorniert(inv);
      var zeile = '';
      var hinweis = '';
      var aktion = '';

      if (inv && inv.art === 'rechnung') {
        var s = invStatus(inv);
        if (inv.bezahlt_am) {
          zeile = '<div class="row"><span class="k">Zahlung</span><span class="v" style="color:var(--ok)">Bezahlt am ' + deDate(inv.bezahlt_am) + '</span></div>';
        } else if (istStorniert(inv)) {
          zeile = '<div class="row"><span class="k">Zahlung</span><span class="v" style="color:var(--muted)">Storniert</span></div>';
        } else {
          zeile = '<div class="row"><span class="k">Zahlung</span><span class="v" style="color:var(--warn)">Offen bis ' + deDate(faelligAm(inv)) + '</span></div>';
          if (s.k === 'ueberfaellig' || s.k === 'mahnung' || s.k === 'erinnert') {
            hinweis = '<div class="alert"><b>Seit ' + s.tage + ' Tagen überfällig.</b> Du kannst unten als bezahlt markieren oder in den Rechnungen erinnern.</div>';
          }
        }
      } else if (j.status === 'bar') {
        zeile = '<div class="row"><span class="k">Zahlung</span><span class="v">Bar erhalten</span></div>';
      }

      if (offen) {
        aktion = '<div class="cta">' +
          '<button class="btn btn-ghost" onclick="showInvoice(\'' + inv.id + '\')">Rechnung ansehen</button>' +
          '<button class="btn btn-primary" onclick="geldErhalten(\'' + inv.id + '\',\'' + id + '\')">💶 Geld erhalten</button></div>';
      } else if (inv) {
        aktion = '<div class="cta"><button class="btn btn-dark" onclick="showInvoice(\'' + inv.id + '\')">Rechnung ansehen</button></div>';
      }

      screen.innerHTML = '<div style="padding:4px 2px">' + hinweis +
        '<div class="d-h">' + esc(j.kunde) + '</div><div class="d-s">' + esc(j.aufgabe || '') + '</div>' +
        '<div class="rows">' +
          '<div class="row"><span class="k">Status</span><span class="v" style="color:var(--ok)">Erledigt</span></div>' +
          '<div class="row"><span class="k">Geleistete Zeit</span><span class="v">' + String(j.stunden).replace('.', ',') + ' Std</span></div>' +
          (inv && inv.nummer ? '<div class="row"><span class="k">Rechnung</span><span class="v">Nr. ' + esc(inv.nummer) + '</span></div>' : '') +
          (inv ? '<div class="row"><span class="k">Betrag</span><span class="v">' + eur(inv.betrag) + '</span></div>' : '') +
          zeile +
          (j.adresse ? '<div class="row"><span class="k">Adresse</span><span class="v"><a href="' + mapsLink(j.adresse) + '" target="_blank" rel="noopener">' + esc(j.adresse) + ' ↗</a></span></div>' : '') +
        '</div>' +
        '<div class="dngr" onclick="deleteJob(\'' + j.id + '\')">Auftrag löschen</div></div>' + aktion;
      return;
    }

    /* ---- offener Auftrag ---- */
    var satz = betrieb ? Number(betrieb.stundensatz) : 50;
    screen.innerHTML = '<div style="padding:4px 2px"><div class="d-h">' + esc(j.kunde) + '</div>' +
      '<div class="d-s">' + esc(j.aufgabe || '') + '</div>' +
      '<div class="rows">' +
        (j.termin ? '<div class="row"><span class="k">Termin</span><span class="v">' + fmtTermin(j.termin) + '</span></div>' : '') +
        (j.adresse ? '<div class="row"><span class="k">Adresse</span><span class="v"><a href="' + mapsLink(j.adresse) + '" target="_blank" rel="noopener">' + esc(j.adresse) + ' ↗</a></span></div>' : '') +
        (j.kunde_email ? '<div class="row"><span class="k">E-Mail</span><span class="v">' + esc(j.kunde_email) + '</span></div>' : '') +
        '<div class="row"><span class="k">Stundensatz</span><span class="v">' + eur(satz) + ' / Std</span></div>' +
        '<div class="row"><span class="k">Nächste Rechnung</span><span class="v">' + naechsteNummer() + '</span></div>' +
      '</div>' +
      '<p style="color:var(--muted);font-size:13px;margin-top:14px">Wenn du fertig bist: „Arbeit abgeschlossen" tippen, echte Stunden eintragen — den Rest erledigt ZeitZurück.</p>' +
      '<div class="dngr" onclick="deleteJob(\'' + j.id + '\')">Auftrag löschen</div></div>' +
      '<div class="cta"><button class="btn btn-primary" onclick="openComplete(\'' + j.id + '\')">✓ Arbeit abgeschlossen</button></div>';
  };

  /* Zahlung vom Auftrag aus buchen */
  window.geldErhalten = async function (rechnungId, auftragId) {
    try {
      await sb.from('rechnungen').update({ bezahlt_am: isoDate() }).eq('id', rechnungId);
      await loadData();
      showJob(auftragId);
    } catch (e) {
      alert('Konnte nicht speichern: ' + e.message);
    }
  };

})();
