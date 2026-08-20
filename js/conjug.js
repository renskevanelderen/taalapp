// Vervoegingen: de rijtjes zelf, en het overhoren ervan.
//
// De imparfait en het imperfecto staan niet in de databestanden maar worden
// hier afgeleid. Dat is geen luiheid: het zijn de twee regelmatigste tijden
// die er bestaan, en een regel die je één keer opschrijft gaat nooit stuk,
// terwijl tweehonderd met de hand getypte vormen gegarandeerd ergens een
// tikfout bevatten. De handjevol uitzonderingen staan er expliciet bij.

export const PERSONEN = ["ik", "jij", "hij / zij", "wij", "jullie", "zij (meervoud)"];

export const TIJDEN = {
  fr: [
    { id: "present", naam: "tegenwoordige tijd", bij: "présent" },
    { id: "passe", naam: "voltooide tijd", bij: "passé composé" },
    { id: "imparfait", naam: "onvoltooid verleden tijd", bij: "imparfait" },
    { id: "futur", naam: "toekomende tijd", bij: "futur simple" },
  ],
  es: [
    { id: "present", naam: "tegenwoordige tijd", bij: "presente" },
    { id: "passe", naam: "voltooide tijd", bij: "pretérito perfecto" },
    { id: "imparfait", naam: "onvoltooid verleden tijd", bij: "imperfecto" },
    { id: "futur", naam: "toekomende tijd", bij: "futuro simple" },
  ],
};

// ---------------------------------------------------------------- imparfait

const FR_UITGANG = ["ais", "ais", "ait", "ions", "iez", "aient"];
const FR_VOORNW = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

// être is het enige Franse werkwoord waarvan de imparfait niet uit de
// wij-vorm te halen is: nous sommes zou somm- opleveren, en het is ét-.
const FR_STAM_UITZONDERING = { être: "ét" };

function frImparfait(verb) {
  const stam =
    FR_STAM_UITZONDERING[verb.inf] ||
    (verb.tenses.present[3] || "").replace(/^nous\s+/, "").replace(/ons$/, "");
  if (!stam) return null;
  return FR_UITGANG.map((uit, i) => {
    const vorm = stam + uit;
    // je wordt j' voor een klinker: j'avais, j'étais.
    const vnw = i === 0 && /^[aeiouéèêâîôûyh]/i.test(vorm) ? "j'" : FR_VOORNW[i] + " ";
    return vnw + vorm;
  });
}

// Spaans kent maar drie onregelmatige imperfectos in de hele taal.
const ES_ONREGELMATIG = {
  ser: ["era", "eras", "era", "éramos", "erais", "eran"],
  ir: ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
  ver: ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
};

const ES_AR = ["aba", "abas", "aba", "ábamos", "abais", "aban"];
const ES_ER_IR = ["ía", "ías", "ía", "íamos", "íais", "ían"];

function esImperfecto(verb) {
  if (ES_ONREGELMATIG[verb.inf]) return ES_ONREGELMATIG[verb.inf];
  const inf = verb.inf;
  const stam = inf.slice(0, -2);
  if (!stam) return null;
  const uit = inf.endsWith("ar") ? ES_AR : ES_ER_IR;
  return uit.map((u) => stam + u);
}

// Geeft het werkwoord terug met alle tijden erin, inclusief de afgeleide.
export function metAlleTijden(verb, code) {
  const extra = code === "fr" ? frImparfait(verb) : esImperfecto(verb);
  if (!extra) return verb;
  return { ...verb, tenses: { ...verb.tenses, imparfait: extra } };
}

export function rijtje(verb, code, tijd) {
  const v = metAlleTijden(verb, code);
  return v.tenses[tijd] || null;
}

// ---------------------------------------------------------------- nakijken

// Het rijtje staat in het Frans mét voornaamwoord ("je suis") en in het
// Spaans zonder ("soy"), want zo hoort het. Maar wie in het Frans alleen
// "suis" intypt weet de vorm gewoon. Dat rekenen we dus goed.
export function varianten(vorm) {
  const uit = new Set([vorm]);
  const zonder = vorm.replace(
    /^(j'|je\s+|tu\s+|il\/elle\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\/elles\s+|ils\s+|elles\s+)/i,
    "",
  );
  if (zonder !== vorm) uit.add(zonder);
  // "il/elle est" mag ook als "il est" of "elle est".
  const m = vorm.match(/^(ils?|elles?)\/(ils?|elles?)\s+(.*)$/i);
  if (m) {
    uit.add(`${m[1]} ${m[3]}`);
    uit.add(`${m[2]} ${m[3]}`);
  }
  return [...uit];
}
