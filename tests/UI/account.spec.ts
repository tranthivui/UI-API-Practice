import { buildUser } from "../../src/data/userFactory";
import { expect, test } from "../../src/fixtures/index";
import { UserDetailRes } from "../../src/types/NewUser";
import { ApiMessageResponse } from "../../src/types/response";

test.describe("Verify API and UI", () => {
    const data = {
        deleteSuccess: "Account Deleted!",
        getUserNotExsitsMess: "Account not found with this email, try another email!"
    }
    test("AE02-05: Create account by API then login in WEB", async ({ apiUser, loginPage, homePage }) => {
        await test.step("Login on WEB", async () => {
            await loginPage.goto();
            await loginPage.login(apiUser.email, apiUser.password);
            await homePage.page.waitForURL("/");
        });
        await test.step("Verify login success", async () => {
            await expect(homePage.loggedInUser).toHaveText(`Logged in as ${apiUser.name}`);
        });
    })

    test("AE02-06: Register by UI then verify by API", async ({ loginPage, signupPage, homePage, createdAccountPage, accountApi, cleanupUsers }) => {
        const user = buildUser();
        cleanupUsers.push({ email: user.email, password: user.password });
        await test.step("Sign up on WEB", async () => {
            await loginPage.goto();
            await loginPage.signUp(user.name, user.email);
            await signupPage.page.waitForURL(signupPage.url);
        });
        await test.step("Fill account info", async () => {
            await signupPage.registerUser(user);
            await createdAccountPage.page.waitForURL(createdAccountPage.url);
        });
        await test.step("Verify register success", async () => {
            await createdAccountPage.clickContinue();
            await homePage.page.waitForURL("/");
            await expect(homePage.loggedInUser).toHaveText(`Logged in as ${user.name}`);
        });
        await test.step("Verify by API", async () => {
            const res = await accountApi.getUserByEmail(user.email);
            expect(res.status()).toBe(200);
            const resData: UserDetailRes = await res.json();
            expect(resData.user).toMatchObject({
                name: user.name,
                email: user.email,
                title: user.title,
                birth_day: user.birth_date,
                birth_month: user.birth_month,
                birth_year: user.birth_year,
                first_name: user.firstname,
                last_name: user.lastname,
                company: user.company,
                address1: user.address1,
                address2: user.address2,
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city
            });
        });
    })

    test("AE02-07: Delete account via UI", async ({ apiUser, loginPage, homePage, deleteAccountPage, accountApi }) => {
        await test.step("Login on WEB", async () => {
            await loginPage.goto();
            await loginPage.login(apiUser.email, apiUser.password);
            await homePage.page.waitForURL("/");
        });
        await test.step("Delete account", async () => {
            await homePage.clickDeleteAccount();
            await deleteAccountPage.page.waitForURL(deleteAccountPage.url);
        });
        await test.step("Verify delete account success", async () => {
            await expect(deleteAccountPage.headerDelete).toHaveText(data.deleteSuccess);
        });
        await test.step("Call API to get deleted account", async () => {
            const res = await accountApi.getUserByEmail(apiUser.email);
            expect(res.status()).toBe(200);
            const resData: ApiMessageResponse = await res.json();
            expect(resData.responseCode).toBe(404);
            expect(resData.message).toBe(data.getUserNotExsitsMess);
        })
    })
})