import Link from "next/link";
import { topics } from "@/content/topics";

export function TopicList() {
  return (
    <div>
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`/vyklad/${topic.slug}`}
          className="topic-index-link group"
        >
          <span className="font-mono text-xs text-muted">
            {String(topic.number).padStart(2, "0")}
          </span>
          <span>
            <span className="block font-sans text-[17px] font-semibold leading-snug tracking-tight sm:text-lg">
              {topic.title}
            </span>
            <span className="mt-1 block max-w-2xl font-sans text-sm leading-relaxed text-muted">
              {topic.intro}
            </span>
          </span>
          <span aria-hidden="true" className="topic-arrow text-muted">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
