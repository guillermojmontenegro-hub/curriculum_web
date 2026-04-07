import Link from "next/link";

import { LanguageToggle } from "@/components/language-toggle";
import type { Locale } from "@/lib/i18n";
import { getDictionary, withLocale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getDictionary(locale);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          href={withLocale("/", locale)}
          className="brand-lockup"
          aria-label={locale === "es" ? "Inicio" : "Home"}
        >
          <span className="brand-mark">GM</span>
          <span className="brand-copy">
            <strong>Guillermo J. Montenegro</strong>
            <span>{copy.brandSubtitle}</span>
          </span>
        </Link>

        <div className="site-header-actions">
          <nav className="site-nav">
            <Link href={withLocale("/#experiencia", locale)}>
              {copy.nav.experience}
            </Link>
            <Link href={withLocale("/#skills", locale)}>{copy.nav.skills}</Link>
            <Link href={withLocale("/#contacto", locale)}>
              {copy.nav.contact}
            </Link>
            <Link href={withLocale("/articulos", locale)} className="nav-cta">
              {copy.nav.articles}
            </Link>
          </nav>

          <LanguageToggle
            locale={locale}
            label={copy.localeSwitchLabel}
          />
        </div>
      </div>
    </header>
  );
}
