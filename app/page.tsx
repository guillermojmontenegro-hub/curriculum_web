import type { CSSProperties } from "react";
import Link from "next/link";

import { HeroSpotlight } from "@/components/hero-spotlight";
import { SiteHeader } from "@/components/site-header";
import { getAllArticlesMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/formatters";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locale = getLocale(resolvedSearchParams?.lang);
  const copy = getDictionary(locale);
  const profile = getProfile(locale);
  const allArticles = getAllArticlesMeta();
  const formattedArticles = allArticles.map((article) => ({
    ...article,
    formattedDate: formatArticleDate(article.date, locale),
  }));
  const latestArticles = formattedArticles.slice(0, 3);
  const spotlightArticles = formattedArticles.slice(0, 8);
  const stats = [
    {
      label: copy.home.stats.experienceLabel,
      value: String(profile.experience.length),
      detail: copy.home.stats.experienceDetail,
    },
    {
      label: copy.home.stats.articlesLabel,
      value: String(allArticles.length),
      detail: copy.home.stats.articlesDetail,
    },
    {
      label: copy.home.stats.topicsLabel,
      value: String(
        new Set(allArticles.flatMap((article) => article.tags)).size,
      ),
      detail: copy.home.stats.topicsDetail,
    },
  ];

  return (
    <main className="page-shell">
      <SiteHeader locale={locale} />

      <section className="container hero-section">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="section-kicker">{copy.home.heroKicker}</p>
            <h1 className="hero-title">{copy.home.heroTitle}</h1>
            <p className="hero-lead">{profile.summary}</p>
            <p className="hero-subtitle">{profile.headline}</p>

            <div className="hero-actions">
              <a href="#contacto" className="button-primary">
                {copy.home.contactMe}
              </a>
              <Link
                href={withLocale("/articulos", locale)}
                className="button-secondary"
              >
                {copy.home.exploreArticles}
              </Link>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className="stat-card"
                  style={{ "--delay": `${index * 100}ms` } as CSSProperties}
                >
                  <p className="stat-label">{stat.label}</p>
                  <strong className="stat-value">{stat.value}</strong>
                  <p className="stat-detail">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <HeroSpotlight
            locale={locale}
            profileName={profile.name}
            articles={spotlightArticles}
            style={{ "--delay": "120ms" } as CSSProperties}
          />
        </div>
      </section>

      <section id="experiencia" className="container section-shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="section-kicker">{copy.home.experienceKicker}</p>
            <h2 className="section-title">{copy.home.experienceTitle}</h2>
          </div>
          <p className="section-copy">{copy.home.experienceCopy}</p>
        </div>

        <div className="timeline-grid">
          {profile.experience.map((item, index) => (
            <article
              key={`${item.company}-${item.period}`}
              className="timeline-card card reveal"
              style={{ "--delay": `${index * 110}ms` } as CSSProperties}
            >
              <p className="timeline-period">{item.period}</p>
              <h3 className="timeline-title">{item.role}</h3>
              <p className="timeline-company">
                {item.company} · {item.period}
              </p>
              <ul className="timeline-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className="container section-shell two-column-section"
      >
        <article className="panel-card card reveal">
          <p className="section-kicker">{copy.home.skillsKicker}</p>
          <h2 className="section-title">{copy.home.skillsTitle}</h2>
          <div className="chip-list spacious">
            {profile.skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article
          className="panel-card card reveal"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          <p className="section-kicker">{copy.home.projectsKicker}</p>
          <h2 className="section-title">{copy.home.projectsTitle}</h2>
          <div className="project-grid">
            {profile.projects.map((project) => (
              <div key={project} className="project-card">
                <span className="project-dot" aria-hidden="true" />
                <p>{project}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="container section-shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="section-kicker">{copy.home.articlesKicker}</p>
            <h2 className="section-title">{copy.home.articlesTitle}</h2>
          </div>
          <p className="section-copy">{copy.home.articlesCopy}</p>
        </div>

        <div className="article-showcase">
          {latestArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={withLocale(`/articulos/${article.slug}`, locale)}
              className={`article-teaser card reveal card-link ${index === 0 ? "article-teaser-primary" : ""}`}
              style={{ "--delay": `${index * 100}ms` } as CSSProperties}
            >
              <div className="article-teaser-media">
                <img
                  src={`/api/article-preview/${article.slug}`}
                  alt={`${copy.home.previewAlt} ${article.title}`}
                  className="cover-image"
                />
              </div>

              <div className="article-teaser-content">
                <div className="meta-row">
                  <span>{article.formattedDate}</span>
                  <span>
                    {copy.home.writtenBy} {profile.name}
                  </span>
                </div>
                <h3 className="article-teaser-title">{article.title}</h3>
                <p className="article-teaser-description">
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
                <span className="inline-link">{copy.home.readArticle}</span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="section-footer reveal"
          style={{ "--delay": "160ms" } as CSSProperties}
        >
          <div className="section-footer-copy">
            <p className="section-footer-title">
              {copy.home.articleArchiveTitle}
            </p>
            <p>{copy.home.articleArchiveCopy}</p>
          </div>
          <div className="hero-actions">
            <Link
              href={withLocale("/articulos", locale)}
              className="button-primary"
            >
              {copy.home.openArticlesLibrary}
            </Link>
            <a href="#contacto" className="button-secondary">
              {copy.home.discussProjects}
            </a>
          </div>
        </div>
      </section>

      <section className="container section-shell two-column-section">
        <article className="panel-card card reveal">
          <p className="section-kicker">{copy.home.educationKicker}</p>
          <h2 className="section-title">{copy.home.educationTitle}</h2>
          <ul className="info-list">
            {profile.education.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <strong>{item.title}</strong>
                <span>
                  {item.institution} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="panel-card card reveal"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          <p className="section-kicker">{copy.home.languagesKicker}</p>
          <h2 className="section-title">{copy.home.languagesTitle}</h2>
          <ul className="info-list">
            {profile.languages.map((lang) => (
              <li key={lang.name}>
                <strong>{lang.name}</strong>
                <span>{lang.level}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section id="contacto" className="container section-shell">
        <article className="contact-banner card reveal">
          <div>
            <p className="section-kicker">{copy.home.contactKicker}</p>
            <h2 className="section-title contact-title">
              {copy.home.contactTitle}
            </h2>
            <p className="section-copy">{copy.home.contactCopy}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
            </div>
            {profile.contact.linkedin ? (
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.home.linkedinProfile}
                </a>
              </div>
            ) : null}
            <div className="contact-item">
              <span className="contact-label">{copy.home.location}</span>
              <span>{profile.contact.location}</span>
            </div>
          </div>

          <div className="hero-actions">
            <a
              href={`mailto:${profile.contact.email}`}
              className="button-primary"
            >
              {copy.home.writeToMe}
            </a>
            {profile.contact.linkedin ? (
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {copy.home.viewLinkedin}
              </a>
            ) : null}
            {profile.contact.github ? (
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {copy.home.viewGithub}
              </a>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}
