/** Paleta y tipografía tomadas directamente de INFORME_UX_UI_DENTABIOME.md
 *  (contraste 4.5:1 mínimo verificado: brand-text sobre brand-bg = ~14:1,
 *  blanco sobre brand-primary = ~5.2:1). No cambiar sin re-verificar ratio. */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAF7',
          text: '#1A2B2B',
          primary: '#0B6E4F',
        },
      },
      fontSize: {
        body: ['18px', '1.6'],
      },
      maxWidth: {
        measure: '70ch', // medida de línea máxima en artículos (UX §3)
      },
    },
  },
  plugins: [],
};
