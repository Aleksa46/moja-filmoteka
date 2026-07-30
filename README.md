# Moja filmoteka

Jednostavna web aplikacija — lična kolekcija filmova sa ocenjivanjem i statistikom.
Služi kao demonstracioni primer u okviru diplomskog rada: nije sama tema, već nosilac
priče **Plan → Develop → Deliver → Operate** kroz **Azure DevOps** i **Azure Static Web Apps**.

Bez baze i bez build koraka: čist HTML/CSS/JS. Katalog stoji u `films.js`, a ocene se
pamte u `localStorage`. Posteri se crtaju CSS-om (gradijent po žanru), bez eksternih slika.

## Pokretanje lokalno

Dupli klik na `index.html` (radi i bez servera). Opciono: VS Code + „Live Server".

## Struktura

| Fajl | Uloga |
|------|------|
| `index.html` | Struktura: zaglavlje, dashboard, filter, grid kataloga |
| `styles.css` | Stil (tamna tema, tipografija, „posteri", zvezdice, trakice) |
| `app.js` | Logika: prikaz kataloga, filter, ocenjivanje, statistika |
| `films.js` | Podaci: katalog filmova |
| `staticwebapp.config.json` | Konfiguracija rutiranja za Static Web Apps |

## Mapiranje na sprintove

- **Sprint 1 (MVP):** prikaz kataloga (kartice sa posterom i žanrom) + filter po žanru.
- **Sprint 2 (nadogradnja):** ocenjivanje zvezdicama + mini-dashboard (prosečna ocena, broj filmova po žanru).

## Deploy: Azure Static Web Apps (ukratko)

1. Napravi GitHub repo i push-uj ove fajlove na granu `main`.
2. Azure Portal → *Create resource* → **Static Web App**.
3. Poveži GitHub repo i granu `main`.
4. **Build presets: Custom**, **App location: `/`**, **Api location: (prazno)**,
   **Output location: (prazno)**.
5. *Create* → Azure sam upisuje GitHub Actions workflow u repo i pokreće deploy.
6. Kad pipeline postane zelen → dobijaš **live URL**.

## CI/CD tok

`git push` na `main` → GitHub Actions (workflow koji je Azure kreirao) →
build i deploy → live URL. Svaki Pull Request dobija privremeni **preview URL**.
