from playwright.sync_api import sync_playwright

def verify_new_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("Navigating to home page...")
        try:
            page.goto("http://127.0.0.1:3000")
        except Exception as e:
            print(f"Failed to load page: {e}")
            return

        # Handle Language Preloader
        print("Checking for language preloader...")
        try:
            page.wait_for_timeout(2000)
            pl_button = page.get_by_text("Polski")
            if pl_button.is_visible():
                print("Selecting language...")
                pl_button.click(force=True)
                page.wait_for_selector(".preloader", state="hidden", timeout=5000)
        except Exception as e:
            print(f"Preloader handling note: {e}")

        # 1. Verify "Zaloguj się, ziom" -> "Zaloguj się"
        # Trigger locked toast via bell icon (logged out)
        print("Triggering locked notification...")
        bell = page.locator("button[aria-label='Powiadomienia']").first
        if bell.is_visible():
            bell.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/toast_check.png")
            # We can't easily assert toast text without OCR or specific selector, but screenshot helps.

        # 2. Verify Slide Layout
        print("Capturing Slide Layout...")
        page.screenshot(path="verification/slide_layout.png")

        # 3. Comments Empty State
        print("Opening Comments Modal...")
        comments_btn = page.get_by_test_id("comments-button").first
        if comments_btn.is_visible():
            comments_btn.click()
            page.wait_for_timeout(2000)
            page.screenshot(path="verification/comments_empty.png")

        browser.close()

if __name__ == "__main__":
    verify_new_changes()
