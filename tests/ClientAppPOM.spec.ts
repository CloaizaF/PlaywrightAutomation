import { test, expect } from '@playwright/test';
import { customTest } from '../utils-ts/test-base';
import { POManager } from '../page-objects-ts/POManager';
const testData = JSON.parse(JSON.stringify(require('../../utils-ts/placeorderTestData.json')));

for (const data of testData) {
    test(`@Web Client App Validation for ${data.productName}`, async ({ page }) => {
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
        const orderId: any = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        const currentOrderId: any = await ordersHistoryPage.getOrderId();
        expect(orderId.includes(currentOrderId)).toBeTruthy();
    });
}

customTest.only("Client App Validation", async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    await page.goto('https://rahulshettyacademy.com/client');
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId: any = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});