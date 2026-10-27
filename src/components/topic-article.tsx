import Link from "next/link";
import { getFormula } from "@/content/formulas";
import { graphById } from "@/content/graphs";
import { topics } from "@/content/topics";
import type { Topic } from "@/content/types";
import { ContentBlocks } from "./content-blocks";
import { RichText } from "./rich-text";
import { TopicNav } from "./topic-nav";

export function TopicArticle({ topic }: { topic: Topic }) {
  const topicFormulas = topic.formulaIds.flatMap((id) => {
    const formula = getFormula(id);
    return formula ? [formula] : [];
  });
  const topicGraphs = topic.graphIds.flatMap((id) => {
    const graph = graphById(id);
    return graph ? [graph] : [];
  });
  const currentIndex = topics.findIndex((item) => item.slug === topic.slug);
  const previous = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const next = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <div className="container-page">
      <div className="pt-6">
        <TopicNav activeSlug={topic.slug} />
      </div>

      <header className="container-prose pt-12 sm:pt-16">
        <p className="font-sans text-sm text-muted">
          Téma {String(topic.number).padStart(2, "0")} / 05
        </p>
        <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[3.1rem]">
          {topic.title}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[1.08rem] leading-[1.7] text-ink/80">
          <RichText text={topic.intro} />
        </p>

        <div className="mt-8 border-y border-line py-5">
          <p className="font-sans text-xs font-medium text-muted">Co si odnést</p>
          <ul className="mt-3 space-y-2">
            {topic.takeaways.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-serif text-[0.98rem] leading-[1.6]"
              >
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 font-sans text-xs text-muted">
          <p>{topic.sourceNote}</p>
          {topic.testQuestionIds.length ? (
            <p>
              V testu:{" "}
              {topic.testQuestionIds.map((id, index) => (
                <span key={id}>
                  {index > 0 ? ", " : ""}
                  <Link href={`/test#${id}`} className="link-underline text-accent">
                    {id.toUpperCase()}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
        </div>

        {topic.sections.length > 1 ? (
          <details className="mt-6 border-y border-line py-3">
            <summary>Obsah kapitoly</summary>
            <ol className="mt-3 grid gap-x-6 gap-y-1 font-sans text-sm sm:grid-cols-2">
              {topic.sections.map((section, index) => (
                <li key={section.id} className="flex gap-2">
                  <span className="font-mono text-[11px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        ) : null}
      </header>

      <article className="container-prose prose-makro pb-10 pt-4">
        {topic.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="mt-14 border-t border-line pt-6 font-sans text-[1.65rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[1.85rem]">
              {section.title}
            </h2>
            <ContentBlocks blocks={section.blocks} />
          </section>
        ))}
      </article>

      <aside className="container-prose no-print border-t border-line py-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-sans text-xs font-medium text-muted">Vzorce k tématu</p>
            <ul className="mt-2 space-y-1.5 font-sans text-sm">
              {topicFormulas.slice(0, 6).map((formula) => (
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
            <p className="font-sans text-xs font-medium text-muted">Grafy k tématu</p>
            <ul className="mt-2 space-y-1.5 font-sans text-sm">
              {topicGraphs.map((graph) => (
                <li key={graph.id}>
                  <Link
                    href={`/grafy/${graph.id}`}
                    className="link-underline text-accent"
                  >
                    {graph.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/grafy" className="link-underline text-ink">
                  Všechny grafy →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <nav
        aria-label="Další kapitola"
        className="no-print container-prose grid gap-4 border-t border-line py-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/vyklad/${previous.slug}`} className="group">
            <span className="font-sans text-xs text-muted">Předchozí</span>
            <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
              ← {previous.shortTitle}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/vyklad/${next.slug}`} className="group sm:text-right">
            <span className="font-sans text-xs text-muted">Další</span>
            <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
              {next.shortTitle} →
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
  );
}
