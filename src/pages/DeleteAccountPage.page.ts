import { Locator, Page } from "@playwright";

export class DeleteAccountPage{
    readonly url="/delete_account";
    readonly page: Page;
    readonly headerDelete: Locator;
    readonly continueLink: Locator;

    constructor(page:Page){
        this.page=page;
        this.headerDelete=this.page.getByRole("heading",{name:"ACCOUNT DELETED!"});
        this.continueLink=this.page.getByRole("link",{name:"Continue"});
    }

    async clickContinue(){
        await this.continueLink.click();
    }
}