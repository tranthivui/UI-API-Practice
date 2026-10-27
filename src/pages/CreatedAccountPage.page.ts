import { Locator, Page } from "@playwright";

export class CreatedAccountPage{
    readonly url="/account_created";
    readonly page: Page;
    readonly headerCreated: Locator;
    readonly continueLink: Locator;

    constructor(page:Page){
        this.page=page;
        this.headerCreated=this.page.getByRole("heading",{name:"ACCOUNT CREATED!"});
        this.continueLink=this.page.getByRole("link",{name:"Continue"});
    }

    async clickContinue(){
        await this.continueLink.click();
    }
}