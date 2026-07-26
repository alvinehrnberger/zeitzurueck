/* ============================================================
   ZeitZurück — Fortlaufende Rechnungsnummer über ALLE Betriebe
   Ein Einzelunternehmer = eine lückenlose Nummernfolge.
   Das Präfix zeigt nur, aus welchem Betrieb die Rechnung kommt:
   M 03/2026 → ZZ 04/2026 → M 05/2026 …
   ============================================================ */
(function () {
  var GLOBAL_JAHR = 2026;   // Jahr, in dem schon Rechnungen existierten
  var GLOBAL_NUMMER = 2;    // letzte vergebene Nummer (Honorarnote 02/2026)

  window._alleRechnungen = [];

  async function alleLaden() {
    try {
      var r = await sb.from('rechnungen').select('nummer,datum,created_at,art');
      window._alleRechnungen = r.data || [];
    } catch (e) { /* still weiterlaufen */ }
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
})();
