import { test, expect } from '@playwright/test';

const locales = ['pl', 'en', 'es', 'de', 'fr'];

for (const lang of locales) {
  test(`screenshot for ${lang}`, async ({ page }) => {
    // Access static output directly from /out or via npx serve
    await page.goto(`http://localhost:3000/${lang}.html`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/home/jules/verification/screenshot_${lang}_new.png`, fullPage: true });

    await page.goto(`http://localhost:3000/${lang}/prokuratura-rejonowa-w-walbrzychu.html`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/home/jules/verification/screenshot_${lang}_prokuratura_new.png`, fullPage: true });
  });
}
