import asyncio
from playwright.async_api import async_playwright

async def verify_sidebar():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        try:
            await page.goto("http://localhost:3000", timeout=60000)

            # Language check
            try:
                lang_button = page.get_by_role("button", name="Polski")
                if await lang_button.is_visible(timeout=5000):
                    await lang_button.click()
                    await page.wait_for_timeout(1000)
            except:
                pass

            # Wait for any sidebar
            await page.wait_for_selector("aside", timeout=30000)

            # Get the first visible sidebar (e.g. first slide)
            # We can use .first since likely the first one is in view
            sidebar = page.locator("aside").first

            if await sidebar.is_visible():
                print("Sidebar is visible.")
                z_index = await sidebar.evaluate("el => window.getComputedStyle(el).zIndex")
                print(f"Sidebar Z-Index: {z_index}")

                # Verify position (roughly)
                bounding_box = await sidebar.bounding_box()
                print(f"Sidebar Bounding Box: {bounding_box}")

                # Check if it is overlapping the bottom area (since we set bottombar to 0)
                # Screen height 812.
                # Center of sidebar should be around (812 - 40)/2 + 40 = 426.
                # Sidebar height?

                await page.screenshot(path="/home/jules/verification/sidebar_verified_fixed.png")
            else:
                print("Sidebar found but not visible?")
                await page.screenshot(path="/home/jules/verification/sidebar_missing.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_sidebar())
