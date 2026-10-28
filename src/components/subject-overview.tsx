import Link from "next/link";
import type { SubjectBundle } from "@/subjects/types";
import { RichText } from "./rich-text";
import { TopicList } from "./topic-list";

function sectionCards(subject: SubjectBundle) {
  const path = `/${subject.meta.slug}`;
  const { meta } = subject;

  return [
    meta.sections.includes("vyklad")
      ? {
          href: `${path}/vyklad`,
          title: "Výklad",
          text: `Výklad rozdělený do ${subject.topics.length} témat. Pojmy, souvislosti a příklady.`,
        }
      : null,
    meta.sections.includes("vzorce")
      ? {
          href: `${path}/vzorce`,
          title: "Vzorce",
          text: `${subject.formulas.length} vzorců s proměnnými a vysvětlením, kdy je použít.`,
        }
      : null,
    meta.sections.includes("grafy")
      ? {
          href: `${path}/grafy`,
          title: "Grafy",
          text: `${subject.graphs.length} grafů s interaktivní ukázkou, návodem a častými chybami.`,
        }
      : null,
    meta.sections.includes("test")
      ? {
          href: `${path}/test`,
          title: "Vzorový test",
          text: `Procvičení na ${subject.tests[0]?.totalPoints ?? meta.stats.testPoints ?? 0} bodů. Výpočty, grafy a vyhodnocení.`,
        }
      : null,
  ].filter(
    (section): section is { href: string; title: string; text: string } =>
      Boolean(section),
  );
}

function studySteps(subject: SubjectBundle) {
  const path = `/${subject.meta.slug}`;
  const { meta } = subject;

  return [
    meta.sections.includes("vyklad")
      ? { href: `${path}/vyklad`, title: "Projdi výklad", text: "Pochop pojmy a souvislosti." }
      : null,
    meta.sections.includes("vzorce")
      ? { href: `${path}/vzorce`, title: "Zopakuj vzorce", text: "Nauč se, kdy který použít." }
      : null,
    meta.sections.includes("grafy")
      ? { href: `${path}/grafy`, title: "Projdi grafy", text: "Nakresli je i bez nápovědy." }
      : null,
    meta.sections.includes("test")
      ? { href: `${path}/test`, title: "Vyzkoušej test", text: "Ověř, co už umíš." }
      : null,
  ].filter(
    (step): step is { href: string; title: string; text: string } =>
      Boolean(step),
  );
}

export function SubjectOverview({ subject }: { subject: SubjectBundle }) {
  const { meta, topics } = subject;
  const path = `/${meta.slug}`;
  const cards = sectionCards(subject);
  const steps = studySteps(subject);
  const hasTest = meta.sections.includes("test");

  return (
    <div className="container-page">
      <section className="grid gap-10 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="max-w-3xl">
          <p className="font-sans text-sm text-muted">{meta.eyebrow}</p>
          <h1 className="mt-4 whitespace-pre-line text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[4.4rem]">
            {meta.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-[1.08rem] leading-[1.7] text-ink/80 sm:text-[1.15rem]">
            <RichText text={meta.heroDescription} />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-sm">
            {meta.sections.includes("vyklad") ? (
              <Link
                href={`${path}/vyklad`}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-accent"
              >
                Začít výkladem
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            {hasTest ? (
              <Link href={`${path}/test`} className="link-underline text-ink">
                Vyzkoušet vzorový test
              </Link>
            ) : meta.sections.includes("vzorce") ? (
              <Link href={`${path}/vzorce`} className="link-underline text-ink">
                Projít vzorce
              </Link>
            ) : null}
          </div>
        </div>

        {steps.length ? (
          <aside className="hidden pl-8 lg:block">
            <p className="font-sans text-xs font-medium text-muted">
              Doporučený postup
            </p>
            <ol className="mt-5 space-y-5">
              {steps.map((step, index) => (
                <li key={step.href} className="flex gap-3">
                  <span className="font-mono text-[11px] leading-6 text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <Link
                      href={step.href}
                      className="block font-sans text-sm font-medium transition-colors hover:text-accent"
                    >
                      {step.title}
                    </Link>
                    <span className="mt-0.5 block font-sans text-xs leading-relaxed text-muted">
                      {step.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </section>

      {cards.length ? (
        <section aria-labelledby="sekce" className="py-12 sm:py-16">
          <h2 id="sekce" className="font-sans text-2xl font-semibold tracking-[-0.035em]">
            Co tady najdeš
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((section, index) => (
              <Link
                key={section.href}
                href={section.href}
                className="group"
              >
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-sans text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {section.title}
                </span>
                <span className="mt-2 block font-sans text-sm leading-relaxed text-muted">
                  {section.text}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {topics.length ? (
        <section aria-labelledby="temata" className="pb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-12 sm:pt-16">
            <h2 id="temata" className="font-sans text-2xl font-semibold tracking-[-0.035em]">
              Témata
            </h2>
            {meta.sections.includes("vyklad") ? (
              <Link
                href={`${path}/vyklad`}
                className="link-underline font-sans text-sm text-accent"
              >
                Celý výklad →
              </Link>
            ) : null}
          </div>
          <div className="mt-6">
            <TopicList subjectSlug={meta.slug} topics={topics} />
          </div>
        </section>
      ) : null}

      {meta.sourceNote ? (
        <p className="py-8 font-sans text-xs leading-relaxed text-muted">
          {meta.sourceNote}
        </p>
      ) : null}
    </div>
  );
}
