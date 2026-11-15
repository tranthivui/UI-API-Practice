import { ConduitApi } from "../../../src/api/conduitApi/ConduitApi";
import { CONDUIT_ENV } from "../../../src/config/env";
import { responseMess } from "../../../src/data/conduitData/message";
import {test,expect} from "../../../src/fixtures/conduitFixture/conduit.fixture"
import { ArticleDataRes, getUserFail, UserResponse } from "../../../src/types/conduiType/responseApi";

test.describe("Verify user API",()=>{
    test("AE06-API-01: Check getUser and workeruser return same user",{tag: ["@smoke","@api"] },async({authApi,workerUser})=>{
        const apiUser=await authApi.getCurrentUser();
        expect(apiUser.status()).toBe(200);
       const apiUserData:UserResponse=await apiUser.json();
       expect(apiUserData.user.username).toBe(workerUser.username);
    })

    test("AE06-API-02: Get user not have header", {tag:"@api"} ,async({playwright})=>{
        const request=await playwright.request.newContext({
            baseURL: CONDUIT_ENV.apiUrl
        });
        const apiConduit= new ConduitApi(request);
        const getUserRes=await apiConduit.getCurrentUser();
        expect(getUserRes.status()).toBe(401);
        const getUserResData:getUserFail=await getUserRes.json();
        expect(getUserResData.message).toBe(responseMess.getUserFail);
        await request.dispose();
    })

    test("AE06-API-03: get user with wrong token", {tag:"@api"}, async({playwright})=>{
        const request=await playwright.request.newContext({
            baseURL: CONDUIT_ENV.apiUrl,
            extraHTTPHeaders:{
                Authorization: `Token absfhjdk`
            }
        });

        const conduitApi=new ConduitApi(request);
        const getUserRes=await conduitApi.getCurrentUser();
        expect(getUserRes.status()).toBe(401);
        const getUserResData:getUserFail=await getUserRes.json();
        expect(getUserResData.message).toBe(responseMess.getUserFail);
        await request.dispose();
    })

    test("AE06-API-04: get article", {tag:"@api"}, async({workerUser,article,authApi})=>{
        const getArticleRes=await authApi.getArticle(article.slug);
        expect(getArticleRes.status()).toBe(200);
        const getArticleResData:ArticleDataRes=await getArticleRes.json();
        expect(getArticleResData.article.title).toBe(article.data.title);
        expect(getArticleResData.article.body).toBe(article.data.body);
        expect(getArticleResData.article.author.username).toBe(workerUser.username);
    })
})