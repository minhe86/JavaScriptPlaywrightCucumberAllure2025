import UIPage from "./components/UIPage.js";
import { expect } from "@playwright/test";

export default class LoginPage extends UIPage {
  constructor(page) {
    super();
    this.page = page;
  }

  username = "input#user-name";
  password = "input#password";
  loginButton = "input#login-button";
  errorMessageForUsrPw = "Epic sadface: Username and password do not match any user in this service";
  errorMessageForLockedUsr = "Epic sadface: Sorry, this user has been locked out."

  waitForDisplayed = async () => {
    await this.page.locator(this.username).waitFor();
    await this.page.locator(this.password).waitFor();
    await this.page.locator(this.loginButton).waitFor();
  };

  loginApplication = async (user, passwd) => {
    await this.page.locator(this.username).fill(user);
    await this.page.locator(this.password).fill(passwd);
    await this.page.click(this.loginButton);
  };

  verifyLoginErrorMessage = async (user, passwd) => {
    if (user === "locked_out_user" && passwd === "secret_sauce") {
      expect(await this.page.locator("div.error-message-container").innerText()).toContain(this.errorMessageForLockedUsr);
    }
    else {
      expect(await this.page.locator("div.error-message-container").innerText()).toContain(this.errorMessageForUsrPw);
    }
  }

  verifyPageDetails = async () => {
    expect(await this.page.url()).toContain("www.saucedemo.com");
    expect(await this.page.title()).toContain("Swag Labs");

    expect(await this.page.isEditable(this.username)).toBeTruthy();
    expect(await this.page.isEditable(this.password)).toBeTruthy();
    if (!(await this.page.isEditable(this.loginButton))) {
      throw new Error("Login button is not editable");
    }
  };
}
