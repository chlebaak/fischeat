"use client";

import { RichText } from "@/components/rich-text";
import { GraphShell } from "@/components/graphs/graph-shell";

const methods = [
  {
    label: "Výdajová",
    formula: "$Y = C + I_B + G + NX$",
    note: "Kdo co kupuje",
  },
  {
    label: "Výrobní",
    formula: "$Y = \\sum HPH + T_{nep} - S$",
    note: "Co se vyrobí",
  },
  {
    label: "Důchodová",
    formula: "$Y = W + R + I + \\Pi + SE + A + T_{nep} - S$",
    note: "Kdo co dostane",
  },
];

export function GdpMethodsDiagram({ figure }: { figure?: string }) {
  return (
    <GraphShell
      id="gdp-methods"
      figure={figure}
      title="Tři cesty k HDP"
      description="Výdajová, výrobní a důchodová metoda jsou tři pohledy na stejný tok. Liší se jen tím, odkud se na produkt díváš."
      checklist={[
        "Napiš, co je finální statek a co meziprodukt.",
        "U výdajové metody označ $C$, $I_B$, $G$ a $NX$.",
        "U výrobní metody sečti přidanou hodnotu, ne produkci.",
        "U důchodové metody nezapomeň na odpisy a nepřímé daně.",
      ]}
      table={{
        headers: ["Metoda", "Pohled", "Co se sčítá"],
        rows: [
          ["Výdajová", "užití produktu", "C, I_B, G, NX"],
          ["Výrobní", "vznik produktu", "přidaná hodnota + nepřímé daně − subvence"],
          ["Důchodová", "rozdělení důchodu", "mzdy, renty, úroky, zisky, odpisy, daně"],
        ],
      }}
    >
      <div className="mx-auto max-w-2xl py-4">
        <div>
          {methods.map((method) => (
            <div
              key={method.label}
              className="grid gap-1 border-t border-line py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
            >
              <div>
                <p className="font-sans text-sm font-semibold">{method.label}</p>
                <p className="mt-0.5 font-sans text-[11px] text-muted">{method.note}</p>
              </div>
              <p className="overflow-x-auto font-serif text-[13px] leading-relaxed text-ink/80">
                <RichText text={method.formula} />
              </p>
            </div>
          ))}
          <div className="border-t border-ink pt-3">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="font-sans text-xs font-medium text-accent">stejný HDP</span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-serif text-sm leading-relaxed text-muted">
          Když jsou data správná, všechny tři metody dají stejný výsledek. V testu
          vybíráš metodu podle toho, co je zadané.
        </p>
      </div>
    </GraphShell>
  );
}
