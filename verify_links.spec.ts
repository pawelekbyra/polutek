import { test, expect } from '@playwright/test';

test('verify location stamp links', async ({ page }) => {
  await page.goto('http://localhost:3001');

  // Janov Link
  const janovLink = page.locator('a[href*="Ph1DBACX9hLEB6fts7JCaqzjwc"]');
  await expect(janovLink).toBeVisible();
  await expect(janovLink).toHaveAttribute('target', '_blank');

  // Nydek Link
  const nydekLink = page.locator('a[href*="uQr6_qGGFNbscI31qkCFl1vpVRu3o8TW"]');
  await expect(nydekLink).toBeVisible();
  await expect(nydekLink).toHaveAttribute('target', '_blank');

  await page.screenshot({ path: 'links_verified.png' });
});
