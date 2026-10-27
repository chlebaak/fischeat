import type { GraphId, GraphMeta, TopicId } from "@/subjects/types";

export const graphs: GraphMeta[] = [
  {
    id: "gdp-methods",
    topicId: "narodni-ucty",
    title: "Tři cesty k HDP",
    description:
      "Výdajová, výrobní a důchodová metoda nejsou tři různá HDP. Jsou to tři pohledy na stejný tok: kdo co koupil, co se vyrobilo a komu plynuly důchody.",
    keyIdea:
      "Když jsou data správná, všechny tři metody dají stejný HDP. V testu vybíráš metodu podle toho, co je v zadání.",
    takeaways: [
      "Výdajová metoda se dívá na užití produktu: spotřebu, investice, vládní nákupy a čistý export.",
      "Výrobní metoda sčítá přidanou hodnotu, ne celkovou produkci.",
      "Důchodová metoda sčítá důchody výrobních faktorů, odpisy a nepřímé daně.",
    ],
    pitfalls: [
      "Meziprodukt se nesmí započítat dvakrát.",
      "Transfery nejsou vládní nákupy statků a služeb.",
      "Odpisy patří do důchodové metody, ne do výdajové.",
    ],
    checklist: [
      "Napiš, co je finální statek a co meziprodukt.",
      "U výdajové metody označ $C$, $I_B$, $G$ a $NX$.",
      "U výrobní metody sečti přidanou hodnotu, ne produkci.",
      "U důchodové metody nezapomeň na odpisy a nepřímé daně.",
    ],
    formulaIds: ["gdp-expenditure", "gdp-production", "gdp-income"],
    testQuestionIds: ["q5"],
    interactive: false,
  },
  {
    id: "deflator-chart",
    topicId: "narodni-ucty",
    title: "Nominální a reálný HDP, deflátor",
    description:
      "Sloupce ukazují nominální a reálný HDP, čára na pravé ose deflátor. Data pocházejí ze vzorového testu Q2. Je vidět, že nominální HDP roste i kvůli cenám.",
    keyIdea:
      "Deflátor odděluje cenový růst od skutečného růstu produkce. Bez něj bys nominální a reálný HDP snadno popletl.",
    takeaways: [
      "Deflátor je cenový index, ne procentní změna.",
      "Reálný HDP = nominální HDP / deflátor × 100.",
      "Deflátor 100 znamená základní rok.",
    ],
    pitfalls: [
      "Deflátor 120 neznamená inflaci 120 %.",
      "Nominální a reálný HDP se nedají srovnávat bez očištění o ceny.",
      "Deflátor není totéž jako index spotřebitelských cen.",
    ],
    checklist: [
      "Označ osu let a osu hodnoty.",
      "Rozliš sloupce nominálního a reálného HDP.",
      "Deflátor čti na pravé ose.",
      "Zkontroluj, že deflátor 100 znamená základní rok.",
    ],
    formulaIds: ["deflator", "real-gdp", "nominal-gdp"],
    testQuestionIds: ["q2"],
    interactive: false,
  },
  {
    id: "consumption-savings",
    topicId: "model-vydaje",
    title: "Spotřební a úsporová funkce",
    description:
      "Vlevo je spotřební funkce, vpravo úsporová. Jsou propojené vztahem c + s = 1: co domácnost vydá za spotřebu, nemůže současně ušetřit.",
    keyIdea:
      "Změna mezního sklonu ke spotřebě mění sklon křivky. Změna autonomní spotřeby posouvá celou křivku rovnoběžně. Přesně tento rozdíl řeší Q3 a Q6.",
    takeaways: [
      "Spotřeba roste s disponibilním důchodem; úspory jsou její zrcadlový obraz.",
      "Mezní sklony ke spotřebě a k úsporám se doplňují do jedné.",
      "Průměrný sklon ke spotřebě je podíl spotřeby na důchodu, ne mezní sklon.",
    ],
    pitfalls: [
      "Pokles mezního sklonu k úsporám znamená růst mezního sklonu ke spotřebě, ne posun křivky.",
      "Průměrný a mezní sklon nejsou totéž.",
      "Při nulovém důchodu jsou úspory záporné, protože domácnost financuje autonomní spotřebu.",
    ],
    checklist: [
      "Označ osy $YD$ a $C$, respektive $YD$ a $S$.",
      "Vyznač autonomní spotřebu $C_A$ jako průsečík s osou $C$.",
      "Spoj $C$ a $S$ vztahem $c + s = 1$.",
      "U posunu kresli rovnoběžku, u změny sklonu změň sklon.",
    ],
    formulaIds: ["consumption", "savings", "mpc-mps", "apc-aps"],
    testQuestionIds: ["q3", "q6"],
    interactive: true,
  },
  {
    id: "keynesian-cross",
    topicId: "model-vydaje",
    title: "Keynesiánský kříž",
    description:
      "Přímka 45° představuje všechny body, kde se produkt rovná plánovaným výdajům. Rovnováha je tam, kde se protne s křivkou AE.",
    keyIdea:
      "Produkt se přizpůsobuje plánovaným výdajům. V rovnováze platí Y = AE a neplánované investice do zásob jsou nulové.",
    takeaways: [
      "Plánované výdaje se skládají z autonomní části a části závislé na produktu.",
      "Rovnováha je průsečík křivky plánovaných výdajů s 45° linií.",
      "Posun křivky způsobí autonomní výdaje; změnu sklonu mezní sklon, daně nebo import.",
    ],
    pitfalls: [
      "Nezaměňuj posun křivky a pohyb po křivce.",
      "Na ose x je produkt, na ose y plánované výdaje.",
      "Ve dvousektorovém modelu se plánované investice rovnají úsporám.",
    ],
    checklist: [
      "Označ osu $Y$ a osu $AE$.",
      "Nakresli přímku 45°.",
      "Nakresli $AE = A_0 + c'Y$.",
      "Vyznač rovnováhu a rozliš posun versus změnu sklonu.",
    ],
    formulaIds: [
      "equilibrium-2",
      "multiplier-2",
      "multiplier-3",
      "multiplier-4",
      "equilibrium-4",
      "injections-leakages",
    ],
    testQuestionIds: ["q1"],
    interactive: true,
  },
  {
    id: "money-market",
    topicId: "penize",
    title: "Trh peněz",
    description:
      "Nabídka peněz je vertikální, poptávka po penězích klesá. Průsečík určuje rovnovážnou úrokovou míru. Změna nabídky nebo poptávky po penězích se projeví posunem křivky.",
    keyIdea:
      "Úroková míra je cena za to, že držíš peníze místo obligací. Rovnováha na trhu peněz nastane, když se nabídka peněz rovná poptávce po penězích.",
    takeaways: [
      "Nabídka peněz je vertikální, určuje ji centrální banka.",
      "Poptávka po penězích roste s důchodem a klesá s úrokovou mírou.",
      "Převis peněz vede k nákupu obligací, růstu jejich ceny a poklesu úrokové míry.",
    ],
    pitfalls: [
      "Nezaměňuj posun poptávky po penězích a pohyb po křivce.",
      "Růst produktu zvyšuje poptávku po penězích a tlačí úrokovou míru nahoru.",
      "Nákup cenných papírů centrální bankou zvyšuje nabídku peněz a snižuje úrokovou míru.",
    ],
    checklist: [
      "Označ osu $M$ a osu $i$.",
      "Nakresli vertikální $MS$.",
      "Nakresli klesající $MD = kY - hi$.",
      "Vyznač rovnováhu a popiš převis peněz.",
    ],
    formulaIds: ["m1", "m2", "m3", "mb", "md", "money-equilibrium", "fisher"],
    testQuestionIds: [],
    interactive: true,
  },
  {
    id: "deposit-multiplier",
    topicId: "penize",
    title: "Depozitní multiplikace",
    description:
      "Počáteční impuls se v bankovním systému násobí. Sloupce ukazují nové vklady v každém kole a jejich kumulativní součet.",
    keyIdea:
      "Banky vytvářejí depozita tím, že z části vkladů půjčují. Maximální změnu depozit určuje 1 / PMR.",
    takeaways: [
      "Změna depozit = (1 / PMR) × změna rezerv.",
      "Čím nižší povinná míra rezerv, tím větší depozitní multiplikátor.",
      "Model předpokládá jen povinné rezervy a žádný únik do hotovosti.",
    ],
    pitfalls: [
      "PMR dosazuj jako desetinné číslo: 6 % = 0,06.",
      "Měnová báze není totéž co peněžní zásoba M1.",
      "Reálný multiplikátor bývá menší kvůli hotovosti a dobrovolným rezervám.",
    ],
    checklist: [
      "Napiš $\\Delta D = (1 / PMR) \\times \\Delta R$.",
      "Rozliš vklady, rezervy a úvěry.",
      "Ukaž první tři kola a pak limit.",
      "Nezapomeň, že model ignoruje hotovostní úniky.",
    ],
    formulaIds: ["mb", "deposit-multiplier", "m1"],
    testQuestionIds: ["q4"],
    interactive: true,
  },
  {
    id: "adas",
    topicId: "ad-as",
    title: "AD–AS a reakce na šoky",
    description:
      "AD klesá, SAS roste a LAS je vertikální na úrovni potenciálního produktu. Šoky posouvají křivky a mění krátkodobou i dlouhodobou rovnováhu.",
    keyIdea:
      "V krátkém období se produkt může odchýlit od potenciálu. V dlouhém období se krátkodobá nabídka přizpůsobí a ekonomika se vrací k potenciálnímu produktu.",
    takeaways: [
      "Poptávkový šok: produkt a cenová hladina se pohybují stejným směrem.",
      "Nabídkový šok: produkt a ceny se pohybují opačným směrem, vzniká stagflace.",
      "V dlouhém období se přizpůsobuje krátkodobá nabídka, ne dlouhodobá.",
    ],
    pitfalls: [
      "Nezapomeň na dlouhodobou nabídku a na rozdíl mezi KO a DO.",
      "U nabídkového šoku se posouvá krátkodobá nabídka, ne poptávka.",
      "Znehodnocení měny posouvá krátkodobou nabídku i poptávku.",
    ],
    checklist: [
      "Označ osu $Y$ a osu $P$.",
      "Nakresli klesající $AD$, rostoucí $SAS$ a vertikální $LAS$.",
      "Vyznač $KO$ a $DO$.",
      "U poptávkového šoku se $Y$ a $P$ pohybují stejným směrem.",
      "U nabídkového šoku se $Y$ a $P$ pohybují opačným směrem.",
    ],
    formulaIds: ["ad", "output-gap"],
    testQuestionIds: ["q7", "q8"],
    interactive: true,
  },
  {
    id: "business-cycle",
    topicId: "cyklus",
    title: "Hospodářský cyklus a produkční mezera",
    description:
      "Skutečný produkt kolísá kolem potenciálu. Produkční mezera měří, jak daleko je ekonomika od dlouhodobě udržitelného výkonu.",
    keyIdea:
      "Kladná mezera znamená přehřátí a inflační tlaky. Záporná mezera znamená nevyužité kapacity a vyšší nezaměstnanost.",
    takeaways: [
      "Fáze cyklu: dno → expanze → vrchol → recese.",
      "Produkční mezera = (skutečný produkt − potenciální produkt) / potenciální produkt × 100.",
      "Procyklické veličiny se hýbou s HDP, nezaměstnanost proti němu.",
    ],
    pitfalls: [
      "Potenciální produkt není maximum, ale dlouhodobě udržitelný výkon.",
      "Nezaměňuj produkční mezeru s tempem růstu.",
      "U nabídkového cyklu se ceny chovají proticyklicky.",
    ],
    checklist: [
      "Označ čas a reálný produkt.",
      "Nakresli potenciální produkt jako dlouhodobý trend.",
      "Vyznač fáze: dno, expanze, vrchol, recese.",
      "Produkční mezeru spočítej jako $(Y - Y^*) / Y^* \\times 100$.",
    ],
    formulaIds: ["output-gap", "growth-rate", "inflation-rate", "unemployment-rate"],
    testQuestionIds: [],
    interactive: true,
  },
];

export const graphById = (id: GraphId) =>
  graphs.find((graph) => graph.id === id);

export const graphsByTopic = (topicId: TopicId) =>
  graphs.filter((graph) => graph.topicId === topicId);
