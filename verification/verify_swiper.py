from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_homepage(page: Page):
    # Navigate to the homepage
    page.goto("http://localhost:3000")

    # Wait for the swiper-wrapper to be visible, indicating Swiper initialized
    # Note: If Swiper fails to import, this might not exist or the page might crash
    page.wait_for_selector(".swiper-wrapper", timeout=20000)

    # Also check for Language Modal if it appears (memory says it does)
    # If it appears, we might want to close it or just take a screenshot as is.
    # We'll verify the swiper container exists underneath.

    time.sleep(3) # Allow some time for rendering

    # Screenshot
    page.screenshot(path="verification/homepage.png")
    print("Screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/failure.png")
        finally:
            browser.close()
