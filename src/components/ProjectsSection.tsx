"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import React, { useMemo, useState, useEffect } from "react";
import type { Project } from "@/data/projects";
import { projects as staticProjects, projectHasLinks } from "@/data/projects";
import { SuggestionForm } from "./SuggestionForm";
import { getRatings, getUserRating, submitRating, removeRating } from "@/app/actions/ratings";

// Generate a simple browser fingerprint
function getBrowserFingerprint() {
  if (typeof window === "undefined") return "";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("fingerprint", 2, 15);
  }
  const fingerprint = canvas.toDataURL();
  return fingerprint.slice(-50); // Use last 50 chars as fingerprint
}

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

function ProjectCard({ p, fingerprint }: { p: Project; fingerprint: string }) {
  const hasLinks = projectHasLinks(p);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ratings, setRatings] = useState({ up: 0, down: 0 });
  const [isRating, setIsRating] = useState(false);
  const logo = useMemo(() => p.logoUrl || p.thumbnail || null, [p.logoUrl, p.thumbnail]);

  useEffect(() => {
    if (!fingerprint) return;

    // Load ratings
    const loadRatings = async () => {
      try {
        const ratingsData = await getRatings(p.id);
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error loading ratings:", error);
      }
    };

    loadRatings();
  }, [p.id, fingerprint]);

  const handleRating = async (rating: "up" | "down") => {
    if (!fingerprint || isRating) return;

    setIsRating(true);
    const oldRatings = { ...ratings };

    try {
      // Optimistically increment the count
      setRatings(prev => ({
        ...prev,
        [rating]: prev[rating] + 1
      }));
      
      // Submit to server
      await submitRating(p.id, rating, fingerprint);
      
      // Refresh to get accurate count from server
      const newRatings = await getRatings(p.id);
      setRatings(newRatings);
    } catch (error) {
      console.error("Error handling rating:", error);
      // Revert to old state on error
      setRatings(oldRatings);
    } finally {
      setIsRating(false);
    }
  };

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Special handling for suggestion card
  if (p.id === "suggest-project") {
    return (
      <motion.article
        variants={item}
        className="rounded-2xl overflow-hidden transition shadow-lg border h-full"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--accent)",
          borderWidth: 2,
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
              style={{ borderColor: "var(--accent)", backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <span className="text-2xl">💡</span>
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

          <p style={{ color: "var(--muted)" }}>{p.description}</p>

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

          <div className="mt-auto">
            <SuggestionForm />
          </div>
        </div>
      </motion.article>
    );
  }

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
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  backgroundColor: "var(--surface)",
                }}
              >
                Try Now
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

          <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted)" }}>
              Rate this
            </span>
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={() => handleRating("up")}
                disabled={isRating}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  backgroundColor: "var(--surface)",
                  opacity: isRating ? 0.6 : 1,
                  cursor: isRating ? "not-allowed" : "pointer",
                }}
                whileHover={!isRating ? { scale: 1.05 } : {}}
                whileTap={!isRating ? { scale: 0.95 } : {}}
              >
                <span aria-hidden>👍</span>
                <span className="font-mono text-xs">{ratings.up}</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleRating("down")}
                disabled={isRating}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  backgroundColor: "var(--surface)",
                  opacity: isRating ? 0.6 : 1,
                  cursor: isRating ? "not-allowed" : "pointer",
                }}
                whileHover={!isRating ? { scale: 1.05 } : {}}
                whileTap={!isRating ? { scale: 0.95 } : {}}
              >
                <span aria-hidden>👎</span>
                <span className="font-mono text-xs">{ratings.down}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}const [fingerprint, setFingerprint] = useState("");

  useEffect(() => {
    // Generate fingerprint once for all cards
    const fp = getBrowserFingerprint();
    setFingerprint(fp);
  }, []);

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
            <ProjectCard key={p.id} p={p} fingerprint={fingerprint
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
