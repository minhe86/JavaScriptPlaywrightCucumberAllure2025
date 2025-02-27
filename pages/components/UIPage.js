import Component from "./Component.js";
import nconf from 'nconf';

export default class UIPage extends Component {
  constructor(page) {
    super();
    this.page = page;
  }

  baseUrl = nconf.get('swagLabsBaseUrl');

  waitForDisplayed = async () => {};

  openUrl = async () => {
    await this.page.goto(this.baseUrl);
  };

}
