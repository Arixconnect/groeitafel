import { evenings } from "./program";
export type Product = {
  id: string;
  name: string;
  price: number;
  kind: "ticket" | "physical";
  description: string;
  art: "ticket" | "notebook" | "cards" | "bag";
  eventId?: string;
  variant?: string;
};
export const accessories: Product[] = [
  {
    id: "notitieboek",
    name: "Ruimte voor grote ideeën",
    price: 1250,
    kind: "physical",
    description:
      "Het Groeitafel-notitieboekje. Een A5-concept met blanco pagina’s voor schetsen, vragen en plannen. Uitvoering nog te bepalen.",
    art: "notebook",
  },
  {
    id: "kaartenset",
    name: "Een goed begin op tafel",
    price: 1750,
    kind: "physical",
    description:
      "De Groeitafel-kaartenset. Een concept voor 30 vragen die een gesprek op gang brengen. Inhoud en materiaal nog te bepalen.",
    art: "cards",
  },
  {
    id: "totebag",
    name: "Neem je ideeën mee",
    price: 1500,
    kind: "physical",
    description:
      "De Groeitafel-totebag. Een stoffen draagtas als concept. Materiaal, formaat en productie nog te bepalen.",
    art: "bag",
  },
];
export const tickets: Product[] = evenings.flatMap((e) => [
  {
    id: `${e.id}-regulier`,
    name: e.title,
    price: 1500,
    kind: "ticket" as const,
    description: `Digitaal conceptticket voor ${e.type.toLowerCase()}. Datum en locatie nog te bepalen.`,
    art: "ticket" as const,
    eventId: e.id,
    variant: "Regulier",
  },
  {
    id: `${e.id}-gesponsord`,
    name: e.title,
    price: 0,
    kind: "ticket" as const,
    description:
      "Voorbeeld van een plek die een toekomstige partner mogelijk maakt. Sponsoring en beschikbaarheid zijn nog niet geregeld.",
    art: "ticket" as const,
    eventId: e.id,
    variant: "Gesponsorde plek",
  },
]);
export const products = [...accessories, ...tickets];
export const money = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
