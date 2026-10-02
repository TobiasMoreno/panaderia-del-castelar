# Del Castelar — Panadería

Sitio oficial de presentación y catálogo para Del Castelar, Córdoba. Next.js App Router,
React, TypeScript, Tailwind CSS 4, Motion y Lucide. Sin ecommerce ni backend innecesario.

## Ejecutar

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para previsualizar la exportación de producción:
`npm run build` y `npm start`. El servidor local sirve `out/`, conserva las URLs sin
extensión y devuelve 404 reales; no reemplaza al emulador de Firebase para verificar headers.
Usar Node.js 24 LTS en producción. El entorno original usa Node 22.12: el sitio compila,
pero una dependencia de desarrollo (`eslint-visitor-keys`) declara Node 22.13 o superior.
ESLint 9 funciona en ese entorno; npm informa que esa rama ya no tiene soporte.

## Publicación y SEO

Configurar `NEXT_PUBLIC_SITE_URL` con el **dominio real** en el entorno de despliegue
antes del build, por ejemplo el origen HTTPS definitivo, sin ruta.
El origen actualmente configurado en GitHub Actions y en el entorno local de producción
es `https://panaderia-del-castelar.web.app`. Sin esa variable, se protege la vista previa con
`noindex`, robots bloqueado y sitemap vacío; tampoco se publica un canonical ficticio.
Con el dominio configurado se generan automáticamente canonical de ambas páginas,
sitemap, robots indexable, Open Graph, Twitter cards y URL del negocio en JSON-LD.

Se usa `output: "export"`: `npm run build` genera HTML estático en `out/` para Inicio,
Productos, 404, robots y sitemap. Firebase Hosting publica ese directorio en el plan
Spark, sin Functions, Cloud Run ni servidor Next.js. El workflow de GitHub Actions
compila y publica al actualizar `main`; también se puede usar `firebase deploy --only hosting`.
Las fuentes se descargan durante el build y se sirven localmente; el entorno de build
debe poder acceder a Google Fonts. `next/image` mantiene dimensiones y lazy loading,
pero usa los archivos originales: no hay optimización de imágenes en tiempo de ejecución.

`firebase.json` conserva `cleanUrls: true` y normaliza las barras finales. No hay rewrite
global al Inicio: las rutas públicas tienen su propio HTML y las inexistentes devuelven
404. HTML, robots, sitemap y datos de navegación se revalidan; los assets con hash se
cachean por un año y las imágenes por un día. Los archivos de datos `.txt` de Next.js y
la documentación `.md` pública llevan `X-Robots-Tag: noindex` sin bloquear su descarga.

Las dos páginas tienen title, descripción, canonical y tarjetas sociales propios.
El catálogo completo está en el HTML inicial; los filtros `?categoria=...` requieren
JavaScript y conservan el canonical `/productos`. El sitemap incluye solamente las dos
URLs públicas, sin filtros ni páginas de error. No hay rutas privadas, login ni resultados.
`robots.txt` permite el rastreo público y referencia el sitemap. No es una herramienta
de control de acceso; si se agregan rutas privadas necesitarán protección real.

## Contenido editable

- `config/business.ts`: nombre, domicilio, teléfono, WhatsApp, Instagram, Google Maps y horarios.
- `config/navigation.ts`: navegación compartida.
- `data/products.ts`: familias de productos, descripciones, categorías y fotografías.
- `app/globals.css`: tokens, tipografía, spacing, composiciones y responsive.
- `public/brand/`: logo real suministrado, intacto.
- `public/store/`: las cinco fotografías originales del local, sin duplicar archivos.
- `public/products/`: fotografías originales de productos y referencias de respaldo.
- `public/products/SOURCES.md`: procedencia y licencia de las referencias que no se muestran.

El catálogo inicial está organizado por familias, porque no se recibió una lista oficial
de variedades. Se pueden agregar entradas con `id`, `slug`, `name`, `category`,
`shortDescription`, `image`, `imageAlt`, `featured` y `provisionalImage`.
Al incorporar una foto real, reemplazar el archivo (o la ruta), actualizar el alt y marcar
`provisionalImage: false`. Los filtros, enlaces de la Home y catálogo comparten estos datos.
No se publican precios, ingredientes, historia comercial ni afirmaciones no confirmadas.

WhatsApp usa `5493516103609`, sin el cero de la característica y con el 9 internacional,
según https://faq.whatsapp.com/1294841057948784/. El enlace no verifica que la cuenta esté
activa: eso debe comprobarse con el negocio. Los horarios son los suministrados inicialmente;
los feriados se consultan. Maps e Instagram conservan las URLs oficiales suministradas.

## Diseño y accesibilidad

Dirección editorial azul noche y blanco, dorado reservado a detalles. Cormorant Garamond
y Manrope complementan el logotipo original. Hero con fachada real, mosaico asimétrico
de productos, sección de marca, galería, café, horarios y ubicación.
La skill frontend-design orientó el ritmo editorial y las composiciones específicas de móvil.

El menú utiliza un diálogo nativo con Escape, foco contenido y restitución del foco.
Los filtros son botones accesibles, mantienen la URL y permiten atrás/adelante/recarga.
Se contempla `prefers-reduced-motion`, navegación por teclado, skip link y foco visible.
El mapa de Google se monta únicamente al solicitarlo; la dirección y el enlace principal
siempre están disponibles. No hay widgets sociales. Firebase Analytics está conectado
y se importa en el cliente en módulos separados del JavaScript inicial.

## Verificaciones

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas E2E usan la exportación estática y cubren ambas páginas a 320, 360, 390,
430, 768, 1024, 1440 y 1920 px; imágenes, overflow, filtros, historial, menú, teclado,
links, metadata, JSON-LD, mapa diferido, 404, accesibilidad axe y CLS inicial.
Las pruebas SEO verifican también el contenido sin JavaScript, los canonical de filtros,
la coherencia de los títulos sociales y las directivas de indexación en errores.
Las capturas se guardan en `.qa/` (ignorada por Git). Se puede usar un navegador ya
instalado mediante `TEST_BROWSER_EXECUTABLE` o `PLAYWRIGHT_BROWSERS_PATH`.

Resultados de entrega y medición Lighthouse: [docs/verification.md](docs/verification.md).
Auditoría SEO y mejoras de septiembre de 2026: [docs/seo-audit.md](docs/seo-audit.md).

Antes de publicar, configurar el dominio y confirmar con el negocio horarios y catálogo.
Todas las familias visibles usan fotografías reales de productos de Del Castelar.
