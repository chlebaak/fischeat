import type { Topic } from "../types";

export const penize: Topic = {
  id: "penize",
  number: 3,
  slug: "penize",
  title: "Peníze a bankovní systém",
  shortTitle: "Peníze",
  intro:
    "Od funkcí peněz přes měnové agregáty a bilance bank až po trh peněz. Tady se potkává měnová báze, depozitní multiplikátor a úroková míra.",
  takeaways: [
    "M1 jsou nejlikvidnější peníze; měnová báze je oběživo plus rezervy bank.",
    "V systému částečných rezerv vytvářejí komerční banky depozita v násobcích počátečního impulsu.",
    "Rovnováha na trhu peněz určuje úrokovou míru; cena dluhopisu a úrok se pohybují protisměrně.",
  ],
  sourceNote: "Přednášky 3–4, slidy 21–39 a 1–34; vzorový test Q4.",
  formulaIds: [
    "m1",
    "m2",
    "m3",
    "mb",
    "deposit-multiplier",
    "md",
    "money-equilibrium",
    "fisher",
  ],
  graphIds: ["money-market", "deposit-multiplier"],
  testQuestionIds: ["q4"],
  sections: [
    {
      id: "funkce",
      title: "Co jsou peníze a jaké mají funkce",
      blocks: [
        {
          type: "paragraph",
          text: "Peníze jsou vše, co funguje jako všeobecně přijímaný prostředek směny. Historicky se vyvíjely od barteru přes komoditní peníze a drahé kovy k papírovým a depozitním penězům.",
        },
        {
          type: "list",
          items: [
            "**Prostředek směny** – umožňují platit bez přímé výměny zboží za zboží.",
            "**Zúčtovací jednotka** – vyjadřují ceny a dluhy.",
            "**Uchovatel hodnoty** – dají se odložit do budoucna, i když inflace jejich kupní sílu snižuje.",
          ],
        },
        {
          type: "paragraph",
          text: "Nabídka peněz je stavová veličina: měří množství peněz k určitému okamžiku. Peněžní agregáty se řadí podle likvidity, tedy podle toho, jak rychle a snadno se dají použít k platbě:",
        },
        { type: "formula", formulaId: "m1" },
        { type: "formula", formulaId: "m2" },
        { type: "formula", formulaId: "m3" },
        {
          type: "table",
          headers: ["Agregát", "Co obsahuje", "Charakteristika"],
          rows: [
            ["M1", "oběživo + vklady na požádání", "nejužší, nejlikvidnější"],
            ["M2", "M1 + termínované vklady", "středně široké peníze"],
            ["M3", "M2 + repo operace a krátkodobé CP", "široké peníze"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Měnová báze není M1",
          text: "Měnová báze $MB$ obsahuje oběživo a rezervy bank. Rezervy bank nejsou součástí peněžní zásoby M1, protože slouží jen pro transakce mezi bankami a centrální bankou. M1 jsou peníze, které drží veřejnost; MB jsou peníze, které vytvořila centrální banka.",
        },
      ],
    },
    {
      id: "banky-cnb",
      title: "Bankovní soustava a centrální banka",
      blocks: [
        {
          type: "paragraph",
          text: "Bankovní systém je dvoustupňový: **centrální banka** a **komerční banky**. Centrální banka neposkytuje běžné účty občanům; je bankou bank a bankou státu.",
        },
        {
          type: "list",
          items: [
            "Cíl ČNB: cenová stabilita v režimu cílování inflace.",
            "Emise hotovostního oběživa.",
            "Stanovení povinné míry rezerv a základních úrokových sazeb.",
            "Operace na volném trhu, devizové intervence, bankovní dohled.",
            "Vede účty vlády a poskytuje likviditu komerčním bankám.",
          ],
        },
        {
          type: "table",
          headers: ["Nástroj ČNB", "Co dělá", "Směr při expanzi"],
          rows: [
            ["2T repo sazba", "hlavní sazba pro stahování/dodávání likvidity", "snížení"],
            ["Lombardní sazba", "půjčka komerční bance přes noc", "snížení"],
            ["Diskontní sazba", "úrok z přebytečné likvidity uložené u ČNB", "snížení"],
            ["Operace na volném trhu", "nákup/prodej cenných papírů", "nákup CP"],
            ["Povinná míra rezerv", "podíl rezerv na vkladech", "snížení PMR"],
            ["Devizové intervence", "nákup/prodej cizí měny", "oslabení kurzu"],
          ],
        },
        {
          type: "paragraph",
          text: "V bilanci centrální banky jsou na straně aktiv cenné papíry, poskytnuté úvěry a devizové rezervy. Na straně pasiv jsou oběživo, rezervy komerčních bank a účty vlády. Komerční banka má na aktivách rezervy, úvěry a cenné papíry, na pasivech vklady klientů a případné úvěry od centrální banky.",
        },
        {
          type: "callout",
          variant: "note",
          title: "PMR v praxi",
          text: "Od 2. 1. 2025 je povinná míra rezerv 4 %. Ve výpočtech vždy používej hodnotu ze zadání, ne aktuální číslo.",
        },
      ],
    },
    {
      id: "tvorba",
      title: "Měnová báze a depozitní multiplikace",
      blocks: [
        {
          type: "paragraph",
          text: "Když centrální banka nakoupí cenné papíry od komerční banky, zvýší tím rezervy bank a měnovou bázi. Banky drží jen část vkladů jako rezervy a zbytek půjčují. Úvěry se vracejí do bank jako nové vklady a proces se opakuje. Banky tedy nevytvářejí peníze z ničeho: vytvářejí depozita tím, že půjčují část existujících vkladů.",
        },
        { type: "formula", formulaId: "mb" },
        { type: "formula", formulaId: "deposit-multiplier" },
        {
          type: "paragraph",
          text: "Jednoduchý depozitní multiplikátor je $1/PMR$. Při PMR 6 % je maximální multiplikátor přibližně 16,67. Model předpokládá, že banky drží jen povinné rezervy a že nikdo nedrží hotovost mimo banky.",
        },
        {
          type: "example",
          title: "Vzorový test Q4 – nákup cenných papírů",
          prompt:
            "Centrální banka nakoupí vládní cenné papíry od komerční banky za 20 000 000 Kč. Vše je bezhotovostní, termínované vklady neexistují, PMR = 6 %. Vypočítej změny měnové báze, M1, povinných rezerv a depozit.",
          steps: [
            {
              label: "Měnová báze",
              text: "Bez změny oběživa je $\\Delta MB = \\Delta R = 20$ mil. Kč.",
            },
            {
              label: "Depozita a M1",
              text: "$\\Delta D = \\frac{1}{0{,}06} \\times 20 = 333{,}33$ mil. Kč. Protože nejsou termínované vklady, $\\Delta M1 = \\Delta D = 333{,}33$ mil. Kč.",
            },
            {
              label: "Povinné rezervy",
              text: "Změna povinných rezerv je $0{,}06 \\times 333{,}33 = 20$ mil. Kč, tedy stejně jako počáteční impuls.",
            },
          ],
          answer:
            "ΔMB = 20 mil. Kč; ΔM1 ≈ 333,33 mil. Kč; Δ povinných rezerv = 20 mil. Kč; ΔD ≈ 333,33 mil. Kč.",
        },
        { type: "graph", graphId: "deposit-multiplier", figure: "Obr. 3.1" },
        {
          type: "callout",
          variant: "note",
          title: "Kola multiplikace",
          text: "Při PMR 6 % a impulsu 20 mil. Kč: 1. kolo vklad 20, rezervy 1,2, úvěr 18,8. 2. kolo vklad 18,8, rezervy 1,128, úvěr 17,672. Takto pokračuješ, dokud se částky neblíží nule. Součet je 20 / 0,06 = 333,33 mil. Kč.",
        },
      ],
    },
    {
      id: "poptavka",
      title: "Poptávka po penězích",
      blocks: [
        {
          type: "paragraph",
          text: "Poptávka po penězích je množství peněz, které jsou subjekty ochotny držet v likvidní formě při dané úrokové míře. Úroková míra je **náklad držby peněz**: čím vyšší je, tím méně peněz se vyplatí držet.",
        },
        {
          type: "list",
          items: [
            "**Transakční motiv** – peníze na běžné platby.",
            "**Opatrnostní motiv** – rezerva na neočekávané výdaje.",
            "**Spekulační motiv** – čekání na výhodnější cenu obligací.",
          ],
        },
        { type: "formula", formulaId: "md" },
        {
          type: "paragraph",
          text: "Poptávka po penězích roste s reálným důchodem a klesá s úrokovou mírou. Křivku MD posouvají změny HDP, cenové hladiny, počtu transakcí, platebních zvyklostí, finanční inovace a očekávání.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nominální versus reálné zůstatky",
          text: "Nominální peněžní zůstatky jsou dané množství peněz. Reálné zůstatky $M/P$ vyjadřují kupní sílu peněz a jsou očištěné od cenové hladiny.",
        },
      ],
    },
    {
      id: "rovnovaha",
      title: "Rovnováha na trhu peněz",
      blocks: [
        {
          type: "paragraph",
          text: "Nabídka peněz je vertikální, protože ji určuje centrální banka. Poptávka po penězích je klesající. Rovnováha nastane, když se nabídka rovná poptávce:",
        },
        { type: "formula", formulaId: "money-equilibrium" },
        {
          type: "paragraph",
          text: "Když je na trhu peněz přebytek peněz, lidé za ně kupují obligace. Cena obligací roste a úroková míra klesá. Když je peněz málo, lidé obligace prodávají, jejich cena klesá a úroková míra roste.",
        },
        {
          type: "table",
          headers: ["Situace", "Co se stane", "Úroková míra"],
          rows: [
            ["CB nakoupí CP", "MS roste", "klesá"],
            ["CB prodá CP", "MS klesá", "roste"],
            ["Roste Y", "MD roste", "roste"],
            ["Rostou inflační očekávání", "MD klesá", "klesá"],
          ],
        },
        { type: "formula", formulaId: "fisher" },
        {
          type: "paragraph",
          text: "Fisher říká, že nominální úrok se skládá z reálného výnosu a očekávané inflace. Když lidé čekají vyšší inflaci, chtějí vyšší nominální úrok, aby jim reálný výnos nezmizel.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Cena obligace a úrok",
          text: "Cena dluhopisu a úroková míra se pohybují protisměrně. Když cena dluhopisu roste, výnos z něj klesá.",
        },
        { type: "graph", graphId: "money-market", figure: "Obr. 3.2" },
      ],
    },
    {
      id: "odnest",
      title: "Co si odnést",
      blocks: [
        {
          type: "list",
          items: [
            "M1 = oběživo + vklady na požádání; M2 přidává termínované vklady; M3 je ještě širší.",
            "MB = oběživo + rezervy bank. MB není totéž co M1.",
            "ΔD = (1/PMR) × ΔR; při PMR 6 % je multiplikátor 16,67.",
            "MD = kY − hi; rovnováha MS = MD určuje i.",
            "Fisher: i_N ≈ i_R + π.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nejčastější chyby",
          text: "Záměna měnové báze a peněžní zásoby, PMR jako procento místo desetinného čísla, opomenutí úniku do hotovosti, záměna posunu MD a pohybu po křivce.",
        },
      ],
    },
  ],
};
