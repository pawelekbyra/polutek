from playwright.sync_api import sync_playwright, expect
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport to match the app's design context (Phone Emulator)
        context = browser.new_context(
            viewport={'width': 414, 'height': 896},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()

        try:
            print("Navigating to home...")
            # Use 127.0.0.1 as per memory instructions
            page.goto("http://127.0.0.1:3000")

            # Handle Preloader / Language Selection
            # Wait for language buttons or preloader to disappear if previously set
            # If strictly first load, we see language selection.
            # Try to click 'Polski' if it exists
            try:
                print("Checking for language selection...")
                # Assuming "Polski" is a button or text
                lang_btn = page.get_by_text("Polski").first
                if lang_btn.is_visible(timeout=5000):
                    lang_btn.click(force=True)
                    print("Selected Language: Polski")
                    # Wait for preloader to fade
                    page.wait_for_timeout(2000)
            except Exception as e:
                print("Language selection skipped or not found:", e)

            # --- VERIFY SIDEBAR AVATAR BORDER ---
            print("Verifying Sidebar Avatar...")
            # Wait for sidebar to load
            sidebar = page.locator("aside")
            expect(sidebar).to_be_visible(timeout=10000)

            # Find the avatar button/image container.
            # It usually has class `border-pink-500` now.
            # We can verify the CSS class presence.
            avatar_container = sidebar.locator("button").first
            # Take screenshot of sidebar
            page.screenshot(path="/home/jules/verification/sidebar_avatar.png")
            print("Sidebar screenshot taken.")

            # --- VERIFY TIPPING MODAL ---
            print("Opening Tipping Modal...")
            # Click the "Napiwek" button in sidebar (last button typically)
            tip_btn = sidebar.locator("button:has-text('Napiwek')")
            if not tip_btn.is_visible():
                # Fallback selector based on SVG or data-action
                tip_btn = page.locator("[data-action='show-tip-jar']")

            tip_btn.click()

            # Wait for modal
            modal = page.locator("text=Bramka Napiwkowa")
            expect(modal).to_be_visible()

            # Go to Step 1 (Odbiorca) -> Step 2 (Dane - skip if logged out? No, Step 1 is "Recipient")
            # Step 0: Recipient
            # Click 'Pawłowi'
            page.click("text=Pawłowi Polutkowi")
            # Click Enter/Next
            # The button is "ENTER" now (or "DALEJ" before?)
            # Wait for navigation button
            next_btn = page.locator("button:has-text('ENTER')")
            next_btn.click()

            # Step 1: Create Account (if not logged in)
            # Just click Next/Enter again to skip
            time.sleep(1) # transition
            next_btn.click()

            # Step 2: Amount & Terms
            # Try to click Next WITHOUT accepting terms to trigger validation
            time.sleep(1)
            next_btn.click()

            # Verify Validation Message is visible
            # It should be "Musisz zaakceptować Regulamin..."
            error_msg = page.locator("text=Musisz zaakceptować Regulamin")
            expect(error_msg).to_be_visible()

            # Take screenshot of Tipping Modal with Error
            page.screenshot(path="/home/jules/verification/tipping_validation.png", full_page=False)
            print("Tipping Modal validation screenshot taken.")

            # Verify Error placement: Should be below buttons?
            # We can check bounding boxes roughly.
            btn_box = next_btn.bounding_box()
            err_box = error_msg.bounding_box()

            if btn_box and err_box:
                if err_box['y'] > btn_box['y']:
                    print("SUCCESS: Error message is below the button.")
                else:
                    print(f"WARNING: Error message might be above button. Button Y: {btn_box['y']}, Error Y: {err_box['y']}")

            # Close Tipping Modal
            page.locator("button >> .lucide-x").first.click()

            # --- VERIFY AUTHOR PROFILE ---
            # Click Author Avatar in sidebar
            avatar_container.click()

            # Wait for Author Profile
            author_modal = page.locator("text=Jesteś Patronem").or_(page.locator("text=Zostań Patronem"))
            expect(author_modal).to_be_visible(timeout=5000)

            # Take screenshot
            page.screenshot(path="/home/jules/verification/author_profile.png")
            print("Author Profile screenshot taken.")

        except Exception as e:
            print(f"Test failed: {e}")
            page.screenshot(path="/home/jules/verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
