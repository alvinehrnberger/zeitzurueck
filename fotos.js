/* =====================================================================
   ZeitZurück – Homepage-Reiter: Fotos
   Der Betrieb legt seine Bilder selbst auf die Homepage. Kein GitHub,
   kein Alvin: Foto reinziehen, fertig. Die Homepage liest die Liste aus
   betrieb_fotos (öffentlich), die Dateien liegen im Bucket "galerie"
   unter <betrieb_id>/<datei>. Hochladen dürfen nur Mitglieder.
   Vor dem Hochladen wird das Bild im Browser auf 1800 px lange Kante
   verkleinert – Berni schickt uns keine 12-MB-Dateien auf die Seite.
   ===================================================================== */
(function () {
  'use strict';

  var LANG = 1800;      // lange Kante in Pixel
  var QUAL = 0.84;      // JPEG-Qualität
  var F = { liste: [], laden: false, fehler: null, offen: 0 };

  function scr() { return document.getElementById('screen'); }
  function bid() { try { return betrieb ? betrieb.id : null; } catch (e) { return null; } }
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var css = document.createElement('style');
  css.textContent =
    '.fo-block{margin:0 0 26px}' +
    '.fo-block h3{font-size:15px;font-weight:600;margin:0 0 3px}' +
    '.fo-block .fo-sub{font-size:13px;opacity:.6;margin:0 0 12px;line-height:1.45}' +
    '.fo-zone{display:block;border:2px dashed rgba(26,58,43,.28);border-radius:16px;padding:22px 14px;text-align:center;' +
      'background:#fff;cursor:pointer;transition:border-color .15s,background .15s}' +
    '.fo-zone.ueber{border-color:#C9A054;background:rgba(201,160,84,.08)}' +
    '.fo-zone b{display:block;font-size:14.5px;margin-bottom:3px}' +
    '.fo-zone span{font-size:12.5px;opacity:.6}' +
    '.fo-zone input{display:none}' +
    '.fo-lauf{font-size:13px;margin:10px 2px 0;opacity:.75}' +
    '.fo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}' +
    '.fo-k{position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden;background:#e9e4d6;border:1px solid rgba(26,58,43,.13)}' +
    '.fo-k img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.fo-k .nr{position:absolute;left:6px;top:6px;background:rgba(20,34,27,.7);color:#F7F4EB;font-size:11px;font-weight:600;' +
      'border-radius:999px;padding:2px 7px}' +
    '.fo-k .weg{position:absolute;right:5px;top:5px;width:26px;height:26px;border-radius:50%;border:0;background:rgba(20,34,27,.72);' +
      'color:#fff;font-size:15px;line-height:26px;text-align:center;cursor:pointer;padding:0}' +
    '.fo-k .schieb{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;padding:4px}' +
    '.fo-k .schieb button{border:0;background:rgba(20,34,27,.6);color:#F7F4EB;border-radius:8px;width:30px;height:24px;font-size:13px;cursor:pointer;padding:0}' +
    '.fo-k .schieb button:disabled{opacity:.25;cursor:default}' +
    '.fo-portrait{display:flex;gap:12px;align-items:flex-start}' +
    '.fo-portrait .fo-k{width:120px;aspect-ratio:4/5;flex:none}' +
    '.fo-portrait .fo-zone{flex:1;padding:16px 12px}' +
    '.fo-leer{font-size:13.5px;opacity:.55;padding:10px 0}' +
    '.fo-hinweis{background:rgba(201,160,84,.13);border-left:3px solid #C9A054;border-radius:0 10px 10px 0;' +
      'padding:11px 14px;font-size:13px;line-height:1.5;margin-top:6px}';
  document.head.appendChild(css);

  /* ---------- Daten ---------- */
  async function laden() {
    var id = bid(); if (!id) return;
    F.fehler = null;
    try {
      var r = await sb.from('betrieb_fotos').select('*').eq('betrieb_id', id).order('art').order('reihung').order('created_at');
      if (r.error) throw r.error;
      F.liste = r.data || [];
    } catch (e) { F.fehler = e.message; F.liste = []; }
  }
  function galerie() { return F.liste.filter(function (f) { return f.art === 'galerie'; }); }
  function portrait() { return F.liste.find(function (f) { return f.art === 'portrait'; }) || null; }

  /* ---------- Bild verkleinern (im Browser) ---------- */
  function verkleinern(datei) {
    return new Promise(function (ok, nein) {
      var url = URL.createObjectURL(datei);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, hh = img.naturalHeight;
        var f = Math.min(1, LANG / Math.max(w, hh));
        var cw = Math.round(w * f), ch = Math.round(hh * f);
        var c = document.createElement('canvas'); c.width = cw; c.height = ch;
        c.getContext('2d').drawImage(img, 0, 0, cw, ch);
        URL.revokeObjectURL(url);
        c.toBlob(function (blob) {
          if (!blob) { nein(new Error('Bild konnte nicht verarbeitet werden.')); return; }
          ok({ blob: blob, breite: cw, hoehe: ch });
        }, 'image/jpeg', QUAL);
      };
      img.onerror = function () { URL.revokeObjectURL(url); nein(new Error('Das ist kein Bild, das ich lesen kann: ' + datei.name)); };
      img.src = url;
    });
  }

  function dateiname() {
    var t = new Date();
    var s = t.getFullYear() + String(t.getMonth() + 1).padStart(2, '0') + String(t.getDate()).padStart(2, '0') +
            '-' + String(t.getHours()).padStart(2, '0') + String(t.getMinutes()).padStart(2, '0') + String(t.getSeconds()).padStart(2, '0');
    return s + '-' + Math.random().toString(36).slice(2, 7) + '.jpg';
  }

  /* ---------- Hochladen ---------- */
  async function hochladen(dateien, art) {
    var id = bid(); if (!id) return;
    var liste = Array.prototype.filter.call(dateien, function (d) { return /^image\//.test(d.type); });
    if (!liste.length) { alert('Bitte Bilder auswählen (JPG, PNG oder WebP).'); return; }
    if (art === 'portrait') liste = liste.slice(0, 1);
    var lauf = document.getElementById('foLauf');
    var reihung = galerie().reduce(function (m, f) { return Math.max(m, f.reihung || 0); }, 0);
    var fehler = [];
    for (var i = 0; i < liste.length; i++) {
      if (lauf) lauf.textContent = 'Lade ' + (i + 1) + ' von ' + liste.length + ' … ' + liste[i].name;
      try {
        var k = await verkleinern(liste[i]);
        var pfad = id + '/' + (art === 'portrait' ? 'portrait-' : '') + dateiname();
        var up = await sb.storage.from('galerie').upload(pfad, k.blob, { contentType: 'image/jpeg', upsert: false });
        if (up.error) throw up.error;
        var url = sb.storage.from('galerie').getPublicUrl(pfad).data.publicUrl;
        if (art === 'portrait') {
          var alt = portrait();
          if (alt) { await sb.from('betrieb_fotos').delete().eq('id', alt.id); await sb.storage.from('galerie').remove([alt.pfad]); }
        }
        reihung += 10;
        var ins = await sb.from('betrieb_fotos').insert({
          betrieb_id: id, pfad: pfad, url: url, art: art, reihung: art === 'portrait' ? 0 : reihung,
          breite: k.breite, hoehe: k.hoehe
        });
        if (ins.error) throw ins.error;
      } catch (e) { fehler.push(liste[i].name + ': ' + (e.message || e)); }
    }
    await laden(); zeichnen();
    if (fehler.length) alert('Nicht hochgeladen:\n' + fehler.join('\n'));
  }

  window.fotoLoeschen = async function (fid) {
    var f = F.liste.find(function (x) { return x.id === fid; }); if (!f) return;
    if (!confirm('Dieses Foto von der Homepage nehmen?')) return;
    try {
      var r = await sb.from('betrieb_fotos').delete().eq('id', fid);
      if (r.error) throw r.error;
      await sb.storage.from('galerie').remove([f.pfad]);
      await laden(); zeichnen();
    } catch (e) { alert('Konnte nicht löschen: ' + e.message); }
  };

  window.fotoSchieben = async function (fid, richtung) {
    var g = galerie();
    var i = g.findIndex(function (x) { return x.id === fid; });
    var j = i + richtung;
    if (i < 0 || j < 0 || j >= g.length) return;
    // Reihung neu durchnummerieren, dann die zwei tauschen – so bleibt es stabil.
    var neu = g.map(function (f, n) { return { id: f.id, reihung: (n + 1) * 10 }; });
    var t = neu[i].reihung; neu[i].reihung = neu[j].reihung; neu[j].reihung = t;
    try {
      for (var n = 0; n < neu.length; n++) {
        var r = await sb.from('betrieb_fotos').update({ reihung: neu[n].reihung }).eq('id', neu[n].id);
        if (r.error) throw r.error;
      }
      await laden(); zeichnen();
    } catch (e) { alert('Konnte nicht verschieben: ' + e.message); }
  };

  /* ---------- Zeichnen ---------- */
  function zone(id, text, sub, mehrere) {
    return '<label class="fo-zone" id="' + id + '"><b>' + text + '</b><span>' + sub + '</span>' +
      '<input type="file" accept="image/*"' + (mehrere ? ' multiple' : '') + '></label>';
  }

  function zeichnen() {
    var g = galerie(), p = portrait();
    var kacheln = g.length
      ? '<div class="fo-grid">' + g.map(function (f, n) {
          return '<div class="fo-k">' +
            '<img src="' + h(f.url) + '" alt="" loading="lazy">' +
            '<span class="nr">' + (n + 1) + '</span>' +
            '<button class="weg" title="Entfernen" onclick="fotoLoeschen(\'' + f.id + '\')">×</button>' +
            '<div class="schieb">' +
              '<button' + (n === 0 ? ' disabled' : '') + ' onclick="fotoSchieben(\'' + f.id + '\',-1)" title="Nach vorne">‹</button>' +
              '<button' + (n === g.length - 1 ? ' disabled' : '') + ' onclick="fotoSchieben(\'' + f.id + '\',1)" title="Nach hinten">›</button>' +
            '</div>' +
          '</div>';
        }).join('') + '</div>'
      : '<div class="fo-leer">Noch keine Fotos. Die Homepage zeigt solange „Foto folgt".</div>';

    scr().innerHTML =
      '<div style="padding:4px 2px">' +
      '<div class="fo-block">' +
        '<h3>Galerie</h3>' +
        '<p class="fo-sub">Was du hier hochlädst, ist sofort auf deiner Homepage – oben hinter dem Titel und unten in der Galerie. Reihenfolge mit ‹ › ändern.</p>' +
        zone('foZoneG', 'Fotos hierher ziehen', 'oder tippen zum Auswählen · JPG, PNG · mehrere auf einmal', true) +
        '<div class="fo-lauf" id="foLauf"></div>' +
        kacheln +
      '</div>' +
      '<div class="fo-block">' +
        '<h3>Porträt</h3>' +
        '<p class="fo-sub">Ein Bild von dir für den Abschnitt „Über". Hochformat passt am besten.</p>' +
        '<div class="fo-portrait">' +
          '<div class="fo-k">' + (p ? '<img src="' + h(p.url) + '" alt="">' +
            '<button class="weg" title="Entfernen" onclick="fotoLoeschen(\'' + p.id + '\')">×</button>' : '') + '</div>' +
          zone('foZoneP', p ? 'Anderes Porträt' : 'Porträt hochladen', 'ein Bild, Hochformat', false) +
        '</div>' +
      '</div>' +
      '<div class="fo-hinweis">Bilder werden vor dem Hochladen auf Web-Größe gebracht (1800 px lange Kante). Die Originale bleiben bei dir.</div>' +
      (F.fehler ? '<div class="alert" style="margin-top:14px">Konnte nicht laden: ' + h(F.fehler) + '</div>' : '') +
      '</div>';

    zoneVerdrahten('foZoneG', 'galerie');
    zoneVerdrahten('foZoneP', 'portrait');
  }

  function zoneVerdrahten(id, art) {
    var z = document.getElementById(id); if (!z) return;
    var inp = z.querySelector('input');
    inp.addEventListener('change', function () { if (inp.files && inp.files.length) hochladen(inp.files, art); });
    ['dragenter', 'dragover'].forEach(function (ev) {
      z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.add('ueber'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.remove('ueber'); });
    });
    z.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) hochladen(e.dataTransfer.files, art);
    });
  }

  /* ---------- Reiter einhängen (wie beim Zeiten-Reiter) ---------- */
  var meinTab = null;

  window.fotosOeffnen = async function () {
    var leiste = document.querySelector('.tabs');
    if (leiste) [].forEach.call(leiste.children, function (k) { k.classList.remove('on'); });
    if (meinTab) meinTab.classList.add('on');
    var b = document.getElementById('backBtn'); if (b) b.style.display = 'none';
    var f = document.getElementById('fab'); if (f) f.style.display = 'none';
    scr().innerHTML = '<div style="padding:24px 2px;opacity:.6;font-size:14px">Fotos werden geladen …</div>';
    await laden();
    zeichnen();
  };

  function tabEinhaengen() {
    var leiste = document.querySelector('.tabs');
    if (!leiste || meinTab) return;
    if (leiste.querySelector('[data-fotos]')) return;
    // Erst nach dem Zeiten-Reiter einhängen, damit die Reihenfolge stimmt.
    if (!leiste.querySelector('[data-zeiten]')) return;
    meinTab = document.createElement('div');
    meinTab.className = 'tab';
    meinTab.setAttribute('data-fotos', '1');
    meinTab.textContent = 'Fotos';
    meinTab.addEventListener('click', function () { window.fotosOeffnen(); });
    leiste.appendChild(meinTab);

    var origSetTab = window.setTab;
    if (typeof origSetTab === 'function' && !origSetTab.__fo) {
      window.setTab = function () {
        if (meinTab) meinTab.classList.remove('on');
        return origSetTab.apply(this, arguments);
      };
      window.setTab.__fo = true;
    }
    var origZeiten = window.zeitenOeffnen;
    if (typeof origZeiten === 'function' && !origZeiten.__fo) {
      window.zeitenOeffnen = function () {
        if (meinTab) meinTab.classList.remove('on');
        return origZeiten.apply(this, arguments);
      };
      window.zeitenOeffnen.__fo = true;
    }
  }

  var beob = new MutationObserver(function () { tabEinhaengen(); });
  beob.observe(document.body, { childList: true, subtree: true });
  tabEinhaengen();
})();
