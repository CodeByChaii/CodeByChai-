"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { projects as staticProjects, projectHasLinks } from "@/data/projects";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ProjectCard({ p }: { p: Project }) {
  const hasLinks = projectHasLinks(p);

  return (
    <motion.article
      variants={item}
      className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 overflow-hidden transition hover:border-indigo-500/50 hover:bg-zinc-800"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {p.thumbnail && (
        <div className="relative w-full aspect-video bg-zinc-700/50">
          <Image
            src={p.thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-indigo-500/20 px-3 py-0.5 text-sm text-indigo-300"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-white">{p.name}</h3>
        <p className="mt-2 text-zinc-400">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {p.webUrl && (
            <Link
              href={p.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
            >
              Use on web
            </Link>
          )}
          {p.downloadUrl && (
            <Link
              href={p.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700/50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
            >
              Download
            </Link>
          )}
          {p.repoUrl && (
            <Link
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800"
            >
              Source
            </Link>
          )}
          {!hasLinks && (
            <span className="inline-flex items-center rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-500">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

type Props = { projects: Project[] };

export function ProjectsSection({ projects }: Props) {
  const list = projects ?? staticProjects;
  return (
    <motion.section
      id="projects"
      className="py-20 px-4"
      aria-labelledby="projects-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="projects-heading"
          className="text-3xl font-bold text-white sm:text-4xl text-center mb-12"
        >
          Projects
        </h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {list.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
