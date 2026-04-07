"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme-preference";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  darkLabel: string;
  lightLabel: string;
  onClick?: () => void;
};

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({
  darkLabel,
  lightLabel,
  onClick,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;

    if (rootTheme === "light" || rootTheme === "dark") {
      setTheme(rootTheme);
      return;
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
      .matches
      ? "light"
      : "dark";

    applyTheme(systemTheme);
    setTheme(systemTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY)) {
        return;
      }

      const nextTheme: Theme = event.matches ? "light" : "dark";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", syncWithSystem);

    return () => mediaQuery.removeEventListener("change", syncWithSystem);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "light" ? lightLabel : darkLabel;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => {
        applyTheme(nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        setTheme(nextTheme);
        onClick?.();
      }}
    >
      <span
        className={`theme-toggle-icon ${theme === "dark" ? "is-dark" : "is-light"}`}
        aria-hidden="true"
      />
    </button>
  );
}
