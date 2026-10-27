import { cache } from "react";
import { publishedSubjectSummaries } from "./summaries";
import type { SubjectBundle } from "./types";

const loaders: Record<string, () => Promise<SubjectBundle>> = {
  "makro-204": () =>
    import("@/subjects/makro-204").then((module) => module.makroSubject),
};

export async function loadSubject(
  slug: string,
): Promise<SubjectBundle | undefined> {
  const loader = loaders[slug];
  return loader ? loader() : undefined;
}

export const getSubject = cache(loadSubject);

export async function getPublishedSubjects(): Promise<SubjectBundle[]> {
  const subjects = await Promise.all(
    publishedSubjectSummaries.map((summary) => loadSubject(summary.slug)),
  );

  return subjects.filter((subject): subject is SubjectBundle => Boolean(subject));
}
