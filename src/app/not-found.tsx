import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page">
      <div className="container-prose py-24">
        <p className="font-sans text-sm text-muted">404</p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em]">
          Tahle stránka tu není.
        </h1>
        <p className="mt-4 font-serif text-[1.05rem] leading-[1.7] text-ink/80">
          Zkontroluj adresu, nebo se vrať na začátek. Výklad, vzorce, grafy i
          test najdeš v navigaci.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 bg-ink px-4 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent"
        >
          Zpět na začátek <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
