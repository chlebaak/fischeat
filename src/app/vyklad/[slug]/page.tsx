import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopic, topics } from "@/content/topics";
import { TopicArticle } from "@/components/topic-article";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    return { title: "Téma nenalezeno" };
  }

  return {
    title: `${topic.number}. ${topic.shortTitle}`,
    description: topic.intro,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  return <TopicArticle topic={topic} />;
}
