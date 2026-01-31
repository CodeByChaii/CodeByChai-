export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  /** Use on web (live demo URL) */
  webUrl?: string;
  /** Download (APK, ZIP, or release URL) */
  downloadUrl?: string;
  /** Source code */
  repoUrl?: string;
  /** Optional thumbnail image URL (relative or absolute) */
  thumbnail?: string;
  /** Flutter, Remotion, etc. */
  stack?: string;
};

/** True if project has at least one action link */
export function projectHasLinks(p: Project): boolean {
  return Boolean(p.webUrl || p.downloadUrl || p.repoUrl);
}
