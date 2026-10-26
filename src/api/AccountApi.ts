import { APIRequestContext, APIResponse } from "@playwright/test";
import { NewUser } from "../types/NewUser";
import { CREATE_USER_API, DELETE_USER_API, GET_USER_DETAIL_API, UPDATE_USER_API, VERIFY_LOGIN_API } from "../config/paths";

export class AccountApi {
    private readonly request: APIRequestContext;

    constructor(accountAPI: APIRequestContext) {
        this.request = accountAPI;
    }

    async createUser(account: NewUser): Promise<APIResponse> {
        const createRes = await this.request.post(CREATE_USER_API, {
            form: account
        });
        return createRes;
    }

    async getUserByEmail(email: string): Promise<APIResponse> {
        const getUserRes = await this.request.get(GET_USER_DETAIL_API, {
            params: {
                email: email
            }
        });
        return getUserRes;
    }

    async updateUser(user: NewUser): Promise<APIResponse> {
        const updateRes = await this.request.put(UPDATE_USER_API, {
            form: user
        });
        return updateRes;
    }

    async deleteUser(email: string, password: string): Promise<APIResponse> {
        const deleteRes = await this.request.delete(DELETE_USER_API, {
            form: {
                email: email,
                password: password
            }
        });
        return deleteRes;
    }

    async verifyLogin(email:string, password:string): Promise<APIResponse>{
        const verifyRes=await this.request.post(VERIFY_LOGIN_API,{
            form:{
                email: email,
                password: password
            }
        });
        return verifyRes;
    }
}