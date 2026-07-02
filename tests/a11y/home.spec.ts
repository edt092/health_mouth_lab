// Testing (SDLC.md, fase 4): pruebas de accesibilidad automatizadas contra
// WCAG 2.1 AA (ver INFORME_UX_UI_DENTABIOME.md §3). Corre contra `pnpm preview`.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES_TO_AUDIT = [
  '/',
  '/gum-health/',
  '/gum-health/bleeding-gums/',
  '/gum-health/bleeding-gums/why-do-my-gums-bleed/',
  '/gum-health/best-probiotic-for-gum-disease/', // página puente (bridge)
  '/dentabiome/',
];

for (const path of PAGES_TO_AUDIT) {
  test(`a11y: ${path} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test(`a11y: ${path} skip link is keyboard-focusable`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
  });
}
