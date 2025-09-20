import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixtures";
import * as testData from "../test-data/login.json";
import { LoginPage } from "../pages/loginPage";
import { CommonPage } from "../pages/commonPage";

Then("User should {string}", async function (expectedResult: string) {
  const loginPage = new LoginPage(pageFixture.page);
  const commonPage = new CommonPage(pageFixture.page);
  //await loginPage.waitForErrorMessage();
  //await expect(loginPage.errorMessage).toContainText(data.errorMessage)
  if (expectedResult === "see the list of products") {
    await commonPage.verifyProductsPageVisible();
  } else if (expectedResult.includes("see error message")) {
    await loginPage.waitForErrorMessage();
  }
});
