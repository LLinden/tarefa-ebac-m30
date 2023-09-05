const { join } = require("path");
const allure = require("allure-commandline");
const video = require("wdio-video-reporter");

/* O projeto está configurado para execução no BrowserStack. 
Dados comentados são para execução local.   
*/
exports.config = {
  //hostname: "localhost",
  //port: 4723,
  //path: "/wd/hub",
  // preencher user e key com usuário e senha do browserstack
  user: "",
  key: "",
  //services: ['appium'],
  services: ["browserstack"],
  specs: ["./test/specs/**/*.spec.js"],
  framework: "mocha",
  capabilities: [
    {
      platformName: "Android",
      //platformVersion: "9.0",
      //deviceName: "Pixel 2 API 28",
      //automationName: "UiAutomator2",
      //app: join(process.cwd(), "./app/android/wcandroid-11.0.apk"),
      //appWaitActivity: "com.woocommerce.android.ui.login.LoginActivity",
      //adbExecTimeout: 40000,
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
