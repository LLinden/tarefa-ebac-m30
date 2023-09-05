const { reportersConf } = require("./reports.conf");
const { specsConf } = require("./specs.conf");

let generalConf = {
  path: "/wd/hub",
  framework: "mocha",
  waitforTimeout: 1000000,
  mochaOpts: {
    timeout: 1000000,
  },
  ...reportersConf,
  ...specsConf,
};
module.exports = { generalConf };
