import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly url = "/view_cart";
    readonly page: Page;
    readonly producTable: Locator;
    readonly cartRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.producTable = this.page.locator("#cart_info_table");
        this.cartRows = this.producTable.locator("tbody tr");
    }

    async goto() {
        await this.page.goto(this.url);
    }

    getListProductNames(): Locator {
        return this.cartRows.locator(".cart_description h4");
    }

    getProductByName(productName: string): Locator {
        return this.cartRows.filter({
            has: this.page.locator(".cart_description h4").filter({
                hasText: new RegExp(`^${productName}$`)
            })
        });
    }

    getProductQuantity(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_description button")
    }

    getProductTotal(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_total p")
    }
}