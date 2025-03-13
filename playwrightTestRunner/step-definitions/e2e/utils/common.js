import _ from "lodash";
import UIPage from "../../../../pages/components/UIPage.js"
import LoginPage from "../../../../pages/Login.js";
import * as Pages from "../../../../pages/index.js";

export async function launchAppUrl(page) {
    if (!page) {
        throw new Error("Playwright page is not initialized");
      }
      const e2ePage = await UIPage.create(page);
      await e2ePage.openUrl();
      await LoginPage.create(page);
}

export async function beDirectedToPage(page, pageName) {
      const pageKey = _.upperFirst(_.camelCase(pageName));
      await Pages[pageKey].create(page);
}


