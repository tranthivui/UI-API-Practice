import { AccountApi } from "../api/AccountApi";
import { test as base } from "@playwright/test"
import { NewUser, User } from "../types/NewUser";
import { buildUser } from "../data/userFactory";
import { ApiMessageResponse } from "../types/response";

type ApiFixture = {
    accountApi: AccountApi,
    apiUser: NewUser,
    cleanupUsers: User[];
}

export const apiTest = base.extend<ApiFixture>({
    accountApi: async ({ request }, use) => {
        const accountApi = new AccountApi(request);
        await use(accountApi);
    },

    apiUser: async ({ accountApi }, use) => {
        const user = buildUser();
        const createRes = await accountApi.createUser(user);
        const createData: ApiMessageResponse = await createRes.json();
        if (createData.responseCode !== 201) {
            throw new Error(`Create user fail: ${createData.responseCode} - ${createData.message}`);
        }
        await use(user);
        await deleteAndCheck(accountApi, user.email, user.password);
    },

    cleanupUsers: async ({ accountApi }, use) => {
        const users: User[] = [];
        await use(users);
        for (const user of users) {
            await deleteAndCheck(accountApi, user.email, user.password);
        }
    }
});

export async function deleteAndCheck(accountApi: AccountApi, email: string, password: string) {
    const res = await accountApi.deleteUser(email, password);
    const resData: ApiMessageResponse = await res.json();
    if (resData.responseCode !== 200 && resData.responseCode !== 404) {
        throw new Error(`Delete fail: ${email} - ${resData.responseCode} - ${resData.message}`);
    }
}