/* ============================================================
   ZeitZurück — Erweiterungen zur App
   Wird von app.html geladen und überschreibt einzelne Funktionen.
   1) Fortlaufende Rechnungsnummer über ALLE Betriebe
   2) "Geld erhalten" direkt beim erledigten Auftrag
   3) Begrüßung: "Hallo" statt "Grüß dich"
   4) Rechnung verwalten: sichtbare Zeile statt versteckter Punkte
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

  /* ============================================================
     3) + 4) Bedienbarkeit — laeuft nach dem Rendern
     ============================================================ */

  /* Zusaetzliches CSS, damit "Rechnung verwalten" nicht mehr
     wie ein Fussnoten-Hinweis aussieht, sondern wie ein Schalter. */
  var css = document.createElement('style');
  css.textContent =
    '.more.mk{display:flex;align-items:center;gap:12px;width:100%;' +
      'text-align:left;padding:14px 16px;margin-top:18px;border-radius:14px;' +
      'background:rgba(26,58,43,.06);border:1px solid rgba(26,58,43,.14);' +
      'color:inherit;font-size:15px;cursor:pointer;opacity:1;' +
      'transition:background .15s ease}' +
    '.more.mk:hover{background:rgba(26,58,43,.11)}' +
    '.more.mk .mk-i{flex:none;width:34px;height:34px;border-radius:50%;' +
      'display:flex;align-items:center;justify-content:center;font-size:16px;' +
      'background:rgba(26,58,43,.1)}' +
    '.more.mk .mk-t{flex:1;min-width:0;line-height:1.35}' +
    '.more.mk .mk-t b{display:block;font-weight:600;font-size:15px}' +
    '.more.mk .mk-t i{display:block;font-style:normal;font-size:13px;opacity:.62;margin-top:1px}' +
    '.more.mk .mk-c{flex:none;opacity:.4;font-size:20px}';
  document.head.appendChild(css);

  function verwaltenSichtbar() {
    var m = document.querySelector('.more');
    if (!m || m.classList.contains('mk')) return;
    m.classList.add('mk');
    m.innerHTML =
      '<span class="mk-i">⚙</span>' +
      '<span class="mk-t"><b>Rechnung verwalten</b>' +
      '<i>Bearbeiten · Stornieren · Löschen</i></span>' +
      '<span class="mk-c">›</span>';
  }

  var origShowInvoice = window.showInvoice;
  if (typeof origShowInvoice === 'function') {
    window.showInvoice = function () {
      var r = origShowInvoice.apply(this, arguments);
      verwaltenSichtbar();
      return r;
    };
  }

  /* "Grüß dich" ist Dialekt — nicht jeder Kunde spricht so.
     "Hallo" versteht jeder, auch der Wiener und der Deutsche. */
  function hallo(root) {
    try {
      var w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = w.nextNode())) {
        if (n.nodeValue.indexOf('Grüß dich') > -1) {
          n.nodeValue = n.nodeValue.replace(/Grüß dich/g, 'Hallo');
        }
      }
    } catch (e) { }
  }

  var wartet = false;
  var beob = new MutationObserver(function () {
    if (wartet) return;
    wartet = true;
    requestAnimationFrame(function () {
      wartet = false;
      hallo();
      verwaltenSichtbar();
    });
  });

  function start() {
    hallo();
    verwaltenSichtbar();
    beob.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
