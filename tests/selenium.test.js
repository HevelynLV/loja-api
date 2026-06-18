const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); // <-- 1. Adicionado para configurar o Chrome

describe('Teste de Interface', () => {
  let driver;

  beforeAll(async () => {
    // 2. Configura o Chrome para rodar em modo oculto (Headless) no GitHub Actions
    let options = new chrome.Options();
    options.addArguments('--headless=new'); 
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options) // <-- 3. Passa as configurações para o navegador
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