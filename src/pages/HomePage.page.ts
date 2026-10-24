import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page;
    readonly loginInUser: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInUser = this.page.getByText(" Logged in as");
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
    }

    async clickLogout() {
        await this.logoutLink.click();
    }
}