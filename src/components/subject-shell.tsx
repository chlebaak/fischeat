import Link from "next/link";
import type { SubjectBundle } from "@/subjects/types";
import { SubjectNav } from "./subject-nav";

export function SubjectShell({
  subject,
  children,
}: {
  subject: SubjectBundle;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-line bg-paper/60">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
          <div className="flex min-w-0 items-baseline gap-x-3 gap-y-1">
            <Link
              href="/"
              className="no-print shrink-0 font-sans text-xs text-muted transition-colors hover:text-ink"
            >
              ← Předměty
            </Link>
            <Link
              href={`/${subject.meta.slug}`}
              className="truncate font-sans text-[15px] font-semibold tracking-[-0.01em]"
            >
              {subject.meta.shortTitle}
            </Link>
            {subject.meta.code ? (
              <span className="hidden shrink-0 font-mono text-[11px] text-muted sm:inline">
                {subject.meta.code}
              </span>
            ) : null}
          </div>

          <SubjectNav
            subjectSlug={subject.meta.slug}
            sections={subject.meta.sections}
          />
        </div>
      </div>

      {children}
    </>
  );
}
