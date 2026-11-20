import { Locator, Page } from "@playwright/test";
import { CONDUIT_ENV } from "../../config/env";
import { UIErrorMess } from "../../data/conduitData/message";

export class HomePage {
    private readonly url = "/";
    readonly page: Page;
    readonly listArtice: Locator;
    readonly articleTitles: Locator;
    readonly loadingMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listArtice = this.page.locator(".article-preview");
        this.articleTitles = this.listArtice.getByRole("heading");
        this.loadingMessage = this.page.getByText(UIErrorMess.apiResponse500);
    }

    async clickLikeBtn(article: Locator) {
        await article.locator(".btn.btn-sm.btn-outline-primary").click();
    }

    getLikeStatus(article: Locator): Locator {
        return article.locator(".btn.btn-sm.btn-primaryy");
    }

    async goto() {
        await this.page.goto(this.url);
    }
}
