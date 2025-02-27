import { BeforeAll, Before, After, AfterStep } from "@cucumber/cucumber";
import playwright from "playwright";
import { ContentType } from "allure-js-commons";
import _ from 'lodash';
import nconf from 'nconf';

// Load the config file before all tests
BeforeAll(async function () {
  nconf
      .env({
        transform: ({ key, value }) => {
          if (_.includes(['true', 'false'], value)) value = JSON.parse(value);
          return { key, value };
        },
      })
      .argv()
      .file('default', './configs/config.default.json');
});

Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: nconf.get("headless") });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

AfterStep(async function (step ) {
  if (step.result.status !== "PASSED") {
    try {
      await this.attach(`FAILED Step: ${step.pickleStep.text}`, ContentType.TEXT);
      const screenshot = await this.page.screenshot();
      await this.attach(screenshot, ContentType.PNG);
    } catch (error) {
      console.error(
        "Failed to capture screenshot or attach step details:",
        error
      );
    }
  }
});
