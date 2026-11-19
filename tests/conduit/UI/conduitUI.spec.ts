import { CONDUIT_GET_USER_API } from "../../../src/config/conduitPaths/paths";
import { CONDUIT_ENV } from "../../../src/config/env";
import { buildArticle } from "../../../src/data/conduitData/articleFactory";
import { TOKEN_KEY } from "../../../src/data/conduitData/data";
import { test, expect } from "../../../src/fixtures/conduitFixture/conduit.fixture"
import { ArticleDetailPage } from "../../../src/pages/conduit/ArticleDetailPage.page";
import { ArticleDataRes, UserResponse } from "../../../src/types/conduiType/responseApi";
import { getToken } from "../../helpers/getToken.helper";

test.describe("Verify UI", () => {
    test("AE06-UI-01: Verify profile page have article created by API", { tag: ["@ui", "@smoke"] }, async ({ article, workerUser, profilePage }) => {
        await expect(profilePage.headingName).toHaveText(workerUser.username);
        await expect(profilePage.getArticle(article.data.title)).toBeVisible();
        await expect(profilePage.getAuthor(article.data.title)).toHaveText(workerUser.username);
    })

    test("AE06-UI-02: Create Article by Form and verify with API ", { tag: ["@ui"] }, async ({ authApi, editorPage, createdSlugs, loggedInPage }) => {
        await editorPage.goto();
        const newArticle = buildArticle();
        await editorPage.writeArticle(newArticle);
        const slug = await editorPage.getSlugFromUrl();
        createdSlugs.push(slug);
        const getArticleRes = await authApi.getArticle(slug);
        expect(getArticleRes.status()).toBe(200);
        const getArticleResData: ArticleDataRes = await getArticleRes.json();
        expect(getArticleResData.article.title).toBe(newArticle.title);
        expect(getArticleResData.article.description).toBe(newArticle.description);
        expect(getArticleResData.article.body).toBe(newArticle.body);
        expect(getArticleResData.article.tagList).toEqual(newArticle.tagList);
    })

    test("AE06-UI-03: Verify API use token get from UI", { tag: ["@ui", "@api"] }, async ({ workerUser, loginPage, playwright, navBar }) => {
        await loginPage.goto();
        const loginResPromise = loginPage.page.waitForResponse((res) => res.url().includes("/users/login") && res.request().method() == "POST");
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(navBar.getUserLink(workerUser.username)).toBeVisible();
        const loginRes = await loginResPromise;
        expect(loginRes.status()).toBe(200);
        const loginResData: UserResponse = await loginRes.json();
        const tokenFromRes = loginResData.user.token;
        const tokenFromLocalStorage = await getToken(loginPage.page, TOKEN_KEY);
        expect(tokenFromLocalStorage).toBe(tokenFromRes);
        const request = await playwright.request.newContext({
            baseURL: CONDUIT_ENV.apiUrl,
            extraHTTPHeaders: {
                Authorization: `Token ${tokenFromRes}`
            }
        });
        const getUserRes = await request.get(CONDUIT_GET_USER_API);
        expect(getUserRes.status()).toBe(200);
        const getUserResData: UserResponse = await getUserRes.json();
        expect(getUserResData.user.username).toBe(workerUser.username);
    })

    test("AE06-UI-04: Verify logout delete token", { tag: ["@ui"] }, async ({ workerUser, loginPage, navBar, settingPage, page, editorPage }) => {
        await loginPage.goto();
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(navBar.settingLink).toBeVisible();
        await navBar.clickSettingLink();
        await settingPage.clickLogout();
        const token = await getToken(settingPage.page, TOKEN_KEY);
        expect(token).toBeNull();
        await editorPage.goto();
        await expect(page).not.toHaveURL(/\/editor/);
        await expect(navBar.singInLink).toBeVisible();
        await expect(navBar.newArticleLink).toBeHidden();
    })

    test("AE07-UI-01: B write comment for article of A", { tag: "@ui" }, async ({ article, ortherPage, otherUser, loggedInPage }) => {
        const articlePageB = new ArticleDetailPage(ortherPage);
        await articlePageB.goto(article.slug);
        await expect(articlePageB.getHeaderTitle(article.data.title)).toBeVisible();
        const commentDetail = `Comment by ${otherUser.username} at ${Date.now()}`;
        await articlePageB.writeComment(commentDetail);
        const commentBLocator = articlePageB.getComment(commentDetail, otherUser.username);
        await expect(commentBLocator).toBeVisible();
        await expect(articlePageB.getDeleteBtn(commentBLocator)).toBeVisible();
        const articlePageW = new ArticleDetailPage(loggedInPage);
        await articlePageW.goto(article.slug);
        await expect(articlePageW.getHeaderTitle(article.data.title)).toBeVisible();
        await articlePageW.reloadPage();
        await expect(articlePageW.getHeaderTitle(article.data.title)).toBeVisible();
        const commentLocator = articlePageW.getComment(commentDetail, otherUser.username);
        await expect(commentLocator).not.toBeVisible();
    })

    test("AE07-UI-02: B like for article of A", { tag: ["@ui", "@api"] }, async ({ article, otherApi, ortherPage, authApi, workerUser }) => {
        const getArticleRes = await authApi.getArticle(article.slug);
        expect(getArticleRes.status()).toBe(200);
        const getArticleResData: ArticleDataRes = await getArticleRes.json();
        const before = getArticleResData.article.favoritesCount;
        const followRes = await otherApi.followAuthor(workerUser.username);
        expect(followRes.status()).toBe(200);
        const artileDetailPage = new ArticleDetailPage(ortherPage);
        await artileDetailPage.goto(article.slug);
        await expect(artileDetailPage.getHeaderTitle(article.data.title)).toBeVisible();
        const favRes=await artileDetailPage.clickLikeAndWait();
        expect(favRes.status()).toBe(200);
        const res = await otherApi.getArticle(article.slug);
        expect(res.status()).toBe(200);
        const data: ArticleDataRes = await res.json();
        expect(data.article.favorited).toBe(true);
        await expect.poll(async () => {
            const res = await authApi.getArticle(article.slug);
            if (!res.ok()) throw new Error(`GET article ${res.status()}`);
            const data: ArticleDataRes = await res.json();
            return data.article.favoritesCount;
        }, {
            message: "favoritesCount should increase after B clicks favorite",
            timeout: 10_000,
        }).toBe(before + 1);
        await artileDetailPage.reloadPage();
        await expect(artileDetailPage.getHeaderTitle(article.data.title)).toBeVisible();
        await expect(artileDetailPage.likedBtn).toBeVisible();
    })
})