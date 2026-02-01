"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { HERO, SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = {
  hero?: SiteSettingsMap["hero"];
  site?: SiteSettingsMap["site"];
};

const stagger = 0.12;

// Simple HTML/CSS/JS demo typing loop
const CODE_LINES = [
  { text: "<!DOCTYPE html>", color: "#c678dd" },
  { text: "<html>", color: "#c678dd" },
  { text: "  <head>", color: "#c678dd" },
  { text: "    <style>", color: "#c678dd" },
  { text: "      body { font-family: Arial; }", color: "#98c379" },
  { text: "    </style>", color: "#c678dd" },
  { text: "  </head>", color: "#c678dd" },
  { text: "  <body>", color: "#c678dd" },
  { text: "    <h1>Hello, World!</h1>", color: "#e5c07b" },
  { text: "    <script>", color: "#c678dd" },
  { text: "      console.log('Hello, World!');", color: "#61afef" },
  { text: "    </script>", color: "#c678dd" },
  { text: "  </body>", color: "#c678dd" },
  { text: "</html>", color: "#c678dd" },
];

export function HeroSection({ hero: heroProp, site: siteProp }: Props = {}) {
  const hero = heroProp ?? HERO;
  const site = siteProp ?? SITE;
  const prefersReducedMotion = useReducedMotion();
  const [startTyping, setStartTyping] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>(Array(CODE_LINES.length).fill(""));

  useEffect(() => {
    // Start typing animation after component mounts
    const timer = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    const currentLine = CODE_LINES[lineIndex];
    const isLineComplete = charIndex >= currentLine.text.length;

    const delay = isLineComplete ? 650 : 45;
    const timer = setTimeout(() => {
      if (!isLineComplete) {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.text.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((c) => c + 1);
        return;
      }

      if (lineIndex < CODE_LINES.length - 1) {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        return;
      }

      // Loop after a short pause
      setTimeout(() => {
        setDisplayedLines(Array(CODE_LINES.length).fill(""));
        setLineIndex(0);
        setCharIndex(0);
      }, 900);
    }, delay);

    return () => clearTimeout(timer);
  }, [startTyping, lineIndex, charIndex]);

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
            transform: `perspective(900px) rotateX(${tiltX.get()}deg) rotateY(${tiltY.get()}deg)`,
          }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: stagger * 2 }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 30% 20%, rgba(125, 211, 252, 0.18), transparent 45%),
                radial-gradient(circle at 80% 20%, rgba(255, 123, 215, 0.18), transparent 45%),
                radial-gradient(circle at 50% 80%, rgba(167, 139, 250, 0.18), transparent 45%)`,
              transform: `translate3d(${orbX.get()}px, ${orbY.get()}px, 0)`,
            }}
          />

          <div className="relative">
            <div
              className="flex items-center gap-2 border-b px-4 py-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f56" }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#27c93f" }} />
              </div>
              <span className="ml-2 text-sm font-mono" style={{ color: "var(--muted)" }}>index.html</span>
            </div>

            <div className="p-4 min-h-[220px]">
              {CODE_LINES.map((line, i) => {
                const isActiveLine = startTyping && i === lineIndex;
                const isLineComplete = displayedLines[i].length >= line.text.length;
                return (
                  <div key={`${line.text}-${i}`} className="font-mono text-sm leading-relaxed">
                    <span style={{ color: line.color }}>{displayedLines[i]}</span>
                    {isActiveLine && !isLineComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{ color: "var(--accent)" }}
                      >
                        ▮
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
