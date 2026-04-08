"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n";
import { getDictionary, withLocale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getDictionary(locale);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const toggleLabel =
    locale === "es" ? "Alternar navegación" : "Toggle navigation";
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const syncSidebarState = (event?: MediaQueryListEvent) => {
      if (!(event?.matches ?? mediaQuery.matches)) {
        setIsSidebarOpen(false);
      }
    };

    syncSidebarState();
    mediaQuery.addEventListener("change", syncSidebarState);

    return () => mediaQuery.removeEventListener("change", syncSidebarState);
  }, []);

  return (
    <header
      className={`site-header ${isSidebarOpen ? "is-portrait-open" : "is-portrait-collapsed"}`}
    >
      <button
        type="button"
        className="site-header-toggle"
        aria-label={toggleLabel}
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen((current) => !current)}
      >
        <span className="site-header-toggle-box" aria-hidden="true">
          <span className="site-header-toggle-line" />
          <span className="site-header-toggle-line" />
          <span className="site-header-toggle-line" />
        </span>
      </button>

      <div className="container site-header-inner">
        <div className="site-header-topbar">
          <div className="brand-lockup">
            <button
              type="button"
              className={`brand-mark brand-mark-button ${isProfileExpanded ? "is-expanded" : ""}`}
              aria-label={
                isProfileExpanded
                  ? "Reducir foto de perfil"
                  : "Ampliar foto de perfil"
              }
              aria-pressed={isProfileExpanded}
              onClick={() => setIsProfileExpanded((current) => !current)}
            >
              <Image
                src="/assets/fotoCV-thumb.jpg"
                alt="Foto de perfil de Guillermo Montenegro"
                width={160}
                height={160}
                className="brand-mark-image"
                sizes="(max-width: 640px) 56px, 160px"
                priority
              />
            </button>
            <Link
              href={withLocale("/", locale)}
              className="brand-copy"
              aria-label={locale === "es" ? "Inicio" : "Home"}
              onClick={closeSidebar}
            >
              <strong>Guillermo J. Montenegro</strong>
              <span>{copy.brandSubtitle}</span>
            </Link>
          </div>
        </div>

        <div className="site-header-actions">
          <nav className="site-nav">
            <Link href={withLocale("/#experiencia", locale)} onClick={closeSidebar}>
              {copy.nav.experience}
            </Link>
            <Link href={withLocale("/#skills", locale)} onClick={closeSidebar}>
              {copy.nav.skills}
            </Link>
            <Link href={withLocale("/#contacto", locale)} onClick={closeSidebar}>
              {copy.nav.contact}
            </Link>
            <Link
              href={withLocale("/articulos", locale)}
              className="nav-cta"
              onClick={closeSidebar}
            >
              {copy.nav.articles}
            </Link>
          </nav>

          <ThemeToggle
            darkLabel={copy.themeToggleToDark}
            lightLabel={copy.themeToggleToLight}
            onClick={closeSidebar}
          />

          <LanguageToggle
            locale={locale}
            label={copy.localeSwitchLabel}
            onClick={closeSidebar}
          />
        </div>
      </div>
    </header>
  );
}
