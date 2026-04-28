// Compact avatar maker — inline SVG primitives layered on top of each other.
// A "profile" is a small JSON object: { face, hair, eyes, brows, mouth, nose,
// moustache, glasses, hat, shirt, skin, hairColor, shirtColor }.
// All values are short string keys defined in CHOICES below.
window.AVATAR = (function () {
  const CHOICES = {
    face:      ['oval','round','square'],
    hair:      ['none','short','long','ponytail','curly','mohawk','bun'],
    eyes:      ['open','closed','wink','sleepy','dot','star'],
    brows:     ['flat','raised','angry','soft'],
    mouth:     ['smile','grin','neutral','open','sad'],
    nose:      ['small','medium','wide'],
    moustache: ['none','small','full'],
    glasses:   ['none','round','square'],
    hat:       ['none','cap','party'],
    shirt:     ['plain','striped','polo'],
    skin:      ['#ffe0bd','#f1c27d','#e0ac69','#c68642','#8d5524','#5b3a1d'],
    hairColor: ['#1d1d1d','#5b3a1d','#a0522d','#d4a054','#e8c267','#cc6f3a','#a04ad8','#ec4899','#ea4335'],
    shirtColor:['#3aa0dc','#d64b3b','#6abf4c','#5f4aa8','#e6c968','#ffffff','#1d1d1d','#ec4899'],
  };
  const DEFAULT = {
    face:'oval', hair:'short', eyes:'open', brows:'flat', mouth:'smile',
    nose:'medium', moustache:'none', glasses:'none', hat:'none', shirt:'plain',
    skin:'#f1c27d', hairColor:'#1d1d1d', shirtColor:'#3aa0dc',
  };

  // Render a complete avatar SVG from a profile. Returns an SVG string.
  function render(p) {
    p = Object.assign({}, DEFAULT, p || {});
    const skin = p.skin, hairCol = p.hairColor, shirt = p.shirtColor;

    // ---------- face ----------
    let face = '';
    if (p.face === 'round')  face = `<circle cx="100" cy="105" r="55" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>`;
    else if (p.face === 'square') face = `<rect x="48" y="56" width="104" height="104" rx="14" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>`;
    else /* oval */ face = `<ellipse cx="100" cy="105" rx="50" ry="58" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>`;

    const ears = `
      <ellipse cx="48" cy="105" rx="8" ry="12" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>
      <ellipse cx="152" cy="105" rx="8" ry="12" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>`;

    // ---------- hair ----------
    let hair = '';
    if (p.hair === 'short')    hair = `<path d="M50,80 Q60,40 100,40 Q140,40 150,80 L150,90 Q140,72 130,72 L70,72 Q60,72 50,90 Z" fill="${hairCol}" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    else if (p.hair === 'long') hair = `<path d="M48,80 Q60,30 100,32 Q140,30 152,80 L150,150 L138,150 L138,90 Q138,80 130,76 L70,76 Q62,80 62,90 L62,150 L50,150 Z" fill="${hairCol}" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    else if (p.hair === 'ponytail') hair = `<path d="M50,80 Q60,38 100,38 Q140,38 150,80 L148,90 Q140,72 130,72 L70,72 Q60,72 52,90 Z M150,80 Q172,90 168,140 Q160,150 154,140 Q160,110 152,90 Z" fill="${hairCol}" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    else if (p.hair === 'curly') hair = `<g fill="${hairCol}" stroke="#1d1d1d" stroke-width="2.5"><circle cx="65" cy="65" r="14"/><circle cx="85" cy="55" r="15"/><circle cx="105" cy="50" r="15"/><circle cx="125" cy="55" r="15"/><circle cx="145" cy="65" r="14"/><circle cx="58" cy="80" r="12"/><circle cx="148" cy="80" r="12"/></g>`;
    else if (p.hair === 'mohawk') hair = `<path d="M85,30 L115,30 L120,80 L80,80 Z" fill="${hairCol}" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    else if (p.hair === 'bun') hair = `<g fill="${hairCol}" stroke="#1d1d1d" stroke-width="3"><circle cx="100" cy="38" r="16"/><path d="M50,80 Q60,55 100,55 Q140,55 150,80 L148,88 Q140,72 130,72 L70,72 Q60,72 52,88 Z"/></g>`;

    // ---------- eyebrows ----------
    let brows = '';
    const brStyle = (d) => `<path d="${d}" fill="none" stroke="#1d1d1d" stroke-width="4.5" stroke-linecap="round"/>`;
    if (p.brows === 'flat')    brows = brStyle('M70,92 L88,92') + brStyle('M112,92 L130,92');
    if (p.brows === 'raised')  brows = brStyle('M68,92 Q79,84 90,92') + brStyle('M110,92 Q121,84 132,92');
    if (p.brows === 'angry')   brows = brStyle('M68,96 L88,90') + brStyle('M112,90 L132,96');
    if (p.brows === 'soft')    brows = brStyle('M68,93 Q79,98 90,93') + brStyle('M110,93 Q121,98 132,93');

    // ---------- eyes ----------
    let eyes = '';
    if (p.eyes === 'open')    eyes = `<circle cx="80" cy="108" r="4.5" fill="#1d1d1d"/><circle cx="120" cy="108" r="4.5" fill="#1d1d1d"/>`;
    if (p.eyes === 'closed')  eyes = `<path d="M72,110 Q80,114 88,110" stroke="#1d1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M112,110 Q120,114 128,110" stroke="#1d1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    if (p.eyes === 'wink')    eyes = `<circle cx="80" cy="108" r="4.5" fill="#1d1d1d"/><path d="M112,110 Q120,114 128,110" stroke="#1d1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    if (p.eyes === 'sleepy')  eyes = `<path d="M72,108 L88,108" stroke="#1d1d1d" stroke-width="3.5"/><path d="M112,108 L128,108" stroke="#1d1d1d" stroke-width="3.5"/>`;
    if (p.eyes === 'dot')     eyes = `<circle cx="80" cy="108" r="2.5" fill="#1d1d1d"/><circle cx="120" cy="108" r="2.5" fill="#1d1d1d"/>`;
    if (p.eyes === 'star')    eyes = `<text x="80" y="113" font-size="14" text-anchor="middle">★</text><text x="120" y="113" font-size="14" text-anchor="middle">★</text>`;

    // ---------- nose ----------
    let nose = '';
    if (p.nose === 'small')   nose = `<path d="M100,118 Q102,128 100,130" stroke="#1d1d1d" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (p.nose === 'medium')  nose = `<path d="M98,115 Q104,130 100,134 Q96,134 96,131" stroke="#1d1d1d" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (p.nose === 'wide')    nose = `<path d="M92,135 Q100,142 108,135" stroke="#1d1d1d" stroke-width="3" fill="none"/><path d="M100,118 L100,132" stroke="#1d1d1d" stroke-width="3" stroke-linecap="round"/>`;

    // ---------- mouth ----------
    let mouth = '';
    if (p.mouth === 'smile')   mouth = `<path d="M82,148 Q100,162 118,148" stroke="#1d1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    if (p.mouth === 'grin')    mouth = `<path d="M80,148 Q100,166 120,148 L120,150 Q100,158 80,150 Z" fill="#fff" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    if (p.mouth === 'neutral') mouth = `<line x1="84" y1="152" x2="116" y2="152" stroke="#1d1d1d" stroke-width="3.5" stroke-linecap="round"/>`;
    if (p.mouth === 'open')    mouth = `<ellipse cx="100" cy="153" rx="10" ry="7" fill="#7a2c2c" stroke="#1d1d1d" stroke-width="3"/>`;
    if (p.mouth === 'sad')     mouth = `<path d="M82,154 Q100,142 118,154" stroke="#1d1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

    // ---------- moustache ----------
    let moustache = '';
    if (p.moustache === 'small') moustache = `<path d="M88,142 Q100,150 112,142" stroke="#1d1d1d" stroke-width="4" fill="#1d1d1d" stroke-linecap="round"/>`;
    if (p.moustache === 'full')  moustache = `<path d="M76,140 Q90,152 100,144 Q110,152 124,140 Q120,150 100,150 Q80,150 76,140 Z" fill="#1d1d1d" stroke="#1d1d1d" stroke-width="2"/>`;

    // ---------- glasses ----------
    let glasses = '';
    if (p.glasses === 'round')  glasses = `<g fill="none" stroke="#1d1d1d" stroke-width="3"><circle cx="80" cy="108" r="13"/><circle cx="120" cy="108" r="13"/><line x1="93" y1="108" x2="107" y2="108"/></g>`;
    if (p.glasses === 'square') glasses = `<g fill="none" stroke="#1d1d1d" stroke-width="3"><rect x="68" y="98" width="24" height="20" rx="3"/><rect x="108" y="98" width="24" height="20" rx="3"/><line x1="92" y1="108" x2="108" y2="108"/></g>`;

    // ---------- hat ----------
    let hat = '';
    if (p.hat === 'cap')   hat = `<path d="M50,72 Q100,38 150,72 L150,80 L50,80 Z M150,76 L172,80 L172,72 L150,70 Z" fill="#d64b3b" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    if (p.hat === 'party') hat = `<path d="M75,55 L100,16 L125,55 Z" fill="#ec4899" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="16" r="5" fill="#ffd33d" stroke="#1d1d1d" stroke-width="2"/>`;

    // ---------- shirt / body ----------
    let shirtPath = `<path d="M30,200 Q40,168 80,160 L120,160 Q160,168 170,200 L170,210 L30,210 Z" fill="${shirt}" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>`;
    let shirtExtras = '';
    if (p.shirt === 'striped') shirtExtras = `<path d="M40,178 L160,178 M40,188 L160,188 M40,198 L160,198" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`;
    if (p.shirt === 'polo')    shirtExtras = `<path d="M85,162 L100,176 L115,162" fill="none" stroke="#1d1d1d" stroke-width="3"/><circle cx="100" cy="190" r="2.5" fill="#1d1d1d"/><circle cx="100" cy="200" r="2.5" fill="#1d1d1d"/>`;
    const neck = `<rect x="92" y="150" width="16" height="14" fill="${skin}" stroke="#1d1d1d" stroke-width="3"/>`;

    return `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      ${shirtPath}${shirtExtras}${neck}
      ${ears}${face}
      ${hair}
      ${brows}${eyes}${nose}${mouth}${moustache}${glasses}${hat}
    </svg>`;
  }

  return { render, CHOICES, DEFAULT };
})();
