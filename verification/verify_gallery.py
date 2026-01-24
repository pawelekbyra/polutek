from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # 1. Go to home page
    try:
        page.goto("http://localhost:3000", timeout=60000)
    except Exception as e:
        print(f"Error navigating to page: {e}")
        return

    # 2. Handle Password Protection
    # Look for password input
    try:
        password_input = page.get_by_placeholder("Wprowadź hasło...")
        if password_input.count() > 0:
            print("Password protection found. Entering password...")
            password_input.fill("ichtroje")
            page.get_by_role("button", name="Odblokuj Dostęp").click()
            # Wait for content to load
            expect(page.get_by_text("Dwa światy Wiedźmina")).to_be_visible(timeout=10000)
    except Exception as e:
        print(f"Password handling error: {e}")

    # 3. Open a Gallery
    # Click on '30 T 5/2021' which opens 'wyrok_kordys'
    print("Opening gallery...")
    try:
        trigger = page.get_by_role("button", name="30 T 5/2021")
        trigger.click()
    except Exception as e:
         print(f"Failed to find or click trigger: {e}")
         # Try another one
         page.get_by_role("button", name="„bazie”").click()


    # 4. Verify Gallery Modal
    # The modal title for 'wyrok_kordys' is "Uzasadnienie wyroku: Jarosław K."
    print("Waiting for modal...")
    expect(page.get_by_text("Uzasadnienie wyroku: Jarosław K.")).to_be_visible()

    # Wait a bit for images to load (optional, but good for screenshot)
    page.wait_for_timeout(2000)

    # 5. Take Screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/gallery_modal.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
