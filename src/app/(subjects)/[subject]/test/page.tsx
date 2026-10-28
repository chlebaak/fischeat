import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubjectTestRunner } from "@/components/test/subject-test-runner";
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
    title: subject?.tests[0]?.title ?? "Vzorový test",
    description: subject
      ? `Vzorový test pro předmět ${subject.meta.shortTitle}.`
      : "Vzorový test.",
  };
}

export default async function TestPage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  const subjectPath = `/${subject.meta.slug}`;
  const defaultTest = subject.tests[0];
  const hasTest = Boolean(defaultTest);

  return (
    <div className="container-page">
      <header className="mx-auto max-w-4xl pb-8 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">
          Test · {subject.meta.shortTitle}
        </p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3.5rem]">
          {defaultTest?.title ?? "Vzorový test"}
        </h1>
        <p className="mt-4 font-sans text-sm text-muted">
          {defaultTest?.subtitle ??
            (subject.meta.stats.testPoints
              ? `${subject.meta.stats.testPoints} bodů · orientační procvičení`
              : "Orientační procvičení")}
        </p>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Nejdřív si test zkus bez nápovědy. Výpočty můžeš zadat přímo do polí,
          grafy si nakresli na papír a ohodnoť se sám. Po vyhodnocení uvidíš
          body, slabá místa i vzorové grafy.
        </p>

        <aside className="mt-8 rounded-lg bg-surface px-5 py-4 font-sans text-sm leading-relaxed text-muted">
          <p>
            <span className="font-medium text-ink">Jak to funguje: </span>
            výpočty se kontrolují s tolerancí, u grafů rozhoduješ ty. Po
            vyhodnocení se u každé části odemkne postup.
          </p>
          <p className="mt-2">
            Potřebuješ si nejdřív zopakovat látku?{" "}
            <Link href={`${subjectPath}/vzorce`} className="link-underline text-accent">
              Vzorce
            </Link>{" "}
            ·{" "}
            <Link href={`${subjectPath}/grafy`} className="link-underline text-accent">
              Grafy
            </Link>
          </p>
        </aside>
      </header>

      {hasTest ? (
        <SubjectTestRunner subject={subject.meta.slug} />
      ) : (
        <div className="mx-auto max-w-4xl pb-12">
          <p className="pt-8 font-sans text-sm text-muted">
            Pro tento předmět zatím není připravený vzorový test.
          </p>
        </div>
      )}
    </div>
  );
}
