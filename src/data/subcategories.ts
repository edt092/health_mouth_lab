// Metadata para las 19 páginas de subcategoría (nivel 2 del silo, ej.
// /gum-health/bleeding-gums/). Antes usaban un H1 tomado del slug crudo sin
// formato (ej. "bleeding gums") y una meta descripción boilerplate idéntica
// en las 19 — "Everything about {slug} — causes, symptoms and what actually
// helps." (hallazgo #4 de la auditoría SEO). Cada entrada aquí es específica
// a lo que agrupan los artículos reales de esa subcategoría, no una
// reformulación del pilar padre (que ya tiene su propio contenido, ver
// CATEGORY_META en categories.ts).
//
// Clave: "<category>/<subcategory>".
export const SUBCATEGORY_META: Record<string, { label: string; description: string; intro: string }> = {
  'bad-breath/chronic-bad-breath': {
    label: 'Chronic Bad Breath',
    description: 'Why bad breath persists in the morning or after brushing, and what it means when it won\'t go away.',
    intro:
      "Chronic bad breath — the kind that persists well beyond your morning routine or comes back within minutes of brushing — points to an ongoing bacterial source rather than a one-off cause. The guides below cover the two most common patterns: breath that's worst first thing in the morning, and breath that lingers all day despite good hygiene.",
  },
  'bad-breath/halitosis-causes': {
    label: 'Halitosis Causes',
    description: 'The real root causes of chronic halitosis — from oral bacteria to the gut connection everyone blames too quickly.',
    intro:
      "Halitosis has a short list of real root causes — most of them bacterial and oral, a minority digestive or systemic. These guides separate what actually drives chronic bad breath (bacteria on the tongue and in gum pockets) from the much rarer gut-related causes that get blamed more often than the evidence supports.",
  },
  'bad-breath/white-coated-tongue': {
    label: 'White or Coated Tongue',
    description: 'What a white or coated tongue actually is, what causes it, and how it connects to bad breath.',
    intro:
      "A white or coated tongue is usually a buildup of bacteria, dead cells and food debris on the tongue's surface — not a sign of a serious illness, though a few less common causes are worth knowing. This guide explains what the coating actually is and when it's connected to bad breath.",
  },
  'dry-mouth/dry-mouth-at-night': {
    label: 'Dry Mouth at Night',
    description: 'Why your mouth is dry specifically at night, and what actually reduces it.',
    intro:
      "Waking up with a parched mouth has a different, usually more identifiable set of causes than daytime dryness — mouth breathing, sleep position, and evening habits play an outsized role overnight. These guides focus specifically on nighttime dry mouth and what actually reduces it.",
  },
  'dry-mouth/xerostomia-causes': {
    label: 'Xerostomia Causes',
    description: 'The full range of medical causes behind chronic dry mouth, from medications to underlying conditions.',
    intro:
      "Xerostomia — the clinical term for chronic dry mouth — has a wider range of causes than nighttime dryness alone, from medications to underlying medical conditions. These guides cover the full list of causes, why dry mouth and bad breath so often show up together, and the medical picture behind chronic cases.",
  },
  'gum-health/bleeding-gums': {
    label: 'Bleeding Gums',
    description: 'What\'s actually behind gums that bleed when you brush or floss — and why it\'s rarely your technique.',
    intro:
      "Bleeding when you brush or floss is your gum tissue's inflammatory response to bacterial plaque — not a sign you're brushing too hard, in most cases. These guides walk through what's actually happening at the gumline and the specific culprit behind bleeding that a toothbrush usually gets blamed for.",
  },
  'gum-health/gingivitis-treatment': {
    label: 'Gingivitis Treatment',
    description: 'Which toothpaste and mouthwash ingredients have real evidence for treating gum disease.',
    intro:
      "Once gingivitis is diagnosed or suspected, the right toothpaste and mouthwash ingredients can genuinely help — but most products on the shelf are marketing, not evidence. This guide breaks down which active ingredients have real clinical support for reducing gum inflammation.",
  },
  'gum-health/gum-recession': {
    label: 'Gum Recession',
    description: 'Whether gum recession can be reversed, slowed, or just stopped — and what determines which.',
    intro:
      "Gum recession — when gum tissue pulls back and exposes more of the tooth root — behaves differently from gum bleeding or swelling, and the honest answer about reversing it depends on the cause. This guide explains what can realistically be stopped versus reversed.",
  },
  'gum-health/overview': {
    label: 'Gum Health Overview',
    description: 'The habits that keep gums healthy long-term, once symptoms are under control.',
    intro:
      "Beyond treating a specific symptom, keeping gums healthy long-term comes down to a small number of habits that matter far more than any single product. This guide covers the maintenance side: what to keep doing once bleeding, swelling or recession are under control.",
  },
  'gum-health/swollen-inflamed-gums': {
    label: 'Swollen & Inflamed Gums',
    description: 'What different patterns of gum swelling and pain usually mean.',
    intro:
      "Swollen or painful gums are usually your immune system responding to bacterial irritation, but the specific pattern of swelling can point to different underlying causes — from plaque buildup to hormonal changes. This guide breaks down what different presentations of gum swelling typically mean.",
  },
  'oral-microbiome/dental-probiotics-guide': {
    label: 'Dental Probiotics Guide',
    description: 'What the research actually shows about whether oral probiotics work.',
    intro:
      "Oral probiotics are one of the more debated tools for supporting a healthy bacterial balance in the mouth — genuinely promising for some applications, oversold for others. This guide looks at what the research actually shows before you consider adding one to a routine.",
  },
  'oral-microbiome/gut-oral-health-connection': {
    label: 'The Gut-Oral Health Connection',
    description: 'How gut health and oral health are actually connected, and what that does and doesn\'t explain.',
    intro:
      "Your gut and oral microbiomes aren't isolated systems — research increasingly shows a real, measurable connection between digestive health and what's happening in your mouth. This guide covers what that connection actually looks like and what it does (and doesn't) explain about oral symptoms.",
  },
  'oral-microbiome/oral-flora-balance': {
    label: 'Oral Flora Balance',
    description: 'The signs your oral microbiome is out of balance, and how to restore it.',
    intro:
      "Knowing whether your oral microbiome is actually out of balance — and what to do about it if it is — starts with recognizing the signs and understanding which changes genuinely help restore that balance versus which are marketing claims. These guides cover both sides: diagnosis and response.",
  },
  'oral-microbiome/overview': {
    label: 'Oral Microbiome Overview',
    description: 'What the oral microbiome is, and why it drives most of what happens in your mouth.',
    intro:
      "Before addressing any specific symptom, it helps to understand what the oral microbiome actually is — the bacterial ecosystem behind gum health, breath and cavity risk. This guide is the foundational explainer the rest of this site's content builds on.",
  },
  'plaque-and-cavities/can-probiotics-prevent-cavities': {
    label: 'Can Probiotics Prevent Cavities?',
    description: 'Whether probiotics can meaningfully reduce cavity risk, based on the current evidence.',
    intro:
      "Whether probiotics can meaningfully reduce cavity risk is a narrower, more specific question than whether they help oral health generally — and the evidence for cavity prevention specifically is still early. This guide looks at what's actually been studied.",
  },
  'plaque-and-cavities/dental-biofilm': {
    label: 'Dental Biofilm',
    description: 'What dental biofilm actually is, and why brushing alone doesn\'t remove it.',
    intro:
      "Plaque isn't just a loose film of bacteria — it's a structured biofilm that actively resists mechanical removal, which is exactly why brushing alone often isn't enough. This guide explains what biofilm actually is and why that structure matters for how you should be cleaning your teeth.",
  },
  'plaque-and-cavities/prevent-plaque-buildup': {
    label: 'Preventing Plaque Buildup',
    description: 'Why plaque keeps coming back, what really causes cavities, and what prevention actually works.',
    intro:
      "Preventing plaque buildup and the cavities it eventually causes comes down to understanding the actual mechanism — which bacteria are involved, why plaque keeps returning, and which prevention strategies have real evidence versus which are natural-remedy myths. These guides cover the full picture from buildup to prevention.",
  },
  'tooth-sensitivity/loose-teeth': {
    label: 'Loose Teeth',
    description: 'When a loose tooth is a normal, treatable finding — and when it signals something more serious.',
    intro:
      "A loose tooth in an adult is a distinct issue from sensitivity — it points to changes in the supporting bone or ligament rather than exposed dentin, and it's not something to treat with a desensitizing toothpaste. These guides explain when tooth mobility is a normal, treatable finding and when it signals something more serious.",
  },
  'tooth-sensitivity/teeth-sensitivity-causes': {
    label: 'Teeth Sensitivity Causes',
    description: 'The common causes of sudden tooth sensitivity, and what actually helps.',
    intro:
      "Sudden tooth sensitivity almost always traces back to a specific, identifiable trigger — from diet and brushing technique to grinding — and most causes respond well to the right change once you know which one applies to you. These guides cover the common causes and what actually helps strengthen sensitive teeth.",
  },
};
