"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CHART, axisProps, chartMargin } from "./chart-theme";
import { ChartLegend } from "./chart-legend";
import { ClientOnly } from "./client-only";
import { GraphShell } from "./graph-shell";

const data = [
  { year: "2013", nominal: 1200, real: 1000, deflator: 120 },
  { year: "2014", nominal: 1500, real: 1100, deflator: 136.36 },
  { year: "2015", nominal: 1470, real: 1400, deflator: 105 },
];

const table = {
  headers: ["Rok", "Nominální HDP", "Reálný HDP", "Deflátor"],
  rows: data.map((row) => [
    row.year,
    row.nominal.toLocaleString("cs-CZ"),
    row.real.toLocaleString("cs-CZ"),
    row.deflator.toLocaleString("cs-CZ"),
  ]),
};

export function DeflatorChart({ figure }: { figure?: string }) {
  return (
    <GraphShell
      id="deflator-chart"
      figure={figure}
      title="Nominální a reálný HDP, deflátor"
      description="Data ze vzorového testu Q2. Sloupce ukazují nominální a reálný HDP, čára vpravo deflátor. Nominální HDP roste i kvůli cenám; deflátor ukazuje, jak velká část růstu je cenová."
      checklist={[
        "Označ osu let a osu hodnoty.",
        "Rozliš sloupce nominálního a reálného HDP.",
        "Deflátor je index, ne procentní změna.",
        "Zkontroluj, že deflátor 100 znamená základní rok.",
      ]}
      table={table}
      note="Deflátor 120 znamená cenovou hladinu o 20 % vyšší než v základním roce. Rozdíl mezi nominálním a reálným HDP je právě cenový efekt."
    >
      <ChartLegend
        items={[
          { label: "nominální HDP", color: "#c7d8e4", kind: "bar" },
          { label: "reálný HDP", color: "#b9d0c5", kind: "bar" },
          { label: "deflátor", color: CHART.ink },
        ]}
      />
      <ClientOnly fallback={<div style={{ height: 320 }} />}>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <ComposedChart data={data} margin={chartMargin} barGap={4}>
              <CartesianGrid
                vertical={false}
                stroke={CHART.grid}
                strokeDasharray="2 4"
              />
              <XAxis dataKey="year" {...axisProps} />
              <YAxis
                yAxisId="left"
                {...axisProps}
                width={48}
                tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                label={{
                  value: "HDP",
                  position: "insideTopLeft",
                  fill: CHART.muted,
                  fontSize: 11,
                  offset: 8,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                {...axisProps}
                width={42}
                domain={[80, 150]}
                label={{
                  value: "deflátor",
                  position: "insideTopRight",
                  fill: CHART.muted,
                  fontSize: 11,
                  offset: 8,
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="nominal"
                name="Nominální HDP"
                fill="#dbe5ee"
                stroke="#c7d8e4"
                strokeWidth={1}
                isAnimationActive={false}
              />
              <Bar
                yAxisId="left"
                dataKey="real"
                name="Reálný HDP"
                fill="#dce9e2"
                stroke="#b9d0c5"
                strokeWidth={1}
                isAnimationActive={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="deflator"
                name="Deflátor"
                stroke={CHART.ink}
                strokeWidth={1.75}
                dot={{ r: 3, fill: CHART.ink, strokeWidth: 0 }}
                activeDot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ClientOnly>
    </GraphShell>
  );
}
