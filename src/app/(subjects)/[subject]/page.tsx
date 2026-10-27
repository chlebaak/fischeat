import { notFound } from "next/navigation";
import { SubjectOverview } from "@/components/subject-overview";
import { getSubject } from "@/subjects/registry";

type PageProps = {
  params: Promise<{ subject: string }>;
};

export default async function SubjectPage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  return <SubjectOverview subject={subject} />;
}
