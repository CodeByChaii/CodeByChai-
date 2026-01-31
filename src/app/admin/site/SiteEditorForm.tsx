"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteSetting } from "../actions";
import { uploadBannerOrVideo } from "../actions";

type Props = {
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

export function SiteEditorForm({ hero, site, media }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    const form = e.currentTarget;
    const heroTitle = (form.querySelector('[name="hero_title"]') as HTMLInputElement)?.value?.trim();
    const heroSubtitle = (form.querySelector('[name="hero_subtitle"]') as HTMLInputElement)?.value?.trim();
    const siteName = (form.querySelector('[name="site_name"]') as HTMLInputElement)?.value?.trim();
    const fullName = (form.querySelector('[name="full_name"]') as HTMLInputElement)?.value?.trim();
    const tagline = (form.querySelector('[name="tagline"]') as HTMLInputElement)?.value?.trim();
    const heroDescription = (form.querySelector('[name="hero_description"]') as HTMLTextAreaElement)?.value?.trim();
    const url = (form.querySelector('[name="url"]') as HTMLInputElement)?.value?.trim();
    const github = (form.querySelector('[name="github"]') as HTMLInputElement)?.value?.trim();
    const twitter = (form.querySelector('[name="twitter"]') as HTMLInputElement)?.value?.trim();

    const heroRes = await saveSiteSetting("hero", { title: heroTitle, subtitle: heroSubtitle });
    if (!heroRes.ok) {
      setMessage({ type: "error", text: heroRes.message ?? "Failed to save hero" });
      setSaving(false);
      return;
    }
    const siteRes = await saveSiteSetting("site", {
      name: siteName,
      fullName,
      tagline,
      heroDescription,
      url,
      github,
      twitter,
    });
    if (!siteRes.ok) {
      setMessage({ type: "error", text: siteRes.message ?? "Failed to save site" });
      setSaving(false);
      return;
    }

    setMessage({ type: "ok", text: "Saved." });
    setSaving(false);
    router.refresh();
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage(null);
    const { url, error } = await uploadBannerOrVideo("banner", file);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }
    await saveSiteSetting("media", {
      bannerImageUrl: url ?? null,
      heroVideoUrl: media?.heroVideoUrl ?? null,
    });
    setMessage({ type: "ok", text: "Banner uploaded." });
    router.refresh();
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage(null);
    const { url, error } = await uploadBannerOrVideo("video", file);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }
    await saveSiteSetting("media", {
      bannerImageUrl: media?.bannerImageUrl ?? null,
      heroVideoUrl: url ?? null,
    });
    setMessage({ type: "ok", text: "Video uploaded." });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <p className={message.type === "ok" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
          {message.text}
        </p>
      )}

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Hero (top of page)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              name="hero_title"
              type="text"
              defaultValue={hero?.title}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Subtitle</label>
            <input
              name="hero_subtitle"
              type="text"
              defaultValue={hero?.subtitle}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Site info</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Site name (e.g. CodeByChai)</label>
            <input name="site_name" type="text" defaultValue={site?.name} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Full name</label>
            <input name="full_name" type="text" defaultValue={site?.fullName} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tagline</label>
            <input name="tagline" type="text" defaultValue={site?.tagline} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Hero description</label>
            <textarea name="hero_description" rows={3} defaultValue={site?.heroDescription} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Site URL</label>
            <input name="url" type="url" defaultValue={site?.url} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">GitHub URL</label>
            <input name="github" type="url" defaultValue={site?.github} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Twitter / X URL</label>
            <input name="twitter" type="url" defaultValue={site?.twitter} className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Media</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Banner image</label>
            {media?.bannerImageUrl && (
              <p className="text-sm text-zinc-500 mb-1 truncate">{media.bannerImageUrl}</p>
            )}
            <input type="file" accept="image/*" onChange={handleBannerUpload} className="text-sm text-zinc-400" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Hero video (optional)</label>
            {media?.heroVideoUrl && (
              <p className="text-sm text-zinc-500 mb-1 truncate">{media.heroVideoUrl}</p>
            )}
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="text-sm text-zinc-400" />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
