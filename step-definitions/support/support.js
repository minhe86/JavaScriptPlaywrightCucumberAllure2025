import { Before, After } from "@cucumber/cucumber";
import playwright from "playwright";

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