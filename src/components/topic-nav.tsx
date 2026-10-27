import Link from "next/link";
import type { Topic } from "@/subjects/types";

export function TopicNav({
  subjectSlug,
  topics,
  activeSlug,
}: {
  subjectSlug: string;
  topics: Topic[];
  activeSlug?: string;
}) {
  return (
    <nav
      aria-label="Kapitoly výkladu"
      className="no-print -mx-5 overflow-x-auto border-y border-line px-5 md:mx-0 md:px-0"
    >
      <ul className="flex min-w-max items-center gap-5 py-3 text-[13px] sm:gap-7 sm:text-sm">
        {topics.map((topic) => {
          const active = topic.slug === activeSlug;
          return (
            <li key={topic.slug}>
              <Link
                href={`/${subjectSlug}/vyklad/${topic.slug}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "font-medium text-ink"
                    : "text-muted transition-colors hover:text-ink"
                }
              >
                <span className="mr-1.5 font-mono text-[11px] text-muted">
                  {String(topic.number).padStart(2, "0")}
                </span>
                {topic.shortTitle}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
