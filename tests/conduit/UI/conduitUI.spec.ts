import { CONDUIT_GET_USER_API } from "../../../src/config/conduitPaths/paths";
import { CONDUIT_ENV } from "../../../src/config/env";
import { buildArticle } from "../../../src/data/conduitData/articleFactory";
import { TOKEN_KEY } from "../../../src/data/conduitData/data";
import { test, expect } from "../../../src/fixtures/conduitFixture/conduit.fixture"
import { ArticleDataRes, UserResponse } from "../../../src/types/conduiType/responseApi";
import { getToken } from "../../helpers/getToken.helper";

test.describe("Verify UI", () => {
    test("AE06-UI-01: Verify profile page have article created by API", { tag: ["@ui", "@smoke"] }, async ({ article, workerUser, profilePage,navBar }) => {
        await expect(navBar.getUserLink(workerUser.username)).toBeVisible();
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

    test("AE06-UI-03: Verify API use token get from UI", { tag: ["@ui", "@api"] }, async ({ workerUser, loginPage, playwright,navBar }) => {
        await loginPage.goto();
        const loginResPromise = loginPage.page.waitForResponse((res) => res.url().includes("/users/login") && res.request().method() == "POST");
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(navBar.getUserLink(workerUser.username)).toBeVisible();
        const loginRes = await loginResPromise;
        expect(loginRes.status()).toBe(200);
        const loginResData: UserResponse = await loginRes.json();
        const tokenFromRes = loginResData.user.token;
        const tokenFromLocalStorage = await getToken(loginPage.page,TOKEN_KEY);
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

    test("AE06-UI-04: Verify logout delete token", { tag: ["@ui"] }, async ({ workerUser, loginPage, navBar, settingPage, page,editorPage }) => {
        await loginPage.goto();
        await loginPage.logIn(workerUser.email, workerUser.password);
        await expect(navBar.settingLink).toBeVisible();
        await navBar.clickSettingLink();
        await settingPage.clickLogout();
        const token = await getToken(settingPage.page,TOKEN_KEY);
        expect(token).toBeNull();
        await editorPage.goto();
        await expect(page).not.toHaveURL(/\/editor/);
        await expect(navBar.singInLink).toBeVisible();
        await expect(navBar.newArticleLink).toBeHidden();
    })
})