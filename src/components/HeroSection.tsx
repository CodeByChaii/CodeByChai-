"use client";

import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { HERO, SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = {
  hero?: SiteSettingsMap["hero"];
  site?: SiteSettingsMap["site"];
};

const stagger = 0.12;
const floatTransition = { repeat: Infinity, duration: 6, ease: "easeInOut" as const };

export function HeroSection({ hero: heroProp, site: siteProp }: Props = {}) {
  const hero = heroProp ?? HERO;
  const site = siteProp ?? SITE;
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.8 });
  const orbX = useTransform(springX, (v) => v / 6);
  const orbY = useTransform(springY, (v) => v / 6);
  const tiltX = useTransform(springY, (v) => v / 12);
  const tiltY = useTransform(springX, (v) => v / 12);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX * 40);
    y.set(relativeY * 40);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative overflow-hidden text-[color:var(--foreground)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, var(--gradient-start) 0%, var(--gradient-mid) 50%, var(--gradient-end) 100%)",
        }}
      />
      {/* Subtle parallax / floating orbs (antigravity feel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl -top-32 -left-32"
          style={{ backgroundColor: "var(--orb-pink)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ ...floatTransition, duration: 8 }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl top-1/2 -right-24"
          style={{ backgroundColor: "var(--orb-violet)" }}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ ...floatTransition, duration: 7 }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full blur-3xl bottom-10 left-1/2"
          style={{ backgroundColor: "var(--orb-aqua)" }}
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ ...floatTransition, duration: 9 }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl"
            style={{ color: "var(--accent-strong)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stagger, ease: "easeOut" }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.p
            className="max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stagger * 2, ease: "easeOut" }}
          >
            {site.heroDescription}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stagger * 3, ease: "easeOut" }}
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-all"
              style={{
                background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                color: "var(--accent-foreground)",
                boxShadow: "var(--shadow)",
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View projects
            </motion.a>
            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:border-[color:var(--accent)]"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              About the work
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border p-1 shadow-2xl"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--glass)",
            boxShadow: "var(--shadow)",
          }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <motion.div
            className="relative overflow-hidden rounded-xl px-6 py-8"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, var(--orb-pink), transparent 45%), radial-gradient(circle at 80% 30%, var(--orb-aqua), transparent 45%), radial-gradient(circle at 60% 80%, var(--orb-violet), transparent 45%)",
              transformStyle: "preserve-3d",
              transform: "perspective(1200px)",
              x: prefersReducedMotion ? 0 : orbX,
              y: prefersReducedMotion ? 0 : orbY,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0))",
                mixBlendMode: "screen",
              }}
            />
            <motion.div
              className="relative space-y-3"
              style={{
                rotateX: prefersReducedMotion ? 0 : tiltX,
                rotateY: prefersReducedMotion ? 0 : tiltY,
              }}
            >
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                Playground of small builds
              </p>
              <h3 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                Micro demos, orbs, and Remotion badges
              </h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Hover to stir the orbs. Built with Motion and Remotion, tuned for the new palette.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Motion", "Remotion", "Flutter", "Edge"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
