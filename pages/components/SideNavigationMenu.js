import Component from "./Component.js";

export default class SideNavigationMenu extends Component {
  constructor(page) {
    super();
    this.page = page;
  }

  crossButton = "button#react-burger-cross-btn";
  allItemsLink = "a#inventory_sidebar_link";
  aboutLink = "a#about_sidebar_link";
  logoutLink = "a#logout_sidebar_link";

  waitForDisplayed = async () => {
    await this.page.locator(this.crossButton).waitFor();
    await this.page.locator(this.allItemsLink).waitFor();
    await this.page.locator(this.aboutLink).waitFor();
    await this.page.locator(this.logoutLink).waitFor();
  };

  verifyPageDetails = async () => {
    expect(await this.page.locator(this.crossButton).isVisible()).toBeTruthy();
    expect(await this.page.locator(this.allItemsLink).isVisible()).toBeTruthy();
    expect(await this.page.locator(this.aboutLink).isVisible()).toBeTruthy();
    expect(await this.page.locator(this.aboutLink).getAttribute("href")).toBe(
      "https://saucelabs.com/"
    );
    expect(await this.page.locator(this.logoutLink).isVisible()).toBeTruthy();
  };

  logout = async () => {
    await this.page.locator(this.logoutLink).click();
  };
}
