// Het studieplan. Persoonlijk: Nederlandstalig, A2/B1 in beide talen,
// twee talen tegelijk, ~10 minuten per taal per dag, doel = reizen en gesprek.

export const plan = {
  kern: `Je bottleneck op A2/B1 is niet begrijpen maar <em>ophalen</em>. Je herkent
  veel meer dan je kunt produceren. Daarom is dit plan bewust productie-zwaar:
  meerkeuzevragen komen er niet in voor. Je typt, je schrijft, je zegt hardop.`,

  interferentie: `Frans en Spaans zijn neven. Twee neven tegelijk leren op hetzelfde
  niveau geeft <em>interferentie</em>: je grijpt in het Frans naar een Spaans woord.
  Dit plan bouwt daar drie tegenmaatregelen tegenin:`,

  interferentieRegels: [
    "Nooit in dezelfde sessie. Frans en Spaans krijgen elk een eigen blok, het liefst op een ander moment van de dag (bijvoorbeeld Frans bij de koffie, Spaans na het eten).",
    "Elke taal een eigen kleur en eigen stem in de app. Context is een geheugenhaak: hoe meer de twee omgevingen verschillen, hoe minder ze op elkaar lekken.",
    "Verwarpaar-notities. Waar de twee talen botsen (wisselgeld, recept, verdieping) krijg je expliciet het contrast te zien in plaats van dat je het zelf ontdekt via een fout.",
  ],

  fases: [
    {
      n: 1,
      titel: "Heractivering",
      duur: "week 1–4",
      doel: "Weggezakte schoolkennis terughalen en weer bereikbaar maken.",
      wat: "30 hoogfrequente bouwstenen per taal: <em>il y a</em>, <em>hay que</em>, <em>du coup</em>, <em>así que</em>. Geen losse zelfstandige naamwoorden maar constructies die in honderden zinnen terugkomen.",
      focus: "Herkennen en ontdooien. Beoordeel jezelf hier mild — het gaat om snelheid van ophalen, niet om perfectie.",
    },
    {
      n: 2,
      titel: "Situaties",
      duur: "week 5–12",
      doel: "Je redden in de situaties waar je de taal echt gebruikt.",
      wat: "70 items per taal in blokken: reizen, overnachten, eten, winkelen, de weg vragen, small talk, meningen, problemen oplossen. Alles in een volledige zin, nooit los.",
      focus: "Productie. Vanaf hier typ je het antwoord zelf in plaats van het te herkennen. De schrijfopdracht wordt dagelijks.",
    },
    {
      n: 3,
      titel: "Spreektaal",
      duur: "week 13–24",
      doel: "Klinken als iemand die de taal gebruikt, niet als iemand die hem geleerd heeft.",
      wat: "25 items per taal: stopwoorden, connectoren en informele wendingen (<em>carrément</em>, <em>n'empêche</em>, <em>vaya tela</em>, <em>o sea</em>). Dit is precies wat op B1 meestal ontbreekt.",
      focus: "Luisteren en invullen. Je krijgt de zin gesproken en typt wat je hoort.",
    },
    {
      n: 4,
      titel: "Onderhoud",
      duur: "doorlopend",
      doel: "Niet meer verliezen wat je hebt, en uitbreiden vanuit echt materiaal.",
      wat: "Het herhaalalgoritme doet het werk. Nieuwe woorden komen nu uit wat je zelf tegenkomt: een podcast, een menukaart, een serie. Voeg ze toe aan je deck.",
      focus: "Volume omlaag, moeilijkheid omhoog.",
    },
  ],

  sessie: [
    { t: "1 min", k: "Opwarmen", d: "De eerste kaarten zijn herhalingen van gisteren. Lage drempel, meteen een succesje." },
    { t: "4 min", k: "Herhalen", d: "Alle kaarten die vandaag aan de beurt zijn. Dit is het belangrijkste blok — sla het nooit over, ook niet op een drukke dag." },
    { t: "3 min", k: "Nieuw", d: "5 nieuwe items, altijd met zin en audio erbij. Zeg elke zin één keer hardop." },
    { t: "2 min", k: "Schrijven", d: "Eén korte schrijfopdracht in de doeltaal. Twee of drie zinnen is genoeg." },
  ],

  regels: [
    {
      k: "Herhalingen zijn verplicht, nieuwe woorden niet.",
      d: "Op een drukke dag doe je alleen het herhaalblok. Dat kost twee minuten en houdt je hele bouwwerk overeind. Nieuwe woorden toevoegen aan een niet-onderhouden deck is dweilen met de kraan open.",
    },
    {
      k: "Zeg het hardop, altijd.",
      d: "Ook bij een typeoefening. Je bouwt een motorisch spoor op dat je niet krijgt van lezen alleen. Dit is het verschil tussen 'ik ken het woord' en 'ik kan het zeggen'.",
    },
    {
      k: "Fout is data, geen mislukking.",
      d: "Druk op 'Opnieuw' zodra je twijfelde. Een kaart die je met moeite goed had, komt te snel terug als je hem 'Goed' geeft — en dan lijkt hij vier weken later ineens nieuw.",
    },
    {
      k: "Vijf woorden per dag per taal is het maximum, niet het minimum.",
      d: "5 per taal per dag is ongeveer 1800 per jaar per taal. Dat is meer dan genoeg voor vloeiend reizen en gesprek. Meer nieuwe woorden betekent vooral: een grotere herhaalberg over drie weken.",
    },
    {
      k: "Wekelijks: schrijf vijf zinnen over je week.",
      d: "Zondag, in beide talen, zonder woordenboek. Waar je vastloopt, dáár zit je volgende leerdoel. Noteer die gaten — dat is waardevoller dan welke frequentielijst ook.",
    },
  ],
};

// Schrijfopdrachten: kort, concreet, en gekoppeld aan de thema's uit het deck.
export const prompts = {
  fr: [
    "Décris ta journée d'hier en trois phrases.",
    "Tu réserves une table pour ce soir. Écris le message au restaurant.",
    "Explique à un ami pourquoi tu apprends le français.",
    "Décris la ville où tu habites en quatre phrases.",
    "Tu as raté ton train. Écris ce que tu dis au guichet.",
    "Qu'est-ce que tu as mangé hier soir ? Décris-le.",
    "Écris trois choses que tu veux faire ce week-end.",
    "Ta chambre d'hôtel a un problème. Explique-le à la réception.",
    "Présente-toi : ton nom, ton travail, ce que tu aimes.",
    "Décris le trajet de chez toi à la boulangerie la plus proche.",
    "Tu veux échanger un pull acheté hier. Que dis-tu au vendeur ?",
    "Raconte un bon souvenir de vacances en quatre phrases.",
    "Qu'est-ce qui t'énerve dans les transports en commun ?",
    "Écris un message pour annuler un rendez-vous et proposer une autre date.",
    "Décris quelqu'un que tu aimes bien, sans dire son nom.",
    "Tu es perdue en ville. Demande ton chemin à quelqu'un.",
    "Quel est le meilleur repas que tu aies mangé cette année ?",
    "Écris trois phrases avec 'du coup', 'en fait' et 'quand même'.",
    "Décris le temps qu'il fait aujourd'hui et ce que ça change à ta journée.",
    "Tu recommandes ta ville à un touriste. Que faut-il voir absolument ?",
    "Raconte ce que tu as fait le week-end dernier.",
    "Écris une plainte polie : ta commande n'est jamais arrivée.",
    "Qu'est-ce que tu ferais avec une semaine de vacances en plus ?",
    "Décris ton travail à quelqu'un qui n'y connaît rien.",
    "Écris trois phrases sur ce que tu as appris cette semaine.",
    "Qu'est-ce que tu aimes faire le dimanche matin ?",
    "Tu proposes un verre à un collègue. Écris le message.",
    "Décris une chose que tu trouves difficile en français, et pourquoi.",
  ],
  es: [
    "Describe tu día de ayer en tres frases.",
    "Reservas una mesa para esta noche. Escribe el mensaje al restaurante.",
    "Explica a un amigo por qué estás aprendiendo español.",
    "Describe la ciudad donde vives en cuatro frases.",
    "Has perdido el tren. Escribe lo que dices en la taquilla.",
    "¿Qué cenaste ayer? Descríbelo.",
    "Escribe tres cosas que quieres hacer este fin de semana.",
    "Tu habitación de hotel tiene un problema. Explícalo en recepción.",
    "Preséntate: tu nombre, tu trabajo, lo que te gusta.",
    "Describe el camino de tu casa a la panadería más cercana.",
    "Quieres cambiar un jersey que compraste ayer. ¿Qué le dices al dependiente?",
    "Cuenta un buen recuerdo de vacaciones en cuatro frases.",
    "¿Qué te molesta del transporte público?",
    "Escribe un mensaje para cancelar una cita y proponer otra fecha.",
    "Describe a alguien que te cae bien, sin decir su nombre.",
    "Te has perdido en la ciudad. Pregunta el camino a alguien.",
    "¿Cuál ha sido la mejor comida de este año?",
    "Escribe tres frases con 'así que', 'en realidad' y 'aun así'.",
    "Describe el tiempo que hace hoy y cómo cambia tu día.",
    "Recomiendas tu ciudad a un turista. ¿Qué hay que ver sin falta?",
    "Cuenta qué hiciste el fin de semana pasado.",
    "Escribe una queja educada: tu pedido nunca llegó.",
    "¿Qué harías con una semana más de vacaciones?",
    "Describe tu trabajo a alguien que no sabe nada del tema.",
    "Escribe tres frases sobre lo que has aprendido esta semana.",
    "¿Qué te gusta hacer los domingos por la mañana?",
    "Propones tomar algo a un compañero. Escribe el mensaje.",
    "Describe algo que te resulta difícil en español, y por qué.",
  ],
};

export function promptForDay(code, dayKey) {
  const list = prompts[code];
  const seed = [...dayKey].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return list[seed % list.length];
}
