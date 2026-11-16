import { Locator, Page } from "@playwright/test";

export class NavBar{
    readonly page:Page;
    readonly settingLink:Locator;
    readonly newArticleLink: Locator;
    readonly singInLink: Locator;

    constructor(page:Page){
        this.page=page;
        this.settingLink=this.page.getByRole("link",{name:"Settings"});
        this.newArticleLink= this.page.getByRole("link", { name: "New Article" });
        this.singInLink=this.page.getByRole("link", { name: "Sign in" })
    }

    async clickSettingLink(){
        await this.settingLink.click();
    }

    getUserLink(username:string):Locator{
        return this.page.getByRole("link",{name:username});
    }
}