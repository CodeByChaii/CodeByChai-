import type { Project } from "./types";

export type { Project } from "./types";
export { projectHasLinks } from "./types";

export const projects: Project[] = [
  {
    id: "sample-flutter",
    name: "Sample Flutter App",
    description:
      "A cross-platform app built with Flutter. Vibe coded for learning.",
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
