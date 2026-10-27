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
import { formatDecimal, formatNumber } from "@/lib/format";
import { CHART, axisProps, chartMargin } from "@/components/graphs/chart-theme";
import { ChartLegend } from "@/components/graphs/chart-legend";
import { ClientOnly } from "@/components/graphs/client-only";
import { ControlSlider } from "@/components/graphs/control-slider";
import { GraphShell } from "@/components/graphs/graph-shell";
import { useReducedMotion } from "@/components/graphs/use-reduced-motion";

export function ConsumptionSavingsGraph({ figure }: { figure?: string }) {
  const [ca, setCa] = useState(100);
  const [c, setC] = useState(0.8);
  const reduced = useReducedMotion();
  const s = 1 - c;

  const data = useMemo(() => {
    return Array.from({ length: 41 }, (_, index) => {
      const yd = index * 50;
      return {
        yd,
        consumption: ca + c * yd,
        savings: -ca + s * yd,
        reference: yd,
      };
    });
  }, [ca, c, s]);

  const zeroSavings = s > 0 ? ca / s : null;

  const table = {
    headers: ["YD", "C", "S"],
    rows: [0, 500, 1000, 1500, 2000].map((yd) => [
      formatNumber(yd),
      formatNumber(ca + c * yd),
      formatNumber(-ca + s * yd),
    ]),
  };

  return (
    <GraphShell
      id="consumption-savings"
      figure={figure}
      title="Spotřební a úsporová funkce"
      description="Změna c mění sklon, změna autonomní spotřeby posouvá křivku. Přesně tento rozdíl řeší Q3 a Q6."
      checklist={[
        "Označ osy YD a C, respektive YD a S.",
        "Vyznač autonomní spotřebu $C_A$ jako průsečík s osou $C$.",
        "Spoj C a S vztahem c + s = 1.",
        "U posunu kresli rovnoběžku, u změny sklonu změň sklon.",
      ]}
      table={table}
      note="Změna c mění sklon. Změna autonomní spotřeby posouvá celou křivku rovnoběžně. V grafu úspor je autonomní část záporná."
      controls={
        <>
          <ControlSlider
            label="Autonomní spotřeba"
            value={ca}
            min={0}
            max={300}
            step={10}
            onChange={setCa}
          />
          <ControlSlider
            label="Mezní sklon ke spotřebě c"
            value={c}
            min={0.5}
            max={0.95}
            step={0.01}
            onChange={setC}
            format={(value) => formatDecimal(value, 2)}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-muted">
            <span>s = 1 − c = {formatDecimal(s, 2)}</span>
            <span>APC při YD = 1000: {formatDecimal((ca + c * 1000) / 1000, 3)}</span>
          </div>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-1 font-sans text-xs font-semibold">Spotřeba</p>
          <ChartLegend
            items={[
              { label: "spotřeba C", color: CHART.accent },
              { label: "přímka 45°", color: CHART.guide, dashed: true },
            ]}
          />
          <ClientOnly fallback={<div style={{ height: 240 }} />}>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={chartMargin}>
                  <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
                  <XAxis
                    dataKey="yd"
                    {...axisProps}
                    ticks={[0, 500, 1000, 1500, 2000]}
                    tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                    label={{
                      value: "YD",
                      position: "insideBottomRight",
                      offset: -8,
                      fill: CHART.muted,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    {...axisProps}
                    width={48}
                    tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                    label={{
                      value: "C",
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
                    dataKey="consumption"
                    stroke={CHART.accent}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={!reduced}
                    animationDuration={220}
                  />
                  <ReferenceDot
                    x={0}
                    y={ca}
                    r={3.5}
                    fill={CHART.ink}
                    stroke="#fff"
                    strokeWidth={1.5}
                    label={{
                      value: "C_A",
                      position: "right",
                      fill: CHART.ink,
                      fontSize: 11,
                    }}
                  />
                  <ReferenceLine y={ca} stroke={CHART.guide} strokeDasharray="3 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ClientOnly>
        </div>

        <div>
          <p className="mb-1 font-sans text-xs font-semibold">Úspory</p>
          <ChartLegend
            items={[
              { label: "úspory S", color: CHART.secondary },
              { label: "nulová úspora", color: CHART.guide, dashed: true },
            ]}
          />
          <ClientOnly fallback={<div style={{ height: 240 }} />}>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={chartMargin}>
                  <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
                  <XAxis
                    dataKey="yd"
                    {...axisProps}
                    ticks={[0, 500, 1000, 1500, 2000]}
                    tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                    label={{
                      value: "YD",
                      position: "insideBottomRight",
                      offset: -8,
                      fill: CHART.muted,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    {...axisProps}
                    width={48}
                    tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                    label={{
                      value: "S",
                      position: "insideTopLeft",
                      offset: 8,
                      fill: CHART.muted,
                      fontSize: 11,
                    }}
                  />
                  <ReferenceLine y={0} stroke={CHART.zero} />
                  <Line
                    type="linear"
                    dataKey="savings"
                    stroke={CHART.secondary}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={!reduced}
                    animationDuration={220}
                  />
                  <ReferenceDot
                    x={0}
                    y={-ca}
                    r={3.5}
                    fill={CHART.ink}
                    stroke="#fff"
                    strokeWidth={1.5}
                    label={{
                      value: "−S_A",
                      position: "right",
                      fill: CHART.ink,
                      fontSize: 11,
                    }}
                  />
                  {zeroSavings !== null && zeroSavings <= 2000 ? (
                    <ReferenceDot
                      x={zeroSavings}
                      y={0}
                      r={3.5}
                      fill={CHART.secondary}
                      stroke="#fff"
                      strokeWidth={1.5}
                      label={{
                        value: "S = 0",
                        position: "top",
                        fill: CHART.secondary,
                        fontSize: 11,
                      }}
                    />
                  ) : null}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ClientOnly>
        </div>
      </div>
    </GraphShell>
  );
}
