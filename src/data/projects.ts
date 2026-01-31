import type { Project } from "./types";

export type { Project } from "./types";
export { projectHasLinks } from "./types";

export const projects: Project[] = [
  {
    id: "screenrec-live",
    name: "CodeByChai | Record",
    description:
      "Minimal screen capture tool with instant in-browser recording, inline preview, and WebM downloads. Desktop build included for offline use.",
    highlights: [
      "Record any screen",
      "Nothing online — local save",
      "Timelapse feature",
    ],
    buildNote: "Built in-browser with MediaRecorder for zero-cloud capture, with desktop zip for offline recording.",
    tech: ["Web", "MediaRecorder", "TypeScript"],
    webUrl: "/projects/screenrec",
    downloadUrl: "https://codebychai.com/downloads/screenrec.zip",
    stack: "Capture",
  },
  {
    id: "x-auto-poster",
    name: "X Auto Poster",
    description: "Coming soon — automated posting for X (Twitter).",
    highlights: [
      "Schedule posts",
      "Auto-publish threads",
      "Analytics dashboard",
    ],
    buildNote: "Building with X API v2, Next.js, and Supabase for scheduled posting and analytics.",
    tech: ["Next.js", "X API", "TypeScript"],
    stack: "Social",
  },
  {
    id: "suggest-project",
    name: "Request a Project",
    description: "Have an idea? Tell me what you'd like to see built next.",
    tech: ["Community"],
    webUrl: "#suggest",
    stack: "Ideas",
  },
];
