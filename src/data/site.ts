/** Single source of truth for brand and hero copy */
export const SITE = {
  name: "CodeByChai",
  fullName: "Atthachai",
  tagline: "Atthachai · Building useful things with AI",
  heroDescription:
    "Practical, human-friendly software and AI tools. Explore live demos, download desktop builds, and follow the journey from idea to launch.",
  /** Base URL for OG/Twitter (no trailing slash) */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codebychai.dev",
  /** Contact / social */
  github: "https://github.com/CodeByChai",
  twitter: "https://x.com/CodeByChai",
  logoUrl: "https://unavatar.io/x/CodeByChai",
  photoUrl: "https://unavatar.io/x/CodeByChai",
} as const;

export const HERO = {
  title: SITE.name,
  subtitle: SITE.tagline,
} as const;
