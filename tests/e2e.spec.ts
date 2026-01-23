import { test, expect } from '@playwright/test';

test('should open the Badi verdict gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('button[title="Zobacz wyrok Bartosza B."]').click();

  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();

  // Use the correct class from the react-pageflip library
  await expect(galleryModal.locator('.stf__parent')).toBeVisible();

  await expect(page.locator('img[alt="Page 1"]')).toBeVisible();
});

test('should open the "nieruchomości 2" gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  // Use a more specific selector to avoid ambiguity
  await page.locator('p > button:has-text("Nýdek")').click();

  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('.stf__parent')).toBeVisible();
  await expect(page.locator('img[alt="Page 1"]')).toBeVisible();
});

test('should open the wezwanie gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('img[alt="Wezwanie na policję"]').click();

  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('.stf__parent')).toBeVisible();
  await expect(page.locator('img[alt="Page 1"]')).toBeVisible();
});

test('should open the Janov gallery when "bazie" is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('button:has-text("„bazie”")').click();

  // Corrected the typo in the selector
  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('.stf__parent')).toBeVisible();
  await expect(page.locator('img[alt="Page 1"]')).toBeVisible();
});
