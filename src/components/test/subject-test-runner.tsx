"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const runners: Record<string, ComponentType> = {
  "makro-204": dynamic(
    () =>
      import("@/subjects/makro-204/test/test-runner").then(
        (module) => module.TestRunner,
      ),
    {
      loading: () => (
        <div className="container-page py-12 font-sans text-sm text-muted">
          Načítám test…
        </div>
      ),
    },
  ),
};

export function SubjectTestRunner({ subject }: { subject: string }) {
  const Runner = runners[subject];

  if (!Runner) {
    return (
      <div className="container-page py-12 font-sans text-sm text-muted">
        Test pro tento předmět zatím není k dispozici.
      </div>
    );
  }

  return <Runner />;
}
