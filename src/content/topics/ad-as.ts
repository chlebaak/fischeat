import type { Topic } from "../types";

export const adAs: Topic = {
  id: "ad-as",
  number: 4,
  slug: "ad-as",
  title: "Model agregátní poptávky a agregátní nabídky",
  shortTitle: "AD–AS",
  intro:
    "Model, ve kterém už cena není fixní. AD a AS vysvětlují krátkodobé výkyvy produktu i dlouhodobý návrat k potenciálu.",
  takeaways: [
    "AD je klesající kvůli úrokovému efektu, efektu bohatství a zahraničnímu efektu.",
    "SAS je krátkodobě rostoucí, LAS je vertikální na úrovni potenciálního produktu.",
    "Poptávkový šok mění hlavně produkt, nabídkový šok může způsobit stagflaci.",
  ],
  sourceNote: "Přednášky 4–5, slidy 35–41 a 1–22; vzorový test Q7 a Q8.",
  formulaIds: ["ad", "output-gap"],
  graphIds: ["adas"],
  testQuestionIds: ["q7", "q8"],
  sections: [
    {
      id: "od-45-k-adas",
      title: "Od modelu 45° k modelu AD–AS",
      blocks: [
        {
          type: "paragraph",
          text: "Model 45° předpokládal pevnou cenovou hladinu. Model AD–AS tento předpoklad opouští: ceny se mění, ekonomika může být v krátkodobé i dlouhodobé rovnováze a můžeme zkoumat inflaci i produkt současně.",
        },
        {
          type: "paragraph",
          text: "Základní otázka modelu zní: **co se stane s produktem a cenovou hladinou**, když se změní poptávka nebo nabídka? Odpověď závisí na tom, zda se díváš na krátké, nebo dlouhé období.",
        },
        {
          type: "paragraph",
          text: "**Potenciální produkt $Y^*$** je úroveň produkce při optimálním využití výrobních faktorů, plné zaměstnanosti a stabilní inflaci. Není to maximum, které lze vytlačit z ekonomiky za každou cenu; je to dlouhodobě udržitelný výkon.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Krátké versus dlouhé období",
          text: "V krátkém období mohou být mzdy a ceny nepružné, takže se produkt může odchýlit od $Y^*$. V dlouhém období se mzdy a ceny přizpůsobí a ekonomika se vrací k potenciálu.",
        },
      ],
    },
    {
      id: "ad",
      title: "Agregátní poptávka",
      blocks: [
        {
          type: "paragraph",
          text: "Agregátní poptávka vyjadřuje množství statků a služeb, které chtějí spotřebitelé, firmy, vláda a zahraniční zákazníci koupit při různých cenových hladinách. Není to poptávka po jednom statku: je to součet všech složek výdajů v ekonomice.",
        },
        { type: "formula", formulaId: "ad" },
        {
          type: "paragraph",
          text: "Křivka AD je klesající. Vysvětlují to tři efekty:",
        },
        {
          type: "list",
          items: [
            "**Efekt úrokové míry (Keynesův):** vyšší $P$ → vyšší poptávka po penězích → vyšší $i$ → nižší investice → nižší $Y$.",
            "**Efekt bohatství (Pigouův):** vyšší $P$ → nižší reálná hodnota aktiv → nižší spotřeba → nižší $Y$.",
            "**Zahraniční efekt:** vyšší $P$ → zdražení domácího zboží → nižší export a vyšší import → nižší $NX$ → nižší $Y$.",
          ],
        },
        {
          type: "paragraph",
          text: "Celou křivku AD posouvají **poptávkové šoky**: změna peněžní zásoby, fiskální expanze nebo restrikce, očekávání spotřebitelů a firem, změna bohatství, kurz měny, zahraniční poptávka.",
        },
        {
          type: "table",
          headers: ["Šok", "Posun AD", "Typický důvod"],
          rows: [
            ["Monetární expanze", "doprava", "CB zvýší MS, klesne i"],
            ["Fiskální expanze", "doprava", "vyšší G nebo nižší daně"],
            ["Růst bohatství", "doprava", "vyšší C"],
            ["Znehodnocení kurzu", "doprava", "levnější export, dražší import"],
            ["Pesimistická očekávání", "doleva", "nižší C a I"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Pohyb po křivce versus posun",
          text: "Změna cenové hladiny vyvolá pohyb po křivce AD. Změna jiného faktoru, například G nebo MS, posune celou křivku.",
        },
      ],
    },
    {
      id: "as",
      title: "Agregátní nabídka",
      blocks: [
        {
          type: "paragraph",
          text: "Agregátní nabídka vyjadřuje množství statků a služeb, které firmy chtějí vyrábět při různých cenových hladinách.",
        },
        {
          type: "paragraph",
          text: "**Krátkodobá agregátní nabídka SAS** je rostoucí. Firmy reagují na vyšší ceny vyšší produkcí, protože nominální mzdy a některé náklady jsou nepružné nebo kvůli peněžní iluzi.",
        },
        {
          type: "paragraph",
          text: "**Dlouhodobá agregátní nabídka LAS** je vertikální na úrovni $Y^*$. V dlouhém období se mzdy přizpůsobí cenám a produkt se vrací k potenciálu. Proto se v dlouhém období mění hlavně cenová hladina, ne produkt.",
        },
        {
          type: "table",
          headers: ["Typ šoku", "Co se posouvá", "Příklady"],
          rows: [
            ["Nominální nabídkový šok", "SAS nahoru/dolů", "růst nominálních mezd, cen ropy, znehodnocení kurzu"],
            ["Reálný nabídkový šok", "SAS i LAS", "změna množství nebo produktivity výrobních faktorů, technologie"],
          ],
        },
        {
          type: "callout",
          variant: "note",
          title: "Nabídkový šok není totéž co poptávkový",
          text: "Negativní nabídkový šok snižuje produkt a zvyšuje ceny. Negativní poptávkový šok snižuje produkt i ceny. Proto se u nabídkového šoku mluví o stagflaci.",
        },
      ],
    },
    {
      id: "rovnovaha",
      title: "Rovnováha a reakce na šoky",
      blocks: [
        {
          type: "paragraph",
          text: "Krátkodobá rovnováha (KO) je průsečík AD a SAS. Dlouhodobá rovnováha (DO) leží na LAS v $Y^*$. Pokud se ekonomika odchýlí, mzdy a ceny se postupně přizpůsobí a SAS se posune tak, aby se produkt vrátil k potenciálu.",
        },
        {
          type: "paragraph",
          text: "U poptávkového šoku se posouvá **AD**. U nabídkového šoku se posouvá **SAS**. V dlouhém období se SAS přizpůsobuje tak, aby procházela bodem $Y^*$ a novou cenovou hladinou.",
        },
        {
          type: "example",
          title: "Vzorový test Q7 – pokles exportu",
          prompt:
            "Zakresli krátkodobé a dlouhodobé dopady poklesu exportu v modelu AD–AS. Popiš osy, křivky a označ KO a DO.",
          steps: [
            {
              label: "Krátké období",
              text: "Pokles exportu sníží $NX$, tedy AD se posune **doleva**. Krátkodobá rovnováha má nižší $Y$ i nižší $P$.",
            },
            {
              label: "Dlouhé období",
              text: "Při nižší cenové hladině klesají mzdy a náklady, takže SAS se posouvá **doprava/dolů**. Ekonomika se vrací na $Y^*$ při ještě nižší cenové hladině.",
            },
            {
              label: "Popisky",
              text: "Osa Y = reálný produkt, osa P = cenová hladina. Vyznač AD, SAS, LAS, body E0, E1 (KO) a E2 (DO).",
            },
          ],
          answer:
            "AD doleva; KO: Y a P nižší; DO: SAS doprava/dolů, Y zpět na Y*, P trvale nižší.",
        },
        {
          type: "example",
          title: "Vzorový test Q8 – znehodnocení domácí měny",
          prompt:
            "Zakresli vliv znehodnocení domácí měny na krátkodobou agregátní nabídku a agregátní poptávku.",
          steps: [
            {
              label: "SAS",
              text: "Dovozní suroviny a meziprodukty zdraží, náklady firem rostou, SAS se posouvá **doleva/nahoru**.",
            },
            {
              label: "AD",
              text: "Domácí zboží je pro zahraničí levnější a import je dražší, takže $NX$ roste a AD se posouvá **doprava**.",
            },
            {
              label: "Výsledek",
              text: "Krátkodobě je tlak na vyšší cenovou hladinu. Dopad na produkt je nejednoznačný podle síly obou posunů.",
            },
          ],
          answer:
            "SAS doleva/nahoru, AD doprava. Cena roste; Y závisí na tom, který posun převáží.",
        },
        { type: "graphLink", graphId: "adas" },
      ],
    },
    {
      id: "scenare",
      title: "Typové scénáře",
      blocks: [
        {
          type: "table",
          headers: ["Scénář", "Krátké období", "Dlouhé období"],
          rows: [
            ["Vláda zvýší G", "AD doprava; Y a P rostou", "SAS nahoru; Y zpět na Y*, P výše"],
            ["CB zvýší MS", "AD doprava; Y a P rostou", "SAS nahoru; Y zpět na Y*, P výše"],
            ["Investice klesnou", "AD doleva; Y a P klesají", "SAS dolů; Y zpět na Y*, P níže"],
            ["Ropný šok", "SAS doleva; Y klesá, P roste (stagflace)", "SAS zpět, pokud je šok dočasný; Y na Y*"],
            ["Ropný šok + expanzivní politika", "AD doprava; tlumí pokles Y, ale zvyšuje P", "Riziko trvalejší inflace"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "U zkoušky kresli všechny tři křivky",
          text: "AD, SAS i LAS. Vyznač počáteční a novou rovnováhu, šipky posunu a popiš osy. U dlouhého období nezapomeň, že se SAS přizpůsobuje, ne AD.",
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
            "AD klesá díky úrokovému efektu, efektu bohatství a zahraničnímu efektu.",
            "SAS je krátkodobě rostoucí, LAS vertikální na $Y^*$.",
            "Poptávkový šok: Y a P se pohybují stejným směrem. Nabídkový šok: Y a P opačným směrem.",
            "Stagflace = pokles Y + růst P.",
            "V dlouhém období se produkt vrací k potenciálu, mění se hlavně cenová hladina.",
          ],
        },
      ],
    },
  ],
};
