import { NewUser } from "../types/NewUser";

export function buildUser(overrides: Partial<NewUser> = {}): NewUser {
    const unique = crypto.randomUUID();
    return {
        name: "Auto User",
        email: `auto${unique}@example.com`,
        password: "Test@1234",
        title: "Mr",
        birth_date: "20",
        birth_month: "10",
        birth_year: "2000",
        firstname: "Auto",
        lastname: "User",
        company: "CCOM",
        address1: "HN",
        address2: "MD",
        country: "Canada",
        zipcode: "1000000",
        state: "ST",
        city: "CT",
        mobile_number: "0325625689",
        ...overrides
    };
}