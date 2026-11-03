import { productNames } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { CartPage } from "../../src/pages/CartPage.page";

test.describe("Verify product", () => {
    test("AE03-01: Logged by storageState", async ({ homePage, workerAccount }) => {
        await homePage.goto();
        await expect(homePage.loggedInUser).toHaveText(` Logged in as ${workerAccount.name}`);
    })

    test("AE03-02: Add product from Product page", async ({ productPage, workerAccount, cartPage}) => {
        const totalProduct=productNames.length;
        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });
        await test.step("Add product", async () => {
            for (let i = 0; i < totalProduct; i++) {
                await productPage.clickAddProduct(productNames[i]);
                await productPage.clickContinuteShopping();
            }
        });

        await test.step("Goto Cart", async()=>{
            await cartPage.goto()
        });

        await test.step("Verify total product in cart and name",async()=>{
            await expect(cartPage.cartRows).toHaveCount(totalProduct);
            await expect(cartPage.getListProductNames()).toHaveText(productNames);
        });

        await test.step("Verify quantity and total",async()=>{
            for(let i=0; i<totalProduct;i++){
                const productName=productNames[i];
                await expect(cartPage.getProductQuantity(productName)).toHaveText("1");
                await expect(cartPage.getProductTotal(productName)).toHaveText(await productPage.getProductPrice(productName));
            }
        })
    })
})