const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../page-objects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    await this.page.goto('https://rahulshettyacademy.com/client');
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.validLogin(username, password);
});

When('add product {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is added to Cart', async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
});

Then('verify order is present in the order history', async function () {
    await this.dashboardPage.navigateToOrders();
    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (usernameToEnter, passwordToEnter) {
    const username = this.page.locator('#username');
    const signInBtn = this.page.locator('#signInBtn');
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await username.type(usernameToEnter);
    await this.page.locator('#password').type(passwordToEnter);
    await signInBtn.click();
});

Then('verify error message {string} is displayed', async function (errorMessage) {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText(errorMessage);
});