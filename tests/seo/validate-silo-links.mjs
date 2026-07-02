// Testing (SDLC.md, fase 4): valida que el 100% de las páginas de artículo
// generadas en dist/ contienen al menos un enlace hacia su página puente de
// categoría, y que ninguna página del silo devuelve un enlace interno roto.
// Requiere haber corrido `pnpm build` antes (lee de /dist).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = new URL('../../dist', import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function extractInternalLinks(html) {
  const matches = [...html.matchAll(/href="(\/[^"#]*)"/g)];
  return matches.map((m) => m[1]);
}

function run() {
  const htmlFiles = walk(DIST_DIR).filter((f) => f.endsWith('.html'));
  const existingPaths = new Set(
    htmlFiles.map((f) => f.replace(DIST_DIR, '').replace(/index\.html$/, '').replace(/\\/g, '/')),
  );

  let brokenLinks = 0;
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
      const normalized = link.endsWith('/') ? link : `${link}/`;
      if (!existingPaths.has(normalized) && !link.startsWith('/images')) {
        brokenLinks += 1;
        console.error(`[SEO][ERROR] Broken internal link "${link}" in ${file}`);
      }
    }
  }

  console.log(`\nChecked ${htmlFiles.length} pages.`);
  console.log(`Broken internal links: ${brokenLinks}`);
  console.log(`Articles missing bridge link: ${articlesWithoutBridgeLink}`);

  if (brokenLinks > 0 || articlesWithoutBridgeLink > 0) {
    process.exit(1);
  }
}

run();
