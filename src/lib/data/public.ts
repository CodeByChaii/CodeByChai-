import { getProjectsFromDb } from "@/lib/db/projects-db";
import { projects as staticProjects } from "@/data/projects";

/** Projects from DB if Supabase is configured, else static list. */
export async function getProjects() {
  const fromDb = await getProjectsFromDb();
  return fromDb ?? staticProjects;
}
