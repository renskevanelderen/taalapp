// Antwoordcontrole voor typoefeningen.
// Drie uitkomsten: "goed", "bijna" (alleen accenten of één tikfout) en "fout".

const PUNCT = /[.,!?;:¡¿"«»…]/g;

export function normalise(s) {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(PUNCT, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripAccents(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Lidwoorden en clitics die we niet fout rekenen als ze ontbreken,
// omdat het doel het woord zelf is en niet het lidwoord.
const OPTIONAL_PREFIX =
  /^(le |la |les |l'|un |une |des |el |los |las |unos |unas )/;

function variants(target) {
  const n = normalise(target);
  const out = new Set([n]);
  if (OPTIONAL_PREFIX.test(n)) out.add(n.replace(OPTIONAL_PREFIX, ""));
  out.add(n.replace(/\//g, " / "));
  // "encantado/a" -> beide vormen los accepteren
  const slash = n.match(/^(.+?)o\/a$/);
  if (slash) {
    out.add(slash[1] + "o");
    out.add(slash[1] + "a");
  }
  return [...out];
}

export function check(input, target) {
  const given = normalise(input);
  if (!given) return "fout";
  const opts = variants(target);

  if (opts.includes(given)) return "goed";
  if (opts.some((o) => stripAccents(o) === stripAccents(given))) return "bijna";

  const best = Math.min(...opts.map((o) => distance(stripAccents(o), stripAccents(given))));
  const len = Math.min(...opts.map((o) => o.length));
  if (best <= 1 || (len >= 8 && best <= 2)) return "bijna";
  return "fout";
}

export function distance(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

// Zin uit de deck: "Le train part de la {voie} 12."
export function parseSentence(s) {
  const m = s.match(/\{([^}]*)\}/);
  if (!m) return { before: s, span: "", after: "", plain: s };
  return {
    before: s.slice(0, m.index),
    span: m[1],
    after: s.slice(m.index + m[0].length),
    plain: s.replace(/[{}]/g, ""),
  };
}
