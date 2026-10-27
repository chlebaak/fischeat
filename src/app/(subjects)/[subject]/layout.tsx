import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectShell } from "@/components/subject-shell";
import { getSubject } from "@/subjects/registry";
import { publishedSubjectSummaries } from "@/subjects/summaries";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ subject: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedSubjectSummaries.map((subject) => ({
    subject: subject.slug,
  }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    return { title: "Předmět nenalezen" };
  }

  return {
    title: {
      default: subject.meta.title,
      template: `%s · ${subject.meta.shortTitle}`,
    },
    description: subject.meta.description,
  };
}

export default async function SubjectLayout({
  children,
  params,
}: LayoutProps) {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  return <SubjectShell subject={subject}>{children}</SubjectShell>;
}
