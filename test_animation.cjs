const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: 'C:\\\\Users\\\\hiren\\\\.cache\\\\puppeteer\\\\chrome\\\\win64-149.0.7827.22\\\\chrome-win64\\\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log("Navigating to local server...");
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.error("Could not reach dev server. Make sure it's running.");
    process.exit(1);
  }

  console.log("Logging in...");
  await page.type('.input-group input[type="text"]', 'hiren');
  await page.type('.input-group input[type="password"]', 'password');
  await page.click('.login-button');

  console.log("Waiting for Home page and fonts...");
  await page.waitForSelector('#zoom-target', { visible: true, timeout: 5000 });
  // Wait for React to apply measurements and useMotionValue to settle
  await new Promise(r => setTimeout(r, 1000));

  console.log("--- INITIAL STATE ---");
  let containerTransform = await page.$eval('#zoom-container', el => el.style.transform);
  let targetPos = await page.evaluate(() => {
    const t = document.getElementById('zoom-target').getBoundingClientRect();
    return { x: t.left, y: t.top, width: t.width, height: t.height };
  });
  console.log(`zoom-container transform: ${containerTransform}`);
  console.log(`'O' position (relative to viewport):`, targetPos);
  console.log(`Expected center of screen: x=${1920/2}, y=${1080/2}`);

  console.log("\n--- SCROLLING HALFWAY ---");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await new Promise(r => setTimeout(r, 500));

  containerTransform = await page.$eval('#zoom-container', el => el.style.transform);
  console.log(`zoom-container transform: ${containerTransform}`);

  console.log("\n--- SCROLLING FULLY (END OF ANIMATION) ---");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await new Promise(r => setTimeout(r, 500));

  containerTransform = await page.$eval('#zoom-container', el => el.style.transform);
  targetPos = await page.evaluate(() => {
    const t = document.getElementById('zoom-target').getBoundingClientRect();
    return { x: t.left, y: t.top, width: t.width, height: t.height };
  });
  console.log(`zoom-container transform: ${containerTransform}`);
  console.log(`Final 'O' position (relative to viewport):`);
  console.log(targetPos);
  
  const centerX = targetPos.x + targetPos.width / 2;
  const centerY = targetPos.y + targetPos.height / 2;
  console.log(`Center of 'O' is at: x=${centerX}, y=${centerY}`);
  console.log(`Diff from true center: x=${centerX - 1920/2}, y=${centerY - 1080/2}`);

  await browser.close();
})();
