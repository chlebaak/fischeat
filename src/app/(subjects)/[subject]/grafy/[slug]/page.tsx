import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraphDisplayProvider } from "@/components/graphs/graph-display-context";
import { SubjectGraphRenderer } from "@/components/graphs/subject-graph-renderer";
import { RichText } from "@/components/rich-text";
import { getPublishedSubjects, getSubject } from "@/subjects/registry";
import type { GraphId } from "@/subjects/types";

type PageProps = {
  params: Promise<{ subject: string; slug: string }>;
};

export async function generateStaticParams() {
  const subjects = await getPublishedSubjects();

  return subjects.flatMap((subject) =>
    subject.graphs.map((graph) => ({
      subject: subject.meta.slug,
      slug: graph.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject: subjectSlug, slug } = await params;
  const subject = await getSubject(subjectSlug);
  const graph = subject?.graphs.find((item) => item.id === (slug as GraphId));

  if (!subject || !graph) {
    return { title: "Graf nenalezen" };
  }

  return {
    title: graph.title,
    description: graph.description,
  };
}

export default async function GraphPage({ params }: PageProps) {
  const { subject: subjectSlug, slug } = await params;
  const subject = await getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  const graph = subject.graphs.find((item) => item.id === (slug as GraphId));

  if (!graph) {
    notFound();
  }

  const topic = subject.topics.find((item) => item.id === graph.topicId);
  const topicGraphs = subject.graphs.filter(
    (item) => item.topicId === graph.topicId,
  );
  const figureIndex = topicGraphs.findIndex((item) => item.id === graph.id) + 1;
  const graphIndex = subject.graphs.findIndex((item) => item.id === graph.id);
  const previous = graphIndex > 0 ? subject.graphs[graphIndex - 1] : null;
  const next =
    graphIndex < subject.graphs.length - 1
      ? subject.graphs[graphIndex + 1]
      : null;
  const relatedFormulas = graph.formulaIds.flatMap((id) => {
    const formula = subject.formulas.find((item) => item.id === id);
    return formula ? [formula] : [];
  });
  const subjectPath = `/${subject.meta.slug}`;

  return (
    <div className="container-page">
      <div className="mx-auto max-w-4xl pb-12 pt-8 sm:pt-12">
        <nav
          aria-label="Drobečková navigace"
          className="no-print flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-muted"
        >
          <Link href={`${subjectPath}/grafy`} className="link-underline hover:text-accent">
            Grafy
          </Link>
          <span aria-hidden="true">/</span>
          {topic ? (
            <Link
              href={`${subjectPath}/vyklad/${topic.slug}`}
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
          <h1 className="mt-2 text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3.2rem]">
            {graph.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted">
            {graph.testQuestionIds.length ? (
              <span>
                V testu:{" "}
                {graph.testQuestionIds.map((id, index) => (
                  <span key={id}>
                    {index > 0 ? ", " : ""}
                    <Link
                      href={`${subjectPath}/test#${id}`}
                      className="link-underline text-accent"
                    >
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
            <SubjectGraphRenderer
              subject={subject.meta.slug}
              id={graph.id}
              figure={`Obr. ${topic?.number ?? 0}.${figureIndex}`}
            />
          </GraphDisplayProvider>
        </div>

        <section className="mt-10">
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

        <section className="mt-10">
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

        <section className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-sans text-xs font-medium text-muted">
              Související vzorce
            </p>
            <ul className="mt-2 space-y-1.5 font-sans text-sm">
              {relatedFormulas.map((formula) => (
                <li key={formula.id}>
                  <Link
                    href={`${subjectPath}/vzorce#${formula.id}`}
                    className="link-underline text-accent"
                  >
                    {formula.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${subjectPath}/vzorce`}
                  className="link-underline text-ink"
                >
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
                    href={`${subjectPath}/vyklad/${topic.slug}`}
                    className="link-underline text-accent"
                  >
                    Výklad: {topic.shortTitle} →
                  </Link>
                </li>
              ) : null}
              {graph.testQuestionIds.length ? (
                <li>
                  <Link
                    href={`${subjectPath}/test`}
                    className="link-underline text-accent"
                  >
                    Vzorový test k procvičení →
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </section>

        <nav
          aria-label="Další graf"
          className="no-print mt-10 grid gap-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`${subjectPath}/grafy/${previous.id}`} className="group">
              <span className="font-sans text-xs text-muted">Předchozí graf</span>
              <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
                ← {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`${subjectPath}/grafy/${next.id}`}
              className="group sm:text-right"
            >
              <span className="font-sans text-xs text-muted">Další graf</span>
              <span className="mt-1 block font-sans text-sm font-medium transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
          ) : (
            <Link href={`${subjectPath}/test`} className="group sm:text-right">
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
