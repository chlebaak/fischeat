import katex from "katex";

function renderMathParts(text: string, keyPrefix: string) {
  return text
    .split(/(\$[^$]+\$)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const html = katex.renderToString(part.slice(1, -1), {
          displayMode: false,
          throwOnError: false,
          strict: false,
          output: "htmlAndMathml",
        });

        return (
          <span
            key={`${keyPrefix}-math-${index}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    });
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*\*[\s\S]+?\*\*)/g)
        .filter(Boolean)
        .map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={`bold-${index}`}>
                {renderMathParts(part.slice(2, -2), `bold-${index}`)}
              </strong>
            );
          }

          return (
            <span key={`plain-${index}`}>
              {renderMathParts(part, `plain-${index}`)}
            </span>
          );
        })}
    </>
  );
}
