const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Teste de Interface', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();

    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 30000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Deve carregar a página inicial', async () => {
    await driver.get('http://localhost:3000'); // ajuste se sua API/front estiver em outra porta

    const title = await driver.getTitle();

    await driver.wait(until.titleIs(title), 5000);

    expect(title).toBeDefined();
  }, 15000);
});