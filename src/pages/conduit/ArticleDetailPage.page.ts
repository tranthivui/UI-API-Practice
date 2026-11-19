import { Locator, Page } from "@playwright/test";
import { Response } from "@playwright/test";

export class ArticleDetailPage {
    private readonly url = "/article";
    readonly page: Page;
    readonly commentInput: Locator;
    readonly postcommentBtn: Locator;
    readonly listComments: Locator;
    readonly likeBtn: Locator;
    readonly likedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentInput = this.page.getByRole("textbox", { name: "Write a comment..." });
        this.postcommentBtn = this.page.getByRole("button", { name: "Post Comment" });
        this.listComments = this.page.locator(".card");
        this.likeBtn = this.page.locator(".banner").locator(".btn.btn-sm.btn-outline-primary");
        this.likedBtn = this.page.locator(".banner").locator(".btn.btn-sm.btn-primary");
    }

    async fillComment(comment: string) {
        await this.commentInput.fill(comment);
    }

    async clickPostCommentBtn() {
        await this.postcommentBtn.click();
    }

    async writeComment(comment: string) {
        await this.fillComment(comment);
        await this.clickPostCommentBtn();
    }

    getComment(comment: string, author: string): Locator {
        return this.listComments.filter({
            has: this.page.locator(".card-text", {
                hasText: comment
            })
        }).filter({
            has: this.page.locator(".comment-author", {
                hasText: author
            })
        })
    }

    getDeleteBtn(comment: Locator): Locator {
        return comment.locator(".mod-options i");
    }

    async goto(slug: string) {
        const path = `${this.url}/${slug}`;
        await this.page.goto(path);
    }

    getHeaderTitle(articeTitle: string): Locator {
        return this.page.getByRole("heading", { level: 1, name: articeTitle });
    }

    async reloadPage() {
        await this.page.reload();
    }

    async clickLikeBtn() {
        await this.likeBtn.click();
    }

    async clickLikeAndWait(): Promise<Response> {
        const resPromise = this.page.waitForResponse(
            (res) => res.url().endsWith("/favorite") && res.request().method() === "POST"
        );
        await this.likeBtn.click();
        return resPromise;
    }
}