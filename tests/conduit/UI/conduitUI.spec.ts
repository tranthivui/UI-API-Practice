import { CONDUIT_GET_USER_API } from "../../../src/config/conduitPaths/paths";
import { CONDUIT_ENV } from "../../../src/config/env";
import { buildArticle } from "../../../src/data/conduitData/articleFactory";
import { TOKEN_KEY } from "../../../src/data/conduitData/data";
import { test, expect } from "../../../src/fixtures/conduitFixture/conduit.fixture"
import { ArticleDataRes, UserResponse } from "../../../src/types/conduiType/responseApi";

test.describe("Verify UI", () => {
    test("AE06-UI-01: Verify profile page have article created by API", { tag: ["@ui", "@smoke"] }, async ({ article, workerUser, profilePage }) => {
        await expect(profilePage.headingName).toHaveText(workerUser.username);
        await expect(profilePage.getArticle(article.data.title)).toBeVisible();
        await expect(profilePage.getAuthor(article.data.title)).toHaveText(workerUser.username);
    })

    test("AAE06-UI-02: Create Article by Form and verify with API ", { tag: ["@ui"] }, async ({ authApi, editorPage }) => {
        await editorPage.goto();
        const newArticle = buildArticle();
        await editorPage.writeArticle(newArticle);
        await expect(editorPage.page).toHaveURL(/\/article\/.+/);
        const directUrl = editorPage.page.url();
        const slug = directUrl.split("/").pop();
        if (!slug) {
            throw new Error(`Can not create article`)
        }
        console.log(`Slug: ${slug}`);
        const getArticleRes = await authApi.getArticle(slug);
        expect(getArticleRes.status()).toBe(200);
        const getArticleResData: ArticleDataRes = await getArticleRes.json();
        expect(getArticleResData.article.title).toBe(newArticle.title);
        expect(getArticleResData.article.description).toBe(newArticle.description);
        expect(getArticleResData.article.body).toBe(newArticle.body);
        expect(getArticleResData.article.tagList).toEqual(newArticle.tagList);
        const deleteArticleRes = await authApi.deleteArticle(slug);
        expect(deleteArticleRes.status()).toBe(204);
    })

    test("AE06-UI-03: Verify API use token get from UI", { tag: ["@ui", "@api"] }, async ({ workerUser, loginPage, playwright }) => {
        await loginPage.goto();
        const loginResPromise = loginPage.page.waitForResponse((res) => res.url().includes("/users/login") && res.request().method() == "POST");
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(loginPage.page).toHaveURL(CONDUIT_ENV.url);
        const loginRes = await loginResPromise;
        expect(loginRes.status()).toBe(200);
        const loginResData: UserResponse = await loginRes.json();
        const tokenFromRes = loginResData.user.token;
        const tokenFromLocalStorage = await loginPage.page.evaluate((key) => {
            return localStorage.getItem(key);
        }, TOKEN_KEY);
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

    test("AE06-UI-04: Verify logout delete token", { tag: ["@ui"] }, async ({ workerUser, loginPage, navBar, settingPage }) => {
        await loginPage.goto();
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(navBar.settingMenu).toBeVisible();
        await navBar.clickSettingMenu();
        await settingPage.clickLogout();
        const token = await settingPage.page.evaluate((key) => {
            return localStorage.getItem(key);
        }, TOKEN_KEY);
        expect(token).toBeNull();
        await settingPage.page.goto("/editor");
        await expect(settingPage.page).not.toHaveURL(/\/editor/);
        await expect(settingPage.page.getByRole("link", { name: "Sign in" })).toBeVisible();
        await expect(settingPage.page.getByRole("link", { name: "New Article" })).toBeHidden();
    })
})