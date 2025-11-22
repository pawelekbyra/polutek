import asyncio
from playwright.async_api import async_playwright

async def verify_author_profile():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Use mobile viewport to match the layout
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        try:
            print("Navigating to app...")
            await page.goto("http://localhost:3000", timeout=60000)

            # Handle language modal
            try:
                lang_btn = page.get_by_role("button", name="Polski")
                if await lang_btn.is_visible(timeout=5000):
                    await lang_btn.click()
                    print("Language selected.")
            except:
                print("Language selection skipped.")

            # Wait for content
            await page.wait_for_selector(".swiper-slide-active", timeout=30000)
            print("Feed loaded.")

            # Find the avatar button in the active slide's sidebar
            # Sidebar has z-50 now.
            # The avatar is the first button in the sidebar.
            # Sidebar structure: aside -> div (avatar wrapper) -> button

            # We target the first visible sidebar
            sidebar = page.locator("aside").first
            avatar_btn = sidebar.locator("button").first

            if await avatar_btn.is_visible():
                print("Avatar button found. Clicking...")
                await avatar_btn.click()

                # Wait for modal
                print("Waiting for Author Profile Modal...")
                modal = page.locator("text=Author Profile")
                await modal.wait_for(state="visible", timeout=10000)
                print("Author Profile Modal opened successfully.")

                # Check content
                await page.wait_for_selector("text=Mock Author", timeout=5000)
                print("Profile content loaded.")

                await page.screenshot(path="/home/jules/verification/author_profile_success.png")
            else:
                print("Avatar button not visible.")
                await page.screenshot(path="/home/jules/verification/author_profile_fail.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path="/home/jules/verification/author_profile_error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_author_profile())
