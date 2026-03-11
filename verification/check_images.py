import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        import subprocess
        import time
        import os

        port = "3007"
        env = os.environ.copy()
        process = subprocess.Popen(["yarn", "dev", "-p", port], env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        time.sleep(10)

        try:
            await page.goto(f"http://localhost:{port}")
            await page.screenshot(path="verification/current_header.png")

        finally:
            process.terminate()
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
