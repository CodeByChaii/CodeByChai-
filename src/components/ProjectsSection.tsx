"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import React, { useMemo, useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const logo = useMemo(() => p.logoUrl || p.thumbnail || null, [p.logoUrl, p.thumbnail]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      variants={item}
      className="rounded-2xl overflow-hidden transition shadow-lg border h-full"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        borderWidth: 1,
        boxShadow: "var(--shadow)",
        transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
    >
      <div className="p-6 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--accent)" }}
          >
            {logo ? (
              <Image src={logo} alt={`${p.name} logo`} fill className="object-cover" sizes="48px" />
            ) : (
              <span className="text-lg font-semibold">{p.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              {p.name}
            </h3>
            {p.stack && (
              <span
                className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ backgroundColor: "var(--surface)", color: "var(--muted)", border: `1px solid var(--border)` }}
              >
                {p.stack}
              </span>
            )}
          </div>
        </div>

        {p.description && <p style={{ color: "var(--muted)" }}>{p.description}</p>}

        {p.highlights && p.highlights.length > 0 && (
          <ul className="space-y-2 text-sm" style={{ color: "var(--foreground)" }}>
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  -
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {p.buildNote && (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {p.buildNote}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-3">
            {p.webUrl && (
              <Link
                href={p.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
                style={{
                  background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                  color: "var(--accent-foreground)",
                  boxShadow: "var(--shadow)",
                }}
              >
                Use on web
              </Link>
            )}
            {p.downloadUrl && (
              <Link
                href={p.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  backgroundColor: "var(--surface)",
                }}
              >
                Download
              </Link>
            )}
            {p.repoUrl && (
              <Link
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                  backgroundColor: "var(--surface)",
                }}
              >
                Source
              </Link>
            )}
            {!hasLinks && (
              <span
                className="inline-flex items-center rounded-full border border-dashed px-4 py-2 text-sm"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Coming soon
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              Was this useful?
            </span>
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  borderColor: feedback === "up" ? "var(--accent)" : "var(--border)",
                  color: feedback === "up" ? "var(--accent)" : "var(--foreground)",
                  backgroundColor: feedback === "up" ? "var(--accent-soft)" : "var(--surface)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={feedback === "up"}
              >
                <span aria-hidden>👍</span>
                Up
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  borderColor: feedback === "down" ? "var(--accent)" : "var(--border)",
                  color: feedback === "down" ? "var(--accent)" : "var(--foreground)",
                  backgroundColor: feedback === "down" ? "var(--accent-soft)" : "var(--surface)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={feedback === "down"}
              >
                <span aria-hidden>👎</span>
                Down
              </motion.button>
            </div>
          </div>
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
          className="text-center text-3xl font-bold sm:text-4xl mb-12"
          style={{ color: "var(--foreground)" }}
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
