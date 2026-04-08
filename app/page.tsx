import type { CSSProperties } from "react";
import Link from "next/link";

import { HeroSpotlight } from "@/components/hero-spotlight";
import { SiteHeader } from "@/components/site-header";
import { getAllArticlesMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/formatters";
import { getDictionary, getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

function ContactIcon({ type }: { type: "email" | "linkedin" | "location" }) {
  if (type === "email") {
    return (
      <span className="contact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25zm1.86-.25L12 11.73 19.14 6.5zM20 7.33l-6.97 5.1a1.75 1.75 0 0 1-2.06 0L4 7.33v9.92c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75z" />
        </svg>
      </span>
    );
  }

  if (type === "linkedin") {
    return (
      <span className="contact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M6.8 8.37A1.57 1.57 0 1 1 6.82 5.23 1.57 1.57 0 0 1 6.8 8.37m1.3 2.13v8.25H5.5V10.5zm4.11 0h2.49v1.13h.04c.35-.66 1.2-1.36 2.47-1.36 2.65 0 3.14 1.74 3.14 4v4.48h-2.59v-3.97c0-.95-.02-2.17-1.32-2.17-1.32 0-1.52 1.03-1.52 2.1v4.04h-2.59V10.5z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 21s6-5.69 6-11a6 6 0 1 0-12 0c0 5.31 6 11 6 11m0-8.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5" />
      </svg>
    </span>
  );
}

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
      value: String(allArticles.length),
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
              <span className="contact-label-with-icon">
                <ContactIcon type="email" />
                <span className="contact-label">Email</span>
              </span>
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
            </div>
            {profile.contact.linkedin ? (
              <div className="contact-item">
                <span className="contact-label-with-icon">
                  <ContactIcon type="linkedin" />
                  <span className="contact-label">LinkedIn</span>
                </span>
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
              <span className="contact-label-with-icon">
                <ContactIcon type="location" />
                <span className="contact-label">{copy.home.location}</span>
              </span>
              <span>{profile.contact.location}</span>
            </div>
          </div>

          <div className="hero-actions">
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
