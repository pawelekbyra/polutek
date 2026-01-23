import { test, expect } from '@playwright/test';

test.describe('UI Verification', () => {
  test('should correctly display the verdict gallery and floating controls', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="password"]', 'szaman');
    await page.click('button[type="submit"]');
    await page.waitForSelector('h1');

    await page.click('button[title="Zobacz wyrok Bartosza B."]');

    const galleryModal = page.locator('.fixed.inset-0.bg-black\\/90');
    await expect(galleryModal).toBeVisible();

    // Verify the close button is a floating overlay
    const closeButton = galleryModal.locator('button[aria-label="Close gallery"]');
    await expect(closeButton).toHaveClass(/absolute top-4 right-4/);

    // Verify the download button is a floating overlay
    const downloadButton = galleryModal.locator('a[aria-label="Download PDF"]');
    await expect(downloadButton).toBeVisible();

    // Verify the page counter is a floating overlay
    const pageCounter = galleryModal.locator('.absolute.bottom-4.left-1\\/2');
    await expect(pageCounter).toBeVisible();

    await page.screenshot({ path: 'test-results/ui-verification.png', fullPage: true });
  });
});
