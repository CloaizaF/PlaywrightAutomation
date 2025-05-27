const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "loaizafcamilo@gmail.com",
        password: "testing11%",
        productName: "ZARA COAT 3"
    }
})