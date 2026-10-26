import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          Makroekonomie 3MI 204 · 1. průběžný test
        </p>
        <p className="max-w-xl text-xs leading-relaxed">
          Zpracováno z přednášek 1–5 a vzorového testu. PDF podklady nejsou
          součástí webu.{" "}
          <Link href="/vzorce" className="link-underline">
            Vzorce
          </Link>{" "}
          ·{" "}
          <Link href="/grafy" className="link-underline">
            Grafy
          </Link>
        </p>
      </div>
    </footer>
  );
}
