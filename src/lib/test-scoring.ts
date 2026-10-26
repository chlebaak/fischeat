import type {
  TestField,
  TestPart,
  TestQuestion,
  TestVersion,
  TopicId,
} from "@/content/types";

export type AnswerState = Record<
  string,
  { fields: Record<string, string>; self: boolean | null }
>;

export function parseNumericInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const normalized = trimmed
    .replace(/\u00a0/g, " ")
    .replace(/\s/g, "")
    .replace(/−/g, "-")
    .replace(/,/g, ".")
    .replace(/[^0-9.-]/g, "");

  if (!normalized || normalized === "-" || normalized === ".") return null;

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function isFieldCorrect(field: TestField, raw: string): boolean {
  const parsed = parseNumericInput(raw);
  if (parsed === null) return false;

  const tolerance = Math.max(
    Math.abs(field.answer) * field.tolerance,
    Math.abs(field.tolerance),
    0.001,
  );

  return Math.abs(parsed - field.answer) <= tolerance;
}

export function isPartCorrect(part: TestPart, answer?: AnswerState[string]): boolean {
  if (!answer) return false;

  if (part.kind === "self") {
    return answer.self === true;
  }

  if (!part.fields?.length) return false;
  return part.fields.every((field) =>
    isFieldCorrect(field, answer.fields[field.id] ?? ""),
  );
}

export function scoreQuestion(
  question: TestQuestion,
  answers: AnswerState,
): number {
  return question.parts.reduce((sum, part) => {
    return sum + (isPartCorrect(part, answers[part.id]) ? part.points : 0);
  }, 0);
}

export function scoreTest(test: TestVersion, answers: AnswerState): number {
  return test.questions.reduce(
    (sum, question) => sum + scoreQuestion(question, answers),
    0,
  );
}

export function scoreByTopic(
  test: TestVersion,
  answers: AnswerState,
): { topicId: TopicId; earned: number; total: number }[] {
  const byTopic = new Map<TopicId, { earned: number; total: number }>();

  for (const question of test.questions) {
    const current = byTopic.get(question.topicId) ?? { earned: 0, total: 0 };
    current.earned += scoreQuestion(question, answers);
    current.total += question.points;
    byTopic.set(question.topicId, current);
  }

  const order: TopicId[] = [
    "narodni-ucty",
    "model-vydaje",
    "penize",
    "ad-as",
    "cyklus",
  ];

  return order
    .filter((topicId) => byTopic.has(topicId))
    .map((topicId) => ({
      topicId,
      ...byTopic.get(topicId)!,
    }));
}

export function answeredParts(
  test: TestVersion,
  answers: AnswerState,
): { answered: number; total: number } {
  let answered = 0;
  let total = 0;

  for (const question of test.questions) {
    for (const part of question.parts) {
      total += 1;
      const answer = answers[part.id];
      if (!answer) continue;

      if (part.kind === "self") {
        if (answer.self !== null) answered += 1;
      } else if (
        part.fields?.every((field) => (answer.fields[field.id] ?? "").trim())
      ) {
        answered += 1;
      }
    }
  }

  return { answered, total };
}
