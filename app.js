// Out with Lanterns — for Lee-Ann.
// A minute of kindness to yourself, from Oliver, Finley and Madeline.
// Everything is kept in this browser (localStorage); there is no server.
// Nothing is counted, dated or timed, on purpose.

const STORE_KEY = 'lanterns.v1';
const state = loadState();

const $ = (sel) => document.querySelector(sel);
const dialog = $('#moment');
const catName = (key) => (key === 'all' ? 'the cats' : CATS[key].name);

// Tiles opened during this visit stay softly lit until the page is closed. Not saved.
const litThisVisit = new Set();
let current = null; // { tile, version }

function loadState() {
  const fresh = { place: 'home', lanterns: [], notesSeen: [], deck: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) return { ...fresh, ...saved };
  } catch { /* private window or blocked storage: start fresh */ }
  return fresh;
}

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch { toast('This browser won’t let the page keep things, so your lanterns may not stay.'); }
}

const escapeHTML = (s) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const pick = (list) => list[Math.floor(Math.random() * list.length)];

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 3200);
}

// Greeting ---------------------------------------------------------------

function greet() {
  const hour = new Date().getHours();
  const text = hour >= 5 && hour < 12 ? 'Good morning, Lee-Ann.'
    : hour >= 12 && hour < 17 ? 'Good afternoon, Lee-Ann.'
    : hour >= 17 && hour < 22 ? 'Good evening, Lee-Ann.'
    : 'Still up, Lee-Ann?';
  $('#greeting').textContent = text;
}

// Tiles ------------------------------------------------------------------

function versions(tile) {
  if (tile.type === 'prompt') return tile.asks;
  return tile[state.place] || tile.any;
}

function renderTiles() {
  $('#tiles').innerHTML = TILES.map((tile) => `
    <button class="tile ${litThisVisit.has(tile.id) ? 'lit' : ''}" data-tile="${tile.id}">
      <span class="tile-glow" aria-hidden="true"></span>
      <span class="tile-face">${tile.cat === 'all' ? allFaces() : catFace(tile.cat)}</span>
      <span class="tile-title">${tile.title}</span>
      <span class="tile-line">${tile.line}</span>
      ${tile.type === 'prompt' ? '<span class="tile-tag">a question</span>' : ''}
    </button>`).join('');
}

// A moment ---------------------------------------------------------------

function openTile(tile, pickedBy) {
  current = { tile, version: Math.floor(Math.random() * versions(tile).length) };
  const prompt = tile.type === 'prompt';

  showPane('m-main');
  const dancing = tile.extra === 'dance';
  $('#m-art').innerHTML = tile.cat === 'all'
    ? `<div class="trio">${['oliver', 'madeline', 'finley'].map((k) => catSVG(k)).join('')}</div>`
    : catSVG(tile.cat, { prop: tile.prop, className: dancing ? 'dancing' : '', label: CATS[tile.cat].name });
  $('#m-eyebrow').textContent = pickedBy ? `${CATS[pickedBy].name} picked this one for you`
    : tile.cat === 'all' ? 'From Oliver, Finley & Madeline'
    : `${CATS[tile.cat].name} suggests`;
  $('#m-title').textContent = tile.title;
  showVersion();

  $('#m-extra').innerHTML = extraFor(tile);
  $('#m-answer').hidden = !prompt;
  $('#m-textarea').value = '';
  $('#m-done').textContent = prompt ? 'Light a lantern' : (tile.done || 'I did it');
  $('#m-not-now').textContent = prompt ? 'Not today' : 'Not right now';
  $('#m-done').disabled = prompt;

  if (!dialog.open) dialog.showModal();
  dialog.classList.remove('arriving');
  void dialog.offsetWidth; // restart the fade-into-light
  dialog.classList.add('arriving');
  startExtra(tile);
  if (prompt) setTimeout(() => $('#m-textarea').focus({ preventScroll: true }), 350);
  else $('#m-done').focus({ preventScroll: true });
}

function showVersion() {
  const list = versions(current.tile);
  $('#m-text').textContent = list[current.version % list.length];
  const another = $('#m-another');
  another.hidden = list.length < 2;
  another.textContent = current.tile.type === 'prompt' ? 'Ask it another way' : 'Another way';
}

function showPane(id) {
  for (const pane of dialog.querySelectorAll('.pane')) pane.hidden = pane.id !== id;
}

// The window (at work) and Oliver's breathing dot.
function extraFor(tile) {
  if (tile.extra === 'window' && state.place === 'work') return `
    <div class="window-frame" aria-hidden="true">
      <svg viewBox="0 0 200 130" class="view">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#F4C27E"/><stop offset=".7" stop-color="#F9E1BC"/>
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#sky)"/>
        <circle class="sun" cx="132" cy="70" r="14" fill="#FFF3D6"/>
        <path d="M0 78 Q40 58 80 72 T160 66 T200 70 V130 H0 Z" fill="#C9A882"/>
        <path d="M0 90 Q50 76 100 88 T200 84 V130 H0 Z" fill="#A88B67"/>
        <rect y="100" width="200" height="30" fill="#E7C79E"/>
        <path d="M30 108 h22 M90 114 h30 M150 106 h18 M60 121 h26 M130 123 h24" stroke="#FFF3D6" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
        <path d="M54 36 q4 -4 8 0 q4 -4 8 0 M78 28 q3 -3 6 0 q3 -3 6 0" stroke="#7A5E44" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      </svg>
      <div class="shutter left"></div><div class="shutter right"></div>
      <div class="mullion"></div>
    </div>`;
  if (tile.extra === 'laser') return `
    <div class="breath">
      <div class="breath-track" aria-hidden="true"><span class="laser" id="laser"></span></div>
      <p class="breath-label" id="breath-label" aria-live="polite">Whenever you’re ready.</p>
      <button class="btn quiet small" data-action="breathe" id="breathe-start">Start</button>
    </div>`;
  return '';
}

function startExtra(tile) {
  if (tile.extra === 'window' && state.place === 'work') {
    setTimeout(() => dialog.querySelector('.window-frame')?.classList.add('open'), 450);
  }
}

let breathTimer = null;
function breathe() {
  const laser = $('#laser');
  const label = $('#breath-label');
  $('#breathe-start').hidden = true;
  const steps = [];
  for (let i = 0; i < 3; i += 1) steps.push(['in', 4000], ['out', 6000]);
  let n = 0;
  const step = () => {
    if (!dialog.open || !laser.isConnected) return;
    if (n === steps.length) {
      laser.classList.remove('up');
      label.textContent = 'That’s three. Oliver is satisfied.';
      return;
    }
    const [way, ms] = steps[n];
    laser.style.transitionDuration = `${ms}ms`;
    laser.classList.toggle('up', way === 'in');
    label.textContent = way === 'in' ? 'Breathe in…' : '…and out.';
    n += 1;
    breathTimer = setTimeout(step, ms);
  };
  step();
}

// Done, kept, or let be -----------------------------------------------

function finish() {
  const { tile } = current;
  litThisVisit.add(tile.id);
  clearTimeout(breathTimer);

  if (tile.type === 'prompt') {
    const answer = $('#m-textarea').value.trim();
    if (!answer) return;
    state.lanterns.unshift({ id: crypto.randomUUID?.() || String(Math.random()).slice(2), tile: tile.id, cat: tile.cat, q: $('#m-text').textContent, a: answer });
    save();
    $('#m-after-text').textContent = 'Kept with your lanterns.';
  } else {
    $('#m-after-text').textContent = pick(AFTER_MOMENT);
  }

  $('#m-after-art').innerHTML = lanternSVG({ className: 'lighting' });
  const note = maybeNote();
  $('#m-gift').hidden = !note;
  if (note) {
    // Madeline brings the very first note; after that, any of the three might.
    const cat = state.notesSeen.length === 1 ? 'madeline' : pick(Object.keys(DELIVERIES));
    $('#m-gift-cat').innerHTML = catFace(cat);
    $('#m-gift-text').textContent = DELIVERIES[cat];
    current.note = note;
  }
  showPane('m-after');
  renderTiles();
  renderLanterns();
}

// The cats bring one of Ash's notes now and then: always the first time,
// then about one time in three. She goes through them all before repeating.
function maybeNote() {
  const first = state.notesSeen.length === 0;
  if (!first && Math.random() > 0.34) return null;
  if (!state.deck.length) {
    const ids = NOTES.map((n) => n.id);
    const rest = ids.slice(first ? 1 : 0).sort(() => Math.random() - 0.5);
    state.deck = first ? [ids[0], ...rest] : rest;
  }
  const id = state.deck.shift();
  const note = NOTES.find((n) => n.id === id);
  if (!note) { save(); return null; } // a note that has since been removed
  if (!state.notesSeen.includes(id)) state.notesSeen.push(id);
  save();
  return note;
}

function openNote(note) {
  $('#m-note-text').textContent = note.text;
  const sign = note.sign ?? 'Ash';
  $('#m-note-sign').textContent = sign ? `— ${sign}` : '';
  $('#m-note-sign').hidden = !sign;
  showPane('m-note');
  if (!dialog.open) dialog.showModal();
}

// Lanterns ------------------------------------------------------------

function renderLanterns() {
  const list = $('#lantern-list');
  // Before the first lantern, the line under the unlit lantern explains things;
  // after that, the line under the heading does.
  $('#lanterns-intro').hidden = !state.lanterns.length;
  if (!state.lanterns.length) {
    list.innerHTML = `
      <div class="empty">
        ${lanternSVG({ lit: false })}
        <p>No lanterns yet. When you answer one of the questions, your answer is kept here, lit.</p>
      </div>`;
  } else {
    list.innerHTML = `<ul class="lanterns">${state.lanterns.map((l) => `
      <li class="kept">
        ${lanternSVG()}
        <div>
          <p class="kept-q">${escapeHTML(l.q)}</p>
          <p class="kept-a">${escapeHTML(l.a)}</p>
          <button class="link small" data-action="let-go" data-id="${l.id}">Let this one go</button>
        </div>
      </li>`).join('')}</ul>`;
  }

  const seen = NOTES.filter((n) => state.notesSeen.includes(n.id));
  $('#notes-kept').innerHTML = seen.length ? `
    <h3>Notes from Ash</h3>
    <p class="hint">The cats keep every note they’ve brought you here.</p>
    <ul class="notes">${seen.map((n) => `
      <li><button class="note-chip" data-action="reread" data-id="${n.id}">${escapeHTML(n.text)}</button></li>`).join('')}
    </ul>` : '';
}

function letGo(id) {
  const lantern = state.lanterns.find((l) => l.id === id);
  if (!lantern) return;
  if (!confirm('Let this lantern go? It will be gone from this device.')) return;
  state.lanterns = state.lanterns.filter((l) => l.id !== id);
  save();
  renderLanterns();
  toast('Let go.');
}

// Views ---------------------------------------------------------------

function showView(view) {
  for (const tab of document.querySelectorAll('.tab')) {
    if (tab.dataset.view === view) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  }
  $('#view-moments').hidden = view !== 'moments';
  $('#view-lanterns').hidden = view !== 'lanterns';
}

// Ash's letter ---------------------------------------------------------

function toggleLetter() {
  const envelope = $('#envelope');
  const open = envelope.getAttribute('aria-expanded') !== 'true';
  envelope.setAttribute('aria-expanded', String(open));
  $('#letter').hidden = !open;
  $('#envelope-label').textContent = open ? 'Fold it back up' : 'A letter for you';
  if (open) setTimeout(() => $('#letter').scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
  else envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

$('#envelope').addEventListener('click', toggleLetter);
$('#fold-letter').addEventListener('click', toggleLetter);

// Events --------------------------------------------------------------

document.addEventListener('click', (event) => {
  const tileButton = event.target.closest('[data-tile]');
  if (tileButton) {
    openTile(TILES.find((t) => t.id === tileButton.dataset.tile));
    return;
  }
  const tab = event.target.closest('.tab');
  if (tab) { showView(tab.dataset.view); return; }

  const button = event.target.closest('[data-action]');
  if (!button) return;
  switch (button.dataset.action) {
    case 'pick': {
      const tile = pick(TILES.filter((t) => t.cat !== 'all' && !litThisVisit.has(t.id))) || pick(TILES);
      openTile(tile, tile.cat === 'all' ? 'madeline' : tile.cat);
      break;
    }
    case 'another':
      current.version += 1;
      showVersion();
      break;
    case 'breathe':
      breathe();
      break;
    case 'done':
      finish();
      break;
    case 'not-now':
      clearTimeout(breathTimer);
      dialog.close();
      toast(current.tile.type === 'prompt' ? 'That’s okay. It’ll be here.' : 'That’s okay. Another time.');
      break;
    case 'open-note':
      openNote(current.note);
      break;
    case 'reread':
      openNote(NOTES.find((n) => n.id === button.dataset.id));
      break;
    case 'let-go':
      letGo(button.dataset.id);
      break;
    case 'close':
      clearTimeout(breathTimer);
      dialog.close();
      break;
  }
});

$('#m-textarea').addEventListener('input', (event) => {
  if (current?.tile.type === 'prompt') $('#m-done').disabled = !event.target.value.trim();
});

// Clicking the dim area around the dialog closes it.
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) { clearTimeout(breathTimer); dialog.close(); }
});

for (const input of document.querySelectorAll('input[name="place"]')) {
  input.checked = input.value === state.place;
  input.addEventListener('change', () => {
    state.place = input.value;
    save();
  });
}

// Start ---------------------------------------------------------------

$('#scene').innerHTML = sceneSVG();
greet();
renderTiles();
renderLanterns();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
