# Websitepreview via GitHub Pages

## Twee verschillende links

- `https://github.com/Arixconnect/groeitafel/` toont de repository en README. Dit adres kan niet in een gewone website of automatische redirect worden veranderd.
- De verwachte standaardwebsite-URL na activering is `https://arixconnect.github.io/groeitafel/`. Die is pas bruikbaar zodra GitHub Pages is ingesteld en de deployment geslaagd is.

Bovenaan de README staan de previewlink en de activeringsinstructies. De broncode blijft privé. Een Pages-site is normaal openbaar, ook als de bronrepository privé is; het concept bevat uitsluitend demo-inhoud.

## Klaargezet

De branch `gh-pages` bevat de statische, gebouwde website en `.nojekyll`. De Next.js-build gebruikt `/groeitafel` als basispad, zodat navigatie, scripts, lettertypen en de tafelillustratie op de GitHub Pages-URL werken. Het echte domein groeitafel.nl is niet gekoppeld.

## Eenmalig activeren door de eigenaar

Open [Settings → Pages](https://github.com/Arixconnect/groeitafel/settings/pages), ingelogd als eigenaar of beheerder:

1. Kies bij **Build and deployment → Source**: **Deploy from a branch**.
2. Kies branch **gh-pages**, map **/(root)**.
3. Klik **Save** en wacht op de GitHub Pages-deployment.
4. Open de URL die GitHub daarna bovenaan deze instellingen toont. Controleer home, avond, afbeelding en winkelmand.

De huidige integratie krijgt voor Pages-instellingen `403 Resource not accessible by integration`; de browserverbinding start ook niet. Daarom kan deze instelling niet vanuit deze sessie worden voltooid. Dit is een concrete account-/koppelingsbeperking, geen fout in de broncode. Een deployment is nog niet geverifieerd.

GitHub Pages voor een privérepository vereist volgens de [officiële documentatie](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) een passend betaald plan, bijvoorbeeld GitHub Pro voor een persoonlijk account. Als GitHub om een upgrade vraagt, is deze route op het huidige plan niet beschikbaar. Maak de broncode niet openbaar en neem geen abonnement af zonder een bewuste keuze; kies zo nodig andere hosting met ondersteuning voor een privérepository.

## Later bijwerken

Een push naar `main` werkt deze statische previewbranch niet automatisch bij. Bouw en publiceer expliciet, of richt later na verificatie een GitHub Actions-workflow in.

```bash
npm ci
npm test
npm run build:pages
```

Kopieer de volledige inhoud van `out/`, inclusief `.nojekyll`, naar een checkout van `gh-pages`, commit en push die branch. Houd de `.git`-map van die checkout intact. Controleer dat oude buildbestanden worden verwijderd; overschrijf geen bronbestanden op `main` met de export. GitHub publiceert de wijziging vervolgens als Pages is ingeschakeld.

Voor een gewone lokale preview: `npm run build` en `npm run preview`. De Pages-build heeft een ander basispad en is bedoeld voor de submap `/groeitafel/`.

[Officiële instructies voor publiceren vanuit een branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
