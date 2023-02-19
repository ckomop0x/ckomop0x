const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // console.log('Browser ready')
  const page = await browser.newPage();
  // console.log('Browser page created')
  await page.goto('https://app.pluralsight.com/profile/ckomop0x');
  // console.log('PS page loaded')
  await page.waitForLoadState( 'domcontentloaded', {timeout: 60000})
  // console.log('Network is idle')
  await page.waitForSelector('#profileBody', {timeout: 30000})
  // console.log('Selector #profileBody is found')
  await page.waitForSelector('#profileBody h4', {timeout: 30000})
  // console.log('Selector #profileBody h4 is found')
  const element = await page.$('#profileBody h4')
  // console.log('Selector #profileBody is found')
  const value = await page.evaluate(el => el.textContent, element)
  const [hoursString, minutesString] = value.split('h')
  await browser.close();
  const hours = !isNaN(parseInt(hoursString, 10)) ? parseInt(hoursString, 10) : 0;
  const minutes = !isNaN(parseInt(minutesString, 10)) ? parseInt(minutesString, 10) : 0;

  const resultText = `<p>Pluralsight activity: ${hours} hours, ${minutes} minutes<p>` || ''

  console.log(resultText)
})();
