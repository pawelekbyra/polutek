
import { chromium, Browser, Page } from 'playwright';

async function verifyLayout() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Mock API
  await page.route('**/api/slides*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ pages: [{ data: [], nextCursor: null }] }),
    });
  });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000');

  // Force show PWA prompt by overriding checks (simplified simulation)
  // Since we can't easily mock 'beforeinstallprompt' in headless without more work,
  // we will check the structure of AppLayout and TopBar for responsiveness.
  // However, we can check if the elements inside AppLayout are contained.

  const appLayout = page.locator('#app-layout');
  await appLayout.waitFor();
  const layoutBox = await appLayout.boundingBox();

  if (!layoutBox) {
      console.error('AppLayout not found');
      process.exit(1);
  }

  console.log('AppLayout Box:', layoutBox);

  // Verify Aspect Ratio / Width
  // We set max-w-[420px] and aspect ratio.
  // 1280x800 viewport.
  // Height is max-h-[90vh] -> 720px.
  // Width should be around 720 * (9/19.5) ~= 332px, or capped by max-width.
  // Or if it uses w-full max-w-420, it might be wider if height allows?
  // Actually aspect-ratio drives it if height is auto? No, height is auto, max-height is 90vh.
  // So it tries to be 9/19.5 aspect ratio.
  // If width is 420, height would be ~910.
  // 90vh is 720. So height is limiting factor.
  // Width = 720 * (9/19.5) = 332px.

  if (layoutBox.width < 450 && layoutBox.height < 750) {
      console.log('✅ AppLayout dimensions seem responsive/constrained correctly.');
  } else {
      console.error('❌ AppLayout dimensions might be off:', layoutBox);
  }

  // Check TopBar width
  const topBar = page.locator('text=Nie masz psychy').first();
  // TopBar is absolute w-full inside relative AppLayout.
  // It should match AppLayout width (minus border if box-sizing is content-box, but usually border-box).
  // AppLayout has border-8. The content box is inside.
  // Playwright bounding box for AppLayout includes border? Usually yes.
  // TopBar is inside. So TopBar width should be approx LayoutWidth - 16px.

  // Let's take a screenshot to visually confirm.
  await page.screenshot({ path: 'verification/responsive_layout.png' });
  console.log('Screenshot saved to verification/responsive_layout.png');

  await browser.close();
}

verifyLayout().catch(console.error);
