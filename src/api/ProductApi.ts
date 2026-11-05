import { APIRequestContext, APIResponse } from "@playwright/test";
import { GET_ALL_PRODUCT_API } from "../config/paths";

export class ProductApi{
    private readonly request: APIRequestContext;

    constructor(productAPI:APIRequestContext){
        this.request=productAPI;
    }

    async getListProduct():Promise<APIResponse>{
        const getAllProductRes=await this.request.get(GET_ALL_PRODUCT_API);
        return getAllProductRes;
    }
}