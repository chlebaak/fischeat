import katex from "katex";

const tokenPattern = /(\*\*[^*]+\*\*|\$[^$]+\$)/g;

function InlineMath({ latex }: { latex: string }) {
  const html = katex.renderToString(latex, {
    displayMode: false,
    throwOnError: false,
    strict: false,
    output: "htmlAndMathml",
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(tokenPattern).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} latex={part.slice(1, -1)} />;
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
