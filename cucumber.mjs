export default {
  paths: ["features/"],
  import: ["@babel/register", "step-definitions/*.step.js"],
  formatOptions: {
    snippetInterface: "async-await",
  },
  dryRun: false,
  // allure reporter config for cucumberJS pls refer to https://github.com/allure-framework/allure-js/tree/main/packages/allure-cucumberjs
  format: ["allure-cucumberjs/reporter"],
  formatOptions: {
    resultsDir: "allure-results",
  },
  parallel: 2,
  tags: process.env.TEST_TAGS || "@ui or @api or @gql",
};
