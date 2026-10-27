import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFormula } from "@/content/formulas";
import { graphById, graphs } from "@/content/graphs";
import { getTopicById } from "@/content/topics";
import type { GraphId } from "@/content/types";
import { GraphRenderer } from "@/components/graphs/graph-renderer";
import { GraphDisplayProvider } from "@/components/graphs/graph-display-context";
import { RichText } from "@/components/rich-text";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return graphs.map((graph) => ({ slug: graph.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const graph = graphById(slug as GraphId);

  if (!graph) {
    return { title: "Graf nenalezen" };
  }

  return {
    title: graph.title,
    description: graph.description,
  };
}

export default async function GraphPage({ params }: PageProps) {
  const { slug } = await params;
  const graph = graphById(slug as GraphId);

  if (!graph) {
    notFound();
  }

  const topic = getTopicById(graph.topicId);
  const topicGraphs = graphs.filter((item) => item.topicId === graph.topicId);
  const figureIndex = topicGraphs.findIndex((item) => item.id === graph.id) + 1;
  const graphIndex = graphs.findIndex((item) => item.id === graph.id);
  const previous = graphIndex > 0 ? graphs[graphIndex - 1] : null;
  const next = graphIndex < graphs.length - 1 ? graphs[graphIndex + 1] : null;
  const relatedFormulas = graph.formulaIds.flatMap((id) => {
    const formula = getFormula(id);
    return formula ? [formula] : [];
  });

  return (
    <div className="container-page">
      <div className="mx-auto max-w-4xl pb-12 pt-8 sm:pt-12">
        <nav
          aria-label="Drobečková navigace"
          className="no-print flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-muted"
        >
          <Link href="/grafy" className="link-underline hover:text-accent">
            Grafy
          </Link>
          <span aria-hidden="true">/</span>
          {topic ? (
            <Link
              href={`/vyklad/${topic.slug}`}
              className="link-underline hover:text-accent"
            >
              Téma {String(topic.number).padStart(2, "0")} · {topic.shortTitle}
            </Link>
          ) : null}
        </nav>

        <header className="pt-8">
          <p className="font-sans text-xs font-medium text-muted">
            {graph.interactive ? "Interaktivní graf" : "Schéma"}
          </p>
          <h1 className="mt-2 text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.2rem]">
            {graph.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted">
            {graph.testQuestionIds.length ? (
              <span>
                V testu:{" "}
                {graph.testQuestionIds.map((id, index) => (
                  <span key={id}>
                    {index > 0 ? ", " : ""}
                    <Link href={`/test#${id}`} className="link-underline text-accent">
                      {id.toUpperCase()}
                    </Link>
                  </span>
                ))}
              </span>
            ) : (
              <span>Mimo vzorový test</span>
            )}
          </div>
        </header>

        <div className="mt-8">
          <GraphDisplayProvider hideTitle>
            <GraphRenderer
              id={graph.id}
              figure={`Obr. ${topic?.number ?? 0}.${figureIndex}`}
            />
          </GraphDisplayProvider>
        </div>

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em]">
            Co si odnést
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-[1.02rem] leading-[1.75] text-ink/80">
            <RichText text={graph.keyIdea} />
          </p>
          <ul className="mt-4 space-y-2">
            {graph.takeaways.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-serif text-[0.98rem] leading-[1.65]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent"
                />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-sans text-xl font-semibold tracking-[-0.02em]">
            Na co si dát pozor
          </h2>
          <ul className="mt-3 grid gap-x-8 gap-y-2 font-sans text-sm leading-relaxed text-ink/80 sm:grid-cols-2">
            {graph.pitfalls.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-2.5 shrink-0 bg-danger"
                />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className="font-sans text-xs font-medium text-muted">
              Související vzorce
            </p>
            <ul className="mt-2 space-y-1.5 font-sans text-sm">
              {relatedFormulas.map((formula) => (
                <li key={formula.id}>
                  <Link
                    href={`/vzorce#${formula.id}`}
                    className="link-underline text-accent"
                  >
                    {formula.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/vzorce" className="link-underline text-ink">
                  Všechny vzorce →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-medium text-muted">Kde se to učí</p>
            <ul className="mt-2 space-y-1.5 font-sans text-sm">
              {topic ? (
                <li>
                  <Link
                    href={`/vyklad/${topic.slug}`}
                    className="link-underline text-accent"
                  >
                    Výklad: {topic.shortTitle} →
                  </Link>
                </li>
              ) : null}
              {graph.testQuestionIds.length ? (
                <li>
                  <Link href="/test" className="link-underline text-accent">
                    Vzorový test k procvičení →
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </section>

        <nav
          aria-label="Další graf"
          className="no-print mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`/grafy/${previous.id}`} className="group">
              <span className="font-sans text-xs text-muted">Předchozí graf</span>
              <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
                ← {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/grafy/${next.id}`} className="group sm:text-right">
              <span className="font-sans text-xs text-muted">Další graf</span>
              <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
          ) : (
            <Link href="/test" className="group sm:text-right">
              <span className="font-sans text-xs text-muted">Další krok</span>
              <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
                Vzorový test →
              </span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
