import { Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly url= "/products";
    readonly page: Page;
    readonly producTable: Locator;
    readonly productList: Locator;
    readonly productHeading: Locator;
    readonly addSuccessDialog: Locator;
    readonly continueShoppingBtn: Locator;
    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly searchTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.producTable = this.page.locator(".features_items");
        this.productList = this.producTable.locator(".col-sm-4");
        this.productHeading=this.page.getByRole("heading",{level:2,name:"ALL PRODUCTS"});
        this.addSuccessDialog=this.page.locator(".modal-dialog.modal-confirm");
        this.continueShoppingBtn=this.addSuccessDialog.getByRole("button",{name:"Continue Shopping"}); this.searchInput = this.page.getByRole("textbox", { name: "Search Product" })
        this.searchBtn = this.page.locator("#submit_search");
        this.searchTitle=this.page.getByRole("heading",{level:2, name: "SEARCHED PRODUCTS"});
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

    async getProductPrice(productName: string): Promise<string> {
        const product = this.getProductByName(productName);
        return product.getByRole("heading", { level: 2 }).innerText();
    }

    async clickAddProduct(productName: string) {
        const product = this.getProductByName(productName);
        await product.locator(".productinfo a.add-to-cart").click();
        await this.clickContinuteShopping();
    }

    async clickViewProduct(productName: string) {
        const product = this.getProductByName(productName);
        await product.getByRole("link",{name: "View Product"}).click();
    }

    async clickContinuteShopping(){
        await this.continueShoppingBtn.click();
    }

    getListProductNames(): Locator{
        return this.producTable.locator(".productinfo.text-center p");

    }

    async fillSearchKeyword(keyword:string){
        await this.searchInput.fill(keyword);
    }

    async clickSearchBtn(){
        await this.searchBtn.click();
    }

    async search(keyword:string){
        await this.fillSearchKeyword(keyword);
        await this.clickSearchBtn();
    }
}