from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})

    # 1. Go to home page
    try:
        page.goto("http://localhost:3000", timeout=60000)
    except Exception as e:
        print(f"Error navigating to page: {e}")
        return

    # 2. Handle Password Protection
    try:
        password_input = page.get_by_placeholder("Wprowadź hasło...")
        if password_input.count() > 0:
            print("Password protection found. Entering password...")
            password_input.fill("ichtroje")
            page.get_by_role("button", name="Odblokuj Dostęp").click()
            expect(page.get_by_text("Dwa światy Wiedźmina")).to_be_visible(timeout=10000)
    except Exception as e:
        print(f"Password handling error: {e}")

    # 3. Verify VERDICT (Flipbook)
    print("Opening VERDICT gallery...")
    try:
        trigger = page.get_by_role("button", name="30 T 5/2021")
        trigger.click()
        print("Waiting for Verdict modal...")
        expect(page.get_by_text("Uzasadnienie wyroku: Jarosław K.")).to_be_visible()
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/verdict_mode.png")

        # Close modal
        page.get_by_label("Close").click()
        # Wait for it to disappear
        expect(page.get_by_text("Uzasadnienie wyroku: Jarosław K.")).not_to_be_visible()

    except Exception as e:
         print(f"Verdict verification failed: {e}")

    # 4. Verify PHOTO GALLERY (PhotoViewer)
    print("Opening PHOTO gallery...")
    try:
        # Click the button that opens 'janov' gallery. Text is „bazie”
        trigger = page.get_by_role("button", name="„bazie”")
        trigger.click()

        print("Waiting for Photo modal...")
        # Title for janov is "Dokumentacja Nieruchomości: Janov"
        expect(page.get_by_text("Dokumentacja Nieruchomości: Janov")).to_be_visible()

        page.wait_for_timeout(2000)
        page.screenshot(path="verification/photo_mode.png")

    except Exception as e:
         print(f"Photo gallery verification failed: {e}")


    browser.close()

with sync_playwright() as playwright:
    run(playwright)
