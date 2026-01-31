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
    <section className="relative overflow-hidden text-[color:var(--foreground)]" style={{ backgroundColor: "var(--background)" }}>
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
        </div>

        <motion.div
          className="relative overflow-hidden rounded-xl border shadow-2xl"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
            boxShadow: "var(--shadow)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: stagger * 2 }}
        >
          {/* VS Code-style header */}
          <div className="flex items-center gap-2 border-b px-4 py-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f56" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#27c93f" }} />
            </div>
            <span className="ml-2 text-sm font-mono" style={{ color: "var(--muted)" }}>screen-recorder.ts</span>
          </div>
          
          {/* Code editor content */}
          <div className="p-4 font-mono text-sm leading-relaxed">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span style={{ color: "#c678dd" }}>async</span>{" "}
              <span style={{ color: "#c678dd" }}>function</span>{" "}
              <span style={{ color: "#61afef" }}>startRecording</span>
              <span style={{ color: "#abb2bf" }}>()</span>{" "}
              <span style={{ color: "#abb2bf" }}>{"{"}</span>
            </motion.div>
            <motion.div
              className="pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <span style={{ color: "#c678dd" }}>const</span>{" "}
              <span style={{ color: "#e06c75" }}>stream</span>{" "}
              <span style={{ color: "#56b6c2" }}>=</span>{" "}
              <span style={{ color: "#c678dd" }}>await</span>{" "}
              <span style={{ color: "#e5c07b" }}>navigator</span>
              <span style={{ color: "#abb2bf" }}>.</span>
              <span style={{ color: "#e5c07b" }}>mediaDevices</span>
            </motion.div>
            <motion.div
              className="pl-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <span style={{ color: "#abb2bf" }}>.</span>
              <span style={{ color: "#61afef" }}>getDisplayMedia</span>
              <span style={{ color: "#abb2bf" }}>({"{ "}video</span>
              <span style={{ color: "#56b6c2" }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>true</span>{" "}
              <span style={{ color: "#abb2bf" }}>{"});"}</span>
            </motion.div>
            <motion.div
              className="pl-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <span style={{ color: "#c678dd" }}>const</span>{" "}
              <span style={{ color: "#e06c75" }}>recorder</span>{" "}
              <span style={{ color: "#56b6c2" }}>=</span>{" "}
              <span style={{ color: "#c678dd" }}>new</span>{" "}
              <span style={{ color: "#e5c07b" }}>MediaRecorder</span>
              <span style={{ color: "#abb2bf" }}>(</span>
              <span style={{ color: "#e06c75" }}>stream</span>
              <span style={{ color: "#abb2bf" }}>);</span>
            </motion.div>
            <motion.div
              className="pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
            >
              <span style={{ color: "#e06c75" }}>recorder</span>
              <span style={{ color: "#abb2bf" }}>.</span>
              <span style={{ color: "#61afef" }}>start</span>
              <span style={{ color: "#abb2bf" }}>();</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            >
              <span style={{ color: "#abb2bf" }}>{"}"}</span>
            </motion.div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.7 }}
            >
              <span style={{ color: "#5c6370" }}>// Recording screen...</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: "var(--accent)" }}
              >
                ▮
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
