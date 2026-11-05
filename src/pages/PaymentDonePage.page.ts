import { Locator, Page } from "@playwright/test";

export class PaymentDonePage{
    readonly page:Page;
    readonly orderSuccessText: Locator;

    constructor(page:Page){
        this.page=page;
        this.orderSuccessText=this.page.getByText("Congratulations! Your order has been confirmed!");
    }
}