"use client";
import { useState } from "react";
import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = getDictionary(locale);
  return (
    <header className="editorial-header">
      <div className="editorial-nav">
        <Link
          href={withLocale("/", locale)}
          className="editorial-brand"
          onClick={() => setOpen(false)}
        >
          <span className="monogram">
            gm<span>.</span>
          </span>
          <span>
            Guillermo
            <br />
            Montenegro
          </span>
        </Link>
        <button
          className="menu-trigger"
          type="button"
          aria-label={
            locale === "es" ? "Menú de navegación" : "Navigation menu"
          }
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "☰"}
        </button>
        <div
          id="main-navigation"
          className={`editorial-links ${open ? "is-open" : ""}`}
        >
          <nav aria-label={locale === "es" ? "Principal" : "Main"}>
            {[
              ["/#experiencia", copy.nav.experience],
              ["/#skills", copy.nav.skills],
              ["/articulos", copy.nav.articles],
              ["/consultoria", copy.nav.consulting],
              ["/#contacto", copy.nav.contact],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={withLocale(href, locale)}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="editorial-controls">
            <ThemeToggle
              darkLabel={copy.themeToggleToDark}
              lightLabel={copy.themeToggleToLight}
            />
            <LanguageToggle locale={locale} label={copy.localeSwitchLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
