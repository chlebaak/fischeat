"use client";

import { createContext, useContext, type ReactNode } from "react";

type GraphDisplayConfig = {
  hideTitle: boolean;
};

const GraphDisplayContext = createContext<GraphDisplayConfig>({
  hideTitle: false,
});

export function GraphDisplayProvider({
  hideTitle,
  children,
}: {
  hideTitle: boolean;
  children: ReactNode;
}) {
  return (
    <GraphDisplayContext.Provider value={{ hideTitle }}>
      {children}
    </GraphDisplayContext.Provider>
  );
}

export function useGraphDisplay() {
  return useContext(GraphDisplayContext);
}
