import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Formula } from "@/components/formula";
import { FormulaCard } from "@/components/formula-card";
import { PrintButton } from "@/components/print-button";
import { getSubject } from "@/subjects/registry";

type PageProps = {
  params: Promise<{ subject: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  return {
    title: "Vzorce",
    description: subject
      ? `Přehled vzorců pro předmět ${subject.meta.shortTitle}.`
      : "Přehled vzorců.",
  };
}

export default async function VzorcePage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  const subjectPath = `/${subject.meta.slug}`;

  return (
    <div className="container-page">
      <header className="mx-auto max-w-3xl pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">
          Vzorce · {subject.meta.shortTitle}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3.5rem]">
            Vzorce
          </h1>
          <PrintButton />
        </div>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Všechny důležité vzorce rozdělené po tématech. U každého najdeš
          proměnné a stručné „kdy použít“. Vzorce označené „v testu“ se objevily
          ve vzorovém testu nebo jsou potřeba k jeho výpočtům.
        </p>

        {subject.notation?.length ? (
          <details className="mt-7 rounded-lg bg-surface px-4 py-3">
            <summary>Použité symboly</summary>
            <dl className="mt-3 grid gap-x-8 gap-y-2 font-sans text-sm sm:grid-cols-2">
              {subject.notation.map((item) => (
                <div key={item.symbol} className="flex items-baseline gap-3">
                  <dt className="w-16 shrink-0 font-mono text-xs text-accent">
                    <Formula latex={item.symbol} display={false} />
                  </dt>
                  <dd className="text-muted">{item.meaning}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-sans text-xs leading-relaxed text-muted">
              Značení se v zadání může mírně lišit. Rozhoduje vždy význam veličiny,
              ne přesné písmeno.
            </p>
          </details>
        ) : null}
      </header>

      <nav
        aria-label="Témata vzorců"
        className="no-print overflow-x-auto py-3"
      >
        <ul className="flex min-w-max items-center gap-5 font-sans text-[13px] sm:gap-8 sm:text-sm">
          {subject.topics.map((topic) => (
            <li key={topic.id}>
              <a
                href={`#${topic.id}`}
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

      <div className="mx-auto max-w-3xl pb-12 pt-10">
        {subject.topics.map((topic) => {
          const topicFormulas = subject.formulas.filter(
            (formula) => formula.topicId === topic.id,
          );

          return (
            <section
              key={topic.id}
              id={topic.id}
              className="scroll-mt-24 [&+&]:mt-14"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-sans text-xs font-medium text-muted">
                    Téma {String(topic.number).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-sans text-2xl font-semibold tracking-[-0.035em]">
                    {topic.shortTitle}
                  </h2>
                </div>
                <Link
                  href={`${subjectPath}/vyklad/${topic.slug}`}
                  className="link-underline font-sans text-sm text-accent"
                >
                  Výklad →
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {topicFormulas.map((formula) => (
                  <FormulaCard key={formula.id} formula={formula} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="no-print mx-auto max-w-3xl py-8 font-sans text-sm leading-relaxed text-muted">
        <p>
          Tisková verze: použij tlačítko „Tisk / PDF“ nahoře. Stránka se při
          tisku zbaví navigace a zachová vzorce i tabulky.
        </p>
      </footer>
    </div>
  );
}
