const CACHE = "taalapp-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./js/app.js",
  "./js/store.js",
  "./js/srs.js",
  "./js/speech.js",
  "./js/check.js",
  "./js/plan.js",
  "./data/fr.js",
  "./data/es.js",
  "./data/fr-extra.js",
  "./data/es-extra.js",
  "./data/freq-fr.js",
  "./data/freq-es.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Network-first zodat updates doorkomen, met cache als offline vangnet.
// no-store is belangrijk: zonder dat geeft de gewone browsercache alsnog een
// oude app.js terug en zie je wijzigingen pas dagen later.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html"))),
  );
});
