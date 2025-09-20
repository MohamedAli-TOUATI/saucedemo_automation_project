import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  pageFixture.page = page;
});
Before(function ({ pickle }) {
  // Récupère le nom du fichier feature courant
  const featureFile = pickle.uri; // ex: src/features/cart.feature
  this.featureName = path.basename(featureFile, ".feature"); // "cart"
});

/*After(async function (){
    await pageFixture.page.close()
    await browser.close()
})*/
