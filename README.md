# fischeat

Studijní rozcestník pro předměty oboru **Aplikovaná informatika** na **VŠE FIS**.
Aktuálně obsahuje **Makro 204**; další předměty lze přidat jako samostatné
subject bundle.

## Co web obsahuje

- hlavní stránku `fischeat` s výběrem předmětu,
- předmět **Makro 204** na `/makro-204`,
- výklad v pěti tématech s interaktivními grafy a vzorci přímo v textu,
- přehled vzorců se symboly, proměnnými a vysvětlením „kdy použít“,
- rozcestník grafů a samostatnou stránku pro každý graf,
- interaktivní vzorový test na 25 bodů,
- připravenou kartu „Připravujeme“ pro další předmět.

## URL

```text
/                              výběr předmětu
/makro-204                     přehled makra
/makro-204/vyklad              výklad
/makro-204/vyklad/[tema]       kapitola
/makro-204/vzorce              vzorce
/makro-204/grafy               grafy
/makro-204/grafy/[graf]        detail grafu
/makro-204/test                vzorový test
```

Staré adresy (`/vyklad`, `/vzorce`, `/grafy`, `/test`) přesměrovávají na
`/makro-204/...`.

## Spuštění

```bash
npm install
npm run dev
```

Web běží na `http://localhost:3000`.

## Kontrola

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

E2E testy používají Playwright a Chromium. Pokud browser ještě není stažený:

```bash
npx playwright install chromium
```

## Architektura

```text
src/
  app/
    page.tsx                    # fischeat hub
    (subjects)/[subject]/       # dynamické stránky předmětu
  components/
    content-blocks.tsx          # společný renderer výkladu
    graphs/                     # sdílený grafový shell a subject loader
    test/                       # loader testovacího runneru
  subjects/
    types.ts                    # SubjectMeta, SubjectBundle, obsahové typy
    summaries.ts                # lehké souhrny pro hub
    registry.ts                 # lazy načítání subject bundle
    makro-204/
      meta.ts                   # metadata předmětu
      topics/                   # výklad
      formulas.ts               # vzorce
      graphs.ts                 # metadata grafů
      test/                     # testovací runner
      graphs/                   # makro-specifické grafy
```

Hlavní stránka načítá pouze `summaries` (lehké souhrny). Plný obsah předmětu se
načte až na jeho stránkách. Grafy a testy se načítají dynamicky podle předmětu,
takže hub ani jiné předměty nestahují makro grafový bundle.

### Přidání dalšího předmětu

1. Vytvoř `src/subjects/<slug>/` s `meta.ts`, obsahem a případnými grafy/testy.
2. Přidej `meta` do `src/subjects/summaries.ts`.
3. Přidej lazy loader do `src/subjects/registry.ts`.
4. Pokud má vlastní grafy, přidej renderer do `src/components/graphs/subject-graph-renderer.tsx`.
5. Pokud má vlastní test, přidej runner do `src/components/test/subject-test-runner.tsx`.

Společné stránky, layouty a komponenty se nemění.

## Technologie

- Next.js App Router + React Server Components
- TypeScript strict
- Tailwind CSS 4
- Recharts na grafy
- KaTeX na vzorce
- Vitest na unit testy, Playwright na E2E

## Nasazení na Vercel

Projekt je připravený pro Vercel bez environment variables a bez backendu.
Po propojení GitHub repozitáře stačí importovat projekt ve Vercelu; build
příkaz je `npm run build`.

## Poznámky k obsahu

- Obsah makra vychází z přednášek 1–5 a vzorového testu 3MI 204.
- PDF podklady nejsou součástí aplikace, nehostují se a jsou v `.gitignore`.
- Datový model testu (`TestVersion`) je připravený na přidání dalších verzí.
