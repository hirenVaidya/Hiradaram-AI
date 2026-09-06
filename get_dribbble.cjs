const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://dribbble.com/shots/10761532-Login-Web-Animation', { waitUntil: 'networkidle2' });
    const mediaUrl = await page.evaluate(() => {
      const vid = document.querySelector('video source');
      if (vid) return vid.src;
      const vid2 = document.querySelector('video');
      if (vid2) return vid2.src;
      const img = document.querySelector('img[src*="dribbble.com/users"]');
      return img ? img.src : null;
    });
    console.log('MEDIA_URL:', mediaUrl);
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
