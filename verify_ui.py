
import os
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to http://127.0.0.1:3000...")
            page.goto("http://127.0.0.1:3000", timeout=60000)

            # Handle Preloader
            print("Checking for Preloader...")
            try:
                # Wait for language selection (based on memory about Preloader)
                # Try clicking "Polski" if visible
                polski_btn = page.get_by_text("Polski")
                if polski_btn.is_visible(timeout=5000):
                    print("Clicking Polski...")
                    polski_btn.click(force=True)
                    # Wait for preloader to disappear
                    page.wait_for_timeout(2000)
            except Exception as e:
                print(f"Preloader handling warning: {e}")

            print("Waiting for main content...")
            # Wait for something main to load, e.g. a slide or sidebar
            page.wait_for_timeout(3000)

            # Screenshot of main page (to see if comments are visible or we need to navigate)
            page.screenshot(path="verification_step1.png")
            print("Step 1 screenshot taken.")

            # Look for comments button or content
            # The memory says "Sidebar.tsx component contains a comments button identifiable by data-testid='comments-button'"
            comments_btn = page.locator('[data-testid="comments-button"]')
            if comments_btn.is_visible():
                print("Clicking comments button...")
                comments_btn.click()
                page.wait_for_timeout(2000)

                # Take screenshot of comments modal
                page.screenshot(path="verification_comments.png")
                print("Comments screenshot taken.")

                # Try to find a badge
                # Badges text: "Admin", "Patron", "Zweryfikowany"
                # If we see one, that's great.
                if page.locator("text=Admin").is_visible() or page.locator("text=Patron").is_visible():
                    print("Found a badge!")
            else:
                print("Comments button not found. Maybe no slides?")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ui()
