import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixtures";
import * as testData from "../test-data/product.json";
import { ProductPage } from "../pages/productPage";

Then("User sorts products by {string}", async function (dataKey: string) {
  const productPage = new ProductPage(pageFixture.page);
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  productPage.sortProductsByPrice(data.optionValue);
});

Then(
  "The products should be displayed in ascending order of price",
  async function () {
    const productPage = new ProductPage(pageFixture.page);
    await productPage.verifyPricesAreSortedAscending();
  },
);
