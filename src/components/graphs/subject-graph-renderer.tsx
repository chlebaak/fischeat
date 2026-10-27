"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { GraphId } from "@/subjects/types";

type SubjectGraphProps = {
  id: GraphId;
  figure?: string;
};

const renderers: Record<string, ComponentType<SubjectGraphProps>> = {
  "makro-204": dynamic(
    () =>
      import("@/subjects/makro-204/graphs/graph-renderer").then(
        (module) => module.GraphRenderer,
      ),
    {
      loading: () => (
        <div
          className="graph-canvas flex items-center justify-center border border-line bg-white font-sans text-xs text-muted"
          style={{ minHeight: 320 }}
        >
          Načítám graf…
        </div>
      ),
    },
  ),
};

export function SubjectGraphRenderer({
  subject,
  id,
  figure,
}: {
  subject: string;
  id: GraphId;
  figure?: string;
}) {
  const Renderer = renderers[subject];

  if (!Renderer) {
    return (
      <p className="border border-line bg-white p-5 font-sans text-sm text-muted">
        Graf pro tento předmět zatím není k dispozici.
      </p>
    );
  }

  return <Renderer id={id} figure={figure} />;
}
