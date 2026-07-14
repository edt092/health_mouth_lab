// Fuente única de verdad para las 6 categorías del silo (INFORME_ARQUITECTURA_SEO_DENTABIOME.md §1).
// Vive en su propio módulo (no como const inline en una página) a propósito: Astro extrae
// getStaticPaths() a un chunk de build separado y no siempre arrastra consigo constantes
// declaradas en el mismo frontmatter, lo que rompía el build de Netlify con
// "CATEGORY_META is not defined". Importar desde un módulo aparte lo resuelve.
//
// `quickAnswer`/`overview`/`seeADentistIf` (agregados 2026-07-14): las páginas
// pilar eran cascarones de ~100-140 palabras (H1 + description + grid de
// enlaces), demasiado delgadas para ser citables en las keywords de cabeza
// que buscan posicionar. Contenido genuino, conservador médicamente y
// consistente con lo ya publicado en los artículos profundos de cada categoría.
export const CATEGORY_META = {
  'gum-health': {
    label: 'Gum Health',
    title: 'Gum Health: Causes, Symptoms & How to Fix Them',
    description: 'Understand bleeding, swollen and receding gums, and what actually restores gum health.',
    image: '/images/categories/gum-health.webp',
    quickAnswer:
      "Bleeding, swollen, or receding gums are almost always a response to bacterial plaque along the gumline — not a sign you're brushing too hard or just genetics. Gingivitis, the earliest stage, is fully reversible with consistent plaque removal and, in many recurring cases, addressing the underlying imbalance in the mouth's bacterial ecosystem. Left unaddressed, it can progress to periodontitis, where bone and gum tissue loss becomes permanent rather than reversible. The fix starts with mechanical basics — brushing technique, interdental cleaning, professional cleanings on schedule — and, for symptoms that keep coming back despite good hygiene, looking at what's disrupting your oral microbiome in the first place.",
    overview:
      "The guides below break down specific symptoms — bleeding when you brush, swelling, recession — by their most likely cause, what a dentist actually checks for at each stage, and which home-care changes make a measurable difference versus which ones are marketing noise. Because gum health and the oral microbiome are tightly linked, several guides connect back to our Oral Microbiome pillar for the underlying mechanism.",
    seeADentistIf: [
      'Bleeding is heavy, painful, or shows up even without brushing',
      'Gums are receding and a tooth root feels exposed or sensitive',
      'Any tooth feels loose alongside gum swelling or bleeding',
    ],
  },
  'bad-breath': {
    label: 'Bad Breath',
    title: 'Bad Breath (Halitosis): Root Causes & Real Fixes',
    description: 'Why bad breath happens even after brushing, and how to fix it for good.',
    image: '/images/categories/bad-breath.webp',
    quickAnswer:
      "Persistent bad breath that survives brushing, mouthwash, and mints is rarely a hygiene failure — it's almost always volatile sulfur compounds produced by bacteria living on the back of the tongue, in gum pockets, or, less often, coming from the sinuses or gut. Morning breath and occasional garlic breath are normal and self-limiting; breath that doesn't clear within about an hour of your normal routine, or that returns within minutes of freshening up, points to a bacterial source that mints can mask but not fix. Identifying where the odor is actually coming from matters more than trying another mouthwash.",
    overview:
      'The guides below walk through specific patterns — morning breath, breath that persists after brushing, a white-coated tongue — and what each one usually means, along with when it is worth ruling out gum disease, dry mouth, or a digestive cause with your dentist or physician.',
    seeADentistIf: [
      "Odor persists all day despite good hygiene and doesn't respond to tongue cleaning",
      'It started suddenly alongside a metallic taste or mouth pain',
      "You've ruled out the obvious causes and it's affecting daily life",
    ],
  },
  'oral-microbiome': {
    label: 'Oral Microbiome',
    title: 'Oral Microbiome: The Root Cause Behind Most Mouth Problems',
    description: 'How your oral microbiome drives gum health, breath and cavities.',
    image: '/images/categories/oral-microbiome.webp',
    quickAnswer:
      "Your mouth hosts hundreds of species of bacteria, and most day-to-day oral symptoms — bleeding gums, bad breath, new cavities — trace back to that ecosystem tipping out of balance, rather than to a single 'bad' bacteria you can eliminate. A healthy oral microbiome isn't a sterile one; it's a stable community where species linked to health outnumber the ones linked to disease. Diet high in sugar and refined carbs, reduced saliva flow, harsh antiseptic mouthwash used long-term, and smoking are the most common things that push that balance in the wrong direction.",
    overview:
      'This is the pillar behind everything else on this site: gum health, bad breath, dry mouth, and cavity risk all connect back to this bacterial balance. Start here for the underlying mechanism, or jump to a specific symptom in the categories below.',
    seeADentistIf: [
      'Multiple symptoms (breath, gums, cavities) are showing up around the same time',
      "You've tried targeted fixes for one symptom without addressing the others",
      'You want bacterial testing or a professional assessment of your specific risk factors',
    ],
  },
  'dry-mouth': {
    label: 'Dry Mouth',
    title: 'Dry Mouth (Xerostomia): Causes & Treatment',
    description: 'Why your mouth is dry, at night or all day, and how to fix it.',
    image: '/images/categories/dry-mouth.webp',
    quickAnswer:
      "Dry mouth (xerostomia) means saliva flow has dropped below what your mouth needs to stay comfortable and protected — and saliva does more than add moisture: it buffers acid, delivers minerals that re-harden enamel, and keeps bacteria in check. Medications are the single most common cause of chronic dry mouth, followed by mouth breathing, dehydration, and certain medical conditions. Occasional dryness — thirst, a stuffy nose — is normal; dryness most of the day, every day, is worth addressing, since it measurably raises your risk of cavities and gum irritation over time.",
    overview:
      'The guides below cover nighttime dry mouth specifically, the most common underlying causes, and what actually helps beyond sipping water — including when it is worth a conversation with your prescriber or dentist.',
    seeADentistIf: [
      'Dryness has lasted more than a couple of weeks with no obvious cause',
      "You're noticing new cavities, sore gums, or cracked lips alongside the dryness",
      'It started after beginning a new medication',
    ],
  },
  'plaque-and-cavities': {
    label: 'Plaque & Cavities',
    title: 'Plaque, Biofilm & Cavities: What Causes Them',
    description: 'How plaque and dental biofilm form, and how to prevent cavities.',
    image: '/images/categories/plaque-and-cavities.webp',
    quickAnswer:
      "Cavities form when acid-producing bacteria in plaque break down sugars and starches faster than your saliva and enamel can recover from the resulting acid attack — it's a bacterial and dietary process, not bad luck. Plaque that isn't disrupted daily hardens into tartar within roughly 24 to 72 hours, which is why brushing technique and frequency matter more than which specific product you use. Fluoride helps enamel resist and even reverse early acid damage, but it doesn't address the bacterial side of the equation on its own.",
    overview:
      "This section explains how plaque and biofilm actually form, what causes cavities beyond 'too much sugar,' and which prevention strategies — fluoride, diet timing, bacterial balance — have real evidence behind them.",
    seeADentistIf: [
      'You notice a visible dark spot, hole, or rough patch on a tooth',
      'A specific tooth has become sensitive to sweets or temperature',
      "It's been more than six months since your last checkup and cleaning",
    ],
  },
  'tooth-sensitivity': {
    label: 'Tooth Sensitivity',
    title: 'Tooth Sensitivity & Loose Teeth: Causes & Solutions',
    description: 'Why teeth feel loose or sensitive, and what actually helps.',
    image: '/images/categories/tooth-sensitivity.webp',
    quickAnswer:
      'Sudden tooth sensitivity usually means the protective enamel or gum tissue covering a nerve-rich part of the tooth has thinned or receded, exposing the underlying dentin to temperature and pressure. Common causes range from aggressive brushing and acidic diets to teeth grinding, gum recession, and recent dental work — most are manageable once you identify which one applies to you. Sensitivity paired with visible tooth movement is a different issue, tooth mobility, and warrants a dental visit rather than a desensitizing toothpaste.',
    overview:
      'The guides below separate sensitivity from mobility, walk through the most common triggers for each, and explain which home fixes — desensitizing toothpaste, technique changes, a night guard — work for which underlying cause.',
    seeADentistIf: [
      'Any tooth feels loose or shifts position, with or without pain',
      'Sensitivity is sharp, localized to one tooth, and getting worse',
      'Sensitivity started after a cleaning or dental work and persists beyond a few weeks',
    ],
  },
} as const;

export type CategorySlug = keyof typeof CATEGORY_META;
export const CATEGORY_SLUGS = Object.keys(CATEGORY_META) as CategorySlug[];
