import type { Metadata } from "next";
import Link from "next/link";
import { formulaChapterTitle, formulasByTopic } from "@/content/formulas";
import { topics } from "@/content/topics";
import { FormulaCard } from "@/components/formula-card";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Vzorce",
  description:
    "Všechny důležité vzorce k 1. průběžnému testu z makroekonomie, rozdělené po tématech.",
};

export default function VzorcePage() {
  return (
    <div className="container-page">
      <header className="container-prose pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">Vzorce · 1. test</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
            Vzorce pro test
          </h1>
          <PrintButton />
        </div>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Všechny důležité vzorce rozdělené po tématech. U každého najdeš
          proměnné a stručné „kdy použít“. Vzorce označené „v testu“ se objevily
          ve vzorovém testu nebo jsou potřeba k jeho výpočtům.
        </p>
      </header>

      <nav
        aria-label="Témata vzorců"
        className="no-print overflow-x-auto border-y border-line py-3"
      >
        <ul className="flex min-w-max items-center gap-5 font-sans text-[13px] sm:gap-8 sm:text-sm">
          {topics.map((topic) => (
            <li key={topic.id}>
              <a
                href={`#${topic.id}`}
                className="text-muted transition-colors hover:text-accent"
              >
                <span className="mr-1.5 font-mono text-[11px]">
                  {String(topic.number).padStart(2, "0")}
                </span>
                {formulaChapterTitle[topic.id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-3xl pb-12 pt-10">
        {topics.map((topic) => {
          const topicFormulas = formulasByTopic(topic.id);
          return (
            <section
              key={topic.id}
              id={topic.id}
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

              <div className="mt-5 space-y-4">
                {topicFormulas.map((formula) => (
                  <FormulaCard key={formula.id} formulaId={formula.id} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="no-print mx-auto max-w-3xl border-t border-line py-8 font-sans text-sm leading-relaxed text-muted">
        <p>
          Tisková verze: použij tlačítko „Tisk / PDF“ nahoře. Stránka se při
          tisku zbaví navigace a zachová vzorce i tabulky.
        </p>
      </footer>
    </div>
  );
}
