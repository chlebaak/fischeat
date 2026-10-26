"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "@/lib/format";
import { CHART, axisProps, chartMargin } from "./chart-theme";
import { ChartLegend } from "./chart-legend";
import { ClientOnly } from "./client-only";
import { ControlSlider } from "./control-slider";
import { GraphShell } from "./graph-shell";
import { SegmentedControl } from "./segmented-control";
import { useReducedMotion } from "./use-reduced-motion";

type Sector = 2 | 3 | 4;

const FIXED = {
  ca: 300,
  investment: 600,
  transfers: 120,
  autonomousTaxes: 170,
  exports: 410,
  autonomousImports: 340,
};

export function KeynesianCrossGraph({ figure }: { figure?: string }) {
  const [sector, setSector] = useState<Sector>(4);
  const [c, setC] = useState(0.8);
  const [g, setG] = useState(320);
  const [t, setT] = useState(0.1);
  const [m, setM] = useState(0.1);
  const reduced = useReducedMotion();

  const model = useMemo(() => {
    let autonomous = FIXED.ca + FIXED.investment;
    let slope = c;

    if (sector >= 3) {
      autonomous += g + c * FIXED.transfers - c * FIXED.autonomousTaxes;
      slope = c * (1 - t);
    }

    if (sector === 4) {
      autonomous += FIXED.exports - FIXED.autonomousImports;
      slope = c * (1 - t) - m;
    }

    const equilibrium = slope < 1 ? autonomous / (1 - slope) : Number.POSITIVE_INFINITY;
    const xMax = Math.min(
      16000,
      Math.max(
        5000,
        Math.ceil(
          (Math.min(Number.isFinite(equilibrium) ? equilibrium : 5000, 16000) *
            1.1) /
            1000,
        ) * 1000,
      ),
    );

    const data = Array.from({ length: 61 }, (_, index) => {
      const y = (index / 60) * xMax;
      return {
        y,
        expenditure: autonomous + slope * y,
        reference: y,
      };
    });

    return { autonomous, slope, equilibrium, xMax, data };
  }, [c, g, m, sector, t]);

  const equilibriumVisible =
    Number.isFinite(model.equilibrium) && model.equilibrium <= model.xMax;

  const table = {
    headers: ["Y", "plánované výdaje AE", "45° linie"],
    rows: [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const y = model.xMax * ratio;
      return [
        formatNumber(y),
        formatNumber(model.autonomous + model.slope * y),
        formatNumber(y),
      ];
    }),
  };

  return (
    <GraphShell
      id="keynesian-cross"
      figure={figure}
      title="Keynesiánský kříž"
      description="Přímka 45° představuje všechny body, kde se produkt rovná výdajům. Rovnováha je tam, kde se protne s křivkou plánovaných výdajů."
      checklist={[
        "Označ osu Y a osu AE.",
        "Nakresli přímku 45°.",
        "Nakresli AE = A + c′Y.",
        "Vyznač rovnováhu a nezapomeň na posun versus změnu sklonu.",
      ]}
      table={table}
      note="Posun křivky AE způsobí změna autonomních výdajů. Změnu sklonu způsobí c, t nebo m. Rovnováha je v průsečíku AE a 45° linie."
      controls={
        <>
          <SegmentedControl<Sector>
            label="Model"
            value={sector}
            onChange={setSector}
            options={[
              { value: 2, label: "2 sektory" },
              { value: 3, label: "3 sektory" },
              { value: 4, label: "4 sektory" },
            ]}
          />
          <ControlSlider
            label="Mezní sklon ke spotřebě c"
            value={c}
            min={0.5}
            max={0.95}
            step={0.01}
            onChange={setC}
            format={(value) => value.toFixed(2)}
          />
          {sector >= 3 ? (
            <ControlSlider
              label="Vládní nákupy G"
              value={g}
              min={0}
              max={600}
              step={10}
              onChange={setG}
            />
          ) : null}
          {sector >= 3 ? (
            <ControlSlider
              label="Sazba důchodové daně t"
              value={t}
              min={0}
              max={0.3}
              step={0.01}
              onChange={setT}
              format={(value) => value.toFixed(2)}
            />
          ) : null}
          {sector === 4 ? (
            <ControlSlider
              label="Mezní sklon k importu m"
              value={m}
              min={0}
              max={0.3}
              step={0.01}
              onChange={setM}
              format={(value) => value.toFixed(2)}
            />
          ) : null}
          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 font-sans text-xs text-muted">
            <span>Autonomní výdaje A = {formatNumber(model.autonomous)}</span>
            <span>sklon AE = {model.slope.toFixed(2)}</span>
            <span className="text-ink">
              Rovnováha Y ={" "}
              {Number.isFinite(model.equilibrium)
                ? formatNumber(model.equilibrium)
                : "—"}
            </span>
            <span>
              Multiplikátor ={" "}
              {model.slope < 1 ? formatNumber(1 / (1 - model.slope)) : "—"}
            </span>
          </div>
        </>
      }
    >
      <ChartLegend
        items={[
          { label: "plánované výdaje AE", color: CHART.accent },
          { label: "45° linie", color: CHART.guide, dashed: true },
        ]}
      />
      <ClientOnly fallback={<div style={{ height: 340 }} />}>
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer>
            <LineChart data={model.data} margin={chartMargin}>
              <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
              <XAxis
                dataKey="y"
                type="number"
                domain={[0, model.xMax]}
                {...axisProps}
                tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                label={{
                  value: "Y",
                  position: "insideBottomRight",
                  offset: -8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <YAxis
                {...axisProps}
                width={52}
                domain={[0, model.xMax]}
                tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                label={{
                  value: "AE",
                  position: "insideTopLeft",
                  offset: 8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <Line
                type="linear"
                dataKey="reference"
                stroke={CHART.guide}
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              <Line
                type="linear"
                dataKey="expenditure"
                stroke={CHART.accent}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              {equilibriumVisible ? (
                <>
                  <ReferenceLine
                    x={model.equilibrium}
                    stroke={CHART.guide}
                    strokeDasharray="3 4"
                  />
                  <ReferenceLine
                    y={model.equilibrium}
                    stroke={CHART.guide}
                    strokeDasharray="3 4"
                  />
                  <ReferenceDot
                    x={model.equilibrium}
                    y={model.equilibrium}
                    r={4}
                    fill={CHART.ink}
                    stroke="#fff"
                    strokeWidth={1.5}
                    label={{
                      value: "E",
                      position: "top",
                      fill: CHART.ink,
                      fontSize: 11,
                    }}
                  />
                </>
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ClientOnly>
    </GraphShell>
  );
}
