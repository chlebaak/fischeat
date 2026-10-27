import type { Topic } from "../types";

export const narodniUcty: Topic = {
  id: "narodni-ucty",
  number: 1,
  slug: "narodni-ucty",
  title: "Národní účty a makroekonomické agregáty",
  shortTitle: "Národní účty",
  intro:
    "Co vlastně měříme, když mluvíme o výkonu ekonomiky. HDP, HND, čistý produkt, deflátor a identity, na kterých stojí celý zbytek kurzu.",
  takeaways: [
    "HDP je tržní hodnota finální produkce vytvořené na území za dané období.",
    "HND přidává saldo prvotních důchodů se zahraničím, čistý produkt odečítá odpisy.",
    "Tři metody výpočtu musí dát stejný výsledek. Deflátor odděluje růst cen od růstu produkce.",
  ],
  sourceNote: "Přednášky 1–2, slidy 1–37; vzorový test Q2 a Q5.",
  formulaIds: [
    "gdp-expenditure",
    "gdp-production",
    "gdp-income",
    "hnd",
    "cdp",
    "deflator",
    "real-gdp",
    "nominal-gdp",
    "cnd",
    "yd",
    "identity-savings",
    "gdp-identity",
    "net-taxes",
    "budget-balance",
  ],
  graphIds: ["gdp-methods", "deflator-chart"],
  testQuestionIds: ["q2", "q5"],
  sections: [
    {
      id: "makro-a-cile",
      title: "Makroekonomie a čtyři cíle",
      blocks: [
        {
          type: "paragraph",
          text: "Mikroekonomie se dívá na jednotlivé trhy a subjekty. Makroekonomie zkoumá ekonomiku jako celek: produkci, zaměstnanost, cenovou hladinu a vztah k zahraničí.",
        },
        {
          type: "paragraph",
          text: "Mezi čtyři základní makroekonomické ukazatele patří **HDP**, **míra nezaměstnanosti**, **inflace** a **vnější rovnováha** (platební nebo obchodní bilance). Když je zakreslíš jako čtyři cíle, vznikne **magický čtyřúhelník**. Nejde maximalizovat všechny najednou; hospodářská politika hledá kompromis.",
        },
        {
          type: "list",
          items: [
            "**Fiskální politika** – daně a vládní výdaje.",
            "**Monetární politika** – peněžní zásoba a úrokové sazby.",
            "**Kurzová politika** – ovlivňování měnového kurzu.",
            "**Obchodní politika** – cla, kvóty, podpora exportu.",
            "**Důchodová politika** – mzdy, transfery, přerozdělování.",
          ],
        },
        {
          type: "paragraph",
          text: "V makroekonomickém koloběhu obíhají statky a služby, peníze a výrobní faktory mezi domácnostmi, firmami, vládou, zahraničím a finančním trhem. Pro test si stačí pamatovat čtyři základní role:",
        },
        {
          type: "list",
          items: [
            "**Domácnosti** nabízejí práci a kapitál, dostávají za ně důchody a utrácejí za statky.",
            "**Firmy** najímají výrobní faktory, vyrábějí statky a prodávají je.",
            "**Vláda** vybírá daně, poskytuje transfery a nakupuje statky a služby.",
            "**Zahraničí** prodává importy a kupuje exporty.",
          ],
        },
        {
          type: "callout",
          variant: "note",
          title: "Magický čtyřúhelník",
          text: "Není to vzorec. Je to připomínka, že cíle se navzájem ovlivňují. Například rychlý růst může zvýšit inflaci nebo zhoršit vnější bilanci.",
        },
      ],
    },
    {
      id: "hdp",
      title: "HDP: co měří a co ne",
      blocks: [
        {
          type: "paragraph",
          text: "**Hrubý domácí produkt** je tržní hodnota veškerých finálních statků a služeb vyprodukovaných v dané ekonomice za dané časové období.",
        },
        {
          type: "list",
          items: [
            "**Finální statky** – meziprodukty se nezapočítávají, jinak by se počítaly dvakrát.",
            "**Na území** – rozhoduje místo výroby, ne občanství vlastníka.",
            "**Za období** – HDP je tok, ne stav.",
            "**Tržní ceny** – statky, které se neprodávají na trhu, se do HDP dostávají obtížně.",
          ],
        },
        {
          type: "paragraph",
          text: "Zásadní je slovo **finální**. Když se do HDP započítá i meziprodukt, jeho hodnota se objeví dvakrát: jednou samostatně a podruhé v ceně finálního statku. Proto HDP měří jen to, co je určeno ke konečnému užití.",
        },
        {
          type: "paragraph",
          text: "**HDP je tok** (za určité období), **národní bohatství je stav** (k určitému datu). Podobně mzda je tok, zůstatek na účtu je stav.",
        },
        {
          type: "paragraph",
          text: "HDP není ukazatel blahobytu. Nezachycuje **šedou a černou ekonomiku**, hodnotu **volného času**, práci v domácnosti, netržní statky ani **externality** jako znečištění. Proto se používá širší ukazatel **čistý ekonomický blahobyt (NEW)**.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "HDP není blahobyt",
          text: "Růst HDP může být doprovázen poklesem blahobytu, pokud roste znečištění, doprava nebo počet odpracovaných hodin.",
        },
      ],
    },
    {
      id: "hnd-cdp",
      title: "HDP, HND a čistý produkt",
      blocks: [
        {
          type: "paragraph",
          text: "**Hrubý národní důchod (HND)** sleduje důchody rezidentů bez ohledu na to, kde vznikly. Platí:",
        },
        { type: "formula", formulaId: "hnd" },
        {
          type: "paragraph",
          text: "Rozdíl si představ takto: HDP říká, co se vyrobilo **na území ČR**. HND říká, co z toho plyne **českým rezidentům** jako důchod. Když zahraniční firmy v ČR vydělají více, než Češi vydělají v zahraničí, je HND nižší než HDP.",
        },
        {
          type: "paragraph",
          text: "V ČR je HND dlouhodobě nižší než HDP, protože saldo prvotních důchodů se zahraničím je záporné.",
        },
        {
          type: "paragraph",
          text: "**Hrubý** produkt ještě neodečítá opotřebení kapitálu. **Čistý** produkt vznikne odečtením odpisů:",
        },
        { type: "formula", formulaId: "cdp" },
        {
          type: "table",
          headers: ["Ukazatel", "Co měří", "Vztah"],
          rows: [
            ["HDP", "produkce vytvořená na území", "základ"],
            ["HND", "důchody rezidentů", "HDP + saldo prvotních důchodů"],
            ["ČDP", "HDP po odečtení odpisů", "HDP − odpisy"],
            ["ČND", "HND po odečtení odpisů", "HND − odpisy"],
          ],
        },
        { type: "formula", formulaId: "cnd" },
        {
          type: "callout",
          variant: "note",
          title: "Hrubé versus čisté",
          text: "Hrubé a čisté veličiny nemíchej. Pokud se v identitě používají hrubé úspory, musí být hrubé i investice.",
        },
      ],
    },
    {
      id: "nominalni-realny",
      title: "Nominální a reálný HDP, deflátor",
      blocks: [
        {
          type: "paragraph",
          text: "Nominální HDP je v běžných cenách. Reálný HDP je očištěný o změnu cenové hladiny. Deflátor HDP je cenový index:",
        },
        { type: "formula", formulaId: "deflator" },
        {
          type: "paragraph",
          text: "Když ceny rostou, nominální HDP roste, i kdyby se vyrábělo stejně. Reálný HDP proto drží ceny na úrovni základního roku. Deflátor 120 znamená, že cenová hladina je o 20 % vyšší než v základním roce; není to totéž jako 20% inflace.",
        },
        { type: "formula", formulaId: "real-gdp" },
        { type: "formula", formulaId: "nominal-gdp" },
        {
          type: "example",
          title: "Vzorový test Q2 – dopočítej tabulku",
          prompt:
            "Nominální HDP, reálný HDP a deflátor ve třech letech. Dopočítej X1, X2 a X3.",
          steps: [
            {
              label: "X1 – reálný HDP 2013",
              text: "$X_1 = 1200 / 120 \\times 100 = 1000$.",
            },
            {
              label: "X2 – deflátor 2014",
              text: "$X_2 = 1500 / 1100 \\times 100 = 136{,}36$.",
            },
            {
              label: "X3 – nominální HDP 2015",
              text: "$X_3 = 1400 \\times 105 / 100 = 1470$.",
            },
          ],
          answer: "X1 = 1000, X2 ≈ 136,36, X3 = 1470.",
        },
        { type: "graph", graphId: "deflator-chart", figure: "Obr. 1.2" },
      ],
    },
    {
      id: "metody",
      title: "Tři metody výpočtu HDP",
      blocks: [
        {
          type: "paragraph",
          text: "Výdajová, výrobní a důchodová metoda musí při správných datech dát stejný HDP. Je to stejný tok, jen se na něj díváš z jiné strany: výdajová z pohledu kupujícího, výrobní z pohledu výrobce a důchodová z pohledu příjemců důchodů.",
        },
        { type: "heading", text: "Výdajová metoda" },
        { type: "formula", formulaId: "gdp-expenditure" },
        {
          type: "list",
          items: [
            "$C$ – spotřeba domácností.",
            "$I_B$ – hrubé soukromé investice. Patří sem fixní investice, změna zásob a čisté pořízení cenností, ne finanční investice.",
            "$G$ – vládní nákupy statků a služeb, ne transfery.",
            "$NX = X - M$ – čistý export.",
          ],
        },
        { type: "heading", text: "Výrobní metoda" },
        { type: "formula", formulaId: "gdp-production" },
        {
          type: "paragraph",
          text: "Sčítají se **hrubé přidané hodnoty** odvětví. Přidaná hodnota = hodnota produkce − mezipotřeba. Meziprodukt se do HDP nezapočítává.",
        },
        {
          type: "example",
          title: "Přidaná hodnota po výrobních fázích",
          prompt:
            "Těžba dřeva 20, výroba papíru 50, tisk 110. Jaký je HDP?",
          steps: [
            {
              label: "Přidaná hodnota",
              text: "$20 + (50 - 20) + (110 - 50) = 20 + 30 + 60 = 110$.",
            },
          ],
          answer: "HDP = 110, tedy hodnota finálního statku.",
        },
        { type: "heading", text: "Důchodová metoda" },
        { type: "formula", formulaId: "gdp-income" },
        {
          type: "paragraph",
          text: "Sčítají se prvotní důchody (mzdy, renty, úroky, zisky, sebezaměstnání), k tomu odpisy a nepřímé daně mínus subvence.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Dvojí započtení",
          text: "Nezapočítej meziprodukt dvakrát. U výdajové metody se do HDP dostane jen finální statek, u výrobní jen přidaná hodnota.",
        },
        { type: "graph", graphId: "gdp-methods", figure: "Obr. 1.1" },
      ],
    },
    {
      id: "identity",
      title: "Disponibilní důchod a makroekonomické identity",
      blocks: [
        {
          type: "paragraph",
          text: "Disponibilní důchod domácností se rozděluje na spotřebu a úspory:",
        },
        { type: "formula", formulaId: "yd" },
        {
          type: "paragraph",
          text: "Základní makroekonomická identita říká, že investice a čistý export se rovnají úsporám domácností, úsporám firem a saldu státního rozpočtu:",
        },
        { type: "formula", formulaId: "identity-savings" },
        {
          type: "paragraph",
          text: "Levá strana říká, kam plynou investice a čistý export. Pravá strana říká, kdo je financuje ze svých úspor. V uzavřené ekonomice bez vlády by platilo jednoduše $I = S$.",
        },
        {
          type: "paragraph",
          text: "Identita je vždy platná, protože plyne z definic. Není to podmínka rovnováhy jako v modelu 45°.",
        },
        { type: "formula", formulaId: "gdp-identity" },
        { type: "formula", formulaId: "net-taxes" },
        { type: "formula", formulaId: "budget-balance" },
        {
          type: "example",
          title: "Vzorový test Q5 – HDP, ČDP a G",
          prompt:
            "$C = 2300$, $I_B = 850$, $NX = -70$, mzdy 2600, renty 650, čisté úroky 200, zisky 300, odpisy 120, nepřímé daně 80. Vypočítej HDP, ČDP a G.",
          steps: [
            {
              label: "HDP důchodovou metodou",
              text: "$\\text{HDP} = 2600 + 650 + 200 + 300 + 120 + 80 = 3950$.",
            },
            {
              label: "ČDP",
              text: "$\\text{ČDP} = 3950 - 120 = 3830$.",
            },
            {
              label: "Vládní nákupy",
              text: "$G = HDP - (C + I_B + NX) = 3950 - (2300 + 850 - 70) = 870$.",
            },
          ],
          answer: "HDP = 3950, ČDP = 3830, G = 870.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Transfery nejsou vládní nákupy",
          text: "Transfery se do HDP nezapočítávají jako vládní nákupy. Jsou přerozdělením, ne produkcí.",
        },
      ],
    },
    {
      id: "odnest",
      title: "Co si odnést",
      blocks: [
        {
          type: "list",
          items: [
            "HDP = finální produkce na území za období; HND = důchody rezidentů.",
            "Čistý produkt = hrubý produkt − odpisy.",
            "Deflátor = nominální / reálný × 100.",
            "Výdajová, výrobní a důchodová metoda musí dát stejný HDP.",
            "Identita $I + NX = PS + GBS + BS$ platí vždy; není to podmínka rovnováhy.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nejčastější chyby",
          text: "HDP versus HND, hrubý versus čistý, nominální versus reálný, tok versus stav, transfery versus vládní nákupy.",
        },
        { type: "graphLink", graphId: "gdp-methods" },
      ],
    },
  ],
};
