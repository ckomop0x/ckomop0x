const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://app.pluralsight.com/profile/ckomop0x', {
    waitUntil: 'networkidle2',
  });
  await page.waitForSelector('#profileBody')
  const element = await page.$('#profileBody h4')
  const value = await page.evaluate(el => el.textContent, element)
  const [hoursString, minutesString] = value.split('h')
  await browser.close();

  const resultText = `<p><b>Pluralsight activity: ${parseInt(hoursString, 10)} hours, ${parseInt(minutesString)} minutes</b><p>` || ''

  console.log(resultText)
})();
