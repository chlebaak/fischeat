"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { makroMeta } from "@/subjects/makro-204/meta";
import { getTopicById } from "@/subjects/makro-204/topics";
import { defaultTest } from "@/subjects/makro-204/tests";
import type { TestField, TestPart, TestVersion } from "@/subjects/types";
import { formatNumber } from "@/lib/format";
import {
  answeredParts,
  isFieldCorrect,
  scoreByTopic,
  scoreTest,
  type AnswerState,
} from "@/lib/test-scoring";
import { RichText } from "@/components/rich-text";
import { AdAsGraph } from "@/subjects/makro-204/graphs/adas-graph";
import { ConsumptionShiftGraphs } from "@/subjects/makro-204/graphs/consumption-shift-graphs";

const test: TestVersion = defaultTest;
const subjectPath = `/${makroMeta.slug}`;

function fieldValue(answer: AnswerState[string] | undefined, fieldId: string) {
  return answer?.fields[fieldId] ?? "";
}

function NumericField({
  field,
  partId,
  answer,
  submitted,
  onChange,
}: {
  field: TestField;
  partId: string;
  answer: AnswerState[string] | undefined;
  submitted: boolean;
  onChange: (value: string) => void;
}) {
  const raw = fieldValue(answer, field.id);
  const correct = isFieldCorrect(field, raw);
  const inputId = `${partId}-${field.id}`;

  return (
    <div>
      <label htmlFor={inputId} className="grid gap-1 font-sans text-xs text-muted">
        <span>
          <RichText text={field.label} />
        </span>
        <span className="flex items-baseline gap-2">
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={raw}
            onChange={(event) => onChange(event.target.value)}
            disabled={submitted}
            placeholder={field.placeholder}
            className={`min-w-0 flex-1 rounded-md border bg-white px-2.5 py-2 font-mono text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-accent disabled:bg-paper disabled:text-muted ${
              submitted
                ? correct
                  ? "border-graph-2"
                  : "border-danger"
                : "border-line-strong"
            }`}
          />
          {field.unit ? (
            <span className="shrink-0 whitespace-nowrap text-[11px]">{field.unit}</span>
          ) : null}
        </span>
      </label>
      {submitted ? (
        <p
          className={`mt-1 font-sans text-[11px] ${
            correct ? "text-graph-2" : "text-danger"
          }`}
        >
          {correct ? "✓ správně" : "✗ zkontroluj postup"} · správně{" "}
          {formatNumber(field.answer)}
          {field.unit ? ` ${field.unit}` : ""}
        </p>
      ) : null}
    </div>
  );
}

function SelfPart({
  answer,
  submitted,
  onSelect,
}: {
  answer: AnswerState[string] | undefined;
  submitted: boolean;
  onSelect: (value: boolean) => void;
}) {
  const selected = answer?.self ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={submitted}
          aria-pressed={selected === true}
          onClick={() => onSelect(true)}
          className={`rounded-md border px-3 py-1.5 font-sans text-xs transition-colors disabled:cursor-default ${
            selected === true
              ? "border-ink bg-ink text-paper"
              : "border-line-strong bg-white text-muted hover:border-ink hover:text-ink"
          }`}
        >
          Umím
        </button>
        <button
          type="button"
          disabled={submitted}
          aria-pressed={selected === false}
          onClick={() => onSelect(false)}
          className={`rounded-md border px-3 py-1.5 font-sans text-xs transition-colors disabled:cursor-default ${
            selected === false
              ? "border-danger bg-danger text-white"
              : "border-line-strong bg-white text-muted hover:border-danger hover:text-danger"
          }`}
        >
          Ještě ne
        </button>
        {selected === null && !submitted ? (
          <span className="font-sans text-[11px] text-muted">
            ohodnoť se po nakreslení
          </span>
        ) : null}
      </div>
      {submitted ? (
        <p className="mt-1 font-sans text-[11px] text-muted">
          {selected === true
            ? "Počítáno do skóre."
            : selected === false
              ? "Nepočítáno do skóre. Zkus si graf znovu podle řešení."
              : "Nehodnoceno. při příštím průchodu si graf zkontroluj."}
        </p>
      ) : null}
    </div>
  );
}

function Part({
  part,
  answer,
  submitted,
  onFieldChange,
  onSelfChange,
}: {
  part: TestPart;
  answer: AnswerState[string] | undefined;
  submitted: boolean;
  onFieldChange: (fieldId: string, value: string) => void;
  onSelfChange: (value: boolean) => void;
}) {
  return (
    <div id={part.id} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-sans text-sm font-medium">
          <RichText text={part.label} />
        </p>
        <span className="shrink-0 font-mono text-[11px] text-muted">
          {part.points} b.
        </span>
      </div>

      {part.kind === "numeric" && part.fields ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {part.fields.map((field) => (
            <NumericField
              key={field.id}
              field={field}
              partId={part.id}
              answer={answer}
              submitted={submitted}
              onChange={(value) => onFieldChange(field.id, value)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <SelfPart
            answer={answer}
            submitted={submitted}
            onSelect={onSelfChange}
          />
        </div>
      )}

      {submitted ? (
        <details className="mt-3">
          <summary>Zobrazit postup</summary>
          <div className="mt-2 space-y-1.5 font-serif text-sm leading-relaxed text-ink/80">
            {part.solution.map((line, index) => (
              <p key={index}>
                <RichText text={line} />
              </p>
            ))}
          </div>
        </details>
      ) : (
        <p className="mt-3 font-sans text-[11px] text-muted">
          Řešení se odemkne po vyhodnocení.
        </p>
      )}
    </div>
  );
}

export function TestRunner() {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => answeredParts(test, answers), [answers]);
  const score = useMemo(
    () => (submitted ? scoreTest(test, answers) : 0),
    [answers, submitted],
  );
  const byTopic = useMemo(
    () => (submitted ? scoreByTopic(test, answers) : []),
    [answers, submitted],
  );

  const updateField = (partId: string, fieldId: string, value: string) => {
    setAnswers((current) => {
      const part = current[partId];
      return {
        ...current,
        [partId]: {
          fields: { ...(part?.fields ?? {}), [fieldId]: value },
          self: part?.self ?? null,
        },
      };
    });
  };

  const updateSelf = (partId: string, value: boolean) => {
    setAnswers((current) => {
      const part = current[partId];
      return {
        ...current,
        [partId]: {
          fields: part?.fields ?? {},
          self: value,
        },
      };
    });
  };

  const evaluate = () => {
    setSubmitted(true);
    window.setTimeout(() => {
      document.getElementById("vysledek")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="sticky top-16 z-20 border-y border-line bg-paper/95 py-2.5 backdrop-blur no-print">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-0 font-sans text-xs text-muted">
          <span>
            Vyplněno {progress.answered} / {progress.total} částí
          </span>
          <span>
            {submitted ? (
              <span className="text-ink">
                Skóre: {score} / {test.totalPoints} b.
              </span>
            ) : (
              `${test.totalPoints} bodů celkem`
            )}
          </span>
        </div>
        <div
          className="mx-auto mt-2 h-0.5 max-w-4xl rounded-full bg-line"
          role="progressbar"
          aria-label="Vyplnění testu"
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-valuenow={progress.answered}
        >
          <div
            className="h-0.5 rounded-full bg-accent transition-[width] duration-300"
            style={{
              width: `${Math.min(100, (progress.answered / progress.total) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="space-y-12 pt-10">
          {test.questions.map((question) => {
            const topic = getTopicById(question.topicId);
            return (
              <section
                key={question.id}
                id={question.id}
                className="scroll-mt-32"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-muted">
                      {String(question.number).padStart(2, "0")}
                    </span>
                    <h2 className="font-sans text-xl font-semibold tracking-[-0.02em]">
                      {question.title}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    {question.points} b.
                  </span>
                </div>

                <div className="mt-4 max-w-2xl font-serif text-[0.98rem] leading-[1.7] text-ink/80">
                  {question.prompt.map((paragraph, index) => (
                    <p key={index} className="mt-2 first:mt-0">
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>

                {question.given?.length ? (
                  <dl className="mt-4 grid gap-x-6 gap-y-1.5 rounded-lg bg-surface px-4 py-3 font-sans text-xs sm:grid-cols-2">
                    {question.given.map((item) => (
                      <div key={item.label} className="flex justify-between gap-3">
                        <dt className="text-muted">
                          <RichText text={item.label} />
                        </dt>
                        <dd className="font-mono text-ink">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {question.table ? (
                  <div className="table-wrap mt-4">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {question.table.headers.map((header) => (
                            <th key={header} scope="col">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {question.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {topic ? (
                  <p className="mt-3 font-sans text-[11px] text-muted">
                    Téma:{" "}
                    <Link
                      href={`${subjectPath}/vyklad/${topic.slug}`}
                      className="link-underline text-accent"
                    >
                      {topic.shortTitle}
                    </Link>
                  </p>
                ) : null}

                <div className="mt-5 space-y-4">
                  {question.parts.map((part) => (
                    <Part
                      key={part.id}
                      part={part}
                      answer={answers[part.id]}
                      submitted={submitted}
                      onFieldChange={(fieldId, value) =>
                        updateField(part.id, fieldId, value)
                      }
                      onSelfChange={(value) => updateSelf(part.id, value)}
                    />
                  ))}
                </div>

                {question.solutionGraphs?.length && submitted ? (
                  <div className="mt-5 space-y-4">
                    {question.solutionGraphs.map((graph, index) =>
                      graph.kind === "consumption-shifts" ? (
                        <ConsumptionShiftGraphs key={index} />
                      ) : (
                        <AdAsGraph
                          key={index}
                          compact
                          readOnly
                          titleOverride={graph.title}
                          initialAdShock={graph.adShock}
                          initialSasShock={graph.sasShock}
                          initialShowLongRun={graph.showLongRun}
                        />
                      ),
                    )}
                  </div>
                ) : null}

                {question.solutionGraphs?.length && !submitted ? (
                  <p className="mt-4 font-sans text-[11px] text-muted">
                    Vzorové grafy se zobrazí po vyhodnocení testu.
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>

        <div id="vysledek" className="scroll-mt-32 py-10">
          {!submitted ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md font-sans text-sm leading-relaxed text-muted">
                U grafických otázek se ohodnoť sám. Výpočty se vyhodnotí
                automaticky s tolerancí.
              </p>
              <button
                type="button"
                onClick={evaluate}
                className="rounded-md bg-ink px-5 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent"
              >
                Vyhodnotit test
              </button>
            </div>
          ) : (
            <div aria-live="polite">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-sans text-xs font-medium text-muted">Výsledek</p>
                  <p className="mt-1 font-sans text-4xl font-semibold tracking-[-0.04em]">
                    {score} <span className="text-lg font-normal text-muted">/ {test.totalPoints} b.</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-md border border-line-strong px-4 py-2 font-sans text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Zkusit znovu
                </button>
              </div>

              <div className="mt-6 grid gap-x-8 gap-y-3 pt-4 sm:grid-cols-2">
                {byTopic.map((row) => {
                  const topic = getTopicById(row.topicId);
                  return (
                    <div key={row.topicId}>
                      <div className="flex items-baseline justify-between gap-3 font-sans text-sm">
                        <span>{topic?.shortTitle ?? row.topicId}</span>
                        <span className="font-mono text-xs text-muted">
                          {row.earned} / {row.total} b.
                        </span>
                      </div>
                      <div className="mt-1.5 h-0.5 rounded-full bg-line">
                        <div
                          className="h-0.5 rounded-full bg-accent"
                          style={{ width: `${(row.earned / row.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                Nejdřív si projdi témata, kde jsi ztratil body. Pak zkus test
                znovu bez nápovědy. Doporučené další kroky:{" "}
                <Link href={`${subjectPath}/vzorce`} className="link-underline text-accent">
                  vzorce
                </Link>{" "}
                a{" "}
                <Link href={`${subjectPath}/grafy`} className="link-underline text-accent">
                  grafy
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
