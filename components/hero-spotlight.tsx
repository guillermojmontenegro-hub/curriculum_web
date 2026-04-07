"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import type { Locale } from "@/lib/i18n";
import { getDictionary, withLocale } from "@/lib/i18n";

type SpotlightArticle = {
  slug: string;
  title: string;
  formattedDate: string;
};

type HeroSpotlightProps = {
  locale: Locale;
  profileName: string;
  articles: SpotlightArticle[];
  style?: CSSProperties;
};

export function HeroSpotlight({
  locale,
  profileName,
  articles,
  style,
}: HeroSpotlightProps) {
  const copy = getDictionary(locale);
  const listRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measureWidth, setMeasureWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(articles.length);

  const localizedArticles = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        href: withLocale(`/articulos/${article.slug}`, locale),
      })),
    [articles, locale],
  );

  useEffect(() => {
    function updateVisibleCount() {
      const listElement = listRef.current;
      const measureElement = measureRef.current;

      if (!listElement || !measureElement) {
        return;
      }

      const availableHeight = listElement.clientHeight;
      const nextWidth = listElement.clientWidth;

      if (!availableHeight || !nextWidth) {
        return;
      }

      setMeasureWidth(nextWidth);

      const computedStyle = window.getComputedStyle(measureElement);
      const gap = Number.parseFloat(computedStyle.rowGap || "0");
      const children = Array.from(measureElement.children) as HTMLElement[];

      let usedHeight = 0;
      let count = 0;

      for (const child of children) {
        const nextHeight =
          usedHeight + child.offsetHeight + (count > 0 ? gap : 0);

        if (nextHeight > availableHeight) {
          break;
        }

        usedHeight = nextHeight;
        count += 1;
      }

      setVisibleCount(Math.max(1, Math.min(count, localizedArticles.length)));
    }

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateVisibleCount);
    });

    if (listRef.current) {
      resizeObserver.observe(listRef.current);
    }

    window.requestAnimationFrame(updateVisibleCount);

    return () => {
      resizeObserver.disconnect();
    };
  }, [localizedArticles.length]);

  return (
    <aside className="hero-spotlight card reveal" style={style}>
      <div className="spotlight-header">
        <p className="eyebrow-text">{copy.home.spotlightKicker}</p>
        <h2 className="spotlight-title">
          {copy.home.spotlightTitle} {profileName}
        </h2>
        <p className="spotlight-copy">{copy.home.spotlightCopy}</p>
      </div>

      <div ref={listRef} className="spotlight-article-list">
        {localizedArticles.slice(0, visibleCount).map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="spotlight-article-link"
          >
            <span className="spotlight-article-date">{article.formattedDate}</span>
            <span className="spotlight-article-title">{article.title}</span>
          </Link>
        ))}
      </div>

      <Link href={withLocale("/articulos", locale)} className="spotlight-link">
        {copy.home.viewFullLibrary}
      </Link>

      <div
        ref={measureRef}
        className="spotlight-article-list spotlight-article-list-measure"
        aria-hidden="true"
        style={{ width: measureWidth > 0 ? `${measureWidth}px` : undefined }}
      >
        {localizedArticles.map((article) => (
          <div key={article.slug} className="spotlight-article-link">
            <span className="spotlight-article-date">{article.formattedDate}</span>
            <span className="spotlight-article-title">{article.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
