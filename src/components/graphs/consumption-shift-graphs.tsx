const px = (value: number) => 26 + (value / 100) * 170;
const py = (value: number) => 130 - (value / 100) * 110;

function Panel({
  title,
  description,
  base,
  changed,
}: {
  title: string;
  description: string;
  base: [number, number, number, number];
  changed: [number, number, number, number];
}) {
  return (
    <figure className="min-w-0">
      <svg
        viewBox="0 0 220 150"
        role="img"
        aria-label={`${title}: ${description}`}
        className="h-auto w-full"
      >
        <line x1="26" y1="130" x2="204" y2="130" stroke="#c9ccc8" strokeWidth="1" />
        <line x1="26" y1="130" x2="26" y2="18" stroke="#c9ccc8" strokeWidth="1" />
        <text x="201" y="144" fontSize="10" fill="#6e7378" textAnchor="end">
          YD
        </text>
        <text x="16" y="23" fontSize="10" fill="#6e7378" textAnchor="end">
          C
        </text>

        <line
          x1={px(base[0])}
          y1={py(base[1])}
          x2={px(base[2])}
          y2={py(base[3])}
          stroke="#aeb4b0"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1={px(changed[0])}
          y1={py(changed[1])}
          x2={px(changed[2])}
          y2={py(changed[3])}
          stroke="#24527a"
          strokeWidth="2"
        />

        <text
          x={px(base[2]) + 2}
          y={py(base[3]) - 5}
          fontSize="10"
          fill="#6e7378"
        >
          C
        </text>
        <text
          x={px(changed[2]) + 2}
          y={py(changed[3]) - 5}
          fontSize="10"
          fill="#24527a"
        >
          C′
        </text>
      </svg>
      <figcaption className="mt-2">
        <span className="block font-sans text-xs font-semibold">{title}</span>
        <span className="mt-0.5 block font-sans text-[11px] leading-relaxed text-muted">
          {description}
        </span>
      </figcaption>
    </figure>
  );
}

export function ConsumptionShiftGraphs() {
  return (
    <div className="border border-line p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[11px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <svg width="20" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="20" y2="3" stroke="#aeb4b0" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          původní C
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="20" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="20" y2="3" stroke="#24527a" strokeWidth="2" />
          </svg>
          nová C′
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Panel
          title="a) pokles s"
          description="c roste, sklon je strmější."
          base={[0, 40, 100, 80]}
          changed={[0, 40, 100, 95]}
        />
        <Panel
          title="b) negativní očekávání"
          description="C_A klesá, křivka se posouvá dolů."
          base={[0, 60, 100, 80]}
          changed={[0, 45, 100, 65]}
        />
        <Panel
          title="c) růst bohatství"
          description="C_A roste, křivka se posouvá nahoru."
          base={[0, 40, 100, 70]}
          changed={[0, 60, 100, 90]}
        />
      </div>
    </div>
  );
}
