var cacheName = 'Onitama v1.00';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',
  '/manifest.json',
  '/sw.js',


  '/assets/fonts/KenneyPixelSquare.tff',
  '/assets/fonts/KenneyMiniSquare.tff',
  '/assets/fonts/Gamer.tff',

  '/assets/classes/settings.js',
  '/assets/classes/hero.js',

  '/assets/scenes/preload.js',
  '/assets/scenes/startGame.js',
  '/assets/scenes/UI.js',

  '/assets/sprites/blank.png',
  '/assets/sprites/hero_idle.png',

  '/assets/sprites/tileset.png',
  '/assets/sprites/test.json',




  'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js',
  'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});