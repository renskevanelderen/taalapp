// Nakijken van je schrijfoefening, volledig op je eigen telefoon.
//
// Wees eerlijk over wat dit is: geen leraar en geen AI, maar een oplettende
// meelezer. Hij kent jouw woordenlijst en jouw kaarten, hij kent een stapel
// vaste valkuilen voor Nederlandstaligen, en verder houdt hij zijn mond.
//
// Dat "verder houdt hij zijn mond" is een ontwerpkeuze, geen tekortkoming.
// Een nakijker die bij elk woord dat hij niet kent "fout!" roept, leert je
// alleen maar om voorzichtig te schrijven. Onbekende woorden worden daarom
// geteld, niet afgekeurd.

import { stripAccents, distance } from "./check.js";

const WORD = /[\p{L}][\p{L}'’-]*/gu;

// ---------------------------------------------------------------- woordenschat

// Alles wat de app aan taal in huis heeft, platgeslagen tot losse woordvormen.
export function buildVocab(deckObj, freqList) {
  const set = new Set();
  const add = (s) => {
    if (!s) return;
    for (const m of String(s).matchAll(WORD)) {
      const w = m[0].toLowerCase().replace(/[’]/g, "'");
      if (w.length < 1) continue;
      set.add(w);
      // "j'ai" levert ook "ai" op: het deel na de apostrof is het echte woord.
      const cut = w.indexOf("'");
      if (cut > 0 && cut <= 2) set.add(w.slice(cut + 1));
    }
  };

  for (const it of deckObj.items || []) {
    add(it.target);
    add(it.s);
  }
  for (const v of deckObj.verbs || []) {
    add(v.inf);
    for (const forms of Object.values(v.tenses || {})) for (const f of forms) add(f);
  }
  for (const row of freqList || []) add(row[0]);
  return set;
}

// ---------------------------------------------------------------- valkuilen

// Vaste fouten die Nederlandstaligen structureel maken. Alleen regels waarvan
// ik zeker genoeg ben om ze hardop te noemen; twijfelgevallen horen hier niet.
const RULES = {
  fr: [
    { re: /\bde\s+le\b/gi, fix: "du", uitleg: "de + le wordt altijd samengetrokken tot du." },
    { re: /\bde\s+les\b/gi, fix: "des", uitleg: "de + les wordt des." },
    // Ook zonder accent op de à: wie de contractie mist, mist meestal ook het accent.
    { re: /\b[àa]\s+le\b/gi, fix: "au", uitleg: "à + le wordt au." },
    { re: /\b[àa]\s+les\b/gi, fix: "aux", uitleg: "à + les wordt aux." },
    { re: /\bje\s+(ai|habite|aime|arrive|écoute|etudie|étudie|adore|essaie|entends|attends|apprends|oublie|ouvre|espère|espere|ai)\b/gi,
      fix: (m) => `j'${m.split(/\s+/)[1]}`,
      uitleg: "Voor een klinker verdwijnt de e van je: j'ai, j'habite." },
    { re: /\b(je|il|elle|on)\s+su(is|it)\s+\d+\s*ans\b/gi,
      fix: "avoir + ans",
      uitleg: "Leeftijd gaat in het Frans met avoir: j'ai trente ans, niet je suis trente ans." },
    { re: /\bbeaucoup\s+des\b/gi, fix: "beaucoup de", uitleg: "Na beaucoup komt kaal de, ook in het meervoud: beaucoup de gens." },
    { re: /\bplus\s+mieux\b/gi, fix: "mieux", uitleg: "Mieux is zelf al 'beter'; plus mieux bestaat niet." },
    { re: /\bsi\s+j'aurais\b/gi, fix: "si j'avais", uitleg: "Na si komt geen conditionnel maar de imparfait: si j'avais." },
    // Bewust géén algemene elisieregel voor le/la + klinker: le héros en le onze
    // zijn correct, en een nakijker die daarover valselijk aan de bel trekt
    // verliest sneller je vertrouwen dan hij fouten vindt.
  ],
  es: [
    { re: /\bde\s+el\b/gi, fix: "del", uitleg: "de + el wordt samengetrokken tot del." },
    { re: /\ba\s+el\b/gi, fix: "al", uitleg: "a + el wordt al." },
    { re: /\b(soy|es|eres)\s+\d+\s*años\b/gi,
      fix: "tener + años",
      uitleg: "Leeftijd gaat met tener: tengo treinta años, niet soy treinta años." },
    { re: /\b(es|eres|soy|son)\s+(cansad[oa]s?|content[oa]s?|enfadad[oa]s?|ocupad[oa]s?|enferm[oa]s?|list[oa]s?|triste?s?)\b/gi,
      fix: "estar",
      uitleg: "Een tijdelijke toestand of stemming krijgt estar, niet ser: estoy cansada." },
    { re: /\bmuy\s+mucho\b/gi, fix: "muchísimo", uitleg: "Muy en mucho stapel je niet; gebruik muchísimo." },
    { re: /\bhay\s+que\s+\w+(?:o|as|es)\b/gi, fix: "hay que + hele werkwoord", uitleg: "Na hay que komt het werkwoord onvervoegd: hay que comer." },
  ],
};

// ---------------------------------------------------------------- nakijken

// De woordenlijst bevat grondvormen. Een meervoud of een vrouwelijke vorm is
// geen spelfout, dus die buigingen proberen we eerst af te pellen voordat we
// een woord "onbekend" durven noemen.
const BUIGING = [/s$/, /es$/, /e$/, /a$/, /os$/, /as$/];

function bekend(w, vocab) {
  if (vocab.has(w)) return true;
  for (const b of BUIGING) {
    if (b.test(w) && vocab.has(w.replace(b, ""))) return true;
  }
  // Bewust niet andersom (w + "s" opzoeken): dan zou "temp" als bekend gelden
  // omdat "temps" bestaat, en juist die weggelaten s wil je gemeld krijgen.
  return false;
}

export function review(text, code, vocab, deckObj) {
  const raw = String(text || "").trim();
  const bevindingen = [];
  const tokens = [...raw.matchAll(WORD)].map((m) => m[0]);
  const zinnen = raw.split(/[.!?…]+/).map((s) => s.trim()).filter(Boolean);

  // 1. Vaste valkuilen.
  for (const r of RULES[code] || []) {
    const hits = new Set();
    for (const m of raw.matchAll(r.re)) hits.add(m[0]);
    for (const h of hits) {
      bevindingen.push({
        soort: "regel",
        ernst: "fout",
        wat: h,
        voorstel: typeof r.fix === "function" ? r.fix(h) : r.fix,
        uitleg: r.uitleg,
      });
    }
  }

  // 2. Accenten. Het woord bestaat, maar de streepjes staan verkeerd of missen.
  //    Hier ben ik streng: dit is een echte fout en goed te herstellen.
  const onbekend = [];
  const gezien = new Set();
  for (const t of tokens) {
    const w = t.toLowerCase().replace(/[’]/g, "'");
    if (gezien.has(w) || bekend(w, vocab)) continue;
    gezien.add(w);

    const kaal = stripAccents(w);
    let accentHit = null;
    let bijnaHit = null;
    for (const v of vocab) {
      if (v === kaal) continue;
      if (stripAccents(v) === kaal) {
        accentHit = v;
        break;
      }
      // Alleen bij langere woorden en gelijke beginletter: anders "vin" ~ "vie"
      // ~ "vit" en krijg je drie suggesties waar er nul nodig zijn.
      if (!bijnaHit && w.length >= 4 && Math.abs(v.length - w.length) <= 1 && stripAccents(v)[0] === kaal[0]) {
        if (distance(stripAccents(v), kaal) === 1) bijnaHit = v;
      }
    }

    if (accentHit) {
      bevindingen.push({
        soort: "accent",
        ernst: "bijna",
        wat: t,
        voorstel: accentHit,
        uitleg: "Zelfde woord, andere accenten. In het Frans en Spaans horen accenten bij de spelling, net als een letter.",
      });
    } else if (bijnaHit) {
      bevindingen.push({
        soort: "spelling",
        ernst: "bijna",
        wat: t,
        voorstel: bijnaHit,
        uitleg: "Eén letter verschil met een woord dat je kent. Bedoelde je dit?",
      });
    } else {
      onbekend.push(t);
    }
  }

  // 3. Vorm: hoofdletters en slotleesteken. Klein grut, maar het went snel.
  for (const z of zinnen) {
    const eerste = z.match(WORD);
    if (eerste && /^[a-zà-ÿ]/.test(eerste[0]) && !/^[¿¡]/.test(z)) {
      bevindingen.push({
        soort: "vorm",
        ernst: "bijna",
        wat: eerste[0],
        voorstel: eerste[0][0].toUpperCase() + eerste[0].slice(1),
        uitleg: "Een zin begint met een hoofdletter.",
      });
      break;
    }
  }
  if (raw && !/[.!?…"»)]$/.test(raw)) {
    bevindingen.push({
      soort: "vorm",
      ernst: "bijna",
      wat: "het einde",
      voorstel: null,
      uitleg: "Er staat geen punt aan het eind.",
    });
  }
  if (code === "es") {
    if (/\?/.test(raw) && !/¿/.test(raw)) {
      bevindingen.push({
        soort: "vorm",
        ernst: "bijna",
        wat: "?",
        voorstel: "¿…?",
        uitleg: "Spaanse vragen krijgen ook aan het begin een omgekeerd vraagteken.",
      });
    }
    if (/!/.test(raw) && !/¡/.test(raw)) {
      bevindingen.push({
        soort: "vorm",
        ernst: "bijna",
        wat: "!",
        voorstel: "¡…!",
        uitleg: "Hetzelfde geldt voor uitroepen: ¡qué bien!",
      });
    }
  }

  // 4. Dubbel getikte woorden.
  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i].toLowerCase() === tokens[i - 1].toLowerCase() && tokens[i].length > 1) {
      bevindingen.push({
        soort: "vorm",
        ernst: "fout",
        wat: `${tokens[i - 1]} ${tokens[i]}`,
        voorstel: tokens[i],
        uitleg: "Dit woord staat er twee keer achter elkaar.",
      });
    }
  }

  // 5. En het leukste: welke woorden uit je eigen deck heb je gebruikt?
  //    Een uitdrukking telt alleen als hij er hélemaal staat. Anders zou
  //    "pour deux personnes" doorgaan voor "deux cents", en dat is geen
  //    compliment maar een fout gelezen zin.
  const inTekst = new Set(tokens.map((t) => t.toLowerCase()));
  const platte = " " + tokens.map((t) => t.toLowerCase()).join(" ") + " ";
  const gebruikt = [];
  for (const it of deckObj.items || []) {
    if (gebruikt.length >= 8) break;
    const kern = String(it.target)
      .toLowerCase()
      .replace(/^(le |la |les |l'|un |une |des |el |los |las |unos |unas )/, "");
    // "cansado / cansada" telt als je één van de twee gebruikt.
    for (const vorm of kern.split("/").map((s) => s.trim())) {
      const delen = (vorm.match(WORD) || []).map((x) => x.toLowerCase());
      if (!delen.length) continue;
      const raak =
        delen.length === 1
          ? delen[0].length > 3 && inTekst.has(delen[0])
          : platte.includes(" " + delen.join(" ") + " ");
      if (raak) {
        gebruikt.push(it.target);
        break;
      }
    }
  }

  return {
    woorden: tokens.length,
    zinnen: zinnen.length,
    bevindingen: bevindingen.slice(0, 12),
    meer: Math.max(0, bevindingen.length - 12),
    onbekend,
    gebruikt,
  };
}
