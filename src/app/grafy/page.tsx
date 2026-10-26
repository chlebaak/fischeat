import type { Metadata } from "next";
import Link from "next/link";
import { graphsByTopic } from "@/content/graphs";
import { topics } from "@/content/topics";
import { GraphRenderer } from "@/components/graphs/graph-renderer";

export const metadata: Metadata = {
  title: "Grafy",
  description:
    "Interaktivní grafy a zkouškové obrázky k 1. průběžnému testu z makroekonomie.",
};

const drawingChecklist = [
  "Popiš obě osy a jejich jednotky.",
  "Nakresli všechny křivky a označ je.",
  "Vyznač počáteční a novou rovnováhu.",
  "Šipkou ukaž posun křivky, ne jen novou polohu.",
  "U AD–AS rozliš krátké a dlouhé období.",
];

export default function GrafyPage() {
  return (
    <div className="container-page">
      <header className="container-prose pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">Grafy · 1. test</p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
          Grafy pro test
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Interaktivní verze ti ukáže, co se stane při změně parametru. Přepínač
          „Zkouškový obrázek“ schová ovládání a nechá jen čistý graf, který si
          můžeš zkusit nakreslit na papír.
        </p>

        <aside className="mt-8 border-y border-line py-5">
          <p className="font-sans text-xs font-medium text-muted">
            Než začneš kreslit
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-1.5 font-sans text-sm leading-relaxed text-ink/80 sm:grid-cols-2">
            {drawingChecklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-px w-2.5 shrink-0 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </header>

      <nav
        aria-label="Témata grafů"
        className="no-print overflow-x-auto border-y border-line py-3"
      >
        <ul className="flex min-w-max items-center gap-5 font-sans text-[13px] sm:gap-8 sm:text-sm">
          {topics.map((topic) => (
            <li key={topic.id}>
              <a
                href={`#grafy-${topic.id}`}
                className="text-muted transition-colors hover:text-accent"
              >
                <span className="mr-1.5 font-mono text-[11px]">
                  {String(topic.number).padStart(2, "0")}
                </span>
                {topic.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-4xl pb-12 pt-10">
        {topics.map((topic) => {
          const topicGraphs = graphsByTopic(topic.id);
          return (
            <section
              key={topic.id}
              id={`grafy-${topic.id}`}
              className="scroll-mt-24 border-t border-line pt-8 first:border-t-0 first:pt-0 [&+&]:mt-14"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-sans text-xs font-medium text-muted">
                    Téma {String(topic.number).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-sans text-2xl font-semibold tracking-[-0.03em]">
                    {topic.shortTitle}
                  </h2>
                </div>
                <Link
                  href={`/vyklad/${topic.slug}`}
                  className="link-underline font-sans text-sm text-accent"
                >
                  Výklad →
                </Link>
              </div>

              <div className="mt-6 space-y-6">
                {topicGraphs.map((graph, index) => (
                  <GraphRenderer
                    key={graph.id}
                    id={graph.id}
                    figure={`Obr. ${topic.number}.${index + 1}`}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <aside className="mt-12 border-t border-line pt-8">
          <p className="font-sans text-sm leading-relaxed text-muted">
            Grafy nejdou naučit jen pohledem. Vezmi papír, nakresli osy a zkus
            graf znovu bez nápovědy. Pak si projdi{" "}
            <Link href="/test" className="link-underline text-accent">
              vzorový test
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
