# De Groeitafel — concept 2027

Een volledig interactief bespreekconcept in Next.js, TypeScript en Tailwind CSS. Warme papierkleuren, eigen SVG-tafelillustratie en lokale lettertypen. Geen echte registratie, betaling, voorraad, persoonsgegevens, externe API of database.

## Installeren en ontwikkelen

Vereist: Node.js 22.12+ (getest met Node 24), npm.

```bash
cd groeitafel
npm ci
npm run dev
```

Open http://localhost:3000. Stop met Ctrl+C. Er zijn geen omgevingsvariabelen of geheimen nodig; daarom is er geen `.env.example`.

## Bouwen en preview

```bash
npm run build
npm run preview
```

Open http://localhost:3000. `npm start` doet hetzelfde als `npm run preview`. Dit is een statische export (`out/`), dus Next.js `next start` is hier niet de juiste server. `PORT=3001 npm run preview` kiest een andere poort.

De meegeleverde ZIP bevat de gebouwde `out/`-map. Na uitpakken volstaat `node scripts/preview.mjs` om die versie te bekijken, zonder npm-installatie of internet. Open HTML niet rechtstreeks met `file://`: routes en assets verwachten een webserver. De server is uitsluitend voor lokale preview; gebruik voor productie een geschikte statische host.

**Status van de online preview:** de beheerde preview-relay kon poort 4173 niet openen; Sites is niet ingeschakeld voor deze workspace. Ook het browserhulpmiddel kon niet initialiseren. Er is daarom geen geverifieerde online preview-URL. De broncode en lokale preview zijn voorbereid, maar visuele browser-QA blijft open. Er is niets op groeitafel.nl gepubliceerd en er is niets gepusht.

## Wat werkt

- Home met tafelillustratie, vijf interactieve methodiekstappen en kwartaalkeuze.
- Programma: twaalf voorbeeldavonden, gecombineerde kwartaal- en typefilters.
- Twaalf detailroutes met doel, niveau, duur, benodigdheden, resultaat en digitale concepttickets.
- Aan tafel: vier fictieve profielen, twee filters en wederzijdse voorbeeldmatches.
- Vraagkaarten: negen vragen, volgende kaart, rondgaan en opnieuw beginnen.
- Matchbingo: negen afvinkbare opdrachten, voortgang en reset.
- Shop: tickets en drie fysieke accessoireconcepten, productdetails en aantallen.
- Winkelmand: toevoegen, aantallen 1–20, verwijderen, leegmaken en volledige kosten vóór de demo-bevestiging.
- Alleen fysieke producten activeren € 4,95 conceptverzending, eenmaal per mand.
- Partnerpagina met zes selecteerbare rollen en gespreksstarter. Er wordt geen bericht verstuurd.

Alle tickets en producten zijn concepten. Alle data en locaties staan nog open. Een gesponsorde plek is uitsluitend een voorbeeld, zonder toegezegde sponsoring. Alle illustraties zijn ontworpen voor het concept, geen foto's van eerdere avonden. Prijzen zijn voorlopig inclusief eventuele btw; de definitieve fiscale behandeling is nog te bepalen.

## Snel aanpassen voor Arix en Rig

| Wat                                                          | Bestand                                  |
| ------------------------------------------------------------ | ---------------------------------------- |
| Kwartalen, avondtitels, resultaten, benodigdheden, methodiek | `src/data/program.ts`                    |
| Productteksten en prijzen in eurocenten, ticketvarianten     | `src/data/products.ts`                   |
| Fictieve profielen, vragen en bingo-opdrachten               | `src/data/play.ts`                       |
| Home-teksten en samenstelling                                | `src/components/Home.tsx`                |
| Overige paginainhoud, partnerrollen, Arix/Rig-tekst          | `src/components/Pages.tsx`               |
| Navigatie, footer, mandcontext                               | `src/components/Shell.tsx`               |
| Kleuren, typografie, responsive ontwerp                      | `src/app/globals.css` (`:root` bovenaan) |
| Tafelillustratie                                             | `public/images/tafel.svg`                |
| Avond- en productillustraties                                | `src/components/Artwork.tsx`             |
| Kostenberekening, validatie, demo-checkoutadapter            | `src/lib/cart.ts`                        |

De SVG is als bewerkbare bron meegeleverd. Lettertypen: Bricolage Grotesque en DM Sans via Fontsource, lokaal gebundeld onder de licenties van de betreffende pakketten. Geen externe fontrequests in de browser.

## Tests

```bash
npm test
npm run typecheck
npm run build
```

Zie `docs/testverslag.md` voor exact wat is getest en welke browsercontroles nog moeten gebeuren. React-interactietests draaien in JSDOM, niet in een echte browser. Ze vervangen geen visuele test.

## Projectstructuur

```text
src/app/          Next.js App Router, routes en globale stijl
src/components/   Herbruikbare UI en interactieve pagina's
src/data/         Bewerkbare demo-inhoud
src/lib/          Mandvalidatie, kosten en checkoutadapter
public/images/    Eigen SVG-illustratie
scripts/          Development- en statische previewserver
out/              Gebouwde statische website (niet in Git)
tests/            Functionele en React-interactietests
docs/             Briefing, productiechecklist, begroting en testverslag
```

## Lokale opslag

Alleen `groeitafel-demo-cart` (product-ID's en aantallen) en `groeitafel-demo-bingo` (aangevinkte vakjes) worden lokaal bewaard. Geen naam, e-mailadres of betaalgegevens. Ongeldige opgeslagen manddata worden verwijderd of begrensd. Zonder beschikbare localStorage werken de interacties gedurende de sessie. Leeg de mand en reset bingo om opgeslagen demo-instellingen te verwijderen.

## Echte registratie en betaling

Behoud de demo-checkout totdat de productiechecklist is afgewerkt. Eventbrite is de voorgestelde centrale registratie en ticketvoorraad; Meetup verwijst voor tickets daarheen. Houd op de eigen site geen tweede voorraad bij. Accessoires krijgen een aparte servergestuurde checkout met een geschikte betaalprovider. Een gecombineerde Eventbrite-webshopcheckout is niet geverifieerd en wordt niet beloofd.

De frontend bewaart geen gezaghebbende prijzen of betaalstatus. In productie: server valideert product-ID, bedrag en voorraad; provider-webhooks bevestigen betaling; idempotentie voorkomt dubbele afhandeling. Splits een gemengde mand zichtbaar in ticket- en accessoireafrekening. Zie `docs/productiechecklist.md`.

## Git en later GitHub koppelen

Er is lokaal Git geïnitialiseerd. Geen externe repository is gekoppeld en er is niets gepusht. Maak zelf een lege repository onder de juiste organisatie/account. Controleer eerst eigenaar en rechten.

```bash
git status
git remote -v
# Vervang ORGANISATIE door de daadwerkelijk afgesproken eigenaar.
git remote add origin https://github.com/ORGANISATIE/groeitafel.git
git branch -M main
git push -u origin main
```

Voer die opdrachten pas uit nadat de juiste repository is vastgesteld. Maak bij een bestaande remote geen tweede `origin`; controleer de huidige bestemming. De download bevat de volledige broncode zonder `.git`-historie. Gebruik bij een nieuwe uitgepakte kopie eerst `git init -b main`, `git add .` en `git commit -m "Bouw Groeitafel concept 2027"`.

Publicatie op het echte domein vereist een aparte opdracht. Een toekomstige conceptpreview hoort privé te blijven totdat delen is afgesproken.
