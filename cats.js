// The three cats and the lantern, drawn in SVG.
// Each cat is drawn sitting in a pool of warm light, like the photos Lee-Ann took of them.
// Their markings follow close-up photos of their faces.

const LIGHT = '#F2B45A';
const WHITE = '#F7EFE2';
let svgIds = 0;

const CATS = {
  oliver: {
    name: 'Oliver',
    // Tuxedo, the mayor. An all-black face with a little white spot under his mouth;
    // the white starts below his chin and runs down his neck and chest. White mittens.
    coat: '#2A2320', ear: '#7A5550', eye: '#CFCC8C', nose: '#1C1716', mouth: '#8A7A70', whitePaws: true,
    tail: 'M68 89 C84 90 89 76 83 63',
    body: `<path d="M50 57.5 C43 57.5 41.5 64 43.5 71 C45.5 77 54.5 77 56.5 71 C58.5 64 57 57.5 50 57.5 Z" fill="${WHITE}"/>`,
    face: `<ellipse cx="50" cy="55.6" rx="1.5" ry=".85" fill="${WHITE}"/>`,
  },
  finley: {
    name: 'Finley',
    // All black, with a slightly shorter tail.
    coat: '#221C19', ear: '#6E4A44', eye: '#D3CF8E', nose: '#1C1716', mouth: '#8A7A70',
    tail: 'M68 89 C79 90 83 83 81 77',
    body: '', face: '',
  },
  madeline: {
    name: 'Madeline',
    // Brown tabby: dark stripes up her forehead, lines running back from her eyes, a striped tail.
    // A thin white blaze widens over her nose; her chin is tabby, then white down her chest. White mittens.
    coat: '#8D7559', ear: '#C49A6C', eye: '#A7AE66', nose: '#D08A80', mouth: '#4A3A32', liner: '#2F251C', whitePaws: true,
    tail: 'M68 89 C82 94 72 99 52 97', tailStripes: '#4A3E33',
    body: `<path d="M33.5 66 q4 1 4.5 5 M31.5 74 q4.5 1 5 5.5 M31 83 q4 1 4.5 5 M66.5 66 q-4 1 -4.5 5 M68.5 74 q-4.5 1 -5 5.5 M69 83 q-4 1 -4.5 5" stroke="#4A3E33" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
    face: `<g stroke="#3E3126" stroke-linecap="round" fill="none">
        <path d="M44.5 29.5 q.8 4 2.2 7.5 M47.6 28.5 q.4 4 .9 8 M52.4 28.5 q-.4 4 -.9 8 M55.5 29.5 q-.8 4 -2.2 7.5" stroke-width="1.4"/>
        <path d="M39.8 42.4 Q37 44 34 43.7 M60.2 42.4 Q63 44 66 43.7 M37 47 Q35 47.6 33 47.2 M63 47 Q65 47.6 67 47.2" stroke-width="1.2"/>
      </g>
      <path d="M44.5 53 Q50 51 55.5 53 C57.8 60 57.8 65 56.2 70 C54.6 76 45.4 76 43.8 70 C42.2 65 42.2 60 44.5 53 Z" fill="${WHITE}"/>
      <path d="M43.5 48 Q50 45 56.5 48 Q57.5 54 50 56 Q42.5 54 43.5 48 Z" fill="#8D7559"/>
      <path d="M49.4 33.5 L50.6 33.5 L53.6 45.2 Q55.2 47.2 53.6 48.4 Q50 46.8 46.4 48.4 Q44.8 47.2 46.4 45.2 Z" fill="${WHITE}"/>
      <g fill="#7A5E44"><circle cx="46" cy="49.4" r=".35"/><circle cx="46.6" cy="50.8" r=".35"/><circle cx="54" cy="49.4" r=".35"/><circle cx="53.4" cy="50.8" r=".35"/></g>`,
  },
};

// The cat's shapes, in a 100 × 100 box with the floor at y = 92.
function catShapes(key, opts = {}) {
  const c = CATS[key];
  const body = 'M37 54 C29 64 27 80 30 92 L70 92 C73 80 71 64 63 54 Z';
  const head = '<ellipse cx="50" cy="42" rx="17" ry="15"/>';
  // Almond eyes with slit pupils.
  const eye = (x) => `
    <path d="M${x - 3.5} 41.3 Q${x} 37.9 ${x + 3.5} 41.3 Q${x} 44.5 ${x - 3.5} 41.3 Z" fill="${c.eye}" ${c.liner ? `stroke="${c.liner}" stroke-width=".9"` : ''}/>
    <ellipse cx="${x}" cy="41.3" rx=".8" ry="2.3" fill="#15110E"/>
    <circle cx="${x + 1.1}" cy="40.3" r=".6" fill="#fff" opacity=".85"/>`;
  const pawFill = c.whitePaws ? WHITE : c.coat;
  // Face markings stay inside the head and body, so nothing pokes out past her outline.
  const clip = `c${++svgIds}`;
  return `
    <g class="tail">
      <path d="${c.tail}" stroke="${c.coat}" stroke-width="6" stroke-linecap="round" fill="none"/>
      ${c.tailStripes ? `<path d="${c.tail}" stroke="${c.tailStripes}" stroke-width="6" stroke-dasharray="2 4.5" fill="none"/>` : ''}
    </g>
    <path d="${body}" fill="${c.coat}"/>
    ${c.body}
    <ellipse cx="43" cy="91" rx="6" ry="3.6" fill="${pawFill}"/>
    <ellipse cx="57" cy="91" rx="6" ry="3.6" fill="${pawFill}"/>
    <path d="M35.5 37 L36 19.5 L47.5 29 Z M64.5 37 L64 19.5 L52.5 29 Z" fill="${c.coat}" stroke="${c.coat}" stroke-linejoin="round"/>
    <path d="M37.8 32.5 L38.2 24 L44 29.2 Z M62.2 32.5 L61.8 24 L56 29.2 Z" fill="${c.ear}" opacity=".75"/>
    <ellipse cx="50" cy="42" rx="17" ry="15" fill="${c.coat}"/>
    <clipPath id="${clip}">${head}<path d="${body}"/></clipPath>
    <g clip-path="url(#${clip})">${c.face}</g>
    ${eye(43.5)}${eye(56.5)}
    <path d="M48.2 47 L51.8 47 L50 49.2 Z" fill="${c.nose}" ${c.nose === '#1C1716' ? 'stroke="#5A4E4A" stroke-width=".5"' : ''}/>
    <path d="M50 49.2 Q48.8 51.6 46.8 50.8 M50 49.2 Q51.2 51.6 53.2 50.8" stroke="${c.mouth}" stroke-width=".8" fill="none" stroke-linecap="round"/>
    <g stroke="${WHITE}" stroke-opacity=".65" stroke-width=".55" stroke-linecap="round">
      <path d="M44.5 48.5 L31 46.5 M44.5 50 L31.5 51.5 M55.5 48.5 L69 46.5 M55.5 50 L68.5 51.5"/>
    </g>
    ${opts.prop ? PROPS[opts.prop] : ''}`;
}

// Small extras a cat can have with it.
const PROPS = {
  // Oliver's laser dot.
  dot: `<circle cx="80" cy="91" r="4" fill="#E5484D" opacity=".25"/><circle cx="80" cy="91" r="1.8" fill="#FF6B6B"/>`,
  // Finley singing it to the meowntains.
  notes: `<g fill="${LIGHT}" stroke="${LIGHT}" stroke-width="1.2" stroke-linecap="round">
    <ellipse cx="74" cy="30" rx="2.6" ry="2" stroke="none"/><path d="M76.4 30 V20 L81 18.5" fill="none"/>
    <ellipse cx="83" cy="40" rx="2.2" ry="1.7" stroke="none"/><path d="M85 40 V32" fill="none"/>
  </g>`,
  // Finley's feather toy.
  feather: `<g stroke="${LIGHT}" stroke-linecap="round" fill="none"><path d="M78 92 C80 80 84 72 90 66" stroke-width="1"/>
    <path d="M85 74 C80 72 80 66 86 62 C92 60 94 64 90 68 C88 71 87 73 85 74 Z" fill="#E9C27E" stroke="none"/></g>`,
  // Madeline's heart (she brings the notes).
  heart: `<path d="M78 34 C78 30 83 29.5 84 33 C85 29.5 90 30 90 34 C90 38 84 41 84 42.5 C84 41 78 38 78 34 Z" fill="#E8907A"/>`,
};

// A whole cat. glow: draw the pool of lantern light behind it.
function catSVG(key, { glow = true, prop = '', className = '', label = '' } = {}) {
  const id = `g${++svgIds}`;
  const pool = glow ? `
    <defs>
      <radialGradient id="${id}" cx="50%" cy="58%" r="50%">
        <stop offset="0" stop-color="${LIGHT}" stop-opacity=".45"/>
        <stop offset=".55" stop-color="${LIGHT}" stop-opacity=".14"/>
        <stop offset="1" stop-color="${LIGHT}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="66" rx="50" ry="40" fill="url(#${id})"/>
    <ellipse cx="50" cy="93" rx="34" ry="5" fill="${LIGHT}" opacity=".18"/>` : '';
  const aria = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="cat ${className}" viewBox="0 0 100 100" ${aria}>${pool}<g class="cat-body">${catShapes(key, { prop })}</g></svg>`;
}

// Just the cat's face, for the tiles.
function catFace(key) {
  return `<svg class="cat-face" viewBox="26 15 48 44" aria-hidden="true">${catShapes(key)}</svg>`;
}

// All three cats' faces together, for things that come from all of them.
function allFaces() {
  return `<svg class="cat-face" viewBox="0 0 120 60" aria-hidden="true">
    <svg x="-6" y="10" width="56" height="52" viewBox="26 15 48 44">${catShapes('oliver')}</svg>
    <svg x="70" y="10" width="56" height="52" viewBox="26 15 48 44">${catShapes('finley')}</svg>
    <svg x="30" y="4" width="60" height="56" viewBox="26 15 48 44">${catShapes('madeline')}</svg>
  </svg>`;
}

// The lantern. lit: whether the flame is burning.
function lanternSVG({ lit = true, className = '' } = {}) {
  const id = `l${++svgIds}`;
  return `<svg class="lantern ${className}" viewBox="0 0 40 60" aria-hidden="true">
    <defs>
      <radialGradient id="${id}" cx="50%" cy="55%" r="60%">
        <stop offset="0" stop-color="#FFE7AE"/>
        <stop offset=".6" stop-color="${LIGHT}"/>
        <stop offset="1" stop-color="#D98B32"/>
      </radialGradient>
      <radialGradient id="${id}h">
        <stop offset="0" stop-color="${LIGHT}" stop-opacity=".45"/>
        <stop offset="1" stop-color="${LIGHT}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    ${lit ? `<circle cx="20" cy="30" r="20" fill="url(#${id}h)" class="lantern-halo"/>` : ''}
    <path d="M15.5 10.5 C15.5 3 24.5 3 24.5 10.5" stroke="#8A6A45" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M10.5 16.5 L14 11 L26 11 L29.5 16.5 Z" fill="#4A3A2C" stroke="#8A6A45" stroke-width="1" stroke-linejoin="round"/>
    <rect x="12" y="16.5" width="16" height="25" rx="3" fill="${lit ? `url(#${id})` : '#4D4036'}" stroke="#4A3A2C" stroke-width="2"/>
    ${lit ? '<path class="flame" d="M20 23 C23.2 27 23 31.5 20 33.5 C17 31.5 16.8 27 20 23 Z" fill="#FFF6DD"/>' : ''}
    <path d="M16.5 17 V41 M23.5 17 V41" stroke="#4A3A2C" stroke-width="1.2" opacity=".7"/>
    <rect x="10" y="41" width="20" height="5" rx="1.6" fill="#4A3A2C" stroke="#8A6A45" stroke-width="1"/>
  </svg>`;
}

// The masthead picture: the three cats around a lantern.
function sceneSVG() {
  const id = `s${++svgIds}`;
  return `<svg class="scene" viewBox="0 0 300 132" role="img" aria-label="Oliver, Finley and Madeline sitting around a lit lantern">
    <defs>
      <radialGradient id="${id}" cx="50%" cy="70%" r="50%">
        <stop offset="0" stop-color="${LIGHT}" stop-opacity=".42"/>
        <stop offset=".5" stop-color="${LIGHT}" stop-opacity=".13"/>
        <stop offset="1" stop-color="${LIGHT}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="150" cy="86" rx="150" ry="46" fill="url(#${id})"/>
    <ellipse cx="150" cy="120" rx="118" ry="9" fill="${LIGHT}" opacity=".16"/>
    <svg x="12" y="28" width="100" height="100" viewBox="0 0 100 100">${catShapes('oliver')}</svg>
    <svg x="186" y="22" width="100" height="100" viewBox="0 0 100 100">${catShapes('finley')}</svg>
    <svg x="132" y="38" width="88" height="88" viewBox="0 0 100 100">${catShapes('madeline')}</svg>
    <svg x="99" y="62" width="40" height="60" viewBox="0 0 40 60">${lanternSVG().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
  </svg>`;
}
