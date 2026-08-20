// De toets. Anders dan de dagelijkse oefening: je krijgt een reeks vragen
// achter elkaar, je vult alles in, en pas daarna zie je hoe het ging.
//
// Dat uitstel is het hele punt. Bij een flashcard weet je binnen een seconde
// of het goed was, en dat voelt prettig maar het meet weinig: je herkent het
// antwoord zodra je het ziet. Een toets waarbij je pas achteraf nakijkt,
// dwingt je het antwoord echt uit je hoofd op te halen.

import { check, parseSentence } from "./check.js";
import { varianten } from "./conjug.js";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Alleen woorden die je eerder hebt gezien. Een toets over materiaal dat je
// nog nooit gehad hebt is geen toets maar een ontmoediging.
export function beschikbaar(items, heeftKaart) {
  return items.filter((it) => heeftKaart(it.id));
}

export function bouwWoordToets(items, heeftKaart, aantal) {
  const pool = shuffle(beschikbaar(items, heeftKaart).slice());
  const gekozen = pool.slice(0, Math.min(aantal, pool.length));

  return gekozen.map((item) => {
    const p = parseSentence(item.s);
    // Een zin met een gat erin is de rijkste vraag: je ziet het woord in
    // context staan en moet het zelf produceren. Kan dat niet, dan vragen we
    // het woord kaal.
    if (!p.empty && p.span) {
      return {
        id: item.id,
        soort: "zin",
        vraag: item.nl,
        context: { voor: p.before, na: p.after, nl: item.sNl || "" },
        antwoord: p.span,
        volledig: p.plain,
      };
    }
    return {
      id: item.id,
      soort: "woord",
      vraag: item.nl,
      context: null,
      antwoord: item.target,
      volledig: item.target,
    };
  });
}

// Een vervoegingstoets is één werkwoord in één tijd: het hele rijtje.
export function bouwVervoegToets(verb, code, tijd, vormen) {
  return vormen.map((vorm, i) => ({
    id: `${verb.inf}-${tijd}-${i}`,
    soort: "vervoeging",
    persoon: i,
    antwoord: vorm,
  }));
}

// Nakijken van één ingevuld antwoord. Levert "goed", "bijna" of "fout".
export function beoordeel(vraag, gegeven) {
  if (vraag.soort === "vervoeging") {
    // Bij een rijtje mag het voornaamwoord weggelaten worden.
    const opties = varianten(vraag.antwoord);
    let best = "fout";
    for (const o of opties) {
      const v = check(gegeven, o);
      if (v === "goed") return "goed";
      if (v === "bijna") best = "bijna";
    }
    return best;
  }
  return check(gegeven, vraag.antwoord);
}

export function telUitslag(vragen, antwoorden) {
  let goed = 0;
  let bijna = 0;
  let fout = 0;
  const per = vragen.map((v, i) => {
    const oordeel = beoordeel(v, antwoorden[i] || "");
    if (oordeel === "goed") goed += 1;
    else if (oordeel === "bijna") bijna += 1;
    else fout += 1;
    return { vraag: v, gegeven: antwoorden[i] || "", oordeel };
  });
  // "Bijna" telt half mee: accenten zijn een echte fout, maar wie het woord
  // kent en één streepje mist, weet meer dan wie niets invulde.
  const score = Math.round(((goed + bijna * 0.5) / Math.max(1, vragen.length)) * 100);
  return { goed, bijna, fout, score, per, totaal: vragen.length };
}
