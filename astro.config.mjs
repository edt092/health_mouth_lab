import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// SSG puro (output: 'static'): requisito SRS de Core Web Vitals 100/100.
// Sin runtime de servidor que hidrate contenido informacional/producto.
export default defineConfig({
  site: 'https://healthymouthlab.online',
  output: 'static',
  trailingSlash: 'always', // consistente con las URLs del silo SEO (todas terminan en /)
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
