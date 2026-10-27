import { comingSoonMeta } from "./coming-soon";
import { makroMeta } from "./makro-204/meta";
import type { SubjectMeta } from "./types";

export const subjectSummaries: SubjectMeta[] = [makroMeta, comingSoonMeta].sort(
  (a, b) => a.order - b.order,
);

export const publishedSubjectSummaries = subjectSummaries.filter(
  (subject) => subject.status === "published",
);
