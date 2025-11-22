import os
from playwright.sync_api import sync_playwright, expect

def verify_swiper():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 390, "height": 844},  # iPhone 12 Pro dimensions
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()

        # Navigate to the home page
        try:
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for language selection if it appears
            try:
                # Check if language modal is present
                lang_button = page.get_by_role("button", name="Polski")
                if lang_button.is_visible(timeout=5000):
                    print("Language modal detected. Selecting Polish...")
                    lang_button.click()
            except Exception as e:
                print(f"Language selection skipped or failed: {e}")

            # Wait for content to load
            # Assuming the main feed has slides or some content
            page.wait_for_load_state("networkidle", timeout=10000)

            # Take a screenshot of the feed
            page.screenshot(path="verification/swiper_verification.png")
            print("Screenshot saved to verification/swiper_verification.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/failure.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_swiper()
