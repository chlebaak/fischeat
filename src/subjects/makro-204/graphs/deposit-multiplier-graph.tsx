"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "@/lib/format";
import { CHART, axisProps, chartMargin } from "@/components/graphs/chart-theme";
import { ChartLegend } from "@/components/graphs/chart-legend";
import { ClientOnly } from "@/components/graphs/client-only";
import { ControlSlider } from "@/components/graphs/control-slider";
import { GraphShell } from "@/components/graphs/graph-shell";
import { useReducedMotion } from "@/components/graphs/use-reduced-motion";

export function DepositMultiplierGraph({ figure }: { figure?: string }) {
  const [pmr, setPmr] = useState(6);
  const [impulse, setImpulse] = useState(20);
  const [rounds, setRounds] = useState(8);
  const reduced = useReducedMotion();

  const model = useMemo(() => {
    const reserveRate = pmr / 100;
    const multiplier = 1 / reserveRate;
    const limit = impulse * multiplier;
    const data = Array.from({ length: rounds }, (_, index) => {
      const newDeposit = impulse * Math.pow(1 - reserveRate, index);
      const cumulative = dataSum(impulse, reserveRate, index);
      return {
        round: index + 1,
        newDeposit,
        cumulative,
        reserves: newDeposit * reserveRate,
        loans: newDeposit * (1 - reserveRate),
      };
    });

    return { multiplier, limit, data };
  }, [impulse, pmr, rounds]);

  const table = {
    headers: ["Kolo", "Nové vklady", "Kumulovaně", "Rezervy", "Úvěry"],
    rows: model.data.map((row) => [
      row.round,
      formatNumber(row.newDeposit),
      formatNumber(row.cumulative),
      formatNumber(row.reserves),
      formatNumber(row.loans),
    ]),
  };

  return (
    <GraphShell
      id="deposit-multiplier"
      figure={figure}
      title="Depozitní multiplikace"
      description="Počáteční impuls se v bankovním systému násobí. Čím nižší je PMR, tím větší je maximální změna depozit."
      checklist={[
        "Napiš ΔD = (1/PMR) × ΔR.",
        "Rozliš vklady, rezervy a úvěry.",
        "Ukaž první tři kola a pak limit.",
        "Nezapomeň, že model ignoruje hotovostní úniky.",
      ]}
      table={table}
      note="Model předpokládá, že banky drží pouze povinné rezervy a že peníze z úvěrů se vracejí do bank. Reálný multiplikátor bývá menší."
      controls={
        <>
          <ControlSlider
            label="Povinná míra rezerv PMR"
            value={pmr}
            min={2}
            max={20}
            step={1}
            onChange={setPmr}
            format={(value) => String(value)}
            suffix=" %"
          />
          <ControlSlider
            label="Počáteční impuls ΔR"
            value={impulse}
            min={10}
            max={100}
            step={10}
            onChange={setImpulse}
            format={(value) => formatNumber(value)}
            suffix=" mil. Kč"
          />
          <ControlSlider
            label="Počet kol"
            value={rounds}
            min={1}
            max={12}
            step={1}
            onChange={setRounds}
            format={(value) => String(value)}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2 font-sans text-xs text-muted">
            <span>Multiplikátor = {formatNumber(model.multiplier)}</span>
            <span className="text-ink">
              Limit ΔD = {formatNumber(model.limit)} mil. Kč
            </span>
          </div>
        </>
      }
    >
      <ChartLegend
        items={[
          { label: "nové vklady v kole", color: "#b9d0c5", kind: "bar" },
          { label: "kumulované vklady", color: CHART.accent, kind: "bar" },
        ]}
      />
      <ClientOnly fallback={<div style={{ height: 320 }} />}>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={model.data} margin={chartMargin} barGap={2}>
              <CartesianGrid vertical={false} stroke={CHART.grid} strokeDasharray="2 4" />
              <XAxis
                dataKey="round"
                {...axisProps}
                label={{
                  value: "kolo",
                  position: "insideBottomRight",
                  offset: -8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <YAxis
                {...axisProps}
                width={52}
                tickFormatter={(value: number) => value.toLocaleString("cs-CZ")}
                label={{
                  value: "mil. Kč",
                  position: "insideTopLeft",
                  offset: 8,
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <ReferenceLine
                y={model.limit}
                stroke={CHART.guide}
                strokeDasharray="4 4"
                label={{
                  value: "limit",
                  position: "insideTopRight",
                  fill: CHART.muted,
                  fontSize: 11,
                }}
              />
              <Bar
                dataKey="newDeposit"
                name="Nové vklady"
                fill="#dce9e2"
                stroke="#b9d0c5"
                strokeWidth={1}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
              <Bar
                dataKey="cumulative"
                name="Kumulované vklady"
                fill="#c7d8e4"
                stroke="#8fb0c7"
                strokeWidth={1}
                isAnimationActive={!reduced}
                animationDuration={220}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ClientOnly>
    </GraphShell>
  );
}

function dataSum(impulse: number, reserveRate: number, lastIndex: number) {
  let total = 0;
  for (let index = 0; index <= lastIndex; index += 1) {
    total += impulse * Math.pow(1 - reserveRate, index);
  }
  return total;
}
