import { test, expect } from '@playwright/test';

test.describe('UI Verification', () => {
  test('should correctly display the verdict gallery and floating controls', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="password"]', 'szaman');
    await page.click('button[type="submit"]');
    await page.waitForSelector('h1');

    await page.click('button[title="Zobacz wyrok Bartosza B."]');

    const flipbookModal = page.locator('.fixed.inset-0.z-50');
    await expect(flipbookModal).toBeVisible();

    // Verify the close button is in the top-right corner
    const closeButton = flipbookModal.locator('button[aria-label="Close"]');
    await expect(closeButton).toBeVisible();

    // Verify the download button is in the bottom controls
    const downloadButton = flipbookModal.locator('a:has-text("Pobierz PDF")');
    await expect(downloadButton).toBeVisible();

    // Verify the page counter is visible and has the correct text
    const pageCounter = flipbookModal.locator('.font-mono.text-sm:has-text("Strona 1 z")');
    await expect(pageCounter).toBeVisible();

    await page.screenshot({ path: 'test-results/ui-verification.png', fullPage: true });
  });
});
