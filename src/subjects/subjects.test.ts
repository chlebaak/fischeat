import { describe, expect, it } from "vitest";
import { loadSubject } from "./registry";
import { publishedSubjectSummaries, subjectSummaries } from "./summaries";

describe("subject registry", () => {
  it("has unique subject slugs", () => {
    const slugs = subjectSummaries.map((subject) => subject.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("loads every published subject bundle", async () => {
    for (const summary of publishedSubjectSummaries) {
      const subject = await loadSubject(summary.slug);

      expect(subject, summary.slug).toBeDefined();
      expect(subject?.meta.slug).toBe(summary.slug);
      expect(subject?.meta.status).toBe("published");
    }
  });

  it("does not expose a coming-soon subject as a loaded bundle", async () => {
    const comingSoon = subjectSummaries.filter(
      (subject) => subject.status === "coming-soon",
    );

    for (const summary of comingSoon) {
      await expect(loadSubject(summary.slug)).resolves.toBeUndefined();
    }
  });
});
