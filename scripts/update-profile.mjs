// Actualiza los perfiles con los CV de BusquedaLaboral (noviembre de 2026).
// Ejecutar: node scripts/update-profile.mjs. Modifica únicamente los dos JSON del perfil.
import fs from "node:fs";
for (const locale of ["es", "en"]) {
  const file = `content/profile/profile.${locale}.json`;
  const p = JSON.parse(fs.readFileSync(file, "utf8"));
  const es = locale === "es";
  p.headline = es
    ? "Senior Software Engineer · Mobile, Web & AI"
    : "Senior Software Engineer · Mobile, Web & AI";
  p.summary = es
    ? "Soy Guillermo. Desarrollo software desde 2010: aplicaciones Android e iOS, productos web y servicios en Java y Python. En los últimos años llevé esa experiencia a la IA aplicada, los agentes y la automatización de procesos."
    : "I’m Guillermo. I’ve been building software since 2010: Android and iOS apps, web products, and Java and Python services. In recent years, I’ve brought that experience to applied AI, agents and process automation.";
  p.skills = [
    ...new Set([
      ...p.skills,
      "Power Automate",
      "FastAPI",
      "Agent Skills",
      "Langfuse",
      "Vertex AI",
      "Hugging Face",
      "Fine Tuning",
      "LoRA",
      "Codex",
      "Claude Code",
      "OpenCode",
      "Room",
      "Hilt",
      "Retrofit",
      "Coroutines",
      "Flow",
      "SwiftUI",
      "UIKit",
    ]),
  ];
  p.experience[0].highlights = es
    ? [
        "Continuidad de la relación laboral tras la adquisición de Mobile Computing por Grid Dynamics en marzo de 2025.",
        "Diseño y desarrollo de una aplicación web de negocio, desde la definición funcional hasta la entrega.",
        "Investigación aplicada con LLMs, agentes y orquestación de herramientas; prototipos y automatizaciones para el desarrollo de software.",
      ]
    : [
        "Continued employment following Grid Dynamics’ acquisition of Mobile Computing in March 2025.",
        "Designed and developed a business web application, from functional definition to delivery.",
        "Applied research with LLMs, agents and tool orchestration; prototypes and automation for software development.",
      ];
  p.experience[1].highlights = es
    ? [
        "Creé el área de Investigación y Desarrollo y la lideré durante cuatro años, con foco en IA aplicada a ingeniería de software y dirección técnica.",
        "Desarrollo Android e iOS para Walmart, Bagó, Banelco/Prisma, HSBC y Samsung.",
        "Backend Java para AB InBev y Sociedad Rural Argentina; integración con aplicaciones mobile y front ends web. React para Sociedad Rural Argentina.",
      ]
    : [
        "Founded the Research & Development area and led it for four years, focusing on AI applied to software engineering and technical direction.",
        "Android and iOS development for Walmart, Bagó, Banelco/Prisma, HSBC and Samsung.",
        "Java backend for AB InBev and Sociedad Rural Argentina; mobile and web integrations. React development for Sociedad Rural Argentina.",
      ];
  if (es) p.experience[3].period = "Jun 2001 - Dic 2009";
  p.projects = es
    ? [
        "AIDZero: runtime modular de agentes LLM en Python con herramientas locales, adaptadores de modelos y gateway MCP",
        "Sitio personal y biblioteca técnica en Next.js, React y TypeScript",
        "Proyectos corporativos Android, iOS, React y backend Java para Walmart, Bagó, AB InBev, Sociedad Rural Argentina, Banelco/Prisma, HSBC y Samsung",
      ]
    : [
        "AIDZero: modular Python LLM agent runtime with local tools, model adapters and MCP gateway",
        "Personal website and technical library built with Next.js, React and TypeScript",
        "Corporate Android, iOS, React and Java backend projects for Walmart, Bagó, AB InBev, Sociedad Rural Argentina, Banelco/Prisma, HSBC and Samsung",
      ];
  fs.writeFileSync(file, JSON.stringify(p, null, 2) + "\n");
}
