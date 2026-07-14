// Envía todas las URLs del sitemap a IndexNow (Bing/Yandex) para descubrimiento
// más rápido (hallazgo #20 de la auditoría SEO). Corre DESPUÉS de `astro build`
// — lee dist/sitemap-0.xml, no golpea la red durante el build en sí.
//
// Uso: pnpm run build && node scripts/submit-indexnow.mjs

import { readFileSync } from 'node:fs';

const HOST = 'healthymouthlab.online';
const KEY = 'e7c80c9083b14e4ca65f9c42f4ab05b9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = new URL('../dist/sitemap-0.xml', import.meta.url);

function readUrlsFromSitemap() {
  const xml = readFileSync(SITEMAP_PATH, 'utf-8');
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1]);
}

async function submit(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urlList.length} URLs (status ${res.status}).`);
  } else {
    const body = await res.text().catch(() => '');
    console.error(`IndexNow: submission failed — status ${res.status}. ${body}`);
    process.exitCode = 1;
  }
}

const urls = readUrlsFromSitemap();
console.log(`IndexNow: found ${urls.length} URLs in ${SITEMAP_PATH.pathname}`);
await submit(urls);
