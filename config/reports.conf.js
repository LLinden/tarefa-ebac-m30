require("dotenv").config();
const allure = require("allure-commandline");
const video = require("wdio-video-reporter");

let reportersConf =
  process.env.REPORT == true
    ? {
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
            const generationTimeout = setTimeout(
              () => reject(reportError),
              5000
            );

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
      }
    : {};
module.exports = { reportersConf };
