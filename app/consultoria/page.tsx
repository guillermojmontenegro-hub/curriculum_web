import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getLocale, withLocale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Consultoría informática para pequeños negocios | Guillermo Montenegro",
  description:
    "Consultoría informática práctica para pequeños negocios: reutilización de hardware, software a medida, seguridad, automatización e IA.",
};

type IconName = "reuse" | "unify" | "automate" | "secure";

function ServiceIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    reuse: <><path d="M7 7h9.5l-2.6-2.6M17 17H7.5l2.6 2.6" /><path d="M17 7a7 7 0 0 1 0 10M7 17a7 7 0 0 1 0-10" /></>,
    unify: <><rect x="4" y="5" width="16" height="5" rx="1.5" /><rect x="4" y="14" width="16" height="5" rx="1.5" /><path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4" /></>,
    automate: <><path d="M13 3 5.5 13H11l-1 8L18.5 11H13z" /></>,
    secure: <><path d="M12 3.5 19 6v5.2c0 4.4-3 7.6-7 9.3-4-1.7-7-4.9-7-9.3V6z" /><path d="m9 12 2 2 4-4" /></>,
  };

  return (
    <span className="consulting-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">{paths[name]}</svg>
    </span>
  );
}

const copy = {
  es: {
    eyebrow: "Consultoría informática para pequeños negocios",
    title: "Mejorá tu operación sin empezar de cero.",
    lead: "Ordeno y conecto la tecnología de tu negocio para que trabajes con menos tareas manuales, más información útil y un control real de la operación.",
    availability: "Diagnóstico inicial",
    primaryAction: "Hablemos de tu negocio",
    secondaryAction: "Conocer el enfoque",
    proof: [
      ["01", "Sin gastos innecesarios", "Primero se aprovecha lo que ya tenés."],
      ["02", "A tu medida", "Soluciones que acompañan tu forma de trabajar."],
      ["03", "Con control", "Datos centralizados, respaldados y accesibles."],
    ],
    approachKicker: "El enfoque",
    approachTitle: "Tecnología práctica, pensada para el día a día del negocio.",
    approachCopy: "No se trata de sumar herramientas por moda. Se trata de detectar dónde se pierde tiempo, dónde falta información y qué puede simplificarse con una solución realista.",
    services: [
      ["reuse", "Aprovechar antes de comprar", "Reviso el hardware actual y priorizo reutilizarlo, repararlo o complementarlo con equipos reacondicionados cuando convenga. La inversión se destina a lo que de verdad mejora el trabajo."],
      ["unify", "Una sola vista de la información", "Integro los datos importantes del negocio —clientes, ventas, tareas, stock o documentos— para evitar planillas dispersas, duplicación y decisiones a ciegas."],
      ["automate", "Software y automatización a medida", "Desarrollo herramientas simples que encajan con tu operación. Las tareas repetitivas pueden automatizarse e incorporar IA cuando aporte velocidad, asistencia o mejores respuestas."],
      ["secure", "Seguridad sin complejidad", "Organizo accesos, copias de respaldo y buenas prácticas para que la información esté protegida, disponible y bajo control del negocio."],
    ] as [IconName, string, string][],
    processKicker: "Cómo trabajamos",
    processTitle: "Un avance gradual, con prioridades claras.",
    steps: [
      ["01", "Entender la operación", "Relevamos cómo se trabaja hoy, qué información importa y dónde aparecen los problemas."],
      ["02", "Definir un plan posible", "Priorizamos mejoras de impacto rápido y armamos una hoja de ruta acorde al presupuesto."],
      ["03", "Implementar por etapas", "Conectamos, automatizamos o desarrollamos lo necesario sin frenar el negocio."],
      ["04", "Dejar capacidad instalada", "Documentación, capacitación y una base preparada para seguir creciendo."],
    ],
    audienceKicker: "Para quién es",
    audienceTitle: "Para negocios que necesitan que la tecnología acompañe, no complique.",
    audience: ["Comercios y servicios", "Oficinas y estudios profesionales", "Emprendimientos en crecimiento", "Equipos que dependen de planillas, WhatsApp y tareas manuales"],
    ctaKicker: "Empecemos con lo que ya tenés",
    ctaTitle: "Tu próximo sistema puede empezar con una buena conversación.",
    ctaCopy: "Contame cómo funciona hoy tu negocio y qué te gustaría mejorar. Evaluamos una primera etapa concreta, sin comprometerte a inversiones grandes.",
    emailAction: "Escribirme ahora",
    telegramAction: "Abrir Telegram",
    whatsappAction: "Enviar WhatsApp",
    profileAction: "Ver perfil profesional",
  },
  en: {
    eyebrow: "IT consulting for small businesses",
    title: "Improve your operations without starting from scratch.",
    lead: "I organize and connect your business technology so you can work with fewer manual tasks, more useful information, and real operational control.",
    availability: "Initial assessment",
    primaryAction: "Let's talk about your business",
    secondaryAction: "See the approach",
    proof: [
      ["01", "No unnecessary spend", "Start by making the most of what you already have."],
      ["02", "Built around you", "Solutions that fit the way you work."],
      ["03", "In control", "Centralized, backed-up, accessible data."],
    ],
    approachKicker: "The approach",
    approachTitle: "Practical technology, designed for daily business work.",
    approachCopy: "This is not about adding tools because they are trendy. It is about finding where time is lost, where information is missing, and what can be made simpler with a realistic solution.",
    services: [
      ["reuse", "Make the most of what you have", "I assess your current hardware and prioritize reusing, repairing, or complementing it with refurbished equipment where appropriate. Investment goes to what truly improves the work."],
      ["unify", "One view of your information", "I bring together essential business data —customers, sales, tasks, inventory, or documents— to avoid scattered spreadsheets, duplication, and blind decisions."],
      ["automate", "Custom software and automation", "I build simple tools that fit your operations. Repetitive work can be automated and enhanced with AI when it adds speed, assistance, or better responses."],
      ["secure", "Security without complexity", "I organize access, backups, and good practices so your information is protected, available, and under the business's control."],
    ] as [IconName, string, string][],
    processKicker: "How we work",
    processTitle: "Gradual progress, with clear priorities.",
    steps: [
      ["01", "Understand the operation", "We map how work gets done today, what information matters, and where problems occur."],
      ["02", "Define a feasible plan", "We prioritize high-impact improvements and shape a roadmap that matches the budget."],
      ["03", "Implement in stages", "We connect, automate, or build what is needed without stopping the business."],
      ["04", "Leave capability in place", "Documentation, training, and a foundation ready to keep growing."],
    ],
    audienceKicker: "Who it is for",
    audienceTitle: "For businesses that need technology to help, not complicate things.",
    audience: ["Retail and service businesses", "Offices and professional firms", "Growing ventures", "Teams relying on spreadsheets, WhatsApp, and manual work"],
    ctaKicker: "Start with what you have",
    ctaTitle: "Your next system can start with a good conversation.",
    ctaCopy: "Tell me how your business works today and what you would like to improve. We can evaluate a concrete first stage without committing to major investments.",
    emailAction: "Email me now",
    telegramAction: "Open Telegram",
    whatsappAction: "Message on WhatsApp",
    profileAction: "View professional profile",
  },
};

export default async function ConsultingPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locale = getLocale(resolvedSearchParams?.lang);
  const content = copy[locale];
  const profile = getProfile(locale);

  return (
    <main className="page-shell consulting-shell">
      <SiteHeader locale={locale} />

      <section className="container consulting-hero">
        <div className="consulting-hero-glow" aria-hidden="true" />
        <div className="consulting-hero-copy reveal">
          <div className="hero-intro-row">
            <p className="section-kicker">{content.eyebrow}</p>
            <span className="availability-pill"><span aria-hidden="true" />{content.availability}</span>
          </div>
          <h1 className="consulting-title">{content.title}</h1>
          <p className="consulting-lead">{content.lead}</p>
          <div className="hero-actions">
            <a className="button-primary" href={`mailto:${profile.contact.email}?subject=${encodeURIComponent("Consulta sobre consultoría informática")}`}>
              {content.primaryAction}
            </a>
            <a className="button-secondary" href="#enfoque">{content.secondaryAction}</a>
          </div>
        </div>

        <div className="consulting-proof-grid reveal" style={{ "--delay": "120ms" } as CSSProperties}>
          {content.proof.map(([number, title, detail]) => (
            <article key={number} className="consulting-proof-card">
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="enfoque" className="container section-shell">
        <div className="section-heading-row reveal">
          <div>
            <p className="section-kicker numbered-kicker"><span>01</span>{content.approachKicker}</p>
            <h2 className="section-title">{content.approachTitle}</h2>
          </div>
          <p className="section-copy">{content.approachCopy}</p>
        </div>
        <div className="consulting-services-grid">
          {content.services.map(([icon, title, description], index) => (
            <article key={title} className="consulting-service-card reveal" style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
              <ServiceIcon name={icon} />
              <span className="consulting-card-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-shell consulting-process-section">
        <div className="section-heading-row reveal">
          <div>
            <p className="section-kicker numbered-kicker"><span>02</span>{content.processKicker}</p>
            <h2 className="section-title">{content.processTitle}</h2>
          </div>
        </div>
        <ol className="consulting-steps">
          {content.steps.map(([number, title, description], index) => (
            <li key={number} className="reveal" style={{ "--delay": `${index * 100}ms` } as CSSProperties}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section-shell">
        <article className="consulting-audience-card reveal">
          <div>
            <p className="section-kicker numbered-kicker"><span>03</span>{content.audienceKicker}</p>
            <h2 className="section-title">{content.audienceTitle}</h2>
          </div>
          <ul>
            {content.audience.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>

      <section className="container section-shell consulting-cta-section">
        <article className="consulting-cta card reveal">
          <div>
            <p className="section-kicker">{content.ctaKicker}</p>
            <h2 className="section-title">{content.ctaTitle}</h2>
            <p className="section-copy">{content.ctaCopy}</p>
          </div>
          <div className="hero-actions">
            {profile.contact.whatsapp ? (
              <a
                className="button-primary"
                href={`https://wa.me/${profile.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {content.whatsappAction}
              </a>
            ) : null}
            {profile.contact.telegram ? (
              <a
                className="button-secondary"
                href={`https://t.me/${profile.contact.telegram}`}
                target="_blank"
                rel="noreferrer"
              >
                {content.telegramAction}
              </a>
            ) : null}
            <a className="button-secondary" href={`mailto:${profile.contact.email}?subject=${encodeURIComponent("Consulta sobre consultoría informática")}`}>{content.emailAction}</a>
            <Link className="button-secondary" href={withLocale("/", locale)}>{content.profileAction}</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
