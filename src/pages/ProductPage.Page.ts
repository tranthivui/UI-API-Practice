import { Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly url= "/products";
    readonly page: Page;
    readonly producTable: Locator;
    readonly productList: Locator;
    readonly productHeading: Locator;
    readonly addSuccessDialog: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.producTable = this.page.locator(".features_items");
        this.productList = this.producTable.locator(".col-sm-4");
        this.productHeading=this.page.getByRole("heading",{level:2,name:"ALL PRODUCTS"});
        this.addSuccessDialog=this.page.locator(".modal-dialog.modal-confirm");
        this.continueShoppingBtn=this.addSuccessDialog.getByRole("button",{name:"Continue Shopping"});
    }

    async goto(){
        await this.page.goto(this.url);
    }
    getProductByName(productName: string): Locator {
        return  this.productList.filter({
        has: this.page.locator(".productinfo p").filter({
            hasText: new RegExp(`^${productName}$`)
        })
    });
    }

    async getProductPrice(productName: string): Promise<String> {
        const product = await this.getProductByName(productName);
        return product.getByRole("heading", { level: 2 }).innerText();
    }

    async clickAddProduct(productName: string) {
        const product = await this.getProductByName(productName);
        await product.locator(".productinfo a.add-to-cart").click();
    }

    async clickContinuteShopping(){
        await this.continueShoppingBtn.click();
    }
}