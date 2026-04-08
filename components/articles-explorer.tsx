"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useState,
  type CSSProperties,
} from "react";

import { getDictionary, type Locale } from "@/lib/i18n";

type ArticleExplorerItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
};

type ArticlesExplorerProps = {
  articles: ArticleExplorerItem[];
  authorName: string;
  locale: Locale;
};

export function ArticlesExplorer({
  articles,
  authorName,
  locale,
}: ArticlesExplorerProps) {
  const copy = getDictionary(locale);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const matchesQuery = normalizedQuery
      ? [article.title, article.description].join(" ").toLowerCase().includes(normalizedQuery)
      : true;

    return matchesQuery;
  });

  function clearFilters() {
    setQuery("");
  }

  return (
    <div className="article-explorer">
      {filteredArticles.length ? (
        <section className="article-library-grid">
          {filteredArticles.map((article, index) => {
            return (
              <Link
                key={article.slug}
                href={
                  locale === "en"
                    ? `/articulos/${article.slug}?lang=en`
                    : `/articulos/${article.slug}`
                }
                className="article-library-card card reveal card-link"
                style={
                  {
                    "--delay": `${index * 80}ms`,
                    "--article-image": `url("/api/article-preview/${article.slug}?variant=thumb")`,
                  } as CSSProperties
                }
              >
                <div className="article-library-card-content">
                  <div className="article-library-card-top">
                    <div className="meta-row article-library-card-meta">
                      <span>{article.formattedDate}</span>
                      <span>
                        {copy.articles.by} {authorName}
                      </span>
                    </div>

                    <h2 className="article-entry-title article-library-card-title">
                      {article.title}
                    </h2>

                    <p className="article-entry-description article-library-card-description">
                      {article.description}
                    </p>
                  </div>

                  <div className="article-library-card-bottom">
                    <span className="article-library-card-link">
                      {copy.articles.read}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="card empty-state reveal">
          <p className="empty-state-title">{copy.articles.noResultsTitle}</p>
          <p className="empty-state-copy">{copy.articles.noResultsCopy}</p>
        </section>
      )}

      <section className="card explorer-toolbar reveal">
        <div className="explorer-toolbar-top">
          <label className="search-field">
            <span className="search-label">{copy.articles.searchLabel}</span>
            <input
              className="search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.articles.searchPlaceholder}
            />
          </label>

          <div className="explorer-summary">
            <p className="explorer-results">
              {copy.articles.resultsSummary(filteredArticles.length)}
            </p>
            {query && (
              <button
                type="button"
                className="inline-action"
                onClick={clearFilters}
              >
                {copy.articles.clearFilters}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
