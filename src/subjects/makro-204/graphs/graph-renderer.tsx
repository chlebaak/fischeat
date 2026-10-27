"use client";

import type { GraphId } from "@/subjects/types";
import { AdAsGraph } from "./adas-graph";
import { BusinessCycleGraph } from "./business-cycle-graph";
import { ConsumptionSavingsGraph } from "./consumption-savings-graph";
import { DeflatorChart } from "./deflator-chart";
import { DepositMultiplierGraph } from "./deposit-multiplier-graph";
import { GdpMethodsDiagram } from "./gdp-methods-diagram";
import { KeynesianCrossGraph } from "./keynesian-cross-graph";
import { MoneyMarketGraph } from "./money-market-graph";

export function GraphRenderer({
  id,
  figure,
}: {
  id: GraphId;
  figure?: string;
}) {
  switch (id) {
    case "gdp-methods":
      return <GdpMethodsDiagram figure={figure} />;
    case "deflator-chart":
      return <DeflatorChart figure={figure} />;
    case "consumption-savings":
      return <ConsumptionSavingsGraph figure={figure} />;
    case "keynesian-cross":
      return <KeynesianCrossGraph figure={figure} />;
    case "money-market":
      return <MoneyMarketGraph figure={figure} />;
    case "deposit-multiplier":
      return <DepositMultiplierGraph figure={figure} />;
    case "adas":
      return <AdAsGraph figure={figure} />;
    case "business-cycle":
      return <BusinessCycleGraph figure={figure} />;
    default:
      return null;
  }
}
