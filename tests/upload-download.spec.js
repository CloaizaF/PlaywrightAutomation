const { test, expect } = require('@playwright/test');
const excelJS = require('exceljs');
const { text } = require('stream/consumers');

async function writeExcelTest(filePath, sheetName, searchValue, replaceValue, change) {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    const cellCoordinates = readExcel(worksheet, searchValue);
    const cell = worksheet.getCell(cellCoordinates.rowNumber + change.rowChange, cellCoordinates.colNumber + change.colChange);
    cell.value = replaceValue;
    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchValue) {
    let cellCoordinates = { rowNumber: -1, colNumber: -1 };
    worksheet.eachRow(($row, $rowNumber) => {
        $row.eachCell(($cell, $colNumber) => {
            if ($cell.value === searchValue) {
                cellCoordinates.rowNumber = $rowNumber;
                cellCoordinates.colNumber = $colNumber;
            }
        });
    });
    return cellCoordinates;
}

test('Upload and Download Excel Test', async ({ page }) => {
    const downloadsPath = 'C:/Users/loaiz/Downloads';
    const searchText = 'Mango';
    const replaceValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.click('button[id="downloadButton"]');
    const download = await downloadPromise;
    await download.saveAs(`${downloadsPath}download.xlsx`);
    writeExcelTest(`${downloadsPath}download.xlsx`, 'Sheet1', searchText, replaceValue, { rowChange: 0, colChange: 2 });
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(`${downloadsPath}download.xlsx`);
    const textLocator = page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(replaceValue);

});