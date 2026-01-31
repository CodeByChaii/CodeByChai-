import { getSiteSettings } from "@/lib/db/site-settings";
import { SiteEditorForm } from "./SiteEditorForm";

export default async function AdminSitePage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Site & hero</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Edit hero text, tagline, and upload a banner image or hero video. Changes appear on the home page.
      </p>
      <SiteEditorForm
        hero={settings.hero}
        site={settings.site}
        media={settings.media}
      />
    </div>
  );
}
