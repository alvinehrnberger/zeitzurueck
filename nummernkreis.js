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
    var k = konf(), istDemo = String(k.praefix || '').trim() === 'DEMO', jahr = new Date().getFullYear();
    var bisher = (window._alleRechnungen || []).filter(function (i) {
      if (i.art !== 'rechnung' && i.art !== 'storno') return false;
      var kz = String(i.nummer || '').trim().split(' ')[0];
      if ((kz === 'DEMO') !== istDemo) return false;
      var d = i.datum || i.created_at;
      return d ? (new Date(d)).getFullYear() === jahr : true;
    }).length;
    var offset = istDemo ? 0 : ((GLOBAL_JAHR === jahr) ? GLOBAL_NUMMER : 0);
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
          '<div class="row"><span class="k">Termin</span><span class="v">' + (j.termin ? new Date(j.termin).toLocaleString('de-AT',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—') + '</span></div>' +
          '<div class="row"><span class="k">Geleistete Zeit</span><span class="v">' + String(j.stunden).replace('.', ',') + ' Std</span></div>' +
          (inv && inv.nummer ? '<div class="row"><span class="k">Rechnung</span><span class="v">Nr. ' + esc(inv.nummer) + '</span></div>' : '') +
          (inv ? '<div class="row"><span class="k">Betrag</span><span class="v">' + eur(inv.betrag) + '</span></div>' : '') +
          zeile +
          (j.adresse ? '<div class="row"><span class="k">Adresse</span><span class="v"><a href="' + mapsLink(j.adresse) + '" target="_blank" rel="noopener">' + esc(j.adresse) + ' ↗</a></span></div>' : '') +
        '</div>' +
        '<div class="verlegen" onclick="openAngebot(\'' + j.id + '\')">Angebot erstellen</div><div class="verlegen" onclick="openTermin(\'' + j.id + '\')">Termin ändern</div><div class="dngr" onclick="deleteJob(\'' + j.id + '\')">Auftrag löschen</div></div>' + aktion;
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
      '<div class="verlegen" onclick="openAngebot(\'' + j.id + '\')">Angebot erstellen</div><div class="verlegen" onclick="openTermin(\'' + j.id + '\')">Termin ändern</div><div class="dngr" onclick="deleteJob(\'' + j.id + '\')">Auftrag löschen</div></div>' +
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

  /* Merken, dass eine Rechnung schon rausgegangen ist.
     Ohne das steht beim zweiten Hinschauen wieder "Senden" da,
     und man weiss nicht, ob der Kunde sie hat. */
  function gesendetZeigen(rechnungId) {
    var inv = null;
    try { inv = rechnungen.find(function (i) { return i.id === rechnungId; }); } catch (e) { }
    if (!inv || !inv.gesendet_am) return;

    var s = document.getElementById('screen');
    if (!s) return;

    // Knopf umbenennen: es ist ein erneutes Senden, kein erstes.
    s.querySelectorAll('.cta .btn').forEach(function (b) {
      if (/senden/i.test(b.textContent) && !/erneut/i.test(b.textContent)) {
        b.textContent = '✉ Erneut senden';
        b.classList.remove('btn-dark', 'btn-primary');
        b.classList.add('btn-ghost');
      }
    });

    // Und sichtbar machen, wann sie rausgegangen ist.
    if (s.querySelector('[data-gesendet]')) return;
    var reihen = s.querySelector('.rows');
    if (reihen) {
      var z = document.createElement('div');
      z.className = 'row';
      z.setAttribute('data-gesendet', '1');
      z.innerHTML = '<span class="k">Verschickt</span><span class="v" style="color:var(--ok)">am ' +
                    deDate(inv.gesendet_am) + '</span>';
      reihen.appendChild(z);
    }
  }

  var origShowInvoice = window.showInvoice;
  if (typeof origShowInvoice === 'function') {
    window.showInvoice = function (id) {
      var r = origShowInvoice.apply(this, arguments);
      verwaltenSichtbar();
      gesendetZeigen(id);
      return r;
    };
  }

  /* Nach dem Versand festhalten, wann es passiert ist. */
  var origSendDoc = window.sendDoc;
  if (typeof origSendDoc === 'function') {
    window.sendDoc = async function (rec, empfaenger, art) {
      var r = await origSendDoc.apply(this, arguments);
      try {
        if (rec && rec.id) {
          await sb.from('rechnungen').update({ gesendet_am: isoDate() }).eq('id', rec.id);
          await loadData();
        }
      } catch (e) { /* Versand hat geklappt, nur die Notiz nicht */ }
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

  /* Beispieltexte im Formular: neutral halten.
     Ein fremder Betrieb soll hier nicht Katrins Namen lesen. */
  var BEISPIELE = {
    'Katrin Ehrnberger': 'Vor- und Nachname',
    'Möbelmontage – Kleiderschrank PAX': 'z. B. Kleiderschrank montieren',
    'Straße 1, 3012 Wolfsgraben': 'Straße, PLZ, Ort'
  };
  function beispieleNeutral() {
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (f) {
      var neu = BEISPIELE[f.getAttribute('placeholder')];
      if (neu) f.setAttribute('placeholder', neu);
    });
  }

  var wartet = false;
  var beob = new MutationObserver(function () {
    if (wartet) return;
    wartet = true;
    requestAnimationFrame(function () {
      wartet = false;
      hallo();
      verwaltenSichtbar();
      beispieleNeutral();
    });
  });

  function start() {
    hallo();
    verwaltenSichtbar();
    beispieleNeutral();
    beob.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  /* ============================================================
     5) Zeiten — Arbeitszeiten, Urlaub, Einstellungen
     Bisher stand das alles im Code der Slot-Engine. Ab jetzt
     aendert es der Betrieb selbst, ohne Anruf.
     ============================================================ */

  var TAGE = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  var Z = { zeiten: [], sperren: [], einst: null, geladen: false };

  function scr() { return document.getElementById('screen'); }
  function betriebId() { try { return betrieb ? betrieb.id : null; } catch (e) { return null; } }
  function hhmm(t) { return (t || '').toString().slice(0, 5); }
  function heute() { return new Date().toISOString().slice(0, 10); }

  var css2 = document.createElement('style');
  css2.textContent =
    '.zt-block{margin:0 0 26px}' +
    '.zt-block h3{font-size:15px;font-weight:600;margin:0 0 3px}' +
    '.zt-block .zt-sub{font-size:13px;opacity:.6;margin:0 0 12px;line-height:1.45}' +
    '.zt-tag{display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1px solid rgba(26,58,43,.10)}' +
    '.zt-tag:last-child{border-bottom:0}' +
    '.zt-tag .nm{flex:1;min-width:0;font-size:14.5px}' +
    '.zt-tag.aus .nm{opacity:.42}' +
    '.zt-tag input[type=time]{border:1px solid rgba(26,58,43,.18);border-radius:9px;padding:7px 9px;' +
      'font-size:14px;font-family:inherit;background:#fff;color:inherit;width:104px}' +
    '.zt-tag.aus input[type=time]{opacity:.35}' +
    '.zt-sw{position:relative;width:42px;height:24px;flex:none;cursor:pointer}' +
    '.zt-sw input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}' +
    '.zt-sw i{position:absolute;inset:0;border-radius:999px;background:rgba(26,58,43,.20);transition:background .2s}' +
    '.zt-sw i:after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;' +
      'background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.25)}' +
    '.zt-sw input:checked + i{background:#2f9e6f}' +
    '.zt-sw input:checked + i:after{transform:translateX(18px)}' +
    '.zt-feld{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:10px}' +
    '.zt-feld input{flex:1;min-width:130px;border:1px solid rgba(26,58,43,.18);border-radius:10px;' +
      'padding:11px 12px;font-size:15px;font-family:inherit;background:#fff;color:inherit}' +
    '.zt-sperre{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid rgba(26,58,43,.10)}' +
    '.zt-sperre .txt{flex:1;min-width:0}' +
    '.zt-sperre .txt b{display:block;font-size:14.5px;font-weight:600}' +
    '.zt-sperre .txt span{font-size:12.5px;opacity:.6}' +
    '.zt-weg{background:none;border:0;color:#c0473b;font-size:13px;cursor:pointer;padding:6px;font-family:inherit}' +
    '.zt-leer{font-size:13.5px;opacity:.55;padding:10px 0}' +
    '.zt-hinweis{background:rgba(201,160,84,.13);border-left:3px solid #C9A054;border-radius:0 10px 10px 0;' +
      'padding:11px 14px;font-size:13px;line-height:1.5;margin-top:6px}' +
    /* Nicht die .cta des Hauptmenues verwenden - die klebt fix am Bildschirmrand. */
    '.zt-cta{padding:14px 0 0}' +
    '.zt-cta .btn{width:100%;justify-content:center}';
  document.head.appendChild(css2);

  async function zeitenLaden() {
    var id = betriebId();
    if (!id) return;
    Z.fehler = null;
    try {
      var a = await sb.from('betrieb_zeiten').select('*').eq('betrieb_id', id).order('wochentag');
      var b = await sb.from('betrieb_sperren').select('*').eq('betrieb_id', id)
                      .eq('aktiv', true).gte('bis_datum', heute()).order('von_datum');
      var c = await sb.from('betrieb_einstellungen').select('*').eq('betrieb_id', id).maybeSingle();
      // Supabase wirft nicht, es liefert error zurueck. Ohne diese Zeile
      // saehe ein fehlendes Tabellen-Setup wie ein leeres Formular aus.
      var problem = (a && a.error) || (b && b.error) || (c && c.error);
      if (problem) throw problem;
      Z.zeiten = (a.data || []).map(function (r) {
        return { id: r.id, betrieb_id: r.betrieb_id, wochentag: r.wochentag,
                 von: hhmm(r.von), bis: hhmm(r.bis), aktiv: r.aktiv };
      });
      Z.sperren = b.data || [];
      Z.einst = (c && c.data) || null;
    } catch (e) {
      Z.fehler = e.message;
    }
    for (var w = 1; w <= 7; w++) {
      if (!Z.zeiten.some(function (z) { return z.wochentag === w; })) {
        Z.zeiten.push({ betrieb_id: id, wochentag: w, von: '09:00', bis: '17:00', aktiv: false });
      }
    }
    Z.zeiten.sort(function (x, y) { return x.wochentag - y.wochentag; });
    Z.geladen = true;
  }

  function zeitenZeichnen() {
    var e = Z.einst || {};
    var tage = Z.zeiten.map(function (z) {
      return '<div class="zt-tag' + (z.aktiv ? '' : ' aus') + '" data-tag="' + z.wochentag + '">' +
        '<label class="zt-sw"><input type="checkbox" data-feld="aktiv"' + (z.aktiv ? ' checked' : '') + '><i></i></label>' +
        '<span class="nm">' + TAGE[z.wochentag] + '</span>' +
        '<input type="time" data-feld="von" value="' + z.von + '">' +
        '<input type="time" data-feld="bis" value="' + z.bis + '">' +
      '</div>';
    }).join('');

    var sperren = Z.sperren.length
      ? Z.sperren.map(function (s) {
          var gleich = s.von_datum === s.bis_datum;
          return '<div class="zt-sperre">' +
            '<div class="txt"><b>' + (s.grund ? esc(s.grund) : 'Frei') + '</b>' +
            '<span>' + deDate(s.von_datum) + (gleich ? '' : ' bis ' + deDate(s.bis_datum)) + '</span></div>' +
            '<button class="zt-weg" onclick="sperreLoeschen(\'' + s.id + '\')">Entfernen</button>' +
          '</div>';
        }).join('')
      : '<div class="zt-leer">Keine freien Tage eingetragen.</div>';

    scr().innerHTML =
      '<div style="padding:4px 2px">' +

      '<div class="zt-block">' +
        '<h3>Arbeitszeiten</h3>' +
        '<p class="zt-sub">Nur innerhalb dieser Zeiten schlägt der Chat Termine vor. Tag ausschalten heißt: an dem Tag wird nichts gebucht.</p>' +
        tage +
        '<div class="zt-cta">' +
          '<button class="btn btn-primary" onclick="zeitenSpeichern()">Arbeitszeiten speichern</button>' +
        '</div>' +
      '</div>' +

      '<div class="zt-block">' +
        '<h3>Urlaub &amp; freie Tage</h3>' +
        '<p class="zt-sub">Trage ein, wann du nicht da bist. An diesen Tagen bekommst du keine Termine.</p>' +
        '<div class="zt-feld">' +
          '<input type="date" id="ztVon" value="' + heute() + '">' +
          '<input type="date" id="ztBis" value="' + heute() + '">' +
        '</div>' +
        '<div class="zt-feld">' +
          '<input type="text" id="ztGrund" placeholder="Kroatien, Feiertag, Werkstatt zu …">' +
        '</div>' +
        '<div class="zt-cta" style="padding-bottom:16px">' +
          '<button class="btn btn-dark" onclick="sperreAnlegen()">Freie Tage eintragen</button>' +
        '</div>' +
        sperren +
      '</div>' +

      '<div class="zt-block">' +
        '<h3>Feineinstellung</h3>' +
        '<p class="zt-sub">Wie viel Vorlauf du brauchst und wie lang ein Termin normalerweise dauert.</p>' +
        '<div class="rows">' +
          '<div class="row"><span class="k">Vorlauf</span><span class="v">' +
            '<input type="number" id="ztVorlauf" min="0" max="336" value="' + (e.vorlauf_stunden != null ? e.vorlauf_stunden : 24) + '" style="width:70px;border:1px solid rgba(26,58,43,.18);border-radius:8px;padding:6px 8px;font-family:inherit"> Stunden</span></div>' +
          '<div class="row"><span class="k">Termindauer</span><span class="v">' +
            '<input type="number" id="ztDauer" min="15" max="480" step="15" value="' + (e.termin_minuten != null ? e.termin_minuten : 60) + '" style="width:70px;border:1px solid rgba(26,58,43,.18);border-radius:8px;padding:6px 8px;font-family:inherit"> Minuten</span></div>' +
          '<div class="row"><span class="k">Puffer dazwischen</span><span class="v">' +
            '<input type="number" id="ztPuffer" min="0" max="240" step="5" value="' + (e.puffer_minuten != null ? e.puffer_minuten : 15) + '" style="width:70px;border:1px solid rgba(26,58,43,.18);border-radius:8px;padding:6px 8px;font-family:inherit"> Minuten</span></div>' +
        '</div>' +
        '<div class="zt-cta">' +
          '<button class="btn btn-ghost" onclick="einstellungenSpeichern()">Einstellungen speichern</button>' +
        '</div>' +
      '</div>' +

      '<div class="zt-hinweis"><b>Noch nicht scharf geschaltet.</b> Diese Angaben werden gespeichert, aber der Terminfinder rechnet vorläufig noch mit den fest hinterlegten Zeiten. Der Umbau kommt als Nächstes.</div>' +

      (Z.fehler ? '<div class="alert" style="margin-top:14px">Konnte nicht laden: ' + esc(Z.fehler) + '</div>' : '') +
      '</div>';

    scr().querySelectorAll('.zt-tag').forEach(function (reihe) {
      var tag = Number(reihe.getAttribute('data-tag'));
      reihe.querySelectorAll('input').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var satz = Z.zeiten.find(function (z) { return z.wochentag === tag; });
          if (!satz) return;
          var feld = inp.getAttribute('data-feld');
          if (feld === 'aktiv') { satz.aktiv = inp.checked; reihe.classList.toggle('aus', !inp.checked); }
          else { satz[feld] = inp.value; }
        });
      });
    });
  }

  window.zeitenSpeichern = async function () {
    var id = betriebId(); if (!id) return;
    try {
      var reihen = Z.zeiten.map(function (z) {
        return { betrieb_id: id, wochentag: z.wochentag, von: z.von, bis: z.bis, aktiv: z.aktiv };
      });
      var r = await sb.from('betrieb_zeiten').upsert(reihen, { onConflict: 'betrieb_id,wochentag' });
      if (r.error) throw r.error;
      await zeitenLaden(); zeitenZeichnen();
      alert('Arbeitszeiten gespeichert.');
    } catch (e) { alert('Konnte nicht speichern: ' + e.message); }
  };

  window.sperreAnlegen = async function () {
    var id = betriebId(); if (!id) return;
    var von = document.getElementById('ztVon').value;
    var bis = document.getElementById('ztBis').value;
    var grund = document.getElementById('ztGrund').value.trim();
    if (!von || !bis) { alert('Bitte Von und Bis ausfüllen.'); return; }
    if (bis < von) { alert('Das Enddatum liegt vor dem Startdatum.'); return; }
    try {
      var r = await sb.from('betrieb_sperren').insert({
        betrieb_id: id, von_datum: von, bis_datum: bis,
        grund: grund || null, quelle: 'app', aktiv: true
      });
      if (r.error) throw r.error;
      await zeitenLaden(); zeitenZeichnen();
    } catch (e) { alert('Konnte nicht speichern: ' + e.message); }
  };

  window.sperreLoeschen = async function (sperrId) {
    if (!confirm('Diese freien Tage wieder freigeben?')) return;
    try {
      var r = await sb.from('betrieb_sperren').update({ aktiv: false }).eq('id', sperrId);
      if (r.error) throw r.error;
      await zeitenLaden(); zeitenZeichnen();
    } catch (e) { alert('Konnte nicht speichern: ' + e.message); }
  };

  window.einstellungenSpeichern = async function () {
    var id = betriebId(); if (!id) return;
    try {
      var r = await sb.from('betrieb_einstellungen').upsert({
        betrieb_id: id,
        vorlauf_stunden: Number(document.getElementById('ztVorlauf').value) || 24,
        termin_minuten: Number(document.getElementById('ztDauer').value) || 60,
        puffer_minuten: Number(document.getElementById('ztPuffer').value) || 15,
        aktualisiert_am: new Date().toISOString()
      }, { onConflict: 'betrieb_id' });
      if (r.error) throw r.error;
      await zeitenLaden(); zeitenZeichnen();
      alert('Einstellungen gespeichert.');
    } catch (e) { alert('Konnte nicht speichern: ' + e.message); }
  };

  /* ---- Tab einhaengen ---- */
  var meinTab = null;

  window.zeitenOeffnen = async function () {
    var leiste = document.querySelector('.tabs');
    if (leiste) [].forEach.call(leiste.children, function (k) { k.classList.remove('on'); });
    if (meinTab) meinTab.classList.add('on');
    var b = document.getElementById('backBtn'); if (b) b.style.display = 'none';
    var f = document.getElementById('fab'); if (f) f.style.display = 'none';
    scr().innerHTML = '<div style="padding:24px 2px;opacity:.6;font-size:14px">Zeiten werden geladen …</div>';
    await zeitenLaden();
    zeitenZeichnen();
  };

  function tabEinhaengen() {
    var leiste = document.querySelector('.tabs');
    if (!leiste || meinTab) return;
    if (leiste.querySelector('[data-zeiten]')) return;
    meinTab = document.createElement('div');
    meinTab.className = 'tab';
    meinTab.setAttribute('data-zeiten', '1');
    meinTab.textContent = 'Zeiten';
    meinTab.addEventListener('click', function () { window.zeitenOeffnen(); });
    leiste.appendChild(meinTab);

    // Wenn der Nutzer auf Auftraege oder Rechnungen wechselt, muss unser Tab abgeben.
    var origSetTab = window.setTab;
    if (typeof origSetTab === 'function' && !origSetTab.__zt) {
      window.setTab = function () {
        if (meinTab) meinTab.classList.remove('on');
        var f = document.getElementById('fab'); if (f) f.style.display = '';
        return origSetTab.apply(this, arguments);
      };
      window.setTab.__zt = true;
    }
  }

  var tabBeob = new MutationObserver(function () { tabEinhaengen(); });
  tabBeob.observe(document.body, { childList: true, subtree: true });
  tabEinhaengen();

})();


/* ================= Pauschale statt Stunden ================= */
(function(){
  function std(){ try{ return (typeof betrieb!=='undefined' && betrieb && betrieb.abrechnung_standard) || 'zeit'; }catch(e){ return 'zeit'; } }
  function jobPauschale(j){ if(j && j.abrechnung==='pauschale') return true; if(j && j.abrechnung==='zeit') return false; return std()==='pauschale'; }
  function recPauschale(i){ return !!i && (i.stunden===null || i.stunden===undefined); }
  window.zzPos = function(i, stunden, satz){ return recPauschale(i) ? 'Pauschale' : String(stunden).replace('.',',')+' h a \u20ac '+satz+',\u2014'; };
  window.zzFuss = function(i, satz){ return recPauschale(i) ? 'Vereinbarte Pauschale. Keine Abrechnung nach Stunden.' : 'Abgerechnet wird nach tats\u00e4chlich geleisteter Zeit zu \u20ac '+satz+',\u2014 pro Stunde.'; };
  window.zzMailSatz = function(){ var r=window.__zzRec; return recPauschale(r) ? 'wird als vereinbarte Pauschale, nicht nach Stunden.' : 'wird nach tats\u00e4chlich geleisteter Zeit zu '+eur(betrieb?betrieb.stundensatz:50)+' pro Stunde.'; };
  var _sd = window.sendDoc;
  if(typeof _sd==='function'){ window.sendDoc = function(rec){ window.__zzRec = rec; return _sd.apply(this, arguments); }; }
  var _sj = window.showJob;
  if(typeof _sj==='function'){ window.showJob = function(id){ var r=_sj.apply(this,arguments); setTimeout(function(){ try{
    var j=auftraege.find(function(x){return x.id===id;});
    if(!j) return; if(j.stunden!==null && j.stunden!==undefined) return; if(!jobPauschale(j)) return;
    Array.prototype.forEach.call(document.querySelectorAll('.row'), function(row){ var k=row.querySelector('.k'); var v=row.querySelector('.v'); if(!k||!v) return;
      if(k.textContent==='Geleistete Zeit'){ k.textContent='Abrechnung'; v.textContent='Pauschale'; }
      if(k.textContent==='Stundensatz'){ row.style.display='none'; } });
  }catch(e){} },0); return r; }; }
  var _oc = window.openComplete;
  if(typeof _oc==='function'){ window.openComplete = function(id){ var r=_oc.apply(this,arguments); setTimeout(function(){ zzUI(id); },0); return r; }; }
  function zzUI(id){
    var host=document.querySelector('.hours'); if(!host || document.getElementById('zzModus')) return;
    var j=null; try{ j=auftraege.find(function(x){return x.id===id;}); }catch(e){}
    var frage=host.previousElementSibling;
    var sumEl=document.getElementById('hsum'); var sumP=sumEl?sumEl.parentElement:null;
    var row=document.createElement('div'); row.id='zzModus'; row.style.cssText='display:flex;gap:8px;margin:0 0 14px';
    row.innerHTML='<button type="button" data-m="zeit" class="zzb">Nach Zeit</button><button type="button" data-m="pauschale" class="zzb">Pauschale</button>';
    host.parentNode.insertBefore(row, frage||host);
    var box=document.createElement('div'); box.id='zzPauschBox'; box.style.cssText='margin:0 0 14px;display:none';
    box.innerHTML='<p class="s" style="margin:0 0 8px">Vereinbarter Pauschalbetrag (netto)</p><input id="zzBetrag" type="number" inputmode="decimal" min="0" step="0.01" placeholder="z. B. 450" style="width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(0,0,0,.18);font-size:17px">';
    host.parentNode.insertBefore(box, host.nextSibling);
    var betragEl=box.querySelector('#zzBetrag');
    if(j && j.pauschale_betrag) betragEl.value=j.pauschale_betrag;
    window.__zzBetrag = betragEl.value || '';
    betragEl.addEventListener('input', function(){ window.__zzBetrag = betragEl.value; });
    function paint(m){ window.__zzModus=m;
      Array.prototype.forEach.call(row.querySelectorAll('.zzb'), function(b){ var on=(b.getAttribute('data-m')===m);
        b.style.cssText='flex:1;padding:10px 12px;border-radius:999px;cursor:pointer;font-weight:600;font-size:14px;border:1px solid '+(on?'transparent':'rgba(0,0,0,.18)')+';background:'+(on?'#C9A054':'transparent')+';color:'+(on?'#12281d':'inherit'); });
      var p=(m==='pauschale'); host.style.display=p?'none':''; if(frage) frage.style.display=p?'none':''; box.style.display=p?'':'none'; if(sumP) sumP.style.display=p?'none':''; }
    Array.prototype.forEach.call(row.querySelectorAll('.zzb'), function(b){ b.addEventListener('click', function(){ paint(b.getAttribute('data-m')); }); });
    paint(jobPauschale(j)?'pauschale':'zeit');
  }
  var _fin = window.finish;
  window.finish = async function(id, art){
    if(window.__zzModus!=='pauschale'){ return _fin.apply(this, arguments); }
    var mailEl=el('cMail'); var mail=(mailEl&&mailEl.value||'').trim();
    if(art==='rechnung' && !/.+@.+\..+/.test(mail)){ alert('Bitte die E-Mail des Kunden eingeben \u2013 dorthin geht die Rechnung.'); return; }
    var betrag=Number(String(window.__zzBetrag||'').replace(',','.'));
    if(!(betrag>0)){ alert('Bitte den Pauschalbetrag eingeben.'); return; }
    el('cRech').disabled=true; el('cBar').disabled=true;
    if(art==='rechnung') el('cRech').textContent='Rechnung wird erstellt\u2026';
    var j=auftraege.find(function(x){return x.id===id;});
    try{
      await sb.from('auftraege').update({ status: art==='bar'?'bar':'erledigt', stunden: null, abrechnung:'pauschale', pauschale_betrag: betrag }).eq('id', id);
      var nummer = art==='rechnung' ? naechsteNummer() : null;
      var payload={ betrieb_id:betrieb.id, auftrag_id:id, leistung_datum:(j&&j.termin)?(function(d){return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);})(new Date(j.termin)):null,nummer:nummer, kunde:j.kunde, positionstext:j.aufgabe, stunden:null, betrag:betrag, art:art };
      if(art==='rechnung') payload.kunde_email=mail;
      var rec=null;
      try{ var r1=await sb.from('rechnungen').insert(payload).select().single(); rec=r1.data; }
      catch(e){ delete payload.kunde_email; var r2=await sb.from('rechnungen').insert(payload).select().single(); rec=r2.data; }
      if(!rec) rec=Object.assign({id:'tmp',datum:new Date().toISOString()},payload);
      rec.kunde_adresse=j.adresse||'';
      var versendet=false, sendErr='';
      if(art==='rechnung'){ try{ await sendDoc(rec, mail, 'rechnung'); versendet=true; }catch(e){ sendErr=e.message||'Versand fehlgeschlagen'; } }
      scrim.classList.remove('show'); await loadData();
      backBtn.style.display='none'; el('tabs').style.display='none'; el('fab').style.display='none'; el('barSub').textContent=j.kunde;
      var html;
      if(art==='bar'){
        html='<div class="done-hero"><div class="big">\u2713</div><h2>Auftrag erledigt</h2><p>'+esc(j.kunde)+' \u00b7 bar bezahlt (Pauschale).</p><div class="checks" style="text-align:left"><div><span>\u2713</span> Auftrag auf \u201eerledigt\u201c gesetzt</div><div style="color:var(--muted)"><span style="color:var(--muted)">\u2013</span> Kein Beleg \u00fcber ZeitZur\u00fcck (Barzahlung)</div></div></div><div class="cta"><button class="btn btn-dark" onclick="showList()">Zur\u00fcck</button></div>';
      } else {
        html='<div class="done-hero"><div class="big">\u2713</div><h2>Rechnung '+esc(rec.nummer)+' '+(versendet?'gesendet':'erstellt')+'</h2><p>'+(versendet?('Als PDF an '+esc(mail)+'. Zahlbar bis '+deDate(faelligAm(rec))+'.'):('Konnte nicht automatisch senden ('+esc(sendErr)+'). Du kannst sie unten erneut senden.'))+'</p></div><div style="padding:0 2px">'+invoiceHTML(rec)+'</div><div class="done-hero"><div class="checks" style="text-align:left"><div><span>'+(versendet?'\u2713':'\u2013')+'</span> '+(versendet?('Als PDF an '+esc(j.kunde)+' gesendet'):'Noch nicht gesendet')+'</div><div><span>\u2713</span> Kopie in deine Buchhaltung gelegt</div><div><span>\u2713</span> Auftrag auf \u201eerledigt\u201c gesetzt</div></div></div><div class="cta"><button class="btn btn-ghost" onclick="downloadPDF(\''+rec.id+'\')">\u2b07 PDF</button><button class="btn btn-dark" onclick="showList()">Fertig</button></div>';
      }
      screen.innerHTML=html; screen.scrollTop=0;
    }catch(e){ scrim.classList.remove('show'); alert('Fehler beim Speichern: '+e.message); }
  };
})();


/* ============ Zahlungsart & Abschluss ohne Rechnung ============ */
(function(){
  function pauschAktiv(){ return window.__zzModus==='pauschale'; }
  function satzJetzt(){ return betrieb?Number(betrieb.stundensatz):50; }
  function betragJetzt(){ return pauschAktiv() ? (Number(String(window.__zzBetrag||'').replace(',','.'))||0) : (curHours*satzJetzt()); }

  window.zzFuss = function(i, satz){
    var t = (i && (i.stunden===null || i.stunden===undefined)) ? 'Vereinbarte Pauschale. Keine Abrechnung nach Stunden.' : 'Abgerechnet wird nach tatsächlich geleisteter Zeit zu € '+satz+',— pro Stunde.';
    if(i && i.zahlart==='bar') t += ' Betrag dankend in bar erhalten.';
    return t; };

  var _oc = window.openComplete;
  if(typeof _oc==='function'){ window.openComplete = function(id){ var r=_oc.apply(this,arguments); setTimeout(function(){
    window.__zzZahlart=null;
    var b=document.getElementById('cBar'); if(b){ b.textContent='Ohne Rechnung abschließen'; b.setAttribute('onclick','zzOhneRechnung(\''+id+'\')'); }
    try{ var n=sheet.querySelector('.note'); if(n) n.innerHTML='Rechnungsnummer wird automatisch vergeben: <b>'+naechsteNummer()+'</b><br>Ohne Rechnung = Auftrag wird nur auf „erledigt“ gesetzt, ZeitZurück erstellt keinen Beleg.'; }catch(e){}
  },0); return r; }; }

  window.zzZahlart = function(id, art){ window.__zzZahlart=art; window.finish(id,'rechnung'); };
  window.zzOhneRechnung = function(id){ window.__zzZahlart=null; window.finish(id,'bar'); };

  function frageZahlart(id, mail){
    sheet.innerHTML='<h3>Wie wurde bezahlt?</h3>'
      + '<p class="s">Betrag: <b>'+eur(betragJetzt())+'</b>'+(pauschAktiv()?' · Pauschale':'')+'</p>'
      + '<input id="cMail" type="hidden" value="'+esc(mail)+'">'
      + '<div class="stack">'
      + '<button class="btn btn-primary" id="cBar" onclick="zzZahlart(\''+id+'\',\'ueberweisung\')">Auf Rechnung (Überweisung)</button>'
      + '<button class="btn btn-ghost" id="cRech" onclick="zzZahlart(\''+id+'\',\'bar\')">Bar erhalten</button>'
      + '</div>'
      + '<div class="note">Bar = Rechnung wird erstellt, gesendet und sofort als bezahlt vermerkt.<br>Überweisung = zahlbar binnen 14 Tagen, erscheint in der Mahnprüfung.</div>';
  }

  window.finish = async function(id, art){
    var mailEl=el('cMail'); var mail=(mailEl&&mailEl.value||'').trim();
    if(art==='rechnung' && !/.+@.+\..+/.test(mail)){ alert('Bitte die E-Mail des Kunden eingeben – dorthin geht die Rechnung.'); return; }
    var pausch=pauschAktiv(); var satz=satzJetzt(); var betrag=betragJetzt();
    if(pausch && !(betrag>0)){ alert('Bitte den Pauschalbetrag eingeben.'); return; }
    if(art==='rechnung' && !window.__zzZahlart){ frageZahlart(id, mail); return; }
    var zahlart = window.__zzZahlart || null;
    var cR=el('cRech'), cB=el('cBar'); if(cR) cR.disabled=true; if(cB) cB.disabled=true;
    if(art==='rechnung' && cR) cR.textContent='Rechnung wird erstellt…';
    var j=auftraege.find(function(x){return x.id===id;});
    try{
      await sb.from('auftraege').update({ status: art==='bar'?'bar':'erledigt', stunden: pausch?null:curHours, abrechnung: pausch?'pauschale':'zeit', pauschale_betrag: pausch?betrag:null }).eq('id', id);
      var nummer = art==='rechnung' ? naechsteNummer() : null;
      var payload={ betrieb_id:betrieb.id, auftrag_id:id, leistung_datum:(j&&j.termin)?(function(d){return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);})(new Date(j.termin)):null,nummer:nummer, kunde:j.kunde, positionstext:j.aufgabe, stunden: pausch?null:curHours, betrag:betrag, art:art };
      if(art==='rechnung'){ payload.kunde_email=mail; payload.zahlart=zahlart; if(zahlart==='bar') payload.bezahlt_am=isoDate(); }
      var rec=null;
      if(art==='rechnung'){
        try{ var q1=await sb.from('rechnungen').insert(payload).select().single(); rec=q1.data; }
        catch(e){ delete payload.kunde_email; var q2=await sb.from('rechnungen').insert(payload).select().single(); rec=q2.data; }
        if(!rec) rec=Object.assign({id:'tmp',datum:new Date().toISOString()},payload);
        rec.kunde_adresse=j.adresse||'';
      }
      var versendet=false, sendErr='';
      if(art==='rechnung'){ try{ await sendDoc(rec, mail, 'rechnung'); versendet=true; }catch(e){ sendErr=e.message||'Versand fehlgeschlagen'; } }
      scrim.classList.remove('show'); await loadData();
  if(art!=='rechnung'){ alert('Auftrag abgeschlossen. Es wurde keine Rechnung erstellt.'); showList(); return; }
      backBtn.style.display='none'; el('tabs').style.display='none'; el('fab').style.display='none'; el('barSub').textContent=j.kunde;
      var html;
      if(art==='bar'){
        html='<div class="done-hero"><div class="big">✓</div><h2>Auftrag abgeschlossen</h2><p>'+esc(j.kunde)+' · ohne Rechnung.</p><div class="checks" style="text-align:left"><div><span>✓</span> Auftrag auf „erledigt“ gesetzt</div><div style="color:var(--muted)"><span style="color:var(--muted)">–</span> ZeitZurück hat keinen Beleg erstellt</div></div></div><div class="cta"><button class="btn btn-dark" onclick="showList()">Zurück</button></div>';
      } else {
        var barZeile = (zahlart==='bar') ? '<div><span>✓</span> Betrag bar erhalten, Rechnung als bezahlt vermerkt</div>' : '<div><span>✓</span> Zahlbar binnen 14 Tagen (Überweisung)</div>';
        html='<div class="done-hero"><div class="big">✓</div><h2>Rechnung '+esc(rec.nummer)+' '+(versendet?'gesendet':'erstellt')+'</h2><p>'+(versendet?('Als PDF an '+esc(mail)+'.'+(zahlart==='bar'?' Bar erhalten.':' Zahlbar bis '+deDate(faelligAm(rec))+'.')):('Konnte nicht automatisch senden ('+esc(sendErr)+'). Du kannst sie unten erneut senden.'))+'</p></div><div style="padding:0 2px">'+invoiceHTML(rec)+'</div><div class="done-hero"><div class="checks" style="text-align:left"><div><span>'+(versendet?'✓':'–')+'</span> '+(versendet?('Als PDF an '+esc(j.kunde)+' gesendet'):'Noch nicht gesendet')+'</div>'+barZeile+'<div><span>✓</span> Kopie in deine Buchhaltung gelegt</div><div><span>✓</span> Auftrag auf „erledigt“ gesetzt</div></div></div><div class="cta"><button class="btn btn-ghost" onclick="downloadPDF(\''+rec.id+'\')">⬇ PDF</button><button class="btn btn-dark" onclick="showList()">Fertig</button></div>';
      }
      screen.innerHTML=html; screen.scrollTop=0;
    }catch(e){ scrim.classList.remove('show'); alert('Fehler beim Speichern: '+e.message); }
  };
})();

/* ============================================================
   Auftrag aus der App in den Kalender  (29.07.2026)
   Ein Termin, den der Betrieb selbst in der App eintraegt, war fuer die
   Terminsuche unsichtbar - der Chat konnte denselben Zeitraum ein zweites
   Mal vergeben. Diese Fassung von createJob legt den Kalendereintrag mit an
   und merkt sich die event_id, damit spaetere Aenderungen ihn wiederfinden.
   ============================================================ */
window.ZZ_KALENDER_WEBHOOK = 'https://alvvyn.app.n8n.cloud/webhook/auftrag-kalender';
window.ZZ_STANDARD_DAUER   = 120;

window.createJob = async function(){
  var btn     = el('nGo');
  var kunde   = (el('nKunde').value   || '').trim();
  var mail    = (el('nMail').value    || '').trim();
  var aufgabe = (el('nAufgabe').value || '').trim();
  var adr     = (el('nAdresse').value || '').trim();
  var roh     = (el('nTermin').value  || '').trim();

  if(!kunde){ alert('Bitte geben Sie einen Kunden an.'); return; }

  var termin = null;
  if(roh){
    var d = new Date(roh);
    if(isNaN(d.getTime())){ alert('Der Termin ist kein gültiges Datum.'); return; }

      if(d.getTime() < Date.now() - 86400000){
        var jahr = d.getFullYear();
        if(!confirm('Achtung: Der Termin liegt in der Vergangenheit (' + d.toLocaleDateString('de-AT') + ').\nStimmt das Jahr ' + jahr + '?\n\nTrotzdem anlegen?')) return;
      }    termin = d.toISOString();
  }

  btn.disabled = true;
  try{
    var rec = { betrieb_id: betrieb.id, kunde: kunde, aufgabe: aufgabe, status: 'offen' };
    if(mail)   rec.kunde_email = mail;
    if(adr)    rec.adresse     = adr;
    if(termin) rec.termin      = termin;

    // insert + select ist EINE Anfrage: schlaegt sie fehl, wurde nichts angelegt.
    var neu = null;
    var q = await sb.from('auftraege').insert(rec).select().single();
    if(q.error){
      var q2 = await sb.from('auftraege').insert(rec);
      if(q2.error) throw q2.error;
    } else {
      neu = q.data;
    }

    if(neu && termin){
      var ok = false;
      try{
        var antwort = await fetch(window.ZZ_KALENDER_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aktion: 'anlegen',
            auftrag_id: neu.id,
            betrieb_id: betrieb.id,
            kunde: kunde, aufgabe: aufgabe, adresse: adr,
            termin: termin,
            dauer_minuten: window.ZZ_STANDARD_DAUER
          })
        });
        ok = antwort.ok;
      }catch(e){ ok = false; }

      if(!ok){
        alert('Der Auftrag ist gespeichert - aber der Kalendereintrag hat nicht funktioniert.\n\nBitte tragen Sie den Termin von Hand in Ihren Kalender ein. Sonst kann die Terminsuche denselben Zeitraum noch einmal vergeben.');
      }
    }

    scrim.classList.remove('show');
    await loadData();
    setTab('jobs');
  }catch(e){
    btn.disabled = false;
    alert('Der Auftrag konnte nicht gespeichert werden.\n\n' + (e.message || e));
  }
};

/* ============================================================
   Auftrag loeschen loescht auch den Kalendereintrag  (29.07.2026)
   Sonst bliebe ein Termin stehen, der niemanden mehr betrifft, und
   die Terminsuche haelt den Zeitraum weiter fuer belegt.
   ============================================================ */
window.deleteJob = async function(id){
  try{
    // Erst nachsehen, ob ein Kalendereintrag dranhängt - solange die Zeile noch da ist.
    var ev = null, bid = null;
    try{
      var q = await sb.from('auftraege').select('event_id,betrieb_id').eq('id', id).single();
      if(q && q.data){ ev = q.data.event_id || null; bid = q.data.betrieb_id || null; }
    }catch(e){ /* ohne diese Info löschen wir trotzdem, nur ohne Kalender */ }

    // Nur versprechen, was auch passiert: den Kalender nur erwähnen, wenn einer dranhängt.
    var frage = ev
      ? 'Diesen Auftrag wirklich löschen?\n\nDer Termin wird dabei auch aus Ihrem Kalender entfernt.'
      : 'Diesen Auftrag wirklich löschen?';
    if(!confirm(frage)) return;

    if(ev){
      var ok = false;
      try{
        var antwort = await fetch(window.ZZ_KALENDER_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aktion: 'loeschen',
            auftrag_id: id,
            betrieb_id: bid || betrieb.id,
            event_id: ev
          })
        });
        ok = antwort.ok;
      }catch(e){ ok = false; }

      if(!ok){
        if(!confirm('Der Kalendereintrag konnte nicht gelöscht werden.\n\nDen Auftrag trotzdem löschen? Der Termin bleibt dann im Kalender stehen und muss dort von Hand entfernt werden.')) return;
      }
    }

    var d = await sb.from('auftraege').delete().eq('id', id).select('id');
    if (d && !d.error && (!d.data || d.data.length === 0)) {
      alert('Dieser Auftrag konnte nicht gelöscht werden.\n\nLöschen ist dem Inhaber vorbehalten.');
      return;
    }
    if(d && d.error) throw d.error;
    await loadData();
    showList();
  }catch(e){
    alert('Der Auftrag konnte nicht gelöscht werden.\n\n' + (e.message || e));
  }
};


/* ---------- Termin verschieben ---------- */
window.openTermin = function (id) {
  var j = ((typeof auftraege !== 'undefined' && auftraege) || window._alleAuftraege || []).find(function (x) { return x.id === id; });
  if (!j) { alert('Auftrag nicht gefunden.'); return; }
  var d = j.termin ? new Date(j.termin) : new Date();
  var vorgabe = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  sheet.innerHTML = '<h3>Termin ändern</h3>'
    + '<div class="sub">' + (j.kunde || '') + ' — ' + (j.aufgabe || '') + '</div>'
    + '<div class="mailrow"><label>Neuer Termin</label>'
    + '<input id="tNeu" type="datetime-local" value="' + vorgabe + '"></div>'
    + '<label class="zzhaken"><input id="tMail" type="checkbox" checked><span>Kunden per Mail verständigen</span></label>'
    + '<div class="stack">'
    + '<button class="btn btn-primary" id="tGo" onclick="terminSpeichern(\'' + id + '\')">Termin verschieben</button>'
    + '<button class="btn btn-ghost" onclick="zurueckZumAuftrag(\'' + id + '\')">Zurück</button></div>'
    + '<div class="note">Der Kalendereintrag wird mitverschoben.</div>';
  scrim.classList.add('show');
};

window.terminSpeichern = async function (id) {
  var btn = el('tGo');
  var roh = el('tNeu') ? el('tNeu').value : '';
  if (!roh) { alert('Bitte einen Termin wählen.'); return; }
  var d = new Date(roh);
  if (isNaN(d.getTime())) { alert('Der Termin ist kein gültiges Datum.'); return; }
  if (d.getTime() < Date.now() - 86400000) {
    if (!confirm('Der neue Termin liegt in der Vergangenheit (' + d.toLocaleDateString('de-AT') + ').\nStimmt das Jahr ' + d.getFullYear() + '?\n\nTrotzdem verschieben?')) return;
  }
  var melden = el('tMail') ? el('tMail').checked : true;
  var j = ((typeof auftraege !== 'undefined' && auftraege) || window._alleAuftraege || []).find(function (x) { return x.id === id; });
  if (btn) { btn.disabled = true; btn.textContent = 'Wird verschoben …'; }
  try {
    var q = await sb.from('auftraege').update({ termin: d.toISOString() }).eq('id', id);
    if (q.error) throw q.error;
    var antwort = await fetch(window.ZZ_KALENDER_WEBHOOK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aktion: 'verschieben', auftrag_id: id, betrieb_id: betrieb.id,
        event_id: j ? j.event_id : null, termin: d.toISOString(),
        kunde: j ? j.kunde : '', kunde_email: j ? j.kunde_email : '',
        aufgabe: j ? j.aufgabe : '', adresse: j ? j.adresse : '',
        melden: !!melden
      })
    });
    if (!antwort.ok) {
      alert('Der Termin wurde im Auftrag geändert, aber der Kalender konnte nicht nachgezogen werden.\nBitte im Kalender von Hand korrigieren.');
    }
    scrim.classList.remove('show');
    await loadData();
    showJob(id);
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Termin verschieben'; }
    alert('Fehler: ' + (e && e.message ? e.message : e));
  }
};


/* ---------- Angebote ---------- */
window.naechsteAngebotsnummer = function () {
  var jahr = new Date().getFullYear();
  var kA = konf(); var istDemoA = String(kA.praefix || '').trim() === 'DEMO';
  var bisher = (window._alleRechnungen || []).filter(function (i) {
    if (i.art !== 'angebot') return false;
    if ((String(i.nummer || '').trim().split(' ')[0] === 'DEMO') !== istDemoA) return false;
    var d = i.datum || i.created_at;
    return new Date(d).getFullYear() === jahr;
  }).length;
  return (istDemoA ? 'DEMO A ' : 'A ') + String(bisher + 1).padStart(2, '0') + '/' + jahr;
};

window.openAngebot = function (auftragId) {
  var liste = (typeof auftraege !== 'undefined' && auftraege) || window._alleAuftraege || [];
  var j = liste.find(function (x) { return x.id === auftragId; });
  if (!j) { alert('Auftrag nicht gefunden.'); return; }
  var satz = Number(betrieb && betrieb.stundensatz) || 0;
  var frist = new Date(); frist.setDate(frist.getDate() + 30);
  var fristIso = new Date(frist.getTime() - frist.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  sheet.innerHTML = '<h3>Angebot erstellen</h3>'
    + '<div class="sub">' + esc(j.kunde || '') + ' — ' + naechsteAngebotsnummer() + '</div>'
    + '<div class="mailrow"><label>Leistung</label>'
    + '<textarea id="agText" rows="3">' + esc(j.aufgabe || '') + '</textarea></div>'
    + '<div class="two">'
    + '<div class="mailrow"><label>Betrag (€)</label><input id="agBetrag" type="number" step="0.01" min="0" placeholder="z.B. 2400"></div>'
    + '<div class="mailrow"><label>Gültig bis</label><input id="agFrist" type="date" value="' + fristIso + '"></div>'
    + '</div>'
    + '<div class="mailrow"><label>Mail des Kunden</label>'
    + '<input id="agMail" type="email" value="' + esc(j.kunde_email || '') + '"></div>'
    + '<div class="stack">'
    + '<button class="btn btn-primary" id="agGo" onclick="angebotSpeichern(\'' + auftragId + '\')">Angebot anlegen</button>'
    + '<button class="btn btn-ghost" onclick="zurueckZumAuftrag(\'' + auftragId + '\')">Zurück</button></div>'
    + '<div class="note">Ein Angebot ist keine Rechnung: eigener Nummernkreis, keine Umsatzsteuerangaben, und wenn es nicht angenommen wird, bleibt einfach eine Lücke.</div>';
  scrim.classList.add('show');
};

window.angebotSpeichern = async function (auftragId) {
  var btn = el('agGo');
  var text = el('agText') ? el('agText').value.trim() : '';
  var betrag = parseFloat(el('agBetrag') ? el('agBetrag').value : '');
  var frist = el('agFrist') ? el('agFrist').value : '';
  var mail = el('agMail') ? el('agMail').value.trim() : '';
  if (!text) { alert('Bitte die Leistung beschreiben.'); return; }
  if (isNaN(betrag) || betrag <= 0) { alert('Bitte einen Betrag angeben.'); return; }
  var liste = (typeof auftraege !== 'undefined' && auftraege) || [];
  var j = liste.find(function (x) { return x.id === auftragId; });
  if (btn) { btn.disabled = true; btn.textContent = 'Wird angelegt …'; }
  try {
    var zufall = (crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, '') : String(Date.now()) + Math.random().toString(36).slice(2);
    var q = await sb.from('rechnungen').insert({
      betrieb_id: betrieb.id, auftrag_id: auftragId,
      nummer: naechsteAngebotsnummer(), kreis: 'A', art: 'angebot',
      kunde: j ? j.kunde : '', kunde_email: mail || (j ? j.kunde_email : ''),
      kunde_adresse: j ? j.adresse : null,
      positionstext: text, betrag: betrag,
      datum: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
      gueltig_bis: frist || null, angebot_status: 'offen', angebot_token: zufall
    }).select('id,nummer').single();
    if (q.error) throw q.error;
    await sb.from('auftraege').update({ status: 'angebot' }).eq('id', auftragId);
    scrim.classList.remove('show');
    await loadData();
    showInvoice(q.data.id);
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Angebot anlegen'; }
    alert('Fehler: ' + (e && e.message ? e.message : e));
  }
};


window.zurueckZumAuftrag = function (id) {
  try { scrim.classList.remove('show'); } catch (e) {}
  showJob(id);
};

/* ============================================================
   Angebotsansicht — laeuft NACH allen anderen Dekoratoren.
   Additiv: schneidet nirgends in bestehenden Code hinein.
   ============================================================ */
(function zzAngebotsAnsicht () {
  function beleg(id) {
    var alle = window._alleRechnungen || [];
    for (var n = 0; n < alle.length; n++) if (alle[n].id === id) return alle[n];
    return null;
  }
  function deutsch(d) {
    if (!d) return '';
    var x = new Date(d);
    return ('0'+x.getDate()).slice(-2)+'.'+('0'+(x.getMonth()+1)).slice(-2)+'.'+x.getFullYear();
  }
  function herrichten(id) {
    var i = beleg(id);
    if (!i) return;
    var istAngebot = i.art === 'angebot';
    var wort = istAngebot ? 'Angebot' : 'Rechnung';

    // 1) Beschriftung des Verwalten-Feldes
    var kopf = document.querySelector('.mk-t b');
    if (kopf) kopf.textContent = wort + ' verwalten';

    // 2) Versandstand sichtbar machen
    var karte = document.querySelector('.nr');
    if (karte && !document.getElementById('zzStand')) {
      var z = document.createElement('div');
      z.id = 'zzStand';
      z.style.cssText = 'font:600 12.5px/1.5 inherit;letter-spacing:.02em;margin:6px 0 2px;';
      var text, farbe;
      if (istAngebot && i.angebot_status === 'angenommen') { text = 'Angenommen am ' + deutsch(i.beantwortet_am); farbe = '#1A3A2B'; }
      else if (istAngebot && i.angebot_status === 'abgelehnt') { text = 'Abgelehnt am ' + deutsch(i.beantwortet_am); farbe = '#8a857c'; }
      else if (i.gesendet_am) { text = 'Versendet am ' + deutsch(i.gesendet_am); farbe = '#1A3A2B'; }
      else { text = 'Noch nicht versendet'; farbe = '#A9853C'; }
      z.style.color = farbe;
      z.textContent = text;
      karte.parentNode.insertBefore(z, karte.nextSibling);
    }

    // 3) Senden als Hauptaktion, solange nichts beim Kunden ist
    if (!i.gesendet_am && typeof window.openSend === 'function' && !document.getElementById('zzSenden')) {
      var leiste = document.querySelector('.mk') || document.querySelector('.more');
      if (leiste && leiste.parentNode) {
        var k = document.createElement('button');
        k.id = 'zzSenden';
        k.className = 'btn btn-primary';
        k.style.cssText = 'display:block;width:100%;margin:0 0 12px;';
        k.textContent = '\u2709 ' + wort + ' senden';
        k.onclick = function () { window.openSend(id); };
        leiste.parentNode.insertBefore(k, leiste);
      }
    }
  }
  var vorher = window.showInvoice;
  if (typeof vorher === 'function') {
    window.showInvoice = function (id) {
      var r = vorher.apply(this, arguments);
      setTimeout(function () { try { herrichten(id); } catch (e) {} }, 0);
      return r;
    };
  }
})();

/* ============================================================
   Weg vom Auftrag zu seinem Angebot.
   Ohne diesen Weg waere ein erstelltes Angebot nicht mehr
   erreichbar, seit Angebote aus den Belegen heraus sind.
   ============================================================ */
(function zzAngebotWeg () {
  function angebotZu(auftragId) {
    var alle = window._alleRechnungen || [];
    for (var n = 0; n < alle.length; n++) {
      if (alle[n].art === 'angebot' && alle[n].auftrag_id === auftragId) return alle[n];
    }
    return null;
  }
  function stand(a) {
    if (a.angebot_status === 'angenommen') return ' \u00b7 angenommen';
    if (a.angebot_status === 'abgelehnt')  return ' \u00b7 abgelehnt';
    if (a.gesendet_am) return ' \u00b7 versendet';
    return ' \u00b7 noch nicht versendet';
  }
  function herrichten(auftragId) {
    if (document.getElementById('zzZumAngebot')) return;
    var a = angebotZu(auftragId);
    if (!a) return;
    var ziel = null;
    var alle = document.querySelectorAll('*');
    for (var n = 0; n < alle.length; n++) {
      var txt = (alle[n].textContent || '').trim();
      if (alle[n].children.length === 0 && txt.indexOf('Angebot erstellen') > -1) {
        ziel = alle[n];
        while (ziel.parentNode && ziel.parentNode.textContent &&
               ziel.parentNode.textContent.trim() === txt) ziel = ziel.parentNode;
        break;
      }
    }
    var buehne = document.getElementById('screen');
    if ((!ziel || !ziel.parentNode) && !buehne) return;
    var l = document.createElement('a');
    l.id = 'zzZumAngebot';
    l.href = 'javascript:void(0)';
    l.style.cssText = ziel.getAttribute('style') || '';
    l.className = ziel.className || '';
    l.textContent = 'Angebot ansehen \u00b7 ' + (a.nummer || '') + stand(a);
    l.onclick = function () { if (typeof window.showInvoice === 'function') window.showInvoice(a.id); };
    if (ziel && ziel.parentNode) {
      ziel.parentNode.insertBefore(l, ziel);
    } else {
      l.style.display = 'block';
      l.style.margin = '16px 0';
      l.style.textAlign = 'center';
      l.style.fontWeight = '600';
      buehne.appendChild(l);
    }
    // Solange ein offenes Angebot da ist, kein zweites anlegen lassen.
    if (ziel && (!a.angebot_status || a.angebot_status === 'offen')) ziel.style.display = 'none';
  }
  var vorher = window.showJob;
  if (typeof vorher === 'function') {
    window.showJob = function (id) {
      var r = vorher.apply(this, arguments);
      setTimeout(function () { try { herrichten(id); } catch (e) {} }, 0);
      return r;
    };
  }
})();

/* Etiketten: eine Nummer wie "A 01/2026" ist ein Angebot. */
(function zzEtiketten () {
  var ANGEBOT = /(^|\s)A\s\d{2}\/\d{4}/;
  function herrichten () {
    var buehne = document.getElementById("screen");
    if (!buehne) return;
    if (!ANGEBOT.test(buehne.textContent || "")) return;
    var alle = buehne.querySelectorAll("*");
    for (var n = 0; n < alle.length; n++) {
      var e = alle[n];
      if (e.children.length) continue;
      var s = (e.textContent || "").trim();
      if (s === "Rechnung") e.textContent = "Angebot";
      else if (s === "Rechnung ansehen") e.textContent = "Angebot ansehen";
      else if (s === "Angebot erstellen" && e.parentNode) {
        var o = e;
        while (o.parentNode && o.parentNode.textContent &&
               o.parentNode.textContent.trim() === s) o = o.parentNode;
        o.style.display = "none";
      }
    }
  }
  var vorher = window.showJob;
  if (typeof vorher === "function") {
    window.showJob = function () {
      var r = vorher.apply(this, arguments);
      setTimeout(function () { try { herrichten(); } catch (e) {} }, 0);
      return r;
    };
  }
})();

/* Etiketten im Beleg: liest die Nummer vom Bildschirm. */
(function zzBelegEtiketten () {
  var RE = /((?:DEMO |M |ZZ |V )?A \d{2}\/\d{4})/;
  function deutsch(d){ if(!d) return ""; var x=new Date(d);
    return ("0"+x.getDate()).slice(-2)+"."+("0"+(x.getMonth()+1)).slice(-2)+"."+x.getFullYear(); }
  function herrichten () {
    var b = document.getElementById("screen");
    if (!b) return;
    var m = RE.exec(b.textContent || "");
    if (!m) return;
    var nummer = m[1];
    var i = null, alle = window._alleRechnungen || [];
    for (var q = 0; q < alle.length; q++) if (alle[q].nummer === nummer) i = alle[q];
    var alleE = document.querySelectorAll("*");
    for (var n = 0; n < alleE.length; n++) {
      var e = alleE[n];
      if (e.children.length) continue;
      var s = (e.textContent || "").trim();
      if (s === "Rechnung verwalten") e.textContent = "Angebot verwalten";
      else if (s === "Rechnung " + nummer) e.textContent = "Angebot " + nummer;
      else if (s === "Rechnung ansehen") e.textContent = "Angebot ansehen";
    }
    if (!i) return;
    var kopf = b.querySelector(".nr");
    if (kopf && !document.getElementById("zzStand2")) {
      var z = document.createElement("div");
      z.id = "zzStand2";
      var txt, farbe;
      if (i.angebot_status === "angenommen") { txt = "Angenommen am " + deutsch(i.beantwortet_am); farbe = "#1A3A2B"; }
      else if (i.angebot_status === "abgelehnt") { txt = "Abgelehnt am " + deutsch(i.beantwortet_am); farbe = "#8a857c"; }
      else if (i.gesendet_am) { txt = "Versendet am " + deutsch(i.gesendet_am); farbe = "#1A3A2B"; }
      else { txt = "Noch nicht versendet"; farbe = "#A9853C"; }
      z.textContent = txt;
      z.style.cssText = "font-weight:600;font-size:13px;margin:6px 0 2px;color:" + farbe;
      kopf.parentNode.insertBefore(z, kopf.nextSibling);
    }
    if (!i.gesendet_am && typeof window.openSend === "function" && !document.getElementById("zzSend2")) {
      var k = document.createElement("button");
      k.id = "zzSend2";
      k.className = "btn btn-primary";
      k.style.cssText = "display:block;width:100%;margin:14px 0;";
      k.textContent = "\u2709 Angebot senden";
      k.onclick = function () { try { window.openSend(i.id, i.art); } catch (e) { alert("Senden ging nicht: " + ((e && e.message) ? e.message : e)); } };
      b.appendChild(k);
    }
  }
  var v = window.showInvoice;
  if (typeof v === "function") {
    window.showInvoice = function () {
      var r = v.apply(this, arguments);
      setTimeout(function () { try { herrichten(); } catch (e) {} }, 0);
      return r;
    };
  }
})();

/* Auftragsansicht: Status und Stunden lesbar machen, wenn ein Angebot dranhaengt. */
(function zzAuftragStatus () {
  var RE = /((?:DEMO |M |ZZ |V )?A \d{2}\/\d{4})/;
  function herrichten () {
    var b = document.getElementById("screen");
    if (!b) return;
    var m = RE.exec(b.textContent || "");
    var nummer = m ? m[1] : null;
    var i = null, alle = window._alleRechnungen || [];
    if (nummer) for (var q = 0; q < alle.length; q++) if (alle[q].nummer === nummer) i = alle[q];
    var wort = null;
    if (i) {
      if (i.angebot_status === "angenommen") wort = "Angebot angenommen";
      else if (i.angebot_status === "abgelehnt") wort = "Angebot abgelehnt";
      else if (i.gesendet_am) wort = "Angebot versendet";
      else wort = "Angebot offen";
    }
    var alleE = b.querySelectorAll("*");
    for (var n = 0; n < alleE.length; n++) {
      var e = alleE[n];
      if (e.children.length) continue;
      var s = (e.textContent || "").trim();
      if (s === "null Std" || s === "null") e.textContent = "\u2014";
      else if (wort && (s === "Erledigt" || s === "Offen")) e.textContent = wort;
    }
  }
  var v = window.showJob;
  if (typeof v === "function") {
    window.showJob = function () {
      var r = v.apply(this, arguments);
      setTimeout(function () { try { herrichten(); } catch (e) {} }, 0);
      return r;
    };
  }
})();
