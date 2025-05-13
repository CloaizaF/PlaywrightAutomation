class DashboardPage {
    constructor(page) {
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchProduct(productName) {
        await this.productsText.first().waitFor();
        const titles = this.productsText.allTextContents();
        console.log(titles);
        const productsCount = await this.products.count();
        for (let i = 0; i < productsCount; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('text=Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { DashboardPage };