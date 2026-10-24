import { Locator, Page } from "@playwright/test";
import dotenv from "dotenv"
import { env } from 'node:process';

export class HomePage {
    readonly page;
    readonly loginHead: Locator;
    readonly logoutLink: Locator;
    readonly loginForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHead = this.page.getByText(" Logged in as");
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
        this.loginForm = this.page.locator(".login-form");
    }

    async clickLogout() {
        await this.logoutLink.click();
    }
}