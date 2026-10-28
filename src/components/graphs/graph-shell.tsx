"use client";

import { useState, type ReactNode } from "react";
import { RichText } from "@/components/rich-text";
import { useGraphDisplay } from "./graph-display-context";

type GraphTable = {
  headers: string[];
  rows: (string | number)[][];
};

export function GraphShell({
  id,
  figure,
  title,
  description,
  children,
  controls,
  checklist,
  table,
  note,
  compact = false,
  readOnly = false,
}: {
  id?: string;
  figure?: string;
  title: string;
  description?: string;
  children: ReactNode;
  controls?: ReactNode;
  checklist?: string[];
  table?: GraphTable;
  note?: string;
  compact?: boolean;
  readOnly?: boolean;
}) {
  const [examMode, setExamMode] = useState(false);
  const { hideTitle, compact: contextCompact } = useGraphDisplay();
  const isCompact = compact || contextCompact;
  const hasControls = Boolean(controls) && !readOnly;

  return (
    <figure
      id={id}
      className={`graph-card scroll-mt-24 ${isCompact ? "p-4 sm:p-5" : ""}`}
    >
      <figcaption>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {figure ? (
              <span className="font-mono text-[11px] text-muted">{figure}</span>
            ) : null}
            <h3
              className={
                hideTitle
                  ? "sr-only"
                  : "font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] sm:text-lg"
              }
            >
              {title}
            </h3>
          </div>

          {hasControls ? (
            <button
              type="button"
              aria-pressed={examMode}
              onClick={() => setExamMode((current) => !current)}
              className="shrink-0 rounded-md border border-line-strong px-2.5 py-1.5 font-sans text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {examMode ? "Zpět na interaktivní" : "Zkouškový obrázek"}
            </button>
          ) : null}
        </div>

        {description && !isCompact ? (
          <p className="graph-caption mt-2 max-w-2xl">
            <RichText text={description} />
          </p>
        ) : null}
      </figcaption>

      <div className="graph-canvas">{children}</div>

      {hasControls ? (
        <div
          className="font-sans text-[11px] text-muted"
          aria-live="polite"
        >
          {examMode
            ? "Ovládání je skryté. Graf zůstává v posledním nastavení."
            : "Posuň parametry a sleduj, co se změní."}
        </div>
      ) : null}

      {hasControls && !examMode ? (
        <div className="graph-controls">{controls}</div>
      ) : null}

      {note && !isCompact ? (
        <p className="mt-3 border-l-2 border-line pl-3 font-sans text-xs leading-relaxed text-muted">
          <RichText text={note} />
        </p>
      ) : null}

      {checklist?.length && !isCompact ? (
        <details className="mt-4">
          <summary>Jak to nakreslit</summary>
          <ul className="mt-2 space-y-1 font-sans text-xs leading-relaxed text-muted">
            {checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-px w-2 shrink-0 bg-line"
                />
                <span><RichText text={item} /></span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {table && !isCompact ? (
        <details className="mt-2">
          <summary>Tabulka hodnot</summary>
          <div className="table-wrap mt-2">
            <table className="data-table text-xs">
              <thead>
                <tr>
                  {table.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}
    </figure>
  );
}
