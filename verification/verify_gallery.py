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

    # 3. Verify VERDICT (Vertical Scroll)
    print("Opening VERDICT gallery (Vertical Mode)...")
    try:
        trigger = page.get_by_role("button", name="30 T 5/2021")
        trigger.click()
        print("Waiting for Verdict modal...")
        expect(page.get_by_text("Uzasadnienie wyroku: Jarosław K.")).to_be_visible()
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/verdict_vertical_mode.png")

        # Verify it has vertical scroll structure (not Flipbook)
        # Look for the footer "KONIEC DOKUMENTU" which is specific to VerticalGalleryViewer
        expect(page.get_by_text("— KONIEC DOKUMENTU —")).to_be_visible()

        # Close modal
        page.get_by_label("Close gallery").click()
        expect(page.get_by_text("Uzasadnienie wyroku: Jarosław K.")).not_to_be_visible()

    except Exception as e:
         print(f"Verdict verification failed: {e}")

    # 4. Verify PHOTO GALLERY (PhotoViewer) via NEW NYDEK TRIGGER
    print("Opening PHOTO gallery via Nydek trigger...")
    try:
        # Locate the new trigger in text: "w miejscowości Nýdek"
        # We look for the button with text "Nýdek"
        trigger = page.get_by_role("button", name="Nýdek").first
        trigger.click()

        print("Waiting for Photo modal...")
        # Title for nydek is "Posiadłość w Nýdku (Archiwum)"
        expect(page.get_by_text("Posiadłość w Nýdku (Archiwum)")).to_be_visible()

        page.wait_for_timeout(2000)
        page.screenshot(path="verification/photo_mode_nydek.png")

        # Verify it is PhotoViewer (arrows)
        # Check for fullscreen button
        expect(page.get_by_label("Enter fullscreen")).to_be_visible()

    except Exception as e:
         print(f"Photo gallery verification failed: {e}")


    browser.close()

with sync_playwright() as playwright:
    run(playwright)
