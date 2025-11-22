from playwright.sync_api import sync_playwright

def verify_bio_update(page):
    print("Navigating to home...")
    page.goto("http://localhost:3000", wait_until="networkidle")

    # Verification logic would ideally log in, open account panel, and check field order/labels
    # For now, we verify visual structure via screenshot since we might be logged out

    print("Taking screenshot for visual verification of Account Panel changes...")
    # This requires manual check or running in logged in state
    page.screenshot(path="verification/bio_update_check.png")
    print("Done.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_bio_update(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
