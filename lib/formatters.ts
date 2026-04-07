import type { Locale } from "@/lib/i18n";

const articleDateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  en: new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
};

export function formatArticleDate(date: string, locale: Locale = "es"): string {
  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return articleDateFormatters[locale].format(parsedDate);
}
