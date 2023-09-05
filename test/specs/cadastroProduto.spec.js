const homeScreen = require("../screens/home.screen");
const loginScreen = require("../screens/login.screen");
const myStoreScreen = require("../screens/myStore.screen");
const priceScreen = require("../screens/price.screen");
const productScreen = require("../screens/product.screen");

let usuario = "";
let senha = "";
let urlLoja = "";
let nomeProduto = `Teste ${Math.floor(Math.random() * 100000000)}`;
let descricao = "Teste";
let precoNormal = 20;
let precoVenda = 10;
let sku = 123;

describe("Cadastro de produto", () => {
  it("deve cadastrar produto com sucesso", async () => {
    await homeScreen.skipScreen();
    await homeScreen.goToLogin();
    await loginScreen.setStoreAddress(urlLoja);
    await loginScreen.clickContinue();
    await loginScreen.clickCredentials();
    await loginScreen.login(usuario, senha);
    await loginScreen.gotwoFactorPasswordButton();
    await loginScreen.twoFactorLogin(senha);
    await myStoreScreen.clickProductScreen();
    await productScreen.clickAddProduct();
    await productScreen.clickAddSimpleProduct();
    await productScreen.fillProductName(nomeProduto);
    await productScreen.fillProductDescription(descricao);
    await productScreen.clickBack();
    await productScreen.clickAddPrice();
    await priceScreen.fillRegularPrice(precoNormal);
    await priceScreen.fillSalePrice(precoVenda);
    await productScreen.clickBack();
    await productScreen.clickInventory();
    await productScreen.fillSku(sku);
    await productScreen.clickBack();

    expect(await productScreen.displayMyProduct()).toBeTruthy();
    expect(await productScreen.getProductName()).toEqual("Teste");
  });
});
