import type { GraphId, TopicId } from "./types";

export type GraphMeta = {
  id: GraphId;
  topicId: TopicId;
  title: string;
  description: string;
  checklist: string[];
  interactive: boolean;
};

export const graphs: GraphMeta[] = [
  {
    id: "gdp-methods",
    topicId: "narodni-ucty",
    title: "Tři cesty k HDP",
    description:
      "Výdajová, výrobní a důchodová metoda jsou tři pohledy na stejný tok. U zkoušky se hodí vědět, kterou metodu použít podle zadaných dat.",
    checklist: [
      "Napiš, co je finální statek a co meziprodukt.",
      "U výdajové metody označ C, I_B, G a NX.",
      "U výrobní metody sečti přidanou hodnotu, ne produkci.",
      "U důchodové metody nezapomeň na odpisy a nepřímé daně.",
    ],
    interactive: false,
  },
  {
    id: "deflator-chart",
    topicId: "narodni-ucty",
    title: "Nominální a reálný HDP, deflátor",
    description:
      "Data ze vzorového testu Q2. Nominální HDP roste i kvůli cenám; deflátor ukazuje, jak velká část růstu je cenová.",
    checklist: [
      "Označ osu let a osu hodnoty.",
      "Rozliš sloupce nominálního a reálného HDP.",
      "Deflátor je index, ne procentní změna.",
      "Zkontroluj, že deflátor 100 znamená základní rok.",
    ],
    interactive: false,
  },
  {
    id: "consumption-savings",
    topicId: "model-vydaje",
    title: "Spotřební a úsporová funkce",
    description:
      "Změna c mění sklon, změna autonomní spotřeby posouvá křivku. Přesně tento rozdíl řeší Q3 a Q6.",
    checklist: [
      "Označ osy YD a C, respektive YD a S.",
      "Vyznač autonomní spotřebu C_A jako průsečík s osou C.",
      "Spoj C a S vztahem c + s = 1.",
      "U posunu kresli rovnoběžku, u změny sklonu změň sklon.",
    ],
    interactive: true,
  },
  {
    id: "keynesian-cross",
    topicId: "model-vydaje",
    title: "Keynesiánský kříž",
    description:
      "Přímka 45° představuje všechny body, kde se produkt rovná výdajům. Rovnováha je tam, kde se protne s křivkou plánovaných výdajů.",
    checklist: [
      "Označ osu Y a osu AE.",
      "Nakresli přímku 45°.",
      "Nakresli AE = A + c′Y.",
      "Vyznač rovnováhu a nezapomeň na posun versus změnu sklonu.",
    ],
    interactive: true,
  },
  {
    id: "money-market",
    topicId: "penize",
    title: "Trh peněz",
    description:
      "Nabídka peněz je vertikální, poptávka po penězích klesá. Rovnováha určuje úrokovou míru a mění se při zásahu centrální banky i při růstu produktu.",
    checklist: [
      "Označ osu M a osu i.",
      "Nakresli vertikální MS.",
      "Nakresli klesající MD = kY − hi.",
      "Vyznač rovnováhu a popiš, co se stane při převisu peněz.",
    ],
    interactive: true,
  },
  {
    id: "deposit-multiplier",
    topicId: "penize",
    title: "Depozitní multiplikace",
    description:
      "Počáteční impuls se v bankovním systému násobí. Čím nižší je PMR, tím větší je maximální změna depozit.",
    checklist: [
      "Napiš ΔD = (1/PMR) × ΔR.",
      "Rozliš vklady, rezervy a úvěry.",
      "Ukaž první tři kola a pak limit.",
      "Nezapomeň, že model ignoruje hotovostní úniky.",
    ],
    interactive: true,
  },
  {
    id: "adas",
    topicId: "ad-as",
    title: "AD–AS a reakce na šoky",
    description:
      "Poptávkový šok posouvá AD, nabídkový šok SAS. V dlouhém období se SAS přizpůsobuje a ekonomika se vrací k potenciálnímu produktu.",
    checklist: [
      "Označ osu Y a osu P.",
      "Nakresli klesající AD, rostoucí SAS a vertikální LAS.",
      "Vyznač KO a DO.",
      "U poptávkového šoku se Y a P pohybují stejným směrem.",
      "U nabídkového šoku se Y a P pohybují opačným směrem.",
    ],
    interactive: true,
  },
  {
    id: "business-cycle",
    topicId: "cyklus",
    title: "Hospodářský cyklus a output gap",
    description:
      "Skutečný produkt kolísá kolem potenciálu. Produkční mezera měří, jak daleko je ekonomika od dlouhodobě udržitelného výkonu.",
    checklist: [
      "Označ čas a reálný produkt.",
      "Nakresli potenciální produkt jako dlouhodobý trend.",
      "Vyznač fáze: dno, expanze, vrchol, recese.",
      "Output gap spočítej jako (Y − Y*) / Y* × 100.",
    ],
    interactive: true,
  },
];

export const graphById = (id: GraphId) =>
  graphs.find((graph) => graph.id === id);

export const graphsByTopic = (topicId: TopicId) =>
  graphs.filter((graph) => graph.topicId === topicId);
