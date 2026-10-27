export type User = {
    email: string,
    password: string
};

export type NewUser = {
    name: string,
    email: string,
    password: string,
    title: string,
    birth_date: string,
    birth_month: string,
    birth_year: string,
    firstname: string,
    lastname: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    zipcode: string,
    state: string,
    city: string,
    mobile_number: string
}

export type DetailUser={
    id: number,
    name: string,
    email: string,
    title: string,
    birth_day: string,
    birth_month: string,
    birth_year: string,
    first_name: string,
    last_name: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    zipcode: string,
    state: string,
    city: string
};

export type UserDetailRes={
    responseCode: number,
    user: DetailUser
}