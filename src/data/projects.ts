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
    id: "sample-flutter",
    name: "Sample Flutter App",
    description:
      "A cross-platform app built with Flutter for learning and experimenting.",
    tech: ["Flutter", "Dart"],
    webUrl: "https://flutter.dev",
    repoUrl: "https://github.com",
    stack: "Flutter",
  },
  {
    id: "sample-remotion",
    name: "Remotion Video",
    description:
      "Programmatic video composition with React and Remotion.",
    tech: ["Remotion", "React", "TypeScript"],
    webUrl: "#",
    repoUrl: "https://github.com",
    stack: "Remotion",
  },
  {
    id: "sample-download",
    name: "Downloadable Project",
    description:
      "Desktop or mobile build — download and run locally.",
    tech: ["TypeScript", "Node"],
    downloadUrl: "#",
    repoUrl: "https://github.com",
  },
  {
    id: "coming-soon",
    name: "Secret Project",
    description: "Something cool in the works. No links yet.",
    tech: ["TBD"],
  },
];
