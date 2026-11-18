import { Locator, Page } from "@playwright/test";

export class ArticleDetailPage{
    private readonly url="/article";
    readonly page: Page;
    readonly commentInput: Locator;
    readonly postcommentBtn: Locator;
    readonly listComments: Locator;

    constructor(page:Page){
        this.page=page;
        this.commentInput=this.page.getByRole("textbox",{name:"Write a comment..."});
        this.postcommentBtn=this.page.getByRole("button",{name:"Post Comment"});
        this.listComments=this.page.locator(".card");
    }

    async fillComment(comment:string){
        await this.commentInput.fill(comment);
    }

    async clickPostCommentBtn(){
        await this.postcommentBtn.click();
    }

    async writeComment(comment:string){
        await this.fillComment(comment);
        await this.clickPostCommentBtn();
    }

    getComment(comment:string,author:string):Locator{
        return this.listComments.filter({
            has: this.page.locator(".card-text",{
                hasText: comment
            })
        }).filter({
                has: this.page.locator(".comment-author",{
                    hasText:author
                })
            })
    }

    getDeleteBtn(comment:Locator):Locator{
        return comment.locator(".mod-options i");
    }

    async goto(slug:string){
        const path=`${this.url}/${slug}`;
        await this.page.goto(path);
    }

    getHeaderTitle(articeTitle:string):Locator{
        return this.page.getByRole("heading",{level:1, name:articeTitle});
    }

    async reloadPage(){
        await this.page.reload();
    }
}