require("dotenv").config();

const { join } = require("path");
const { generalConf } = require("./general.conf");

let capabilities =
  process.env.PLATFORM === "android"
    ? {
        capabilities: [
          {
            "appium:platformName": "Android",
            "appium:platformVersion": "9.0",
            "appium:deviceName": "Pixel 2 API 28",
            "appium:automationName": "UiAutomator2",
            "appium:app": join(process.cwd(), "./app/android/loja-ebac.apk"),
            "appium:appWaitActivity":
              "com.woocommerce.android.ui.login.LoginActivity",
            "appium:adbExecTimeout": 40000,
          },
        ],
      }
    : {
        capabilities: [
          {
            platformName: "iOS",
            "appium:deviceName": "iPhone 14 Pro Max",
            "appium:platformVersion": "16.0",
            "appium:orientation": "PORTRAIT",
            "appium:automationName": "XCUITest",
            "appium:app":
              "/Users/lucasboes/Documents/exercicio-m29/testes-mobile-ebac-shop/app/ios/loja-ebac.app",
            "appium:wdaStartupRetries": "4",
            "appium:iosInstallPause": "8000",
            "appium:wdaStartupRetryInterval": "20000",
          },
        ],
      };

let localConf = {
  ...generalConf,
  ...capabilities,
  hostname: "localhost",
  port: 4723,
  services: ["appium"],
};

module.exports = { localConf };
