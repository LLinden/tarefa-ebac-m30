const homeScreen = require("../screens/home.screen");
const loginScreen = require("../screens/login.screen");
const myStoreScreen = require("../screens/myStore.screen");

let usuario = "gerente";
let senha = "GD*peToHNJ1#c$sgk08EaYJQ";
let urlLoja = "http://lojaebac.ebaconline.art.br/";

describe("Acessar painel de admin", () => {
  it("deve logar com credenciais válidas", async () => {
    await homeScreen.skipScreen();
    await homeScreen.goToLogin();
    await loginScreen.setStoreAddress(urlLoja);
    await loginScreen.clickContinue();
    //await loginScreen.clickCredentials();
    await loginScreen.login(usuario, senha);
    await loginScreen.gotwoFactorPasswordButton();
    await loginScreen.twoFactorLogin(senha);

    expect(await myStoreScreen.getStoreLogo()).toBeTruthy();
    expect(await myStoreScreen.getStoreName()).toEqual("EBAC - Shop");
  });
});
