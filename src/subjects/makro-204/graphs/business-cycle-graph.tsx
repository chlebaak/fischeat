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

const POTENTIAL = 100;

function cycleAt(t: number, amplitude: number, period: number) {
  const angle = (2 * Math.PI * t) / period;
  return {
    actual: POTENTIAL + amplitude * Math.sin(angle),
    angle,
  };
}

function phaseLabel(angle: number) {
  const sine = Math.sin(angle);
  const derivative = Math.cos(angle);

  if (Math.abs(sine) > 0.92) {
    return sine > 0 ? "vrchol" : "dno";
  }
  if (derivative > 0) return "expanze";
  return "recese";
}

export function BusinessCycleGraph({ figure }: { figure?: string }) {
  const [amplitude, setAmplitude] = useState(8);
  const [period, setPeriod] = useState(20);
  const [cursor, setCursor] = useState(55);
  const reduced = useReducedMotion();

  const model = useMemo(() => {
    const data = Array.from({ length: 101 }, (_, index) => {
      const t = index;
      const actual = POTENTIAL + amplitude * Math.sin((2 * Math.PI * t) / period);
      return {
        t,
        actual,
        potential: POTENTIAL,
        gap: ((actual - POTENTIAL) / POTENTIAL) * 100,
      };
    });

    const current = cycleAt(cursor, amplitude, period);
    const gap = ((current.actual - POTENTIAL) / POTENTIAL) * 100;
    const phase = phaseLabel(current.angle);

    return { data, current, gap, phase };
  }, [amplitude, cursor, period]);

  const table = {
    headers: ["t", "Y", "Y*", "mezera"],
    rows: [0, 25, 50, 75, 100].map((t) => {
      const actual = POTENTIAL + amplitude * Math.sin((2 * Math.PI * t) / period);
      return [
        String(t),
        formatNumber(actual),
        formatNumber(POTENTIAL),
        `${formatDecimal(((actual - POTENTIAL) / POTENTIAL) * 100, 1)} %`,
      ];
    }),
  };

  return (
    <GraphShell
      id="business-cycle"
      figure={figure}
      title="Hospodářský cyklus a produkční mezera"
      description="Skutečný produkt kolísá kolem potenciálu. Produkční mezera měří, jak daleko je ekonomika od dlouhodobě udržitelného výkonu."
      checklist={[
        "Označ čas a reálný produkt.",
        "Nakresli potenciální produkt jako dlouhodobý trend.",
        "Vyznač fáze: dno, expanze, vrchol, recese.",
        "Produkční mezeru spočítej jako $(Y - Y^*) / Y^* \\times 100$.",
      ]}
      table={table}
      note="Kladná mezera znamená, že ekonomika je nad potenciálem a vznikají inflační tlaky. Záporná mezera znamená nevyužité kapacity."
      controls={
        <>
          <ControlSlider
            label="Amplituda cyklu"
            value={amplitude}
            min={0}
            max={12}
            step={1}
            onChange={setAmplitude}
            suffix=" %"
          />
          <ControlSlider
            label="Délka cyklu"
            value={period}
            min={12}
            max={40}
            step={1}
            onChange={setPeriod}
            suffix=" čtvrtletí"
          />
          <ControlSlider
            label="Pozice v čase"
            value={cursor}
            min={0}
            max={100}
            step={1}
            onChange={setCursor}
            suffix=" t"
          />
          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 font-sans text-xs text-muted">
            <span>
              Y = {formatNumber(model.current.actual)}; Y* = {formatNumber(POTENTIAL)}
            </span>
            <span className={model.gap >= 0 ? "text-accent" : "text-danger"}>
              mezera {model.gap >= 0 ? "+" : ""}
              {formatDecimal(model.gap, 1)} %
            </span>
            <span className="text-ink">fáze: {model.phase}</span>
          </div>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <ChartLegend
            items={[
              { label: "skutečný produkt Y", color: CHART.accent },
              { label: "potenciální produkt Y*", color: CHART.guide, dashed: true },
            ]}
          />
          <ClientOnly fallback={<div style={{ height: 280 }} />}>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={model.data} margin={chartMargin}>
                  <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
                  <XAxis
                    dataKey="t"
                    {...axisProps}
                    label={{
                      value: "čas",
                      position: "insideBottomRight",
                      offset: -8,
                      fill: CHART.muted,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    domain={[80, 120]}
                    {...axisProps}
                    width={42}
                    label={{
                      value: "Y",
                      position: "insideTopLeft",
                      offset: 8,
                      fill: CHART.muted,
                      fontSize: 11,
                    }}
                  />
                  <ReferenceLine
                    y={POTENTIAL}
                    stroke={CHART.guide}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="linear"
                    dataKey="potential"
                    stroke={CHART.guide}
                    strokeWidth={1.25}
                    strokeDasharray="5 5"
                    dot={false}
                    isAnimationActive={!reduced}
                    animationDuration={220}
                  />
                  <Line
                    type="linear"
                    dataKey="actual"
                    stroke={CHART.accent}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={!reduced}
                    animationDuration={220}
                  />
                  <ReferenceLine
                    x={cursor}
                    stroke={CHART.ink}
                    strokeWidth={1}
                    strokeDasharray="2 3"
                  />
                  <ReferenceDot
                    x={cursor}
                    y={model.current.actual}
                    r={4}
                    fill={CHART.ink}
                    stroke="#fff"
                    strokeWidth={1.5}
                    label={{
                      value: model.phase,
                      position: "top",
                      fill: CHART.ink,
                      fontSize: 11,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ClientOnly>
        </div>

        <div>
          <ChartLegend
            items={[
              { label: "produkční mezera", color: CHART.secondary },
              { label: "nula", color: CHART.guide, dashed: true },
            ]}
          />
          <ClientOnly fallback={<div style={{ height: 190 }} />}>
            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer>
                <LineChart data={model.data} margin={chartMargin}>
                  <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
                  <XAxis dataKey="t" {...axisProps} />
                  <YAxis
                    {...axisProps}
                    width={42}
                    tickFormatter={(value: number) => `${value} %`}
                  />
                  <ReferenceLine y={0} stroke={CHART.zero} />
                  <Line
                    type="linear"
                    dataKey="gap"
                    stroke={CHART.secondary}
                    strokeWidth={1.75}
                    dot={false}
                    isAnimationActive={!reduced}
                    animationDuration={220}
                  />
                  <ReferenceLine
                    x={cursor}
                    stroke={CHART.ink}
                    strokeWidth={1}
                    strokeDasharray="2 3"
                  />
                  <ReferenceDot
                    x={cursor}
                    y={model.gap}
                    r={3.5}
                    fill={CHART.ink}
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ClientOnly>
        </div>
      </div>
    </GraphShell>
  );
}
