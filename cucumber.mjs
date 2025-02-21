export default {
  paths: ["features/"],
  import: [
    "@babel/register",
    "step-definitions/support/world.js",
    "step-definitions/support/support.js",
    "step-definitions/*.step.js",
  ],
  requireModule: ["allure-cucumberjs"],
  // allure reporter config for cucumberJS pls refer to https://github.com/allure-framework/allure-js/tree/main/packages/allure-cucumberjs
  format: ["allure-cucumberjs/reporter"],
  formatOptions: {
    snippetInterface: "async-await",
    resultsDir: "allure-results",
  },
  dryRun: false,
  parallel: 2,
  tags: process.env.TEST_TAGS || "@ui or @api or @gql",
};
