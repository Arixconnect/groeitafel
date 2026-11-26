export const quarters = [
  {
    id: 1,
    title: "Zichtbaar worden",
    period: "Januari – maart",
    description:
      "Laat zien wie je bent en wat je kunt. Samen geef je je verhaal een gezicht.",
  },
  {
    id: 2,
    title: "De klantreis verbeteren",
    period: "April – juni",
    description:
      "Van een eerste ontmoeting naar een fijne ervaring. Bekijk je werk door de ogen van je klant.",
  },
  {
    id: 3,
    title: "Slimmer werken",
    period: "Juli – september",
    description:
      "Meer ruimte voor goed werk. Ontdek kleine verbeteringen in je dagelijkse routine.",
  },
  {
    id: 4,
    title: "Samen groeien",
    period: "Oktober – december",
    description:
      "Verbind ideeën, deel je kennis en maak een plan dat je samen verder brengt.",
  },
];
export const eveningTypes = [
  "Workshopavond",
  "Vibe code avond",
  "Netwerkavond",
] as const;
export type EveningType = (typeof eveningTypes)[number];
export type Evening = {
  id: string;
  quarter: number;
  type: EveningType;
  title: string;
  description: string;
  result: string;
  needs: string;
  level: string;
  duration: string;
  audience: string;
};
const titles = [
  [
    "Geef je verhaal een gezicht",
    "Bouw je eerste online visitekaartje",
    "Jouw vraag. Iemands talent.",
  ],
  [
    "Loop in de schoenen van je klant",
    "Maak een klikbaar klantpad",
    "Een frisse blik op jouw klantreis",
  ],
  [
    "Ontdek je slimme werkhulp",
    "Van herhaling naar een handige tool",
    "Ruil een uur, win een inzicht",
  ],
  [
    "Maak ruimte voor een samenplan",
    "Bouw een plek voor jullie idee",
    "Laat zien wat er kan groeien",
  ],
];
const results = [
  [
    "Een kernboodschap en drie contentideeën",
    "Een eerste werkend prototype van een profielpagina",
    "Een passende voorbeeldmatch en een concrete vervolgafspraak",
  ],
  [
    "Een klantreis op papier met één verbeterpunt",
    "Een klikbaar prototype van een aanvraagproces",
    "Feedback op je klantreis en een kleine gezamenlijke verbetering",
  ],
  [
    "Een geteste AI-instructie voor een onschuldige oefentaak",
    "Een lokaal prototype van een eenvoudige checklist-tool",
    "Een gedeelde werktip en een actie voor de komende week",
  ],
  [
    "Een eerste samenwerkingsplan met heldere rollen",
    "Een prototype van een gezamenlijke projectpagina",
    "Een korte presentatie en een vervolgplan voor zeven dagen",
  ],
];
export const evenings: Evening[] = quarters.flatMap((q) =>
  eveningTypes.map((type, i) => ({
    id: `q${q.id}-${["workshop", "vibe-code", "netwerk"][i]}`,
    quarter: q.id,
    type,
    title: titles[q.id - 1][i],
    description: [
      "Breng je ervaring mee. Verken een nieuwe aanpak en pas die meteen toe op een eigen idee.",
      "Een idee in je hoofd? Bouw met hulp van AI een eerste digitale versie, samen met iemand aan tafel.",
      "Ontmoet een ondernemer of maker, wissel je hulpvraag uit en doe samen een kleine opdracht.",
    ][i],
    result: results[q.id - 1][i],
    needs:
      i === 1
        ? "Een laptop, oplader en een klein idee. Gebruik alleen fictieve gegevens."
        : i === 0
          ? "Een laptop of notitieboekje en een vraag uit je eigen praktijk."
          : "Een hulpvraag, iets dat je kunt delen en een open blik.",
    level: "Nieuwsgierig is genoeg",
    duration: i === 2 ? "2 uur" : "2,5 uur",
    audience:
      "Lokale ondernemers en jonge makers. Ervaring met AI of programmeren is niet nodig.",
  })),
);
export const method = [
  {
    title: "Matchtafel",
    tag: "Ik zoek / ik bied",
    text: "Schrijf op waar je hulp bij zoekt én wat jij kunt delen. Vind iemand bij wie dat aansluit.",
    example:
      "Een ondernemer zoekt een frisse uitstraling. Een maker wil leren hoe je klanten vindt.",
  },
  {
    title: "Waarde-uitwisseling",
    tag: "Allebei iets te brengen",
    text: "Bespreek wat je voor elkaar kunt betekenen. Ervaring en creativiteit tellen allebei mee.",
    example:
      "Jij helpt met een visueel concept. Je tafelgenoot denkt mee over je eerste klantgesprek.",
  },
  {
    title: "Bouwtafel",
    tag: "Handen uit de mouwen",
    text: "Kies één klein resultaat en maak het samen. Liever een bruikbaar begin dan een perfect plan.",
    example:
      "Maak samen een eerste profielpagina met een helder verhaal en een eigen uitstraling.",
  },
  {
    title: "Laat zien",
    tag: "Probeer, deel, verbeter",
    text: "Laat je werk aan een andere tafel zien. Test of je idee begrijpelijk is en vraag gerichte feedback.",
    example:
      "Begrijpt een ander binnen tien seconden wat je aanbiedt? Pas één ding aan.",
  },
  {
    title: "Volgende stap",
    tag: "Binnen zeven dagen",
    text: "Spreek af wie wat doet en wanneer. Zo krijgt het werk van vanavond een vervolg.",
    example:
      "Test de pagina deze week met één mogelijke klant en bespreek wat je hebt geleerd.",
  },
];
