"use client";

import { useRouter } from "next/navigation";
import { deleteProjectAction } from "../actions";

export function DeleteProjectButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${name}"?`)) return;
    const res = await deleteProjectAction(id);
    if (res.ok) router.refresh();
    else alert(res.message ?? "Failed to delete");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-red-800/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
    >
      Delete
    </button>
  );
}
