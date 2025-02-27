import UIPage from "./components/UIPage.js";
import { expect } from "@playwright/test";

export default class CheckoutCartPage extends UIPage {
  constructor(page) {
    super();
    this.page = page;
  }

  continueShoppingButton = "[data-test='continue-shopping']";
  checkoutButton = "[data-test='checkout']";

  getProductName = (productNo) => {
    return `a#item_${productNo}_title_link`;
  };

  getProductInverntoryLocators = async (productNo) => {
    const selectedInventoryLocator = this.page
      .locator("div.cart_item")
      .filter({ has: this.page.locator(this.getProductName(productNo)) });
    return {
      productName: this.page.locator(this.getProductName(productNo)),
      productDescription: selectedInventoryLocator.locator(
        "div.inventory_item_desc"
      ),
      productPrice: selectedInventoryLocator.locator(
        "div.inventory_item_price"
      ),
      productAddRemoveButton: selectedInventoryLocator.locator("button"),
    };
  };

  waitForDisplayed = async () => {
    await this.page.locator(this.continueShoppingButton).waitFor();
    await this.page.locator(this.checkoutButton).waitFor();
  };

  verifyCheckoutProductDetails = async (product) => {
    const productLocators = await this.getProductInverntoryLocators(
      product.productNo
    );

    expect(await productLocators.productName.textContent()).toBe(
      product.productName
    );
    const expectedPriceFormat = "$" + new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(product.productPrice);
    expect(await productLocators.productPrice.textContent()).toBe(
      expectedPriceFormat
    );
    expect(
      await productLocators.productAddRemoveButton.isEnabled()
    ).toBeTruthy();
    expect(await productLocators.productAddRemoveButton.textContent()).toBe(
      "Remove"
    );
  };

  verifyPageDetails = async (selectedProducts) => {
    expect(await this.page.url()).toContain("cart.html");
    expect(await this.page.title()).toContain("Swag Labs");
    expect(
      await this.page.locator(this.continueShoppingButton).isVisible()
    ).toBeTruthy();
    expect(
      await this.page.locator(this.checkoutButton).isVisible()
    ).toBeTruthy();
    if (selectedProducts.length !== 0) {
      for (const product of selectedProducts) {
        await this.verifyCheckoutProductDetails(product);
      }
    }
  };

  checkout = async () => {
    expect(await this.page.locator(this.checkoutButton).isEnabled()).toBeTruthy();
    await this.page.locator(this.checkoutButton).click();
  };
}
