"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubjectSection } from "@/subjects/types";

const labels: Record<SubjectSection, string> = {
  vyklad: "Výklad",
  vzorce: "Vzorce",
  grafy: "Grafy",
  test: "Test",
};

export function SubjectNav({
  subjectSlug,
  sections,
}: {
  subjectSlug: string;
  sections: SubjectSection[];
}) {
  const pathname = usePathname();
  const base = `/${subjectSlug}`;

  const items: { href: string; label: string; active: boolean }[] = [
    { href: base, label: "Přehled", active: pathname === base },
    ...sections.map((section) => ({
      href: `${base}/${section}`,
      label: labels[section],
      active:
        pathname === `${base}/${section}` ||
        pathname.startsWith(`${base}/${section}/`),
    })),
  ];

  return (
    <nav
      aria-label="Sekce předmětu"
      className="no-print -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
    >
      <ul className="flex min-w-max items-center gap-5 font-sans text-[13px] sm:gap-7 sm:text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                item.active
                  ? "inline-block py-1.5 font-medium text-ink underline decoration-accent decoration-2 underline-offset-[10px]"
                  : "inline-block py-1.5 text-muted transition-colors hover:text-ink"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
