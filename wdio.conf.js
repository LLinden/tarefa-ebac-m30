const { join } = require("path");
const allure = require("allure-commandline");
const video = require("wdio-video-reporter");

exports.config = {
  hostname: "localhost",
  port: 4723,
  path: "/wd/hub",
  services: ['appium'],
  specs: ["./test/specs/**/login.spec.js"],
  framework: "mocha",
  capabilities: [
    {
      "appium:platformName": "Android",
      "appium:platformVersion": "9.0",
      "appium:deviceName": "Pixel 2 API 28",
      "appium:automationName": "UiAutomator2",
      "appium:app": join(process.cwd(), "./app/android/loja-ebac.apk"),
      "appium:appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity",
      "appium:adbExecTimeout": 40000,
    },
  ],
  waitforTimeout: 100000,
  mochaOpts: {
    timeout: 100000,
  },

  // relatório de execução
  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],

    // vídeo da execução
    [
      video,
      {
        saveAllVideos: false, // se verdadeiro, salva também os casos de teste de sucesso
        videoSlowdownMultiplier: 3, // quanto maior o valor, mais lentos os vídeos [valores 1-100]
      },
    ],
  ],

  // configs do allure reporter
  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure(["generate", "allure-results", "--clean"]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
        resolve();
      });
    });
  },
  afterStep: async function (
    step,
    scenario,
    { error, duration, passed },
    context
  ) {
    if (error) {
      await driver.takeScreenshot();
    }
  },
};
