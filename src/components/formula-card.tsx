import type { Formula } from "@/subjects/types";
import { Formula as FormulaMath } from "./formula";

export function FormulaCard({
  formula,
  showTestBadge = true,
}: {
  formula: Formula;
  showTestBadge?: boolean;
}) {
  return (
    <article id={formula.id} className="formula-card scroll-mt-24">
      <div className="flex items-start justify-between gap-4">
        <h3 className="formula-name">{formula.name}</h3>
        {showTestBadge && formula.inTest ? (
          <span className="shrink-0 border border-line px-1.5 py-0.5 font-sans text-[10px] font-medium leading-none text-muted">
            v testu
          </span>
        ) : null}
      </div>

      <div className="overflow-x-auto py-1">
        <FormulaMath latex={formula.latex} />
      </div>

      <dl className="variable-list mt-2 space-y-1">
        {formula.variables.map((variable) => (
          <div key={variable.symbol}>
            <dt>
              <FormulaMath latex={variable.symbol} display={false} />
            </dt>
            <dd> — {variable.meaning}</dd>
          </div>
        ))}
      </dl>

      <p className="formula-when mt-3">
        <span className="font-medium text-ink">Kdy použít: </span>
        {formula.when}
      </p>
    </article>
  );
}
