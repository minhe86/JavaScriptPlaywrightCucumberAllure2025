export default {
  paths: ["features/api/"],
  import: [
    "@babel/register",
    "step-definitions/api/support/support.js",
    "step-definitions/api/*.step.js",
  ],
  requireModule: ["allure-cucumberjs"],
  format: ["summary", "progress-bar", ["html", "cucumber-report.html"]],
  formatOptions: {
    snippetInterface: "async-await",
  },
  // format: ["allure-cucumberjs/reporter"],
  // formatOptions: {
  //   snippetInterface: "async-await",
  //   resultsDir: "allure-results",
  // },
  dryRun: false,
  retry: 2,
};
