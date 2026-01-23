import { test, expect } from '@playwright/test';

test('should open the Badi verdict gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Enter password
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();

  // Wait for the main content to load
  await page.waitForSelector('article');

  // Click the trigger for the Badi verdict gallery
  await page.locator('button[title="Zobacz wyrok Bartosza B."]').click();

  // Verify the gallery modal is open
  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('h2')).toHaveText("Wyrok skazujący: Bartosz B.");

  // Verify the images are present and navigate through them
  await expect(page.locator('img[src="/wyrok_page-0001.jpg"]')).toBeVisible();

  // Click next and verify the second image
  await page.locator('button.absolute.right-4').click();
  await expect(page.locator('img[src="/wyrok_page-0002.jpg"]')).toBeVisible();

  // Click next and verify the third image
  await page.locator('button.absolute.right-4').click();
  await expect(page.locator('img[src="/wyrok_page-0003.jpg"]')).toBeVisible();
});

test('should open the "nieruchomości 2" gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Enter password
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();

  // Wait for the main content to load
  await page.waitForSelector('article');

  // Click the trigger for the "nieruchomości 2" gallery
  await page.locator('button:has-text("bliźniaczy ośrodek")').click();

  // Verify the gallery modal is open
  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('h2')).toHaveText("Kolejny bliźniaczy ośrodek");

  // Verify the images are present and navigate through them
  await expect(page.locator('img[src="/Nydek1.jpg"]')).toBeVisible();

  // Click next and verify the second image
  await page.locator('button.absolute.right-4').click();
  await expect(page.locator('img[src="/Nydek2.jpg"]')).toBeVisible();

  // Click next and verify the third image
  await page.locator('button.absolute.right-4').click();
  await expect(page.locator('img[src="/Nieruchomosc3.jpeg"]')).toBeVisible();
});

test('should open the wezwanie gallery when the trigger is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Enter password
  await page.locator('input[type="password"]').fill('szaman');
  await page.locator('button[type="submit"]').click();

  // Wait for the main content to load
  await page.waitForSelector('article');

  // Click the trigger for the wezwanie gallery
  await page.locator('img[alt="Wezwanie na policję"]').click();

  // Verify the gallery modal is open
  const galleryModal = page.locator('.fixed.inset-0.z-50');
  await expect(galleryModal).toBeVisible();
  await expect(galleryModal.locator('h2')).toHaveText("Wezwanie dla Michała Kicińskiego");

  // Verify the image is present
  await expect(galleryModal.locator('img[src="/wezwanie_kicinski.png"]')).toBeVisible();
});
