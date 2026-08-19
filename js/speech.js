let voices = [];
let unlocked = false;
let timer = 0;
let lastError = "";

function refresh() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}

if (window.speechSynthesis) {
  refresh();
  window.speechSynthesis.onvoiceschanged = refresh;
}

// iOS speelt pas audio af na een echte gebruikersinteractie. Belangrijk:
// Safari negeert een utterance met een lege tekst, dus die ontgrendelt niets.
// Eén spatie op volume 0 hoor je niet, maar telt wél als "er is gesproken".
export function unlock() {
  if (unlocked || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(" ");
  u.volume = 0;
  u.rate = 1;
  try {
    window.speechSynthesis.speak(u);
    unlocked = true;
  } catch (e) {
    lastError = String((e && e.message) || e);
  }
  refresh();
}

function pickVoice(locale) {
  if (!voices.length) refresh();
  const base = locale.slice(0, 2);
  return (
    voices.find((v) => v.lang.replace("_", "-") === locale && v.localService) ||
    voices.find((v) => v.lang.replace("_", "-") === locale) ||
    voices.find((v) => v.lang.startsWith(base)) ||
    null
  );
}

export function available(locale) {
  return !!window.speechSynthesis && !!pickVoice(locale);
}

// Korte Nederlandse uitleg als er niets te horen valt; lege string = alles ok.
export function status(locale) {
  if (!window.speechSynthesis) return "Deze browser kan geen spraak afspelen.";
  if (!pickVoice(locale))
    return "Geen stem voor deze taal gevonden. Op iPhone: Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen.";
  if (lastError) return `De spraakmotor gaf een fout: ${lastError}.`;
  return "";
}

export function speak(text, locale, rate = 0.9) {
  const s = window.speechSynthesis;
  if (!s || !text) return;
  clearTimeout(timer);

  const go = () => {
    const u = new SpeechSynthesisUtterance(String(text));
    const v = pickVoice(locale);
    if (v) u.voice = v;
    u.lang = locale;
    u.rate = rate;
    u.volume = 1;
    u.onstart = () => {
      lastError = "";
    };
    u.onerror = (e) => {
      const err = e && e.error;
      // "interrupted"/"canceled" zijn normaal als je snel doorklikt.
      if (err && err !== "interrupted" && err !== "canceled") lastError = err;
    };
    try {
      s.speak(u);
    } catch (e) {
      lastError = String((e && e.message) || e);
    }
    // Chrome en Safari laten de motor na een cancel soms op pauze staan.
    if (s.paused) s.resume();
  };

  // cancel() direct gevolgd door speak() wordt in Chrome/Safari regelmatig
  // stilzwijgend genegeerd. Alleen annuleren als er echt iets loopt, en dan
  // een tik wachten.
  if (s.speaking || s.pending) {
    s.cancel();
    timer = setTimeout(go, 120);
  } else {
    go();
  }
}

export function stop() {
  clearTimeout(timer);
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
