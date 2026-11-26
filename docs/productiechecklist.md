# Productiechecklist

Alles hieronder is open tenzij expliciet aangevinkt. De huidige versie is een demonstratie.

## Inhoud en organisatie

- [ ] Arix keurt teksten, doelgroepen, prijzen en huisstijl goed.
- [ ] Rol van Rig bespreken en vastleggen vóór vermelding als partner.
- [ ] Hiskia alleen als betrokken noemen na een afspraak.
- [ ] Data, locatie, toegankelijkheid, capaciteit en begeleiding per avond bevestigen.
- [ ] Nieuw AI-aanbod eerst testen; geen bewezen resultaten suggereren.
- [ ] Gesponsorde plekken pas openzetten als financiering en toewijzing zijn geregeld.
- [ ] Contactkanaal, organisatorgegevens en praktische bereikbaarheid toevoegen.
- [ ] Productuitvoering, afbeeldingen, leveranciers, levertijd en voorraad bevestigen.

## Ticketregistratie

- [ ] Eén Eventbrite-event per avond en centraal beheerde ticketvoorraad.
- [ ] Eigen event-ID aan externe event-ID koppelen in aparte productiedata.
- [ ] Doorverwijzing of ondersteunde embed verifiëren op mobiel en desktop.
- [ ] Definitieve ticketfees, btw en kostendrager bepalen.
- [ ] Geen eigen betaalde ticketvoorraad of reserveringen naast Eventbrite.
- [ ] Meetup duidelijk als community/ontdekking inzetten; RSVP is geen ticket.
- [ ] Betaalstatus, annulering, refund en toegangsbewijs bij de centrale registratie houden.
- [ ] Bij uitval geen eigen alternatieve ticketverkoop activeren.

## Accessoires en betalingen

- [ ] Apart serverendpoint en provider-adapter bouwen; demoCheckout is uitsluitend lokaal.
- [ ] Secrets alleen server-side instellen, nooit in NEXT_PUBLIC-variabelen.
- [ ] Prijzen, valuta, aantallen en echte voorraad op de server controleren.
- [ ] Idempotente bestellingen en ondertekende provider-webhooks implementeren.
- [ ] Retour vanuit de betaalpagina nooit op zichzelf als betaalbewijs gebruiken.
- [ ] Betaald, mislukt, geannuleerd, verlopen en terugbetaald afzonderlijk afhandelen.
- [ ] Gemengde mand zichtbaar splitsen in twee routes indien nodig; gezamenlijke checkout niet beloven.
- [ ] Verzendkosten op adres/land/gewicht baseren en alle kosten vooraf tonen.
- [ ] Verzendadres pas bij echte accessoirecheckout vragen; geen adres bij digitale tickets.
- [ ] Bevestigingsmails, orderbeheer, levering en retourafhandeling realiseren.
- [ ] Testmodus van de gekozen provider eerst gebruiken; geen live betaling tijdens review.

## Privacy en voorwaarden

- [ ] Persoonsgegevens minimaliseren, bewaartermijnen en toegang regelen.
- [ ] Privacyverklaring, voorwaarden, annuleringen en retourbeleid laten beoordelen.
- [ ] Verwerkers en eventuele analytics/cookies beoordelen vóór activeren.
- [ ] Fictieve profielen niet zonder toestemming vervangen door herkenbare personen.
- [ ] AI-workshops laten werken met veilige oefendata en menselijke controle.

## Toegankelijkheid en kwaliteit

- [x] Semantische landmarks, skiplink en zichtbare focus opgenomen.
- [x] Native knoppen, radio's en selecties; ARIA voor tabstappen en bingo.
- [x] Reduced-motion en responsive CSS opgenomen.
- [x] Functionele mandberekening getest voor tickets, accessoires en gemengd.
- [ ] Visueel toetsen op 390 px mobiel, 768 px tablet en 1440 px desktop.
- [ ] Safari/Firefox/Chrome, 200% zoom en lange teksten controleren.
- [ ] Echte toetsenbordronde door navigatie, filters, spellen en checkout.
- [ ] Screenreader, contrast in alle states en focusvolgorde in browser toetsen.
- [ ] Geen horizontale overflow; toetsenbord blijft zichtbaar bij getalinvoer.
- [ ] Prestatiebudget en assetgrootte op een gewone mobiele verbinding toetsen.

## Publiceren

- [x] Lokale Git-repository, lockfile en documentatie aanwezig.
- [ ] Juiste GitHub-organisatie en repository vaststellen; pas daarna pushen.
- [ ] Privé conceptpreview in een beschikbare hostingomgeving maken.
- [ ] CI met tests, typecheck en statische build inrichten.
- [ ] Back-up, rollback en beheerder afspreken.
- [ ] Domeineigendom en DNS controleren; alleen wijzigen na aparte opdracht.
- [ ] Conceptmelding en noindex pas na inhoudelijke goedkeuring heroverwegen.

## Bekende opleverbeperking

De beheerde preview-relay time-outte, het browserhulpmiddel initialiseerde niet en Sites is niet ingeschakeld in deze workspace. Daardoor zijn een online preview en echte visuele browser-QA niet voltooid. De lokale statische preview en volledige broncode zijn meegeleverd. Dit is geen foutmelding vanuit de website en geen bewijs dat de visuele controle is geslaagd.
