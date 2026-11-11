import { APIRequestContext, APIResponse } from "@playwright/test";
import { API_SEARCH_PRODUCT, GET_ALL_PRODUCT_API } from "../config/paths";

export class ProductApi {
    private readonly request: APIRequestContext;

    constructor(productAPI: APIRequestContext) {
        this.request = productAPI;
    }

    async getListProduct(): Promise<APIResponse> {
        const getAllProductRes = await this.request.get(GET_ALL_PRODUCT_API);
        return getAllProductRes;
    }

    async searchProduct(searchText: string): Promise<APIResponse> {
        const searchProductRes = await this.request.post(API_SEARCH_PRODUCT, {
            form: {
                search_product: searchText
            }
        });
        return searchProductRes;
    }

    async searchProductWithoutKeyword(): Promise<APIResponse> {
        const searchProductRes = await this.request.post(API_SEARCH_PRODUCT);
        return searchProductRes;
    }
}