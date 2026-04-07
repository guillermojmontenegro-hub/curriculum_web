"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useDeferredValue,
  useEffect,
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
  tags: string[];
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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTag = searchParams.get("tag") ?? "";
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(urlTag);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setSelectedTag(urlTag);
  }, [urlTag]);

  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags)),
  ).sort((a, b) => a.localeCompare(b));
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    const matchesQuery = normalizedQuery
      ? [article.title, article.description, article.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      : true;

    return matchesTag && matchesQuery;
  });

  const featuredArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  function updateTag(nextTag: string) {
    setSelectedTag(nextTag);

    const nextParams = new URLSearchParams(searchParams.toString());

    if (locale === "en") {
      nextParams.set("lang", "en");
    } else {
      nextParams.delete("lang");
    }

    if (nextTag) {
      nextParams.set("tag", nextTag);
    } else {
      nextParams.delete("tag");
    }

    startTransition(() => {
      router.replace(
        nextParams.size ? `${pathname}?${nextParams.toString()}` : pathname,
        { scroll: false },
      );
    });
  }

  function clearFilters() {
    setQuery("");
    updateTag("");
  }

  return (
    <div className="article-explorer">
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
              {copy.articles.resultsSummary(
                filteredArticles.length,
                selectedTag,
              )}
            </p>
            {(query || selectedTag) && (
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

        <div className="topic-filter-row">
          <button
            type="button"
            className={`filter-chip ${selectedTag === "" ? "is-active" : ""}`}
            aria-pressed={selectedTag === ""}
            onClick={() => updateTag("")}
          >
            {copy.articles.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`filter-chip ${selectedTag === tag ? "is-active" : ""}`}
              aria-pressed={selectedTag === tag}
              onClick={() => updateTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {featuredArticle ? (
        <section className="article-results-grid">
          <Link
            href={
              locale === "en"
                ? `/articulos/${featuredArticle.slug}?lang=en`
                : `/articulos/${featuredArticle.slug}`
            }
            className="featured-article-card card reveal card-link"
          >
            <div className="featured-article-media">
              <img
                src={`/api/article-preview/${featuredArticle.slug}`}
                alt={`${copy.articles.previewAlt} ${featuredArticle.title}`}
                className="cover-image"
              />
            </div>

            <div className="featured-article-content">
              <p className="eyebrow-text">{copy.articles.featured}</p>
              <h2 className="featured-article-title">
                {featuredArticle.title}
              </h2>
              <p className="featured-article-description">
                {featuredArticle.description}
              </p>

              <div className="meta-row">
                <span>{featuredArticle.formattedDate}</span>
                <span>
                  {copy.articles.writtenBy} {authorName}
                </span>
              </div>

              <div className="chip-list">
                {featuredArticle.tags.map((tag) => (
                  <span key={`${featuredArticle.slug}-${tag}`} className="chip">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="inline-link">{copy.articles.openArticle}</span>
            </div>
          </Link>

          <div className="article-results-list">
            {secondaryArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={
                  locale === "en"
                    ? `/articulos/${article.slug}?lang=en`
                    : `/articulos/${article.slug}`
                }
                className="article-entry card reveal card-link"
                style={{ "--delay": `${(index + 1) * 90}ms` } as CSSProperties}
              >
                <div className="article-entry-content">
                  <div className="meta-row">
                    <span>{article.formattedDate}</span>
                    <span>
                      {copy.articles.by} {authorName}
                    </span>
                  </div>
                  <h3 className="article-entry-title">{article.title}</h3>
                  <p className="article-entry-description">
                    {article.description}
                  </p>
                  <div className="chip-list compact">
                    {article.tags.map((tag) => (
                      <span
                        key={`${article.slug}-${tag}`}
                        className="chip subtle"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="article-entry-arrow">{copy.articles.read}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="card empty-state reveal">
          <p className="empty-state-title">{copy.articles.noResultsTitle}</p>
          <p className="empty-state-copy">{copy.articles.noResultsCopy}</p>
        </section>
      )}
    </div>
  );
}
