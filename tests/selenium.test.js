const { Builder, By } = require('selenium-webdriver');

describe('Teste de Interface', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  }, 30000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Deve carregar a página inicial', async () => {
    await driver.get('http://127.0.0.1:3001/selenium-front/pagina.html');

    const titulo = await driver.findElement(By.id('titulo'));

    expect(await titulo.getText()).toBe('Loja API');
  }, 30000);
});