import { test, expect } from "../../../src/fixtures/conduitFixture/conduit.fixture";
import { ArticleDataRes, CommentDataRes, getCommentRestData, writeCommentRestData } from "../../../src/types/conduiType/responseApi";
import { findComment } from "../../helpers/findComment.helper";

test.describe("Verify Article API", () => {
    test("AE07-API-01: Edit articke", { tag: ["@api", "@smoke"] }, async ({ article, authApi }) => {
        const newData={
            ...article.data,
            title: `${article.data.title} Update ${Date.now()}`,
            body: `${article.data.body} Update ${Date.now()}`
        };
        const articleUpdateRes = await authApi.editArticle(newData, article.slug);
        expect(articleUpdateRes.status()).toBe(200);
        const articleUpdateResData: ArticleDataRes = await articleUpdateRes.json();
        const oldslug=article.slug;
        article.slug=articleUpdateResData.article.slug;
        const getByOldSlugRes = await authApi.getArticle(oldslug);
        expect(getByOldSlugRes.status()).toBe(404);
        const getByNewSlugRes = await authApi.getArticle(articleUpdateResData.article.slug);
        expect(getByNewSlugRes.status()).toBe(200);
        const getByNewSlugResData: ArticleDataRes = await getByNewSlugRes.json();
        expect(getByNewSlugResData.article.title).toBe(newData.title);
        expect(getByNewSlugResData.article.body).toBe(newData.body);
    })

    test("AE07-API-02: User B delete article of user A", { tag: "@api"}, async ({ article, authApi,otherApi }) => {
        const deleteArtRes=await otherApi.deleteArticle(article.slug);
        expect(deleteArtRes.status()).toBe(403);
        const getArtRes=await authApi.getArticle(article.slug);
        expect(getArtRes.status()).toBe(200);
        const getArtResData:ArticleDataRes=await getArtRes.json();
        expect(getArtResData.article.title).toBe(article.data.title);
    })

     test("AE07-API-03: User B edit article of user A", { tag: "@api"}, async ({ article, authApi,otherApi }) => {
        const newArticle={
            ...article,
            title: `${article.data.title} update new by B`
        };
        const editArtRes=await otherApi.editArticle(newArticle.data,article.slug);
        expect(editArtRes.status()).toBe(403);
        const getArtRes=await authApi.getArticle(article.slug);
        expect(getArtRes.status()).toBe(200);
        const getArtResData:ArticleDataRes=await getArtRes.json();
        expect(getArtResData.article.title).toBe(article.data.title);
    })

     test("AE07-API-04: Create comment then delete comment", { tag: "@api"}, async ({ article, authApi,workerUser }) => {
        const comment=`Write new comment at ${Date.now()}`;
        const writeCommentRes=await authApi.writeComment(article.slug,comment);
        expect(writeCommentRes.status()).toBe(200);
        const writeCommentDataRes:writeCommentRestData=await writeCommentRes.json();
        const commentId=writeCommentDataRes.comment.id;
        const exsitsComment=await findComment(article.slug,authApi,commentId);
        expect(exsitsComment).toBeDefined();
        expect(exsitsComment?.body).toBe(comment);
        expect(exsitsComment?.author.username).toBe(workerUser.username);
        const deleteCommentRes=await authApi.deleteComment(article.slug,commentId);
        expect(deleteCommentRes.status()).toBe(200);
        const commentAfterDelete=await findComment(article.slug,authApi,commentId);
        expect(commentAfterDelete).not.toBeDefined();
    })
})