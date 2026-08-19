import { card, createCard, day, save, todayKey } from "./store.js";

const DAY = 86400000;
const MIN_EASE = 1.3;
const MAX_EASE = 2.9;
const MAX_INTERVAL = 365;

// Grades: 1 = opnieuw, 2 = moeilijk, 3 = goed, 4 = makkelijk
export function grade(c, g) {
  c.reps += 1;
  if (g === 1) {
    c.lapses += 1;
    c.ease = clamp(c.ease - 0.2, MIN_EASE, MAX_EASE);
    c.interval = 0;
    c.state = "learn";
    c.due = Date.now(); // opnieuw in deze sessie
    return c;
  }

  if (c.state === "new" || c.state === "learn" || c.interval < 1) {
    c.interval = g === 2 ? 1 : g === 3 ? 2 : 4;
  } else {
    const mult = g === 2 ? 1.2 : g === 3 ? c.ease : c.ease * 1.3;
    c.interval = Math.min(MAX_INTERVAL, c.interval * mult);
  }
  if (g === 2) c.ease = clamp(c.ease - 0.15, MIN_EASE, MAX_EASE);
  if (g === 4) c.ease = clamp(c.ease + 0.1, MIN_EASE, MAX_EASE);

  c.state = "review";
  const fuzz = 1 + (Math.random() * 0.1 - 0.05);
  c.due = Date.now() + Math.round(c.interval * fuzz * DAY);
  return c;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

// Welk oefentype past bij de rijpheid van deze kaart?
// Nieuw -> kennismaking, dan herkennen, dan produceren, dan luisteren/invullen.
export function exerciseFor(c) {
  if (c.state === "new" || c.reps === 0) return "intro";
  if (c.interval < 1) return "recognise";
  if (c.interval < 6) return "produce";
  return c.reps % 2 === 0 ? "listen" : "cloze";
}

export function isDue(c, at = Date.now()) {
  return c.due <= at;
}

// Bouwt de sessie: eerst herhalingen (die zijn de kern), daarna nieuwe items,
// door elkaar gemengd zodat je niet twintig nieuwe woorden achter elkaar krijgt.
export function buildSession(code, items, newPerDay) {
  const now = endOfToday();
  const due = [];
  for (const item of items) {
    const c = card(code, item.id);
    if (c && isDue(c, now)) due.push({ item, card: c });
  }
  shuffle(due);

  const alreadyNew = day(code).newCards;
  const budget = Math.max(0, newPerDay - alreadyNew);
  const fresh = [];
  for (const item of items) {
    if (fresh.length >= budget) break;
    if (!card(code, item.id)) fresh.push({ item, card: null });
  }

  return interleave(due, fresh);
}

function interleave(due, fresh) {
  if (fresh.length === 0) return due;
  if (due.length === 0) return fresh;
  const out = [];
  const gap = Math.max(1, Math.floor(due.length / fresh.length));
  let fi = 0;
  for (let i = 0; i < due.length; i++) {
    out.push(due[i]);
    if ((i + 1) % gap === 0 && fi < fresh.length) out.push(fresh[fi++]);
  }
  while (fi < fresh.length) out.push(fresh[fi++]);
  return out;
}

export function ensureCard(code, id) {
  return card(code, id) || createCard(code, id);
}

export function counts(code, items, newPerDay) {
  const now = endOfToday();
  let due = 0;
  let seen = 0;
  let mature = 0;
  for (const item of items) {
    const c = card(code, item.id);
    if (!c) continue;
    seen += 1;
    if (c.interval >= 21) mature += 1;
    if (isDue(c, now)) due += 1;
  }
  const budget = Math.max(0, newPerDay - day(code).newCards);
  const fresh = Math.min(budget, items.length - seen);
  return { due, fresh, seen, mature, total: items.length };
}

// Hoeveel herhalingen komen er de komende dagen aan?
export function forecast(code, items, days = 14) {
  const out = new Array(days).fill(0);
  const start = new Date();
  start.setHours(23, 59, 59, 999);
  for (const item of items) {
    const c = card(code, item.id);
    if (!c) continue;
    const diff = Math.ceil((c.due - start.getTime()) / DAY);
    const idx = Math.max(0, Math.min(days - 1, diff));
    out[idx] += 1;
  }
  return out;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export { save, todayKey };
