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
      className="py-20 px-4"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="contact-heading"
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--foreground)" }}
        >
          Contact
        </h2>
        <p className="mt-6" style={{ color: "var(--muted)" }}>
          Say hi or check out more from <strong style={{ color: "var(--accent)" }}>{site.name}</strong>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border px-5 py-2.5 font-medium transition-all hover:border-[color:var(--accent)]"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              backgroundColor: "var(--surface)",
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href={site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border px-5 py-2.5 font-medium transition-all hover:border-[color:var(--accent)]"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              backgroundColor: "var(--surface)",
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            X · @CodeByChai
          </motion.a>
        </div>

        <div className="mt-10 max-w-xl mx-auto text-left">
          <div
            className="rounded-2xl border p-5 shadow-lg"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  Pinned on X
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  @CodeByChai
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Live feed
              </span>
            </div>
            <p className="mt-3 text-base" style={{ color: "var(--foreground)" }}>
              Sharing builds, motion experiments, and build-in-public updates. Peek the feed or follow to catch new releases first.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={site.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                  color: "var(--accent-foreground)",
                  boxShadow: "var(--shadow)",
                }}
              >
                Open on X
              </a>
              <a
                href={site.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  backgroundColor: "var(--surface)",
                }}
              >
                Follow @CodeByChai
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
