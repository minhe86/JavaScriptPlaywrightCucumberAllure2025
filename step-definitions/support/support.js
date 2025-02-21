import { Before, After, AfterStep } from "@cucumber/cucumber";
import playwright from "playwright";
import { ContentType } from "allure-js-commons";

Before(async function () {
  this.browser = await playwright.chromium.launch();
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
