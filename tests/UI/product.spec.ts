import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { CartPage } from "../../src/pages/CartPage.page";

test.describe("Verify product", () => {
    test("AE03-01: Logged by storageState", async ({ homePage, workerAccount }) => {
        await homePage.goto();
        await expect(homePage.loggedInUser).toHaveText(` Logged in as ${workerAccount.name}`);
    })

    test("AE03-02: Add product from Product page", async ({ productPage, workerAccount, cartPage}) => {
        const totalProduct=listProducts.length;
        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });
        await test.step("Add product", async () => {
            for (let i = 0; i < totalProduct; i++) {
                await productPage.clickAddProduct(listProducts[i].name);
                await productPage.clickContinuteShopping();
            }
        });

        await test.step("Goto Cart", async()=>{
            await cartPage.goto()
        });

        await test.step("Verify total product in cart and name",async()=>{
            await expect(cartPage.cartRows).toHaveCount(totalProduct);
            await expect(cartPage.getListProductNames()).toHaveText(listProducts.map(p => p.name));
        });

        await test.step("Verify quantity and total",async()=>{
            for(let i=0; i<totalProduct;i++){
                const product=listProducts[i];
                await expect(cartPage.getProductQuantity(listProducts[i].name)).toHaveText("1");
                await expect(cartPage.getProductTotal(listProducts[i].name)).toHaveText(product.price);
            }
        })
    })
})