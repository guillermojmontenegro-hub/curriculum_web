import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { SiteHeader } from "@/components/site-header";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getAllArticlesMeta,
} from "@/lib/articles";
import { formatArticleDate } from "@/lib/formatters";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} | Guillermo Montenegro`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
      },
    };
  } catch {
    return { title: "Artículo no encontrado" };
  }
}

export default async function ArticleDetailPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const locale = getLocale(resolvedSearchParams?.lang);
  const copy = getDictionary(locale);
  const profile = getProfile(locale);

  let article;

  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const moreArticles = getAllArticlesMeta()
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      formattedDate: formatArticleDate(item.date, locale),
    }));

  return (
    <main className="page-shell article-detail-shell">
      <SiteHeader locale={locale} />

      <section className="container page-intro reveal">
        <Link href={withLocale("/articulos", locale)} className="back-link">
          {copy.articleDetail.backToArticles}
        </Link>

        <div className="article-hero-grid">
          <div className="article-hero-copy">
            <p className="section-kicker">{copy.articleDetail.articleKicker}</p>
            <h1 className="page-title">{article.title}</h1>
            <p className="page-copy">{article.description}</p>

            <div className="meta-row spacious-meta">
              <span>{formatArticleDate(article.date, locale)}</span>
              <span>
                {copy.articleDetail.writtenBy} {profile.name}
              </span>
            </div>

            <div className="chip-list">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={withLocale(
                    `/articulos?tag=${encodeURIComponent(tag)}`,
                    locale,
                  )}
                  className="chip-link"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <article className="author-note card compact-note">
              <p className="author-note-title">
                {copy.articleDetail.professionalExperienceTitle}
              </p>
              <p>{copy.articleDetail.professionalExperienceCopy}</p>
            </article>
          </div>

          <div className="article-cover-card card">
            <img
              src={`/api/article-preview/${article.slug}`}
              alt={`${copy.articleDetail.previewAlt} ${article.title}`}
              className="cover-image"
            />
          </div>
        </div>
      </section>

      <section className="container article-reading-layout">
        <article className="article-paper card reveal">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        <aside
          className="article-side-panel card reveal"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <p className="section-kicker">
            {copy.articleDetail.guidedReadingKicker}
          </p>
          <h2 className="section-title">
            {copy.articleDetail.guidedReadingTitle}
          </h2>
          <p className="section-copy">{copy.articleDetail.guidedReadingCopy}</p>
          <div className="hero-actions stack-mobile">
            <Link href={withLocale("/articulos", locale)} className="button-primary">
              {copy.articleDetail.viewAllArticles}
            </Link>
            <Link href={withLocale("/#contacto", locale)} className="button-secondary">
              {copy.articleDetail.contactMe}
            </Link>
          </div>
        </aside>
      </section>

      <section className="container section-shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="section-kicker">
              {copy.articleDetail.keepReadingKicker}
            </p>
            <h2 className="section-title">
              {copy.articleDetail.keepReadingTitle} {profile.name}
            </h2>
          </div>
          <p className="section-copy">{copy.articleDetail.keepReadingCopy}</p>
        </div>

        <div className="related-grid">
          {moreArticles.map((item) => (
            <Link
              key={item.slug}
              href={withLocale(`/articulos/${item.slug}`, locale)}
              className="article-mini-card card reveal card-link"
            >
              <div className="article-mini-media">
                <img
                  src={`/api/article-preview/${item.slug}`}
                  alt={`${copy.articleDetail.previewAlt} ${item.title}`}
                  className="cover-image"
                />
              </div>
              <div className="article-mini-content">
                <div className="meta-row">
                  <span>{item.formattedDate}</span>
                  <span>
                    {copy.articleDetail.by} {profile.name}
                  </span>
                </div>
                <h3 className="article-entry-title">{item.title}</h3>
                <p className="article-entry-description">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
