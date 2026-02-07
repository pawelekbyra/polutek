import asyncio
from playwright.async_api import async_playwright
import os

async def verify_noir():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Go to home page
        try:
            await page.goto("http://localhost:3000", wait_until="networkidle")
        except Exception as e:
            print(f"Failed to load page: {e}")
            await browser.close()
            return

        print("Page loaded")

        # Click on the first article
        # The title is in an <h3> inside a <a> probably, or just <h3>
        article_link = page.locator("a:has-text('Eliksir Wiedźmina')").first
        await article_link.wait_for(state="visible", timeout=10000)
        await article_link.click()

        # Verify Redacted state
        print("Waiting for redacted state...")
        await page.wait_for_url("**/artykuly/eliksir-wiedzmina", wait_until="networkidle")

        # Check for Top Secret text
        await page.get_by_text("Top Secret / Redacted").first.wait_for(state="visible", timeout=5000)
        print("Redacted overlay confirmed.")

        # Try to unlock
        password_input = page.get_by_placeholder("********")
        await password_input.fill("ichtroje")

        # Click the unlock button
        unlock_button = page.get_by_role("button", name="Odblokuj Akta")
        await unlock_button.click()

        # Wait for content to reveal
        # Use a text that is definitely in ElixirArticle.tsx, e.g., "Śledztwo Dziennikarskie" (uppercase)
        # or the main title "Eliksir Wiedźmina" which is now in the article header
        print("Waiting for unlock...")
        await page.get_by_text("Mroczna tajemnica twórców CD Projekt").first.wait_for(state="visible", timeout=10000)
        print("Article unlocked successfully.")
        await page.screenshot(path="verification/article_unlocked_v3.png")

        await browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    asyncio.run(verify_noir())
