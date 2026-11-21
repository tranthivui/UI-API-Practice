import { Locator, Page } from "@playwright/test";
import { UIErrorMess } from "../../data/conduitData/message";

export class HomePage {
    private readonly url = "/";
    readonly page: Page;
    readonly articleList: Locator;
    readonly articleTitles: Locator;
    readonly loadingMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleList = this.page.locator(".article-preview");
        this.articleTitles = this.articleList.getByRole("heading");
        this.loadingMessage = this.page.getByText(UIErrorMess.apiResponse500);
    }

    async goto() {
        await this.page.goto(this.url);
    }
}
