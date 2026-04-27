// Tiny Web Speech wrapper.
// Prefers an en-GB female voice (like the Edge "Sonia / Libby" family).
// Falls back gracefully through en-NZ → en-AU → any English voice.
(() => {
  let cached = null;
  function loadVoices() {
    return new Promise((resolve) => {
      const v = speechSynthesis.getVoices();
      if (v && v.length) { cached = v; resolve(v); return; }
      speechSynthesis.onvoiceschanged = () => { cached = speechSynthesis.getVoices(); resolve(cached); };
      setTimeout(() => resolve(speechSynthesis.getVoices()), 1500);
    });
  }
  function pickVoice(voices, opts={}) {
    const wantFemale = opts.gender !== 'male';
    if (!voices || !voices.length) return null;
    const femaleNames = /(female|sonia|libby|hollie|olivia|amy|emma|maisie|abby|ada|jenny|aria|emily|natasha|molly|isla)/i;
    const maleNames   = /(male|ryan|thomas|brian|guy|william|connor|mitchell|liam)/i;
    const matchGender = (n) => wantFemale ? femaleNames.test(n) : maleNames.test(n);
    // 1) en-GB + matching gender
    let v = voices.find(x => /en[-_]GB/i.test(x.lang) && matchGender(x.name)); if (v) return v;
    // 2) any en-GB
    v = voices.find(x => /en[-_]GB/i.test(x.lang)); if (v) return v;
    // 3) en-NZ then en-AU + matching gender
    v = voices.find(x => /en[-_]NZ/i.test(x.lang) && matchGender(x.name)); if (v) return v;
    v = voices.find(x => /en[-_]NZ/i.test(x.lang)); if (v) return v;
    v = voices.find(x => /en[-_]AU/i.test(x.lang) && matchGender(x.name)); if (v) return v;
    v = voices.find(x => /en[-_]AU/i.test(x.lang)); if (v) return v;
    // 4) any English
    v = voices.find(x => /^en/i.test(x.lang)); return v || voices[0];
  }

  let lastUtter = null;
  function stop() {
    try { speechSynthesis.cancel(); } catch(e){}
    lastUtter = null;
  }
  async function speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) return;
    stop();
    const voices = await loadVoices();
    const voice = pickVoice(voices, opts);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'en-GB'; }
    u.rate  = opts.rate  ?? 0.95;
    u.pitch = opts.pitch ?? 1.05;
    u.volume = opts.volume ?? 1;
    if (typeof opts.onend === 'function') u.onend = opts.onend;
    lastUtter = u;
    speechSynthesis.speak(u);
  }

  window.TTS = { speak, stop, loadVoices };
})();
