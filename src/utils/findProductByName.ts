import { ProductDetailRes } from "../types/Product";

export function findProductByName(products:ProductDetailRes[], name:string):ProductDetailRes{
    const product=products.find(p => p.name===name);
    if(!product){
        throw new Error(`Product ${name} not found in API productList`);
    }
    return product;
}