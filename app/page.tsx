import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ExpertiseExplorer } from "@/components/expertise-explorer";
import { getAllArticlesMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/formatters";
import { getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const locale = getLocale((await searchParams)?.lang);
  const es = locale === "es";
  const p = getProfile(locale);
  const articles = getAllArticlesMeta();
  const t = (spanish: string, english: string) => (es ? spanish : english);
  const groups = [
    {
      title: "AI Engineering",
      description: t(
        "De probar modelos a conectar agentes con herramientas reales. Trabajo con LLMs, tool calling, MCP y workflows de automatización; también con modelos locales y fine tuning.",
        "From experimenting with models to connecting agents with real tools. I work with LLMs, tool calling, MCP and automation workflows, as well as local models and fine tuning.",
      ),
      tools: [
        "Python",
        "LLMs",
        "MCP",
        "Agent Skills",
        "LangChain",
        "Langflow",
        "Langfuse",
        "Ollama",
        "PyTorch",
        "LoRA",
        "Codex",
        "Claude Code",
      ],
    },
    {
      title: "Mobile",
      description: t(
        "Mi recorrido empezó mucho antes de la IA. Desarrollo nativo Android e iOS, integración con servicios, persistencia local y arquitecturas pensadas para mantener y evolucionar una aplicación.",
        "My work started long before AI. Native Android and iOS development, service integration, local persistence and architectures built to maintain and evolve an application.",
      ),
      tools: [
        "Kotlin",
        "Java",
        "Jetpack Compose",
        "MVVM",
        "Room",
        "Hilt",
        "Coroutines",
        "Flow",
        "Swift",
        "Objective-C",
        "UIKit",
        "SwiftUI",
      ],
    },
    {
      title: "Web & Backend",
      description: t(
        "Conecto la interfaz con lo que pasa detrás. Desarrollo web con React, Next.js y TypeScript, y servicios con Java y Python para productos y aplicaciones empresariales.",
        "I connect the interface with what happens behind it. Web development with React, Next.js and TypeScript, and Java and Python services for products and business applications.",
      ),
      tools: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Java",
        "Python",
        "FastAPI",
        "REST APIs",
        "SQLite",
        "Docker",
        "CI/CD",
      ],
    },
    {
      title: t("Automatización", "Automation"),
      description: t(
        "Uno procesos, APIs y herramientas para resolver tareas operativas. Uso Power Automate, n8n y Python, e integro IA cuando aporta valor al flujo de trabajo.",
        "I connect processes, APIs and tools to solve operational tasks. I use Power Automate, n8n and Python, integrating AI where it adds value to the workflow.",
      ),
      tools: [
        "Power Automate",
        "n8n",
        "Python",
        "REST APIs",
        "Azure",
        "GCP",
        "Vertex AI",
        "Tool Calling",
      ],
    },
  ];
  return (
    <main className="page-shell portfolio-shell">
      <SiteHeader locale={locale} />
      <section
        className="folio-container folio-hero"
        aria-labelledby="intro-title"
      >
        <div className="folio-hero-copy reveal">
          <p className="eyebrow">
            <span className="status-dot" />
            {t(
              "Buenos Aires, Argentina · Disponible para nuevos proyectos",
              "Buenos Aires, Argentina · Open to new projects",
            )}
          </p>
          <h1 id="intro-title">
            {t("El oficio de", "The craft of")}
            <br />
            {t("hacer", "building")}
            <br />
            <em>software.</em>
          </h1>
          <p className="folio-intro">{p.summary}</p>
          <div className="folio-actions">
            <a className="folio-button" href="#contacto">
              {t("Conversemos", "Let’s talk")} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="folio-text-link"
              href={`/assets/guillermo-montenegro-cv-${locale}.pdf`}
              download
            >
              {t("Descargar CV", "Download CV")}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <figure className="portrait-composition reveal">
          <div className="portrait-frame">
            <Image
              src="/assets/guillermo-montenegro.jpg"
              alt={p.name}
              width={720}
              height={900}
              sizes="(max-width: 760px) 85vw, 40vw"
              priority
            />
            <span className="portrait-label">MOBILE / WEB / AI</span>
          </div>
          <figcaption>
            <span>Guillermo J. Montenegro</span>
            <span>
              {t("Ingeniería + curiosidad", "Engineering + curiosity")}
            </span>
          </figcaption>
          <div className="portrait-note">
            <span>2010 — 2026</span>
            <p>
              {t("Del primer producto", "From the first product")}
              <br />
              {t("al próximo desafío.", "to the next challenge.")}
            </p>
            <span aria-hidden="true">↙</span>
          </div>
        </figure>
        <a className="folio-scroll" href="#proyectos">
          {t("Una muestra de mi trabajo", "A look at my work")}{" "}
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <div className="practice-strip">
        <div className="folio-container">
          <span>Android & iOS</span>
          <i aria-hidden="true">✳</i>
          <span>Web Full Stack</span>
          <i aria-hidden="true">✳</i>
          <span>AI Engineering</span>
          <i aria-hidden="true">✳</i>
          <span>{t("Automatización", "Automation")}</span>
        </div>
      </div>

      <section id="proyectos" className="folio-container folio-section">
        <div className="folio-section-heading reveal">
          <p className="eyebrow">01 / {t("Trabajo", "Work")}</p>
          <h2>
            {t("Ideas que", "Ideas put")}
            <br />
            <em>{t("puse en práctica.", "into practice.")}</em>
          </h2>
          <p>
            {t(
              "Productos, herramientas y exploraciones. Una selección de lo que construí y de los problemas en los que trabajé.",
              "Products, tools and explorations. A selection of what I’ve built and the problems I’ve worked on.",
            )}
          </p>
        </div>
        <div className="folio-work-grid">
          <a
            className="work-feature reveal"
            href="https://github.com/guillermojmontenegro-hub/AIDZero"
            target="_blank"
            rel="noreferrer"
          >
            <div className="agent-diagram" aria-hidden="true">
              <span className="diagram-input">prompt</span>
              <span className="diagram-connector" />
              <strong>
                AID<span>Zero</span>
                <small>AGENT RUNTIME</small>
              </strong>
              <div className="diagram-outputs">
                <span>LLM</span>
                <span>TOOLS</span>
                <span>MCP</span>
              </div>
            </div>
            <div className="work-caption">
              <p className="eyebrow">
                01 —{" "}
                {t("Proyecto personal / Python", "Personal project / Python")}
              </p>
              <h3>
                AIDZero <span aria-hidden="true">↗</span>
              </h3>
              <p>
                {t(
                  "Un runtime modular para agentes LLM. Herramientas locales, adaptadores de modelos, perfiles de agente y un gateway MCP para experimentar con automatización y orquestación.",
                  "A modular runtime for LLM agents. Local tools, model adapters, agent profiles and an MCP gateway for experimenting with automation and orchestration.",
                )}
              </p>
            </div>
          </a>
          <article className="work-corporate reveal">
            <p className="eyebrow">
              02 — {t("Experiencia corporativa", "Corporate experience")}
            </p>
            <h3>
              {t("Software que llega", "Software that reaches")}
              <br />
              <em>{t("a la operación.", "daily operations.")}</em>
            </h3>
            <p>
              {t(
                "Proyectos realizados en Mobile Computing: desde aplicaciones móviles hasta servicios e interfaces web.",
                "Projects delivered at Mobile Computing: from mobile applications to services and web interfaces.",
              )}
            </p>
            <ul className="client-ledger">
              <li>
                <strong>Walmart · HSBC · Samsung</strong>
                <span>Android</span>
              </li>
              <li>
                <strong>Bagó · Banelco/Prisma</strong>
                <span>Android / iOS</span>
              </li>
              <li>
                <strong>AB InBev</strong>
                <span>Android / Java</span>
              </li>
              <li>
                <strong>Sociedad Rural Argentina</strong>
                <span>React / Java</span>
              </li>
            </ul>
            <a className="folio-text-link" href="#experiencia">
              {t("Ver el recorrido", "Explore my background")} ↓
            </a>
          </article>
        </div>
      </section>

      <section id="skills" className="expertise-section">
        <div className="folio-container folio-section">
          <div className="folio-section-heading reveal">
            <p className="eyebrow">02 / {t("Especialidades", "Expertise")}</p>
            <h2>
              {t("Distintas herramientas.", "Different tools.")}
              <br />
              <em>{t("El mismo criterio.", "The same care.")}</em>
            </h2>
            <p>
              {t(
                "Elegir la tecnología es parte del trabajo. Hacé clic en cada área para conocer cómo la aplico.",
                "Choosing the technology is part of the job. Select an area to see how I put it to work.",
              )}
            </p>
          </div>
          <div className="reveal">
            <ExpertiseExplorer
              groups={groups}
              label={t("Explorar especialidades", "Explore expertise")}
            />
          </div>
        </div>
      </section>

      <section
        id="experiencia"
        className="folio-container folio-section journey-section"
      >
        <div className="journey-heading reveal">
          <p className="eyebrow">03 / {t("Recorrido", "Background")}</p>
          <h2>
            {t("La experiencia", "Experience")}
            <br />
            <em>{t("se construye.", "is built.")}</em>
          </h2>
          <p>
            {t(
              "De la calidad industrial al desarrollo de software, y de ahí a crear y liderar un área de I+D durante cuatro años.",
              "From industrial quality to software development, then founding and leading an R&D area for four years.",
            )}
          </p>
          <a
            href={`/assets/guillermo-montenegro-cv-${locale}.pdf`}
            download
            className="folio-text-link"
          >
            {t("El CV completo", "The full CV")} ↓
          </a>
        </div>
        <div className="journey-list">
          {p.experience.map((item, index) => (
            <details
              key={item.company}
              className="journey-entry reveal"
              open={index === 0}
            >
              <summary>
                <span className="journey-period">{item.period}</span>
                <span>
                  <h3>{item.company}</h3>
                  <span className="journey-role">{item.role}</span>
                </span>
                <span className="journey-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul>
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="folio-container folio-section notes-section">
        <div className="folio-section-heading reveal">
          <p className="eyebrow">
            04 / {t("Notas de trabajo", "Working notes")}
          </p>
          <h2>
            {t("También escribo", "I also write")}
            <br />
            <em>{t("lo que aprendo.", "what I learn.")}</em>
          </h2>
          <Link
            className="folio-text-link"
            href={withLocale("/articulos", locale)}
          >
            {t(
              `Explorar los ${articles.length} artículos`,
              `Explore all ${articles.length} articles`,
            )}{" "}
            ↗
          </Link>
        </div>
        <div className="folio-notes">
          {articles.slice(0, 3).map((a, i) => (
            <Link
              className="folio-note reveal"
              key={a.slug}
              href={withLocale(`/articulos/${a.slug}`, locale)}
            >
              <span className="note-number">0{i + 1}</span>
              <div>
                <p className="eyebrow">
                  {a.tags.slice(0, 2).join(" / ")} ·{" "}
                  {formatArticleDate(a.date, locale)}
                </p>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
              <span className="note-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="folio-container folio-credentials reveal">
        <div>
          <p className="eyebrow">{t("Formación", "Education")}</p>
          {p.education.map((e) => (
            <p key={e.title}>
              <strong>{e.title}</strong>
              <br />
              <span>
                {e.institution} · {e.period}
              </span>
            </p>
          ))}
        </div>
        <div>
          <p className="eyebrow">{t("Idiomas", "Languages")}</p>
          {p.languages.map((l) => (
            <p key={l.name}>
              <strong>{l.name}</strong> <span>— {l.level}</span>
            </p>
          ))}
        </div>
      </section>

      <footer id="contacto" className="folio-contact">
        <div className="folio-container">
          <div className="contact-topline">
            <p className="eyebrow">05 / {t("Contacto", "Contact")}</p>
            <span>Buenos Aires, Argentina</span>
          </div>
          <h2>
            {t("¿Qué podemos", "What can we")}
            <br />
            <em>{t("construir juntos?", "build together?")}</em>
          </h2>
          <a className="contact-email" href={`mailto:${p.contact.email}`}>
            {p.contact.email}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-bottom">
            <span>
              Guillermo J. Montenegro
              <br />
              {p.headline}
            </span>
            <div>
              <a href={p.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={p.contact.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a
                href={`https://wa.me/${p.contact.whatsapp?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ↗
              </a>
              {p.contact.telegram && (
                <a
                  href={`https://t.me/${p.contact.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram ↗
                </a>
              )}
            </div>
            <a href="#intro-title">{t("Volver arriba", "Back to top")} ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
