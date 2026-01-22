from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/hidden_app/evidence")
    page.screenshot(path="evidence_gallery.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
