export default {
  paths: ["features/e2e/"],
  import: [
    "@babel/register",
    "step-definitions/e2e/support/world.js",
    "step-definitions/e2e/support/support.js",
    "step-definitions/e2e/*.step.js",
  ],
  requireModule: ["allure-cucumberjs"],
  format: ["summary", "progress-bar", ["html", "cucumber-report.html"]],
  formatOptions: {
    snippetInterface: "async-await",
  },
  dryRun: false,
};
