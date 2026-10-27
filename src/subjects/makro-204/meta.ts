import type { SubjectMeta } from "@/subjects/types";

export const makroMeta: SubjectMeta = {
  slug: "makro-204",
  title: "Makroekonomie 3MI 204",
  shortTitle: "Makro 204",
  code: "3MI 204",
  description:
    "Výpisky, vzorce, grafy a interaktivní vzorový test k 1. průběžnému testu z makroekonomie.",
  eyebrow: "Makroekonomie 3MI 204 · 1. průběžný test",
  heroTitle: "Výpisky\nk prvnímu testu.",
  heroDescription:
    "Pět témat, důležité vzorce, grafy a interaktivní vzorový test. Všechno na jednom místě, připravené na učení i rychlé opakování.",
  sourceNote:
    "Zpracováno z přednášek 1–5 a vzorového testu. PDF podklady nejsou součástí webu.",
  status: "published",
  order: 1,
  sections: ["vyklad", "vzorce", "grafy", "test"],
  stats: {
    topics: 5,
    formulas: 43,
    graphs: 8,
    testPoints: 25,
  },
};
