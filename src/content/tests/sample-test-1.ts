import type { TestVersion } from "../types";

export const sampleTest1: TestVersion = {
  id: "sample-1",
  title: "Vzorový test 1",
  subtitle: "8 otázek · 25 bodů · orientační procvičení",
  totalPoints: 25,
  questions: [
    {
      id: "q1",
      number: 1,
      title: "Čtyřsektorová ekonomika",
      topicId: "model-vydaje",
      points: 4,
      prompt: [
        "Čtyřsektorová ekonomika v modelu 45° je charakterizována následujícími údaji. Vypočítej požadované hodnoty.",
      ],
      given: [
        { label: "autonomní spotřeba $C_A$", value: "300" },
        { label: "mezní sklon ke spotřebě $c$", value: "0,8" },
        { label: "plánované investice $I$", value: "600" },
        { label: "mezní sklon k importu $m$", value: "0,1" },
        { label: "transfery $TR$", value: "120" },
        { label: "sazba důchodové daně $t$", value: "0,1" },
        { label: "vládní nákupy $G$", value: "320" },
        { label: "autonomní export $X_A$", value: "410" },
        { label: "autonomní import $M_A$", value: "340" },
        { label: "autonomní daně $T_A$", value: "170" },
      ],
      parts: [
        {
          id: "q1a",
          label: "Multiplikátor čtyřsektorové ekonomiky",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "alpha",
              label: "α",
              answer: 2.6316,
              tolerance: 0.02,
              placeholder: "2,63",
            },
          ],
          solution: [
            "$\\alpha' = \\frac{1}{1-c(1-t)+m} = \\frac{1}{1-0{,}8(1-0{,}1)+0{,}1} = \\frac{1}{0{,}38} = 2{,}6316$.",
            "Oficiální řešení používá zaokrouhlené α ≈ 2,6.",
          ],
        },
        {
          id: "q1b",
          label: "Rovnovážný produkt",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "y",
              label: "Y",
              answer: 3289.47,
              tolerance: 0.02,
              placeholder: "3289,5",
            },
          ],
          solution: [
            "$Y = \\alpha'(C_A+I+G+cTR-cT_A+X_A-M_A)$.",
            "$Y = 2{,}6316 \\times (300+600+320+0{,}8 \\times 120-0{,}8 \\times 170+410-340) = 3289{,}47$.",
            "Při zaokrouhlení α na 2,6 vychází 3250. Obě hodnoty jsou v toleranci.",
          ],
        },
        {
          id: "q1c",
          label: "Čistý export při rovnovážném produktu",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "nx",
              label: "NX",
              answer: -258.95,
              tolerance: 0.03,
              placeholder: "−259",
            },
          ],
          solution: [
            "$NX = X_A - M_A - mY = 410 - 340 - 0{,}1 \\times 3289{,}47 = -258{,}95$.",
            "Při zaokrouhleném Y = 3250 vychází −255.",
          ],
        },
        {
          id: "q1d",
          label: "Změna produktu při ΔT_A = +50 a ΔG = −20",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "dy",
              label: "ΔY",
              answer: -157.89,
              tolerance: 0.03,
              placeholder: "−157,9",
            },
          ],
          solution: [
            "$\\Delta Y = \\alpha'(\\Delta G - c\\Delta T_A) = 2{,}6316 \\times (-20 - 0{,}8 \\times 50) = -157{,}89$.",
            "Při zaokrouhlení α na 2,6 vychází −156.",
          ],
        },
      ],
      solutionIntro: [
        "Nejdřív urči multiplikátor, pak dosaď autonomní výdaje. Daňový a vládní šok můžeš počítat společně v jedné změně autonomních výdajů.",
      ],
    },
    {
      id: "q2",
      number: 2,
      title: "Deflátor HDP",
      topicId: "narodni-ucty",
      points: 3,
      prompt: [
        "Tabulka zachycuje nominální produkt, reálný produkt a deflátor ve třech letech. Dopočítej hodnoty X1, X2 a X3.",
      ],
      table: {
        headers: ["rok", "Nominální HDP", "Reálný HDP", "Deflátor"],
        rows: [
          ["2013", "1 200", "X1", "120"],
          ["2014", "1 500", "1 100", "X2"],
          ["2015", "X3", "1 400", "105"],
        ],
      },
      parts: [
        {
          id: "q2a",
          label: "X1 – reálný HDP 2013",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "x1", label: "X1", answer: 1000, tolerance: 0.0005, placeholder: "1000" },
          ],
          solution: [
            "$X_1 = \\frac{\\text{nominální HDP}}{\\text{deflátor}} \\times 100 = \\frac{1200}{120} \\times 100 = 1000$.",
          ],
        },
        {
          id: "q2b",
          label: "X2 – deflátor 2014",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "x2",
              label: "X2",
              answer: 136.36,
              tolerance: 0.01,
              placeholder: "136,36",
            },
          ],
          solution: [
            "$X_2 = \\frac{1500}{1100} \\times 100 = 136{,}36$.",
          ],
        },
        {
          id: "q2c",
          label: "X3 – nominální HDP 2015",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "x3", label: "X3", answer: 1470, tolerance: 0.0005, placeholder: "1470" },
          ],
          solution: [
            "$X_3 = \\frac{\\text{reálný HDP} \\times \\text{deflátor}}{100} = \\frac{1400 \\times 105}{100} = 1470$.",
          ],
        },
      ],
    },
    {
      id: "q3",
      number: 3,
      title: "Spotřební a úsporová funkce",
      topicId: "model-vydaje",
      points: 3,
      prompt: [
        "Tabulka obsahuje disponibilní důchod a úspory domácností. Předpokládej krátkodobou Keynesovu spotřební a úsporovou funkci.",
      ],
      table: {
        headers: ["Disponibilní důchod", "Úspory"],
        rows: [
          ["800", "120"],
          ["1 100", "180"],
          ["1 250", "210"],
        ],
      },
      parts: [
        {
          id: "q3a",
          label: "Doplň úsporovou funkci S = −S_A + s·YD",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "s",
              label: "s",
              answer: 0.2,
              tolerance: 0.01,
              placeholder: "0,2",
            },
            {
              id: "sa",
              label: "$-S_A$",
              answer: -40,
              tolerance: 0.01,
              placeholder: "−40",
            },
          ],
          solution: [
            "$s = \\frac{\\Delta S}{\\Delta YD} = \\frac{180-120}{1100-800} = 0{,}2$.",
            "$-S_A = S - sYD = 120 - 0{,}2 \\times 800 = -40$.",
            "Rovnice je $S = -40 + 0{,}2YD$.",
          ],
        },
        {
          id: "q3b",
          label: "Spotřeba při YD = 1 400",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "c1400",
              label: "C",
              answer: 1160,
              tolerance: 0.005,
              placeholder: "1160",
            },
          ],
          solution: [
            "$c = 1-s = 0{,}8$ a $C_A = 40$.",
            "$C = 40 + 0{,}8 \\times 1400 = 1160$.",
          ],
        },
        {
          id: "q3c",
          label: "APC při YD = 1 700",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "apc",
              label: "APC",
              answer: 0.8235,
              tolerance: 0.01,
              placeholder: "0,8235",
            },
          ],
          solution: [
            "$C = 40 + 0{,}8 \\times 1700 = 1400$.",
            "$APC = \\frac{1400}{1700} = 0{,}8235$.",
          ],
        },
      ],
    },
    {
      id: "q4",
      number: 4,
      title: "Měnová báze a depozitní multiplikace",
      topicId: "penize",
      points: 4,
      prompt: [
        "Centrální banka nakoupí vládní cenné papíry od komerční banky za 20 000 000 Kč. Vše probíhá bezhotovostně a neexistují termínované vklady. Povinná míra rezerv, kterou banky přesně dodržují, je 6 %. Vypočítej konečné změny v mil. Kč.",
      ],
      parts: [
        {
          id: "q4a",
          label: "Změna měnové báze",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "dmb", label: "ΔMB", answer: 20, tolerance: 0.01, unit: "mil. Kč" },
          ],
          solution: [
            "Bez změny oběživa se celý impuls projeví v rezervách: $\\Delta MB = \\Delta R = 20$ mil. Kč.",
          ],
        },
        {
          id: "q4b",
          label: "Změna peněžní zásoby M1",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "dm1",
              label: "ΔM1",
              answer: 333.33,
              tolerance: 0.01,
              unit: "mil. Kč",
            },
          ],
          solution: [
            "$\\Delta D = \\frac{1}{0{,}06} \\times 20 = 333{,}33$ mil. Kč.",
            "Bez termínovaných vkladů je $\\Delta M1 = \\Delta D$.",
          ],
        },
        {
          id: "q4c",
          label: "Změna povinných rezerv",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "dres",
              label: "ΔR",
              answer: 20,
              tolerance: 0.01,
              unit: "mil. Kč",
            },
          ],
          solution: [
            "$\\Delta R = 0{,}06 \\times 333{,}33 = 20$ mil. Kč.",
            "Konečná změna povinných rezerv se rovná počátečnímu impulsu.",
          ],
        },
        {
          id: "q4d",
          label: "Změna depozit",
          points: 1,
          kind: "numeric",
          fields: [
            {
              id: "dd",
              label: "ΔD",
              answer: 333.33,
              tolerance: 0.01,
              unit: "mil. Kč",
            },
          ],
          solution: [
            "$\\Delta D = \\frac{1}{PMR} \\Delta R = \\frac{1}{0{,}06} \\times 20 = 333{,}33$ mil. Kč.",
          ],
        },
      ],
    },
    {
      id: "q5",
      number: 5,
      title: "HDP, ČDP a vládní nákupy",
      topicId: "narodni-ucty",
      points: 3,
      prompt: [
        "Jsou zadané následující údaje. Vypočítej hrubý domácí produkt, čistý domácí produkt a vládní nákupy statků a služeb.",
      ],
      given: [
        { label: "spotřební výdaje domácností $C$", value: "2 300" },
        { label: "hrubé soukromé investice $I_B$", value: "850" },
        { label: "čisté úroky", value: "200" },
        { label: "čistý export $NX$", value: "−70" },
        { label: "nepřímé daně snížené o dotace", value: "80" },
        { label: "mzdy", value: "2 600" },
        { label: "renty", value: "650" },
        { label: "zisky firem", value: "300" },
        { label: "odpisy", value: "120" },
        { label: "transferové platby vlády $TR$", value: "150" },
      ],
      parts: [
        {
          id: "q5a",
          label: "Hrubý domácí produkt",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "gdp", label: "HDP", answer: 3950, tolerance: 0.001, placeholder: "3950" },
          ],
          solution: [
            "Důchodová metoda: $HDP = 2600 + 650 + 200 + 300 + 120 + 80 = 3950$.",
          ],
        },
        {
          id: "q5b",
          label: "Čistý domácí produkt",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "cdp", label: "ČDP", answer: 3830, tolerance: 0.001, placeholder: "3830" },
          ],
          solution: ["$\text{ČDP} = \text{HDP} - \text{odpisy} = 3950 - 120 = 3830$."],
        },
        {
          id: "q5c",
          label: "Vládní nákupy statků a služeb",
          points: 1,
          kind: "numeric",
          fields: [
            { id: "g", label: "G", answer: 870, tolerance: 0.001, placeholder: "870" },
          ],
          solution: [
            "$G = HDP - (C + I_B + NX) = 3950 - (2300 + 850 - 70) = 870$.",
          ],
        },
      ],
    },
    {
      id: "q6",
      number: 6,
      title: "Keynesova spotřební funkce",
      topicId: "model-vydaje",
      points: 3,
      prompt: [
        "Zakresli krátkodobou Keynesovu spotřební funkci, popiš osy a znázorni tři situace. U každé se nejdřív rozhodni, zda jde o změnu sklonu, nebo o posun křivky.",
      ],
      parts: [
        {
          id: "q6a",
          label: "a) pokles mezního sklonu k úsporám",
          points: 1,
          kind: "self",
          solution: [
            "Pokles $s$ znamená růst $c$ podle $c+s=1$. Spotřební funkce je strmější, její sklon se změní. Nejde o rovnoběžný posun.",
          ],
        },
        {
          id: "q6b",
          label: "b) negativní očekávání spotřebitelů",
          points: 1,
          kind: "self",
          solution: [
            "Negativní očekávání sníží autonomní spotřebu $C_A$. Křivka se posune rovnoběžně dolů.",
          ],
        },
        {
          id: "q6c",
          label: "c) růst bohatství domácností",
          points: 1,
          kind: "self",
          solution: [
            "Růst bohatství zvýší autonomní spotřebu $C_A$. Křivka se posune rovnoběžně nahoru.",
          ],
        },
      ],
      solutionGraphs: [{ kind: "consumption-shifts" }],
    },
    {
      id: "q7",
      number: 7,
      title: "Pokles exportu v modelu AD–AS",
      topicId: "ad-as",
      points: 3,
      prompt: [
        "Zakresli krátkodobé a dlouhodobé dopady poklesu exportu v modelu AD–AS. Popiš všechny osy a křivky a označ bod krátkodobé rovnováhy (KO) a dlouhodobé rovnováhy (DO).",
      ],
      parts: [
        {
          id: "q7a",
          label: "Posun AD po poklesu exportu",
          points: 1,
          kind: "self",
          solution: [
            "Pokles exportu sníží $NX$, a tím agregátní poptávku. AD se posune doleva.",
          ],
        },
        {
          id: "q7b",
          label: "Krátkodobá rovnováha",
          points: 1,
          kind: "self",
          solution: [
            "V průsečíku nové AD a SAS jsou jak reálný produkt, tak cenová hladina nižší než původně.",
          ],
        },
        {
          id: "q7c",
          label: "Dlouhodobá rovnováha",
          points: 1,
          kind: "self",
          solution: [
            "Nižší ceny a mzdy snižují náklady, SAS se posouvá doprava/dolů. Produkt se vrací na $Y^*$, cenová hladina zůstává níže.",
          ],
        },
      ],
      solutionGraphs: [
        {
          kind: "adas",
          title: "Pokles exportu: AD doleva, návrat na Y*",
          adShock: -20,
          showLongRun: true,
        },
      ],
    },
    {
      id: "q8",
      number: 8,
      title: "Znehodnocení domácí měny",
      topicId: "ad-as",
      points: 2,
      prompt: [
        "Zakresli vliv znehodnocení domácí měny na krátkodobou křivku agregátní nabídky a křivku agregátní poptávky. Popiš osy.",
      ],
      parts: [
        {
          id: "q8a",
          label: "a) krátkodobá agregátní nabídka",
          points: 1,
          kind: "self",
          solution: [
            "Dovozní suroviny a meziprodukty zdraží. Náklady firem rostou, SAS se posouvá doleva/nahoru.",
          ],
        },
        {
          id: "q8b",
          label: "b) agregátní poptávka",
          points: 1,
          kind: "self",
          solution: [
            "Domácí zboží je pro zahraničí levnější a import je dražší, takže čistý export roste. AD se posouvá doprava.",
          ],
        },
      ],
      solutionGraphs: [
        {
          kind: "adas",
          title: "A) SAS: zdražení dovozních vstupů",
          sasShock: 15,
        },
        {
          kind: "adas",
          title: "B) AD: levnější export, dražší import",
          adShock: 15,
        },
      ],
    },
  ],
};
