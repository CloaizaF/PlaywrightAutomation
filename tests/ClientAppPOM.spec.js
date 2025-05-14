const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const testData = JSON.parse(JSON.stringify(require('../tests/utils/placeorderTestData.json')));

for (const data of testData) {
    test(`Client App Validation for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        await page.goto('https://rahulshettyacademy.com/client');
        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}
