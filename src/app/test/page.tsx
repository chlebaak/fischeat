import type { Metadata } from "next";
import Link from "next/link";
import { TestRunner } from "@/components/test/test-runner";

export const metadata: Metadata = {
  title: "Vzorový test 1",
  description:
    "Interaktivní vzorový test k 1. průběžnému testu z makroekonomie. 8 otázek, 25 bodů, řešení krok za krokem.",
};

export default function TestPage() {
  return (
    <div className="container-page">
      <header className="mx-auto max-w-4xl pb-8 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">Test · 1. průběžný test</p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
          Vzorový test 1
        </h1>
        <p className="mt-4 font-sans text-sm text-muted">
          8 otázek · 25 bodů · orientační procvičení
        </p>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Nejdřív si test zkus bez nápovědy. Výpočty můžeš zadat přímo do polí,
          grafy si nakresli na papír a ohodnoť se sám. Po vyhodnocení uvidíš
          body, slabá místa i vzorové grafy.
        </p>

        <aside className="mt-8 border-y border-line py-4 font-sans text-sm leading-relaxed text-muted">
          <p>
            <span className="font-medium text-ink">Jak to funguje: </span>
            výpočty se kontrolují s tolerancí, u grafů rozhoduješ ty. Po
            vyhodnocení se u každé části odemkne postup. U Q1 najdeš přesné i
            zaokrouhlené hodnoty, protože oficiální řešení používá α ≈ 2,6.
          </p>
          <p className="mt-2">
            Potřebuješ si nejdřív zopakovat látku?{" "}
            <Link href="/vzorce" className="link-underline text-accent">
              Vzorce
            </Link>{" "}
            ·{" "}
            <Link href="/grafy" className="link-underline text-accent">
              Grafy
            </Link>
          </p>
        </aside>
      </header>

      <TestRunner />
    </div>
  );
}
