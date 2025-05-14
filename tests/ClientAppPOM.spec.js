const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');

test('Client App Validation', async ({ page }) => {
    const username = "loaizafcamilo@gmail.com";
    const password = "testing11%";
    const productName = 'ZARA COAT 3';
    const poManager = new POManager(page);
    await page.goto('https://rahulshettyacademy.com/client');
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
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

