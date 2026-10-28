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

const DEFAULTS = {
  ms: 300,
  y: 2000,
  k: 0.2,
  h: 20,
  shift: 0,
};

export function MoneyMarketGraph({ figure }: { figure?: string }) {
  const [ms, setMs] = useState(DEFAULTS.ms);
  const [y, setY] = useState(DEFAULTS.y);
  const [k, setK] = useState(DEFAULTS.k);
  const [h, setH] = useState(DEFAULTS.h);
  const [shift, setShift] = useState(DEFAULTS.shift);
  const reduced = useReducedMotion();

  const model = useMemo(() => {
    const mdIntercept = k * y + shift;
    const maxMd = Math.max(800, Math.ceil((ms + 200) / 100) * 100, mdIntercept + 200);
    const data = Array.from({ length: 81 }, (_, index) => {
      const md = (index / 80) * maxMd;
      return { md, i: (mdIntercept - md) / h };
    }).filter((point) => point.i >= 0 && point.i <= 20);

    const equilibriumI = (mdIntercept - ms) / h;

    return { data, maxMd, mdIntercept, equilibriumI };
  }, [h, k, ms, shift, y]);

  const equilibriumVisible =
    model.equilibriumI >= 0 && model.equilibriumI <= 20 && ms <= model.maxMd;

  const table = {
    headers: ["i", "MD", "MS"],
    rows: [0, 5, 10, 15].map((i) => [
      `${i} %`,
      formatNumber(model.mdIntercept - h * i),
      formatNumber(ms),
    ]),
  };

  const reset = () => {
    setMs(DEFAULTS.ms);
    setY(DEFAULTS.y);
    setK(DEFAULTS.k);
    setH(DEFAULTS.h);
    setShift(DEFAULTS.shift);
  };

  return (
    <GraphShell
      id="money-market"
      figure={figure}
      title="Trh peněz"
      description="Nabídka peněz je vertikální, poptávka po penězích klesá. Rovnováha určuje úrokovou míru a mění se při zásahu centrální banky i při růstu produktu."
      checklist={[
        "Označ osu M a osu i.",
        "Nakresli vertikální MS.",
        "Nakresli klesající MD = kY − hi.",
        "Vyznač rovnováhu a popiš, co se stane při převisu peněz.",
      ]}
      table={table}
      note="Rovnováha se dorovnává přes trh obligací. Při převisu peněz lidé kupují obligace, jejich cena roste a úroková míra klesá."
      controls={
        <>
          <ControlSlider
            label="Nabídka peněz MS"
            value={ms}
            min={100}
            max={600}
            step={10}
            onChange={setMs}
          />
          <ControlSlider
            label="Reálný produkt Y"
            value={y}
            min={1000}
            max={4000}
            step={100}
            onChange={setY}
          />
          <ControlSlider
            label="Citlivost na důchod k"
            value={k}
            min={0.1}
            max={0.3}
            step={0.01}
            onChange={setK}
            format={(value) => formatDecimal(value, 2)}
          />
          <ControlSlider
            label="Citlivost na úrok h"
            value={h}
            min={10}
            max={30}
            step={1}
            onChange={setH}
          />
          <ControlSlider
            label="Posun poptávky po penězích"
            value={shift}
            min={-200}
            max={200}
            step={20}
            onChange={setShift}
            format={(value) => (value > 0 ? `+${value}` : String(value))}
          />
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 font-sans text-xs">
            <button type="button" onClick={() => setMs(Math.min(600, ms + 50))} className="link-underline text-accent">
              CB nakoupí CP
            </button>
            <button type="button" onClick={() => setY(Math.min(4000, y + 500))} className="link-underline text-accent">
              Růst Y
            </button>
            <button type="button" onClick={() => setShift(Math.max(-200, shift - 100))} className="link-underline text-accent">
              Růst inflačních očekávání
            </button>
            <button type="button" onClick={reset} className="link-underline text-muted">
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-muted">
            <span>
              Rovnovážná i ={" "}
              {model.equilibriumI < 0
                ? "0 (pod nulou)"
                : model.equilibriumI > 20
                  ? "mimo rozsah"
                  : `${formatDecimal(model.equilibriumI, 1)} %`}
            </span>
            <span>MD při i = 0: {formatNumber(model.mdIntercept)}</span>
          </div>
        </>
      }
    >
      <ChartLegend
        items={[
          { label: "nabídka MS", color: CHART.accent },
          { label: "poptávka MD", color: CHART.secondary },
        ]}
      />
      <ClientOnly fallback={<div style={{ height: 340 }} />}>
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer>
            <LineChart data={model.data} margin={chartMargin}>
              <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
              <XAxis
                dataKey="md"
                type="number"
                domain={[0, model.maxMd]}
                {...axisProps}
                tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                label={{
                  value: "M",
                  position: "insideBottomRight",
                  offset: -8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <YAxis
                domain={[0, 20]}
                {...axisProps}
                width={42}
                tickFormatter={(value: number) => `${value} %`}
                label={{
                  value: "i",
                  position: "insideTopLeft",
                  offset: 8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <ReferenceLine
                x={ms}
                stroke={CHART.accent}
                strokeWidth={2}
                label={{
                  value: "MS",
                  position: "top",
                  fill: CHART.accent,
                  fontSize: 11,
                }}
              />
              <Line
                type="linear"
                dataKey="i"
                stroke={CHART.secondary}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              {equilibriumVisible ? (
                <>
                  <ReferenceLine
                    y={model.equilibriumI}
                    stroke={CHART.guide}
                    strokeDasharray="3 4"
                  />
                  <ReferenceDot
                    x={ms}
                    y={model.equilibriumI}
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
