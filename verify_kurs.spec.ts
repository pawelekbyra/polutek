import { test, expect } from '@playwright/test';

test('verify kurs page', async ({ page }) => {
  await page.goto('http://localhost:3000/kurs');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'kurs_verification.png', fullPage: true });
});
