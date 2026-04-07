# Technical Spec - Implementación Actual

## 1. Stack de ejecución
- Framework: `Next.js 15` con App Router
- Lenguaje: `TypeScript`
- UI: React 19
- Estilos: `globals.css` + Tailwind disponible en el proyecto
- Render de Markdown: `marked`
- Runtime esperado: `Node.js 20+`

## 2. Estructura real del proyecto
```txt
app/
  layout.tsx
  page.tsx
  globals.css
  sitemap.ts
  robots.ts
  articulos/
    page.tsx
    [slug]/page.tsx
  api/
    article-preview/[slug]/route.ts
    article-asset/[slug]/[...asset]/route.ts
components/
  articles-explorer.tsx
  hero-spotlight.tsx
  language-toggle.tsx
  site-header.tsx
content/
  profile/
    profile.es.json
    profile.en.json
lib/
  articles.ts
  formatters.ts
  i18n.ts
  profile.ts
  types.ts
Articulos/
  <slug>/
    index.md
    preview.*
    <assets-del-articulo>
spec/
  product-spec.md
  technical-spec.md
  stack.md
```

## 3. Modelo de datos

### Perfil
Fuente: `content/profile/profile.<locale>.json`

- `name: string`
- `headline: string`
- `summary: string`
- `skills: string[]`
- `experience: ExperienceItem[]`
- `projects: string[]`
- `education: EducationItem[]`
- `languages: LanguageItem[]`
- `contact: ContactData`

### Artículo
Fuente: `Articulos/<slug>/index.md`

- `slug: string`
- `title: string`
- `date: string`
- `description: string`
- `author: string`
- `tags: string[]`
- `previewImageUrl?: string`
- `contentHtml: string`

## 4. Capa de contenido

### `lib/profile.ts`
- Lee perfiles locales desde `content/profile`.
- Expone `getProfile(locale = "es")`.

### `lib/articles.ts`
- Descubre slugs desde el filesystem.
- Parsea frontmatter manualmente sin dependencia externa.
- Convierte Markdown a HTML con `marked`.
- Normaliza assets relativos del artículo hacia `/api/article-asset/...`.
- Expone:
  - `getAllArticleSlugs()`
  - `getAllArticlesMeta()`
  - `getArticleBySlug(slug)`
  - `findPreviewAssetPath(slug)`
  - `getArticleAssetPath(slug, segments)`

### `lib/i18n.ts`
- Define `Locale = "es" | "en"`.
- Resuelve copy de interfaz por idioma.
- Genera rutas preservando `?lang=en` cuando corresponde.

## 5. Rutas y comportamiento

### `/`
- Renderiza el perfil según idioma.
- Muestra artículos destacados y métricas calculadas desde `Articulos/`.

### `/articulos`
- Lista artículos ordenados por fecha descendente.
- Delega búsqueda y filtros al componente `ArticlesExplorer`.

### `/articulos/[slug]`
- Usa `generateStaticParams()` para pre-render estático.
- Usa `generateMetadata()` para SEO por artículo.
- Devuelve `notFound()` si el slug no existe.

### `/api/article-preview/[slug]`
- Sirve la preview local del artículo con `Content-Type` correcto.

### `/api/article-asset/[slug]/[...asset]`
- Sirve imágenes u otros assets referenciados dentro del Markdown.
- Protege contra path traversal resolviendo el path dentro de la carpeta del artículo.

### `/sitemap.xml` y `/robots.txt`
- Generados por Next metadata routes.
- Hoy usan `https://example.com` como placeholder de dominio, pendiente de actualizar al dominio final.

## 6. SEO y metadata
- Metadata global en `app/layout.tsx`.
- Metadata específica en listado y detalle de artículos.
- Open Graph básico en home y artículo.
- Sitemap generado desde slugs locales.

## 7. Decisiones de implementación
- El contenido permanece local y versionable junto al código.
- La i18n es liviana y basada en query param, sin routing segmentado por locale.
- Los artículos no dependen de CMS; el flujo editorial es editar Markdown y commitear.
- La resolución de previews y assets se hace vía rutas API para no mover archivos fuera de `Articulos/`.

## 8. QA sugerida antes de publicar
1. `npm run lint`
2. `npm run build`
3. Revisión manual de:
   - home en `es`
   - home en `en`
   - listado de artículos
   - al menos 2 artículos con imágenes
4. Validar que `sitemap` y `robots` usen el dominio final antes de producción
