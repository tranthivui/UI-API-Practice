import { Locator, Page } from "@playwright/test";

export class LoginPage{
    private readonly url="/login";
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;

    constructor(page:Page){
        this.page=page;
        this.email=this.page.getByRole("textbox",{name:"Email"});
        this.password=this.page.getByRole("textbox",{name:"Password"});
        this.signInBtn=this.page.getByRole("button",{name:"Sign in"});
    }

    async fillEmail(email:string){
        await this.email.fill(email);
    }

    async fillPassword(password:string){
        await this.password.fill(password);
    }

    async clickSignInBtn(){
        await this.signInBtn.click();
    }

    async logIn(email:string, password:string){
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignInBtn();
    }

    async goto(){
        await this.page.goto(this.url);
    }
}