import Component from "./Component.js";

export default class UIPage extends Component {
  constructor(page) {
    super();
    this.page = page;
  }

  baseUrl = "https://www.saucedemo.com/";

  waitForDisplayed = async () => {};

  openUrl = async () => {
    await this.page.goto(this.baseUrl);
  };

}
