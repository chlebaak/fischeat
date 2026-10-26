"use client";

import { formatNumber } from "@/lib/format";

export function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = formatNumber,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-baseline justify-between gap-3 font-sans text-sm">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted">
          {format(value)}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        className="range-input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
