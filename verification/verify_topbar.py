from playwright.sync_api import sync_playwright

def verify_topbar(page):
    print("Navigating...")
    page.goto("http://127.0.0.1:3000", timeout=60000)

    # Handle Preloader
    try:
        polski_btn = page.locator("text=Polski")
        if polski_btn.is_visible(timeout=5000):
            print("Preloader found. Clicking 'Polski'...")
            polski_btn.click()
            polski_btn.wait_for(state="hidden", timeout=5000)
            print("Preloader passed.")
        else:
            print("Preloader not visible.")
    except Exception as e:
        print(f"Preloader check warning: {e}")

    # Wait for TopBar
    topbar = page.locator("div[class*='z-[60]']")
    try:
        topbar.wait_for(state="visible", timeout=10000)
        print("TopBar found.")
    except:
        print("TopBar not found. Dumping body...")
        print(page.locator("body").inner_text()[:200])
        return

    # Wait for buttons
    try:
        topbar.locator("button").first.wait_for(timeout=5000)
    except:
        print("No buttons found in TopBar.")
        return

    buttons = topbar.locator("button").all()
    print(f"Found {len(buttons)} buttons.")

    if len(buttons) < 2:
        print("Not enough buttons.")
        return

    hamburger = buttons[0]
    bell = buttons[-1]

    h_class = hamburger.get_attribute("class")
    print(f"Hamburger Class: {h_class}")

    if "-ml-1" in h_class:
        print("FAILURE: Hamburger still has -ml-1 class.")
    else:
        print("SUCCESS: Hamburger does NOT have -ml-1 class.")

    b_class = bell.get_attribute("class")
    print(f"Bell Class: {b_class}")

    if "-mr-1" in b_class:
        print("FAILURE: Bell still has -mr-1 class.")
    else:
        print("SUCCESS: Bell does NOT have -mr-1 class.")

    page.screenshot(path="/home/jules/verification/topbar_verified.png", clip={"x": 0, "y": 0, "width": 800, "height": 100})
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        try:
            verify_topbar(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
