# Verificación de entrega

Fecha local: 10 de septiembre de 2026.

## Comprobaciones

- `npm run lint`: correcto, sin warnings de ESLint.
- `npm run typecheck`: correcto.
- `npm run build`: correcto; Home, Productos, robots, sitemap y 404 prerenderizados.
- `npm run test:e2e`: **22 pruebas aprobadas**, Chromium, servidor de producción.
- Ambas páginas verificadas a **320, 360, 390, 430, 768, 1024, 1440 y 1920 px**.
- Sin overflow horizontal, imágenes rotas ni errores de JavaScript en esas pruebas.
- Filtros, enlaces desde destacados, recarga y navegación atrás/adelante comprobados.
- Menú móvil: apertura, Escape, ciclo de Tab, devolución de foco y navegación comprobados.
- Axe: sin infracciones detectadas en WCAG A/AA para ambas páginas.
- Horarios, enlaces comerciales, JSON-LD, metadata, mapa diferido y 404 comprobados.
- Reduced motion y CLS inicial comprobados: **CLS 0**.
- Inspección visual de las capturas desktop/móvil y menú realizada.

## Lighthouse móvil

Lighthouse 12.8.2, Chromium 153, simulación móvil sobre `http://localhost:3000`.
Medición de laboratorio local; no equivale a datos de usuarios reales.

| Métrica | Resultado |
| --- | --- |
| Rendimiento | 91 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO en preview sin dominio | 66 |
| Largest Contentful Paint | 3,5 s |
| Total Blocking Time | 50 ms |
| Cumulative Layout Shift | 0 |
| Legibilidad del texto | Aprobada |

La penalización SEO corresponde al bloqueo deliberado de indexación de la preview.
Definir el dominio real en `NEXT_PUBLIC_SITE_URL` y recompilar para emitir canonical,
sitemap e indexación de producción. No se inventó un dominio para mejorar una puntuación.

Los reportes y capturas reproducibles se generan en `.qa/` y no se versionan.
La medición se hizo antes de conectar dominio, CDN o hosting definitivo; repetir allí
para evaluar latencias reales. Accesibilidad automatizada no sustituye toda revisión humana.

## Límites del contenido

El catálogo es una selección inicial de familias, no una lista oficial de variedades.
Las seis fotos de producto de Pexels son ilustrativas; el café, el local y el logo son reales.
No se verificó la recepción de mensajes en la cuenta de WhatsApp ni los horarios en feriados.
El mapa externo se carga por acción del usuario y mantiene el acceso directo a Maps.
El entorno original Node 22.12 presenta una advertencia de engine en una dependencia de
desarrollo; las comprobaciones anteriores pasan. Para el despliegue se indica Node 24 LTS.
