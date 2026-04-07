"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  locale: Locale;
  label: string;
};

export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLocale = locale === "es" ? "en" : "es";
  const currentFlag = locale === "es" ? "🇬🇧" : "🇪🇸";
  const nextParams = new URLSearchParams(searchParams.toString());

  if (nextLocale === "en") {
    nextParams.set("lang", "en");
  } else {
    nextParams.delete("lang");
  }

  const href = nextParams.size
    ? `${pathname}?${nextParams.toString()}`
    : pathname;

  return (
    <Link
      href={href}
      className="language-toggle"
      aria-label={`Cambiar idioma a ${label}`}
      title={`Cambiar idioma a ${label}`}
    >
      <span className="language-toggle-flag" aria-hidden="true">
        {currentFlag}
      </span>
      <span>{label}</span>
    </Link>
  );
}
