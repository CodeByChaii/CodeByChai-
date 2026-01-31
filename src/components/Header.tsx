"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";
import { ThemeToggle } from "./ThemeToggle";

type Props = { site?: SiteSettingsMap["site"] };

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const linkClass =
  "rounded px-1 py-0.5 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] focus-visible:text-[color:var(--foreground)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]";

export function Header({ site: siteProp }: Props = {}) {
  const site = siteProp ?? SITE;
  const avatarUrl = site.logoUrl ?? "https://unavatar.io/x/CodeByChai";
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--glass)",
      }}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="relative h-12 w-12 overflow-hidden rounded-full border"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <Image
              src={avatarUrl}
              alt={`${site.name} avatar`}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </span>
          <span className="text-xl font-semibold">{site.name}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex gap-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded p-2 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t transition-[height] duration-200 ${
          menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${linkClass} py-2`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
