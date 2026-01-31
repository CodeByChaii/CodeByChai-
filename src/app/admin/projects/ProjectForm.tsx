"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/types";
import { createProject, updateProjectAction } from "../actions";

type Props = { project?: Project };

export function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = project
      ? await updateProjectAction(project.id, formData)
      : await createProject(formData);

    setSaving(false);
    if (!res.ok) {
      setMessage({ type: "error", text: res.message ?? "Failed to save" });
      return;
    }
    setMessage({ type: "ok", text: project ? "Saved." : "Project added." });
    router.refresh();
    if (!project && "id" in res && res.id) {
      router.push(`/admin/projects/${res.id}/edit`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <p className={message.type === "ok" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
          {message.text}
        </p>
      )}

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Name *</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={project?.name}
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={project?.description}
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Tech (comma-separated)</label>
        <input
          name="tech"
          type="text"
          defaultValue={project?.tech?.join(", ")}
          placeholder="Flutter, Dart, React"
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Use on web URL</label>
        <input
          name="web_url"
          type="url"
          defaultValue={project?.webUrl ?? ""}
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Download URL (or upload ZIP below)</label>
        <input
          name="download_url"
          type="url"
          defaultValue={project?.downloadUrl ?? ""}
          placeholder="Leave empty and upload a ZIP instead"
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Upload project ZIP (for download)</label>
        <input name="zip" type="file" accept=".zip" className="text-sm text-zinc-400" />
        {project?.downloadUrl && (
          <p className="text-xs text-zinc-500 mt-1 truncate">Current: {project.downloadUrl}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Source / repo URL</label>
        <input
          name="repo_url"
          type="url"
          defaultValue={project?.repoUrl ?? ""}
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Thumbnail image</label>
        <input name="thumbnail" type="file" accept="image/*" className="text-sm text-zinc-400" />
        {project?.thumbnail && (
          <p className="text-xs text-zinc-500 mt-1 truncate">Current: {project.thumbnail}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Stack (e.g. Flutter)</label>
        <input
          name="stack"
          type="text"
          defaultValue={project?.stack ?? ""}
          className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {saving ? "Saving…" : project ? "Save" : "Add project"}
        </button>
        <Link
          href="/admin/projects"
          className="rounded-lg border border-zinc-600 px-4 py-2 text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
