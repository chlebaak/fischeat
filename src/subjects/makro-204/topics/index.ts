import type { Topic } from "@/subjects/types";
import { narodniUcty } from "./narodni-ucty";
import { modelVydaje } from "./model-vydaje";
import { penize } from "./penize";
import { adAs } from "./ad-as";
import { cyklus } from "./cyklus";

export const topics: Topic[] = [
  narodniUcty,
  modelVydaje,
  penize,
  adAs,
  cyklus,
];

export const getTopic = (slug: string) =>
  topics.find((topic) => topic.slug === slug);

export const getTopicById = (id: Topic["id"]) =>
  topics.find((topic) => topic.id === id);
