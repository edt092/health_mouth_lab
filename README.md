# healthymouthlab.online — Astro App

Blog informativo de alta autoridad + embudo transaccional para **Dentabiome**. Generado a partir de tres documentos raíz del proyecto (léelos en ese orden si eres nuevo en el repo):

1. `../INFORME_ARQUITECTURA_SEO_DENTABIOME.md` — silo SEO, clustering de keywords, estrategia de enlazado interno.
2. `../INFORME_UX_UI_DENTABIOME.md` — persona, heurísticos de Nielsen, accesibilidad WCAG 2.1 AA, wireframes.
3. `../INFORME_SDLC_ASTRO_DENTABIOME.md` — URS/SRS/SysRS/Testing y por qué el proyecto está estructurado así.

Este README es solo la puesta en marcha práctica del código.

---

## Requisitos previos

- **Node.js** ≥ 18.20.0
- **pnpm** ≥ 9.0.0 — **es el único gestor de paquetes soportado.**
  `npm install` o `yarn install` fallarán a propósito (`preinstall` corre `only-allow pnpm`).

Si no tienes pnpm instalado:
```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
```

---

## Puesta en marcha

```bash
pnpm install       # instala dependencias (falla si no usas pnpm)
pnpm dev           # servidor de desarrollo en http://localhost:4321
```

---

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | `astro check` (tipado estricto) + build estático a `dist/` |
| `pnpm preview` | Sirve `dist/` localmente, tal como quedaría en producción |
| `pnpm check` | Solo el chequeo de tipos, sin build |
| `pnpm test:seo` | Valida enlazado interno del silo sobre `dist/` — requiere `pnpm build` antes |
| `pnpm test:a11y` | Tests de accesibilidad (Playwright + axe-core) — requiere `pnpm preview` corriendo en paralelo |
| `pnpm lighthouse` | Auditoría de Core Web Vitals vía Lighthouse CI |

Flujo recomendado antes de cualquier PR:
```bash
pnpm build
pnpm test:seo
pnpm preview &        # o en otra terminal
pnpm test:a11y
```

---

## Cómo añadir contenido (sin tocar código)

Todo el contenido vive tipado en `src/content/`. Las rutas del sitio se generan solas a partir de estos archivos — **no crees archivos `.astro` nuevos para artículos**.

### Un artículo de blog nuevo
Crea un `.md` en:
```
src/content/articles/<categoria>/<subcategoria>/<slug>.md
```
`<categoria>` debe ser una de las 6 cerradas en `src/content/config.ts` (`gum-health`, `bad-breath`, `oral-microbiome`, `dry-mouth`, `plaque-and-cavities`, `tooth-sensitivity`). El frontmatter obligatorio incluye `medicalReviewer` (requisito de confianza médica del informe UX/UI) y el bloque `seo` (keyword, volumen, intención — ver informe SEO).

La ruta final será `/<categoria>/<subcategoria>/<slug>/`, y el artículo mostrará automáticamente el bloque puente (`BridgeCard`) de su categoría al final.

### Una página puente (bridge) nueva
Crea un `.md` en `src/content/bridges/<slug-de-la-url>.md` (el nombre del archivo **es** la slug final, no lo nombres igual que la categoría). La URL resultante es `/<categoria>/<slug-de-la-url>/`.

### El producto
Solo existe una entrada: `src/content/product/dentabiome.md`. Ahí viven precio, disponibilidad, rating y FAQs — se inyectan automáticamente como schema `Product` + `FAQPage`.

---

## Estructura del proyecto

```
src/
├── content/     → fuente de verdad tipada (artículos, puentes, producto)
├── layouts/     → Layout.astro: meta tags, OG, canonical, JSON-LD (único punto de SEO técnico)
├── utils/       → schema.ts: builders de JSON-LD por tipo de página
├── components/  → Header, Footer, Breadcrumbs, BridgeCard
└── pages/       → index.astro (Home) + rutas dinámicas del silo + /dentabiome/*
```

Detalle completo de por qué solo 3 archivos de página generan las ~36 URLs del silo: `../INFORME_SDLC_ASTRO_DENTABIOME.md` §3.2.

---

## Reglas que no hay que romper

- **Nunca `npm`/`yarn`.** Es una restricción de entorno, no una preferencia.
- **Un artículo = un enlace contextual mínimo hacia la página puente de su subcategoría.** `pnpm test:seo` falla el build si falta.
- **Contraste de color:** cualquier cambio de paleta en `tailwind.config.mjs` debe re-verificar el ratio 4.5:1 antes de mergear (comentario inline en el archivo con los valores actuales).
- **Ninguna categoría nueva sin pasar por el keyword research.** Las 6 categorías están cerradas por `enum` en `src/content/config.ts` a propósito.
