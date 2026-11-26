# Begroting en kanalen

Onderzoeksdatum: 26 november 2026. Geen abonnementen afgenomen, geen accounts ingesteld, geen voorraad besteld. Tarieven kunnen vóór 2027 veranderen. Conceptprijzen in de website zijn geen begrotingsbewijs.

## Rollen van de kanalen

- **Eigen website:** uitleg, programma en doorverwijzing. In productie mogelijk ook een afzonderlijke accessoirecheckout.
- **Eventbrite:** voorgestelde centrale registratie, tickettypen en voorraad. Elke avond krijgt één gezaghebbend Eventbrite-event. De site toont informatie en verwijst door of gebruikt pas na verificatie een ondersteunde embed.
- **Meetup:** bereik en community, met duidelijke verwijzing naar dezelfde Eventbrite-registratie. Een RSVP is geen ticket. Geen tweede betaald ticketkanaal of concurrerende voorraad inrichten.
- **Betaalprovider accessoires:** aparte checkout en afhandeling, bijvoorbeeld Mollie na technische en commerciële keuze. Een gecombineerde Eventbrite-webshopcheckout is niet geverifieerd. De productieversie kan twee afrekenroutes en twee bevestigingen nodig hebben.

## Kosten afzonderlijk

| Kostenpost                     | Eenheid en uitgangspunt                                                                                                                                  | Begrotingswaarde / actie                                                                                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Meetup Organizer               | Maand- of jaarabonnement. Officieel Standard vanaf USD 29,99 per maand of USD 174,99 per jaar; ook een zesmaandsoptie.                                   | **[ONZEKER]** definitieve prijs in Nederland, valuta, aanbiedingen en belastingen. Exact aanbod in eigen account controleren, niet activeren. Bron [Meetup](https://help.meetup.com/hc/en-us/articles/28677808413197-Organizer-Subscription-prices-overview). |
| Eventbrite ticketkosten        | Per betaald ticket; mogelijk percentage en vast bedrag. Officiële NL-pagina noemt geen uitleesbaar exact Nederlands tarief in de geraadpleegde weergave. | **[ONZEKER]** percentage, vast bedrag, eventuele betaalcomponent en btw; controleren voor land, valuta en account. Bron [Eventbrite](https://www.eventbrite.nl/organizer/pricing/).                                                                           |
| Wie draagt ticketkosten?       | Volgens Eventbrite standaard de ticketkoper; organisator kan kiezen ze zelf te dragen.                                                                   | Besluit nog open. Reken in scenario A volledig door aan koper, in scenario B volledig als eigen verkoopkosten. Toon de totale koperprijs vooraf.                                                                                                              |
| Optionele Eventbrite-marketing | Advertentie-uitgaven / eventueel pakket apart van ticketkosten. Ads alleen in bepaalde markten beschikbaar.                                              | **[ONZEKER]** beschikbaarheid NL en gewenst budget. Geen marketingpakket in de basisbegroting veronderstellen; expliciet nul bij niet afnemen. Zelfde officiële Eventbrite-bron.                                                                              |
| Hosting                        | Maand- of jaarbedrag, inclusief eventuele meerkosten voor verkeer en serverfuncties.                                                                     | **[ONZEKER]** provider, plan, limieten; offerte vergelijken. Statische conceptsite heeft geen database nodig.                                                                                                                                                 |
| Domeinverlenging               | Werkelijke verlengprijs groeitafel.nl per jaar, niet een eerstejaarsactie.                                                                               | **[ONZEKER]** huidige registrar/eigenaar en factuur controleren.                                                                                                                                                                                              |
| E-mail                         | Mailboxen en eventueel transactionele e-mail apart.                                                                                                      | **[ONZEKER]** aantal mailboxen, verzendvolume en provider.                                                                                                                                                                                                    |
| Betaalprovider accessoires     | Per geslaagde transactie, methodeafhankelijk. Mollie noemt iDEAL/Wero € 0,32; EER-consumentenkaarten 1,80% + € 0,25.                                     | Officiële publieke tarieven gecontroleerd op onderzoeksdatum. **[ONZEKER]** gekozen methode, contract, eventuele btw, terugbetalings- en chargebackkosten. Bron [Mollie NL](https://www.mollie.com/nl/pricing).                                               |
| Inkoop accessoires             | Per product plus eventuele proefdruk, minimumorder en transport naar ons.                                                                                | **[ONZEKER]** offertes per notitieboek, kaartenset en totebag. Geen oplage afgesproken.                                                                                                                                                                       |
| Verpakking                     | Materiaal en verwerking per zending.                                                                                                                     | **[ONZEKER]** verpakkingskeuze en gewicht.                                                                                                                                                                                                                    |
| Verzending                     | Werkelijke vervoerderkosten per pakket minus door klant betaald bedrag.                                                                                  | **[ONZEKER]** land, gewicht, formaat en contract. Demo € 4,95 is uitsluitend een rekenvoorbeeld.                                                                                                                                                              |
| Retouren                       | Terugbetaling, retourtransport, handling, waardeverlies, niet-terugbetaalde betaalfees.                                                                  | **[ONZEKER]** retourpercentage en beleid; reserve begroten.                                                                                                                                                                                                   |

Neem daarnaast locatiehuur, begeleiding, workshopmateriaal, toegankelijkheidsvoorzieningen en verzekering als afzonderlijke posten op indien van toepassing: allemaal **[ONZEKER]**. Er zijn geen inkomsten uit partners of subsidies toegezegd.

## Formules

Gebruik één consistente btw-basis. Onderstaande uitkomsten zijn geen boekhoudkundige nettowinst; belastingen en niet genoemde kosten zijn nog niet verwerkt.

```text
Kwartaalkosten = vaste kosten voor drie maanden + variabele verkoopkosten

Vaste kosten drie maanden =
  3 × (hosting_maand + email_maand + meetup_maand + optionele_marketing_maand)
  + domein_jaar / 4
  + overige_vaste_kwartaalkosten

Bij een Meetup-jaarabonnement: vervang 3 × meetup_maand door meetup_jaar / 4.
Tel nooit maand- en jaarabonnement tegelijk.
Een jaarbetaling kost in de cashflow het hele jaarbedrag bij afschrijving;
kwartaaltoerekening is niet hetzelfde als de daadwerkelijke kasuitgave.

Variabele verkoopkosten =
  door_ons_gedragen_ticketkosten
  + inkoop_verkochte_accessoires
  + verpakking
  + betaalproviderkosten_accessoires
  + verzending_die_wij_zelf_dragen
  + retourkostenreserve

Bruto ticketverkoop = som(aantal_betaalde_tickets × ticketprijs)
Ticketkosten totaal = som(aantal × (vaste_fee + percentage × feegrondslag))
  + eventuele aparte order-/betaalfees volgens het geverifieerde contract
Door ons gedragen ticketkosten = ticketkosten totaal × eigen_aandeel
  (eigen_aandeel 0 bij volledig doorbelasten, 1 bij volledig zelf dragen)

Netto ticketopbrengst = bruto verkoop minus door ons gedragen ticketkosten

Marge accessoires = verkoop minus inkoop, verpakking, betaal- en
  verzendkosten die wij zelf dragen
Marge na retourreserve = marge accessoires minus retourkostenreserve
```

Feegrondslag en afronding moeten bij Eventbrite worden geverifieerd; niet aannemen dat elke fee per ticket in plaats van per order wordt berekend. Een gesponsorde plek van € 0 levert geen ticketverkoop op; eventuele sponsorinkomsten pas apart opnemen zodra daar een afspraak over bestaat.

## Beslissingen vóór echte verkoop

1. Lokale prijzen, btw, valuta en voorwaarden opnieuw controleren bij de officiële bronnen.
2. Definitieve ticketprijs én kostendrager vastleggen.
3. Partnerbudget uitsluitend opnemen na concrete toezegging.
4. Meetuptools vergelijken met het werkelijk benodigde bereik; geen abonnement stilzwijgend starten.
5. Offertes voor productie, verpakking en verzending ophalen.
6. Eventbrite-flow en accessoirecheckout apart testen, inclusief annuleringen en terugbetalingen.
