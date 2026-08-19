const KEY = "taalapp.v1";

const DEFAULTS = () => ({
  version: 1,
  createdAt: new Date().toISOString(),
  settings: { newPerDay: 5, activeLang: "fr" },
  langs: {
    fr: newLangState(),
    es: newLangState(),
  },
});

function newLangState() {
  return { cards: {}, days: {}, writing: [] };
}

export function todayKey(d = new Date()) {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS();
    const parsed = JSON.parse(raw);
    for (const code of ["fr", "es"]) {
      if (!parsed.langs[code]) parsed.langs[code] = newLangState();
      parsed.langs[code].writing ||= [];
      parsed.langs[code].days ||= {};
      parsed.langs[code].cards ||= {};
    }
    parsed.settings ||= { newPerDay: 5, activeLang: "fr" };
    return parsed;
  } catch {
    return DEFAULTS();
  }
}

export function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function get() {
  return state;
}

export function lang(code) {
  return state.langs[code];
}

export function card(code, id) {
  return state.langs[code].cards[id] || null;
}

export function createCard(code, id) {
  const c = {
    id,
    state: "new",
    interval: 0,
    ease: 2.4,
    reps: 0,
    lapses: 0,
    due: Date.now(),
    introduced: todayKey(),
  };
  state.langs[code].cards[id] = c;
  return c;
}

export function day(code, key = todayKey()) {
  const d = state.langs[code].days;
  d[key] ||= { reviews: 0, newCards: 0, correct: 0, seconds: 0 };
  return d[key];
}

export function logReview(code, { isNew, correct, seconds }) {
  const d = day(code);
  d.reviews += 1;
  if (isNew) d.newCards += 1;
  if (correct) d.correct += 1;
  d.seconds += Math.min(seconds || 0, 120);
  save();
}

// Streak = aantal opeenvolgende dagen tot en met vandaag (of gisteren) met activiteit
// in minstens één taal.
export function streak() {
  const active = new Set();
  for (const code of ["fr", "es"]) {
    for (const [k, v] of Object.entries(state.langs[code].days)) {
      if (v.reviews > 0) active.add(k);
    }
  }
  if (active.size === 0) return 0;
  let n = 0;
  const cursor = new Date();
  if (!active.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (active.has(todayKey(cursor))) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function setActiveLang(code) {
  state.settings.activeLang = code;
  save();
}

export function setNewPerDay(n) {
  state.settings.newPerDay = Math.max(0, Math.min(30, n));
  save();
}

export function addWriting(code, entry) {
  state.langs[code].writing.unshift(entry);
  state.langs[code].writing = state.langs[code].writing.slice(0, 400);
  save();
}

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (!parsed || !parsed.langs) throw new Error("Onherkenbaar back-upbestand.");
  state = parsed;
  for (const code of ["fr", "es"]) {
    if (!state.langs[code]) state.langs[code] = newLangState();
  }
  save();
}

export function resetAll() {
  state = DEFAULTS();
  save();
}
