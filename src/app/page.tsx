import type { Metadata } from "next";
import Link from "next/link";
import { subjectSummaries } from "@/subjects/summaries";

export const metadata: Metadata = {
  title: { absolute: "fischeat — studijní materiály" },
  description:
    "Studijní materiály z VŠE FIS pro předměty oboru Aplikovaná informatika. Výpisky, vzorce, grafy a procvičování na jednom místě.",
};

export default function HomePage() {
  return (
    <div className="container-page">
      <section className="grid gap-10 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="max-w-3xl">
          <p className="font-sans text-sm text-muted">
            fischeat · VŠE FIS
          </p>
          <h1 className="mt-4 text-[3rem] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[4.8rem]">
            Uč se
            <br />
            bez chaosu.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-[1.1rem] leading-[1.7] text-ink/80 sm:text-[1.2rem]">
            Studijní materiály z VŠE FIS pro předměty oboru Aplikovaná
            informatika. Výpisky, vzorce, grafy a procvičování na jednom místě.
          </p>
        </div>

        <aside className="hidden border-l border-line pl-8 lg:block">
          <p className="font-sans text-xs font-medium text-muted">Jak to funguje</p>
          <ol className="mt-5 space-y-5">
            {[
              ["01", "Vyber předmět", "Každý má vlastní výklad, vzorce i test."],
              ["02", "Projdi látku", "Výklad, grafy a vzorce drží pohromadě."],
              ["03", "Otestuj se", "Vzorový test ukáže, co ještě doladit."],
            ].map(([number, title, text]) => (
              <li key={number} className="flex gap-3">
                <span className="font-mono text-[11px] leading-6 text-muted">
                  {number}
                </span>
                <span>
                  <span className="block font-sans text-sm font-medium">{title}</span>
                  <span className="mt-0.5 block font-sans text-xs leading-relaxed text-muted">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section aria-labelledby="predmety" className="border-t border-line py-12 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="predmety" className="font-sans text-2xl font-semibold tracking-[-0.03em]">
            Předměty
          </h2>
          <p className="font-sans text-xs text-muted">
            Předměty oboru Aplikovaná informatika na VŠE FIS.
          </p>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {subjectSummaries.map((subject) =>
            subject.status === "published" ? (
              <Link
                key={subject.slug}
                href={`/${subject.slug}`}
                className="group border-t border-line pt-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] text-muted">
                    {subject.code}
                  </span>
                  <span className="font-sans text-xs text-muted transition-colors group-hover:text-accent">
                    Otevřít →
                  </span>
                </div>
                <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent">
                  {subject.shortTitle}
                </h3>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-muted">
                  {subject.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[11px] text-muted">
                  <span>{subject.stats.topics} témat</span>
                  <span>{subject.stats.graphs} grafů</span>
                  {subject.stats.testPoints ? (
                    <span>{subject.stats.testPoints} bodů v testu</span>
                  ) : null}
                </div>
              </Link>
            ) : (
              <div
                key={subject.slug}
                aria-disabled="true"
                className="border-t border-line pt-5 opacity-60"
              >
                <span className="font-sans text-[11px] font-medium text-muted">
                  Připravujeme
                </span>
                <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em]">
                  {subject.title}
                </h3>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-muted">
                  {subject.description}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="border-t border-line py-10">
        <p className="max-w-2xl font-serif text-[1.02rem] leading-[1.75] text-ink/80">
          fischeat je místo pro výpisky, které dávají smysl. Materiály z VŠE FIS
          pro obor Aplikovaná informatika. Žádné hledání materiálů po discích a
          chaotických PDF. Vybereš předmět a jdeš rovnou na věc.
        </p>
      </section>
    </div>
  );
}
