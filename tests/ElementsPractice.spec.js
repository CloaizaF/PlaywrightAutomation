const { test, expect } = require('@playwright/test');

//test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });

test('@Web Elements Validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto('http://google.com/');
    //await page.goBack();
    //await page.goForward();

    // Pop Up Validation
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    // Mouse Hover Validation
    await page.locator('#mousehover').hover();

    // Frame Validation
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
    const textCheck = await framesPage.locator('.text h2').textContent();
    console.log(textCheck.split(' ')[1].trim());

});

test('Screenshot Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
});

test('Visual Comparison Test', async ({ page }) => {
    await page.goto('https://google.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
