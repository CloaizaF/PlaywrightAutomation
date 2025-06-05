const playwright = require('@playwright/test');
const { POManager } = require('../../page-objects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function () {
    console.log("Test execution completed");
});

BeforeStep(function () { });

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screentshot1.png' });
    }
});