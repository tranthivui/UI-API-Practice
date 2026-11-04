import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly url = "/view_cart";
    readonly page: Page;
    readonly producTable: Locator;
    readonly cartRows: Locator;
    readonly cartEmtyText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.producTable = this.page.locator("#cart_info_table");
        this.cartRows = this.producTable.locator("tbody tr");
        this.cartEmtyText=this.page.locator("#empty_cart");
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
        return product.locator(".cart_quantity button")
    }

    getProductPrice(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_price p");
    }

    getProductTotal(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_total p");
    }

    async deleteProduct(product: Locator) {
        await product.locator(".cart_quantity_delete").click();
    }

    async clearCart() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState();
        let count=await this.cartRows.count();
        while (count > 0) {
            await this.deleteProduct(this.cartRows.first());
            await this.cartRows.nth(count-1).waitFor({state:"detached"});
            count--;
        }
    }
}