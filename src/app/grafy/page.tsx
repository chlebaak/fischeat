import type { Metadata } from "next";
import Link from "next/link";
import { graphs, graphsByTopic } from "@/content/graphs";
import { topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Grafy",
  description:
    "Přehled grafů k 1. průběžnému testu z makroekonomie. Každý graf má vlastní stránku s interaktivní ukázkou a návodem, jak ho nakreslit.",
};

const readingSteps = [
  "Přečti si, co je na ose x a co na ose y.",
  "Zjisti, které křivky se posouvají a které zůstávají.",
  "Najdi rovnováhu a až potom řeš, co se změní.",
  "Nakresli graf znovu bez nápovědy a zkontroluj popisky.",
];

export default function GrafyPage() {
  return (
    <div className="container-page">
      <header className="mx-auto max-w-3xl pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">Grafy · 1. test</p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
          Grafy pro test
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Každý graf má vlastní stránku. Nejdřív si ho osahej, pak si přečti, co
          sledovat, a nakonec si ho zkus nakreslit na papír bez nápovědy.
        </p>

        <aside className="mt-8 border-y border-line py-5">
          <p className="font-sans text-xs font-medium text-muted">
            Jak číst graf
          </p>
          <ol className="mt-3 grid gap-x-6 gap-y-2 font-sans text-sm leading-relaxed text-ink/80 sm:grid-cols-2">
            {readingSteps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </header>

      <div className="mx-auto max-w-3xl pb-12 pt-4">
        {topics.map((topic) => {
          const topicGraphs = graphsByTopic(topic.id);

          if (!topicGraphs.length) return null;

          return (
            <section
              key={topic.id}
              className="border-t border-line pt-8 [&+&]:mt-12"
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

              <div className="mt-4">
                {topicGraphs.map((graph) => (
                  <Link
                    key={graph.id}
                    href={`/grafy/${graph.id}`}
                    className="group grid gap-x-4 gap-y-2 border-t border-line py-5 sm:grid-cols-[2.5rem_1fr_1.5rem]"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(graphs.indexOf(graph) + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-sans text-[17px] font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-accent">
                        {graph.title}
                      </span>
                      <span className="mt-1 block font-sans text-sm leading-relaxed text-muted">
                        {graph.description}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[11px] text-muted">
                        <span>{graph.interactive ? "interaktivní" : "schéma"}</span>
                        {graph.testQuestionIds.length ? (
                          <span>
                            v testu:{" "}
                            {graph.testQuestionIds
                              .map((id) => id.toUpperCase())
                              .join(", ")}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                    >
                      →
                    </span>
                  </Link>
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
