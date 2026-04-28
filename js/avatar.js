// Profile / avatar engine — ported from the uploaded profile.html so the
// student app uses the same elaborated parts and rendering style.
// Exposed API:
//   AVATAR.render(profile)   → SVG string (full avatar)
//   AVATAR.thumb(tabId, item, profile) → SVG string (single part preview)
//   AVATAR.DEFAULT           → default profile object
//   AVATAR.TABS              → tab definitions (id, icon, items, palette)
//   AVATAR.SKIN_TONES / HAIR_COLORS / SHIRT_COLORS → palettes
window.AVATAR = (function () {
  const STROKE = 9, STROKE_M = 6, STROKE_S = 4, INK = '#111';

  const SKIN_TONES = [
    '#fde6d2','#fbd9bb','#f7c9a3','#f0b685',
    '#e6a371','#d68f5d','#c47e4d','#a96638',
    '#8e5230','#6f3f24','#552f1c','#3a1f12'
  ];
  const HAIR_COLORS = [
    '#1a1a1a','#3a1d12','#5b3a29','#7a4a25',
    '#a0703f','#c98a55','#d9b178','#f6e3a1',
    '#f1c1c1','#ff6f3c','#ff9a00','#ffd400',
    '#7e3ff2','#a25ddc','#3aa0ff','#22b573',
    '#ee3b6f','#9a9a9a','#e7e7e7','#ffffff'
  ];
  const SHIRT_COLORS = [
    '#1a1a1a','#3a3f47','#7e3ff2','#3aa0ff',
    '#22b573','#ffd400','#ff7a00','#ee3b6f',
    '#ffffff','#a16e3d','#5b3a29','#f7c9a3'
  ];

  const sp = (d, fill='none', sw=STROKE_M) =>
    `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // ---------- ears ----------
  function ears(skin, leftX, rightX, cy=205, w=15, h=22) {
    return `
      <path d="M${leftX-w},${cy} Q${leftX-w-2},${cy-h} ${leftX},${cy-h+2} L${leftX},${cy+h-2} Q${leftX-w-2},${cy+h} ${leftX-w},${cy} Z"
            fill="${skin}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
      <path d="M${rightX+w},${cy} Q${rightX+w+2},${cy-h} ${rightX},${cy-h+2} L${rightX},${cy+h-2} Q${rightX+w+2},${cy+h} ${rightX+w},${cy} Z"
            fill="${skin}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
      <path d="M${leftX-2},${cy-3} Q${leftX-8},${cy+2} ${leftX-2},${cy+8}" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
      <path d="M${rightX+2},${cy-3} Q${rightX+8},${cy+2} ${rightX+2},${cy+8}" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>`;
  }

  const FACE_SHAPES = [
    { id:'f1', label:'Oval',
      earsAt:{l:120, r:280, cy:205},
      body: skin => sp('M120,170 Q120,88 200,88 Q280,88 280,170 L280,248 Q280,296 200,296 Q120,296 120,248 Z', skin, STROKE) },
    { id:'f2', label:'Round',
      earsAt:{l:124, r:276, cy:205},
      body: skin => sp('M124,180 Q124,92 200,92 Q276,92 276,180 Q276,296 200,296 Q124,296 124,180 Z', skin, STROKE) },
    { id:'f3', label:'Stubble',
      earsAt:{l:120, r:280, cy:205},
      body: skin => `${sp('M120,170 Q120,88 200,88 Q280,88 280,170 L280,248 Q280,296 200,296 Q120,296 120,248 Z', skin, STROKE)}
        <path d="M150,260 Q200,290 250,260 L248,278 Q200,300 152,278 Z" fill="rgba(0,0,0,.18)" />
        <g fill="${INK}" opacity=".55">
          <circle cx="160" cy="270" r="1.4"/><circle cx="170" cy="276" r="1.4"/><circle cx="180" cy="280" r="1.4"/>
          <circle cx="195" cy="282" r="1.4"/><circle cx="210" cy="282" r="1.4"/><circle cx="225" cy="280" r="1.4"/>
          <circle cx="235" cy="276" r="1.4"/><circle cx="245" cy="270" r="1.4"/>
          <circle cx="170" cy="262" r="1.2"/><circle cx="190" cy="266" r="1.2"/><circle cx="220" cy="266" r="1.2"/><circle cx="240" cy="262" r="1.2"/>
        </g>` },
    { id:'f4', label:'Wide',
      earsAt:{l:114, r:286, cy:210, w:16, h:24},
      body: skin => sp('M114,180 Q114,90 200,90 Q286,90 286,180 L286,250 Q286,300 200,300 Q114,300 114,250 Z', skin, STROKE) },
    { id:'f5', label:'Square',
      earsAt:{l:124, r:276, cy:215},
      body: skin => sp('M124,164 Q124,94 200,94 Q276,94 276,164 L276,260 Q276,294 244,294 L156,294 Q124,294 124,260 Z', skin, STROKE) },
    { id:'f6', label:'Long',
      earsAt:{l:130, r:270, cy:215, w:14, h:20},
      body: skin => sp('M130,170 Q130,86 200,86 Q270,86 270,170 L270,260 Q270,310 200,310 Q130,310 130,260 Z', skin, STROKE) },
    { id:'f7', label:'Heart',
      earsAt:{l:122, r:278, cy:200},
      body: skin => sp('M120,170 Q120,88 200,88 Q280,88 280,170 L274,224 Q252,304 200,304 Q148,304 126,224 Z', skin, STROKE) },
    { id:'f8', label:'Pointy',
      earsAt:{l:132, r:268, cy:200, w:13, h:19},
      body: skin => sp('M126,170 Q126,90 200,90 Q274,90 274,170 L262,236 Q230,310 200,310 Q170,310 138,236 Z', skin, STROKE) },
    { id:'f9', label:'Soft',
      earsAt:{l:126, r:274, cy:215},
      body: skin => sp('M126,180 Q126,98 200,98 Q274,98 274,180 Q274,290 200,290 Q126,290 126,180 Z', skin, STROKE) },
    { id:'f10', label:'Slim',
      earsAt:{l:140, r:260, cy:215, w:13, h:19},
      body: skin => sp('M140,170 Q140,90 200,90 Q260,90 260,170 L260,254 Q260,302 200,302 Q140,302 140,254 Z', skin, STROKE) },
    { id:'f11', label:'Mini',
      earsAt:{l:144, r:256, cy:215, w:12, h:17},
      body: skin => sp('M144,178 Q144,108 200,108 Q256,108 256,178 Q256,282 200,282 Q144,282 144,178 Z', skin, STROKE) },
    { id:'f12', label:'Egg',
      earsAt:{l:130, r:270, cy:205},
      body: skin => sp('M130,180 Q130,86 200,86 Q270,86 270,180 Q270,300 200,300 Q130,300 130,180 Z', skin, STROKE) },
  ];
  function earsFor(face, skin) {
    const e = face.earsAt;
    return ears(skin, e.l, e.r, e.cy, e.w || 15, e.h || 22);
  }

  const HAIR_STYLES = [
    { id:'h0', label:'None', body: () => '' },
    { id:'h1', label:'Buzz', body: c => sp('M132,140 Q150,92 200,90 Q252,92 268,140 Q252,118 200,116 Q148,118 132,140 Z', c, STROKE) },
    { id:'h2', label:'Crew', body: c => sp('M134,138 Q145,82 200,80 Q255,82 266,138 Q252,118 200,116 Q148,118 134,138 Z', c, STROKE) },
    { id:'h3', label:'Side', body: c => `
        ${sp('M128,146 Q138,80 218,82 Q278,90 270,144 Q255,112 200,108 Q166,108 146,138 Z', c, STROKE)}
        ${sp('M196,108 Q220,98 250,118', '#000', STROKE_S-1)}` },
    { id:'h4', label:'Short', body: c => `
        ${sp('M124,150 Q120,76 200,72 Q280,76 276,150 Q258,108 218,104 Q176,104 162,118 Q142,128 124,150 Z', c, STROKE)}
        ${sp('M195,76 Q207,90 218,104', '#000', STROKE_M-1)}` },
    { id:'h5', label:'Quiff', body: c => `
        ${sp('M124,150 Q124,72 200,70 Q276,72 276,150 Q255,114 215,108 Q175,108 158,118 Q142,130 124,150 Z', c, STROKE)}
        ${sp('M192,72 Q200,42 240,55 Q230,80 215,92 Z', c, STROKE_M)}` },
    { id:'h6', label:'Pomp', body: c => `
        ${sp('M125,148 Q125,72 200,70 Q275,72 275,148', c, STROKE)}
        ${sp('M170,68 Q200,30 245,50 Q235,90 200,100 Q175,95 170,68 Z', c, STROKE)}` },
    { id:'h7', label:'Spiky', body: c => `
        ${sp('M128,140 Q138,90 200,86 Q262,90 272,140', c, STROKE)}
        ${sp('M148,98 L138,60 L156,98 Z', c, STROKE_M)}
        ${sp('M178,86 L172,46 L186,86 Z', c, STROKE_M)}
        ${sp('M210,86 L224,46 L218,86 Z', c, STROKE_M)}
        ${sp('M242,98 L256,60 L248,98 Z', c, STROKE_M)}` },
    { id:'h8', label:'Mohawk', body: c => `
        ${sp('M178,38 Q200,18 222,38 L214,118 L186,118 Z', c, STROKE)}
        ${sp('M150,138 Q150,114 174,112 L226,112 Q250,114 250,138 Q230,124 200,124 Q170,124 150,138 Z', c, STROKE_M)}` },
    { id:'h9', label:'Punk', body: c => `
        ${sp('M148,140 Q156,114 200,112 Q244,114 252,140', c, STROKE)}
        ${sp('M170,118 L162,52 L186,118 Z', c, STROKE_M)}
        ${sp('M195,108 L195,38 L208,108 Z', c, STROKE_M)}
        ${sp('M226,118 L240,52 L218,118 Z', c, STROKE_M)}` },
    { id:'h10', label:'Bowl', body: c => sp('M122,164 Q120,72 200,68 Q280,72 278,164 Q260,150 200,134 Q140,150 122,164 Z', c, STROKE) },
    { id:'h11', label:'Sweep', body: c => `
        ${sp('M120,150 Q120,72 200,68 Q280,72 280,150 Q252,98 200,98 Q160,98 138,118 Q126,138 120,150 Z', c, STROKE)}
        ${sp('M200,100 Q170,108 142,128', 'none', STROKE_S)}` },
    { id:'h12', label:'Locs', body: c => `
        ${sp('M130,148 Q130,74 200,70 Q270,74 270,148 Q252,112 215,106 Q170,106 156,118 Q142,128 130,148 Z', c, STROKE)}
        <g stroke="${INK}" stroke-width="${STROKE_M-1}" stroke-linecap="round">
          <line x1="148" y1="80" x2="142" y2="50"/>
          <line x1="170" y1="68" x2="166" y2="40"/>
          <line x1="195" y1="62" x2="196" y2="32"/>
          <line x1="220" y1="62" x2="222" y2="34"/>
          <line x1="242" y1="70" x2="248" y2="42"/>
          <line x1="260" y1="84" x2="270" y2="58"/>
        </g>` },
    { id:'h13', label:'Curly', body: c => `
        ${sp('M118,150 Q114,75 200,68 Q286,75 282,150', c, STROKE)}
        <g fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round">
          <circle cx="135" cy="105" r="22"/>
          <circle cx="170" cy="78" r="24"/>
          <circle cx="210" cy="72" r="25"/>
          <circle cx="250" cy="86" r="23"/>
          <circle cx="278" cy="118" r="20"/>
        </g>` },
    { id:'h14', label:'Afro', body: c => `
        <circle cx="200" cy="120" r="92" fill="${c}" stroke="${INK}" stroke-width="${STROKE}"/>
        <g fill="${c}">
          <circle cx="148" cy="105" r="14"/>
          <circle cx="252" cy="105" r="14"/>
          <circle cx="172" cy="68" r="11"/>
          <circle cx="228" cy="68" r="11"/>
        </g>` },
    /* ── Long / women's styles — single connected donut shape (outer hair around head + inner cut-out around the face) so nothing floats. Bangs/fringe drawn ON TOP, sharing colour. ── */
    { id:'h15', label:'Wavy', body: c => `
        <path d="M104,344
                 Q90,310 92,250 Q88,170 104,118 Q124,62 200,58 Q276,62 296,118 Q312,170 308,250 Q310,310 296,344
                 L268,344 Q284,242 282,180 Q272,154 200,148 Q128,154 118,180 Q116,242 132,344 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M148,128 Q170,90 200,128 Q230,90 252,128 Q232,140 200,138 Q168,140 148,128 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <path d="M104,210 Q92,232 100,258"   fill="none" stroke="${INK}" stroke-width="${STROKE_S}" stroke-linecap="round" opacity=".55"/>
        <path d="M296,210 Q308,232 300,258"  fill="none" stroke="${INK}" stroke-width="${STROKE_S}" stroke-linecap="round" opacity=".55"/>` },

    { id:'h16', label:'Long', body: c => `
        <path d="M118,330
                 Q104,250 108,170 Q116,76 200,68 Q284,76 292,170 Q296,250 282,330
                 L260,330 Q278,176 200,160 Q122,176 140,330 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M150,128 Q175,98 200,128 Q225,98 252,128 Q232,140 200,138 Q170,140 150,128 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>` },

    { id:'h17', label:'Bob', body: c => `
        <path d="M118,238
                 Q104,176 108,140 Q116,76 200,68 Q284,76 292,140 Q296,176 282,238
                 L262,236 Q272,182 252,168 Q224,154 200,154 Q176,154 148,168 Q128,182 138,236 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M150,128 Q175,98 200,128 Q225,98 252,128 Q232,140 200,138 Q170,140 150,128 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>` },

    { id:'h18', label:'Lob', body: c => `
        <path d="M118,278
                 Q104,196 108,150 Q116,76 200,68 Q284,76 292,150 Q296,196 282,278
                 L260,278 Q278,180 200,164 Q122,180 140,278 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M150,128 Q175,98 200,128 Q225,98 252,128 Q232,140 200,138 Q170,140 150,128 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>` },

    { id:'h19', label:'Pony', body: c => `
        <path d="M124,206
                 Q116,140 124,108 Q140,72 200,68 Q260,72 276,108 Q284,140 276,206
                 Q282,158 252,138 Q224,118 200,118 Q176,118 148,138 Q118,158 124,206 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M268,140
                 Q310,168 312,210 Q314,250 296,266 Q284,260 286,224 Q286,196 270,176 Q258,160 254,148 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <circle cx="266" cy="146" r="6" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S-1}"/>` },

    { id:'h20', label:'Pigtail', body: c => `
        <path d="M132,156
                 Q124,86 200,72 Q276,86 268,156
                 Q250,118 200,114 Q150,118 132,156 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M120,148
                 Q90,170 86,220 Q86,266 110,278 Q126,272 124,236 Q124,200 132,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <path d="M280,148
                 Q310,170 314,220 Q314,266 290,278 Q274,272 276,236 Q276,200 268,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>` },

    { id:'h21', label:'Bun', body: c => `
        <path d="M122,170
                 Q108,138 112,100 Q126,52 200,48 Q274,52 288,100 Q292,138 278,170
                 Q264,140 200,134 Q136,140 122,170 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <ellipse cx="200" cy="48" rx="34" ry="26" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <path d="M180,48 Q200,38 220,48" fill="none" stroke="${INK}" stroke-width="${STROKE_S-1}" opacity=".7"/>` },

    { id:'h22', label:'Braids', body: c => `
        <path d="M130,160
                 Q120,86 200,72 Q280,86 270,160
                 Q252,124 200,118 Q148,124 130,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M118,156
                 Q102,200 108,260 Q112,300 122,308 Q132,304 134,272 Q132,228 132,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <path d="M282,156
                 Q298,200 292,260 Q288,300 278,308 Q268,304 266,272 Q268,228 268,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <g stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".75">
          <path d="M114,196 Q120,202 126,196"/><path d="M114,220 Q120,226 126,220"/>
          <path d="M114,244 Q120,250 126,244"/><path d="M114,268 Q120,274 126,268"/>
          <path d="M286,196 Q280,202 274,196"/><path d="M286,220 Q280,226 274,220"/>
          <path d="M286,244 Q280,250 274,244"/><path d="M286,268 Q280,274 274,268"/>
        </g>` },

    { id:'h23', label:'Flat', body: c => `
        <path d="M132,134 L132,100 Q132,80 200,80 Q268,80 268,100 L268,134 Q220,118 200,118 Q180,118 132,134 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <line x1="132" y1="116" x2="268" y2="116" stroke="${INK}" stroke-width="${STROKE_S-1}" opacity=".6"/>` },

    { id:'h24', label:'Sweep2', body: c => `
        <path d="M120,160 Q120,72 200,68 Q280,72 280,160 Q230,90 168,128 Q140,150 120,160 Z"
              fill="${c}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
        <path d="M144,116 Q190,98 248,108" fill="none" stroke="${INK}" stroke-width="${STROKE_S}" opacity=".5"/>` },
  ];

  const EYES = [
    { id:'e0', label:'None', body: () => '' },
    { id:'e1', label:'Closed', body: () => `
        <path d="M138,180 Q158,160 178,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <path d="M222,180 Q242,160 262,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'e2', label:'Open', body: () => `
        <circle cx="158" cy="182" r="9" fill="${INK}"/>
        <circle cx="242" cy="182" r="9" fill="${INK}"/>` },
    { id:'e3', label:'Round', body: () => `
        <circle cx="158" cy="182" r="14" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <circle cx="242" cy="182" r="14" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <circle cx="158" cy="184" r="6" fill="${INK}"/>
        <circle cx="242" cy="184" r="6" fill="${INK}"/>
        <circle cx="155" cy="180" r="2" fill="#fff"/>
        <circle cx="239" cy="180" r="2" fill="#fff"/>` },
    { id:'e4', label:'Anime', body: () => `
        <path d="M138,170 Q158,150 178,170 L178,194 Q158,206 138,194 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M222,170 Q242,150 262,170 L262,194 Q242,206 222,194 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <ellipse cx="158" cy="184" rx="8" ry="10" fill="#3aa0ff"/>
        <ellipse cx="242" cy="184" rx="8" ry="10" fill="#3aa0ff"/>
        <circle cx="158" cy="186" r="3" fill="${INK}"/>
        <circle cx="242" cy="186" r="3" fill="${INK}"/>
        <circle cx="154" cy="180" r="2.5" fill="#fff"/>
        <circle cx="238" cy="180" r="2.5" fill="#fff"/>` },
    { id:'e5', label:'Sparkle', body: () => `
        <ellipse cx="158" cy="182" rx="13" ry="14" fill="#7e3ff2" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <ellipse cx="242" cy="182" rx="13" ry="14" fill="#7e3ff2" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M154,178 L156,184 L162,182 L156,186 L154,192 L152,186 L146,182 L152,184 Z" fill="#fff"/>
        <path d="M238,178 L240,184 L246,182 L240,186 L238,192 L236,186 L230,182 L236,184 Z" fill="#fff"/>` },
    { id:'e6', label:'Heart', body: () => `
        <path d="M158,194 L142,178 Q134,168 144,162 Q156,158 158,170 Q160,158 172,162 Q182,168 174,178 Z" fill="#ee3b6f" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M242,194 L226,178 Q218,168 228,162 Q240,158 242,170 Q244,158 256,162 Q266,168 258,178 Z" fill="#ee3b6f" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'e7', label:'Wink', body: () => `
        <path d="M138,180 Q158,162 178,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <circle cx="242" cy="182" r="9" fill="${INK}"/>` },
    { id:'e8', label:'Sleepy', body: () => `
        <path d="M140,178 Q158,170 178,178" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <path d="M222,178 Q242,170 260,178" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <circle cx="158" cy="184" r="4" fill="${INK}"/>
        <circle cx="242" cy="184" r="4" fill="${INK}"/>` },
    { id:'e9', label:'Cute', body: () => `
        <path d="M148,168 Q158,200 168,168" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <path d="M232,168 Q242,200 252,168" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'e10', label:'Wide', body: () => `
        <ellipse cx="158" cy="182" rx="16" ry="13" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <ellipse cx="242" cy="182" rx="16" ry="13" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <circle cx="160" cy="184" r="7" fill="${INK}"/>
        <circle cx="244" cy="184" r="7" fill="${INK}"/>
        <circle cx="156" cy="180" r="2.5" fill="#fff"/>
        <circle cx="240" cy="180" r="2.5" fill="#fff"/>` },
    { id:'e11', label:'Angry', body: () => `
        <path d="M140,176 L178,186" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round"/>
        <path d="M222,186 L260,176" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round"/>
        <circle cx="160" cy="186" r="4" fill="${INK}"/>
        <circle cx="240" cy="186" r="4" fill="${INK}"/>` },
    { id:'e12', label:'Sad', body: () => `
        <path d="M140,180 Q158,200 178,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <path d="M222,180 Q242,200 262,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'e13', label:'Tear', body: () => `
        <path d="M138,180 Q158,162 178,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none"/>
        <path d="M222,180 Q242,162 262,180" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none"/>
        <path d="M170,184 Q172,206 174,212" fill="#3aa0ff" stroke="${INK}" stroke-width="2"/>
        <path d="M230,184 Q228,206 226,212" fill="#3aa0ff" stroke="${INK}" stroke-width="2"/>` },
    { id:'e14', label:'Squint', body: () => `
        <path d="M140,180 L178,180" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round"/>
        <path d="M222,180 L260,180" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round"/>` },
    { id:'e15', label:'Freckle', body: () => `
        <circle cx="158" cy="182" r="6" fill="${INK}"/>
        <circle cx="242" cy="182" r="6" fill="${INK}"/>
        <g fill="${INK}" opacity=".85">
          <circle cx="146" cy="208" r="1.6"/><circle cx="156" cy="216" r="1.6"/>
          <circle cx="166" cy="220" r="1.6"/><circle cx="170" cy="208" r="1.4"/>
          <circle cx="234" cy="208" r="1.6"/><circle cx="244" cy="216" r="1.6"/>
          <circle cx="252" cy="220" r="1.6"/><circle cx="230" cy="220" r="1.4"/>
        </g>` },
    { id:'e16', label:'Dotty', body: () => `
        <circle cx="158" cy="182" r="4" fill="${INK}"/>
        <circle cx="242" cy="182" r="4" fill="${INK}"/>` },
    { id:'e17', label:'Slant', body: () => `
        <path d="M158,176 L158,188" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round" transform="rotate(-12 158 182)"/>
        <path d="M242,176 L242,188" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round" transform="rotate(12 242 182)"/>` },
  ];

  const BROWS = [
    { id:'b0', label:'None', body: () => '' },
    { id:'b1', label:'Bold', body: () => `
        <path d="M138,150 Q158,134 180,148 Q180,154 178,156 Q158,144 142,156 Q138,154 138,150 Z" fill="${INK}"/>
        <path d="M262,150 Q242,134 220,148 Q220,154 222,156 Q242,144 258,156 Q262,154 262,150 Z" fill="${INK}"/>` },
    { id:'b2', label:'Slant', body: () => `
        <path d="M140,154 L180,140 L180,150 L140,164 Z" fill="${INK}"/>
        <path d="M260,154 L220,140 L220,150 L260,164 Z" fill="${INK}"/>` },
    { id:'b3', label:'Angry', body: () => `
        <path d="M138,140 L180,158 L180,166 L138,150 Z" fill="${INK}"/>
        <path d="M262,140 L220,158 L220,166 L262,150 Z" fill="${INK}"/>` },
    { id:'b4', label:'Up', body: () => `
        <path d="M138,160 L180,140 L180,150 L138,170 Z" fill="${INK}"/>
        <path d="M262,160 L220,140 L220,150 L262,170 Z" fill="${INK}"/>` },
    { id:'b5', label:'Curve', body: () => `
        <path d="M138,154 Q158,134 180,154" stroke="${INK}" stroke-width="${STROKE_M+2}" fill="none" stroke-linecap="round"/>
        <path d="M222,154 Q242,134 262,154" stroke="${INK}" stroke-width="${STROKE_M+2}" fill="none" stroke-linecap="round"/>` },
    { id:'b6', label:'Straight', body: () => `
        <rect x="138" y="146" width="44" height="7" rx="3" fill="${INK}"/>
        <rect x="218" y="146" width="44" height="7" rx="3" fill="${INK}"/>` },
    { id:'b7', label:'Thin', body: () => `
        <path d="M142,150 Q158,144 178,150" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M222,150 Q242,144 258,150" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` },
    { id:'b8', label:'Worry', body: () => `
        <path d="M138,140 Q158,154 180,150" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>
        <path d="M262,140 Q242,154 220,150" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'b9', label:'Bushy', body: () => `
        <path d="M134,144 Q150,128 184,142 Q184,156 178,160 Q160,150 138,160 Q134,156 134,144 Z" fill="${INK}"/>
        <path d="M266,144 Q250,128 216,142 Q216,156 222,160 Q240,150 262,160 Q266,156 266,144 Z" fill="${INK}"/>` },
    { id:'b10', label:'Pierce', body: () => `
        <path d="M138,150 Q158,134 180,148 Q180,154 178,156 Q158,144 142,156 Q138,154 138,150 Z" fill="${INK}"/>
        <path d="M262,150 Q242,134 220,148 Q220,154 222,156 Q242,144 258,156 Q262,154 262,150 Z" fill="${INK}"/>
        <circle cx="178" cy="158" r="3" fill="#ffd400" stroke="${INK}" stroke-width="1.5"/>` },
  ];

  const MOUTHS = [
    { id:'m0', label:'None', body: () => '' },
    { id:'m1', label:'Teeth', body: () => `
        <path d="M178,250 L222,250 Q232,250 232,260 L232,272 Q232,282 222,282 L178,282 Q168,282 168,272 L168,260 Q168,250 178,250 Z"
              fill="#fff" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <line x1="170" y1="266" x2="230" y2="266" stroke="${INK}" stroke-width="${STROKE_S-1}"/>` },
    { id:'m2', label:'Smile', body: () => `<path d="M168,250 Q200,278 232,250" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'m3', label:'Grin', body: () => `
        <path d="M168,252 Q200,294 232,252 Z" fill="#5a1818" stroke="${INK}" stroke-width="${STROKE_M}" stroke-linejoin="round"/>
        <path d="M180,260 L220,260" stroke="#fff" stroke-width="${STROKE_M+1}"/>` },
    { id:'m4', label:'Frown', body: () => `<path d="M168,272 Q200,250 232,272" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'m5', label:'Open', body: () => `<ellipse cx="200" cy="262" rx="22" ry="14" fill="#5a1818" stroke="${INK}" stroke-width="${STROKE_M}"/>` },
    { id:'m6', label:'Lips', body: () => `<path d="M168,260 Q186,250 200,258 Q214,250 232,260 Q214,278 200,270 Q186,278 168,260 Z" fill="#ee3b6f" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'m7', label:'Kiss', body: () => `<path d="M186,258 Q200,248 214,258 Q220,266 214,274 Q200,284 186,274 Q180,266 186,258 Z" fill="#ee3b6f" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'m8', label:'Tongue', body: () => `
        <path d="M174,254 Q200,280 226,254" stroke="${INK}" stroke-width="${STROKE_M}" fill="#5a1818"/>
        <ellipse cx="208" cy="276" rx="11" ry="8" fill="#ff5b8a" stroke="${INK}" stroke-width="${STROKE_S-1}"/>
        <line x1="208" y1="270" x2="208" y2="280" stroke="${INK}" stroke-width="2"/>` },
    { id:'m9', label:'Tongue2', body: () => `
        <ellipse cx="200" cy="262" rx="22" ry="12" fill="#5a1818" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <path d="M192,272 Q200,300 208,272 Z" fill="#ff5b8a" stroke="${INK}" stroke-width="${STROKE_S-1}"/>` },
    { id:'m10', label:'Smirk', body: () => `<path d="M174,266 Q200,272 226,252" stroke="${INK}" stroke-width="${STROKE_M+1}" fill="none" stroke-linecap="round"/>` },
    { id:'m11', label:'Flat', body: () => `<line x1="174" y1="262" x2="226" y2="262" stroke="${INK}" stroke-width="${STROKE_M+1}" stroke-linecap="round"/>` },
    { id:'m12', label:'Whistle', body: () => `<ellipse cx="200" cy="262" rx="6" ry="9" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'m13', label:'Zipper', body: () => `
        <line x1="170" y1="262" x2="230" y2="262" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <g stroke="${INK}" stroke-width="2">
          <line x1="174" y1="258" x2="174" y2="266"/>
          <line x1="182" y1="258" x2="182" y2="266"/>
          <line x1="190" y1="258" x2="190" y2="266"/>
          <line x1="198" y1="258" x2="198" y2="266"/>
          <line x1="206" y1="258" x2="206" y2="266"/>
          <line x1="214" y1="258" x2="214" y2="266"/>
          <line x1="222" y1="258" x2="222" y2="266"/>
        </g>` },
    { id:'m14', label:'Bandaid', body: () => `
        <rect x="172" y="258" width="56" height="14" rx="3" fill="#f4d8b8" stroke="${INK}" stroke-width="${STROKE_S-1}"/>
        <g fill="${INK}" opacity=".4">
          <circle cx="180" cy="262" r="0.8"/><circle cx="180" cy="268" r="0.8"/>
          <circle cx="220" cy="262" r="0.8"/><circle cx="220" cy="268" r="0.8"/>
        </g>` },
  ];

  const NOSES = [
    { id:'n0', label:'None', body: () => '' },
    { id:'n1', label:'L-Line', body: () => `<path d="M200,178 L188,228 L210,231" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` },
    { id:'n2', label:'Curve', body: () => `<path d="M198,200 Q188,225 200,232 Q212,234 218,226" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linecap="round"/>` },
    { id:'n3', label:'Bump', body: () => `<path d="M192,210 Q200,228 214,228" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linecap="round"/>` },
    { id:'n4', label:'Dot', body: () => `<circle cx="194" cy="222" r="3" fill="${INK}"/><circle cx="208" cy="222" r="3" fill="${INK}"/>` },
    { id:'n5', label:'Round', body: () => `<ellipse cx="200" cy="222" rx="12" ry="8" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'n6', label:'Point', body: () => `<path d="M200,192 L192,228 L210,228 Z" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linejoin="round"/>` },
    { id:'n7', label:'Wide', body: () => `
        <path d="M186,222 Q200,234 214,222" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linecap="round"/>
        <circle cx="190" cy="220" r="2" fill="${INK}"/>
        <circle cx="210" cy="220" r="2" fill="${INK}"/>` },
    { id:'n8', label:'Pig', body: () => `
        <ellipse cx="200" cy="222" rx="14" ry="10" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <ellipse cx="194" cy="222" rx="2" ry="3" fill="${INK}"/>
        <ellipse cx="206" cy="222" rx="2" ry="3" fill="${INK}"/>` },
    { id:'n9', label:'Ring', body: () => `
        <path d="M200,178 L188,228 L210,231" stroke="${INK}" stroke-width="${STROKE_M-1}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="216" cy="226" r="4" fill="none" stroke="#ffd400" stroke-width="2"/>` },
  ];

  const BEARDS = [
    { id:'mu0', label:'None', body: () => '' },
    { id:'mu1', label:'Soul', body: c => `<path d="M192,288 Q200,275 208,288 Q204,302 200,310 Q196,302 192,288 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}" stroke-linejoin="round"/>` },
    { id:'mu2', label:'Stash', body: c => `<path d="M168,250 Q186,238 200,247 Q214,238 232,250 Q220,262 200,256 Q180,262 168,250 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'mu3', label:'Curl', body: c => `<path d="M162,250 Q180,236 200,248 Q220,236 238,250 Q232,256 222,250 Q200,256 178,250 Q168,256 162,250 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'mu4', label:'Goatee', body: c => `<path d="M178,278 Q200,300 222,278 Q224,308 200,318 Q176,308 178,278 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'mu5', label:'Full', body: c => `
        <path d="M148,250 Q156,310 200,320 Q244,310 252,250 Q230,275 200,272 Q170,275 148,250 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <path d="M168,250 Q186,238 200,247 Q214,238 232,250 Q220,260 200,256 Q180,260 168,250 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'mu6', label:'Long', body: c => `
        <path d="M152,248 Q160,330 200,340 Q240,330 248,248 Q230,275 200,272 Q170,275 152,248 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <path d="M168,250 Q186,238 200,247 Q214,238 232,250 Q220,260 200,256 Q180,260 168,250 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'mu7', label:'Chin', body: c => `<path d="M180,294 Q200,310 220,294 Q220,318 200,322 Q180,318 180,294 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
  ];

  const GLASSES = [
    { id:'g0', label:'None', body: () => '' },
    { id:'g1', label:'Round', body: () => `
        <circle cx="158" cy="182" r="22" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <circle cx="242" cy="182" r="22" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="180" y1="182" x2="220" y2="182" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'g2', label:'Square', body: () => `
        <rect x="134" y="164" width="50" height="36" rx="4" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <rect x="216" y="164" width="50" height="36" rx="4" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="184" y1="182" x2="216" y2="182" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'g3', label:'Sun', body: () => `
        <rect x="134" y="164" width="50" height="36" rx="6" fill="${INK}" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <rect x="216" y="164" width="50" height="36" rx="6" fill="${INK}" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="184" y1="182" x2="216" y2="182" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'g4', label:'Aviator', body: () => `
        <path d="M134,170 L184,170 L182,200 Q170,210 158,210 Q140,210 134,200 Z" fill="rgba(255,212,0,.4)" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M266,170 L216,170 L218,200 Q230,210 242,210 Q260,210 266,200 Z" fill="rgba(255,212,0,.4)" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="184" y1="180" x2="216" y2="180" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'g5', label:'Heart', body: () => `
        <path d="M138,170 Q138,158 150,158 Q158,158 158,168 Q158,158 166,158 Q178,158 178,170 Q178,184 158,200 Q138,184 138,170 Z" fill="none" stroke="#ee3b6f" stroke-width="${STROKE_M-1}"/>
        <path d="M222,170 Q222,158 234,158 Q242,158 242,168 Q242,158 250,158 Q262,158 262,170 Q262,184 242,200 Q222,184 222,170 Z" fill="none" stroke="#ee3b6f" stroke-width="${STROKE_M-1}"/>` },
    { id:'g6', label:'Star', body: () => `
        <path d="M158,158 L163,176 L182,176 L168,186 L173,202 L158,192 L143,202 L148,186 L134,176 L153,176 Z" fill="#ffd400" stroke="${INK}" stroke-width="${STROKE_S}"/>
        <path d="M242,158 L247,176 L266,176 L252,186 L257,202 L242,192 L227,202 L232,186 L218,176 L237,176 Z" fill="#ffd400" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'g7', label:'Mono', body: () => `
        <circle cx="242" cy="182" r="24" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="265" y1="200" x2="284" y2="226" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'g8', label:'Cat', body: () => `
        <path d="M132,180 Q132,164 158,164 Q182,164 184,178 L176,200 L142,200 Z" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M216,178 Q218,164 242,164 Q268,164 268,180 L258,200 L224,200 Z" fill="none" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <line x1="184" y1="182" x2="216" y2="182" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'g9', label:'Eyepatch', body: () => `
        <path d="M138,164 Q150,158 178,162 L182,200 Q168,212 144,206 Z" fill="${INK}"/>
        <line x1="138" y1="158" x2="270" y2="170" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
  ];

  const HATS = [
    { id:'ht0', label:'None', body: () => '' },
    { id:'ht1', label:'Cap', body: c => `
        <path d="M120,90 Q126,52 200,52 Q274,52 280,90 L280,108 L120,108 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <path d="M280,98 Q330,104 326,118 L280,118 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>` },
    { id:'ht2', label:'Beanie', body: c => `
        <path d="M126,108 Q126,38 200,38 Q274,38 274,108 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <rect x="120" y="100" width="160" height="18" rx="4" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <path d="M150,75 L160,75 M170,55 L180,55 M200,42 L210,42" stroke="${INK}" stroke-width="2" opacity=".4"/>` },
    { id:'ht3', label:'Pom', body: c => `
        <path d="M126,108 Q126,42 200,42 Q274,42 274,108 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <rect x="120" y="100" width="160" height="18" rx="4" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <circle cx="200" cy="32" r="16" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'ht4', label:'Top', body: c => `
        <rect x="150" y="14" width="100" height="84" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <rect x="120" y="92" width="160" height="18" rx="4" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <rect x="150" y="60" width="100" height="6" fill="#ee3b6f"/>` },
    { id:'ht5', label:'Crown', body: c => `
        <path d="M138,108 L138,52 L168,80 L188,32 L200,72 L212,32 L232,80 L262,52 L262,108 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <circle cx="168" cy="82" r="4" fill="#ee3b6f"/>
        <circle cx="200" cy="74" r="4" fill="#3aa0ff"/>
        <circle cx="232" cy="82" r="4" fill="#22b573"/>` },
    { id:'ht6', label:'Bow', body: c => `
        <path d="M160,72 Q174,52 200,68 Q226,52 240,72 Q226,90 200,80 Q174,90 160,72 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <circle cx="200" cy="74" r="6" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'ht7', label:'Santa', body: c => `
        <path d="M124,114 Q138,32 230,52 L264,90 Q288,108 270,114 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <rect x="120" y="106" width="160" height="18" rx="4" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <circle cx="270" cy="46" r="16" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M+1}"/>` },
    { id:'ht8', label:'Grad', body: c => `
        <rect x="134" y="76" width="132" height="22" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <polygon points="108,76 200,46 292,76 200,106" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <line x1="246" y1="60" x2="266" y2="100" stroke="#ffd400" stroke-width="${STROKE_S}"/>
        <circle cx="266" cy="100" r="5" fill="#ffd400" stroke="${INK}" stroke-width="2"/>` },
    { id:'ht9', label:'Phones', body: c => `
        <path d="M118,184 Q118,116 200,116 Q282,116 282,184" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round"/>
        <rect x="100" y="170" width="28" height="46" rx="8" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <rect x="272" y="170" width="28" height="46" rx="8" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M-1}"/>` },
    { id:'ht10', label:'Cap2', body: c => `
        <path d="M120,108 Q124,46 200,46 Q276,46 280,108 L280,114 L120,114 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_M+1}"/>
        <ellipse cx="200" cy="76" rx="22" ry="14" fill="#fff" stroke="${INK}" stroke-width="${STROKE_S}"/>
        <text x="200" y="82" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="16" fill="${INK}">★</text>` },
  ];

  function shirtBase(c) {
    return sp('M100,400 L100,360 Q100,330 160,320 L240,320 Q300,330 300,360 L300,400 Z', c, STROKE);
  }
  const SHIRTS = [
    { id:'s1', label:'Plain', body: c => shirtBase(c) },
    { id:'s2', label:'Skull', body: c => `
        ${shirtBase(c)}
        <g transform="translate(200,372)">
          <ellipse cx="0" cy="-2" rx="14" ry="13" fill="#fff"/>
          <rect x="-9" y="8" width="18" height="6" fill="#fff"/>
          <circle cx="-5" cy="-2" r="3" fill="${INK}"/>
          <circle cx="5" cy="-2" r="3" fill="${INK}"/>
          <path d="M-3,7 L-3,12 M0,7 L0,12 M3,7 L3,12" stroke="${INK}" stroke-width="1.6"/>
          <path d="M-2,4 L0,8 L2,4" fill="${INK}" stroke="none"/>
        </g>` },
    { id:'s3', label:'Vneck', body: c => `<path d="M100,400 L100,360 Q100,330 160,320 L186,320 L200,358 L214,320 L240,320 Q300,330 300,360 L300,400 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE}"/>` },
    { id:'s4', label:'Stripe', body: c => `
        ${shirtBase(c)}
        <line x1="100" y1="345" x2="300" y2="345" stroke="#fff" stroke-width="7"/>
        <line x1="100" y1="370" x2="300" y2="370" stroke="#fff" stroke-width="7"/>
        <line x1="100" y1="395" x2="300" y2="395" stroke="#fff" stroke-width="7"/>` },
    { id:'s5', label:'Hoodie', body: c => `
        <path d="M100,400 L100,355 Q100,322 154,316 Q160,296 200,296 Q240,296 246,316 Q300,322 300,355 L300,400 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE}"/>
        <path d="M162,316 Q200,360 238,316" fill="none" stroke="${INK}" stroke-width="${STROKE_M}"/>
        <line x1="195" y1="345" x2="195" y2="400" stroke="${INK}" stroke-width="${STROKE_S}"/>
        <line x1="205" y1="345" x2="205" y2="400" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'s6', label:'Suit', body: c => `
        ${shirtBase(c)}
        <path d="M158,322 L200,360 L242,322 L240,400 L160,400 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M-1}"/>
        <path d="M195,330 L205,330 L208,400 L192,400 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>
        <path d="M200,335 L194,348 L200,352 L206,348 Z" fill="#ee3b6f"/>` },
    { id:'s7', label:'Tank', body: c => `<path d="M115,400 L115,360 Q115,335 168,328 L182,320 L218,320 L232,328 Q285,335 285,360 L285,400 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE}"/>` },
    { id:'s8', label:'Heart', body: c => `
        ${shirtBase(c)}
        <path d="M200,388 L180,370 Q170,358 184,352 Q196,346 200,358 Q204,346 216,352 Q230,358 220,370 Z" fill="#ee3b6f" stroke="${INK}" stroke-width="${STROKE_S-1}"/>` },
    { id:'s9', label:'Polka', body: c => `
        ${shirtBase(c)}
        <g fill="#fff">
          <circle cx="140" cy="350" r="5"/><circle cx="180" cy="370" r="5"/>
          <circle cx="220" cy="350" r="5"/><circle cx="260" cy="370" r="5"/>
          <circle cx="160" cy="390" r="5"/><circle cx="240" cy="390" r="5"/>
        </g>` },
    { id:'s10', label:'Tie', body: c => `
        ${shirtBase('#fff')}
        <path d="M200,322 L186,330 L200,400 L214,330 Z" fill="${c}" stroke="${INK}" stroke-width="${STROKE_S}"/>` },
    { id:'s11', label:'Plaid', body: c => `
        ${shirtBase(c)}
        <g stroke="rgba(255,255,255,.3)" stroke-width="3">
          <line x1="100" y1="350" x2="300" y2="350"/>
          <line x1="100" y1="375" x2="300" y2="375"/>
          <line x1="160" y1="320" x2="160" y2="400"/>
          <line x1="240" y1="320" x2="240" y2="400"/>
        </g>` },
    { id:'s12', label:'Star', body: c => `
        ${shirtBase(c)}
        <path d="M200,346 L207,366 L228,366 L211,378 L218,398 L200,386 L182,398 L189,378 L172,366 L193,366 Z" fill="#ffd400" stroke="${INK}" stroke-width="${STROKE_S-1}"/>` },
  ];

  const TABS = [
    { id:'face',  label:'Face',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="16" cy="16" rx="8" ry="10"/><ellipse cx="7" cy="17" rx="2" ry="3"/><ellipse cx="25" cy="17" rx="2" ry="3"/></svg>`,
      items: FACE_SHAPES, palette:'skin' },
    { id:'hair',  label:'Hair',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6,18 Q6,6 16,6 Q26,6 26,18"/><path d="M8,18 Q12,12 16,16 Q22,12 24,18"/></svg>`,
      items: HAIR_STYLES, palette:'hair' },
    { id:'eyes',  label:'Eyes',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="16" cy="16" rx="11" ry="6"/><circle cx="16" cy="16" r="3" fill="currentColor"/></svg>`,
      items: EYES, palette:null },
    { id:'brows', label:'Brows',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5,18 L26,12"/></svg>`,
      items: BROWS, palette:null },
    { id:'mouth', label:'Mouth',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6,16 Q10,14 16,15 Q22,14 26,16 Q22,20 16,19 Q10,20 6,16 Z"/></svg>`,
      items: MOUTHS, palette:null },
    { id:'nose',  label:'Nose',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M16,8 L13,22 L19,22"/></svg>`,
      items: NOSES, palette:null },
    { id:'beard', label:'Beard',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6,12 Q9,10 14,12 Q16,11 18,12 Q23,10 26,12 Q22,15 18,13 Q16,14 14,13 Q10,15 6,12 Z"/></svg>`,
      items: BEARDS, palette:'beard' },
    { id:'glass', label:'Glasses',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="16" r="5"/><circle cx="23" cy="16" r="5"/><line x1="14" y1="16" x2="18" y2="16"/></svg>`,
      items: GLASSES, palette:null },
    { id:'hat',   label:'Hat',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5,22 Q6,12 16,12 Q26,12 27,22 Z"/><line x1="4" y1="22" x2="28" y2="22"/></svg>`,
      items: HATS, palette:'hat' },
    { id:'shirt', label:'Shirt',
      icon:`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6,28 L6,16 L11,12 L16,16 L21,12 L26,16 L26,28 Z"/></svg>`,
      items: SHIRTS, palette:'shirt' },
  ];

  const DEFAULT = {
    face:'f1', hair:'h4', eyes:'e1', brows:'b1', mouth:'m1', nose:'n1',
    beard:'mu0', glass:'g0', hat:'ht0', shirt:'s1',
    skin:'#f7c9a3', hairColor:'#1a1a1a', shirtColor:'#3aa0ff',
    beardColor:'#1a1a1a', hatColor:'#d64b3b',
  };

  function findItem(items, id) { return items.find(x => x.id === id) || items[0]; }

  function render(profile) {
    const p = Object.assign({}, DEFAULT, profile || {});
    // Back-fill new color fields from hairColor for older profiles that lack them
    const beardCol = p.beardColor || p.hairColor;
    const hatCol   = p.hatColor   || p.hairColor;
    const face  = findItem(FACE_SHAPES, p.face);
    const hair  = findItem(HAIR_STYLES, p.hair);
    const eyes  = findItem(EYES, p.eyes);
    const brows = findItem(BROWS, p.brows);
    const mouth = findItem(MOUTHS, p.mouth);
    const nose  = findItem(NOSES, p.nose);
    const beard = findItem(BEARDS, p.beard);
    const glass = findItem(GLASSES, p.glass);
    const hat   = findItem(HATS, p.hat);
    const shirt = findItem(SHIRTS, p.shirt);
    const inner = `
      ${shirt.body(p.shirtColor)}
      <path d="M178,288 L178,322 Q178,332 200,332 Q222,332 222,322 L222,288 Z" fill="${p.skin}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
      ${earsFor(face, p.skin)}
      ${face.body(p.skin)}
      ${beard.body(beardCol)}
      ${nose.body()}
      ${mouth.body()}
      ${eyes.body()}
      ${brows.body()}
      ${glass.body()}
      ${hair.body(p.hairColor)}
      ${hat.body(hatCol)}
    `;
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  // Builds a grid-cell preview for one part option
  function thumb(tabId, item, profile) {
    const p = Object.assign({}, DEFAULT, profile || {});
    const skin = p.skin;
    const hair = p.hairColor;
    const beardCol = p.beardColor || p.hairColor;
    const hatCol   = p.hatColor   || p.hairColor;
    const baseHead = `
      <path d="M${110-15},205 Q${110-17},183 110,183 L110,227 Q${110-17},227 ${110-15},205 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M}"/>
      <path d="M${290+15},205 Q${290+17},183 290,183 L290,227 Q${290+17},227 ${290+15},205 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M}"/>
      <path d="M120,170 Q120,88 200,88 Q280,88 280,170 L280,248 Q280,296 200,296 Q120,296 120,248 Z"
            fill="#fff" stroke="${INK}" stroke-width="${STROKE_M}"/>`;
    const baseShoulders = `<path d="M105,400 Q120,330 200,325 Q280,330 295,400 Z" fill="#fff" stroke="${INK}" stroke-width="${STROKE_M}"/>`;
    switch (tabId) {
      case 'face':  return `<svg viewBox="0 0 400 400">${earsFor(item, skin)}${item.body(skin)}</svg>`;
      case 'hair':  return `<svg viewBox="0 0 400 400">${baseHead}${item.body(hair)}${baseShoulders}</svg>`;
      case 'eyes':
      case 'brows':
      case 'mouth':
      case 'nose':
      case 'glass': return `<svg viewBox="0 0 400 400">${baseHead}${item.body()}${baseShoulders}</svg>`;
      case 'beard': return `<svg viewBox="0 0 400 400">${baseHead}${item.body(beardCol)}${baseShoulders}</svg>`;
      case 'hat':   return `<svg viewBox="0 0 400 400">${baseHead}${item.body(hatCol)}${baseShoulders}</svg>`;
      case 'shirt': return `<svg viewBox="0 0 400 400">${baseHead}${item.body(p.shirtColor)}</svg>`;
    }
    return '';
  }

  return {
    render, thumb, DEFAULT, TABS,
    FACE_SHAPES, HAIR_STYLES, EYES, BROWS, MOUTHS, NOSES, BEARDS, GLASSES, HATS, SHIRTS,
    SKIN_TONES, HAIR_COLORS, SHIRT_COLORS,
  };
})();
