export type Locale = "es" | "en";

type Dictionary = {
  localeSwitchLabel: string;
  themeToggleToLight: string;
  themeToggleToDark: string;
  brandSubtitle: string;
  nav: {
    experience: string;
    skills: string;
    contact: string;
    articles: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    contactMe: string;
    exploreArticles: string;
    stats: {
      experienceLabel: string;
      experienceDetail: string;
      articlesLabel: string;
      articlesDetail: string;
      topicsLabel: string;
      topicsDetail: string;
    };
    spotlightKicker: string;
    spotlightTitle: string;
    spotlightCopy: string;
    viewFullLibrary: string;
    experienceKicker: string;
    experienceTitle: string;
    experienceCopy: string;
    skillsKicker: string;
    skillsTitle: string;
    projectsKicker: string;
    projectsTitle: string;
    articlesKicker: string;
    articlesTitle: string;
    articlesCopy: string;
    readArticle: string;
    articleArchiveTitle: string;
    articleArchiveCopy: string;
    openArticlesLibrary: string;
    discussProjects: string;
    educationKicker: string;
    educationTitle: string;
    languagesKicker: string;
    languagesTitle: string;
    contactKicker: string;
    contactTitle: string;
    contactCopy: string;
    linkedinProfile: string;
    location: string;
    writeToMe: string;
    viewLinkedin: string;
    viewGithub: string;
    writtenBy: string;
    previewAlt: string;
  };
  articles: {
    backToProfile: string;
    libraryKicker: string;
    libraryTitle: string;
    libraryCopy: string;
    ownArticles: string;
    topicsToExplore: string;
    experienceLinkedContent: string;
    whyLibraryMatters: string;
    whyLibraryCopy: string;
    loadingTitle: string;
    loadingCopy: string;
    searchLabel: string;
    searchPlaceholder: string;
    clearFilters: string;
    all: string;
    featured: string;
    openArticle: string;
    read: string;
    noResultsTitle: string;
    noResultsCopy: string;
    resultsSummary: (count: number, tag: string) => string;
    writtenBy: string;
    by: string;
    previewAlt: string;
  };
  articleDetail: {
    backToArticles: string;
    articleKicker: string;
    professionalExperienceTitle: string;
    professionalExperienceCopy: string;
    guidedReadingKicker: string;
    guidedReadingTitle: string;
    guidedReadingCopy: string;
    viewAllArticles: string;
    contactMe: string;
    keepReadingKicker: string;
    keepReadingTitle: string;
    keepReadingCopy: string;
    writtenBy: string;
    by: string;
    previewAlt: string;
    notFoundTitle: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  es: {
    localeSwitchLabel: "English",
    themeToggleToLight: "Cambiar a modo claro",
    themeToggleToDark: "Cambiar a modo oscuro",
    brandSubtitle: "IA aplicada, software y contenido técnico",
    nav: {
      experience: "Experiencia",
      skills: "Skills",
      contact: "Contacto",
      articles: "Leer articulos",
    },
    home: {
      heroKicker: "Perfil profesional",
      heroTitle:
        "Desarrollador de software con mas de 15 años de experiencia en mobile, web e IA aplicada.",
      contactMe: "Contactarme",
      exploreArticles: "Explorar articulos",
      stats: {
        experienceLabel: "Etapas profesionales",
        experienceDetail:
          "Experiencia cruzando mobile, web, investigacion y producto.",
        articlesLabel: "Articulos técnicos propios",
        articlesDetail:
          "Contenido escrito por mi para documentar ideas, pruebas y aprendizajes.",
        topicsLabel: "Temas publicados",
        topicsDetail:
          "LLMs, agentes, modelos locales, redes neuronales y tool calling.",
      },
      spotlightKicker: "Publicaciones tecnicas",
      spotlightTitle: "Articulos escritos por",
      spotlightCopy:
        "Notas, guias y articulos sobre IA aplicada, agentes y desarrollo de software a partir de investigacion y experiencia practica.",
      viewFullLibrary: "Ver biblioteca completa",
      experienceKicker: "Experiencia",
      experienceTitle:
        "Trayectoria construida entre desarrollo, investigacion y entrega real de producto.",
      experienceCopy:
        "Mi perfil combina años de software engineering con una etapa reciente de investigacion aplicada en IA, siempre con foco en convertir exploracion tecnica en soluciones utilizables.",
      skillsKicker: "Skills",
      skillsTitle:
        "Stack amplio, con una base fuerte en software y una capa actual muy marcada en IA.",
      projectsKicker: "Proyectos y productos",
      projectsTitle:
        "Lineas de trabajo donde aporto investigacion, implementacion y criterio técnico.",
      articlesKicker: "Articulos propios",
      articlesTitle:
        "Escritura tecnica como extension directa de mi experiencia.",
      articlesCopy:
        "Cada articulo esta pensado para que quien visita el sitio entienda rapido que escribo sobre lo que realmente investigo, implemento y discuto en mi trabajo.",
      readArticle: "Leer articulo",
      articleArchiveTitle: "Queres ver todo el archivo?",
      articleArchiveCopy:
        "La biblioteca completa incluye notas conceptuales, guias y articulos de investigacion aplicada.",
      openArticlesLibrary: "Abrir biblioteca de articulos",
      discussProjects: "Hablemos de proyectos",
      educationKicker: "Educacion",
      educationTitle:
        "Base tecnica formal y aprendizaje continuo sostenido por experiencia real.",
      languagesKicker: "Idiomas",
      languagesTitle:
        "Trabajo y documentacion tecnica en contextos multiculturales.",
      contactKicker: "Contacto",
      contactTitle:
        "Disponible para proyectos, consultoria, investigacion aplicada y colaboraciones tecnicas.",
      contactCopy:
        "Si queres trabajar conmigo o profundizar sobre alguno de los articulos, podemos seguir la conversacion por correo o LinkedIn.",
      linkedinProfile: "Ver perfil profesional",
      location: "Ubicacion",
      writeToMe: "Escribirme",
      viewLinkedin: "Ver LinkedIn",
      viewGithub: "Ver GitHub",
      writtenBy: "Escrito por",
      previewAlt: "Preview de",
    },
    articles: {
      backToProfile: "← Volver al perfil",
      libraryKicker: "Biblioteca de articulos",
      libraryTitle: "Articulos escritos por",
      libraryCopy:
        "Esta seccion muestra una parte central de mi experiencia: investigacion aplicada, criterio técnico y capacidad para explicar con claridad lo que experimento, construyo y aprendo.",
      ownArticles: "articulos técnicos propios",
      topicsToExplore: "temas para explorar por tag",
      experienceLinkedContent:
        "contenido vinculado a mi experiencia y mirada profesional",
      whyLibraryMatters: "Por que esta biblioteca importa",
      whyLibraryCopy:
        "No es una coleccion aislada de posts. Son articulos que escribi para dejar evidencia de mi forma de pensar, investigar y resolver problemas en IA, agentes, modelos y desarrollo de software.",
      loadingTitle: "Cargando explorador de articulos...",
      loadingCopy:
        "Preparando filtros, busqueda y accesos rapidos a todo el contenido.",
      searchLabel: "Buscar por titulo, descripcion o tema",
      searchPlaceholder: "Ej: determinismo, agentes, modelos locales...",
      clearFilters: "Limpiar filtros",
      all: "Todos",
      featured: "Articulo destacado",
      openArticle: "Abrir articulo",
      read: "Leer",
      noResultsTitle: "No encontre articulos con ese filtro.",
      noResultsCopy:
        "Probá otra palabra clave o volvé a todos los temas para recorrer el contenido completo.",
      resultsSummary: (count, tag) =>
        `${count} articulo${count === 1 ? "" : "s"} visible${tag ? `s en #${tag}` : "s"}`,
      writtenBy: "Escrito por",
      by: "Por",
      previewAlt: "Preview de",
    },
    articleDetail: {
      backToArticles: "← Volver a articulos",
      articleKicker: "Articulo técnico propio",
      professionalExperienceTitle: "Parte de mi experiencia profesional",
      professionalExperienceCopy:
        "Este articulo forma parte de mi trabajo documentando investigacion aplicada, pruebas tecnicas y marcos de pensamiento relacionados con IA y desarrollo de software.",
      guidedReadingKicker: "Lectura guiada",
      guidedReadingTitle:
        "Este texto refleja como investigo y comunico problemas técnicos.",
      guidedReadingCopy:
        "Si queres ver mas contenido con la misma linea, la biblioteca completa agrupa estos articulos como parte de mi experiencia en IA aplicada y arquitectura de software.",
      viewAllArticles: "Ver todos los articulos",
      contactMe: "Contactarme",
      keepReadingKicker: "Seguir leyendo",
      keepReadingTitle: "Mas articulos escritos por",
      keepReadingCopy:
        "Una seleccion para seguir recorriendo la misma linea de investigacion y experiencia.",
      writtenBy: "Escrito por",
      by: "Por",
      previewAlt: "Preview de",
      notFoundTitle: "Artículo no encontrado",
    },
  },
  en: {
    localeSwitchLabel: "Español",
    themeToggleToLight: "Switch to light mode",
    themeToggleToDark: "Switch to dark mode",
    brandSubtitle: "Applied AI, software, and technical writing",
    nav: {
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      articles: "Read articles",
    },
    home: {
      heroKicker: "Professional profile",
      heroTitle:
        "Software developer with more than 15 years of experience across mobile, web, and applied AI.",
      contactMe: "Contact me",
      exploreArticles: "Explore articles",
      stats: {
        experienceLabel: "Career stages",
        experienceDetail:
          "Experience across mobile, web, research, and product work.",
        articlesLabel: "Original technical articles",
        articlesDetail:
          "Content written by me to document ideas, experiments, and learnings.",
        topicsLabel: "Published topics",
        topicsDetail:
          "LLMs, agents, local models, neural networks, and tool calling.",
      },
      spotlightKicker: "Technical publications",
      spotlightTitle: "Articles written by",
      spotlightCopy:
        "Notes, guides, and articles about applied AI, agents, and software development grounded in research and hands-on experience.",
      viewFullLibrary: "View full library",
      experienceKicker: "Experience",
      experienceTitle:
        "A path built across development, research, and real product delivery.",
      experienceCopy:
        "My profile combines years of software engineering with a recent stage in applied AI research, always focused on turning technical exploration into usable solutions.",
      skillsKicker: "Skills",
      skillsTitle:
        "A broad stack with a strong software foundation and a current emphasis on AI.",
      projectsKicker: "Projects and products",
      projectsTitle:
        "Workstreams where I contribute research, implementation, and technical judgment.",
      articlesKicker: "Original articles",
      articlesTitle:
        "Technical writing as a direct extension of my experience.",
      articlesCopy:
        "Each article is meant to quickly show visitors that I write about what I actually research, build, and discuss in my work.",
      readArticle: "Read article",
      articleArchiveTitle: "Want to see the full archive?",
      articleArchiveCopy:
        "The full library includes conceptual notes, guides, and applied research articles.",
      openArticlesLibrary: "Open article library",
      discussProjects: "Let's talk about projects",
      educationKicker: "Education",
      educationTitle:
        "Formal technical foundations and continuous learning sustained by real experience.",
      languagesKicker: "Languages",
      languagesTitle:
        "I work and produce technical documentation in multicultural contexts.",
      contactKicker: "Contact",
      contactTitle:
        "Available for projects, consulting, applied research, and technical collaborations.",
      contactCopy:
        "If you'd like to work with me or go deeper on any of the articles, we can continue the conversation by email or LinkedIn.",
      linkedinProfile: "View professional profile",
      location: "Location",
      writeToMe: "Email me",
      viewLinkedin: "View LinkedIn",
      viewGithub: "View GitHub",
      writtenBy: "Written by",
      previewAlt: "Preview of",
    },
    articles: {
      backToProfile: "← Back to profile",
      libraryKicker: "Article library",
      libraryTitle: "Articles written by",
      libraryCopy:
        "This section shows a central part of my experience: applied research, technical judgment, and the ability to clearly explain what I experiment with, build, and learn.",
      ownArticles: "original technical articles",
      topicsToExplore: "topics to explore by tag",
      experienceLinkedContent:
        "content directly connected to my experience and professional perspective",
      whyLibraryMatters: "Why this library matters",
      whyLibraryCopy:
        "This is not an isolated collection of posts. These are articles I wrote to show how I think, research, and solve problems in AI, agents, models, and software development.",
      loadingTitle: "Loading article explorer...",
      loadingCopy:
        "Preparing filters, search, and quick access to all the content.",
      searchLabel: "Search by title, description, or topic",
      searchPlaceholder: "Example: determinism, agents, local models...",
      clearFilters: "Clear filters",
      all: "All",
      featured: "Featured article",
      openArticle: "Open article",
      read: "Read",
      noResultsTitle: "I couldn't find articles for that filter.",
      noResultsCopy:
        "Try another keyword or go back to all topics to browse the full library.",
      resultsSummary: (count, tag) =>
        `${count} visible article${count === 1 ? "" : "s"}${tag ? ` in #${tag}` : ""}`,
      writtenBy: "Written by",
      by: "By",
      previewAlt: "Preview of",
    },
    articleDetail: {
      backToArticles: "← Back to articles",
      articleKicker: "Original technical article",
      professionalExperienceTitle: "Part of my professional experience",
      professionalExperienceCopy:
        "This article is part of my work documenting applied research, technical experiments, and thinking frameworks related to AI and software development.",
      guidedReadingKicker: "Guided reading",
      guidedReadingTitle:
        "This text reflects how I research and communicate technical problems.",
      guidedReadingCopy:
        "If you want to explore more content in the same direction, the full library brings these articles together as part of my experience in applied AI and software architecture.",
      viewAllArticles: "View all articles",
      contactMe: "Contact me",
      keepReadingKicker: "Keep reading",
      keepReadingTitle: "More articles written by",
      keepReadingCopy:
        "A selection to keep exploring the same line of research and experience.",
      writtenBy: "Written by",
      by: "By",
      previewAlt: "Preview of",
      notFoundTitle: "Article not found",
    },
  },
};

export function getLocale(value?: string | string[] | null): Locale {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === "en" ? "en" : "es";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function withLocale(path: string, locale: Locale): string {
  if (locale === "es") {
    return path;
  }

  const [basePath, hash = ""] = path.split("#");
  const separator = basePath.includes("?") ? "&" : "?";
  const localizedPath = `${basePath}${separator}lang=en`;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}
