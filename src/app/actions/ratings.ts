"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getRatings(projectId: string) {
  if (!isSupabaseConfigured()) return { up: 0, down: 0 };
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_ratings")
    .select("rating")
    .eq("project_id", projectId);

  if (error) {
    console.error("Error fetching ratings:", error);
    return { up: 0, down: 0 };
  }

  const up = data.filter((r) => r.rating === "up").length;
  const down = data.filter((r) => r.rating === "down").length;

  return { up, down };
}

export async function getUserRating(projectId: string, fingerprint: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_ratings")
    .select("rating")
    .eq("project_id", projectId)
    .eq("user_fingerprint", fingerprint)
    .single();

  if (error || !data) {
    return null;
  }

  return data.rating as "up" | "down";
}

export async function submitRating(projectId: string, rating: "up" | "down", fingerprint: string) {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };
  const supabase = await createClient();

  // Insert a new rating each time (allow multiple votes)
  const { error } = await supabase
    .from("project_ratings")
    .insert({
      project_id: projectId,
      rating,
      user_fingerprint: fingerprint,
    });

  if (error) {
    console.error("Error submitting rating:", error);
    return { error: "Failed to submit rating" };
  }

  return { success: true };
}

export async function removeRating(projectId: string, fingerprint: string) {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };
  const supabase = await createClient();

  const { error } = await supabase
    .from("project_ratings")
    .delete()
    .eq("project_id", projectId)
    .eq("user_fingerprint", fingerprint);

  if (error) {
    console.error("Error removing rating:", error);
    return { error: "Failed to remove rating" };
  }

  return { success: true };
}
