from playwright.sync_api import Page, sync_playwright

def verify_changes(page: Page):
    # 1. Open the app
    page.goto("http://localhost:3000")

    # 2. Wait for the main article header to be visible
    header_locator = page.locator("h1:has-text('Dwa światy Wiedźmina')")
    header_locator.wait_for(timeout=30000)

    # 3. Take a full-page screenshot to verify all the visual changes
    page.screenshot(path="final_screenshot.png", full_page=True)

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    try:
      page.set_viewport_size({"width": 1280, "height": 1024})
      verify_changes(page)
      print("Verification successful. Screenshot saved as final_screenshot.png")
    except Exception as e:
        print(f"Error during verification: {e}")
        page.screenshot(path="error_screenshot.png")
    finally:
      browser.close()
