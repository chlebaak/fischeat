export type TopicId =
  | "narodni-ucty"
  | "model-vydaje"
  | "penize"
  | "ad-as"
  | "cyklus";

export type GraphId =
  | "gdp-methods"
  | "deflator-chart"
  | "consumption-savings"
  | "keynesian-cross"
  | "money-market"
  | "deposit-multiplier"
  | "adas"
  | "business-cycle";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
      compact?: boolean;
    }
  | { type: "formula"; formulaId: string }
  | {
      type: "callout";
      variant: "note" | "warning";
      title?: string;
      text: string;
    }
  | {
      type: "example";
      title: string;
      prompt: string;
      steps: { label: string; text: string }[];
      answer: string;
    }
  | { type: "graphLink"; graphId: GraphId; label?: string }
  | {
      type: "terms";
      items: { term: string; definition: string }[];
    };

export type TopicSection = {
  id: string;
  title: string;
  blocks: ContentBlock[];
};

export type Topic = {
  id: TopicId;
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  intro: string;
  takeaways: string[];
  sourceNote: string;
  sections: TopicSection[];
  formulaIds: string[];
  graphIds: GraphId[];
  testQuestionIds: string[];
};

export type Formula = {
  id: string;
  topicId: TopicId;
  name: string;
  latex: string;
  variables: { symbol: string; meaning: string }[];
  when: string;
  inTest?: boolean;
};

export type TestField = {
  id: string;
  label: string;
  answer: number;
  tolerance: number;
  unit?: string;
  placeholder?: string;
};

export type TestPart = {
  id: string;
  label: string;
  points: number;
  kind: "numeric" | "self";
  fields?: TestField[];
  solution: string[];
  selfItems?: string[];
};

export type TestSolutionGraph =
  | {
      kind: "adas";
      title?: string;
      adShock?: number;
      sasShock?: number;
      showLongRun?: boolean;
    }
  | { kind: "consumption-shifts" };

export type TestQuestion = {
  id: string;
  number: number;
  title: string;
  topicId: TopicId;
  points: number;
  prompt: string[];
  given?: { label: string; value: string }[];
  table?: { headers: string[]; rows: string[][] };
  parts: TestPart[];
  solutionIntro?: string[];
  solutionGraphs?: TestSolutionGraph[];
};

export type TestVersion = {
  id: string;
  title: string;
  subtitle: string;
  totalPoints: number;
  questions: TestQuestion[];
};
