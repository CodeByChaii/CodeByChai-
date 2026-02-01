"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function submitSuggestion(formData: FormData) {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const suggestion = formData.get("suggestion") as string;

  if (!suggestion || suggestion.trim().length < 10) {
    return { error: "Please provide a meaningful suggestion (at least 10 characters)" };
  }

  if (!isSupabaseConfigured()) {
    return { error: "Suggestions are not available yet." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("project_suggestions").insert({
    name: name?.trim() || null,
    email: email?.trim() || null,
    suggestion: suggestion.trim(),
  });

  if (error) {
    console.error("Error submitting suggestion:", error);
    return { error: "Failed to submit suggestion. Please try again." };
  }

  return { success: true };
}

export async function getPendingSuggestions() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_suggestions")
    .select("*")
    .eq("emailed", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }

  return data || [];
}

export async function markSuggestionsEmailed(ids: string[]) {
  if (!isSupabaseConfigured()) return;
  const supabase = await createClient();

  const { error } = await supabase
    .from("project_suggestions")
    .update({ emailed: true })
    .in("id", ids);

  if (error) {
    console.error("Error marking suggestions as emailed:", error);
  }
}
