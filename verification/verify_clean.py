from playwright.sync_api import sync_playwright

def verify_clean_state(page):
    print("Navigating...")
    page.goto("http://127.0.0.1:3000", timeout=60000)

    # Handle Preloader
    try:
        polski_btn = page.locator("text=Polski")
        if polski_btn.is_visible(timeout=5000):
            print("Preloader found. Clicking 'Polski'...")
            polski_btn.click()
            polski_btn.wait_for(state="hidden", timeout=5000)
    except Exception as e:
        print(f"Preloader warning: {e}")

    # Verify TopBar Spacing
    print("Verifying TopBar...")
    topbar = page.locator("div[class*='z-[60]']")
    topbar.wait_for(state="visible")

    buttons = topbar.locator("button").all()
    if len(buttons) >= 2:
        hamburger = buttons[0]
        bell = buttons[-1]

        if "ml-1" in hamburger.get_attribute("class"):
            print("SUCCESS: Hamburger has ml-1 class.")
        else:
            print("FAILURE: Hamburger missing ml-1 class.")

        if "mr-1" in bell.get_attribute("class"):
            print("SUCCESS: Bell has mr-1 class.")
        else:
            print("FAILURE: Bell missing mr-1 class.")

    page.screenshot(path="/home/jules/verification/clean_verify.png", clip={"x": 0, "y": 0, "width": 800, "height": 100})
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        try:
            verify_clean_state(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
