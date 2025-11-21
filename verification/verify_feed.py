from playwright.sync_api import sync_playwright, expect

def verify_feed():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 375, 'height': 667}, # iPhone 8 viewport
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        )
        page = context.new_page()

        # Go to the page
        print("Navigating to localhost:3000...")
        page.goto("http://localhost:3000", timeout=60000)

        # Wait for slides to load
        print("Waiting for slides...")
        # The main feed uses embla-carousel, and we have slides with avatars
        try:
            # Wait for at least one slide to be visible.
            # The slide has a profile image.
            page.wait_for_selector('img[alt]', timeout=30000)
            print("Slides found!")
        except Exception as e:
            print(f"Timeout waiting for slides: {e}")
            # Take screenshot anyway to see what's wrong
            page.screenshot(path="verification/error.png")
            browser.close()
            return

        # Wait a bit for layout to settle
        page.wait_for_timeout(2000)

        # Take screenshot of initial state
        page.screenshot(path="verification/feed_initial.png")
        print("Initial screenshot taken.")

        # Simulate a drag (swipe up)
        # Center of screen
        box = page.viewport_size
        start_x = box['width'] / 2
        start_y = box['height'] * 0.8
        end_y = box['height'] * 0.2

        print("Simulating swipe...")
        page.mouse.move(start_x, start_y)
        page.mouse.down()
        page.mouse.move(start_x, end_y, steps=10)
        page.mouse.up()

        # Wait for snap
        page.wait_for_timeout(1000)

        # Take screenshot after swipe
        page.screenshot(path="verification/feed_scrolled.png")
        print("Scrolled screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_feed()
