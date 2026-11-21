import { APIRequest, APIRequestContext, test as base, expect, Page } from "@playwright/test";
import { CONDUIT_ENV } from "../../config/env";
import { ConduitUser } from "../../types/conduiTypes/NewUser";
import { ConduitApi } from "../../api/conduitApi/ConduitApi";
import { buildWorkerUser } from "../../data/conduitData/conduitUserFactory";
import { ArticleDataRes, FollowResData, UserResponse } from "../../types/conduiTypes/responseApi";
import { Article } from "../../types/conduiTypes/Article";
import { buildArticle } from "../../data/conduitData/articleFactory";
import { TOKEN_KEY } from "../../data/conduitData/data";
import { ProfilePage } from "../../pages/conduit/ProfilePage.page";
import { EditorPage } from "../../pages/conduit/EditorPage.page";
import { LoginPage } from "../../pages/conduit/LoginPage.page";
import { SettingPage } from "../../pages/conduit/SettingPage.page";
import { NavBar } from "../../pages/conduit/NavBar.page";
import { ArticleDetailPage } from "../../pages/conduit/ArticleDetailPage.page";
import { HomePage } from "../../pages/conduit/HomePage.page";

type WorkerFixtures = {
    workerUser: ConduitUser;
    workerToken: string;
    authApi: ConduitApi;
    otherUser: ConduitUser;
    otherToken: string;
    otherApi: ConduitApi
}

type CreateArticle = {
    data: Article;
    slug: string
}

type TestFixture = {
    article: CreateArticle;
    loggedInPage: Page;
    profilePage: ProfilePage;
    editorPage: EditorPage;
    loginPage: LoginPage;
    settingPage: SettingPage;
    navBar: NavBar;
    createdSlugs: string[];
    guestApi: ConduitApi;
    apiWithToken: (token: string) => Promise<ConduitApi>;
    otherPage: Page;
    articleDetailPage: ArticleDetailPage;
    homePage: HomePage;
    followedAuthor: string;
}

async function ensureUser(request: APIRequest, user: ConduitUser) {
    const ctx = await request.newContext({
        baseURL: CONDUIT_ENV.apiUrl
    });
    const api = new ConduitApi(ctx);
    const loginRes = await api.login(user);
    if (!loginRes.ok()) {
        const regRes = await api.registerUser(user);
        if (!regRes.ok()) {
            throw new Error(`Register failed: ${regRes.status()} ${await regRes.text()}`);
        }
    }
    await ctx.dispose();
}

async function loginToken(request: APIRequest, user: ConduitUser): Promise<string> {
    const ctx = await request.newContext({
        baseURL: CONDUIT_ENV.apiUrl
    });
    const api = new ConduitApi(ctx);
    const loginRes = await api.login(user);
    if (!loginRes.ok()) {
        throw new Error(`Login failed: ${loginRes.status()} ${await loginRes.text()}`)
    }
    const loginResData: UserResponse = await loginRes.json();
    const token = loginResData.user.token;
    if (!token) {
        throw new Error(`Login success but response not have token`)
    }
    await ctx.dispose();
    return token;
}

export const test = base.extend<TestFixture, WorkerFixtures>({
    workerUser: [async ({ playwright }, use, workerInfo) => {
        const user = buildWorkerUser(workerInfo.parallelIndex);
        await ensureUser(playwright.request, user);
        await use(user);
    }, { scope: "worker" }],

    workerToken: [async ({ playwright, workerUser }, use) => {
        const token = await loginToken(playwright.request, workerUser);
        await use(token);
    }, { scope: "worker" }],

    authApi: [async ({ playwright, workerToken }, use) => {
        const ctx = await playwright.request.newContext({
            baseURL: CONDUIT_ENV.apiUrl,
            extraHTTPHeaders: {
                Authorization: `Token ${workerToken}`
            }
        });
        await use(new ConduitApi(ctx));
        await ctx.dispose();
    }, { scope: "worker" }],

    otherUser: [async ({ playwright }, use, workerInfo) => {
        const user = buildWorkerUser(workerInfo.parallelIndex, "_b");
        await ensureUser(playwright.request, user);
        await use(user);
    }, { scope: "worker" }],

    otherToken: [async ({ playwright, otherUser }, use) => {
        const token = await loginToken(playwright.request, otherUser);
        await use(token);
    }, { scope: "worker" }],

    otherApi: [async ({ playwright, otherToken }, use) => {
        const ctx = await playwright.request.newContext({
            baseURL: CONDUIT_ENV.apiUrl,
            extraHTTPHeaders: {
                Authorization: `Token ${otherToken}`
            }
        });
        await use(new ConduitApi(ctx));
        await ctx.dispose();
    }, { scope: "worker" }],

    article: async ({ authApi }, use) => {
        const data = buildArticle();
        const createArticleRes = await authApi.createArticle(data);
        if (!createArticleRes.ok()) {
            throw new Error(`Can not create article`);
        }
        const createArticleResData: ArticleDataRes = await createArticleRes.json();
        if (!createArticleResData.article.slug) {
            throw new Error(`Can not get slug`);
        }
        const created: CreateArticle = {
            data,
            slug: createArticleResData.article.slug
        };
        await use(created);
        const deleteArticleRes = await authApi.deleteArticle(created.slug);
        expect(deleteArticleRes.status()).toBe(204);
        const getArticleRes = await authApi.getArticle(created.slug);
        expect(getArticleRes.status()).toBe(404)
    },

    loggedInPage: async ({ page, workerToken }, use) => {
        await page.addInitScript(({ key, token }) => {
            window.localStorage.setItem(key, token);
        }, { key: TOKEN_KEY, token: workerToken });
        await use(page);
    },

    profilePage: async ({ loggedInPage, workerUser }, use) => {
        const profilePage = new ProfilePage(loggedInPage);
        await profilePage.goto(workerUser.username);
        await use(profilePage);
    },

    editorPage: async ({ page }, use) => {
        const editorPage = new EditorPage(page);
        await use(editorPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    settingPage: async ({ page }, use) => {
        const settingPage = new SettingPage(page);
        await use(settingPage);
    },

    navBar: async ({ page }, use) => {
        const navBar = new NavBar(page);
        await use(navBar);
    },

    createdSlugs: async ({ authApi }, use) => {
        const slugs: string[] = [];
        await use(slugs);
        for (const slug of slugs) {
            const del = await authApi.deleteArticle(slug);
            expect(del.status()).toBe(204);
        }
    },

    guestApi: async ({ playwright }, use) => {
        const ctx = await playwright.request.newContext({ baseURL: CONDUIT_ENV.apiUrl });
        await use(new ConduitApi(ctx));
        await ctx.dispose();
    },

    apiWithToken: async ({ playwright }, use) => {
        const contexts: APIRequestContext[] = [];
        await use(async (token) => {
            const ctx = await playwright.request.newContext({
                baseURL: CONDUIT_ENV.apiUrl,
                extraHTTPHeaders: { Authorization: `Token ${token}` },
            });
            contexts.push(ctx);
            return new ConduitApi(ctx);
        });
        for (const ctx of contexts) await ctx.dispose();
    },

    otherPage: async ({ browser, otherToken }, use) => {
        const context = await browser.newContext({ baseURL: CONDUIT_ENV.url });
        await context.addInitScript(
            ({ key, token }) => localStorage.setItem(key, token),
            { key: TOKEN_KEY, token: otherToken }
        );
        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    articleDetailPage: async ({ page }, use) => {
        const articleDetailPage = new ArticleDetailPage(page);
        await use(articleDetailPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    followedAuthor: async ({ otherApi, workerUser }, use) => {
        const followRes = await otherApi.followAuthor(workerUser.username);
        if (!followRes.ok()) throw new Error(`Follow failed: ${followRes.status()} ${await followRes.text()}`);
        const followResData: FollowResData = await followRes.json();
        await use(workerUser.username);
        const unfollowRes = await otherApi.unFollowAuthor(workerUser.username);
        expect(unfollowRes.status()).toBe(200);
        const unfollowResData: FollowResData = await unfollowRes.json();
        expect(unfollowResData.profile.following).toBe(false);
    },
});

export { expect } from "@playwright/test"