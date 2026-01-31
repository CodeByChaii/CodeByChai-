"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { HeroComposition } from "../../remotion/Composition";
import { HERO, SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

const Player = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

type Props = {
  hero?: SiteSettingsMap["hero"];
  site?: SiteSettingsMap["site"];
};

const stagger = 0.12;
const floatTransition = { repeat: Infinity, duration: 6, ease: "easeInOut" as const };

export function HeroSection({ hero: heroProp, site: siteProp }: Props = {}) {
  const hero = heroProp ?? HERO;
  const site = siteProp ?? SITE;
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoadPlayer(true);
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#0f0f23] text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0d0d1a]" />
      {/* Subtle parallax / floating orbs (antigravity feel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl -top-32 -left-32"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ ...floatTransition, duration: 8 }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-purple-500/10 blur-3xl top-1/2 -right-24"
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ ...floatTransition, duration: 7 }}
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <motion.h1
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-indigo-200 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stagger, ease: "easeOut" }}
        >
          {hero.subtitle}
        </motion.p>
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-base text-zinc-400"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stagger * 2, ease: "easeOut" }}
        >
          {site.heroDescription}
        </motion.p>
      </div>
      <motion.div
        className="relative z-10 mt-12 w-full max-w-4xl px-4 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: stagger * 3, ease: "easeOut" }}
      >
        {shouldLoadPlayer ? (
          <Player
            component={HeroComposition as ComponentType<Record<string, unknown>>}
            inputProps={{ title: hero.title, subtitle: hero.subtitle }}
            durationInFrames={90}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            style={{ width: "100%", aspectRatio: "16/9" }}
            controls
            loop
          />
        ) : (
          <div
            className="w-full bg-zinc-800/50 rounded-lg flex items-center justify-center text-zinc-500"
            style={{ aspectRatio: "16/9" }}
          >
            Loading…
          </div>
        )}
      </motion.div>
    </section>
  );
}
