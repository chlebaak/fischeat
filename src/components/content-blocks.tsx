import Link from "next/link";
import type { ContentBlock } from "@/content/types";
import { graphById } from "@/content/graphs";
import { GraphDisplayProvider } from "./graphs/graph-display-context";
import { GraphRenderer } from "./graphs/graph-renderer";
import { FormulaCard } from "./formula-card";
import { RichText } from "./rich-text";

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-baseline gap-1.5 font-sans text-sm text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );

          case "heading":
            return (
              <h3 key={index}>
                <RichText text={block.text} />
              </h3>
            );

          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RichText text={item} />
                  </li>
                ))}
              </List>
            );
          }

          case "table":
            return (
              <div key={index} className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header} scope="col">
                          <RichText text={header} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.caption ? (
                  <p className="mt-2 font-sans text-xs text-muted">{block.caption}</p>
                ) : null}
              </div>
            );

          case "formula":
            return (
              <div key={index} className="my-5">
                <FormulaCard formulaId={block.formulaId} />
              </div>
            );

          case "callout":
            return (
              <aside
                key={index}
                className={`callout my-6 ${
                  block.variant === "warning" ? "callout-warning" : ""
                }`}
              >
                {block.title ? (
                  <p className="callout-title">
                    <RichText text={block.title} />
                  </p>
                ) : null}
                <p className="text-ink/80">
                  <RichText text={block.text} />
                </p>
              </aside>
            );

          case "example":
            return (
              <aside
                key={index}
                className="my-8 border-y border-line py-5 font-sans"
              >
                <p className="text-xs font-medium text-muted">Příklad</p>
                <h3 className="mt-1 text-[17px] font-semibold leading-snug">
                  <RichText text={block.title} />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                  <RichText text={block.prompt} />
                </p>
                <ol className="mt-4 space-y-3">
                  {block.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="grid gap-0.5 sm:grid-cols-[9.5rem_1fr] sm:gap-3">
                      <span className="text-sm font-medium text-muted">
                        {step.label}
                      </span>
                      <span className="text-[15px] leading-relaxed">
                        <RichText text={step.text} />
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-l-2 border-accent pl-3 text-[15px] leading-relaxed">
                  <span className="font-semibold">Výsledek: </span>
                  <RichText text={block.answer} />
                </p>
              </aside>
            );

          case "graph":
            return (
              <div key={index} className="my-8 lg:-mx-24">
                <GraphDisplayProvider compact>
                  <GraphRenderer
                    id={block.graphId}
                    figure={block.figure}
                  />
                </GraphDisplayProvider>
                <p className="mt-2 font-sans text-xs text-muted">
                  <Link
                    href={`/grafy/${block.graphId}`}
                    className="link-underline text-accent"
                  >
                    Celý graf, návod a tabulka hodnot →
                  </Link>
                </p>
              </div>
            );

          case "graphLink": {
            const graph = graphById(block.graphId);
            return (
              <p key={index} className="my-5">
                <ArrowLink href={`/grafy/${block.graphId}`}>
                  {block.label ?? graph?.title ?? "Zobrazit graf"}
                </ArrowLink>
              </p>
            );
          }

          case "terms":
            return (
              <dl key={index} className="my-6 divide-y divide-line border-y border-line">
                {block.items.map((item) => (
                  <div key={item.term} className="py-3">
                    <dt className="font-sans text-sm font-semibold">{item.term}</dt>
                    <dd className="mt-1 font-sans text-sm leading-relaxed text-muted">
                      <RichText text={item.definition} />
                    </dd>
                  </div>
                ))}
              </dl>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
