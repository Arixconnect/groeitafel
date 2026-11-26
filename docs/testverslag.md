# Testverslag — 26 november 2026

## Geslaagd

- `npm test`: **21 tests geslaagd**, geen failures. Negen tests voor rekenregels/data en twaalf React-interactietests in JSDOM.
- `npm run typecheck`: geslaagd.
- `npm run build`: geslaagd met Next.js 16.4.6; 25 statisch gegenereerde pagina's/routes inclusief foutpagina's en icoon.
- Alle 25 geëxporteerde HTML-bestanden gecontroleerd op lokale links, scripts, stijlen, afbeeldingen en ankers: **nul ontbrekende doelen**. Alle HTML heeft `lang="nl"`.

### Functioneel gecontroleerd

| Scenario                                                          | Resultaat                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Ticket-only, inclusief gesponsorde gratis variant                 | Geen verzendkosten                                                 |
| Accessoire-only, meerdere producten/aantallen                     | Eenmaal € 4,95 conceptverzending                                   |
| Gemengd                                                           | Eén verzendbedrag, juiste totaalprijs                              |
| Laatste fysieke product verwijderen                               | Verzendbedrag vervalt                                              |
| Lege mand                                                         | Geen kosten, checkout wordt niet aangeboden; adapter wijst leeg af |
| Ongeldige aantallen, niet-gehele getallen, onbekende product-ID's | Afgewezen                                                          |
| Corrupt localStorage en dubbele product-ID's                      | Veilig opgeschoond en begrensd                                     |
| Checkout + opnieuw beginnen, alle drie mandtypen                  | Demotekst, mand geleegd, lege staat beschikbaar                    |
| Programmafilters                                                  | Kwartaal en soort avond combineren correct                         |
| Fictieve profielen                                                | Filters, lege resultaten, reset en wederzijdse match               |
| Vraagkaarten                                                      | Eerste kaart, volgende kaart, reset                                |
| Bingo                                                             | Alle negen afvinken, voortgang, lokale opslag en reset             |
| Methodiek                                                         | Pijltoetsen en End wisselen geselecteerde tab en paneel            |
| Ticketdetail                                                      | Gesponsorde variant komt met juiste ID in mand                     |
| Productdetail                                                     | Gekozen aantal komt in mand                                        |
| Shop en mobiel menugedrag                                         | Categorie wisselt en menu opent met juiste ARIA-state              |

## Contrastcontrole van basiskleuren

Wiskundig berekend volgens relatieve sRGB-luminantie, geen volledige browseraudit:

| Voorgrond / achtergrond               | Ratio   |
| ------------------------------------- | ------- |
| Inkt / gebroken wit                   | 10,87:1 |
| Gedempte lopende tekst / gebroken wit | 5,40:1  |
| Terracotta / gebroken wit             | 4,67:1  |
| Inkt / lime                           | 9,20:1  |
| Inkt / perzik                         | 8,48:1  |

Deze basiskleurparen halen 4,5:1. Alle interactieve states, doorschijnende elementen, iconen en focusranden moeten nog in de browser worden gecontroleerd.

## Niet voltooid door infrastructuur

- De beheerde preview mislukte eerst doordat de previewomgeving Vite-vlaggen aan Next.js doorgaf. Dit is opgelost met `scripts/dev.mjs`, dat host/port-vlaggen vertaalt.
- Daarna kon de preview-relay poort 4173 niet openen: timeout bij readiness. `sites-preview status` meldde gestopt.
- Sites gaf `sites_access_disabled`: deze workspace heeft Sites niet ingeschakeld. Er is geen Site aangemaakt of gedeployd.
- Browserinitialisatie gaf `the gaas-browser node_repl sandbox cannot be disabled`. Er is geen browser- of screenshotcontrole uitgevoerd.

Daarom zijn **mobiele en desktopweergave, echte browsernavigatie, volledige toetsenbordronde, zoom, screenreader en visuele regressies nog niet geverifieerd**. Responsive breakpoints, focusstijlen en reduced-motion zijn wel geïmplementeerd. De JSDOM-tests zijn geen vervanging voor die visuele controles.

## Handmatige acceptatieronde bij beschikbare browser

1. Start `npm run preview` na `npm run build`. Open http://localhost:3000.
2. Controleer 390 × 844, 768 × 1024 en 1440 × 1000; geen horizontaal scrollen.
3. Tab vanaf de skiplink door menu, hero en methodiek. Gebruik pijltoetsen/Home/End bij de stappen.
4. Open elke hoofdpagina, alle drie typen avonddetail en de drie productdetails.
5. Combineer kwartaal/typefilters en vaardigheid/hulpvraagfilters; probeer een lege combinatie en reset.
6. Trek vragen, ga de hele stapel rond, reset; vink bingo geheel en deels af en ververs.
7. Voeg alleen een ticket toe; probeer bestelling; herhaal voor accessoires en gemengd.
8. Test gesponsorde ticketvariant, aantallen 0, -1, 1,5 en 21, verwijderen, lege mand en opnieuw beginnen.
9. Controleer opslag na verversen, 200% zoom, reduced-motion en minstens één screenreader.
10. Bevestig dat geen persoonsgegevens of betaalgegevens worden gevraagd en dat niets als echte boeking wordt gepresenteerd.
