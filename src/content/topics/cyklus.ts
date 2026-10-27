import type { Topic } from "../types";

export const cyklus: Topic = {
  id: "cyklus",
  number: 5,
  slug: "cyklus",
  title: "Hospodářský cyklus a produkční mezera",
  shortTitle: "Hospodářský cyklus",
  intro:
    "Ekonomika neroste rovně. Střídá fáze expanze a recese kolem potenciálního produktu. Kapitola vysvětluje fáze, typy cyklů, produkční mezeru a cyklické chování veličin.",
  takeaways: [
    "Hospodářský cyklus je kolísání reálného HDP kolem potenciálního produktu.",
    "Kladná produkční mezera znamená přehřátí, záporná nevyužité kapacity.",
    "Poptávkové a nabídkové cykly se liší chováním cenové hladiny.",
  ],
  sourceNote: "Přednáška 5, slidy 23–42; návaznost na model AD–AS.",
  formulaIds: [
    "output-gap",
    "growth-rate",
    "inflation-rate",
    "unemployment-rate",
  ],
  graphIds: ["business-cycle"],
  testQuestionIds: [],
  sections: [
    {
      id: "cyklus",
      title: "Co je hospodářský cyklus",
      blocks: [
        {
          type: "paragraph",
          text: "**Hospodářský cyklus** je kolísání reálného hrubého domácího produktu kolem potenciálního produktu. Není to pravidelná sinusoida; cykly se liší délkou i hloubkou.",
        },
        {
          type: "list",
          items: [
            "**Dno** – ekonomika je pod potenciálem, začíná oživení.",
            "**Expanze (konjunktura)** – produkt roste, nezaměstnanost klesá.",
            "**Vrchol** – ekonomika je nad potenciálem nebo na něm, vznikají inflační tlaky.",
            "**Recese** – aktivita slábne, rostou zásoby, klesají zisky a investice.",
          ],
        },
        {
          type: "table",
          headers: ["Typ cyklu", "Délka", "Hlavní příčina"],
          rows: [
            ["Kitchinův", "krátký", "změny zásob"],
            ["Juglarův", "střednědobý", "investice do fixního kapitálu"],
            ["Kondratěvův", "dlouhý", "inovace a technologické změny"],
          ],
        },
        {
          type: "terms",
          items: [
            {
              term: "Technická recese",
              definition:
                "Mezičtvrtletní pokles sezónně očištěného reálného HDP alespoň ve dvou po sobě jdoucích čtvrtletích.",
            },
            {
              term: "Deprese",
              definition: "Hluboká a déletrvající recese.",
            },
            {
              term: "Expanze",
              definition: "Fáze, kdy ekonomika roste a přibližuje se potenciálu.",
            },
          ],
        },
        { type: "graphLink", graphId: "business-cycle" },
      ],
    },
    {
      id: "potencial",
      title: "Potenciální produkt a produkční mezera",
      blocks: [
        {
          type: "paragraph",
          text: "**Potenciální produkt $Y^*$** je maximální dlouhodobě udržitelný výkon ekonomiky při optimálním využití výrobních faktorů a stabilní inflaci. Odhaduje se obtížně; nejde o přesné číslo. Rozdíl mezi skutečným a potenciálním produktem se nazývá **produkční mezera** (často se používá i anglický termín output gap).",
        },
        { type: "formula", formulaId: "output-gap" },
        {
          type: "table",
          headers: ["Situace", "Produkční mezera", "Co to znamená"],
          rows: [
            ["Y > Y*", "kladná", "ekonomika je přehřátá, rostou inflační tlaky"],
            ["Y = Y*", "nulová", "ekonomika je na potenciálu"],
            ["Y < Y*", "záporná", "nevyužité kapacity, vyšší nezaměstnanost"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Y* není maximum",
          text: "Potenciální produkt není nejvyšší možný výkon za každou cenu. Je to výkon konzistentní s plnou zaměstnaností a stabilní inflací.",
        },
      ],
    },
    {
      id: "chovani",
      title: "Cyklické chování veličin",
      blocks: [
        {
          type: "table",
          headers: ["Typ", "Veličiny", "Pohyb"],
          rows: [
            ["Procyklické", "C, I, M, MS", "stejný směr jako HDP"],
            ["Kontracyklické", "míra nezaměstnanosti", "opačný směr než HDP"],
            ["Acyklické", "G, reálné úrokové sazby", "bez pevné vazby na cyklus"],
          ],
        },
        {
          type: "paragraph",
          text: "Procyklické veličiny rostou v expanzi a klesají v recesi. Kontracyklické se chovají opačně. Acyklické veličiny se pohybují nezávisle na cyklu.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Ceny se chovají různě",
          text: "U poptávkového cyklu je cenová hladina procyklická: v recesi klesá. U nabídkového cyklu je proticyklická: v recesi roste. Právě proto je stagflace tak nepříjemná.",
        },
      ],
    },
    {
      id: "priciny",
      title: "Příčiny cyklů a otevřená ekonomika",
      blocks: [
        {
          type: "paragraph",
          text: "Cykly mohou vznikat z **poptávkových šoků**, **nabídkových šoků** nebo z **politického hospodářského cyklu**, kdy se vláda snaží stimulovat ekonomiku před volbami. Po volbách může naopak utahovat, aby dostala inflaci pod kontrolu.",
        },
        {
          type: "list",
          items: [
            "**Poptávkový šok:** AD se posouvá; produkt a ceny se pohybují stejným směrem.",
            "**Nabídkový šok:** SAS se posouvá; produkt a ceny se pohybují opačným směrem.",
            "**Stagflace:** stagnace nebo pokles produktu při rostoucí cenové hladině.",
            "**Slumpflace:** výrazný pokles produktu při vysoké inflaci.",
          ],
        },
        {
          type: "paragraph",
          text: "V otevřené ekonomice se cyklus přenáší přes zahraniční obchod. **Teorém lokomotivy** říká, že růst jedné ekonomiky táhne nahoru i její obchodní partnery. Příklad: růst Německa zvýší poptávku po českém exportu, což podpoří českou produkci a zaměstnanost.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Importovaná inflace",
          text: "Když je domácí ekonomika na potenciálu, zahraniční poptávka už nezvýší produkt, ale promítne se do vyšších cen. Tomu se říká importovaná inflace.",
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
            "Cyklus = kolísání Y kolem Y*.",
            "Fáze: dno → expanze → vrchol → recese.",
            "Produkční mezera = (Y − Y*) / Y* × 100.",
            "Procyklické: C, I, M, MS; kontracyklické: nezaměstnanost; acyklické: G, reálné úrokové sazby.",
            "Poptávkový cyklus: P procyklická; nabídkový cyklus: P proticyklická.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nejčastější chyby",
          text: "Záměna potenciálního produktu a maxima, kladná mezera jako „dobrá“ bez inflačních tlaků, záměna stagflace a recese, zapomenutí, že produkční mezera je v procentech Y*.",
        },
      ],
    },
  ],
};
