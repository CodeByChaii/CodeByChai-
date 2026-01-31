"use client";

import { motion } from "motion/react";
import { SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = { site?: SiteSettingsMap["site"] };

export function ContactSection({ site: siteProp }: Props = {}) {
  const site = siteProp ?? SITE;
  return (
    <motion.section
      id="contact"
      className="py-20 px-4 bg-zinc-900/50"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 id="contact-heading" className="text-3xl font-bold text-white sm:text-4xl">
          Contact
        </h2>
        <p className="mt-6 text-zinc-400">
          Say hi or check out more from <strong className="text-indigo-300">{site.name}</strong>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-600 px-5 py-2.5 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href={site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-600 px-5 py-2.5 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            X / Twitter
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
