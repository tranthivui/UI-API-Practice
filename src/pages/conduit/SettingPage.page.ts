import { Locator, Page } from "@playwright/test";

export class SettingPage{
    private readonly url="/settings";
    readonly page: Page;
    readonly logoutBtn: Locator;
    readonly headingSetting: Locator;
    
    constructor(page:Page){
        this.page=page;
        this.logoutBtn=this.page.getByRole("button",{name:"Or click here to logout."});
        this.headingSetting=this.page.getByRole("heading",{name:"Your Settings", level:1});
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async clickLogout(){
        await this.logoutBtn.click();
    }
}