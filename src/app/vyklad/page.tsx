import type { Metadata } from "next";
import { TopicList } from "@/components/topic-list";

export const metadata: Metadata = {
  title: "Výklad",
  description: "Pět témat k 1. průběžnému testu z makroekonomie.",
};

export default function VykladPage() {
  return (
    <div className="container-page">
      <header className="container-prose pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">Výklad · 5 témat</p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
          Výklad k prvnímu testu
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Projdi témata v pořadí. Každá kapitola má krátký výklad, vzorce,
          příklady a odkazy na grafy. Na konci najdeš rychlou kontrolu a odkazy
          na vzorový test.
        </p>
      </header>

      <div className="container-prose">
        <TopicList />
      </div>
    </div>
  );
}
