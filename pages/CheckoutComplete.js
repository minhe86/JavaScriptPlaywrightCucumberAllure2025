import UIPage from "./components/UIPage.js";
import { expect } from "@playwright/test";

export default class CheckoutCompletePage extends UIPage {
  constructor(page) {
    super();
    this.page = page;
  }

  backHomeButton = "[data-test='back-to-products']";

  waitForDisplayed = async () => {
    await this.page.locator(this.backHomeButton).waitFor();
  };

  clickBackHome = async () => {
    expect(await this.page.locator(this.backHomeButton).isEnabled()).toBeTruthy();
    await this.page.locator(this.backHomeButton).click();
  };
}
