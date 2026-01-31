import { createClient } from "@/lib/supabase/server";

export type SiteSettingsMap = {
  hero?: { title: string; subtitle: string };
  site?: {
    name: string;
    fullName: string;
    tagline: string;
    heroDescription: string;
    url: string;
    github: string;
    twitter: string;
  };
  media?: { bannerImageUrl: string | null; heroVideoUrl: string | null };
};

const defaults: SiteSettingsMap = {
  hero: {
    title: "CodeByChai",
    subtitle: "Atthachai · Vibe coded projects",
  },
  site: {
    name: "CodeByChai",
    fullName: "Atthachai",
    tagline: "Atthachai · Vibe coded projects",
    heroDescription:
      "Coding projects built for fun and learning. Try them on the web or download and run locally.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codebychai.dev",
    github: "https://github.com/CodeByChai",
    twitter: "https://twitter.com/CodeByChai",
  },
  media: { bannerImageUrl: null, heroVideoUrl: null },
};

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return defaults;
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data?.length) return defaults;
  const map: SiteSettingsMap = {};
  for (const row of data) {
    const key = row.key as keyof SiteSettingsMap;
    if (key && row.value) (map as Record<string, unknown>)[key] = row.value;
  }
  return { ...defaults, ...map };
}

export async function updateSiteSetting(
  key: string,
  value: Record<string, unknown>
): Promise<{ error: Error | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: new Error("Supabase not configured") };
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  return { error: error ? new Error(error.message) : null };
}
