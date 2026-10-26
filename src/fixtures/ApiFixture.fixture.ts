import { request } from "node:http";
import { AccountApi } from "../api/AccountApi";
import {test as base} from "@playwright/test"
import { NewUser } from "../types/NewUser";
import { buildUser } from "../data/userFactory";
import { ApiMessageResponse } from "../types/response";

type ApiFixture={
    accountApi: AccountApi,
    apiUser: NewUser
}

export const apiTest=base.extend<ApiFixture>({
    accountApi: async({request},use)=>{
        const accountApi= new AccountApi(request); 
        use(accountApi);
    },

    apiUser: async({accountApi},use)=>{
        const user=buildUser();
        const createRes=await accountApi.createUser(user);
        const createData : ApiMessageResponse=await createRes.json();
        if(createData.responseCode!=201){
            throw new Error("Create user fail");
        };
        await use(user);
        accountApi.deleteUser(user.email,user.password);
    }

})