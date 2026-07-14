// Builders de JSON-LD por tipo de página, según INFORME_ARQUITECTURA_SEO_DENTABIOME.md §4.2:
// Home/Web -> Organization/WebSite | Categoría -> ItemList | Producto -> Product+FAQPage
// Artículo -> BlogPosting | Todas nivel 3+ -> BreadcrumbList

const SITE_URL = 'https://healthymouthlab.online';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// Entidad sitewide — solo se emite una vez, en la home (no en cada página:
// Google no lo requiere por página, y duplicarlo no aporta nada).
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Healthy Mouth Lab',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'Independent, editorially-run content site about oral health — gum health, bad breath, dry mouth, plaque and cavities, tooth sensitivity, and the oral microbiome.',
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Healthy Mouth Lab',
    url: SITE_URL,
    publisher: { '@type': 'Organization', name: 'Healthy Mouth Lab' },
  };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  author: string;
  datePublished: Date;
  dateModified: Date;
  url: string;
  image?: string;
}) {
  // Sin `reviewedBy`: apuntaba a "Dr. Jane Smith, DDS", un nombre no verificable
  // reutilizado en todos los artículos. No se reemplaza por otra persona
  // inventada — el autor real (Organization) es el único crédito honesto.
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    image: `${SITE_URL}${opts.image ?? '/images/og-default.jpg'}`,
    author: { '@type': 'Organization', name: opts.author },
    publisher: {
      '@type': 'Organization',
      name: 'Healthy Mouth Lab',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    mainEntityOfPage: `${SITE_URL}${opts.url}`,
  };
}

export function buildProductSchema(opts: {
  name: string;
  description: string;
  url: string;
  // Sin `offers` (price/availability): Healthy Mouth Lab no vende ni despacha
  // Dentabiome — es una página afiliada, no el punto de venta. Afirmar
  // `availability: InStock` o un precio aquí sería un dato que no podemos
  // garantizar ni actualizar, y un riesgo de política de Merchant/rich-results
  // de Google. El precio real y la disponibilidad viven en getdentabiome.com.
  //
  // Un único Review editorial (propio, verificable), NUNCA un AggregateRating
  // fabricado sin reseñas de clientes reales detrás. Ver /dentabiome/reviews/.
  review: {
    ratingValue: number;
    bestRating: number;
    author: string;
    reviewBody: string;
    datePublished: Date;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: opts.review.ratingValue,
        bestRating: opts.review.bestRating,
      },
      author: { '@type': 'Organization', name: opts.review.author },
      reviewBody: opts.review.reviewBody,
      datePublished: opts.review.datePublished.toISOString(),
    },
  };
}

// Review editorial independiente para /dentabiome/reviews/ — standalone, con
// itemReviewed propio (a diferencia del `review` anidado en buildProductSchema).
export function buildReviewSchema(opts: {
  itemName: string;
  reviewBody: string;
  ratingValue: number;
  bestRating: number;
  author: string;
  datePublished: Date;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Product', name: opts.itemName },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: opts.ratingValue,
      bestRating: opts.bestRating,
    },
    author: { '@type': 'Organization', name: opts.author },
    reviewBody: opts.reviewBody,
    datePublished: opts.datePublished.toISOString(),
    url: `${SITE_URL}${opts.url}`,
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildItemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}
