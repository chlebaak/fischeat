"use client";

import { createContext, useContext, type ReactNode } from "react";

type GraphDisplayConfig = {
  hideTitle: boolean;
  compact: boolean;
};

const GraphDisplayContext = createContext<GraphDisplayConfig>({
  hideTitle: false,
  compact: false,
});

export function GraphDisplayProvider({
  hideTitle = false,
  compact = false,
  children,
}: {
  hideTitle?: boolean;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <GraphDisplayContext.Provider value={{ hideTitle, compact }}>
      {children}
    </GraphDisplayContext.Provider>
  );
}

export function useGraphDisplay() {
  return useContext(GraphDisplayContext);
}
