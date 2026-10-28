import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-w-0 items-baseline gap-2.5"
          aria-label="fischeat — předměty"
        >
          <span className="truncate text-[17px] font-semibold tracking-[-0.03em]">
            fischeat
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            studijní materiály
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-sans text-[13px] sm:text-sm">
          <Link
            href="/"
            className="inline-block py-2 text-muted transition-colors hover:text-ink"
          >
            Předměty
          </Link>
        </nav>
      </div>
    </header>
  );
}
