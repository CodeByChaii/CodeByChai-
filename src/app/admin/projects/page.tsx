import Link from "next/link";
import { getProjectsFromDb } from "@/lib/db/projects-db";
import { DeleteProjectButton } from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await getProjectsFromDb();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Add project
        </Link>
      </div>
      <p className="text-zinc-400 text-sm mb-8">
        Add or edit projects. Upload a ZIP so visitors can download the project files.
      </p>
      {!projects?.length ? (
        <p className="text-zinc-500">No projects yet. Add one above.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-800/50 p-4"
            >
              <div>
                <h2 className="font-semibold text-white">{p.name}</h2>
                <p className="text-sm text-zinc-400 truncate max-w-md">{p.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="rounded-lg border border-zinc-600 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={p.id} name={p.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
