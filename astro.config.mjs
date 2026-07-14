import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// SSG puro (output: 'static'): requisito SRS de Core Web Vitals 100/100.
// Sin runtime de servidor que hidrate contenido informacional/producto.

// Sitemap lastmod (hallazgo #13 de la auditoría SEO): leído directamente del
// frontmatter de cada artículo en build time. `astro:content` no es
// importable aquí — este archivo corre antes de que Astro inicialice las
// colecciones de contenido — así que se lee el .md crudo con una regex simple
// en vez de añadir una dependencia de parseo YAML solo para esto.
const ARTICLES_DIR = fileURLToPath(new URL('./src/content/articles', import.meta.url));

function collectArticleDates(dir, baseLen, acc = {}) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectArticleDates(full, baseLen, acc);
    } else if (extname(entry.name) === '.md') {
      const raw = readFileSync(full, 'utf-8');
      const dateMatch = raw.match(/updatedDate:\s*([\d-]+)/) ?? raw.match(/publishDate:\s*([\d-]+)/);
      if (dateMatch) {
        // El id de contenido (ruta relativa sin extensión) determina la URL
        // final del artículo bajo trailingSlash: 'always'.
        const relPath = full.slice(baseLen).replace(/\.md$/, '').replace(/\\/g, '/');
        acc[`/${relPath}/`] = dateMatch[1];
      }
    }
  }
  return acc;
}

const articleLastmod = collectArticleDates(ARTICLES_DIR, ARTICLES_DIR.length + 1);

export default defineConfig({
  site: 'https://healthymouthlab.online',
  output: 'static',
  trailingSlash: 'always', // consistente con las URLs del silo SEO (todas terminan en /)
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      serialize(item) {
        const lastmod = articleLastmod[new URL(item.url).pathname];
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
