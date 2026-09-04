const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: 'C:\\\\Users\\\\hiren\\\\.cache\\\\puppeteer\\\\chrome\\\\win64-149.0.7827.22\\\\chrome-win64\\\\chrome.exe'
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to app...');
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });

  // Inject token to bypass login
  await page.evaluate(() => {
    localStorage.setItem('token', 'dummy_token_to_bypass_login');
  });
  
  // Reload to trigger logged-in state
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });

  // Wait a moment for the variable font to load and animation to compute
  await new Promise(r => setTimeout(r, 1000));

  console.log('Taking screenshot at scroll 0...');
  await page.screenshot({ path: 'C:\\\\Users\\\\hiren\\\\.gemini\\\\antigravity\\\\brain\\\\1ab33d0f-b226-4c39-8720-73a165418315\\\\scratch\\\\scroll_0.png' });

  console.log('Scrolling down to 800px...');
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:\\\\Users\\\\hiren\\\\.gemini\\\\antigravity\\\\brain\\\\1ab33d0f-b226-4c39-8720-73a165418315\\\\scratch\\\\scroll_1.png' });

  console.log('Scrolling down to 1800px...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:\\\\Users\\\\hiren\\\\.gemini\\\\antigravity\\\\brain\\\\1ab33d0f-b226-4c39-8720-73a165418315\\\\scratch\\\\scroll_2.png' });

  console.log('Scrolling down to 3000px...');
  await page.evaluate(() => window.scrollTo(0, 3000));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:\\\\Users\\\\hiren\\\\.gemini\\\\antigravity\\\\brain\\\\1ab33d0f-b226-4c39-8720-73a165418315\\\\scratch\\\\scroll_3.png' });

  console.log('Scrolling down to 4000px (deep inside the O)...');
  await page.evaluate(() => window.scrollTo(0, 4000));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:\\\\Users\\\\hiren\\\\.gemini\\\\antigravity\\\\brain\\\\1ab33d0f-b226-4c39-8720-73a165418315\\\\scratch\\\\scroll_4.png' });

  await browser.close();
  console.log('Done!');
})();
