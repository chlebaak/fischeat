"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/vyklad", label: "Výklad" },
  { href: "/vzorce", label: "Vzorce" },
  { href: "/grafy", label: "Grafy" },
  { href: "/test", label: "Test" },
];

function isActive(pathname: string, href: string) {
  if (href === "/vyklad") {
    return pathname === "/vyklad" || pathname.startsWith("/vyklad/");
  }
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-w-0 items-baseline gap-2.5"
          aria-label="Makro 204 — domů"
        >
          <span className="truncate text-[15px] font-semibold tracking-tight">
            Makro 204
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            studijní atlas
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-[13px] sm:gap-6 sm:text-sm">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-ink underline decoration-accent decoration-2 underline-offset-[11px]"
                    : "text-muted transition-colors hover:text-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
