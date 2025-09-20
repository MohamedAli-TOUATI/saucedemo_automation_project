import { Given, Then, When } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixtures";
import * as loginData from "../test-data/login.json";
import * as cartData from "../test-data/cart.json";
import * as checkoutData from "../test-data/checkout.json";
import { CommonPage } from "../pages/commonPage";

Given("User navigates to the application", async function () {
  const commonPage = new CommonPage(pageFixture.page);
  commonPage.navigateToApp();
});

When("User login with {string}",{timeout: 10000}, async function (dataKey: string) {
  const data = loginData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  const commonPage = new CommonPage(pageFixture.page);
  await commonPage.userLogin(data.username, data.password);
});

Then("User should see the list of products", async function () {
  const commonPage = new CommonPage(pageFixture.page);
  commonPage.verifyProductsPageVisible();
});

When("User adds {string} to the cart", async function (dataKey: string) {
  const commonPage = new CommonPage(pageFixture.page);
  let testData;
  if (this.featureName === "cart") testData = cartData[dataKey];
  else if (this.featureName === "checkout") testData = checkoutData[dataKey];

  if (!testData) throw new Error(`No data found for key "${dataKey}"`);
  commonPage.addItemToCart(testData.itemName);
});
