let voices = [];
let unlocked = false;

function refresh() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}

if (window.speechSynthesis) {
  refresh();
  window.speechSynthesis.onvoiceschanged = refresh;
}

// iOS speelt pas audio af na een echte gebruikersinteractie.
export function unlock() {
  if (unlocked || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance("");
  u.volume = 0;
  window.speechSynthesis.speak(u);
  unlocked = true;
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

export function speak(text, locale, rate = 0.9) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice(locale);
  if (v) u.voice = v;
  u.lang = locale;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export function stop() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
