import { Locator, Page } from "@playwright/test";

export class ProfilePage{
    private readonly url="/profile";
    readonly page:Page;
    readonly listArticle: Locator;
    readonly headingName: Locator;
    

    constructor(page:Page){
        this.page=page;
        this.listArticle=this.page.locator(".article-preview");
        this.headingName=this.page.locator(".user-info h4");
    }

    getArticle(title:string){
        return this.listArticle.filter({
            has: this.page.getByRole("heading",{name:title,level:1})
        })
    }

    getAuthor(title:string):Locator{
        return this.getArticle(title).locator(".author");
    }

    async goto(username:string){
        await this.page.goto(`${this.url}/${username}`);
    }
}