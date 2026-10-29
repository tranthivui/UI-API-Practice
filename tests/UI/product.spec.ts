import {expect, test} from "../../src/fixtures/AuthFixture.fixture";

test.describe("Verify product",()=>{
    test("AE03-01: Logged by storageState", async({homePage,workerAccount})=>{
        await homePage.goto();
        await expect(homePage.loggedInUser).toHaveText(` Logged in as ${workerAccount.name}`);
    })
})