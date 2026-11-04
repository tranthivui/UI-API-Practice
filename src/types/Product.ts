export type Product={
    name: string,
    price: string,
    quantity: number
}

export type ProductDetailRes = {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: ProductCategory;
};

export type ProductCategory = {
    usertype: {
        usertype: string;
    };
    category: string;
};

export type UserType = {
    usertype: string;
};