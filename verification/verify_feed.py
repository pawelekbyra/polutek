import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a mobile device to test the vertical layout
        context = browser.new_context(
            viewport={'width': 375, 'height': 667},
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        # Wait for server
        time.sleep(5)

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            print("Waiting for feed to load...")
            # MainFeed has a container with black background
            page.wait_for_selector('.bg-black', timeout=10000)

            # Wait a bit for slides to render (skeleton might show first)
            time.sleep(2)

            # Screenshot initial state
            page.screenshot(path="verification/feed_initial.png")
            print("Initial screenshot taken.")

            # Try to find a slide
            # Slides are usually images or videos
            # We look for the profile pic or username which is in SlideUI

            # Just verify we have content
            content = page.content()
            if "Slide" in content or "video" in content or "img" in content:
                print("Content appears to be rendering.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
