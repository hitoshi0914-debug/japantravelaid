// 自動生成（integrations/service-worker.mjs）。手で編集しない。
const CACHE = 'otc-__VERSION__';
const PRECACHE = __PRECACHE__;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('otc-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return; // GA・AdSense・地図は触らない

  // 喫煙所データは更新されるので、キャッシュをすぐ返しつつ裏で取り直す（stale-while-revalidate）。
  if (url.pathname === '/smoking/spots.json') {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(request).then((hit) => {
          const update = fetch(request)
            .then((res) => {
              if (res.ok) cache.put(request, res.clone());
              return res;
            })
            .catch(() => hit);
          if (hit) event.waitUntil(update);
          return hit || update;
        }),
      ),
    );
    return;
  }
  // ハッシュ付きの資産は変わらないのでキャッシュ優先。
  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request)));
    return;
  }
  // ページはネットワーク優先（最新を見せる）、圏外ならキャッシュ。
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then((hit) => hit || caches.match('/en/'))),
  );
});
