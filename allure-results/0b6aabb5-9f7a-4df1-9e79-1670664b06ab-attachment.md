# Test info

- Name: @Web Broswer Context Test
- Location: C:\Users\loaiz\OneDrive\Documentos\Automation\Playwright\PlaywrightAutomation\tests\UIBasicstest.spec.js:3:6

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\loaiz\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
>  3 | test.only('@Web Broswer Context Test', async ({ browser }) => {
     |      ^ Error: browserType.launch: Executable doesn't exist at C:\Users\loaiz\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
   4 |     const context = await browser.newContext();
   5 |     const page = await context.newPage();
   6 |     //page.route('**/*.{jpg, png, jpeg}', (route) => { route.abort(); }); // To abort network calls for images
   7 |     page.on('request', request => console.log(request.url())); // To log all network requests urls
   8 |     page.on('response', response => console.log(response.url(), response.status())); // To log all network responses status codes
   9 |     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  10 |     console.log(await page.title());
  11 |     const username = page.locator('#username');
  12 |     const signInBtn = page.locator('#signInBtn');
  13 |     const cardTitle = page.locator('.card-body a');
  14 |     await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  15 |     await username.fill('rahulshetty');
  16 |     await page.locator('[type="password"]').fill('learning');
  17 |     await signInBtn.click();
  18 |     console.log(await page.locator("[style*='block']").textContent());
  19 |     await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
  20 |     await username.fill('rahulshettyacademy');
  21 |     await signInBtn.click();
  22 |     console.log(await cardTitle.first().textContent());
  23 |     console.log(await cardTitle.nth(1).textContent());
  24 |     const allTitles = await cardTitle.allTextContents();
  25 |     console.log(allTitles);
  26 | });
  27 |
  28 | test('@Web UI Controls Test', async ({ page }) => {
  29 |     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  30 |     const documentLink = page.locator('[href*="documents-request"]');
  31 |     const username = page.locator('#username');
  32 |     const signInBtn = page.locator('#signInBtn');
  33 |     const dropdown = page.locator('select.form-control');
  34 |     await dropdown.selectOption('consult');
  35 |     await page.locator('.radiotextsty').last().click();
  36 |     await page.locator('#okayBtn').click();
  37 |     expect(page.locator('.radiotextsty').last()).toBeChecked();
  38 |     console.log(await page.locator('.radiotextsty').last().isChecked());
  39 |     await page.locator("#terms").click();
  40 |     expect(page.locator("#terms")).toBeChecked();
  41 |     await page.locator("#terms").uncheck();
  42 |     expect(await page.locator("#terms").isChecked()).toBeFalsy();
  43 |     await username.fill('rahulshetty');
  44 |     await page.locator('[type="password"]').fill('learning');
  45 |     await signInBtn.click();
  46 |     await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  47 |     //await page.pause();
  48 | });
  49 |
  50 | test('Child Windows Handle', async ({ browser }) => {
  51 |     const context = await browser.newContext();
  52 |     const page = await context.newPage();
  53 |     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  54 |     const username = page.locator('#username');
  55 |     const documentLink = page.locator('[href*="documents-request"]');
  56 |     const [newPage] = await Promise.all([
  57 |         context.waitForEvent('page'), // listen for any new page
  58 |         documentLink.click() // new page is opened
  59 |     ]); // new page is opened
  60 |     const text = await newPage.locator('.red').textContent();
  61 |     console.log(text);
  62 |     const domain = text.split("@")[1].split(" ")[0];
  63 |     console.log(domain);
  64 |     await page.locator('#username').fill(domain);
  65 | });
```