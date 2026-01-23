import { test, expect } from '@playwright/test';

test.describe('UI Verification', () => {
  test('should correctly display the verdict gallery and centered image', async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');

    // Enter the password
    await page.fill('input[type="password"]', 'szaman');
    await page.click('button[type="submit"]');

    // Wait for the main content to load
    await page.waitForSelector('h1');

    // Verify the "Wezwanie" image is centered
    const wezwanieImage = page.locator('img[alt="Wezwanie na policję"]');
    const imageContainer = wezwanieImage.locator('..'); // Parent element
    await expect(imageContainer).toHaveClass(/items-center/);

    // Click the button to open Badi's verdict gallery
    await page.click('button[title="Zobacz wyrok Bartosza B."]');

    // Verify the gallery is full-screen
    const galleryModal = page.locator('.fixed.inset-0.bg-black\\/80');
    const galleryContent = galleryModal.locator('> div');
    await expect(galleryContent).toHaveClass(/w-screen/);
    await expect(galleryContent).toHaveClass(/h-screen/);

    // Verify the download button text
    const downloadButton = galleryModal.locator('a[download]');
    await expect(downloadButton).toContainText('Pobierz PDF');

    // Take a screenshot
    await page.screenshot({ path: 'test-results/ui-verification.png', fullPage: true });
  });
});
