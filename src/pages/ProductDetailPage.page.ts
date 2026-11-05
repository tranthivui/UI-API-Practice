import { Locator, Page } from "@playwright/test";

export class ProductDetailPage {
    readonly page: Page;
    readonly quantity: Locator;
    readonly addToCartBtn: Locator;
    readonly addSuccessDialog: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantity = this.page.locator("#quantity");
        this.addToCartBtn = this.page.getByRole("button", { name: "Add to cart" });
        this.addSuccessDialog=this.page.locator(".modal-dialog.modal-confirm");
        this.viewCartLink=this.addSuccessDialog.locator("a");
        this.continueShoppingBtn=this.addSuccessDialog.getByRole("button",{name: "Continue Shopping"});
    }

    async fillQuantity(quantity: number) {
        await this.quantity.fill(quantity.toString());
    }

    async clickAddToCart() {
        await this.addToCartBtn.click();
    }

    async clickViewCart() {
        await this.viewCartLink.click();
    }

    async clickContinueShopping(){
        await this.continueShoppingBtn.click();
    }
}