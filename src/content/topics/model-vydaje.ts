import type { Topic } from "../types";

export const modelVydaje: Topic = {
  id: "model-vydaje",
  number: 2,
  slug: "model-vydaje",
  title: "Model produkt–výdaje (Keynesiánský kříž)",
  shortTitle: "Model produkt–výdaje",
  intro:
    "Krátké období, pevné ceny a rozhodující role plánovaných výdajů. Zde vzniká výdajový multiplikátor a všechny jeho varianty pro dva, tři a čtyři sektory.",
  takeaways: [
    "Spotřeba a úspory jsou dvě strany stejné mince: c + s = 1.",
    "V rovnováze se skutečný produkt rovná plánovaným výdajům a neplánované investice do zásob jsou nulové.",
    "Multiplikátor roste s c a klesá s daněmi a importem.",
  ],
  sourceNote: "Přednášky 2–3, slidy 14–37 a 1–20; vzorový test Q1, Q3 a Q6.",
  formulaIds: [
    "consumption",
    "savings",
    "mpc-mps",
    "apc-aps",
    "equilibrium-2",
    "multiplier-2",
    "yd-taxes",
    "equilibrium-3",
    "multiplier-3",
    "nx",
    "multiplier-4",
    "equilibrium-4",
    "injections-leakages",
    "delta-g",
    "delta-ta",
    "delta-tr",
  ],
  graphIds: ["consumption-savings", "keynesian-cross"],
  testQuestionIds: ["q1", "q3", "q6"],
  sections: [
    {
      id: "predpoklady",
      title: "Předpoklady modelu 45°",
      blocks: [
        {
          type: "paragraph",
          text: "Model produkt–výdaje je keynesiánský model krátkého období. Porovnává **skutečně vytvořený produkt** s **plánovanými výdaji** ekonomických subjektů.",
        },
        {
          type: "list",
          items: [
            "Krátké období a nevyužité výrobní kapacity – ekonomika se pohybuje pod potenciálem.",
            "Dokonale elastická agregátní nabídka – firmy vyrobí, co po nich poptávka chce, bez růstu cen.",
            "Cenová hladina je fixní, nominální mzdy a úroková míra se nemění.",
            "Abstrahujeme od odpisů a dalších komplikací; $Y$ je HDP.",
          ],
        },
        {
          type: "paragraph",
          text: "Rovnováha nastane, když se plánované výdaje rovnají skutečnému produktu. Neplánované investice do zásob jsou nulové: $IU = 0$.",
        },
      ],
    },
    {
      id: "spotreba-uspora",
      title: "Spotřební a úsporová funkce",
      blocks: [
        {
          type: "paragraph",
          text: "Keynesova krátkodobá spotřební funkce má autonomní část a část závislou na disponibilním důchodu:",
        },
        { type: "formula", formulaId: "consumption" },
        {
          type: "paragraph",
          text: "**Autonomní spotřeba $C_A$** je část spotřeby, která nezávisí na běžném důchodu. Domácnost ji financuje z úspor nebo z půjčky. Proto je při nulovém důchodu spotřeba kladná a úspory záporné.",
        },
        {
          type: "paragraph",
          text: "Mezní sklon ke spotřebě $c$ říká, o kolik vzroste spotřeba, když disponibilní důchod vzroste o jednotku. Úsporová funkce je její zrcadlový obraz:",
        },
        { type: "formula", formulaId: "savings" },
        { type: "formula", formulaId: "mpc-mps" },
        { type: "formula", formulaId: "apc-aps" },
        {
          type: "paragraph",
          text: "**$c$ není totéž co APC.** $c$ je změna spotřeby při změně důchodu o jednotku. APC je podíl spotřeby na celkovém důchodu. Proto se mohou lišit.",
        },
        {
          type: "paragraph",
          text: "Změna $c$ mění **sklon** křivky. Změna autonomní spotřeby $C_A$ posouvá celou křivku **rovnoběžně** nahoru nebo dolů.",
        },
        {
          type: "example",
          title: "Vzorový test Q3 – úspory a spotřeba",
          prompt:
            "Disponibilní důchod 800, 1100, 1250; úspory 120, 180, 210. Najdi úsporovou funkci, spotřebu při $YD = 1400$ a $APC$ při $YD = 1700$.",
          steps: [
            {
              label: "Mezní sklon k úsporám",
              text: "$s = \\frac{180 - 120}{1100 - 800} = \\frac{60}{300} = 0{,}2$.",
            },
            {
              label: "Autonomní část úspor",
              text: "$-S_A = 120 - 0{,}2 \\times 800 = -40$, takže $S = -40 + 0{,}2YD$.",
            },
            {
              label: "Spotřeba",
              text: "Z $c + s = 1$ je $c = 0{,}8$ a $C_A = 40$. Pro $YD = 1400$: $C = 40 + 0{,}8 \\times 1400 = 1160$.",
            },
            {
              label: "APC při YD = 1700",
              text: "$C = 40 + 0{,}8 \\times 1700 = 1400$; $APC = 1400 / 1700 = 0{,}8235$.",
            },
          ],
          answer:
            "S = −40 + 0,2YD; C(1400) = 1160; APC(1700) ≈ 0,8235.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Q6 – tři situace v grafu",
          text: "Pokles mezního sklonu k úsporám znamená růst c, tedy strmější spotřební funkci. Negativní očekávání sníží autonomní spotřebu a posunou křivku dolů. Růst bohatství ji posune nahoru.",
        },
        { type: "graph", graphId: "consumption-savings", figure: "Obr. 2.1" },
      ],
    },
    {
      id: "rovnovaha-2",
      title: "Rovnováha dvousektorové ekonomiky",
      blocks: [
        {
          type: "paragraph",
          text: "Ve dvousektorové ekonomice jsou jen domácnosti a firmy. Rovnováha nastane, když se produkt rovná spotřebě plus plánovaným investicím:",
        },
        {
          type: "paragraph",
          text: "$Y = C + I_P$ a zároveň $I_P = S$. Skutečné investice se rovnají plánovaným jen tehdy, když jsou neplánované zásoby nulové.",
        },
        { type: "formula", formulaId: "equilibrium-2" },
        {
          type: "paragraph",
          text: "V grafu je na ose x produkt $Y$ a na ose y plánované výdaje $AE$. Přímka 45° spojuje body, kde se produkt rovná výdajům. Rovnováha je průsečík této přímky s křivkou $AE$.",
        },
        { type: "formula", formulaId: "multiplier-2" },
        {
          type: "paragraph",
          text: "**Proč je multiplikátor větší než 1?** První výdaj se stane příjmem domácností. Ty z něj část utratí, tato část se stane příjmem někoho dalšího, a tak to jde dál. Čím větší je $c$, tím více z každé další koruny zůstane v ekonomice.",
        },
        {
          type: "example",
          title: "Dvousektorový příklad",
          prompt:
            "$S = -200 + 0{,}1YD$, plánované investice $I = 300$. Najdi rovnovážný produkt a multiplikátor.",
          steps: [
            {
              label: "Rovnováha",
              text: "$I = S \\Rightarrow 300 = -200 + 0{,}1Y$.",
            },
            {
              label: "Produkt",
              text: "$0{,}1Y = 500 \\Rightarrow Y = 5000$.",
            },
            {
              label: "Multiplikátor",
              text: "$s = 0{,}1$, takže $\\alpha = 1/s = 10$.",
            },
          ],
          answer: "Rovnovážný produkt je 5000, multiplikátor 10.",
        },
        { type: "graph", graphId: "keynesian-cross", figure: "Obr. 2.2" },
      ],
    },
    {
      id: "tri-sektory",
      title: "Třísektorová ekonomika",
      blocks: [
        {
          type: "paragraph",
          text: "Vláda vstupuje třemi kanály: vybírá daně, poskytuje transfery a nakupuje statky a služby. Daně a transfery mění disponibilní důchod, vládní nákupy jdou přímo do plánovaných výdajů.",
        },
        { type: "formula", formulaId: "yd-taxes" },
        { type: "formula", formulaId: "multiplier-3" },
        { type: "formula", formulaId: "equilibrium-3" },
        {
          type: "paragraph",
          text: "Podmínka rovnováhy se dá zapsat i jako rovnost přítoků a úniků: $I_P + G = S + NT$. Multiplikátor je menší než ve dvousektorové ekonomice, protože část každé dodatečné koruny odejde na daních.",
        },
        {
          type: "table",
          headers: ["Model", "Multiplikátor", "Co ovlivňuje sklon"],
          rows: [
            ["2 sektory", "$1/(1-c)$", "jen c"],
            ["3 sektory", "$1/[1-c(1-t)]$", "c a sazba daně t"],
            ["4 sektory", "$1/[1-c(1-t)+m]$", "c, t a mezní sklon k importu m"],
          ],
        },
        {
          type: "callout",
          variant: "note",
          title: "Daně a transfery nejsou totéž",
          text: "Růst autonomních daní snižuje produkt přes −αcΔT_A. Růst transferů naopak působí přes +αcΔTR. Oba kanály jdou přes spotřebu, ale opačným směrem.",
        },
      ],
    },
    {
      id: "ctyri-sektory",
      title: "Čtyřsektorová ekonomika",
      blocks: [
        {
          type: "paragraph",
          text: "Otevřená ekonomika přidává export a import. Export je přítok do ekonomiky, import je únik. Import navíc roste s domácím produktem, proto z každé další koruny část odtéká do zahraničí:",
        },
        { type: "formula", formulaId: "nx" },
        { type: "formula", formulaId: "multiplier-4" },
        { type: "formula", formulaId: "equilibrium-4" },
        { type: "formula", formulaId: "injections-leakages" },
        {
          type: "callout",
          variant: "note",
          title: "Značení investic",
          text: "V zadání se plánované investice často značí jen $I$. V těchto výpiscích používáme $I_P$, aby se nepletly s důchody a jinými veličinami.",
        },
        {
          type: "example",
          title: "Vzorový test Q1 – čtyřsektorová ekonomika",
          prompt:
            "$C_A = 300$, $c = 0,8$, $I = 600$ (plánované investice), $m = 0,1$, $TR = 120$, $t = 0,1$, $G = 320$, $X_A = 410$, $M_A = 340$, $T_A = 170$. Vypočítej multiplikátor, rovnovážný produkt, čistý export a změnu produktu při $\\Delta T_A = +50$ a $\\Delta G = -20$.",
          steps: [
            {
              label: "Multiplikátor",
              text: "$\\alpha' = \\frac{1}{1-0{,}8(1-0{,}1)+0{,}1} = \\frac{1}{0{,}38} = 2{,}6316$.",
            },
            {
              label: "Rovnovážný produkt",
              text: "$Y = 2{,}6316 \\times (300+600+320+0{,}8 \\times 120 - 0{,}8 \\times 170 + 410 - 340) = 2{,}6316 \\times 1250 = 3289{,}47$.",
            },
            {
              label: "Čistý export",
              text: "$NX = 410 - 340 - 0{,}1 \\times 3289{,}47 = -258{,}95$.",
            },
            {
              label: "Změna produktu",
              text: "$\\Delta Y = 2{,}6316 \\times (-20 - 0{,}8 \\times 50) = 2{,}6316 \\times (-60) = -157{,}89$.",
            },
          ],
          answer:
            "α ≈ 2,63; Y ≈ 3289,5; NX ≈ −259; ΔY ≈ −157,9. Oficiální řešení používá zaokrouhlené α ≈ 2,6, proto vychází Y = 3250, NX = −255 a ΔY = −156.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "m je mezní sklon k importu",
          text: "m není podíl importu na HDP. Je to změna importu při změně produktu o jednotku. V zadání Q1 je m = 0,1.",
        },
      ],
    },
    {
      id: "posuny",
      title: "Posun křivky versus změna sklonu",
      blocks: [
        {
          type: "paragraph",
          text: "U grafů plánovaných výdajů rozlišuj dvě věci. **Posun** celé křivky způsobí změna autonomních výdajů. **Změnu sklonu** způsobí změna parametru, který násobí důchod.",
        },
        {
          type: "table",
          headers: ["Co se mění", "Co se stane s křivkou AE", "Příklad"],
          rows: [
            ["C_A, I, G, TR, X_A", "posun nahoru/dolů", "vláda zvýší G"],
            ["T_A, M_A", "posun dolů/nahoru", "vláda zvýší autonomní daně"],
            ["c", "strmější/plošší", "domácnosti více utrácejí z důchodu"],
            ["t", "plošší/strmější", "vyšší důchodová daň"],
            ["m", "plošší/strmější", "vyšší sklon k importu"],
          ],
        },
        { type: "formula", formulaId: "delta-g" },
        { type: "formula", formulaId: "delta-ta" },
        { type: "formula", formulaId: "delta-tr" },
        {
          type: "callout",
          variant: "note",
          title: "Graf Q6",
          text: "U spotřební funkce: pokles s znamená růst c a strmější přímku. Změna očekávání nebo bohatství mění C_A, tedy posouvá přímku rovnoběžně.",
        },
      ],
    },
    {
      id: "odnest",
      title: "Co si odnést",
      blocks: [
        {
          type: "list",
          items: [
            "$C = C_A + cYD$, $S = -S_A + sYD$, $c+s=1$.",
            "Rovnováha: $Y = C + I_P$, potažmo $I_P = S$.",
            "Multiplikátor: 2 sektory $1/(1-c)$, 3 sektory $1/[1-c(1-t)]$, 4 sektory $1/[1-c(1-t)+m]$.",
            "Přítoky = úniky: $I_P + G + X = S + NT + M$.",
            "Změna autonomních výdajů posouvá křivku, změna c, t nebo m mění její sklon.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nejčastější chyby",
          text: "Zapomenutá daň v disponibilním důchodu, záměna autonomních daní a sazby daně, import jako podíl místo mezního sklonu, hrubé versus čisté investice.",
        },
      ],
    },
  ],
};
