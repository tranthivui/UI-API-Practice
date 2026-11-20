import { Locator, Page } from "@playwright/test";
import { CONDUIT_ENV } from "../../config/env";

export class HomePage {
    private readonly url = "/";
    readonly page: Page;
    readonly listArtice: Locator;
    readonly loadingPage: Locator;
    readonly articleTitles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listArtice = this.page.locator(".article-preview");
        this.loadingPage = this.page.locator(".article-preview");
        this.articleTitles = this.listArtice.getByRole("heading");
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
