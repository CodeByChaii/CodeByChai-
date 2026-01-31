"use client";

import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";

const labelFor = (theme: string, resolved: string) =>
  theme === "system" ? `Theme: System (${resolved})` : `Theme: ${theme}`;

const Icon = ({ mode }: { mode: "light" | "dark" }) => {
  if (mode === "light") {
    return (
      <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4 4.2 19.8m15.6-15.6-1.4 1.4" />
      </svg>
    );
  }
  return (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
};

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const label = useMemo(() => labelFor(theme, resolvedTheme), [theme, resolvedTheme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--foreground)",
        boxShadow: "var(--shadow)",
      }}
      aria-label={`${label}. Press to cycle light/dark/system.`}
      title="Toggle theme"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
        <Icon mode={resolvedTheme} />
      </span>
      <span className="text-xs uppercase tracking-wide" style={{ color: "var(--muted)" }}>
        {theme === "system" ? "System" : resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1)}
      </span>
    </button>
  );
}
