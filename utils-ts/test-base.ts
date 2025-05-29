import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: {
        username: "loaizafcamilo@gmail.com",
        password: "testing11%",
        productName: "ZARA COAT 3"
    }
})