import { expect } from "@playwright/test";
import { ProductApi } from "../../src/api/ProductApi";
import { Product, ProductDetailRes } from "../../src/types/Product";
import { SearchProductRes } from "../../src/types/response";

export async function getSearchResult(productApi: ProductApi, keyword: string): Promise<ProductDetailRes[]> {
    const res = await productApi.searchProduct(keyword);
    expect(res.status()).toBe(200);
    const data: SearchProductRes = await res.json();
    expect(data.responseCode).toBe(200);
    return data.products;
}