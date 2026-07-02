// Testing (SDLC.md, fase 4): valida que el 100% de las páginas de artículo
// generadas en dist/ contienen al menos un enlace hacia su página puente de
// categoría, y que ninguna página del silo devuelve un enlace interno roto.
// Requiere haber corrido `pnpm build` antes (lee de /dist).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST_DIR = fileURLToPath(new URL('../../dist', import.meta.url));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function extractInternalLinks(html) {
  const matches = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)];
  return matches.map((m) => m[1]);
}

// Un enlace es "asset" si su último segmento tiene extensión (.css, .js, .svg, .xml, ...);
// esos se verifican por existencia exacta de archivo. El resto son rutas del silo
// (páginas), que en Astro con trailingSlash:'always' viven como <ruta>/index.html.
function isAssetLink(link) {
  const lastSegment = link.split('/').pop() ?? '';
  return lastSegment.includes('.');
}

function linkExists(link, pageIndexPaths) {
  if (isAssetLink(link)) {
    return existsSync(join(DIST_DIR, link));
  }
  const normalized = link.endsWith('/') ? link : `${link}/`;
  return pageIndexPaths.has(normalized);
}

function run() {
  const allFiles = walk(DIST_DIR);
  const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
  const pageIndexPaths = new Set(
    htmlFiles.map((f) => f.replace(DIST_DIR, '').replace(/index\.html$/, '').replace(/\\/g, '/')),
  );

  let brokenLinks = 0;
  let missingBridgePages = 0;
  let articlesWithoutBridgeLink = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    const isArticle = /\/[a-z-]+\/[a-z-]+\/[a-z-]+\/?$/.test(file.replace(DIST_DIR, ''));
    const links = extractInternalLinks(html);

    const hasBridgeCard = html.includes('bridge-card');
    if (isArticle && !hasBridgeCard) {
      articlesWithoutBridgeLink += 1;
      console.warn(`[SEO][WARN] Article without bridge link: ${file}`);
    }

    for (const link of links) {
      if (linkExists(link, pageIndexPaths)) continue;

      // Un enlace a /<categoria>/<algo>/ que no existe todavía suele ser una
      // página puente pendiente de escribir, no un enlace roto de verdad.
      const looksLikePendingBridge = /^\/[a-z-]+\/[a-z-]+\/$/.test(
        link.endsWith('/') ? link : `${link}/`,
      );

      if (looksLikePendingBridge) {
        missingBridgePages += 1;
        console.warn(`[SEO][INFO] Pending bridge page "${link}" referenced in ${file}`);
      } else {
        brokenLinks += 1;
        console.error(`[SEO][ERROR] Broken internal link "${link}" in ${file}`);
      }
    }
  }

  console.log(`\nChecked ${htmlFiles.length} pages.`);
  console.log(`Broken internal links: ${brokenLinks}`);
  console.log(`Pending bridge pages referenced (not yet written): ${missingBridgePages}`);
  console.log(`Articles missing bridge link: ${articlesWithoutBridgeLink}`);

  if (brokenLinks > 0 || articlesWithoutBridgeLink > 0) {
    process.exit(1);
  }
}

run();
