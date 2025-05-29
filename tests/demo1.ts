import { expect, type Page, type Locator } from '@playwright/test';

let message1: string = "Hello";
message1 = "Bye";
console.log(message1);
let age1: number = 30;
let isActive1: boolean = false;
let numbers1: number[] = [1, 2, 3];
let mixedArray1: (string | number | boolean)[] = ["Hello", 42, false];
let data: any = "This can be anything";
data = 42;

function add(a: number, b: number): number {
    return a + b;
}

let c: number = add(5, 10);

let user: { name: string, age: number, isActive: boolean, location: string } = { name: "Bob", age: 25, isActive: true, location: "" };

user.location = "New York"; 


class CartPage {

    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName) {

        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}
module.exports = { CartPage };