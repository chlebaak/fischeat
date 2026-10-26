"use client";

import { useState, type ReactNode } from "react";
import { RichText } from "@/components/rich-text";

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
  const hasControls = Boolean(controls) && !readOnly;

  return (
    <figure
      id={id}
      className={`graph-card scroll-mt-24 ${compact ? "p-4 sm:p-5" : ""}`}
    >
      <figcaption>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {figure ? (
            <span className="font-mono text-[11px] text-muted">{figure}</span>
          ) : null}
          <h3 className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] sm:text-lg">
            {title}
          </h3>
        </div>
        {description && !compact ? (
          <p className="graph-caption mt-2 max-w-2xl">
            <RichText text={description} />
          </p>
        ) : null}
      </figcaption>

      <div className="graph-canvas">{children}</div>

      {hasControls && !examMode ? (
        <div className="graph-controls">{controls}</div>
      ) : null}

      {hasControls ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
          <p className="font-sans text-[11px] text-muted">
            {examMode
              ? "Ovládání je skryté. Graf zůstává v posledním nastavení."
              : "Posuň parametry a sleduj, co se změní."}
          </p>
          <button
            type="button"
            aria-pressed={examMode}
            onClick={() => setExamMode((current) => !current)}
            className="font-sans text-xs text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            {examMode ? "Zpět na interaktivní" : "Zkouškový obrázek"}
          </button>
        </div>
      ) : null}

      {note && !compact ? (
        <p className="mt-3 border-l-2 border-line pl-3 font-sans text-xs leading-relaxed text-muted">
          <RichText text={note} />
        </p>
      ) : null}

      {checklist?.length && !compact ? (
        <details className="mt-4 border-t border-line pt-3">
          <summary>Jak to nakreslit</summary>
          <ul className="mt-2 space-y-1 font-sans text-xs leading-relaxed text-muted">
            {checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-1.5 h-px w-2 shrink-0 bg-line" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {table && !compact ? (
        <details className="mt-2 border-t border-line pt-3">
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
