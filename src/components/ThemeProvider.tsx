"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (value: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COOKIE_NAME = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const writeCookie = (value?: ThemePreference) => {
  if (typeof document === "undefined") return;
  const expires = value ? `; max-age=${COOKIE_MAX_AGE}` : "; max-age=0";
  const payload = value ? `${COOKIE_NAME}=${value}` : `${COOKIE_NAME}=`;
  document.cookie = `${payload}; path=/; samesite=lax${expires}`;
};

const applyTheme = (
  preference: ThemePreference,
  setResolved: (value: ResolvedTheme) => void
) => {
  if (typeof document === "undefined") return;
  const resolved = preference === "system" ? getSystemTheme() : preference;
  document.documentElement.dataset.theme = resolved;
  setResolved(resolved);
  writeCookie(preference === "system" ? undefined : preference);
};

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme?: ThemePreference;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ThemePreference>(initialTheme ?? "system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  const syncTheme = useCallback((next: ThemePreference) => setTheme(next), []);

  useEffect(() => {
    applyTheme(theme, setResolvedTheme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system", setResolvedTheme);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      if (current === "system") return "light";
      if (current === "light") return "dark";
      return "system";
    });
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: syncTheme, toggleTheme }),
    [theme, resolvedTheme, syncTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
