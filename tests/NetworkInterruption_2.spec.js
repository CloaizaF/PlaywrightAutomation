const { test, expect, request } = require('@playwright/test');

test('Security Test Request Interception', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill("loaizafcamilo@gmail.com");
    await page.locator('#userPassword').fill('testing11%');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route =>
        route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" }));
    await page.locator('button:has-text("View")').first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorized to view this order");
});