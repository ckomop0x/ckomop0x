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
  const hours = !isNaN(parseInt(hoursString, 10)) ? parseInt(hoursString, 10) : 0;
  const minutes = !isNaN(parseInt(minutesString, 10)) ? parseInt(minutesString, 10) : 0;

  const resultText = `<p>Pluralsight activity: ${hours} hours, ${minutes} minutes<p>` || ''

  console.log(resultText)
})();
