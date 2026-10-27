import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          <span className="font-medium text-ink">fischeat</span> · studijní
          materiály VŠE FIS
        </p>
        <p className="max-w-xl text-xs leading-relaxed">
          Materiály pro obor Aplikovaná informatika. Jedno místo pro výpisky,
          vzorce, grafy a procvičování.{" "}
          <Link href="/" className="link-underline">
            Předměty
          </Link>
        </p>
      </div>
    </footer>
  );
}
