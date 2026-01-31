"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = { site?: SiteSettingsMap["site"] };

export function AboutSection({ site: siteProp }: Props = {}) {
  const site = siteProp ?? SITE;
  const photo = site.photoUrl ?? site.logoUrl ?? "https://unavatar.io/x/CodeByChai";
  return (
    <motion.section
      id="about"
      className="py-20 px-4"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="flex justify-center">
          <div
            className="relative h-64 w-64 overflow-hidden rounded-full border shadow-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            style={{
              borderColor: "var(--border)",
              background: "radial-gradient(circle at 30% 30%, var(--accent-soft), transparent 55%)",
              boxShadow: "var(--shadow)",
            }}
          >
            <Image
              src={photo}
              alt={`${site.fullName} portrait`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 320px"
              priority
            />
          </div>
        </div>
        <div className="text-left space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--foreground)" }}>
            About
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Hi, I&apos;m <strong style={{ color: "var(--accent)" }}>{site.fullName}</strong> — you can call me {" "}
            <strong style={{ color: "var(--accent)" }}>{site.name}</strong>. I build small apps and tools that mix
            experimenting, learning, and shipping. This portfolio collects projects you can try in the browser or
            download and run yourself.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Product builder",
              "Motion + Remotion",
              "Learning in public",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl border p-5 shadow-lg"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Snapshot
              </p>
              <ul className="mt-3 space-y-2 text-base" style={{ color: "var(--foreground)" }}>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent)" }}>-</span>
                  Shipping small, playful builds weekly.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent)" }}>-</span>
                  Blending motion, video, and DX experiments.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent)" }}>-</span>
                  Prefers browser-first tools you can remix.
                </li>
              </ul>
            </div>

            <div
              className="rounded-2xl border p-5 shadow-lg"
              style={{
                borderColor: "var(--border)",
                background: "linear-gradient(135deg, var(--card) 0%, var(--accent-soft) 120%)",
                boxShadow: "var(--shadow)",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                What I care about
              </p>
              <ul className="mt-3 space-y-2 text-base" style={{ color: "var(--foreground)" }}>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent-strong)" }}>-</span>
                  Crisp UX that invites play and learning.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent-strong)" }}>-</span>
                  Clear naming, fast onboarding, no fluff.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden style={{ color: "var(--accent-strong)" }}>-</span>
                  Honest build-in-public notes and changelogs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
