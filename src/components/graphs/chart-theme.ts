export const CHART = {
  ink: "#121417",
  muted: "#6e7378",
  grid: "#eceee9",
  axis: "#c9ccc8",
  accent: "#24527a",
  secondary: "#3f6b57",
  guide: "#aeb4b0",
  zero: "#d8dbd6",
  paper: "#ffffff",
} as const;

export const axisProps = {
  stroke: CHART.axis,
  tick: { fill: CHART.muted, fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: CHART.axis },
  tickMargin: 8,
} as const;

export const chartMargin = {
  top: 12,
  right: 22,
  bottom: 26,
  left: 16,
} as const;
