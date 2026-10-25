const C='ft-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.hostname.includes('firebasedatabase')||u.hostname.includes('nominatim')||u.hostname.includes('er-api')||u.search.includes('vc='))return;
  const tile=u.hostname.includes('tile.openstreetmap.org');
  if(tile){e.respondWith(caches.open(C+'-tiles').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n}))));return}
  e.respondWith(fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match(e.request,{ignoreSearch:u.origin===location.origin}).then(r=>r||caches.match('./'))))});
