import { test, expect } from '@playwright/test';

test('should open the Badi verdict gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('button[title="Zobacz wyrok Bartosza B."]').click();

  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();

  // Check for the flipbook container
  await expect(galleryModal.locator('.shadow-2xl')).toBeVisible();

  await expect(page.locator('img[alt="Page 1"]')).toBeVisible();
});

test('should open the wezwanie gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('img[alt="Wezwanie na policję"]').click();

  const imageViewer = page.locator('.fixed.inset-0.z-50');
  await expect(imageViewer).toBeVisible();
  await expect(page.locator('img[alt="View 1 of 1"]')).toBeVisible();
});

test('should open the Janov gallery when "bazie" is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();
  await page.waitForSelector('article');

  await page.locator('button:has-text("„bazie”")').click();

  const imageViewer = page.locator('.fixed.inset-0.z-50');
  await expect(imageViewer).toBeVisible();
  await expect(page.locator('img[alt="View 1 of 23"]')).toBeVisible();
});
