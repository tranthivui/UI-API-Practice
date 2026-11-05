import { Locator, Page } from "@playwright/test";

export class CheckOutPage {
    readonly url = "/checkout";
    readonly page: Page;
    readonly deliveryAddress: Locator;
    readonly name: Locator;// title. first_name last_name
    readonly companyAdd1Add2: Locator;// 0: Company 1: Add1 2: Add2
    readonly country: Locator;
    readonly city: Locator;// city state zipcode
    readonly mobile_number: Locator;
    readonly productTable: Locator;
    readonly productRows: Locator;
    readonly cartTotalPrice: Locator;
    readonly placeOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryAddress = this.page.locator("#address_delivery");
        this.name = this.deliveryAddress.locator(".address_firstname.address_lastname");
        this.mobile_number = this.deliveryAddress.locator(".address_phone");
        this.country = this.deliveryAddress.locator(".address_country_name");
        this.city = this.deliveryAddress.locator(".address_city.address_state_name.address_postcode");
        this.companyAdd1Add2 = this.deliveryAddress.locator(".address_address1.address_address2");
        this.productTable = this.page.locator(".table.table-condensed");
        this.productRows = this.productTable.locator("tr");
        this.cartTotalPrice = this.productTable.locator(".cart_total_price");
        this.placeOrder=this.page.getByRole("link",{name:"Place Order"})
    }

    getProductByName(productName: string): Locator {
        return this.productRows.filter({
            has: this.page.getByRole("heading",{
                name: productName,
                exact:true
            })
        })
    }

    getProductPrice(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_price")
    }

    getProductQuantity(productName: string): Locator {
        const product = this.getProductByName(productName);
        return product.locator(".cart_quantity")
    }

    getTotalPrice(): Locator {
        return this.productRows.filter({
            hasText: "Total Amount"
        }).locator(".cart_total_price");
    }
}