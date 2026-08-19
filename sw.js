/* ZeitZurück — Service Worker, bewusst ohne Cache.
   Niemand soll je einen alten Stand sehen: jede Anfrage geht ins Netz.
   Der Worker existiert nur, damit die App installierbar ist. */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
