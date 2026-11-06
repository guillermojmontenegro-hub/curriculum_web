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

    applyTheme("light");
    setTheme("light");
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
        try {
          window.localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {}
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
