# Makro 204 — studijní atlas

Minimalistický studijní web k **1. průběžnému testu z Makroekonomie 3MI 204**.

Obsahuje:

- výklad v pěti tématech (národní účty, model produkt–výdaje, peníze, AD–AS, hospodářský cyklus),
- vzorce a interaktivní grafy přímo v místě, kde se látka vysvětluje,
- přehlednou stránku vzorců s proměnnými, přehledem symbolů a vysvětlením „kdy použít“,
- přehledný rozcestník grafů a samostatnou stránku pro každý graf,
- interaktivní grafy s přepínačem do zkouškového režimu, návodem na kreslení a seznamem častých chyb,
- interaktivní vzorový test na 25 bodů s automatickým vyhodnocením výpočtů a sebehodnocením grafů.

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

## Struktura

```text
src/
  app/
    page.tsx                 domovská stránka
    vyklad/                  výklad a pět kapitol
    vzorce/                  tisknutelný přehled vzorců a symbolů
    grafy/                   rozcestník grafů
    grafy/[slug]/            detail jednoho grafu
    test/                    vzorový test
  components/
    graphs/                  grafy, ovládání a grafová sada
    test/                    vyhodnocení testu
    content-blocks.tsx       společný renderer výkladu
  content/
    topics/                  obsah pěti kapitol
    formulas.ts              vzorce, proměnné a použití
    graphs.ts                metadata grafů
    tests/                   datový model testů
  lib/
    test-scoring.ts          čistá logika bodování
```

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

- Obsah vychází z přednášek 1–5 a vzorového testu 3MI 204.
- PDF podklady nejsou součástí aplikace, nehostují se a jsou v `.gitignore`.
- U vzorového testu Q1 jsou uvedené přesné i zaokrouhlené hodnoty, protože
  oficiální řešení používá α ≈ 2,6.
- Datový model testu (`TestVersion`) je připravený na přidání dalších verzí.
