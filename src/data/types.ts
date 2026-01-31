export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  /** Optional quick bullets to surface key points */
  highlights?: string[];
  /** Short sentence on how/why it was built */
  buildNote?: string;
  /** Use on web (live demo URL) */
  webUrl?: string;
  /** Download (APK, ZIP, or release URL) */
  downloadUrl?: string;
  /** Source code */
  repoUrl?: string;
  /** Optional thumbnail image URL (relative or absolute) */
  thumbnail?: string;
  /** Auto-generated logo (stored as thumbnail) */
  logoUrl?: string;
  /** Flutter, Remotion, etc. */
  stack?: string;
};

/** True if project has at least one action link */
export function projectHasLinks(p: Project): boolean {
  return Boolean(p.webUrl || p.downloadUrl || p.repoUrl);
}
