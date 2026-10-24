import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly url = "/login";
    readonly page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly loginForm: Locator;
    readonly errorMess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginForm = this.page.locator(".login-form");
        this.email = this.loginForm.getByRole("textbox", { name: "Email Address" });
        this.password = this.loginForm.getByRole("textbox", { name: "Password" });
        this.loginBtn = this.loginForm.getByRole("button", { name: "Login" });
        this.errorMess = this.loginForm.locator("p");
    }

    async fillEmail(email: string) {
        await this.email.fill(email);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginBtn();
    }

    async goto() {
        await this.page.goto(this.url);
    }
}