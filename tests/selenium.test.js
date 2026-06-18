const { Builder, By, until } = require('selenium-webdriver'); // <-- Importado 'until' para a espera
const chrome = require('selenium-webdriver/chrome');

describe('Teste de Interface', () => {
  let driver;

  beforeAll(async () => {
    let options = new chrome.Options();
    options.addArguments('--headless=new'); 
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 60000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Deve carregar a página inicial', async () => {
    await driver.get('http://127.0.0.1:3001/selenium-front/pagina.html');

    // === MODIFICADO: Espera até 10 segundos para o elemento com ID 'titulo' aparecer na tela ===
    const tituloElement = await driver.wait(
      until.elementLocated(By.id('titulo')),
      10000,
      'O elemento com id "titulo" não foi encontrado a tempo na página.'
    );

    // Garante que o texto está correto
    expect(await tituloElement.getText()).toBe('Loja API');
  }, 60000);
});
