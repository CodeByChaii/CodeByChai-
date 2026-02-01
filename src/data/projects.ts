import type { Project } from "./types";

export type { Project } from "./types";
export { projectHasLinks } from "./types";

export const projects: Project[] = [
  {
    id: "code-by-fang",
    name: "Code By Fang",
    description:
      "AI-powered code editor with local multi-agent AI. Features 6 AI modes (Agent, Ask, Plan, Photo, Video, WebSearch), Monaco editor, vision-to-code, and multimedia generation - all running 100% locally with no cloud dependencies.",
    highlights: [
      "Multi-agent AI system with Solo and Team modes",
      "6 AI modes: coding, planning, image, video, web search",
      "100% local - no cloud, no API costs, full privacy",
      "Supports 3D generation, TTS, music, and avatars",
      "100% test coverage - production ready",
    ],
    buildNote:
      "Built as a free, open-source alternative to Cursor and VS Code with comprehensive local AI capabilities.",
    tech: ["Electron", "React", "TypeScript", "Monaco Editor", "Python", "Ollama", "Webpack", "Zustand"],
    stack: "Desktop",
    thumbnail: "/images/code-by-fang-preview.svg",
    logoUrl: "https://unavatar.io/x/CodeByChai",
  },
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
    logoUrl: "https://unavatar.io/x/CodeByChai",
    thumbnail: "/images/record-preview.svg",
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
    logoUrl: "https://unavatar.io/x/CodeByChai",
    thumbnail: "/images/x-auto-poster-preview.svg",
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
