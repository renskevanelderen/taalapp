// Spraak. Het lastige aan de Web Speech API is niet de code maar iOS:
//
// 1. Safari op iPhone speelt alleen af als speak() draait binnen de directe
//    afhandeling van een tik. Alles wat via setTimeout een tel later komt,
//    wordt zonder foutmelding genegeerd. Vandaar: nooit uitstellen.
// 2. Een "ontgrendel"-zin vooraf in de wachtrij zetten werkt averechts — de
//    echte zin denkt dan dat er al iets loopt en breekt zichzelf af.
// 3. Stilte is stil. Er komt geen fout als het misgaat. Daarom houden we bij
//    of de stem ooit echt begonnen is, zodat het scherm dat kan vertellen.

let voices = [];
let lastError = "";
let everStarted = false;
let attempts = 0;
let retry = 0;

function refresh() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  return voices;
}

if (window.speechSynthesis) {
  refresh();
  window.speechSynthesis.onvoiceschanged = refresh;
}

// Alleen de stemmenlijst vast opwarmen. Bewust géén zin in de wachtrij: dat
// was precies wat het geluid op de iPhone om zeep hielp.
export function unlock() {
  refresh();
}

function pickVoice(locale) {
  if (!voices.length) refresh();
  const base = locale.slice(0, 2);
  const norm = (v) => v.lang.replace("_", "-");
  return (
    voices.find((v) => norm(v) === locale && v.localService) ||
    voices.find((v) => norm(v) === locale) ||
    voices.find((v) => norm(v).startsWith(base)) ||
    null
  );
}

export function available(locale) {
  return !!window.speechSynthesis && !!pickVoice(locale);
}

// Lege string = niets aan de hand. Anders een zin die je op je iPhone verder
// helpt, niet een technische foutcode.
export function status(locale) {
  if (!window.speechSynthesis) return "Deze browser kan geen spraak afspelen.";
  if (!pickVoice(locale))
    return `Er staat geen ${locale.startsWith("fr") ? "Franse" : "Spaanse"} stem op je telefoon. Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen → taal toevoegen.`;
  if (lastError) return `De spraakmotor gaf een fout: ${lastError}.`;
  if (attempts > 0 && !everStarted)
    return "De zin is naar de stem gestuurd, maar die begon nooit te praten. Dat is bijna altijd de zijschakelaar op je iPhone: zet de stille stand uit en draai het volume omhoog terwijl je op de knop tikt.";
  return "";
}

// Wat weet de app op dit moment? Voor het diagnosekaartje op Vandaag.
export function diagnose(locale) {
  const v = pickVoice(locale);
  return {
    ondersteund: !!window.speechSynthesis,
    stemmen: voices.length,
    stem: v ? `${v.name} (${v.lang})` : null,
    lokaal: v ? !!v.localService : false,
    pogingen: attempts,
    ooitGestart: everStarted,
    fout: lastError,
  };
}

export function speak(text, locale, rate = 0.9) {
  const s = window.speechSynthesis;
  if (!s || !text) return;
  clearTimeout(retry);

  const make = () => {
    const u = new SpeechSynthesisUtterance(String(text));
    const v = pickVoice(locale);
    if (v) u.voice = v;
    u.lang = locale;
    u.rate = rate;
    u.volume = 1;
    u.pitch = 1;
    u.onstart = () => {
      everStarted = true;
      lastError = "";
    };
    u.onerror = (e) => {
      const err = e && e.error;
      // Deze twee horen erbij als je snel doorklikt; dat is geen storing.
      if (err && err !== "interrupted" && err !== "canceled") lastError = err;
    };
    return u;
  };

  attempts += 1;
  // Synchroon, binnen de tik. cancel() mag hier: het ruimt een vorige zin op
  // zonder de gebruikersinteractie te verbreken.
  try {
    s.cancel();
    s.speak(make());
    if (s.paused) s.resume();
  } catch (e) {
    lastError = String((e && e.message) || e);
  }

  // Safari vuurt onstart niet altijd betrouwbaar af. Als de motor zichzelf
  // "aan het praten" noemt, tellen we dat net zo goed als bewijs — anders
  // beschuldigt het diagnosekaartje de telefoon van iets wat niet aan de hand is.
  let peil = 0;
  const kijk = setInterval(() => {
    if (s.speaking) everStarted = true;
    if (everStarted || ++peil > 30) clearInterval(kijk);
  }, 100);

  // Chrome laat een zin die direct na cancel() komt soms vallen. Eén herkansing
  // een kwart seconde later. Op iOS is de motor dan al wakker van de tik hierboven,
  // dus die tweede poging mag wel uit een timer komen.
  retry = setTimeout(() => {
    if (!s.speaking && !s.pending) {
      try {
        s.speak(make());
        if (s.paused) s.resume();
      } catch (e) {
        lastError = String((e && e.message) || e);
      }
    }
  }, 250);
}

export function stop() {
  clearTimeout(retry);
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
