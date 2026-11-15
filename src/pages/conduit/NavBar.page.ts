import { Locator, Page } from "@playwright/test";

export class NavBar{
    readonly page:Page;
    readonly settingMenu:Locator;

    constructor(page:Page){
        this.page=page;
        this.settingMenu=this.page.getByRole("link",{name:"Settings"})
    }

    async clickSettingMenu(){
        await this.settingMenu.click();
    }
}