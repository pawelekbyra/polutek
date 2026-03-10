const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/');

  // Wait for the specific section to be visible
  await page.waitForSelector('text=Cisza po burzy');

  // Find the bolded names in the specific sentence
  const boldNames = await page.evaluate(() => {
    const p = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('Choć Badowski zaprzestał'));
    if (!p) return [];
    const strongs = Array.from(p.querySelectorAll('strong'));
    return strongs.map(s => s.textContent);
  });
  console.log('Bolded names in section "Cisza po burzy":', boldNames);

  // Check the email in the footer
  const emailFooter = await page.evaluate(() => {
    const footer = document.querySelector('span[class*="wojciech.kurka@protonmail.com"]');
    return footer ? footer.textContent : 'NOT FOUND';
  });
  // Alternative way to check email footer
  const allText = await page.evaluate(() => document.body.innerText);
  const emailExists = allText.includes('wojciech.kurka@protonmail.com');
  console.log('Email exists in footer:', emailExists);

  await page.screenshot({ path: '/home/jules/verification/updated_names_and_email.png', fullPage: true });

  await browser.close();
})();
