# Stack del Proyecto

## Resumen
Sitio personal de curriculum y artículos técnicos construido como aplicación estática con `Next.js`, contenido local versionado y una capa liviana de internacionalización.

## Tecnologías utilizadas
- Framework: `Next.js 15.5`
- UI: `React 19`
- Lenguaje: `TypeScript`
- Estilos: `CSS global` y utilidades compatibles con `Tailwind CSS v4`
- Renderizado Markdown: `marked`
- Tipografías: `next/font/google`
- Calidad de código: `ESLint` y `Prettier`

## Dependencias principales actuales
- `next`
- `react`
- `react-dom`
- `marked`

## Dependencias de desarrollo
- `typescript`
- `eslint`
- `eslint-config-next`
- `prettier`
- `tailwindcss`
- `@tailwindcss/postcss`
- tipos de React y Node

## Por qué este stack funciona bien acá
- `Next.js App Router` permite una home editorial, listado y detalle de artículos con muy poca complejidad operativa.
- `TypeScript` ayuda a mantener consistencia entre perfil, artículos y UI.
- `marked` alcanza para el volumen y complejidad actual del contenido sin sumar un pipeline más pesado.
- El contenido local en JSON y Markdown hace que el repositorio sea autosuficiente.

## Estrategia de renderizado
- Home: estática.
- Biblioteca de artículos: estática.
- Detalle de artículo: estático con `generateStaticParams`.
- Assets de artículos: servidos por rutas API locales.

## Convenciones de contenido
- Perfil editable en `content/profile/profile.es.json` y `content/profile/profile.en.json`.
- Cada artículo vive en su propia carpeta dentro de `Articulos/`.
- Los previews usan convención `preview.(png|jpg|jpeg|webp)`.

## Consideraciones operativas
- Compatible con deploy simple en Vercel o cualquier entorno Node que soporte Next 15.
- Requiere definir el dominio real para reemplazar placeholders en `sitemap` y `robots`.
- El lockfile actual es `package-lock.json`, por lo que el flujo esperado es con `npm`.

## Evolución razonable del stack
- Añadir tests de contenido y rutas.
- Incorporar validación de schema para `profile.*.json`.
- Resolver metadata con dominio configurable por variable de entorno.
