from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Dostęp Zastrzeżony", timeout=5000)
        page.fill("input[type=password]", "szaman")
        page.click("button:has-text('Odblokuj Dostęp')")
        page.wait_for_selector("text=Eliksir Wiedźmina", timeout=5000)
        page.screenshot(path="verification_elixir.png")
        browser.close()

if __name__ == "__main__":
    verify_homepage()
