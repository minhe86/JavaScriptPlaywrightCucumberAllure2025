import _ from 'lodash';
import { Given, When, Then, Before, After, setDefaultTimeout, BeforeStep, AfterStep } from '@cucumber/cucumber';
import { chromium} from '@playwright/test';
import UIPage from '../pages/components/UIPage.js';
import SideNavigationMenu from '../pages/components/SideNavigationMenu.js';
import LoginPage from '../pages/Login.js';
import HomePage from '../pages/Home.js';
import * as Pages from '../pages/index.js';
import { getProducts } from '../data/utils.js';

setDefaultTimeout(60 * 1000);
let page, browser;

Before(async () =>{
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

Given('User launches SwagLabs application', async () => {
  const e2ePage = await UIPage.create(page);
  await e2ePage.openUrl();
  await LoginPage.create(page);
});

Then('User is directed to {string} page', async (pageName) => {
  const pageKey = _.upperFirst(_.camelCase(pageName));
    await Pages[pageKey].create(page);
});

When('User logs in the app using username {string} and password {string}', async (username, password) => {
  const loginPage = await LoginPage.create(page);
  await loginPage.loginApplication(username, password);
});

When('User verifies the product name {string}', async (productName) => {
  const homePage = await HomePage.create(page);
  await homePage.verifyProductName1(productName);
});

When('User verifies the product details of product {int} on Home page', async (productNum) => {
  const filePath = 'data/products.csv';
  const products = await getProducts(filePath);
  const selectedProduct = _.find(products, { productNo: productNum });

  const homePage = await HomePage.create(page);
  await homePage.verifyProductDetails(selectedProduct);
});

When('User verifies all products details on Home page', async () => {
  const filePath = 'data/products.csv';
  const products = await getProducts(filePath);

  const homePage = await HomePage.create(page);
  await homePage.verifyProductsDetails(products);
});

When('User logs out', async () => {
  const homePage = await HomePage.create(page);
  await homePage.navigateToSideMenu();

  const sideNavigationMenu = await SideNavigationMenu.create(page);
  await sideNavigationMenu.logout();
});