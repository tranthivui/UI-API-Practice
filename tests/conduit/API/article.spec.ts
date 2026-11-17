import { test, expect } from "../../../src/fixtures/conduitFixture/conduit.fixture";
import { ArticleDataRes } from "../../../src/types/conduiType/responseApi";

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
})