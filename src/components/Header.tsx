"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { SITE } from "@/data/site";
import type { SiteSettingsMap } from "@/lib/db/site-settings";

type Props = { site?: SiteSettingsMap["site"] };

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const linkClass =
  "text-zinc-400 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded px-1 py-0.5 transition";

export function Header({ site: siteProp }: Props = {}) {
  const site = siteProp ?? SITE;
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
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0a0a0f]/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-white focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
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
        className={`md:hidden border-t border-zinc-800 overflow-hidden transition-[height] duration-200 ${
          menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
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
        </div>
      </div>
    </header>
  );
}
