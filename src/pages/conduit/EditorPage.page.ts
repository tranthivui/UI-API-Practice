import { Locator, Page } from "@playwright/test";
import { Article } from "../../types/conduiTypes/Article";

export class EditorPage{
    private readonly url="/editor";
    readonly page: Page;
    readonly title: Locator;
    readonly description: Locator;
    readonly body: Locator;
    readonly tag: Locator;
    readonly publishBtn: Locator;

    constructor(page:Page){
        this.page=page;
        this.title=this.page.getByRole("textbox",{name:"Article Title"});
        this.description=this.page.getByRole("textbox",{name:"What's this article about?"});
        this.body=this.page.getByRole("textbox",{name:"Write your article (in markdown)"});
        this.tag=this.page.getByRole("textbox",{name:"Enter tags"});
        this.publishBtn=this.page.getByRole("button",{name:"Publish Article"});
    }

    async writeArticle(article:Article){
        await this.title.fill(article.title);
        await this.description.fill(article.description);
        await this.body.fill(article.body);
        await this.tag.fill(article.tagList.toString());
        await this.tag.press("Enter");
        await this.publishBtn.click();
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async getSlugFromUrl(): Promise<string> {
    await this.page.waitForURL(/\/article\/.+/);     
    const slug = new URL(this.page.url()).pathname.split("/").pop();
    if (!slug) {
        throw new Error(`Không lấy được slug từ URL: ${this.page.url()}`);
    }
    return slug;                                      
}
}