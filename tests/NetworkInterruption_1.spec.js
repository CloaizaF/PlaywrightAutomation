const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "loaizafcamilo@gmail.com", userPassword: "testing11%" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakeOrdersPayload = { data: [], message: "No Orders" };
let response = null;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Validate Network Interruption', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client');

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const orderResponse = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeOrdersPayload);
        route.fulfill({ orderResponse, body, });
    });
    await page.locator('button[routerlink*="myorders"]').click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    console.log( await page.locator('.mt-4').textContent());

});
