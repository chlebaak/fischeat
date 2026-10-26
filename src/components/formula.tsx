import katex from "katex";

export function Formula({
  latex,
  display = true,
}: {
  latex: string;
  display?: boolean;
}) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    output: "htmlAndMathml",
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
