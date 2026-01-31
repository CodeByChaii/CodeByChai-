"use server";

import { revalidatePath } from "next/cache";
import { Buffer } from "node:buffer";
import { updateSiteSetting } from "@/lib/db/site-settings";
import {
  createProject as createProjectDb,
  updateProject as updateProjectDb,
  deleteProject as deleteProjectDb,
} from "@/lib/db/projects-db";
import { uploadFile } from "@/lib/storage/upload";

export async function saveSiteSetting(key: string, value: Record<string, unknown>) {
  const { error } = await updateSiteSetting(key, value);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/site");
  return { ok: true };
}

export async function createProject(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const tech = ((formData.get("tech") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const webUrl = (formData.get("web_url") as string)?.trim() || null;
  const downloadUrl = (formData.get("download_url") as string)?.trim() || null;
  const repoUrl = (formData.get("repo_url") as string)?.trim() || null;
  const stack = (formData.get("stack") as string)?.trim() || null;

  if (!name) return { ok: false, message: "Name is required" };

  const { id, error } = await createProjectDb({
    name,
    description,
    tech,
    web_url: webUrl,
    download_url: downloadUrl,
    repo_url: repoUrl,
    stack,
  });
  if (error) return { ok: false, message: error.message };
  if (!id) return { ok: false, message: "Failed to create" };

  // Handle thumbnail upload
  const thumbFile = formData.get("thumbnail") as File | null;
  if (thumbFile?.size) {
    const ext = thumbFile.name.split(".").pop() ?? "jpg";
    const { url } = await uploadFile(`projects/${id}/thumb.${ext}`, thumbFile);
    if (url) await updateProjectDb(id, { thumbnail_url: url });
  }

   // Auto-generate logo in background if no thumbnail provided
  if (!thumbFile?.size) {
    await generateProjectLogo({ id, name, stack });
  }

  // Handle ZIP upload for download
  const zipFile = formData.get("zip") as File | null;
  if (zipFile?.size) {
    const name = zipFile.name.replace(/\s+/g, "-");
    const { url } = await uploadFile(`projects/${id}/${name}`, zipFile);
    if (url) await updateProjectDb(id, { download_url: url });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { ok: true, id };
}

async function generateProjectLogo({
  id,
  name,
  stack,
}: {
  id: string;
  name: string;
  stack?: string | null;
}) {
  try {
    if (!process.env.OPENAI_API_KEY) return;
    const prompt = `Modern minimal logo with a hand-drawn iPad-style cartoon mascot, vibrant colors, clean background. Project: ${name}${stack ? `, stack: ${stack}` : ""}. No text, centered character.`;
    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1024x1024", style: "vivid", user: `project-${id}` }),
    });
    if (!resp.ok) return;
    const json = (await resp.json()) as { data?: { url?: string }[] };
    const url = json?.data?.[0]?.url;
    if (!url) return;
    const imgResp = await fetch(url);
    if (!imgResp.ok) return;
    const buf = Buffer.from(await imgResp.arrayBuffer());
    const file = new File([buf], "logo.png", { type: "image/png" });
    const upload = await uploadFile(`projects/${id}/logo.png`, file);
    if (upload.url) await updateProjectDb(id, { thumbnail_url: upload.url });
  } catch (err) {
    console.error("logo generation failed", err);
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const tech = ((formData.get("tech") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const webUrl = (formData.get("web_url") as string)?.trim() || null;
  const downloadUrl = (formData.get("download_url") as string)?.trim() || null;
  const repoUrl = (formData.get("repo_url") as string)?.trim() || null;
  const stack = (formData.get("stack") as string)?.trim() || null;

  if (!name) return { ok: false, message: "Name is required" };

  const { error } = await updateProjectDb(id, {
    name,
    description,
    tech,
    web_url: webUrl,
    download_url: downloadUrl,
    repo_url: repoUrl,
    stack,
  });
  if (error) return { ok: false, message: error.message };

  const thumbFile = formData.get("thumbnail") as File | null;
  if (thumbFile?.size) {
    const ext = thumbFile.name.split(".").pop() ?? "jpg";
    const { url } = await uploadFile(`projects/${id}/thumb.${ext}`, thumbFile);
    if (url) await updateProjectDb(id, { thumbnail_url: url });
  }

  const zipFile = formData.get("zip") as File | null;
  if (zipFile?.size) {
    const name = zipFile.name.replace(/\s+/g, "-");
    const { url } = await uploadFile(`projects/${id}/${name}`, zipFile);
    if (url) await updateProjectDb(id, { download_url: url });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}/edit`);
  return { ok: true };
}

export async function deleteProjectAction(id: string) {
  const { error } = await deleteProjectDb(id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { ok: true };
}

export async function uploadBannerOrVideo(
  type: "banner" | "video",
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split(".").pop() ?? (type === "video" ? "mp4" : "jpg");
  const path = `site/${type}.${ext}`;
  const { url, error } = await uploadFile(path, file);
  if (error) return { url: null, error: error.message };
  return { url, error: null };
}
