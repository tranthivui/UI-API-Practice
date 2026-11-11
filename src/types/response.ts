import { Product, ProductDetailRes } from "./Product";

export type ApiMessageResponse={
    responseCode: number;
    message: string
}

export type GetAllProductListRes={
    responseCode: number;
    products: ProductDetailRes[]
}

export type SearchProductRes={
    responseCode: number,
    products: ProductDetailRes []
}