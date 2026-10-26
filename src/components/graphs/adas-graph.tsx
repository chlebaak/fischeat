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
import { useReducedMotion } from "./use-reduced-motion";

const POTENTIAL = 3000;

function adCurve(y: number, shock: number) {
  return 200 + shock - 0.02 * y;
}

function sasCurve(y: number, shock: number) {
  return 20 + shock + 0.04 * y;
}

function srEquilibrium(adShock: number, sasShock: number) {
  const y = POTENTIAL + (adShock - sasShock) / 0.06;
  return { y, p: adCurve(y, adShock) };
}

function lrPrice(adShock: number) {
  return adCurve(POTENTIAL, adShock);
}

export function AdAsGraph({
  figure,
  readOnly = false,
  compact = false,
  initialAdShock = 0,
  initialSasShock = 0,
  initialShowLongRun = false,
  titleOverride,
}: {
  figure?: string;
  readOnly?: boolean;
  compact?: boolean;
  initialAdShock?: number;
  initialSasShock?: number;
  initialShowLongRun?: boolean;
  titleOverride?: string;
}) {
  const [adShock, setAdShock] = useState(initialAdShock);
  const [sasShock, setSasShock] = useState(initialSasShock);
  const [showLongRun, setShowLongRun] = useState(initialShowLongRun);
  const reduced = useReducedMotion();

  const model = useMemo(() => {
    const sr = srEquilibrium(adShock, sasShock);
    const lrP = lrPrice(adShock);
    const sasLrIntercept = lrP - 0.04 * POTENTIAL;
    const gap = ((sr.y - POTENTIAL) / POTENTIAL) * 100;
    const hasShock = adShock !== 0 || sasShock !== 0;

    const data = Array.from({ length: 101 }, (_, index) => {
      const y = (index / 100) * 5000;
      return {
        y,
        ad: adCurve(y, adShock),
        sas: sasCurve(y, sasShock),
        adBase: adCurve(y, 0),
        sasBase: sasCurve(y, 0),
        sasLr: sasLrIntercept + 0.04 * y,
      };
    });

    return { sr, lrP, gap, hasShock, data };
  }, [adShock, sasShock]);

  const reset = () => {
    setAdShock(0);
    setSasShock(0);
    setShowLongRun(false);
  };

  const table = {
    headers: ["Velicina", "Krátké období", "Dlouhé období"],
    rows: [
      ["Produkt Y", formatNumber(model.sr.y), formatNumber(POTENTIAL)],
      ["Cenová hladina P", formatNumber(model.sr.p), formatNumber(model.lrP)],
      ["Produkční mezera", `${model.gap.toFixed(1)} %`, "0 %"],
    ],
  };

  return (
    <GraphShell
      id={compact ? undefined : "adas"}
      figure={figure}
      title={titleOverride ?? "AD–AS a reakce na šoky"}
      description="Poptávkový šok posouvá AD, nabídkový šok SAS. V dlouhém období se SAS přizpůsobuje a ekonomika se vrací k potenciálnímu produktu."
      checklist={[
        "Označ osu Y a osu P.",
        "Nakresli klesající AD, rostoucí SAS a vertikální LAS.",
        "Vyznač KO a DO.",
        "U poptávkového šoku se Y a P pohybují stejným směrem.",
        "U nabídkového šoku se Y a P pohybují opačným směrem.",
      ]}
      table={table}
      note="U dočasného nabídkového šoku se SAS v dlouhém období vrací zpět. U trvalého šoku se může změnit i potenciální produkt, ten zde pro jednoduchost držíme fixní."
      compact={compact}
      readOnly={readOnly}
      controls={
        <>
          <ControlSlider
            label="Poptávkový šok (posun AD)"
            value={adShock}
            min={-40}
            max={40}
            step={5}
            onChange={setAdShock}
            format={(value) => (value > 0 ? `+${value}` : String(value))}
          />
          <ControlSlider
            label="Nabídkový šok (posun SAS)"
            value={sasShock}
            min={-40}
            max={40}
            step={5}
            onChange={setSasShock}
            format={(value) => (value > 0 ? `+${value}` : String(value))}
          />
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3 font-sans text-xs">
            <button
              type="button"
              onClick={() => {
                setAdShock(20);
                setSasShock(0);
              }}
              className="link-underline text-accent"
            >
              Růst exportu
            </button>
            <button
              type="button"
              onClick={() => {
                setAdShock(0);
                setSasShock(25);
              }}
              className="link-underline text-accent"
            >
              Ropný šok
            </button>
            <button
              type="button"
              onClick={() => {
                setAdShock(15);
                setSasShock(15);
              }}
              className="link-underline text-accent"
            >
              Znehodnocení měny
            </button>
            <button
              type="button"
              onClick={() => {
                setAdShock(-20);
                setSasShock(0);
              }}
              className="link-underline text-accent"
            >
              Poptávkový pokles
            </button>
            <button type="button" onClick={reset} className="link-underline text-muted">
              Reset
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3 font-sans text-xs">
            <button
              type="button"
              onClick={() => setShowLongRun((current) => !current)}
              aria-pressed={showLongRun}
              className="link-underline text-accent"
            >
              {showLongRun ? "Skrýt dlouhé období" : "Zobrazit dlouhé období"}
            </button>
            <span className="text-muted">
              KO: Y = {formatNumber(model.sr.y)}, P = {formatNumber(model.sr.p)}
            </span>
            <span className={model.gap >= 0 ? "text-accent" : "text-danger"}>
              mezera {model.gap >= 0 ? "+" : ""}
              {model.gap.toFixed(1)} %
            </span>
            {showLongRun ? (
              <span className="text-muted">
                DO: Y* = {formatNumber(POTENTIAL)}, P = {formatNumber(model.lrP)}
              </span>
            ) : null}
          </div>
        </>
      }
    >
      <ChartLegend
        items={[
          { label: "AD", color: CHART.accent },
          { label: "SAS", color: CHART.secondary },
          { label: "LAS", color: CHART.guide, dashed: true },
          ...(model.hasShock
            ? [{ label: "původní křivky", color: CHART.guide, dashed: true }]
            : []),
        ]}
      />
      <ClientOnly fallback={<div style={{ height: 360 }} />}>
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={model.data} margin={chartMargin}>
              <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
              <XAxis
                dataKey="y"
                type="number"
                domain={[0, 5000]}
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
                domain={[0, 240]}
                {...axisProps}
                width={42}
                label={{
                  value: "P",
                  position: "insideTopLeft",
                  offset: 8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <ReferenceLine
                x={POTENTIAL}
                stroke={CHART.guide}
                strokeDasharray="5 5"
                label={{
                  value: "LAS",
                  position: "top",
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              {model.hasShock ? (
                <>
                  <Line
                    type="linear"
                    dataKey="adBase"
                    stroke={CHART.guide}
                    strokeWidth={1.25}
                    strokeDasharray="3 4"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="linear"
                    dataKey="sasBase"
                    stroke={CHART.guide}
                    strokeWidth={1.25}
                    strokeDasharray="3 4"
                    dot={false}
                    isAnimationActive={false}
                  />
                </>
              ) : null}
              <Line
                type="linear"
                dataKey="ad"
                stroke={CHART.accent}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              <Line
                type="linear"
                dataKey="sas"
                stroke={CHART.secondary}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              {showLongRun ? (
                <Line
                  type="linear"
                  dataKey="sasLr"
                  stroke={CHART.secondary}
                  strokeWidth={1.25}
                  strokeDasharray="5 4"
                  dot={false}
                  isAnimationActive={!reduced}
                  animationDuration={220}
                />
              ) : null}
              {model.hasShock ? (
                <ReferenceDot
                  x={POTENTIAL}
                  y={lrPrice(0)}
                  r={3}
                  fill="#fff"
                  stroke={CHART.guide}
                  strokeWidth={1.5}
                  label={{
                    value: "E0",
                    position: "left",
                    fill: CHART.muted,
                    fontSize: 11,
                  }}
                />
              ) : null}
              <ReferenceLine x={model.sr.y} stroke={CHART.guide} strokeDasharray="3 4" />
              <ReferenceLine y={model.sr.p} stroke={CHART.guide} strokeDasharray="3 4" />
              <ReferenceDot
                x={model.sr.y}
                y={model.sr.p}
                r={4}
                fill={CHART.ink}
                stroke="#fff"
                strokeWidth={1.5}
                label={{
                  value: "E1",
                  position: "top",
                  fill: CHART.ink,
                  fontSize: 11,
                }}
              />
              {showLongRun ? (
                <>
                  <ReferenceDot
                    x={POTENTIAL}
                    y={model.lrP}
                    r={4}
                    fill={CHART.secondary}
                    stroke="#fff"
                    strokeWidth={1.5}
                    label={{
                      value: "E2",
                      position: "right",
                      fill: CHART.secondary,
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
