"use server";

import { createClient } from "@/lib/supabase/server";

/** Upload a file to Supabase Storage (bucket: uploads). Returns public URL or null. */
export async function uploadFile(
  path: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = await createClient();
  const buf = Buffer.from(await file.arrayBuffer());
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(path, buf, { contentType: file.type, upsert: true });
  if (error) return { url: null, error: new Error(error.message) };
  const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(data.path);
  return { url: urlData.publicUrl, error: null };
}

/** Delete a file from storage by full URL or path. */
export async function deleteStorageFile(publicUrl: string): Promise<{ error: Error | null }> {
  const supabase = await createClient();
  // Extract path from URL: https://xxx.supabase.co/storage/v1/object/public/uploads/...
  const match = publicUrl.match(/\/uploads\/(.+)$/);
  const path = match ? match[1] : null;
  if (!path) return { error: null };
  const { error } = await supabase.storage.from("uploads").remove([path]);
  return { error: error ? new Error(error.message) : null };
}
