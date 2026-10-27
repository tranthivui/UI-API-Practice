import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page:Page;
    readonly loggedInUser: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loggedInUser = this.page.getByText(" Logged in as");
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
        this.deleteAccount=this.page.getByRole("link",{name:"Delete Account"})
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickDeleteAccount(){
        await this.deleteAccount.click();
    }
}