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

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  author: string;
  reviewer: string;
  datePublished: Date;
  dateModified: Date;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    image: `${SITE_URL}${opts.image ?? '/images/og-default.jpg'}`,
    author: { '@type': 'Person', name: opts.author },
    reviewedBy: { '@type': 'Person', name: opts.reviewer, jobTitle: 'Dentist' },
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
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  ratingValue: number;
  ratingCount: number;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    offers: {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: opts.currency,
      availability: `https://schema.org/${opts.availability}`,
      url: `${SITE_URL}${opts.url}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: opts.ratingValue,
      reviewCount: opts.ratingCount,
    },
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
