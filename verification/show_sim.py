import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Create a temp html file to show the image
        with open("verification/sim.html", "w") as f:
            f.write('<html><body><img src="../public/sim.png" style="width:500px"></body></html>')

        await page.goto(f"file://{os.getcwd()}/verification/sim.html")
        await page.screenshot(path="verification/sim_check.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
