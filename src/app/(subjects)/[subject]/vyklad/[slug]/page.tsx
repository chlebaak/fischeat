import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicArticle } from "@/components/topic-article";
import { getPublishedSubjects, getSubject } from "@/subjects/registry";

type PageProps = {
  params: Promise<{ subject: string; slug: string }>;
};

export async function generateStaticParams() {
  const subjects = await getPublishedSubjects();

  return subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      subject: subject.meta.slug,
      slug: topic.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject: subjectSlug, slug } = await params;
  const subject = await getSubject(subjectSlug);
  const topic = subject?.topics.find((item) => item.slug === slug);

  if (!subject || !topic) {
    return { title: "Téma nenalezeno" };
  }

  return {
    title: `${topic.number}. ${topic.shortTitle}`,
    description: topic.intro,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { subject: subjectSlug, slug } = await params;
  const subject = await getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  const topic = subject.topics.find((item) => item.slug === slug);

  if (!topic) {
    notFound();
  }

  return <TopicArticle topic={topic} subject={subject} />;
}
