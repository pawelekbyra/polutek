from playwright.sync_api import sync_playwright, expect
import time

def verify_articles():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test Stypulkowska
        print("Navigating to home page...")
        try:
            page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            return

        print("Entering 'stypulkowska' password...")
        try:
            page.fill('input[type="password"]', 'stypulkowska')
            page.click('button[type="submit"]')
        except Exception as e:
             print(f"Failed to interact with login form: {e}")
             page.screenshot(path="debug_error.png")
             return

        # Wait for content
        page.wait_for_timeout(2000)

        print("Verifying 'Stypulkowska' article...")
        # Check title text
        try:
            expect(page.get_by_text("PROKURATOR PONAD PRAWEM")).to_be_visible(timeout=5000)
            print("Verified 'PROKURATOR PONAD PRAWEM' is visible.")
        except:
            print("Failed to find 'PROKURATOR PONAD PRAWEM'. Taking screenshot.")

        page.screenshot(path="verification_stypulkowska.png")
        print("Screenshot 'verification_stypulkowska.png' taken.")

        # Test Elixir
        print("Navigating to home page...")
        page.goto("http://localhost:3000")

        print("Entering 'szaman' password...")
        page.fill('input[type="password"]', 'szaman')
        page.click('button[type="submit"]')

        # Wait for content
        page.wait_for_timeout(2000)

        print("Verifying 'Elixir' article...")
        try:
            expect(page.get_by_text("Eliksir Wiedźmina")).to_be_visible(timeout=5000)
            print("Verified 'Eliksir Wiedźmina' is visible.")
        except:
            print("Failed to find 'Eliksir Wiedźmina'. Taking screenshot.")

        page.screenshot(path="verification_elixir.png")
        print("Screenshot 'verification_elixir.png' taken.")

        browser.close()

if __name__ == "__main__":
    verify_articles()
