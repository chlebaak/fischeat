import { describe, expect, it } from "vitest";
import { formulas } from "./formulas";
import { graphs } from "./graphs";
import { topics } from "./topics";
import { sampleTest1 } from "./tests/sample-test-1";

const topicIds = new Set(topics.map((topic) => topic.id));
const formulaIds = new Set(formulas.map((formula) => formula.id));
const graphIds = new Set(graphs.map((graph) => graph.id));
const questionIds = new Set(sampleTest1.questions.map((question) => question.id));

describe("content integrity", () => {
  it("has unique ids", () => {
    expect(topicIds.size).toBe(topics.length);
    expect(formulaIds.size).toBe(formulas.length);
    expect(graphIds.size).toBe(graphs.length);
    expect(questionIds.size).toBe(sampleTest1.questions.length);
  });

  it("links every topic to existing formulas, graphs and test questions", () => {
    for (const topic of topics) {
      for (const formulaId of topic.formulaIds) {
        expect(formulaIds.has(formulaId), `${topic.id} -> ${formulaId}`).toBe(true);
      }
      for (const graphId of topic.graphIds) {
        expect(graphIds.has(graphId), `${topic.id} -> ${graphId}`).toBe(true);
      }
      for (const questionId of topic.testQuestionIds) {
        expect(questionIds.has(questionId), `${topic.id} -> ${questionId}`).toBe(true);
      }
    }
  });

  it("links every graph to existing formulas and test questions", () => {
    for (const graph of graphs) {
      expect(topicIds.has(graph.topicId), `${graph.id} topic`).toBe(true);
      for (const formulaId of graph.formulaIds) {
        expect(formulaIds.has(formulaId), `${graph.id} -> ${formulaId}`).toBe(true);
      }
      for (const questionId of graph.testQuestionIds) {
        expect(questionIds.has(questionId), `${graph.id} -> ${questionId}`).toBe(true);
      }
    }
  });

  it("links every formula and test question to an existing topic", () => {
    for (const formula of formulas) {
      expect(topicIds.has(formula.topicId), `${formula.id} topic`).toBe(true);
    }
    for (const question of sampleTest1.questions) {
      expect(topicIds.has(question.topicId), `${question.id} topic`).toBe(true);
    }
  });
});
