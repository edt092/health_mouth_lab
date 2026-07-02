// Genera los 30 artículos de ideas_blog.md via Claude API y los guarda como
// entradas de Content Collections en src/content/articles/<categoria>/<subcategoria>/<slug>.md
//
// Estrategia de modelo (según ANALISIS_IA_GRATIS_ARTICULOS.md / decisión de costo):
//   - Sonnet 5 para los 24 artículos estándar.
//   - Opus 4.8 solo para los 6 artículos "pilar" de cada categoría (mayor volumen agregado / hub).
//
// Requiere ANTHROPIC_API_KEY en .env (gitignored). Ejecutar con: pnpm run generate:articles

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'articles');

const client = new Anthropic(); // lee ANTHROPIC_API_KEY del entorno

const PRICE_PER_MTOK = {
  'claude-opus-4-8': { input: 5.0, output: 25.0 },
  'claude-sonnet-5': { input: 3.0, output: 15.0 },
};

const AUTHOR = 'Healthy Mouth Lab Editorial Team';
const MEDICAL_REVIEWER = 'Dr. Jane Smith, DDS';

// Los 30 artículos de ideas_blog.md — categoría, subcategoría, slug, título, keywords,
// volumen e intención tal como quedaron definidos en el informe SEO. `pillar: true`
// marca los 6 artículos "pilar" (mayor volumen agregado / hub de categoría) -> Opus 4.8.
const ARTICLES = [
  // GUM HEALTH
  { category: 'gum-health', subcategory: 'bleeding-gums', slug: 'why-do-your-gums-bleed-when-you-brush',
    title: "Why Do Your Gums Bleed When You Brush? The Real Culprit (It's Not Your Toothbrush)",
    primaryKeyword: 'bleeding gums when brushing', secondaryKeywords: ['why do my gums bleed', 'bleeding gums after flossing'],
    volume: '1K-10K', bridgeUrl: '/gum-health/best-probiotic-for-gum-disease/',
    angle: 'Desmonta el mito de "cepillas mal"; explica que la causa real suele ser un desequilibrio bacteriano, no la técnica de cepillado.' },
  { category: 'gum-health', subcategory: 'gum-recession', slug: 'can-you-reverse-gum-recession',
    title: 'Gum Recession: Can You Actually Reverse It, or Just Stop It?',
    primaryKeyword: 'gum recession', secondaryKeywords: ['why do my gums recede'],
    volume: '10K-100K', bridgeUrl: '/gum-health/best-probiotic-for-gum-disease/',
    angle: 'Honestidad médica ante todo: explica qué se puede frenar/mejorar y qué no se puede revertir por completo, sin prometer de más.' },
  { category: 'gum-health', subcategory: 'swollen-inflamed-gums', slug: 'swollen-painful-gums-what-your-mouth-is-telling-you',
    title: "Swollen, Painful Gums? Here's What Your Mouth Is Trying to Tell You",
    primaryKeyword: 'gum inflammation', secondaryKeywords: ['why do my gums hurt', 'sensitive gums'],
    volume: '10K-100K', bridgeUrl: '/gum-health/best-probiotic-for-gum-disease/',
    angle: 'Enmarca el síntoma como una señal de aviso temprano del cuerpo; conecta con el mecanismo del microbioma oral.' },
  { category: 'gum-health', subcategory: 'gingivitis-treatment', slug: 'best-toothpaste-and-mouthwash-for-gum-disease',
    title: 'Best Toothpaste and Mouthwash for Gum Disease: What Actually Works (and What Is Just Marketing)',
    primaryKeyword: 'best toothpaste for gum disease', secondaryKeywords: ['best mouthwash for gums'],
    volume: '1K-10K', bridgeUrl: '/gum-health/best-probiotic-for-gum-disease/',
    angle: 'Comparativa editorial honesta de ingredientes activos reales vs. marketing, que desemboca de forma natural en la solución probiótica.' },
  { category: 'gum-health', subcategory: 'overview', slug: 'how-to-keep-your-gums-healthy-for-good',
    title: 'How to Keep Your Gums Healthy for Good (Not Just Until Your Next Cleaning)',
    primaryKeyword: 'how to keep gums healthy', secondaryKeywords: ['how to get healthy gums'],
    volume: '100-1K', bridgeUrl: '/gum-health/best-probiotic-for-gum-disease/', pillar: true,
    angle: 'Artículo pilar/hub de la categoría Gum Health: panorámica que conecta bleeding, recession, inflammation y gingivitis treatment.' },

  // BAD BREATH
  { category: 'bad-breath', subcategory: 'chronic-bad-breath', slug: 'why-do-i-still-have-bad-breath-after-brushing',
    title: 'Why Do I Still Have Bad Breath After Brushing? 5 Hidden Causes',
    primaryKeyword: 'bad breath even after brushing', secondaryKeywords: ['chronic bad breath'],
    volume: '100-1K', bridgeUrl: '/bad-breath/best-probiotic-for-bad-breath/',
    angle: 'Habla directamente a la frustración de alguien que ya "hace todo bien" y aun así tiene mal aliento.' },
  { category: 'bad-breath', subcategory: 'chronic-bad-breath', slug: 'morning-breath-wont-go-away',
    title: "Morning Breath Won't Go Away? Here's Why (and When to Worry)",
    primaryKeyword: 'morning bad breath', secondaryKeywords: ['why do i have bad breath all the time'],
    volume: '100-1K', bridgeUrl: '/bad-breath/best-probiotic-for-bad-breath/',
    angle: 'Diferencia entre el mal aliento matutino normal (saliva baja durante el sueño) y el que es señal de algo crónico.' },
  { category: 'bad-breath', subcategory: 'halitosis-causes', slug: 'halitosis-explained-root-causes',
    title: 'Halitosis Explained: The Real Root Causes of Chronic Bad Breath',
    primaryKeyword: 'halitosis', secondaryKeywords: ['what causes bad breath'],
    volume: '10K-100K', bridgeUrl: '/bad-breath/best-probiotic-for-bad-breath/', pillar: true,
    angle: 'Artículo pilar de la categoría Bad Breath: panorámica de causas reales de la halitosis crónica.' },
  { category: 'bad-breath', subcategory: 'white-coated-tongue', slug: 'white-or-coated-tongue-what-it-means',
    title: 'White or Coated Tongue: What It Means and How to Fix It',
    primaryKeyword: 'white tongue', secondaryKeywords: ['coated tongue'],
    volume: '10K-100K', bridgeUrl: '/bad-breath/best-probiotic-for-bad-breath/',
    angle: 'Síntoma visual de alto volumen de búsqueda; explica la biopelícula bacteriana en la lengua como causa.' },
  { category: 'bad-breath', subcategory: 'halitosis-causes', slug: 'can-gut-health-cause-bad-breath',
    title: 'Can Gut Health Really Cause Bad Breath? What the Science Says',
    primaryKeyword: 'does gut health cause bad breath', secondaryKeywords: [],
    volume: '10-100', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Enlace cruzado obligatorio hacia Oral Microbiome: mismo mecanismo de desequilibrio bacteriano, dos síntomas distintos.' },

  // ORAL MICROBIOME
  { category: 'oral-microbiome', subcategory: 'overview', slug: 'what-is-the-oral-microbiome',
    title: 'What Is the Oral Microbiome (And Why It Controls Almost Everything in Your Mouth)',
    primaryKeyword: 'oral microbiome', secondaryKeywords: ['mouth microbiome'],
    volume: '1K-10K', bridgeUrl: '/oral-microbiome/best-oral-probiotics/', pillar: true,
    angle: 'Artículo fundacional del sitio: explica el mecanismo del microbioma oral que conecta las otras 5 categorías del silo.' },
  { category: 'oral-microbiome', subcategory: 'oral-flora-balance', slug: 'signs-your-oral-microbiome-is-out-of-balance',
    title: '5 Signs Your Oral Microbiome Is Out of Balance',
    primaryKeyword: 'oral microbiome imbalance', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Checklist de síntomas que enlaza cada uno a su categoría (encías, aliento, boca seca, caries).' },
  { category: 'oral-microbiome', subcategory: 'gut-oral-health-connection', slug: 'the-gut-mouth-connection',
    title: 'The Gut-Mouth Connection: How Your Gut Health Affects Your Teeth and Gums',
    primaryKeyword: 'gut health and oral health', secondaryKeywords: [],
    volume: '10-100', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Contenido de autoridad EEAT que cita el mecanismo científico gut-oral axis, baja competencia de contenido.' },
  { category: 'oral-microbiome', subcategory: 'dental-probiotics-guide', slug: 'do-oral-probiotics-actually-work',
    title: "Do Oral Probiotics Actually Work? Here's What the Research Shows",
    primaryKeyword: 'are oral probiotics worth it', secondaryKeywords: ['how long do oral probiotics take to work'],
    volume: '10-100', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Resuelve la objeción número uno antes de comprar: honestidad sobre evidencia y plazos realistas.' },
  { category: 'oral-microbiome', subcategory: 'oral-flora-balance', slug: 'how-to-restore-a-healthy-oral-microbiome-naturally',
    title: 'How to Restore a Healthy Oral Microbiome Naturally',
    primaryKeyword: 'restore oral microbiome', secondaryKeywords: ['how to improve oral microbiome'],
    volume: '10-100', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Cierre lógico del cluster: pasos concretos y accionables ya.' },

  // DRY MOUTH
  { category: 'dry-mouth', subcategory: 'dry-mouth-at-night', slug: 'why-is-my-mouth-so-dry-at-night',
    title: 'Why Is My Mouth So Dry at Night? Causes and Fixes',
    primaryKeyword: 'dry mouth at night', secondaryKeywords: [],
    volume: '1K-10K', bridgeUrl: '/dry-mouth/best-treatment-for-dry-mouth/',
    angle: 'Búsqueda específica y accionable sobre boca seca nocturna.' },
  { category: 'dry-mouth', subcategory: 'xerostomia-causes', slug: 'dry-mouth-causes-7-reasons',
    title: "Dry Mouth Causes: 7 Reasons Your Mouth Won't Stop Feeling Dry",
    primaryKeyword: 'dry mouth causes', secondaryKeywords: [],
    volume: '10K-100K', bridgeUrl: '/dry-mouth/best-treatment-for-dry-mouth/', pillar: true,
    angle: 'Artículo pilar de la categoría Dry Mouth, el de mayor volumen del cluster.' },
  { category: 'dry-mouth', subcategory: 'xerostomia-causes', slug: 'xerostomia-explained',
    title: 'Xerostomia Explained: The Medical Causes Behind Chronic Dry Mouth',
    primaryKeyword: 'xerostomia', secondaryKeywords: [],
    volume: '10K-100K', bridgeUrl: '/dry-mouth/best-treatment-for-dry-mouth/',
    angle: 'Versión clínica/técnica del artículo pilar, captura búsquedas con el término médico.' },
  { category: 'dry-mouth', subcategory: 'xerostomia-causes', slug: 'dry-mouth-and-bad-breath',
    title: 'Dry Mouth and Bad Breath: Why They Almost Always Come Together',
    primaryKeyword: 'dry mouth and bad breath', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/bad-breath/best-probiotic-for-bad-breath/',
    angle: 'Enlace cruzado obligatorio hacia Bad Breath.' },
  { category: 'dry-mouth', subcategory: 'dry-mouth-at-night', slug: 'how-to-fix-dry-mouth',
    title: 'How to Fix Dry Mouth: What Actually Helps Long-Term',
    primaryKeyword: 'how to fix dry mouth', secondaryKeywords: [],
    volume: '1K-10K', bridgeUrl: '/dry-mouth/best-treatment-for-dry-mouth/',
    angle: 'Solution-aware, el más cercano a la página puente de la categoría.' },

  // PLAQUE & CAVITIES
  { category: 'plaque-and-cavities', subcategory: 'dental-biofilm', slug: 'dental-biofilm-101',
    title: "Dental Biofilm 101: What It Is and Why Brushing Alone Won't Remove It",
    primaryKeyword: 'dental biofilm', secondaryKeywords: ['biofilm on teeth'],
    volume: '1K-10K', bridgeUrl: '/oral-microbiome/best-oral-probiotics/',
    angle: 'Reencuadra la "placa" como un ecosistema bacteriano vivo, no solo residuo; conecta con Oral Microbiome.' },
  { category: 'plaque-and-cavities', subcategory: 'prevent-plaque-buildup', slug: 'what-causes-plaque-buildup',
    title: 'What Causes Plaque Buildup (And Why It Keeps Coming Back)',
    primaryKeyword: 'what causes plaque', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/plaque-and-cavities/can-probiotics-prevent-cavities/',
    angle: 'Explica la recurrencia de la placa, prepara terreno para el ángulo probiótico.' },
  { category: 'plaque-and-cavities', subcategory: 'prevent-plaque-buildup', slug: 'what-really-causes-cavities',
    title: "What Really Causes Cavities? It's Not Just Sugar",
    primaryKeyword: 'what causes cavities', secondaryKeywords: [],
    volume: '1K-10K', bridgeUrl: '/plaque-and-cavities/can-probiotics-prevent-cavities/', pillar: true,
    angle: 'Artículo de mayor volumen del cluster; desmonta el mito del azúcar como única causa de caries.' },
  { category: 'plaque-and-cavities', subcategory: 'prevent-plaque-buildup', slug: 'can-you-remove-plaque-naturally',
    title: "Can You Remove Plaque Naturally? What Works and What Doesn't",
    primaryKeyword: 'remove plaque naturally', secondaryKeywords: [],
    volume: '10-100', bridgeUrl: '/plaque-and-cavities/can-probiotics-prevent-cavities/',
    angle: 'Filtra remedios caseros sin evidencia frente a lo que sí ayuda de verdad.' },
  { category: 'plaque-and-cavities', subcategory: 'can-probiotics-prevent-cavities', slug: 'can-probiotics-help-prevent-cavities',
    title: "Can Probiotics Help Prevent Cavities? Here's What We Know",
    primaryKeyword: 'can probiotics prevent cavities', secondaryKeywords: [],
    volume: '0-10', bridgeUrl: '/plaque-and-cavities/can-probiotics-prevent-cavities/',
    angle: 'Bajo volumen pero cierre directo con la página puente de la categoría.' },

  // TOOTH SENSITIVITY
  { category: 'tooth-sensitivity', subcategory: 'loose-teeth', slug: 'loose-tooth-as-an-adult',
    title: "Loose Tooth as an Adult? Here's What It Could Mean",
    primaryKeyword: 'loose adult tooth', secondaryKeywords: [],
    volume: '1K-10K', bridgeUrl: '/tooth-sensitivity/best-supplement-for-gum-health/',
    angle: 'Mayor volumen del cluster; tono tranquilizador pero honesto sobre cuándo preocuparse de verdad.' },
  { category: 'tooth-sensitivity', subcategory: 'loose-teeth', slug: 'tooth-mobility-explained',
    title: "Tooth Mobility Explained: When It's Serious and When It Isn't",
    primaryKeyword: 'tooth mobility', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/tooth-sensitivity/best-supplement-for-gum-health/',
    angle: 'Versión más clínica del artículo anterior, capta búsqueda con término técnico.' },
  { category: 'tooth-sensitivity', subcategory: 'teeth-sensitivity-causes', slug: 'why-are-my-teeth-suddenly-sensitive',
    title: 'Why Are My Teeth Suddenly Sensitive? Common Causes Explained',
    primaryKeyword: 'teeth sensitivity', secondaryKeywords: [],
    volume: '10K-100K', bridgeUrl: '/tooth-sensitivity/best-supplement-for-gum-health/', pillar: true,
    angle: 'Artículo pilar de la categoría, el de mayor volumen absoluto del cluster.' },
  { category: 'tooth-sensitivity', subcategory: 'teeth-sensitivity-causes', slug: 'how-to-strengthen-teeth-naturally',
    title: 'How to Strengthen Teeth Naturally (Without Waiting for a Cavity)',
    primaryKeyword: 'how to strengthen teeth naturally', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/tooth-sensitivity/best-supplement-for-gum-health/',
    angle: 'Ángulo preventivo que enlaza a la página puente de la categoría.' },
  { category: 'tooth-sensitivity', subcategory: 'loose-teeth', slug: 'can-you-strengthen-a-loose-tooth',
    title: 'Can You Strengthen a Loose Tooth? What Actually Helps',
    primaryKeyword: 'how to strengthen loose teeth', secondaryKeywords: [],
    volume: '100-1K', bridgeUrl: '/tooth-sensitivity/best-supplement-for-gum-health/',
    angle: 'Cierre solution-aware del cluster, el más próximo a la página puente.' },
];

const SYSTEM_PROMPT = `You are a medical content writer for Healthy Mouth Lab, an oral-health information site whose blog funnels informed readers toward Dentabiome, an oral probiotic supplement. You write dentist-reviewed, evidence-based articles.

Non-negotiable rules:
- Length: 2500 to 3500 words in the article body.
- Output format: Markdown body only. Do NOT include frontmatter, do NOT include an H1 (the page template renders the title separately), do NOT include a "Sources" or "References" section.
- Structure: use "## " for major sections and "### " for subsections. Open with 1-2 engaging paragraphs before the first heading.
- Tone: calm, evidence-based, reassuring but honest. Explain the underlying oral-microbiome / bacterial-imbalance mechanism where relevant instead of oversimplifying. Include a brief "When to see a dentist" style section near the end when the symptom could be serious.
- This is 100% informational content — never write a hard sales pitch. You may include exactly ONE natural, contextual Markdown link to the bridge/solution URL provided in the brief, woven naturally into a relevant sentence in the body (not a banner, not a coupon-style CTA, not in a heading).
- Do not use emojis. Do not repeat the exact title as a heading anywhere in the body.
- Write for a US English-speaking adult reader who found this article via a Google search about their specific symptom.`;

function buildUserPrompt(article) {
  return `Write the article body for this brief.

Title: ${article.title}
Primary keyword to naturally cover: ${article.primaryKeyword}
Secondary keywords to naturally cover where relevant: ${article.secondaryKeywords.join(', ') || '(none)'}
Content angle: ${article.angle}
Bridge link to weave in naturally once: [contextual anchor text](${article.bridgeUrl})

Respond in exactly this format, with no extra commentary before or after:

META_DESCRIPTION: <a 150-160 character meta description that naturally includes the primary keyword>
---ARTICLE---
<the full markdown article body, 2500-3500 words>`;
}

function yamlStr(s) {
  return JSON.stringify(s);
}

function slugTitleForSeo(title) {
  return title.length <= 60 ? title : title.slice(0, 57).trimEnd() + '...';
}

// El modelo a veces excede el límite de 160 caracteres del schema pese a la
// instrucción en el prompt — se trunca por palabra como red de seguridad.
function metaDescriptionForSeo(description) {
  if (description.length <= 160) return description;
  const cut = description.slice(0, 159);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '.';
}

function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

async function generateOne(article) {
  const model = article.pillar ? 'claude-opus-4-8' : 'claude-sonnet-5';

  const response = await client.messages.create({
    model,
    max_tokens: 6000,
    thinking: { type: 'disabled' },
    output_config: { effort: 'high' },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(article) }],
  });

  const raw = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');

  const [metaLine, ...bodyParts] = raw.split('---ARTICLE---');
  const metaDescription = metaLine.replace(/META_DESCRIPTION:\s*/, '').trim();
  const body = bodyParts.join('---ARTICLE---').trim();

  const price = PRICE_PER_MTOK[model];
  const cost =
    (response.usage.input_tokens / 1e6) * price.input +
    (response.usage.output_tokens / 1e6) * price.output;

  return { body, metaDescription, model, usage: response.usage, cost };
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  let totalCost = 0;
  let ok = 0;
  let failed = 0;

  // LIMIT=1 pnpm run generate:articles -> corre solo el primero, útil para validar formato/costo real
  const limit = process.env.LIMIT ? Number(process.env.LIMIT) : ARTICLES.length;
  const queue = ARTICLES.slice(0, limit);

  for (const article of queue) {
    const dir = join(CONTENT_DIR, article.category, article.subcategory);
    const filePath = join(dir, `${article.slug}.md`);

    if (existsSync(filePath)) {
      console.log(`[SKIP] ${article.category}/${article.subcategory}/${article.slug} (already exists)`);
      continue;
    }

    process.stdout.write(`[${article.pillar ? 'OPUS ' : 'SONNET'}] ${article.slug} ... `);

    try {
      const { body, metaDescription, model, usage, cost } = await generateOne(article);
      const words = wordCount(body);
      const readingTime = Math.max(1, Math.round(words / 200));

      const frontmatter = `---
title: ${yamlStr(article.title)}
category: ${yamlStr(article.category)}
subcategory: ${yamlStr(article.subcategory)}
publishDate: ${today}
author: ${yamlStr(AUTHOR)}
medicalReviewer: ${yamlStr(MEDICAL_REVIEWER)}
readingTime: ${readingTime}
seo:
  title: ${yamlStr(slugTitleForSeo(article.title))}
  description: ${yamlStr(metaDescriptionForSeo(metaDescription || article.title))}
  primaryKeyword: ${yamlStr(article.primaryKeyword)}
  secondaryKeywords: [${article.secondaryKeywords.map(yamlStr).join(', ')}]
  searchVolumeRange: ${yamlStr(article.volume)}
  intent: "informational"
---

${body}
`;

      mkdirSync(dir, { recursive: true });
      writeFileSync(filePath, frontmatter, 'utf-8');

      totalCost += cost;
      ok += 1;
      console.log(`OK (${words}w, ${model}, $${cost.toFixed(4)})`);
    } catch (err) {
      failed += 1;
      console.log(`FAILED: ${err.message}`);
    }

    // pequeña pausa entre peticiones, cortesía con la API
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log('\n--- Resumen ---');
  console.log(`Generados: ${ok}  Fallidos: ${failed}`);
  console.log(`Costo total estimado: $${totalCost.toFixed(4)}`);
}

main();
