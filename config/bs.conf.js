require("dotenv").config();

const { generalConf } = require("./general.conf");

let capabilities =
  process.env.PLATFORM === "android"
    ? {
        capabilities: [
          {
            platformName: "Android",
            project: "Meu primeiro projeto em Device Farm",
            build: "browserstack-build-1",
            name: "teste_ebac_shop",
            device: "Samsung Galaxy S22 Ultra",
            os_version: "12.0",
            app:
              process.env.BROWSERSTACK_APP_ID ||
              // preencher com browserstacl app id
              "",
            "browserstack.local": false,
          },
        ],
      }
    : {
        capabilities: [
          {
            app: `${process.env.IOS_APP_ID}`,
            project: "Meu primeiro projeto Appium iOS BS",
            build: "EBAC Test iOS",
            name: "ebac_test",
            deviceName: "iPhone 14 Pro Max",
            platformVersion: "16",
            platformName: "ios",
            "browserstack.debug": true,
          },
        ],
      };

let bsConf = {
  ...generalConf,
  ...capabilities,
  user: process.env.BS_USER,
  key: process.env.BS_KEY,
  services: ["browserstack"],
};

module.exports = { bsConf };
