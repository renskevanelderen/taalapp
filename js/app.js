import * as store from "./store.js";
import * as srs from "./srs.js";
import * as speech from "./speech.js";
import { check, parseSentence } from "./check.js";
import { plan, promptForDay } from "./plan.js";
import { review, buildVocab } from "./review.js";
import * as FR from "../data/fr.js";
import * as ES from "../data/es.js";
import * as FRX from "../data/fr-extra.js";
import * as ESX from "../data/es-extra.js";
import * as FREQ_FR from "../data/freq-fr.js";
import * as FREQ_ES from "../data/freq-es.js";

// Decks bestaan uit meerdere bestanden, zodat er content bij kan zonder
// dat de bestaande bestanden onhandelbaar groot worden.
function buildDeck(base, ...packs) {
  return {
    meta: base.meta,
    items: [base, ...packs].flatMap((p) => p.items || []),
    verbs: [base, ...packs].flatMap((p) => p.verbs || []),
  };
}

const DECKS = { fr: buildDeck(FR, FRX), es: buildDeck(ES, ESX) };

// De frequentielijst staat naast het deck, niet erin. Pas als je een woord
// aantikt wordt er een kaart van gemaakt.
const FREQ = { fr: FREQ_FR.words, es: FREQ_ES.words };
const SOORT = {
  w: ["🏃", "werkwoord"],
  z: ["🎒", "zelfstandig nw"],
  b: ["🎨", "bijvoeglijk nw"],
  f: ["🔗", "functiewoord"],
};

function freqId(index) {
  return `${code}-f${String(index).padStart(4, "0")}`;
}

// Een woord uit de lijst gedraagt zich verder als elke andere kaart, alleen
// zonder voorbeeldzin. De oefening past zich daarop aan.
function freqItem(index) {
  const [target, nl, soort] = FREQ[code][index];
  return {
    id: freqId(index),
    target,
    nl,
    s: null,
    sNl: "",
    theme: "woordenlijst",
    soort,
    picked: true,
  };
}
const ACCENTS = {
  fr: ["à", "â", "ç", "é", "è", "ê", "ë", "î", "ï", "ô", "û", "ù", "œ"],
  es: ["á", "é", "í", "ó", "ú", "ü", "ñ", "¿", "¡"],
};

// Elke taal krijgt een eigen gezicht: vlag, tekening en achtergrondkleur
// voor de statusbalk van iOS.
const LOOK = {
  fr: { flag: "🇫🇷", doodle: "🥐", doodles: ["🥐", "🗼", "🧀", "🚲", "☕️"], bg: "#f4f7ff" },
  es: { flag: "🇪🇸", doodle: "🍊", doodles: ["🍊", "☀️", "🥘", "💃", "🫒"], bg: "#fff8ee" },
};

// Emoji per onderwerp — puur om een kaart in één oogopslag te plaatsen.
const THEME = {
  bouwstenen: ["🧱", "Bouwstenen"],
  reizen: ["✈️", "Reizen"],
  overnachten: ["🛏️", "Overnachten"],
  eten: ["🍽️", "Eten & drinken"],
  winkelen: ["🛒", "Winkelen"],
  oriëntatie: ["🧭", "De weg vragen"],
  smalltalk: ["💬", "Smalltalk"],
  mening: ["🤔", "Mening geven"],
  problemen: ["🆘", "Problemen"],
  spreektaal: ["😎", "Spreektaal"],
  getallen: ["🔢", "Getallen"],
  tijd: ["🕰️", "Tijd"],
  eigenschappen: ["🎨", "Eigenschappen"],
  werkwoorden: ["🏃", "Werkwoorden"],
  dingen: ["🎒", "Dingen"],
  huis: ["🏠", "Thuis"],
  stad: ["🏙️", "In de stad"],
  mensen: ["👨‍👩‍👧", "Mensen"],
  lichaam: ["🫀", "Lichaam & gezondheid"],
  natuur: ["🌳", "Natuur"],
  werk: ["💼", "Werk"],
  uitdrukkingen: ["🗣️", "Uitdrukkingen"],
  woordenlijst: ["📚", "Uit de woordenlijst"],
};

// Hoort er bij dit woord een vervoegingstabel? Dan tonen we die zodra
// het antwoord zichtbaar is — vervoegen leer je in context, niet los.
function conjTable(item) {
  const inf = String(item.target).split(" / ")[0].trim();
  const v = deck().verbs.find((x) => x.inf === inf);
  if (!v) return "";
  const { present, passe, futur } = v.tenses;
  const rows = present
    .map(
      (_, i) =>
        `<tr><td>${esc(present[i])}</td><td>${esc(passe[i])}</td><td>${esc(futur[i])}</td></tr>`,
    )
    .join("");
  return `
    <details class="conjwrap">
      <summary>📐 Vervoeging van <b>${esc(v.inf)}</b></summary>
      <table class="conj">
        <tr><th>nu</th><th>voltooid</th><th>straks</th></tr>
        ${rows}
      </table>
      ${v.note ? `<p class="note">${esc(v.note)}</p>` : ""}
    </details>`;
}

function themeChip(t) {
  const [ico, label] = THEME[t] || ["📎", t];
  return `<span class="themechip">${ico} ${esc(label)}</span>`;
}

// Wisselt per dag, zodat het scherm niet elke dag hetzelfde is.
function doodleOfDay() {
  const list = LOOK[code].doodles;
  const n = store.todayKey().split("-").join("") | 0;
  return list[n % list.length];
}

const app = document.getElementById("app");
let view = "today";
let code = store.get().settings.activeLang || "fr";
let session = null;

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

// Het deck = de samengestelde inhoud plus de woorden die jij zelf uit de
// frequentielijst hebt geplukt. Elke keer opnieuw opgebouwd, zodat een
// toevoeging meteen meetelt in de sessie van vandaag.
function deck() {
  const base = DECKS[code];
  const added = store.lang(code).added;
  if (!added.length) return base;
  return {
    meta: base.meta,
    verbs: base.verbs,
    items: base.items.concat(added.filter((i) => FREQ[code][i]).map(freqItem)),
  };
}

// De hele styling hangt aan data-lang op <html>: kleuren, lettertype,
// hoekafronding en achtergrondpatroon wisselen mee met de taal.
function setTheme() {
  document.documentElement.dataset.lang = code;
  const meta = document.getElementById("themecolor");
  if (meta) meta.setAttribute("content", LOOK[code].bg);
}

// ---------------------------------------------------------------- chrome

function renderChrome() {
  document.getElementById("langswitch").innerHTML = ["fr", "es"]
    .map(
      (c) =>
        `<button data-lang="${c}" class="${c === code ? "on" : ""}"><span class="flag">${LOOK[c].flag}</span>${DECKS[c].meta.name}</button>`,
    )
    .join("");

  const n = store.streak();
  document.getElementById("streak").innerHTML = n
    ? `<span>${n >= 7 ? "🔥" : "✨"}</span><b>${n}</b> ${n === 1 ? "dag" : "dagen"}`
    : "<span>🌱</span> nog geen reeks";

  for (const b of document.querySelectorAll("#tabs button")) {
    b.classList.toggle("on", b.dataset.view === view);
  }
}

document.getElementById("langswitch").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  code = b.dataset.lang;
  store.setActiveLang(code);
  session = null;
  render();
});

document.getElementById("tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  view = b.dataset.view;
  render();
});

function render() {
  setTheme();
  renderChrome();
  speech.stop();
  window.scrollTo(0, 0);
  if (view === "today") return session ? renderCard() : renderToday();
  if (view === "words") return renderWords();
  if (view === "write") return renderWrite();
  if (view === "plan") return renderPlan();
  if (view === "stats") return renderStats();
}

// ---------------------------------------------------------------- vandaag

function renderToday() {
  const items = deck().items;
  const perDay = store.get().settings.newPerDay;
  const c = srs.counts(code, items, perDay);
  const d = store.day(code);
  const other = code === "fr" ? "es" : "fr";
  const otherDone = store.day(other).reviews > 0;

  const total = c.due + c.fresh;

  app.innerHTML = `
    <div class="hero">
      <span class="doodle">${doodleOfDay()}</span>
      <h1>${LOOK[code].flag} ${deck().meta.name}</h1>
      <p class="sub">${
        total === 0
          ? "Alles gedaan. Je herhalingen staan gepland voor later."
          : `${total} ${total === 1 ? "kaart" : "kaarten"}, ongeveer ${Math.max(1, Math.round(total * 0.2))} minuten.`
      }</p>
    </div>

    <div class="stats-row">
      <div class="stat"><span class="ico">🔁</span><b>${c.due}</b><span>te herhalen</span></div>
      <div class="stat"><span class="ico">🌱</span><b>${c.fresh}</b><span>nieuw</span></div>
      <div class="stat"><span class="ico">✅</span><b>${d.reviews}</b><span>vandaag gedaan</span></div>
    </div>

    ${
      total > 0
        ? `<button class="btn primary" id="start">Sessie starten</button>`
        : `<div class="card"><h3>🎉 Klaar voor vandaag</h3><p class="small muted">Doe de schrijfopdracht als je nog even door wilt, of pak de andere taal op.</p></div>`
    }

    ${
      c.due > 0 && c.fresh > 0
        ? `<p class="small muted" style="margin-top:12px">Krappe dag? Doe alleen de ${c.due} herhalingen — die houden je deck overeind. Nieuwe woorden mogen wachten.</p>`
        : ""
    }

    <div class="card flat" style="margin-top:20px">
      <h3>🔊 Geluid</h3>
      <p class="small muted" style="margin:0 0 10px">Hoor je niets tijdens het oefenen? Tik hier. Daarna staat hieronder wat de app aan jouw kant ziet gebeuren.</p>
      <button class="btn ghost speak" data-probe="1" data-say="${esc(code === "fr" ? "Bonjour, comment ça va ?" : "Hola, ¿qué tal?")}">Test het geluid</button>
      <div id="sounddiag" class="small muted" style="margin-top:10px"></div>
    </div>

    <div class="card flat" style="margin-top:20px">
      <h3>${LOOK[other].flag} ${DECKS[other].meta.name}</h3>
      <p class="small muted" style="margin:0">${
        otherDone
          ? "Vandaag al gedaan. Mooi."
          : "Nog niet gedaan vandaag. Doe deze bij voorkeur op een ander moment van de dag — dat scheelt verwarring tussen de twee talen."
      }</p>
    </div>
  `;

  wireSpeak(deck().meta.locale);

  const start = document.getElementById("start");
  if (start) {
    start.addEventListener("click", () => {
      speech.unlock();
      const queue = srs.buildSession(code, items, perDay);
      if (!queue.length) return;
      session = { queue, pos: 0, done: 0, right: 0, size: queue.length, t: Date.now() };
      renderCard();
    });
  }
}

// ---------------------------------------------------------------- sessie

function current() {
  return session.queue[session.pos];
}

function renderCard() {
  if (!session || session.pos >= session.queue.length) return finishSession();
  window.scrollTo(0, 0);

  const { item } = current();
  const card = srs.ensureCard(code, item.id);
  const isNew = card.state === "new" && card.reps === 0;
  const parsed = parseSentence(item.s);
  // Zonder voorbeeldzin bestaat er geen cloze- of luisteroefening; die kaarten
  // blijven bij herkennen en produceren.
  let type = srs.exerciseFor(card);
  if (parsed.empty && (type === "cloze" || type === "listen")) type = "produce";
  const locale = deck().meta.locale;
  session.t = Date.now();

  const bar = `<div class="progress"><i style="width:${(session.done / session.size) * 100}%"></i></div>`;

  const sentenceFull = parsed.empty
    ? ""
    : `
    <p class="sentence">${parsed.before}<mark>${parsed.span}</mark>${parsed.after}</p>
    <p class="sentence-nl">${esc(item.sNl)}</p>`;

  const speakRow = parsed.empty
    ? `
    <div class="speak-row">
      <button class="speak" data-say="${esc(item.target)}">Woord</button>
      <button class="speak" data-say="${esc(item.target)}" data-slow="1">Langzaam</button>
    </div>`
    : `
    <div class="speak-row">
      <button class="speak" data-say="${esc(item.target)}">Woord</button>
      <button class="speak" data-say="${esc(parsed.plain)}">Zin</button>
      <button class="speak" data-say="${esc(parsed.plain)}" data-slow="1">Langzaam</button>
    </div>`;

  const note = (item.note ? `<p class="note">${item.note}</p>` : "") + conjTable(item);
  const chip = themeChip(item.theme);

  if (type === "intro") {
    app.innerHTML = `
      ${bar}
      <p class="prompt">🌱 Nieuw woord</p>
      <div class="card">
        ${chip}
        <p class="target">${esc(item.target)}</p>
        <p class="translation muted">${esc(item.nl)}</p>
        ${sentenceFull}
        ${speakRow}
        ${note}
      </div>
      <p class="small muted">${parsed.empty ? "Zeg het woord één keer hardop voor je verdergaat." : "Zeg de zin één keer hardop voor je verdergaat."}</p>
      <div class="row">
        <button class="btn ghost" data-grade="4">Dit kende ik al</button>
        <button class="btn primary" data-grade="3">Verder</button>
      </div>`;
    speech.speak(parsed.empty ? item.target : parsed.plain, locale);
    wireSpeak(locale);
    wireGrades(isNew, true);
    return;
  }

  if (type === "recognise") {
    app.innerHTML = `
      ${bar}
      <p class="prompt">🤔 Wat betekent dit?</p>
      <div class="card">
        ${chip}
        <p class="target">${esc(item.target)}</p>
        <div id="reveal" hidden>
          <p class="translation">${esc(item.nl)}</p>
          ${sentenceFull}
          ${note}
        </div>
        ${speakRow}
      </div>
      <button class="btn primary" id="show">Toon antwoord</button>
      <div id="grades" hidden>${gradeButtons(srs.ensureCard(code, item.id))}</div>`;
    speech.speak(item.target, locale);
    wireSpeak(locale);
    document.getElementById("show").addEventListener("click", () => {
      document.getElementById("reveal").hidden = false;
      document.getElementById("show").remove();
      document.getElementById("grades").hidden = false;
      if (!parsed.empty) speech.speak(parsed.plain, locale);
    });
    wireGrades(isNew, false);
    return;
  }

  // Typeoefeningen: produce, listen, cloze
  const answer = type === "produce" ? item.target : parsed.span;
  const heading =
    type === "produce"
      ? "✏️ Hoe zeg je dit?"
      : type === "listen"
        ? "🎧 Luister en typ wat je hoort"
        : "🧩 Vul de zin aan";

  const question =
    type === "produce"
      ? `<p class="target">${esc(item.nl)}</p>${item.sNl ? `<p class="sentence-nl">${esc(item.sNl)}</p>` : ""}`
      : type === "listen"
        ? `<p class="muted small">Typ het gemarkeerde deel van de zin.</p>
           <div class="speak-row"><button class="speak" data-say="${esc(parsed.plain)}">Opnieuw afspelen</button>
           <button class="speak" data-say="${esc(parsed.plain)}" data-slow="1">Langzaam</button></div>`
        : `<p class="sentence">${parsed.before}<span class="blank"></span>${parsed.after}</p>
           <p class="sentence-nl">${esc(item.sNl)}</p>`;

  app.innerHTML = `
    ${bar}
    <p class="prompt">${heading}</p>
    <div class="card">
      ${chip}
      ${question}
      <div style="margin-top:14px">
        <input type="text" id="answer" lang="${locale}" autocomplete="off"
               autocorrect="off" autocapitalize="none" spellcheck="false"
               placeholder="Typ in het ${deck().meta.name}">
        <div class="accents">${ACCENTS[code].map((a) => `<button data-ch="${a}">${a}</button>`).join("")}</div>
      </div>
    </div>
    <button class="btn primary" id="submit">Controleren</button>
    <div id="result"></div>`;

  if (type === "listen") speech.speak(parsed.plain, locale);
  wireSpeak(locale);

  const input = document.getElementById("answer");
  input.focus();

  document.querySelector(".accents").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    e.preventDefault();
    const p = input.selectionStart ?? input.value.length;
    input.value = input.value.slice(0, p) + b.dataset.ch + input.value.slice(input.selectionEnd ?? p);
    input.focus();
    input.setSelectionRange(p + 1, p + 1);
  });

  const submit = () => {
    const verdict = check(input.value, answer);
    input.disabled = true;
    document.getElementById("submit").remove();
    document.getElementById("result").innerHTML = `
      <div class="verdict ${verdict}">
        ${verdict === "goed" ? "Goed" : verdict === "bijna" ? "Bijna — let op de schrijfwijze" : "Niet goed"}
        <span class="answer">${esc(answer)}</span>
      </div>
      <div class="card">
        ${sentenceFull}
        ${speakRow}
        ${note}
      </div>
      ${gradeButtons(srs.ensureCard(code, item.id), verdict)}`;
    speech.speak(parsed.plain, locale);
    wireSpeak(locale);
    wireGrades(isNew, false);
  };

  document.getElementById("submit").addEventListener("click", submit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
  });
}

function gradeButtons(card, verdict) {
  const suggest = verdict === "fout" ? 1 : verdict === "bijna" ? 2 : 3;
  const labels = [
    [1, "Opnieuw"],
    [2, "Moeilijk"],
    [3, "Goed"],
    [4, "Makkelijk"],
  ];
  return `<div class="grades">${labels
    .map(
      ([g, l]) =>
        `<button data-grade="${g}" class="${g === suggest ? "suggest" : ""}">${l}<small>${preview(card, g)}</small></button>`,
    )
    .join("")}</div>`;
}

function preview(card, g) {
  const clone = JSON.parse(JSON.stringify(card));
  srs.grade(clone, g);
  if (g === 1) return "nu";
  const d = Math.round(clone.interval);
  if (d < 30) return `${d} d`;
  if (d < 365) return `${Math.round(d / 30)} mnd`;
  return `${(d / 365).toFixed(1)} jr`;
}

let toastTimer = 0;
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el || !msg) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 6000);
}

function wireSpeak(locale) {
  for (const b of app.querySelectorAll(".speak")) {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      // speak() moet in dezelfde tel als de tik draaien, anders negeert iOS het.
      speech.unlock();
      speech.speak(b.dataset.say, locale, b.dataset.slow ? 0.55 : 0.9);
      // Stilte is lastig te debuggen: als de spraakmotor niets doet, zeg dat.
      setTimeout(() => {
        const s = speech.status(locale);
        if (s) toast(s);
      }, 900);
      // De diagnose pas stellen als er iets te zien valt: eerder kijken levert
      // een beschuldiging op waar de motor gewoon nog aan het opstarten was.
      if (b.dataset.probe) {
        const el = document.getElementById("sounddiag");
        if (el) el.innerHTML = `<i>Even luisteren…</i>`;
        let n = 0;
        const kijk = setInterval(() => {
          // Een halve update (nieuwe app.js, oude speech.js) mag hooguit een
          // magere melding opleveren, nooit een scherm dat blijft hangen.
          try {
            const klaar = speech.diagnose(locale).ooitGestart || ++n > 12;
            if (!klaar) return;
            clearInterval(kijk);
            showDiag(locale, speech.status(locale));
          } catch (err) {
            clearInterval(kijk);
            if (el)
              el.innerHTML = `De app is halverwege een update. Sluit hem helemaal af (veeg hem weg uit de app-overzicht) en open hem opnieuw.`;
          }
        }, 200);
      }
    });
  }
}

// Het geluidskaartje op Vandaag: laat zien wat de app aan jouw kant waarneemt,
// zodat "ik hoor niets" een vindbare oorzaak krijgt in plaats van een raadsel.
function showDiag(locale, problem) {
  const el = document.getElementById("sounddiag");
  if (!el) return;
  const d = speech.diagnose(locale);
  const rows = [];

  if (!d.ondersteund) {
    el.innerHTML = `<b>Deze browser kan geen spraak afspelen.</b> Open de app in Safari.`;
    return;
  }
  rows.push(`Stemmen op dit toestel: <b>${d.stemmen}</b>`);
  rows.push(d.stem ? `Gekozen stem: <b>${esc(d.stem)}</b>` : `Gekozen stem: <b>geen</b>`);
  rows.push(
    d.ooitGestart
      ? `De stem is begonnen te praten: <b>ja</b>`
      : `De stem is begonnen te praten: <b>nee</b>`,
  );
  if (d.fout) rows.push(`Foutmelding: <b>${esc(d.fout)}</b>`);

  let advies;
  if (!d.stem) {
    advies = `Er staat geen stem voor deze taal op je telefoon. Ga naar Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen en voeg ${locale.startsWith("fr") ? "Frans" : "Spaans"} toe. Kies een stem en wacht tot het downloaden klaar is.`;
  } else if (!d.ooitGestart) {
    advies = `De zin is wel verstuurd, maar de stem kwam nooit op gang. Dat wijst op de telefoon, niet op de app: zet de zijschakelaar links boven de volumeknoppen op geluid (geen oranje streepje) en tik dan opnieuw.`;
  } else if (problem) {
    advies = problem;
  } else {
    advies = `De stem heeft daadwerkelijk gesproken. Hoor je toch niets, draai dan het volume omhoog <i>terwijl</i> de zin speelt — dan regel je het mediavolume en niet je belvolume. Check ook of je AirPods of je auto nog verbonden zijn.`;
  }

  el.innerHTML = `${rows.join("<br>")}<p style="margin:8px 0 0">${advies}</p>`;
}

function wireGrades(isNew, isIntro) {
  for (const b of app.querySelectorAll("[data-grade]")) {
    b.addEventListener("click", () => {
      const g = Number(b.dataset.grade);
      const { item } = current();
      const card = srs.ensureCard(code, item.id);
      const wasNew = card.state === "new" && card.reps === 0;
      srs.grade(card, g);
      srs.save();

      store.logReview(code, {
        isNew: wasNew,
        correct: g >= 3,
        seconds: Math.round((Date.now() - session.t) / 1000),
      });

      if (g === 1) {
        // Opnieuw: verderop in dezelfde sessie nog een keer.
        const entry = session.queue.splice(session.pos, 1)[0];
        const insert = Math.min(session.queue.length, session.pos + 4);
        session.queue.splice(insert, 0, entry);
      } else {
        session.pos += 1;
        session.done += 1;
        if (!isIntro || g >= 3) session.right += g >= 3 ? 1 : 0;
      }
      renderCard();
    });
  }
  void isNew;
}

function finishSession() {
  const d = store.day(code);
  const mins = Math.max(1, Math.round(d.seconds / 60));
  const other = code === "fr" ? "es" : "fr";
  const otherCounts = srs.counts(other, DECKS[other].items, store.get().settings.newPerDay);
  session = null;

  app.innerHTML = `
    <div class="done">
      <div class="big">${LOOK[code].doodle}</div>
      <h1>Klaar!</h1>
      <p class="sub">${d.reviews} kaarten vandaag in het ${deck().meta.name}, ongeveer ${mins} ${mins === 1 ? "minuut" : "minuten"}.</p>
    </div>
    <button class="btn primary" id="towrite">Schrijfopdracht doen (2 min)</button>
    <div class="row" style="margin-top:8px">
      <button class="btn ghost" id="again">Nog een ronde</button>
      <button class="btn ghost" id="switch">${LOOK[other].flag} ${DECKS[other].meta.name}${otherCounts.due + otherCounts.fresh > 0 ? ` (${otherCounts.due + otherCounts.fresh})` : ""}</button>
    </div>`;

  document.getElementById("towrite").addEventListener("click", () => {
    view = "write";
    render();
  });
  document.getElementById("again").addEventListener("click", () => {
    view = "today";
    render();
  });
  document.getElementById("switch").addEventListener("click", () => {
    code = other;
    store.setActiveLang(code);
    view = "today";
    render();
  });
}

// ---------------------------------------------------------------- woorden

// De woordenlijst is bewust géén oefening. Het is een naslagwerk waarin je
// bladert, zoekt en zelf kiest wat je wilt inslijpen. Alles tegelijk in je
// deck gooien werkt niet: vijf nieuwe woorden per dag is de rem, niet de
// grootte van de lijst.
let wordFilter = "alles";
let wordQuery = "";

function renderWords() {
  const list = FREQ[code];
  const added = store.lang(code).added;
  const q = wordQuery.trim().toLowerCase();

  const rows = list
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => wordFilter === "alles" || w[2] === wordFilter)
    .filter(({ w }) => !q || w[0].toLowerCase().includes(q) || w[1].toLowerCase().includes(q));

  const filters = [
    ["alles", "Alles", "📖"],
    ["w", "Werkwoorden", "🏃"],
    ["z", "Zelfstandig", "🎒"],
    ["b", "Bijvoeglijk", "🎨"],
    ["f", "Functiewoorden", "🔗"],
  ];

  app.innerHTML = `
    <div class="hero">
      <span class="doodle">📚</span>
      <h1>${LOOK[code].flag} Woordenlijst</h1>
      <p class="sub">${list.length} woorden, ongeveer op volgorde van hoe vaak je ze tegenkomt. ${added.length} staan er in je deck.</p>
    </div>

    <input type="search" id="wordsearch" placeholder="Zoek in het ${deck().meta.name} of Nederlands"
           value="${esc(wordQuery)}" autocomplete="off" autocapitalize="none" spellcheck="false">

    <div class="chips" id="wordfilters">
      ${filters
        .map(
          ([k, label, ico]) =>
            `<button data-f="${k}" class="${k === wordFilter ? "on" : ""}">${ico} ${label}</button>`,
        )
        .join("")}
    </div>

    <p class="small muted">Tik <b>+</b> om een woord aan je deck toe te voegen — het komt dan gewoon in de wachtrij van Vandaag. Tik 🔊 om het te horen.</p>

    ${
      rows.length
        ? `<ol class="wordlist">
            ${rows
              .map(({ w, i }) => {
                const [ico] = SOORT[w[2]] || ["📎"];
                const on = added.includes(i);
                return `<li>
                  <span class="rank">${i + 1}</span>
                  <span class="wl-main">
                    <b>${esc(w[0])}</b>
                    <span class="muted">${esc(w[1])}</span>
                  </span>
                  <button class="wl-say" data-say="${esc(w[0])}" title="Uitspreken">🔊</button>
                  <button class="wl-add ${on ? "on" : ""}" data-add="${i}" title="${on ? "Uit je deck halen" : "Aan je deck toevoegen"}">${on ? "✓" : "+"}</button>
                  <span class="wl-kind">${ico}</span>
                </li>`;
              })
              .join("")}
          </ol>`
        : `<div class="card"><h3>🤷 Niets gevonden</h3><p class="small muted">Geen woord in deze lijst dat op “${esc(wordQuery)}” lijkt. De lijst groeit nog — dit is de eerste batch.</p></div>`
    }`;

  const search = document.getElementById("wordsearch");
  search.addEventListener("input", () => {
    wordQuery = search.value;
    const at = search.selectionStart;
    renderWords();
    const s2 = document.getElementById("wordsearch");
    s2.focus();
    s2.setSelectionRange(at, at);
  });

  document.getElementById("wordfilters").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    wordFilter = b.dataset.f;
    renderWords();
  });

  // Aan de lijst zelf hangen, niet aan #app: die blijft bestaan tussen
  // renders en zou anders bij elke toetsaanslag een luisteraar erbij krijgen.
  const listEl = app.querySelector(".wordlist");
  if (!listEl) return;
  listEl.addEventListener("click", (e) => {
    const say = e.target.closest(".wl-say");
    if (say) {
      speech.unlock();
      speech.speak(say.dataset.say, deck().meta.locale);
      return;
    }
    const add = e.target.closest(".wl-add");
    if (!add) return;
    const i = Number(add.dataset.add);
    const now = store.toggleAdded(code, i);
    add.classList.toggle("on", now);
    add.textContent = now ? "✓" : "+";
    toast(
      now
        ? `“${FREQ[code][i][0]}” staat nu in je deck. Je krijgt het vanzelf voorbij bij Vandaag.`
        : `“${FREQ[code][i][0]}” is uit je deck gehaald.`,
    );
  });
}

// ---------------------------------------------------------------- schrijven

function renderWrite() {
  const key = store.todayKey();
  const prompt = promptForDay(code, key);
  const entries = store.lang(code).writing;
  const doneToday = entries.some((e) => e.date === key);

  app.innerHTML = `
    <div class="hero">
      <span class="doodle">✍️</span>
      <h1>Schrijven</h1>
      <p class="sub">Twee of drie zinnen is genoeg. Zonder woordenboek: waar je vastloopt, zit je volgende leerdoel.</p>
    </div>

    <div class="card">
      <h3>📝 Opdracht van vandaag</h3>
      <p class="sentence" style="margin:6px 0 0">${esc(prompt)}</p>
    </div>

    <textarea id="text" lang="${deck().meta.locale}" placeholder="Schrijf hier in het ${deck().meta.name}…"></textarea>
    <div class="accents">${ACCENTS[code].map((a) => `<button data-ch="${a}">${a}</button>`).join("")}</div>
    <div class="row" style="margin-top:12px">
      <button class="btn" id="say">🔊 Voorlezen</button>
      <button class="btn" id="checkit">🔍 Nakijken</button>
      <button class="btn primary" id="save">Opslaan</button>
    </div>
    <div id="review"></div>
    ${doneToday ? `<p class="small muted" style="margin-top:10px">✅ Je hebt vandaag al geschreven. Nog een keer mag altijd.</p>` : ""}

    <h2>📚 Eerder geschreven</h2>
    ${
      entries.length
        ? entries
            .slice(0, 25)
            .map(
              (e) => `<div class="entry">
                <div class="when">${e.date}</div>
                <div class="what">${esc(e.prompt)}</div>
                <div class="text">${esc(e.text)}</div>
              </div>`,
            )
            .join("")
        : `<p class="small muted">Nog niets. De eerste is de moeilijkste.</p>`
    }`;

  const ta = document.getElementById("text");
  document.querySelector(".accents").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    e.preventDefault();
    const p = ta.selectionStart ?? ta.value.length;
    ta.value = ta.value.slice(0, p) + b.dataset.ch + ta.value.slice(ta.selectionEnd ?? p);
    ta.focus();
    ta.setSelectionRange(p + 1, p + 1);
  });

  document.getElementById("say").addEventListener("click", () => {
    speech.unlock();
    speech.speak(ta.value, deck().meta.locale, 0.85);
  });

  document.getElementById("checkit").addEventListener("click", () => {
    showReview(ta.value);
  });

  document.getElementById("save").addEventListener("click", () => {
    if (!ta.value.trim()) return;
    store.addWriting(code, { date: key, prompt, text: ta.value.trim() });
    const tekst = ta.value;
    render();
    // Na opslaan meteen het commentaar tonen: anders sla je op en hoor je niets.
    showReview(tekst);
  });
}

// De woordenschat is bij elke controle hetzelfde; één keer bouwen is genoeg.
let vocabCache = { code: null, set: null, size: 0 };
function vocabFor(d) {
  const size = d.items.length;
  if (vocabCache.code === code && vocabCache.size === size) return vocabCache.set;
  const set = buildVocab(d, FREQ[code]);
  vocabCache = { code, set, size };
  return set;
}

function showReview(text) {
  const box = document.getElementById("review");
  if (!box) return;
  if (!String(text).trim()) {
    box.innerHTML = `<p class="small muted" style="margin-top:12px">Schrijf eerst een paar zinnen, dan kijk ik mee.</p>`;
    return;
  }

  const d = deck();
  const r = review(text, code, vocabFor(d), d);
  const fouten = r.bevindingen.filter((b) => b.ernst === "fout").length;

  const kop = fouten
    ? `🔍 ${r.bevindingen.length} ${r.bevindingen.length === 1 ? "opmerking" : "opmerkingen"}`
    : r.bevindingen.length
      ? `🙂 Bijna foutloos — ${r.bevindingen.length} ${r.bevindingen.length === 1 ? "kleinigheid" : "kleinigheden"}`
      : `✅ Ik zie niets fout`;

  const lijst = r.bevindingen
    .map(
      (b) => `<li class="rv ${b.ernst}">
        <span class="rv-wat">${esc(b.wat)}</span>
        ${b.voorstel ? `<span class="rv-pijl">→</span><span class="rv-fix">${esc(b.voorstel)}</span>` : ""}
        <span class="rv-uitleg">${esc(b.uitleg)}</span>
      </li>`,
    )
    .join("");

  box.innerHTML = `
    <div class="card" style="margin-top:14px">
      <h3>${kop}</h3>
      <p class="small muted" style="margin:0 0 10px">${r.woorden} woorden, ${r.zinnen} ${r.zinnen === 1 ? "zin" : "zinnen"}.</p>
      ${lijst ? `<ul class="rvlist">${lijst}</ul>` : ""}
      ${r.meer ? `<p class="small muted">…en nog ${r.meer} andere. Pak eerst deze.</p>` : ""}
      ${
        r.gebruikt.length
          ? `<p class="small" style="margin:10px 0 0">💪 Je gebruikte woorden die je aan het leren bent: <b>${r.gebruikt.map(esc).join(", ")}</b>.</p>`
          : ""
      }
      ${
        r.onbekend.length
          ? `<p class="small muted" style="margin:10px 0 0">${
              r.onbekend.length === 1
                ? `Dit woord staat niet in mijn woordenlijst, dus daar heb ik niets over gezegd: <b>${esc(r.onbekend[0])}</b>. Dat betekent níét dat het fout is.`
                : `Deze ${r.onbekend.length} woorden staan niet in mijn woordenlijst, dus daar heb ik niets over gezegd: <b>${r.onbekend.slice(0, 12).map(esc).join(", ")}</b>. Dat betekent níét dat ze fout zijn.`
            }</p>`
          : ""
      }
      <p class="small muted" style="margin:12px 0 0; border-top:1px solid rgba(0,0,0,.08); padding-top:10px">
        Wat dit wel en niet is: ik controleer accenten, spelling tegen je eigen woordenlijst, en een reeks vaste valkuilen voor Nederlandstaligen. Ik beoordeel <i>geen</i> zinsbouw, woordkeus of of je verhaal klopt. Geen opmerkingen is dus niet hetzelfde als foutloos.
      </p>
    </div>`;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ---------------------------------------------------------------- plan

function renderPlan() {
  app.innerHTML = `
    <div class="hero">
      <span class="doodle">🗺️</span>
      <h1>Je studieplan</h1>
      <p class="sub">Frans en Spaans, allebei vanaf ingezakte schoolkennis, ongeveer tien minuten per taal per dag.</p>
    </div>

    <div class="card"><p style="margin:0">${plan.kern}</p></div>

    <h2>⏱️ Elke dag, tien minuten</h2>
    <dl class="timeline">
      ${plan.sessie.map((s) => `<dt>${s.t}</dt><dd><b>${s.k}</b>${s.d}</dd>`).join("")}
    </dl>

    <h2>🇫🇷 🇪🇸 Twee talen tegelijk</h2>
    <p class="small">${plan.interferentie}</p>
    <ul class="clean">${plan.interferentieRegels.map((r) => `<li>${r}</li>`).join("")}</ul>

    <h2>📈 De vier fases</h2>
    ${plan.fases
      .map(
        (f) => `<div class="phase">
          <div class="tag">Fase ${f.n} · ${f.duur}</div>
          <h3>${f.titel}</h3>
          <p class="muted">${f.doel}</p>
          <p>${f.wat}</p>
          <p class="small muted"><b>Nadruk:</b> ${f.focus}</p>
        </div>`,
      )
      .join("")}

    <h2>⚖️ Vijf regels</h2>
    ${plan.regels
      .map(
        (r) => `<div class="card"><h3>${r.k}</h3><p class="small muted" style="margin:0">${r.d}</p></div>`,
      )
      .join("")}`;
}

// ---------------------------------------------------------------- voortgang

function renderStats() {
  const perDay = store.get().settings.newPerDay;

  const blocks = ["fr", "es"]
    .map((c) => {
      const items = DECKS[c].items;
      const st = srs.counts(c, items, perDay);
      const fc = srs.forecast(c, items, 14);
      const max = Math.max(1, ...fc);
      // Fases uit het deck halen, zodat nieuwe content vanzelf meetelt.
      const phases = [...new Set(items.map((i) => i.phase))]
        .sort((a, b) => a - b)
        .map((p) => {
          const all = items.filter((i) => i.phase === p);
          const seen = all.filter((i) => store.card(c, i.id)).length;
          return { p, seen, total: all.length };
        });
      return `
        <div class="card">
          <h3>${LOOK[c].flag} ${DECKS[c].meta.name}</h3>
          <p class="small muted">${st.seen} van ${st.total} items gestart · ${st.mature} stevig verankerd (interval &gt; 3 weken)</p>
          ${phases
            .map(
              (ph) => `<div style="margin-top:10px">
                <div class="small">Fase ${ph.p} — ${ph.seen}/${ph.total}</div>
                <div class="meter"><i style="width:${(ph.seen / ph.total) * 100}%"></i></div>
              </div>`,
            )
            .join("")}
          <div style="margin-top:16px">
            <div class="small muted">Herhalingen komende 14 dagen</div>
            ${
              st.seen === 0
                ? `<p class="small muted" style="margin-top:6px">Nog niets ingepland — start je eerste sessie.</p>`
                : `<div class="bars">${fc.map((n) => `<div style="height:${(n / max) * 100}%" title="${n}"></div>`).join("")}</div>
                   <div class="bar-labels"><span>vandaag</span><span>+7</span><span>+14</span></div>`
            }
          </div>
        </div>`;
    })
    .join("");

  app.innerHTML = `
    <div class="hero">
      <span class="doodle">📈</span>
      <h1>Voortgang</h1>
      <p class="sub">Reeks van ${store.streak()} ${store.streak() === 1 ? "dag" : "dagen"}.</p>
    </div>
    ${blocks}

    <h2>⚙️ Instellingen</h2>
    <div class="card">
      <h3>Nieuwe woorden per dag</h3>
      <p class="small muted">Per taal. Vijf is bewust laag: het bepaalt hoe groot je herhaalberg over drie weken is.</p>
      <div class="row">
        ${[3, 5, 8, 12].map((n) => `<button class="btn ${n === perDay ? "primary" : "ghost"}" data-new="${n}">${n}</button>`).join("")}
      </div>
    </div>

    <h2>💾 Back-up</h2>
    <div class="card">
      <p class="small muted">Je voortgang staat alleen in deze browser. Exporteer af en toe, zeker voor je iOS bijwerkt.</p>
      <div class="row">
        <button class="btn" id="export">⬇️ Exporteren</button>
        <button class="btn ghost" id="import">⬆️ Importeren</button>
      </div>
      <input type="file" id="file" accept="application/json" hidden>
    </div>`;

  for (const b of app.querySelectorAll("[data-new]")) {
    b.addEventListener("click", () => {
      store.setNewPerDay(Number(b.dataset.new));
      render();
    });
  }

  document.getElementById("export").addEventListener("click", () => {
    const blob = new Blob([store.exportJSON()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `taalapp-backup-${store.todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const file = document.getElementById("file");
  document.getElementById("import").addEventListener("click", () => file.click());
  file.addEventListener("change", async () => {
    if (!file.files[0]) return;
    try {
      store.importJSON(await file.files[0].text());
      render();
    } catch (err) {
      alert("Importeren mislukt: " + err.message);
    }
  });
}

// ---------------------------------------------------------------- start

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
