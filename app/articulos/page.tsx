import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ArticlesExplorer } from "@/components/articles-explorer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticlesMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/formatters";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Artículos | Guillermo Montenegro",
  description:
    "Biblioteca de articulos técnicos escritos por Guillermo Montenegro sobre IA, agentes, modelos y software.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locale = getLocale(resolvedSearchParams?.lang);
  const copy = getDictionary(locale);
  const profile = getProfile(locale);
  const articles = getAllArticlesMeta().map((article) => ({
    ...article,
    formattedDate: formatArticleDate(article.date, locale),
  }));
  const topicCount = new Set(articles.flatMap((article) => article.tags)).size;

  return (
    <main className="page-shell articles-shell">
      <SiteHeader locale={locale} />

      <section className="container page-intro reveal">
        <Link href={withLocale("/", locale)} className="back-link">
          {copy.articles.backToProfile}
        </Link>

        <div className="page-intro-grid">
          <div>
            <p className="section-kicker">{copy.articles.libraryKicker}</p>
            <h1 className="page-title">
              {copy.articles.libraryTitle} {profile.name}
            </h1>
            <p className="page-copy">{copy.articles.libraryCopy}</p>
          </div>

          <div className="insight-grid">
            <article className="insight-card card">
              <strong>{articles.length}</strong>
              <span>{copy.articles.ownArticles}</span>
            </article>
            <article className="insight-card card">
              <strong>{topicCount}</strong>
              <span>{copy.articles.topicsToExplore}</span>
            </article>
            <article className="insight-card card">
              <strong>100%</strong>
              <span>{copy.articles.experienceLinkedContent}</span>
            </article>
          </div>
        </div>

        <article className="author-note card">
          <p className="author-note-title">{copy.articles.whyLibraryMatters}</p>
          <p>{copy.articles.whyLibraryCopy}</p>
        </article>
      </section>

      <section className="container section-shell">
        <Suspense
          fallback={
            <div className="card explorer-toolbar">
              <p className="author-note-title">{copy.articles.loadingTitle}</p>
              <p className="section-copy">{copy.articles.loadingCopy}</p>
            </div>
          }
        >
          <ArticlesExplorer
            articles={articles}
            authorName={profile.name}
            locale={locale}
          />
        </Suspense>
      </section>
    </main>
  );
}
