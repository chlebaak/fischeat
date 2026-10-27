import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicList } from "@/components/topic-list";
import { getSubject } from "@/subjects/registry";

type PageProps = {
  params: Promise<{ subject: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  return {
    title: "Výklad",
    description: subject
      ? `Výklad k předmětu ${subject.meta.shortTitle}.`
      : "Výklad k předmětu.",
  };
}

export default async function VykladPage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  return (
    <div className="container-page">
      <header className="container-prose pb-10 pt-16 sm:pt-24">
        <p className="font-sans text-sm text-muted">
          Výklad · {subject.topics.length} témat
        </p>
        <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem]">
          Výklad
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[1.06rem] leading-[1.7] text-ink/80">
          Projdi témata v pořadí. Každá kapitola má výklad, vzorce, příklady a
          grafy přímo v textu. Na konci najdeš shrnutí a odkazy na procvičení.
        </p>
      </header>

      <div className="container-prose">
        <TopicList subjectSlug={subject.meta.slug} topics={subject.topics} />
      </div>
    </div>
  );
}
