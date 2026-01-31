import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db/projects-db";
import { ProjectForm } from "../../ProjectForm";

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
