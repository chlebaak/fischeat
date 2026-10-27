import Link from "next/link";
import { TopicList } from "@/components/topic-list";

const sections = [
  {
    href: "/vyklad",
    number: "01",
    title: "Výklad",
    text: "Pět témat od národních účtů po hospodářský cyklus. Všechno podstatné, bez balastu.",
  },
  {
    href: "/vzorce",
    number: "02",
    title: "Vzorce",
    text: "Vzorce pro test rozdělené po tématech. Proměnné a jednoduché „kdy použít“.",
  },
  {
    href: "/grafy",
    number: "03",
    title: "Grafy",
    text: "Každý graf má vlastní stránku: interaktivní ukázku, návod, jak ho nakreslit, a chyby, na které si dát pozor.",
  },
  {
    href: "/test",
    number: "04",
    title: "Vzorový test",
    text: "8 otázek a 25 bodů. Výpočty můžeš zadat, grafy si nakreslit a zkontrolovat.",
  },
];

export default function HomePage() {
  return (
    <div className="container-page">
      <section className="grid gap-10 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="max-w-3xl">
          <p className="font-sans text-sm text-muted">
            Makroekonomie 3MI 204 · 1. průběžný test
          </p>
          <h1 className="mt-4 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[4.4rem]">
            Výpisky
            <br />
            k prvnímu testu.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-[1.08rem] leading-[1.7] text-ink/80 sm:text-[1.15rem]">
            Pět témat, důležité vzorce, grafy a interaktivní vzorový test.
            Všechno na jednom místě, připravené na učení i rychlé opakování.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-sm">
            <Link
              href="/vyklad"
              className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-accent"
            >
              Začít výkladem
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/test" className="link-underline text-ink">
              Vyzkoušet vzorový test
            </Link>
          </div>
        </div>

        <aside className="hidden border-l border-line pl-8 lg:block">
          <p className="font-sans text-xs font-medium text-muted">Doporučený postup</p>
          <ol className="mt-5 space-y-5">
            {[
              ["01", "Projdi výklad", "Pochop pojmy a souvislosti."],
              ["02", "Zopakuj vzorce", "Nauč se, kdy který použít."],
              ["03", "Projdi grafy", "Nakresli je i bez nápovědy."],
              ["04", "Vyzkoušej test", "Ověř, co už umíš."],
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

      <section aria-labelledby="sekce" className="border-t border-line py-12 sm:py-16">
        <h2 id="sekce" className="font-sans text-2xl font-semibold tracking-[-0.03em]">
          Co tady najdeš
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group border-t border-line pt-4"
            >
              <span className="font-mono text-[11px] text-muted">{section.number}</span>
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

      <section aria-labelledby="temata" className="pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-12 sm:pt-16">
          <h2 id="temata" className="font-sans text-2xl font-semibold tracking-[-0.03em]">
            Pět témat
          </h2>
          <Link href="/vyklad" className="link-underline font-sans text-sm text-accent">
            Celý výklad →
          </Link>
        </div>
        <div className="mt-6">
          <TopicList />
        </div>
      </section>
    </div>
  );
}
