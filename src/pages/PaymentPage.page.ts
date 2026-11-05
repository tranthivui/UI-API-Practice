import { Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly url = "/payment";
    readonly page: Page;
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly month: Locator;
    readonly year: Locator;
    readonly payBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardName = this.page.locator("[data-qa='name_on_card']");
        this.cardNumber = this.page.locator("[data-qa='card_number']");
        this.cvc = this.page.locator("[data-qa='cvc']");
        this.month = this.page.locator("[data-qa='expiry-month']");
        this.year = this.page.locator("[data-qa='expiry-year']");
        this.payBtn = this.page.getByRole("button", { name: "Pay and Confirm Order" })
    }

    async fillCardName(cardName: string) {
        await this.cardName.fill(cardName);
    }

    async fillCardNumber(cardNumber: string) {
        await this.cardNumber.fill(cardNumber);
    }

    async fillCVC(cvc: string) {
        await this.cvc.fill(cvc);
    }

    async fillMonth(month: string) {
        await this.month.fill(month);
    }

    async fillYear(year: string) {
        await this.year.fill(year);
    }

    async clickPayandConfirm(){
        await this.payBtn.click();
    }

    async pay(cardName:string,cardNumber:string,cvc:string,month:string,year:string){
        await this.fillCardName(cardName);
        await this.fillCardNumber(cardNumber);
        await this.fillCVC(cvc);
        await this.fillMonth(month);
        await this.fillYear(year);
        await this.clickPayandConfirm();
    }
}