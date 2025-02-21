import _ from "lodash";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { ContentType } from "allure-js-commons";
import UIPage from "../pages/components/UIPage.js";
import SideNavigationMenu from "../pages/components/SideNavigationMenu.js";
import LoginPage from "../pages/Login.js";
import HomePage from "../pages/Home.js";
import * as Pages from "../pages/index.js";
import { getProducts } from "../data/utils.js";

setDefaultTimeout(60 * 1000);

Given("User launches SwagLabs application", async function () {
  if (!this.page) {
    throw new Error("this.page is not initialized");
  }
  const e2ePage = await UIPage.create(this.page);
  await e2ePage.openUrl();
  await LoginPage.create(this.page);
});

Then("User is directed to {string} page", async function (pageName) {
  const pageKey = _.upperFirst(_.camelCase(pageName));
  await Pages[pageKey].create(this.page);
});

When(
  "User logs in the app using username {string} and password {string}",
  async function (username, password) {
    const loginPage = await LoginPage.create(this.page);
    await loginPage.loginApplication(username, password);
  }
);

When("User verifies the product name {string}", async function (productName) {
  const homePage = await HomePage.create(this.page);
  await homePage.verifyProductName1(productName);
});

When(
  "User verifies the product details of product {int} on Home page",
  async function (productNum) {
    const filePath = "data/products.csv";
    const products = await getProducts(filePath);
    const selectedProduct = _.find(products, { productNo: productNum });
    await this.attach(
      `Test Data: ${JSON.stringify(selectedProduct, null, 2)}`,
      ContentType.TEXT
    );

    const homePage = await HomePage.create(this.page);
    await homePage.verifyProductDetails(selectedProduct);
  }
);

When("User verifies all products details on Home page", async function () {
  const filePath = "data/products.csv";
  const products = await getProducts(filePath);
  await this.attach(
    `Test Data: ${JSON.stringify(products, null, 2)}`,
    ContentType.TEXT
  );

  const homePage = await HomePage.create(this.page);
  await homePage.verifyProductsDetails(products);
});

When("User logs out", async function () {
  const homePage = await HomePage.create(this.page);
  await homePage.navigateToSideMenu();

  const sideNavigationMenu = await SideNavigationMenu.create(this.page);
  await sideNavigationMenu.logout();
});
