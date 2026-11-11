import { AccountApi } from "../api/AccountApi";
import { buildUser } from "../data/userFactory";
import { NewUser } from "../types/NewUser";
import { ApiMessageResponse } from "../types/response";
import {test as baseTest} from "./index";
import { deleteAndCheck } from "./ApiFixture.fixture";
import { ENV } from "../config/env";
import { blockAds } from "../utils/blockAds";
import { LoginPage } from "../pages/LoginPage.page";

type AuthWorkerFixtures ={
    workerAccount: NewUser;
    workerStorageState: string;
};

export const test=baseTest.extend<{},AuthWorkerFixtures>({// extend nhan 2 gia tri {scope test} {scope worker} -> cac fixture khac o so 2 de trong nen ko can khai bao, fixture auth can scope worker nen phai de trong o dau tien
    workerAccount: [async({playwright},use)=>{
        //1. Tu tao request context (vi khong co fixture request)
        const requestContext= await playwright.request.newContext({baseURL:ENV.baseUrl});
        const accountApi= new AccountApi(requestContext);
        //2. Create user
        const user=buildUser();
        const createRes=await accountApi.createUser(user);
        const createDate:ApiMessageResponse=await createRes.json();
        if(createDate.responseCode!==201){
            throw new Error(`Create worker: account failt ${createDate.responseCode}  ${createDate.message}`);
        };
        await use(user);
        await deleteAndCheck(accountApi,user.email,user.password);
        await requestContext.dispose()
    }, { scope:"worker" }],

    workerStorageState: [ async({ browser, workerAccount},use, workerInfo)=>{
        const fileName=`playwright/.auth/worker-${workerInfo.parallelIndex}.json`;
        //Trang tam chi dung de dang nhap mot lan
        const page = await browser.newPage({baseURL: ENV.baseUrl});
        await blockAds(page);
        const loginPage=new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(workerAccount.email,workerAccount.password);
        await page.getByText(" Logged in as").waitFor();
        await page.context().storageState({path: fileName});
        await page.close();
        await use(fileName);
    }, {scope: "worker"}],

    storageState: async({workerStorageState},use)=>{
        await use(workerStorageState);
    },
});

export { expect } from "@playwright/test";

