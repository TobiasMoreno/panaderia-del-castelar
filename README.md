# Del Castelar — Panadería

Sitio oficial de presentación y catálogo para Del Castelar, Córdoba. Next.js App Router,
React, TypeScript, Tailwind CSS 4, Motion y Lucide. Sin ecommerce ni backend innecesario.

## Ejecutar

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para ejecutar producción: `npm run build` y `npm start`.
Usar Node.js 24 LTS en producción. El entorno original usa Node 22.12: el sitio compila,
pero una dependencia de desarrollo (`eslint-visitor-keys`) declara Node 22.13 o superior.
ESLint 9 funciona en ese entorno; npm informa que esa rama ya no tiene soporte.

## Publicación y SEO

Configurar `NEXT_PUBLIC_SITE_URL` con el **dominio real** en el entorno de despliegue
antes del build, por ejemplo el origen HTTPS definitivo, sin ruta.
No se inventó un dominio oficial. Sin esa variable, se protege la vista previa con
`noindex`, robots bloqueado y sitemap vacío; tampoco se publica un canonical ficticio.
Con el dominio configurado se generan automáticamente canonical de ambas páginas,
sitemap, robots indexable, Open Graph, Twitter cards y URL del negocio en JSON-LD.

Desplegar en un hosting compatible con Next.js y Node (por ejemplo Vercel), con comando
de instalación `npm ci` y compilación `npm run build`. No es una exportación estática:
se conserva la optimización de `next/image`. Las fuentes se descargan durante el build
y se sirven localmente; el entorno de build debe poder acceder a Google Fonts.

## Contenido editable

- `config/business.ts`: nombre, domicilio, teléfono, WhatsApp, Instagram, Google Maps y horarios.
- `config/navigation.ts`: navegación compartida.
- `data/products.ts`: familias de productos, descripciones, categorías y fotografías.
- `app/globals.css`: tokens, tipografía, spacing, composiciones y responsive.
- `public/brand/`: logo real suministrado, intacto.
- `public/store/`: las cinco fotografías originales del local, sin duplicar archivos.
- `public/products/`: fotografías **provisorias e ilustrativas** de Pexels.
- `public/products/SOURCES.md`: procedencia y licencia de cada imagen de referencia.

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
siempre están disponibles. No hay widgets sociales, cookies propias ni servicios de analítica.

## Verificaciones

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas E2E usan el servidor de producción y cubren ambas páginas a 320, 360, 390,
430, 768, 1024, 1440 y 1920 px; imágenes, overflow, filtros, historial, menú, teclado,
links, metadata, JSON-LD, mapa diferido, 404, accesibilidad axe y CLS inicial.
Las capturas se guardan en `.qa/` (ignorada por Git). Se puede usar un navegador ya
instalado mediante `TEST_BROWSER_EXECUTABLE` o `PLAYWRIGHT_BROWSERS_PATH`.

Resultados de entrega y medición Lighthouse: [docs/verification.md](docs/verification.md).

Antes de publicar, configurar el dominio y confirmar con el negocio horarios y catálogo.
Las fotos ilustrativas están permitidas como contenido inicial y se identifican en pantalla;
la mejor evolución será reemplazarlas por fotografía real de producto de Del Castelar.
