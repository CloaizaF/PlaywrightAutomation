const { test, expect } = require('@playwright/test');

let webContext = null;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "loaizafcamilo@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('testing11%');
    await page.locator('[value="Login"]').click();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Client App Validation', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const productsCount = await products.count();
    for (let i = 0; i < productsCount; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div[class="cart"] ul li').first().waitFor();
    const isProductVisible = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(isProductVisible).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially("ind");
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === ' India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
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

test('Verify Titles', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
});