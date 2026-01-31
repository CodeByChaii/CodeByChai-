import type { Project } from "./types";

export type { Project } from "./types";
export { projectHasLinks } from "./types";

export const projects: Project[] = [
  {
    id: "screenrec-live",
    name: "Record",
    description:
      "Minimal screen capture tool with instant in-browser recording, inline preview, and WebM downloads. Try it live in your browser.",
    highlights: [
      "Record any screen",
      "Nothing online — local save",
      "Timelapse feature",
    ],
    buildNote: "Built in-browser with MediaRecorder for zero-cloud capture and instant playback.",
    tech: ["Web", "MediaRecorder", "TypeScript"],
    webUrl: "/projects/screenrec",
    stack: "Capture",
  },
  {
    id: "x-auto-poster",
    name: "X Auto Poster",
    description: "AI-powered tweet generation for crypto and coding content. Generate engaging posts with OpenAI.",
    highlights: [
      "AI content generation",
      "Crypto & coding topics",
      "Copy or post directly to X",
    ],
    buildNote: "Built with OpenAI API, Next.js, and X API integration for automated social media content.",
    tech: ["Next.js", "OpenAI", "TypeScript"],
    webUrl: "/x-auto-poster",
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
