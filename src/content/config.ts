import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Las 6 categorías del silo definidas en INFORME_ARQUITECTURA_SEO_DENTABIOME.md §1.
// Cerrado a propósito: cualquier keyword nueva se mapea a una de estas, no se crea
// categoría 7 sin pasar antes por el research (evita fragmentación de autoridad).
const CATEGORY = z.enum([
  'gum-health',
  'bad-breath',
  'oral-microbiome',
  'dry-mouth',
  'plaque-and-cavities',
  'tooth-sensitivity',
]);

const seoSchema = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  searchVolumeRange: z.enum(['0-10', '10-100', '100-1K', '1K-10K', '10K-100K']),
  intent: z.enum(['informational', 'commercial', 'transactional']),
});

// Artículos de blog: viven en src/content/articles/<category>/<subcategory>/<slug>.md
// El id resultante (ej. "gum-health/bleeding-gums/why-do-my-gums-bleed") es la fuente
// de verdad para construir la URL — así la carpeta ES la arquitectura del silo.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: CATEGORY,
    subcategory: z.string(),
    image: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    // Antes había un `medicalReviewer` fijo ("Dr. Jane Smith, DDS") repetido en
    // los 31 artículos — no correspondía a una persona real verificable. Se quitó
    // en vez de reemplazarlo por otro nombre inventado; ver AUDITORÍA §Crítico.
    readingTime: z.number(),
    seo: seoSchema,
    // FAQPage (REDISEÑO_POST.md §6): 4-6 preguntas basadas en el contenido real
    // del artículo. Opcional porque no todos los artículos antiguos la tienen aún.
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  }),
});

// Páginas puente (comercial/transaccional): 1 por categoría, según §1 del informe SEO.
const bridges = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bridges' }),
  schema: z.object({
    title: z.string(),
    category: CATEGORY,
    // Antes era z.array(z.string()) — una lista de criterios sin explicación
    // ni verdicto, la típica "página puente" vacía. Ahora cada criterio explica
    // por qué importa y da el estatus honesto de Dentabiome contra ese criterio
    // ('unverified' cuando no pudimos confirmarlo públicamente — nunca 'meets'
    // por defecto). No compara contra marcas de terceros con nombre propio.
    comparisonCriteria: z.array(
      z.object({
        label: z.string(),
        why: z.string(),
        dentabiomeStatus: z.enum(['meets', 'partial', 'unverified']),
        dentabiomeNote: z.string(),
      })
    ),
    verdict: z.string(),
    seo: seoSchema,
  }),
});

const product = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/product' }),
  schema: z.object({
    name: z.string(),
    price: z.number(),
    currency: z.string().default('USD'),
    availability: z.enum(['InStock', 'OutOfStock', 'PreOrder']),
    // Reemplaza el antiguo `rating` (AggregateRating fabricado sin reseñas reales
    // detrás). Este es un Review editorial único, propio y verificable — no un
    // agregado de reseñas de clientes que no existen. Ver /dentabiome/reviews/.
    editorialReview: z.object({
      score: z.number(),
      scale: z.number().default(5),
      reviewer: z.string(),
      datePublished: z.date(),
      summary: z.string(),
      criteria: z.array(
        z.object({ label: z.string(), score: z.number(), notes: z.string() })
      ),
    }),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    seo: seoSchema,
  }),
});

export const collections = { articles, bridges, product };
