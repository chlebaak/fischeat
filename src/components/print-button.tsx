"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 font-sans text-sm text-ink transition-colors hover:border-accent hover:text-accent"
    >
      Tisk / PDF
      <span aria-hidden="true" className="text-muted">
        ↗
      </span>
    </button>
  );
}
