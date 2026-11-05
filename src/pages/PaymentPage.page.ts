import { Locator, Page } from "@playwright/test";
import { Card } from "../types/Card";

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
        this.cardName = this.page.locator("[data-qa='name-on-card']");
        this.cardNumber = this.page.locator("[data-qa='card-number']");
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

    async pay(card:Card){
        await this.fillCardName(card.cardName);
        await this.fillCardNumber(card.cardNumber);
        await this.fillCVC(card.cvc);
        await this.fillMonth(card.month);
        await this.fillYear(card.year);
        await this.clickPayandConfirm();
    }
}