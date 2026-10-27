import type { SubjectBundle } from "@/subjects/types";
import { formulas } from "./formulas";
import { graphs } from "./graphs";
import { makroMeta } from "./meta";
import { notation } from "./notation";
import { topics } from "./topics";
import { tests } from "./tests";

export const makroSubject: SubjectBundle = {
  meta: makroMeta,
  topics,
  formulas,
  graphs,
  tests,
  notation,
};
