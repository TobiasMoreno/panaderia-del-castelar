# Auditoría SEO — 15 de septiembre de 2026

## Alcance y estado inicial

Puntaje técnico estimado antes de cambios: **8/10**. No es una medición de ranking
ni de tráfico. Se revisaron package.json, Next.js, Firebase, workflow de despliegue,
entorno del dominio, todas las rutas/componentes, CSS, productos, archivos públicos,
pruebas y HTML exportado. No existen index.html fuente, Vite ni manifest/PWA;
Next.js genera `out/index.html` durante el build.

Origen confirmado en el repositorio y consultado por HTTP:
`https://panaderia-del-castelar.web.app`. Inicio y Productos devuelven 200,
robots permite `/` y sitemap contiene solamente esas dos páginas. Los canonical
apuntan al origen correcto y la imagen social existe, mide 1024 × 768 y es del local.
El logo original de 406 × 406 se usa como favicon y apple icon.

## Diagnóstico y clasificación

**Crítico:** ninguno encontrado. No hay bloqueo de producción, metadata ausente,
contenido público vacío ni requisito de backend para hacerlo rastreable.

| Nivel | Qué se encontró | Impacto | Solución |
| --- | --- | --- | --- |
| Importante | `/productos/` devuelve 404 en Hosting, aunque `/productos` devuelve 200. | Enlaces externos con barra final fallan y pueden desperdiciar señales de enlaces/rastreo. | `trailingSlash: false` en Firebase para normalizar la URL mediante redirect. |
| Importante | HTML de 404 y `/_not-found` combina `noindex` automático e `index, follow` heredado, y usa el título del Inicio. | Noindex ya protege el error, pero las instrucciones son contradictorias y el título confunde. | No heredar indexación desde el layout; metadata explícita de error, sin canonical. |
| Importante | JavaScript inicial incluye imports estáticos de Firebase Analytics. | Aumenta descarga y trabajo del cliente sin aportar contenido indexable. | Imports dinámicos, manteniendo Analytics y manejando fallas de soporte/red. |
| Importante | Caché desplegada de una hora para HTML, imágenes y assets con hash. | Desaprovecha caché persistente de assets y puede conservar HTML viejo en navegadores. | Revalidar HTML/datos; un año immutable solo para `/_next/static/**`; un día para imágenes sin hash. |
| Importante | README recomienda un servidor Next.js y afirma que no hay exportación estática; `npm start` llama `next start` con `output: export`. | Puede conducir a un despliegue incompatible y evita verificar el artefacto real. | Documentar Hosting Spark y agregar preview local de archivos sin dependencias. |
| Mejora opcional | Título HTML del catálogo poco descriptivo; OG/Twitter dicen solamente “Productos”. | Pierde contexto en resultados y enlaces compartidos. | Título descriptivo con ubicación real y marca coherente en las tres variantes. |
| Mejora opcional | Los `.txt` de navegación Next y `public/products/SOURCES.md` son descargables. | Son archivos auxiliares sin valor como resultados de búsqueda. | Header `X-Robots-Tag: noindex` sobre `.txt`/`.md`, sin bloquear crawling ni navegación. |
| Mejora opcional | JSON-LD Bakery no tiene identificador estable. | Dificulta referenciar la misma entidad al ampliar datos estructurados. | Agregar `@id` estable; conservar solo información existente del negocio. |
| Mejora opcional | JPEG originales sin srcset optimizado; producto más pesado alrededor de 196 KB. | Descarga mayor que imágenes adaptadas a móvil; impacto real pendiente de medición. | Mantener lazy loading/dimensiones y caché; considerar variantes estáticas WebP/AVIF en una etapa posterior. |
| Mejora opcional | Favicon JPEG grande e imagen social 4:3. | Pueden optimizarse para compatibilidad y recortes de redes; ya existen y funcionan como assets. | Considerar favicon PNG/ICO y tarjeta 1200 × 630 basada en la identidad y foto real. |

## Arquitectura, contenido y rastreo

La aplicación usa React con navegación cliente, pero **no entrega un shell SPA vacío**.
Next.js App Router con `output: "export"` prerenderiza el contenido en archivos HTML.
Inicio contiene presentación, familias destacadas, local, café, domicilio y horarios;
Productos contiene las siete familias con headings, imágenes y descripciones.
Los componentes cliente también tienen HTML inicial: el catálogo empieza en “Todos”.
Los filtros, historial, menú, animaciones, mapa interactivo y Analytics requieren JS;
la información comercial y el catálogo no lo requieren. Una URL filtrada comparte
el HTML de Productos y aplica el filtro tras hidratar; conserva su canonical limpio.
No se crearon páginas indexables para filtros sin contenido independiente.

Hay un `main` y un `h1` por página, `header`, navegación etiquetada, `footer`, secciones
con títulos, h2/h3 coherentes, skip link, foco visible, tabla de horarios con caption y
scope, menú con teclado y soporte reduced motion. Todas las imágenes de contenido
tienen alt descriptivo; las de stock se identifican como ilustrativas. Se conservaron
el diseño, los headings editoriales y las descripciones sin agregar keywords repetidas.
Las dos rutas públicas tienen enlaces internos; los fragmentos de Inicio no son páginas
separadas. No hay login, área privada, resultados individuales ni rutas dinámicas ocultas.

El sitemap y robots existentes eran correctos y se conservaron. No se agregaron fechas
lastmod inventadas ni rutas de filtros. Sin `NEXT_PUBLIC_SITE_URL`, el build conserva
noindex, robots bloqueado y sitemap vacío para proteger una configuración incompleta.
Esa variable queda fijada al compilar: cambiarla exige recompilar y volver a publicar.

## Firebase Hosting

Directorio `out` correcto; `cleanUrls: true` sirve `productos.html` desde `/productos`
y redirige la extensión `.html`. `/index` ya redirige a `/`; no requiere otra regla.
Se agregó normalización de barra final. No existen rewrites ni redirects personalizados.
No se agregó rewrite `**` a `/index.html`: aquí devolvería Inicio para rutas inexistentes,
perdería el HTML propio por ruta y produciría errores soft 404. Firebase usa `404.html`
para devolver errores HTTP reales. `/_not-found` es un artefacto exportado accesible con
200, pero su HTML queda noindex y fuera del sitemap.

Se conservaron los headers de seguridad. Las reglas de caché y noindex de auxiliares
se aplican en Hosting después del despliegue; el preview local comprueba HTML/rutas,
no reproduce todos los headers de Firebase. No se añadieron Functions, Cloud Run,
SSR en producción, dependencias ni funcionalidades Blaze.

## Validación

- `npm run build`: correcto; todas las rutas públicas y metadata exportadas como estáticas.
- `npm run typecheck`: correcto.
- `npm run lint`: correcto. Se excluyó `out/` para no analizar bundles generados.
- `npm run test:e2e`: **24 pruebas aprobadas** sobre el artefacto estático, Chromium.
- Contenido/metadata comprobados con JavaScript deshabilitado, incluyendo las siete
  familias del catálogo, JSON-LD, imágenes sociales y correspondencia sitemap/canonical.
- Filtros e historial conservados; errores sin directivas `index` contradictorias.
- Sin imágenes rotas ni overflow en ocho anchos por página; axe sin infracciones
  detectadas en las dos páginas; CLS inicial local **0**.
- `git diff --check`: correcto.
- Emulador Firebase Hosting con proyecto demo: rutas públicas 200, `/productos/`
  y `/productos.html` redirigen 301 a `/productos`, `/index` redirige al Inicio,
  rutas inexistentes devuelven 404, robots y sitemap responden correctamente.
- Los selectores de headers se comprobaron con normalización POSIX. El emulador
  instalado en Windows no emite ningún header personalizado: se confirmó en su
  código local que `glob-slasher` convierte los patrones a barras inversas y
  `minimatch` no los reconoce. Por esa limitación, la aplicación efectiva de
  caché y `X-Robots-Tag` debe comprobarse en Hosting después de publicar.

No se repitió Lighthouse ni se midieron Core Web Vitals de usuarios reales; no se
afirma una mejora numérica de rendimiento. Puntaje técnico estimado del repositorio
corregido: **9/10**, pendiente de publicación y validaciones externas.
La revisión HTTP inicial verificó el sitio publicado; los cambios nuevos se validaron
localmente y necesitan publicación para modificar ese sitio.

## Mejoras que quedan fuera de esta implementación

- SSR adicional o migración a otro framework: el prerendering gratuito ya existe.
- Librería de metadata: se aprovecha la API nativa de Next.js.
- Manifest/service worker: no hay experiencia PWA solicitada y no son requisito SEO.
- Product/Offer/reviews/ratings, coordenadas, códigos postales o precios en schema:
  no hay datos suficientes confirmados. Bakery usa nombre, domicilio, teléfono,
  horarios, Maps e Instagram presentes en el repositorio; no garantiza un rich result.
- Páginas por producto/categoría: el catálogo representa familias y no ofrece contenido
  oficial suficiente para páginas independientes útiles.
- Conversión de imágenes y nueva tarjeta social: requiere un flujo de assets estáticos
  y revisión visual; los archivos actuales son moderados y no justifican cambiar la arquitectura.
- Redirect entre dominios Hosting y un futuro dominio propio: falta una decisión sobre
  ese dominio. El canonical actual consolida al dominio web.app configurado.
- Publicación automática de esta revisión: no se solicitó deploy ni push.

## Próximos pasos

1. Publicar el build y comprobar `/productos/` → `/productos`, 404 reales y headers.
2. Verificar propiedad en Google Search Console, enviar `/sitemap.xml` e inspeccionar
   Inicio/Productos usando la prueba de URL publicada.
3. Validar tarjetas Open Graph/Twitter y el JSON-LD en Rich Results Test.
4. Repetir Lighthouse/PageSpeed Insights en el sitio público y revisar Core Web Vitals
   reales cuando haya datos. El reporte local histórico no describe esta revisión.
5. Confirmar horarios/contacto con el negocio y sustituir fotos ilustrativas por producto real.

Referencias: [exportación estática de Next.js](https://nextjs.org/docs/app/guides/static-exports),
[configuración de Hosting](https://firebase.google.com/docs/hosting/full-config),
[SEO con JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[consolidación de URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
