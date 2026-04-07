# Product Spec - Sitio CV y Biblioteca Técnica

## 1. Propósito
Publicar un sitio personal que funcione como curriculum online, carta de presentación técnica y biblioteca de artículos propios sobre IA aplicada, agentes, modelos locales y desarrollo de software.

## 2. Objetivos del producto
- Presentar a Guillermo J. Montenegro como perfil senior de software con foco actual en IA aplicada.
- Dar contexto profesional con experiencia, skills, proyectos, educación, idiomas y contacto.
- Mostrar artículos técnicos propios como prueba de investigación, criterio técnico y capacidad de comunicación.
- Permitir navegación simple entre perfil y artículos tanto en español como en inglés.

## 3. Audiencia objetivo
- Recruiters técnicos y no técnicos.
- Engineering managers y technical leads.
- Clientes o partners que evalúan consultoría o colaboración.
- Colegas interesados en investigación aplicada con LLMs y agentes.

## 4. Fuentes de contenido
- Perfil principal: `content/profile/profile.es.json`
- Perfil en inglés: `content/profile/profile.en.json`
- Artículos: `Articulos/<slug>/index.md`
- Assets de artículos: previews e imágenes dentro de cada carpeta en `Articulos/`

## 5. Alcance actual
- Home `/` con:
  - hero y resumen profesional
  - experiencia
  - skills
  - proyectos
  - educación
  - idiomas
  - contacto
- Biblioteca `/articulos` con listado, búsqueda y filtrado por tags.
- Detalle `/articulos/[slug]` renderizado desde Markdown.
- Selector de idioma `es/en` por query param.
- SEO base con metadata, sitemap y robots.

## 6. Fuera de alcance
- CMS o panel de edición.
- Comentarios o interacción social en artículos.
- Formularios de contacto persistentes.
- Analytics personalizados.
- Login o autenticación.

## 7. Propuesta de valor
- El CV no se limita a una ficha laboral: conecta trayectoria, investigación y producción escrita.
- Los artículos sirven como evidencia pública del tipo de problemas que el autor investiga y explica.
- La experiencia se presenta con tono editorial, no como plantilla corporativa genérica.

## 8. Requisitos funcionales
1. El sitio debe cargar el perfil desde archivos JSON locales por idioma.
2. Debe listar automáticamente todos los artículos detectados en `Articulos/`.
3. Cada artículo debe resolverse por `slug` usando el nombre de carpeta.
4. Debe mostrar preview del artículo si existe un archivo `preview.(png|jpg|jpeg|webp)`.
5. Debe soportar deep link a home, listado y detalle de artículo.
6. Debe exponer contacto directo por email y enlaces externos disponibles.
7. Debe permitir alternar idioma sin duplicar la estructura del sitio.
8. Debe ofrecer búsqueda y filtrado por tags en la biblioteca de artículos.

## 9. Requisitos no funcionales
- Responsive desde mobile a desktop.
- Accesibilidad base con estructura semántica, textos alternativos y navegación clara.
- Mantenibilidad: contenido desacoplado en JSON y Markdown.
- Rendimiento: render estático donde sea posible.
- Portabilidad: deploy simple en plataformas compatibles con Next.js.

## 10. Arquitectura de información
- `/`
  - perfil profesional
  - experiencia
  - skills y proyectos
  - artículos destacados
  - educación e idiomas
  - contacto
- `/articulos`
  - introducción editorial
  - métricas de biblioteca
  - explorador con filtros y búsqueda
- `/articulos/[slug]`
  - metadata del artículo
  - contenido renderizado
  - navegación a otros artículos

## 11. Criterios de aceptación
1. La home refleja correctamente los datos presentes en `content/profile`.
2. La biblioteca coincide con las carpetas disponibles en `Articulos/`.
3. Cada artículo se visualiza en su ruta y resuelve sus assets internos.
4. El sitio puede navegarse en español e inglés.
5. El contenido de contacto queda visible y accionable en la home.
6. La documentación del proyecto permite entender el propósito del sitio sin abrir el código.
