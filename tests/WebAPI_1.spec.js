const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "loaizafcamilo@gmail.com", userPassword: "testing11%" };
let token = null;
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let orderId = null;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });

    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];

});

test('Client App Validation with Injected Token', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');
    for (let i = 0; i < await rows.count(); i++) {
        const orderIdText = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(orderIdText)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
