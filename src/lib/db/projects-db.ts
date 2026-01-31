import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/data/types";

type ProjectRow = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  web_url: string | null;
  download_url: string | null;
  repo_url: string | null;
  thumbnail_url: string | null;
  stack: string | null;
  sort_order: number;
};

function rowToProject(r: ProjectRow): Project {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    tech: r.tech ?? [],
    webUrl: r.web_url ?? undefined,
    downloadUrl: r.download_url ?? undefined,
    repoUrl: r.repo_url ?? undefined,
    thumbnail: r.thumbnail_url ?? undefined,
    stack: r.stack ?? undefined,
  };
}

export async function getProjectsFromDb(): Promise<Project[] | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return null;
  return (data as ProjectRow[]).map(rowToProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
  if (error || !data) return null;
  return rowToProject(data as ProjectRow);
}

export async function createProject(project: {
  name: string;
  description: string;
  tech: string[];
  web_url?: string | null;
  download_url?: string | null;
  repo_url?: string | null;
  thumbnail_url?: string | null;
  stack?: string | null;
}): Promise<{ id: string | null; error: Error | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { id: null, error: new Error("Supabase not configured") };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...project,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) return { id: null, error: new Error(error.message) };
  return { id: data?.id ?? null, error: null };
}

export async function updateProject(
  id: string,
  project: Partial<{
    name: string;
    description: string;
    tech: string[];
    web_url: string | null;
    download_url: string | null;
    repo_url: string | null;
    thumbnail_url: string | null;
    stack: string | null;
    sort_order: number;
  }>
): Promise<{ error: Error | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: new Error("Supabase not configured") };
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error ? new Error(error.message) : null };
}

export async function deleteProject(id: string): Promise<{ error: Error | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: new Error("Supabase not configured") };
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}
