const { test, expect } = require('@playwright/test');

test('Calendar Validation', async ({ page }) => {
    const monthNumber = "12";
    const date = "15";
    const year = "2027";
    const expectedDateList = [monthNumber, date, year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber) - 1).click();
    await page.locator('//abbr[text()="' + date + '"]').click();
    const inputs = await page.locator('.react-date-picker__inputGroup input');
    for (let i = 0; i < inputs.length; i++) {
        const value = inputs[i].getAttribute('value');
        expect(value).toEqual(expectedDateList[i]);
    }
});
