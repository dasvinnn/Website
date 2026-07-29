/* =====================================================================
   ROMANTIC WEBSITE — SCRIPT.JS
   ---------------------------------------------------------------------
   EVERYTHING YOU NEED TO PERSONALIZE IS IN THE "EDIT ME" SECTION BELOW.
   1) Put your photos in /images and list them in the `photos` array.
   2) Edit the `quotes` array with your own lines (optional).
   3) Edit the `letter` string with your own love letter.
   4) Put your song at music/music.mp3 (file name must match exactly).
   Nothing below the EDIT ME section needs to change for personalizing.
   ===================================================================== */

/* =====================================================================
   EDIT ME — YOUR CONTENT
   ===================================================================== */

const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg"
  "images/photo7.jpg"
  "images/photo8.jpg"
  // Add as many lines as you like, e.g. "images/photo7.jpg" — the
  // slideshow, dots, and preloading all update automatically.
];

const quotes = [
  "Every memory with you is my favorite.",
  "You make ordinary moments unforgettable.",
  "Every picture tells another reason why I love you.",
  "With you, even an ordinary Tuesday feels like a story worth keeping.",
  "You are my favorite \u201Conce upon a time.\u201D",
  "Some people search their whole life for what I found in you."
];

const letter = `
My Dearest,

If someone asked me to describe you in a single word, I don't think
one would ever be enough. So instead I filled this little world with
photographs and floating hearts, hoping it might come close to how
you make me feel.

Honestly I would love to thank you for dealing with me
throughout this whole time, I can never thank you enough
please forgive me for all the things I've did before and for being
the most amazing person in the whole wide world 
and thank you for 489 days of love you've given gosh I wanna be in
love with you for inifinity

You are my favorite person.
You are my softest place to land.
You are my "for always."

Thank you for choosing me, again and again, on the easy days and the
hard ones. Thank you for being my home.

Forever yours. Happy July Baby!!
`;

/* =====================================================================
   TIMING CONFIG
   NOTE: TRANSITION_MS must match --transition-duration in style.css
   ===================================================================== */
const PHOTO_HOLD_MS = 5000;
const TRANSITION_MS = 1300;
const QUOTE_CHANCE = 0.35;
const TRANSITIONS = [
  't-fade','t-zoom','t-cinematic','t-bloom','t-slide-left',
  't-slide-right','t-rotate','t-blur-focus','t-heart-wipe','t-flower-bloom'
];

/* =====================================================================
   SMALL UTILITIES
   ===================================================================== */
function rand(min, max){ return Math.random() * (max - min) + min; }
function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

let transitionBag = [];
function nextTransition(){
  if (transitionBag.length === 0){
    transitionBag = [...TRANSITIONS].sort(() => Math.random() - 0.5);
  }
  return transitionBag.pop();
}

/* =====================================================================
   AMBIENT BACKGROUND — hearts, sparkles, butterflies, petals, lilies,
   stars. Counts are capped so the DOM never grows without bound, and
   every animation runs on transform/opacity/mask only (GPU friendly).
   ===================================================================== */
const layers = {
  stars: document.getElementById('stars-layer'),
  hearts: document.getElementById('hearts-layer'),
  sparkles: document.getElementById('sparkles-layer'),
  butterflies: document.getElementById('butterflies-layer'),
  petals: document.getElementById('petals-layer'),
  lilies: document.getElementById('waterlilies-layer'),
};

const CAPS = { hearts: 45, sparkles: 35, butterflies: 5, petals: 25, stars: 30 };
const counts = { hearts: 0, sparkles: 0, butterflies: 0, petals: 0, stars: 0 };

function spawnHeart(){
  if (counts.hearts >= CAPS.hearts) return;
  counts.hearts++;
  const el = document.createElement('div');
  el.className = 'floating-heart';
  const size = rand(16, 42);
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.left = rand(0, 96) + 'vw';
  el.style.setProperty('--drift', rand(-80, 80) + 'px');
  el.style.setProperty('--rise', rand(95, 115) + 'vh');
  el.style.setProperty('--rot-start', rand(-15, 15) + 'deg');
  el.style.setProperty('--rot-end', rand(-25, 25) + 'deg');
  el.style.setProperty('--max-opacity', rand(0.5, 0.95).toFixed(2));
  el.style.animationDuration = rand(9, 16) + 's, ' + rand(2, 3.4) + 's';
  layers.hearts.appendChild(el);
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'heartFloat'){ el.remove(); counts.hearts--; }
  });
}

function spawnSparkle(){
  if (counts.sparkles >= CAPS.sparkles) return;
  counts.sparkles++;
  const el = document.createElement('div');
  el.className = 'sparkle';
  const size = rand(3, 8);
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.left = rand(0, 100) + 'vw';
  el.style.top = rand(0, 100) + 'vh';
  el.style.animationDuration = rand(2, 4.5) + 's';
  layers.sparkles.appendChild(el);
  setTimeout(() => { el.remove(); counts.sparkles--; }, 4600);
}

function butterflySVG(){
  return '<svg width="30" height="24" viewBox="0 0 30 24">' +
    '<ellipse cx="10" cy="8" rx="9" ry="7" fill="#ffc9dc" opacity="0.9"/>' +
    '<ellipse cx="20" cy="8" rx="9" ry="7" fill="#ffd9ea" opacity="0.9"/>' +
    '<ellipse cx="10" cy="16" rx="6" ry="5" fill="#ffb6cf" opacity="0.85"/>' +
    '<ellipse cx="20" cy="16" rx="6" ry="5" fill="#ffc9dc" opacity="0.85"/>' +
    '<rect x="14" y="4" width="2" height="16" rx="1" fill="#c9436a"/>' +
    '</svg>';
}
function spawnButterfly(){
  if (counts.butterflies >= CAPS.butterflies) return;
  counts.butterflies++;
  const el = document.createElement('div');
  el.className = 'butterfly';
  el.innerHTML = butterflySVG();
  el.style.left = rand(0, 90) + 'vw';
  el.style.top = rand(20, 80) + 'vh';
  el.style.setProperty('--bx', rand(-220, 220) + 'px');
  el.style.setProperty('--by', rand(-200, -60) + 'px');
  el.style.animationDuration = rand(10, 18) + 's, 0.6s';
  layers.butterflies.appendChild(el);
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'butterflyPath'){ el.remove(); counts.butterflies--; }
  });
}

function spawnPetal(){
  if (counts.petals >= CAPS.petals) return;
  counts.petals++;
  const el = document.createElement('div');
  el.className = 'petal';
  const size = rand(14, 30);
  el.style.width = size + 'px';
  el.style.height = (size * 1.15) + 'px';
  el.style.left = rand(0, 100) + 'vw';
  el.style.setProperty('--sway', rand(-100, 100) + 'px');
  el.style.setProperty('--spin', rand(140, 320) + 'deg');
  el.style.animationDuration = rand(8, 15) + 's';
  layers.petals.appendChild(el);
  el.addEventListener('animationend', () => { el.remove(); counts.petals--; });
}

function spawnStar(){
  if (counts.stars >= CAPS.stars) return;
  counts.stars++;
  const el = document.createElement('div');
  el.className = 'star';
  const size = rand(2, 4);
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.left = rand(0, 100) + 'vw';
  el.style.top = rand(0, 55) + 'vh';
  el.style.animationDuration = rand(2.5, 5) + 's';
  layers.stars.appendChild(el);
  setTimeout(() => { el.remove(); counts.stars--; }, 5200);
}

function setupLilies(){
  const count = 6;
  for (let i = 0; i < count; i++){
    const el = document.createElement('div');
    el.className = 'lily' + (Math.random() < 0.4 ? ' spin' : '');
    const size = rand(46, 86);
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = (i * (100 / count) + rand(-4, 4)) + 'vw';
    el.style.bottom = rand(-2, 4) + 'vh';
    el.style.setProperty('--lily-drift', rand(30, 70) + 'px');
    el.style.animationDuration = rand(7, 13) + 's';
    el.style.opacity = rand(0.75, 1).toFixed(2);
    layers.lilies.appendChild(el);
  }
}

let heartTimer, sparkleTimer, butterflyTimer, petalTimer, starTimer;
const BASE_HEART_RATE = 900;

function startAmbientLoops(){
  heartTimer = setInterval(spawnHeart, BASE_HEART_RATE);
  sparkleTimer = setInterval(spawnSparkle, 450);
  butterflyTimer = setInterval(spawnButterfly, 4500);
  petalTimer = setInterval(spawnPetal, 1600);
  starTimer = setInterval(spawnStar, 1000);
  setupLilies();
}

/** Temporarily spawn hearts faster (for the garden + finale moments). */
function boostHearts(durationMs, rateMs){
  clearInterval(heartTimer);
  heartTimer = setInterval(spawnHeart, rateMs);
  if (durationMs > 0){
    setTimeout(() => {
      clearInterval(heartTimer);
      heartTimer = setInterval(spawnHeart, BASE_HEART_RATE);
    }, durationMs);
  }
}

/* =====================================================================
   MUSIC PLAYER
   ===================================================================== */
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const volumeSlider = document.getElementById('volume-slider');

music.volume = volumeSlider.value / 100;

function setPlayingUI(isPlaying){
  musicIcon.textContent = isPlaying ? '\u275A\u275A' : '\u266A';
  musicToggle.title = isPlaying ? 'Pause music' : 'Play music';
}
musicToggle.addEventListener('click', () => {
  if (music.paused){
    music.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  } else {
    music.pause();
    setPlayingUI(false);
  }
});
volumeSlider.addEventListener('input', () => { music.volume = volumeSlider.value / 100; });

function tryAutoplay(){
  music.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
}

/* =====================================================================
   LOADING SCREEN
   ===================================================================== */
window.addEventListener('load', () => {
  startAmbientLoops();
  tryAutoplay();
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('fade-out');
    startGallery();
  }, 3000);
});

/* =====================================================================
   PHOTO GALLERY / SLIDESHOW
   ===================================================================== */
const imgCurrent = document.getElementById('photo-current');
const imgNext = document.getElementById('photo-next');
const frameWrap = document.getElementById('photo-frame-wrap');
const quoteBox = document.getElementById('quote-box');
const quoteText = document.getElementById('quote-text');
const progressDots = document.getElementById('progress-dots');
const photoHearts = document.getElementById('photo-hearts');

let usedQuotes = [];

function buildDots(){
  photos.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    progressDots.appendChild(dot);
  });
}
function updateDots(i){
  [...progressDots.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
}

function preload(src){ const im = new Image(); im.src = src; }

function spawnFrameHearts(){
  for (let i = 0; i < 3; i++){
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'frame-heart';
      const size = rand(14, 24);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      const edge = Math.floor(rand(0, 4));
      if (edge === 0){ el.style.top = '0'; el.style.left = rand(5, 95) + '%'; }
      if (edge === 1){ el.style.right = '0'; el.style.top = rand(5, 95) + '%'; }
      if (edge === 2){ el.style.bottom = '0'; el.style.left = rand(5, 95) + '%'; }
      if (edge === 3){ el.style.left = '0'; el.style.top = rand(5, 95) + '%'; }
      photoHearts.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }, i * 450);
  }
}

/** Cross-fades the visible photo to photos[i] using a random transition. */
function showPhoto(i, callback){
  const src = photos[i];
  imgNext.src = src;
  imgNext.className = '';
  void imgNext.offsetWidth; // force reflow so the animation restarts
  const t = nextTransition();
  imgNext.classList.add(t);
  imgCurrent.classList.add('fading-out');
  spawnFrameHearts();

  setTimeout(() => {
    imgCurrent.src = src;
    imgCurrent.className = '';
    imgCurrent.style.opacity = '1';
    imgNext.className = '';
    imgNext.removeAttribute('style');
    updateDots(i);
    if (callback) callback();
  }, TRANSITION_MS);

  preload(photos[(i + 1) % photos.length]);
}

function pickQuote(){
  if (usedQuotes.length === quotes.length) usedQuotes = [];
  let q;
  do { q = pick(quotes); } while (usedQuotes.includes(q) && quotes.length > 1);
  usedQuotes.push(q);
  return q;
}

function showQuote(callback){
  quoteText.textContent = pickQuote();
  quoteBox.classList.remove('show');
  void quoteBox.offsetWidth;
  quoteBox.classList.add('show');
  setTimeout(callback, 3400);
}

function startGallery(){
  buildDots();
  imgCurrent.src = photos[0];
  imgCurrent.classList.add('t-fade');
  preload(photos[1] ?? photos[0]);
  spawnFrameHearts();
  galleryStep(0);
}

function galleryStep(i){
  const isLast = i >= photos.length - 1;
  setTimeout(() => {
    if (isLast){ endGallery(); return; }
    const nextIndex = i + 1;
    const showQuoteThisTime = i > 0 && Math.random() < QUOTE_CHANCE;

    if (showQuoteThisTime){
      frameWrap.style.transition = 'opacity .8s ease';
      frameWrap.style.opacity = '0';
      setTimeout(() => {
        showQuote(() => {
          frameWrap.style.opacity = '1';
          showPhoto(nextIndex, () => galleryStep(nextIndex));
        });
      }, 800);
    } else {
      showPhoto(nextIndex, () => galleryStep(nextIndex));
    }
  }, PHOTO_HOLD_MS);
}

/* =====================================================================
   GARDEN -> ENVELOPE -> LETTER -> ENDING
   ===================================================================== */
const galleryStage = document.getElementById('gallery-stage');
const gardenStage = document.getElementById('garden-stage');
const envelopeStage = document.getElementById('envelope-stage');
const endingStage = document.getElementById('ending-stage');
const gardenFlowers = document.getElementById('garden-flowers');
const endingFlowers = document.getElementById('ending-flowers');
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letter-paper');
const letterLines = document.getElementById('letter-lines');

function switchStage(hideEl, showEl){
  hideEl.classList.add('fading');
  setTimeout(() => {
    hideEl.classList.add('hidden');
    hideEl.classList.remove('fading');
    showEl.classList.remove('hidden');
  }, 1100);
}

function spawnFlowersInto(container, count){
  for (let i = 0; i < count; i++){
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'garden-flower';
      const size = rand(50, 120);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = rand(2, 90) + 'vw';
      el.style.top = rand(8, 88) + 'vh';
      el.style.animationDelay = rand(0, 0.4) + 's';
      container.appendChild(el);
    }, i * 110);
  }
}

function endGallery(){
  boostHearts(9000, 260);
  switchStage(galleryStage, gardenStage);
  setTimeout(() => spawnFlowersInto(gardenFlowers, 16), 1300);
  setTimeout(() => switchStage(gardenStage, envelopeStage), 5200);
}

/* Envelope opens on click OR keyboard (Enter/Space) for accessibility */
envelope.addEventListener('click', (e) => openEnvelope(e.clientX, e.clientY), { once: true });
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    const rect = envelope.getBoundingClientRect();
    openEnvelope(rect.left + rect.width / 2, rect.top + rect.height / 2);
    envelope.replaceWith(envelope.cloneNode(true)); // drop listeners after first open
  }
}, { once: true });

function openEnvelope(x, y){
  envelope.classList.add('opening');
  burstSparkles(x, y);
  setTimeout(() => {
    envelope.style.display = 'none';
    letterPaper.classList.remove('hidden');
    renderLetter();
  }, 850);
}

function burstSparkles(x, y){
  for (let i = 0; i < 22; i++){
    const el = document.createElement('div');
    el.className = 'click-sparkle';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    const ang = rand(0, Math.PI * 2), dist = rand(40, 140);
    el.style.setProperty('--sx', Math.cos(ang) * dist + 'px');
    el.style.setProperty('--sy', Math.sin(ang) * dist + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }
}

function renderLetter(){
  const lines = letter.split('\n');
  letterLines.innerHTML = '';
  lines.forEach((line, idx) => {
    const div = document.createElement('div');
    if (line.trim() === ''){
      div.className = 'letter-line blank';
    } else {
      div.className = 'letter-line';
      div.textContent = line;
    }
    div.style.animationDelay = (idx * 0.28) + 's';
    letterLines.appendChild(div);
  });
  const btn = document.createElement('button');
  btn.id = 'continue-btn';
  btn.textContent = 'Forever & Always \u2192';
  btn.style.animationDelay = (lines.length * 0.28 + 0.4) + 's';
  btn.addEventListener('click', showEnding, { once: true });
  letterLines.appendChild(btn);
}

function showEnding(){
  switchStage(envelopeStage, endingStage);
  document.body.classList.add('finale-glow');
  boostHearts(0, 110); // stays boosted for the rest of the experience
  setTimeout(floodHearts, 900);
  setTimeout(() => spawnFlowersInto(endingFlowers, 14), 1200);
}

function floodHearts(){
  const flood = document.getElementById('heart-flood');
  const waves = 4, perWave = 35;
  for (let w = 0; w < waves; w++){
    setTimeout(() => {
      for (let i = 0; i < perWave; i++){
        const el = document.createElement('div');
        el.className = 'flood-heart';
        const size = rand(10, 30);
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = rand(0, 98) + 'vw';
        el.style.top = rand(0, 98) + 'vh';
        el.style.setProperty('--max-opacity', rand(0.4, 0.85).toFixed(2));
        el.style.animationDuration = rand(1, 2) + 's, ' + rand(3, 5) + 's';
        el.style.animationDelay = rand(0, 0.6) + 's, 0s';
        flood.appendChild(el);
      }
    }, w * 700);
  }
}
