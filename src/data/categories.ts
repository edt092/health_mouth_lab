// Fuente única de verdad para las 6 categorías del silo (INFORME_ARQUITECTURA_SEO_DENTABIOME.md §1).
// Vive en su propio módulo (no como const inline en una página) a propósito: Astro extrae
// getStaticPaths() a un chunk de build separado y no siempre arrastra consigo constantes
// declaradas en el mismo frontmatter, lo que rompía el build de Netlify con
// "CATEGORY_META is not defined". Importar desde un módulo aparte lo resuelve.
export const CATEGORY_META = {
  'gum-health': {
    label: 'Gum Health',
    title: 'Gum Health: Causes, Symptoms & How to Fix Them',
    description: 'Understand bleeding, swollen and receding gums, and what actually restores gum health.',
  },
  'bad-breath': {
    label: 'Bad Breath',
    title: 'Bad Breath (Halitosis): Root Causes & Real Fixes',
    description: 'Why bad breath happens even after brushing, and how to fix it for good.',
  },
  'oral-microbiome': {
    label: 'Oral Microbiome',
    title: 'Oral Microbiome: The Root Cause Behind Most Mouth Problems',
    description: 'How your oral microbiome drives gum health, breath and cavities.',
  },
  'dry-mouth': {
    label: 'Dry Mouth',
    title: 'Dry Mouth (Xerostomia): Causes & Treatment',
    description: 'Why your mouth is dry, at night or all day, and how to fix it.',
  },
  'plaque-and-cavities': {
    label: 'Plaque & Cavities',
    title: 'Plaque, Biofilm & Cavities: What Causes Them',
    description: 'How plaque and dental biofilm form, and how to prevent cavities.',
  },
  'tooth-sensitivity': {
    label: 'Tooth Sensitivity',
    title: 'Tooth Sensitivity & Loose Teeth: Causes & Solutions',
    description: 'Why teeth feel loose or sensitive, and what actually helps.',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORY_META;
export const CATEGORY_SLUGS = Object.keys(CATEGORY_META) as CategorySlug[];
