import Link from "next/link";
import { getSiteSettings } from "@/lib/db/site-settings";
import { getProjectsFromDb } from "@/lib/db/projects-db";

export default async function AdminDashboardPage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjectsFromDb(),
  ]);
  const projectCount = projects?.length ?? 0;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Link
          href="/admin/site"
          className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 hover:border-indigo-500/50 transition"
        >
          <h2 className="font-semibold text-white mb-1">Site & hero</h2>
          <p className="text-sm text-zinc-400">
            Hero title: {settings.hero?.title ?? "—"} · Edit banner and video
          </p>
        </Link>
        <Link
          href="/admin/projects"
          className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 hover:border-indigo-500/50 transition"
        >
          <h2 className="font-semibold text-white mb-1">Projects</h2>
          <p className="text-sm text-zinc-400">
            {projectCount} project{projectCount !== 1 ? "s" : ""} · Add, edit, upload ZIPs
          </p>
        </Link>
      </div>
      <p className="text-zinc-500 text-sm">
        Use the sidebar to edit site content (hero, banner, video) or manage projects. You can upload a ZIP for each project so visitors can download it.
      </p>
    </div>
  );
}
