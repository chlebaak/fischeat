export function ChartLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 font-sans text-[11px] text-muted">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <svg width="20" height="6" aria-hidden="true">
            <line
              x1="0"
              y1="3"
              x2="20"
              y2="3"
              stroke={item.color}
              strokeWidth="2"
              strokeDasharray={item.dashed ? "4 3" : undefined}
            />
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}
