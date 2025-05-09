const { test, expect } = require('@playwright/test');

test.only('Broswer Context Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css', (route) => { route.abort(); });
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const username = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const cardTitle = page.locator('.card-body a');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await username.fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
    await username.fill('rahulshettyacademy');
    await signInBtn.click();
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test('UI Controls Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');
    const username = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    expect(page.locator('.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await username.fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');
    await signInBtn.click();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    //await page.pause();
});

test('Child Windows Handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for any new page
        documentLink.click() // new page is opened
    ]); // new page is opened
    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
});