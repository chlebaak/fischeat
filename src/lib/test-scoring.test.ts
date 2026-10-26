import { describe, expect, it } from "vitest";
import { sampleTest1 } from "@/content/tests/sample-test-1";
import type { AnswerState } from "./test-scoring";
import {
  answeredParts,
  isFieldCorrect,
  parseNumericInput,
  scoreByTopic,
  scoreTest,
} from "./test-scoring";

function correctAnswers(): AnswerState {
  const answers: AnswerState = {};

  for (const question of sampleTest1.questions) {
    for (const part of question.parts) {
      if (part.kind === "self") {
        answers[part.id] = { fields: {}, self: true };
      } else {
        answers[part.id] = {
          fields: Object.fromEntries(
            (part.fields ?? []).map((field) => [field.id, String(field.answer)]),
          ),
          self: null,
        };
      }
    }
  }

  return answers;
}

describe("parseNumericInput", () => {
  it("accepts Czech decimal commas, spaces and a unicode minus", () => {
    expect(parseNumericInput(" 1 234,5 ")).toBe(1234.5);
    expect(parseNumericInput("−40")).toBe(-40);
    expect(parseNumericInput("3 289,47 Kč")).toBe(3289.47);
  });

  it("rejects empty or non-numeric input", () => {
    expect(parseNumericInput("")).toBeNull();
    expect(parseNumericInput("abc")).toBeNull();
  });
});

describe("test scoring", () => {
  it("gives full points for all correct answers", () => {
    const answers = correctAnswers();
    expect(scoreTest(sampleTest1, answers)).toBe(25);
    expect(answeredParts(sampleTest1, answers)).toEqual({
      answered: 25,
      total: 25,
    });
  });

  it("accepts the rounded official values for Q1", () => {
    const answers = correctAnswers();
    answers.q1a = { fields: { alpha: "2,6" }, self: null };
    answers.q1b = { fields: { y: "3250" }, self: null };
    answers.q1c = { fields: { nx: "-255" }, self: null };
    answers.q1d = { fields: { dy: "-156" }, self: null };
    expect(scoreTest(sampleTest1, answers)).toBe(25);
  });

  it("rejects a wrong numeric answer and counts self-assessment", () => {
    const answers = correctAnswers();
    answers.q2a = { fields: { x1: "999" }, self: null };
    answers.q6a = { fields: {}, self: false };
    expect(scoreTest(sampleTest1, answers)).toBe(23);
  });

  it("keeps topic totals at 25 points", () => {
    const byTopic = scoreByTopic(sampleTest1, correctAnswers());
    expect(byTopic.reduce((sum, row) => sum + row.total, 0)).toBe(25);
    expect(byTopic.find((row) => row.topicId === "model-vydaje")?.total).toBe(10);
  });

  it("checks tolerance on a single field", () => {
    const field = { id: "x", label: "x", answer: 100, tolerance: 0.01 };
    expect(isFieldCorrect(field, "100,5")).toBe(true);
    expect(isFieldCorrect(field, "102")).toBe(false);
  });
});
