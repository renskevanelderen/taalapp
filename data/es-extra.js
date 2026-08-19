// Spaans (Spanje) — uitbreiding: telwoorden, tijd, werkwoorden (met
// vervoegingen) en bijvoeglijke naamwoorden. Fase 4.
//
// Net als bij het Frans: geen kaarten voor uno, dos, tres. Wel de vormen
// die in de praktijk misgaan.

export const items = [
  // ---------- Telwoorden ----------
  { id: "es-x001", target: "dieciséis", nl: "zestien (16)", s: "El billete cuesta {dieciséis} euros.", sNl: "Het kaartje kost zestien euro.", theme: "getallen", phase: 4, note: "16 t/m 19 worden aan elkaar geschreven, mét accent: dieciséis, diecisiete." },
  { id: "es-x002", target: "veintiuno", nl: "eenentwintig (21)", s: "Tengo {veintiuno} en total.", sNl: "Ik heb er eenentwintig in totaal.", theme: "getallen", phase: 4, note: "21 t/m 29 aan elkaar. Vóór een zelfstandig naamwoord wordt het veintiún euros." },
  { id: "es-x003", target: "treinta y dos", nl: "tweeëndertig (32)", s: "Hay {treinta y dos} alumnos en la clase.", sNl: "Er zitten tweeëndertig leerlingen in de klas.", theme: "getallen", phase: 4, note: "Vanaf 31 juist wél los, met y ertussen." },
  { id: "es-x004", target: "cincuenta", nl: "vijftig (50)", s: "Mi madre tiene {cincuenta} años.", sNl: "Mijn moeder is vijftig.", theme: "getallen", phase: 4 },
  { id: "es-x005", target: "setenta", nl: "zeventig (70)", s: "Mi abuelo tiene {setenta} años.", sNl: "Mijn opa is zeventig.", theme: "getallen", phase: 4, note: "Veel simpeler dan het Franse soixante-dix — maar dat maakt het juist verwarrend als je beide talen leert." },
  { id: "es-x006", target: "ochenta", nl: "tachtig (80)", s: "Había unas {ochenta} personas.", sNl: "Er waren zo'n tachtig mensen.", theme: "getallen", phase: 4 },
  { id: "es-x007", target: "noventa", nl: "negentig (90)", s: "El vuelo costó {noventa} euros.", sNl: "De vlucht kostte negentig euro.", theme: "getallen", phase: 4 },
  { id: "es-x008", target: "cien", nl: "honderd (100)", s: "Son {cien} euros justos.", sNl: "Dat is precies honderd euro.", theme: "getallen", phase: 4, note: "Cien als het precies honderd is, ciento zodra er iets achter komt: ciento veinte." },
  { id: "es-x009", target: "doscientos", nl: "tweehonderd (200)", s: "El hotel cuesta {doscientos} euros por noche.", sNl: "Het hotel kost tweehonderd euro per nacht.", theme: "getallen", phase: 4, note: "Honderdtallen buigen mee: doscientas personas." },
  { id: "es-x010", target: "quinientos", nl: "vijfhonderd (500)", s: "Faltan {quinientos} metros.", sNl: "Er zijn nog vijfhonderd meter te gaan.", theme: "getallen", phase: 4, note: "Onregelmatig: niet cincocientos. Ook setecientos (700) en novecientos (900)." },
  { id: "es-x011", target: "mil", nl: "duizend (1000)", s: "Hay {mil} kilómetros hasta Sevilla.", sNl: "Het is duizend kilometer naar Sevilla.", theme: "getallen", phase: 4, note: "Nooit un mil, gewoon mil." },
  { id: "es-x012", target: "un millón", nl: "een miljoen", s: "La ciudad tiene {un millón} de habitantes.", sNl: "De stad heeft een miljoen inwoners.", theme: "getallen", phase: 4, note: "Altijd met de: un millón de personas." },
  { id: "es-x013", target: "primero / primera", nl: "eerste", s: "Es la {primera} vez que vengo aquí.", sNl: "Dit is de eerste keer dat ik hier kom.", theme: "getallen", phase: 4, note: "Vóór een mannelijk zelfstandig naamwoord valt de -o weg: el primer día." },
  { id: "es-x014", target: "segundo / segunda", nl: "tweede", s: "Coge la {segunda} calle a la izquierda.", sNl: "Neem de tweede straat links.", theme: "getallen", phase: 4 },
  { id: "es-x015", target: "tercero / tercera", nl: "derde", s: "Vivo en el {tercer} piso.", sNl: "Ik woon op de derde verdieping.", theme: "getallen", phase: 4, note: "Ook hier valt de -o weg: el tercer piso." },
  { id: "es-x016", target: "el último / la última", nl: "de laatste", s: "Es {el último} tren a Madrid.", sNl: "Dit is de laatste trein naar Madrid.", theme: "getallen", phase: 4 },
  { id: "es-x017", target: "la mitad", nl: "de helft", s: "Me he comido {la mitad} de la pizza.", sNl: "Ik heb de helft van de pizza opgegeten.", theme: "getallen", phase: 4 },
  { id: "es-x018", target: "un cuarto", nl: "een kwart", s: "Queda {un cuarto} de la tarta.", sNl: "Er is nog een kwart van de taart over.", theme: "getallen", phase: 4 },
  { id: "es-x019", target: "la mayoría", nl: "de meeste", s: "{La mayoría} de la gente prefiere el tren.", sNl: "De meeste mensen nemen liever de trein.", theme: "getallen", phase: 4 },
  { id: "es-x020", target: "y media", nl: "half (bij tijd)", s: "El tren sale a las siete {y media}.", sNl: "De trein vertrekt om half acht.", theme: "getallen", phase: 4, note: "Net als in het Frans: las siete y media is half ACHT." },
  { id: "es-x021", target: "menos cuarto", nl: "kwart voor", s: "Quedamos a las ocho {menos cuarto}.", sNl: "We spreken af om kwart voor acht.", theme: "getallen", phase: 4 },
  { id: "es-x022", target: "una docena", nl: "een dozijn", s: "Ponme {una docena} de huevos.", sNl: "Doe mij een dozijn eieren.", theme: "getallen", phase: 4 },

  // ---------- Tijd ----------
  { id: "es-x023", target: "anteayer", nl: "eergisteren", s: "La vi {anteayer} en el mercado.", sNl: "Ik zag haar eergisteren op de markt.", theme: "tijd", phase: 4 },
  { id: "es-x024", target: "pasado mañana", nl: "overmorgen", s: "Salimos {pasado mañana} por la mañana.", sNl: "We vertrekken overmorgenochtend.", theme: "tijd", phase: 4 },
  { id: "es-x025", target: "la semana que viene", nl: "volgende week", s: "Vuelvo {la semana que viene}.", sNl: "Ik kom volgende week terug.", theme: "tijd", phase: 4, note: "Ook: la próxima semana." },
  { id: "es-x026", target: "la semana pasada", nl: "vorige week", s: "Llovió toda {la semana pasada}.", sNl: "Het heeft vorige week de hele week geregend.", theme: "tijd", phase: 4 },
  { id: "es-x027", target: "ahora mismo", nl: "meteen / nu meteen", s: "Voy {ahora mismo}.", sNl: "Ik kom er meteen aan.", theme: "tijd", phase: 4 },
  { id: "es-x028", target: "dentro de un rato", nl: "straks / over een tijdje", s: "Te llamo {dentro de un rato}.", sNl: "Ik bel je straks.", theme: "tijd", phase: 4 },
  { id: "es-x029", target: "normalmente", nl: "meestal", s: "{Normalmente} cojo la bici.", sNl: "Meestal pak ik de fiets.", theme: "tijd", phase: 4 },
  { id: "es-x030", target: "de vez en cuando", nl: "af en toe", s: "Vamos {de vez en cuando}.", sNl: "We gaan er af en toe heen.", theme: "tijd", phase: 4 },
  { id: "es-x031", target: "todos los días", nl: "elke dag", s: "Ella corre {todos los días}.", sNl: "Zij rent elke dag.", theme: "tijd", phase: 4 },
  { id: "es-x032", target: "a tiempo", nl: "op tijd", s: "El tren llegó {a tiempo}.", sNl: "De trein kwam op tijd aan.", theme: "tijd", phase: 4 },
  { id: "es-x033", target: "tarde", nl: "laat", s: "Perdona, llego {tarde}.", sNl: "Sorry, ik ben laat.", theme: "tijd", phase: 4, note: "La tarde is ook de middag. Llegar tarde = te laat komen." },
  { id: "es-x034", target: "al día siguiente", nl: "de dag erna", s: "{Al día siguiente} hacía buen tiempo.", sNl: "De dag erna was het mooi weer.", theme: "tijd", phase: 4 },
  { id: "es-x035", target: "la víspera", nl: "de dag ervoor", s: "Habíamos llegado {la víspera}.", sNl: "We waren de dag ervoor aangekomen.", theme: "tijd", phase: 4 },
  { id: "es-x036", target: "todo el día", nl: "de hele dag", s: "He andado {todo el día}.", sNl: "Ik heb de hele dag gelopen.", theme: "tijd", phase: 4 },

  // ---------- Werkwoorden ----------
  { id: "es-x037", target: "ser", nl: "zijn (blijvend)", s: "Creo que {es} muy buena idea.", sNl: "Ik denk dat het een heel goed idee is.", theme: "werkwoorden", phase: 4, note: "Ser voor identiteit en eigenschappen, estar voor toestand en plaats." },
  { id: "es-x038", target: "estar", nl: "zijn (tijdelijk / plaats)", s: "¿Dónde {estás} ahora?", sNl: "Waar ben je nu?", theme: "werkwoorden", phase: 4, note: "Es aburrido = hij is saai. Está aburrido = hij verveelt zich." },
  { id: "es-x039", target: "tener", nl: "hebben", s: "{Tienes} suerte.", sNl: "Jij hebt geluk.", theme: "werkwoorden", phase: 4, note: "Net als het Frans: tengo frío, tengo hambre — waar het Nederlands 'zijn' zegt." },
  { id: "es-x040", target: "hacer", nl: "doen / maken", s: "¿Qué {haces} este fin de semana?", sNl: "Wat doe je dit weekend?", theme: "werkwoorden", phase: 4, note: "Ook voor het weer: hace bueno, hace frío." },
  { id: "es-x041", target: "poder", nl: "kunnen / mogen", s: "¿{Puedes} ayudarme un momento?", sNl: "Kun je me even helpen?", theme: "werkwoorden", phase: 4, note: "Klinkerwisseling o naar ue: puedo, puedes, puede." },
  { id: "es-x042", target: "querer", nl: "willen / houden van", s: "{Quieren} salir antes.", sNl: "Zij willen eerder weg.", theme: "werkwoorden", phase: 4, note: "Te quiero betekent ook 'ik hou van je'. Beleefder verzoek: quería o quisiera." },
  { id: "es-x043", target: "deber", nl: "moeten", s: "{Debo} volver antes de medianoche.", sNl: "Ik moet voor middernacht terug zijn.", theme: "werkwoorden", phase: 4, note: "Tener que is in spreektaal gebruikelijker: tengo que volver." },
  { id: "es-x044", target: "saber", nl: "weten / kunnen (geleerd)", s: "¿{Sabes} dónde están mis gafas?", sNl: "Weet jij waar mijn bril is?", theme: "werkwoorden", phase: 4, note: "Zelfde verdeling als in het Frans: saber = feiten, conocer = kennen." },
  { id: "es-x045", target: "conocer", nl: "kennen", s: "¿{Conoces} un buen restaurante por aquí?", sNl: "Ken jij hier een goed restaurant?", theme: "werkwoorden", phase: 4 },
  { id: "es-x046", target: "coger", nl: "pakken / nemen", s: "{Cogemos} el tren de las ocho.", sNl: "We nemen de trein van acht uur.", theme: "werkwoorden", phase: 4, note: "In Spanje volstrekt normaal. In Latijns-Amerika liever tomar gebruiken." },
  { id: "es-x047", target: "venir", nl: "komen", s: "Ella {viene} de Bilbao.", sNl: "Zij komt uit Bilbao.", theme: "werkwoorden", phase: 4 },
  { id: "es-x048", target: "ver", nl: "zien", s: "No {veo} nada sin gafas.", sNl: "Ik zie niets zonder bril.", theme: "werkwoorden", phase: 4 },
  { id: "es-x049", target: "decir", nl: "zeggen", s: "¿Qué {dices}?", sNl: "Wat zeg je?", theme: "werkwoorden", phase: 4 },
  { id: "es-x050", target: "poner", nl: "zetten / doen", s: "Me {pongo} una chaqueta, hace frío.", sNl: "Ik trek een jas aan, het is koud.", theme: "werkwoorden", phase: 4, note: "Ponme una caña = doe mij een biertje." },
  { id: "es-x051", target: "salir", nl: "weggaan / uitgaan", s: "{Salimos} a las seis de la mañana.", sNl: "We vertrekken om zes uur 's ochtends.", theme: "werkwoorden", phase: 4, note: "Ook: naar buiten gaan en met iemand omgaan." },
  { id: "es-x052", target: "llevar", nl: "dragen / meenemen", s: "{Llevo} tres años aquí.", sNl: "Ik woon hier al drie jaar.", theme: "werkwoorden", phase: 4, note: "Llevar + tijd + gerundio is dé manier om duur uit te drukken." },

  // ---------- Bijvoeglijke naamwoorden ----------
  { id: "es-x053", target: "contento / contenta", nl: "blij", s: "Estoy muy {contenta} de verte.", sNl: "Ik ben heel blij je te zien.", theme: "eigenschappen", phase: 4, note: "Altijd met estar — het is een toestand." },
  { id: "es-x054", target: "cansado / cansada", nl: "moe", s: "Está demasiado {cansada} para salir.", sNl: "Ze is te moe om uit te gaan.", theme: "eigenschappen", phase: 4 },
  { id: "es-x055", target: "caro / cara", nl: "duur", s: "Este restaurante es muy {caro}.", sNl: "Dit restaurant is heel duur.", theme: "eigenschappen", phase: 4, note: "La cara is ook het gezicht." },
  { id: "es-x056", target: "barato / barata", nl: "goedkoop", s: "Estos zapatos son {baratos}.", sNl: "Deze schoenen zijn goedkoop.", theme: "eigenschappen", phase: 4 },
  { id: "es-x057", target: "amable", nl: "aardig / vriendelijk", s: "Es muy {amable} de tu parte.", sNl: "Dat is heel aardig van je.", theme: "eigenschappen", phase: 4 },
  { id: "es-x058", target: "majo / maja", nl: "leuk / gezellig (persoon)", s: "Sus compañeros son muy {majos}.", sNl: "Haar collega's zijn heel leuk.", theme: "eigenschappen", phase: 4, note: "Typisch Spaans uit Spanje, informeel en heel gebruikelijk." },
  { id: "es-x059", target: "feo / fea", nl: "lelijk", s: "Ese jersey es bastante {feo}.", sNl: "Die trui is behoorlijk lelijk.", theme: "eigenschappen", phase: 4 },
  { id: "es-x060", target: "genial", nl: "geweldig", s: "¡Tu idea es {genial}!", sNl: "Jouw idee is geweldig!", theme: "eigenschappen", phase: 4 },
  { id: "es-x061", target: "pesado / pesada", nl: "vervelend / zwaar", s: "Por la mañana está un poco {pesado}.", sNl: "'s Ochtends is hij een beetje vervelend.", theme: "eigenschappen", phase: 4, note: "Dubbel: zwaar van gewicht én vermoeiend als persoon." },
  { id: "es-x062", target: "tener prisa", nl: "haast hebben", s: "Perdona, {tengo prisa}.", sNl: "Sorry, ik heb haast.", theme: "eigenschappen", phase: 4, note: "Met tener, niet met ser of estar." },
  { id: "es-x063", target: "listo / lista", nl: "klaar / slim", s: "¿Estás {lista} para salir?", sNl: "Ben je klaar om te gaan?", theme: "eigenschappen", phase: 4, note: "Es lista = ze is slim. Está lista = ze is klaar. Het schoolvoorbeeld van ser en estar." },
  { id: "es-x064", target: "ocupado / ocupada", nl: "bezig / bezet", s: "El baño está {ocupado}.", sNl: "De badkamer is bezet.", theme: "eigenschappen", phase: 4 },
  { id: "es-x065", target: "vacío / vacía", nl: "leeg", s: "La nevera está completamente {vacía}.", sNl: "De koelkast is helemaal leeg.", theme: "eigenschappen", phase: 4 },
  { id: "es-x066", target: "lleno / llena", nl: "vol", s: "El autobús iba {lleno} esta mañana.", sNl: "De bus zat vanochtend vol.", theme: "eigenschappen", phase: 4 },
  { id: "es-x067", target: "limpio / limpia", nl: "schoon", s: "La habitación estaba muy {limpia}.", sNl: "De kamer was heel schoon.", theme: "eigenschappen", phase: 4 },
  { id: "es-x068", target: "sucio / sucia", nl: "vuil", s: "Mis zapatos están {sucios}.", sNl: "Mijn schoenen zijn vuil.", theme: "eigenschappen", phase: 4 },
  { id: "es-x069", target: "suave", nl: "zacht / mild", s: "El invierno ha sido muy {suave} este año.", sNl: "De winter was dit jaar heel zacht.", theme: "eigenschappen", phase: 4 },
];

export const verbs = [
  { inf: "ser", nl: "zijn (blijvend)", tenses: {
    present: ["soy", "eres", "es", "somos", "sois", "son"],
    passe: ["he sido", "has sido", "ha sido", "hemos sido", "habéis sido", "han sido"],
    futur: ["seré", "serás", "será", "seremos", "seréis", "serán"],
  }, note: "Identiteit, beroep, herkomst, blijvende eigenschappen." },

  { inf: "estar", nl: "zijn (toestand / plaats)", tenses: {
    present: ["estoy", "estás", "está", "estamos", "estáis", "están"],
    passe: ["he estado", "has estado", "ha estado", "hemos estado", "habéis estado", "han estado"],
    futur: ["estaré", "estarás", "estará", "estaremos", "estaréis", "estarán"],
  }, note: "Plaats, stemming, tijdelijke toestand, en de vorm estar + gerundio." },

  { inf: "tener", nl: "hebben", tenses: {
    present: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
    passe: ["he tenido", "has tenido", "ha tenido", "hemos tenido", "habéis tenido", "han tenido"],
    futur: ["tendré", "tendrás", "tendrá", "tendremos", "tendréis", "tendrán"],
  }, note: "Tener que + infinitief = moeten." },

  { inf: "hacer", nl: "doen / maken", tenses: {
    present: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
    passe: ["he hecho", "has hecho", "ha hecho", "hemos hecho", "habéis hecho", "han hecho"],
    futur: ["haré", "harás", "hará", "haremos", "haréis", "harán"],
  }, note: "Onregelmatig voltooid deelwoord: hecho." },

  { inf: "poder", nl: "kunnen", tenses: {
    present: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
    passe: ["he podido", "has podido", "ha podido", "hemos podido", "habéis podido", "han podido"],
    futur: ["podré", "podrás", "podrá", "podremos", "podréis", "podrán"],
  }, note: "Klinkerwisseling o naar ue, behalve bij nosotros en vosotros." },

  { inf: "querer", nl: "willen", tenses: {
    present: ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
    passe: ["he querido", "has querido", "ha querido", "hemos querido", "habéis querido", "han querido"],
    futur: ["querré", "querrás", "querrá", "querremos", "querréis", "querrán"],
  }, note: "Klinkerwisseling e naar ie." },

  { inf: "ir", nl: "gaan", tenses: {
    present: ["voy", "vas", "va", "vamos", "vais", "van"],
    passe: ["he ido", "has ido", "ha ido", "hemos ido", "habéis ido", "han ido"],
    futur: ["iré", "irás", "irá", "iremos", "iréis", "irán"],
  }, note: "Ir a + infinitief is de gewone toekomende tijd: voy a comer." },

  { inf: "saber", nl: "weten", tenses: {
    present: ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
    passe: ["he sabido", "has sabido", "ha sabido", "hemos sabido", "habéis sabido", "han sabido"],
    futur: ["sabré", "sabrás", "sabrá", "sabremos", "sabréis", "sabrán"],
  }, note: "Sé zonder accent is 'wees' — het accent onderscheidt de twee." },

  { inf: "conocer", nl: "kennen", tenses: {
    present: ["conozco", "conoces", "conoce", "conocemos", "conocéis", "conocen"],
    passe: ["he conocido", "has conocido", "ha conocido", "hemos conocido", "habéis conocido", "han conocido"],
    futur: ["conoceré", "conocerás", "conocerá", "conoceremos", "conoceréis", "conocerán"],
  }, note: "Alleen de yo-vorm is onregelmatig: conozco." },

  { inf: "coger", nl: "pakken", tenses: {
    present: ["cojo", "coges", "coge", "cogemos", "cogéis", "cogen"],
    passe: ["he cogido", "has cogido", "ha cogido", "hemos cogido", "habéis cogido", "han cogido"],
    futur: ["cogeré", "cogerás", "cogerá", "cogeremos", "cogeréis", "cogerán"],
  }, note: "Spelling: g wordt j vóór een o om de klank te bewaren." },

  { inf: "venir", nl: "komen", tenses: {
    present: ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
    passe: ["he venido", "has venido", "ha venido", "hemos venido", "habéis venido", "han venido"],
    futur: ["vendré", "vendrás", "vendrá", "vendremos", "vendréis", "vendrán"],
  } },

  { inf: "ver", nl: "zien", tenses: {
    present: ["veo", "ves", "ve", "vemos", "veis", "ven"],
    passe: ["he visto", "has visto", "ha visto", "hemos visto", "habéis visto", "han visto"],
    futur: ["veré", "verás", "verá", "veremos", "veréis", "verán"],
  }, note: "Onregelmatig voltooid deelwoord: visto." },

  { inf: "decir", nl: "zeggen", tenses: {
    present: ["digo", "dices", "dice", "decimos", "decís", "dicen"],
    passe: ["he dicho", "has dicho", "ha dicho", "hemos dicho", "habéis dicho", "han dicho"],
    futur: ["diré", "dirás", "dirá", "diremos", "diréis", "dirán"],
  }, note: "Onregelmatig voltooid deelwoord: dicho." },

  { inf: "poner", nl: "zetten / doen", tenses: {
    present: ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"],
    passe: ["he puesto", "has puesto", "ha puesto", "hemos puesto", "habéis puesto", "han puesto"],
    futur: ["pondré", "pondrás", "pondrá", "pondremos", "pondréis", "pondrán"],
  }, note: "Onregelmatig voltooid deelwoord: puesto." },

  { inf: "deber", nl: "moeten", tenses: {
    present: ["debo", "debes", "debe", "debemos", "debéis", "deben"],
    passe: ["he debido", "has debido", "ha debido", "hemos debido", "habéis debido", "han debido"],
    futur: ["deberé", "deberás", "deberá", "deberemos", "deberéis", "deberán"],
  }, note: "Volledig regelmatig — een goed voorbeeld van het -er-patroon." },

  { inf: "llevar", nl: "dragen / meenemen", tenses: {
    present: ["llevo", "llevas", "lleva", "llevamos", "lleváis", "llevan"],
    passe: ["he llevado", "has llevado", "ha llevado", "hemos llevado", "habéis llevado", "han llevado"],
    futur: ["llevaré", "llevarás", "llevará", "llevaremos", "llevaréis", "llevarán"],
  }, note: "Het modelwerkwoord voor alles op -ar." },

  { inf: "salir", nl: "weggaan / uitgaan", tenses: {
    present: ["salgo", "sales", "sale", "salimos", "salís", "salen"],
    passe: ["he salido", "has salido", "ha salido", "hemos salido", "habéis salido", "han salido"],
    futur: ["saldré", "saldrás", "saldrá", "saldremos", "saldréis", "saldrán"],
  } },
];
