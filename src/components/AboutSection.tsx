"use client";

import { motion } from "motion/react";
import { SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = { site?: SiteSettingsMap["site"] };

export function AboutSection({ site: siteProp }: Props = {}) {
  const site = siteProp ?? SITE;
  return (
    <motion.section
      id="about"
      className="py-20 px-4 bg-zinc-900/50"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">About</h2>
        <p className="mt-6 text-lg text-zinc-300 leading-relaxed">
          Hi, I&apos;m <strong className="text-indigo-300">{site.fullName}</strong> — you can call me{" "}
          <strong className="text-indigo-300">{site.name}</strong>. I build small apps and tools by
          vibe coding: experimenting, learning, and shipping. This portfolio collects projects you
          can try in the browser or download and run yourself.
        </p>
      </div>
    </motion.section>
  );
}
