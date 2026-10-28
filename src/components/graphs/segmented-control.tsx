"use client";

export function SegmentedControl<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="font-sans text-sm">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="flex w-fit border border-line-strong"
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={String(option.value)}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`px-3 py-1.5 font-sans text-xs transition-colors ${
                active
                  ? "bg-ink text-paper"
                  : "bg-paper text-muted hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
