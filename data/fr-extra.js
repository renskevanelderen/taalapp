// Frans — uitbreiding: telwoorden, tijd, werkwoorden (met vervoegingen)
// en bijvoeglijke naamwoorden. Fase 4.
//
// Bewust géén kaarten voor "deux", "trois", "quatre": die ken je. De
// telwoorden hieronder zijn de vormen waar Nederlandstaligen op stuklopen.

export const items = [
  // ---------- Telwoorden ----------
  { id: "fr-x001", target: "soixante-dix", nl: "zeventig (70)", s: "Le billet coûte {soixante-dix} euros.", sNl: "Het kaartje kost zeventig euro.", theme: "getallen", phase: 4, note: "Letterlijk 'zestig-tien'. In België en Zwitserland zeggen ze wel septante." },
  { id: "fr-x002", target: "soixante-quinze", nl: "vijfenzeventig (75)", s: "Elle a {soixante-quinze} ans.", sNl: "Zij is vijfenzeventig.", theme: "getallen", phase: 4, note: "60 + 15. Tel vanaf 60 door in tientallen van twintig." },
  { id: "fr-x003", target: "quatre-vingts", nl: "tachtig (80)", s: "Mon grand-père a {quatre-vingts} ans.", sNl: "Mijn opa is tachtig.", theme: "getallen", phase: 4, note: "Letterlijk 'vier-twintig'. Alleen een -s als er niets achter komt: quatre-vingt-un." },
  { id: "fr-x004", target: "quatre-vingt-dix", nl: "negentig (90)", s: "Il y avait {quatre-vingt-dix} personnes.", sNl: "Er waren negentig mensen.", theme: "getallen", phase: 4 },
  { id: "fr-x005", target: "vingt et un", nl: "eenentwintig (21)", s: "Il y a {vingt et un} élèves dans la classe.", sNl: "Er zitten eenentwintig leerlingen in de klas.", theme: "getallen", phase: 4, note: "Bij 21, 31, 41, 51 en 61 komt er 'et' tussen, zonder streepjes. Daarna weer met streepje: vingt-deux." },
  { id: "fr-x006", target: "cent", nl: "honderd (100)", s: "Ça fait {cent} euros tout rond.", sNl: "Dat is honderd euro rond.", theme: "getallen", phase: 4 },
  { id: "fr-x007", target: "deux cents", nl: "tweehonderd (200)", s: "Le vol coûte {deux cents} euros.", sNl: "De vlucht kost tweehonderd euro.", theme: "getallen", phase: 4, note: "Cents krijgt een -s, behalve als er nog een getal achter komt: deux cent cinquante." },
  { id: "fr-x008", target: "mille", nl: "duizend (1000)", s: "Il y a {mille} kilomètres jusqu'à Marseille.", sNl: "Het is duizend kilometer naar Marseille.", theme: "getallen", phase: 4, note: "Mille krijgt nooit een -s." },
  { id: "fr-x009", target: "un million", nl: "een miljoen", s: "La ville compte {un million} d'habitants.", sNl: "De stad telt een miljoen inwoners.", theme: "getallen", phase: 4, note: "Wel met de: un million d'habitants." },
  { id: "fr-x010", target: "premier / première", nl: "eerste", s: "C'est la {première} fois que je viens ici.", sNl: "Dit is de eerste keer dat ik hier kom.", theme: "getallen", phase: 4, note: "Alleen 'eerste' heeft een eigen vorm; vanaf twee is het -ième." },
  { id: "fr-x011", target: "deuxième", nl: "tweede", s: "Prenez la {deuxième} rue à gauche.", sNl: "Neem de tweede straat links.", theme: "getallen", phase: 4 },
  { id: "fr-x012", target: "troisième", nl: "derde", s: "J'habite au {troisième} étage.", sNl: "Ik woon op de derde verdieping.", theme: "getallen", phase: 4 },
  { id: "fr-x013", target: "le dernier / la dernière", nl: "de laatste", s: "C'est {le dernier} train pour Lyon.", sNl: "Dit is de laatste trein naar Lyon.", theme: "getallen", phase: 4 },
  { id: "fr-x014", target: "la moitié", nl: "de helft", s: "J'ai mangé {la moitié} de la pizza.", sNl: "Ik heb de helft van de pizza gegeten.", theme: "getallen", phase: 4 },
  { id: "fr-x015", target: "un quart", nl: "een kwart", s: "Il reste {un quart} du gâteau.", sNl: "Er is nog een kwart van de taart over.", theme: "getallen", phase: 4 },
  { id: "fr-x016", target: "un tiers", nl: "een derde", s: "{Un tiers} des places sont libres.", sNl: "Een derde van de plaatsen is vrij.", theme: "getallen", phase: 4 },
  { id: "fr-x017", target: "une dizaine", nl: "een stuk of tien", s: "Il y avait {une dizaine} de personnes.", sNl: "Er waren een stuk of tien mensen.", theme: "getallen", phase: 4, note: "Zo maak je van elk tiental een schatting: une vingtaine, une centaine." },
  { id: "fr-x018", target: "la plupart", nl: "de meeste", s: "{La plupart} des gens préfèrent le train.", sNl: "De meeste mensen nemen liever de trein.", theme: "getallen", phase: 4 },
  { id: "fr-x019", target: "et demie", nl: "half (bij tijd)", s: "Le train part à sept heures {et demie}.", sNl: "De trein vertrekt om half acht.", theme: "getallen", phase: 4, note: "Let op: sept heures et demie is half ACHT. Frans telt vanaf het hele uur." },
  { id: "fr-x020", target: "moins le quart", nl: "kwart voor", s: "On se retrouve à huit heures {moins le quart}.", sNl: "We zien elkaar om kwart voor acht.", theme: "getallen", phase: 4 },

  // ---------- Tijd ----------
  { id: "fr-x021", target: "avant-hier", nl: "eergisteren", s: "Je l'ai vue {avant-hier} au marché.", sNl: "Ik zag haar eergisteren op de markt.", theme: "tijd", phase: 4 },
  { id: "fr-x022", target: "après-demain", nl: "overmorgen", s: "On part {après-demain} matin.", sNl: "We vertrekken overmorgenochtend.", theme: "tijd", phase: 4 },
  { id: "fr-x023", target: "la semaine prochaine", nl: "volgende week", s: "Je reviens {la semaine prochaine}.", sNl: "Ik kom volgende week terug.", theme: "tijd", phase: 4 },
  { id: "fr-x024", target: "la semaine dernière", nl: "vorige week", s: "Il a plu toute {la semaine dernière}.", sNl: "Het heeft vorige week de hele week geregend.", theme: "tijd", phase: 4 },
  { id: "fr-x025", target: "tout à l'heure", nl: "straks / zonet", s: "Je te rappelle {tout à l'heure}.", sNl: "Ik bel je straks terug.", theme: "tijd", phase: 4, note: "Werkt beide kanten op: straks én zojuist. De werkwoordstijd verraadt welke." },
  { id: "fr-x026", target: "en ce moment", nl: "op dit moment", s: "{En ce moment}, je travaille beaucoup.", sNl: "Op dit moment werk ik veel.", theme: "tijd", phase: 4 },
  { id: "fr-x027", target: "d'habitude", nl: "meestal / gewoonlijk", s: "{D'habitude}, je prends le vélo.", sNl: "Meestal pak ik de fiets.", theme: "tijd", phase: 4 },
  { id: "fr-x028", target: "de temps en temps", nl: "af en toe", s: "On y va {de temps en temps}.", sNl: "We gaan er af en toe heen.", theme: "tijd", phase: 4 },
  { id: "fr-x029", target: "tous les jours", nl: "elke dag", s: "Elle court {tous les jours}.", sNl: "Zij rent elke dag.", theme: "tijd", phase: 4 },
  { id: "fr-x030", target: "à l'heure", nl: "op tijd", s: "Le train est arrivé {à l'heure}.", sNl: "De trein kwam op tijd aan.", theme: "tijd", phase: 4, note: "Verwar niet met tout à l'heure (straks)." },
  { id: "fr-x031", target: "en retard", nl: "te laat", s: "Désolée, je suis {en retard}.", sNl: "Sorry, ik ben te laat.", theme: "tijd", phase: 4 },
  { id: "fr-x032", target: "le lendemain", nl: "de dag erna", s: "{Le lendemain}, il faisait beau.", sNl: "De dag erna was het mooi weer.", theme: "tijd", phase: 4 },
  { id: "fr-x033", target: "la veille", nl: "de dag ervoor", s: "On était arrivés {la veille}.", sNl: "We waren de dag ervoor aangekomen.", theme: "tijd", phase: 4 },
  { id: "fr-x034", target: "toute la journée", nl: "de hele dag", s: "J'ai marché {toute la journée}.", sNl: "Ik heb de hele dag gelopen.", theme: "tijd", phase: 4, note: "Journée benadrukt de duur, jour het punt op de kalender." },

  // ---------- Werkwoorden (zie de vervoegingstabel op de kaart) ----------
  { id: "fr-x035", target: "être", nl: "zijn", s: "Je pense qu'elle {est} déjà partie.", sNl: "Ik denk dat ze al vertrokken is.", theme: "werkwoorden", phase: 4, note: "Hulpwerkwoord bij beweging en bij wederkerende werkwoorden." },
  { id: "fr-x036", target: "avoir", nl: "hebben", s: "Tu {as} de la chance !", sNl: "Jij hebt geluk!", theme: "werkwoorden", phase: 4, note: "Frans gebruikt avoir waar het Nederlands 'zijn' zegt: j'ai froid, j'ai faim." },
  { id: "fr-x037", target: "aller", nl: "gaan", s: "On {va} au marché demain matin.", sNl: "We gaan morgenochtend naar de markt.", theme: "werkwoorden", phase: 4, note: "Aller + infinitief is de makkelijkste toekomende tijd: je vais partir." },
  { id: "fr-x038", target: "faire", nl: "doen / maken", s: "Qu'est-ce que tu {fais} ce week-end ?", sNl: "Wat doe je dit weekend?", theme: "werkwoorden", phase: 4, note: "Ook voor weer en sport: il fait beau, faire du vélo." },
  { id: "fr-x039", target: "pouvoir", nl: "kunnen / mogen", s: "Est-ce que tu {peux} m'aider une minute ?", sNl: "Kun je me even helpen?", theme: "werkwoorden", phase: 4 },
  { id: "fr-x040", target: "vouloir", nl: "willen", s: "Ils {veulent} partir plus tôt.", sNl: "Zij willen eerder weg.", theme: "werkwoorden", phase: 4, note: "In een verzoek klinkt je veux bot; gebruik je voudrais." },
  { id: "fr-x041", target: "devoir", nl: "moeten", s: "Je {dois} rentrer avant minuit.", sNl: "Ik moet voor middernacht thuis zijn.", theme: "werkwoorden", phase: 4 },
  { id: "fr-x042", target: "savoir", nl: "weten / kunnen (geleerd)", s: "Tu {sais} où sont mes lunettes ?", sNl: "Weet jij waar mijn bril is?", theme: "werkwoorden", phase: 4, note: "Savoir = feiten en vaardigheden, connaître = personen en plaatsen kennen." },
  { id: "fr-x043", target: "connaître", nl: "kennen", s: "Tu {connais} un bon restaurant par ici ?", sNl: "Ken jij hier een goed restaurant?", theme: "werkwoorden", phase: 4 },
  { id: "fr-x044", target: "prendre", nl: "nemen / pakken", s: "On {prend} le train de huit heures.", sNl: "We nemen de trein van acht uur.", theme: "werkwoorden", phase: 4 },
  { id: "fr-x045", target: "venir", nl: "komen", s: "Elle {vient} de Bordeaux.", sNl: "Zij komt uit Bordeaux.", theme: "werkwoorden", phase: 4, note: "Venir de + infinitief betekent 'net gedaan hebben': je viens de manger." },
  { id: "fr-x046", target: "voir", nl: "zien", s: "Je ne {vois} rien sans mes lunettes.", sNl: "Ik zie niets zonder mijn bril.", theme: "werkwoorden", phase: 4 },
  { id: "fr-x047", target: "dire", nl: "zeggen", s: "Qu'est-ce que tu {dis} ?", sNl: "Wat zeg je?", theme: "werkwoorden", phase: 4, note: "Vous dites, niet vous disez — een van de drie uitzonderingen op -ez." },
  { id: "fr-x048", target: "mettre", nl: "zetten / aantrekken", s: "Je {mets} une veste, il fait froid.", sNl: "Ik trek een jas aan, het is koud.", theme: "werkwoorden", phase: 4 },
  { id: "fr-x049", target: "partir", nl: "vertrekken", s: "On {part} à six heures du matin.", sNl: "We vertrekken om zes uur 's ochtends.", theme: "werkwoorden", phase: 4, note: "Partir = weggaan, sortir = naar buiten of uitgaan, quitter = iets of iemand verlaten." },

  // ---------- Bijvoeglijke naamwoorden ----------
  { id: "fr-x050", target: "content / contente", nl: "blij / tevreden", s: "Je suis très {contente} de te voir.", sNl: "Ik ben heel blij je te zien.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x051", target: "fatigué / fatiguée", nl: "moe", s: "Elle est trop {fatiguée} pour sortir.", sNl: "Ze is te moe om uit te gaan.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x052", target: "cher / chère", nl: "duur", s: "Ce restaurant est vraiment {cher}.", sNl: "Dit restaurant is echt duur.", theme: "eigenschappen", phase: 4, note: "Vóór het zelfstandig naamwoord betekent het 'lieve': ma chère amie." },
  { id: "fr-x053", target: "bon marché", nl: "goedkoop", s: "Ces chaussures sont {bon marché}.", sNl: "Deze schoenen zijn goedkoop.", theme: "eigenschappen", phase: 4, note: "Verandert nooit van vorm. Pas cher kan ook." },
  { id: "fr-x054", target: "gentil / gentille", nl: "aardig", s: "C'est très {gentil} de ta part.", sNl: "Dat is heel aardig van je.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x055", target: "sympa", nl: "leuk / gezellig", s: "Ses collègues sont super {sympas}.", sNl: "Haar collega's zijn heel leuk.", theme: "eigenschappen", phase: 4, note: "Informeel, kort voor sympathique. Geen aparte vrouwelijke vorm." },
  { id: "fr-x056", target: "moche", nl: "lelijk", s: "Ce pull est vraiment {moche}.", sNl: "Die trui is echt lelijk.", theme: "eigenschappen", phase: 4, note: "Informeel maar heel gewoon." },
  { id: "fr-x057", target: "génial / géniale", nl: "geweldig", s: "Ton idée est {géniale} !", sNl: "Jouw idee is geweldig!", theme: "eigenschappen", phase: 4 },
  { id: "fr-x058", target: "pénible", nl: "vervelend / lastig", s: "Il est un peu {pénible} le matin.", sNl: "Hij is 's ochtends een beetje vervelend.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x059", target: "pressé / pressée", nl: "haast hebbend", s: "Désolée, je suis {pressée}.", sNl: "Sorry, ik heb haast.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x060", target: "prêt / prête", nl: "klaar / gereed", s: "Tu es {prête} à partir ?", sNl: "Ben je klaar om te gaan?", theme: "eigenschappen", phase: 4 },
  { id: "fr-x061", target: "occupé / occupée", nl: "bezig / bezet", s: "La salle de bains est {occupée}.", sNl: "De badkamer is bezet.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x062", target: "lourd / lourde", nl: "zwaar", s: "Ma valise est trop {lourde}.", sNl: "Mijn koffer is te zwaar.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x063", target: "vide", nl: "leeg", s: "Le frigo est complètement {vide}.", sNl: "De koelkast is helemaal leeg.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x064", target: "plein / pleine", nl: "vol", s: "Le bus était {plein} ce matin.", sNl: "De bus zat vanochtend vol.", theme: "eigenschappen", phase: 4 },
  { id: "fr-x065", target: "propre", nl: "schoon", s: "La chambre était très {propre}.", sNl: "De kamer was heel schoon.", theme: "eigenschappen", phase: 4, note: "Vóór het zelfstandig naamwoord betekent het 'eigen': ma propre voiture." },
  { id: "fr-x066", target: "sale", nl: "vuil", s: "Mes chaussures sont {sales}.", sNl: "Mijn schoenen zijn vuil.", theme: "eigenschappen", phase: 4, note: "Niet verwarren met het Spaanse sale (hij gaat naar buiten)." },
  { id: "fr-x067", target: "doux / douce", nl: "zacht / mild", s: "L'hiver a été très {doux} cette année.", sNl: "De winter was dit jaar heel zacht.", theme: "eigenschappen", phase: 4 },
];

// Vervoegingen — verschijnen op de kaart van het bijbehorende werkwoord.
export const verbs = [
  { inf: "être", nl: "zijn", tenses: {
    present: ["je suis", "tu es", "il/elle est", "nous sommes", "vous êtes", "ils/elles sont"],
    passe: ["j'ai été", "tu as été", "il/elle a été", "nous avons été", "vous avez été", "ils/elles ont été"],
    futur: ["je serai", "tu seras", "il/elle sera", "nous serons", "vous serez", "ils/elles seront"],
  }, note: "Hulpwerkwoord bij beweging (aller, venir, partir) en bij alle wederkerende werkwoorden." },

  { inf: "avoir", nl: "hebben", tenses: {
    present: ["j'ai", "tu as", "il/elle a", "nous avons", "vous avez", "ils/elles ont"],
    passe: ["j'ai eu", "tu as eu", "il/elle a eu", "nous avons eu", "vous avez eu", "ils/elles ont eu"],
    futur: ["j'aurai", "tu auras", "il/elle aura", "nous aurons", "vous aurez", "ils/elles auront"],
  }, note: "Het gewone hulpwerkwoord voor de passé composé." },

  { inf: "aller", nl: "gaan", tenses: {
    present: ["je vais", "tu vas", "il/elle va", "nous allons", "vous allez", "ils/elles vont"],
    passe: ["je suis allé(e)", "tu es allé(e)", "il/elle est allé(e)", "nous sommes allé(e)s", "vous êtes allé(e)(s)", "ils/elles sont allé(e)s"],
    futur: ["j'irai", "tu iras", "il/elle ira", "nous irons", "vous irez", "ils/elles iront"],
  }, note: "De toekomende tijd komt van een heel andere stam: ir-." },

  { inf: "faire", nl: "doen / maken", tenses: {
    present: ["je fais", "tu fais", "il/elle fait", "nous faisons", "vous faites", "ils/elles font"],
    passe: ["j'ai fait", "tu as fait", "il/elle a fait", "nous avons fait", "vous avez fait", "ils/elles ont fait"],
    futur: ["je ferai", "tu feras", "il/elle fera", "nous ferons", "vous ferez", "ils/elles feront"],
  }, note: "Vous faites, niet vous faisez." },

  { inf: "pouvoir", nl: "kunnen / mogen", tenses: {
    present: ["je peux", "tu peux", "il/elle peut", "nous pouvons", "vous pouvez", "ils/elles peuvent"],
    passe: ["j'ai pu", "tu as pu", "il/elle a pu", "nous avons pu", "vous avez pu", "ils/elles ont pu"],
    futur: ["je pourrai", "tu pourras", "il/elle pourra", "nous pourrons", "vous pourrez", "ils/elles pourront"],
  }, note: "In een beleefde vraag: pourriez-vous." },

  { inf: "vouloir", nl: "willen", tenses: {
    present: ["je veux", "tu veux", "il/elle veut", "nous voulons", "vous voulez", "ils/elles veulent"],
    passe: ["j'ai voulu", "tu as voulu", "il/elle a voulu", "nous avons voulu", "vous avez voulu", "ils/elles ont voulu"],
    futur: ["je voudrai", "tu voudras", "il/elle voudra", "nous voudrons", "vous voudrez", "ils/elles voudront"],
  }, note: "Je voudrais is de beleefde vorm die je in winkels gebruikt." },

  { inf: "devoir", nl: "moeten", tenses: {
    present: ["je dois", "tu dois", "il/elle doit", "nous devons", "vous devez", "ils/elles doivent"],
    passe: ["j'ai dû", "tu as dû", "il/elle a dû", "nous avons dû", "vous avez dû", "ils/elles ont dû"],
    futur: ["je devrai", "tu devras", "il/elle devra", "nous devrons", "vous devrez", "ils/elles devront"],
  } },

  { inf: "savoir", nl: "weten", tenses: {
    present: ["je sais", "tu sais", "il/elle sait", "nous savons", "vous savez", "ils/elles savent"],
    passe: ["j'ai su", "tu as su", "il/elle a su", "nous avons su", "vous avez su", "ils/elles ont su"],
    futur: ["je saurai", "tu sauras", "il/elle saura", "nous saurons", "vous saurez", "ils/elles sauront"],
  }, note: "Feiten en aangeleerde vaardigheden. Personen en plaatsen: connaître." },

  { inf: "connaître", nl: "kennen", tenses: {
    present: ["je connais", "tu connais", "il/elle connaît", "nous connaissons", "vous connaissez", "ils/elles connaissent"],
    passe: ["j'ai connu", "tu as connu", "il/elle a connu", "nous avons connu", "vous avez connu", "ils/elles ont connu"],
    futur: ["je connaîtrai", "tu connaîtras", "il/elle connaîtra", "nous connaîtrons", "vous connaîtrez", "ils/elles connaîtront"],
  } },

  { inf: "prendre", nl: "nemen", tenses: {
    present: ["je prends", "tu prends", "il/elle prend", "nous prenons", "vous prenez", "ils/elles prennent"],
    passe: ["j'ai pris", "tu as pris", "il/elle a pris", "nous avons pris", "vous avez pris", "ils/elles ont pris"],
    futur: ["je prendrai", "tu prendras", "il/elle prendra", "nous prendrons", "vous prendrez", "ils/elles prendront"],
  }, note: "Zelfde patroon: apprendre, comprendre, surprendre." },

  { inf: "venir", nl: "komen", tenses: {
    present: ["je viens", "tu viens", "il/elle vient", "nous venons", "vous venez", "ils/elles viennent"],
    passe: ["je suis venu(e)", "tu es venu(e)", "il/elle est venu(e)", "nous sommes venu(e)s", "vous êtes venu(e)(s)", "ils/elles sont venu(e)s"],
    futur: ["je viendrai", "tu viendras", "il/elle viendra", "nous viendrons", "vous viendrez", "ils/elles viendront"],
  }, note: "Venir de + infinitief = net gedaan hebben." },

  { inf: "voir", nl: "zien", tenses: {
    present: ["je vois", "tu vois", "il/elle voit", "nous voyons", "vous voyez", "ils/elles voient"],
    passe: ["j'ai vu", "tu as vu", "il/elle a vu", "nous avons vu", "vous avez vu", "ils/elles ont vu"],
    futur: ["je verrai", "tu verras", "il/elle verra", "nous verrons", "vous verrez", "ils/elles verront"],
  } },

  { inf: "dire", nl: "zeggen", tenses: {
    present: ["je dis", "tu dis", "il/elle dit", "nous disons", "vous dites", "ils/elles disent"],
    passe: ["j'ai dit", "tu as dit", "il/elle a dit", "nous avons dit", "vous avez dit", "ils/elles ont dit"],
    futur: ["je dirai", "tu diras", "il/elle dira", "nous dirons", "vous direz", "ils/elles diront"],
  }, note: "Vous dites — samen met vous faites en vous êtes de enige drie op -tes." },

  { inf: "mettre", nl: "zetten / aantrekken", tenses: {
    present: ["je mets", "tu mets", "il/elle met", "nous mettons", "vous mettez", "ils/elles mettent"],
    passe: ["j'ai mis", "tu as mis", "il/elle a mis", "nous avons mis", "vous avez mis", "ils/elles ont mis"],
    futur: ["je mettrai", "tu mettras", "il/elle mettra", "nous mettrons", "vous mettrez", "ils/elles mettront"],
  } },

  { inf: "partir", nl: "vertrekken", tenses: {
    present: ["je pars", "tu pars", "il/elle part", "nous partons", "vous partez", "ils/elles partent"],
    passe: ["je suis parti(e)", "tu es parti(e)", "il/elle est parti(e)", "nous sommes parti(e)s", "vous êtes parti(e)(s)", "ils/elles sont parti(e)s"],
    futur: ["je partirai", "tu partiras", "il/elle partira", "nous partirons", "vous partirez", "ils/elles partiront"],
  }, note: "Zelfde patroon: sortir, dormir, sentir, servir." },
];
