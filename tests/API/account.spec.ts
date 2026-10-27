import { test, expect } from "../../src/fixtures";
import { ApiMessageResponse } from "../../src/types/response";
import { DetailUser, UserDetailRes } from "../../src/types/NewUser";
import { AccountApi } from "../../src/api/AccountApi";

test.describe("Verify API account", () => {
    const data = {
        getUserExsitsMess: "User exists!",
        createDupEmailMess: "Email already exists!",
        updateUserSuccessMes: "User updated!",
        emailNotExsits: "fakeEmail@example.com",
        getEmaiNotExsitsMess: "Account not found with this email, try another email!"
    }
    test("AE02-01: Create account by API then verify by other API", async ({ accountApi, apiUser }) => {
        const logindata: ApiMessageResponse = await test.step("Verify login user", async () => {
            const res = await accountApi.verifyLogin(apiUser.email, apiUser.password);
            expect(res.status()).toBe(200);
            return await res.json();
        });
        expect(logindata.responseCode).toBe(200);
        expect(logindata.message).toBe(data.getUserExsitsMess);
        const detailUserRes: UserDetailRes = await test.step("Get account detail", async () => {
            const res = await accountApi.getUserByEmail(apiUser.email);
            expect(res.status()).toBe(200);
            return await res.json();
        });
        expect(detailUserRes.responseCode).toBe(200);
        expect(detailUserRes.user).toMatchObject({
            name: apiUser.name,
            email: apiUser.email,
            title: apiUser.title,
            birth_day: apiUser.birth_date,
            birth_month: apiUser.birth_month,
            birth_year: apiUser.birth_year,
            first_name: apiUser.firstname,
            last_name: apiUser.lastname,
            company: apiUser.company,
            address1: apiUser.address1,
            address2: apiUser.address2,
            country: apiUser.country,
            zipcode: apiUser.zipcode,
            state: apiUser.state,
            city: apiUser.city
        })
    });

    test("AE02-02: Create duplicate email", async ({ accountApi, apiUser }) => {
        const createRes = await test.step("Create duplicate account", async () => {
            const res = await accountApi.createUser(apiUser);
            expect(res.status()).toBe(200);
            return res;
        });
        const createResData: ApiMessageResponse = await createRes.json();
        expect(createResData.responseCode).toBe(400);
        expect(createResData.message).toBe(data.createDupEmailMess);
    });

    test("AE02-03: Update account", async ({ accountApi, apiUser }) => {
        const updateUser={...apiUser,name: "Change name",city: "New City"};
        const updateRes = await test.step("Update account", async () => {
            const res = await accountApi.updateUser(updateUser);
            expect(res.status()).toBe(200);
            return res;
        });
        const updateResData: ApiMessageResponse = await updateRes.json();
        expect(updateResData.responseCode).toBe(200);
        expect(updateResData.message).toBe(data.updateUserSuccessMes);
        const getUserRes = await test.step("Get user after update", async () => {
            const res = await accountApi.getUserByEmail(apiUser.email);
            expect(res.status()).toBe(200);
            return res;
        });
        const getUserResData: UserDetailRes = await getUserRes.json();
        const userDetail: DetailUser = getUserResData.user;
        expect(userDetail).toMatchObject({
            name: updateUser.name,
            email: updateUser.email,
            title: updateUser.title,
            birth_day: updateUser.birth_date,
            birth_month: updateUser.birth_month,
            birth_year: updateUser.birth_year,
            first_name: updateUser.firstname,
            last_name: updateUser.lastname,
            company: updateUser.company,
            address1: updateUser.address1,
            address2: updateUser.address2,
            country: updateUser.country,
            zipcode: updateUser.zipcode,
            state: updateUser.state,
            city: updateUser.city
        })
    });

    test("AE02-04: Get email not exsits", async({accountApi})=>{
        const getUserRes=await test.step("Get user by email", async()=>{
            const res=await accountApi.getUserByEmail(data.emailNotExsits);
            expect(res.status()).toBe(200);
            return res;
        });
        const getUserResData:ApiMessageResponse=await getUserRes.json();
        expect(getUserResData.responseCode).toBe(404);
        expect(getUserResData.message).toBe(data.getEmaiNotExsitsMess);
    })
})